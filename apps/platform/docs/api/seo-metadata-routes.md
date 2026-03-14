# SEO Metadata Routes

Diese Datei dokumentiert die SEO-Endpunkte, die ueber Next.js File-based Metadata bereitgestellt werden.

## Zweck

- `robots.txt`, `sitemap.xml` und `manifest.webmanifest` aus dem App Router heraus generieren.
- SEO-Konfiguration zentral in TypeScript pflegen.
- Statische Dubletten in `public/` vermeiden.

## Endpunkte und DTOs

### `GET /robots.txt`

Quelle: [app/robots.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/robots.ts)

- Return-Typ: `MetadataRoute.Robots`
- Enthalten:
  - `rules`: Crawl-Regeln pro User Agent
  - `sitemap`: Verweis auf XML-Sitemap
  - `host`: bevorzugte Host-Domain

DTO (vereinfacht):

```ts
type RobotsDto = {
  rules:
    | { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] }[]
    | { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] };
  sitemap?: string | string[];
  host?: string;
};
```

### `GET /sitemap.xml`

Quelle: [app/sitemap.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/sitemap.ts)

- Return-Typ: `MetadataRoute.Sitemap`
- Enthalten pro URL:
  - `url`
  - `lastModified`
  - `changeFrequency`
  - `priority`

DTO (vereinfacht):

```ts
type SitemapItemDto = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};
```

### `GET /manifest.webmanifest`

Quelle: [app/manifest.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/manifest.ts)

- Return-Typ: `MetadataRoute.Manifest`
- Enthalten:
  - App-Metadaten (`name`, `short_name`, `description`, `start_url`)
  - Farbwerte (`background_color`, `theme_color`)
  - `icons` aus `/public/favicon/*`

DTO (vereinfacht):

```ts
type ManifestDto = {
  name?: string;
  short_name?: string;
  description?: string;
  start_url?: string;
  scope?: string;
  display?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  background_color?: string;
  theme_color?: string;
  lang?: string;
  icons?: { src: string; sizes?: string; type?: string; purpose?: string }[];
};
```

## Betriebshinweise

- Neue indexierbare Seiten muessen in [app/sitemap.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/sitemap.ts) aufgenommen werden.
- Canonical, OpenGraph und Twitter-Metadaten werden pro Seite in `metadata` gepflegt.
