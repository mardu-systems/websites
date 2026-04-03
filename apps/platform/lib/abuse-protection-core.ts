import { createHash } from 'node:crypto';

export type PublicLeadEndpoint = 'contact' | 'newsletter';

export type GuardResult =
  | { ok: true }
  | { ok: false; status: 400 | 429 | 503; error: string };

export type RateLimitConfig = {
  endpoint: string;
  limit: number;
  windowMs: number;
};

export const RATE_LIMITS: Record<PublicLeadEndpoint, RateLimitConfig> = {
  contact: {
    endpoint: '/api/contact',
    limit: 5,
    windowMs: 10 * 60 * 1000,
  },
  newsletter: {
    endpoint: '/api/newsletter',
    limit: 10,
    windowMs: 10 * 60 * 1000,
  },
};

export type AbuseEventReason =
  | 'rate_limited'
  | 'missing_captcha'
  | 'invalid_captcha'
  | 'captcha_misconfigured'
  | 'rate_limit_store_unavailable';

export type RateLimitStoreBypassResult = {
  count: number;
  bypassed: boolean;
};

type ErrorWithMetadata = Error & {
  code?: string;
};

export type AbuseLogEventInput = {
  endpoint: string;
  site: string;
  ipHash: string;
  reason: AbuseEventReason;
  note?: string;
};

export type AbuseProtectionDependencies = {
  incrementRateLimitOrBypassImpl: (input: {
    endpoint: PublicLeadEndpoint;
    site: string;
    ipHash: string;
  }) => Promise<RateLimitStoreBypassResult>;
  verifyCaptchaTokenImpl: (token: string) => Promise<boolean>;
  logAbuseEventImpl: (input: AbuseLogEventInput) => void;
  nodeEnv?: string;
  recaptchaSecret?: string;
};

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

export function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex');
}

export function normalizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

export function isRateLimitStoreUnavailableError(error: unknown): boolean {
  const code =
    typeof error === 'object' && error && 'code' in error ? (error as ErrorWithMetadata).code : undefined;
  if (code === '42P01') {
    return true;
  }

  const message = normalizeErrorMessage(error).toLowerCase();
  return (
    message.includes('abuse_rate_limits') ||
    message.includes('relation "abuse_rate_limits" does not exist') ||
    message.includes("relation 'abuse_rate_limits' does not exist") ||
    message.includes('payload database adapter does not expose an execute() method') ||
    message.includes("cannot read properties of undefined (reading 'execute')") ||
    message.includes("undefined is not an object (evaluating 's.execute')") ||
    message.includes("undefined is not an object (evaluating 'executefrom.execute')")
  );
}

export async function enforcePublicLeadProtectionCore(
  input: {
    req: Request;
    endpoint: PublicLeadEndpoint;
    site: string;
    token?: string;
  },
  deps: AbuseProtectionDependencies,
): Promise<GuardResult> {
  const isDev = deps.nodeEnv === 'development';
  if (isDev) {
    return { ok: true };
  }

  const ipHash = hashIp(getClientIp(input.req));
  const config = RATE_LIMITS[input.endpoint];
  const rateLimit = await deps.incrementRateLimitOrBypassImpl({
    endpoint: input.endpoint,
    site: input.site,
    ipHash,
  });
  const currentCount = rateLimit.count;

  if (currentCount > config.limit) {
    deps.logAbuseEventImpl({
      endpoint: config.endpoint,
      site: input.site,
      ipHash,
      reason: 'rate_limited',
    });
    return { ok: false, status: 429, error: 'Too many requests' };
  }

  if (!input.token) {
    deps.logAbuseEventImpl({
      endpoint: config.endpoint,
      site: input.site,
      ipHash,
      reason: 'missing_captcha',
    });
    return { ok: false, status: 400, error: 'Invalid captcha' };
  }

  if (!deps.recaptchaSecret) {
    deps.logAbuseEventImpl({
      endpoint: config.endpoint,
      site: input.site,
      ipHash,
      reason: 'captcha_misconfigured',
    });
    return { ok: false, status: 503, error: 'Service temporarily unavailable' };
  }

  const captchaValid = await deps.verifyCaptchaTokenImpl(input.token);
  if (!captchaValid) {
    deps.logAbuseEventImpl({
      endpoint: config.endpoint,
      site: input.site,
      ipHash,
      reason: 'invalid_captcha',
    });
    return { ok: false, status: 400, error: 'Invalid captcha' };
  }

  return { ok: true };
}
