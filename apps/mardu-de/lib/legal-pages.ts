import type { LegalPageSlug } from '@mardu/content-core';
import { getBundledLegalPage } from '@mardu/content-core/legal-content';
import { mapLegalPageDocument } from '@mardu/content-core/legal-pages';
import { getSiteConfig } from '@mardu/site-config';
import type { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { absoluteSiteUrl, DEFAULT_SOCIAL_IMAGE } from '@/lib/seo';

const site = 'mardu-de' as const;
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
  const pageTitle = page?.title ?? (slug === 'privacy' ? 'Datenschutzerklärung' : 'Impressum');
  const title = page?.seoTitle?.replace(/\s*\|\s*Mardu\s*$/i, '') ?? pageTitle;
  const socialTitle = `${title} | ${siteConfig.appName}`;
  const description =
    page?.seoDescription ??
    page?.summary ??
    (slug === 'privacy'
      ? `Informationen zum Datenschutz bei ${siteConfig.label}.`
      : `Angaben gemäß § 5 DDG für ${siteConfig.label}.`);
  const url = page?.canonicalUrl ?? new URL(`/${slug}`, siteConfig.origin).toString();
  const socialImage = {
    ...DEFAULT_SOCIAL_IMAGE,
    url: absoluteSiteUrl(DEFAULT_SOCIAL_IMAGE.url),
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
