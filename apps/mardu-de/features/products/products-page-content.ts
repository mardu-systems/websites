import type { CatalogCategoryDto, CatalogProductDetailDto } from '@mardu/content-core';
import { buildCatalogInquiryHref } from '@/lib/catalog';

export type ProductCatalogItemViewModel = CatalogProductDetailDto & {
  imageAlt: string;
  inquiryHref: string;
};

export type ProductCatalogFilters = {
  query: string;
  category: string;
  availability: string;
};

function resolveCatalogImageUrl(imageUrl: string | undefined, contentOrigin: string) {
  if (!imageUrl || !imageUrl.startsWith(contentOrigin)) {
    return imageUrl;
  }

  const url = new URL(imageUrl);

  // Payload media files stay on the content service. Relative seed assets are
  // owned by the frontend and must resolve against the public app directory.
  return url.pathname.startsWith('/api/') ? imageUrl : `${url.pathname}${url.search}`;
}

export function createProductCatalogItems(
  categories: readonly CatalogCategoryDto[],
  products: readonly CatalogProductDetailDto[],
  contentOrigin: string,
): readonly ProductCatalogItemViewModel[] {
  const categoryByProductId = new Map(
    categories.flatMap((category) =>
      category.productIds.map((productId) => [productId, category] as const),
    ),
  );

  return products.map((product) => {
    const category = categoryByProductId.get(product.id);

    return {
      ...product,
      imageUrl: resolveCatalogImageUrl(product.imageUrl ?? category?.imageUrl, contentOrigin),
      imageAlt: product.imageAlt ?? category?.imageAlt ?? product.name,
      inquiryHref: buildCatalogInquiryHref(product),
    };
  });
}

export function filterProductCatalogItems(
  products: readonly ProductCatalogItemViewModel[],
  filters: ProductCatalogFilters,
): readonly ProductCatalogItemViewModel[] {
  const query = filters.query.trim().toLocaleLowerCase('de');

  return products.filter((product) => {
    const matchesQuery =
      query.length === 0 ||
      [product.name, product.tagline, product.summary, product.categoryName].some((value) =>
        value.toLocaleLowerCase('de').includes(query),
      );
    const matchesCategory =
      filters.category === 'all' || product.categoryName === filters.category;
    const matchesAvailability =
      filters.availability === 'all' || product.availability === filters.availability;

    return matchesQuery && matchesCategory && matchesAvailability;
  });
}

export const productsPageIntro = {
  descriptionPrefix:
    'Mardu verbindet Zugriffspunkte, Gateways und Identmedien zu einem belastbaren System für reale Standorte – passend zu',
  descriptionEmphasis: 'Türen, Maschinen und vorhandener Infrastruktur.',
} as const;
