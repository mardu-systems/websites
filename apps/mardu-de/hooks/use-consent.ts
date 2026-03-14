import * as React from "react";
import type {ConsentPreferences} from "@/types/consent";
import {setConsent} from "@/lib/consent";

const GA_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_gac", "__ga", "__utm"];

function clearGACookies() {
    document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        const trimmed = name?.trim();
        if (trimmed && GA_COOKIE_PREFIXES.some((prefix) => trimmed.startsWith(prefix))) {
            document.cookie = `${trimmed}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        }
    });
}

const DEFAULT_PREFS: ConsentPreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    given: false,
};

export function useConsent() {
    const [prefs, setPrefsState] = React.useState<ConsentPreferences | null>(null);
    const prevAnalytics = React.useRef<boolean | null>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/consent");
                const data = (await res.json()) as ConsentPreferences;
                setPrefsState(data ?? DEFAULT_PREFS);
            } catch {
                setPrefsState(DEFAULT_PREFS);
            }
        })();
    }, []);

    React.useEffect(() => {
        if (!prefs) return;
        const current = prefs.analytics;
        const prev = prevAnalytics.current;

        if (!current && prev) {
            clearGACookies();
        }

        prevAnalytics.current = current;
    }, [prefs]);

    const setPrefs = React.useCallback(async (newPrefs: ConsentPreferences) => {
        setPrefsState(newPrefs);
        await setConsent(newPrefs);
    }, []);

    return {prefs, setPrefs} as const;
}
