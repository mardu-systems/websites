import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { CatalogProductDetailDto } from '@mardu/content-core';
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createPageMetadata,
  createProductJsonLd,
} from './seo';

describe('SEO helpers', () => {
  test('creates a canonical page metadata contract with social cards', () => {
    const metadata = createPageMetadata({
      title: 'Produkte',
      description: 'Produktübersicht',
      path: '/products',
    });

    assert.equal(metadata.alternates?.canonical, 'https://www.mardu.de/products');
    assert.equal(metadata.openGraph?.url, 'https://www.mardu.de/products');
    const twitter = metadata.twitter as { card?: string } | undefined;
    assert.equal(twitter?.card, 'summary_large_image');
  });

  test('marks status metadata as noindex without publishing a canonical', () => {
    const metadata = createPageMetadata({
      title: 'Status',
      description: 'Statusseite',
      path: '/newsletter/anmeldung',
      index: false,
    });

    const robots = metadata.robots as { index?: boolean } | undefined;
    assert.equal(robots?.index, false);
    assert.equal(metadata.alternates, undefined);
  });

  test('maps visible FAQ and breadcrumb content to JSON-LD', () => {
    const faq = createFaqJsonLd([{ question: 'Was ist Mardu?', answer: 'Ein Zugangssystem.' }]);
    const breadcrumbs = createBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Produkte', path: '/products' },
    ]);

    assert.equal(faq['@type'], 'FAQPage');
    assert.equal((faq.mainEntity as Array<Record<string, unknown>>).length, 1);
    assert.deepEqual(breadcrumbs.itemListElement, [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.mardu.de/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Produkte',
        item: 'https://www.mardu.de/products',
      },
    ]);
  });

  test('only emits a product offer for a numeric price', () => {
    const baseProduct = {
      slug: 'reader-one',
      name: 'Reader One',
      summary: 'RFID-Leser',
      categoryName: 'Zugriffspunkte',
      imageUrl: '/device/reader.jpg',
      availability: 'available',
      technologies: [],
      specGroups: [],
    } as unknown as CatalogProductDetailDto;

    assert.equal(createProductJsonLd(baseProduct).offers, undefined);
    assert.deepEqual(createProductJsonLd({ ...baseProduct, priceFrom: 299 }).offers, {
      '@type': 'Offer',
      url: 'https://www.mardu.de/products/reader-one',
      price: 299,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    });
  });
});
