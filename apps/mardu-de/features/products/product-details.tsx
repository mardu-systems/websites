import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { ProductExplorerProductViewModel } from './products-page-content';

const productDateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Berlin',
});

function ProductOverview({ product }: { product: ProductExplorerProductViewModel }) {
  const paragraphs = [...new Set([product.summary, product.heroDescription, product.overview])];

  return (
    <section className="grid border-b border-border py-5 md:grid-cols-[0.34fr_0.66fr]">
      <p className="pr-5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        [02] Einordnung
      </p>
      <div className="mt-4 md:mt-0 md:border-l md:border-border md:pl-5">
        <h3 className="text-[1.375rem] font-light leading-tight">{product.tagline}</h3>
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 max-w-[42rem] text-base leading-relaxed text-muted-foreground"
          >
            {paragraph}
          </p>
        ))}
        <dl className="mt-6 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Verfügbarkeit
            </dt>
            <dd className="mt-1 text-sm">{product.availabilityLabel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Technologie
            </dt>
            <dd className="mt-1 text-sm">
              {product.technologies.length > 0
                ? product.technologies.map((technology) => technology.name).join(' · ')
                : 'Projektabhängig'}
            </dd>
          </div>
        </dl>
        {product.updatedAt ? (
          <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
            Aktualisiert am{' '}
            <time dateTime={product.updatedAt}>
              {productDateFormatter.format(new Date(product.updatedAt))}
            </time>
          </p>
        ) : null}
      </div>
    </section>
  );
}

function ProductFeatures({ product }: { product: ProductExplorerProductViewModel }) {
  if (product.featureGroups.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border py-5">
      <h3 className="text-base font-normal">
        <span className="mr-1 text-xs text-muted-foreground">[03]</span>
        Eigenschaften
      </h3>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        {product.featureGroups.map((group) => (
          <div key={group.title} className="border-t border-border pt-4">
            <h4 className="font-medium text-foreground">{group.title}</h4>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductSpecifications({ product }: { product: ProductExplorerProductViewModel }) {
  if (product.specGroups.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border py-5">
      <h3 className="text-base font-normal">
        <span className="mr-1 text-xs text-muted-foreground">[04]</span>
        Spezifikationen
      </h3>
      <div className="mt-4 space-y-6">
        {product.specGroups.map((group) => (
          <div key={group.title}>
            <h4 className="font-medium text-foreground">{group.title}</h4>
            <dl className="mt-3 border-t border-border">
              {group.specs.map((spec) => (
                <div
                  key={`${spec.label}-${spec.value}`}
                  className="grid gap-1 border-b border-border py-3 sm:grid-cols-[0.38fr_0.62fr]"
                >
                  <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                  <dd className="text-sm text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductVariants({ product }: { product: ProductExplorerProductViewModel }) {
  if (product.variants.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border py-5">
      <h3 className="text-base font-normal">
        <span className="mr-1 text-xs text-muted-foreground">[05]</span>
        Varianten
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {product.variants.map((variant) => (
          <article key={variant.id} className="border border-border p-4">
            <h4 className="font-medium text-foreground">{variant.label}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{variant.summary}</p>
            {variant.attributes.length > 0 ? (
              <dl className="mt-4 space-y-2 border-t border-border pt-3">
                {variant.attributes.map((attribute) => (
                  <div key={attribute.label} className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{attribute.label}</dt>
                    <dd className="text-right">{attribute.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <p className="mt-4 text-sm font-medium">
              {variant.priceFromLabel ?? variant.availabilityLabel ?? 'Auf Anfrage'}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductTechnologies({ product }: { product: ProductExplorerProductViewModel }) {
  if (product.technologies.length === 0 && product.carriers.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border py-5">
      <h3 className="text-base font-normal">
        <span className="mr-1 text-xs text-muted-foreground">[06]</span>
        Technologien & Identträger
      </h3>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {product.technologies.length > 0 ? (
          <div>
            <h4 className="font-medium">{product.technologiesHeading ?? 'Technologien'}</h4>
            {product.technologiesIntro ? (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.technologiesIntro}
              </p>
            ) : null}
            <ul className="mt-3 space-y-3">
              {product.technologies.map((technology) => (
                <li key={technology.id}>
                  <p className="text-sm font-medium">{technology.name}</p>
                  <p className="text-sm text-muted-foreground">{technology.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {product.carriers.length > 0 ? (
          <div>
            <h4 className="font-medium">{product.carriersHeading ?? 'Identträger'}</h4>
            {product.carriersIntro ? (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {product.carriersIntro}
              </p>
            ) : null}
            <ul className="mt-3 space-y-3">
              {product.carriers.map((carrier) => (
                <li key={carrier.id}>
                  <p className="text-sm font-medium">{carrier.name}</p>
                  <p className="text-sm text-muted-foreground">{carrier.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProductLongText({ product }: { product: ProductExplorerProductViewModel }) {
  if (!product.detailMarkdown) {
    return null;
  }

  return (
    <section className="border-b border-border py-5">
      <h3 className="text-base font-normal">
        <span className="mr-1 text-xs text-muted-foreground">[07]</span>
        Weitere Produktdetails
      </h3>
      <div className="prose mt-4 max-w-none prose-headings:font-sans prose-headings:tracking-[-0.02em] prose-p:text-foreground/85 prose-li:text-foreground/85 prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-3">
        <ReactMarkdown>{product.detailMarkdown}</ReactMarkdown>
      </div>
    </section>
  );
}

function RelatedProducts({
  product,
  onSelect,
}: {
  product: ProductExplorerProductViewModel;
  onSelect: (slug: string) => void;
}) {
  if (product.relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-5">
      <h3 className="text-base font-normal">
        <span className="mr-1 text-xs text-muted-foreground">[08]</span>
        Passende Produkte
      </h3>
      <div className="mt-4 border-t border-border">
        {product.relatedProducts.map((relatedProduct) => (
          <button
            key={relatedProduct.id}
            type="button"
            onClick={() => onSelect(relatedProduct.slug)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 border-b border-border py-3 text-left transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>
              <span className="block text-sm font-medium">{relatedProduct.name}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {relatedProduct.summary}
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}

export function ProductDetails({
  product,
  onSelectRelatedProduct,
}: {
  product: ProductExplorerProductViewModel;
  onSelectRelatedProduct: (slug: string) => void;
}) {
  return (
    <>
      <ProductOverview product={product} />
      <ProductFeatures product={product} />
      <ProductSpecifications product={product} />
      <ProductVariants product={product} />
      <ProductTechnologies product={product} />
      <ProductLongText product={product} />
      <RelatedProducts product={product} onSelect={onSelectRelatedProduct} />
    </>
  );
}

export function ProductSidebar({ product }: { product: ProductExplorerProductViewModel }) {
  return (
    <aside className="min-w-0">
      {product.imageUrl ? (
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            key={product.imageUrl}
            src={product.imageUrl}
            alt={product.imageAlt}
            fill
            loading="eager"
            sizes="(max-width: 1279px) 100vw, 25rem"
            className="object-cover"
          />
        </div>
      ) : null}

      <nav aria-label={`Weiterführende Links für ${product.name}`} className="mt-5">
        <Link
          href={product.inquiryHref}
          className="group flex min-h-11 items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </span>
          [01] {product.primaryCtaLabel ?? 'Projekt anfragen'}
        </Link>
        <Link
          href="/configurator"
          className="group flex min-h-11 items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </span>
          [02] {product.secondaryCtaLabel ?? 'Projekt konfigurieren'}
        </Link>
      </nav>
    </aside>
  );
}
