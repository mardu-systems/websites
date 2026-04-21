# Payload Endpoints and Runtime Contracts

Diese Datei dokumentiert alle bereitgestellten Payload-Routen, deren Zugriff und Betriebsregeln.

## Zentraler Plattform-Vertrag

- `apps/platform` ist die einzige Payload-Instanz im Monorepo.
- `apps/mardu-de` konsumiert Blog-, Integrations- und Lead-Daten über diese Plattform.
- `apps/mardu-de` leitet `/admin` und lokale SSO-Routen nur noch auf die Plattform weiter und betreibt keine eigene aktive Payload-Runtime mehr.
- `apps/mardu-space` nutzt fuer Leads und Whitepaper nur noch Proxy-Routen gegen diese Plattform.
- Uploads fuer `media` laufen über die Standard-Payload-Upload-Konfiguration der Plattform.

## Bereitstellung

Payload REST wird über die Catch-all Route bereitgestellt:
[app/api/[...slug]/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/[...slug]/route.ts)

Supported Methods:

- `GET`
- `POST`
- `PATCH`
- `PUT`
- `DELETE`
- `OPTIONS`

## Oeffentliche Blog-Endpunkte

1. `GET /api/blog-posts`
2. `GET /api/blog-posts/:id`
3. `GET /api/blog-categories`

DTO-Vertrag fuer Blog-Consumer:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

Shared DTO- und Client-Logik:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

Erweiterte Blog-Details:
[docs/api/blog-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/blog-payload-integration.md)

## Integrations-Endpunkte

1. `GET /api/integrations`
2. `GET /api/integrations/:id`
3. `GET /api/integration-categories`
4. `GET /api/integration-protocols`

DTO-Vertrag fuer Integrations-Consumer:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

Shared DTO- und Client-Logik:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

Erweiterte Integrations-Dokumentation:
[docs/api/integrations-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/integrations-payload-integration.md)

## Solutions-Endpunkte

1. `GET /api/solutions`
2. `GET /api/solutions/:id`

DTO-Vertrag fuer Solutions-Consumer:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

Erweiterte Solutions-Dokumentation:
[docs/api/solutions-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/solutions-payload-integration.md)

## Catalog-Endpunkte

1. `GET /api/product-categories`
2. `GET /api/product-technologies`
3. `GET /api/product-carriers`
4. `GET /api/product-variants`
5. `GET /api/products`
6. `GET /api/products/:id`

DTO-Vertrag fuer Catalog-Consumer:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

Erweiterte Catalog-Dokumentation:
[docs/api/catalog-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/catalog-payload-integration.md)

## Legal-Page-Endpunkte

1. `GET /api/legal-pages`
2. `GET /api/legal-pages/:id`

DTO-Vertrag fuer Legal-Page-Consumer:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

Shared Fetch- und Bootstrap-Logik:
[packages/content-core/src/legal-pages.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/legal-pages.ts)

Erweiterte Legal-Page-Dokumentation:
[docs/api/legal-pages-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/legal-pages-payload-integration.md)

Hinweis:
- `legal-pages` nutzt einen collection-lokalen SEO-Tab mit `seoTitle`, `seoDescription` und `canonicalUrl`.
- Die generischen SEO-Plugin-Endpunkte unten gelten weiterhin fuer die über das Plugin integrierten Collections, aber nicht als Admin-UI-Quelle fuer `legal-pages`.

## SSO-Endpunkte (OIDC)

1. `GET /api/sso/login`
2. `GET /api/sso/callback`
3. `GET /api/sso/logout`
4. `GET /api/sso/debug` (nur development + `OIDC_DEBUG=true`)

DTO-Vertrag fuer SSO:
[types/api/payload-sso.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/payload-sso.ts)

Erweiterte SSO-Dokumentation:
[docs/api/payload-sso-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/payload-sso-integration.md)

## MCP-Endpunkt

1. `POST /api/mcp`

MCP-Berechtigungs- und Funktionsvertrag:
[docs/api/payload-mcp-surface.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/payload-mcp-surface.md)

Hinweis:

- Die freigegebene MCP-Oberflaeche ist bewusst auf CMS- und Ops-Collections begrenzt.
- Experimentelle Admin-/Developer-Tools bleiben deaktiviert.

