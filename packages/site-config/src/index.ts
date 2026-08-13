export type SiteKey = 'mardu-de' | 'platform';

export type SiteLink = {
  href: string;
  label: string;
};

export type SiteFeatureKey = 'blog' | 'integrations' | 'products';

export type SiteFeatureFlags = {
  blog: boolean;
  integrations: boolean;
  products: boolean;
};

export type SiteFeatureFlagOptionDto = {
  label: string;
  value: boolean;
};

export type SiteFeatureFlagDefinitionDto = {
  key: SiteFeatureKey;
  defaultValue: boolean;
  description: string;
  origin: string;
  options: ReadonlyArray<SiteFeatureFlagOptionDto>;
};

export type SiteFeatureFlagDefinitionsDto = Record<SiteFeatureKey, SiteFeatureFlagDefinitionDto>;

export type SiteConfig = {
  key: SiteKey;
  label: string;
  appName: string;
  domain: string;
  origin: string;
  apiOrigin: string;
  theme: string;
  /**
   * Public support inbox shown on contact surfaces and transactional email footers.
   */
  supportEmail: string;
  /**
   * Public company phone number formatted for humans.
   */
  contactPhone: string;
  /**
   * Clickable tel URI for the public company phone number.
   */
  contactPhoneHref: string;
  /**
   * Public German Umsatzsteuer-Identifikationsnummer for structured data and legal pages.
   */
  vatId: string;
  newsletterSourceLabel: string;
  contactPath: string;
  newsletterSuccessPath: string;
  newsletterUnsubscribePath: string;
  emailLogoUrl: string;
  emailBrandName: string;
  features: SiteFeatureFlags;
  footerMetaLinks: ReadonlyArray<SiteLink>;
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
    contactPhone: '+49 721 25510624',
    contactPhoneHref: 'tel:+4972125510624',
    vatId: 'DE461239481',
    newsletterSourceLabel: 'mardu.de newsletter',
    contactPath: '/contact',
    newsletterSuccessPath: '/newsletter/anmeldung',
    newsletterUnsubscribePath: '/newsletter/abmeldung',
    emailLogoUrl: 'https://www.mardu.de/mardu-branding/logo/mardu_logo_side_for_white_bg.svg',
    emailBrandName: 'Mardu GmbH',
    features: {
      blog: false,
      integrations: false,
      products: false,
    },
    footerMetaLinks: [
      { href: '/publisher', label: 'Impressum' },
      { href: '/privacy', label: 'Datenschutz' },
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
    contactPhone: '+49 721 25510624',
    contactPhoneHref: 'tel:+4972125510624',
    vatId: 'DE461239481',
    newsletterSourceLabel: 'platform leads',
    contactPath: '/contact',
    newsletterSuccessPath: '/newsletter/anmeldung',
    newsletterUnsubscribePath: '/newsletter/abmeldung',
    emailLogoUrl: 'https://www.mardu.de/logos/Logo.svg',
    emailBrandName: 'Mardu GmbH',
    features: {
      blog: false,
      integrations: false,
      products: false,
    },
    footerMetaLinks: [
      { href: '/publisher', label: 'Impressum' },
      { href: '/privacy', label: 'Datenschutz' },
    ],
  },
};

export const booleanSiteFlagOptions: ReadonlyArray<SiteFeatureFlagOptionDto> = [
  { label: 'Off', value: false },
  { label: 'On', value: true },
];

export const siteFeatureFlagDefinitions: Record<SiteKey, SiteFeatureFlagDefinitionsDto> = {
  'mardu-de': {
    blog: {
      key: 'blog',
      defaultValue: siteConfigs['mardu-de'].features.blog,
      description: 'Steuert Blog-Navigation, Blog-Routen und Sitemap-Einträge auf mardu.de.',
      origin: `${siteConfigs['mardu-de'].origin}/blog`,
      options: booleanSiteFlagOptions,
    },
    integrations: {
      key: 'integrations',
      defaultValue: siteConfigs['mardu-de'].features.integrations,
      description:
        'Steuert Integrations-Navigation, Integrations-Routen und Sitemap-Einträge auf mardu.de.',
      origin: `${siteConfigs['mardu-de'].origin}/integrations`,
      options: booleanSiteFlagOptions,
    },
    products: {
      key: 'products',
      defaultValue: siteConfigs['mardu-de'].features.products,
      description: 'Steuert Produkt-Navigation, Produkt-Routen und Sitemap-Einträge auf mardu.de.',
      origin: `${siteConfigs['mardu-de'].origin}/products`,
      options: booleanSiteFlagOptions,
    },
  },
  platform: {
    blog: {
      key: 'blog',
      defaultValue: siteConfigs.platform.features.blog,
      description: 'Steuert Blog-Features auf platform.mardu.de.',
      origin: `${siteConfigs.platform.origin}/blog`,
      options: booleanSiteFlagOptions,
    },
    integrations: {
      key: 'integrations',
      defaultValue: siteConfigs.platform.features.integrations,
      description: 'Steuert Integrations-Features auf platform.mardu.de.',
      origin: `${siteConfigs.platform.origin}/integrations`,
      options: booleanSiteFlagOptions,
    },
    products: {
      key: 'products',
      defaultValue: siteConfigs.platform.features.products,
      description: 'Steuert Produkt-Features auf platform.mardu.de.',
      origin: `${siteConfigs.platform.origin}/products`,
      options: booleanSiteFlagOptions,
    },
  },
};

export function getSiteConfig(site: SiteKey): SiteConfig {
  return siteConfigs[site];
}

export function getSiteFlagDefinitions(site: SiteKey): SiteFeatureFlagDefinitionsDto {
  return siteFeatureFlagDefinitions[site];
}

export function getPlatformOrigin(): string {
  return process.env.MARDU_PLATFORM_ORIGIN?.trim() || siteConfigs.platform.origin;
}

export function parseBooleanEnvOverride(rawValue: string | undefined): boolean | undefined {
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

export const featureEnvVarNames: Record<SiteKey, Record<SiteFeatureKey, string>> = {
  'mardu-de': {
    blog: 'MARDU_DE_ENABLE_BLOG',
    integrations: 'MARDU_DE_ENABLE_INTEGRATIONS',
    products: 'MARDU_DE_ENABLE_PRODUCTS',
  },
  platform: {
    blog: 'MARDU_PLATFORM_ENABLE_BLOG',
    integrations: 'MARDU_PLATFORM_ENABLE_INTEGRATIONS',
    products: 'MARDU_PLATFORM_ENABLE_PRODUCTS',
  },
};
