import type { MetadataRoute } from 'next';
import { getPlatformContentSitemapEntries } from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';

const SITE_URL = 'https://mardu.space';

/**
 * SEO sitemap endpoint (`/sitemap.xml`) using Next.js MetadataRoute DTO.
 * Add new indexable routes here when pages are introduced.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const contentEntries = await getPlatformContentSitemapEntries(getPlatformOrigin(), 'mardu-space');

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/system`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/configurator`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/roadmap`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/brand`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/fotos`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/products`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/solutions`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    ...contentEntries.products.map((entry) => ({
      url: `${SITE_URL}/products/${entry.slug}`,
      lastModified: entry.updatedAt ? new Date(entry.updatedAt) : lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...contentEntries.solutions.map((entry) => ({
      url: `${SITE_URL}/solutions/${entry.slug}`,
      lastModified: entry.updatedAt ? new Date(entry.updatedAt) : lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/publisher`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
