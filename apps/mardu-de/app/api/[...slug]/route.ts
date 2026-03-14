import { getPlatformOrigin } from '@mardu/site-config';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ slug: string[] }> };

async function proxy(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(`/api/${slug.join('/')}`, getPlatformOrigin());
  targetUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);
  headers.set('x-forwarded-host', incomingUrl.host);
  headers.set('x-forwarded-proto', incomingUrl.protocol.replace(':', ''));

  const method = request.method.toUpperCase();
  const body =
    method === 'GET' || method === 'HEAD' ? undefined : await request.text();

  const response = await fetch(targetUrl, {
    method,
    headers,
    body,
    redirect: 'manual',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

export const GET = proxy;
export const POST = proxy;
export const DELETE = proxy;
export const PATCH = proxy;
export const PUT = proxy;
export const OPTIONS = proxy;
