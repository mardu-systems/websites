import { NextResponse } from 'next/server';
import { buildPlatformRedirect } from '@/lib/platform-api';

export async function GET(req: Request) {
  const currentUrl = new URL(req.url);
  currentUrl.searchParams.set('site', 'mardu-de');
  return NextResponse.redirect(buildPlatformRedirect('/api/newsletter/confirm', currentUrl.searchParams));
}
