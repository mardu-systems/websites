import { BlogCategoryFilter, BlogGrid, BlogHero, BlogPagination, BlogSearch } from '@mardu/blog-ui';
import { isBlogEnabled } from '@mardu/site-config/feature-flags.server';
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
    <main className="min-h-screen bg-background pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-16 text-foreground md:pb-24">
      <BlogHero featuredPost={featuredPost} />

      <section className="py-14 md:py-20">
        <div className="mardu-container">
          <div className="grid gap-6 md:grid-cols-[0.42fr_1fr] md:items-end">
            <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">
              [02 / ALLE BEITRÄGE]
            </p>
            <h2 className="max-w-3xl text-[clamp(2.25rem,4vw,3.75rem)] font-light leading-[0.97] tracking-[-0.04em]">
              Perspektiven auf Zutritt,
              <em className="block font-serif font-normal italic tracking-[-0.025em] text-mardu-purple">
                Systeme und Betrieb.
              </em>
            </h2>
          </div>

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
