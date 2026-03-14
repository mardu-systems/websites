import type { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@/payload.config';

const SITE_URL = 'https://www.mardu.de';

/**
 * SEO sitemap endpoint (`/sitemap.xml`) using Next.js MetadataRoute DTO.
 * Add new indexable routes here when pages are introduced.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

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

  if (!process.env.DATABASE_URI) {
    return [
      ...staticRoutes,
      {
        url: `${SITE_URL}/integrations`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.85,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];
  }

  try {
    const payload = await getPayload({ config });
    const posts = await payload.find({
      collection: 'blog-posts',
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      limit: 200,
      pagination: false,
    });
    const integrations = await payload.find({
      collection: 'integrations',
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      limit: 400,
      pagination: false,
    });

    const blogRoutes: MetadataRoute.Sitemap = [
      {
        url: `${SITE_URL}/integrations`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.85,
      },
      ...integrations.docs.flatMap((doc) => {
        if (typeof doc.slug !== 'string') {
          return [];
        }

        const docLastModified =
          typeof doc.updatedAt === 'string' ? doc.updatedAt : lastModified;

        return [
          {
            url: `${SITE_URL}/integrations/${doc.slug}`,
            lastModified: docLastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.75,
          },
        ];
      }),
      {
        url: `${SITE_URL}/blog`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      ...posts.docs.flatMap((doc) => {
        if (typeof doc.slug !== 'string') {
          return [];
        }

        const docLastModified =
          typeof doc.updatedAt === 'string' ? doc.updatedAt : lastModified;

        return [
          {
            url: `${SITE_URL}/blog/${doc.slug}`,
            lastModified: docLastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          },
        ];
      }),
    ];

    return [...staticRoutes, ...blogRoutes];
  } catch {
    return [
      ...staticRoutes,
      {
        url: `${SITE_URL}/integrations`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.85,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];
  }
}
