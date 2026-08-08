import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type { CatalogProductDetailDto } from '@mardu/content-core';
import { buildCatalogInquiryHref, parseCatalogInquiryContext } from './catalog';

const inquiryContext = {
  productId: 'reader-one',
  productSlug: 'reader-one',
  productName: 'Reader One',
  category: 'RFID Reader',
  priceFrom: 'ab 299 €',
  sourcePage: '/products/reader-one',
  technologyIds: ['nfc', 'ble'],
};

describe('catalog inquiry context', () => {
  test('round-trips every public DTO field through the contact URL', () => {
    const product = { inquiryContext } as CatalogProductDetailDto;
    const href = buildCatalogInquiryHref(product, 'outdoor');
    const query = Object.fromEntries(new URL(href, 'https://www.mardu.de').searchParams);

    assert.deepEqual(parseCatalogInquiryContext(query), {
      ...inquiryContext,
      variantId: 'outdoor',
    });
  });

  test('rejects partial product contexts', () => {
    assert.equal(parseCatalogInquiryContext({ productName: 'Reader One' }), null);
  });
});
