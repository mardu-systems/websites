import { BlogCategoryFilter, BlogGrid, BlogHero, BlogPagination, BlogSearch } from '@mardu/blog-ui';
import { isBlogEnabled } from '@mardu/site-config';
import { Overline } from '@mardu/ui/components/typography';
import { getBlogCategories, getBlogPosts, getFeaturedPost } from '@/lib/blog';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Fachbeiträge rund um Zugangssysteme, Engineering und AI-Workflows.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Mardu',
    description: 'Fachbeiträge rund um Zugangssysteme, Engineering und AI-Workflows.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Mardu',
    description: 'Fachbeiträge rund um Zugangssysteme, Engineering und AI-Workflows.',
  },
};

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
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-16 md:pb-24">
      <BlogHero featuredPost={featuredPost} />

      <section className="section-hairline mt-10 py-10 md:mt-14 md:py-14">
        <div className="mardu-container">
          <Overline>Knowledge Base</Overline>
          <h1 className="mt-2 text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
            Blog
          </h1>

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
