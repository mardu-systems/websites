"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Loader2, Menu, X } from "lucide-react";
import { Button } from "@mardu/ui/components/button";
import { cn } from "@mardu/ui/lib/utils";
import type {
  HeaderCtaDto,
  HeaderNavLinkDto,
  MeetergoPrefillDto,
  SiteHeaderProps,
} from "./dto";

interface MeetergoIntegration {
  launchScheduler: (
    schedulerLink?: string,
    params?: Record<string, string>,
  ) => void;
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

const MEETERGO_SRC =
  "https://liv-showcase.s3.eu-central-1.amazonaws.com/browser-v3.js";

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
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [px]);

  return past;
}

function useAnchorNavigation() {
  const pathname = usePathname();

  return React.useCallback(
    (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
      const isAnchor = href.startsWith("#");
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

      if (pathname !== "/") {
        return false;
      }

      event.preventDefault();

      const id = href.slice(1);
      const prefersReducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";

      window.setTimeout(() => {
        const element = document.getElementById(id);
        if (!element) return;

        element.scrollIntoView({ behavior, block: "start" });
        const hash = `#${id}`;
        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        }
      }, 100);

      return true;
    },
    [pathname],
  );
}

function resolveHeaderHref(href: string, pathname: string | null) {
  return href.startsWith("#") && pathname !== "/" ? `/${href}` : href;
}

