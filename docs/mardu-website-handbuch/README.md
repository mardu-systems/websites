# Mardu Website-Handbuch

**Stand:** 1. August 2026<br>
**Status:** Arbeitsgrundlage für die neue `mardu.de`<br>
**Zweck:** gemeinsame Referenz für Marke, Design, Inhalte und technische Umsetzung

## 1. Rolle dieses Handbuchs

Dieses Verzeichnis zerlegt die umfangreiche strategische Neukonzeption in klar getrennte Arbeitsdokumente. Dadurch können Brand, Design, Redaktion und Entwicklung ihre Entscheidungen pflegen, ohne dieselbe Information an mehreren Stellen unterschiedlich zu formulieren.

Das Handbuch beschreibt einen neuen Auftritt auf Basis der vorhandenen technischen Strukturen. Es übernimmt nicht automatisch das aktuelle MAY-STUDIO-Design und macht aus Ideen oder Pilotfunktionen keine zugesagten Produktleistungen.

## 2. Dokumente

| Dokument                                                                     | Verantwortungsbereich                                                             | Wann es verwendet wird                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [01 – Marke und Positionierung](./01-marke-und-positionierung.md)            | Markenidee, Kategorie, Zielgruppen, Nutzenpfeiler, Ton und Slogansystem           | bei Hero, Kampagnen, Pitches und neuen Lösungsbereichen          |
| [02 – Design Reference](./02-design-reference.md)                            | visuelle Sprache, Farbe, Typografie, Raster, Bilder, UI, Motion und Accessibility | bei Design, Komponentenbau und visueller QA                      |
| [03 – Inhalte und Copy](./03-inhalte-und-copy.md)                            | Inhaltslogik, Schreibregeln, Seitentexte, CTA- und Content-Strategie              | bei Redaktion, CMS-Inhalten, Metadaten und Landingpages          |
| [04 – Informationsarchitektur](./04-informationsarchitektur.md)              | Seitenbaum, Navigation, URLs, Redirects und interne Verlinkung                    | bei Routing, Navigation, Sitemap und SEO-Struktur                |
| [05 – Seiten- und Komponentenmuster](./05-seiten-und-komponentenmuster.md)   | Aufbau der wichtigsten Seiten und wiederverwendbaren Inhaltsmodule                | bei Wireframes, Komponenten und Seitenerstellung                 |
| [06 – Claims, Reifegrade und Nachweise](./06-claims-reifegrade-nachweise.md) | Aussagegrenzen, Produktstatus, Belegarten und Freigabeprozess                     | vor jeder öffentlichen Produkt-, Sicherheits- oder Nutzenaussage |
| [07 – Technische Umsetzung](./07-technische-umsetzung.md)                    | vorhandene Architektur, wiederzuverwendende Pakete, Migration und Checks          | bei Planung und Implementierung im Monorepo                      |
| [08 – Assets und Content-Produktion](./08-assets-und-content-produktion.md)  | Fotografie, UI-Aufnahmen, Diagramme, Cases, Dateiorganisation und Rechte          | bei Foto-, Video-, UI- und Case-Produktion                       |
| [09 – Visuelle Referenzen](./09-visuelle-referenzen.md)                      | kommentierte Screenshots ähnlicher Anbieter und daraus abgeleitete Entscheidungen | bei Moodboards, Wireframes, Reviews und visueller Abgrenzung     |
| [10 – Startseite: Inhalte und Texte](./10-startseite-inhalte-und-texte.md)   | vollständige Arbeitscopy, CTAs, FAQ, Metadaten und interne Redaktionshinweise     | bei Wireframe, Content-Freigabe und Umsetzung der Startseite     |

## 3. Quellenhierarchie

Wenn Dokumente widersprechen, gilt diese Reihenfolge:

