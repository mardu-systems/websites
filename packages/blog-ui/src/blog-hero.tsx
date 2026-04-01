import type { BlogPostListItemDto } from "@mardu/content-core";
import { HeroHeadline } from "@mardu/ui/components/typography";
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
  featuredLabel = "Featured",
  buildPostHref,
}: BlogHeroProps) {
  const featuredHref = featuredPost
    ? (buildPostHref?.(featuredPost) ?? `/blog/${featuredPost.slug}`)
    : undefined;

  return (
    <section className="section-hairline pt-10 md:pt-16">
      <div className="mardu-container">
        <div className="grid gap-6 md:grid-cols-[1fr_1.3fr] md:items-end">
          <div className="space-y-4">
            {title ?? (
              <HeroHeadline
                prefix="Develop Ideas into"
                emphasis="Integrations"
                className="text-[clamp(2rem,4.2vw,4.25rem)]"
              />
            )}
            {intro ? (
              <div className="max-w-xl text-lg text-foreground/75">{intro}</div>
            ) : null}

            {featuredPost && featuredHref ? (
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-foreground/55">
                  {featuredLabel}
                </p>
                <h2 className="mt-2 text-2xl leading-tight tracking-[-0.02em] text-foreground">
                  <Link href={featuredHref} className="hover:underline">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-foreground/75">
                  {featuredPost.excerpt}
                </p>
              </div>
            ) : null}
          </div>

          {featuredPost && featuredHref ? (
            <Link
              href={featuredHref}
              className="group relative block min-h-72 overflow-hidden border border-black/10 bg-white/30"
            >
              <Image
                src={featuredPost.coverImageUrl}
                alt={featuredPost.coverImageAlt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-102"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-white/80">
                  {new Date(featuredPost.publishedAt).toLocaleDateString(
                    "de-DE",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    },
                  )}
                </p>
                <p className="mt-2 text-xl leading-tight tracking-[-0.02em]">
                  {featuredPost.title}
                </p>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
