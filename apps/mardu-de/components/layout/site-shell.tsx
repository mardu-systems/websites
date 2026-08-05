import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SharedSiteShell from '@mardu/layout/site-shell';
import type { FooterSocialLinkDto } from '@mardu/layout/types';
import { Button } from '@mardu/ui/components/button';
import { getSiteConfig } from '@mardu/site-config';
import { defaultFooterMetaLinks, defaultFooterNavLinks } from '@/data/default-footer-items';
import { defaultHeaderItems } from '@/data/default-header-items';

const baseSocialLinks: ReadonlyArray<FooterSocialLinkDto> = [
  { href: 'https://www.instagram.com/mardu.de', label: 'Instagram', icon: 'instagram' },
  {
    href: 'https://www.linkedin.com/company/marduofficial',
    label: 'LinkedIn',
    icon: 'linkedin',
  },
  { href: 'https://github.com/mardu-systems', label: 'GitHub', icon: 'github' },
];

export default function SiteShell({ children }: { children: ReactNode }) {
  const siteConfig = getSiteConfig('mardu-de');
  const socialLinks: ReadonlyArray<FooterSocialLinkDto> = [
    ...baseSocialLinks,
    {
      href: `mailto:${siteConfig.supportEmail}`,
      label: `E-Mail: ${siteConfig.supportEmail}`,
      icon: 'mail',
    },
    {
      href: siteConfig.contactPhoneHref,
      label: `Telefon: ${siteConfig.contactPhone}`,
      icon: 'phone',
    },
  ];

  return (
    <SharedSiteShell
      header={{
        variant: 'editorial-index',
        brand: {
          homeHref: '/',
          logoSrc: '/logos/Logo.svg',
          logoAlt: 'Zur Mardu-Startseite',
          logoWidth: 156,
          logoHeight: 44,
        },
        items: defaultHeaderItems,
        cta: {
          label: 'Jetzt beraten lassen',
          href: '/contact',
          mode: 'link',
        },
      }}
      footer={{
        variant: 'editorial-index',
        theme: 'dark',
        brand: {
          homeHref: '/',
          logoSrc: '/logos/Logo.svg',
          logoAlt: 'Mardu',
          logoWidth: 156,
          logoHeight: 44,
          copyrightName: 'Mardu GmbH',
        },
        description: 'Wo Nutzung beginnt, ist Mardu.',
        primaryActionSlot: (
          <Button
            asChild
            className="h-12 rounded-none bg-primary px-6 text-base text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/contact">
              Jetzt beraten lassen
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        ),
        navLinks: defaultFooterNavLinks,
        metaLinks: [...defaultFooterMetaLinks, ...siteConfig.footerMetaLinks],
        socialLinks,
      }}
    >
      {children}
    </SharedSiteShell>
  );
}
