'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Loader2, Menu, X } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';
import { cn } from '@mardu/ui/lib/utils';
import type {
  HeaderCtaDto,
  HeaderNavItemDto,
  HeaderNavLinkDto,
  MeetergoPrefillDto,
  SiteHeaderProps,
} from './dto';

interface MeetergoIntegration {
  launchScheduler: (schedulerLink?: string, params?: Record<string, string>) => void;
  isReady: () => boolean;
  openModal: () => void;
  closeModal: () => void;
  setPrefill: (prefill: MeetergoPrefillDto) => void;
}

declare global {
  interface Window {
    meetergo?: MeetergoIntegration;
  }
}

const MEETERGO_SRC = 'https://liv-showcase.s3.eu-central-1.amazonaws.com/browser-v3.js';

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

function useAnchorNavigation() {
  const pathname = usePathname();

  return React.useCallback(
    (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
      const isAnchor = href.startsWith('#');
      if (
        !isAnchor ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return false;
      }

      if (pathname !== '/') {
        return false;
      }

      event.preventDefault();

      const id = href.slice(1);
      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

      window.setTimeout(() => {
        const element = document.getElementById(id);
        if (!element) return;

        element.scrollIntoView({ behavior, block: 'start' });
        const hash = `#${id}`;
        if (window.location.hash !== hash) {
          window.history.pushState(null, '', hash);
        }
      }, 100);

      return true;
    },
    [pathname],
  );
}

function resolveHeaderHref(href: string, pathname: string | null) {
  return href.startsWith('#') && pathname !== '/' ? `/${href}` : href;
}

function HeaderNavLink({
  item,
  className,
  onNavigate,
}: {
  item: HeaderNavLinkDto;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const handleAnchorNavigation = useAnchorNavigation();
  const href = resolveHeaderHref(item.href, pathname);

  return (
    <Link
      href={href}
      onClick={(event) => {
        handleAnchorNavigation(item.href, event);
        onNavigate?.();
      }}
      className={cn(
        'text-sm uppercase tracking-[0.1em] text-foreground/70 transition-colors hover:text-foreground',
        className,
      )}
    >
      {item.label}
    </Link>
  );
}

function isExternalHref(href: string, external?: boolean) {
  return external ?? /^https?:\/\//i.test(href);
}

function LinkButton({
  cta,
  className,
  onNavigate,
}: {
  cta: HeaderCtaDto;
  className?: string;
  onNavigate?: () => void;
}) {
  const external = isExternalHref(cta.href, cta.external);

  if (external) {
    return (
      <Button asChild className={className}>
        <a href={cta.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
          {cta.label}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild className={className}>
      <Link href={cta.href} onClick={onNavigate}>
        {cta.label}
      </Link>
    </Button>
  );
}

function MeetergoButton({
  cta,
  className,
  onNavigate,
}: {
  cta: HeaderCtaDto;
  className?: string;
  onNavigate?: () => void;
}) {
  const [loading, setLoading] = React.useState(false);

  const ensureScript = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      if (window.meetergo?.isReady()) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(`script[src="${MEETERGO_SRC}"]`);
      if (existingScript) {
        if (existingScript.getAttribute('data-loaded') === 'true') {
          resolve();
        } else {
          existingScript.addEventListener('load', () => resolve(), { once: true });
          existingScript.addEventListener('error', (error) => reject(error), { once: true });
        }
        return;
      }

      const script = document.createElement('script');
      script.src = MEETERGO_SRC;
      script.async = true;
      script.setAttribute('data-loaded', 'false');
      script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        resolve();
      };
      script.onerror = (error) => {
        script.setAttribute('data-loaded', 'error');
        reject(error);
      };
      document.body.appendChild(script);
    });
  }, []);

  const handleClick = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onNavigate?.();

      try {
        setLoading(true);
        await ensureScript();

        if (!window.meetergo) {
          await new Promise((resolve) => window.setTimeout(resolve, 100));
        }

        if (!window.meetergo) {
          console.error('Meetergo SDK not initialized');
          return;
        }

        const params: Record<string, string> = {};
        if (cta.prefill) {
          for (const [key, value] of Object.entries(cta.prefill)) {
            if (value !== undefined) {
              params[key] = value;
            }
          }
        }

        window.meetergo.launchScheduler(cta.href, params);
      } catch (error) {
        console.error('Failed to load Meetergo script', error);
      } finally {
        setLoading(false);
      }
    },
    [cta.href, cta.prefill, ensureScript, onNavigate],
  );

  return (
    <Button
      onClick={handleClick}
      className={className}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
      {cta.label}
    </Button>
  );
}

function HeaderCtaButton({
  cta,
  className,
  onNavigate,
}: {
  cta?: HeaderCtaDto;
  className?: string;
  onNavigate?: () => void;
}) {
  if (!cta) return null;

  if (cta.mode === 'link') {
    return <LinkButton cta={cta} className={className} onNavigate={onNavigate} />;
  }

  return <MeetergoButton cta={cta} className={className} onNavigate={onNavigate} />;
}

export default function SiteHeader({
  brand,
  items,
  cta,
  navigationLabel = 'Hauptnavigation',
  menuOpenLabel = 'Menü öffnen',
  menuCloseLabel = 'Menü schließen',
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = React.useState(72);

  React.useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const measure = () => setHeaderHeight(element.getBoundingClientRect().height);

    measure();

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  const scrolledPastHeader = useScrolledPast(headerHeight);
  const navItems = items.filter(
    (item): item is HeaderNavLinkDto => item.type === 'link',
  );

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      style={{ '--site-header-h': `${headerHeight}px` } as React.CSSProperties}
    >
      <div
        className={cn(
          'transition-[background-color,border-color,backdrop-filter] duration-150',
          scrolledPastHeader
            ? 'border-b border-black/8 bg-(--paper) backdrop-blur supports-backdrop-filter:bg-(--paper)/90'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          className="mardu-container flex h-18 items-center justify-between gap-4"
          aria-label={navigationLabel}
        >
          <Link
            href={brand.homeHref}
            aria-label={brand.logoAlt}
            className="block touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div
              className="relative"
              style={{
                width: brand.logoWidth ?? 140,
                height: brand.logoHeight ?? 44,
              }}
            >
              <Image
                src={brand.logoSrc}
                alt={brand.logoAlt}
                fill
                className="object-contain"
                priority
                sizes={`${brand.logoWidth ?? 140}px`}
              />
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <HeaderNavLink key={`${item.label}:${item.href}`} item={item} />
            ))}
            <HeaderCtaButton cta={cta} className="mt-0 w-auto sm:ml-0 sm:mt-0" />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? menuCloseLabel : menuOpenLabel}
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
                <HeaderNavLink
                  key={`${item.label}:${item.href}`}
                  item={item}
                  className="py-2 text-base"
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
              <HeaderCtaButton
                cta={cta}
                onNavigate={() => setMobileOpen(false)}
                className="mt-2 w-full sm:ml-0 sm:mt-2 sm:w-full"
              />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export type { SiteHeaderProps };
