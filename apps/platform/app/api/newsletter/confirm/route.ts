import { NextResponse } from 'next/server';
import type { SiteKey } from '@mardu/lead-core';
import { createNewsletterToken, verifyNewsletterToken } from '@/lib/newsletter';
import { confirmNewsletterSubscriber, setNewsletterSubscriberTwentyStatus } from '@/lib/lead-store';
import { sendNewsletterEventToTwenty } from '@/lib/integrations/twenty';
import { renderEmailLayout, sendEmail } from '@/lib/email';
import type { NewsletterCrmEventDto } from '@/types/api/newsletter-crm';
import { getSiteConfig } from '@mardu/site-config';

function resolveSite(value: string | null): SiteKey {
  return value === 'mardu-space' ? 'mardu-space' : 'mardu-de';
}

function redirectWithStatus(site: SiteKey, status: string, role = 'newsletter') {
  const siteConfig = getSiteConfig(site);
  const targetPath =
    role === 'whitepaper' && siteConfig.whitepaperSuccessPath
      ? siteConfig.whitepaperSuccessPath
      : siteConfig.newsletterSuccessPath;
  const url = new URL(targetPath, siteConfig.origin);
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
  if (!data) {
    return redirectWithStatus(fallbackSite, 'invalid-token');
  }

  const site = resolveSite(data.site);
  const role = data.role === 'whitepaper_requester' ? 'whitepaper' : data.role;
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

    const source = role === 'whitepaper' ? 'whitepaper' : 'newsletter';
    const crmPayload: NewsletterCrmEventDto = {
      type: 'newsletter_confirmed',
      email: data.email,
      site,
      role,
      source,
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
    return redirectWithStatus(site, 'error', role);
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
    const whitepaperDownloadUrl =
      role === 'whitepaper' && getSiteConfig(site).whitepaperDownloadPath
        ? `${site === 'mardu-space' ? getSiteConfig(site).origin : process.env.MARDU_PLATFORM_ORIGIN?.trim() || 'https://platform.mardu.de'}${getSiteConfig(site).whitepaperDownloadPath}?token=${encodeURIComponent(
            createNewsletterToken({
              email: data.email,
              site,
              role,
              purpose: 'whitepaper-download',
              ...(data.firstName ? { firstName: data.firstName } : {}),
              ...(data.lastName ? { lastName: data.lastName } : {}),
              ...(data.company ? { company: data.company } : {}),
            }),
          )}`
        : undefined;
    const body = whitepaperDownloadUrl
      ? `<p>Vielen Dank für deine Bestätigung.</p><p><a href="${whitepaperDownloadUrl}">Whitepaper herunterladen</a></p><p>Wenn du keine weiteren Nachrichten erhalten möchtest, kannst du dich <a href="${unsubscribeUrl}">hier abmelden</a>.</p>`
      : `<p>Vielen Dank für deine Bestätigung.</p><p>Wenn du den Newsletter nicht mehr erhalten möchtest, kannst du dich <a href="${unsubscribeUrl}">hier abmelden</a>.</p>`;

    await sendEmail({
      to: data.email,
      subject: role === 'whitepaper' ? 'Dein Whitepaper ist bereit' : 'Newsletter Anmeldung bestätigt',
      text: whitepaperDownloadUrl
        ? `Vielen Dank für deine Bestätigung. Whitepaper: ${whitepaperDownloadUrl} Abmelden: ${unsubscribeUrl}`
        : `Vielen Dank für deine Bestätigung. Abmelden: ${unsubscribeUrl}`,
      html: renderEmailLayout(site, role === 'whitepaper' ? 'Whitepaper Download' : 'Newsletter Anmeldung bestätigt', body),
    });
  } catch (err) {
    console.error('Failed to send newsletter confirmation follow-up email', err);
  }

  return redirectWithStatus(site, 'success', role);
}
