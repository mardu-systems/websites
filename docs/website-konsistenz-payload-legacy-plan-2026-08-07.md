# Plan: Website-Konsistenz, Payload-Verträge und Legacy-Abbau

Stand: 7. August 2026

Umsetzungsstatus: am 8. August 2026 umgesetzt; Abschlussmatrix und Prüfnachweise stehen in `docs/website-konsistenz-payload-legacy-abschluss-2026-08-08.md`.

## Zielbild

Die öffentliche Website `apps/mardu-de` soll als ein konsistentes Produkt wirken und ausschließlich dokumentierte, validierte Verträge der zentralen Plattform `apps/platform` konsumieren. Für jeden Inhalt und jeden Lead-Flow gibt es genau einen Runtime-Owner. Lokale Seed-Daten, alte Tokens, Alias-Typen und Kompatibilitäts-Props dürfen nach Abschluss nicht mehr still als zweite Produktionsquelle wirken.

Historische Payload-Migrationen bleiben erhalten. Sie dokumentieren und reproduzieren den Datenbankzustand und sind nicht mit aktiver Legacy-Unterstützung gleichzusetzen.

## Scope

### Nutzeroberflächen

- Einstieg: `/`
- Produkte: `/products`, `/products/[slug]`
- Lösungen: `/solutions`, `/solutions/[slug]`
- Integrationen: `/integrations`, `/integrations/[slug]`
- Wissen: `/blog`, `/blog/[slug]`, `/whitepaper`, `/whitepaper/success`, `/roadmap`
- Leads: `/contact`, `/configurator`, `/newsletter`, Bestätigungs- und Abmeldeseiten
- Unternehmen: `/about`, `/brand`, `/fotos`, `/platform`
- Rechtliches: `/privacy`, `/publisher`
- Gemeinsame Oberflächen: Header, Footer, Navigation, CTA, Formulare, Dialoge, Filter, Lade-, Leer- und Fehlerzustände

### Verträge und Laufzeitpfade

- Payload Collections und generierte `payload-types.ts`
- öffentliche DTOs und Mapper in `@mardu/content-core`
- Lead-DTOs, Zod-Schemas und Tokenlogik in `@mardu/lead-core`
- REST-Zugriffe, Catch-all-Proxies und App-eigene API-Routen
- lokale Seed-, Fallback- und Importdaten
- Kompatibilitäts-Aliase, Barrel-Exports und alte Komponenten-Props
- Deployment-, Feature-Flag- und Environment-Konfiguration

## Bestätigte Baseline

Die folgenden Punkte sind keine vollständige Fehlerliste, sondern die Startpunkte für das geplante Audit:

1. `bun run lint` ist erfolgreich, meldet aber 20 Warnungen in historischen Payload-Migrationen.
2. `bun run type-check` ist erfolgreich.
3. `bun run build` schlägt für `@mardu/app-mardu-de` mit `TypeError: Cannot read properties of undefined (reading 'length')` fehl. Der Plattform-Build ist erfolgreich beziehungsweise aus dem Turbo-Cache reproduziert.
4. Das Root-Script `bun run dev:mardu-de` ist mit der aktuell verwendeten Bun-Version nicht lauffähig, weil `bun --cwd ... run dev` als CLI-Aufruf falsch ausgewertet wird.
5. Die Browser-Stichprobe auf `/`, `/products`, `/integrations` und `/contact` zeigt ein grundsätzlich gemeinsames Markenfundament, aber unterschiedliche Hero-, CTA- und Dichtemuster.
6. Mehrere Link-CTAs erzeugen zur Laufzeit Base-UI-Fehler, weil ein als nativer Button konfiguriertes Primitive als Link gerendert wird. Betroffen sind unter anderem Header, Katalog-Hero und CTA-Sektionen.
7. Weitere Laufzeitwarnungen betreffen fehlende lokale reCAPTCHA-Konfiguration, LCP-Bilder ohne frühes Laden und einzelne Bilder mit potenziell verzerrtem Seitenverhältnis.
8. `@mardu/content-core` bildet Payload-Antworten aus weitgehend permissiven internen Typen mit vielen optionalen Feldern und `unknown` ab. Netzwerk- und HTTP-Fehler werden in `fetchJson` als `null` beziehungsweise leere Ergebnisse verborgen; eine Runtime-Vertragsvalidierung fehlt.
9. Produktionsnahe lokale Inhalts-Fallbacks existieren mindestens für Solutions, Roadmap und die kuratierte Integrationsliste. Dadurch können CMS-Ausfälle oder unvollständige Payload-Daten wie gültiger Inhalt aussehen.
10. Aktive Kompatibilitätsschichten existieren mindestens für alte Newsletter-Tokens, Layout-Typ-Aliase, den `@mardu/ui`-Barrel und alte Hero-Medien-Props.
11. Ein generischer `/api/[...slug]`-Proxy in `apps/mardu-de` leitet Methoden, Query-Parameter, Header und Response weitgehend ungefiltert an die Plattform weiter. Der beabsichtigte öffentliche Vertrag muss enger dokumentiert und getestet werden.
12. Der einmalige Legacy-Import, vier lokale JSON-Datendateien, acht JavaScript-Adapter für TypeScript-Collections und der 21-MB-Ordner `apps/old assets` sind Kandidaten für Entfernung oder Archivierung. Vor einer Löschung muss ihre tatsächliche Build-, Import- und Betriebsrelevanz bewiesen werden.
13. Repository-Dokumentation und Tooling sind teilweise nicht synchron: einzelne Hinweise nennen Next.js 15 und pnpm, während die aktive Workspace-Konfiguration Next.js 16 und Bun verwendet.

