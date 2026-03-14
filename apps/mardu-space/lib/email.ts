import { Resend } from 'resend';

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

  const fromHeader = from.includes('<') ? from : `Mardu.space <${from}>`;

  if (!apiKey || !from || !recipient) {
    throw new Error('Email service not configured');
  }

  // Bestimme den Content-Type und erstelle entsprechendes Objekt
  let emailData;

  if (html) {
    emailData = {
      from: fromHeader,
      to: recipient,
      subject,
      html,
      ...(replyTo && { reply_to: replyTo }),
    };
  } else if (text) {
    emailData = {
      from: fromHeader,
      to: recipient,
      subject,
      text,
      ...(replyTo && { reply_to: replyTo }),
    };
  } else {
    emailData = {
      from: fromHeader,
      to: recipient,
      subject,
      text: subject,
      ...(replyTo && { reply_to: replyTo }),
    };
  }

  const { error } = await resend.emails.send(emailData);

  if (error) {
    throw new Error(
      `Failed to send email: ${error.name ?? 'Error'} ${error.message ?? String(error)}`,
    );
  }
}

export function renderEmailLayout(title: string, content: string): string {
  return `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <main style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background-color:#f9f9f9;">
        <div style="text-align:center;margin-bottom:24px;">
            <img src="https://mardu.space/marduspace_logo_bg_white.svg" alt="Mardu.space Logo" style="width:150px;height:auto;" />
        </div>
        <h1 style="text-align:center;font-size:24px;font-weight:bold;margin-bottom:24px;color:#333;">${title}</h1>
        <div style="font-size:16px;line-height:1.5;color:#333;">${content}</div>
        <footer style="margin-top:32px;font-size:12px;color:#666;text-align:center;line-height:1.4;">
            <p>Mardu GmbH · Alter Schlachthof 39 · 76131 Karlsruhe</p>
            <p>E-Mail: <a href="mailto:info@mardu.de" style="color:#666;text-decoration:underline;">info@mardu.de</a></p>
            <p>Du erhältst diese E-Mail, weil du uns kontaktiert hast. Wenn du sie nicht erwartet hast, kannst du sie ignorieren oder <a href="mailto:info@mardu.de" style="color:#666;text-decoration:underline;">uns Bescheid geben</a>.</p>
        </footer>
    </main>
</body>
</html>`;
}

export type ContactEmailData = {
  name: string;
  email: string;
  company?: string;
  message?: string;
  config?: unknown;
  source?: 'contact-form' | 'configurator' | 'admin-software';
  phone?: string;
  consent?: boolean;
  newsletterOptIn?: boolean;
};

export async function sendContactEmail(data: ContactEmailData) {
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : '',
    data.phone ? `Phone: ${data.phone}` : '',
    data.message ? `Message: ${data.message}` : '',
    data.config ? `Config:\n${JSON.stringify(data.config, null, 2)}` : '',
    typeof data.consent === 'boolean' ? `Consent: ${data.consent ? 'yes' : 'no'}` : '',
    typeof data.newsletterOptIn === 'boolean'
      ? `Newsletter opt-in: ${data.newsletterOptIn ? 'yes' : 'no'}`
      : '',
  ].filter(Boolean);

  const subject = (() => {
    if (data.source === 'contact-form') return 'Neue Kontaktanfrage';
    if (data.source === 'admin-software') return 'Neue Demo-Anfrage Verwaltungssoftware';
    if (data.source === 'configurator' || data.config) return 'Neue Konfigurator-Anfrage';
    return 'Neue Anfrage';
  })();

  await sendEmail({
    subject,
    text: lines.join('\n\n'),
    replyTo: data.email,
  });

  if (data.email && (data.source === 'configurator' || data.config)) {
    try {
      const firstName = data.name.trim().split(/\s+/)[0] ?? data.name;
      const confirmationSubject = 'Wir haben deine Konfigurator-Anfrage erhalten';
      const textLines = [
        firstName ? `Hallo ${firstName},` : 'Hallo,',
        '',
        'vielen Dank für deine Anfrage über unseren Konfigurator. Unser Team meldet sich in Kürze bei dir, um die nächsten Schritte zu besprechen.',
        '',
        'Wenn du in der Zwischenzeit Fragen hast, erreichst du uns jederzeit unter info@mardu.de.',
        '',
        'Viele Grüße',
        'dein Mardu.space Team',
      ];

      const htmlContent = [
        `<p>${firstName ? `Hallo ${firstName}` : 'Hallo'},</p>`,
        '<p>vielen Dank für deine Anfrage über unseren Konfigurator. Unser Team meldet sich in Kürze bei dir, um die nächsten Schritte zu besprechen.</p>',
        '<p>Wenn du in der Zwischenzeit Fragen hast, erreichst du uns jederzeit unter <a href="mailto:info@mardu.de">info@mardu.de</a>.</p>',
        '<p>Viele Grüße<br />dein Mardu.space Team</p>',
      ].join('\n');

      await sendEmail({
        subject: confirmationSubject,
        to: data.email,
        text: textLines.join('\n'),
        html: renderEmailLayout(confirmationSubject, htmlContent),
      });
    } catch (err) {
      console.error('Failed to send configurator confirmation email', err);
    }
  }
}
