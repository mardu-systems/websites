# Integrations + Payload CMS Integration

Diese Dokumentation beschreibt den API-Vertrag fuer `/integrations` und `/integrations/[slug]`.

## Zweck

- Integrationen in Payload verwalten (Kategorien, Protokolle, Status).
- Oeffentliche Auslieferung nur fuer `published`.
- Stabile Frontend-Vertraege ueber DTOs.

## DTO-Vertrag

Kanonische Typen: [types/api/integrations.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/types/api/integrations.ts)

- `IntegrationListQueryDto`
- `IntegrationCategoryDto`
- `IntegrationProtocolDto`
- `IntegrationListItemDto`
- `IntegrationDetailDto`
- `PaginatedIntegrationsDto`

## Endpunktmatrix

Bereitstellung ueber: [app/api/[...slug]/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/[...slug]/route.ts)

1. `GET /api/integrations`
2. `GET /api/integrations/:id`
3. `GET /api/integration-categories`
4. `GET /api/integration-protocols`

## Query-Parameter (Katalog-URL)

`/integrations` unterstuetzt:

- `q`: Suche in Titel, Kurzbeschreibung und Protokollnamen
- `category`: Kategorie-Slug
- `protocol`: Protokoll-Slug
- `status`: `available | beta | planned`
- `sort`: `featured | alphabetical | latest`
- `page`: Seitennummer (`>= 1`)

Defaults:

- `limit = 12`
- `sort = featured`

## Access-Regeln

Collection: [collections/integrations.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/collections/integrations.ts)

- Public Read: nur `_status=published`
- Authenticated Read/Write: Admin-Kontext

## SEO-Verhalten

- SEO-Quelle ist Payload SEO Plugin (`meta.*`).
- Frontend liest `meta.title`, `meta.description`, `meta.image`, `meta.url` mit Fallback auf Fachfelder.

## Fehlerbeispiele

- `400`: Ungueltige Query-Werte
- `401`: Zugriff auf geschuetzte Ressourcen ohne Auth
- `404`: Unbekannter Slug auf `/integrations/[slug]`

## Seed-Daten

V1 Start-Datenquelle:
- [data/integration-seed-items.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/data/integration-seed-items.ts)

Optionales Seed-Skript:
- [scripts/seed-integrations.mjs](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/scripts/seed-integrations.mjs)
