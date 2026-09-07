import { reportError } from '@mardu/observability';
import { PostHog } from 'posthog-node';
import {
  featureEnvVarNames,
  getSiteConfig,
  parseBooleanEnvOverride,
  type SiteFeatureFlags,
  type SiteFeatureKey,
  type SiteKey,
} from './index';

/**
 * Default-Region für PostHog: EU-Cloud (Frankfurt), damit Profildaten der
 * serverseitigen Flag-Auswertung die EU nicht verlassen. Per `POSTHOG_HOST`
 * übersteuerbar.
 */
export const POSTHOG_EU_HOST = 'https://app-eu.posthog.com';

/**
 * Minimaler Client-Vertrag für die Flag-Auswertung. Entspricht der
 * `evaluateFlags`-API von `posthog-node` und erlaubt injizierte Stubs in Tests.
 */
export type PostHogFlagsClient = {
  evaluateFlags: (distinctId: string) => Promise<{
    getFlag: (key: string) => boolean | string | undefined;
  }>;
};

let sharedPostHogClient: PostHog | null | undefined;

function getPostHogClient(): PostHog | null {
  if (sharedPostHogClient !== undefined) {
    return sharedPostHogClient;
  }

  const apiKey = process.env.POSTHOG_API_KEY?.trim();

  if (!apiKey) {
    sharedPostHogClient = null;
    return null;
  }

  sharedPostHogClient = new PostHog(apiKey, {
    host: process.env.POSTHOG_HOST?.trim() || POSTHOG_EU_HOST,
  });
  return sharedPostHogClient;
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

function toBooleanFlag(value: boolean | string | undefined): boolean | undefined {
  if (value === true) {
    return true;
  }

  if (value === false) {
    return false;
  }

  return undefined;
}

/**
 * Serverseitige Distinct-ID für die Flag-Auswertung. Die drei Site-Flags
 * (`blog`, `integrations`, `products`) sind seitenweite Schalter und werden
 * bewusst ohne Personenbezug evaluiert. Personenbezogenes Targeting erfordert
 * eine Request-Kontext-ID statt dieser Konstanten.
 */
function distinctIdForSite(site: SiteKey): string {
  return `${site}-server`;
}

async function readPostHogFlags(
  client: PostHogFlagsClient,
  site: SiteKey,
): Promise<Partial<SiteFeatureFlags>> {
  const snapshot = await client.evaluateFlags(distinctIdForSite(site));
  const remote: Partial<SiteFeatureFlags> = {};
  const keys: ReadonlyArray<SiteFeatureKey> = ['blog', 'integrations', 'products'];

  for (const key of keys) {
    const value = toBooleanFlag(snapshot.getFlag(key));

    if (value !== undefined) {
      remote[key] = value;
    }
  }

  return remote;
}

async function resolveSiteFeatureFlags(
  site: SiteKey,
  client: PostHogFlagsClient | null,
): Promise<SiteFeatureFlags> {
  const config = getSiteConfig(site);
  const staticFlags = getStaticSiteFeatureFlags(site);

  if (!client) {
    return staticFlags;
  }

  try {
    const remote = await readPostHogFlags(client, site);
    const overrides = getSiteFeatureFlagOverrides(site);

    return {
      blog: overrides.blog ?? remote.blog ?? staticFlags.blog,
      integrations: overrides.integrations ?? remote.integrations ?? staticFlags.integrations,
      products: overrides.products ?? remote.products ?? staticFlags.products,
    };
  } catch (error) {
    reportError(error, 'feature-flags-posthog');
    return {
      blog: staticFlags.blog ?? config.features.blog,
      integrations: staticFlags.integrations ?? config.features.integrations,
      products: staticFlags.products ?? config.features.products,
    };
  }
}

export async function getSiteFeatureFlags(site: SiteKey): Promise<SiteFeatureFlags> {
  return resolveSiteFeatureFlags(site, getPostHogClient());
}

/**
 * Erzeugt einen Resolver mit injiziertem Client (Tests, Skripte). `null`
 * entspricht „PostHog deaktiviert“ und liefert die statischen Fallbacks.
 */
export function createSiteFeatureFlagsResolver(client: PostHogFlagsClient | null) {
  return (site: SiteKey): Promise<SiteFeatureFlags> => resolveSiteFeatureFlags(site, client);
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
