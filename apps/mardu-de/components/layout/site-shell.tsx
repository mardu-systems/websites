import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SharedSiteShell from '@mardu/layout/site-shell';
import type { FooterAiSummaryLinkDto, FooterSocialLinkDto } from '@mardu/layout/types';
import { Button } from '@mardu/ui/components/button';
import { getSiteConfig } from '@mardu/site-config';
import { defaultFooterMetaLinks, defaultFooterNavLinks } from '@/data/default-footer-items';
import { defaultHeaderItems } from '@/data/default-header-items';
import {
  MARDU_LOGO_DARK_PATH,
  MARDU_LOGO_LIGHT_PATH,
  MARDU_MOBILE_MENU_ICON_PATH,
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
          logoSrc: MARDU_LOGO_LIGHT_PATH,
          logoAlt: 'Zur Mardu-Startseite',
          logoWidth: 156,
          logoHeight: 44,
          mobileMenuIconSrc: MARDU_MOBILE_MENU_ICON_PATH,
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
          logoSrc: MARDU_LOGO_DARK_PATH,
          logoAlt: 'Mardu',
          logoWidth: 156,
          logoHeight: 44,
          wordmarkSrc: MARDU_WORDMARK_DARK_PATH,
          copyrightName: 'Mardu GmbH',
        },
        description: 'Wo Nutzung beginnt, ist Mardu.',
        primaryActionSlot: (
          <Button
            render={<Link href="/contact" />}
            className="group h-12 rounded-none border-y border-white/30 bg-transparent px-0 text-base font-normal text-white shadow-none hover:border-white hover:bg-transparent hover:text-white"
          >
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-black"
              aria-hidden="true"
            >
              <ArrowUpRight className="size-3.5 stroke-[1.8] transition-transform duration-200 ease-out group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none" />
            </span>
            Jetzt beraten lassen
          </Button>
        ),
        navLinks: defaultFooterNavLinks,
        metaLinks: [...defaultFooterMetaLinks, ...siteConfig.footerMetaLinks],
        socialLinks,
        aiSummaryLinks,
      }}
    >
      {children}
    </SharedSiteShell>
  );
}
