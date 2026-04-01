# `@mardu/blog-ui`

Shared blog UI components for Mardu frontends.

## Public API

- `BlogPostCard`
- `BlogGrid`
- `BlogHero`
- `BlogCategoryFilter`
- `BlogSearch`
- `BlogPagination`
- `BlogHeadingAnchors`
- `BlogRichText`

## Contract

- Components consume render-ready DTOs from `@mardu/content-core`.
- Fetching, `searchParams` parsing, metadata generation, and route ownership stay in the consuming app.
- Route paths are configurable via `basePath`, `action`, or `buildHref` props so the package does not hardcode app-only routing.

## Shared DTOs / Props

- `BlogPostCardProps`
- `BlogGridProps`
- `BlogHeroProps`
- `BlogCategoryFilterProps`
- `BlogSearchProps`
- `BlogPaginationProps`
- `BlogHeadingLink`
- `BlogHeadingAnchorsProps`
- `BlogRichTextProps`
