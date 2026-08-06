# Design QA – Kontaktseite und Startseiten-Hero

## Vergleichsgrundlage

- Visuelle Quelle Kontaktformular: `/var/folders/rn/v1p_nhxx1871gd0_1sbxp8zh0000gn/T/codex-clipboard-020abea3-fb33-4678-bd8a-4a61fdaee209.png`
- Ergänzende visuelle Quelle Kontaktinformationen: `/Users/lucaschoeneberg/Desktop/Bildschirmfoto 2026-08-04 um 14.27.29.png`
- Browser-Aufnahme Umsetzung: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/contact-page-editorial-1336x1261.png`
- Fokussierter Vergleich: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/contact-form-comparison.png`
- Hero-Aufnahme: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/homepage-hero-expanded-1265x720.png`
- Route und Zustand: `/contact`, leeres Formular; `/`, erstes Wort der Hero-Rotation
- Browser-Viewport Kontakt: 1336 × 1261 CSS-Pixel; Aufnahme: 1336 × 1247 Pixel; Device-Pixel-Ratio 1
- Browser-Viewport Hero: 1265 × 720 CSS-Pixel; Aufnahme: 1265 × 712 Pixel; Device-Pixel-Ratio 1
- Quelle Kontaktformular: 494 × 404 Pixel. Für den fokussierten Vergleich wurde sie proportional auf 600 Pixel Breite skaliert. Die Implementierung wurde aus der Browser-Aufnahme mit identischer Darstellungsdichte gegenübergestellt.

## Vollansicht

Die Browser-Aufnahme bestätigt die gewünschte Zweispalten-Komposition: nummerierte Kontaktinformationen links, nummeriertes Formular rechts. Die Startseitenaufnahme bestätigt eine deutlich größere Hero-Bühne mit 897 Pixel Abschnittshöhe und 672 Pixel Bildhöhe am geprüften Viewport. Es tritt auf beiden Routen kein horizontaler Überlauf auf.

## Fokussierter Vergleich

Der kombinierte Vergleich zeigt Quelle und Umsetzung nebeneinander. Übernommen wurden die kleine nummerierte Abschnittsüberschrift, flache Eingaben mit Haarlinien, die klare Trennung von Nachricht, Einwilligung und Versand sowie der ruhige Weißraum. Die vorhandene zweispaltige Felderanordnung, sichtbare Labels, Newsletter-Option und der etablierte Mardu-Button bleiben bewusst erhalten, weil sie Teil der bestehenden Produktfunktion und Zugänglichkeit sind.

## Pflichtflächen

- Schrift und Typografie: Aktiv Grotesk/IBM Plex bleiben konsistent mit der Website. Nummerierung, Versalien, Gewichte und Zeilenabstände entsprechen der bestehenden Editorial-Systematik. Keine abgeschnittenen Überschriften.
- Abstände und Layout-Rhythmus: Abschnitte besitzen einheitliche 40-Pixel-Vertikalabstände und Haarlinien. Formulargruppen sind klar getrennt. Der Hero erhält mehr Raum, ohne Text oder Bild unverhältnismäßig zu skalieren.
- Farben und Tokens: Papierhintergrund, dunkle Typografie und dezente schwarze Haarlinien verwenden die bestehenden Mardu-Tokens. Kontrast bleibt ausreichend.
- Bildqualität und Assets: Bestehendes Hero-Bild bleibt unverändert scharf und proportional beschnitten. Für die Kontaktseite waren keine neuen Bildassets erforderlich.
- Copy und Inhalt: Adresse, Anfahrt, Beratung und Kontaktformular sind korrekt nummeriert. Bestehende Pflichtfelder, Datenschutztexte und Hilfetexte bleiben erhalten.

## Interaktionen und Zugänglichkeit

- Leeres Absenden fokussiert das Namensfeld und zeigt die vorhandenen Feldfehler für Name und E-Mail.
- Formularfelder behalten sichtbare Labels, Autocomplete-Attribute, passende Eingabetypen und Tastaturbedienbarkeit.
- Newsletter- und DSGVO-Einwilligung bleiben getrennt und semantisch als Checkboxen erhalten.
- Versandlogik, Payload und API-Route wurden nicht verändert.
- Browser-Konsole: ausschließlich die bereits bekannte lokale Warnung zum fehlenden reCAPTCHA-Site-Key; keine neue Laufzeitfehlermeldung durch diese Änderung.

## Findings

Keine offenen P0-, P1- oder P2-Abweichungen. Die Unterschiede zur Formularreferenz sind bewusste Produktentscheidungen: sichtbare Labels statt Placeholder-only, zweispaltige Desktop-Dichte, optionale Telefonnummer und die vorhandene Newsletter-Einwilligung.

## Vergleichshistorie

- Ausgangszustand: Kontaktinformationen ohne nummerierte Editorial-Überschriften; Formular als umrandete Karte ohne Gruppenrhythmus; Hero sichtbar kompakter.
- Umsetzung: additive Editorial-Variante, nummerierte Kontaktabschnitte, Haarlinien zwischen Formulargruppen und vergrößerte Hero-Bühne.
- Nachkontrolle: keine Überläufe, korrekte Überschriftenhierarchie, funktionierende Validierungszustände und visuell konsistente Trennlinien.

## Follow-up Polish

- P3: Falls eine noch engere Annäherung an die Referenz gewünscht ist, könnte die Formularspalte auf sehr breiten Bildschirmen einspaltig werden. Die aktuelle Zweispaltenvariante nutzt den vorhandenen Raum besser und wurde deshalb beibehalten.

final result: passed

---

# Design QA – Roadmap

## Vergleichsgrundlage

- Visuelle Quelle: `/var/folders/rn/v1p_nhxx1871gd0_1sbxp8zh0000gn/T/codex-clipboard-55c82ca2-d539-4371-aa68-2d5fe0e77da4.png`
- Browser-Aufnahme Desktop: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-implementation-1440x692-v2.png`
- Browser-Aufnahme Mobile: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-implementation-mobile-390x844.png`
- Normalisierter Vollvergleich: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-comparison-side-by-side-v2.png`
- Fokussierter Vergleich: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-comparison-focus-v2.png`
- Quelle: 2474 × 1186 Pixel. Für den Vergleich proportional auf 1440 × 692 Pixel normalisiert.
- Desktop-Viewport: 1440 × 692 CSS-Pixel; Browser-Aufnahme 1425 × 685 Pixel bei Device-Pixel-Ratio 1.
- Mobile-Viewport: 390 × 844 CSS-Pixel; Browser-Aufnahme 375 × 812 Pixel bei Device-Pixel-Ratio 1.
- Zustand: `/roadmap`, Filter „Alle“, leere Suche; zusätzliche Interaktionstests für Statusfilter, Suche und Zurücksetzen.

## Vollansicht

Die Umsetzung übernimmt die technische MAY-Studio-Komposition aus der Vorlage: schmale globale Navigation, großzügige Einleitung, rechts ausgerichtete Suche, feine Haarlinien und ein streng nummeriertes Kartenraster. Bewusst abweichend bleibt die Roadmap in gemischter Schreibweise und innerhalb der etablierten Mardu-Typografie. Damit folgt sie den bereits festgelegten Regeln gegen mehrzeilige Versalüberschriften und begrenzt die größte Schrift auf 60 Pixel.

## Fokussierter Vergleich

Der fokussierte Vergleich bestätigt die gleiche Informationsfolge und Flächenbalance. Die Vorlage zeigt sechs sehr schmale Spalten; die Umsetzung verwendet maximal vier Spalten, damit Titel und Beschreibungen ohne zu kurze Zeilen lesbar bleiben. Suche und Statuslegende sind nicht nur dekorativ, sondern vollständig bedienbare Filter. Der Status wird immer zusätzlich als Text ausgegeben und nicht nur über Farbe vermittelt.

## Pflichtflächen

- Schrift und Typografie: Aktiv Grotesk für Überschriften, IBM Plex Sans für Fließtext und JetBrains Mono für technische Labels. Displaygröße maximal 60 Pixel, Fließtext 16 bis 18 Pixel, Status- und Indextexte mindestens 12 Pixel.
- Abstände und Layout-Rhythmus: konsistente 8-Pixel-basierte Abstände, klar getrennte Hero-, Filter- und Kartenbereiche, vier Spalten auf großen Viewports, zwei auf Tablet und eine auf Mobile.
- Farben und Tokens: Papierhintergrund, Mardu-Violett und dunkle Typografie verwenden die vorhandenen Marken-Tokens. Grün, Violett und Orange werden nur als sekundäre Statussignale eingesetzt.
- Bildqualität und Assets: Die visuelle Quelle enthält keine inhaltlichen Bildassets. Such- und Pfeilsymbole stammen aus der bereits verwendeten Icon-Bibliothek; keine Platzhalter oder künstlichen Illustrationen.
- Copy und Inhalt: Nutzenorientierte, kurze Roadmap-Texte ersetzen Lorem ipsum. Die Seite kommuniziert Entwicklungsrichtung statt fester Lieferzusage und enthält einen entsprechenden Hinweis.

## Interaktionen und Zugänglichkeit

- Statusfilter reduziert die Karten korrekt; „In Arbeit“ zeigt genau ein Entwicklungsfeld.
- Suche und Statusfilter lassen sich kombinieren; ein leerer Trefferzustand wird verständlich ausgegeben.
- „Filter zurücksetzen“ stellt alle acht Fallback-Einträge wieder her.
- `aria-pressed`, Live-Region für die Trefferanzahl, sichtbare Fokuszustände und 44-Pixel-Mindesthöhe sind vorhanden.
- Bei 390 Pixel Breite tritt kein horizontaler Überlauf auf.
- Browser-Konsole: keine Fehler.

## Findings und Vergleichshistorie

- Erster Vergleich: Die Überschrift war mit bis zu 92 Pixeln zu groß und verschob den Kartenbeginn unter die erste Desktop-Ansicht. Einstufung P2.
- Korrektur: Displaygröße auf maximal 60 Pixel begrenzt, Laufweite und Zeilenhöhe angepasst.
- Nachkontrolle: Hero, Suche, Statusfilter und Beginn des Kartenrasters sind bei 1440 × 692 gleichzeitig sichtbar. Keine offenen P0-, P1- oder P2-Abweichungen.

## Follow-up Polish

- P3: Sobald genug veröffentlichte CMS-Einträge mit den Statuswerten `done` und `beta` vorhanden sind, erscheinen auch die aktuell leeren Statusgruppen mit realen Inhalten.

## Iteration – kompaktere Roadmap und Funktionswunsch

- Zusätzliche visuelle Quelle für die Kartencodierung: `/var/folders/rn/v1p_nhxx1871gd0_1sbxp8zh0000gn/T/codex-clipboard-75773e95-0930-45df-bfad-88f2b67f2f1b.png`.
- Aktuelle Desktop-Aufnahme: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-compact-desktop.png`.
- Aktuelle Mobile-Aufnahme: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-compact-mobile.png`.
- Die Statusleiste ist ab 1024 Pixeln einzeilig und verwendet kleinere, weiterhin mindestens 44 Pixel hohe Bedienflächen.
- Karten wurden in Höhe und Innenabständen verdichtet. Der Status erscheint nicht mehr als sichtbare Zusatzzeile, sondern als farbcodierter Pfeil direkt neben dem Titel. Der vollständige Status bleibt über `aria-label` für assistive Technologien verfügbar; die sichtbare Filterlegende erklärt die Farbzuordnung.
- Der Hinweisbereich enthält einen eigenständigen Dialog für Funktionswünsche und einen getrennten Link für Projekt- oder Pilotgespräche.
- Der Dialog verwendet das bestehende Kontaktformular, die vorhandene `/api/contact`-Route und deren Validierungs-, Datenschutz- und Erfolgszustände. Es wurden keine neuen API- oder DTO-Verträge eingeführt.
- Sichtprüfung bei 1280 × 720 und 390 × 844 Pixeln: kein horizontaler Überlauf, kompakte Filter- und Kartenstruktur sowie vollständig scrollbarer Dialog auf Mobile.
- Interaktion geprüft: Dialog öffnet fokussiert, lässt sich über die lokalisierte Schließen-Schaltfläche beenden und übermittelt über den bestehenden Kontaktweg.
- Browser-Konsole: keine Laufzeitfehler; lediglich die bereits bekannte lokale Warnung zum fehlenden reCAPTCHA-Site-Key und blockierte lokale Vercel-Analytics-Skripte.

## Iteration – pillenförmige Roadmap-Suche

- Visuelle Quelle: `/var/folders/rn/v1p_nhxx1871gd0_1sbxp8zh0000gn/T/codex-clipboard-fc79a884-fe73-49c3-adad-310eede920dc.png`.
- Mobile Implementierungsaufnahme: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-search-mobile.png`.
- Übernommen wurden die kompakte Pillenform, die ruhige graue Fläche und der klar abgesetzte kreisrunde Suchauslöser. Das technische `[SUCHE]`-Label und die Mardu-Typografie bleiben erhalten.
- Der Suchauslöser ist eine echte Form-Aktion; die Ergebnisliste wird weiterhin live gefiltert. Suche nach „Energie“ zeigt genau den Eintrag „Energie-Monitoring“.
- Die Suchfläche ist mobil 335 Pixel breit, erzeugt bei 390 Pixel Viewport keinen horizontalen Überlauf und behält eine 44-Pixel-Bedienhöhe.
- Frischer Browserlauf nach Neustart des Entwicklungsservers: keine Hydration- oder sonstigen Laufzeitfehler.

