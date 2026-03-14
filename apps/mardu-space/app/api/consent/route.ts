import { NextResponse } from 'next/server';
import { getConsent, setConsent } from '@/lib/consent';
import type { ConsentPreferences } from '@/types/consent';

export async function GET() {
  return NextResponse.json(await getConsent());
}

export async function POST(request: Request) {
  const prefs = (await request.json()) as ConsentPreferences;
  await setConsent(prefs);
  return NextResponse.json({ ok: true });
}
