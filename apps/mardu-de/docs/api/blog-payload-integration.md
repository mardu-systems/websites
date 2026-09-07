# Blog Contract (`mardu.de`)

Diese Dokumentation beschreibt den Blog-Vertrag in `mardu.de`. Payload-Runtime, Collections und Frontend laufen in derselben App; es gibt kein separates Platform-Projekt mehr.

## Source of Truth

- Runtime und Collections liegen lokal in `mardu.de`: `payload.config.ts`, `collections/blog-posts.ts`, `collections/blog-categories.ts`, `collections/blog-authors.ts`
- Gemeinsame DTOs liegen in [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)
- Direkte Reads via `getPayload()` in [`lib/blog.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/lib/blog.ts) (kein HTTP, kein Proxy)

## DTO-Vertrag

Kanonische Blog-Typen:

- `BlogListQueryDto`
- `BlogCategoryDto`
- `BlogAuthorDto`
- `BlogPostListItemDto`
- `BlogPostDetailDto`
- `PaginatedBlogPostsDto`

Quelle:
[`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

## Lokale Endpunkte

Payload-REST in derselben Instanz (`app/api/[...slug]/route.ts`):

1. `GET /api/blog-posts`
2. `GET /api/blog-posts/:id`
3. `GET /api/blog-categories`

## Frontend-Consumer

Frontend-Layer in `mardu.de`:

- [`lib/blog.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/lib/blog.ts)
- [`app/(site)/blog/page.tsx`](</Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(site)/blog/page.tsx>)
- [`app/(site)/blog/[slug]/page.tsx`](</Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(site)/blog/[slug]/page.tsx>)

## SEO und Routing

- SEO-Daten kommen aus Payload bzw. dem Payload SEO Plugin
- Das Vercel-Flag `blog` steuert ausschließlich die öffentliche Ausspielung. Bei `false` fehlen Blog-Links und Sitemap-Einträge, und Blog-Routen liefern HTTP 404. Der API-Vertrag bleibt unverändert verfügbar.
- neue Blog-Felder oder Filter werden in `collections/` und `packages/content-core` dokumentiert
