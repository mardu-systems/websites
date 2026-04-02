# Marketing Page Contracts

Dieses Dokument beschreibt den inhaltlichen Vertrag für die Marketing-Seiten von `mardu.de` und `mardu.space`.

## Zielbild

- `Mardu` ist die Dachseite für digitale Zutrittssteuerung und Maschinenfreigabe in klaren Einsatzfeldern.
- `mardu.space` ist die konkrete Produktlinie für Werkstätten, Labore, Hochschulen und Makerspaces.
- `mardu.construction` ist die zweite Produktlinie für Baustellen-Zutritt und bleibt sichtbar, befindet sich aber im Early-Access-Stadium.

## Seitenrollen

### `apps/mardu-de/app/page.tsx`

- Rolle: Dachmarke und Verteiler
- Muss in den ersten Screens klar beantworten:
  - Was macht Mardu?
  - Für welche Einsatzfelder ist Mardu gedacht?
  - Was ist heute konkret verfügbar?
  - Was befindet sich im Early Access?
- CTA-Logik:
  - `mardu.space` => Mehr erfahren / direkte Produktvertiefung
  - `mardu.construction` => Interesse / Kontakt / Early Access
  - Dachmarke => Mehr erfahren / Demo

### `apps/mardu-space/app/page.tsx`

- Rolle: produktnahe Haupt-Landingpage
- Muss in den ersten Screens klar beantworten:
  - welches Problem für Werkstatt- und Laborbetreiber gelöst wird
  - wie Zutritt, Qualifikation und Maschinenfreigabe zusammenhängen
  - welcher nächste Schritt sinnvoll ist
- CTA-Logik:
  - früher Funnel => Whitepaper
  - mittlerer Funnel => Konfigurator
  - später Funnel => Demo / Kontakt

## Content Contracts

### `mardu.de`

- Hero beschreibt den Nutzen von Mardu im Betrieb, nicht interne Marken- oder Strategielogik.
- Einsatzfelder werden getrennt und klar lesbar präsentiert.
- Copy priorisiert Verwaltungsentlastung, Übersicht, Integration und benutzerfreundliche Organisation.
- Sicherheit und Compliance sind Vertrauensebene, nicht austauschbarer Hauptclaim.
- Sichtbare Nutzertexte vermeiden Begriffe wie `Produktlinie`, `Plattformmarke`, `Proof` oder `einordnen`.

### `mardu.space`

- Hero und Kurzfassung müssen Werkstätten, Labore, Hochschulen und Makerspaces priorisieren.
- Nutzenformulierung muss über reine Zutrittskontrolle hinausgehen:
  - Qualifikation
  - Regelwerk
  - technische Durchsetzung
  - Nachweis
- Private Werkstätten sind nachgeordnet und dürfen die B2B/B2Institution-Botschaft nicht überlagern.

## DTO Ownership

- Seitennahe Marketing-Kopie lebt in den App-Dateien oder zugeordneten `data/*.tsx`-Dateien.
- Wiederverwendbare Layouts aus `@mardu/sections` bleiben präsentationsorientiert und enthalten keine impliziten Positionierungsentscheidungen.
- Wenn eine Seite eigene Feature- oder Editorial-DTOs definiert, müssen diese:
  - die Seitenrolle stützen
  - CTA-Ziel und Funnel-Stufe nicht verwischen
  - sprachlich mit Metadaten, Footer und Hero konsistent bleiben
  - keine internen GTM- oder Strategiebegriffe in die sichtbare Außenkommunikation tragen

## Review Checklist

- Stimmen Hero, Meta-Description und Footer auf derselben Seitenrolle überein?
- Ist sofort klar, ob eine Seite Dachmarke oder Produktseite ist?
- Sind `mardu.space` und `mardu.construction` sauber voneinander getrennt?
- Passt jeder CTA zur jeweiligen Funnel-Stufe?
- Sind Header- und Footer-Links konsistent mit den Feature-Flags sichtbar oder verborgen?
