import { vercelAdapter } from '@flags-sdk/vercel';
import { flag, type Flag } from 'flags/next';

export type SiteKey = 'mardu-de' | 'mardu-space' | 'platform';

export type SiteLink = {
  href: string;
  label: string;
};

export type SiteFeatureKey = 'blog' | 'integrations';

export type SiteFeatureFlags = {
  blog: boolean;
  integrations: boolean;
};

export type SiteFeatureFlagDeclarations = Record<SiteFeatureKey, Flag<boolean>>;

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
  features: SiteFeatureFlags;
  footerMetaLinks: ReadonlyArray<SiteLink>;
};

const featureEnvVarNames: Record<SiteKey, Record<SiteFeatureKey, string>> = {
  'mardu-de': {
    blog: 'MARDU_DE_ENABLE_BLOG',
    integrations: 'MARDU_DE_ENABLE_INTEGRATIONS',
  },
  'mardu-space': {
    blog: 'MARDU_SPACE_ENABLE_BLOG',
    integrations: 'MARDU_SPACE_ENABLE_INTEGRATIONS',
  },
  platform: {
    blog: 'MARDU_PLATFORM_ENABLE_BLOG',
    integrations: 'MARDU_PLATFORM_ENABLE_INTEGRATIONS',
  },
};

function parseBooleanEnvOverride(rawValue: string | undefined): boolean | undefined {
  if (!rawValue) {
    return undefined;
  }

  const normalized = rawValue.trim().toLowerCase();

  if (normalized === 'true') {
    return true;
  }

  if (normalized === 'false') {
    return false;
  }

  return undefined;
}

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
    features: {
      blog: false,
      integrations: false,
    },
    footerMetaLinks: [
      { href: '/publisher', label: 'Impressum' },
      { href: '/privacy', label: 'Datenschutz' },
    ],
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
    features: {
      blog: false,
      integrations: false,
    },
    footerMetaLinks: [
      { href: '/roadmap', label: 'Roadmap' },
      { href: '/privacy', label: 'Datenschutz' },
      { href: '/publisher', label: 'Impressum' },
    ],
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
    features: {
      blog: false,
      integrations: false,
    },
    footerMetaLinks: [
      { href: '/publisher', label: 'Impressum' },
      { href: '/privacy', label: 'Datenschutz' },
    ],
  },
};

const BOOLEAN_FLAG_OPTIONS: { label: string; value: boolean }[] = [
  { label: 'Off', value: false },
  { label: 'On', value: true },
];

const siteFeatureFlagDeclarations: Record<SiteKey, SiteFeatureFlagDeclarations> = {
  'mardu-de': {
    blog: flag<boolean>({
      key: 'blog',
      adapter: vercelAdapter(),
      defaultValue: siteConfigs['mardu-de'].features.blog,
      description: 'Steuert Blog-Navigation, Blog-Routen und Sitemap-Einträge auf mardu.de.',
      origin: `${siteConfigs['mardu-de'].origin}/blog`,
      options: BOOLEAN_FLAG_OPTIONS,
    }),
    integrations: flag<boolean>({
      key: 'integrations',
      adapter: vercelAdapter(),
      defaultValue: siteConfigs['mardu-de'].features.integrations,
      description:
        'Steuert Integrations-Navigation, Integrations-Routen und Sitemap-Einträge auf mardu.de.',
      origin: `${siteConfigs['mardu-de'].origin}/integrations`,
      options: BOOLEAN_FLAG_OPTIONS,
    }),
  },
  'mardu-space': {
    blog: flag<boolean>({
      key: 'blog',
      adapter: vercelAdapter(),
      defaultValue: siteConfigs['mardu-space'].features.blog,
      description: 'Steuert Blog-Features auf mardu.space.',
      origin: `${siteConfigs['mardu-space'].origin}/blog`,
      options: BOOLEAN_FLAG_OPTIONS,
    }),
    integrations: flag<boolean>({
      key: 'integrations',
      adapter: vercelAdapter(),
      defaultValue: siteConfigs['mardu-space'].features.integrations,
      description: 'Steuert Integrations-Features auf mardu.space.',
      origin: `${siteConfigs['mardu-space'].origin}/integrations`,
      options: BOOLEAN_FLAG_OPTIONS,
    }),
  },
  platform: {
    blog: flag<boolean>({
      key: 'blog',
      adapter: vercelAdapter(),
      defaultValue: siteConfigs.platform.features.blog,
      description: 'Steuert Blog-Features auf platform.mardu.de.',
      origin: `${siteConfigs.platform.origin}/blog`,
      options: BOOLEAN_FLAG_OPTIONS,
    }),
    integrations: flag<boolean>({
      key: 'integrations',
      adapter: vercelAdapter(),
      defaultValue: siteConfigs.platform.features.integrations,
      description: 'Steuert Integrations-Features auf platform.mardu.de.',
      origin: `${siteConfigs.platform.origin}/integrations`,
      options: BOOLEAN_FLAG_OPTIONS,
    }),
  },
};

export function getSiteConfig(site: SiteKey): SiteConfig {
  return siteConfigs[site];
}

export function getSiteFlagDefinitions(site: SiteKey): SiteFeatureFlagDeclarations {
  return siteFeatureFlagDeclarations[site];
}

export async function getSiteFeatureFlags(site: SiteKey): Promise<SiteFeatureFlags> {
  const config = getSiteConfig(site);
  const envVarNames = featureEnvVarNames[site];
  const flags = getSiteFlagDefinitions(site);

  return {
    blog:
      parseBooleanEnvOverride(process.env[envVarNames.blog]) ??
      (await flags.blog().catch(() => config.features.blog)),
    integrations:
      parseBooleanEnvOverride(process.env[envVarNames.integrations]) ??
      (await flags.integrations().catch(() => config.features.integrations)),
  };
}

export async function isBlogEnabled(site: SiteKey): Promise<boolean> {
  return (await getSiteFeatureFlags(site)).blog;
}

export async function isIntegrationsEnabled(site: SiteKey): Promise<boolean> {
  return (await getSiteFeatureFlags(site)).integrations;
}

export function getPlatformOrigin(): string {
  return process.env.MARDU_PLATFORM_ORIGIN?.trim() || siteConfigs.platform.origin;
}
