import { NextResponse } from 'next/server';
import { newsletterRequestSchema, type NewsletterRequestDto, type NewsletterSignupRole } from '@mardu/lead-core';
import { upsertPendingNewsletterSubscriber } from '@/lib/lead-store';
import { sendNewsletterConfirmationEmail } from '@/lib/newsletter-confirmation';

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
  const isDev = process.env.NODE_ENV === 'development';
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const shouldVerifyCaptcha = !isDev && Boolean(token && secret);

  if (shouldVerifyCaptcha) {
    const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`,
    });
    const captchaJson = await captchaRes.json();
    if (!captchaJson.success) {
      return NextResponse.json({ error: 'Invalid captcha' }, { status: 400 });
    }
  } else if (!isDev && (token || secret)) {
    console.warn('Newsletter captcha check skipped due to partial captcha configuration');
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
