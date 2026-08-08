import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  consentPreferencesSchema,
  contactRequestSchema,
  newsletterRequestSchema,
  readRequestJson,
} from './index';

describe('lead request contracts', () => {
  test('rejects retired newsletter roles and contact sources', () => {
    assert.equal(
      newsletterRequestSchema.safeParse({ email: 'hello@example.com', role: 'whitepaper_requester' })
        .success,
      false,
    );
    assert.equal(
      contactRequestSchema.safeParse({
        name: 'Ada',
        email: 'ada@example.com',
        source: 'wizard',
      }).success,
      false,
    );
  });

  test('returns a failed result for malformed JSON', async () => {
    const request = new Request('https://www.mardu.de/api/contact', {
      method: 'POST',
      body: '{',
      headers: { 'content-type': 'application/json' },
    });

    assert.deepEqual(await readRequestJson(request), { success: false });
  });

  test('requires necessary consent and rejects extra fields', () => {
    assert.equal(
      consentPreferencesSchema.safeParse({
        necessary: false,
        analytics: false,
        marketing: false,
        given: true,
      }).success,
      false,
    );
  });
});
