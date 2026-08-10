"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@mardu/ui/components/button";
import { cn } from "@mardu/ui/lib/utils";
import type {
  FooterAiSummaryLinkDto,
  FooterSocialIcon,
  FooterSocialLinkDto,
  LayoutLinkDto,
  SiteFooterProps,
} from "./dto";

const EMPTY_LINKS: ReadonlyArray<LayoutLinkDto> = [];
const EMPTY_SOCIAL_LINKS: ReadonlyArray<FooterSocialLinkDto> = [];
const EMPTY_AI_SUMMARY_LINKS: ReadonlyArray<FooterAiSummaryLinkDto> = [];
const EMPTY_ACTIONS: ReadonlyArray<{ id: string; label: string }> = [];

const SOCIAL_ICONS: Record<
  FooterSocialIcon,
  React.ComponentType<{ className?: string }>
> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  phone: Phone,
};

const AI_SUMMARY_MARKS: Record<
  FooterAiSummaryLinkDto["provider"],
  { src: string; className?: string }
> = {
  claude: {
    src: "/ai-summary/claude.svg",
  },
  chatgpt: {
    src: "/ai-summary/chatgpt.svg",
    className: "brightness-0 invert",
  },
  perplexity: {
    src: "/ai-summary/perplexity.svg",
  },
};

function isExternalHref(href: string, external?: boolean) {
  return external ?? /^[a-z][a-z\d+.-]*:/i.test(href);
}

function opensInNewTab(href: string) {
  return /^https?:\/\//i.test(href);
}

