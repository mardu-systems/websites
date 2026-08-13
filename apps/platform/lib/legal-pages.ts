import type { LegalPageSlug } from '@mardu/content-core';
import { getBundledLegalPage } from '@mardu/content-core/legal-content';
import { mapLegalPageDocument } from '@mardu/content-core/legal-pages';
import { getSiteConfig } from '@mardu/site-config';
import type { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@/payload.config';

const site = 'platform' as const;
const siteConfig = getSiteConfig(site);

export async function getLegalPage(slug: LegalPageSlug) {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'legal-pages',
      depth: 0,
      limit: 1,
      pagination: false,
      where: {
        and: [{ _status: { equals: 'published' } }, { slug: { equals: slug } }],
      },
    });
    const document = result.docs[0];
    const mappedPage = document ? mapLegalPageDocument(document, site) : null;

    return mappedPage ?? getBundledLegalPage(slug);
  } catch (error) {
    console.error(
      `Failed to load legal page "${slug}" from Payload; using bundled fallback`,
      error,
    );
    return getBundledLegalPage(slug);
  }
}

export function buildLegalPageMetadata(
  slug: LegalPageSlug,
  page: Awaited<ReturnType<typeof getLegalPage>>,
): Metadata {
  const title =
    page?.seoTitle ??
    `${page?.title ?? (slug === 'privacy' ? 'Datenschutzerklärung' : 'Impressum')} | ${siteConfig.appName}`;
  const description =
    page?.seoDescription ??
    page?.summary ??
    (slug === 'privacy'
      ? `Informationen zum Datenschutz bei ${siteConfig.label}.`
      : `Angaben gemäß § 5 DDG für ${siteConfig.label}.`);
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
