import {
  getCreateOneCompanyUrl,
  getFindManyCompaniesUrl,
} from '@/lib/integrations/twenty/generated/endpoints/companies/companies';
import {
  getCreateOnePersonUrl,
  getFindManyPeopleUrl,
  getUpdateOnePersonUrl,
} from '@/lib/integrations/twenty/generated/endpoints/people/people';
import { getCreateOneNoteUrl } from '@/lib/integrations/twenty/generated/endpoints/notes/notes';
import { getCreateOneNoteTargetUrl } from '@/lib/integrations/twenty/generated/endpoints/note-targets/note-targets';
import { normalizePhoneNumber } from '@/lib/phone';
import type { NewsletterCrmEventDto } from '@/types/api/newsletter-crm';
import type { TwentyContactLeadDto } from '@/types/api/twenty-sync';
import { getSiteConfig } from '@mardu/site-config';

type TwentySyncResult = { ok: true; skipped: false } | { ok: false; skipped: true; reason: string };

const DEFAULT_TWENTY_API_BASE_URL = 'https://twenty.mardu.systems/rest';

function getTimeoutMs(): number {
  const parsed = Number(process.env.TWENTY_SYNC_TIMEOUT_MS ?? '6000');
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 6000;
  }
  return Math.floor(parsed);
}

function getRetryCount(): number {
  const parsed = Number(process.env.TWENTY_SYNC_RETRIES ?? '1');
  if (!Number.isFinite(parsed) || parsed < 0) {
    return 1;
  }
  return Math.floor(parsed);
}

function getApiBaseUrl(): string {
  const configured = process.env.TWENTY_API_BASE_URL?.trim();
  if (configured) {
    return configured;
  }
  return DEFAULT_TWENTY_API_BASE_URL;
}

function toAbsoluteUrl(pathname: string): string {
  const normalizedBase = getApiBaseUrl().endsWith('/') ? getApiBaseUrl() : `${getApiBaseUrl()}/`;
  const normalizedPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return new URL(normalizedPath, normalizedBase).toString();
}

function getObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  return value as Record<string, unknown>;
}

function getNestedValue(root: unknown, path: string[]): unknown {
  let current: unknown = root;
  for (const key of path) {
    const obj = getObject(current);
    if (!obj) {
      return undefined;
    }
    current = obj[key];
  }
  return current;
}

function getNestedString(root: unknown, path: string[]): string | undefined {
  const value = getNestedValue(root, path);
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function getNestedArray(root: unknown, path: string[]): unknown[] {
  const value = getNestedValue(root, path);
  return Array.isArray(value) ? value : [];
}

function getFirstIdFromCollection(root: unknown, path: string[]): string | undefined {
  const items = getNestedArray(root, path);
  for (const item of items) {
    const obj = getObject(item);
    if (!obj) {
      continue;
    }
    const id = obj.id;
    if (typeof id === 'string' && id.length > 0) {
      return id;
    }
  }
  return undefined;
}

function splitName(name: string): { firstName: string; lastName?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { firstName: 'Unknown' };
  }

  const parts = trimmed.split(/\s+/);
  const firstName = parts.shift() ?? 'Unknown';
  const lastName = parts.join(' ').trim();
  return lastName ? { firstName, lastName } : { firstName };
}

function extractDomain(email: string): string | undefined {
  const atIndex = email.lastIndexOf('@');
  if (atIndex < 0 || atIndex === email.length - 1) {
    return undefined;
  }
  const domain = email
    .slice(atIndex + 1)
    .trim()
    .toLowerCase();
  if (!domain.includes('.')) {
    return undefined;
  }
  return domain;
}

function buildHeaders(contentType = false): HeadersInit {
  const apiKey = process.env.TWENTY_API_KEY;
  const headers: Record<string, string> = {};
  if (contentType) {
    headers['Content-Type'] = 'application/json';
  }
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  return headers;
}

