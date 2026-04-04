import Image from 'next/image';
import type { CatalogCarrierDto } from '@mardu/content-core';
import { Overline } from '@mardu/ui/components/typography';

export interface CatalogCarrierGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: CatalogCarrierDto[];
}

export function CatalogCarrierGrid({
  eyebrow,
  title,
  description,
  items,
}: CatalogCarrierGridProps) {
  if (items.length === 0) {
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

        <div className="mt-8 grid gap-5 md:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.id} className="border border-black/10 bg-card p-6">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-black/8 bg-background">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-4xl font-semibold tracking-[-0.04em] text-foreground/28">
                    {item.visualLabel || item.name.slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="mt-5 space-y-2">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {item.name}
                </h3>
                {item.technologyLabel ? (
                  <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                    {item.technologyLabel}
                  </p>
                ) : null}
                <p className="text-sm leading-relaxed text-foreground/72 md:text-base">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
