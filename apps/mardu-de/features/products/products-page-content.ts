import type { CatalogCategoryDto, CatalogProductDetailDto } from '@mardu/content-core';
import { buildCatalogInquiryHref } from '@/lib/catalog';

export type ProductExplorerProductViewModel = CatalogProductDetailDto & {
  imageAlt: string;
  inquiryHref: string;
};

export interface ProductExplorerCategoryViewModel {
  id: string;
  slug: string;
  index: string;
  name: string;
  eyebrow: string;
  description: string;
  products: readonly ProductExplorerProductViewModel[];
}

function resolveCatalogImageUrl(imageUrl: string | undefined, contentOrigin: string) {
  if (!imageUrl || !imageUrl.startsWith(contentOrigin)) {
    return imageUrl;
  }

  const url = new URL(imageUrl);

  // Payload media files stay on the content service. Relative seed assets are
  // owned by the frontend and must resolve against the public app directory.
  return url.pathname.startsWith('/api/') ? imageUrl : `${url.pathname}${url.search}`;
}

export function createProductExplorerCategories(
  categories: readonly CatalogCategoryDto[],
  products: readonly CatalogProductDetailDto[],
  contentOrigin: string,
): readonly ProductExplorerCategoryViewModel[] {
  const productsById = new Map(products.map((product) => [product.id, product]));
  const categorizedProductIds = new Set<string>();

  const createProductViewModel = (
    product: CatalogProductDetailDto,
    category: CatalogCategoryDto | undefined,
  ): ProductExplorerProductViewModel => ({
    ...product,
    imageUrl: resolveCatalogImageUrl(product.imageUrl ?? category?.imageUrl, contentOrigin),
    imageAlt: product.imageAlt ?? category?.imageAlt ?? product.name,
    inquiryHref: buildCatalogInquiryHref(product),
  });

  const resolvedCategories = categories.flatMap((category, categoryIndex) => {
    const categoryProducts = category.productIds.flatMap((productId) => {
      const product = productsById.get(productId);

      if (!product) {
        return [];
      }

      categorizedProductIds.add(product.id);
      return [createProductViewModel(product, category)];
    });

    if (categoryProducts.length === 0) {
      return [];
    }

    return [
      {
        id: category.id,
        slug: category.slug,
        index: String(categoryIndex + 1).padStart(2, '0'),
        name: category.name,
        eyebrow: category.eyebrow ?? 'Systembausteine',
        description: category.description,
        products: categoryProducts,
      },
    ];
  });

  const uncategorizedProducts = products
    .filter((product) => !categorizedProductIds.has(product.id))
    .map((product) => createProductViewModel(product, undefined));

  if (uncategorizedProducts.length === 0) {
    return resolvedCategories;
  }

  return [
    ...resolvedCategories,
    {
      id: 'products',
      slug: 'products',
      index: String(resolvedCategories.length + 1).padStart(2, '0'),
      name: 'Produkte',
      eyebrow: 'Systembausteine',
      description: 'Veröffentlichte Produkte und Systemkomponenten für Mardu-Installationen.',
      products: uncategorizedProducts,
    },
  ];
}

export const productsPageIntro = {
  descriptionPrefix:
    'Mardu verbindet Zugriffspunkte, Gateways und Identmedien zu einem belastbaren System für reale Standorte – passend zu',
  descriptionEmphasis: 'Türen, Maschinen und vorhandener Infrastruktur.',
} as const;
