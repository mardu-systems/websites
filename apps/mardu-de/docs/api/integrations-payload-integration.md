# Integrations Contract (`mardu.de`)

Diese Dokumentation beschreibt den Integrations-Vertrag in `mardu.de`. Payload-Runtime, Collections und Frontend laufen in derselben App; es gibt kein separates Platform-Projekt mehr.

## Source of Truth

- Runtime und Collections liegen lokal in `mardu.de`: `payload.config.ts`, `collections/integrations.ts`, `collections/integration-categories.ts`, `collections/integration-protocols.ts`
- Gemeinsame DTOs und Filtertypen liegen in [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)
- Direkte Reads via `getPayload()` in [`lib/integrations.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/lib/integrations.ts) (kein HTTP, kein Proxy)

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

## Lokale Endpunkte

Payload-REST in derselben Instanz (`app/api/[...slug]/route.ts`):

1. `GET /api/integrations`
2. `GET /api/integrations/:id`
3. `GET /api/integration-categories`
4. `GET /api/integration-protocols`

## Frontend-Consumer

Frontend-Layer in `mardu.de`:

- [`lib/integrations.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/lib/integrations.ts)
- [`app/(site)/integrations/page.tsx`](</Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(site)/integrations/page.tsx>)
- [`app/(site)/integrations/[slug]/page.tsx`](</Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(site)/integrations/[slug]/page.tsx>)

## SEO und Sichtbarkeit

- SEO-Daten kommen aus Payload bzw. dem Payload SEO Plugin
- Site-Sichtbarkeit wird über `packages/content-core`/Payload-Feld `sites` geregelt
- Das Vercel-Flag `integrations` steuert zusätzlich nur die öffentliche Ausspielung. Bei `false` fehlen Integrationslinks und Sitemap-Einträge, und Integrationsrouten liefern HTTP 404. Der API-Vertrag und die Payload-Sichtbarkeit bleiben unverändert.
- neue Integrations-Felder oder Filter werden in `collections/` und `packages/content-core` dokumentiert
