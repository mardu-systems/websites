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
  placeholder = "Beiträge durchsuchen",
}: BlogSearchProps) {
  return (
    <form
      action={action}
      method="get"
      className="mt-8 border-y border-black/15 md:mt-10"
    >
      <input type="hidden" name="category" value={category} />
      <label htmlFor="blog-search" className="sr-only">
        Blog durchsuchen
      </label>
      <div className="grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
        <span className="font-mono text-[0.68rem] tracking-[0.16em] text-mardu-purple">
          [SUCHE]
        </span>
        <input
          id="blog-search"
          name="q"
          defaultValue={query}
          placeholder={placeholder}
          className="h-16 min-w-0 bg-transparent text-base text-foreground placeholder:text-foreground/40 focus-visible:outline-none"
        />
        <button
          type="submit"
          aria-label="Blog durchsuchen"
          className="flex size-11 items-center justify-center border border-black/20 transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mardu-purple focus-visible:ring-offset-2"
        >
          <Search className="size-4" />
        </button>
      </div>
    </form>
  );
}
