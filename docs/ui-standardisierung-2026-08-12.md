# UI-Standardisierung 2026-08-12

## Zielbild

Die öffentlichen Mardu-Seiten sollen wie ein zusammenhängendes System wirken. Wiederkehrende Muster werden an genau einem Ort gepflegt, während Apps weiterhin Inhalte, Routing, Metadaten und API-Anbindung besitzen.

## Prüfumfang

Geprüft wurden die öffentlichen Routen von `apps/mardu-de` und `apps/platform` in Desktop-, Tablet- und Mobilansicht. Der zunächst blockierte Platform-Entwicklungsprozess wurde kontrolliert neu gestartet; alle öffentlichen Platform-Routen wurden anschließend ebenfalls visuell geprüft. Payload-Admin-Routen sind bewusst nicht Teil des visuellen Redesigns.

### Routenfamilien

| Familie       | Routen                                                                    | Kanonisches Muster                                                                           |
| ------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Marke         | `/`, `/about`, `/platform`, `/brand`                                      | app-eigene Story-Seiten auf gemeinsamen Typografie-, Header-, Footer- und Section-Primitives |
| Katalog       | `/products`, `/products/[slug]`                                           | `@mardu/catalog-ui`                                                                          |
| Lösungen      | `/solutions`, `/solutions/[slug]`                                         | `@mardu/solutions-ui` plus app-eigene Detailkomposition                                      |
| Integrationen | `/integrations`, `/integrations/[slug]`                                   | `@mardu/integrations-ui` und gemeinsame Aktionskomponenten                                   |
| Wissen        | `/blog`, `/blog/[slug]`, `/roadmap`, `/whitepaper`                        | `EditorialPageHero` plus fachlich passende Shared Sections                                   |
| Lead-Flows    | `/contact`, `/newsletter`, Newsletter-Statusrouten, `/whitepaper/success` | `ContactPageSection`, gemeinsame Form-Primitives und `EditorialStatusPage`                   |
| Service       | `/privacy`, `/publisher`, `/fotos`, `not-found`, `error`                  | Legal-, Medien- oder Statusmuster mit genau einem `main`-Landmark                            |
| Werkzeug      | `/configurator`                                                           | app-eigener Wizard auf gemeinsamen Form-, Button- und Typografie-Primitives                  |

## Kanonische Zuständigkeiten

| Verantwortung                                                               | Eigentümer               |
| --------------------------------------------------------------------------- | ------------------------ |
| Button, EditorialActionButton, Eingaben, Dialoge, Typografie und Seitenkopf | `@mardu/ui`              |
| Header, Footer und Site Shell                                               | `@mardu/layout`          |
| FAQ, CTA, Kontaktseite, Statusseiten und wiederkehrende Marketingabschnitte | `@mardu/sections`        |
| Produktdarstellung                                                          | `@mardu/catalog-ui`      |
| Integrationsdarstellung                                                     | `@mardu/integrations-ui` |
| Lösungsdarstellung                                                          | `@mardu/solutions-ui`    |
| Seitennahe Copy, Metadaten, Route Handler und fachliche Datenabbildung      | konsumierende App        |

## Festgestellte Abweichungen

1. Newsletter, Whitepaper, Fotos und Brand Assets hatten eigene Hero-Implementierungen trotz vorhandenem `EditorialPageHero`.
2. Newsletter- und Whitepaper-Ergebnisse verwendeten unterschiedliche Karten-, Radius-, Schatten- und Buttonsprachen.
3. `/solutions` erzeugte zwei verschachtelte `main`-Landmarks; die 404-Seite hatte keinen `main`-Landmark.
4. Integrationsdetails bauten Aktionen mit freien `a`-/`Link`-Styles statt mit dem gemeinsamen `Button`.
5. Der dynamische Integrationstitel ergänzte den Markennamen, obwohl das Root-Layout bereits eine Titelvorlage besitzt.
6. Der Brand-Hero konnte auf schmalen Viewports durch die Mindestbreite eines langen Wortes horizontal überlaufen.
7. Der Konfigurator enthielt sichtbare deutsche ASCII-Ersatzschreibweisen und lud das erste Schrittbild nicht priorisiert.
8. Mehrere große Dateien und ungenutzte, zwischen Apps duplizierte Legacy-Komponenten erschweren die Wartung.

## Priorisierte Umsetzung

### P0 – Struktur und Verträge

- genau ein `main`-Landmark pro Route
- Metadaten ohne doppelte Markensuffixe
- Whitepaper-Anfragen über den dokumentierten Newsletter-Vertrag mit `role: 'whitepaper'`
- Ergebniszustände über `EditorialStatusPage`

### P1 – Wiederkehrende Seitenmuster

- `EditorialPageHero` für redaktionelle Indexseiten
- `EditorialActionButton` für prominente redaktionelle Navigation und Marketing-CTAs
- `Button` für Form-, Dialog-, Filter- und kompakte Produktaktionen
- `Faq` beziehungsweise `EditorialFaqSection` statt lokaler Accordion-Varianten
- gemeinsame Section-Abstände, Border-Tokens und Container

### P2 – Wartbarkeit

