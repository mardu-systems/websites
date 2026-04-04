export type VisibleSite = 'mardu-de' | 'mardu-space' | 'platform';

export type SiteVisibility = {
  sites?: VisibleSite[] | null;
};

export type LegalPageSlug = 'privacy' | 'publisher';

export type LegalPageDto = {
  slug: LegalPageSlug;
  title: string;
  pageKind: LegalPageSlug;
  contentMarkdown: string;
  summary?: string;
  updatedLabel?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
};

export type BlogListQueryDto = {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
};

export type BlogCategoryDto = {
  id: string;
  title: string;
  slug: string;
  description?: string;
};

export type BlogAuthorDto = {
  id: string;
  name: string;
  slug: string;
  role?: string;
  avatarUrl?: string;
  avatarAlt?: string;
};

export type BlogPostListItemDto = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  coverImageAlt: string;
  publishedAt: string;
  featured: boolean;
  categories: BlogCategoryDto[];
  author: BlogAuthorDto;
};

export type BlogPostDetailDto = BlogPostListItemDto & {
  canonicalUrl?: string;
  ogImageAlt?: string;
  ogImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  content: unknown;
};

export type PaginatedBlogPostsDto = {
  posts: BlogPostListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type IntegrationStatus = 'available' | 'beta' | 'planned';

export type CatalogAvailabilityStatus = 'available' | 'lead-time' | 'project';

/**
 * Render-ready category DTO for modular product catalog landing pages.
 * The owning app decides how products are loaded and routed.
 */
export type CatalogCategoryDto = {
  id: string;
  slug: string;
  name: string;
  eyebrow?: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  visualLabel?: string;
  featured?: boolean;
  productIds: string[];
};

/**
 * Shared technology DTO for badges, grids, and compatibility sections.
 */
export type CatalogTechnologyDto = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  visualLabel?: string;
};

/**
 * Shared credential / carrier DTO used on catalog overviews and product details.
 */
export type CatalogCarrierDto = {
  id: string;
  slug: string;
  name: string;
  description: string;
  technologyLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
  visualLabel?: string;
};

/**
 * Compact product DTO for grids, related products, and category highlights.
 */
export type CatalogProductListItemDto = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  tagline: string;
  summary: string;
  imageUrl?: string;
  imageAlt?: string;
  priceFromLabel?: string;
  availability: CatalogAvailabilityStatus;
  availabilityLabel: string;
  technologies: CatalogTechnologyDto[];
  featured?: boolean;
};

/**
 * Variant DTO for compare blocks and detail hero selectors.
 */
export type CatalogVariantDto = {
  id: string;
  label: string;
  summary: string;
  priceFromLabel?: string;
  availabilityLabel?: string;
  recommendation?: string;
  attributes: Array<{
    label: string;
    value: string;
  }>;
};

/**
 * Feature grouping for benefit and capability sections on product detail pages.
 */
export type CatalogFeatureGroupDto = {
  title: string;
  items: string[];
};

/**
 * Structured specification groups for technical detail sections.
 */
export type CatalogSpecGroupDto = {
  title: string;
  specs: Array<{
    label: string;
    value: string;
  }>;
};

/**
 * Related-product DTO. Reuses the list item shape and adds an optional relation label.
 */
export type CatalogRelatedProductDto = CatalogProductListItemDto & {
  relationLabel?: string;
};

/**
 * Structured context for product-related inquiry flows.
 * Apps may pass this through query params or other app-owned routing mechanisms.
 */
export type CatalogInquiryContextDto = {
  productId: string;
  productSlug: string;
  productName: string;
  category: string;
  variantId?: string;
  priceFrom?: string;
  sourcePage: string;
  technologyIds?: string[];
};

/**
 * Full product DTO for catalog detail pages.
 */
export type CatalogProductDetailDto = CatalogProductListItemDto & {
  seoTitle?: string;
  seoDescription?: string;
  heroDescription: string;
  overview: string;
  breadcrumbLabel?: string;
  technologiesHeading?: string;
  technologiesIntro?: string;
  carriersHeading?: string;
  carriersIntro?: string;
  variants: CatalogVariantDto[];
  technologies: CatalogTechnologyDto[];
  carriers: CatalogCarrierDto[];
  featureGroups: CatalogFeatureGroupDto[];
  specGroups: CatalogSpecGroupDto[];
  relatedProducts: CatalogRelatedProductDto[];
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  inquiryContext: CatalogInquiryContextDto;
};

