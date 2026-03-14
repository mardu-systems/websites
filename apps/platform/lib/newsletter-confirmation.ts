import { createNewsletterToken, type NewsletterSignupRole, type SiteKey } from '@mardu/lead-core';
import { getPlatformOrigin, getSiteConfig } from '@mardu/site-config';
import { renderEmailLayout, sendEmail } from '@/lib/email';

type SendNewsletterConfirmationEmailInput = {
  email: string;
  role: NewsletterSignupRole;
  site: SiteKey;
  firstName?: string;
  lastName?: string;
  company?: string;
};

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: 'Unbekannt', lastName: 'Kontakt' };
  }

  const parts = trimmed.split(/\s+/);
  const firstName = parts.shift() ?? 'Unbekannt';
  const lastName = parts.join(' ').trim() || 'Kontakt';
  return { firstName, lastName };
}

export async function sendNewsletterConfirmationEmail({
  email,
  role,
  site,
  firstName,
  lastName,
  company,
}: SendNewsletterConfirmationEmailInput): Promise<void> {
  const siteConfig = getSiteConfig(site);
  const confirmToken = createNewsletterToken({
    email,
    site,
    role,
    purpose: 'confirm',
    ...(firstName ? { firstName } : {}),
    ...(lastName ? { lastName } : {}),
    ...(company ? { company } : {}),
  });

  const confirmUrl = `${getPlatformOrigin()}/api/newsletter/confirm?token=${encodeURIComponent(confirmToken)}`;
  const subject =
    role === 'whitepaper'
      ? `Bitte bestätige deinen Whitepaper-Download bei ${siteConfig.emailBrandName}`
      : `Bitte bestätige deine Newsletter-Anmeldung bei ${siteConfig.emailBrandName}`;

  const intro =
    role === 'whitepaper'
      ? 'Bitte bestätige deinen Download über den folgenden Link.'
      : 'Bitte bestätige deine Anmeldung über den folgenden Link.';

  await sendEmail({
    to: email,
    subject,
    html: renderEmailLayout(
      site,
      subject,
      `<p>${intro}</p><p style="text-align:center;"><a href="${confirmUrl}">Bestätigung öffnen</a></p>`,
    ),
    text: `${intro} ${confirmUrl}`,
  });
}
