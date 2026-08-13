import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { buildMarduSitemap, MARDU_SITE_URL } from './sitemap';

const contentEntries = {
  blog: [{ slug: 'release-notes', updatedAt: '2026-08-12T10:00:00.000Z' }],
  integrations: [{ slug: 'oidc' }],
  products: [{ slug: 'gateway-pro' }, { slug: 'access-point' }],
  solutions: [{ slug: 'labore' }, { slug: 'unternehmenswerkstaetten' }],
};

describe('mardu.de sitemap', () => {
  test('serves stable routes when the Platform content API is unavailable', async () => {
    const observedErrors: unknown[] = [];
    const sitemap = await buildMarduSitemap({
      blogEnabled: true,
      integrationsEnabled: true,
      productsEnabled: true,
      loadContentEntries: async () => {
        throw new Error('Platform offline');
      },
      onContentError: (error) => observedErrors.push(error),
    });

    assert.equal(observedErrors.length, 1);
    assert.ok(sitemap.some((entry) => entry.url === `${MARDU_SITE_URL}/products`));
    assert.ok(sitemap.some((entry) => entry.url === `${MARDU_SITE_URL}/solutions`));
    assert.ok(sitemap.some((entry) => entry.url === `${MARDU_SITE_URL}/blog`));
    assert.ok(sitemap.some((entry) => entry.url === `${MARDU_SITE_URL}/integrations`));
    assert.ok(!sitemap.some((entry) => entry.url.includes('/whitepaper')));
    assert.ok(!sitemap.some((entry) => entry.url.includes('/products/gateway-pro')));
  });

  test('publishes every returned product and solution detail slug exactly once', async () => {
    const sitemap = await buildMarduSitemap({
      blogEnabled: false,
      integrationsEnabled: false,
      productsEnabled: true,
      loadContentEntries: async () => contentEntries,
    });
    const urls = sitemap.map((entry) => entry.url);

    for (const entry of [...contentEntries.products, ...contentEntries.solutions]) {
      const segment = contentEntries.products.includes(entry) ? 'products' : 'solutions';
      assert.equal(
        urls.filter((url) => url === `${MARDU_SITE_URL}/${segment}/${entry.slug}`).length,
        1,
      );
    }

    assert.ok(!urls.some((url) => url.startsWith(`${MARDU_SITE_URL}/blog/`)));
    assert.ok(!urls.some((url) => url.startsWith(`${MARDU_SITE_URL}/integrations/`)));
  });

  test('removes disabled content landings and detail routes', async () => {
    const sitemap = await buildMarduSitemap({
      blogEnabled: false,
      integrationsEnabled: false,
      productsEnabled: false,
      loadContentEntries: async () => contentEntries,
    });
    const urls = sitemap.map((entry) => entry.url);

    for (const segment of ['blog', 'integrations', 'products']) {
      assert.ok(!urls.some((url) => url.startsWith(`${MARDU_SITE_URL}/${segment}`)));
    }
    assert.ok(urls.includes(`${MARDU_SITE_URL}/solutions`));
  });
});
