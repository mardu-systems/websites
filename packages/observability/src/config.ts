import type { ErrorEvent } from "@sentry/nextjs";

function parseUrl(value: string): URL | undefined {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

/** Empty disables reporting; configured DSNs must contain a public key and numeric project ID. */
export function resolveGlitchTipDsn(
  value: string | undefined,
): string | undefined {
  const dsn = value?.trim();
  if (!dsn) return undefined;

  const url = parseUrl(dsn);
  if (
    !url ||
    !["https:", "http:"].includes(url.protocol) ||
    !/^\w+$/.test(url.username) ||
    url.password ||
    url.search ||
    url.hash ||
    !/\/\d+$/.test(url.pathname)
  ) {
    throw new Error(
      "Invalid GlitchTip DSN. Expected http(s)://public-key@host/project-id.",
    );
  }
  return url.toString();
}

/** Only the origin is used in connect-src; the public key never appears in the CSP. */
export function getGlitchTipOrigin(value: string | undefined): string {
  const dsn = resolveGlitchTipDsn(value);
  return dsn ? new URL(dsn).origin : "";
}

function sanitizeUrl(value: string): string {
  const url = parseUrl(value);
  if (!url) return value.split(/[?#]/, 1)[0] ?? "";
  url.username = "";
  url.password = "";
  url.search = "";
  url.hash = "";
  return url.toString();
}

function sanitizeMessage(value: string): string {
  return value
    .replace(/https?:\/\/[^\s"'<>]+/g, sanitizeUrl)
    .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, "[email]")
    .replace(/\bBearer\s+[\w.+/=-]+/gi, "Bearer [redacted]")
    .replace(
      /\b(token|password|secret|api[_-]?key)\s*[:=]\s*[^\s,;]+/gi,
      "$1=[redacted]",
    );
}

/** Strip automatically collected sensitive data before any event leaves the application. */
export function sanitizeErrorEvent(event: ErrorEvent): ErrorEvent {
  delete event.user;
  delete event.extra;
  delete event.breadcrumbs;
  // Next stores the original URL (including query tokens) in its own context too.
  if (event.contexts) {
    const nextjs = event.contexts.nextjs;
    event.contexts = nextjs
      ? {
          nextjs: {
            request_path:
              typeof nextjs.request_path === "string"
                ? sanitizeUrl(nextjs.request_path)
                : undefined,
            router_kind: nextjs.router_kind,
            router_path: nextjs.router_path,
            route_type: nextjs.route_type,
          },
        }
      : {};
  }
  if (event.request) {
    event.request = {
      ...(event.request.url ? { url: sanitizeUrl(event.request.url) } : {}),
      ...(event.request.method ? { method: event.request.method } : {}),
    };
  }
  if (event.message) event.message = sanitizeMessage(event.message);
  if (event.logentry) {
    event.logentry = {
      ...(event.logentry.message
        ? { message: sanitizeMessage(event.logentry.message) }
        : {}),
    };
  }
  for (const exception of event.exception?.values ?? []) {
    if (exception.value) exception.value = sanitizeMessage(exception.value);
    for (const frame of exception.stacktrace?.frames ?? []) {
      delete frame.vars;
      delete frame.pre_context;
      delete frame.context_line;
      delete frame.post_context;
      if (frame.filename) frame.filename = sanitizeUrl(frame.filename);
      if (frame.abs_path) frame.abs_path = sanitizeUrl(frame.abs_path);
    }
  }
  return event;
}
