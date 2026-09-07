import { reportServerError } from '@mardu/observability/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactRequestSchema, readRequestJson } from '@mardu/lead-core';
import { normalizePhoneNumber } from '@mardu/lead-core/phone';
import {
  attachContactLeadToSubscriber,
  createContactLead,
  setContactLeadStatuses,
  upsertPendingNewsletterSubscriber,
} from '@/lib/lead-store';
import { sendContactEmail } from '@/lib/email';
import { syncContactLeadToTwenty } from '@/lib/integrations/twenty';
import { sendNewsletterConfirmationEmail, splitFullName } from '@/lib/newsletter-confirmation';
import { enforcePublicLeadProtection } from '@/lib/abuse-protection';
import type { ContactRequestDto, ContactResponseDto } from '@mardu/lead-core';

const PhoneSchema = z
  .string()
  .optional()
  .refine(
    (value) => value == null || value.trim().length === 0 || Boolean(normalizePhoneNumber(value)),
    'Invalid phone number format',
  )
  .transform((value) => normalizePhoneNumber(value));

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const jsonResult = await readRequestJson(req);
  if (!jsonResult.success) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = contactRequestSchema
    .omit({ site: true })
    .extend({ phone: PhoneSchema })
    .safeParse(jsonResult.data);
  if (!parsed.success) {
    const details = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ error: 'Invalid payload', details }, { status: 400 });
  }

  let lead: Awaited<ReturnType<typeof createContactLead>> | null = null;

  try {
    const payload: ContactRequestDto = {
      ...parsed.data,
      site: 'mardu-de',
    };
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
        role: 'newsletter',
        firstName,
        lastName,
        ...(payload.company ? { company: payload.company } : {}),
      });
      await attachContactLeadToSubscriber(leadId, subscriber.id);
      void sendNewsletterConfirmationEmail({
        email: payload.email,
        role: 'newsletter',
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
    await reportServerError(err, 'contact');
    if (lead) {
      await setContactLeadStatuses({
        id: lead.id,
        emailDeliveryStatus: 'failed',
      });
    }
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
