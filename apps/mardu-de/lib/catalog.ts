import {
  getPlatformCatalogCarriers,
  getPlatformCatalogCategories,
  getPlatformCatalogProductBySlug,
  getPlatformCatalogProducts,
  getPlatformCatalogProductSlugs,
  getPlatformCatalogTechnologies,
  getPlatformFeaturedCatalogProducts,
  type CatalogProductDetailDto,
} from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';

const site = 'mardu-space' as const;

export const getCatalogCategories = async () =>
  getPlatformCatalogCategories(getPlatformOrigin(), site);

export const getCatalogTechnologies = async () =>
  getPlatformCatalogTechnologies(getPlatformOrigin(), site);

export const getCatalogCarriers = async () =>
  getPlatformCatalogCarriers(getPlatformOrigin(), site);

export const getCatalogProducts = async () =>
  getPlatformCatalogProducts(getPlatformOrigin(), site);

export const getFeaturedCatalogProducts = async (limit = 3) =>
  getPlatformFeaturedCatalogProducts(getPlatformOrigin(), site, limit);

export const getCatalogProductBySlug = async (slug: string) =>
  getPlatformCatalogProductBySlug(getPlatformOrigin(), site, slug);

export const getCatalogProductSlugs = async () =>
  getPlatformCatalogProductSlugs(getPlatformOrigin(), site);

export function buildCatalogInquiryHref(product: CatalogProductDetailDto, variantId?: string) {
  const params = new URLSearchParams({
    source: 'contact-form',
    product: product.slug,
    productName: product.name,
    category: product.categoryName,
    priceFrom: product.priceFromLabel || '',
  });

  if (variantId) {
    params.set('variant', variantId);
  }

  return `/contact?${params.toString()}`;
}
