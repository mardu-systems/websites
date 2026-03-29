'use client';

import * as React from 'react';
import { DEFAULT_CONSENT_PREFERENCES, type ConsentPreferences } from './consent';
import { setConsent } from './consent-server';

const GA_COOKIE_PREFIXES = ['_ga', '_gid', '_gat', '_gac', '__ga', '__utm'];

function clearGACookies() {
  document.cookie.split(';').forEach((cookie) => {
    const [name] = cookie.split('=');
    const trimmed = name?.trim();
    if (trimmed && GA_COOKIE_PREFIXES.some((prefix) => trimmed.startsWith(prefix))) {
      document.cookie = `${trimmed}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    }
  });
}

/**
 * Shared client hook for fetching and persisting cookie consent.
 */
export function useConsent() {
  const [prefs, setPrefsState] = React.useState<ConsentPreferences | null>(null);
  const prevAnalytics = React.useRef<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/consent');
        const data = (await response.json()) as ConsentPreferences;
        setPrefsState(data ?? DEFAULT_CONSENT_PREFERENCES);
      } catch {
        setPrefsState(DEFAULT_CONSENT_PREFERENCES);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!prefs) {
      return;
    }

    const current = prefs.analytics;
    const previous = prevAnalytics.current;
    if (!current && previous) {
      clearGACookies();
    }

    prevAnalytics.current = current;
  }, [prefs]);

  const setPrefs = React.useCallback(async (newPrefs: ConsentPreferences) => {
    setPrefsState(newPrefs);
    await setConsent(newPrefs);
  }, []);

  return { prefs, setPrefs } as const;
}
