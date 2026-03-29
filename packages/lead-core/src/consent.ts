/**
 * Render-ready consent preference DTO shared by public frontends and API routes.
 */
export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  given: boolean;
}

export const CONSENT_COOKIE = 'cookie_preferences';

export const DEFAULT_CONSENT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  given: false,
};
