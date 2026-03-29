import { cn } from '@mardu/ui/lib/utils';
import { Overline } from '@mardu/ui/components/typography';
import type { HardwareVariantDto } from '@/data/hardware-page';

export interface HardwareVariantCompareProps {
  eyebrow?: string;
  title: string;
  description: string;
  variants: HardwareVariantDto[];
  className?: string;
}

export default function HardwareVariantCompare({
  eyebrow,
  title,
  description,
  variants,
  className,
}: HardwareVariantCompareProps) {
  return (
    <section className={cn('w-full py-20 md:py-24', className)}>
      <div className="mardu-container">
        {eyebrow ? <Overline className="mb-3">{eyebrow}</Overline> : null}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-start">
          <h2 className="headline-balance text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
            {title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/68 md:text-base">
            {description}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {variants.map((variant) => (
            <article
              key={variant.id}
              className={cn(
                'border border-black/10 bg-card p-6 md:p-7',
                variant.badge &&
                  'border-black/20 bg-linear-to-br from-muted/65 via-card to-card shadow-[0_0_0_1px_rgba(0,0,0,0.03)]',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                    {variant.tier}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
                    {variant.name}
                  </h3>
                  <p className="max-w-[42ch] text-sm leading-relaxed text-foreground/72 md:text-base">
                    {variant.summary}
                  </p>
                </div>
                {variant.badge ? (
                  <span className="inline-flex border border-black/10 bg-background px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-foreground/54">
                    {variant.badge}
                  </span>
                ) : null}
              </div>

              <div className="mt-6 border-t border-black/8 pt-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                  Geeignet für
                </p>
                <ul className="mt-3 space-y-3">
                  {variant.suitableFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/74 md:text-base"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-black/8 pt-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                  Stärken
                </p>
                <ul className="mt-3 space-y-3">
                  {variant.strengths.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/74 md:text-base"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {variant.recommendation ? (
                <div className="mt-6 border-t border-black/8 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                    Empfehlung
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/74 md:text-base">
                    {variant.recommendation}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 border-t border-black/8 pt-5">
                <p className="text-sm leading-relaxed text-foreground/58">
                  Technische Unterschiede bei Bedarf separat im Detail ansehen.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
