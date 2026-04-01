import { Search } from "lucide-react";

export interface BlogSearchProps {
  query?: string;
  category?: string;
  action?: string;
  placeholder?: string;
}

export function BlogSearch({
  query = "",
  category = "",
  action = "/blog",
  placeholder = "Search through blogs",
}: BlogSearchProps) {
  return (
    <form action={action} method="get" className="relative mt-6 md:mt-8">
      <input type="hidden" name="category" value={category} />
      <label htmlFor="blog-search" className="sr-only">
        Blog durchsuchen
      </label>
      <input
        id="blog-search"
        name="q"
        defaultValue={query}
        placeholder={placeholder}
        className="h-13 w-full border border-black/25 bg-white/85 px-4 pr-12 text-base text-foreground placeholder:text-foreground/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Search className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-foreground/50" />
    </form>
  );
}
