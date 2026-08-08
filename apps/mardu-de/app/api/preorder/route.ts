import { NextResponse } from 'next/server';
import { preorderRequestSchema, readRequestJson } from '@mardu/lead-core';
import { forwardPlatformJson } from '@/lib/platform-api';

export async function POST(req: Request) {
  const jsonResult = await readRequestJson(req);
  if (!jsonResult.success) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = preorderRequestSchema.omit({ site: true }).safeParse(jsonResult.data);
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
