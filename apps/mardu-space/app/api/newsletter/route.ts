import { NextResponse } from 'next/server';
import { newsletterRequestSchema } from '@mardu/lead-core';
import { forwardPlatformJson } from '@/lib/platform-api';
import type {
  NewsletterErrorResponseDto,
  NewsletterRequestDto,
  NewsletterResponseDto,
} from '@mardu/lead-core';

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = newsletterRequestSchema
    .omit({ site: true })
    .safeParse(json);
  if (!parsed.success) {
    const payload: NewsletterErrorResponseDto = { error: 'Invalid payload' };
    return NextResponse.json(payload, { status: 400 });
  }

  try {
    const payload: NewsletterRequestDto = {
      ...parsed.data,
      site: 'mardu-space',
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
