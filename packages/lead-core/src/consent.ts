import { z } from 'zod';

/**
 * Render-ready consent preference DTO shared by public frontends and API routes.
 */
export const consentPreferencesSchema = z.strictObject({
    necessary: z.literal(true),
    analytics: z.boolean(),
    marketing: z.boolean(),
    given: z.boolean(),
  });

export type ConsentPreferences = z.infer<typeof consentPreferencesSchema>;

export const CONSENT_COOKIE = 'cookie_preferences';

export const DEFAULT_CONSENT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  given: false,
};
