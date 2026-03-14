import config from '@/payload.config';
import type {
  BlogCategoryDto,
  BlogListQueryDto,
  BlogPostDetailDto,
  BlogPostListItemDto,
  PaginatedBlogPostsDto,
} from '@/types/api/blog';
import { getPayload } from 'payload';

const DEFAULT_LIMIT = 9;
const MAX_FETCH = 200;

type PayloadDoc = {
  id: string | number;
  title?: string;
  slug?: string;
  excerpt?: string;
  featured?: boolean;
  publishedAt?: string;
  meta?: unknown;
  content?: unknown;
  coverImage?: unknown;
  categories?: unknown;
  author?: unknown;
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

const toId = (value: string | number | undefined): string => {
  if (value === undefined) {
    return '';
  }

  return String(value);
};

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

const normalizeMediaUrl = (url: string | undefined): string => {
  if (!url) {
    return '/mardu-space.webp';
  }

  return url;
};

const mapCategory = (value: unknown): BlogCategoryDto | null => {
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
};

const mapAuthor = (value: unknown) => {
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
    ...(avatar?.url ? { avatarUrl: normalizeMediaUrl(avatar.url) } : {}),
    ...(avatar?.alt ? { avatarAlt: avatar.alt } : {}),
  };
};

const mapPost = (doc: PayloadDoc): BlogPostListItemDto | null => {
  if (!doc.id || !doc.slug || !doc.title || !doc.excerpt || !doc.publishedAt) {
    return null;
  }

  const coverImage = toMedia(doc.coverImage);
  const categories = Array.isArray(doc.categories)
    ? doc.categories
        .map(mapCategory)
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
    coverImageUrl: normalizeMediaUrl(coverImage.url),
    coverImageAlt: coverImage.alt || doc.title,
    publishedAt: doc.publishedAt,
    featured: !!doc.featured,
    categories,
    author: mapAuthor(doc.author),
  };
};

const normalizeQuery = (query: BlogListQueryDto) => {
  const q = query.q?.trim().toLowerCase() || '';
  const category = query.category?.trim().toLowerCase() || '';
  const limit = Math.max(1, Math.min(50, query.limit ?? DEFAULT_LIMIT));
  const page = Math.max(1, query.page ?? 1);

  return { q, category, page, limit };
};

const filterPosts = (posts: BlogPostListItemDto[], query: BlogListQueryDto): BlogPostListItemDto[] => {
  const normalized = normalizeQuery(query);

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
};

const getPublishedPosts = async (): Promise<BlogPostListItemDto[]> => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'blog-posts',
    depth: 2,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: MAX_FETCH,
    pagination: false,
  });

  return result.docs.map((doc) => mapPost(doc as PayloadDoc)).filter(Boolean) as BlogPostListItemDto[];
};

export const getBlogCategories = async (): Promise<BlogCategoryDto[]> => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'blog-categories',
    limit: 100,
    pagination: false,
    sort: 'title',
  });

  return result.docs.map((doc) => mapCategory(doc)).filter(Boolean) as BlogCategoryDto[];
};

export const getFeaturedPost = async (): Promise<BlogPostListItemDto | null> => {
  const posts = await getPublishedPosts();

  return posts.find((post) => post.featured) ?? posts[0] ?? null;
};

export const getBlogPosts = async (query: BlogListQueryDto): Promise<PaginatedBlogPostsDto> => {
  const normalized = normalizeQuery(query);
  const posts = filterPosts(await getPublishedPosts(), query);

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
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostDetailDto | null> => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'blog-posts',
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

  const base = mapPost(doc);
  const meta = toMeta(doc.meta);
  const ogImage = toMedia(meta?.image);

  if (!base) {
    return null;
  }

  return {
    ...base,
    ...(meta?.url ? { canonicalUrl: meta.url } : {}),
    ...(ogImage?.url ? { ogImageUrl: normalizeMediaUrl(ogImage.url) } : {}),
    ...(ogImage?.alt ? { ogImageAlt: ogImage.alt } : {}),
    ...(meta?.title ? { seoTitle: meta.title } : {}),
    ...(meta?.description ? { seoDescription: meta.description } : {}),
    content: doc.content,
  };
};
