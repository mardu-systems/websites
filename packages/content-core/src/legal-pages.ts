import type { LegalPageDto, LegalPageSlug, SiteVisibility, VisibleSite } from './index';
import { isVisibleOnSite } from './index';
import privacyMarkdown from './legal/privacy.md';
import publisherMarkdown from './legal/publisher.md';

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

type PayloadMeta = {
  title?: string;
  description?: string;
  url?: string;
};

type PayloadLegalPageDoc = SiteVisibility & {
  canonicalUrl?: string;
  slug?: string;
  title?: string;
  pageKind?: LegalPageSlug;
  summary?: string;
  seoDescription?: string;
  seoTitle?: string;
  contentMarkdown?: string;
  updatedLabel?: string;
  meta?: unknown;
};

type PayloadRestCollectionResult<T> = {
  docs?: T[];
};

const DEFAULT_REVALIDATE_SECONDS = 60;
const DEFAULT_SHARED_SITES: VisibleSite[] = ['mardu-de', 'mardu-space', 'platform'];
const DEFAULT_FETCH_TIMEOUT_MS = 3_000;

const DEFAULT_PAGE_COPY: Record<
  LegalPageSlug,
  Pick<LegalPageDto, 'title' | 'pageKind' | 'summary' | 'updatedLabel'>
> = {
  privacy: {
    title: 'Datenschutzerklärung',
    pageKind: 'privacy',
    summary: 'Informationen zum Datenschutz.',
    updatedLabel: '30.04.2026',
  },
  publisher: {
    title: 'Impressum',
    pageKind: 'publisher',
    summary: 'Angaben gemäß § 5 TMG.',
    updatedLabel: '30.04.2026',
  },
};

function buildRestUrl(origin: string, pathname: string, params: Record<string, string>) {
  const url = new URL(pathname, origin);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url;
}

async function fetchJson<T>(url: URL): Promise<T | null> {
  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(DEFAULT_FETCH_TIMEOUT_MS),
      next: {
        revalidate: DEFAULT_REVALIDATE_SECONDS,
      },
    } satisfies NextFetchInit);
  } catch {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

function toMeta(value: unknown): PayloadMeta | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as PayloadMeta;
}

async function readBundledLegalMarkdown(slug: LegalPageSlug): Promise<string | null> {
  return slug === 'privacy' ? privacyMarkdown : publisherMarkdown;
}

function mapLegalPageDoc(
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

export async function getBundledLegalPage(
  site: VisibleSite,
  slug: LegalPageSlug,
): Promise<LegalPageDto | null> {
  if (!DEFAULT_SHARED_SITES.includes(site)) {
    return null;
  }

  const contentMarkdown = await readBundledLegalMarkdown(slug);

  if (!contentMarkdown) {
    return null;
  }

  const defaults = DEFAULT_PAGE_COPY[slug];

  return {
    slug,
    title: defaults.title,
    pageKind: defaults.pageKind,
    contentMarkdown,
    summary: defaults.summary,
    updatedLabel: defaults.updatedLabel,
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

  const result = await fetchJson<PayloadRestCollectionResult<PayloadLegalPageDoc>>(url);
  const doc = (result?.docs ?? [])
    .map((item) => mapLegalPageDoc(item, site))
    .find((item): item is LegalPageDto => Boolean(item));

  if (doc) {
    return doc;
  }

  return getBundledLegalPage(site, slug);
}
