import { BlogHeadingAnchors, BlogRichText } from '@mardu/blog-ui';
import { isBlogEnabled } from '@mardu/site-config';
import { getBlogPostBySlug } from '@/lib/blog';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
      ? 'mt-3 space-y-2.5 text-sm text-foreground/68'
      : 'mt-2 space-y-1.5 border-l border-black/10 pl-3 text-[0.86rem] text-foreground/56';

  return (
    <ul className={listClass}>
      {items.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} className="transition-colors hover:text-foreground">
            {item.title}
          </a>
          {item.children.length > 0 ? renderTocItems(item.children, depth + 1) : null}
        </li>
      ))}
    </ul>
  );
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  if (!isBlogEnabled('mardu-de')) {
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
  if (!isBlogEnabled('mardu-de')) {
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
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-16 md:pb-24">
      <section className="section-hairline py-8 md:py-12">
        <div className="mardu-container">
          <Link href="/blog" className="text-sm text-foreground/65 underline underline-offset-2">
            Zurück zum Blog
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <div className="border border-black/10 bg-white/65 p-5">
                <p className="text-[1.1rem] font-medium text-foreground">{post.author.name}</p>
                <p className="mt-1 text-foreground/65">
                  {new Date(post.publishedAt).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category.id}
                      className="border border-black/15 px-2 py-1 text-xs uppercase tracking-[0.12em] text-foreground/70"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>

              {nestedToc.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/45">
                    Inhalt
                  </p>
                  {renderTocItems(nestedToc)}
                </div>
              ) : null}
            </aside>

            <article>
              <header className="relative overflow-hidden border border-black/8 bg-gradient-to-r from-white via-white to-[color:var(--paper)] p-6 md:p-8">
                <h1 className="headline-balance max-w-5xl font-serif text-[clamp(2.2rem,5vw,5.4rem)] leading-[0.94] tracking-[-0.03em] text-foreground">
                  {post.title}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/72">
                  {post.excerpt}
                </p>
              </header>

              <div className="mt-6 overflow-hidden border border-black/10 bg-white/40">
                <Image
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt}
                  width={1440}
                  height={840}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>

              <div id="blog-article-content" className="mt-8 border-t border-black/10 pt-8">
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