- ungenutzte doppelte Legacy-Komponenten entfernen
- große Layout- und Formular-Dateien nach klaren internen Verantwortungen aufteilen
- Varianten nur dort behalten, wo Inhalt oder Interaktion tatsächlich abweichen

## Bewusste Varianten

- Der Startseiten-Hero bleibt eine eigenständige Conversion-Komposition mit rotierendem Zugangspunkt und großem Maschinenmotiv.
- Der Konfigurator bleibt ein app-eigener, zustandsbehafteter Wizard; nur seine Primitives und Statusdarstellung werden vereinheitlicht.
- Legal-Seiten behalten eine dichtere Lesetypografie als Marketingseiten.
- Payload Admin bleibt funktional und visuell vom öffentlichen Marketingauftritt getrennt.

## Umgesetzte Konsolidierung

- Newsletter, Whitepaper, Fotos und Brand Assets nutzen den gemeinsamen `EditorialPageHero`.
- Newsletter- und Whitepaper-Ergebnisse basieren auf `EditorialStatusPage`.
- `EditorialActionButton` kapselt die horizontale Linie, den runden Icon-Träger, Hover-Bewegung, Hell-/Dunkel-Kontrast und Primär-/Sekundär-Priorität an einer Stelle.
- Header, Footer, 404, Statusseiten, Heroes, CTA-Sektionen, Inhalts-CTAs und redaktionelle Conversion-Formulare verwenden diese gemeinsame Aktionskomponente statt eigener Klassenketten.
- Der gemeinsame `Button` besitzt weiterhin mit `xl` eine dokumentierte Touch-Variante für funktionale Aktionen, die bewusst nicht wie ein redaktioneller Navigations-CTA aussehen sollen.
- Der redaktionelle `Overline`-Stil ist eine gemeinsame Typografie-Variante statt mehrfach kopierter Klassenketten.
- Header, Footer, CTA-Dialog, Kontaktformular, Brand Assets, Whitepaper, Landing-Hero, redaktionelle Benefit-Karten, Roadmap und Konfigurator wurden nach klaren Verantwortungen zerlegt.
- Die Telefonnummer-Normalisierung liegt einmal in `@mardu/lead-core/phone` und wird von beiden Apps verwendet.
- Nicht referenzierte, zwischen Apps duplizierte Legacy-Buttons, Accordions, Whitepaper-Teaser, Icon-Sätze, Produkt-Showcases und FAQ-Daten wurden entfernt.

## Bewusste Größen-Ausnahmen

Die 300-Zeilen-Richtlinie gilt für aktiv gepflegte UI-Kompositionen. Größer bleiben Dateien, deren Teilung die Orientierung verschlechtern oder Generator-Verträge brechen würde:

- generierte Payload- und Twenty-Typen beziehungsweise API-Clients
- historische Payload-Migrationen
- Katalog- und Seed-Daten
- mathematische WebGL-/Halftone-Renderer
- zusammenhängende, rein deklarative Homepage-Copy in `homepage-content.ts`
- übernommene UI-Primitives wie Sidebar, Chart und Combobox

## Offene fachliche Abhängigkeit

Der Whitepaper-Lead verwendet nun den dokumentierten Newsletter-Endpunkt mit `role: 'whitepaper'`. Für den anschließenden Download existieren im Repository jedoch weder eine Route `/api/whitepaper/download` noch ein PDF-Asset beziehungsweise eine aktivierte Success-Konfiguration. Diese fachliche Bereitstellung wurde nicht erfunden und bleibt vor einer Veröffentlichung des Flows zu ergänzen.

## Verifikation

- Baseline: `bun run type-check`, `bun run lint` und `bun test` waren vor der Migration erfolgreich; Lint meldete ausschließlich bestehende Warnungen in historischen Payload-Migrationen.
- Nach jeder Konsolidierungsrunde wurden Typecheck und betroffene Tests ausgeführt.
- Die visuellen Prüfungen verwenden 390 × 844, 768 × 1024 und 1440 × 1000 Pixel, kontrollieren Landmarken, Überschriften, horizontales Überlaufen, Header-/Menüzustände und zentrale Formulare.
- Abschluss: `bun run lint`, `bun run type-check`, `bun test` (25 Tests) und `bun run build` sind erfolgreich. Die 20 Lint-Warnungen liegen unverändert ausschließlich in historischen Payload-Migrationen.
- Der Platform-Build verwendet die bereits konfigurierte Turbopack-Pipeline. Der vorherige Webpack-Build brach unter Next.js 16.3 intern ab, während derselbe Code mit Turbopack vollständig kompiliert, typgeprüft und prerendered wird.
- React Doctor meldet noch sieben Hinweise: drei Exporte in Komponentendateien, zwei Fehlalarme für Base-UI-`render`-Links und zwei mögliche Lazy-Motion-Optimierungen. Es bestehen keine daraus abgeleiteten Laufzeit- oder Buildfehler.
- 20 öffentliche Mardu-Routen wurden in allen drei Viewports geprüft. Nach abgeschlossener Datenladung besitzt jede Route genau einen `main`-Landmark, eine Hauptüberschrift und keinen horizontalen Überlauf. Die öffentlichen Platform-Routen wurden ebenfalls in allen drei Viewports geprüft.