function isAbortError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }
  const candidate = error as { name?: unknown; code?: unknown };
  return candidate.name === 'AbortError' || candidate.code === 20;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestTwentyOnce(pathname: string, init?: RequestInit): Promise<unknown> {
  const controller = new AbortController();
  const timeoutMs = getTimeoutMs();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(toAbsoluteUrl(pathname), {
      ...init,
      headers: {
        ...buildHeaders(Boolean(init?.body)),
        ...init?.headers,
      },
      signal: controller.signal,
    });

    const body = await res.text().catch(() => '');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}${body ? `: ${body}` : ''}`);
    }

    if (!body) {
      return {};
    }

    return JSON.parse(body) as unknown;
  } catch (error) {
    if (isAbortError(error)) {
      const method = init?.method ?? 'GET';
      throw new Error(
        `Twenty request timed out after ${timeoutMs}ms (${method} ${toAbsoluteUrl(pathname)})`,
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function requestTwenty(pathname: string, init?: RequestInit): Promise<unknown> {
  const attempts = getRetryCount() + 1;
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await requestTwentyOnce(pathname, init);
    } catch (error) {
      lastError = error;
      const shouldRetry = isAbortError(error) || String(error).includes('timed out');
      if (!shouldRetry || attempt === attempts) {
        throw error;
      }
      await wait(150 * attempt);
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Unknown Twenty request error');
}

async function findCompanyIdByName(name: string): Promise<string | undefined> {
  const response = await requestTwenty(
    getFindManyCompaniesUrl({
      filter: `name[eq]:${JSON.stringify(name)}`,
      limit: 1,
    }),
    { method: 'GET' },
  );

  return getFirstIdFromCollection(response, ['data', 'companies']);
}

async function ensureCompany(name: string, emailForDomain?: string): Promise<string | undefined> {
  const existingId = await findCompanyIdByName(name);
  if (existingId) {
    return existingId;
  }

  const domain = emailForDomain ? extractDomain(emailForDomain) : undefined;
  const payload: Record<string, unknown> = { name };
  if (domain) {
    payload.domainName = {
      primaryLinkLabel: domain,
      primaryLinkUrl: `https://${domain}`,
    };
  }

  const created = await requestTwenty(getCreateOneCompanyUrl({ upsert: true }), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return getNestedString(created, ['data', 'createCompany', 'id']);
}

async function findPersonIdByEmail(email: string): Promise<string | undefined> {
  const response = await requestTwenty(
    getFindManyPeopleUrl({
      filter: `emails.primaryEmail[eq]:${JSON.stringify(email)}`,
      limit: 1,
    }),
    { method: 'GET' },
  );

  return getFirstIdFromCollection(response, ['data', 'people']);
}

type EnsurePersonInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  companyId?: string;
  source?: TwentyContactLeadDto['source'];
  site?: TwentyContactLeadDto['site'];
  message?: string;
  newsletterOptIn?: boolean;
  consent?: boolean;
  newsletterStatus?: string;
  newsletterRole?: string;
  newsletterConsentModel?: string;
};

function readCustomFieldKey(envVar: string): string | undefined {
  const value = process.env[envVar]?.trim();
  return value ? value : undefined;
}

