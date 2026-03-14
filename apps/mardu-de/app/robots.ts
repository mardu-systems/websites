import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.mardu.de';

/**
 * SEO robots endpoint (`/robots.txt`) using Next.js MetadataRoute DTO.
 * Keeps crawl directives versioned in code instead of static files.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