## Iteration – reduzierte Roadmap-Karten

- Desktop-Aufnahme: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-cards-clean-desktop.png`.
- Mobile-Aufnahme: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/roadmap-cards-clean-mobile.png`.
- Die sichtbaren laufenden Nummern und Kategorien wie „Software“, „Hardware“, „Plattform“ oder „Integrationen“ wurden aus allen Roadmap-Karten entfernt.
- Titel und Beschreibung beginnen ohne leere Metadatenfläche direkt am Kartenanfang; die Mindesthöhe wurde passend zur reduzierten Informationsmenge verdichtet.
- Die Kategorien bleiben intern Teil der Suchdaten, damit Suchen wie „Hardware“ weiterhin passende Einträge finden.
- Der Status bleibt ausschließlich über den farbigen Pfeil sichtbar und wird zusätzlich per `aria-label` vollständig benannt.
- Sichtprüfung bei 1280 × 720 und 390 × 844 Pixeln: keine abgeschnittenen Karteninhalte und kein horizontaler Überlauf.
- Frischer Browserlauf nach Neustart des Entwicklungsservers: keine Hydration- oder sonstigen Laufzeitfehler; nur die bekannte lokale reCAPTCHA-Konfigurationswarnung und blockierte Vercel-Analyse-Skripte.

