import type { LegalPageDto, LegalPageSlug, SiteVisibility, VisibleSite } from './index';
import { isVisibleOnSite } from './index';
import { fetchPayloadCollection, mapPayloadDocumentsStrict } from './content-api';

type PayloadMeta = {
  title?: string;
  description?: string;
  url?: string;
};

type PayloadLegalPageDoc = SiteVisibility & {
  canonicalUrl?: string | null;
  slug?: string | null;
  title?: string | null;
  pageKind?: LegalPageSlug | null;
  summary?: string | null;
  seoDescription?: string | null;
  seoTitle?: string | null;
  contentMarkdown?: string | null;
  updatedLabel?: string | null;
  meta?: unknown;
};


function buildRestUrl(origin: string, pathname: string, params: Record<string, string>) {
  const url = new URL(pathname, origin);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url;
}

function toMeta(value: unknown): PayloadMeta | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as PayloadMeta;
}

export function mapLegalPageDocument(
  doc: PayloadLegalPageDoc,
  site: VisibleSite,
): LegalPageDto | null {
  if (!isVisibleOnSite(doc, site)) {
    return null;
  }

  if (
    (doc.slug !== 'privacy' && doc.slug !== 'publisher') ||
    typeof doc.title !== 'string' ||
    typeof doc.contentMarkdown !== 'string'
  ) {
    return null;
  }

  const meta = toMeta(doc.meta);

  return {
    slug: doc.slug,
    title: doc.title,
    pageKind: doc.pageKind ?? doc.slug,
    contentMarkdown: doc.contentMarkdown,
    ...(doc.summary ? { summary: doc.summary } : {}),
    ...(doc.updatedLabel ? { updatedLabel: doc.updatedLabel } : {}),
    ...(doc.seoTitle ? { seoTitle: doc.seoTitle } : meta?.title ? { seoTitle: meta.title } : {}),
    ...(doc.seoDescription
      ? { seoDescription: doc.seoDescription }
      : meta?.description
        ? { seoDescription: meta.description }
        : {}),
    ...(doc.canonicalUrl
      ? { canonicalUrl: doc.canonicalUrl }
      : meta?.url
        ? { canonicalUrl: meta.url }
        : {}),
  };
}

export async function getPlatformLegalPage(
  origin: string,
  site: VisibleSite,
  slug: LegalPageSlug,
): Promise<LegalPageDto | null> {
  const url = buildRestUrl(origin, '/api/legal-pages', {
    depth: '0',
    limit: '10',
    pagination: 'false',
    'where[_status][equals]': 'published',
    'where[slug][equals]': slug,
  });

  const result = await fetchPayloadCollection<PayloadLegalPageDoc>(url);
  const visibleDocuments = result.docs.filter((document) => isVisibleOnSite(document, site));

  return (
    mapPayloadDocumentsStrict(
      visibleDocuments,
      (document) => mapLegalPageDocument(document, site),
      url.toString(),
    )[0] ?? null
  );
}
