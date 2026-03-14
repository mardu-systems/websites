export type SiteKey = 'mardu-de' | 'mardu-space' | 'platform';

export type SiteConfig = {
  key: SiteKey;
  label: string;
  appName: string;
  domain: string;
  origin: string;
  apiOrigin: string;
  theme: string;
  supportEmail: string;
  newsletterSourceLabel: string;
  contactPath: string;
  newsletterSuccessPath: string;
  newsletterUnsubscribePath: string;
  whitepaperSuccessPath?: string;
  whitepaperDownloadPath?: string;
  emailLogoUrl: string;
  emailBrandName: string;
};

export const siteConfigs: Record<SiteKey, SiteConfig> = {
  'mardu-de': {
    key: 'mardu-de',
    label: 'mardu.de',
    appName: 'Mardu',
    domain: 'www.mardu.de',
    origin: 'https://www.mardu.de',
    apiOrigin: 'https://platform.mardu.de',
    theme: '@mardu/styles/theme-mardu-de.css',
    supportEmail: 'info@mardu.de',
    newsletterSourceLabel: 'mardu.de newsletter',
    contactPath: '/contact',
    newsletterSuccessPath: '/newsletter/anmeldung',
    newsletterUnsubscribePath: '/newsletter/abmeldung',
    emailLogoUrl: 'https://www.mardu.de/logos/Logo.svg',
    emailBrandName: 'Mardu',
  },
  'mardu-space': {
    key: 'mardu-space',
    label: 'mardu.space',
    appName: 'mardu.space',
    domain: 'mardu.space',
    origin: 'https://mardu.space',
    apiOrigin: 'https://platform.mardu.de',
    theme: '@mardu/styles/theme-mardu-space.css',
    supportEmail: 'info@mardu.space',
    newsletterSourceLabel: 'mardu.space newsletter',
    contactPath: '/contact',
    newsletterSuccessPath: '/newsletter/success',
    newsletterUnsubscribePath: '/newsletter/success',
    whitepaperSuccessPath: '/whitepaper/success',
    whitepaperDownloadPath: '/api/whitepaper/download',
    emailLogoUrl: 'https://mardu.space/marduspace_logo_bg_white.svg',
    emailBrandName: 'mardu.space',
  },
  platform: {
    key: 'platform',
    label: 'platform.mardu.de',
    appName: 'Mardu Platform',
    domain: 'platform.mardu.de',
    origin: 'https://platform.mardu.de',
    apiOrigin: 'https://platform.mardu.de',
    theme: '@mardu/styles/theme-platform.css',
    supportEmail: 'info@mardu.de',
    newsletterSourceLabel: 'platform leads',
    contactPath: '/contact',
    newsletterSuccessPath: '/newsletter/anmeldung',
    newsletterUnsubscribePath: '/newsletter/abmeldung',
    emailLogoUrl: 'https://www.mardu.de/logos/Logo.svg',
    emailBrandName: 'Mardu Platform',
  },
};

export function getSiteConfig(site: SiteKey): SiteConfig {
  return siteConfigs[site];
}

export function getPlatformOrigin(): string {
  return process.env.MARDU_PLATFORM_ORIGIN?.trim() || siteConfigs.platform.origin;
}
