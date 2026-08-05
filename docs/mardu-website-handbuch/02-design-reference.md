# Mardu Design Reference

**Stand:** 1. August 2026<br>
**Designrichtung:** Industrial Evidence<br>
**Status:** verbindliche Arbeitsrichtung, visuelle Detailwerte noch zu testen

## 1. Designidee

Mardu soll wie präzise und vertrauenswürdige Betriebsinfrastruktur wirken – nicht wie ein Lifestyleprodukt und nicht wie ein generisches SaaS-Dashboard.

Die visuelle Sprache verbindet drei Eigenschaften:

1. **Industrielle Präzision:** klare Raster, echte Hardware, nachvollziehbare Zustände.
2. **Menschliche Befähigung:** reale Werkstattnutzung, Lehre und Zusammenarbeit.
3. **Beweisorientierung:** UI, Installation, Quelle oder Grenze direkt neben der Aussage.

Der Auftritt ist ruhig und hochwertig. Er muss aber schneller erklären als der bisherige MAY-STUDIO-Entwurf.

## 2. Gestaltungsprinzipien

### Wirkung vor Bauteil

Eine Sektion erklärt zuerst, was für Betreiber oder Nutzende besser wird. Hardware und Technik folgen als Mechanismus und Beleg.

### Beleg vor Behauptung

Produkt-UI, reale Installation, Kundenaussage oder dokumentierter Status stehen in unmittelbarer Nähe zum Claim.

### Reale Zustände statt Dekoration

Freigegeben, Prüfung, abgelaufen, administrativ nicht freigegeben und offline sind Produktzustände. Sie werden verständlich beschriftet und nicht nur durch Farbe dargestellt.

### Wenige starke Muster

Nicht jede Sektion erhält eine neue Kartenform. Wiederholung schafft Markenidentität. Eine Seite verwendet wenige dominante Muster und variiert Inhalt, nicht Dekoration.

### Ehrliche Reife

Verfügbar, Pilot und in Untersuchung sind visuell unterscheidbar. Zukunftsfunktionen dürfen nicht wie fertige Dashboard-Screens erscheinen.

## 3. Bezug zum MAY-STUDIO-Entwurf

### Beibehalten

- reduzierte Schwarz-Weiß-Basis,
- Mardu-Violett als Identitätsakzent,
- nummerierte Kapitel als optionale Orientierung,
- hochwertige Material- und Produktnähe,
- feine Linien,
- großzügiger Weißraum,
- eckige, präzise Kompositionen.

### Neu entwickeln

- Hero aus Kundennutzen und Freigabemechanik,
- verständliche Hauptnavigation,
- größere Fließtexte und Labels,
- echte Produkt-UI,
- reale Installationsbelege,
- erkennbare primäre CTAs,
- Zielgruppen- und Vertrauensführung,
- Statusdarstellung statt öffentlicher Roadmap,
- Standort-Check statt frühem Produktkonfigurator.

### Nicht übernehmen

- fremde oder an Teenage Engineering erinnernde Leitbilder,
- zu kleine typografische Labels,
- lange nummerierte Indexnavigation,
- öffentliche Roadmap als Hauptbereich,
- wiederholte generische Kontaktformulare,
- erfundene UI, Metriken, Partner oder Kundensituationen,
- Designkatalog-Ästhetik ohne verständliche Produktreise.

## 4. Farbrollen

Die vorhandenen Werte sind Ausgangspunkte, keine ungeprüfte finale Palette.

| Rolle         | Ausgangswert                         | Verwendung                                                         |
| ------------- | ------------------------------------ | ------------------------------------------------------------------ |
| Papier        | `#F9F8F4`                            | primärer heller Hintergrund                                        |
| Graphit       | vorhandener `foreground`-Token       | Text, dunkle Flächen und technische Diagramme                      |
| Mardu-Violett | `#3B2C6F`                            | Marke, ausgewählte Links und primäre Akzente                       |
| Orange        | `#FF5A1F`                            | optionaler Herkunfts-/Maker-Akzent; nicht gleichzeitig Statusfarbe |
| Freigabegrün  | noch kontrastzuprüfen                | ausschließlich bestätigter positiver Zustand                       |
| Prüf-Amber    | noch kontrastzuprüfen                | Prüfung, Ablauf oder eingeschränkter Zustand                       |
| Sperr-Rot     | vorhandener Destructive-Token prüfen | Fehler, kritische Sperre oder Eingriff erforderlich                |
| Liniengrau    | vorhandener `line-soft`-Token        | Raster, Tabellen und Trennung                                      |

### Farbregeln

- Violett ist Identität, nicht Freigabestatus.
- Orange wird sparsam verwendet und darf nicht mit Warnung verwechselt werden.
- Zustände erhalten immer Icon oder Form und Textlabel zusätzlich zur Farbe.
- Pro Sektion gibt es eine dominante Fläche und höchstens einen starken Akzent.
- Farbwerte müssen in allen relevanten Zuständen WCAG-konform geprüft werden.
- Dark Mode ist kein automatisches Negativ der hellen Seite, sondern benötigt eine eigene visuelle Prüfung.

