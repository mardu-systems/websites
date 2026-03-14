import { NextResponse } from 'next/server';
import { preorderRequestSchema } from '@mardu/lead-core';
import { forwardPlatformJson } from '@/lib/platform-api';

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = preorderRequestSchema.omit({ site: true }).safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    const response = await forwardPlatformJson('/api/preorder', {
      ...parsed.data,
      site: 'mardu-de',
    });
    const responseBody = (await response.json().catch(() => ({ error: 'Upstream request failed' }))) as
      | { ok: true }
      | { error: string };
    return NextResponse.json(responseBody, { status: response.status });
  } catch (err) {
    console.error('Failed to send preorder email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
