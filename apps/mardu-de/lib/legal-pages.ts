import type { LegalPageSlug } from '@mardu/content-core';
import { getPlatformLegalPage } from '@mardu/content-core/legal-pages';
import { getPlatformOrigin, getSiteConfig } from '@mardu/site-config';
import type { Metadata } from 'next';

const site = 'mardu-de' as const;
const siteConfig = getSiteConfig(site);

export async function getLegalPage(slug: LegalPageSlug) {
  return getPlatformLegalPage(getPlatformOrigin(), site, slug);
}

export function buildLegalPageMetadata(slug: LegalPageSlug, page: Awaited<ReturnType<typeof getLegalPage>>): Metadata {
  const pageTitle = page?.title ?? (slug === 'privacy' ? 'Datenschutzerklärung' : 'Impressum');
  const title = page?.seoTitle?.replace(/\s*\|\s*Mardu\s*$/i, '') ?? pageTitle;
  const socialTitle = `${title} | ${siteConfig.appName}`;
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
      title: socialTitle,
      description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: socialTitle,
      description,
    },
  };
}
