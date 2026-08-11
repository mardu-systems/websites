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

# Design QA – Nutzenkarten und Footer-Halftone

## Vergleichsgrundlage

- Visuelle Quelle: die drei Browser-Annotationsaufnahmen aus dem aktuellen Auftrag (`browser-comment://current-request/comments-1-3`), aufgenommen bei einem angegebenen Viewport von 1376 × 1324 CSS-Pixeln.
- Implementierung Nutzenkarten: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/design-qa/homepage-benefits-centered.png`, 1361 × 1310 Pixel, DPR 1, Desktopzustand der Nutzenkarten.
- Implementierung Footer: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/design-qa/homepage-footer-halftone.png`, 1361 × 1310 Pixel, DPR 1, sichtbarer Footeranfang und vollständige Footerstruktur.
- Responsive Kontrolle: `/Users/lucaschoeneberg/Documents/GitHub/websites/.codex-artifacts/design-qa/homepage-benefits-mobile.png`, 375 × 812 Pixel bei angefordertem Viewport 390 × 844 CSS-Pixeln, DPR 1.
- Zustand: Startseite, Nutzenkarten ohne aktive Pointerinteraktion; Footer im Ausgangszustand.
- Die Annotationsaufnahmen und die Browseraufnahmen wurden im selben visuellen Arbeitskontext auf identische Komponenten und Inhalte verglichen. Die Browser-Annotationsbilder besitzen keinen lokalen Dateipfad; deshalb ist kein zusätzliches Dateiartefakt mit physisch zusammengefügten Bildern verfügbar.

## Vollansicht und fokussierter Vergleich

Die Nutzenkarten wurden als fokussierter Vergleich geprüft: Jede Modellmitte liegt innerhalb von einem Pixel auf der jeweiligen Kartenmitte. Die Modelle sind gegenüber der Quelle größer, heller und einfarbig in `#8D69BF`. Nummern und Status stehen in einer eigenen 32-Pixel-Kopfzeile; dadurch überlappt „Compliance“ das Dokumentmodell nicht mehr. Der Footervergleich bestätigt ein großes, schwach sichtbares Mardu-Signet oben rechts. Das echte Favicon-Asset bildet die Maske; der Halftone ist angeschnitten, bleibt aber als Mardu-Signet erkennbar.

## Pflichtflächen

- Schrift und Typografie: Bestehende Schriftfamilien, Größen, Gewichte und Zeilenhöhen bleiben unverändert. Nummern und Status behalten die vorhandene technische Kleintypografie.
- Abstände und Layout-Rhythmus: Die drei 288 × 288 Pixel großen Desktopbühnen sind exakt zentriert. Titel und Copy liegen in einem mittig positionierten, linksbündigen 20-rem-Textblock. Auf Mobilgeräten werden 256 × 256 Pixel verwendet; es entsteht kein horizontaler Überlauf.
- Farben und Tokens: Alle drei Halftone-Modelle sowie das Footer-Signet verwenden das verlangte helle Mardu-Violett `#8D69BF`. Der frühere orange Hover-Farbwechsel wurde entfernt. Das Footer-Signet verwendet 16 Prozent Deckkraft auf Schwarz.
- Bildqualität und Assettreue: Die gelieferten GLB-Modelle bleiben unverändert und werden über den bestehenden WebGL-Halftone-Renderer dargestellt. Das Footer-Signet verwendet das vorhandene originale Mardu-Favicon als Maske; die Logoform wurde nicht nachgezeichnet oder ersetzt.
- Copy und Inhalt: Titel, Beschreibungen, Nummern und Status der Nutzenkarten bleiben unverändert.

## Interaktion und Zugänglichkeit

- Alle drei Modelle bleiben per Maus steuerbar und auf die Y-Achse begrenzt.
- Die Modellcontainer behalten ihre zugänglichen Bildbezeichnungen.
- Das Footer-Signet ist rein dekorativ, `aria-hidden` und ohne Pointerinteraktion.
- Desktop und Mobil zeigen keinen horizontalen Überlauf.
- Browser-Konsole: keine Fehler.

## Findings und Vergleichshistorie

1. Erster Implementierungsvergleich: Die Modelle waren korrekt zentriert und heller, der Status „Compliance“ überlagerte jedoch wegen der vergrößerten Bühne das dritte Modell. Einstufung P2.
2. Korrektur: Nummer und optionaler Status erhielten eine eigene, in allen Karten gleich hohe Kopfzeile.
3. Finaler Vergleich: Alle Modellmittel stimmen mit den Kartenmitteln überein; Status und Modell überlappen nicht. Das Footer-Signet ist dezent, angeschnitten und eindeutig als Mardu-Marke lesbar. Keine offenen P0-, P1- oder P2-Abweichungen.

