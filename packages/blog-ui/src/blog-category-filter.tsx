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
    <div className="mt-6 flex flex-wrap items-center gap-2.5 md:mt-8">
      <Link
        href={hrefFor("")}
        className={[
          "inline-flex h-9 items-center border px-3 text-sm transition-colors",
          activeCategory.length === 0
            ? "border-foreground bg-foreground text-background"
            : "border-border bg-card text-foreground/75 hover:text-foreground",
        ].join(" ")}
      >
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={hrefFor(category.slug)}
          className={[
            "inline-flex h-9 items-center border px-3 text-sm transition-colors",
            activeCategory === category.slug
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-foreground/75 hover:text-foreground",
          ].join(" ")}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
}
