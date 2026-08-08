import { NextResponse } from 'next/server';
import { getConsent, setConsent } from '@mardu/lead-core/consent-server';
import { consentPreferencesSchema, readRequestJson } from '@mardu/lead-core';

export async function GET() {
  return NextResponse.json(await getConsent());
}

export async function POST(request: Request) {
  const jsonResult = await readRequestJson(request);
  const parsed = jsonResult.success ? consentPreferencesSchema.safeParse(jsonResult.data) : null;
  if (!parsed?.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  await setConsent(parsed.data);
  return NextResponse.json({ ok: true });
}
