import type { CatalogProductListItemDto } from "@mardu/content-core";
import { CatalogProductCard } from "./catalog-product-card";
import { CatalogSectionHeader } from "./catalog-section-header";

export interface CatalogProductGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: CatalogProductListItemDto[];
  buildHref: (product: CatalogProductListItemDto) => string;
}

export function CatalogProductGrid({
  eyebrow,
  title,
  description,
  products,
  buildHref,
}: CatalogProductGridProps) {
  return (
    <section className="section-hairline">
      <div className="mardu-container py-16 md:py-24">
        <CatalogSectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <CatalogProductCard
              key={product.id}
              product={product}
              href={buildHref(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