function HeaderNavLink({
  item,
  className,
  onNavigate,
  variant = "default",
}: {
  item: HeaderNavLinkDto;
  className?: string;
  onNavigate?: () => void;
  variant?: "default" | "editorial-index";
}) {
  const pathname = usePathname();
  const handleAnchorNavigation = useAnchorNavigation();
  const href = resolveHeaderHref(item.href, pathname);
  const isCurrentRoute =
    !item.href.startsWith("#") && pathname?.startsWith(item.href);

  if (variant === "editorial-index") {
    return (
      <Link
        href={href}
        aria-current={isCurrentRoute ? "page" : undefined}
        onClick={(event) => {
          handleAnchorNavigation(item.href, event);
          onNavigate?.();
        }}
        className={cn(
          "group flex min-h-11 min-w-0 flex-col justify-center text-left text-foreground transition-colors hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-mardu-purple",
          isCurrentRoute && "text-mardu-purple",
          className,
        )}
      >
        <span data-nav-copy className="flex min-w-0 flex-col">
          {item.index ? (
            <span className="text-[0.6875rem] leading-none text-mardu-purple">
              [{item.index}
            </span>
          ) : null}
          <span
            data-label
            className="mt-1 truncate text-[0.8125rem] font-normal uppercase leading-none tracking-[0.02em]"
          >
            {item.label}]
          </span>
          {item.description ? (
            <span
              data-description
              className="mt-1 whitespace-pre-line text-[0.6875rem] leading-[1.35] text-foreground/55 group-hover:text-mardu-purple/80"
            >
              {item.description}
            </span>
          ) : null}
        </span>
        <span
          data-nav-arrow
          className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4 stroke-[1.8] transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isCurrentRoute ? "page" : undefined}
      onClick={(event) => {
        handleAnchorNavigation(item.href, event);
        onNavigate?.();
      }}
      className={cn(
        "text-sm uppercase tracking-[0.1em] text-foreground/70 transition-colors hover:text-foreground",
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
  showArrow = false,
}: {
  cta: HeaderCtaDto;
  className?: string;
  onNavigate?: () => void;
  showArrow?: boolean;
}) {
  const external = isExternalHref(cta.href, cta.external);

  if (external) {
    return (
      <Button
        render={
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
          />
        }
        className={className}
      >
        {showArrow ? (
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mardu-purple text-white"
            aria-hidden="true"
          >
            <ArrowUpRight className="size-3.5 stroke-[1.8] transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none" />
          </span>
        ) : null}
        {cta.label}
      </Button>
    );
  }

  return (
    <Button
      render={<Link href={cta.href} onClick={onNavigate} />}
      className={className}
    >
      {showArrow ? (
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mardu-purple text-white"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-3.5 stroke-[1.8] transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none" />
        </span>
      ) : null}
      {cta.label}
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
      if (typeof window === "undefined") {
        resolve();
        return;
      }

      if (window.meetergo?.isReady()) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(
        `script[src="${MEETERGO_SRC}"]`,
      );
      if (existingScript) {
        if (existingScript.getAttribute("data-loaded") === "true") {
          resolve();
        } else {
          existingScript.addEventListener("load", () => resolve(), {
            once: true,
          });
          existingScript.addEventListener("error", (error) => reject(error), {
            once: true,
          });
        }
        return;
      }

      const script = document.createElement("script");
      script.src = MEETERGO_SRC;
      script.async = true;
      script.setAttribute("data-loaded", "false");
      script.onload = () => {
        script.setAttribute("data-loaded", "true");
        resolve();
      };
      script.onerror = (error) => {
        script.setAttribute("data-loaded", "error");
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
          console.error("Meetergo SDK not initialized");
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
        console.error("Failed to load Meetergo script", error);
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
      {loading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : null}
      {cta.label}
    </Button>
  );
}

function HeaderCtaButton({
  cta,
  className,
  onNavigate,
  showArrow = false,
}: {
  cta?: HeaderCtaDto;
  className?: string;
  onNavigate?: () => void;
  showArrow?: boolean;
}) {
  if (!cta) return null;

  if (cta.mode === "link") {
    return (
      <LinkButton
        cta={cta}
        className={className}
        onNavigate={onNavigate}
        showArrow={showArrow}
      />
    );
  }

  return (
    <MeetergoButton cta={cta} className={className} onNavigate={onNavigate} />
  );
}

function MobileMenuTriggerIcon({
  iconSrc,
  closeIconSrc,
  open,
  fallbackClassName = "size-4",
}: {
  iconSrc?: string;
  closeIconSrc?: string;
  open: boolean;
  fallbackClassName?: string;
}) {
  if (!iconSrc) {
    return open ? (
      <X className={fallbackClassName} />
    ) : (
      <Menu className={fallbackClassName} />
    );
  }

  if (closeIconSrc) {
    return (
      <span
        className={cn(
          "relative block size-8 shrink-0 overflow-hidden transition-[rotate,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "rotate-[55deg] scale-[0.92]" : "rotate-0 scale-100",
        )}
        aria-hidden="true"
      >
        <Image
          src={iconSrc}
          alt=""
          fill
          sizes="32px"
          className={cn(
            "object-contain transition-opacity duration-150 ease-out motion-reduce:transition-none",
            open ? "opacity-0" : "delay-100 opacity-100",
          )}
        />
        <Image
          src={closeIconSrc}
          alt=""
          fill
          sizes="32px"
          className={cn(
            "object-contain transition-opacity duration-150 ease-out motion-reduce:transition-none",
            open ? "delay-100 opacity-100" : "opacity-0",
          )}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative block size-8 shrink-0 overflow-hidden transition-transform duration-200 motion-reduce:transition-none",
        open && "rotate-6 scale-105",
      )}
      aria-hidden="true"
    >
      <Image
        src={iconSrc}
        alt=""
        fill
        sizes="32px"
        className="object-contain"
      />
    </span>
  );
}

function MobileMenuTriggerLabel({ open }: { open: boolean }) {
  return (
    <span
      className="inline-grid h-5 overflow-hidden text-left leading-5"
      aria-hidden="true"
    >
      <span
        className={cn(
          "col-start-1 row-start-1 transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none",
          open
            ? "-translate-y-full opacity-0"
            : "delay-75 translate-y-0 opacity-100",
        )}
      >
        Menü
      </span>
      <span
        className={cn(
          "col-start-1 row-start-1 transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none",
          open
            ? "delay-75 translate-y-0 opacity-100"
            : "translate-y-full opacity-0",
        )}
      >
        Schließen
      </span>
    </span>
  );
}

export default function SiteHeader({
  brand,
  items,
  cta,
  variant = "default",
  navigationLabel = "Hauptnavigation",
  menuOpenLabel = "Menü öffnen",
  menuCloseLabel = "Menü schließen",
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = React.useState(72);
  const pathname = usePathname();

  React.useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const measure = () =>
      setHeaderHeight(element.getBoundingClientRect().height);
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const header = headerRef.current;
      if (!header) return;

      const focusableElements = Array.from(
        header.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      const activeElement = document.activeElement;
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const scrolledPastHeader = useScrolledPast(headerHeight);
  const navItems = items.filter(
    (item): item is HeaderNavLinkDto => item.type === "link",
  );

  if (variant === "editorial-index") {
    return (
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50"
        style={
          { "--site-header-h": `${headerHeight}px` } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color,backdrop-filter] duration-150",
            scrolledPastHeader || mobileOpen
              ? "border-border bg-background/95 backdrop-blur-md"
              : "border-transparent bg-background",
          )}
        >
          <nav
            className="mardu-container flex h-16 items-center gap-4 md:h-20 xl:gap-10"
            aria-label={navigationLabel}
          >
            <Link
              href={brand.homeHref}
              aria-label={brand.logoAlt}
              className="block shrink-0 touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <div
                className="relative"
                style={{
                  width: brand.logoWidth ?? 148,
                  height: brand.logoHeight ?? 40,
                }}
              >
                <Image
                  src={brand.logoSrc}
                  alt={brand.logoAlt}
                  fill
                  className="object-contain object-left"
                  priority
                  sizes={`${brand.logoWidth ?? 148}px`}
                />
              </div>
            </Link>

            <div className="hidden h-full min-w-0 flex-1 items-center justify-end gap-5 xl:flex 2xl:gap-7">
              {navItems.map((item) => (
                <HeaderNavLink
                  key={`${item.label}:${item.href}`}
                  item={item}
                  variant="editorial-index"
                  className="shrink-0 px-0 py-2 [&_[data-label]]:mt-0.5"
                />
              ))}
            </div>

            {cta ? (
              <HeaderCtaButton
                cta={cta}
                showArrow
                className="group hidden h-10 shrink-0 gap-2.5 rounded-none border-y border-border bg-transparent px-0 text-sm font-normal text-foreground shadow-none hover:border-primary hover:bg-transparent hover:text-primary xl:inline-flex"
              />
            ) : null}

            <Button
              variant="ghost"
              className="ml-auto h-11 gap-2 px-2 text-sm font-normal text-foreground hover:bg-muted hover:text-foreground xl:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? menuCloseLabel : menuOpenLabel}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <MobileMenuTriggerIcon
                iconSrc={brand.mobileMenuIconSrc}
                closeIconSrc={brand.mobileMenuCloseIconSrc}
                open={mobileOpen}
              />
              <MobileMenuTriggerLabel open={mobileOpen} />
            </Button>
          </nav>

          {mobileOpen ? (
            <nav
              id="mobile-nav"
              aria-label={`${navigationLabel} mobil`}
              className="absolute inset-x-0 top-full h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-background md:h-[calc(100svh-5rem)] xl:hidden"
            >
              <div className="mardu-container flex min-h-full flex-col py-4 md:py-5">
                <div className="grid border-t border-border sm:grid-cols-2">
                  {navItems.map((item) => (
                    <HeaderNavLink
                      key={`${item.label}:${item.href}`}
                      item={item}
                      variant="editorial-index"
                      className="min-h-[4.5rem] flex-row items-center justify-between border-b border-border py-3 sm:px-5 sm:odd:border-r sm:odd:pl-0 [&_[data-label]]:text-lg [&_[data-nav-arrow]]:flex"
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                </div>
                {cta ? (
                  <HeaderCtaButton
                    cta={cta}
                    onNavigate={() => setMobileOpen(false)}
                    showArrow
                    className="group mt-auto h-[3.25rem] w-full justify-start gap-3 rounded-none border-y border-border bg-transparent px-0 text-base font-normal text-foreground shadow-none hover:border-primary hover:bg-transparent hover:text-primary"
                  />
                ) : null}
              </div>
            </nav>
          ) : null}
        </div>
      </header>
    );
  }

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      style={{ "--site-header-h": `${headerHeight}px` } as React.CSSProperties}
    >
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-150",
          scrolledPastHeader
            ? "border-b border-border bg-background backdrop-blur supports-backdrop-filter:bg-background/90"
            : "border-b border-transparent bg-transparent",
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

          <div className="hidden items-center gap-4 xl:flex 2xl:gap-7">
            {navItems.map((item) => (
              <HeaderNavLink
                key={`${item.label}:${item.href}`}
                item={item}
                className="text-xs 2xl:text-sm"
              />
            ))}
            <HeaderCtaButton
              cta={cta}
              className="mt-0 w-auto px-4 text-xs sm:ml-0 sm:mt-0 2xl:px-6 2xl:text-sm"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? menuCloseLabel : menuOpenLabel}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <MobileMenuTriggerIcon
              iconSrc={brand.mobileMenuIconSrc}
              closeIconSrc={brand.mobileMenuCloseIconSrc}
              open={mobileOpen}
              fallbackClassName="size-5"
            />
          </Button>
        </nav>

        {mobileOpen ? (
          <nav
            id="mobile-nav"
            aria-label={`${navigationLabel} mobil`}
            className="border-t border-black/8 bg-background/95 xl:hidden"
          >
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
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export type { SiteHeaderProps };
