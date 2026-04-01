import type { BlogPostListItemDto } from "@mardu/content-core";
import Image from "next/image";
import Link from "next/link";

export interface BlogPostCardProps {
  post: BlogPostListItemDto;
  href?: string;
  buildHref?: (post: BlogPostListItemDto) => string;
}

export function BlogPostCard({ post, href, buildHref }: BlogPostCardProps) {
  const postHref = href ?? buildHref?.(post) ?? `/blog/${post.slug}`;

  return (
    <article className="border border-black/12 bg-white/40 p-3">
      <Link
        href={postHref}
        className="block overflow-hidden border border-black/8"
      >
        <Image
          src={post.coverImageUrl}
          alt={post.coverImageAlt}
          width={960}
          height={560}
          className="h-52 w-full object-cover transition-transform duration-300 hover:scale-102"
        />
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {post.categories.map((category) => (
          <span
            key={category.id}
            className="border border-black/20 px-1.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-foreground/60"
          >
            {category.title}
          </span>
        ))}
        <span className="ml-auto text-sm text-foreground/55">
          {new Date(post.publishedAt).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
      </div>

      <h3 className="mt-3 text-[1.95rem] leading-[1.03] tracking-[-0.02em] text-foreground">
        <Link href={postHref} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-sm text-foreground/72">
        {post.excerpt}
      </p>

      <p className="mt-6 text-sm text-foreground/70">By {post.author.name}</p>
    </article>
  );
}
