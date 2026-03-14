'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import React from 'react';
import clsx from 'clsx';
import MegaContent from './mega-content';
import { NavEntry } from '@/types/header';
import { useScrollToSection } from '@/hooks/use-scroll-to-section';

interface DesktopNavProps {
  items: NavEntry[];
}

export default function DesktopNav({ items }: DesktopNavProps) {
  return (
    <div
      className={clsx(
        'relative z-90 pointer-events-auto hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-6',
      )}
    >
      {items.map((entry) => (
        <DesktopNavEntry key={entry.label} entry={entry} />
      ))}
    </div>
  );
}

function DesktopNavEntry({ entry }: { entry: NavEntry }) {
  const { scrollToSection } = useScrollToSection();
  const pathname = usePathname();
  const baseClasses =
    'group relative inline-flex cursor-pointer pointer-events-auto items-center rounded-lg px-3 py-2 text-[0.9rem] font-normal tracking-[0.1em] text-neutral-900/80 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white touch-manipulation';

  if (entry.type === 'link') {
    // Prüfe ob es ein Anchor-Link ist (startet mit #)
    if (entry.href.startsWith('#')) {
      const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }

        if (pathname === '/') {
          event.preventDefault();
          scrollToSection(entry.href);
        }
      };
      const resolvedHref = pathname === '/' ? entry.href : `/${entry.href}`;
      return (
        <Link href={resolvedHref} onClick={handleClick} className={clsx(baseClasses)}>
          {entry.label}
        </Link>
      );
    }

    return (
      <Link href={entry.href} className={clsx(baseClasses)}>
        {entry.label}
      </Link>
    );
  }

  // Trigger für Mega-Menü
  return (
    <HoverCard openDelay={50} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          aria-haspopup="menu"
          className={clsx(baseClasses, 'flex items-center gap-1')}
        >
          {entry.label}
          <ChevronDown
            className="h-3.5 w-3.5 transition group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-full pointer-events-auto border border-border bg-background p-0 text-foreground shadow-2xl backdrop-blur-xl">
        <MegaContent group={entry} />
      </HoverCardContent>
    </HoverCard>
  );
}
