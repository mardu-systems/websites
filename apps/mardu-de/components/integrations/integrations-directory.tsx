'use client';

import type { IntegrationStatus } from '@mardu/content-core';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useDeferredValue, useState } from 'react';

export type IntegrationsDirectoryItem = {
  title: string;
  slug: string;
  shortDescription: string;
  status: IntegrationStatus;
  categories: Array<{ slug: string; title: string }>;
  logoSrc?: string;
  href: string;
};

type IntegrationsDirectoryProps = {
  items: IntegrationsDirectoryItem[];
};

const STATUS_LABELS: Record<IntegrationStatus, string> = {
  available: 'Verfügbar',
  beta: 'In Beta',
  planned: 'In Planung',
};

const STATUS_ORDER = [
  'available',
  'beta',
  'planned',
] as const satisfies readonly IntegrationStatus[];
const UNCATEGORIZED = { slug: 'weitere', title: 'Weitere Integrationen' } as const;

type IntegrationCategoryGroup = {
  slug: string;
  title: string;
  items: IntegrationsDirectoryItem[];
};

type IntegrationStatusGroup = {
  status: IntegrationStatus;
  categories: IntegrationCategoryGroup[];
  itemCount: number;
};

function groupIntegrations(items: IntegrationsDirectoryItem[]): IntegrationStatusGroup[] {
  return STATUS_ORDER.flatMap((status) => {
    const itemsByCategory = new Map<string, IntegrationCategoryGroup>();

    for (const item of items) {
      if (item.status !== status) {
        continue;
      }

      const category = item.categories[0] ?? UNCATEGORIZED;
      const existing = itemsByCategory.get(category.slug);

      if (existing) {
        existing.items.push(item);
      } else {
        itemsByCategory.set(category.slug, {
          ...category,
          items: [item],
        });
      }
    }

    const categories = Array.from(itemsByCategory.values())
      .map((category) => ({
        ...category,
        items: category.items.toSorted((a, b) => a.title.localeCompare(b.title, 'de')),
      }))
      .toSorted((a, b) => a.title.localeCompare(b.title, 'de'));

    return categories.length > 0
      ? [
          {
            status,
            categories,
            itemCount: categories.reduce((sum, group) => sum + group.items.length, 0),
          },
        ]
      : [];
  });
}

export function IntegrationsDirectory({ items }: IntegrationsDirectoryProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'' | IntegrationStatus>('');
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase('de'));

  const filteredItems = items.filter((item) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      item.title.toLocaleLowerCase('de').includes(deferredQuery) ||
      item.shortDescription.toLocaleLowerCase('de').includes(deferredQuery) ||
      item.categories.some((category) =>
        category.title.toLocaleLowerCase('de').includes(deferredQuery),
      );
    const matchesStatus = status.length === 0 || item.status === status;

    return matchesQuery && matchesStatus;
  });
  const groupedItems = groupIntegrations(filteredItems);

  return (
    <section aria-labelledby="integrations-directory-heading" className="pb-16 md:pb-24">
      <div className="mardu-container">
        <h2 id="integrations-directory-heading" className="sr-only">
          Integrationen durchsuchen
        </h2>

        <div className="grid gap-3 border-b border-t border-border py-3 sm:grid-cols-[minmax(0,18rem)_10.5rem]">
          <label className="relative block">
            <span className="sr-only">Integration suchen</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 stroke-[1.5] text-foreground/55"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Integration suchen"
              className="h-10 w-full border border-input bg-transparent pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-foreground/48 focus:border-mardu-purple focus:ring-1 focus:ring-mardu-purple"
            />
          </label>

          <label className="relative block">
            <span className="sr-only">Nach Status filtern</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as '' | IntegrationStatus)}
              className="h-10 w-full appearance-none border border-input bg-transparent px-4 pr-9 text-sm outline-none transition-colors focus:border-mardu-purple focus:ring-1 focus:ring-mardu-purple"
            >
              <option value="">Alle Status</option>
              <option value="available">Verfügbar</option>
              <option value="beta">In Beta</option>
              <option value="planned">In Planung</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 stroke-[1.5] text-foreground/60"
            />
          </label>
        </div>

        <div aria-live="polite">
          {groupedItems.length > 0 ? (
            groupedItems.map((statusGroup) => (
              <section key={statusGroup.status} aria-labelledby={`status-${statusGroup.status}`}>
                <header className="flex items-center justify-between border-b border-border bg-foreground px-3 py-3 text-background sm:px-4">
                  <h3
                    id={`status-${statusGroup.status}`}
                    className="text-sm font-medium tracking-[-0.01em]"
                  >
                    {STATUS_LABELS[statusGroup.status]}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-background/65">
                    {statusGroup.itemCount}{' '}
                    {statusGroup.itemCount === 1 ? 'Integration' : 'Integrationen'}
                  </span>
                </header>

                {statusGroup.categories.map((category) => (
                  <div key={`${statusGroup.status}-${category.slug}`}>
                    <div className="flex items-center justify-between border-b border-border bg-foreground/[0.035] px-3 py-2 sm:px-4">
                      <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-foreground/72">
                        {category.title}
                      </h4>
                      <span className="font-mono text-[10px] text-foreground/48">
                        [{String(category.items.length).padStart(2, '0')}]
                      </span>
                    </div>

                    {category.items.map((item) => (
                      <article key={item.slug} className="group border-b border-border">
                        <Link
                          href={item.href}
                          className="grid min-h-12 items-center gap-3 py-2 outline-none transition-colors hover:bg-black/[0.025] focus-visible:bg-black/[0.04] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-mardu-purple sm:grid-cols-[3rem_minmax(9rem,0.82fr)_minmax(16rem,1.65fr)_8rem_2rem] sm:gap-4 sm:px-3 sm:py-1"
                        >
                          <span className="relative flex size-10 items-center justify-center overflow-hidden bg-white sm:size-9">
                            {item.logoSrc ? (
                              <Image
                                src={item.logoSrc}
                                alt=""
                                width={36}
                                height={36}
                                className="size-8 object-contain p-1"
                              />
                            ) : null}
                          </span>
                          <h5 className="text-base font-medium tracking-[-0.015em]">
                            {item.title}
                          </h5>
                          <p className="col-span-2 text-sm leading-snug text-foreground/64 sm:col-span-1">
                            {item.shortDescription}
                          </p>
                          <p className="text-sm text-foreground/65">{STATUS_LABELS[item.status]}</p>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-5 justify-self-end stroke-[1.35] text-mardu-purple transition-transform duration-200 group-hover:translate-x-1 group-focus-within:translate-x-1 motion-reduce:transition-none"
                          />
                        </Link>
                      </article>
                    ))}
                  </div>
                ))}
              </section>
            ))
          ) : (
            <div className="border-b border-border py-14 text-center">
              <p className="text-base text-foreground/64">Keine passende Integration gefunden.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setStatus('');
                }}
                className="mt-3 text-sm text-mardu-purple underline underline-offset-4"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
