import Link from 'next/link';
import { Button } from '@mardu/ui/components/button';
import { Overline } from '@mardu/ui/components/typography';

export interface CatalogHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export function CatalogHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: CatalogHeroProps) {
  return (
    <section className="section-hairline">
      <div className="mardu-container py-20 md:py-24">
        {eyebrow ? <Overline className="mb-4">{eyebrow}</Overline> : null}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-end">
          <div className="space-y-5">
            <h1 className="headline-balance text-[clamp(2.4rem,5vw,5rem)] leading-[0.97] tracking-[-0.04em] text-foreground">
              {title}
            </h1>
            <p className="max-w-[62ch] text-base leading-relaxed text-foreground/72 md:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-start">
            {primaryCta ? (
              <Button asChild size="lg" className="w-full lg:w-auto">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button asChild variant="outline" size="lg" className="w-full lg:w-auto">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
