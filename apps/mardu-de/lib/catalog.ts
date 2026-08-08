import {
  getPlatformCatalogCarriers,
  getPlatformCatalogCategories,
  getPlatformCatalogProductBySlug,
  getPlatformCatalogProducts,
  getPlatformCatalogTechnologies,
  getPlatformFeaturedCatalogProducts,
  type CatalogProductDetailDto,
  type CatalogInquiryContextDto,
} from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';

const site = 'mardu-de' as const;

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

export function buildCatalogInquiryHref(product: CatalogProductDetailDto, variantId?: string) {
  const context: CatalogInquiryContextDto = {
    ...product.inquiryContext,
    ...(variantId ? { variantId } : {}),
  };
  const params = new URLSearchParams({
    source: 'contact-form',
    productId: context.productId,
    productSlug: context.productSlug,
    productName: context.productName,
    category: context.category,
    sourcePage: context.sourcePage,
  });

  if (context.variantId) {
    params.set('variantId', context.variantId);
  }
  if (context.priceFrom) {
    params.set('priceFrom', context.priceFrom);
  }
  if (context.technologyIds?.length) {
    params.set('technologyIds', context.technologyIds.join(','));
  }

  return `/contact?${params.toString()}`;
}

type CatalogInquirySearchParams = Record<string, string | string[] | undefined>;

function readSingleParam(params: CatalogInquirySearchParams, key: string) {
  const value = params[key];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export function parseCatalogInquiryContext(
  params: CatalogInquirySearchParams,
): CatalogInquiryContextDto | null {
  const productId = readSingleParam(params, 'productId');
  const productSlug = readSingleParam(params, 'productSlug');
  const productName = readSingleParam(params, 'productName');
  const category = readSingleParam(params, 'category');
  const sourcePage = readSingleParam(params, 'sourcePage');

  if (!productId || !productSlug || !productName || !category || !sourcePage) {
    return null;
  }

  const variantId = readSingleParam(params, 'variantId');
  const priceFrom = readSingleParam(params, 'priceFrom');
  const technologyIds = readSingleParam(params, 'technologyIds')
    ?.split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    productId,
    productSlug,
    productName,
    category,
    sourcePage,
    ...(variantId ? { variantId } : {}),
    ...(priceFrom ? { priceFrom } : {}),
    ...(technologyIds?.length ? { technologyIds } : {}),
  };
}