export type PaginatedCatalogProductsDto = {
  items: CatalogProductListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type IntegrationSort = 'featured' | 'alphabetical' | 'latest';

export type IntegrationListQueryDto = {
  q?: string;
  category?: string;
  protocol?: string;
  status?: IntegrationStatus;
  page?: number;
  limit?: number;
  sort?: IntegrationSort;
};

export type IntegrationCategoryDto = {
  id: string;
  title: string;
  slug: string;
  description?: string;
};

export type IntegrationProtocolDto = {
  id: string;
  title: string;
  slug: string;
  badgeStyle: 'neutral' | 'success' | 'warn' | 'info';
};

export type IntegrationListItemDto = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  status: IntegrationStatus;
  vendor?: string;
  featured: boolean;
  sortOrder: number;
  logoUrl?: string;
  logoAlt?: string;
  categories: IntegrationCategoryDto[];
  protocols: IntegrationProtocolDto[];
};

export type IntegrationDetailDto = IntegrationListItemDto & {
  heroImageUrl?: string;
  heroImageAlt?: string;
  comingAt?: string;
  docsUrl?: string;
  requestUrl?: string;
  useCases: string[];
  supportedActions: string[];
  compatibilityNotes?: string;
  content: unknown;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  ogImageAlt?: string;
};

export type PaginatedIntegrationsDto = {
  items: IntegrationListItemDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  statusCounts: {
    available: number;
    beta: number;
    planned: number;
  };
};

export type ContentSitemapEntry = {
  slug: string;
  updatedAt?: string;
};

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
  };
};

type PayloadRestCollectionResult<T> = {
  docs?: T[];
};

type PayloadMedia = {
  url?: string;
  alt?: string;
};

type PayloadCategory = {
  id?: string | number;
  title?: string;
  slug?: string;
  description?: string;
};

type PayloadAuthor = {
  id?: string | number;
  name?: string;
  slug?: string;
  role?: string;
  avatar?: unknown;
};

type PayloadMeta = {
  description?: string;
  image?: unknown;
  title?: string;
  url?: string;
};

type PayloadBlogDoc = SiteVisibility & {
  id?: string | number;
  title?: string;
  slug?: string;
  excerpt?: string;
  featured?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  meta?: unknown;
  content?: unknown;
  coverImage?: unknown;
  categories?: unknown;
  author?: unknown;
};

type PayloadProtocol = {
  id?: string | number;
  title?: string;
  slug?: string;
  badgeStyle?: 'info' | 'neutral' | 'success' | 'warn';
};

type PayloadIntegrationDoc = SiteVisibility & {
  id?: string | number;
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

const DEFAULT_BLOG_LIMIT = 9;
const DEFAULT_INTEGRATION_LIMIT = 12;
const MAX_BLOG_FETCH = 200;
const MAX_INTEGRATION_FETCH = 400;
const DEFAULT_REVALIDATE_SECONDS = 60;

export const visibleSiteOptions = [
  { label: 'mardu.de', value: 'mardu-de' },
  { label: 'mardu.space', value: 'mardu-space' },
  { label: 'platform.mardu.de', value: 'platform' },
] satisfies Array<{ label: string; value: VisibleSite }>;

export function isVisibleOnSite(visibility: SiteVisibility, site: VisibleSite) {
  if (!Array.isArray(visibility.sites) || visibility.sites.length === 0) {
    return true;
  }

  return visibility.sites.includes(site);
}

export function buildSiteVisibilityField(defaultSites: VisibleSite[] = ['mardu-de', 'mardu-space']) {
  return {
    name: 'sites',
    type: 'select' as const,
    hasMany: true,
    required: true,
    defaultValue: defaultSites,
    options: [...visibleSiteOptions],
    admin: {
      description: 'Steuert auf welchen Frontends dieser Inhalt sichtbar ist.',
    },
  };
}

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

function toId(value: string | number | undefined): string {
  if (value === undefined) {
    return '';
  }

  return String(value);
}

function toMedia(value: unknown): PayloadMedia | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as PayloadMedia;
}

function toMeta(value: unknown): PayloadMeta | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  return value as PayloadMeta;
}

function normalizeMediaUrl(url: string | undefined, origin: string): string {
  if (!url) {
    return '/mardu-space.webp';
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return new URL(url, origin).toString();
}

function mapBlogCategory(value: unknown): BlogCategoryDto | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const category = value as PayloadCategory;

  if (!category.id || !category.title || !category.slug) {
    return null;
  }

  return {
    id: toId(category.id),
    title: category.title,
    slug: category.slug,
    ...(category.description ? { description: category.description } : {}),
  };
}

