import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { CTASection } from '@mardu/sections';
import { EditorialActionButton } from '@mardu/ui/components/editorial-action-button';
import { EditorialAccent, Overline } from '@mardu/ui/components/typography';
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
  const productNameParts = product.name.trim().split(/\s+/);
  const productNameEmphasis = productNameParts.pop() ?? product.name;
  const productNamePrefix = productNameParts.join(' ');

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

          <div className="mt-8 grid gap-3 xl:grid-cols-[0.82fr_1.18fr] xl:items-stretch">
            <div className="relative border-y border-border px-5 py-8 sm:px-7 xl:flex xl:flex-col xl:justify-center xl:py-12">
              <Overline variant="editorial">
                [{product.categoryName} · {product.availabilityLabel}]
              </Overline>
              <h1 className="mt-6 max-w-[13ch] text-[clamp(2.85rem,7.4vw,5rem)] font-light leading-[0.98] tracking-[-0.04em]">
                {productNamePrefix ? <>{productNamePrefix} </> : null}
                <EditorialAccent>{productNameEmphasis}</EditorialAccent>
              </h1>
              <p className="mt-7 max-w-[36rem] text-lg leading-relaxed text-foreground/78 md:text-xl">
                {product.tagline}
              </p>
              <p className="mt-5 max-w-[38rem] text-base leading-relaxed text-muted-foreground">
                {product.summary}
              </p>
              <div className="mt-9 flex max-w-[38rem] flex-col gap-3 sm:flex-row">
                <EditorialActionButton
                  render={<Link href={product.inquiryHref} />}
                  className="w-full justify-start sm:w-auto"
                >
                  {product.primaryCtaLabel ?? 'Projekt anfragen'}
                </EditorialActionButton>
                <EditorialActionButton
                  render={<Link href="/configurator" />}
                  priority="secondary"
                  className="w-full justify-start sm:w-auto"
                >
                  {product.secondaryCtaLabel ?? 'Projekt konfigurieren'}
                </EditorialActionButton>
              </div>
            </div>

            {product.imageUrl ? (
              <figure className="relative min-h-80 overflow-hidden bg-muted sm:min-h-[34rem] xl:min-h-[42rem]">
                <Image
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1279px) 100vw, 59vw"
                  className="object-cover"
                />
              </figure>
            ) : null}
          </div>
        </div>
      </section>

      {benefits.length > 0 ? (
        <section className="border-b border-border bg-card py-14 md:py-20">
          <div className="mardu-container grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-mardu-purple">[Vorteile]</p>
              <h2 className="mardu-homepage-section-title mt-5 max-w-[12ch]">
                Das bringt das Produkt <EditorialAccent>im Betrieb.</EditorialAccent>
              </h2>
            </div>
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {benefits.slice(0, 6).map((benefit) => (
                <li
                  key={`${benefit.group}-${benefit.item}`}
                  className="flex gap-3 border-t border-border pt-4"
                >
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-emerald-500 text-emerald-600">
                    <Check className="size-4" strokeWidth={1.8} aria-hidden="true" />
                  </span>
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
            <Overline variant="editorial">[Auf einen Blick]</Overline>
            <h2 className="mardu-homepage-section-title mt-5 max-w-[12ch]">Highlights</h2>
            <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
              {product.specGroups.flatMap((group) =>
                group.specs.map((spec) => (
                  <article
                    key={`${group.title}-${spec.label}`}
                    className="min-h-56 bg-background p-6 md:p-7"
                  >
                    <span className="flex size-11 items-center justify-center rounded-full border border-emerald-500 text-emerald-600">
                      <Check className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <p className="mt-7 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {spec.label}
                    </p>
                    <h3 className="mt-3 max-w-[22rem] text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground/86">
                      {spec.value}
                    </h3>
                  </article>
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

      <CTASection
        eyebrow="Nächster Schritt"
        title={`${product.name} im Projekt einsetzen?`}
        description="Gemeinsam prüfen wir Zugangspunkt, vorhandene Infrastruktur und Sicherheitskonzept – und klären den passenden Pilotaufbau für deinen Standort."
        primaryButtonText={product.primaryCtaLabel ?? 'Projekt anfragen'}
        primaryButtonHref={product.inquiryHref}
      />
    </div>
  );
}
