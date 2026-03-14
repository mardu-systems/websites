import type { BlogPostListItemDto } from '@/types/api/blog';
import { BlogPostCard } from '@/components/blog/blog-post-card';

export function BlogGrid({ posts }: { posts: BlogPostListItemDto[] }) {
  if (posts.length === 0) {
    return (
      <div className="border border-dashed border-black/20 bg-white/50 p-10 text-center text-foreground/70">
        Keine Blogposts gefunden. Passe Suche oder Kategoriefilter an.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
