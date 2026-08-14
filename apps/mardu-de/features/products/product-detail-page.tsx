import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';
import { cn } from '@mardu/ui/lib/utils';
import type { ProductCatalogItemViewModel } from './products-page-content';

export function ProductDetailPage({
  product,
  selectedVariantId,
}: {
  product: ProductCatalogItemViewModel;
  selectedVariantId?: string;
}) {
  const benefits = product.featureGroups.flatMap((group) =>
    group.items.map((item) => ({ group: group.title, item })),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border py-10 md:py-16">
        <div className="mardu-container">
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Zurück zu allen Produkten
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-start lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <span>{product.categoryName}</span>
                <span aria-hidden="true">·</span>
                <span>{product.availabilityLabel}</span>
              </div>
              <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[0.96] tracking-[-0.045em]">
                {product.name}
              </h1>
              <p className="mt-7 max-w-[46rem] text-xl leading-relaxed text-foreground/78 md:text-2xl">
                {product.tagline}
              </p>
              <p className="mt-5 max-w-[48rem] text-base leading-relaxed text-muted-foreground md:text-lg">
                {product.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button render={<Link href={product.inquiryHref} />} size="lg">
                  {product.primaryCtaLabel ?? 'Projekt anfragen'}
                </Button>
                <Button render={<Link href="/configurator" />} variant="outline" size="lg">
                  {product.secondaryCtaLabel ?? 'Projekt konfigurieren'}
                </Button>
              </div>
            </div>

            {product.imageUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted lg:aspect-square">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 38vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {benefits.length > 0 ? (
        <section className="border-b border-border py-14 md:py-20">
          <div className="mardu-container grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Vorteile
              </p>
              <h2 className="mt-3 text-3xl font-light tracking-[-0.03em] md:text-4xl">
                Das bringt das Produkt im Betrieb
              </h2>
            </div>
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {benefits.slice(0, 6).map((benefit) => (
                <li
                  key={`${benefit.group}-${benefit.item}`}
                  className="flex gap-3 border-t border-border pt-4"
                >
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.1em] text-muted-foreground">
                      {benefit.group}
                    </span>
                    <span className="mt-1 block leading-relaxed text-foreground/82">
                      {benefit.item}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {product.specGroups.length > 0 ? (
        <section className="border-b border-border py-14 md:py-20">
          <div className="mardu-container">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Highlights</p>
            <h2 className="mt-3 text-3xl font-light tracking-[-0.03em] md:text-4xl">
              Die wichtigsten Eckdaten
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {product.specGroups.flatMap((group) =>
                group.specs.map((spec) => (
                  <div key={`${group.title}-${spec.label}`} className="border-t border-border pt-4">
                    <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                      {spec.label}
                    </p>
                    <p className="mt-2 text-lg leading-relaxed text-foreground/86">{spec.value}</p>
                  </div>
                )),
              )}
            </div>
          </div>
        </section>
      ) : null}

      {product.variants.length > 0 ? (
        <section className="border-b border-border py-14 md:py-20">
          <div className="mardu-container">
            <div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Varianten
                </p>
                <h2 className="mt-3 text-3xl font-light tracking-[-0.03em] md:text-4xl">
                  Passende Ausführung wählen
                </h2>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                {product.variants.map((variant) => {
                  const isSelected = variant.id === selectedVariantId;

                  return (
                    <article
                      key={variant.id}
                      className={cn(
                        'border-b border-border px-5 py-5 last:border-b-0 md:px-7',
                        isSelected && 'bg-primary text-primary-foreground',
                      )}
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{variant.label}</h3>
                          <p
                            className={cn(
                              'mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground',
                              isSelected && 'text-primary-foreground/75',
                            )}
                          >
                            {variant.summary}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-medium">
                          {variant.priceFromLabel ?? variant.availabilityLabel ?? 'Auf Anfrage'}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {product.relatedProducts.length > 0 ? (
        <section className="border-b border-border py-14 md:py-20">
          <div className="mardu-container">
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Weitere Produkte
            </p>
            <div className="mt-5 divide-y divide-border border-y border-border">
              {product.relatedProducts.slice(0, 3).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="group flex min-h-16 items-center justify-between gap-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>
                    <span className="block font-medium">{relatedProduct.name}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {relatedProduct.summary}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-14 md:py-20">
        <div className="mardu-container flex flex-col gap-6 border-y border-border py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Nächster Schritt
            </p>
            <h2 className="mt-2 text-2xl font-light tracking-[-0.02em] md:text-3xl">
              Passt das Produkt zu deinem Projekt?
            </h2>
          </div>
          <Button render={<Link href={product.inquiryHref} />} size="lg">
            {product.primaryCtaLabel ?? 'Projekt anfragen'}
          </Button>
        </div>
      </section>
    </div>
  );
}
