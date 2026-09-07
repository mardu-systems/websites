import config from '@/payload.config';
import { OIDC_SESSION_COOKIE, getCookieValue, isOidcDebugAllowed } from '@/lib/payload-sso';
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes';

export const dynamic = 'force-dynamic';

const restGet = REST_GET(config);
const restPost = REST_POST(config);
const restDelete = REST_DELETE(config);
const restPatch = REST_PATCH(config);
const restPut = REST_PUT(config);
const restOptions = REST_OPTIONS(config);

type Handler = (request: Request, context: { params: Promise<{ slug: string[] }> }) => Promise<Response>;

const withOidcDebug = (handler: Handler): Handler => {
  return async (request, context) => {
    if (isOidcDebugAllowed()) {
      const { slug } = await context.params;

      if (slug[0] === 'users' && slug[1] === 'me') {
        const sessionCookie = getCookieValue(request.headers.get('cookie'), OIDC_SESSION_COOKIE);

        console.info('[OIDC][api:users-me]', {
          hasSessionCookie: Boolean(sessionCookie),
          sessionCookieLength: sessionCookie?.length,
        });
      }
    }

    return handler(request, context);
  };
};

export const GET = withOidcDebug(restGet as Handler);
export const POST = withOidcDebug(restPost as Handler);
export const DELETE = withOidcDebug(restDelete as Handler);
export const PATCH = withOidcDebug(restPatch as Handler);
export const PUT = withOidcDebug(restPut as Handler);
export const OPTIONS = withOidcDebug(restOptions as Handler);
