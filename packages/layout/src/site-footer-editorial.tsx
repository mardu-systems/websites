"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import type { SiteFooterProps } from "./dto";
import {
  FooterHalftoneMark,
  FooterStaticModelMark,
  FooterWordmark,
} from "./site-footer-artwork";
import {
  FooterAiSummaryLinks,
  FooterLink,
  FooterSocialLink,
  useScrollToTop,
} from "./site-footer-links";

export function EditorialSiteFooter({
  brand,
  description,
  primaryActionSlot,
  navLinks = [],
  metaLinks = [],
  socialLinks = [],
  aiSummaryLinks = [],
  actions = [],
  onAction,
}: SiteFooterProps) {
  const scrollToTop = useScrollToTop();
  const year = new Date().getFullYear();

  return (
    <footer
      id="kontakt"
      data-site-footer
      className="group/footer relative isolate scroll-mt-28 overflow-hidden bg-black pb-8 text-white lg:pb-10"
    >
      {brand.backgroundMarkModelSrc ? (
        <FooterStaticModelMark
          color={brand.backgroundMarkColor}
          src={brand.backgroundMarkModelSrc}
        />
      ) : brand.backgroundMarkSrc ? (
        <FooterHalftoneMark
          color={brand.backgroundMarkColor}
          src={brand.backgroundMarkSrc}
        />
      ) : null}

      <div className="mardu-container relative z-10">
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
            <p className="max-w-[31rem] text-base leading-relaxed text-white/72">
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
                    <span className="mt-1 truncate text-xs text-white/62 lg:mt-2">
                      {link.description}
                    </span>
                  ) : null}
                </span>
              </FooterLink>
            ))}
          </nav>

          <div className="flex flex-col justify-between gap-6 py-8 lg:pl-7">
            <div>
              <p className="mb-3 text-[0.6875rem] tracking-[0.08em] text-white/60">
                Wissen & Recht
              </p>
              <ul className="text-sm">
                {metaLinks.map((link) => (
                  <li key={`${link.label}:${link.href}`}>
                    <FooterLink
                      link={link}
                      className="inline-flex min-h-11 items-center text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--footer-accent,#b9a7ff)]"
                    />
                  </li>
                ))}
                {actions.map((action) => (
                  <li key={action.id}>
                    <button
                      type="button"
                      onClick={() => onAction?.(action.id)}
                      className="inline-flex min-h-11 items-center text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--footer-accent,#b9a7ff)]"
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

        <div className="flex flex-col gap-5 pt-6 text-xs tracking-[0.06em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
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
