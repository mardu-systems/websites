import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { CatalogCategoryDto, CatalogProductDetailDto } from '@mardu/content-core';
import {
  createProductCatalogItems,
  filterProductCatalogItems,
} from './products-page-content';

const category: CatalogCategoryDto = {
  id: 'gateways',
  slug: 'gateways',
  name: 'Gateways',
  description: 'Koordinieren den lokalen Betrieb.',
  productIds: ['gateway-pro', 'gateway'],
};

const products: CatalogProductDetailDto[] = [
  {
    id: 'gateway',
    slug: 'gateway',
    name: 'Gateway',
    categoryId: 'gateways',
    categoryName: 'Gateways',
    tagline: 'Lokaler Knoten',
    summary: 'Für Standardinstallationen.',
    imageUrl: 'https://cdn.example.com/gateway.jpg',
    availability: 'available',
    availabilityLabel: 'Verfügbar',
    heroDescription: 'Für Standardinstallationen.',
    overview: 'Koordiniert lokale Geräte.',
    variants: [],
    technologies: [],
    carriers: [],
    featureGroups: [],
    specGroups: [],
    relatedProducts: [],
    inquiryContext: {
      productId: 'gateway',
      productSlug: 'gateway',
      productName: 'Gateway',
      category: 'Gateways',
      sourcePage: '/products/gateway',
    },
  },
  {
    id: 'gateway-pro',
    slug: 'gateway-pro',
    name: 'Gateway Pro',
    categoryId: 'gateways',
    categoryName: 'Gateways',
    tagline: 'Redundanter Knoten',
    summary: 'Für anspruchsvolle Installationen.',
    imageUrl: 'http://localhost:4000/gateway/mounted.jpg',
    availability: 'lead-time',
    availabilityLabel: 'Projektware',
    heroDescription: 'Für verteilte Gebäudeinstallationen.',
    overview: 'Koordiniert Geräte und Plattformdienste am Standort.',
    variants: [],
    technologies: [],
    carriers: [],
    featureGroups: [{ title: 'Betrieb am Standort', items: ['Lokaler Plattformknoten'] }],
    specGroups: [
      {
        title: 'Projektstatus',
        specs: [{ label: 'Verfügbarkeit', value: 'Projektware' }],
      },
    ],
    relatedProducts: [],
    detailMarkdown: '## Weitere Details\n\nAus dem CMS.',
    primaryCtaLabel: 'Projekt besprechen',
    secondaryCtaLabel: 'Installation konfigurieren',
    inquiryContext: {
      productId: 'gateway-pro',
      productSlug: 'gateway-pro',
      productName: 'Gateway Pro',
      category: 'Gateways',
      sourcePage: '/products/gateway-pro',
    },
  },
];

describe('product explorer content', () => {
  test('keeps the CMS product order and resolves frontend-owned seed images locally', () => {
    const result = createProductCatalogItems([category], products, 'http://localhost:4000');

    assert.deepEqual(
      result.map((product) => product.name),
      ['Gateway', 'Gateway Pro'],
    );
    assert.equal(result[0]?.imageUrl, 'https://cdn.example.com/gateway.jpg');
    assert.equal(result[1]?.imageUrl, '/gateway/mounted.jpg');
    assert.equal(result[1]?.overview, products[1]?.overview);
    assert.deepEqual(result[1]?.featureGroups, products[1]?.featureGroups);
    assert.deepEqual(result[1]?.specGroups, products[1]?.specGroups);
    assert.equal(result[1]?.detailMarkdown, products[1]?.detailMarkdown);
    assert.equal(result[1]?.primaryCtaLabel, products[1]?.primaryCtaLabel);
  });

  test('keeps published products without a readable CMS category in the catalog', () => {
    const result = createProductCatalogItems([], products, 'http://localhost:4000');

    assert.deepEqual(result.map((product) => product.name), ['Gateway', 'Gateway Pro']);
  });

  test('filters products by search, category and availability', () => {
    const catalog = createProductCatalogItems([category], products, 'http://localhost:4000');

    assert.deepEqual(
      filterProductCatalogItems(catalog, {
        query: 'redundant',
        category: 'all',
        availability: 'all',
      }).map((product) => product.slug),
      ['gateway-pro'],
    );
    assert.deepEqual(
      filterProductCatalogItems(catalog, {
        query: '',
        category: 'Gateways',
        availability: 'available',
      }).map((product) => product.slug),
      ['gateway'],
    );
  });
});
