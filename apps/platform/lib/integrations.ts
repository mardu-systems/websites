import config from '@/payload.config';
import type {
  IntegrationCategoryDto,
  IntegrationDetailDto,
  IntegrationListItemDto,
  IntegrationListQueryDto,
  IntegrationProtocolDto,
  IntegrationSort,
  IntegrationStatus,
  PaginatedIntegrationsDto,
} from '@mardu/content-core';
import { getPayload } from 'payload';

const DEFAULT_LIMIT = 12;
const MAX_FETCH = 400;

type PayloadMedia = {
  url?: string;
  alt?: string;
};

type PayloadCategory = {
  id?: number | string;
  title?: string;
  slug?: string;
  description?: string;
};

type PayloadProtocol = {
  id?: number | string;
  title?: string;
  slug?: string;
  badgeStyle?: 'info' | 'neutral' | 'success' | 'warn';
};

type PayloadMeta = {
  description?: string;
  image?: unknown;
  title?: string;
  url?: string;
};

type PayloadDoc = {
  id?: number | string;
  slug?: string;
  title?: string;
  shortDescription?: string;
  availabilityStatus?: IntegrationStatus;
  vendor?: string;
  featured?: boolean;
  sortOrder?: number;
  logo?: unknown;
  heroImage?: unknown;
  categories?: unknown;
  protocols?: unknown;
  comingAt?: string;
  docsUrl?: string;
  requestUrl?: string;
  useCases?: { title?: string }[];
  supportedActions?: { title?: string }[];
  compatibilityNotes?: string;
  description?: unknown;
  meta?: unknown;
  updatedAt?: Date | string;
};

const toId = (value: number | string | undefined): string => String(value ?? '');

const toMedia = (value: unknown): PayloadMedia | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as PayloadMedia;
};

const toMeta = (value: unknown): PayloadMeta | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as PayloadMeta;
};

const normalizeMediaUrl = (url?: string): string => {
  if (!url) {
    return '/mardu-space.webp';
  }

  return url;
};

const asSafeUrl = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  try {
    const parsed = new URL(value);

    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return value;
    }

    return undefined;
  } catch {
    return undefined;
  }
};

const mapCategory = (value: unknown): IntegrationCategoryDto | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const category = value as PayloadCategory;

  if (!category.id || !category.slug || !category.title) {
    return null;
  }

  return {
    id: toId(category.id),
    title: category.title,
    slug: category.slug,
    ...(category.description ? { description: category.description } : {}),
  };
};

const mapProtocol = (value: unknown): IntegrationProtocolDto | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const protocol = value as PayloadProtocol;

  if (!protocol.id || !protocol.slug || !protocol.title) {
    return null;
  }

  return {
    id: toId(protocol.id),
    title: protocol.title,
    slug: protocol.slug,
    badgeStyle: protocol.badgeStyle ?? 'neutral',
  };
};

const mapListItem = (doc: PayloadDoc): IntegrationListItemDto | null => {
  if (!doc.id || !doc.slug || !doc.title || !doc.shortDescription || !doc.availabilityStatus) {
    return null;
  }

  const categories = Array.isArray(doc.categories)
    ? doc.categories.map(mapCategory).filter((item): item is IntegrationCategoryDto => Boolean(item))
    : [];

  const protocols = Array.isArray(doc.protocols)
    ? doc.protocols.map(mapProtocol).filter((item): item is IntegrationProtocolDto => Boolean(item))
    : [];

  if (categories.length === 0 || protocols.length === 0) {
    return null;
  }

  const logo = toMedia(doc.logo);

  return {
    id: toId(doc.id),
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    status: doc.availabilityStatus,
    ...(doc.vendor ? { vendor: doc.vendor } : {}),
    featured: Boolean(doc.featured),
    sortOrder: Number.isFinite(doc.sortOrder) ? (doc.sortOrder as number) : 0,
    ...(logo?.url ? { logoUrl: normalizeMediaUrl(logo.url) } : {}),
    ...(logo?.alt ? { logoAlt: logo.alt } : {}),
    categories,
    protocols,
  };
};

const mapDetail = (doc: PayloadDoc): IntegrationDetailDto | null => {
  const listItem = mapListItem(doc);

  if (!listItem) {
    return null;
  }

  const heroImage = toMedia(doc.heroImage);
  const logo = toMedia(doc.logo);
  const meta = toMeta(doc.meta);
  const metaImage = toMedia(meta?.image);

  return {
    ...listItem,
    ...(heroImage?.url ? { heroImageUrl: normalizeMediaUrl(heroImage.url) } : {}),
    ...(heroImage?.alt ? { heroImageAlt: heroImage.alt } : {}),
    ...(doc.comingAt ? { comingAt: doc.comingAt } : {}),
    ...(asSafeUrl(doc.docsUrl) ? { docsUrl: asSafeUrl(doc.docsUrl) } : {}),
    ...(asSafeUrl(doc.requestUrl) ? { requestUrl: asSafeUrl(doc.requestUrl) } : {}),
    useCases: Array.isArray(doc.useCases)
      ? doc.useCases.map((item) => item.title?.trim() ?? '').filter(Boolean)
      : [],
    supportedActions: Array.isArray(doc.supportedActions)
      ? doc.supportedActions.map((item) => item.title?.trim() ?? '').filter(Boolean)
      : [],
    ...(doc.compatibilityNotes ? { compatibilityNotes: doc.compatibilityNotes } : {}),
    ...(meta?.title ? { seoTitle: meta.title } : {}),
    ...(meta?.description ? { seoDescription: meta.description } : {}),
    ...(meta?.url ? { canonicalUrl: meta.url } : {}),
    ...(metaImage?.url
      ? { ogImageUrl: normalizeMediaUrl(metaImage.url), ogImageAlt: metaImage.alt ?? listItem.title }
      : heroImage?.url
        ? {
            ogImageUrl: normalizeMediaUrl(heroImage.url),
            ogImageAlt: heroImage.alt ?? listItem.title,
          }
        : logo?.url
          ? {
              ogImageUrl: normalizeMediaUrl(logo.url),
              ogImageAlt: logo.alt ?? listItem.title,
            }
          : {}),
    content: doc.description,
  };
};

