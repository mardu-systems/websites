import { getPlatformContentSitemapEntries } from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';
import { isBlogEnabled, isIntegrationsEnabled } from '@mardu/site-config/feature-flags.server';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.mardu.de';

export const dynamic = 'force-dynamic';

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    url: `${SITE_URL}/contact`,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/about`,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/brand`,
    changeFrequency: 'monthly',
    priority: 0.4,
  },
  {
    url: `${SITE_URL}/fotos`,
    changeFrequency: 'monthly',
    priority: 0.4,
  },
  {
    url: `${SITE_URL}/platform`,
    changeFrequency: 'monthly',
    priority: 0.85,
  },
  {
    url: `${SITE_URL}/products`,
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    url: `${SITE_URL}/solutions`,
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    url: `${SITE_URL}/roadmap`,
    changeFrequency: 'weekly',
    priority: 0.65,
  },
  {
    url: `${SITE_URL}/configurator`,
    changeFrequency: 'monthly',
    priority: 0.65,
  },
  {
    url: `${SITE_URL}/newsletter`,
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: `${SITE_URL}/whitepaper`,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/privacy`,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${SITE_URL}/publisher`,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
];

const createLandingRoutes = ({
  blogEnabled,
  integrationsEnabled,
}: {
  blogEnabled: boolean;
  integrationsEnabled: boolean;
}): MetadataRoute.Sitemap => [
  ...(integrationsEnabled
    ? [
        {
          url: `${SITE_URL}/integrations`,
          changeFrequency: 'weekly' as const,
          priority: 0.85,
        },
      ]
    : []),
  ...(blogEnabled
    ? [
        {
          url: `${SITE_URL}/blog`,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        },
      ]
    : []),
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogEnabled, integrationsEnabled] = await Promise.all([
    isBlogEnabled('mardu-de'),
    isIntegrationsEnabled('mardu-de'),
  ]);
  const landingRoutes = createLandingRoutes({ blogEnabled, integrationsEnabled });

  let contentEntries: Awaited<ReturnType<typeof getPlatformContentSitemapEntries>>;

  try {
    contentEntries = await getPlatformContentSitemapEntries(getPlatformOrigin(), 'mardu-de');
  } catch (error) {
    console.error('[sitemap] Content API unavailable; serving stable routes only', {
      error: error instanceof Error ? error.message : String(error),
    });

    return [...staticRoutes, ...landingRoutes];
  }

  return [
    ...staticRoutes,
    ...landingRoutes,
    ...contentEntries.products.map((entry) => ({
      url: `${SITE_URL}/products/${entry.slug}`,
      ...(entry.updatedAt ? { lastModified: entry.updatedAt } : {}),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...contentEntries.solutions.map((entry) => ({
      url: `${SITE_URL}/solutions/${entry.slug}`,
      ...(entry.updatedAt ? { lastModified: entry.updatedAt } : {}),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...(integrationsEnabled
      ? [
          ...contentEntries.integrations.map((entry) => ({
            url: `${SITE_URL}/integrations/${entry.slug}`,
            ...(entry.updatedAt ? { lastModified: entry.updatedAt } : {}),
            changeFrequency: 'weekly' as const,
            priority: 0.75,
          })),
        ]
      : []),
    ...(blogEnabled
      ? [
          ...contentEntries.blog.map((entry) => ({
            url: `${SITE_URL}/blog/${entry.slug}`,
            ...(entry.updatedAt ? { lastModified: entry.updatedAt } : {}),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          })),
        ]
      : []),
  ];
}