## Follow-up Polish

- P3: Die aktuell sehr dezente Footer-Deckkraft kann nach einem Realgerätetest zwischen 14 und 18 Prozent feinjustiert werden, ohne das Layout oder die Assettreue zu verändern.

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

---

# Design QA – Integrationen

## Vergleichsgrundlage

- Visuelle Quelle: `/Users/lucaschoeneberg/.codex/generated_images/019fd73d-04a2-77e3-8039-4fca6644fd7a/exec-3152d73b-02a2-4e6e-b712-e55c911aa697.png`.
- Browser-Aufnahme Umsetzung: `/Users/lucaschoeneberg/Documents/GitHub/websites/tmp/design-qa/mardu-integrations-final-4.jpg`.
- Normalisierte Quelle: `/Users/lucaschoeneberg/Documents/GitHub/websites/tmp/design-qa/mardu-integrations-source-normalized.png`.
- Quelle: 1672 × 941 Pixel; für den direkten Vollvergleich proportional auf 1265 × 712 Pixel normalisiert.
- Implementierungsaufnahme: 1265 × 712 Pixel, Desktopzustand `/integrations`, leere Suche, Status „Alle Status“, sechs Einträge sichtbar beziehungsweise direkt unterhalb des Browserausschnitts.
- Angeforderter Browser-Viewport: 2048 × 1152 CSS-Pixel. Die eingebettete Browserfläche lieferte eine auf 1265 × 712 Pixel skalierte Aufnahme; Quelle und Umsetzung wurden deshalb bei identischen Pixeldimensionen verglichen.

## Vollansicht und fokussierter Vergleich

Der kombinierte Vergleich zeigt Quelle und Umsetzung im selben Bildkontext. Die Umsetzung übernimmt die zweigeteilte Hero-Komposition, die technische Werkstattillustration, den schwarzen Plattformstrang, die vier verbundenen Systemgruppen sowie die reduzierte Suche mit einem Statusfilter. Die Integrationszeilen wurden zusätzlich in einem gescrollten Browserzustand geprüft; Logos, Nutzenzeile, Status und Pfeil bleiben in einer ruhigen Zeile lesbar. Ein weiterer Ausschnitt war nicht nötig, weil die relevanten Typografie-, Asset- und Tabellenmerkmale in der normalisierten Vollansicht erkennbar sind.

## Pflichtflächen

- Schrift und Typografie: Aktiv Grotesk, IBM Plex Sans und JetBrains Mono folgen dem bestehenden Mardu-System. Die Headline ist wie in der Quelle fest zweizeilig; Gewicht, Laufweite und Zeilenhöhe wurden im zweiten Durchgang angeglichen.
- Abstände und Layout-Rhythmus: Hero, Plattformstrang, Systemgruppen und Filter bilden dieselbe Reihenfolge und klare vertikale Hierarchie. Bei der schmaleren eingebetteten Desktopfläche erscheinen weniger Listenzeilen gleichzeitig; das ist die erwartete responsive Verdichtung und vermeidet den vom Nutzer kritisierten Informationsüberfluss.
- Farben und Tokens: Papierweiß, Schwarz, Mardu-Violett und die feinen Haarlinien verwenden vorhandene globale Tokens. Status bleibt als Text erkennbar und wird nicht allein über Farbe vermittelt.
- Bildqualität und Assettreue: Die Werkstattgrafik ist ein eigenständiges hochauflösendes Line-Art-Asset. Anbieterlogos werden aus echten Markenassets beziehungsweise der für LDAP erzeugten Einzelillustration geladen; es gibt keine CSS- oder Platzhaltergrafik für die sichtbaren sechs Einträge.
- Copy und Inhalt: Headline, Intro, Systemgruppen, Zählungen, sechs kuratierte Integrationen und Status entsprechen der ausgewählten Vorlage. Zusätzliche Daten aus dem vorhandenen Integrationskatalog werden erst über „Alle Integrationen anzeigen“ sichtbar.

## Interaktionen und Zugänglichkeit

- Suche nach „Stripe“ reduziert die Liste auf Stripe.
- Der Statusfilter lässt sich mit der Suche kombinieren; ein leerer Trefferzustand und „Filter zurücksetzen“ funktionieren.
- „Alle Integrationen anzeigen“ erweitert auf die übrigen vorhandenen Integrationen und wechselt korrekt zu „Weniger anzeigen“.
- Veröffentlichte CMS-Einträge verlinken auf ihre Detailseite; Fallback-Einträge führen bis zur Veröffentlichung mit vorausgewähltem Integrationsparameter zur bestehenden Kontaktseite und erzeugen keine 404-Navigation.
- Eingaben besitzen sichtbare Fokuszustände und zugängliche Bezeichnungen; die Ergebnisliste wird als Live-Region aktualisiert.
- Im Browser waren weder ein Next.js-Laufzeitfehler-Overlay noch eine Application-Error-Ansicht vorhanden.

