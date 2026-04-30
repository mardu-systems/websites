import { Resend } from 'resend';
import type { ContactRequestDto, SiteKey } from '@mardu/lead-core';
import { getSiteConfig } from '@mardu/site-config';

export async function sendEmail({
  subject,
  text,
  html,
  to,
  replyTo,
}: {
  subject: string;
  text?: string;
  html?: string;
  to?: string;
  replyTo?: string | string[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const recipient = to ?? process.env.EMAIL_TO;

  if (!apiKey || !from || !recipient) {
    throw new Error('Email service not configured');
  }

  const resend = new Resend(apiKey);
  const fromHeader = from.includes('<') ? from : `Mardu GmbH <${from}>`;

  const emailData =
    html != null
      ? {
          from: fromHeader,
          to: recipient,
          subject,
          html,
          ...(replyTo ? { reply_to: replyTo } : {}),
        }
      : {
          from: fromHeader,
          to: recipient,
          subject,
          text: text ?? subject,
          ...(replyTo ? { reply_to: replyTo } : {}),
        };

  const { error } = await resend.emails.send(emailData);

  if (error) {
    throw new Error(`Failed to send email: ${error.name ?? 'Error'} ${error.message ?? String(error)}`);
  }
}

export function renderEmailLayout(site: SiteKey, title: string, content: string): string {
  const siteConfig = getSiteConfig(site);

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f9f9f9;font-family:Arial,sans-serif;">
  <main style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background-color:#f9f9f9;">
    <div style="text-align:center;margin-bottom:24px;">
      <img src="${siteConfig.emailLogoUrl}" alt="${siteConfig.emailBrandName} Logo" style="width:150px;height:auto;" />
    </div>
    <h1 style="text-align:center;font-size:24px;font-weight:bold;margin-bottom:24px;color:#333;">${title}</h1>
    <div style="font-size:16px;line-height:1.5;color:#333;">${content}</div>
    <footer style="margin-top:32px;font-size:12px;color:#666;text-align:center;line-height:1.4;">
      <p>${siteConfig.emailBrandName}</p>
      <p>E-Mail: <a href="mailto:${siteConfig.supportEmail}" style="color:#666;text-decoration:underline;">${siteConfig.supportEmail}</a></p>
      <p>Telefon: <a href="${siteConfig.contactPhoneHref}" style="color:#666;text-decoration:underline;">${siteConfig.contactPhone}</a></p>
      <p>Du erhältst diese E-Mail, weil du uns kontaktiert oder dich angemeldet hast. Wenn du sie nicht erwartet hast, kannst du sie ignorieren oder uns kurz schreiben.</p>
    </footer>
  </main>
</body>
</html>`;
}

function getContactSourceLabel(source: ContactRequestDto['source']): string {
  if (source === 'configurator') return 'Konfigurator';
  if (source === 'admin-software') return 'Admin-Software';
  return 'Kontaktformular';
}

function getContactSubject(data: ContactRequestDto) {
  if (data.source === 'configurator') return `Neue Konfigurator-Anfrage (${data.site})`;
  if (data.source === 'admin-software') return `Neue Admin-Software-Anfrage (${data.site})`;
  return `Neue Kontaktanfrage (${data.site})`;
}

export async function sendContactEmail(data: ContactRequestDto) {
  const lines = [
    `Site: ${data.site}`,
    `Quelle: ${getContactSourceLabel(data.source)}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Firma: ${data.company}` : '',
    data.phone ? `Telefon: ${data.phone}` : '',
    data.message ? `Nachricht: ${data.message}` : '',
    data.config ? `Config:\n${JSON.stringify(data.config, null, 2)}` : '',
    `Consent: ${data.consent ? 'yes' : 'no'}`,
    `Newsletter opt-in: ${data.newsletterOptIn ? 'yes' : 'no'}`,
  ].filter(Boolean);

  await sendEmail({
    subject: getContactSubject(data),
    text: lines.join('\n\n'),
    replyTo: data.email,
  });

  if (!data.email || data.source !== 'configurator') {
    return;
  }

  try {
    const firstName = data.name.trim().split(/\s+/)[0] ?? data.name;
    const subject = 'Wir haben deine Anfrage erhalten';
    const html = [
      `<p>${firstName ? `Hallo ${firstName}` : 'Hallo'},</p>`,
      '<p>vielen Dank für deine Anfrage. Unser Team meldet sich in Kürze bei dir, um die nächsten Schritte zu besprechen.</p>',
      `<p>Wenn du in der Zwischenzeit Fragen hast, erreichst du uns jederzeit unter <a href="mailto:${getSiteConfig(data.site).supportEmail}">${getSiteConfig(data.site).supportEmail}</a>.</p>`,
      `<p>Viele Grüße<br />dein Team von ${getSiteConfig(data.site).emailBrandName}</p>`,
    ].join('\n');

    await sendEmail({
      subject,
      to: data.email,
      text: `${firstName ? `Hallo ${firstName},` : 'Hallo,'}\n\nvielen Dank für deine Anfrage. Unser Team meldet sich in Kürze bei dir.`,
      html: renderEmailLayout(data.site, subject, html),
    });
  } catch (error) {
    console.error('Failed to send configurator confirmation email', error);
  }
}
