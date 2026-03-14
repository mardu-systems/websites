# Newsletter API (`mardu.space`)

`mardu.space` stellt weiterhin eigene Endpunkte bereit, fungiert intern aber nur noch als Fassade auf `apps/platform`.

## `POST /api/newsletter`

Quelle: [`apps/mardu-space/app/api/newsletter/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/api/newsletter/route.ts)

- validiert das Frontend-Payload lokal
- ergaenzt serverseitig `site: 'mardu-space'`
- leitet an `apps/platform /api/newsletter` weiter
- Response bleibt `{ ok: true }`

## `GET /api/newsletter/confirm`

Quelle: [`apps/mardu-space/app/api/newsletter/confirm/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/api/newsletter/confirm/route.ts)

- redirectet an `apps/platform /api/newsletter/confirm`
- setzt `site=mardu-space`, damit Redirects und Branding korrekt bleiben

## `GET /api/newsletter/unsubscribe`

Quelle: [`apps/mardu-space/app/api/newsletter/unsubscribe/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/api/newsletter/unsubscribe/route.ts)

- redirectet an `apps/platform /api/newsletter/unsubscribe`
- setzt `site=mardu-space`

## Whitepaper

### `POST /api/whitepaper/request`

Quelle: [`apps/mardu-space/app/api/whitepaper/request/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/api/whitepaper/request/route.ts)

- nutzt denselben zentralen DOI-Flow
- sendet intern an `apps/platform /api/newsletter`
- ergaenzt `site: 'mardu-space'` und `role: 'whitepaper'`
- Response bleibt kompatibel: `{ success: true }`

### `GET /api/whitepaper/download`

Quelle: [`apps/mardu-space/app/api/whitepaper/download/route.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/app/api/whitepaper/download/route.ts)

- validiert den zentral erzeugten Download-Token
- erwartet `purpose === 'whitepaper-download'`
- liefert weiterhin das Asset lokal von `mardu.space` aus

## DTOs

Quelle: [`apps/mardu-space/types/api/newsletter.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/types/api/newsletter.ts)

Die oeffentlichen DTOs re-exportieren die zentralen Vertraege aus [`packages/lead-core/src/index.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/lead-core/src/index.ts).
