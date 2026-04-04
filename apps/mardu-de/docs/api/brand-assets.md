# Brand Assets auf `mardu.de`

## Öffentliche Oberfläche

- Route: `/brand`
- Ziel: Veröffentlichung der offiziellen Brand-Assets von `Mardu`
- Sichtbarkeit: öffentlich indexierbare Inhaltsseite

## Inhaltsvertrag

- Die Route rendert die gemeinsame Paket-Komponente `BrandAssetsPage` aus `@mardu/sections`.
- Der sichtbare Inhalt stammt aus `marduBrandAssetsPageContent`.
- Dadurch bleiben Sections und Nutzungsregeln auf `mardu.de` und `mardu.space` identisch, während die gezeigten Assets markenspezifisch bleiben.

## Download-Assets

- `logos/Logo.svg`
- `logos/LogoWeiss.svg`

Die Dateien werden auf `mardu.de` aus dem lokalen `public`-Verzeichnis ausgeliefert. Die Route führt kein eigenes Asset-API ein.

## Metadaten

- `title`: `Brand Assets | Mardu`
- `description`: verweist auf die Brand-Assets der Marke `Mardu`
- `canonical`: `/brand`

## Pflegehinweis

- Änderungen an Copy, Section-Reihenfolge oder Nutzungsregeln erfolgen zentral in `@mardu/sections`.
- App-spezifisch bleiben auf `mardu.de` nur Route-Metadaten, Navigation und Shell-Einbindung.
