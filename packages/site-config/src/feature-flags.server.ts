import 'server-only';

import { vercelAdapter } from '@flags-sdk/vercel';
import { flag, type Flag } from 'flags/next';
import {
  featureEnvVarNames,
  getSiteConfig,
  getSiteFlagDefinitions,
  parseBooleanEnvOverride,
  type SiteFeatureFlags,
  type SiteFeatureKey,
  type SiteKey,
} from './index';

export type SiteFeatureFlagDeclarations = Record<SiteFeatureKey, Flag<boolean>>;

const siteFeatureFlagDeclarationsPromise = new Map<SiteKey, Promise<SiteFeatureFlagDeclarations>>();

async function createSiteFlagDeclarations(site: SiteKey): Promise<SiteFeatureFlagDeclarations> {
  const definitions = getSiteFlagDefinitions(site);
  const adapter = process.env.FLAGS?.trim() ? vercelAdapter<boolean, unknown>() : null;
  const blogDefinition = {
    ...definitions.blog,
    options: [...definitions.blog.options],
  };
  const integrationsDefinition = {
    ...definitions.integrations,
    options: [...definitions.integrations.options],
  };
  const productsDefinition = {
    ...definitions.products,
    options: [...definitions.products.options],
  };

  return {
    blog: adapter
      ? flag<boolean>({
          ...blogDefinition,
          adapter,
        })
      : flag<boolean>({
          ...blogDefinition,
          decide: async () => definitions.blog.defaultValue,
        }),
    integrations: adapter
      ? flag<boolean>({
          ...integrationsDefinition,
          adapter,
        })
      : flag<boolean>({
          ...integrationsDefinition,
          decide: async () => definitions.integrations.defaultValue,
        }),
    products: adapter
      ? flag<boolean>({
          ...productsDefinition,
          adapter,
        })
      : flag<boolean>({
          ...productsDefinition,
          decide: async () => definitions.products.defaultValue,
        }),
  };
}

async function getRuntimeSiteFlagDeclarations(site: SiteKey): Promise<SiteFeatureFlagDeclarations> {
  const existingPromise = siteFeatureFlagDeclarationsPromise.get(site);
  if (existingPromise) {
    return existingPromise;
  }

  const declarationsPromise = createSiteFlagDeclarations(site);
  siteFeatureFlagDeclarationsPromise.set(site, declarationsPromise);
  return declarationsPromise;
}

function getStaticSiteFeatureFlags(site: SiteKey): SiteFeatureFlags {
  const config = getSiteConfig(site);
  const overrides = getSiteFeatureFlagOverrides(site);

  return {
    blog: overrides.blog ?? config.features.blog,
    integrations: overrides.integrations ?? config.features.integrations,
    products: overrides.products ?? config.features.products,
  };
}

function getSiteFeatureFlagOverrides(site: SiteKey): Partial<SiteFeatureFlags> {
  const envVarNames = featureEnvVarNames[site];
  const blogOverride = parseBooleanEnvOverride(process.env[envVarNames.blog]);
  const integrationsOverride = parseBooleanEnvOverride(process.env[envVarNames.integrations]);
  const productsOverride = parseBooleanEnvOverride(process.env[envVarNames.products]);

  return {
    ...(blogOverride === undefined ? {} : { blog: blogOverride }),
    ...(integrationsOverride === undefined ? {} : { integrations: integrationsOverride }),
    ...(productsOverride === undefined ? {} : { products: productsOverride }),
  };
}

export async function getSiteFeatureFlags(site: SiteKey): Promise<SiteFeatureFlags> {
  const config = getSiteConfig(site);
  const staticFlags = getStaticSiteFeatureFlags(site);

  if (!process.env.FLAGS?.trim()) {
    return staticFlags;
  }

  try {
    const flags = await getRuntimeSiteFlagDeclarations(site);
    const overrides = getSiteFeatureFlagOverrides(site);

    return {
      blog: overrides.blog ?? (await flags.blog().catch(() => staticFlags.blog)),
      integrations:
        overrides.integrations ??
        (await flags.integrations().catch(() => staticFlags.integrations)),
      products: overrides.products ?? (await flags.products().catch(() => staticFlags.products)),
    };
  } catch (error) {
    console.error('[site-flags] Falling back to static feature flags', {
      site,
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      blog: staticFlags.blog ?? config.features.blog,
      integrations: staticFlags.integrations ?? config.features.integrations,
      products: staticFlags.products ?? config.features.products,
    };
  }
}

export async function isBlogEnabled(site: SiteKey): Promise<boolean> {
  return (await getSiteFeatureFlags(site)).blog;
}

export async function isIntegrationsEnabled(site: SiteKey): Promise<boolean> {
  return (await getSiteFeatureFlags(site)).integrations;
}

export async function isProductsEnabled(site: SiteKey): Promise<boolean> {
  return (await getSiteFeatureFlags(site)).products;
}
