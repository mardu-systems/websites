import Link from "next/link";

export interface BlogPaginationProps {
  page: number;
  totalPages: number;
  q?: string;
  category?: string;
  basePath?: string;
  buildHref?: (params: {
    page: number;
    q?: string;
    category?: string;
  }) => string;
}

const defaultBuildHref = ({
  basePath,
  page,
  q,
  category,
}: {
  basePath: string;
  page: number;
  q?: string;
  category?: string;
}) => {
  const params = new URLSearchParams();

  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
};

export function BlogPagination({
  page,
  totalPages,
  q,
  category,
  basePath = "/blog",
  buildHref,
}: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const hrefFor = (pageValue: number) =>
    buildHref?.({ page: pageValue, q, category }) ??
    defaultBuildHref({ basePath, page: pageValue, q, category });

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center border-y border-black/15 py-4"
    >
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={[
          "inline-flex min-h-11 items-center justify-self-start font-mono text-[0.68rem] uppercase tracking-[0.14em]",
          page === 1
            ? "pointer-events-none text-foreground/30"
            : "text-foreground/65 hover:text-mardu-purple",
        ].join(" ")}
      >
        Zurück
      </Link>

      <span className="px-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-foreground/50">
        [{page} / {totalPages}]
      </span>

      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={[
          "inline-flex min-h-11 items-center justify-self-end font-mono text-[0.68rem] uppercase tracking-[0.14em]",
          page === totalPages
            ? "pointer-events-none text-foreground/30"
            : "text-foreground/65 hover:text-mardu-purple",
        ].join(" ")}
      >
        Weiter
      </Link>
    </nav>
  );
}
