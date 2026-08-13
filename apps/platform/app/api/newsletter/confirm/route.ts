import { NextResponse } from 'next/server';
import type { SiteKey } from '@mardu/lead-core';
import { createNewsletterToken, verifyNewsletterToken } from '@mardu/lead-core';
import { confirmNewsletterSubscriber, setNewsletterSubscriberTwentyStatus } from '@/lib/lead-store';
import { sendNewsletterEventToTwenty } from '@/lib/integrations/twenty';
import { renderEmailLayout, sendEmail } from '@/lib/email';
import type { NewsletterCrmEventDto } from '@/types/api/newsletter-crm';
import { getSiteConfig } from '@mardu/site-config';

const activeSite: SiteKey = 'mardu-de';

function redirectWithStatus(site: SiteKey, status: string) {
  const siteConfig = getSiteConfig(site);
  const url = new URL(siteConfig.newsletterSuccessPath, siteConfig.origin);
  url.searchParams.set('status', status);
  return NextResponse.redirect(url);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) {
    return redirectWithStatus(activeSite, 'missing-token');
  }

  const data = verifyNewsletterToken(token);
  if (!data || data.site !== activeSite || data.purpose !== 'confirm') {
    return redirectWithStatus(activeSite, 'invalid-token');
  }

  const site = data.site;
  const role = data.role;
  let subscriber: Awaited<ReturnType<typeof confirmNewsletterSubscriber>> | null = null;
  try {
    subscriber = await confirmNewsletterSubscriber({
      email: data.email,
      site,
      role,
      ...(data.firstName ? { firstName: data.firstName } : {}),
      ...(data.lastName ? { lastName: data.lastName } : {}),
      ...(data.company ? { company: data.company } : {}),
    });

    const crmPayload: NewsletterCrmEventDto = {
      type: 'newsletter_confirmed',
      email: data.email,
      site,
      role,
      source: 'newsletter',
      ...(data.firstName ? { firstName: data.firstName } : {}),
      ...(data.lastName ? { lastName: data.lastName } : {}),
      ...(data.company ? { company: data.company } : {}),
      occurredAt: new Date().toISOString(),
      consentModel: 'double-opt-in',
    };
    if (subscriber) {
      const confirmedSubscriber = subscriber;
      void sendNewsletterEventToTwenty(crmPayload)
        .then((result) =>
          setNewsletterSubscriberTwentyStatus(
            confirmedSubscriber.id,
            result.skipped ? 'skipped' : 'synced',
            result.skipped ? result.reason : undefined,
          ),
        )
        .catch((err) => {
          console.error('Failed to sync subscriber to Twenty', err);
          return setNewsletterSubscriberTwentyStatus(confirmedSubscriber.id, 'failed', String(err));
        });
    }
  } catch (err) {
    console.error('Failed to confirm newsletter subscription', err);
    return redirectWithStatus(site, 'error');
  }

  try {
    const unsubscribeToken = createNewsletterToken({
      email: data.email,
      site,
      role,
      purpose: 'unsubscribe',
      ...(data.firstName ? { firstName: data.firstName } : {}),
      ...(data.lastName ? { lastName: data.lastName } : {}),
      ...(data.company ? { company: data.company } : {}),
    });
    const unsubscribeUrl = `${process.env.MARDU_PLATFORM_ORIGIN?.trim() || 'https://platform.mardu.de'}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;
    const body = `<p>Vielen Dank für deine Bestätigung.</p><p>Wenn du den Newsletter nicht mehr erhalten möchtest, kannst du dich <a href="${unsubscribeUrl}">hier abmelden</a>.</p>`;

    await sendEmail({
      to: data.email,
      subject: 'Newsletter Anmeldung bestätigt',
      text: `Vielen Dank für deine Bestätigung. Abmelden: ${unsubscribeUrl}`,
      html: renderEmailLayout(site, 'Newsletter Anmeldung bestätigt', body),
    });
  } catch (err) {
    console.error('Failed to send newsletter confirmation follow-up email', err);
  }

  return redirectWithStatus(site, 'success');
}
