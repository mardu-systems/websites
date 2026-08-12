import type { CatalogCategoryDto, CatalogProductListItemDto } from '@mardu/content-core';

export interface ProductExplorerProductViewModel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  imageUrl?: string;
  imageAlt: string;
  priceFromLabel: string;
  availabilityLabel: string;
  technologies: readonly string[];
}

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
  products: readonly CatalogProductListItemDto[],
  contentOrigin: string,
): readonly ProductExplorerCategoryViewModel[] {
  const productsById = new Map(products.map((product) => [product.id, product]));

  return categories.flatMap((category, categoryIndex) => {
    const categoryProducts = category.productIds.flatMap((productId) => {
      const product = productsById.get(productId);

      if (!product) {
        return [];
      }

      return [
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          tagline: product.tagline,
          summary: product.summary,
          imageUrl: resolveCatalogImageUrl(product.imageUrl ?? category.imageUrl, contentOrigin),
          imageAlt: product.imageAlt ?? category.imageAlt ?? product.name,
          priceFromLabel: product.priceFromLabel ?? 'Auf Anfrage',
          availabilityLabel: product.availabilityLabel,
          technologies: product.technologies.map((technology) => technology.name),
        },
      ];
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
}

export const productsPageIntro = {
  descriptionPrefix:
    'Mardu verbindet Zugriffspunkte, Gateways und Identmedien zu einem belastbaren System für reale Standorte – passend zu',
  descriptionEmphasis: 'Türen, Maschinen und vorhandener Infrastruktur.',
} as const;