## Grundregeln für die Bereinigung

- Erst messen und klassifizieren, dann entfernen.
- Keine stille Änderung eines öffentlichen DTOs oder Endpunkts.
- Kein lokaler Runtime-Fallback für redaktionelle Payload-Inhalte im Endzustand.
- Ein CMS-Ausfall muss als definierter Fehler-, Leer- oder Wartungszustand sichtbar und beobachtbar sein.
- Seeds bleiben nur als explizite Importquelle und dürfen nicht vom Frontend zur Laufzeit importiert werden.
- Alte Tokenformate werden erst nach einem nachgewiesenen Ablaufdatum und einer Daten-/Logprüfung entfernt.
- Historische Datenbankmigrationen werden nicht umgeschrieben oder gelöscht.
- Neue Abstraktionen oder Dependencies sind nicht vorgesehen; vorhandene Zod-, Payload-, Turbo- und UI-Mittel werden genutzt.

## Legacy-Entscheidungsmatrix

Jeder Kandidat erhält vor der Umsetzung einen der folgenden Zustände:

| Zustand     | Bedeutung                                                | Erforderlicher Nachweis                                |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------ |
| `KEEP`      | Aktiver, dokumentierter Bestandteil                      | Owner, Consumer und Vertrag sind benannt               |
| `MIGRATE`   | Inhalt/Daten werden einmalig in den Ziel-Owner überführt | Datenvergleich und wiederholbarer Import               |
| `DEPRECATE` | Übergangsweise nötig                                     | Deadline, Telemetrie und Entfernungskriterium          |
| `REMOVE`    | Nicht mehr verwendet                                     | Import-, Build-, Runtime- und Datenprüfung negativ     |
| `HISTORY`   | Historisches Artefakt, nicht Runtime-Legacy              | Aus produktiven Pfaden ausgeschlossen und dokumentiert |

Die erste Matrix muss mindestens diese Kandidaten enthalten:

- `apps/old assets`
- `apps/*/data/newsletter.json` und `preorders.json`
- `apps/platform/scripts/migrate-legacy-data.mjs` und zugehöriges Package-Script
- lokale Solutions-, Roadmap-, Catalog- und Integrationsdaten
- `parseLegacyToken`
- Layout-Alias-Typen
- `@mardu/ui/src/index.ts`
- `HeroMediaCard.imageSrc` und `imageAlt`
- Collection-Adapter `apps/platform/collections/*.js`
- veraltete Dokumentation, Environment-Variablen und Deploymentpfade

## Umsetzungsphasen

### Phase 0: Reproduzierbare Ausgangslage

Ziel: Verlässliche Prüfungen herstellen, bevor fachliche oder visuelle Änderungen beginnen.

- Root-Dev-Scripts an die aktive Bun-Version anpassen.
- Ursache des `mardu-de`-Buildfehlers isolieren und beheben.
- Browser-Laufzeitfehler der gemeinsamen Button-/Link-Primitives beheben.
- lokale Testkonfiguration so definieren, dass fehlendes reCAPTCHA bewusst simuliert oder eindeutig als erwartete Warnung behandelt wird.
- pro App eine dokumentierte lokale Startkombination mit expliziten Plattform-Origins festlegen; lokale Entwicklung darf nicht unbemerkt Produktionsdaten konsumieren.
- Baseline-Report für Lint, Typecheck, Build und Browser-Konsole erzeugen.

Abnahme:

- `bun run dev:mardu-de` und `bun run dev:platform` funktionieren.
- `bun run lint`, `bun run type-check` und `bun run build` sind reproduzierbar grün.
- Auf den repräsentativen Routen gibt es keine ungeklärten Runtime- oder Hydration-Fehler.

### Phase 1: Vertragsinventar und Payload-Kompatibilität

Ziel: Einen einzigen, nachweisbaren Vertrag zwischen Payload, Mappern und UI herstellen.

