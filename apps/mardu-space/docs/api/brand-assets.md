# Markenressourcen auf `mardu.space`

## Öffentliche Oberfläche

- Route: `/brand`
- Ziel: Veröffentlichung der offiziellen `mardu.space`-Brand-Assets
- Sichtbarkeit: öffentlich indexierbare Inhaltsseite

## Inhaltsvertrag

- Die Route rendert die gemeinsame Paket-Komponente `BrandAssetsPage` aus `@mardu/sections`.
- Der sichtbare Inhalt stammt aus `marduSpaceBrandAssetsPageContent`.
- Dadurch bleiben Sections und Nutzungsregeln auf `mardu.space` und `mardu.de` identisch, während die gezeigten Assets markenspezifisch bleiben.

## Download-Assets

- `marduspace_logo_bg_white.svg`
- `marduspace_logo_bg_black.svg`

Die Dateien werden direkt aus dem lokalen `public`-Verzeichnis ausgeliefert. Die Route führt kein separates Download- oder Asset-API ein.

## Metadaten

- `title`: `Markenressourcen`
- `description`: identisch zum gemeinsamen Content-Contract
- `canonical`: `/brand`

## Pflegehinweis

- Änderungen an Copy, Section-Reihenfolge oder Nutzungsregeln erfolgen zentral in `@mardu/sections`.
- App-spezifisch bleiben auf `mardu.space` nur Route-Metadaten und die Einbindung in Navigation und Sitemap.
