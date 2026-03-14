import { getPayload } from 'payload';
import config from '@/payload.config';
import type {
  ContactRequestDto,
  EmailDeliveryStatus,
  NewsletterRequestDto,
  NewsletterStatus,
  PreorderRequestDto,
  SiteKey,
  TwentySyncStatus,
} from '@mardu/lead-core';
import { buildSubscriptionKey, normalizeNewsletterRole } from '@mardu/lead-core';

type NewsletterSubscriberRecord = {
  id: string | number;
  subscriptionKey: string;
  site: SiteKey;
  email: string;
  role: string;
  status: NewsletterStatus;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  consentModel?: string | null;
};

type ContactLeadRecord = {
  id: string | number;
  newsletterSubscriber?: string | number | null;
};

type PayloadStoreFindResult<T> = {
  docs: T[];
};

type PayloadStoreClient = {
  find: (args: {
    collection: string;
    limit?: number;
    pagination?: boolean;
    depth?: number;
    where: Record<string, unknown>;
  }) => Promise<PayloadStoreFindResult<unknown>>;
  create: (args: {
    collection: string;
    data: Record<string, unknown>;
    depth?: number;
  }) => Promise<unknown>;
  update: (args: {
    collection: string;
    id: string | number;
    data: Record<string, unknown>;
    depth?: number;
  }) => Promise<unknown>;
};

const getPayloadClient = () => getPayload({ config });

async function getLeadStoreClient(): Promise<PayloadStoreClient> {
  return (await getPayloadClient()) as unknown as PayloadStoreClient;
}

async function findOne<T extends object>(
  collection: string,
  where: Record<string, unknown>,
): Promise<T | null> {
  const payload = await getLeadStoreClient();
  const result = await payload.find({
    collection,
    limit: 1,
    pagination: false,
    depth: 0,
    where,
  });

  return (result.docs[0] as T | undefined) ?? null;
}

function now(): string {
  return new Date().toISOString();
}

export async function upsertPendingNewsletterSubscriber(
  input: NewsletterRequestDto,
): Promise<NewsletterSubscriberRecord> {
  const payload = await getLeadStoreClient();
  const normalizedRole = normalizeNewsletterRole(input.role);
  const subscriptionKey = buildSubscriptionKey(input.site, input.email, normalizedRole);
  const existing = await findOne<NewsletterSubscriberRecord>('newsletter-subscribers', {
    subscriptionKey: {
      equals: subscriptionKey,
    },
  });

  const data = {
    subscriptionKey,
    site: input.site,
    email: input.email.trim().toLowerCase(),
    role: normalizedRole,
    status: 'pending' as const,
    firstName: input.firstName,
    lastName: input.lastName,
    company: input.company,
    consentModel: 'double-opt-in',
    unsubscribedAt: null,
    lastConfirmationSentAt: now(),
    twentySyncStatus: 'pending' as const,
    twentyLastError: null,
  };

  if (existing) {
    return (await payload.update({
      collection: 'newsletter-subscribers',
      id: existing.id,
      data,
      depth: 0,
    })) as NewsletterSubscriberRecord;
  }

  return (await payload.create({
    collection: 'newsletter-subscribers',
    data,
    depth: 0,
  })) as NewsletterSubscriberRecord;
}

export async function getNewsletterSubscriberByTokenPayload(input: {
  email: string;
  site: SiteKey;
  role: string;
}): Promise<NewsletterSubscriberRecord | null> {
  const normalizedRole = normalizeNewsletterRole(input.role);
  return findOne<NewsletterSubscriberRecord>('newsletter-subscribers', {
    subscriptionKey: {
      equals: buildSubscriptionKey(input.site, input.email, normalizedRole),
    },
  });
}

export async function confirmNewsletterSubscriber(input: {
  email: string;
  site: SiteKey;
  role: string;
  firstName?: string;
  lastName?: string;
  company?: string;
}): Promise<NewsletterSubscriberRecord> {
  const payload = await getLeadStoreClient();
  const normalizedRole = normalizeNewsletterRole(input.role);
  const existing = await getNewsletterSubscriberByTokenPayload(input);
  const data = {
    subscriptionKey: buildSubscriptionKey(input.site, input.email, normalizedRole),
    site: input.site,
    email: input.email.trim().toLowerCase(),
    role: normalizedRole,
    status: 'confirmed' as const,
    firstName: input.firstName,
    lastName: input.lastName,
    company: input.company,
    consentModel: 'double-opt-in',
    confirmedAt: now(),
    unsubscribedAt: null,
    twentySyncStatus: 'pending' as const,
    twentyLastError: null,
  };

  if (existing) {
    return (await payload.update({
      collection: 'newsletter-subscribers',
      id: existing.id,
      data,
      depth: 0,
    })) as NewsletterSubscriberRecord;
  }

  return (await payload.create({
    collection: 'newsletter-subscribers',
    data,
    depth: 0,
  })) as NewsletterSubscriberRecord;
}

