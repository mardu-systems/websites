import type { LegalPageSlug } from '@mardu/content-core';
import { getBundledLegalPage, getPlatformLegalPage } from '@mardu/content-core/legal-pages';
import { getSiteConfig } from '@mardu/site-config';
import type { Metadata } from 'next';

const site = 'platform' as const;
const siteConfig = getSiteConfig(site);

function getPlatformContentOrigin() {
  return process.env.PAYLOAD_PUBLIC_SERVER_URL?.trim() || 'http://localhost:3000';
}

export async function getLegalPage(slug: LegalPageSlug) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return getBundledLegalPage(site, slug);
  }

  return getPlatformLegalPage(getPlatformContentOrigin(), site, slug);
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
