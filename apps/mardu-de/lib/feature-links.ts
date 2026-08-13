import type { SiteFeatureFlags, SiteFeatureKey } from '@mardu/site-config';

const featureRoutePrefixes: Record<SiteFeatureKey, string> = {
  blog: '/blog',
  integrations: '/integrations',
  products: '/products',
};

export function getFeatureForHref(href: string): SiteFeatureKey | undefined {
  if (!href.startsWith('/')) {
    return undefined;
  }

  const pathname = href.split(/[?#]/, 1)[0];
  return (Object.entries(featureRoutePrefixes) as Array<[SiteFeatureKey, string]>).find(
    ([, prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )?.[0];
}

export function isFeatureHrefEnabled(href: string, features: SiteFeatureFlags): boolean {
  const feature = getFeatureForHref(href);
  return feature ? features[feature] : true;
}

export function filterFeatureLinks<T extends { href: string }>(
  links: readonly T[],
  features: SiteFeatureFlags,
): T[] {
  return links.filter((link) => isFeatureHrefEnabled(link.href, features));
}