## Findings und Vergleichshistorie

1. Erster Vergleich: Headline brach auf drei Zeilen um, Hero und Systemgruppen waren zu hoch, und der Plattformstrang nahm nahezu die gesamte Seitenbreite ein. Einstufung P2.
2. Korrektur: Headline auf zwei Zeilen festgelegt, Hero- und Zeilenrhythmus verdichtet, Plattformstrang proportional zentriert und Illustration neu skaliert.
3. Zweiter Vergleich: „Verwaltung & Organisation“ brach im schmaleren Desktopausschnitt um. Einstufung P2.
4. Korrektur: Gruppentypografie auf die kompakte Quellgröße reduziert. Der finale Vergleich zeigt keine offenen P0-, P1- oder P2-Abweichungen.

## Follow-up Polish

- P3: Die globale Website-Navigation bleibt bewusst die aktuelle Mardu-Header-Variante mit den bestehenden Hauptlinks und dem Beratungs-CTA, statt den im Mock vereinfachten Menüpunkt zu duplizieren.

final result: passed

---

# Design QA – Mobile-Menü-Icon und Partnerlogos

## Vergleichsgrundlage

- Icon-Quelle: `/var/folders/rn/v1p_nhxx1871gd0_1sbxp8zh0000gn/T/codex-clipboard-99374b5a-65fb-4907-8de2-f84578aaec1b.png` (82 × 62 Pixel, RGBA).
- Fehlerquelle Partnersektion: `/var/folders/rn/v1p_nhxx1871gd0_1sbxp8zh0000gn/T/codex-clipboard-f3cf6426-5cac-4f8c-bc18-4e334ed2a0f8.png` (2994 × 716 Pixel, RGBA).
- Zielzustände: `/` bei 390 × 844 CSS-Pixeln, Mobile-Menü geschlossen und geöffnet; Partnersektion bei mindestens 1280 CSS-Pixeln Breite.
- Implementierungsaufnahme: nicht verfügbar. Der bereits laufende Next.js-Prozess lieferte zunächst einen veralteten Bundle-Stand; der anschließende Browserzugriff auf die lokale Vorschau wurde von der Browserfreigabe blockiert.

## Pflichtflächen

- Schrift und Typografie: Drawer-Typografie und Beschriftungen wurden nicht verändert.
- Abstände und Layout-Rhythmus: Drawer, Headerhöhe, 44-Pixel-Menüfläche und Partner-Grid bleiben strukturell bestehen.
- Farben und Tokens: Das bereitgestellte Fünf-Punkt-Asset wird unverändert verwendet; vorhandene Mardu-Tokens bleiben unverändert.
- Bildqualität und Assettreue: Das bereitgestellte PNG wurde bytegenau in das Projekt kopiert. Partnerlogos verwenden weiterhin die vorhandenen Originalassets; überlaufende Transform-Skalierungen wurden entfernt.
- Copy und Inhalt: Navigation, CTA, Partnernamen und Direkteinstiege wurden nicht verändert.

## Findings und Vergleichshistorie

1. Ausgangszustand: Partnerlogos wurden nach der Layoutberechnung per `transform: scale(...)` bis auf 155 % vergrößert und überlappten benachbarte Grid-Zellen. Das Mobile-Menü verwendete Lucide Menu/X.
2. Korrektur: Logoabmessungen werden wieder durch `max-width` und `max-height` innerhalb ihrer Grid-Zelle begrenzt. Der gemeinsame Header akzeptiert optional ein projektseitiges Mobile-Menü-Asset; ohne Konfiguration bleiben die bisherigen Lucide-Symbole erhalten.
3. Statische Nachkontrolle: ESLint ohne neue Fehler, React Doctor 86/100 mit fünf ausschließlich bestehenden Hinweisen außerhalb der geänderten Dateien, `git diff --check` bestanden.
4. Visuelle Nachkontrolle: blockiert, da keine aktuelle Browseraufnahme der geänderten Implementierung erstellt werden konnte.

## Offener Blocker

Für einen bestandenen Abschluss muss der lokale Entwicklungsserver frisch gestartet und die beiden Zielzustände erneut im Browser aufgenommen werden.

final result: blocked

---

# Design QA – Blog

## Vergleichsgrundlage

