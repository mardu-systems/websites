'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ChevronDown, Minus, Plus, Search } from 'lucide-react';
import {
  filterProductCatalogItems,
  type ProductCatalogItemViewModel,
} from './products-page-content';

export interface ProductsExplorerProps {
  products: readonly ProductCatalogItemViewModel[];
}

function CatalogSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full appearance-none rounded-xl border border-border bg-card px-4 pr-11 text-sm font-medium text-foreground outline-none transition-colors hover:border-foreground/35 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </label>
  );
}

function ProductTags({ product }: { product: ProductCatalogItemViewModel }) {
  const labels = [
    product.categoryName,
    ...product.technologies.map((technology) => technology.name),
    ...product.carriers.map((carrier) => carrier.name),
    product.availabilityLabel,
  ];

  return (
    <ul className="flex flex-wrap gap-2" aria-label={`Merkmale von ${product.name}`}>
      {[...new Set(labels)].slice(0, 5).map((label) => (
        <li
          key={label}
          className="rounded-full bg-muted px-3 py-1 text-xs leading-5 text-foreground/72"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

function ProductCatalogRow({ product }: { product: ProductCatalogItemViewModel }) {
  const [variantsOpen, setVariantsOpen] = useState(false);
  const hasVariants = product.variants.length > 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/55">
      <div className="grid md:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)]">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`${product.name} ansehen`}
          className="relative min-h-64 overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:min-h-full"
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 18rem"
              className="object-cover transition-transform duration-500 hover:scale-[1.025]"
            />
          ) : (
            <span className="flex h-full min-h-64 items-center justify-center px-6 text-center text-sm text-muted-foreground">
              {product.name}
            </span>
          )}
        </Link>

        <div className="min-w-0">
          <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-7">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
              <Link
                href={`/products/${product.slug}`}
                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {product.name}
              </Link>
            </h2>
            <p className="text-sm text-muted-foreground">{product.categoryName}</p>
          </div>

          <div className="flex min-h-[15rem] flex-col px-5 py-6 md:px-7 md:py-7">
            <p className="max-w-[62rem] text-base leading-relaxed text-foreground/78 md:text-lg">
              {product.summary}
            </p>

            <div className="mt-auto flex flex-col gap-5 pt-8 lg:flex-row lg:items-end lg:justify-between">
              <ProductTags product={product} />
              <div className="flex shrink-0 flex-wrap items-center gap-4">
                {hasVariants ? (
                  <button
                    type="button"
                    aria-expanded={variantsOpen}
                    aria-controls={`variants-${product.id}`}
                    onClick={() => setVariantsOpen((current) => !current)}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {variantsOpen ? 'Varianten schließen' : `Varianten (${product.variants.length})`}
                    {variantsOpen ? (
                      <Minus className="size-4" aria-hidden="true" />
                    ) : (
                      <Plus className="size-4" aria-hidden="true" />
                    )}
                  </button>
                ) : null}
                <Link
                  href={`/products/${product.slug}`}
                  className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Produkt ansehen
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasVariants ? (
        <div
          id={`variants-${product.id}`}
          hidden={!variantsOpen}
          className="border-t border-border bg-background md:ml-[15rem] xl:ml-[18rem]"
        >
          {product.variants.map((variant) => (
            <Link
              key={variant.id}
              href={`/products/${product.slug}?variant=${encodeURIComponent(variant.id)}`}
              className="group flex min-h-14 items-center justify-between gap-4 border-b border-border px-5 py-3 text-sm last:border-b-0 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:px-7"
            >
              <span>
                <span className="font-medium text-foreground">{variant.label}</span>
                <span className="ml-3 text-muted-foreground">{variant.summary}</span>
              </span>
              <ArrowRight
                className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function ProductsExplorer({ products }: ProductsExplorerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [availability, setAvailability] = useState('all');
  const categories = [...new Set(products.map((product) => product.categoryName))];
  const availabilityOptions = [
    ...new Map(
      products.map((product) => [product.availability, product.availabilityLabel] as const),
    ),
  ];
  const filteredProducts = filterProductCatalogItems(products, {
    query,
    category,
    availability,
  });

  return (
    <div>
      <div className="rounded-2xl bg-muted/65 p-4 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/70">
          Produktfilter
        </p>
        <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(18rem,1.4fr)_1fr_1fr]">
          <label className="relative block">
            <span className="sr-only">Produkte durchsuchen</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Produktname oder Einsatz"
              className="min-h-12 w-full rounded-xl border border-border bg-card px-4 pr-12 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            />
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            />
          </label>
          <CatalogSelect
            label="Produkttyp filtern"
            value={category}
            onChange={setCategory}
            options={[
              { value: 'all', label: 'Alle Produkttypen' },
              ...categories.map((name) => ({ value: name, label: name })),
            ]}
          />
          <CatalogSelect
            label="Verfügbarkeit filtern"
            value={availability}
            onChange={setAvailability}
            options={[
              { value: 'all', label: 'Alle Verfügbarkeiten' },
              ...availabilityOptions.map(([value, label]) => ({ value, label })),
            ]}
          />
        </div>
      </div>

      <div className="mt-8 space-y-5" aria-live="polite">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Produkt' : 'Produkte'}
        </p>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCatalogRow key={product.id} product={product} />
          ))
        ) : (
          <div className="rounded-2xl border border-border px-6 py-12 text-center">
            <p className="text-lg font-medium">Keine passenden Produkte gefunden.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
                setAvailability('all');
              }}
              className="mt-4 min-h-11 cursor-pointer text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