final result: passed

---

# Design QA: Sticky Story Section

## Sources

- `/Users/lucaschoeneberg/Desktop/Bildschirmfoto 2026-08-06 um 10.59.54.png` — 2928 × 1326 px, desktop state 01.
- `/Users/lucaschoeneberg/Desktop/Bildschirmfoto 2026-08-06 um 11.00.00.png` — 2924 × 1404 px, transition between states.
- `/Users/lucaschoeneberg/Desktop/Bildschirmfoto 2026-08-06 um 11.00.05.png` — 2906 × 1224 px, desktop state 02.

The references establish the interaction and composition: long-form copy on the left, a sticky media stage on the right, controlled state changes at the next story heading, and a circular down control.

## Implementation evidence

- `.codex-artifacts/sticky-story/implementation-desktop-state-01-final.jpg` — requested viewport 1440 × 900 CSS px, captured browser content 1425 × 891 px, DPR 1, first story state.
- `.codex-artifacts/sticky-story/implementation-desktop-final.jpg` — requested viewport 1440 × 900 CSS px, captured browser content 1425 × 891 px, DPR 1, later story state.
- `.codex-artifacts/sticky-story/implementation-mobile-final.jpg` — requested viewport 390 × 844 CSS px, captured browser content 375 × 812 px, DPR 1, stacked mobile layout.
- `.codex-artifacts/sticky-story/comparison-desktop-state-01-final.png` — source and implementation in one comparison image.
- `.codex-artifacts/sticky-story/comparison-desktop-final.png` — source and later implementation state in one comparison image.

