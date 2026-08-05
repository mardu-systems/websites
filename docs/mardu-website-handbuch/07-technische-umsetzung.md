# Mardu Technische Umsetzung

**Stand:** 1. August 2026<br>
**Status:** Implementierungsleitlinie, noch kein freigegebener Umbauauftrag<br>
**Geltungsbereich:** `apps/mardu-de` und gemeinsam genutzte Pakete im bestehenden Monorepo

## 1. Ziel

Die neue `mardu.de` wird auf der vorhandenen technischen Architektur aufgebaut. Der visuelle Auftritt und die Seitenstruktur dürfen neu entstehen, ohne bewährte Layout-, Content-, Lead-, Metadata- oder Accessibility-Muster unnötig zu ersetzen.

## 2. Technische Ausgangslage

- Bun-/Turborepo-Monorepo,
- Next.js App Router,
- React,
- Tailwind CSS,
- gemeinsame Pakete für Layout, Sektionen, UI, Content, Leads und Site-Konfiguration,
- Payload-basierte Plattform- und Contentwege,
- vorhandene Metadata-, JSON-LD-, Sitemap-, Robots-, CSP- und Analytics-Strukturen,
- umfangreicher uncommitteter MAY-STUDIO-Umbau in `apps/mardu-de`.

Vor der Implementierung werden die tatsächlich installierten Versionen aus den jeweiligen `package.json`-Dateien übernommen. Veraltete Angaben in älteren `AGENTS.md`- oder Konzeptdateien sind keine Versionsquelle.

## 3. Schutz des bestehenden Arbeitsstands

Der aktuelle Arbeitsbaum enthält viele nicht eingecheckte Änderungen und neue Dateien. Vor einem Neuaufbau:

1. aktuellen Redesign-Stand inventarisieren,
2. Verantwortlichkeit klären,
3. Stand in einem sicheren Commit oder separaten Branch sichern,
4. entscheiden, welche Dateien Quelle, Referenz oder zu verwerfen sind,
5. erst danach gemeinsame Kernpfade umbauen.

Keine bestehenden Nutzeränderungen still überschreiben.

## 4. Wiederzuverwendende Pakete

| Paket/Struktur        | Verantwortung                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------- |
| `@mardu/layout`       | typisierte Header-, Footer- und Shell-Struktur, Header-Messung und vorhandene Terminlogik |
| `@mardu/sections`     | wiederverwendbare Marketingsektionen; visuell an neue Reference anpassen                  |
| `@mardu/ui`           | UI-Primitives, Buttons, Formulare und Accessibility-Basis                                 |
| `@mardu/content-core` | dokumentierte Content-DTOs und Payload-Mapping                                            |
| `@mardu/lead-core`    | Kontakt-, Consent-, Newsletter- und Recaptcha-Muster                                      |
| `@mardu/site-config`  | Site-Konfiguration, Branding und Feature-Flags                                            |
| `@mardu/catalog-ui`   | nur dort, wo ein echter Produktkatalog benötigt wird                                      |
| `@mardu/solutions-ui` | vorhandene Lösungsmuster nach Prüfung der neuen IA                                        |
| `@mardu/blog-ui`      | Wissens- und Artikelgrundlage, visuell neu einordnen                                      |
| `data/*.tsx`          | seitenspezifische, typisierte Inhalte getrennt von Rendering                              |

Neue Dependencies oder parallele Abstraktionen werden nur eingeführt, wenn vorhandene Mittel den dokumentierten Vertrag nicht erfüllen.

## 5. Content Ownership

### Seitennaher Inhalt

Headline, Subline, CTA, Seitensektionen und Crosslinks bleiben in seitennahen `data/*.tsx`-Dateien oder im bestehenden CMS-Weg.

### Präsentationskomponenten

Gemeinsame Komponenten rendern Daten und Zustände. Sie enthalten keine versteckten Positionierungs-, Zielgruppen- oder Claim-Entscheidungen.

### Claim-Status

Claim-Text, Status, Beleg und Prüfdatum werden nicht als freie Strings über mehrere Seiten dupliziert. Vor einem neuen Modell wird geprüft, ob vorhandene Content- oder CMS-Verträge erweitert werden können.

### Öffentliche Verträge

Ändert sich ein öffentlich sichtbares DTO oder eine API, wird die vorhandene Dokumentation im selben Patch aktualisiert.

## 6. Zielrouten

Die kanonischen Routen stehen in [Informationsarchitektur](./04-informationsarchitektur.md). Die erste technische Umsetzung konzentriert sich auf:

- `/`,
- `/system`,
- `/system/maschinenfreigabe`,
- `/loesungen/hochschulen-lehrwerkstaetten`,
- `/sicherheit-betrieb`,
- `/referenzen/artandtech-space`,
- `/standort-check`,
- `/kontakt`,
- `/impressum`,
- `/datenschutz`.

Weitere Seiten werden erst ergänzt, wenn ihre Inhalte und Belege vorhanden sind.

## 7. Bekannte aktuelle Konflikte

### Site-Key und CMS

`mardu-de` lädt Produkt- und Lösungsinhalte derzeit teilweise mit dem Site-Key `mardu-space`. Platform-Seeds veröffentlichen Inhalte ebenfalls für `mardu-space`. Dadurch können neue lokale `mardu-de`-Daten ungenutzt bleiben.

Vor dem Redesign ist eine eindeutige Strategie nötig:

- kanonischer Site-Key,
- Migration bestehender Inhalte,
- Seed-Verhalten,
- Fallbacks,
- Redirects und Domainstrategie.

### Navigation und Sitemap

Aktuelle Header- und Footerlinks verweisen teilweise auf nicht vorhandene Routen. Produkt-Hashlinks stimmen nicht immer mit erzeugten IDs überein. Neue Seiten fehlen teilweise in der Sitemap.

Navigation, Routen, Breadcrumbs, Sitemap und Redirects werden aus einer gemeinsamen kanonischen Map abgeleitet oder in einem gemeinsamen Review gepflegt.

### Whitepaper

Der kopierte `mardu-de`-Whitepaperflow verweist auf einen Downloadweg, der nicht vollständig verdrahtet ist. Der Flow wird entweder fachlich und technisch repariert oder zugunsten konkreter Wissensinhalte entfernt.

### Construction und Metadaten

Metadaten und Copy erwähnen weiterhin `mardu.construction`, obwohl die neuere Strategie die Vertikale nicht mehr als aktuelles Angebot führt. Diese Entscheidung wird vor dem Launch einheitlich in Hero, Metadata, JSON-LD, Footer und `llms.txt` umgesetzt.

### Produktnamen und Preise

Businessplan, Code und MAY-Dokumente verwenden unterschiedliche Produktnamen und Preisstände. Vor Produkt- oder Preisseiten werden Nomenklatur und Preisquelle verbindlich festgelegt.

## 8. Layout und Shell

Die gemeinsame Shell bleibt der bevorzugte Ausgangspunkt. Lokale Kopien müssen begründet werden und dürfen nicht verlieren:

- Feature-Flag-Filterung,
- Termin-/CTA-Integration,
- Header-Messung,
- Footer-Funktionen,
- Accessibility-Verhalten,
- konsistente Navigationstypen.

Die neue visuelle Gestaltung wird über Tokens, Varianten und zusammengesetzte Komponenten umgesetzt, nicht durch den Verlust gemeinsamer Funktionen.

## 9. Design Tokens

Die [Design Reference](./02-design-reference.md) definiert semantische Rollen. Technisch gelten:

- Farben als benannte semantische Tokens,
- Statusfarben getrennt von Markenfarben,
- Abstände und Radien als wiederverwendbare Skalen,
- Typografie über die vorhandene Aktiv-Grotesk-Variable,
- keine Magic-Strings für wiederkehrende Farben oder Zustände,
- `bg-mardu-paper` oder ähnliche Utilities nur mit tatsächlich definiertem Token,
- Dark-Mode-Werte nur nach visueller und kontrastbezogener Prüfung.

## 10. Komponentenverträge

Komponenten aus [Seiten- und Komponentenmuster](./05-seiten-und-komponentenmuster.md) benötigen klar dokumentierte Props beziehungsweise DTOs, wenn sie paketübergreifend verwendet werden.

Ein Vertrag beschreibt mindestens:

- Pflicht- und optionale Felder,
- erlaubte Varianten,
- Statuswerte,
- CTA-Ziel,
- responsive Verhalten,
- leere und fehlerhafte Zustände,
- Accessibility-Labels,
- CMS-/Payload-Mapping, falls vorhanden.

App-spezifische Copy gehört nicht in ein Shared Package.

## 11. Lead- und Standort-Check

Der Standort-Check verwendet bestehende Lead- und Consent-Muster.

### Inhalt

- Umgebung,
- Anzahl und Typ repräsentativer Türen/Maschinen,
- heutige Identitäts- und Einweisungsverwaltung,
- vorhandene Ausweise/IAM,
- primäres Problem,
- beteiligte Rollen,
- Kontaktdaten und Terminwunsch.

