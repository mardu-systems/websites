'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import NavLink from '@mardu/layout/nav-link';
import { Button } from '@mardu/ui/components/button';
import type { NavEntry } from '@/types/header';

type HeaderProps = {
  items: NavEntry[];
};

function useScrolledPast(px: number) {
  const [past, setPast] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      setPast(window.scrollY >= px);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [px]);

  return past;
}

export default function SiteHeader({ items }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = React.useState(72);

  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => setHeaderHeight(el.getBoundingClientRect().height);

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const scrolledPastHeader = useScrolledPast(headerHeight);
  const navItems = items.filter(
    (item): item is Extract<NavEntry, { type: 'link' }> => item.type === 'link',
  );

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      style={{ '--site-header-h': `${headerHeight}px` } as React.CSSProperties}
    >
      <div
        className={[
          'transition-[background-color,border-color,backdrop-filter] duration-150',
          scrolledPastHeader
            ? 'border-b border-black/8 bg-(--paper) backdrop-blur supports-backdrop-filter:bg-(--paper)/90'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <nav
          className="mardu-container flex h-18 items-center justify-between gap-4"
          aria-label="Hauptnavigation"
        >
          <Link
            href="/"
            aria-label="Mardu Platform"
            className="block touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative h-11 w-35">
              <Image src="/logos/Logo.svg" alt="Mardu Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href} label={item.label} />
            ))}
            <Button asChild>
              <Link href="/admin">Admin Login</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>

        {mobileOpen ? (
          <div id="mobile-nav" className="border-t border-black/8 bg-background/95 md:hidden">
            <div className="mardu-container flex flex-col gap-5 py-5">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  className="py-2 text-base"
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
              <Button asChild className="mt-2 w-full">
                <Link href="/admin" onClick={() => setMobileOpen(false)}>
                  Admin Login
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