## 5. Typografie

### Hauptschrift

Die bereits vorhandene Aktiv-Grotesk-Familie bleibt der bevorzugte Ausgangspunkt:

- Regular `400` für Fließtext,
- Medium `500` für Navigation, Labels und Buttons,
- Bold `700` für ausgewählte Headlines.

Eine neue Schriftabhängigkeit ist nicht erforderlich. Falls eine Display-Schrift getestet wird, muss sie deutsche Zeichen, Lizenz, Ladezeit und Lesbarkeit vollständig erfüllen.

### Hierarchie

| Ebene      | Aufgabe                                 | Regel                                          |
| ---------- | --------------------------------------- | ---------------------------------------------- |
| Display/H1 | ein klares Nutzenversprechen            | maximal zwei bis drei Zeilen, keine Textwand   |
| H2         | neue Argumentationsstufe                | konkret und ohne isolierten Marketingbegriff   |
| H3         | Modul oder Teilfrage                    | funktional, nicht dekorativ                    |
| Fließtext  | erklären und einordnen                  | komfortable Größe und begrenzte Zeilenlänge    |
| Label      | Status, Kategorie oder Metadatum        | kurz, ausreichend groß, keine langen Versalien |
| Mono       | IDs, Messwerte und technische Metadaten | niemals für lange Marketingtexte               |

### Sprachbild

- Satzgroßschreibung statt dauernder Versalien,
- Zahlen nur mit Einheit und Kontext,
- keine winzigen eckigen Klammerlabels als einzige Orientierung,
- Unterstreichung und Farbe für erkennbare Links,
- Textbreite im Fließtext auf ungefähr 55 bis 75 Zeichen begrenzen.

## 6. Raster und Abstände

- Desktop: zwölfspaltiges Raster auf dem vorhandenen Mardu-Container.
- Tablet: sechs bis acht funktionale Spalten.
- Mobile: einspaltige Leserichtung, ausgewählte Zweispalter nur für kleine Werte oder Status.
- Große Sektionen wechseln mit kompakten Belegmodulen.
- Weißraum strukturiert Argumente; er ist kein Ersatz für fehlenden Inhalt.
- Text und zugehöriger Beleg bleiben visuell verbunden.
- Produkt-UI wird groß genug gezeigt, um reale Information lesen zu können.
- Tabellen werden auf Mobilgeräten in Karten oder kontrolliert scrollbare Ansichten überführt.

## 7. Formensprache

### Grundformen

- eckige oder minimal gerundete Flächen,
- klare Rahmen,
- feine Trennlinien,
- wenige überlagerte Ebenen,
- keine beliebige Sammlung runder SaaS-Karten,
- Pillen nur für kompakte Status oder Filter.

### Pattern-Familien

Die vorhandene `editorial-pattern-language.md` liefert drei geeignete Familien:

- **Signal:** Punktmatrix, Taktstäbe, segmentierte Bögen für Aktivität und Funk.
- **System:** Rahmen, Kachelbänder und Module für Architektur und Integrationen.
- **Flow:** Richtungsfelder und Linienraster für Freigabeabläufe.

Pro Seite wird eine dominante Familie verwendet. Pattern erklären Struktur oder Zustand und werden nicht als bloßes Hintergrundrauschen eingesetzt.

## 8. Bildsprache

### Zeigen

- reale Hochschul-, Lehr- und Unternehmenswerkstätten,
- echte Personen bei Identifikation, Einweisung und Nutzung,
- Hardware fachgerecht im Einbau,
- vorhandene Ausweise und reale Leser,
- Maschinen in ihrem tatsächlichen räumlichen Kontext,
- Werkstattteams bei fachlicher Unterstützung,
- echte UI in einer konkreten Aufgabe,
- Materialität, Gebrauchsspuren und glaubwürdige Umgebung.

### Nicht zeigen

- fremde Lifestyle-Elektronik,
- generische Hände ohne Kontext,
- technisch falsche KI-Installationen,
- Stockfotos mit beliebiger Schutzkleidung,
- kleine unlesbare Dashboardcollagen,
- Personen oder Partner in Situationen, die nicht stattgefunden haben,
- Zukunftsfunktionen als scheinbar fertige Screens.

## 9. Produkt-UI auf Marketingseiten

Marketing-Screens verwenden reale Produktzustände und realistische Daten. Sie zeigen eine verständliche Aufgabe, beispielsweise:

- Qualifikation ist gültig,
- Berechtigung passt zur Maschine,
- Zeitfenster ist aktiv,
- administrative Freigabe wurde erteilt,
- administrative Freigabe wurde wegen abgelaufener Einweisung nicht erteilt.

Jeder Screen braucht:

