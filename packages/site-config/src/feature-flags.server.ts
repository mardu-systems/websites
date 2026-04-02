import 'server-only';

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

async function loadVercelAdapter() {
  const importModule = new Function(
    'specifier',
    'return import(specifier);',
  ) as (specifier: string) => Promise<typeof import('@flags-sdk/vercel')>;

  return importModule('@flags-sdk/vercel');
}

async function createSiteFlagDeclarations(site: SiteKey): Promise<SiteFeatureFlagDeclarations> {
  const definitions = getSiteFlagDefinitions(site);
  const adapter = process.env.FLAGS?.trim()
    ? (await loadVercelAdapter()).vercelAdapter<boolean, any>()
    : null;
  const blogDefinition = {
    ...definitions.blog,
    options: [...definitions.blog.options],
  };
  const integrationsDefinition = {
    ...definitions.integrations,
    options: [...definitions.integrations.options],
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

export async function getSiteFeatureFlags(site: SiteKey): Promise<SiteFeatureFlags> {
  const config = getSiteConfig(site);
  const envVarNames = featureEnvVarNames[site];
  const blogOverride = parseBooleanEnvOverride(process.env[envVarNames.blog]);
  const integrationsOverride = parseBooleanEnvOverride(process.env[envVarNames.integrations]);

  if (!process.env.FLAGS?.trim()) {
    return {
      blog: blogOverride ?? config.features.blog,
      integrations: integrationsOverride ?? config.features.integrations,
    };
  }

  const flags = await getRuntimeSiteFlagDeclarations(site);

  return {
    blog: blogOverride ?? (await flags.blog().catch(() => config.features.blog)),
    integrations:
      integrationsOverride ?? (await flags.integrations().catch(() => config.features.integrations)),
  };
}

export async function isBlogEnabled(site: SiteKey): Promise<boolean> {
  return (await getSiteFeatureFlags(site)).blog;
}

export async function isIntegrationsEnabled(site: SiteKey): Promise<boolean> {
  return (await getSiteFeatureFlags(site)).integrations;
}
