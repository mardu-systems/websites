import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPayload } from 'payload';
import config from '../payload.config.ts';
import { buildSubscriptionKey, normalizeNewsletterRole } from '@mardu/lead-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');
const workspaceRoot = path.resolve(appRoot, '..', '..');

const defaultSources = {
  newsletters: [
    { site: 'mardu-de', file: path.join(workspaceRoot, 'apps/mardu-de/data/newsletter.json') },
    { site: 'mardu-space', file: path.join(workspaceRoot, 'apps/mardu-space/data/newsletter.json') },
    { site: 'platform', file: path.join(workspaceRoot, 'apps/platform/data/newsletter.json') },
  ],
  preorders: [
    { site: 'mardu-de', file: path.join(workspaceRoot, 'apps/mardu-de/data/preorders.json') },
    { site: 'mardu-space', file: path.join(workspaceRoot, 'apps/mardu-space/data/preorders.json') },
    { site: 'platform', file: path.join(workspaceRoot, 'apps/platform/data/preorders.json') },
  ],
};

function readJsonArray(file) {
  if (!file || !existsSync(file)) {
    return [];
  }

  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn(`[migrate:legacy-data] Skipping invalid JSON file: ${file}`, error);
    return [];
  }
}

function asRecord(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
}

function readString(record, keys) {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }

  return undefined;
}

function readBoolean(record, keys) {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === 'boolean') {
      return value;
    }
  }

  return undefined;
}

function normalizeSite(site) {
  return site === 'mardu-space' || site === 'platform' ? site : 'mardu-de';
}

function normalizeNewsletterStatus(record) {
  const status = readString(record, ['status']);
  if (status === 'pending' || status === 'confirmed' || status === 'unsubscribed') {
    return status;
  }

  if (readBoolean(record, ['unsubscribed', 'isUnsubscribed'])) {
    return 'unsubscribed';
  }

  if (readBoolean(record, ['confirmed', 'isConfirmed']) === false) {
    return 'pending';
  }

  return 'confirmed';
}

function normalizeNewsletterEntry(entry, fallbackSite) {
  if (typeof entry === 'string') {
    return {
      email: entry.trim().toLowerCase(),
      site: normalizeSite(fallbackSite),
      role: 'newsletter',
      status: 'confirmed',
    };
  }

  const record = asRecord(entry);
  if (!record) {
    return null;
  }

  const email = readString(record, ['email', 'mail']);
  if (!email) {
    return null;
  }

  return {
    email: email.toLowerCase(),
    site: normalizeSite(readString(record, ['site']) ?? fallbackSite),
    role: normalizeNewsletterRole(readString(record, ['role', 'sourceRole'])),
    status: normalizeNewsletterStatus(record),
    firstName: readString(record, ['firstName', 'firstname', 'vorname']),
    lastName: readString(record, ['lastName', 'lastname', 'nachname']),
    company: readString(record, ['company', 'firma']),
    confirmedAt: readString(record, ['confirmedAt', 'subscribedAt', 'createdAt', 'created_at']),
    unsubscribedAt: readString(record, ['unsubscribedAt']),
  };
}

function normalizePreorderEntry(entry, fallbackSite) {
  if (typeof entry === 'string') {
    return {
      email: entry.trim().toLowerCase(),
      site: normalizeSite(fallbackSite),
    };
  }

  const record = asRecord(entry);
  if (!record) {
    return null;
  }

  const email = readString(record, ['email', 'mail']);
  if (!email) {
    return null;
  }

  return {
    email: email.toLowerCase(),
    site: normalizeSite(readString(record, ['site']) ?? fallbackSite),
    createdAt: readString(record, ['createdAt', 'created_at']),
  };
}

async function findOne(payload, collection, where) {
  const result = await payload.find({
    collection,
    where,
    limit: 1,
    pagination: false,
    depth: 0,
  });

  return result.docs[0] ?? null;
}

async function importNewsletterEntry(payload, item) {
  const subscriptionKey = buildSubscriptionKey(item.site, item.email, item.role);
  const existing = await findOne(payload, 'newsletter-subscribers', {
    subscriptionKey: {
      equals: subscriptionKey,
    },
  });

  const data = {
    subscriptionKey,
    site: item.site,
    email: item.email,
    role: item.role,
    status: item.status,
    firstName: item.firstName,
    lastName: item.lastName,
    company: item.company,
    consentModel: 'double-opt-in',
    confirmedAt: item.status === 'confirmed' ? item.confirmedAt ?? new Date().toISOString() : null,
    unsubscribedAt: item.status === 'unsubscribed' ? item.unsubscribedAt ?? new Date().toISOString() : null,
    lastConfirmationSentAt: item.confirmedAt ?? null,
    twentySyncStatus: 'pending',
    twentyLastError: null,
  };

  if (existing) {
    await payload.update({
      collection: 'newsletter-subscribers',
      id: existing.id,
      data,
      depth: 0,
    });
    return 'updated';
  }

  await payload.create({
    collection: 'newsletter-subscribers',
    data,
    depth: 0,
  });
  return 'created';
}

async function importPreorderEntry(payload, item) {
  const existing = await findOne(payload, 'preorder-requests', {
    and: [
      {
        site: {
          equals: item.site,
        },
      },
      {
        email: {
          equals: item.email,
        },
      },
    ],
  });

  const data = {
    site: item.site,
    email: item.email,
    status: 'received',
    emailDeliveryStatus: 'pending',
    ...(item.createdAt ? { createdAt: item.createdAt } : {}),
  };

  if (existing) {
    await payload.update({
      collection: 'preorder-requests',
      id: existing.id,
      data,
      depth: 0,
    });
    return 'updated';
  }

  await payload.create({
    collection: 'preorder-requests',
    data,
    depth: 0,
  });
  return 'created';
}

async function main() {
  const payload = await getPayload({ config });
  const summary = {
    newsletterCreated: 0,
    newsletterUpdated: 0,
    preorderCreated: 0,
    preorderUpdated: 0,
  };

  for (const source of defaultSources.newsletters) {
    for (const entry of readJsonArray(source.file)) {
      const normalized = normalizeNewsletterEntry(entry, source.site);
      if (!normalized) {
        continue;
      }

      const result = await importNewsletterEntry(payload, normalized);
      if (result === 'created') {
        summary.newsletterCreated += 1;
      } else {
        summary.newsletterUpdated += 1;
      }
    }
  }

  const legacySubscribersExport = process.env.SPACE_SUBSCRIBERS_EXPORT;
  if (legacySubscribersExport) {
    for (const entry of readJsonArray(legacySubscribersExport)) {
      const normalized = normalizeNewsletterEntry(entry, 'mardu-space');
      if (!normalized) {
        continue;
      }

      const result = await importNewsletterEntry(payload, normalized);
      if (result === 'created') {
        summary.newsletterCreated += 1;
      } else {
        summary.newsletterUpdated += 1;
      }
    }
  }

  for (const source of defaultSources.preorders) {
    for (const entry of readJsonArray(source.file)) {
      const normalized = normalizePreorderEntry(entry, source.site);
      if (!normalized) {
        continue;
      }

      const result = await importPreorderEntry(payload, normalized);
      if (result === 'created') {
        summary.preorderCreated += 1;
      } else {
        summary.preorderUpdated += 1;
      }
    }
  }

  console.info('[migrate:legacy-data] Done', summary);
}

main().catch((error) => {
  console.error('[migrate:legacy-data] Failed', error);
  process.exitCode = 1;
});
