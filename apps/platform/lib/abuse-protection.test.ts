import assert from 'node:assert/strict';
import { afterEach, describe, test } from 'node:test';
import {
  enforcePublicLeadProtectionCore,
  isRateLimitStoreUnavailableError,
} from './abuse-protection-core';

const env = process.env as Record<string, string | undefined>;
const originalNodeEnv = env.NODE_ENV;
const originalRecaptchaSecret = env.RECAPTCHA_SECRET_KEY;

function createRequest() {
  return new Request('https://platform.mardu.de/api/newsletter', {
    method: 'POST',
    headers: {
      'x-forwarded-for': '203.0.113.10',
    },
  });
}

afterEach(() => {
  if (originalNodeEnv === undefined) {
    delete env.NODE_ENV;
  } else {
    env.NODE_ENV = originalNodeEnv;
  }

  if (originalRecaptchaSecret === undefined) {
    delete env.RECAPTCHA_SECRET_KEY;
  } else {
    env.RECAPTCHA_SECRET_KEY = originalRecaptchaSecret;
  }
});

describe('isRateLimitStoreUnavailableError', () => {
  test('matches missing abuse_rate_limits relation', () => {
    assert.equal(
      isRateLimitStoreUnavailableError({
        code: '42P01',
        message: 'relation "abuse_rate_limits" does not exist',
      }),
      true,
    );
  });

  test('ignores unrelated database errors', () => {
    assert.equal(
      isRateLimitStoreUnavailableError({
        code: '23505',
        message: 'duplicate key value violates unique constraint',
      }),
      false,
    );
  });
});

describe('enforcePublicLeadProtectionCore', () => {
  test('fails open when the rate-limit store is unavailable and captcha passes', async () => {
    env.NODE_ENV = 'production';
    env.RECAPTCHA_SECRET_KEY = 'test-secret';

    const result = await enforcePublicLeadProtectionCore(
      {
        req: createRequest(),
        endpoint: 'newsletter',
        site: 'mardu-de',
        token: 'captcha-token',
      },
      {
        incrementRateLimitOrBypassImpl: async () => ({ count: 1, bypassed: true }),
        verifyCaptchaTokenImpl: async () => true,
        logAbuseEventImpl: () => undefined,
        nodeEnv: env.NODE_ENV,
        recaptchaSecret: env.RECAPTCHA_SECRET_KEY,
      },
    );

    assert.deepEqual(result, { ok: true });
  });

  test('returns invalid captcha when token is missing', async () => {
    env.NODE_ENV = 'production';
    env.RECAPTCHA_SECRET_KEY = 'test-secret';

    const result = await enforcePublicLeadProtectionCore(
      {
        req: createRequest(),
        endpoint: 'newsletter',
        site: 'mardu-de',
      },
      {
        incrementRateLimitOrBypassImpl: async () => ({ count: 1, bypassed: false }),
        verifyCaptchaTokenImpl: async () => true,
        logAbuseEventImpl: () => undefined,
        nodeEnv: env.NODE_ENV,
        recaptchaSecret: env.RECAPTCHA_SECRET_KEY,
      },
    );

    assert.deepEqual(result, { ok: false, status: 400, error: 'Invalid captcha' });
  });

  test('returns service unavailable when recaptcha is not configured', async () => {
    env.NODE_ENV = 'production';
    delete env.RECAPTCHA_SECRET_KEY;

    const result = await enforcePublicLeadProtectionCore(
      {
        req: createRequest(),
        endpoint: 'newsletter',
        site: 'mardu-de',
        token: 'captcha-token',
      },
      {
        incrementRateLimitOrBypassImpl: async () => ({ count: 1, bypassed: false }),
        verifyCaptchaTokenImpl: async () => true,
        logAbuseEventImpl: () => undefined,
        nodeEnv: env.NODE_ENV,
        recaptchaSecret: env.RECAPTCHA_SECRET_KEY,
      },
    );

    assert.deepEqual(result, {
      ok: false,
      status: 503,
      error: 'Service temporarily unavailable',
    });
  });

  test('returns too many requests when the rate limit is exceeded', async () => {
    env.NODE_ENV = 'production';
    env.RECAPTCHA_SECRET_KEY = 'test-secret';

    const result = await enforcePublicLeadProtectionCore(
      {
        req: createRequest(),
        endpoint: 'newsletter',
        site: 'mardu-de',
        token: 'captcha-token',
      },
      {
        incrementRateLimitOrBypassImpl: async () => ({ count: 11, bypassed: false }),
        verifyCaptchaTokenImpl: async () => true,
        logAbuseEventImpl: () => undefined,
        nodeEnv: env.NODE_ENV,
        recaptchaSecret: env.RECAPTCHA_SECRET_KEY,
      },
    );

    assert.deepEqual(result, { ok: false, status: 429, error: 'Too many requests' });
  });
});
