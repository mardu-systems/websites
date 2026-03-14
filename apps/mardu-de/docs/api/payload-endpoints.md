# Payload Endpoints (`mardu.de`)

`mardu.de` stellt keine eigenstaendige aktive Payload-REST-Implementierung mehr bereit. Die Catch-all Route ist jetzt ein Proxy auf `apps/platform`.

## `GET|POST|PATCH|PUT|DELETE|OPTIONS /api/[...slug]`

Quelle: [`apps/mardu-de/app/api/[...slug]/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/api/[...slug]/route.ts)

- leitet Requests an `MARDU_PLATFORM_ORIGIN/api/[...slug]` weiter
- uebernimmt Query-Parameter, Methode, Header und Request-Body
- ist `force-dynamic`, damit keine Payload-Antwort gecacht wird

## Admin

Quelle: [`apps/mardu-de/app/(payload)/admin/layout.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/app/(payload)/admin/layout.tsx)

- `/admin` und `/admin/[...segments]` redirecten an `apps/platform /admin`
- die aktive Payload-Admin-Oberflaeche liegt damit zentral in `apps/platform`

## OIDC

Die SSO-Routen in `mardu.de` bleiben lokal vorhanden, solange `mardu.de` noch eigene Content-/Auth-Pfade nutzt:

- `/api/sso/login`
- `/api/sso/callback`
- `/api/sso/logout`
- `/api/sso/debug`
