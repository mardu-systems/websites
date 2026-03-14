import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactRequestSchema } from '@mardu/lead-core';
import { normalizePhoneNumber } from '@/lib/phone';
import { forwardPlatformJson } from '@/lib/platform-api';
import type {
  ContactErrorResponseDto,
  ContactRequestDto,
  ContactResponseDto,
} from '@/types/api/contact';

const PhoneSchema = z
  .string()
  .optional()
  .refine(
    (value) => value == null || value.trim().length === 0 || Boolean(normalizePhoneNumber(value)),
    'Bitte eine gültige Telefonnummer angeben',
  )
  .transform((value) => normalizePhoneNumber(value));

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = contactRequestSchema
    .omit({ site: true })
    .extend({ phone: PhoneSchema })
    .safeParse(json);
  if (!parsed.success) {
    const payload: ContactErrorResponseDto = {
      error: 'Invalid payload',
      details: parsed.error.flatten().fieldErrors,
    };
    return NextResponse.json(payload, { status: 400 });
  }

  try {
    const payload: ContactRequestDto = {
      ...parsed.data,
      site: 'mardu-space',
    };
    const response = await forwardPlatformJson('/api/contact', payload);
    const responseBody = (await response.json().catch(() => ({ error: 'Upstream request failed' }))) as
      | ContactResponseDto
      | ContactErrorResponseDto;
    return NextResponse.json(responseBody, { status: response.status });
  } catch (err) {
    console.error('Failed to send contact email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
