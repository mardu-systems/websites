import { NextResponse } from 'next/server';
import { newsletterRequestSchema, type NewsletterRequestDto, type NewsletterSignupRole } from '@mardu/lead-core';
import { upsertPendingNewsletterSubscriber } from '@/lib/lead-store';
import { sendNewsletterConfirmationEmail } from '@/lib/newsletter-confirmation';
import { enforcePublicLeadProtection } from '@/lib/abuse-protection';

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = newsletterRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { token, ...rawPayload } = parsed.data;
  const role: NewsletterSignupRole = rawPayload.role === 'whitepaper' ? 'whitepaper' : 'newsletter';
  const payload: NewsletterRequestDto = {
    ...rawPayload,
    role,
  };
  const protection = await enforcePublicLeadProtection({
    req,
    endpoint: 'newsletter',
    site: payload.site,
    token,
  });

  if (!protection.ok) {
    return NextResponse.json({ error: protection.error }, { status: protection.status });
  }

  try {
    await upsertPendingNewsletterSubscriber(payload);
    await sendNewsletterConfirmationEmail({
      email: payload.email,
      role,
      site: payload.site,
      firstName: payload.firstName,
      lastName: payload.lastName,
      company: payload.company,
    });
  } catch (err) {
    console.error('Failed to send confirmation email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
