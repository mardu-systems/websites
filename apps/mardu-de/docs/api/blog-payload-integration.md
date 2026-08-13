# Blog Consumer Contract (`mardu.de`)

Diese Dokumentation beschreibt den Blog-Vertrag aus Sicht von `mardu.de` als Consumer der zentralen Plattform.

## Source of Truth

- Runtime und Collections liegen in [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Gemeinsame DTOs und Mapping-Helfer liegen in [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)
- `mardu.de` konsumiert Blog-Daten über den Plattform-Proxy in [`app/api/[...slug]/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/[...slug]/route.ts)

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

## Oeffentliche Endpunkte

`mardu.de` nutzt die zentralen Plattform-Endpunkte über den lokalen Proxy:

1. `GET /api/blog-posts`
2. `GET /api/blog-posts/:id`
3. `GET /api/blog-categories`

Die eigentliche Payload-Implementierung liegt in `apps/platform`, nicht in `mardu.de`.

## Frontend-Consumer

Frontend-Layer in `mardu.de`:

- [`lib/blog.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/lib/blog.ts)
- [`app/(frontend)/blog/page.tsx`](</Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(frontend)/blog/page.tsx>)
- [`app/(frontend)/blog/[slug]/page.tsx`](</Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(frontend)/blog/[slug]/page.tsx>)

Diese Consumer duerfen nur DTOs und Read-Vertraege nutzen, keine lokalen Collection-Definitionen.

## SEO und Routing

- SEO-Daten kommen aus der zentralen Plattform bzw. dem Payload SEO Plugin
- `mardu.de` rendert Blog-Routen nur als Consumer
- Das Vercel-Flag `blog` steuert ausschließlich die öffentliche mardu.de-Ausspielung. Bei `false` fehlen Blog-Links und Sitemap-Einträge, und Blog-Routen liefern HTTP 404. Der API-Vertrag bleibt unverändert verfügbar.
- neue Blog-Felder oder Filter werden zuerst in `apps/platform` und `packages/content-core` dokumentiert
