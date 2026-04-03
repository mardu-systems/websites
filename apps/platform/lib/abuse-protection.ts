import { getPayload } from 'payload';
import { sql } from '@payloadcms/db-postgres';
import config from '@/payload.config';
import {
  RATE_LIMITS,
  enforcePublicLeadProtectionCore,
  isRateLimitStoreUnavailableError,
  normalizeErrorMessage,
  type AbuseLogEventInput,
  type PublicLeadEndpoint,
  type RateLimitStoreBypassResult,
} from './abuse-protection-core';

type DbExecuteResultRow = {
  request_count?: number | string | null;
};

type PayloadDb = {
  execute: (query: unknown) => Promise<{ rows?: DbExecuteResultRow[] } | DbExecuteResultRow[]>;
};

type PayloadDbContainer = {
  db?: PayloadDb & {
    drizzle?: PayloadDb;
  };
};

const getPayloadClient = () => getPayload({ config });

function getDbExecutor(payload: unknown): PayloadDb {
  const container = payload as PayloadDbContainer;
  const directDb = container.db;

  if (directDb && typeof directDb.execute === 'function') {
    return directDb;
  }

  if (directDb?.drizzle && typeof directDb.drizzle.execute === 'function') {
    return directDb.drizzle;
  }

  throw new Error('Payload database adapter does not expose an execute() method.');
}

function logAbuseEvent(input: AbuseLogEventInput) {
  console.warn('[lead-abuse]', input);
}

async function incrementRateLimit(input: {
  endpoint: PublicLeadEndpoint;
  ipHash: string;
}): Promise<number> {
  const payload = await getPayloadClient();
  const db = getDbExecutor(payload);
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

async function incrementRateLimitOrBypass(input: {
  endpoint: PublicLeadEndpoint;
  site: string;
  ipHash: string;
}): Promise<RateLimitStoreBypassResult> {
  try {
    const count = await incrementRateLimit({
      endpoint: input.endpoint,
      ipHash: input.ipHash,
    });
    return { count, bypassed: false };
  } catch (error) {
    if (!isRateLimitStoreUnavailableError(error)) {
      throw error;
    }

    logAbuseEvent({
      endpoint: RATE_LIMITS[input.endpoint].endpoint,
      site: input.site,
      ipHash: input.ipHash,
      reason: 'rate_limit_store_unavailable',
      note: normalizeErrorMessage(error),
    });
    return { count: 1, bypassed: true };
  }
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

export { isRateLimitStoreUnavailableError } from './abuse-protection-core';

export async function enforcePublicLeadProtection(input: {
  req: Request;
  endpoint: PublicLeadEndpoint;
  site: string;
  token?: string;
}) {
  return enforcePublicLeadProtectionCore(input, {
    incrementRateLimitOrBypassImpl: incrementRateLimitOrBypass,
    verifyCaptchaTokenImpl: verifyCaptchaToken,
    logAbuseEventImpl: logAbuseEvent,
    nodeEnv: process.env.NODE_ENV,
    recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY,
  });
}
