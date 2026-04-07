# mardu.space Page Contracts

Dieses Dokument beschreibt die Seitenrollen und Content-Verträge für die zentralen Marketing-Seiten von `mardu.space`.

## Zielbild

- `mardu.space` erklärt zuerst das Betriebsproblem und erst danach Produkte.
- `Plattform` ist die Klammer zwischen Software, Hardware, Integrationen und Produkten.
- `Hardware` und `Verwaltungssoftware` erklären jeweils eine Systemebene, nie eine isolierte Produktwelt.
- `Produkte` ist ein Late-Funnel-Bereich für konkrete Projektbausteine.

## Seitenrollen

### `/`

- Rolle: problemgetriebene Hauptseite
- Primäre Frage: Warum reichen Schlüssel, Listen und Einweisungen in Werkstatt-, Labor- und Hochschulumgebungen nicht mehr aus?
- Erlaubte CTA-Ziele:
  - `/whitepaper`
  - `/platform`
  - `/configurator`
  - `/contact`
- Muss früh beantworten:
  - warum der organisatorische Druck entsteht
  - wie Zutritt, Qualifikation und Maschinenfreigabe zusammenhängen
  - warum das Zusammenspiel aus Software und Hardware entscheidend ist

### `/platform`

- Rolle: Übersichtsseite für das Zusammenspiel des Systems
- Primäre Frage: Wie greifen Software, Hardware, Integrationen und Produkte in mardu.space zusammen?
- Erlaubte CTA-Ziele:
  - `/verwaltungssoftware`
  - `/system`
  - `/products`
  - `/whitepaper`
  - `/configurator`
  - `/contact`
- Muss beantworten:
  - wie der Ablauf von Identität über Regel bis zur lokalen Freigabe funktioniert
  - wie Integrationen und Produkte in diese Logik eingeordnet werden

### `/system`

- Rolle: Hardware-Seite als Ebene der lokalen technischen Durchsetzung
- Primäre Frage: Wie werden Regeln an Tür, Tor und Maschine technisch wirksam?
- Erlaubte CTA-Ziele:
  - `/platform`
  - `/verwaltungssoftware`
  - `/products`
  - `/configurator`
  - `/contact`
- Muss beantworten:
  - welche Rolle Zugriffspunkt, Gateway und Maschinenanbindung haben
  - wie Hardware mit Software und Integrationen zusammenspielt

### `/verwaltungssoftware`

- Rolle: Software-Seite als Ebene für Regeln, Nutzer und Nachweise
- Primäre Frage: Wie werden Personen, Gruppen, Qualifikationen und Freigaben so gesteuert, dass sie im Betrieb und an der Hardware wirken?
- Erlaubte CTA-Ziele:
  - `/platform`
  - `/system`
  - `/products`
  - `/configurator`
  - `/contact`
- Muss beantworten:
  - wie Regeln gepflegt werden
  - wie Freigaben an Hardware und Protokolle gekoppelt sind
  - wie Integrationen Bestandssysteme anbinden

### `/products`

- Rolle: konkreter Produkt- und Beschaffungsbereich
- Primäre Frage: Welche Komponenten und Kombinationen passen zu einem bereits verstandenen Einsatzbild?
- Erlaubte CTA-Ziele:
  - `/platform`
  - `/configurator`
  - `/contact`
- Muss beantworten:
  - wann ein Produkt sinnvoll ist
  - womit es typischerweise zusammen eingesetzt wird
  - welche Rolle es im Gesamtsystem spielt

## Sprachregeln

- Erst Betriebsproblem, dann organisatorische Konsequenz, dann technische Lösung.
- Keine sichtbaren Strategiebegriffe wie `Produktlinie`, `Plattformmarke`, `Proof` oder `einordnen`.
- Technologiebegriffe nur dann prominent verwenden, wenn sie eine echte Kauf- oder Integrationsfrage klären.

## DTO- und Ownership-Regeln

- Seitennahe Copy bleibt in `apps/mardu-space/app/*` und `apps/mardu-space/data/*`.
- Öffentliche DTOs bleiben dokumentiert, wenn sie Inhalte oder UI-Verträge nach außen sichtbar machen.
- Crosslinks zwischen Plattform, Hardware, Software, Integrationen und Produkten müssen in den seitennahen DTOs bewusst gepflegt werden, nicht implizit über einzelne Komponenten.
