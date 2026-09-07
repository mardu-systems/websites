import { getPlatformContentSitemapEntries } from '@mardu/content-core';
import { getContentOrigin } from '@/lib/content-origin';
import {
  isBlogEnabled,
  isIntegrationsEnabled,
  isProductsEnabled,
} from '@mardu/site-config/feature-flags.server';
import type { MetadataRoute } from 'next';
import { buildMarduSitemap } from '@/lib/sitemap';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogEnabled, integrationsEnabled, productsEnabled] = await Promise.all([
    isBlogEnabled('mardu-de'),
    isIntegrationsEnabled('mardu-de'),
    isProductsEnabled('mardu-de'),
  ]);
  return buildMarduSitemap({
    blogEnabled,
    integrationsEnabled,
    productsEnabled,
    loadContentEntries: () => getPlatformContentSitemapEntries(getContentOrigin(), 'mardu-de'),
    onContentError: (error) => {
      console.error('[sitemap] Content API unavailable; serving stable routes only', {
        error: error instanceof Error ? error.message : String(error),
      });
    },
  });
}
