import config from '@/payload.config';
import { buildRedirectURL, getExpiredSessionCookieOptions } from '@/lib/payload-sso';
import { getPayload } from 'payload';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestURL = new URL(request.url);
  const redirect = requestURL.searchParams.get('redirect') || '/admin/login';
  const redirectURL = buildRedirectURL(request, redirect);

  const response = NextResponse.redirect(redirectURL);

  response.cookies.set(getExpiredSessionCookieOptions());

  const payload = await getPayload({ config });
  const cookiePrefix = payload.config.cookiePrefix || 'payload';

  const payloadCookieNames = [
    `${cookiePrefix}-token`,
    `${cookiePrefix}-refresh-token`,
    `__Secure-${cookiePrefix}-token`,
    `__Secure-${cookiePrefix}-refresh-token`,
  ];

  for (const cookieName of payloadCookieNames) {
    response.cookies.set({
      maxAge: 0,
      name: cookieName,
      path: '/',
      value: '',
    });
  }

  return response;
}