function mapBlogAuthor(value: unknown, origin: string): BlogAuthorDto {
  if (!value || typeof value !== 'object') {
    return {
      id: 'unknown',
      name: 'Unbekannt',
      slug: 'unbekannt',
    };
  }

  const author = value as PayloadAuthor;
  const avatar = toMedia(author.avatar);

  return {
    id: toId(author.id ?? 'unknown'),
    name: author.name ?? 'Unbekannt',
    slug: author.slug ?? 'unbekannt',
    ...(author.role ? { role: author.role } : {}),
    ...(avatar?.url ? { avatarUrl: normalizeMediaUrl(avatar.url, origin) } : {}),
    ...(avatar?.alt ? { avatarAlt: avatar.alt } : {}),
  };
}

function mapBlogPost(doc: PayloadBlogDoc, origin: string): BlogPostListItemDto | null {
  if (!doc.id || !doc.slug || !doc.title || !doc.excerpt || !doc.publishedAt) {
    return null;
  }

  const coverImage = toMedia(doc.coverImage);
  const categories = Array.isArray(doc.categories)
    ? doc.categories
        .map(mapBlogCategory)
        .filter((item): item is BlogCategoryDto => item !== null)
    : [];

  if (!coverImage?.url || categories.length === 0) {
    return null;
  }

  return {
    id: toId(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    coverImageUrl: normalizeMediaUrl(coverImage.url, origin),
    coverImageAlt: coverImage.alt || doc.title,
    publishedAt: doc.publishedAt,
    featured: !!doc.featured,
    categories,
    author: mapBlogAuthor(doc.author, origin),
  };
}

function normalizeBlogQuery(query: BlogListQueryDto) {
  const q = query.q?.trim().toLowerCase() || '';
  const category = query.category?.trim().toLowerCase() || '';
  const limit = Math.max(1, Math.min(50, query.limit ?? DEFAULT_BLOG_LIMIT));
  const page = Math.max(1, query.page ?? 1);

  return { q, category, page, limit };
}

function filterBlogPosts(posts: BlogPostListItemDto[], query: BlogListQueryDto) {
  const normalized = normalizeBlogQuery(query);

  return posts.filter((post) => {
    const matchesQuery =
      normalized.q.length === 0 ||
      post.title.toLowerCase().includes(normalized.q) ||
      post.excerpt.toLowerCase().includes(normalized.q);

    const matchesCategory =
      normalized.category.length === 0 ||
      post.categories.some((item) => item.slug.toLowerCase() === normalized.category);

    return matchesQuery && matchesCategory;
  });
}

async function fetchPublishedBlogDocs(origin: string, site: VisibleSite): Promise<PayloadBlogDoc[]> {
  const url = buildRestUrl(origin, '/api/blog-posts', {
    depth: '2',
    limit: String(MAX_BLOG_FETCH),
    pagination: 'false',
    sort: '-publishedAt',
    'where[_status][equals]': 'published',
  });
  const result = await fetchJson<PayloadRestCollectionResult<PayloadBlogDoc>>(url);

  return (result?.docs ?? []).filter((doc) => isVisibleOnSite(doc, site));
}

export async function getPlatformBlogCategories(origin: string): Promise<BlogCategoryDto[]> {
  const url = buildRestUrl(origin, '/api/blog-categories', {
    limit: '100',
    pagination: 'false',
    sort: 'title',
  });
  const result = await fetchJson<PayloadRestCollectionResult<PayloadCategory>>(url);

  return (result?.docs ?? [])
    .map((doc) => mapBlogCategory(doc))
    .filter((item): item is BlogCategoryDto => item !== null);
}

export async function getPlatformFeaturedPost(
  origin: string,
  site: VisibleSite,
): Promise<BlogPostListItemDto | null> {
  const posts = (await fetchPublishedBlogDocs(origin, site))
    .map((doc) => mapBlogPost(doc, origin))
    .filter((item): item is BlogPostListItemDto => item !== null);

  return posts.find((post) => post.featured) ?? posts[0] ?? null;
}

export async function getPlatformBlogPosts(
  origin: string,
  site: VisibleSite,
  query: BlogListQueryDto,
): Promise<PaginatedBlogPostsDto> {
  const normalized = normalizeBlogQuery(query);
  const posts = filterBlogPosts(
    (await fetchPublishedBlogDocs(origin, site))
      .map((doc) => mapBlogPost(doc, origin))
      .filter((item): item is BlogPostListItemDto => item !== null),
    query,
  );

  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / normalized.limit));
  const page = Math.min(normalized.page, totalPages);
  const start = (page - 1) * normalized.limit;

  return {
    posts: posts.slice(start, start + normalized.limit),
    page,
    limit: normalized.limit,
    total,
    totalPages,
  };
}

