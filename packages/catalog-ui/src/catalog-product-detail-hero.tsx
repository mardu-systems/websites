import Image from 'next/image';
import Link from 'next/link';
import type { CatalogProductDetailDto } from '@mardu/content-core';
import { Badge } from '@mardu/ui/components/badge';
import { Button } from '@mardu/ui/components/button';

export interface CatalogProductDetailHeroProps {
  product: CatalogProductDetailDto;
  inquiryHref: string;
  configuratorHref?: string;
}

export function CatalogProductDetailHero({
  product,
  inquiryHref,
  configuratorHref,
}: CatalogProductDetailHeroProps) {
  const productImage = (
    <div className="relative min-h-[24rem] overflow-hidden border border-black/10 bg-card shadow-[0_16px_44px_rgba(0,0,0,0.08)] sm:min-h-[28rem] xl:min-h-[38rem]">
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.imageAlt || product.name}
          fill
          sizes="(max-width: 1279px) 100vw, 42vw"
          className="object-cover object-center"
          priority
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-linear-to-br from-muted via-card to-muted px-8 text-center">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
              Produktvisual folgt
            </p>
            <p className="text-3xl font-semibold tracking-[-0.03em] text-foreground/42">
              {product.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="section-hairline">
      <div className="mardu-container py-14 md:py-20">
        <div className="grid gap-12 xl:grid-cols-[1.04fr_0.96fr] xl:items-start">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{product.categoryName}</Badge>
              <Badge variant="secondary">{product.availabilityLabel}</Badge>
            </div>

            <div className="space-y-5">
              <div className="relative isolate inline-block max-w-[62rem]">
                <div className="absolute -left-4 top-[12%] z-0 h-[48%] w-[62%] bg-[repeating-linear-gradient(135deg,rgba(31,41,55,0.13)_0,rgba(31,41,55,0.13)_1px,transparent_1px,transparent_9px)] opacity-40" />
                <h1 className="headline-balance max-w-4xl text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
                  {product.name}
                </h1>
              </div>

              <div className="relative isolate max-w-[58ch]">
                <div className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                  {product.tagline}
                </div>
              </div>

              <div className="xl:hidden">{productImage}</div>

              <div className="relative isolate max-w-[60ch]">
                <div className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                  {product.heroDescription}
                </div>
              </div>
            </div>

            <div className="grid gap-8 border-y border-black/8 py-6 md:grid-cols-[0.34fr_0.28fr_0.38fr] md:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                  Richtpreis ab
                </p>
                <p className="mt-1 text-[clamp(2rem,3vw,2.7rem)] font-semibold tracking-[-0.03em] text-foreground">
                  {product.priceFromLabel || 'Auf Anfrage'}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                  Verfügbarkeit
                </p>
                <p className="mt-1 text-[clamp(1.6rem,2.3vw,2.1rem)] font-semibold tracking-[-0.03em] text-foreground">
                  {product.availabilityLabel}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-start">
                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href={inquiryHref}>{product.primaryCtaLabel || 'Angebot anfragen'}</Link>
                </Button>
                {configuratorHref ? (
                  <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
                    <Link href={configuratorHref}>
                      {product.secondaryCtaLabel || 'Im Konfigurator einordnen'}
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="hidden xl:block">{productImage}</div>
        </div>
      </div>
    </section>
  );
}
