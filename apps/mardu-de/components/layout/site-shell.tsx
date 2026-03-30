import React from 'react';
import SharedSiteShell from '@mardu/layout/site-shell';
import type { FooterSocialLinkDto } from '@mardu/layout/types';
import { defaultHeaderItems } from '@/data/default-header-items';
import { defaultFooterNavLinks } from '@/data/default-footer-items';
import { getSiteConfig } from '@mardu/site-config';

const socialLinks: ReadonlyArray<FooterSocialLinkDto> = [
  { href: 'https://www.instagram.com/mardu.de', label: 'Instagram', icon: 'instagram' },
  { href: 'https://www.linkedin.com/company/marduofficial', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://github.com/mardu-systems', label: 'GitHub', icon: 'github' },
];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const siteConfig = getSiteConfig('mardu-de');

  return (
    <SharedSiteShell
      header={{
        brand: {
          homeHref: '/',
          logoSrc: '/logos/Logo.svg',
          logoAlt: 'Mardu Logo',
        },
        items: defaultHeaderItems,
        cta: {
          label: 'Demo vereinbaren',
          href: 'https://cal.meetergo.com/infomardu/30-min-meeting-or-info',
          mode: 'meetergo',
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
          'Verwalte Zutritt und Maschinennutzung – mobil auf der Baustelle oder stationär in der Werkstatt. Mardu passt sich deinen Bedürfnissen an.',
        navLinks: defaultFooterNavLinks,
        metaLinks: siteConfig.footerMetaLinks,
        socialLinks,
        theme: 'dark',
      }}
    >
      {children}
    </SharedSiteShell>
  );
}
