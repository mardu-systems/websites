import { NextResponse } from 'next/server';
import { contactRequestSchema } from '@mardu/lead-core';
import { attachContactLeadToSubscriber, createContactLead, setContactLeadStatuses, upsertPendingNewsletterSubscriber } from '@/lib/lead-store';
import { sendContactEmail } from '@/lib/email';
import { syncContactLeadToTwenty } from '@/lib/integrations/twenty';
import { sendNewsletterConfirmationEmail, splitFullName } from '@/lib/newsletter-confirmation';
import { normalizePhoneNumber } from '@/lib/phone';
import { enforcePublicLeadProtection } from '@/lib/abuse-protection';
import type { ContactRequestDto, ContactResponseDto } from '@mardu/lead-core';

export async function POST(req: Request) {
  const json = await req.json();
  let lead: Awaited<ReturnType<typeof createContactLead>> | null = null;
  const rawPhone = typeof json?.phone === 'string' ? json.phone : undefined;
  const normalizedPhone = rawPhone ? normalizePhoneNumber(rawPhone) : undefined;

  if (rawPhone && rawPhone.trim().length > 0 && !normalizedPhone) {
    return NextResponse.json(
      { error: 'Invalid payload', details: { phone: ['Invalid phone number format'] } },
      { status: 400 },
    );
  }

  const parsed = contactRequestSchema.safeParse({
    ...json,
    phone: normalizedPhone,
  });
  if (!parsed.success) {
    const details = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: 'Invalid payload', details }, { status: 400 });
  }

  try {
    const payload: ContactRequestDto = parsed.data;
    const protection = await enforcePublicLeadProtection({
      req,
      endpoint: 'contact',
      site: payload.site,
      token: payload.token,
    });

    if (!protection.ok) {
      return NextResponse.json({ error: protection.error }, { status: protection.status });
    }

    lead = await createContactLead(payload);
    const leadId = lead.id;

    await sendContactEmail(payload);
    await setContactLeadStatuses({ id: leadId, emailDeliveryStatus: 'sent' });

    if (payload.newsletterOptIn) {
      const { firstName, lastName } = splitFullName(payload.name);
      const subscriber = await upsertPendingNewsletterSubscriber({
        email: payload.email,
        site: payload.site,
        role: payload.source === 'configurator' ? 'whitepaper' : 'newsletter',
        firstName,
        lastName,
        ...(payload.company ? { company: payload.company } : {}),
      });
      await attachContactLeadToSubscriber(leadId, subscriber.id);
      void sendNewsletterConfirmationEmail({
        email: payload.email,
        role: payload.source === 'configurator' ? 'whitepaper' : 'newsletter',
        site: payload.site,
        firstName,
        lastName,
        ...(payload.company ? { company: payload.company } : {}),
      }).catch((newsletterError) => {
        console.error('Failed to send newsletter confirmation from contact flow', newsletterError);
      });
    }

    void syncContactLeadToTwenty({
      name: payload.name,
      email: payload.email,
      site: payload.site,
      company: payload.company,
      phone: payload.phone,
      message: payload.message,
      source: payload.source,
      consent: payload.consent,
      newsletterOptIn: payload.newsletterOptIn,
      config: payload.config,
    })
      .then((result) =>
        setContactLeadStatuses({
          id: leadId,
          twentySyncStatus: result.skipped ? 'skipped' : 'synced',
          twentyLastError: result.skipped ? result.reason : null,
        }),
      )
      .catch((crmError) => {
        console.error('Failed to sync contact lead to Twenty', crmError);
        return setContactLeadStatuses({
          id: leadId,
          twentySyncStatus: 'failed',
          twentyLastError: String(crmError),
        });
      });

    const response: ContactResponseDto = { ok: true };
    return NextResponse.json(response);
  } catch (err) {
    console.error('Failed to send contact email', err);
    if (lead) {
      await setContactLeadStatuses({
        id: lead.id,
        emailDeliveryStatus: 'failed',
      });
    }
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
