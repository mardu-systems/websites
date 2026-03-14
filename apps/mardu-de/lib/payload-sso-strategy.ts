import {
  OIDC_SESSION_COOKIE,
  getCookieValue,
  isOidcEnabled,
  logOidcDebug,
  verifyOidcSessionToken,
} from './payload-sso.ts';
import type { AuthStrategy } from 'payload';

export const OidcSessionStrategy: AuthStrategy = {
  name: 'oidc-session',
  authenticate: async ({ headers, payload }) => {
    logOidcDebug('strategy:start');

    if (!isOidcEnabled()) {
      logOidcDebug('strategy:disabled');
      return { user: null };
    }

    const sessionToken = getCookieValue(headers.get('cookie'), OIDC_SESSION_COOKIE);
    logOidcDebug('strategy:session-cookie', {
      hasSessionCookie: Boolean(sessionToken),
      cookieLength: sessionToken?.length,
    });

    if (!sessionToken) {
      return { user: null };
    }

    let session: Awaited<ReturnType<typeof verifyOidcSessionToken>>;

    try {
      session = await verifyOidcSessionToken(sessionToken);
      logOidcDebug('strategy:session-verified', {
        email: session.email,
        subPrefix: session.sub.slice(0, 8),
      });
    } catch {
      logOidcDebug('strategy:session-invalid');
      return { user: null };
    }

    const userQuery = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      pagination: false,
      where: {
        email: {
          equals: session.email,
        },
      },
    });

    const user = userQuery.docs[0];
    logOidcDebug('strategy:user-query', {
      found: Boolean(user),
      email: session.email,
    });

    if (!user) {
      return { user: null };
    }

    return {
      user: {
        ...user,
        _strategy: 'oidc-session',
        collection: 'users',
      },
    };
  },
};