export async function getPlatformBlogPostBySlug(
  origin: string,
  site: VisibleSite,
  slug: string,
): Promise<BlogPostDetailDto | null> {
  const doc = (await fetchPublishedBlogDocs(origin, site)).find((item) => item.slug === slug);

  if (!doc) {
    return null;
  }

  const base = mapBlogPost(doc, origin);
  const meta = toMeta(doc.meta);
  const ogImage = toMedia(meta?.image);

  if (!base) {
    return null;
  }

  return {
    ...base,
    ...(meta?.url ? { canonicalUrl: meta.url } : {}),
    ...(ogImage?.url ? { ogImageUrl: normalizeMediaUrl(ogImage.url, origin) } : {}),
    ...(ogImage?.alt ? { ogImageAlt: ogImage.alt } : {}),
    ...(meta?.title ? { seoTitle: meta.title } : {}),
    ...(meta?.description ? { seoDescription: meta.description } : {}),
    content: doc.content,
  };
}

function mapIntegrationCategory(value: unknown): IntegrationCategoryDto | null {
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
}

function mapIntegrationProtocol(value: unknown): IntegrationProtocolDto | null {
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
}

function mapIntegrationListItem(
  doc: PayloadIntegrationDoc,
  origin: string,
): IntegrationListItemDto | null {
  if (!doc.id || !doc.slug || !doc.title || !doc.shortDescription || !doc.availabilityStatus) {
    return null;
  }

  const categories = Array.isArray(doc.categories)
    ? doc.categories
        .map(mapIntegrationCategory)
        .filter((item): item is IntegrationCategoryDto => Boolean(item))
    : [];
  const protocols = Array.isArray(doc.protocols)
    ? doc.protocols
        .map(mapIntegrationProtocol)
        .filter((item): item is IntegrationProtocolDto => Boolean(item))
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
    sortOrder: Number.isFinite(doc.sortOrder) ? Number(doc.sortOrder) : 0,
    ...(logo?.url ? { logoUrl: normalizeMediaUrl(logo.url, origin) } : {}),
    ...(logo?.alt ? { logoAlt: logo.alt } : {}),
    categories,
    protocols,
  };
}

function asSafeUrl(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const parsed = new URL(value);

    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return value;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function mapIntegrationDetail(doc: PayloadIntegrationDoc, origin: string): IntegrationDetailDto | null {
  const listItem = mapIntegrationListItem(doc, origin);

  if (!listItem) {
    return null;
  }

  const heroImage = toMedia(doc.heroImage);
  const logo = toMedia(doc.logo);
  const meta = toMeta(doc.meta);
  const metaImage = toMedia(meta?.image);

  return {
    ...listItem,
    ...(heroImage?.url ? { heroImageUrl: normalizeMediaUrl(heroImage.url, origin) } : {}),
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
      ? { ogImageUrl: normalizeMediaUrl(metaImage.url, origin), ogImageAlt: metaImage.alt ?? listItem.title }
      : heroImage?.url
        ? {
            ogImageUrl: normalizeMediaUrl(heroImage.url, origin),
            ogImageAlt: heroImage.alt ?? listItem.title,
          }
        : logo?.url
          ? {
              ogImageUrl: normalizeMediaUrl(logo.url, origin),
              ogImageAlt: logo.alt ?? listItem.title,
            }
          : {}),
    content: doc.description,
  };
}

function normalizeIntegrationQuery(query: IntegrationListQueryDto) {
  const q = query.q?.trim().toLowerCase() || '';
  const category = query.category?.trim().toLowerCase() || '';
  const protocol = query.protocol?.trim().toLowerCase() || '';
  const limit = Math.max(1, Math.min(50, query.limit ?? DEFAULT_INTEGRATION_LIMIT));
  const page = Math.max(1, query.page ?? 1);
  const sort = query.sort ?? 'featured';

  return { q, category, protocol, status: query.status, limit, page, sort };
}

function applyIntegrationSort(items: IntegrationListItemDto[], sort: IntegrationSort) {
  const copy = [...items];

  copy.sort((a, b) => {
    if (sort === 'latest') {
      return a.title.localeCompare(b.title, 'de');
    }

    if (sort === 'alphabetical') {
      return a.title.localeCompare(b.title, 'de');
    }

    if (Number(a.featured) !== Number(b.featured)) {
      return Number(b.featured) - Number(a.featured);
    }

    if (a.sortOrder !== b.sortOrder) {
      return a.sortOrder - b.sortOrder;
    }

    return a.title.localeCompare(b.title, 'de');
  });

  return copy;
}

