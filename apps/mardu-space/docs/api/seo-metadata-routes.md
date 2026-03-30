# SEO Metadata Routes

Diese Datei dokumentiert die SEO-Endpunkte, die über Next.js File-based Metadata bereitgestellt werden.

## Zweck

- `robots.txt`, `sitemap.xml` und `manifest.webmanifest` aus dem App Router generieren
- SEO-Konfiguration zentral in TypeScript pflegen
- statische Dubletten in `public/` vermeiden

## Endpunkte und DTOs

### `GET /robots.txt`

Quelle: [app/robots.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/app/robots.ts)

- Return-Typ: `MetadataRoute.Robots`

### `GET /sitemap.xml`

Quelle: [app/sitemap.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/app/sitemap.ts)

- Return-Typ: `MetadataRoute.Sitemap`

### `GET /manifest.webmanifest`

Quelle: [app/manifest.ts](/Users/lucaschoeneberg/Documents/GitHub/mardu.space/app/manifest.ts)

- Return-Typ: `MetadataRoute.Manifest`

## DTOs (vereinfacht)

```ts
type RobotsDto = {
  rules:
    | { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] }[]
    | { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] };
  sitemap?: string | string[];
  host?: string;
};

type SitemapItemDto = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

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
