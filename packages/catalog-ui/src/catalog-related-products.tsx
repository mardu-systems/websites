import type { CatalogProductListItemDto } from '@mardu/content-core';
import { Overline } from '@mardu/ui/components/typography';
import { CatalogProductCard } from './catalog-product-card';

export interface CatalogRelatedProductsProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: CatalogProductListItemDto[];
  buildHref: (product: CatalogProductListItemDto) => string;
}

export function CatalogRelatedProducts({
  eyebrow,
  title,
  description,
  products,
  buildHref,
}: CatalogRelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="section-hairline">
      <div className="mardu-container py-20 md:py-24">
        {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-start">
          <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.3rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <CatalogProductCard key={product.id} product={product} href={buildHref(product)} />
          ))}
        </div>
      </div>
    </section>
  );
}