- Collection-Felder gegen `payload-types.ts`, `@mardu/content-core`-DTOs, Mapper und tatsächliche UI-Consumer abgleichen.
- Required/optional, Null-Semantik, Defaults, Relationen, Media-URLs, Pagination, Draft/Published und Site-Sichtbarkeit pro Collection dokumentieren.
- Mapper mit vorhandenen Zod-Mitteln oder expliziten Type Guards an der Runtime-Grenze validieren.
- Fehlerarten unterscheiden: Netzwerkfehler, Nicht-2xx, ungültige Payload, leere Collection und nicht gefundener Slug.
- Contract-Tests mit repräsentativen gültigen, partiellen und ungültigen Payload-Antworten ergänzen.
- Query-Parameter, Statuscodes, Caching/Revalidation und maximale Fetch-Größen prüfen.
- Catch-all-Proxy auf tatsächlich benötigte Pfade und Methoden reduzieren oder seinen öffentlichen Vertrag explizit absichern.
- Product-Inquiry-Kontext vollständig gegen `CatalogInquiryContextDto` prüfen; aktuell werden nicht alle dokumentierten Felder transportiert.

Abnahme:

- Jede öffentliche Collection besitzt Collection-Vertrag, Mapper-Vertrag, Consumer-Vertrag und Fehlervertrag.
- Ungültige Payload-Daten können nicht still als scheinbar gültige UI erscheinen.
- DTO-Dokumentation, Payload-Dokumentation und Implementierung stimmen überein.
- Contract-Tests laufen in CI.

### Phase 2: Logik- und Inhaltskonsistenz

Ziel: Navigation, Claims, Status, CTAs und Datenherkunft ergeben auf allen Routen eine nachvollziehbare Geschichte.

- Informationsarchitektur und Navigation gegen Sitemap, Header, Footer und interne Links prüfen.
- Produkt-, Lösungs- und Integrationsbegriffe sowie Statuswerte vereinheitlichen.
- CTA-Ziele nach Nutzerabsicht standardisieren: Beratung, Angebot, Produktanfrage, Integrationsanfrage, Newsletter und Whitepaper.
- Metadaten, Canonicals, strukturierte Daten und sichtbare Seitentitel auf Widersprüche prüfen.
- leere, Lade-, Fehler-, Draft- und 404-Zustände pro Content-Typ definieren.
- lokale Inhalte nur noch als Seed/Import kennzeichnen; Runtime-Owner ist Payload.

Abnahme:

- Jeder primäre Nutzerpfad hat einen eindeutigen Einstieg, nächsten Schritt und Abschlusszustand.
- Kein CTA führt in einen semantisch falschen oder unvollständig befüllten Flow.
- Sitemap, Navigation, Metadaten und tatsächliche Routen sind deckungsgleich.

### Phase 3: Designsystem- und Accessibility-Audit

Ziel: Bestehende Markenmuster werden systematisch verwendet, ohne alle Seiten gleich aussehen zu lassen.

- den vorhandenen Prüfrahmen aus `apps/mardu-de/docs/design-consistency-audit-2026-08-06.md` vervollständigen.
- repräsentative Screenshots bei 320, 390, 768, 1024 und 1440 Pixel sowie bei 200 Prozent Zoom aufnehmen.
- Header-/Footer-Abstände, Container, Section-Rhythmus, Hero-Typen, Overlines, Headlines, Fließtext, Buttons, Formfelder, Filter, Cards und Haarlinien vergleichen.
- Fokusführung, Tastaturbedienung, Dialoge, mobile Navigation, Touch-Ziele, Kontrast, Reduced Motion, Reflow und Statuskommunikation prüfen.
- wiederkehrende Abweichungen im jeweils vorhandenen gemeinsamen Package beheben statt app-lokale Sonderfälle zu ergänzen.
- visuelle Regressionen für die wichtigsten Seitengruppen als feste QA-Screenshots dokumentieren.

Abnahme:

- Jede Route der Scope-Matrix hat Desktop- und Mobile-Beleg, Befundstatus und benannten Owner.
- Keine offenen P0/P1-Befunde; P2-Befunde sind behoben oder bewusst mit Entscheidung dokumentiert.
- Keine sichtbaren Produktionsplatzhalter, abgeschnittenen Inhalte oder horizontalen Überläufe.
- Accessibility-Aussagen trennen sichtbare Evidenz von manuellen Screenreader- und Tastaturtests.

### Phase 4: Legacy-Abbau

Ziel: Alle als `REMOVE` oder abgeschlossene `DEPRECATE` klassifizierten Pfade werden in kleinen, reversiblen Schritten entfernt.

Empfohlene Reihenfolge:

1. ungenutzte Imports, Alias-Typen, Barrel-Imports und alte Props migrieren;
2. lokale Runtime-Fallbacks durch definierte Fehler-/Leerzustände ersetzen;
3. Seed-Owner in die Plattform verschieben, ohne App-Runtime-Imports;
4. alte Tokenunterstützung nach Ablauf- und Nutzungsnachweis entfernen;
5. einmalige Importskripte und leere lokale Datenspeicher archivieren oder entfernen;
6. Collection-Adapter nur nach Payload-CLI-, Importmap- und Buildnachweis entfernen;
7. `apps/old assets` anhand einer Asset-Hash-/Referenzprüfung bereinigen;
8. veraltete Feature Flags, Environment-Variablen und Dokumentation entfernen.

Jeder Entfernungsschritt erhält einen eigenen kleinen Patch mit Vorher-/Nachher-Nachweis. Datenmigrationen und produktive Inhalte werden nicht gemeinsam mit UI-Refactorings entfernt.

Abnahme:

- Kein produktiver Consumer importiert lokale Seed- oder Fallback-Inhalte.
- Kein undokumentierter Compatibility-Pfad bleibt im Runtime-Code.
- Repository-Suche nach vereinbarten Legacy-Begriffen liefert nur historische Migrationen oder explizit dokumentierte Ausnahmen.
- Clean Install, Seed auf leerer Datenbank, Migration einer bestehenden Datenbank, Build und Smoke-Test sind erfolgreich.

### Phase 5: Abschluss und Schutz vor Rückfällen

- Architektur- und API-Dokumentation auf den finalen Zustand aktualisieren.
- CI-Gates für Contract-Tests, Lint, Typecheck und Build verbindlich machen.
- eine kleine Ownership-Matrix für Collections, DTOs, Mapper, Routes und UI-Pakete dokumentieren.
- Regel ergänzen: Neue Fallbacks oder Kompatibilitäts-Aliase benötigen Owner, Ablaufdatum und Test.
- finalen Audit-Report mit entfernten Pfaden, bewusst behaltenen historischen Artefakten und Rest-Risiken veröffentlichen.

## Vorgesehene Arbeitspakete

| Paket | Inhalt                                             | Priorität | Voraussetzung            |
| ----- | -------------------------------------------------- | --------- | ------------------------ |
| A     | Build-, Dev-Script- und Runtime-Fehler             | P0        | keine                    |
| B     | Payload-Feld-/DTO-/Mapper-Matrix                   | P0        | A                        |
| C     | Contract-Tests und explizite Fehlersemantik        | P0        | B                        |
| D     | Informationsarchitektur und CTA-Logik              | P1        | B                        |
| E     | vollständiges Design-/Accessibility-Audit          | P1        | A                        |
| F     | lokale Runtime-Fallbacks entfernen                 | P1        | C, D                     |
| G     | Token-, Alias-, Prop- und Barrel-Legacy entfernen  | P1        | Nutzungs-/Ablaufnachweis |
| H     | Assets, Importscripts und Dokumentation bereinigen | P2        | Legacy-Matrix            |
| I     | finale CI- und Regression-Gates                    | P1        | C, E, F, G               |

## Dokumentation bei API-/DTO-Änderungen

Bei jeder Vertragsänderung werden mindestens angepasst:

- relevante Datei unter `apps/platform/docs/api/`
- `docs/content-ui-payload-audit.md`
- betroffene Contract-Dokumente unter `docs/`
- README des betroffenen Packages
- Feldpflicht, Optionalität, Validierung, Statuscodes, Fehlerfälle und fachliche Bedeutung
- Migrationshinweis, wenn sich gespeicherte Payload-Daten ändern

## Nicht Teil eines einzelnen Bereinigungspatches

- großes visuelles Redesign ohne Audit-Entscheidung
- Payload-Schemaänderung und vollständige UI-Neugestaltung im selben Patch
- Löschen historischer Migrationen
- neue Dependency nur für das Audit
- Entfernung alter Token oder Daten ohne Ablauf-/Bestandsnachweis

## Abschlusskriterien für das Gesamtvorhaben

- Website und Plattform bauen aus einem sauberen Checkout reproduzierbar.
- Alle öffentlichen Content- und Lead-Verträge sind dokumentiert und getestet.
- Payload-Ausfälle und ungültige Daten haben explizite, beobachtbare Zustände.
- Visuelle und logische Befunde sind für alle Scope-Routen abgeschlossen.
- Kein aktiver Legacy- oder Compatibility-Pfad bleibt ohne dokumentierte Ausnahme.
- Seeds, historische Migrationen und Runtime-Datenquellen sind klar voneinander getrennt.
- Lint, Typecheck, Build, Contract-Tests, Browser-Smoke-Tests und die definierte visuelle QA sind grün.
