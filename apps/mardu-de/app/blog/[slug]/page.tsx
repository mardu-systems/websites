import { BlogHeadingAnchors, BlogRichText } from '@mardu/blog-ui';
import { isBlogEnabled } from '@mardu/site-config/feature-flags.server';
import { getBlogPostBySlug } from '@/lib/blog';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type Params = Promise<{ slug: string }>;

export const revalidate = 60;

type TocFlatItem = {
  id: string;
  title: string;
  level: 1 | 2 | 3;
};

type TocNode = {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  children: TocNode[];
};

type LexicalNode = {
  type?: string;
  text?: string;
  tag?: string;
  children?: LexicalNode[];
};

const extractText = (node: LexicalNode): string => {
  const directText = typeof node.text === 'string' ? node.text : '';
  const childText = Array.isArray(node.children) ? node.children.map(extractText).join('') : '';

  return `${directText}${childText}`.trim();
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const extractToc = (content: unknown): TocFlatItem[] => {
  if (!content || typeof content !== 'object') {
    return [];
  }

  const root = content as { root?: { children?: LexicalNode[] } };
  const nodes = root.root?.children;

  if (!Array.isArray(nodes)) {
    return [];
  }

  const seen = new Set<string>();

  const items: TocFlatItem[] = [];

  for (const node of nodes) {
    if (node.type !== 'heading' || (node.tag !== 'h1' && node.tag !== 'h2' && node.tag !== 'h3')) {
      continue;
    }

    const title = extractText(node);

    if (!title) {
      continue;
    }

    const base = slugify(title) || 'section';
    let slug = base;
    let i = 2;

    while (seen.has(slug)) {
      slug = `${base}-${i}`;
      i += 1;
    }

    seen.add(slug);
    items.push({
      id: slug,
      title,
      level: Number(node.tag.slice(1)) as 1 | 2 | 3,
    });
  }

  return items;
};

const buildNestedToc = (items: TocFlatItem[]): TocNode[] => {
  const roots: TocNode[] = [];
  const stack: TocNode[] = [];

  for (const item of items) {
    const node: TocNode = {
      ...item,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      roots.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  return roots;
};

const renderTocItems = (items: TocNode[], depth = 0): React.ReactNode => {
  const listClass =
    depth === 0
      ? 'mt-4 space-y-3 text-sm text-foreground/68'
      : 'mt-2 space-y-2 border-l border-black/15 pl-3 text-[0.82rem] text-foreground/55';

  return (
    <ul className={listClass}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="transition-colors hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mardu-purple focus-visible:ring-offset-2"
          >
            {item.title}
          </a>
          {item.children.length > 0 ? renderTocItems(item.children, depth + 1) : null}
        </li>
      ))}
    </ul>
  );
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  if (!(await isBlogEnabled('mardu-de'))) {
    return {
      title: 'Beitrag nicht gefunden',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Beitrag nicht gefunden',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.seoTitle || `${post.title} | Mardu`;
  const description = post.seoDescription || post.excerpt;
  const canonical = post.canonicalUrl || `/blog/${post.slug}`;
  const socialImageUrl = post.ogImageUrl || post.coverImageUrl;
  const socialImageAlt = post.ogImageAlt || post.coverImageAlt;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      images: [
        {
          url: socialImageUrl,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Params }) {
  if (!(await isBlogEnabled('mardu-de'))) {
    notFound();
  }

  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = extractToc(post.content);
  const nestedToc = buildNestedToc(toc);

  return (
    <main className="min-h-screen bg-background pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-16 text-foreground md:pb-24">
      <section className="section-hairline border-b border-black/15 py-10 md:py-16">
        <div className="mardu-container">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground/55 transition-colors hover:text-mardu-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mardu-purple focus-visible:ring-offset-2"
          >
            <ArrowLeft className="size-4" />
            [Zurück zum Blog]
          </Link>

          <header className="mt-8 grid gap-8 border-t border-black/15 pt-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
            <div className="space-y-6">
              <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">
                [01 / FACHBEITRAG]
              </p>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground/55">
                <p>Von {post.author.name}</p>
                <p className="mt-2">
                  {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mardu-purple">
                [{post.categories.map((category) => category.title).join(' · ') || 'Mardu'}]
              </p>
            </div>

            <div>
              <h1 className="headline-balance max-w-4xl text-[clamp(2.5rem,4.5vw,4rem)] font-light leading-[0.96] tracking-[-0.045em] text-foreground">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/68 md:text-xl">
                {post.excerpt}
              </p>
            </div>
          </header>

          <div className="mt-10 overflow-hidden border-y border-black/15 py-4 md:mt-14 md:py-6">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              width={1440}
              height={840}
              className="aspect-[16/8.5] h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {nestedToc.length > 0 ? (
                <div className="border-t border-black/15 pt-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mardu-purple">
                    [02 / INHALT]
                  </p>
                  {renderTocItems(nestedToc)}
                </div>
              ) : null}
            </aside>

            <article className="min-w-0">
              <div id="blog-article-content" className="border-t border-black/15 pt-8">
                <BlogHeadingAnchors containerId="blog-article-content" headings={toc} />
                <BlogRichText content={post.content} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
