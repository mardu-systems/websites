# Blog + Payload CMS Integration

Diese Dokumentation beschreibt den Blog-spezifischen API-Vertrag fuer `/blog` und `/blog/[slug]`.

## Zweck

- Blog-Inhalte in Payload verwalten.
- Oeffentliche Auslieferung nur fuer `published`.
- Stabilen Frontend-Vertrag ueber DTOs garantieren.

## DTO-Vertrag

Kanonische Typen: [types/api/blog.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/blog.ts)

Shared Mapping- und Remote-Client-Layer:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

- `BlogListQueryDto`
- `BlogCategoryDto`
- `BlogAuthorDto`
- `BlogPostListItemDto`
- `BlogPostDetailDto`
- `PaginatedBlogPostsDto`

SEO-Felder im Detail-DTO:

- `seoTitle`
- `seoDescription`
- `canonicalUrl` (optional)
- `ogImageUrl` (optional)
- `ogImageAlt` (optional)

Hinweis:
- Diese Werte kommen aus dem Payload SEO Plugin (`meta.*`) und nicht aus eigenen Blog-Collection-Feldern.

## Endpunktmatrix (Blog)

Bereitstellung ueber: [app/api/[...slug]/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/[...slug]/route.ts)

1. `GET /api/blog-posts`
2. `GET /api/blog-posts/:id`
3. `GET /api/blog-categories`

## Query-Parameter und Grenzen

Public UI-Filter (`/blog` URL-Contract):

- `q`: Volltextsuche (v1: Titel + Excerpt)
- `category`: Kategorie-Slug
- `page`: Seite, `>= 1`

Domain-Layer-Default:

- `limit = 9`

Payload REST (typisch):

- `where[_status][equals]=published`
- `where[slug][equals]=<slug>`
- `sort=-publishedAt`
- `depth=2`
- `limit`, `page`

## Mapping-Layer

Quelle: [lib/blog.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/lib/blog.ts)

- `getFeaturedPost()`
- `getBlogPosts(query)`
- `getBlogPostBySlug(slug)`
- `getBlogCategories()`

Mapper garantieren DTO-Stabilitaet und verwerfen unvollstaendige Payload-Dokumente defensiv.

Zusatzregel:
- Blog-Posts sind site-faehig ueber das Feld `sites` und werden fuer Consumer nur ausgeliefert, wenn die jeweilige Site sichtbar ist.

## Access-Regeln

Quelle: [collections/blog-posts.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/blog-posts.ts)

- Public Read: nur `published`
- Authenticated Read (Admin): alle Stati

## Response-/Fehlerbeispiele

`GET /api/blog-posts?where[_status][equals]=published&limit=1`

```json
{
  "docs": [
    {
      "id": 1,
      "title": "Example",
      "slug": "example",
      "_status": "published"
    }
  ],
  "totalDocs": 1,
  "limit": 1,
  "totalPages": 1,
  "page": 1
}
```

Typische Fehler:

- `400`: Ungueltige Query-Parameter
- `401`: Nicht authentifiziert (fuer geschuetzte Ressourcen)
- `404`: Ressource nicht gefunden

## SEO-/Routing-Verhalten

- Unbekannter Beitrag unter `/blog/[slug]` -> 404.
- `app/sitemap.ts` fuegt `/blog` und alle publizierten Slugs hinzu.
- Metadata-Prioritaet in `/blog/[slug]`:
  1. SEO-Plugin-Daten aus Payload (`meta.title`, `meta.description`, `meta.image`, `meta.url`)
  2. Fallback auf Titel/Excerpt/Coverbild

## Umgebungsvariablen

```env
DATABASE_URI=
PAYLOAD_SECRET=
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```
