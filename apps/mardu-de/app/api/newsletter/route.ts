import { NextResponse } from 'next/server';
import { newsletterRequestSchema, readRequestJson } from '@mardu/lead-core';
import { forwardPlatformJson } from '@/lib/platform-api';
import type { NewsletterErrorResponseDto, NewsletterRequestDto, NewsletterResponseDto } from '@mardu/lead-core';

export async function POST(req: Request) {
  const jsonResult = await readRequestJson(req);
  if (!jsonResult.success) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = newsletterRequestSchema.omit({ site: true }).safeParse(jsonResult.data);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    const payload: NewsletterRequestDto = {
      ...parsed.data,
      site: 'mardu-de',
    };
    const response = await forwardPlatformJson('/api/newsletter', payload);
    const responseBody = (await response.json().catch(() => ({ error: 'Upstream request failed' }))) as
      | NewsletterResponseDto
      | NewsletterErrorResponseDto;
    return NextResponse.json(responseBody, { status: response.status });
  } catch (err) {
    console.error('Failed to send confirmation email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
