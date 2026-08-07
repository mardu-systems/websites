import assert from 'node:assert/strict';
import { afterEach, describe, test } from 'node:test';
import {
  ContentApiError,
  fetchPayloadCollection,
  mapPayloadDocumentsStrict,
} from './content-api';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe('fetchPayloadCollection', () => {
  test('accepts a Payload collection envelope', async () => {
    globalThis.fetch = async () => Response.json({ docs: [{ id: 'one' }] });

    const result = await fetchPayloadCollection<{ id: string }>(
      new URL('https://platform.mardu.de/api/examples'),
    );

    assert.deepEqual(result.docs, [{ id: 'one' }]);
  });

  test('preserves HTTP failures instead of returning an empty collection', async () => {
    globalThis.fetch = async () => new Response(null, { status: 503 });

    await assert.rejects(
      fetchPayloadCollection(new URL('https://platform.mardu.de/api/examples')),
      (error: unknown) =>
        error instanceof ContentApiError && error.code === 'HTTP' && error.status === 503,
    );
  });

  test('rejects incompatible response envelopes', async () => {
    globalThis.fetch = async () => Response.json({ items: [] });

    await assert.rejects(
      fetchPayloadCollection(new URL('https://platform.mardu.de/api/examples')),
      (error: unknown) => error instanceof ContentApiError && error.code === 'INVALID_PAYLOAD',
    );
  });

  test('preserves network failures', async () => {
    globalThis.fetch = async () => {
      throw new TypeError('offline');
    };

    await assert.rejects(
      fetchPayloadCollection(new URL('https://platform.mardu.de/api/examples')),
      (error: unknown) => error instanceof ContentApiError && error.code === 'NETWORK',
    );
  });
});

describe('mapPayloadDocumentsStrict', () => {
  test('rejects documents that cannot be mapped to the public DTO', () => {
    assert.throws(
      () => mapPayloadDocumentsStrict([{ id: '' }], () => null, '/api/examples'),
      (error: unknown) => error instanceof ContentApiError && error.code === 'INVALID_PAYLOAD',
    );
  });
});
