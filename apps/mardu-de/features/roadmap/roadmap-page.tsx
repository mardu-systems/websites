'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import type { RoadmapItemDto, RoadmapStatus } from '@mardu/content-core';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@mardu/ui/components/dialog';
import { cn } from '@mardu/ui/lib/utils';
import SiteContactForm from '@/components/forms/contact';

type RoadmapFilter = 'all' | RoadmapStatus;

const statusOrder: RoadmapStatus[] = ['done', 'beta', 'in-progress', 'planned'];

const statusContent: Record<
  RoadmapStatus,
  { label: string; shortLabel: string; colorClassName: string }
> = {
  done: {
    label: 'Kürzlich umgesetzt',
    shortLabel: 'Umgesetzt',
    colorClassName: 'bg-primary',
  },
  beta: {
    label: 'Im Pilot',
    shortLabel: 'Pilot',
    colorClassName: 'bg-secondary-foreground',
  },
  'in-progress': {
    label: 'In Arbeit',
    shortLabel: 'In Arbeit',
    colorClassName: 'bg-muted-foreground',
  },
  planned: {
    label: 'Vorgesehen',
    shortLabel: 'Vorgesehen',
    colorClassName: 'bg-accent',
  },
};

const categoryLabels: Record<RoadmapItemDto['category'], string> = {
  software: 'Software',
  hardware: 'Hardware',
  platform: 'Plattform',
  integrations: 'Integrationen',
};

const featureRequestSource = 'roadmap-feature-request';

function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase('de');
}

function matchesSearch(item: RoadmapItemDto, query: string) {
  if (!query) {
    return true;
  }

  return [item.title, item.summary, categoryLabels[item.category], statusContent[item.status].label]
    .join(' ')
    .toLocaleLowerCase('de')
    .includes(query);
}

function RoadmapCard({ item }: { item: RoadmapItemDto }) {
  const status = statusContent[item.status];

  return (
    <li className="group flex min-h-48 flex-col border-b border-border px-0 py-5 md:min-h-52 md:border-r md:px-5 xl:px-6">
      <div className="pt-1">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-background',
              status.colorClassName,
            )}
            role="img"
            aria-label={`Status: ${status.label}`}
          >
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <h2 className="max-w-[22ch] text-xl font-light leading-[1.12] tracking-[-0.025em] text-foreground md:text-[1.375rem]">
            {item.title}
          </h2>
        </div>
        <p className="mt-3 max-w-[34rem] pl-9 text-base leading-[1.6] text-muted-foreground">
          {item.summary}
        </p>
      </div>
    </li>
  );
}

function FeatureRequestDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="group flex min-h-12 w-full cursor-pointer items-center justify-between border-y border-border py-2.5 text-left text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          />
        }
      >
        Funktion vorschlagen
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ArrowRight
            className="size-4 -rotate-45 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </span>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-none border-border bg-background p-0 shadow-2xl sm:max-w-2xl"
      >
        <DialogClose className="absolute top-3 right-3 z-10 flex size-8 cursor-pointer items-center justify-center border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Dialog schließen</span>
        </DialogClose>
        <DialogHeader className="border-b border-border px-6 py-7 pr-14 text-left md:px-9 md:py-9">
          <p className="font-mono text-xs tracking-[0.14em] text-mardu-purple">[FUNKTIONSWUNSCH]</p>
          <DialogTitle className="max-w-[18ch] text-[clamp(2rem,5vw,3rem)] font-light leading-[0.98] tracking-[-0.035em] text-foreground">
            Welche Funktion fehlt dir?
          </DialogTitle>
          <DialogDescription className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Beschreibe kurz den Anwendungsfall. Wir prüfen den Wunsch im Kontext der
            bestehenden Roadmap und melden uns persönlich zurück.
          </DialogDescription>
        </DialogHeader>
        <div className="contact-editorial-form px-6 py-7 md:px-9 md:py-9">
          <SiteContactForm
            submit
            action="/api/contact"
            initialMessage={'Funktionswunsch zur Mardu-Roadmap:\n\n'}
            extra={{ source: featureRequestSource }}
            submitLabel="Funktionswunsch senden"
            successMessage="Danke! Wir prüfen den Funktionswunsch und melden uns bei dir."
            layout="plain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function RoadmapPage({ items }: { items: RoadmapItemDto[] }) {
  const [activeFilter, setActiveFilter] = useState<RoadmapFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  const statusCounts = useMemo(() => {
    const counts: Record<RoadmapStatus, number> = {
      done: 0,
      beta: 0,
      'in-progress': 0,
      planned: 0,
    };

    for (const item of items) {
      counts[item.status] += 1;
    }

    return counts;
  }, [items]);

  const visibleItems = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(deferredQuery);

    return items.filter(
      (item) =>
        (activeFilter === 'all' || item.status === activeFilter) &&
        matchesSearch(item, normalizedQuery),
    );
  }, [activeFilter, deferredQuery, items]);

  return (
    <main className="border-t border-border bg-background">
      <section aria-labelledby="roadmap-title" className="pb-20 md:pb-24">
        <div className="w-full px-5 pt-14 md:px-8 md:pt-18 xl:px-12 xl:pt-20">
          <header className="grid gap-12 border-b border-border pb-14 md:pb-16 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.42fr)] xl:items-end xl:gap-20">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">[ROADMAP]</p>
              <h1
                id="roadmap-title"
                className="mt-6 max-w-[15ch] text-[clamp(3rem,5vw,3.75rem)] font-light leading-[0.94] tracking-[-0.04em] text-foreground"
              >
                Was als{' '}
                <em className="font-serif font-normal italic tracking-[-0.025em] text-mardu-purple">
                  Nächstes
                </em>{' '}
                entsteht.
              </h1>
              <p className="mt-10 max-w-[52rem] text-base leading-relaxed text-muted-foreground">
                Mardu entwickelt Hardware, Software, Plattformfunktionen und Integrationen
                kontinuierlich weiter. Die Roadmap zeigt,{' '}
                <strong className="font-medium text-foreground">
                  was bereits verfügbar ist, woran wir arbeiten und welche Themen als Nächstes
                  vorgesehen sind.
                </strong>
              </p>
            </div>

            <div className="border-t border-border pt-5 xl:mb-1">
              <label
                htmlFor="roadmap-search"
                className="font-mono text-xs tracking-[0.14em] text-muted-foreground"
              >
                [SUCHE]
              </label>
              <form
                role="search"
                onSubmit={(event) => event.preventDefault()}
                className="mt-4 flex min-h-11 items-center rounded-full bg-muted pl-5 ring-1 ring-transparent transition-[background-color,box-shadow] duration-200 focus-within:ring-ring"
              >
                <input
                  id="roadmap-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Thema oder Kategorie"
                  className="h-11 min-w-0 flex-1 bg-transparent pr-3 text-base text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  aria-label="Roadmap durchsuchen"
                  className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Search className="size-5" aria-hidden="true" />
                </button>
              </form>
            </div>
          </header>

          <div className="grid border-b border-border lg:grid-cols-[8rem_1fr]">
            <div className="border-b border-border py-4 lg:border-r lg:border-b-0 lg:pr-5">
              <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground">[STATUS]</p>
            </div>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              aria-label="Roadmap nach Status filtern"
            >
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                aria-pressed={activeFilter === 'all'}
                className={cn(
                  'min-h-11 cursor-pointer border-r border-border px-3 py-2 text-left text-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                  activeFilter === 'all'
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted',
                )}
              >
                Alle <span className="ml-1 font-mono text-xs opacity-60">{items.length}</span>
              </button>
              {statusOrder.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setActiveFilter(status)}
                  aria-pressed={activeFilter === status}
                  className={cn(
                    'flex min-h-11 cursor-pointer items-center gap-2 border-r border-border px-3 py-2 text-left text-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                    activeFilter === status
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-muted',
                  )}
                >
                  <span
                    className={cn(
                      'size-2.5 shrink-0 rounded-full',
                      statusContent[status].colorClassName,
                    )}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 truncate">{statusContent[status].shortLabel}</span>
                  <span className="ml-auto font-mono text-xs opacity-60">
                    {statusCounts[status]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-12 items-center justify-between gap-6 border-b border-border py-2 text-xs text-muted-foreground">
            <p aria-live="polite">
              {visibleItems.length === 1
                ? '1 Entwicklungsfeld'
                : `${visibleItems.length} Entwicklungsfelder`}
            </p>
            {(activeFilter !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="min-h-11 cursor-pointer text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Filter zurücksetzen
              </button>
            )}
          </div>

          {visibleItems.length > 0 ? (
            <ol className="grid md:grid-cols-2 xl:grid-cols-4 [&>li:nth-child(2n)]:md:border-r-0 [&>li:nth-child(4n)]:xl:border-r-0 [&>li:nth-child(4n+1)]:xl:pl-0">
              {visibleItems.map((item) => (
                <RoadmapCard key={item.id} item={item} />
              ))}
            </ol>
          ) : (
            <div className="grid min-h-80 place-items-center border-b border-border py-16 text-center">
              <div className="max-w-md">
                <p className="text-[1.375rem] font-light leading-tight text-foreground">
                  {items.length === 0
                    ? 'Derzeit sind keine Roadmap-Einträge veröffentlicht.'
                    : 'Keine passenden Entwicklungsfelder gefunden.'}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {items.length === 0
                    ? 'Sobald neue Entwicklungsfelder veröffentlicht werden, erscheinen sie hier.'
                    : 'Ändere den Suchbegriff oder setze die Filter zurück.'}
                </p>
              </div>
            </div>
          )}

          <footer className="grid gap-10 border-b border-border py-12 md:py-14 xl:grid-cols-[1fr_0.62fr] xl:items-end xl:gap-20">
            <div>
              <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground">[HINWEIS]</p>
              <p className="mt-5 max-w-[52rem] text-base leading-relaxed text-muted-foreground">
                Die Roadmap beschreibt die aktuelle Entwicklungsrichtung. Reihenfolge, Umfang und
                Veröffentlichung können sich durch Pilotprojekte, technische Prüfungen und
                Rückmeldungen aus dem Betrieb verändern.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <FeatureRequestDialog />
              <Link
                href="/contact"
                className="group flex min-h-12 items-center justify-between border-b border-border py-2.5 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                Projekt oder Pilot besprechen
                <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-background">
                  <ArrowRight
                    className="size-4 -rotate-45 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
