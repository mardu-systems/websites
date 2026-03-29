'use server';

import { cookies } from 'next/headers';
import {
  CONSENT_COOKIE,
  DEFAULT_CONSENT_PREFERENCES,
  type ConsentPreferences,
} from './consent';

/**
 * Reads the persisted consent DTO from the current request cookie jar.
 */
export async function getConsent(): Promise<ConsentPreferences> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(CONSENT_COOKIE)?.value;
  if (!cookie) {
    return DEFAULT_CONSENT_PREFERENCES;
  }

  try {
    return JSON.parse(cookie) as ConsentPreferences;
  } catch {
    return DEFAULT_CONSENT_PREFERENCES;
  }
}

/**
 * Persists the consent DTO in the shared cookie format used by all public apps.
 */
export async function setConsent(preferences: ConsentPreferences): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: CONSENT_COOKIE,
    value: JSON.stringify(preferences),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365,
  });
}