- einen klaren Fokus,
- ausreichend große UI,
- realistische Bezeichnungen,
- sichtbaren Zustand,
- nachvollziehbaren Zeitpunkt oder Kontext,
- keine personenbezogenen Echtdaten.

## 10. Iconografie

- vorhandene Iconbibliothek verwenden,
- einfache geometrische Konturen,
- konsistente Strichstärke,
- keine Emojis als Produktoberfläche,
- keine selbst gezeichneten Symbolwelten pro Seite,
- Icons werden mit Textlabels kombiniert, wenn die Bedeutung nicht allgemein bekannt ist.

## 11. Motion

Bewegung erklärt den Freigabeablauf:

1. Identität erkannt,
2. Bedingungen geprüft,
3. administrative Freigabe erteilt oder nicht erteilt,
4. Vorgang in der Verwaltung sichtbar.

Animationen sind kurz, pausierbar und mit `prefers-reduced-motion` kompatibel. Keine dauernden Lauftexte, rotierenden Hardwarekarussells oder Scroll-Effekte, die Inhalte blockieren.

## 12. Accessibility

- Zoom bleibt möglich.
- Fokus ist jederzeit sichtbar.
- Navigation, Menüs, Tabs, Accordions und Formulare sind per Tastatur bedienbar.
- Fokus wird in mobilen Overlays sinnvoll geführt.
- Escape schließt Menüs und Dialoge.
- Status wird nie nur durch Farbe vermittelt.
- Bilder erhalten zweckbezogene Alt-Texte.
- Diagramme besitzen Textalternativen.
- feste Leisten verdecken keine Inhalte.
- Formulare verwenden echte Labels, konkrete Fehlermeldungen und verständlichen Datenschutzkontext.
- Kontrast wird auf realen Komponenten und Zuständen geprüft.

## 13. Responsive Verhalten

### Desktop

Große Bild-Text-Kompositionen, lesbare UI und klarer Wechsel zwischen Erzählung und Beleg.

### Tablet

Kompositionen dürfen neu umbrechen. Kein erzwungenes verkleinertes Desktop-Raster.

### Mobile

- Nutzenversprechen vor Visual,
- ein primärer CTA sichtbar,
- Prozess in klarer Leserichtung,
- keine winzigen Diagramme,
- keine horizontalen Hauptnavigationen,
- UI-Ausschnitte fokussieren einen Zustand statt den gesamten Desktop-Screen.

## 14. Visuelle Qualitätsprüfung

Jede neue Seite wird gegen diese Fragen geprüft:

1. Ist der Nutzen vor der Technik verständlich?
2. Steht neben jeder starken Behauptung ein Beleg oder eine klare Statusgrenze?
3. Sind echte Produkt-, Installations- und Nutzungsbilder verwendet?
4. Sind Typografie, Linien, Farben und Muster konsistent?
5. Funktionieren alle Inhalte auf Mobile ohne Informationsverlust?
6. Sind interaktive Zustände vollständig und barrierearm?
7. Wirkt die Seite wie Mardu und nicht wie eine austauschbare SaaS-Vorlage?

## 15. Externe Bildreferenzen

Externe Seiten werden nicht als Stilvorlage kopiert. Jede Referenz muss eine konkrete Frage beantworten: Wie schnell wird der Nutzen verständlich? Wie wird ein Produkt belegt? Wie werden Hardware, Betrieb und Daten lesbar verbunden?

### Outcome-first Hero

![Doinstruct-Startseite mit nutzenorientierter Headline und realer Arbeitsszene](./assets/references/doinstruct-hero-2026-08-01.jpg)

**Quelle:** [doinstruct.com](https://www.doinstruct.com/), aufgenommen am 1. August 2026. Doinstruct führt mit einer betrieblichen Wirkung und erklärt den Mechanismus erst in der Subline. Für Mardu ist die klare Reihenfolge relevant, nicht die konkrete Bildwelt oder Formulierung.

**Mardu-Ableitung:** Eine Hauptaussage, eine präzise Subline und ein realer Beleg im ersten Sichtbereich. Die Werkstattszene muss aus einem echten Mardu-Kontext stammen.

### Kategorie sichtbar machen, aber sprachlich differenzieren

![Magister-Produktseite mit drei Eigenschaften und großem Dashboard-Visual](./assets/references/magister-produkt-hero-2026-08-01.jpg)

**Quelle:** [Magister Produkt](https://magister-compliance.de/produkt), aufgenommen am 1. August 2026. Die Seite zeigt früh die Produktkategorie und ein Dashboard. Sie ist zugleich eine wichtige Abgrenzungsreferenz im direkten Umfeld.

**Mardu-Ableitung:** Software und reale Oberfläche früh zeigen, aber keine pauschalen Begriffe wie „rechtssicher“ übernehmen. Mardu verbindet jede starke Aussage mit Geltungsbereich, Reifegrad und Nachweis.

Die vollständige kommentierte Sammlung steht in [09 – Visuelle Referenzen](./09-visuelle-referenzen.md).
