import { BlogCategoryFilter, BlogGrid, BlogHero, BlogPagination, BlogSearch } from '@mardu/blog-ui';
import { isBlogEnabled } from '@mardu/site-config/feature-flags.server';
import { getBlogCategories, getBlogPosts, getFeaturedPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { createPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = createPageMetadata({
  title: 'Blog',
  description: 'Fachbeiträge rund um Zugangssysteme, Engineering und AI-Workflows.',
  path: '/blog',
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const asString = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return value || '';
};

const asPositiveNumber = (value: string | string[] | undefined): number | undefined => {
  const parsed = Number(asString(value));

  if (!Number.isFinite(parsed) || parsed < 1) {
    return undefined;
  }

  return Math.floor(parsed);
};

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  if (!(await isBlogEnabled('mardu-de'))) {
    notFound();
  }

  const resolvedSearchParams = (await searchParams) ?? {};

  const q = asString(resolvedSearchParams.q).trim();
  const category = asString(resolvedSearchParams.category).trim();
  const page = asPositiveNumber(resolvedSearchParams.page);

  const [featuredPost, categories, blogResult] = await Promise.all([
    getFeaturedPost(),
    getBlogCategories(),
    getBlogPosts({ q, category, page }),
  ]);

  return (
    <main className="min-h-screen bg-background pb-16 text-foreground md:pb-24">
      <BlogHero featuredPost={featuredPost} />

      <section className="py-14 md:py-20">
        <div className="mardu-container">
          <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">
            [02 / ALLE BEITRÄGE]
          </p>

          <BlogSearch query={q} category={category} />
          <BlogCategoryFilter categories={categories} activeCategory={category} query={q} />

          <div className="mt-8 md:mt-10">
            <BlogGrid posts={blogResult.posts} />
            <BlogPagination
              page={blogResult.page}
              totalPages={blogResult.totalPages}
              q={q}
              category={category}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
