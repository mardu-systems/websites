import type { CatalogVariantDto } from '@mardu/content-core';
import { Overline } from '@mardu/ui/components/typography';

export interface CatalogVariantCompareProps {
  eyebrow?: string;
  title: string;
  description?: string;
  variants: CatalogVariantDto[];
}

export function CatalogVariantCompare({
  eyebrow,
  title,
  description,
  variants,
}: CatalogVariantCompareProps) {
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
          {variants.map((variant) => (
            <article key={variant.id} className="border border-black/10 bg-card p-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {variant.label}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/72 md:text-base">
                  {variant.summary}
                </p>
              </div>

              <div className="mt-5 border-t border-black/8 pt-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                  Einordnung
                </p>
                <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
                  {variant.priceFromLabel || variant.availabilityLabel || 'Auf Anfrage'}
                </p>
              </div>

              <div className="mt-5 border-t border-black/8 pt-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                  Merkmale
                </p>
                <ul className="mt-3 space-y-3">
                  {variant.attributes.map((attribute) => (
                    <li
                      key={`${variant.id}-${attribute.label}`}
                      className="flex items-start justify-between gap-4 text-sm leading-relaxed text-foreground/74 md:text-base"
                    >
                      <span className="text-foreground/54">{attribute.label}</span>
                      <span className="text-right text-foreground">{attribute.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {variant.recommendation ? (
                <div className="mt-5 border-t border-black/8 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                    Empfehlung
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/72 md:text-base">
                    {variant.recommendation}
                  </p>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
