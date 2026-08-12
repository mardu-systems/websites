import assert from 'node:assert/strict';
import { afterEach, describe, test } from 'node:test';
import { getPlatformCatalogProductBySlug, getPlatformSolutionBySlug } from './index';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockCollection(docs: unknown[]) {
  globalThis.fetch = async () => Response.json({ docs });
}

describe('public Payload mappers', () => {
  test('keeps legacy products linkable without inventing a price or technology', async () => {
    mockCollection([
      {
        id: 'legacy-reader',
        slug: 'legacy-reader',
        name: 'Legacy Reader',
        tagline: 'Bestehender Leser',
        summary: 'Ein bereits veröffentlichtes Produkt.',
        description: 'Beschreibung aus dem älteren Payload-Dokument.',
        heroDescription: null,
        overview: null,
        imageUrl: '/device/reader.jpg',
        imageAlt: 'Legacy Reader',
        priceFrom: null,
        availability: 'available',
        availabilityLabel: 'Verfügbar',
        categories: [
          {
            id: 'readers',
            slug: 'readers',
            name: 'Leser',
            description: 'Lokale Identifikation.',
          },
        ],
        technologies: [],
        sites: ['mardu-de'],
        updatedAt: '2026-08-12T12:00:00+02:00',
        meta: {
          title: 'Legacy Reader | Mardu',
          description: 'SEO-Beschreibung des Produkts.',
          url: 'https://www.mardu.de/products/legacy-reader',
        },
      },
    ]);

    const product = await getPlatformCatalogProductBySlug(
      'https://platform.mardu.de',
      'mardu-de',
      'legacy-reader',
    );

    assert.ok(product);
    assert.equal(product.heroDescription, 'Beschreibung aus dem älteren Payload-Dokument.');
    assert.equal(product.overview, 'Beschreibung aus dem älteren Payload-Dokument.');
    assert.deepEqual(product.technologies, []);
    assert.equal(product.priceFrom, undefined);
    assert.equal(product.seoTitle, 'Legacy Reader | Mardu');
    assert.equal(product.canonicalUrl, 'https://www.mardu.de/products/legacy-reader');
    assert.equal(product.ogImageUrl, 'https://platform.mardu.de/device/reader.jpg');
    assert.equal(product.updatedAt, '2026-08-12T10:00:00.000Z');
  });

  test('uses the visible solution hero as the social fallback and drops invalid dates', async () => {
    mockCollection([
      {
        id: 'labore',
        slug: 'labore',
        title: 'Labore',
        tagline: 'Kontrollierter Laborbetrieb.',
        summary: 'Zugang und Gerätefreigabe zusammenführen.',
        imageUrl: '/configurator/fridge.jpg',
        imageAlt: 'Laborgerät',
        heroTitle: 'Laborzugang mit Betriebsdisziplin.',
        heroIntro: 'Für sensible Geräte und wechselnde Nutzergruppen.',
        problemTitle: 'Raumzutritt allein reicht nicht.',
        problemBody: 'Gerätefreigaben müssen mit Rollen und Nachweisen verbunden sein.',
        heroImageUrl: '/configurator/fridge.jpg',
        heroImageAlt: 'Laborgerät im Betrieb',
        contentBlocks: [],
        sites: ['mardu-de'],
        updatedAt: 'kein-datum',
        meta: {
          title: 'Laborzugang | Mardu',
          description: 'Mardu für Labore.',
          url: 'https://www.mardu.de/solutions/labore',
        },
      },
    ]);

    const solution = await getPlatformSolutionBySlug(
      'https://platform.mardu.de',
      'mardu-de',
      'labore',
    );

    assert.ok(solution);
    assert.equal(solution.seoTitle, 'Laborzugang | Mardu');
    assert.equal(solution.canonicalUrl, 'https://www.mardu.de/solutions/labore');
    assert.equal(solution.ogImageUrl, 'https://platform.mardu.de/configurator/fridge.jpg');
    assert.equal(solution.ogImageAlt, 'Laborgerät im Betrieb');
    assert.equal(solution.updatedAt, undefined);
  });
});
