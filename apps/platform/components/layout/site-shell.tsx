'use client';

import { defaultHeaderItems } from '@/data/default-header-items';
import React from 'react';
import { defaultFooterNavLinks } from '@/data/default-footer-items';
import { getSiteConfig } from '@mardu/site-config';
import { usePathname } from 'next/navigation';
import SharedSiteShell from '@mardu/layout/site-shell';
import type { FooterSocialLinkDto } from '@mardu/layout';

const socialLinks: ReadonlyArray<FooterSocialLinkDto> = [
  { href: 'https://www.instagram.com/mardu.de', label: 'Instagram', icon: 'instagram' },
  { href: 'https://www.linkedin.com/company/marduofficial', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://github.com/mardu-systems', label: 'GitHub', icon: 'github' },
];
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const siteConfig = getSiteConfig('platform');
  const pathname = usePathname();
  const isPayloadAdminRoute = pathname?.startsWith('/admin');

  if (isPayloadAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div>
      <SharedSiteShell
        header={{
          brand: {
            homeHref: '/',
            logoSrc: '/logos/Logo.svg',
            logoAlt: 'Mardu Logo',
          },
          items: defaultHeaderItems,
          cta: {
            label: 'Admin Login',
            href: '/admin',
            mode: 'link',
          },
        }}
        footer={{
          brand: {
            homeHref: '/',
            logoSrc: '/logos/LogoWeiss.svg',
            logoAlt: 'Mardu Logo',
            copyrightName: 'Mardu GmbH',
          },
          description:
            'Interne Plattform für Payload Admin, zentrale APIs, Media-Uploads und Betriebsaufgaben im Mardu-Monorepo.',
          navLinks: defaultFooterNavLinks,
          metaLinks: siteConfig.footerMetaLinks,
          socialLinks,
          theme: 'dark',
        }}
      >
        {children}
      </SharedSiteShell>
    </div>
  );
}
