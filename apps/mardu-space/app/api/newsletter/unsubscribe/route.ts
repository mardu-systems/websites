import { NextResponse } from 'next/server';
import { buildPlatformRedirect } from '@/lib/platform-api';

export async function GET(req: Request) {
  const currentUrl = new URL(req.url);
  currentUrl.searchParams.set('site', 'mardu-space');
  return NextResponse.redirect(
    buildPlatformRedirect('/api/newsletter/unsubscribe', currentUrl.searchParams),
  );
}
