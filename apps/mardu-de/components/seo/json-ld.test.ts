import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { JsonLd } from './json-ld';

test('JsonLd escapes HTML opening characters in CMS-controlled strings', () => {
  const html = renderToStaticMarkup(
    JsonLd({
      data: {
        '@context': 'https://schema.org',
        name: '</script><script>alert(1)</script>',
      },
    }),
  );

  assert.match(html, /\\u003c\/script>/);
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
});
