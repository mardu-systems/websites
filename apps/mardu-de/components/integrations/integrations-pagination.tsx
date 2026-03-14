import Link from 'next/link';

type Props = {
  page: number;
  totalPages: number;
  q: string;
  category: string;
  protocol: string;
  status: string;
  sort: string;
};

const hrefForPage = (page: number, params: Omit<Props, 'page' | 'totalPages'>) => {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set('q', params.q);
  if (params.category) searchParams.set('category', params.category);
  if (params.protocol) searchParams.set('protocol', params.protocol);
  if (params.status) searchParams.set('status', params.status);
  if (params.sort) searchParams.set('sort', params.sort);
  searchParams.set('page', String(page));

  return `/integrations?${searchParams.toString()}`;
};

export function IntegrationsPagination({ page, totalPages, q, category, protocol, status, sort }: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const baseParams = { q, category, protocol, status, sort };

  return (
    <nav className="mt-8 flex items-center justify-between border-t border-black/10 pt-4" aria-label="Pagination">
      <Link
        href={hrefForPage(Math.max(1, page - 1), baseParams)}
        aria-disabled={page <= 1}
        className={`text-sm ${page <= 1 ? 'pointer-events-none opacity-35' : 'underline underline-offset-4'}`}
      >
        Zurück
      </Link>
      <p className="text-sm text-foreground/65">
        Seite {page} von {totalPages}
      </p>
      <Link
        href={hrefForPage(Math.min(totalPages, page + 1), baseParams)}
        aria-disabled={page >= totalPages}
        className={`text-sm ${page >= totalPages ? 'pointer-events-none opacity-35' : 'underline underline-offset-4'}`}
      >
        Weiter
      </Link>
    </nav>
  );
}
