"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@mardu/ui/components/button";
import { cn } from "@mardu/ui/lib/utils";
import type { HeaderNavLinkDto, SiteHeaderProps } from "./dto";
import { HeaderCtaButton } from "./site-header-actions";
import {
  useHeaderNavigationFit,
  useMeasuredHeaderHeight,
  useMobileMenuFocusTrap,
  useScrolledPast,
} from "./site-header-hooks";
import {
  HeaderNavLink,
  MobileMenuTriggerIcon,
  MobileMenuTriggerLabel,
} from "./site-header-navigation";

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
  const editorialNavigationRef = React.useRef<HTMLElement | null>(null);
  const editorialBrandRef = React.useRef<HTMLAnchorElement | null>(null);
  const editorialDesktopContentRef = React.useRef<HTMLDivElement | null>(null);
  const headerHeight = useMeasuredHeaderHeight(headerRef);
  const editorialNavigationCompact = useHeaderNavigationFit(
    editorialNavigationRef,
    editorialBrandRef,
    editorialDesktopContentRef,
  );
  const closeMobileMenu = React.useCallback(() => setMobileOpen(false), []);
  const pathname = usePathname();

  React.useEffect(() => {
    closeMobileMenu();
  }, [closeMobileMenu, pathname]);

  React.useEffect(() => {
    if (!editorialNavigationCompact) closeMobileMenu();
  }, [closeMobileMenu, editorialNavigationCompact]);

  useMobileMenuFocusTrap(mobileOpen, headerRef, closeMobileMenu);

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
            ref={editorialNavigationRef}
            className="mardu-container relative flex h-16 items-center gap-4 md:h-20 md:gap-8"
            aria-label={navigationLabel}
            data-navigation-mode={
              editorialNavigationCompact ? "compact" : "full"
            }
          >
            <Link
              ref={editorialBrandRef}
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

            <div
              ref={editorialDesktopContentRef}
              aria-hidden={editorialNavigationCompact || undefined}
              data-header-desktop-content
              className={cn(
                "ml-auto flex h-full w-max shrink-0 items-center gap-5 2xl:gap-7",
                editorialNavigationCompact &&
                  "pointer-events-none invisible absolute right-0",
              )}
            >
              {navItems.map((item) => (
                <HeaderNavLink
                  key={`${item.label}:${item.href}`}
                  item={item}
                  variant="editorial-index"
                  className="shrink-0 px-0 py-2 [&_[data-label]]:mt-0.5"
                />
              ))}
              {cta ? (
                <HeaderCtaButton
                  cta={cta}
                  showArrow
                  className="h-10 shrink-0 text-sm"
                />
              ) : null}
            </div>

            {editorialNavigationCompact ? (
              <Button
                variant="ghost"
                className="ml-auto h-11 gap-2.5 px-2 text-sm font-normal text-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen((value) => !value)}
                aria-label={mobileOpen ? menuCloseLabel : menuOpenLabel}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                data-header-mobile-trigger
              >
                <MobileMenuTriggerIcon
                  iconSrc={brand.mobileMenuIconSrc}
                  closeIconSrc={brand.mobileMenuCloseIconSrc}
                  open={mobileOpen}
                />
                <MobileMenuTriggerLabel open={mobileOpen} />
              </Button>
            ) : null}
          </nav>

          {editorialNavigationCompact && mobileOpen ? (
            <nav
              id="mobile-nav"
              aria-label={`${navigationLabel} mobil`}
              className="absolute inset-x-0 top-full h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-background md:h-[calc(100svh-5rem)]"
            >
              <div className="mardu-container flex min-h-full flex-col py-4 md:py-5">
                <div className="grid border-t border-border sm:grid-cols-2">
                  {navItems.map((item) => (
                    <HeaderNavLink
                      key={`${item.label}:${item.href}`}
                      item={item}
                      variant="editorial-index"
                      className="min-h-[4.5rem] flex-row items-center justify-between border-b border-border py-3 sm:px-5 sm:odd:border-r sm:odd:pl-0 [&_[data-label]]:text-lg [&_[data-nav-arrow]]:flex"
                      onNavigate={closeMobileMenu}
                    />
                  ))}
                </div>
                {cta ? (
                  <HeaderCtaButton
                    cta={cta}
                    onNavigate={closeMobileMenu}
                    showArrow
                    className="mt-auto h-[3.25rem] w-full justify-start gap-3"
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
                  onNavigate={closeMobileMenu}
                />
              ))}
              <HeaderCtaButton
                cta={cta}
                onNavigate={closeMobileMenu}
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
