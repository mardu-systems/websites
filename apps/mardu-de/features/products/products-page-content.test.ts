import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { CatalogCategoryDto, CatalogProductDetailDto } from '@mardu/content-core';
import { createProductExplorerCategories } from './products-page-content';

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
  test('uses the CMS category order and resolves frontend-owned seed images locally', () => {
    const [result] = createProductExplorerCategories([category], products, 'http://localhost:4000');

    assert.deepEqual(
      result?.products.map((product) => product.name),
      ['Gateway Pro', 'Gateway'],
    );
    assert.equal(result?.products[0]?.imageUrl, '/gateway/mounted.jpg');
    assert.equal(result?.products[1]?.imageUrl, 'https://cdn.example.com/gateway.jpg');
    assert.equal(result?.products[0]?.overview, products[1]?.overview);
    assert.deepEqual(result?.products[0]?.featureGroups, products[1]?.featureGroups);
    assert.deepEqual(result?.products[0]?.specGroups, products[1]?.specGroups);
    assert.equal(result?.products[0]?.detailMarkdown, products[1]?.detailMarkdown);
    assert.equal(result?.products[0]?.primaryCtaLabel, products[1]?.primaryCtaLabel);
  });
});
