import config from '@/payload.config';
import {
  OIDC_SESSION_COOKIE,
  OIDC_STATE_COOKIE,
  getCookieValue,
  isOidcDebugAllowed,
  isOidcEnabled,
  verifyOidcSessionToken,
} from '@/lib/payload-sso';
import { getPayload } from 'payload';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!isOidcDebugAllowed()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const cookieHeader = request.headers.get('cookie');
  const stateCookie = getCookieValue(cookieHeader, OIDC_STATE_COOKIE);
  const sessionCookie = getCookieValue(cookieHeader, OIDC_SESSION_COOKIE);

  let sessionClaims: null | { hasName: boolean; subPrefix: string } = null;
  let sessionError: null | string = null;

  if (sessionCookie) {
    try {
      const verified = await verifyOidcSessionToken(sessionCookie);
      sessionClaims = {
        hasName: Boolean(verified.name),
        subPrefix: verified.sub.slice(0, 8),
      };
    } catch (error) {
      sessionError = error instanceof Error ? error.message : String(error);
    }
  }

  const payload = await getPayload({ config });
  const authStrategies = payload.authStrategies.map((strategy) => strategy.name);

  let strategyProbe:
    | null
    | {
        collection?: string;
        strategy?: string;
        userId?: number | string;
      } = null;
  let strategyProbeError: null | string = null;

  const oidcStrategy = payload.authStrategies.find((strategy) => strategy.name === 'oidc-session');

  if (oidcStrategy) {
    try {
      const probeResult = await oidcStrategy.authenticate({
        canSetHeaders: false,
        headers: request.headers,
        payload,
        strategyName: oidcStrategy.name,
      });

      if (probeResult.user) {
        strategyProbe = {
          collection: probeResult.user.collection,
          strategy: probeResult.user._strategy,
          userId: probeResult.user.id,
        };
      }
    } catch (error) {
      strategyProbeError = error instanceof Error ? error.message : String(error);
    }
  }

  let foundUser: null | { id: number | string } = null;

  if (sessionCookie && !sessionError) {
    const verified = await verifyOidcSessionToken(sessionCookie);
    const result = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: {
        email: {
          equals: verified.email,
        },
      },
    });

    if (result.docs[0]) {
      foundUser = {
        id: result.docs[0].id,
      };
    }
  }

  return NextResponse.json({
    authStrategies,
    isOidcEnabled: isOidcEnabled(),
    hasCookieHeader: Boolean(cookieHeader),
    hasSessionCookie: Boolean(sessionCookie),
    hasStateCookie: Boolean(stateCookie),
    strategyProbe,
    strategyProbeError,
    sessionClaims,
    sessionError,
    foundUser,
  });
}
