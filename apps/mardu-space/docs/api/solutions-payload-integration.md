# Solutions Consumer Contract (`mardu.space`)

Diese Dokumentation beschreibt den Solutions-Vertrag aus Sicht von `mardu.space` als Consumer der zentralen Plattform.

## Source of Truth

- Runtime und Collections liegen in [`apps/platform`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform)
- Gemeinsame DTOs und Fetch-/Mapping-Logik liegen in [`packages/content-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)
- `mardu.space` konsumiert Solutions über [`lib/solutions.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/lib/solutions.ts)

## Frontend-Consumer

- [`app/solutions/page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/solutions/page.tsx)
- [`app/solutions/[slug]/page.tsx`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/solutions/[slug]/page.tsx)
- [`app/sitemap.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/sitemap.ts)

## Laufzeitvertrag

- `mardu.space` liest Solutions serverseitig direkt gegen `getPlatformOrigin()`.
- Es gibt keinen app-lokalen Solutions-Proxy.
- Routing, Metadata und CTA-Ziele bleiben Eigentum von `mardu.space`.

## Seed-Herkunft

Die frühere statische Runtime-Datei bleibt als Seed-Quelle erhalten:

- [`data/solutions.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/data/solutions.ts)

Diese Datei ist nach der Payload-Anbindung keine primäre Runtime-Quelle mehr.