## Comparison

The focused comparison uses the first reference state and the first Mardu story state. The implementation intentionally retains the existing Mardu brand system instead of cloning doinstruct's colors, rounded container, or typography. The following structural characteristics match the reference:

- the text and media columns share one viewport composition;
- the right media stage remains fixed while the left narrative advances;
- copy width, open whitespace, and vertical activation point remain editorial rather than card-like;
- the next-step control advances to the following narrative state;
- the image change uses a short opacity and scale transition instead of an uncontrolled slide;
- mobile removes the sticky behavior and keeps each image with its corresponding copy.

## Findings

- P0: none.
- P1: none.
- P2: none.
- P3: the implementation includes a small media caption strip that is not present in the source. It is consistent with the established Mardu editorial system and does not affect the requested behavior.
- Browser console: no runtime or hydration errors after a fresh development-server restart. Remaining warnings are the existing missing reCAPTCHA development key and blocked Vercel analytics scripts.
- Responsive check: no horizontal overflow at 390 CSS px; all three mobile media blocks render at equal height; the desktop sticky stage is hidden on mobile.
- Accessibility check: meaningful alt text is exposed only for the active desktop image; inactive desktop states are hidden from assistive technology; reduced-motion preferences disable smooth transitions.

## Iteration history

1. Initial implementation used the correct sticky interaction and layout but the running preview still served a stale `sizes` value for the mobile images.
2. The preview was restarted, the server/client image attributes matched, and the final browser pass showed no hydration mismatch.
3. Final source-versus-implementation comparison passed without P0, P1, or P2 visual issues.

## Final result

passed
