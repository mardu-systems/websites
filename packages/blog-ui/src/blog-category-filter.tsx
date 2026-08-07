import type { BlogCategoryDto } from "@mardu/content-core";
import Link from "next/link";

export interface BlogCategoryFilterProps {
  categories: BlogCategoryDto[];
  activeCategory?: string;
  query?: string;
  basePath?: string;
  buildHref?: (params: { category?: string; query?: string }) => string;
}

const defaultBuildHref = ({
  basePath,
  category,
  query,
}: {
  basePath: string;
  category?: string;
  query?: string;
}): string => {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (category) params.set("category", category);

  const search = params.toString();
  return search ? `${basePath}?${search}` : basePath;
};

export function BlogCategoryFilter({
  categories,
  activeCategory = "",
  query = "",
  basePath = "/blog",
  buildHref,
}: BlogCategoryFilterProps) {
  const hrefFor = (category: string) =>
    buildHref?.({
      category: category || undefined,
      query: query || undefined,
    }) ??
    defaultBuildHref({
      basePath,
      category: category || undefined,
      query: query || undefined,
    });

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-black/15 pb-5 md:mt-6">
      <Link
        href={hrefFor("")}
        className={[
          "inline-flex min-h-11 items-center font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors",
          activeCategory.length === 0
            ? "text-mardu-purple underline decoration-mardu-orange decoration-2 underline-offset-8"
            : "text-foreground/55 hover:text-foreground",
        ].join(" ")}
      >
        [00] Alle
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={hrefFor(category.slug)}
          className={[
            "inline-flex min-h-11 items-center font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors",
            activeCategory === category.slug
              ? "text-mardu-purple underline decoration-mardu-orange decoration-2 underline-offset-8"
              : "text-foreground/55 hover:text-foreground",
          ].join(" ")}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
}