- Visuelle Referenz des bestehenden Mardu-Designsystems: `/Users/lucaschoeneberg/Documents/GitHub/websites/tmp/design-qa/mardu-integrations-implemented-top.jpg`.
- Implementierung Desktop: `/Users/lucaschoeneberg/Documents/GitHub/websites/tmp/design-qa/blog-typography-desktop.png` bei 1440 × 1000 CSS-Pixeln.
- Implementierung Mobile: `/Users/lucaschoeneberg/Documents/GitHub/websites/tmp/design-qa/blog-typography-mobile.png` bei 390 × 844 CSS-Pixeln.
- Direkter Referenzvergleich: `/Users/lucaschoeneberg/Documents/GitHub/websites/tmp/design-qa/blog-typography-comparison.png`.
- Geprüfter Zustand: `/blog` ohne lokal verfügbare CMS-Beiträge; Suche, Filterleiste, leerer Zustand, Header und Footer sind sichtbar.

## Pflichtflächen

- Schrift und Typografie: Aktiv Grotesk, die vorhandene Serifenschrift und JetBrains Mono bilden dieselbe Hierarchie wie die bestehenden Mardu-Seiten. Die Blog-Hauptüberschrift nutzt jetzt denselben Desktop-Maximalwert von 4 rem wie die Integrationsseite; mobil liegt sie bei 44 Pixeln. Abschnittsüberschrift, Karten und Rich-Text-Zwischenüberschriften wurden proportional darunter abgestuft.
- Abstände und Layout: Der Blog verwendet das bestehende Containermaß, großzügige vertikale Abstände, feine Haarlinien und eckige Flächen. Bei 390 Pixeln gibt es keinen horizontalen Überlauf; Überschriften, Suche und Filter brechen kontrolliert um.
- Farben und Tokens: Hintergrund, Text, Mardu-Violett und Mardu-Orange stammen aus den vorhandenen globalen Tokens. Es wurden keine neuen Farbsysteme oder generischen Schatten eingeführt.
- Bild- und Assettreue: Beitragsbilder bleiben echte CMS-Assets mit `next/image`. Das Redesign entfernt die frühere dunkle Verlaufsüberlagerung und zeigt Bilder künftig klar und unbeschnitten im editorialen Raster.
- Icons: Suche, Zurück-Navigation und Artikelaktionen verwenden die bereits installierten Lucide-Icons. Das bestehende farbige Mobile-Menü-Asset bleibt unverändert.
- Copy: Englische Standardtexte wurden auf Deutsch umgestellt (`Ausgewählter Beitrag`, `Beiträge durchsuchen`, `Alle`, `Von`).

## Interaktion und Zugänglichkeit

- Die Blog-Suche wurde im Browser mit „Zutritt“ ausgeführt und erzeugt korrekt `/blog?category=&q=Zutritt`.
- Suchfeld und Suchbutton besitzen getrennte semantische Rollen, zugängliche Namen und sichtbare Fokuszustände.
- Filter und Pagination behalten ihre vorhandene URL-Logik; mobile Ziele sind mindestens 44 Pixel hoch.
- Reduced-Motion-Klassen verhindern Bild- und Iconanimationen bei entsprechender Systemeinstellung.
- Der doppelte Blog-Eintrag im Footer wurde entfernt; dadurch ist auch der zugehörige doppelte React-Key im aktuellen Zustand behoben.

## Findings

- P0: keine.
- P1: keine.
- P2: keine.
- P3: Die lokale CMS-Verbindung liefert derzeit keine Beiträge. Deshalb wurde die Listenansicht visuell im realen Leerzustand geprüft; Hero-, Karten- und Artikeldetail-Darstellung wurden zusätzlich statisch über die vorhandenen typisierten Datenverträge und Komponenten geprüft, aber nicht mit Live-CMS-Inhalt aufgenommen.
- Bestehende Browserwarnungen betreffen den fehlenden lokalen reCAPTCHA-Schlüssel und zwei bereits vorhandene Bildabmessungen im Footer.

## Vergleichsergebnis

1. Erster Blog-Vergleich: Hero- und Detail-H1 skalierten bis 6,5 beziehungsweise 6,4 rem; die Archivüberschrift bis 5,2 rem. Gegenüber den bestehenden Seiten wirkten sie überproportional. Einstufung P2.
2. Korrektur: H1 auf den bestehenden Standard von maximal 4 rem begrenzt, Archivüberschrift auf 3,75 rem und nachgelagerte Überschriften proportional reduziert. Zeilenhöhe und Laufweite wurden an „Integrationen“ angeglichen.
3. Finaler Vergleich: Desktop zeigt H1 mit 64 Pixeln und Archivüberschrift mit 57,6 Pixeln; mobil 44 beziehungsweise 36 Pixel. Kein horizontaler Überlauf bei 390 oder 1440 Pixeln.

Der kombinierte Vergleich zeigt nun dieselbe Typografiedichte, Papierfläche, Haarlinien und nummerierten Informationslabels wie die bestehende Website. Es bleiben keine offenen P0-, P1- oder P2-Abweichungen.

final result: passed