1. [Claims, Reifegrade und Nachweise](./06-claims-reifegrade-nachweise.md) entscheidet, was öffentlich als Ist-Leistung gesagt werden darf.
2. [Marke und Positionierung](./01-marke-und-positionierung.md) entscheidet über Kategorie, Nutzenhierarchie, Ton und Slogansystem.
3. [Informationsarchitektur](./04-informationsarchitektur.md) entscheidet über kanonische Seiten und URLs.
4. [Design Reference](./02-design-reference.md) und [Seiten- und Komponentenmuster](./05-seiten-und-komponentenmuster.md) entscheiden über die visuelle und strukturelle Umsetzung.
5. [Technische Umsetzung](./07-technische-umsetzung.md) entscheidet, wie diese Vorgaben in den vorhandenen Projektmustern abgebildet werden.

Die frühere [strategische Neukonzeption](../mardu-website-neukonzeption-2026-07-31.md) bleibt als ausführlicher Recherche- und Ideenbestand erhalten. Sie ist keine normative Design- oder Claim-Quelle mehr. Dasselbe gilt für die vorhandenen MAY-STUDIO-PDFs und die ältere `redesign-reference.md`.

Die [visuellen Referenzen](./09-visuelle-referenzen.md) sind ebenfalls keine Designvorlage. Sie dokumentieren einzelne gute Muster und die jeweils daraus abgeleitete Mardu-Entscheidung. Fremde Gestaltung, Texte, Marken und Screenshots dürfen nicht als Mardu-Assets veröffentlicht werden.

## 4. Leitentscheidungen

- `Mardu` wird als eine Marke für professionell betriebene Werkstätten, Lehrumgebungen und verwandte technische Räume aufgebaut.
- Die Maschinenfreigabe führt die Positionierung; Türzugang und Plattform erklären die zusammenhängende Betriebslogik.
- Die Marke steht für kontrollierte Ermöglichung, nicht für Kontrolle als Selbstzweck.
- Inhalte beginnen mit dem betrieblichen Problem und der gewünschten Wirkung, nicht mit Produktnamen oder Technik.
- Echte Installationen, echte UI und klar benannte Grenzen ersetzen dekorative Behauptungen.
- Verfügbar, Pilot und Zukunft werden sichtbar getrennt.
- Versicherungsersparnis, Unfallverhinderung, Rechts- oder Aufsichtssicherheit werden nicht versprochen.
- Energie, Auslastung und Anomalien bleiben bis zur Validierung Pilot- oder Zukunftsthemen.
- Der primäre nächste Schritt ist ein fachliches Standortgespräch, kein Blindkauf und kein komplexer Selbstkonfigurator.

## 5. Arbeitsweise

### Neue Seite

1. Seitenrolle in der Informationsarchitektur prüfen.
2. erlaubte Claims und Reifegrade prüfen.
3. passendes Seitenmuster wählen.
4. Copy nach den Inhaltsregeln schreiben.
5. reale Belege und Assets zuordnen.
6. mit den bestehenden technischen Paketen umsetzen.
7. Inhalt, Accessibility, Links und Darstellung prüfen.

### Neuer Claim

1. fachliche Aussage definieren,
2. Status und Geltungsbereich festlegen,
3. Beleg verlinken,
4. Verantwortlichen und Prüfdatum eintragen,
5. erst danach in Seiten oder Metadaten übernehmen.

### Neues Designmuster

Ein neues Muster ist nur sinnvoll, wenn ein bestehendes Muster den Inhalt nicht verständlich darstellen kann. Es braucht einen dokumentierten Zweck, Zustände, responsives Verhalten und Accessibility-Anforderungen.

## 6. Nicht Bestandteil dieses Handbuchs

- verbindliche Produkt-Roadmap,
- Rechtsberatung oder Zertifizierungszusage,
- endgültige Preisentscheidung,
- finale Auswahl eines noch nicht visuell getesteten Slogans,
- Freigabe von Partner-, Hochschul- oder Kundenlogos,
- Ersatz für technische Produkt- und API-Dokumentation.

## 7. Pflege

Jedes Dokument enthält seinen Geltungsbereich. Änderungen an Produktstatus oder Claim-Grenzen müssen zuerst im Claim-Dokument erfolgen. Änderungen an URLs werden zuerst in der Informationsarchitektur dokumentiert. Öffentliche API- oder DTO-Änderungen werden zusätzlich über die vorhandenen API- und Contract-Dokumente des Repositories beschrieben.
