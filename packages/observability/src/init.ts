import { captureConsoleIntegration, init } from "@sentry/nextjs";
import { resolveGlitchTipDsn, sanitizeErrorEvent } from "./config";

/** Shared settings for the separately initialized browser, Node and Edge clients. */
export function initGlitchTip(options: {
  app: "mardu-de" | "platform";
  dsn: string | undefined;
  environment: string | undefined;
  release: string | undefined;
}): void {
  const dsn = resolveGlitchTipDsn(options.dsn);
  if (!dsn) return;
  const release = options.release?.trim();

  init({
    dsn,
    environment: options.environment?.trim() || process.env.NODE_ENV,
    ...(release ? { release } : {}),
    initialScope: { tags: { app: options.app } },
    sampleRate: 1,
    sendDefaultPii: false,
    sendClientReports: false,
    enableLogs: false,
    // No tracing or replay integrations: this integration collects errors only.
    integrations: (defaults) => [
      ...defaults.filter(
        (integration) =>
          !["BrowserSession", "ProcessSession"].includes(integration.name),
      ),
      captureConsoleIntegration({ levels: ["error"] }),
    ],
    beforeSend: sanitizeErrorEvent,
  });
}
