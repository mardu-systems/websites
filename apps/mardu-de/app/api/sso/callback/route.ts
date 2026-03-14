import config from '@/payload.config';
import {
  buildErrorRedirectURL,
  buildRedirectURL,
  canAutoProvisionOidcUsers,
  createOidcSessionToken,
  getExpiredStateCookieOptions,
  getCookieValue,
  getSessionCookieOptions,
  isEmailAllowedForOidc,
  isOidcEnabled,
  logOidcDebug,
  OIDC_STATE_COOKIE,
  resolveOidcUserFromCallback,
  verifyOidcState,
} from '@/lib/payload-sso';
import { getPayload } from 'payload';
import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';

export const dynamic = 'force-dynamic';

const redirectWithError = (errorCode: string, request: Request) => {
  const url = buildErrorRedirectURL(request, errorCode);

  logOidcDebug('callback:redirect-error', {
    errorCode,
  });

  return NextResponse.redirect(url);
};

export async function GET(request: Request) {
  logOidcDebug('callback:start', {
    url: request.url,
  });

  if (!isOidcEnabled()) {
    return redirectWithError('oidc_not_configured', request);
  }

  const requestURL = new URL(request.url);
  const code = requestURL.searchParams.get('code');
  const state = requestURL.searchParams.get('state');
  const providerError = requestURL.searchParams.get('error');

  if (providerError) {
    logOidcDebug('callback:provider-error', { providerError });
    return redirectWithError(`oidc_${providerError}`, request);
  }

  if (!code || !state) {
    logOidcDebug('callback:missing-params', {
      hasCode: Boolean(code),
      hasState: Boolean(state),
    });
    return redirectWithError('oidc_missing_callback_params', request);
  }

  const stateCookie = getCookieValue(request.headers.get('cookie'), OIDC_STATE_COOKIE);
  logOidcDebug('callback:state-cookie', {
    hasStateCookie: Boolean(stateCookie),
    cookieLength: stateCookie?.length,
  });

  if (!stateCookie) {
    return redirectWithError('oidc_state_missing', request);
  }

  let verifiedState: Awaited<ReturnType<typeof verifyOidcState>>;

  try {
    verifiedState = await verifyOidcState(stateCookie);
    logOidcDebug('callback:state-verified', {
      expectedState: verifiedState.state,
      incomingState: state,
    });
  } catch {
    logOidcDebug('callback:state-invalid');
    return redirectWithError('oidc_state_invalid', request);
  }

  if (verifiedState.state !== state) {
    logOidcDebug('callback:state-mismatch', {
      expectedState: verifiedState.state,
      incomingState: state,
    });
    return redirectWithError('oidc_state_mismatch', request);
  }

  try {
    const verifiedUser = await resolveOidcUserFromCallback({
      code,
      codeVerifier: verifiedState.codeVerifier,
      nonce: verifiedState.nonce,
    });
    logOidcDebug('callback:id-token-verified', {
      email: verifiedUser.email,
      hasName: Boolean(verifiedUser.name),
      subPrefix: verifiedUser.sub.slice(0, 8),
    });

    if (!isEmailAllowedForOidc(verifiedUser.email)) {
      logOidcDebug('callback:email-not-allowed', {
        email: verifiedUser.email,
      });
      return redirectWithError('oidc_email_not_allowed', request);
    }

    const payload = await getPayload({ config });

    const existing = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: {
        email: {
          equals: verifiedUser.email,
        },
      },
    });

    let user = existing.docs[0];
    logOidcDebug('callback:user-query', {
      found: Boolean(user),
      email: verifiedUser.email,
    });

    if (!user && canAutoProvisionOidcUsers()) {
      logOidcDebug('callback:auto-provision:start', {
        email: verifiedUser.email,
      });
      user = await payload.create({
        collection: 'users',
        data: {
          email: verifiedUser.email,
          password: randomBytes(24).toString('hex'),
        },
        overrideAccess: true,
      });
      logOidcDebug('callback:auto-provision:done', {
        userId: user.id,
      });
    }

    if (!user) {
      logOidcDebug('callback:user-not-found');
      return redirectWithError('oidc_user_not_found', request);
    }

    const sessionToken = await createOidcSessionToken({
      email: verifiedUser.email,
      name: verifiedUser.name,
      picture: verifiedUser.picture,
      sub: verifiedUser.sub,
    });

    const redirectURL = buildRedirectURL(request, verifiedState.returnTo);
    const response = NextResponse.redirect(redirectURL);
    const sessionCookie = getSessionCookieOptions(request, sessionToken);

    response.cookies.set(sessionCookie);
    logOidcDebug('callback:session-cookie-set', {
      cookieName: sessionCookie.name,
      secure: sessionCookie.secure,
      redirectTo: redirectURL.toString(),
    });

    response.cookies.set(getExpiredStateCookieOptions());

    return response;
  } catch (error) {
    logOidcDebug('callback:error', {
      error: error instanceof Error ? error.message : String(error),
    });

    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }

    return redirectWithError('oidc_callback_failed', request);
  }
}
