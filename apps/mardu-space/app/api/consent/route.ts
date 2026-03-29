import { NextResponse } from 'next/server';
import { getConsent, setConsent } from '@mardu/lead-core/consent-server';
import type { ConsentPreferences } from '@mardu/lead-core';

export async function GET() {
  return NextResponse.json(await getConsent());
}

export async function POST(request: Request) {
  const prefs = (await request.json()) as ConsentPreferences;
  await setConsent(prefs);
  return NextResponse.json({ ok: true });
}