export async function unsubscribeNewsletterSubscriber(input: {
  email: string;
  site: SiteKey;
  role: string;
}): Promise<NewsletterSubscriberRecord | null> {
  const payload = await getLeadStoreClient();
  const existing = await getNewsletterSubscriberByTokenPayload(input);

  if (!existing) {
    return null;
  }

  return (await payload.update({
    collection: 'newsletter-subscribers',
    id: existing.id,
    data: {
      status: 'unsubscribed',
      unsubscribedAt: now(),
      twentySyncStatus: 'pending',
      twentyLastError: null,
    },
    depth: 0,
  })) as NewsletterSubscriberRecord;
}

export async function setNewsletterSubscriberTwentyStatus(
  id: string | number,
  status: TwentySyncStatus,
  error?: string,
) {
  const payload = await getLeadStoreClient();
  await payload.update({
    collection: 'newsletter-subscribers',
    id,
    data: {
      twentySyncStatus: status,
      twentyLastSyncedAt: status === 'synced' ? now() : undefined,
      twentyLastError: error ?? null,
    },
    depth: 0,
  });
}

export async function createContactLead(input: ContactRequestDto): Promise<ContactLeadRecord> {
  const payload = await getLeadStoreClient();
  return (await payload.create({
    collection: 'contact-leads',
    data: {
      site: input.site,
      source: input.source,
      name: input.name,
      email: input.email.trim().toLowerCase(),
      company: input.company,
      phone: input.phone,
      message: input.message,
      consent: input.consent,
      newsletterOptIn: input.newsletterOptIn,
      config: input.config,
      emailDeliveryStatus: 'pending',
      twentySyncStatus: 'pending',
    },
    depth: 0,
  })) as ContactLeadRecord;
}

export async function attachContactLeadToSubscriber(
  leadId: string | number,
  subscriberId: string | number,
) {
  const payload = await getLeadStoreClient();
  await payload.update({
    collection: 'contact-leads',
    id: leadId,
    data: {
      newsletterSubscriber: subscriberId,
    },
    depth: 0,
  });
}

export async function setContactLeadStatuses(input: {
  id: string | number;
  emailDeliveryStatus?: EmailDeliveryStatus;
  twentySyncStatus?: TwentySyncStatus;
  twentyLastError?: string | null;
}) {
  const payload = await getLeadStoreClient();
  await payload.update({
    collection: 'contact-leads',
    id: input.id,
    data: {
      ...(input.emailDeliveryStatus ? { emailDeliveryStatus: input.emailDeliveryStatus } : {}),
      ...(input.twentySyncStatus ? { twentySyncStatus: input.twentySyncStatus } : {}),
      ...(input.twentySyncStatus === 'synced' ? { twentyLastSyncedAt: now() } : {}),
      ...(input.twentyLastError !== undefined ? { twentyLastError: input.twentyLastError } : {}),
    },
    depth: 0,
  });
}

export async function createOrUpdatePreorderRequest(input: PreorderRequestDto) {
  const payload = await getLeadStoreClient();
  const existing = await findOne<{ id: string | number }>('preorder-requests', {
    and: [
      {
        site: {
          equals: input.site,
        },
      },
      {
        email: {
          equals: input.email.trim().toLowerCase(),
        },
      },
    ],
  });

  const data = {
    site: input.site,
    email: input.email.trim().toLowerCase(),
    status: 'received' as const,
    emailDeliveryStatus: 'pending' as const,
  };

  if (existing) {
    return payload.update({
      collection: 'preorder-requests',
      id: existing.id,
      data,
      depth: 0,
    });
  }

  return payload.create({
    collection: 'preorder-requests',
    data,
    depth: 0,
  });
}

export async function setPreorderEmailDeliveryStatus(
  id: string | number,
  status: EmailDeliveryStatus,
) {
  const payload = await getLeadStoreClient();
  await payload.update({
    collection: 'preorder-requests',
    id,
    data: {
      emailDeliveryStatus: status,
    },
    depth: 0,
  });
}
