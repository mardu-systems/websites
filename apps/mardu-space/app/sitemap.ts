import type { MetadataRoute } from 'next';

const SITE_URL = 'https://mardu.space';

/**
 * SEO sitemap endpoint (`/sitemap.xml`) using Next.js MetadataRoute DTO.
 * Add new indexable routes here when pages are introduced.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/system`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/configurator`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/roadmap`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/brand`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/fotos`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/publisher`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
