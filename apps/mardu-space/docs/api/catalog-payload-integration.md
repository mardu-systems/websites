# Catalog Consumer Contract (`mardu.space`)

Diese Dokumentation beschreibt den Katalog-Vertrag aus Sicht von `mardu.space` als Consumer der zentralen Plattform.

## Source of Truth

- Runtime und Collections liegen in [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Gemeinsame DTOs und Fetch-/Mapping-Logik liegen in [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)
- `mardu.space` konsumiert die Daten über [`lib/catalog.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/lib/catalog.ts)

## Frontend-Consumer

- [`app/products/page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/products/page.tsx)
- [`app/products/[slug]/page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/products/[slug]/page.tsx)
- [`app/sitemap.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/sitemap.ts)

## Laufzeitvertrag

- `mardu.space` liest Katalogdaten serverseitig direkt gegen `getPlatformOrigin()`.
- Es gibt keinen app-lokalen Katalog-Proxy.
- Routing, Breadcrumbs, CTA-Ziele und Inquiry-Hrefs bleiben Eigentum von `mardu.space`.

## Seed-Herkunft

Die ehemaligen statischen Runtime-Daten bleiben als Seed-Quelle erhalten:

- [`data/catalog/categories.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/data/catalog/categories.ts)
- [`data/catalog/products.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/data/catalog/products.ts)

Diese Dateien sind nach der Payload-Anbindung keine primäre Runtime-Quelle mehr.
