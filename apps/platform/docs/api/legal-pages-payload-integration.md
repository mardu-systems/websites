# Legal Pages + Payload Integration

Diese Dokumentation beschreibt den zentralen Vertrag fuer rechtliche/statische Seiten wie `privacy` und `publisher`.

## Source of Truth

- Collection: [`collections/legal-pages.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/legal-pages.ts)
- Shared DTOs: [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)
- Shared Fetcher: [`packages/content-core/src/legal-pages.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/legal-pages.ts)
- Shared Renderer: [`packages/sections/src/legal-page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/sections/src/legal-page.tsx)

## Oeffentliche Endpunkte

1. `GET /api/legal-pages`
2. `GET /api/legal-pages/:id`

Typische Public-Filter:

- `where[_status][equals]=published`
- `where[slug][equals]=privacy|publisher`

## DTO-Vertrag

- `LegalPageSlug`
- `LegalPageDto`

Der Content wird als `contentMarkdown` ausgeliefert und über einen gemeinsamen Renderer dargestellt.

SEO-Felder fuer `legal-pages` sind bewusst collection-lokal und stabil gehalten:

- `seoTitle`
- `seoDescription`
- `canonicalUrl`

Die Collection nutzt fuer diese Felder einen eigenen SEO-Tab und nicht die generische `@payloadcms/plugin-seo`-Tab-Integration.

## Site-Sichtbarkeit

- `sites` steuert, auf welchen Frontends ein Dokument sichtbar ist
- v1 Default für Legal Pages: `mardu-de`, `platform`

## Seed und Bootstrap

- Seed-Skript: [`scripts/seed-legal-pages.mjs`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/scripts/seed-legal-pages.mjs)
- Gebündelte Rechtstexte und Seed-Quelle: `packages/content-core/data/legal/privacy.md` und `packages/content-core/data/legal/publisher.md`

Payload bleibt zur Laufzeit die bevorzugte Quelle. Wenn ein veröffentlichtes Dokument fehlt oder die Content-API nicht erreichbar ist, verwenden `mardu.de` und die öffentlichen Platform-Seiten denselben gebündelten Rechtstext. Dadurch bleiben Impressum und Datenschutz unabhängig vom Seed-Status erreichbar; API-Fehler werden weiterhin serverseitig protokolliert.
