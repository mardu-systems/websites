import { getPlatformContentSitemapEntries } from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';
import { isBlogEnabled, isIntegrationsEnabled } from '@mardu/site-config/feature-flags.server';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.mardu.de';

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

  try {
    const contentEntries = await getPlatformContentSitemapEntries(getPlatformOrigin(), 'mardu-de');

    return [
      ...staticRoutes,
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
  } catch {
    return [
      ...staticRoutes,
      ...(integrationsEnabled
        ? [
            {
              url: `${SITE_URL}/integrations`,
              lastModified,
              changeFrequency: 'weekly' as const,
              priority: 0.85,
            },
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
          ]
        : []),
    ];
  }
}
