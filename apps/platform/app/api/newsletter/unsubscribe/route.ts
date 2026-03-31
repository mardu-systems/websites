import { NextResponse } from 'next/server';
import type { SiteKey } from '@mardu/lead-core';
import { verifyNewsletterToken } from '@mardu/lead-core';
import { setNewsletterSubscriberTwentyStatus, unsubscribeNewsletterSubscriber } from '@/lib/lead-store';
import { sendNewsletterEventToTwenty } from '@/lib/integrations/twenty';
import { renderEmailLayout, sendEmail } from '@/lib/email';
import type { NewsletterCrmEventDto } from '@/types/api/newsletter-crm';
import { getSiteConfig } from '@mardu/site-config';

function resolveSite(value: string | null): SiteKey {
  return value === 'mardu-space' ? 'mardu-space' : 'mardu-de';
}

function redirectWithStatus(site: SiteKey, status: string) {
  const url = new URL(getSiteConfig(site).newsletterUnsubscribePath, getSiteConfig(site).origin);
  url.searchParams.set('status', status);
  return NextResponse.redirect(url);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const fallbackSite = resolveSite(searchParams.get('site'));
  if (!token) {
    return redirectWithStatus(fallbackSite, 'missing-token');
  }

  const data = verifyNewsletterToken(token, fallbackSite);
  if (!data || data.purpose !== 'unsubscribe') {
    return redirectWithStatus(fallbackSite, 'invalid-token');
  }

  const site = resolveSite(data.site);
  let unsubscribed: Awaited<ReturnType<typeof unsubscribeNewsletterSubscriber>> = null;
  try {
    unsubscribed = await unsubscribeNewsletterSubscriber({
      email: data.email,
      site,
      role: data.role,
    });
    const role = unsubscribed?.role ?? data.role;
    const source = role === 'whitepaper' ? 'whitepaper' : 'newsletter';
    const crmPayload: NewsletterCrmEventDto = {
      type: 'newsletter_unsubscribed',
      email: data.email,
      site,
      role,
      source,
      ...(unsubscribed?.firstName ? { firstName: unsubscribed.firstName } : {}),
      ...(unsubscribed?.lastName ? { lastName: unsubscribed.lastName } : {}),
      ...(unsubscribed?.company ? { company: unsubscribed.company } : {}),
      occurredAt: new Date().toISOString(),
      consentModel: 'double-opt-in',
    };
    if (unsubscribed) {
      const unsubscribedSubscriber = unsubscribed;
      void sendNewsletterEventToTwenty(crmPayload)
        .then((result) =>
          setNewsletterSubscriberTwentyStatus(
            unsubscribedSubscriber.id,
            result.skipped ? 'skipped' : 'synced',
            result.skipped ? result.reason : undefined,
          ),
        )
        .catch((err) => {
          console.error('Failed to sync unsubscribe to Twenty', err);
          return setNewsletterSubscriberTwentyStatus(unsubscribedSubscriber.id, 'failed', String(err));
        });
    }
  } catch (err) {
    console.error('Failed to unsubscribe newsletter', err);
    return redirectWithStatus(site, 'error');
  }

  try {
    await sendEmail({
      to: data.email,
      subject: 'Newsletter Abmeldung',
      text: 'Du hast dich erfolgreich vom Newsletter abgemeldet.',
      html: renderEmailLayout(site, 'Newsletter Abmeldung', '<p>Du hast dich erfolgreich vom Newsletter abgemeldet.</p>'),
    });
  } catch (err) {
    console.error('Failed to send newsletter unsubscribe follow-up email', err);
  }

  return redirectWithStatus(site, 'success');
}
