import { captureException, isInitialized } from "@sentry/nextjs";

/** Capture handled errors. Context must be a static operation label, never request/user data. */
export function reportError(
  error: unknown,
  operation?: string,
): string | undefined {
  if (!isInitialized()) return undefined;
  return captureException(error, {
    tags: operation ? { operation } : undefined,
  });
}
