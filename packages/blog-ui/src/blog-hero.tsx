import type { BlogPostListItemDto } from "@mardu/content-core";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface BlogHeroProps {
  featuredPost: BlogPostListItemDto | null;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  featuredLabel?: string;
  buildPostHref?: (post: BlogPostListItemDto) => string;
}

export function BlogHero({
  featuredPost,
  title,
  intro,
  featuredLabel = "Ausgewählter Beitrag",
  buildPostHref,
}: BlogHeroProps) {
  const featuredHref = featuredPost
    ? (buildPostHref?.(featuredPost) ?? `/blog/${featuredPost.slug}`)
    : undefined;

  return (
    <section className="section-hairline border-b border-black/15 py-12 md:py-20">
      <div className="mardu-container">
        <div
          className={[
            "grid gap-8 lg:items-end",
            featuredPost && featuredHref
              ? "lg:grid-cols-[0.72fr_1.28fr]"
              : "max-w-5xl",
          ].join(" ")}
        >
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-mardu-purple">
              [01 / BLOG]
            </p>
            {title ?? (
              <h1 className="mt-5 max-w-3xl text-[clamp(2.75rem,4.5vw,4rem)] font-light leading-[0.96] tracking-[-0.045em] text-foreground">
                Wissen, das im Betrieb
                <em className="block font-serif font-normal italic tracking-[-0.025em] text-mardu-purple">
                  weiterhilft.
                </em>
              </h1>
            )}
            {intro ? (
              <div className="mt-5 max-w-xl text-lg text-foreground/70">
                {intro}
              </div>
            ) : null}
          </div>

          {featuredPost && featuredHref ? (
            <article className="border-t border-black/15 pt-5 lg:border-t-0 lg:border-l lg:pl-8">
              <div className="flex items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-foreground/55">
                <span>[{featuredLabel}]</span>
                <span>
                  {new Date(featuredPost.publishedAt).toLocaleDateString(
                    "de-DE",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>

              <Link href={featuredHref} className="group mt-5 block">
                <div className="relative aspect-[16/9] overflow-hidden bg-black/5">
                  <Image
                    src={featuredPost.coverImageUrl}
                    alt={featuredPost.coverImageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                  />
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <h2 className="max-w-3xl text-[clamp(1.65rem,2.5vw,2.6rem)] font-normal leading-[1.02] tracking-[-0.03em] text-foreground">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/68">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  <span className="flex size-11 items-center justify-center border border-black/20 transition-colors group-hover:bg-foreground group-hover:text-background">
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:rotate-45 motion-reduce:transition-none" />
                  </span>
                </div>
              </Link>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}
