# Integrations Consumer Contract (`mardu.de`)

Diese Dokumentation beschreibt den Integrations-Vertrag aus Sicht von `mardu.de` als Consumer der zentralen Plattform.

## Source of Truth

- Runtime und Collections liegen in [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Gemeinsame DTOs und Filtertypen liegen in [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)
- `mardu.de` konsumiert Integrations-Daten ueber den Plattform-Proxy in [`app/api/[...slug]/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/[...slug]/route.ts)

## DTO-Vertrag

Kanonische Integrations-Typen:

- `IntegrationListQueryDto`
- `IntegrationCategoryDto`
- `IntegrationProtocolDto`
- `IntegrationListItemDto`
- `IntegrationDetailDto`
- `PaginatedIntegrationsDto`
- `IntegrationStatus`
- `IntegrationSort`

Quelle:
[`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

## Oeffentliche Endpunkte

`mardu.de` nutzt die zentralen Plattform-Endpunkte ueber den lokalen Proxy:

1. `GET /api/integrations`
2. `GET /api/integrations/:id`
3. `GET /api/integration-categories`
4. `GET /api/integration-protocols`

Die eigentliche Payload-Implementierung liegt ausschliesslich in `apps/platform`.

## Frontend-Consumer

Frontend-Layer in `mardu.de`:

- [`lib/integrations.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/lib/integrations.ts)
- [`app/(frontend)/integrations/page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(frontend)/integrations/page.tsx)
- [`app/(frontend)/integrations/[slug]/page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(frontend)/integrations/[slug]/page.tsx)

Diese Consumer duerfen nur DTOs und Read-Vertraege nutzen, keine lokalen Collection-Definitionen oder Seed-Skripte.

## SEO und Sichtbarkeit

- SEO-Daten kommen aus der zentralen Plattform bzw. dem Payload SEO Plugin
- Site-Sichtbarkeit wird zentral ueber `packages/content-core`/Payload geregelt
- neue Integrations-Felder oder Filter werden zuerst in `apps/platform` und `packages/content-core` dokumentiert
