import type {
  CatalogCarrierDto,
  CatalogCategoryDto,
  CatalogProductDetailDto,
  CatalogProductListItemDto,
  CatalogRelatedProductDto,
  CatalogTechnologyDto,
} from '@mardu/content-core';
import { catalogCarriers, catalogCategories, catalogTechnologies } from './categories';
import { catalogProducts } from './products';

export function getCatalogCategories(): CatalogCategoryDto[] {
  return catalogCategories;
}

export function getCatalogTechnologies(): CatalogTechnologyDto[] {
  return catalogTechnologies;
}

export function getCatalogCarriers(): CatalogCarrierDto[] {
  return catalogCarriers;
}

export function getCatalogProducts(): CatalogProductListItemDto[] {
  return catalogProducts;
}

export function getFeaturedCatalogProducts(limit = 3): CatalogProductListItemDto[] {
  return catalogProducts.filter((product) => product.featured).slice(0, limit);
}

export function getCatalogProductBySlug(slug: string): CatalogProductDetailDto | undefined {
  const product = catalogProducts.find((entry) => entry.slug === slug);
  if (!product) {
    return undefined;
  }

  return {
    ...product,
    relatedProducts: product.relatedProducts.length
      ? product.relatedProducts
      : getDefaultRelatedProducts(product),
  };
}

export function getCatalogProductSlugs(): string[] {
  return catalogProducts.map((product) => product.slug);
}

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

function getDefaultRelatedProducts(product: CatalogProductDetailDto): CatalogRelatedProductDto[] {
  return catalogProducts
    .filter((candidate) => candidate.id !== product.id)
    .filter(
      (candidate) =>
        candidate.categoryId === product.categoryId ||
        candidate.technologies.some((technology) =>
          product.technologies.some((current) => current.id === technology.id),
        ),
    )
    .slice(0, 3);
}
