'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { Button } from '@mardu/ui/components/button';

export type FooterLink = {
  href: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type SiteFooterProps = {
  navLinks?: ReadonlyArray<FooterLink>;
  metaLinks?: ReadonlyArray<FooterLink>;
  socialLinks?: ReadonlyArray<FooterLink>;
  description?: string;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export default function SiteFooter({
  navLinks = [],
  metaLinks = [],
  socialLinks = [
    { href: 'https://www.instagram.com/mardu.de', label: 'Instagram' },
    { href: 'https://www.linkedin.com/company/marduofficial', label: 'LinkedIn' },
    { href: 'https://github.com/mardu-systems', label: 'GitHub' },
  ],
  description,
}: SiteFooterProps) {
  const scrollToTop = React.useCallback(() => {
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="section-hairline relative overflow-hidden bg-background pb-34 pt-14 md:pb-40">
      <div className="mardu-container relative">
        <div className="grid gap-10 border-t border-black/8 py-10 md:grid-cols-4 md:gap-8">
          <div className="space-y-5 md:col-span-2">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-40">
                <Image src="/logos/Logo.svg" alt="Mardu Logo" fill className="object-contain" />
              </div>
            </Link>
            <p className="max-w-xl text-[15px] leading-relaxed text-foreground/70">
              {description ??
                'Verwalte Zutritt und Maschinennutzung mobil auf der Baustelle oder stationär in der Werkstatt.'}
            </p>
            <Button
              variant="outline"
              onClick={scrollToTop}
            >
              <ArrowUp className="size-4" />
              Nach oben
            </Button>
          </div>

          <div className="space-y-4">
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={link.onClick} className="text-foreground/75 transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">Kontakt & Recht</p>
            <ul className="space-y-2.5 text-sm">
              {metaLinks.map((link) => {
                if (isExternalHref(link.href)) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={link.onClick}
                        className="text-foreground/75 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <Link href={link.href} onClick={link.onClick} className="text-foreground/75 transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="flex flex-wrap gap-4 text-sm">
              {socialLinks.map((link) =>
                isExternalHref(link.href) ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={link.onClick}
                      className="text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link href={link.href} onClick={link.onClick} className="text-foreground/70 transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-black/8 pt-5">
          <p className="text-xs text-foreground/55" suppressHydrationWarning>
            Copyright © {year} Mardu.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-28%] left-0 right-0 text-center font-serif text-7xl tracking-[0.18em] text-foreground/10"
      >
        MARDU
      </div>
    </footer>
  );
}
