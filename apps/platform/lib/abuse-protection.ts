import { createHash } from 'node:crypto';
import { getPayload } from 'payload';
import { sql } from '@payloadcms/db-postgres';
import config from '@/payload.config';

type PublicLeadEndpoint = 'contact' | 'newsletter';

type GuardResult =
  | { ok: true }
  | { ok: false; status: 400 | 429 | 503; error: string };

type RateLimitConfig = {
  endpoint: string;
  limit: number;
  windowMs: number;
};

const RATE_LIMITS: Record<PublicLeadEndpoint, RateLimitConfig> = {
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

type DbExecuteResultRow = {
  request_count?: number | string | null;
};

type PayloadDb = {
  execute: (query: unknown) => Promise<{ rows?: DbExecuteResultRow[] } | DbExecuteResultRow[]>;
};

const getPayloadClient = () => getPayload({ config });

function getClientIp(req: Request): string {
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

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex');
}

function logAbuseEvent(input: {
  endpoint: string;
  site: string;
  ipHash: string;
  reason: 'rate_limited' | 'missing_captcha' | 'invalid_captcha' | 'captcha_misconfigured';
}) {
  console.warn('[lead-abuse]', input);
}

async function incrementRateLimit(input: {
  endpoint: PublicLeadEndpoint;
  ipHash: string;
}): Promise<number> {
  const payload = await getPayloadClient();
  const db = (payload as unknown as { db: PayloadDb }).db;
  const config = RATE_LIMITS[input.endpoint];
  const windowSeconds = Math.floor(config.windowMs / 1000);

  const result = await db.execute(sql`
    INSERT INTO abuse_rate_limits ("endpoint", "ip_hash", "window_start", "request_count", "last_seen_at", "created_at", "updated_at")
    VALUES (${config.endpoint}, ${input.ipHash}, now(), 1, now(), now(), now())
    ON CONFLICT ("endpoint", "ip_hash")
    DO UPDATE SET
      "request_count" = CASE
        WHEN abuse_rate_limits."window_start" <= now() - (${windowSeconds} * interval '1 second') THEN 1
        ELSE abuse_rate_limits."request_count" + 1
      END,
      "window_start" = CASE
        WHEN abuse_rate_limits."window_start" <= now() - (${windowSeconds} * interval '1 second') THEN now()
        ELSE abuse_rate_limits."window_start"
      END,
      "last_seen_at" = now(),
      "updated_at" = now()
    RETURNING "request_count";
  `);

  const rows = Array.isArray(result) ? result : result.rows ?? [];
  const count = rows[0]?.request_count;

  if (typeof count === 'number') {
    return count;
  }

  if (typeof count === 'string') {
    return Number.parseInt(count, 10);
  }

  return 1;
}

async function verifyCaptchaToken(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return false;
  }

  const captchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });

  if (!captchaRes.ok) {
    return false;
  }

  const captchaJson = (await captchaRes.json().catch(() => null)) as { success?: boolean } | null;
  return captchaJson?.success === true;
}

export async function enforcePublicLeadProtection(input: {
  req: Request;
  endpoint: PublicLeadEndpoint;
  site: string;
  token?: string;
}): Promise<GuardResult> {
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    return { ok: true };
  }

  const ipHash = hashIp(getClientIp(input.req));
  const config = RATE_LIMITS[input.endpoint];
  const currentCount = await incrementRateLimit({ endpoint: input.endpoint, ipHash });

  if (currentCount > config.limit) {
    logAbuseEvent({
      endpoint: config.endpoint,
      site: input.site,
      ipHash,
      reason: 'rate_limited',
    });
    return { ok: false, status: 429, error: 'Too many requests' };
  }

  if (!input.token) {
    logAbuseEvent({
      endpoint: config.endpoint,
      site: input.site,
      ipHash,
      reason: 'missing_captcha',
    });
    return { ok: false, status: 400, error: 'Invalid captcha' };
  }

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    logAbuseEvent({
      endpoint: config.endpoint,
      site: input.site,
      ipHash,
      reason: 'captcha_misconfigured',
    });
    return { ok: false, status: 503, error: 'Service temporarily unavailable' };
  }

  const captchaValid = await verifyCaptchaToken(input.token);
  if (!captchaValid) {
    logAbuseEvent({
      endpoint: config.endpoint,
      site: input.site,
      ipHash,
      reason: 'invalid_captcha',
    });
    return { ok: false, status: 400, error: 'Invalid captcha' };
  }

  return { ok: true };
}
