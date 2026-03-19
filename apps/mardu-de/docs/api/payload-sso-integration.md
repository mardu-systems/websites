# OIDC SSO Proxy Contract (`mardu.de`)

Diese Datei dokumentiert den SSO-Vertrag aus Sicht von `mardu.de` als Proxy zur Plattform.

## Source of Truth

- Die eigentliche OIDC-/Payload-SSO-Implementierung liegt in [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Der kanonische API- und DTO-Vertrag liegt in [`apps/platform/docs/api/payload-sso-integration.md`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/payload-sso-integration.md) und [`apps/platform/types/api/payload-sso.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/payload-sso.ts)

## Lokale Einstiegspfade in `mardu.de`

Implementierung:

- [`app/api/sso/login/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/sso/login/route.ts)
- [`app/api/sso/callback/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/sso/callback/route.ts)
- [`app/api/sso/logout/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/sso/logout/route.ts)
- [`app/api/sso/debug/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/sso/debug/route.ts)

Bereitgestellte Pfade:

1. `GET /api/sso/login`
2. `GET /api/sso/callback`
3. `GET /api/sso/logout`
4. `GET /api/sso/debug`

## Verhalten

- `mardu.de` leitet diese Requests an die Plattform weiter
- Query-Parameter bleiben erhalten
- `mardu.de` enthaelt keine eigene OIDC-Session- oder Payload-Auth-Strategie mehr
- Fehlercodes, ENV-Vertrag und Redirect-Details werden zentral in der Plattform-Dokumentation gepflegt
