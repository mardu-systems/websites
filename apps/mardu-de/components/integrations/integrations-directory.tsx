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
  logoSrc?: string;
  href: string;
};

type IntegrationsDirectoryProps = {
  items: IntegrationsDirectoryItem[];
};

const INITIAL_ITEM_COUNT = 6;

const STATUS_LABELS: Record<IntegrationStatus, string> = {
  available: 'Verfügbar',
  beta: 'In Beta',
  planned: 'In Planung',
};

export function IntegrationsDirectory({ items }: IntegrationsDirectoryProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'' | IntegrationStatus>('');
  const [showAll, setShowAll] = useState(false);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase('de'));

  const filteredItems = items.filter((item) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      item.title.toLocaleLowerCase('de').includes(deferredQuery) ||
      item.shortDescription.toLocaleLowerCase('de').includes(deferredQuery);
    const matchesStatus = status.length === 0 || item.status === status;

    return matchesQuery && matchesStatus;
  });

  const hasActiveFilter = deferredQuery.length > 0 || status.length > 0;
  const visibleItems =
    showAll || hasActiveFilter ? filteredItems : filteredItems.slice(0, INITIAL_ITEM_COUNT);
  const canToggle = !hasActiveFilter && items.length > INITIAL_ITEM_COUNT;

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
          {visibleItems.length > 0 ? (
            <div>
              {visibleItems.map((item) => (
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
                    <h3 className="text-base font-medium tracking-[-0.015em]">{item.title}</h3>
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

        {canToggle ? (
          <div className="flex justify-center pt-5">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="group inline-flex min-h-10 items-center gap-4 px-4 text-sm text-mardu-purple outline-none focus-visible:ring-1 focus-visible:ring-mardu-purple"
              aria-expanded={showAll}
            >
              {showAll ? 'Weniger anzeigen' : 'Alle Integrationen anzeigen'}
              <ArrowRight
                aria-hidden="true"
                className={`size-5 stroke-[1.35] transition-transform duration-200 motion-reduce:transition-none ${
                  showAll
                    ? '-rotate-90'
                    : 'group-hover:translate-x-1 group-focus-visible:translate-x-1'
                }`}
              />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
