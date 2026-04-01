# Editorial Pattern Language

Dieses Dokument sammelt Form- und Stilmittel fuer die naechste Mardu-Designkultur im Umfeld von `EditorialPanelsSection`, `EditorialLinkPanelsSection` und weiteren markenpraegenden Sections.

## Ziel

- wiederholbare visuelle Sprache fuer ruhige, technische, editoriale Flaechen
- keine generischen Card-Ornamente, sondern systematische Formfamilien
- anschlussfaehig fuer kuenftige Shared-Section-APIs und dokumentierte DTOs

## Leitprinzipien

- reduzierte, technische Anmutung statt illustrativer Produktgrafik
- klare Materialitaet: grosse Flaechen, wenige Signale, kontrollierte Akzente
- Pattern sollen Struktur erklaeren, nicht nur dekorieren
- Formen duerfen variieren, muessen aber als gemeinsame Familie lesbar bleiben

## Ideenliste

### 1. Raster aus kurzen Strichen

- dichte Felder aus kurzen horizontalen oder vertikalen Linien
- wirkt ruhig, technisch und sachlich
- passend fuer Themen wie Infrastruktur, Stabilitaet, Signalwege

### 2. Punktmatrix mit Ausduennung

- Punkte oder kleine Quadrate, die zu einer Seite oder diagonal auslaufen
- gut fuer Daten, Sensorik, Netzwerke oder Reichweite
- wirkt praezise, ohne plakativ zu sein

### 3. Segmentierte Boegen

- unterbrochene konzentrische Boegen oder Radar-artige Kreissegmente
- geeignet fuer Zugang, Reichweite, Funk, Felder, Sphaeren
- staerker atmosphaerisch als ein klassisches Grid

### 4. Gestapelte Rechteckrahmen

- versetzte oder offene Outline-Rechtecke mit klarer Geometrie
- gut fuer Plattform-, Governance- und Layer-Themen
- wirkt architektonisch und systemisch

### 5. Richtungsfelder aus kleinen Vektoren

- geordnete Gruppen aus Pfeil- oder Achsformen mit Buendelung oder Richtungswechsel
- geeignet fuer Routing, Freigaben, Betriebsfluss und Bewegung
- staerker narrativ als rein statische Muster

### 6. Vertikale Taktstaebe

- schmale Balken mit wechselnden Hoehen, Abstaenden oder Farbakzenten
- erinnert an Messwerte, Monitoring oder Zustandswechsel
- gut fuer Betriebs-, Monitoring- und Systemthemen

### 7. Kachelband mit Auslassungen

- strenges Grid aus kleinen Kacheln oder Rechtecken, bei dem einzelne Felder fehlen
- Form entsteht durch Luecken statt durch laute Grafiken
- reduziert, kontrolliert und hochwertig

### 8. Diagonale Faltkanten

- grosse Flaechen mit feinen diagonalen Linien, Kanten oder Bruchfugen
- weniger digital, staerker editorial und fast architektonisch
- gut fuer Corporate-, Haltung- oder Nachhaltigkeitsthemen

### 9. Ring- und Slot-Elemente

- Kreise, Halbkreise, Aussparungen oder Schluesselloch-nahe Formen
- passend fuer Zutritt, Identitaet, Oeffnung und Berechtigung
- sollte reduziert eingesetzt werden, damit es nicht illustrativ kippt

### 10. Modulbloecke mit Stecklogik

- kleine geometrische Module, die sich beruehren, ueberlappen oder bewusst nicht schliessen
- geeignet fuer Plattformen, Integrationen und Partneroekosysteme
- vermittelt Systembezug statt Ornamentik

### 11. Grossform plus Mikrostruktur

- eine dominante Hintergrundform kombiniert mit einem kleinen dichten Patternfeld
- wirkt erwachsener und editorialer als ein vollflaechiges Pattern
- gut fuer Hero-nahe oder markenpraegende Zwischenbuehnen

### 12. Typografische Zeichenfelder

- wiederholte Zeichen wie `/`, `|`, `:`, `[]`, `=`, `>`, `V`
- nur kontrolliert und systematisch einsetzen
- kann eine starke technische Haussprache ergeben, wenn Glyph, Rhythmus und Farbe konsistent bleiben

## Empfohlene Formfamilien fuer Mardu

### `Signal`

- Punktmatrix mit Ausduennung
- vertikale Taktstaebe
- segmentierte Boegen
- geeignet fuer Monitoring, Praesenz, Aktivitaet, Netzwerke

### `System`

- gestapelte Rechteckrahmen
- Kachelband mit Auslassungen
- Modulbloecke mit Stecklogik
- geeignet fuer Plattform, Regeln, Infrastruktur, Integrationen

### `Flow`

- Richtungsfelder aus kleinen Vektoren
- Raster aus kurzen Strichen
- typografische Zeichenfelder
- geeignet fuer Routing, Bewegung, Freigaben, operative Ablaeufe

## Einsatzhinweise

- nicht jede Section braucht ein anderes Pattern; Wiederholung ist Teil der Markenbildung
- pro Seite lieber eine dominante Formfamilie und eine unterstuetzende Variante
- Pattern sollen auf Distanz lesbar sein und aus der Naehe nicht in UI-Rauschen kippen
- CTA, Headline und Pattern muessen als gemeinsame Komposition funktionieren, nicht als drei getrennte Layer
- wenn eine Section eine API bereitstellt, sollten Pattern-DTOs dokumentiert und nicht implizit ueber Klassen-Namen transportiert werden

## Naechste sinnvolle Schritte

- eine kleine `PatternLanguage`-API fuer `@mardu/sections` definieren
- wiederverwendbare Pattern-Konfigurationen als dokumentierte DTOs formulieren
- bestehende Editorial-Sections auf gemeinsame Formfamilien abstimmen, statt pro Komponente neue Einzelmuster zu erfinden