async function fetchPublishedIntegrationDocs(
  origin: string,
  site: VisibleSite,
): Promise<PayloadIntegrationDoc[]> {
  const url = buildRestUrl(origin, '/api/integrations', {
    depth: '2',
    limit: String(MAX_INTEGRATION_FETCH),
    pagination: 'false',
    sort: '-updatedAt',
    'where[_status][equals]': 'published',
  });
  const result = await fetchJson<PayloadRestCollectionResult<PayloadIntegrationDoc>>(url);

  return (result?.docs ?? []).filter((doc) => isVisibleOnSite(doc, site));
}

async function getPublishedIntegrationList(
  origin: string,
  site: VisibleSite,
): Promise<IntegrationListItemDto[]> {
  return (await fetchPublishedIntegrationDocs(origin, site))
    .map((doc) => mapIntegrationListItem(doc, origin))
    .filter((item): item is IntegrationListItemDto => Boolean(item));
}

export async function getPlatformIntegrationCategories(
  origin: string,
): Promise<IntegrationCategoryDto[]> {
  const url = buildRestUrl(origin, '/api/integration-categories', {
    limit: '200',
    pagination: 'false',
    sort: 'sortOrder',
  });
  const result = await fetchJson<PayloadRestCollectionResult<PayloadCategory>>(url);

  return (result?.docs ?? [])
    .map((doc) => mapIntegrationCategory(doc))
    .filter((item): item is IntegrationCategoryDto => Boolean(item));
}

export async function getPlatformIntegrationProtocols(
  origin: string,
): Promise<IntegrationProtocolDto[]> {
  const url = buildRestUrl(origin, '/api/integration-protocols', {
    limit: '200',
    pagination: 'false',
    sort: 'sortOrder',
  });
  const result = await fetchJson<PayloadRestCollectionResult<PayloadProtocol>>(url);

  return (result?.docs ?? [])
    .map((doc) => mapIntegrationProtocol(doc))
    .filter((item): item is IntegrationProtocolDto => Boolean(item));
}

export async function getPlatformFeaturedIntegrations(
  origin: string,
  site: VisibleSite,
  limit = 8,
): Promise<IntegrationListItemDto[]> {
  const all = await getPublishedIntegrationList(origin, site);

  return applyIntegrationSort(
    all.filter((item) => item.featured),
    'featured',
  ).slice(0, Math.max(1, limit));
}

export async function getPlatformIntegrations(
  origin: string,
  site: VisibleSite,
  query: IntegrationListQueryDto,
): Promise<PaginatedIntegrationsDto> {
  const normalized = normalizeIntegrationQuery(query);
  const all = await getPublishedIntegrationList(origin, site);

  const filtered = applyIntegrationSort(
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
}

export async function getPlatformIntegrationBySlug(
  origin: string,
  site: VisibleSite,
  slug: string,
): Promise<IntegrationDetailDto | null> {
  const doc = (await fetchPublishedIntegrationDocs(origin, site)).find((item) => item.slug === slug);

  if (!doc) {
    return null;
  }

  return mapIntegrationDetail(doc, origin);
}

export async function getPlatformRelatedIntegrations(
  origin: string,
  site: VisibleSite,
  integration: IntegrationDetailDto,
  limit = 3,
): Promise<IntegrationListItemDto[]> {
  const all = await getPublishedIntegrationList(origin, site);
  const categorySet = new Set(integration.categories.map((item) => item.slug));
  const protocolSet = new Set(integration.protocols.map((item) => item.slug));

  return applyIntegrationSort(
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
}

export async function getPlatformContentSitemapEntries(
  origin: string,
  site: VisibleSite,
): Promise<{
  blog: ContentSitemapEntry[];
  integrations: ContentSitemapEntry[];
}> {
  const [blogDocs, integrationDocs] = await Promise.all([
    fetchPublishedBlogDocs(origin, site),
    fetchPublishedIntegrationDocs(origin, site),
  ]);

  return {
    blog: blogDocs.flatMap((doc) => {
      if (typeof doc.slug !== 'string') {
        return [];
      }

      return [
        {
          slug: doc.slug,
          updatedAt: doc.updatedAt,
        },
      ];
    }),
    integrations: integrationDocs.flatMap((doc) => {
      if (typeof doc.slug !== 'string') {
        return [];
      }

      return [
        {
          slug: doc.slug,
          updatedAt: typeof doc.updatedAt === 'string' ? doc.updatedAt : undefined,
        },
      ];
    }),
  };
}
