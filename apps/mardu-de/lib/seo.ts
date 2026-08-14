import type {
  BlogPostDetailDto,
  CatalogProductDetailDto,
  IntegrationDetailDto,
} from '@mardu/content-core';
import { getSiteConfig } from '@mardu/site-config';
import type { Metadata } from 'next';
import type { JsonLdData } from '@/components/seo/json-ld';

const siteConfig = getSiteConfig('mardu-de');

export const MARDU_SITE_URL = siteConfig.origin;
export const MARDU_ORGANIZATION_ID = `${MARDU_SITE_URL}/#organization`;
export const MARDU_WEBSITE_ID = `${MARDU_SITE_URL}/#website`;

export const DEFAULT_SOCIAL_IMAGE = {
  url: '/_A7_9072_quer.webp',
  width: 1200,
  height: 630,
  alt: 'Mardu Zutrittskontrolle und Maschinenfreigabe',
  type: 'image/webp',
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | '/';
  socialTitle?: string;
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    type?: string;
  };
  openGraphType?: 'website' | 'article';
  index?: boolean;
};

export function absoluteSiteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, MARDU_SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  socialTitle = title.includes('Mardu') ? title : `${title} | Mardu`,
  image = DEFAULT_SOCIAL_IMAGE,
  openGraphType = 'website',
  index = true,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteSiteUrl(path);
  const socialImage = {
    url: absoluteSiteUrl(image.url),
    alt: image.alt,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
    ...(image.type ? { type: image.type } : {}),
  };

  return {
    title,
    description,
    ...(index
      ? {
          alternates: {
            canonical,
          },
        }
      : {
          robots: {
            index: false,
            follow: false,
          },
        }),
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      type: openGraphType,
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

export type BreadcrumbItem = {
  name: string;
  path: `/${string}` | '/';
};

export function createBreadcrumbJsonLd(items: readonly BreadcrumbItem[]): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(item.path),
    })),
  };
}

export function createFaqJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>,
): JsonLdData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function createBlogPostingJsonLd(post: BlogPostDetailDto): JsonLdData {
  const canonical = absoluteSiteUrl(post.canonicalUrl || `/blog/${post.slug}`);
  const image = absoluteSiteUrl(post.ogImageUrl || post.coverImageUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    mainEntityOfPage: canonical,
    url: canonical,
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: [image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    inLanguage: 'de-DE',
    articleSection: post.categories.map((category) => category.title),
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.role ? { jobTitle: post.author.role } : {}),
    },
    publisher: {
      '@id': MARDU_ORGANIZATION_ID,
    },
  };
}

function createWebPageJsonLd({
  url: pathOrUrl,
  name,
  description,
  image,
  dateModified,
}: {
  url: string;
  name: string;
  description: string;
  image?: string;
  dateModified?: string;
}): JsonLdData {
  const url = absoluteSiteUrl(pathOrUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'de-DE',
    isPartOf: {
      '@id': MARDU_WEBSITE_ID,
    },
    ...(image ? { primaryImageOfPage: absoluteSiteUrl(image) } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

export function createIntegrationJsonLd(integration: IntegrationDetailDto): JsonLdData {
  return createWebPageJsonLd({
    url: integration.canonicalUrl || `/integrations/${integration.slug}`,
    name: integration.seoTitle || `${integration.title} Integration`,
    description: integration.seoDescription || integration.shortDescription,
    image: integration.ogImageUrl || integration.heroImageUrl || integration.logoUrl,
    dateModified: integration.updatedAt,
  });
}

const availabilityUrls: Record<CatalogProductDetailDto['availability'], string> = {
  available: 'https://schema.org/InStock',
  'lead-time': 'https://schema.org/BackOrder',
  project: 'https://schema.org/PreOrder',
};

export function createProductJsonLd(product: CatalogProductDetailDto): JsonLdData {
  const canonical = absoluteSiteUrl(product.canonicalUrl || `/products/${product.slug}`);
  const additionalProperty = [
    ...product.technologies.map((technology) => ({
      '@type': 'PropertyValue',
      name: 'Technologie',
      value: technology.name,
    })),
    ...product.specGroups.flatMap((group) =>
      group.specs.map((spec) => ({
        '@type': 'PropertyValue',
        name: `${group.title}: ${spec.label}`,
        value: spec.value,
      })),
    ),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonical}#product`,
    url: canonical,
    name: product.name,
    description: product.seoDescription || product.summary,
    category: product.categoryName,
    ...(product.imageUrl ? { image: [absoluteSiteUrl(product.imageUrl)] } : {}),
    brand: {
      '@id': MARDU_ORGANIZATION_ID,
    },
    ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
    ...(product.priceFrom !== undefined
      ? {
          offers: {
            '@type': 'Offer',
            url: canonical,
            price: product.priceFrom,
            priceCurrency: 'EUR',
            availability: availabilityUrls[product.availability],
          },
        }
      : {}),
  };
}
