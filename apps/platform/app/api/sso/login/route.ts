import {
  buildOidcAuthorization,
  buildRedirectURL,
  createOidcStateToken,
  getStateCookieOptions,
  isOidcEnabled,
  logOidcDebug,
} from '@/lib/payload-sso';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  logOidcDebug('login:start', {
    url: request.url,
  });

  if (!isOidcEnabled()) {
    logOidcDebug('login:disabled');
    return NextResponse.json(
      {
        error: 'OIDC SSO is not configured.',
      },
      { status: 503 },
    );
  }

  const requestURL = new URL(request.url);
  const returnTo = requestURL.searchParams.get('returnTo') ?? '/admin';

  try {
    const { authorizationURL, statePayload } = await buildOidcAuthorization(returnTo);
    const response = NextResponse.redirect(authorizationURL);
    const stateToken = createOidcStateToken(statePayload);
    logOidcDebug('login:state-created', {
      returnTo,
      state: statePayload.state,
      stateCookieLength: stateToken.length,
    });

    response.cookies.set(getStateCookieOptions(request, stateToken));

    return response;
  } catch (error) {
    logOidcDebug('login:error', {
      error: error instanceof Error ? error.message : String(error),
    });

    const fallbackLoginURL = buildRedirectURL(request, '/admin/login');
    fallbackLoginURL.searchParams.set('error', 'oidc_login_init_failed');

    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }

    return NextResponse.redirect(fallbackLoginURL);
  }
}
