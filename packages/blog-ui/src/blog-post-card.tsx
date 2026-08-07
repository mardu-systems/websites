import type { BlogPostListItemDto } from "@mardu/content-core";
import { ArrowUpRight } from "lucide-react";
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
    <article className="group flex h-full flex-col border-r border-b border-black/15 p-5 md:p-6">
      <Link href={postHref} className="block overflow-hidden bg-black/5">
        <Image
          src={post.coverImageUrl}
          alt={post.coverImageAlt}
          width={960}
          height={560}
          className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
        />
      </Link>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground/50">
        <span className="text-mardu-purple">
          [
          {post.categories.map((category) => category.title).join(" · ") ||
            "Mardu"}
          ]
        </span>
        <span>
          {new Date(post.publishedAt).toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </span>
      </div>

      <h3 className="mt-5 text-[clamp(1.5rem,2vw,1.95rem)] font-normal leading-[1.08] tracking-[-0.03em] text-foreground">
        <Link href={postHref} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-foreground/68">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <p className="text-sm text-foreground/60">Von {post.author.name}</p>
        <Link
          href={postHref}
          aria-label={`${post.title} lesen`}
          className="flex size-11 shrink-0 items-center justify-center border border-black/20 transition-colors group-hover:bg-foreground group-hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mardu-purple focus-visible:ring-offset-2"
        >
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:rotate-45 motion-reduce:transition-none" />
        </Link>
      </div>
    </article>
  );
}
