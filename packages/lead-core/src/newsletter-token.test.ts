import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import { createHmac } from 'node:crypto';
import { createNewsletterToken, verifyNewsletterToken } from './index';

const originalSecret = process.env.NEWSLETTER_SECRET;

before(() => {
  process.env.NEWSLETTER_SECRET = 'test-newsletter-secret';
});

after(() => {
  if (originalSecret === undefined) {
    delete process.env.NEWSLETTER_SECRET;
  } else {
    process.env.NEWSLETTER_SECRET = originalSecret;
  }
});

describe('newsletter tokens', () => {
  test('round-trips the current signed payload contract', () => {
    const payload = {
      email: 'hello@example.com',
      site: 'mardu-de' as const,
      role: 'newsletter' as const,
      purpose: 'confirm' as const,
    };

    assert.deepEqual(verifyNewsletterToken(createNewsletterToken(payload)), payload);
  });

  test('rejects malformed current tokens without throwing', () => {
    assert.equal(verifyNewsletterToken('not-json.invalid-signature'), null);
  });

  test('does not accept the retired colon-delimited token format', () => {
    const value = 'hello@example.com:newsletter';
    const signature = createHmac('sha256', 'test-newsletter-secret').update(value).digest('hex');
    const retiredToken = Buffer.from(`${value}:${signature}`).toString('base64url');

    assert.equal(verifyNewsletterToken(retiredToken), null);
  });
});
