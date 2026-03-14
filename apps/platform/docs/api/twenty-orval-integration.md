# Twenty OpenAPI + Orval Integration

Diese Doku beschreibt den technischen Ablauf, wie die Twenty REST API im Projekt als typisierter Client (inkl. DTOs) eingebunden wird.

## Ablauf

1. `npm run api:twenty:pull-openapi` lädt die aktuelle OpenAPI-Spec vom Twenty Endpoint.
2. Die Spec wird in `twenty-mardu.json` gespeichert.
3. `orval --config orval.config.cjs` erzeugt daraus TypeScript DTOs und Endpoint-Clients.

Gesamtablauf:

```bash
npm run api:twenty:generate
```

## Quelle der OpenAPI-Spec

Standard-Endpoint:

```text
https://twenty.mardu.systems/rest/open-api/core
```

Konfigurierbar per Environment:

```env
TWENTY_OPENAPI_URL=
TWENTY_OPENAPI_BASE_URL=https://twenty.mardu.systems
TWENTY_OPENAPI_PATH=/rest/open-api/core
TWENTY_OPENAPI_TOKEN=
TWENTY_API_KEY=
TWENTY_OPENAPI_OUTPUT=twenty-mardu.json
TWENTY_OPENAPI_FETCH_TIMEOUT_MS=15000
TWENTY_OPENAPI_USE_DEFAULT_TAG_FILTER=true
TWENTY_OPENAPI_FILTER_MODE=include
TWENTY_OPENAPI_TAGS=
TWENTY_OPENAPI_SCHEMAS=
```

Hinweis:

- `TWENTY_OPENAPI_URL` hat Vorrang.
- Ohne `TWENTY_OPENAPI_URL` wird die URL aus `TWENTY_OPENAPI_BASE_URL` + `TWENTY_OPENAPI_PATH` gebaut.
- Falls `TWENTY_OPENAPI_TOKEN` gesetzt ist, wird er als Query-Parameter `token` angehaengt.
- Falls `TWENTY_API_KEY` gesetzt ist, wird zusaetzlich `Authorization: Bearer <key>` gesendet.
- Der API-Filter sitzt in der Orval-Config als `input.filters`.

## Generierte API + DTOs

Orval-Konfiguration: [`orval.config.cjs`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/orval.config.cjs)
Transformer (nur Namensnormalisierung): [`scripts/orval-twenty-transformer.cjs`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/scripts/orval-twenty-transformer.cjs)

Ausgabe:

- Endpoint-Funktionen: `lib/integrations/twenty/generated/endpoints`
- DTO-/Schema-Types: `lib/integrations/twenty/generated/model`
- Runtime-Integration: `lib/integrations/twenty.ts` (People/Companies Sync fuer Contact + Newsletter Flows)

Nach der Generierung setzt `scripts/mark-generated-twenty-no-check.mjs` ein `// @ts-nocheck` auf alle generierten Dateien, damit bekannte Spec-Unsauberkeiten in Drittanbieter-Schemas den Projekt-Typecheck nicht blockieren.

Der Ordner `lib/integrations/twenty/generated` ist bewusst gitignored.

Die DTOs sind direkt aus der OpenAPI-Spec abgeleitet und bilden damit den API-Vertrag zwischen Twenty und diesem Projekt.

## Filter-Default

Standardmaessig werden nur die fuer diese App relevanten Tags `people,companies` generiert. Du kannst das Verhalten anpassen:

- komplett ohne Filter: `TWENTY_OPENAPI_USE_DEFAULT_TAG_FILTER=false` oder `TWENTY_OPENAPI_TAGS=*`
- eigener Tag-Filter: `TWENTY_OPENAPI_TAGS=people,opportunities`
- zusaetzlicher Schema-Filter: `TWENTY_OPENAPI_SCHEMAS=PersonForResponse,CompanyForResponse`
- Exclude statt Include: `TWENTY_OPENAPI_FILTER_MODE=exclude`
