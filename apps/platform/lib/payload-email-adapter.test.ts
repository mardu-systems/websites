import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { createPayloadEmailAdapter } from './payload-email-adapter';

describe('createPayloadEmailAdapter', () => {
  test('routes Payload password reset emails through the existing email service', async () => {
    const sentMessages: unknown[] = [];
    const adapter = createPayloadEmailAdapter(async (message) => {
      sentMessages.push(message);
    })({ payload: {} as never });

    await adapter.sendEmail({
      html: '<p>Reset password</p>',
      subject: 'Reset Your Password',
      to: 'admin@example.test',
    });

    assert.deepEqual(sentMessages, [
      {
        html: '<p>Reset password</p>',
        subject: 'Reset Your Password',
        text: undefined,
        to: 'admin@example.test',
      },
    ]);
  });
});
