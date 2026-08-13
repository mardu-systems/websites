import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { filterFeatureLinks, getFeatureForHref, isFeatureHrefEnabled } from './feature-links';

const disabledFeatures = {
  blog: false,
  integrations: false,
  products: false,
};

describe('feature-owned links', () => {
  test('recognizes landing and detail routes without matching similar route names', () => {
    assert.equal(getFeatureForHref('/products'), 'products');
    assert.equal(getFeatureForHref('/products/gateway-pro?variant=one'), 'products');
    assert.equal(getFeatureForHref('/integrations#directory'), 'integrations');
    assert.equal(getFeatureForHref('/blog/release-notes'), 'blog');
    assert.equal(getFeatureForHref('/products-legacy'), undefined);
    assert.equal(getFeatureForHref('https://example.com/products'), undefined);
  });

  test('removes disabled feature destinations while preserving stable links', () => {
    const links = [
      { label: 'Produkte', href: '/products' },
      { label: 'Integrationen', href: '/integrations/oidc' },
      { label: 'Blog', href: '/blog' },
      { label: 'Lösungen', href: '/solutions' },
      { label: 'Kontakt', href: '/contact' },
    ];

    assert.deepEqual(
      filterFeatureLinks(links, disabledFeatures).map((link) => link.href),
      ['/solutions', '/contact'],
    );
    assert.equal(isFeatureHrefEnabled('/products', { ...disabledFeatures, products: true }), true);
  });
});
