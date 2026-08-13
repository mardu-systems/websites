import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { buildLlmsText } from './llms';

describe('llms.txt feature visibility', () => {
  test('omits disabled content areas', () => {
    const text = buildLlmsText({ blog: false, integrations: false, products: false });

    assert.doesNotMatch(text, /www\.mardu\.de\/(?:blog|integrations|products)/);
    assert.doesNotMatch(text, /whitepaper/i);
    assert.match(text, /www\.mardu\.de\/solutions/);
  });

  test('includes individually enabled content areas', () => {
    const text = buildLlmsText({ blog: true, integrations: false, products: true });

    assert.match(text, /www\.mardu\.de\/blog/);
    assert.match(text, /www\.mardu\.de\/products/);
    assert.doesNotMatch(text, /www\.mardu\.de\/integrations/);
  });
});
