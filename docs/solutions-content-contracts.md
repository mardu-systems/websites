# Solutions Content Contracts

Diese Notiz dokumentiert den öffentlichen Daten- und UI-Vertrag für Branchen- und Lösungsseiten in `mardu.space`.

## Rollenverteilung

- `@mardu/content-core` definiert die renderfähigen DTOs.
- `@mardu/content-core` kapselt ebenfalls die Payload-Read-Layer und Mapper fuer Runtime-Consumer.
- `@mardu/solutions-ui` rendert ausschließlich UI.
- `apps/mardu-space` bleibt Owner von:
  - Routen
  - Metadaten
  - Linkzielen und CTA-Zielen
- app-nahe Seed-Daten dürfen als Importquelle bestehen bleiben, sind aber nicht mehr die primäre Runtime-Quelle

## Öffentliche DTOs

### `SolutionListItemDto`

Für Übersichtsseiten und klickbare Grid-Karten.

Felder:

- `id`
- `slug`
- `title`
- `tagline`
- `summary`
- `imageUrl`
- `imageAlt`
- `badge?`
- `themeTone?`

### `SolutionContentBlockDto`

Editorialer Split-Block für Detailseiten.

Felder:

- `id`
- `eyebrow?`
- `title`
- `body`
- `imageUrl`
- `imageAlt`
- `imageSide`

### `SolutionFeatureDto`

Optionaler Zusatztyp für spätere Feature- oder Vorteilsmodule.

Felder:

- `title`
- `description`

### `SolutionDetailDto`

Vollständiger Datensatz für eine branchenspezifische Detailseite.

Zusätzliche Felder gegenüber `SolutionListItemDto`:

- `heroTitle`
- `heroIntro`
- `problemTitle`
- `problemBody`
- `heroImageUrl`
- `heroImageAlt`
- `contentBlocks`
- `features?`
- `ctaLabel?`
- `ctaHref?`

## UI-Contract

`@mardu/solutions-ui` exportiert:

- `SolutionsHero`
- `SolutionsGrid`
- `SolutionCard`
- `SolutionDetailHero`
- `SolutionContentSplit`

Wichtige Regel:

- Das Package kennt keine festen `mardu.space`-Pfade.
- Überblicksseiten übergeben Links über `buildHref`.
- Detailseiten werden in der App zusammengesetzt.

## V1-Umfang

- Seed-Daten liegen weiterhin app-nah in `apps/mardu-space/data/solutions.ts`, dienen aber primär als Importquelle.
- Runtime-Ausspielung erfolgt über Payload in `apps/platform` und den Read-Layer in `@mardu/content-core`.
- Keine Filter und keine zusätzliche Taxonomie-UI.
- Fokus liegt weiterhin auf branchenspezifischer Einordnung mit Text und Bild.
