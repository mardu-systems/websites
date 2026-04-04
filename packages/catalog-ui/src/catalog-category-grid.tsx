import Image from 'next/image';
import Link from 'next/link';
import type { CatalogCategoryDto } from '@mardu/content-core';
import { Overline } from '@mardu/ui/components/typography';

export interface CatalogCategoryGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  categories: CatalogCategoryDto[];
  buildHref: (category: CatalogCategoryDto) => string;
}

export function CatalogCategoryGrid({
  eyebrow,
  title,
  description,
  categories,
  buildHref,
}: CatalogCategoryGridProps) {
  return (
    <section className="section-hairline">
      <div className="mardu-container py-20 md:py-24">
        {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-start">
          <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={buildHref(category)}
              className="group border border-black/10 bg-card transition-transform duration-200 hover:-translate-y-0.5 hover:border-black/18"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-black/8 bg-background">
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt={category.imageAlt || category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted text-5xl font-semibold tracking-[-0.04em] text-foreground/22">
                    {category.visualLabel || category.name.slice(0, 2)}
                  </div>
                )}
              </div>

              <div className="space-y-3 p-6">
                <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                  {category.eyebrow || 'Produktfamilie'}
                </p>
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {category.name}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/72 md:text-base">
                  {category.description}
                </p>
                <p className="text-sm text-foreground/58">
                  {category.productIds.length} Produkte im Katalog
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
