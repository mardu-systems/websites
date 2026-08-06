# Design-Konsistenz-Audit: mardu.de

Stand: 6. August 2026

## Ziel und Referenzrahmen

Dieses Audit prüft die öffentliche Mardu-Website als zusammenhängendes System. Als visuelle Referenz gelten die bereits überarbeiteten Seiten und Muster der Startseite, Lösungsseite, Kontaktseite, Roadmap und Markenressourcen. Entscheidend ist nicht, dass jede Seite identisch aussieht, sondern dass Raster, Typografie, Bedienlogik und wiederkehrende Bausteine eindeutig zur gleichen Marke gehören.

Vor den Korrekturen werden die folgenden Prüfkriterien festgelegt. Sie bleiben während des Audits unverändert, damit Befunde nicht nachträglich an die Umsetzung angepasst werden.

## Verbindliche Prüfstandards

### 1. Seitenrahmen und Raster

- Der globale Seitenhintergrund ist `#F4F4F4`, sofern ein Abschnitt nicht bewusst als dunkle oder farbige Kontrastfläche gestaltet ist.
- Öffentliche Seiten verwenden den gemeinsamen `SiteShell` mit identischem Header und Footer.
- Inhaltsbreite, horizontale Innenabstände und Spaltenanschlüsse folgen dem vorhandenen `mardu-container` oder einem dokumentierten vollbreiten Editorial-Raster.
- Abschnittsgrenzen verwenden feine, einfache Linien. Doppelte Rahmen, zufällige Kartenradien und uneinheitliche Schatten sind zu vermeiden.
- Abschnitte besitzen einen erkennbaren vertikalen Rhythmus. Einzelne Seiten dürfen dichter sein, aber nicht ohne nachvollziehbare Hierarchie.

### 2. Typografie

- Fließtext verwendet IBM Plex Sans und skaliert responsiv von etwa 16 Pixel auf Mobilgeräten bis 18 Pixel auf großen Viewports.
- Überschriften verwenden Aktiv Grotesk mit leichtem bis normalem Gewicht. Mehrzeilige Überschriften werden nicht vollständig in Versalien gesetzt.
- Die Serifenschrift dient ausschließlich als gezielter Markenakzent innerhalb ausgewählter Headlines, nicht als eigenständige zweite Überschriftensprache.
- Kicker, Kapitelnummern und technische Labels verwenden ein einheitliches, kleines Format. Schreibweise, Klammern und Laufweite bleiben seitenübergreifend gleich.
- Pro Seite existiert genau eine inhaltliche `h1`; die weitere Überschriftenhierarchie bleibt lückenlos.

### 3. Wiederkehrende Komponenten

- Header, mobiles Menü, Footer, FAQ, CTA-Zeilen, Editorial-Buttons und Formularfelder werden aus gemeinsamen Komponenten aufgebaut.
- Gleichartige Aktionen sehen gleich aus. Primäre Beratung, textbasierte Sprunglinks und externe Links dürfen unterschiedliche Varianten haben, innerhalb ihrer Variante aber keine Seiten-Sonderfälle.
- Pfeile drehen bei Hover und Tastaturfokus konsistent von diagonal nach rechts; bei reduzierter Bewegung entfällt die Animation.
- FAQ-Listen folgen demselben Raster, denselben Abständen und derselben Tastaturbedienung wie auf der Startseite.

### 4. Responsive Verhalten

Geprüfte Breiten: 320, 390, 768, 1024 und 1440 Pixel. Zusätzlich wird bei 200 Prozent Browser-Zoom auf Reflow geprüft.

- Es entsteht kein horizontaler Seitenüberlauf.
- Feste und sticky Elemente verdecken weder Überschriften noch Formulare, Dialoge oder den letzten Seiteninhalt.
- Das mobile Menü besitzt eine eigene scrollbare Fläche, sperrt den Hintergrund nur im geöffneten Zustand und hält Schließen sowie Hauptaktion erreichbar.
- Sprungziele berücksichtigen die aktuelle Headerhöhe.
- Zweispaltige Editorial-Layouts werden auf Mobilgeräten in einer nachvollziehbaren Reihenfolge gestapelt.
- Text, Buttons und Tabellen dürfen nicht abgeschnitten werden; lange deutsche Begriffe müssen sicher umbrechen.

### 5. Bedienung und Barrierefreiheit

- Alle interaktiven Elemente sind per Tastatur erreichbar und besitzen einen sichtbaren Fokuszustand.
- Touch-Ziele sind mindestens 44 × 44 CSS-Pixel groß oder besitzen eine gleichwertige großzügige Klickfläche.
- Menüs, Dialoge, Register, Akkordeons und Filter verwenden passende Rollen und Zustände (`aria-expanded`, `aria-current`, `aria-selected`, `aria-pressed`).
- Bedeutung wird nicht ausschließlich über Farbe vermittelt. Statusfarben erhalten einen zugänglichen Namen, sichtbare Dopplungen können entfallen.
- `prefers-reduced-motion` wird für Scrollen, Bildwechsel und Pfeilanimationen respektiert.

### 6. Medien und Inhalte

- Bilder besitzen reservierte Seitenverhältnisse, sinnvolle Alternativtexte und einen kontrollierten Bildausschnitt.
- Fremde Bilder werden mit einer dezenten, dauerhaft sichtbaren Quellenangabe versehen.
- Leere Produktionsplatzhalter erscheinen nicht auf veröffentlichten Seiten.
- Claims, Produktnamen und Tonalität verwenden konsistent die Dachmarke „Mardu“.
- Formulare zeigen Pflichtfelder, Einwilligung, Fehler- und Erfolgszustände verständlich und im gleichen visuellen System.

### 7. Technische Abnahme

- Keine Fehler im Browserprotokoll auf den geprüften Routen.
- Kein Layoutsprung durch fehlende Bildgrößen oder nachträglich geladene Navigation.
- Lint, Typecheck und Build laufen für `apps/mardu-de`; Änderungen an gemeinsamen Paketen werden zusätzlich im Workspace geprüft.
- React-Komponenten werden abschließend mit React Doctor und den bestehenden React-Best-Practices geprüft.

## Seitengruppen im Audit

| Gruppe | Routen / Muster | Status |
| --- | --- | --- |
| Einstieg | `/` | ausstehend |
| Produkte | `/products`, `/products/[slug]` | ausstehend |
| Lösungen | `/solutions`, `/solutions/[slug]` | ausstehend |
| Integrationen | `/integrations`, `/integrations/[slug]` | ausstehend |
| Wissen | `/blog`, `/blog/[slug]`, `/whitepaper`, `/whitepaper/success`, `/roadmap` | ausstehend |
| Kontakt und Leads | `/contact`, `/configurator`, `/newsletter`, `/newsletter/anmeldung`, `/newsletter/abmeldung` | ausstehend |
| Unternehmen und Medien | `/brand`, `/fotos` | ausstehend |
| Rechtliches | `/privacy`, `/publisher` | ausstehend |
| Bestehende ältere Vertiefung | `/platform` | ausstehend |

## Befunde

Die Befunde werden nach dem Baseline-Durchlauf ergänzt. Jeder Eintrag erhält eine Priorität, eine konkrete Route beziehungsweise Komponente, einen Screenshot-Beleg und einen Umsetzungsstatus.

| ID | Priorität | Bereich | Befund | Beleg | Status |
| --- | --- | --- | --- | --- | --- |

## Änderungen und Verifikation

Dieser Abschnitt wird nach der Korrekturphase mit den wiederverwendeten Komponenten, den ausgeführten Prüfungen und verbleibenden Risiken ergänzt.