## SEO-Plugin-Endpunkte (Payload Plugin SEO)

Wenn das SEO-Plugin aktiv ist, stellt Payload zusaetzlich folgende Endpunkte bereit:

1. `POST /api/plugin-seo/generate-title`
2. `POST /api/plugin-seo/generate-description`
3. `POST /api/plugin-seo/generate-url`
4. `POST /api/plugin-seo/generate-image`

Hinweis:
- Diese Endpunkte sind primär fuer das Payload Admin UI gedacht.

## Admin-Routing-Vertrag

Entry-Routen:

1. `/admin`
2. `/admin/login`
3. `/admin/create-first-user`
4. `/admin/collections/:collection`
5. `/admin/globals/:global`

Implementierung:

- [app/(payload)/admin/page.tsx](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/(payload)/admin/page.tsx)
- [app/(payload)/admin/[...segments]/page.tsx](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/(payload)/admin/[...segments]/page.tsx)
- [app/(payload)/admin/layout.tsx](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/(payload)/admin/layout.tsx)

Login-Modus bei aktivem OIDC:

- OIDC + Passwort parallel sichtbar.

Import-Map Single Source of Truth:

- [app/(payload)/admin/importMap.js](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/(payload)/admin/importMap.js)

## Admin-Passwort-Reset

Wenn ein Payload-Admin-Passwort vergessen wurde, darf das Passwort nicht direkt per SQL ersetzt werden. Payload verwaltet Passwort-Hashing und Salt intern.

Kontrollierter Reset:

```bash
export DATABASE_URI="postgres://..."
export PAYLOAD_SECRET="..."
export ADMIN_EMAIL="admin@example.com"
export ADMIN_PASSWORD="neues-langes-passwort"
export ADMIN_PASSWORD_RESET_CONFIRM="true"
bun --cwd apps/platform run admin:reset-password
```

Wenn Vercel-Production-Env lokal gezogen wurde, zuerst die Ziel-Env laden und dann resetten:

```bash
cd apps/platform
vercel env pull .env.production.local --environment=production --yes
set -a
source .env.production.local
set +a
export ADMIN_EMAIL="admin@example.com"
export ADMIN_PASSWORD="neues-langes-passwort"
export ADMIN_PASSWORD_RESET_CONFIRM="true"
bun run admin:reset-password
```

Optional kann ein fehlender Admin nur explizit erstellt werden:

```bash
export ADMIN_CREATE_IF_MISSING="true"
```

Sicherheitsregeln:

- `ADMIN_PASSWORD_RESET_CONFIRM=true` ist Pflicht.
- Das Script loggt das Passwort nie.
- `ADMIN_PASSWORD` nur temporär in einer sicheren Shell setzen.
- Kein automatischer Reset in `onInit` oder während `next build`.
- Nach erfolgreichem Reset temporäre Env-Werte wieder entfernen.
- Auth-User verwenden `lockDocuments: false`, damit Wartungs-Resets keine Admin-Document-Locks berühren.

## Access-Regeln

Beispiel `blog-posts`:

- Public Read: nur `published`
- Authenticated Read: erweitert (Admin)

Quelle:
[collections/blog-posts.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/blog-posts.ts)

## DB-Isolation (verbindlicher Betriebsmodus)

`DATABASE_URI` muss auf eine eigene Payload-Datenbank zeigen, nicht auf bestehende App-Altbestaende.

Empfohlener Ablauf:

1. Datenbank `mardu_payload` anlegen.
2. `.env.local` setzen:
   - `DATABASE_URI=postgres://.../mardu_payload`
   - `PAYLOAD_SECRET=...`
   - `PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000`
3. Migrationen anwenden:
   - `bun run payload:migrate`
4. Status pruefen:
   - `bun run payload:migrate:status`

Wichtig:

- `db push` nicht als Standard verwenden.
- `db push` nur kontrolliert mit Backup und leerer/isolierter DB.

## Bun / Tooling Konvention

- Paketmanager: Bun
- Lockfile-Quelle: `bun.lock`
- Standardchecks:
  1. `bun run lint`
  2. `bun run type-check`
  3. `bun run build`
  4. `bun run payload migrate:status`
