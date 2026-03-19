# Payload Endpoints and Runtime Contracts

Diese Datei dokumentiert alle bereitgestellten Payload-Routen, deren Zugriff und Betriebsregeln.

## Zentraler Plattform-Vertrag

- `apps/platform` ist die einzige Payload-Instanz im Monorepo.
- `apps/mardu-de` konsumiert Blog-, Integrations- und Lead-Daten ueber diese Plattform.
- `apps/mardu-de` leitet `/admin` und lokale SSO-Routen nur noch auf die Plattform weiter und betreibt keine eigene aktive Payload-Runtime mehr.
- `apps/mardu-space` nutzt fuer Leads und Whitepaper nur noch Proxy-Routen gegen diese Plattform.
- Uploads fuer `media` laufen ueber die Standard-Payload-Upload-Konfiguration der Plattform.

## Bereitstellung

Payload REST wird ueber die Catch-all Route bereitgestellt:
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
[types/api/blog.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/blog.ts)

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
[types/api/integrations.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/integrations.ts)

Shared DTO- und Client-Logik:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

Erweiterte Integrations-Dokumentation:
[docs/api/integrations-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/integrations-payload-integration.md)

## SSO-Endpunkte (OIDC)

1. `GET /api/sso/login`
2. `GET /api/sso/callback`
3. `GET /api/sso/logout`
4. `GET /api/sso/debug` (nur development + `OIDC_DEBUG=true`)

DTO-Vertrag fuer SSO:
[types/api/payload-sso.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/payload-sso.ts)

Erweiterte SSO-Dokumentation:
[docs/api/payload-sso-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/payload-sso-integration.md)

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
   - `bun run payload migrate`
4. Status pruefen:
   - `bun run payload migrate:status`

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
