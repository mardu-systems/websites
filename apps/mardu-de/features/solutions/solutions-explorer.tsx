'use client';

import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@mardu/ui/lib/utils';
import type { SolutionExplorerViewModel } from './solutions-page-content';

export interface SolutionsExplorerProps {
  items: readonly SolutionExplorerViewModel[];
  integrationsEnabled: boolean;
  initialSlug?: string;
}

const solutionDateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Berlin',
});

export function SolutionsExplorer({
  items,
  integrationsEnabled,
  initialSlug,
}: SolutionsExplorerProps) {
  const initialActiveIndex = Math.max(
    0,
    initialSlug ? items.findIndex((item) => item.slug === initialSlug) : 0,
  );
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem = items[activeIndex];

  if (!activeItem) {
    return null;
  }

  function selectItem(index: number) {
    const selectedItem = items[index];

    setActiveIndex(index);

    if (selectedItem) {
      const url = new URL(window.location.href);
      url.searchParams.set('solution', selectedItem.slug);
      window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    }
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % items.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = items.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    selectItem(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="grid min-w-0 gap-10 xl:grid-cols-[17rem_minmax(0,1fr)_23rem] xl:items-start xl:gap-14 2xl:grid-cols-[18rem_minmax(0,1fr)_25rem]">
      <div
        role="tablist"
        aria-label="Einsatzbereich auswählen"
        aria-orientation="vertical"
        className="grid gap-2"
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`solution-tab-${item.slug}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`solution-panel-${item.slug}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectItem(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                'group min-h-12 cursor-pointer border px-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isActive
                  ? 'border-primary bg-primary py-3 text-primary-foreground'
                  : 'border-border bg-muted/70 text-foreground hover:bg-muted',
              )}
            >
              <span className="flex items-center justify-between gap-3 text-base leading-tight">
                <span>{item.title}</span>
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
                  <span>[01] Anwendungsfälle</span>
                  <span>[02] Vorteile</span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <article
        key={activeItem.id}
        id={`solution-panel-${activeItem.slug}`}
        role="tabpanel"
        aria-labelledby={`solution-tab-${activeItem.slug}`}
        tabIndex={0}
        className="min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div className="flex min-h-12 items-center gap-3 border-b border-border pb-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {activeItem.tagline}
            </p>
            <h2 className="mt-1 text-xl font-medium leading-tight text-foreground">
              {activeItem.title}
            </h2>
          </div>
        </div>

        <div className="max-w-[46rem] space-y-3 border-b border-border py-5">
          {activeItem.heroTitle !== activeItem.title ? (
            <h3 className="text-[1.375rem] font-light leading-tight text-foreground">
              {activeItem.heroTitle}
            </h3>
          ) : null}
          <p className="text-base leading-relaxed text-muted-foreground">{activeItem.summary}</p>
          <p className="text-base leading-relaxed text-muted-foreground">{activeItem.heroIntro}</p>
          {activeItem.updatedAt ? (
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              Aktualisiert am{' '}
              <time dateTime={activeItem.updatedAt}>
                {solutionDateFormatter.format(new Date(activeItem.updatedAt))}
              </time>
            </p>
          ) : null}
        </div>

        <section className="border-b border-border py-5">
          <h3 className="text-base font-normal">
            <span className="mr-1 text-xs text-muted-foreground">[01]</span>
            Typische Anwendungsfälle
          </h3>
          <ul className="mt-4 border-t border-border">
            {activeItem.applications.map((application) => (
              <li
                key={application.id}
                className="grid gap-5 border-b border-border py-5 last:border-b-0 md:grid-cols-2 md:items-center"
              >
                <div className={cn(application.imageSide === 'left' && 'md:order-2')}>
                  {application.eyebrow ? (
                    <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {application.eyebrow}
                    </p>
                  ) : null}
                  <h4 className="mt-1 text-lg font-medium leading-tight">{application.title}</h4>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {application.body}
                  </p>
                </div>
                <div
                  className={cn(
                    'relative aspect-[4/3] overflow-hidden bg-muted',
                    application.imageSide === 'left' && 'md:order-1',
                  )}
                >
                  <Image
                    src={application.imageUrl}
                    alt={application.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, 22rem"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-border py-5">
          <h3 className="text-base font-normal">
            <span className="mr-1 text-xs text-muted-foreground">[02]</span>
            Vorteile
          </h3>
          <ul className="mt-4 border-t border-border">
            {activeItem.benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="border-b border-border py-4 text-base last:border-b-0"
              >
                <h4 className="font-medium text-foreground">{benefit.title}</h4>
                <p className="mt-1 leading-relaxed text-muted-foreground">{benefit.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid border-b border-border py-5 md:grid-cols-[0.42fr_0.58fr]">
          <h3 className="pr-5 text-base font-normal">
            <span className="mr-1 text-xs text-muted-foreground">[03]</span>
            Im Betrieb
          </h3>
          <div className="mt-4 md:mt-0 md:border-l md:border-border md:pl-5">
            <h4 className="max-w-[28rem] text-[1.375rem] font-light leading-tight">
              {activeItem.perspectiveTitle}
            </h4>
            <p className="mt-4 max-w-[42rem] text-base leading-relaxed text-muted-foreground">
              {activeItem.perspectiveBody}
            </p>
          </div>
        </section>

        {activeItem.detailMarkdown ? (
          <section className="py-5">
            <h3 className="text-base font-normal">
              <span className="mr-1 text-xs text-muted-foreground">[04]</span>
              Weitere Details
            </h3>
            <div className="prose mt-4 max-w-none prose-headings:font-sans prose-headings:tracking-[-0.02em] prose-p:text-foreground/85 prose-li:text-foreground/85 prose-strong:text-foreground prose-a:text-foreground prose-a:underline prose-a:underline-offset-3">
              <ReactMarkdown>{activeItem.detailMarkdown}</ReactMarkdown>
            </div>
          </section>
        ) : null}
      </article>

      <aside className="min-w-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            key={activeItem.heroImageUrl}
            src={activeItem.heroImageUrl}
            alt={activeItem.heroImageAlt}
            fill
            loading="eager"
            sizes="(max-width: 1279px) 100vw, 25rem"
            className="object-cover"
          />
        </div>

        <nav aria-label={`Weiterführende Links für ${activeItem.title}`} className="mt-5">
          {[
            {
              label: activeItem.ctaLabel ?? 'Projekt anfragen',
              href: activeItem.ctaHref ?? '/contact',
            },
            ...(integrationsEnabled ? [{ label: 'Integrationen', href: '/integrations' }] : []),
          ].map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex min-h-11 items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </span>
              [{String(index + 1).padStart(2, '0')}] {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
