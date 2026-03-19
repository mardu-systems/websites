'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, Github, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';
import { cn } from '@mardu/ui/lib/utils';
import type {
  FooterSocialIcon,
  FooterSocialLinkDto,
  LayoutLinkDto,
  SiteFooterProps,
} from './dto';

const EMPTY_LINKS: ReadonlyArray<LayoutLinkDto> = [];
const EMPTY_SOCIAL_LINKS: ReadonlyArray<FooterSocialLinkDto> = [];
const EMPTY_ACTIONS: ReadonlyArray<{ id: string; label: string }> = [];

const SOCIAL_ICONS: Record<FooterSocialIcon, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  github: Github,
};

function isExternalHref(href: string, external?: boolean) {
  return external ?? /^https?:\/\//i.test(href);
}

function FooterLink({
  link,
  className,
}: {
  link: LayoutLinkDto;
  className?: string;
}) {
  if (isExternalHref(link.href, link.external)) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

function FooterSocialLink({
  link,
  theme,
}: {
  link: FooterSocialLinkDto;
  theme: 'dark' | 'light';
}) {
  const Icon = SOCIAL_ICONS[link.icon];
  const className =
    theme === 'dark'
      ? 'inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white/90 transition-colors hover:bg-white hover:text-neutral-950'
      : 'inline-flex size-10 items-center justify-center rounded-full border border-black/12 bg-black/4 text-foreground/80 transition-colors hover:bg-black hover:text-white';

  if (isExternalHref(link.href, link.external)) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={link.label}
        title={link.label}
      >
        <Icon className="size-4" />
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} aria-label={link.label} title={link.label}>
      <Icon className="size-4" />
    </Link>
  );
}

export default function SiteFooter({
  brand,
  description,
  navLinks = EMPTY_LINKS,
  metaLinks = EMPTY_LINKS,
  socialLinks = EMPTY_SOCIAL_LINKS,
  actions = EMPTY_ACTIONS,
  onAction,
  theme = 'dark',
}: SiteFooterProps) {
  const scrollToTop = React.useCallback(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, []);

  const year = new Date().getFullYear();
  const isDark = theme === 'dark';

  return (
    <footer
      className={cn(
        'section-hairline relative overflow-hidden pb-16 pt-14 md:pb-20',
        isDark ? 'bg-neutral-950 text-white' : 'bg-background text-foreground',
      )}
    >
      <div className="mardu-container relative">
        <div
          className={cn(
            'grid gap-10 border-t py-10 md:grid-cols-[1.15fr_0.55fr_0.6fr] md:gap-8',
            isDark ? 'border-white/12' : 'border-black/8',
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
                'max-w-xl text-[15px] leading-relaxed',
                isDark ? 'text-white/84' : 'text-foreground/70',
              )}
            >
              {description ??
                'Verwalte Zutritt und Maschinennutzung mobil auf der Baustelle oder stationär in der Werkstatt.'}
            </p>
            <Button
              variant="outline"
              onClick={scrollToTop}
              className={
                isDark
                  ? 'border-white/28 bg-transparent text-white hover:bg-white hover:text-neutral-950'
                  : undefined
              }
            >
              <ArrowUp className="size-4" />
              Nach oben
            </Button>
          </div>

          <div className="space-y-4">
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={`${link.label}:${link.href}`}>
                  <FooterLink
                    link={link}
                    className={
                      isDark
                        ? 'text-white/86 transition-colors hover:text-white'
                        : 'text-foreground/75 transition-colors hover:text-foreground'
                    }
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p
              className={cn(
                'text-[11px] uppercase tracking-[0.18em]',
                isDark ? 'text-white/62' : 'text-foreground/45',
              )}
            >
              Kontakt & Recht
            </p>
            <ul className="space-y-2.5 text-sm">
              {actions.map((action) => (
                <li key={action.id}>
                  <button
                    type="button"
                    onClick={() => onAction?.(action.id)}
                    className={
                      isDark
                        ? 'text-white/86 transition-colors hover:text-white'
                        : 'text-foreground/75 transition-colors hover:text-foreground'
                    }
                  >
                    {action.label}
                  </button>
                </li>
              ))}
              {metaLinks.map((link) => (
                <li key={`${link.label}:${link.href}`}>
                  <FooterLink
                    link={link}
                    className={
                      isDark
                        ? 'text-white/86 transition-colors hover:text-white'
                        : 'text-foreground/75 transition-colors hover:text-foreground'
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
          </div>
        </div>

        <div className={cn('border-t pt-5', isDark ? 'border-white/12' : 'border-black/8')}>
          <p
            className={cn('text-xs', isDark ? 'text-white/68' : 'text-foreground/55')}
            suppressHydrationWarning
          >
            Copyright © {year} {brand.copyrightName}.
          </p>
        </div>
      </div>
    </footer>
  );
}

export type { SiteFooterProps };
