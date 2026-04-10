# Solutions + Payload CMS Integration

Diese Dokumentation beschreibt den API-Vertrag für Branchen- und Lösungsseiten in der zentralen Payload-Plattform.

## Zweck

- `solutions` zentral redaktionell pflegen.
- Öffentliche Ausspielung nur für publizierte Datensätze.
- `mardu.space` konsumiert die Inhalte über `@mardu/content-core`.

## DTO-Vertrag

Kanonische Typen:
[packages/content-core/src/index.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/packages/content-core/src/index.ts)

- `SolutionListItemDto`
- `SolutionDetailDto`
- `SolutionContentBlockDto`
- `SolutionFeatureDto`

## Endpunkte

Bereitstellung über:
[app/api/[...slug]/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/[...slug]/route.ts)

1. `GET /api/solutions`
2. `GET /api/solutions/:id`

## Access-Regeln

- `solutions` nutzt Draft/Publish.
- Öffentlicher Read-Zugriff liefert nur `_status=published`.
- Sichtbarkeit für Consumer-Frontends wird zusätzlich über `sites` gesteuert.

## Mapping-Regeln

- Bildquellen können entweder über Payload `media` oder über `imageUrl` / `heroImageUrl` gepflegt werden.
- Content-Blocks unterstützen dieselbe Fallback-Strategie.
- `themeTone` verwendet die DTO-Werte `forest | sand | mist | clay | ink`.

## Seed- und Importpfad

Statische Ausgangsdaten:

- [apps/mardu-space/data/solutions.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/data/solutions.ts)

Seed-Skript:

- [scripts/seed-solutions.mjs](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/scripts/seed-solutions.mjs)

Vertrag des Seed-Skripts:

- Upsert über `slug`
- publiziert Datensätze direkt mit `_status=published`
- setzt `sites=['mardu-space']`
- überführt Hero-, Problem-, Content-Block- und CTA-Daten verlustfrei aus der statischen Seed-Quelle
