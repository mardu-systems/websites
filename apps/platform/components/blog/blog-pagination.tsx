import Link from 'next/link';

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  q?: string;
  category?: string;
};

const buildPageUrl = ({
  page,
  q,
  category,
}: {
  page: number;
  q?: string;
  category?: string;
}): string => {
  const params = new URLSearchParams();

  if (q) {
    params.set('q', q);
  }

  if (category) {
    params.set('category', category);
  }

  if (page > 1) {
    params.set('page', String(page));
  }

  const query = params.toString();

  return query ? `/blog?${query}` : '/blog';
};

export function BlogPagination({ page, totalPages, q, category }: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={buildPageUrl({ page: Math.max(1, page - 1), q, category })}
        aria-disabled={page === 1}
        className={[
          'inline-flex h-10 items-center border px-4 text-sm',
          page === 1
            ? 'pointer-events-none border-border text-foreground/35'
            : 'border-border text-foreground/80 hover:text-foreground',
        ].join(' ')}
      >
        Zurück
      </Link>

      <span className="px-2 text-sm text-foreground/70">
        Seite {page} von {totalPages}
      </span>

      <Link
        href={buildPageUrl({ page: Math.min(totalPages, page + 1), q, category })}
        aria-disabled={page === totalPages}
        className={[
          'inline-flex h-10 items-center border px-4 text-sm',
          page === totalPages
            ? 'pointer-events-none border-border text-foreground/35'
            : 'border-border text-foreground/80 hover:text-foreground',
        ].join(' ')}
      >
        Weiter
      </Link>
    </nav>
  );
}
