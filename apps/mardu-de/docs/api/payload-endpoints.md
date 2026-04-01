# Plattform-Proxy-Vertrag (`mardu.de`)

`mardu.de` betreibt keine eigene Payload-Runtime, kein Admin und keine SSO-Einstiegspfade. Die App ist das öffentliche Frontend und nutzt die zentrale Plattform nur für fachliche API- und Content-Zugriffe.

## API-Proxy

Quelle:
[`app/api/[...slug]/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/[...slug]/route.ts)

- `GET|POST|PATCH|PUT|DELETE|OPTIONS /api/[...slug]`
- leitet Requests an `MARDU_PLATFORM_ORIGIN/api/[...slug]` weiter
- übernimmt Methode, Query-Parameter, Header und Request-Body
- bleibt `force-dynamic`, damit keine Plattform-Antwort gecacht wird

## Nicht Teil von `mardu.de`

- kein lokales Payload-Admin
- keine `/admin`-Weiterleitung
- keine `/api/sso/*`-Kompatibilitätspfade

## Source of Truth

- Admin, Payload, CMS und SSO: [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Lead- und Content-DTOs: [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts), [`packages/lead-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/lead-core/src/index.ts)
