import type { ReactNode } from 'react';
import Link from 'next/link';
import SharedSiteShell from '@mardu/layout/site-shell';
import type { FooterAiSummaryLinkDto, FooterSocialLinkDto } from '@mardu/layout/types';
import { EditorialActionButton } from '@mardu/ui/components/editorial-action-button';
import { getSiteConfig } from '@mardu/site-config';
import { getSiteFeatureFlags } from '@mardu/site-config/feature-flags.server';
import { defaultFooterMetaLinks, defaultFooterNavLinks } from '@/data/default-footer-items';
import { defaultHeaderItems } from '@/data/default-header-items';
import { filterFeatureLinks } from '@/lib/feature-links';
import {
  MARDU_FOOTER_MODEL_PATH,
  MARDU_LOGO_DARK_PATH,
  MARDU_LOGO_LIGHT_PATH,
  MARDU_WORDMARK_DARK_PATH,
} from '@/lib/brand-assets';

const baseSocialLinks: ReadonlyArray<FooterSocialLinkDto> = [
  { href: 'https://www.instagram.com/mardu.de', label: 'Instagram', icon: 'instagram' },
  {
    href: 'https://www.linkedin.com/company/marduofficial',
    label: 'LinkedIn',
    icon: 'linkedin',
  },
  { href: 'https://github.com/mardu-systems', label: 'GitHub', icon: 'github' },
];

const aiSummaryPrompt =
  'Fasse zusammen, was Mardu macht und was das zentrale Nutzenversprechen ist. Nutze https://www.mardu.de als Quelle.';
const encodedAiSummaryPrompt = encodeURIComponent(aiSummaryPrompt);

const aiSummaryLinks: ReadonlyArray<FooterAiSummaryLinkDto> = [
  {
    provider: 'claude',
    label: 'Mardu mit Claude zusammenfassen',
    href: `https://claude.ai/new?q=${encodedAiSummaryPrompt}`,
  },
  {
    provider: 'chatgpt',
    label: 'Mardu mit ChatGPT zusammenfassen',
    href: `https://chatgpt.com/?q=${encodedAiSummaryPrompt}`,
  },
  {
    provider: 'perplexity',
    label: 'Mardu mit Perplexity zusammenfassen',
    href: `https://www.perplexity.ai/search/new?q=${encodedAiSummaryPrompt}`,
  },
];

export default async function SiteShell({ children }: { children: ReactNode }) {
  const siteConfig = getSiteConfig('mardu-de');
  const features = await getSiteFeatureFlags('mardu-de');
  const headerItems = filterFeatureLinks(defaultHeaderItems, features);
  const footerNavLinks = filterFeatureLinks(defaultFooterNavLinks, features);
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
          logoSrc: MARDU_LOGO_LIGHT_PATH,
          logoAlt: 'Zur Mardu-Startseite',
          logoWidth: 156,
          logoHeight: 44,
        },
        items: headerItems,
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
          logoSrc: MARDU_LOGO_DARK_PATH,
          logoAlt: 'Mardu',
          logoWidth: 156,
          logoHeight: 44,
          wordmarkSrc: MARDU_WORDMARK_DARK_PATH,
          backgroundMarkModelSrc: MARDU_FOOTER_MODEL_PATH,
          backgroundMarkColor: '#8D69BF',
          copyrightName: 'Mardu GmbH',
        },
        description: 'Wo Nutzung beginnt, ist Mardu.',
        primaryActionSlot: (
          <EditorialActionButton render={<Link href="/contact" />} tone="dark">
            Jetzt beraten lassen
          </EditorialActionButton>
        ),
        navLinks: footerNavLinks,
        metaLinks: [...defaultFooterMetaLinks, ...siteConfig.footerMetaLinks],
        socialLinks,
        aiSummaryLinks,
      }}
    >
      {children}
    </SharedSiteShell>
  );
}
