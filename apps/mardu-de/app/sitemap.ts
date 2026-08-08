import { getPlatformContentSitemapEntries } from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';
import { isBlogEnabled, isIntegrationsEnabled } from '@mardu/site-config/feature-flags.server';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.mardu.de';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [blogEnabled, integrationsEnabled] = await Promise.all([
    isBlogEnabled('mardu-de'),
    isIntegrationsEnabled('mardu-de'),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/brand`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/publisher`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const contentEntries = await getPlatformContentSitemapEntries(getPlatformOrigin(), 'mardu-de');

  return [
    ...staticRoutes,
    { url: `${SITE_URL}/products`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/solutions`, lastModified, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/roadmap`, lastModified, changeFrequency: 'weekly', priority: 0.65 },
    ...contentEntries.products.map((entry) => ({
      url: `${SITE_URL}/products/${entry.slug}`,
      lastModified: entry.updatedAt ?? lastModified.toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...contentEntries.solutions.map((entry) => ({
      url: `${SITE_URL}/solutions/${entry.slug}`,
      lastModified: entry.updatedAt ?? lastModified.toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
    ...(integrationsEnabled
      ? [
          {
            url: `${SITE_URL}/integrations`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          },
          ...contentEntries.integrations.map((entry) => ({
            url: `${SITE_URL}/integrations/${entry.slug}`,
            lastModified: entry.updatedAt ?? lastModified.toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.75,
          })),
        ]
      : []),
    ...(blogEnabled
      ? [
          {
            url: `${SITE_URL}/blog`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          },
          ...contentEntries.blog.map((entry) => ({
            url: `${SITE_URL}/blog/${entry.slug}`,
            lastModified: entry.updatedAt ?? lastModified.toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          })),
        ]
      : []),
  ];
}
