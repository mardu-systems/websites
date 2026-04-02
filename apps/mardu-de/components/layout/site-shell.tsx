import React from 'react';
import SharedSiteShell from '@mardu/layout/site-shell';
import type { HeaderNavItemDto } from '@mardu/layout/types';
import type { FooterSocialLinkDto } from '@mardu/layout/types';
import { defaultHeaderItems } from '@/data/default-header-items';
import { defaultFooterNavLinks } from '@/data/default-footer-items';
import { getSiteConfig } from '@mardu/site-config';
import { isBlogEnabled, isIntegrationsEnabled } from '@mardu/site-config/feature-flags.server';
import NewsletterButton from '@/components/utilities/newsletter-button';

const socialLinks: ReadonlyArray<FooterSocialLinkDto> = [
  { href: 'https://www.instagram.com/mardu.de', label: 'Instagram', icon: 'instagram' },
  { href: 'https://www.linkedin.com/company/marduofficial', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://github.com/mardu-systems', label: 'GitHub', icon: 'github' },
];

export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const siteConfig = getSiteConfig('mardu-de');
  const [blogEnabled, integrationsEnabled] = await Promise.all([
    isBlogEnabled('mardu-de'),
    isIntegrationsEnabled('mardu-de'),
  ]);

  const footerNavLinks = defaultFooterNavLinks.filter((item) => {
    if (item.href === '/blog') {
      return blogEnabled;
    }

    if (item.href === '/integrations') {
      return integrationsEnabled;
    }

    return true;
  });

  const headerItems: HeaderNavItemDto[] = defaultHeaderItems.filter((item) => {
    if (item.type !== 'link') {
      return true;
    }

    if (item.href === '/blog') {
      return blogEnabled;
    }

    if (item.href === '/integrations') {
      return integrationsEnabled;
    }

    return true;
  });

  return (
    <SharedSiteShell
      header={{
        brand: {
          homeHref: '/',
          logoSrc: '/logos/Logo.svg',
          logoAlt: 'Mardu Logo',
        },
        items: headerItems,
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
          'Mardu digitalisiert Zutritt und Maschinenfreigabe für Werkstatt, Industrie und Baustelle und reduziert dabei Verwaltungsaufwand, Abstimmung und manuelle Prozesse.',
        primaryActionSlot: (
          <NewsletterButton
            primaryButtonText="Newsletter abonnieren"
            variant="outline"
            className="border-white/28 bg-transparent text-white hover:bg-white hover:text-neutral-950"
          />
        ),
        navLinks: footerNavLinks,
        metaLinks: siteConfig.footerMetaLinks,
        socialLinks,
        theme: 'dark',
      }}
    >
      {children}
    </SharedSiteShell>
  );
}
