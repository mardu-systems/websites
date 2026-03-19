import type { LegalPageSlug } from '@mardu/content-core';
import { getPlatformLegalPage } from '@mardu/content-core/legal-pages';
import { getPlatformOrigin, getSiteConfig } from '@mardu/site-config';
import type { Metadata } from 'next';

const site = 'mardu-space' as const;
const siteConfig = getSiteConfig(site);

export async function getLegalPage(slug: LegalPageSlug) {
  return getPlatformLegalPage(getPlatformOrigin(), site, slug);
}

export function buildLegalPageMetadata(slug: LegalPageSlug, page: Awaited<ReturnType<typeof getLegalPage>>): Metadata {
  const title = page?.seoTitle ?? `${page?.title ?? (slug === 'privacy' ? 'Datenschutzerklärung' : 'Impressum')} | ${siteConfig.appName}`;
  const description =
    page?.seoDescription ??
    page?.summary ??
    (slug === 'privacy'
      ? `Informationen zum Datenschutz bei ${siteConfig.label}.`
      : `Angaben gemäß § 5 TMG für ${siteConfig.label}.`);
  const url = page?.canonicalUrl ?? new URL(`/${slug}`, siteConfig.origin).toString();

  return {
    title,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