const normalizeQuery = (query: IntegrationListQueryDto) => {
  const q = query.q?.trim().toLowerCase() || '';
  const category = query.category?.trim().toLowerCase() || '';
  const protocol = query.protocol?.trim().toLowerCase() || '';
  const status = query.status;
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.max(1, Math.min(48, query.limit ?? DEFAULT_LIMIT));
  const sort = query.sort ?? 'featured';

  return { q, category, protocol, status, page, limit, sort };
};

const applySort = (items: IntegrationListItemDto[], sort: IntegrationSort): IntegrationListItemDto[] => {
  const copy = [...items];

  if (sort === 'alphabetical') {
    copy.sort((a, b) => a.title.localeCompare(b.title, 'de'));
    return copy;
  }

  if (sort === 'latest') {
    // latest is represented by sortOrder desc as editorial ordering fallback in v1
    copy.sort((a, b) => b.sortOrder - a.sortOrder || a.title.localeCompare(b.title, 'de'));
    return copy;
  }

  copy.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }

    return a.title.localeCompare(b.title, 'de');
  });

  return copy;
};

const getPublishedIntegrationDocs = async (): Promise<PayloadDoc[]> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'integrations',
      depth: 2,
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: '-updatedAt',
      limit: MAX_FETCH,
      pagination: false,
    });

    return result.docs as PayloadDoc[];
  } catch {
    return [];
  }
};

const getPublishedIntegrationList = async (): Promise<IntegrationListItemDto[]> => {
  const docs = await getPublishedIntegrationDocs();

  return docs.map(mapListItem).filter((item): item is IntegrationListItemDto => Boolean(item));
};

export const getIntegrationCategories = async (): Promise<IntegrationCategoryDto[]> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'integration-categories',
      limit: 200,
      pagination: false,
      sort: 'sortOrder',
    });

    return result.docs
      .map((item) => mapCategory(item))
      .filter((item): item is IntegrationCategoryDto => Boolean(item));
  } catch {
    return [];
  }
};

export const getIntegrationProtocols = async (): Promise<IntegrationProtocolDto[]> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'integration-protocols',
      limit: 200,
      pagination: false,
      sort: 'sortOrder',
    });

    return result.docs
      .map((item) => mapProtocol(item))
      .filter((item): item is IntegrationProtocolDto => Boolean(item));
  } catch {
    return [];
  }
};

export const getFeaturedIntegrations = async (limit = 8): Promise<IntegrationListItemDto[]> => {
  const all = await getPublishedIntegrationList();

  return applySort(all.filter((item) => item.featured), 'featured').slice(0, Math.max(1, limit));
};

export const getIntegrations = async (
  query: IntegrationListQueryDto,
): Promise<PaginatedIntegrationsDto> => {
  const normalized = normalizeQuery(query);
  const all = await getPublishedIntegrationList();

  const filtered = applySort(
    all.filter((item) => {
      const matchesSearch =
        normalized.q.length === 0 ||
        item.title.toLowerCase().includes(normalized.q) ||
        item.shortDescription.toLowerCase().includes(normalized.q) ||
        item.protocols.some((protocol) => protocol.title.toLowerCase().includes(normalized.q));

      const matchesCategory =
        normalized.category.length === 0 ||
        item.categories.some((category) => category.slug.toLowerCase() === normalized.category);

      const matchesProtocol =
        normalized.protocol.length === 0 ||
        item.protocols.some((protocol) => protocol.slug.toLowerCase() === normalized.protocol);

      const matchesStatus = !normalized.status || item.status === normalized.status;

      return matchesSearch && matchesCategory && matchesProtocol && matchesStatus;
    }),
    normalized.sort,
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / normalized.limit));
  const page = Math.min(normalized.page, totalPages);
  const start = (page - 1) * normalized.limit;

  return {
    items: filtered.slice(start, start + normalized.limit),
    page,
    limit: normalized.limit,
    total,
    totalPages,
    statusCounts: {
      available: all.filter((item) => item.status === 'available').length,
      beta: all.filter((item) => item.status === 'beta').length,
      planned: all.filter((item) => item.status === 'planned').length,
    },
  };
};

export const getIntegrationBySlug = async (slug: string): Promise<IntegrationDetailDto | null> => {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'integrations',
      depth: 2,
      where: {
        and: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            slug: {
              equals: slug,
            },
          },
        ],
      },
      limit: 1,
      pagination: false,
    });

    const doc = result.docs[0] as PayloadDoc | undefined;

    if (!doc) {
      return null;
    }

    return mapDetail(doc);
  } catch {
    return null;
  }
};

export const getRelatedIntegrations = async (
  integration: IntegrationDetailDto,
  limit = 3,
): Promise<IntegrationListItemDto[]> => {
  const all = await getPublishedIntegrationList();
  const categorySet = new Set(integration.categories.map((item) => item.slug));
  const protocolSet = new Set(integration.protocols.map((item) => item.slug));

  return applySort(
    all.filter((item) => {
      if (item.slug === integration.slug) {
        return false;
      }

      const categoryHit = item.categories.some((category) => categorySet.has(category.slug));
      const protocolHit = item.protocols.some((protocol) => protocolSet.has(protocol.slug));

      return categoryHit || protocolHit;
    }),
    'featured',
  ).slice(0, Math.max(1, limit));
};
