'use client';

import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@mardu/ui/lib/utils';
import type { SolutionExplorerViewModel } from './solutions-page-content';

export interface SolutionsExplorerProps {
  items: readonly SolutionExplorerViewModel[];
}

const quickLinks = [
  { index: '02', label: 'Projekt anfragen', href: '/contact' },
  { index: '03', label: 'Integrationen', href: '/integrations' },
] as const;

export function SolutionsExplorer({ items }: SolutionsExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem = items[activeIndex];

  if (!activeItem) {
    return null;
  }

  function selectItem(index: number) {
    setActiveIndex(index);
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
    <div className="grid gap-10 xl:grid-cols-[17rem_minmax(0,1fr)_23rem] xl:items-start xl:gap-14 2xl:grid-cols-[18rem_46.5rem_27.75rem] 2xl:justify-between 2xl:gap-0">
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
                <span>{item.navigationLabel}</span>
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
          <p className="text-base font-medium text-foreground">{activeItem.navigationLabel}</p>
        </div>

        <p className="max-w-[46rem] border-b border-border py-3.5 text-base leading-relaxed text-muted-foreground">
          {activeItem.summary}
        </p>

        <div className="grid border-b border-border md:grid-cols-[0.42fr_0.58fr]">
          <h2 className="py-3.5 pr-5 text-base font-normal">
            <span className="mr-1 text-xs text-muted-foreground">[01]</span>
            Typische Anwendungsfälle
          </h2>
          <ul className="border-t border-border md:border-l md:border-t-0">
            {activeItem.applications.map((application) => (
              <li
                key={application}
                className="border-b border-border px-0 py-3.5 text-base last:border-b-0 md:px-5"
              >
                {application}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid border-b border-border md:grid-cols-[0.42fr_0.58fr]">
          <h2 className="py-3.5 pr-5 text-base font-normal">
            <span className="mr-1 text-xs text-muted-foreground">[02]</span>
            Vorteile
          </h2>
          <ul className="border-t border-border md:border-l md:border-t-0">
            {activeItem.benefits.map((benefit) => (
              <li
                key={benefit}
                className="border-b border-border px-0 py-3.5 text-base last:border-b-0 md:px-5"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid pt-3.5 md:grid-cols-[0.42fr_0.58fr]">
          <h2 className="pr-5 text-base font-normal">
            <span className="mr-1 text-xs text-muted-foreground">[03]</span>
            Im Betrieb
          </h2>
          <div className="mt-4 md:mt-0 md:border-l md:border-border md:pl-5">
            <h3 className="max-w-[28rem] text-[1.375rem] font-light leading-tight">
              {activeItem.perspectiveTitle}
            </h3>
            <p className="mt-4 max-w-[42rem] text-base leading-relaxed text-muted-foreground">
              {activeItem.perspectiveBody}
            </p>
          </div>
        </div>
      </article>

      <aside className="min-w-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            key={activeItem.imageUrl}
            src={activeItem.imageUrl}
            alt={activeItem.imageAlt}
            fill
            loading="eager"
            sizes="(max-width: 1279px) 100vw, 25rem"
            className="object-cover"
          />
        </div>

        <nav aria-label={`Weiterführende Links für ${activeItem.navigationLabel}`} className="mt-5">
          <Link
            href={`/solutions/${activeItem.slug}`}
            className="group flex min-h-11 items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </span>
            [01] Lösung im Detail
          </Link>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex min-h-11 items-center gap-2 border-b border-border py-2 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </span>
              [{link.index}] {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