function FooterLink({
  link,
  className,
  children,
}: {
  link: LayoutLinkDto;
  className?: string;
  children?: React.ReactNode;
}) {
  if (isExternalHref(link.href, link.external)) {
    const newTab = opensInNewTab(link.href);

    return (
      <a
        href={link.href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={className}
      >
        {children ?? link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {children ?? link.label}
    </Link>
  );
}

function FooterSocialLink({
  link,
  theme,
  variant = "default",
}: {
  link: FooterSocialLinkDto;
  theme: "dark" | "light";
  variant?: "default" | "editorial-index";
}) {
  const Icon = SOCIAL_ICONS[link.icon];
  const newTab = opensInNewTab(link.href);
  const className =
    variant === "editorial-index"
      ? "inline-flex size-9 items-center justify-center border border-white/18 text-white/72 transition-colors hover:border-[var(--footer-accent,#b9a7ff)] hover:text-[var(--footer-accent,#b9a7ff)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--footer-accent,#b9a7ff)]"
      : theme === "dark"
        ? "inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white/90 transition-colors hover:bg-white hover:text-neutral-950"
        : "inline-flex size-10 items-center justify-center rounded-full border border-black/12 bg-black/4 text-foreground/80 transition-colors hover:bg-black hover:text-white";

  if (isExternalHref(link.href, link.external)) {
    return (
      <a
        href={link.href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={className}
        aria-label={link.label}
        title={link.label}
      >
        <Icon className="size-3.5" />
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={className}
      aria-label={link.label}
      title={link.label}
    >
      <Icon className="size-3.5" />
    </Link>
  );
}

function FooterAiSummaryLinks({
  links,
  variant = "default",
}: {
  links: ReadonlyArray<FooterAiSummaryLinkDto>;
  variant?: "default" | "editorial-index";
}) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border-t border-white/14 pt-4">
      <p className="mb-2 text-[0.6875rem] tracking-[0.08em] text-white/44">
        KI-Zusammenfassung
      </p>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const { className: imageClassName, src } =
            AI_SUMMARY_MARKS[link.provider];
          const className =
            variant === "editorial-index"
              ? "inline-flex size-9 items-center justify-center text-white/72 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--footer-accent,#b9a7ff)]"
              : "inline-flex size-10 items-center justify-center text-white/90 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white";

          return (
            <li key={`${link.provider}:${link.href}`}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
                aria-label={link.label}
                title={link.label}
              >
                <Image
                  src={src}
                  alt=""
                  width={16}
                  height={16}
                  className={cn("h-4 w-auto object-contain", imageClassName)}
                  style={{ width: "auto" }}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function useScrollToTop() {
  return React.useCallback(() => {
    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }, []);
}

function FooterWordmark({ src }: { src: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let animationFrame: number | null = null;
    let listening = false;

    const updatePointerPosition = (event: PointerEvent) => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        container.style.setProperty("--wordmark-x", `${event.clientX - rect.left}px`);
        container.style.setProperty("--wordmark-y", `${event.clientY - rect.top}px`);
        animationFrame = null;
      });
    };

    const startListening = () => {
      if (!listening) {
        window.addEventListener("pointermove", updatePointerPosition, {
          passive: true,
        });
        listening = true;
      }
    };

    const stopListening = () => {
      if (listening) {
        window.removeEventListener("pointermove", updatePointerPosition);
        listening = false;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          startListening();
        } else {
          stopListening();
        }
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      stopListening();
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-12 -mb-8 pt-8 sm:mt-16 sm:-mb-12 lg:-mb-16 lg:pt-12"
      aria-hidden="true"
    >
      <div
        className="relative aspect-[904/140] w-full [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
        style={{
          maskImage: `url("${src}")`,
          WebkitMaskImage: `url("${src}")`,
        }}
      >
        <div className="absolute inset-0 bg-white/[0.018]" />
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(circle 30rem at var(--wordmark-x, -40rem) var(--wordmark-y, -40rem), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.14) 32%, rgba(255,255,255,0.035) 58%, transparent 76%)",
          }}
        />
      </div>
    </div>
  );
}

function EditorialSiteFooter({
  brand,
  description,
  primaryActionSlot,
  navLinks = EMPTY_LINKS,
  metaLinks = EMPTY_LINKS,
  socialLinks = EMPTY_SOCIAL_LINKS,
  aiSummaryLinks = EMPTY_AI_SUMMARY_LINKS,
  actions = EMPTY_ACTIONS,
  onAction,
}: SiteFooterProps) {
  const scrollToTop = useScrollToTop();
  const year = new Date().getFullYear();

  return (
    <footer
      id="kontakt"
      data-site-footer
      className="group/footer scroll-mt-28 overflow-hidden bg-black pb-8 text-white lg:pb-10"
    >
      <div className="mardu-container">
        <div className="border-b border-white/14 pb-10 pt-14 lg:pb-14 lg:pt-20">
          <h2 className="w-full text-[clamp(2.2rem,4vw,3.25rem)] font-light leading-none tracking-[-0.04em]">
            {description ?? "Wo Nutzung beginnt, ist Mardu."}
          </h2>
        </div>

        <div className="grid border-b border-white/14 lg:grid-cols-[0.9fr_1.1fr_0.75fr]">
          <div className="space-y-6 border-b border-white/14 py-8 lg:border-b-0 lg:border-r lg:pr-10">
            <Link
              href={brand.homeHref}
              className="inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--footer-accent,#b9a7ff)]"
            >
              <div
                className="relative"
                style={{
                  width: brand.logoWidth ?? 156,
                  height: brand.logoHeight ?? 44,
                }}
              >
                <Image
                  src={brand.logoSrc}
                  alt={brand.logoAlt}
                  fill
                  sizes={`${brand.logoWidth ?? 156}px`}
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>
            <p className="max-w-[31rem] text-base leading-relaxed text-white/62">
              Vernetzte Freigaben für Maschinen, Türen, Tore und Schranken – mit
              zentraler Verwaltung für Identitäten, Regeln und Ereignisse.
            </p>
            {primaryActionSlot ? (
              <div className="pt-1">{primaryActionSlot}</div>
            ) : null}
          </div>

          <nav
            aria-label="Seitennavigation im Footer"
            className="grid grid-cols-2 border-b border-white/14 lg:border-b-0 lg:border-r"
          >
            {navLinks.map((link) => (
              <FooterLink
                key={`${link.label}:${link.href}`}
                link={link}
                className="group min-w-0 border-b border-r border-white/10 px-5 py-4 transition-colors even:border-r-0 hover:bg-white/[0.04] lg:py-5 [&:nth-last-child(-n+2)]:border-b-0"
              >
                <span className="flex flex-col">
                  {link.index ? (
                    <span className="mb-2 text-xs text-[var(--footer-accent,#b9a7ff)] lg:mb-3">
                      [{link.index}]
                    </span>
                  ) : null}
                  <span className="truncate text-[1.05rem] font-light tracking-[-0.01em] text-white transition-colors group-hover:text-[var(--footer-accent,#b9a7ff)]">
                    {link.label}
                  </span>
                  {link.description ? (
                    <span className="mt-1 truncate text-xs text-white/48 lg:mt-2">
                      {link.description}
                    </span>
                  ) : null}
                </span>
              </FooterLink>
            ))}
          </nav>

          <div className="flex flex-col justify-between gap-6 py-8 lg:pl-7">
            <div>
              <p className="mb-3 text-[0.6875rem] tracking-[0.08em] text-white/44">
                Wissen & Recht
              </p>
              <ul className="space-y-2 text-sm">
                {metaLinks.map((link) => (
                  <li key={`${link.label}:${link.href}`}>
                    <FooterLink
                      link={link}
                      className="text-white/68 transition-colors hover:text-white"
                    />
                  </li>
                ))}
                {actions.map((action) => (
                  <li key={action.id}>
                    <button
                      type="button"
                      onClick={() => onAction?.(action.id)}
                      className="text-white/68 transition-colors hover:text-white"
                    >
                      {action.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <li key={`${link.label}:${link.href}`}>
                  <FooterSocialLink
                    link={link}
                    theme="light"
                    variant="editorial-index"
                  />
                </li>
              ))}
            </ul>
            <FooterAiSummaryLinks
              links={aiSummaryLinks}
              variant="editorial-index"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-6 text-xs tracking-[0.06em] text-white/44 sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            Copyright © {year} {brand.copyrightName}.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex min-h-11 w-fit items-center gap-2 transition-colors hover:text-[var(--footer-accent,#b9a7ff)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--footer-accent,#b9a7ff)]"
          >
            Nach oben
            <ArrowUp className="size-3" aria-hidden="true" />
          </button>
        </div>

        {brand.wordmarkSrc ? <FooterWordmark src={brand.wordmarkSrc} /> : null}
      </div>
    </footer>
  );
}

function DefaultSiteFooter({
  brand,
  description,
  primaryActionSlot,
  navLinks = EMPTY_LINKS,
  metaLinks = EMPTY_LINKS,
  socialLinks = EMPTY_SOCIAL_LINKS,
  aiSummaryLinks = EMPTY_AI_SUMMARY_LINKS,
  actions = EMPTY_ACTIONS,
  onAction,
  theme = "dark",
}: SiteFooterProps) {
  const scrollToTop = useScrollToTop();
  const year = new Date().getFullYear();
  const isDark = theme === "dark";

  return (
    <footer
      className={cn(
        "section-hairline relative overflow-hidden pb-16 pt-14 md:pb-20",
        isDark ? "bg-neutral-950 text-white" : "bg-background text-foreground",
      )}
    >
      <div className="mardu-container relative">
        <div
          className={cn(
            "grid gap-10 border-t py-10 md:grid-cols-[1.15fr_0.55fr_0.6fr] md:gap-8",
            isDark ? "border-white/12" : "border-black/8",
          )}
        >
          <div className="space-y-5">
            <Link href={brand.homeHref} className="inline-block">
              <div
                className="relative"
                style={{
                  width: brand.logoWidth ?? 160,
                  height: brand.logoHeight ?? 48,
                }}
              >
                <Image
                  src={brand.logoSrc}
                  alt={brand.logoAlt}
                  fill
                  sizes={`${brand.logoWidth ?? 160}px`}
                  className="object-contain"
                />
              </div>
            </Link>
            <p
              className={cn(
                "max-w-xl text-[15px] leading-relaxed",
                isDark ? "text-white/84" : "text-foreground/70",
              )}
            >
              {description ??
                "Verwalte Zutritt und Maschinennutzung mobil auf der Baustelle oder stationär in der Werkstatt."}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                onClick={scrollToTop}
                className={
                  isDark
                    ? "border-white/28 bg-transparent text-white hover:bg-white hover:text-neutral-950"
                    : undefined
                }
              >
                <ArrowUp className="size-4" />
                Nach oben
              </Button>
              {primaryActionSlot}
            </div>
          </div>

          <div className="space-y-4">
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={`${link.label}:${link.href}`}>
                  <FooterLink
                    link={link}
                    className={
                      isDark
                        ? "text-white/86 transition-colors hover:text-white"
                        : "text-foreground/75 transition-colors hover:text-foreground"
                    }
                  />
                </li>
              ))}
              {actions.map((action) => (
                <li key={action.id}>
                  <button
                    type="button"
                    onClick={() => onAction?.(action.id)}
                    className={
                      isDark
                        ? "text-white/86 transition-colors hover:text-white"
                        : "text-foreground/75 transition-colors hover:text-foreground"
                    }
                  >
                    {action.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p
              className={cn(
                "text-[11px] uppercase tracking-[0.18em]",
                isDark ? "text-white/62" : "text-foreground/45",
              )}
            >
              Kontakt & Recht
            </p>
            <ul className="space-y-2.5 text-sm">
              {metaLinks.map((link) => (
                <li key={`${link.label}:${link.href}`}>
                  <FooterLink
                    link={link}
                    className={
                      isDark
                        ? "text-white/86 transition-colors hover:text-white"
                        : "text-foreground/75 transition-colors hover:text-foreground"
                    }
                  />
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-3 text-sm">
              {socialLinks.map((link) => (
                <li key={`${link.label}:${link.href}`}>
                  <FooterSocialLink link={link} theme={theme} />
                </li>
              ))}
            </ul>
            <FooterAiSummaryLinks links={aiSummaryLinks} />
          </div>
        </div>

        <div
          className={cn(
            "border-t pt-5",
            isDark ? "border-white/12" : "border-black/8",
          )}
        >
          <p
            className={cn(
              "text-xs",
              isDark ? "text-white/68" : "text-foreground/55",
            )}
            suppressHydrationWarning
          >
            Copyright © {year} {brand.copyrightName}.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function SiteFooter(props: SiteFooterProps) {
  if (props.variant === "editorial-index") {
    return <EditorialSiteFooter {...props} />;
  }

  return <DefaultSiteFooter {...props} />;
}

export type { SiteFooterProps };
