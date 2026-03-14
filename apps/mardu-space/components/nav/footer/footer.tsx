'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Github, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type FooterLink = {
  href: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type SocialLink = FooterLink & {
  icon: React.ComponentType<{ className?: string }>;
};

type SiteFooterProps = {
  navLinks?: ReadonlyArray<FooterLink>;
  metaLinks?: ReadonlyArray<FooterLink>;
  socialLinks?: ReadonlyArray<SocialLink>;
  description?: string;
};

declare global {
  interface Window {
    openCookieSettings?: () => void;
  }
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

const EMPTY_LINKS: ReadonlyArray<FooterLink> = [];
const DEFAULT_SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  { href: 'https://www.instagram.com/mardu.de', label: 'Instagram', icon: Instagram },
  { href: 'https://www.linkedin.com/company/marduofficial', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/mardu-systems', label: 'GitHub', icon: Github },
];

export default function SiteFooter({
  navLinks = EMPTY_LINKS,
  metaLinks = EMPTY_LINKS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  description,
}: SiteFooterProps) {
  const scrollToTop = React.useCallback(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="section-hairline relative overflow-hidden bg-neutral-950 pb-16 pt-14 text-white md:pb-20">
      <div className="mardu-container relative">
        <div className="grid gap-10 border-t border-white/12 py-10 md:grid-cols-[1.15fr_0.55fr_0.6fr] md:gap-8">
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-40">
                <Image
                  src="/marduspace_logo_bg_black.svg"
                  alt="Mardu Logo"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/84">
              {description ??
                'Verwalte Zutritt und Maschinennutzung mobil auf der Baustelle oder stationär in der Werkstatt.'}
            </p>
            <Button
              variant="outline"
              onClick={scrollToTop}
              className="border-white/28 bg-transparent text-white hover:bg-white hover:text-neutral-950"
            >
              <ArrowUp className="size-4" />
              Nach oben
            </Button>
          </div>

          <div className="space-y-4">
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={link.onClick}
                    className="text-white/86 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/62">
              Kontakt & Recht
            </p>
            <ul className="space-y-2.5 text-sm">
              {metaLinks.map((link) => {
                if (link.href === '#cookie-settings') {
                  return (
                    <li key={link.href}>
                      <button
                        type="button"
                        onClick={() => window.openCookieSettings?.()}
                        className="text-white/86 transition-colors hover:text-white"
                      >
                        {link.label}
                      </button>
                    </li>
                  );
                }

                if (isExternalHref(link.href)) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={link.onClick}
                        className="text-white/86 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={link.onClick}
                      className="text-white/86 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="flex flex-wrap gap-3 text-sm">
              {socialLinks.map((link) =>
                isExternalHref(link.href) ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={link.onClick}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white/90 transition-colors hover:bg-white hover:text-neutral-950"
                      aria-label={link.label}
                      title={link.label}
                    >
                      <link.icon className="size-4" />
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={link.onClick}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white/90 transition-colors hover:bg-white hover:text-neutral-950"
                      aria-label={link.label}
                      title={link.label}
                    >
                      <link.icon className="size-4" />
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/12 pt-5">
          <p className="text-xs text-white/68" suppressHydrationWarning>
            Copyright © {year} Mardu.
          </p>
        </div>
      </div>
    </footer>
  );
}
