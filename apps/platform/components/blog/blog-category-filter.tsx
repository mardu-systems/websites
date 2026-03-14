import type { BlogCategoryDto } from '@/types/api/blog';
import Link from 'next/link';

type BlogCategoryFilterProps = {
  categories: BlogCategoryDto[];
  activeCategory?: string;
  query?: string;
};

const buildUrl = (category: string, query: string): string => {
  const params = new URLSearchParams();

  if (query) {
    params.set('q', query);
  }

  if (category) {
    params.set('category', category);
  }

  const search = params.toString();

  return search ? `/blog?${search}` : '/blog';
};

export function BlogCategoryFilter({
  categories,
  activeCategory = '',
  query = '',
}: BlogCategoryFilterProps) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2.5 md:mt-8">
      <Link
        href={buildUrl('', query)}
        className={[
          'inline-flex h-9 items-center border px-3 text-sm transition-colors',
          activeCategory.length === 0
            ? 'border-foreground bg-foreground text-background'
            : 'border-border bg-card text-foreground/75 hover:text-foreground',
        ].join(' ')}
      >
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={buildUrl(category.slug, query)}
          className={[
            'inline-flex h-9 items-center border px-3 text-sm transition-colors',
            activeCategory === category.slug
              ? 'border-foreground bg-foreground text-background'
              : 'border-border bg-card text-foreground/75 hover:text-foreground',
          ].join(' ')}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
}