async function ensurePerson(input: EnsurePersonInput): Promise<string | undefined> {
  const payload: Record<string, unknown> = {
    emails: {
      primaryEmail: input.email,
    },
  };

  if (input.firstName?.trim() || input.lastName?.trim()) {
    payload.name = {
      ...(input.firstName?.trim() ? { firstName: input.firstName.trim() } : {}),
      ...(input.lastName?.trim() ? { lastName: input.lastName.trim() } : {}),
    };
  } else if (input.fullName?.trim()) {
    payload.name = splitName(input.fullName);
  }

  const normalizedPhone = normalizePhoneNumber(input.phone);
  if (normalizedPhone) {
    payload.phones = {
      primaryPhoneNumber: normalizedPhone,
    };
  }

  if (input.companyId) {
    payload.companyId = input.companyId;
  }

  const messageField = readCustomFieldKey('TWENTY_CONTACT_MESSAGE_FIELD');
  if (messageField && input.message?.trim()) {
    payload[messageField] = input.message.trim();
  }

  const sourceField = readCustomFieldKey('TWENTY_CONTACT_SOURCE_FIELD');
  if (sourceField && input.source) {
    payload[sourceField] = input.source;
  }

  const siteField = readCustomFieldKey('TWENTY_CONTACT_SITE_FIELD');
  if (siteField && input.site) {
    payload[siteField] = input.site;
  }

  const newsletterOptInField = readCustomFieldKey('TWENTY_CONTACT_NEWSLETTER_OPT_IN_FIELD');
  if (newsletterOptInField && typeof input.newsletterOptIn === 'boolean') {
    payload[newsletterOptInField] = input.newsletterOptIn;
  }

  const consentField = readCustomFieldKey('TWENTY_CONTACT_CONSENT_FIELD');
  if (consentField && typeof input.consent === 'boolean') {
    payload[consentField] = input.consent;
  }

  const newsletterStatusField = readCustomFieldKey('TWENTY_NEWSLETTER_STATUS_FIELD');
  if (newsletterStatusField && input.newsletterStatus) {
    payload[newsletterStatusField] = input.newsletterStatus;
  }

  const newsletterRoleField = readCustomFieldKey('TWENTY_NEWSLETTER_ROLE_FIELD');
  if (newsletterRoleField && input.newsletterRole) {
    payload[newsletterRoleField] = input.newsletterRole;
  }

  const newsletterConsentField = readCustomFieldKey('TWENTY_NEWSLETTER_CONSENT_MODEL_FIELD');
  if (newsletterConsentField && input.newsletterConsentModel) {
    payload[newsletterConsentField] = input.newsletterConsentModel;
  }

  const personId = await findPersonIdByEmail(input.email);
  if (personId) {
    const updated = await requestTwenty(getUpdateOnePersonUrl(personId), {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return getNestedString(updated, ['data', 'updatePerson', 'id']) ?? personId;
  }

  const created = await requestTwenty(getCreateOnePersonUrl({ upsert: true }), {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return getNestedString(created, ['data', 'createPerson', 'id']);
}

function getContactSourceLabel(source: TwentyContactLeadDto['source']): string {
  if (source === 'configurator') {
    return 'Konfigurator';
  }
  if (source === 'contact-form') {
    return 'Kontaktformular';
  }
  if (source === 'admin-software') {
    return 'Admin-Software';
  }
  return 'Unbekannt';
}

function getContactSourceUrl(site: TwentyContactLeadDto['site'], source: TwentyContactLeadDto['source']): string | undefined {
  const siteConfig = getSiteConfig(site);
  const path =
    source === 'configurator'
      ? siteConfig.contactPath
      : source === 'admin-software'
        ? '/verwaltungssoftware'
        : siteConfig.contactPath;

  try {
    return new URL(path, siteConfig.origin).toString();
  } catch {
    return undefined;
  }
}

type CreateContactNoteInput = {
  personId: string;
  message: string;
  occurredAt: string;
  site: TwentyContactLeadDto['site'];
  source?: TwentyContactLeadDto['source'];
  consent?: boolean;
  newsletterOptIn?: boolean;
  config?: unknown;
};

function buildBlockNotePayload(text: string): string {
  const lines = text.split('\n').filter((line) => line.trim().length > 0);
  const blocks =
    lines.length > 0
      ? lines.map((line) => ({
          type: 'paragraph',
          content: [{ type: 'text', text: line, styles: {} }],
          props: { textAlignment: 'left' },
          children: [],
        }))
      : [
          {
            type: 'paragraph',
            content: [{ type: 'text', text, styles: {} }],
            props: { textAlignment: 'left' },
            children: [],
          },
        ];

  return JSON.stringify(blocks);
}

async function createContactNote(input: CreateContactNoteInput): Promise<string | undefined> {
  const trimmedMessage = input.message.trim();
  if (!trimmedMessage) {
    return undefined;
  }

  const sourceLabel = getContactSourceLabel(input.source);
  const sourceUrl = getContactSourceUrl(input.site, input.source);
  const titleDate = input.occurredAt.slice(0, 10);
  const title = `Kontaktanfrage (${sourceLabel}, ${titleDate})`;
  const details = [
    `Site: ${input.site}`,
    `Datum: ${input.occurredAt}`,
    `Quelle: ${sourceLabel}`,
    ...(sourceUrl ? [`Quelle-URL: ${sourceUrl}`] : []),
    ...(typeof input.consent === 'boolean' ? [`Consent: ${input.consent ? 'ja' : 'nein'}`] : []),
    ...(typeof input.newsletterOptIn === 'boolean'
      ? [`Newsletter-Opt-in: ${input.newsletterOptIn ? 'ja' : 'nein'}`]
      : []),
    ...(input.config !== undefined ? [`Config: ${JSON.stringify(input.config, null, 2)}`] : []),
  ];
  const markdownBody = `${details.map((line) => `- ${line}`).join('\n')}\n\n${trimmedMessage}`;
  const blocknoteBody = buildBlockNotePayload(markdownBody);

  const createdNote = await requestTwenty(getCreateOneNoteUrl(), {
    method: 'POST',
    body: JSON.stringify({
      title,
      bodyV2: {
        markdown: markdownBody,
        blocknote: blocknoteBody,
      },
    }),
  });

  const noteId =
    getNestedString(createdNote, ['data', 'createNote', 'id']) ??
    getNestedString(createdNote, ['data', 'note', 'id']) ??
    getNestedString(createdNote, ['data', 'id']);

  if (!noteId) {
    return undefined;
  }

  await requestTwenty(getCreateOneNoteTargetUrl(), {
    method: 'POST',
    body: JSON.stringify({
      noteId,
      personId: input.personId,
    }),
  });

  return noteId;
}

export async function syncContactLeadToTwenty(
  payload: TwentyContactLeadDto,
): Promise<TwentySyncResult> {
  const apiKey = process.env.TWENTY_API_KEY;
  if (!apiKey) {
    return { ok: false, skipped: true, reason: 'TWENTY_API_KEY not configured' };
  }

  const normalizedCompany = payload.company?.trim();
  const companyId = normalizedCompany
    ? await ensureCompany(normalizedCompany, payload.email)
    : undefined;
  const personId = await ensurePerson({
    email: payload.email,
    fullName: payload.name,
    phone: payload.phone,
    site: payload.site,
    source: payload.source,
    message: payload.message,
    newsletterOptIn: payload.newsletterOptIn,
    consent: payload.consent,
    companyId,
  });

  if (personId && payload.message?.trim()) {
    try {
      await createContactNote({
        personId,
        message: payload.message,
        occurredAt: new Date().toISOString(),
        site: payload.site,
        source: payload.source,
        consent: payload.consent,
        newsletterOptIn: payload.newsletterOptIn,
        config: payload.config,
      });
    } catch (error) {
      console.error('Failed to create contact note in Twenty', error);
    }
  }

  return { ok: true, skipped: false };
}

export async function sendNewsletterEventToTwenty(
  payload: NewsletterCrmEventDto,
): Promise<TwentySyncResult> {
  const hasApiKey = Boolean(process.env.TWENTY_API_KEY);
  if (!hasApiKey) {
    return {
      ok: false,
      skipped: true,
      reason: 'TWENTY_API_KEY not configured',
    };
  }

  const normalizedCompany = payload.company?.trim();
  const companyId = normalizedCompany
    ? await ensureCompany(normalizedCompany, payload.email)
    : undefined;

  const personId = await ensurePerson({
    email: payload.email,
    site: payload.site,
    ...(payload.firstName ? { firstName: payload.firstName } : {}),
    ...(payload.lastName ? { lastName: payload.lastName } : {}),
    ...(companyId ? { companyId } : {}),
    newsletterStatus: payload.type === 'newsletter_unsubscribed' ? 'unsubscribed' : 'confirmed',
    newsletterRole: payload.role,
    newsletterConsentModel: payload.consentModel,
  });

  if (personId) {
    const title = payload.type === 'newsletter_unsubscribed' ? 'Newsletter-Abmeldung' : 'Newsletter-Bestätigung';
    const lines = [
      `Site: ${payload.site}`,
      `Datum: ${payload.occurredAt}`,
      `Event: ${payload.type}`,
      `Quelle: ${payload.source}`,
      `Rolle: ${payload.role}`,
      `Consent-Model: ${payload.consentModel}`,
      ...(payload.company ? [`Firma: ${payload.company}`] : []),
    ];

    try {
      await createContactNote({
        personId,
        message: title,
        occurredAt: payload.occurredAt,
        site: payload.site,
        source: payload.source === 'whitepaper' ? 'configurator' : 'contact-form',
        config: { details: lines },
        newsletterOptIn: payload.type !== 'newsletter_unsubscribed',
      });
    } catch (error) {
      console.error('Failed to create newsletter event note in Twenty', error);
    }
  }

  return { ok: true, skipped: false };
}
