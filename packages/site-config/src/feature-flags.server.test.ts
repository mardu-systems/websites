import assert from 'node:assert/strict';
import { afterEach, describe, test } from 'node:test';
import {
  createSiteFeatureFlagsResolver,
  getSiteFeatureFlags,
  type PostHogFlagsClient,
} from './feature-flags';

const env = process.env as Record<string, string | undefined>;

const STATIC_ENV_VARS = [
  'MARDU_DE_ENABLE_BLOG',
  'MARDU_DE_ENABLE_INTEGRATIONS',
  'MARDU_DE_ENABLE_PRODUCTS',
  'POSTHOG_API_KEY',
  'POSTHOG_HOST',
] as const;

const originalEnv = Object.fromEntries(
  STATIC_ENV_VARS.map((key) => [key, env[key]] as const),
) as Record<(typeof STATIC_ENV_VARS)[number], string | undefined>;

afterEach(() => {
  for (const key of STATIC_ENV_VARS) {
    const original = originalEnv[key];

    if (original === undefined) {
      delete env[key];
    } else {
      env[key] = original;
    }
  }
});

function stubClient(flags: Record<string, boolean | string | undefined>): PostHogFlagsClient {
  return {
    evaluateFlags: async () => ({
      getFlag: (key: string) => flags[key],
    }),
  };
}

describe('posthog feature flags', () => {
  test('falls back to static defaults without a PostHog key', async () => {
    delete env.POSTHOG_API_KEY;

    assert.deepEqual(await getSiteFeatureFlags('mardu-de'), {
      blog: false,
      integrations: false,
      products: false,
    });
  });

  test('static env overrides win without a PostHog key', async () => {
    delete env.POSTHOG_API_KEY;
    env.MARDU_DE_ENABLE_BLOG = 'true';

    assert.equal((await getSiteFeatureFlags('mardu-de')).blog, true);
  });

  test('posthog values win over defaults but lose to env overrides', async () => {
    const resolve = createSiteFeatureFlagsResolver(
      stubClient({ blog: true, integrations: false, products: true }),
    );
    env.MARDU_DE_ENABLE_PRODUCTS = 'false';

    assert.deepEqual(await resolve('mardu-de'), {
      blog: true,
      integrations: false,
      products: false,
    });
  });

  test('missing posthog flags fall back to static defaults per key', async () => {
    const resolve = createSiteFeatureFlagsResolver(stubClient({ blog: true }));

    assert.deepEqual(await resolve('mardu-de'), {
      blog: true,
      integrations: false,
      products: false,
    });
  });

  test('a null client behaves like a missing key', async () => {
    const resolve = createSiteFeatureFlagsResolver(null);

    assert.deepEqual(await resolve('mardu-de'), {
      blog: false,
      integrations: false,
      products: false,
    });
  });

  test('posthog errors degrade to static flags', async () => {
    const resolve = createSiteFeatureFlagsResolver({
      evaluateFlags: async () => {
        throw new Error('posthog unreachable');
      },
    });

    assert.deepEqual(await resolve('mardu-de'), {
      blog: false,
      integrations: false,
      products: false,
    });
  });
});
