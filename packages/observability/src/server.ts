import { captureRequestError, flush, isInitialized } from "@sentry/nextjs";
import type { Instrumentation } from "next";
import { reportError } from "./index";

/** Await this in server catch blocks before returning a response on a serverless runtime. */
export async function reportServerError(
  error: unknown,
  operation: string,
): Promise<void> {
  reportError(error, operation);
  console.error(operation, error);
  if (isInitialized()) await flush(2000);
}

/** Next.js server error hook, including nested Server Components, actions and route handlers. */
export const reportRequestError: Instrumentation.onRequestError = async (
  error,
  request,
  context,
) => {
  if (!isInitialized()) return;
  captureRequestError(error, request, context);
  await flush(2000);
};
