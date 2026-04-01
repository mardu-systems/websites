import { createHmac } from 'node:crypto';
import { z } from 'zod';
export {
  CONSENT_COOKIE,
  DEFAULT_CONSENT_PREFERENCES,
  type ConsentPreferences,
} from './consent';
export { getConsent, setConsent } from './consent-server';
export { useConsent } from './use-consent';
export { RecaptchaProvider, useRecaptcha, type RecaptchaProviderProps } from './recaptcha';
export {
  ContactForm,
  createContactSchema,
  type ContactFormProps,
  type ContactValues,
  type ExecuteRecaptcha,
  type NormalizePhoneNumber,
} from './contact-form';

export const siteSchema = z.enum(['mardu-de', 'mardu-space']);
export type SiteKey = z.infer<typeof siteSchema>;

export const newsletterRoleSchema = z
  .enum(['newsletter', 'whitepaper', 'whitepaper_requester'])
  .transform((role) => (role === 'whitepaper_requester' ? 'whitepaper' : role));
export type NewsletterSignupRole = 'newsletter' | 'whitepaper';

export const newsletterTokenPurposeSchema = z.enum([
  'confirm',
  'unsubscribe',
  'whitepaper-download',
]);
export type NewsletterTokenPurpose = z.infer<typeof newsletterTokenPurposeSchema>;

export const newsletterStatusSchema = z.enum(['pending', 'confirmed', 'unsubscribed']);
export type NewsletterStatus = z.infer<typeof newsletterStatusSchema>;

export const twentySyncStatusSchema = z.enum(['pending', 'synced', 'failed', 'skipped']);
export type TwentySyncStatus = z.infer<typeof twentySyncStatusSchema>;

export const emailDeliveryStatusSchema = z.enum(['pending', 'sent', 'failed']);
export type EmailDeliveryStatus = z.infer<typeof emailDeliveryStatusSchema>;

export const contactSourceInputSchema = z.enum([
  'contact',
  'wizard',
  'contact-form',
  'configurator',
  'admin-software',
]);

export const contactSourceSchema = contactSourceInputSchema.transform((source) => {
  if (source === 'contact') return 'contact-form';
  if (source === 'wizard') return 'configurator';
  return source;
});
export type ContactSource = 'contact-form' | 'configurator' | 'admin-software';

const optionalTrimmedString = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined));

export const newsletterRequestSchema = z.object({
  email: z.string().trim().email(),
  site: siteSchema.default('mardu-de'),
  role: z
    .string()
    .trim()
    .min(1)
    .transform((role) => (role === 'whitepaper_requester' ? 'whitepaper' : role)),
  firstName: optionalTrimmedString(100),
  lastName: optionalTrimmedString(100),
  company: optionalTrimmedString(150),
  token: optionalTrimmedString(4096),
});

export const contactRequestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  company: optionalTrimmedString(150),
  phone: optionalTrimmedString(50),
  message: optionalTrimmedString(5000),
  consent: z.boolean().optional().default(false),
  newsletterOptIn: z.boolean().optional().default(false),
  site: siteSchema.default('mardu-de'),
  source: contactSourceSchema.default('contact-form'),
  token: optionalTrimmedString(4096),
  config: z.unknown().optional(),
});

export const preorderRequestSchema = z.object({
  email: z.string().trim().email(),
  site: siteSchema.default('mardu-de'),
});

export const newsletterTokenPayloadSchema = z.object({
  email: z.string().trim().email(),
  site: siteSchema,
  role: z.string().trim().min(1),
  purpose: newsletterTokenPurposeSchema,
  firstName: optionalTrimmedString(100),
  lastName: optionalTrimmedString(100),
  company: optionalTrimmedString(150),
});

export interface NewsletterRequestDto {
  email: string;
  site: SiteKey;
  role: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  token?: string;
}

export interface ContactRequestDto {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  consent: boolean;
  newsletterOptIn: boolean;
  site: SiteKey;
  source: ContactSource;
  token?: string;
  config?: unknown;
}

export interface PreorderRequestDto {
  email: string;
  site: SiteKey;
}

export interface NewsletterTokenPayload {
  email: string;
  site: SiteKey;
  role: string;
  purpose: NewsletterTokenPurpose;
  firstName?: string;
  lastName?: string;
  company?: string;
}

export type NewsletterResponseDto = { ok: true };
export type ContactResponseDto = { ok: true };
export type PreorderResponseDto = { ok: true };

/**
 * API error DTO returned by public contact endpoints.
 */
export interface ContactErrorResponseDto {
  error: string;
  details?: Record<string, string[] | undefined>;
}

/**
 * API error DTO returned by public newsletter endpoints.
 */
export interface NewsletterErrorResponseDto {
  error: string;
}

function getSecret() {
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret) {
    throw new Error('Missing newsletter secret');
  }
  return secret;
}

function sign(value: string): string {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function createNewsletterToken(payload: NewsletterTokenPayload): string {
  const validated = newsletterTokenPayloadSchema.parse(payload);
  const serialized = JSON.stringify(validated);
  const encoded = Buffer.from(serialized).toString('base64url');
  return `${encoded}.${sign(serialized)}`;
}

function parseCurrentToken(token: string): NewsletterTokenPayload | null {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const decoded = Buffer.from(encodedPayload, 'base64url').toString('utf8');
  if (sign(decoded) !== signature) {
    return null;
  }

  const parsed = JSON.parse(decoded) as unknown;
  const result = newsletterTokenPayloadSchema.safeParse(parsed);
  return result.success ? result.data : null;
}

function parseLegacyToken(token: string, fallbackSite?: SiteKey): NewsletterTokenPayload | null {
  try {
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) {
      base64 += '='.repeat(4 - pad);
    }

    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const [email, role, signature] = decoded.split(':');
    if (!email || !role || !signature) {
      return null;
    }

    const expected = createHmac('sha256', getSecret()).update(`${email}:${role}`).digest('hex');
    if (expected !== signature) {
      return null;
    }

    const normalizedRole = role === 'whitepaper_requester' ? 'whitepaper' : role;
    const purpose: NewsletterTokenPurpose =
      normalizedRole === 'unsubscribe' ? 'unsubscribe' : 'confirm';
    const safeRole = normalizedRole === 'unsubscribe' ? 'newsletter' : normalizedRole;

    return {
      email,
      role: safeRole,
      purpose,
      site: fallbackSite ?? 'mardu-de',
      firstName: undefined,
      lastName: undefined,
      company: undefined,
    };
  } catch {
    return null;
  }
}

export function verifyNewsletterToken(token: string, fallbackSite?: SiteKey): NewsletterTokenPayload | null {
  return parseCurrentToken(token) ?? parseLegacyToken(token, fallbackSite);
}

export function buildSubscriptionKey(site: SiteKey, email: string, role: string): string {
  return `${site}:${role.toLowerCase()}:${email.trim().toLowerCase()}`;
}

export function normalizeNewsletterRole(role: string): string {
  return role === 'whitepaper_requester' ? 'whitepaper' : role.trim().toLowerCase();
}
