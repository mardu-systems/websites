# Markenressourcen auf `mardu.de`

## Öffentliche Oberfläche

- Route: `/brand`
- Ziel: Veröffentlichung der offiziellen Brand-Assets von `Mardu`
- Sichtbarkeit: öffentlich indexierbare Inhaltsseite

## Inhaltsvertrag

- Die Route rendert die gemeinsame Paket-Komponente `BrandAssetsPage` aus `@mardu/sections`.
- Der sichtbare Inhalt stammt aus `marduBrandAssetsPageContent`.
- Dadurch bleiben Sections und Nutzungsregeln auf `mardu.de` und der internen Plattform identisch, während die gezeigten Assets markenspezifisch bleiben.

## Download-Assets

- Logo für helle Hintergründe: `mardu-branding/logo/mardu_logo_side_for_white_bg.svg`
- Logo für dunkle Hintergründe: `mardu-branding/logo/mardu_logo_side_for_black_bg.svg`
- Browser-Icon: `mardu-branding/favicons/favicon.svg`
- Apple-Touch-Icon: `mardu-branding/favicons/apple-touch-icon.svg`

Die Dateien stammen aus dem Git-Submodule `apps/mardu-de/public/mardu-branding`, das auf
`https://github.com/mardu-systems/mardu_branding` zeigt. Dadurch werden die versionierten
Originaldateien direkt aus dem öffentlichen `public`-Verzeichnis ausgeliefert; die Route führt
kein eigenes Asset-API und benötigt keine Synchronisationskopie der Branding-Dateien.

## Metadaten

- `title`: `Markenressourcen | Mardu`
- `description`: verweist auf die Brand-Assets der Marke `Mardu`
- `canonical`: `/brand`

## Pflegehinweis

- Änderungen an Copy, Section-Reihenfolge oder Nutzungsregeln erfolgen zentral in `@mardu/sections`.
- App-spezifisch bleiben auf `mardu.de` nur Route-Metadaten, Navigation und Shell-Einbindung.
- Nach dem Klonen des Website-Repositories muss das Submodule mit
  `git submodule update --init --recursive` initialisiert werden.
- Branding-Aktualisierungen erfolgen durch ein bewusstes Update des im Hauptrepository fixierten
  Submodule-Commits.
