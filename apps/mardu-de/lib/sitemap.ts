import type { ContentSitemapEntry } from '@mardu/content-core';
import type { MetadataRoute } from 'next';

export const MARDU_SITE_URL = 'https://www.mardu.de';

export type PlatformContentSitemapEntries = {
  blog: ContentSitemapEntry[];
  integrations: ContentSitemapEntry[];
  products: ContentSitemapEntry[];
  solutions: ContentSitemapEntry[];
};

type BuildMarduSitemapOptions = {
  blogEnabled: boolean;
  integrationsEnabled: boolean;
  productsEnabled: boolean;
  loadContentEntries: () => Promise<PlatformContentSitemapEntries>;
  onContentError?: (error: unknown) => void;
};

const staticRoutes: MetadataRoute.Sitemap = [
  { url: MARDU_SITE_URL, changeFrequency: 'weekly', priority: 1 },
  { url: `${MARDU_SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${MARDU_SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${MARDU_SITE_URL}/brand`, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${MARDU_SITE_URL}/fotos`, changeFrequency: 'monthly', priority: 0.4 },
  { url: `${MARDU_SITE_URL}/platform`, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${MARDU_SITE_URL}/solutions`, changeFrequency: 'weekly', priority: 0.85 },
  { url: `${MARDU_SITE_URL}/roadmap`, changeFrequency: 'weekly', priority: 0.65 },
  { url: `${MARDU_SITE_URL}/configurator`, changeFrequency: 'monthly', priority: 0.65 },
  { url: `${MARDU_SITE_URL}/newsletter`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${MARDU_SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  { url: `${MARDU_SITE_URL}/publisher`, changeFrequency: 'yearly', priority: 0.3 },
];

function createLandingRoutes({
  blogEnabled,
  integrationsEnabled,
  productsEnabled,
}: Pick<
  BuildMarduSitemapOptions,
  'blogEnabled' | 'integrationsEnabled' | 'productsEnabled'
>): MetadataRoute.Sitemap {
  return [
    ...(productsEnabled
      ? [
          {
            url: `${MARDU_SITE_URL}/products`,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          },
        ]
      : []),
    ...(integrationsEnabled
      ? [
          {
            url: `${MARDU_SITE_URL}/integrations`,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
          },
        ]
      : []),
    ...(blogEnabled
      ? [
          {
            url: `${MARDU_SITE_URL}/blog`,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          },
        ]
      : []),
  ];
}

function createDetailRoutes(
  entries: ContentSitemapEntry[],
  path: 'blog' | 'integrations' | 'products' | 'solutions',
  priority: number,
): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: `${MARDU_SITE_URL}/${path}/${entry.slug}`,
    ...(entry.updatedAt ? { lastModified: entry.updatedAt } : {}),
    changeFrequency: 'weekly' as const,
    priority,
  }));
}

export async function buildMarduSitemap({
  blogEnabled,
  integrationsEnabled,
  productsEnabled,
  loadContentEntries,
  onContentError,
}: BuildMarduSitemapOptions): Promise<MetadataRoute.Sitemap> {
  const landingRoutes = createLandingRoutes({ blogEnabled, integrationsEnabled, productsEnabled });

  let contentEntries: PlatformContentSitemapEntries;
  try {
    contentEntries = await loadContentEntries();
  } catch (error) {
    onContentError?.(error);
    return [...staticRoutes, ...landingRoutes];
  }

  return [
    ...staticRoutes,
    ...landingRoutes,
    ...(productsEnabled ? createDetailRoutes(contentEntries.products, 'products', 0.75) : []),
    ...createDetailRoutes(contentEntries.solutions, 'solutions', 0.75),
    ...(integrationsEnabled
      ? createDetailRoutes(contentEntries.integrations, 'integrations', 0.75)
      : []),
    ...(blogEnabled ? createDetailRoutes(contentEntries.blog, 'blog', 0.7) : []),
  ];
}
