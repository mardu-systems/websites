import {
  getPlatformBlogCategories,
  getPlatformBlogPostBySlug,
  getPlatformBlogPosts,
  getPlatformFeaturedPost,
  type BlogListQueryDto,
} from '@mardu/content-core';
import { getPlatformOrigin } from '@mardu/site-config';

const site = 'mardu-de' as const;

export const getBlogCategories = async () => getPlatformBlogCategories(getPlatformOrigin());

export const getFeaturedPost = async () => getPlatformFeaturedPost(getPlatformOrigin(), site);

export const getBlogPosts = async (query: BlogListQueryDto) =>
  getPlatformBlogPosts(getPlatformOrigin(), site, query);

export const getBlogPostBySlug = async (slug: string) =>
  getPlatformBlogPostBySlug(getPlatformOrigin(), site, slug);
1