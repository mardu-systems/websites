import { getPlatformOrigin } from '@mardu/site-config';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const incomingURL = new URL(request.url);
  const targetURL = new URL('/api/sso/callback', getPlatformOrigin());
  targetURL.search = incomingURL.search;
  return NextResponse.redirect(targetURL);
}
