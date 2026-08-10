'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronUp } from 'lucide-react';
import { useScrollToSection } from '@mardu/layout/use-scroll-to-section';
import { cn } from '@mardu/ui/lib/utils';
import { homepageNavigation, type HomepageNavigationItem } from '../homepage-content';

function IndexLink({
  item,
  active,
  onNavigate,
  className,
}: {
  item: HomepageNavigationItem;
  active: boolean;
  onNavigate: (item: HomepageNavigationItem, event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  return (
    <Link
      href={item.href}
      onClick={(event) => onNavigate(item, event)}
      aria-current={active ? 'location' : undefined}
      className={cn(
        'group flex min-w-0 flex-col justify-between gap-2 px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-mardu-purple',
        active ? 'bg-black/[0.045]' : 'hover:bg-black/[0.025]',
        className,
      )}
    >
      <span className="flex items-start justify-between gap-3">
        <span className={cn('text-xs', active ? 'text-mardu-purple' : 'text-muted-foreground')}>
          [{item.index}]
        </span>
        <ArrowUpRight
          className={cn(
            'size-3.5 transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none',
            active ? 'text-mardu-purple' : 'text-muted-foreground',
          )}
          aria-hidden="true"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-normal tracking-[-0.01em]">{item.label}</span>
        <span data-index-description className="mt-1 block truncate text-xs text-muted-foreground">
          {item.description}
        </span>
      </span>
    </Link>
  );
}

export function HomepageIndex() {
  const [activeSection, setActiveSection] = React.useState('system');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [homepageHeroVisible, setHomepageHeroVisible] = React.useState(true);
  const [footerVisible, setFooterVisible] = React.useState(false);
  const { scrollToSection } = useScrollToSection({ updateHash: true, delayMs: 0 });

  React.useEffect(() => {
    const sectionItems = homepageNavigation.filter((item) => item.href.startsWith('#'));
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.36;
      let nextSection = sectionItems[0]?.href.slice(1) ?? 'system';

      for (const item of sectionItems) {
        const element = document.getElementById(item.href.slice(1));
        if (element && element.offsetTop <= marker) {
          nextSection = element.id;
        }
      }

      setActiveSection((current) => (current === nextSection ? current : nextSection));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  React.useEffect(() => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        setHomepageHeroVisible(visible);
        if (visible) setMobileOpen(false);
      },
      { threshold: 0.05 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry?.isIntersecting ?? false);
      if (entry?.isIntersecting) setMobileOpen(false);
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleNavigate = React.useCallback(
    (item: HomepageNavigationItem, event: React.MouseEvent<HTMLAnchorElement>) => {
      setMobileOpen(false);
      if (!item.href.startsWith('#')) return;

      event.preventDefault();
      const id = item.href.slice(1);
      setActiveSection(id);
      scrollToSection(id);
    },
    [scrollToSection],
  );

  const activeItem =
    homepageNavigation.find((item) => item.href === `#${activeSection}`) ?? homepageNavigation[0];
  const activePosition = Math.max(
    1,
    homepageNavigation.findIndex((item) => item.index === activeItem.index) + 1,
  );
  const indexHidden = homepageHeroVisible || footerVisible;

  return (
    <>
      <nav
        aria-label="Kapitel der Startseite"
        aria-hidden={indexHidden}
        inert={indexHidden}
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 hidden bg-background/95 backdrop-blur-md transition-transform duration-200 [&_[data-index-description]]:hidden 2xl:[&_[data-index-description]]:block lg:block',
          indexHidden && 'translate-y-full',
        )}
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-7 divide-x divide-border">
          {homepageNavigation.map((item) => (
            <IndexLink
              key={item.index}
              item={item}
              active={item.href === `#${activeSection}`}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      </nav>

      <div
        aria-hidden={indexHidden}
        inert={indexHidden}
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 bg-background/95 backdrop-blur-md transition-transform duration-200 lg:hidden',
          indexHidden && 'translate-y-full',
        )}
      >
        <div className="h-px bg-black/10" aria-hidden="true">
          <span
            className="block h-full bg-mardu-purple transition-[width] duration-200"
            style={{ width: `${(activePosition / homepageNavigation.length) * 100}%` }}
          />
        </div>
        {mobileOpen ? (
          <nav
            id="mobile-chapter-index"
            aria-label="Kapitel der Startseite"
            className="grid max-h-[55svh] grid-cols-2 overflow-y-auto border-b border-border sm:grid-cols-4"
          >
            {homepageNavigation.map((item) => (
              <IndexLink
                key={item.index}
                item={item}
                active={item.href === `#${activeSection}`}
                onNavigate={handleNavigate}
                className="border-b border-r border-border"
              />
            ))}
          </nav>
        ) : null}

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="mardu-container flex h-12 w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-mardu-purple"
          aria-expanded={mobileOpen}
          aria-controls="mobile-chapter-index"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="text-xs text-mardu-purple">[{activeItem.index}]</span>
            <span className="truncate text-sm font-normal tracking-[-0.01em]">
              {activeItem.label}
            </span>
          </span>
          <ChevronUp
            className={cn('size-4 transition-transform', mobileOpen && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );
}
