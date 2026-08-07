import type { BlogPostListItemDto } from "@mardu/content-core";
import { BlogPostCard } from "./blog-post-card";

export interface BlogGridProps {
  posts: BlogPostListItemDto[];
  emptyState?: React.ReactNode;
  buildPostHref?: (post: BlogPostListItemDto) => string;
}

export function BlogGrid({ posts, emptyState, buildPostHref }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="border-y border-black/15 py-16 text-center text-foreground/55">
        {emptyState ??
          "Keine Blogposts gefunden. Passe Suche oder Kategoriefilter an."}
      </div>
    );
  }

  return (
    <div className="grid border-l border-t border-black/15 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} buildHref={buildPostHref} />
      ))}
    </div>
  );
}