### Technische Anforderungen

- serverseitige Validierung,
- dokumentierte Pflicht- und optionale Felder,
- klare Fehlerfälle,
- Spam-Schutz,
- Consent und Datenschutzhinweis,
- Erfolgs- und Wiederholungszustand,
- nachvollziehbarer interner Empfänger/CRM-Weg,
- keine sensiblen Maschinendetails ohne Zweck.

## 12. Media und Bilder

- vorhandene Medienquelle vereinheitlichen,
- erlaubte Remote-Domains und CMS-Media-URLs synchronisieren,
- Originalbilder optimieren,
- responsive Größen und moderne Formate erzeugen,
- Breite und Höhe angeben, um Layoutsprünge zu vermeiden,
- Alt-Texte aus dem Zweck ableiten,
- keine Platzhalter für fehlende Partner- oder Produktbilder.

## 13. Accessibility

Technische Mindestanforderungen:

- Viewport-Zoom nicht deaktivieren,
- sichtbare Fokuszustände,
- mobile Navigation mit Fokusführung, Escape und Scroll-Lock,
- semantische Überschriften,
- echte Buttons und Links,
- Tastaturbedienung für Tabs, Accordions und Menüs,
- Status nicht nur farblich,
- Formfehler programmatisch zugeordnet,
- Reduced Motion,
- keine feste Leiste über Inhalten,
- Diagramme mit Textalternative.

## 14. Metadata und Auffindbarkeit

Jede kanonische Seite erhält:

- eindeutigen Title und Description,
- kanonische URL,
- korrekte Open-Graph-Daten,
- reale Share-Grafik,
- Sitemap-Eintrag,
- passende Robots-Entscheidung,
- strukturierte Daten nur für tatsächlich sichtbaren Inhalt,
- konsistente Benennung mit Hero und Navigation.

## 15. Umsetzungsfolge

### Phase 0 – sichern

Arbeitsstand und Redesignvarianten sichern.

### Phase 1 – Wahrheit festlegen

Produktstatus, Claims, Site-Key, Domain, Nomenklatur, Preise und Partner bestätigen.

### Phase 2 – Wireframes

Kernseiten mit realen Inhalten und Zuständen strukturieren.

### Phase 3 – visueller Zielzustand

Ausgewählte Brand- und Designrichtung in Desktop und Mobile festlegen.

### Phase 4 – Basis korrigieren

Contentquelle, Navigation, Redirects, Sitemap, Shell und Leadwege konsistent machen.

### Phase 5 – Kernseiten umsetzen

Homepage, System, Maschinenfreigabe, Hochschule, Trust, Referenz und Standort-Check.

### Phase 6 – verifizieren

Inhalt, Funktion, Accessibility, Performance und visuelle Übereinstimmung prüfen.

### Phase 7 – mit Belegen erweitern

Cases, weitere Zielgruppen und Datenbereiche nur nach realer Validierung ergänzen.

## 16. Checks

Je nach betroffenem Bereich:

- Formatierung,
- Lint,
- Typecheck,
- Unit- und Integrationstests,
- Produktionsbuild,
- Link- und Redirectprüfung,
- Formular- und Consent-Test,
- Tastatur- und Screenreaderprüfung,
- Kontrastprüfung,
- responsive visuelle QA,
- Performance- und Bildgewichtsprüfung,
- Claim-Abgleich mit dem Claim-Register.

## 17. API- und DTO-Dokumentation

Dieses Handbuch ändert noch keine API und kein DTO.

Bei späteren Änderungen werden dokumentiert:

- fachliche Bedeutung,
- Request- und Response-Modelle,
- Pflicht- und optionale Felder,
- Validierung,
- Statuscodes und Fehlerfälle,
- Consent und Datenschutz,
- Migrationsweg,
- Breaking Changes,
- OpenAPI-, Swagger-, XML- oder Markdown-Dokumentation im vorhandenen Projektweg.

## 18. Definition of Done

- Seite entspricht ihrer dokumentierten Rolle.
- Inhalte erfüllen Brand-, Copy- und Claim-Regeln.
- Komponenten verwenden vorhandene Patterns oder begründen eine Erweiterung.
- Navigation, Breadcrumb, Sitemap und Redirect stimmen überein.
- Formulare und CTAs funktionieren vollständig.
- Accessibility-Anforderungen sind geprüft.
- reale Assets sind optimiert und freigegeben.
- relevante Tests, Typecheck, Lint und Build sind erfolgreich.
- öffentliche Verträge und Dokumentation sind aktuell.
- offene Risiken sind benannt.
