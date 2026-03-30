# Plattform-Proxy und Admin-Vertrag (`mardu.de`)

`mardu.de` betreibt keine eigene Payload-Runtime mehr. Die App ist Frontend plus Proxy zur zentralen Plattform.

## API-Proxy

Quelle:
[`app/api/[...slug]/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/[...slug]/route.ts)

- `GET|POST|PATCH|PUT|DELETE|OPTIONS /api/[...slug]`
- leitet Requests an `MARDU_PLATFORM_ORIGIN/api/[...slug]` weiter
- übernimmt Methode, Query-Parameter, Header und Request-Body
- bleibt `force-dynamic`, damit keine Plattform-Antwort gecacht wird

## Admin-Weiterleitung

Quellen:

- [`app/(payload)/admin/page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(payload)/admin/page.tsx)
- [`app/(payload)/admin/[...segments]/page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(payload)/admin/[...segments]/page.tsx)

Verhalten:

- `/admin` redirectet auf `apps/platform /admin`
- `/admin/[...segments]` redirectet auf die entsprechende Plattform-Admin-Route
- `mardu.de` hostet kein eigenes Payload-Admin mehr

## SSO-Proxy

Quellen:

- [`app/api/sso/login/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/sso/login/route.ts)
- [`app/api/sso/callback/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/sso/callback/route.ts)
- [`app/api/sso/logout/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/sso/logout/route.ts)
- [`app/api/sso/debug/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/sso/debug/route.ts)

Verhalten:

- `mardu.de` exponiert kompatible SSO-Einstiegspfade
- die eigentliche OIDC-/Payload-Logik liegt ausschliesslich in `apps/platform`

## Source of Truth

- Payload-Runtime und Admin: [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Lead- und Content-DTOs: [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts), [`packages/lead-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/lead-core/src/index.ts)
