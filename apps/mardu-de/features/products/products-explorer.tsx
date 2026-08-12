'use client';

import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@mardu/ui/lib/utils';
import type { ProductExplorerCategoryViewModel } from './products-page-content';

export interface ProductsExplorerProps {
  categories: readonly ProductExplorerCategoryViewModel[];
}

function updateHash(value: string) {
  window.history.replaceState(null, '', `#${value}`);
}

export function ProductsExplorer({ categories }: ProductsExplorerProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeProductId, setActiveProductId] = useState(categories[0]?.products[0]?.id ?? '');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCategory = categories[activeCategoryIndex];
  const activeProduct =
    activeCategory?.products.find((product) => product.id === activeProductId) ??
    activeCategory?.products[0];

  if (!activeCategory || !activeProduct) {
    return null;
  }

  function selectCategory(index: number) {
    const category = categories[index];

    if (!category) {
      return;
    }

    setActiveCategoryIndex(index);
    setActiveProductId(category.products[0]?.id ?? '');
    updateHash(`category-${category.slug}`);
  }

  function selectProduct(productId: string, productSlug: string) {
    setActiveProductId(productId);
    updateHash(`product-${productSlug}`);
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % categories.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + categories.length) % categories.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = categories.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    selectCategory(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="grid min-w-0 gap-10 xl:grid-cols-[17rem_minmax(0,1fr)_23rem] xl:items-start xl:gap-14 2xl:grid-cols-[18rem_minmax(0,1fr)_25rem]">
      <div
        role="tablist"
        aria-label="Produktfamilie auswählen"
        aria-orientation="vertical"
        className="grid gap-2"
      >
        {categories.map((category, index) => {
          const isActive = index === activeCategoryIndex;

          return (
            <button
              key={category.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`product-category-tab-${category.slug}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`product-category-panel-${category.slug}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectCategory(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                'group min-h-12 cursor-pointer border px-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isActive
                  ? 'border-primary bg-primary py-3 text-primary-foreground'
                  : 'border-border bg-muted/70 text-foreground hover:bg-muted',
              )}
            >
              <span className="flex items-center justify-between gap-3 text-base leading-tight">
                <span>{category.name}</span>
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-full',
                    isActive
                      ? 'bg-primary-foreground text-primary'
                      : 'bg-foreground text-background',
                  )}
                >
                  {isActive ? (
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  )}
                </span>
              </span>

              {isActive ? (
                <span className="mt-3 flex flex-wrap gap-x-7 gap-y-1 text-xs text-primary-foreground/70">
                  <span>[01] Produkte</span>
                  <span>[02] Einordnung</span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <article
        id={`product-category-panel-${activeCategory.slug}`}
        role="tabpanel"
        aria-labelledby={`product-category-tab-${activeCategory.slug}`}
        tabIndex={0}
        className="min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div className="flex min-h-12 items-center gap-3 border-b border-border pb-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <p className="text-base font-medium text-foreground">{activeCategory.eyebrow}</p>
        </div>

        <div className="border-b border-border py-4">
          <h2 className="text-[1.375rem] font-light leading-tight">{activeCategory.name}</h2>
          <p className="mt-3 max-w-[46rem] text-base leading-relaxed text-muted-foreground">
            {activeCategory.description}
          </p>
        </div>

        <div className="border-b border-border">
          <p className="py-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            [01] Produkte in dieser Familie
          </p>
          <div className="border-t border-border">
            {activeCategory.products.map((product) => {
              const isActive = product.id === activeProduct.id;

              return (
                <button
                  key={product.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectProduct(product.id, product.slug)}
                  className={cn(
                    'group grid w-full cursor-pointer gap-2 border-b border-border px-3 py-3.5 text-left transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center',
                    isActive ? 'bg-foreground text-background' : 'hover:bg-muted/70',
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-full',
                        isActive
                          ? 'bg-background text-foreground'
                          : 'bg-foreground text-background',
                      )}
                    >
                      <ArrowRight className="size-3" aria-hidden="true" />
                    </span>
                    <span className="truncate text-base">{product.name}</span>
                  </span>
                  <span
                    className={cn(
                      'pl-8 text-sm sm:pl-0',
                      isActive ? 'text-background/72' : 'text-muted-foreground',
                    )}
                  >
                    {product.priceFromLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid py-4 md:grid-cols-[0.34fr_0.66fr]">
          <p className="pr-5 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            [02] Einordnung
          </p>
          <div className="mt-4 md:mt-0 md:border-l md:border-border md:pl-5">
            <h3 className="text-[1.375rem] font-light leading-tight">{activeProduct.tagline}</h3>
            <p className="mt-4 max-w-[42rem] text-base leading-relaxed text-muted-foreground">
              {activeProduct.summary}
            </p>
            <dl className="mt-6 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Verfügbarkeit
                </dt>
                <dd className="mt-1 text-sm">{activeProduct.availabilityLabel}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Technologie
                </dt>
                <dd className="mt-1 text-sm">
                  {activeProduct.technologies.length > 0
                    ? activeProduct.technologies.join(' · ')
                    : 'Projektabhängig'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </article>

      <aside className="min-w-0">
        {activeProduct.imageUrl ? (
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              key={activeProduct.imageUrl}
              src={activeProduct.imageUrl}
              alt={activeProduct.imageAlt}
              fill
              loading="eager"
              sizes="(max-width: 1279px) 100vw, 25rem"
              className="object-cover"
            />
          </div>
        ) : null}

        <nav aria-label={`Weiterführende Links für ${activeProduct.name}`} className="mt-5">
          <Link
            href={`/products/${activeProduct.slug}`}
            className="group flex min-h-11 items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </span>
            [01] Produkt im Detail
          </Link>
          <Link
            href="/configurator"
            className="group flex min-h-11 items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </span>
            [02] Projekt konfigurieren
          </Link>
          <Link
            href="/contact"
            className="group flex min-h-11 items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </span>
            [03] Projekt anfragen
          </Link>
        </nav>
      </aside>
    </div>
  );
}
