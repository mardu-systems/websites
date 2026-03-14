# Integrations + Payload CMS Integration

Diese Dokumentation beschreibt den API-Vertrag fuer `/integrations` und `/integrations/[slug]`.

## Zweck

- Integrationen in Payload verwalten (Kategorien, Protokolle, Status).
- Oeffentliche Auslieferung nur fuer `published`.
- Stabile Frontend-Vertraege ueber DTOs.

## DTO-Vertrag

Kanonische Typen: [types/api/integrations.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/integrations.ts)

Shared Mapping- und Remote-Client-Layer:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

- `IntegrationListQueryDto`
- `IntegrationCategoryDto`
- `IntegrationProtocolDto`
- `IntegrationListItemDto`
- `IntegrationDetailDto`
- `PaginatedIntegrationsDto`

## Endpunktmatrix

Bereitstellung ueber: [app/api/[...slug]/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/[...slug]/route.ts)

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

Collection: [collections/integrations.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/integrations.ts)

- Public Read: nur `_status=published`
- Authenticated Read/Write: Admin-Kontext
- Site-Ausspielung erfolgt zusaetzlich ueber das Feld `sites` im Shared Content Layer.

## SEO-Verhalten

- SEO-Quelle ist Payload SEO Plugin (`meta.*`).
- Frontend liest `meta.title`, `meta.description`, `meta.image`, `meta.url` mit Fallback auf Fachfelder.

## Fehlerbeispiele

- `400`: Ungueltige Query-Werte
- `401`: Zugriff auf geschuetzte Ressourcen ohne Auth
- `404`: Unbekannter Slug auf `/integrations/[slug]`

## Seed-Daten

V1 Start-Datenquelle:
- [data/integration-seed-items.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/data/integration-seed-items.ts)

Optionales Seed-Skript:
- [scripts/seed-integrations.mjs](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/scripts/seed-integrations.mjs)
