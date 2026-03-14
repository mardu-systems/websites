"use server";

import {cookies} from "next/headers";
import type {ConsentPreferences} from "@/types/consent";

const CONSENT_COOKIE = "cookie_preferences";

export async function getConsent(): Promise<ConsentPreferences> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(CONSENT_COOKIE)?.value;
    if (!cookie) {
        return {necessary: true, analytics: false, marketing: false, given: false};
    }
    try {
        return JSON.parse(cookie) as ConsentPreferences;
    } catch {
        return {necessary: true, analytics: false, marketing: false, given: false};
    }
}

export async function setConsent(prefs: ConsentPreferences): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set({
        name: CONSENT_COOKIE,
        value: JSON.stringify(prefs),
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365, // 1 Jahr
    });
}
