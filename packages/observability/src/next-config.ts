import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";
import { resolveGlitchTipDsn } from "./config";

/** Apply Next instrumentation and optionally upload source maps to the configured GlitchTip. */
export function withGlitchTip(nextConfig: NextConfig): NextConfig {
  resolveGlitchTipDsn(process.env.NEXT_PUBLIC_GLITCHTIP_DSN);
  resolveGlitchTipDsn(process.env.GLITCHTIP_DSN);
  const authToken = process.env.GLITCHTIP_AUTH_TOKEN?.trim();
  const url = process.env.GLITCHTIP_URL?.trim();
  const org = process.env.GLITCHTIP_ORG?.trim();
  const project = process.env.GLITCHTIP_PROJECT?.trim();
  if (authToken && (!url || !org || !project)) {
    throw new Error(
      "GlitchTip source maps require GLITCHTIP_URL, GLITCHTIP_ORG and GLITCHTIP_PROJECT.",
    );
  }

  return withSentryConfig(nextConfig, {
    authToken,
    org,
    project,
    sentryUrl: url,
    telemetry: false,
    silent: true,
    sourcemaps: { disable: !authToken, deleteSourcemapsAfterUpload: true },
    release: {
      name: process.env.NEXT_PUBLIC_GLITCHTIP_RELEASE?.trim() || undefined,
    },
  });
}
