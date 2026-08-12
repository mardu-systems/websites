import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { CatalogCategoryDto, CatalogProductListItemDto } from '@mardu/content-core';
import { createProductExplorerCategories } from './products-page-content';

const category: CatalogCategoryDto = {
  id: 'gateways',
  slug: 'gateways',
  name: 'Gateways',
  description: 'Koordinieren den lokalen Betrieb.',
  productIds: ['gateway-pro', 'gateway'],
};

const products: CatalogProductListItemDto[] = [
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
    technologies: [],
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
    technologies: [],
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
  });
});
