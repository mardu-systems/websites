# Mardu Websites – Arbeitsanweisungen

Diese Datei enthält nur repositoryweite Regeln. Für Arbeiten in `apps/mardu-de`
oder `apps/platform` gilt zusätzlich die dortige `AGENTS.md`; die jeweils nähere
Datei ist bei Abweichungen maßgeblich. Halte jede `AGENTS.md` unter 500 Zeilen.

## Projektkontext

- Das Monorepo nutzt Bun Workspaces und Turborepo. Verwende ausschließlich die
  im Root-`package.json` festgelegte Bun-Version und den vorhandenen `bun.lock`.
- `apps/mardu-de` ist die öffentliche Website. `apps/platform` enthält Payload
  Admin, Content-API und Lead-Backend. Beide Apps basieren auf Next.js 16.
- Wiederverwendbarer Code gehört nach `packages/*`: UI-Primitives nach
  `packages/ui`, Marketing-Sektionen nach `packages/sections`, Content-Verträge
  und Mapper nach `packages/content-core`, Lead-Logik nach `packages/lead-core`
  und Site-Konfiguration nach `packages/site-config`.
- Prüfe vor Änderungen vorhandene Frameworks, Dependencies, APIs, Services,
  DTOs, Komponenten, Utilities, Tests, Patterns und Konventionen. Verwende
  vorhandene Mittel, bevor du neue Abstraktionen oder Dependencies einführst.
- Für deutschsprachige Inhalte ist UTF-8 verbindlich. Verwende Umlaute und `ß`
  normal; nutze ASCII-Ersatzschreibweisen nur bei einer technischen Einschränkung.

## Arbeitsablauf

1. Lies zuerst den betroffenen Code, die nächste `AGENTS.md`, relevante Tests,
   Konfigurationen und Dokumentation.
2. Identifiziere bestehende Patterns und Abhängigkeiten. Prüfe bei Next.js-Code
   zusätzlich die versionsspezifischen Hinweise der app-lokalen `AGENTS.md`.
3. Kläre Unklarheiten, die Scope, Verhalten, Datenmodell, öffentliche Verträge,
   Architektur, Sicherheit oder Akzeptanzkriterien materiell verändern. Ermittle
   aus dem Repository ableitbare Antworten selbst. Bei einer kleinen, eindeutigen
   Aufgabe ist keine zeremonielle Rückfrage nötig.
4. Formuliere vor der Änderung einen kurzen, prüfbaren Plan.
5. Implementiere den kleinsten vollständigen Patch. Vermeide Nebenrefactorings
   und bewahre nicht zusammenhängende Änderungen im Worktree.
6. Führe die passenden Prüfungen aus und berichte Ergebnisse, Auslassungen und
   verbleibende Risiken wahrheitsgemäß.

## 1. Kontinuierliche Selbstverbesserung

- Wenn der Benutzer eine Arbeitsweise korrigiert oder ein Review einen
  wiederkehrenden, repositoryspezifischen Fehler aufdeckt, prüfe, ob daraus eine
  dauerhafte Regel für die nächste `AGENTS.md` entsteht.
- Ergänze nur Regeln, die wiederverwendbar, nicht bereits vorhanden und nicht
  selbstverständlich aus Code oder Tooling ableitbar sind. Fasse bestehende
  Regeln zusammen, statt Varianten anzuhängen, und entferne überholte Hinweise.
- Speichere keine einmaligen Taskdetails, Session-Logs oder persönliche Daten in
  `AGENTS.md`. Mehrstufige Spezialabläufe und umfangreiches Fachwissen gehören in
  Skills oder dedizierte Dokumentation; verlinke sie hier nur bei häufigem Bedarf.

## 2. Solider Test- und Verifikationsloop

- Reproduziere Fehler vor dem Fix möglichst mit einem fehlschlagenden Test oder
  einem klar dokumentierten Reproduktionsweg.
- Ergänze oder ändere zuerst den engsten sinnvollen Test, implementiere danach
  den minimalen Fix und führe den Test erneut aus. Teste Verhalten und öffentliche
  Verträge, nicht interne Implementierungsdetails.
- Starte mit gezielten Prüfungen und erweitere anschließend risikobasiert auf die
  betroffene App und den Workspace. Relevante Root-Befehle sind:

  ```bash
  bun run lint
  bun run type-check
  bun test
  bun run build
  ```

- Für app-spezifische Checks verwende vorhandene Skripte mit
  `bun run --cwd apps/<app> <script>`. Führe bei reinen Dokumentationsänderungen
  keine sachfremden Builds aus; prüfe stattdessen Format, Links und Konsistenz.
- Behebe keine fremden Fehler stillschweigend. Grenze sie vom eigenen Patch ab
  und dokumentiere sie als bereits vorhanden oder nicht durch die Änderung
  verursacht.

## 3. Klärungsfragen

- Frage vor der Implementierung nach, wenn mehrere fachlich unterschiedliche
  Lösungen plausibel sind und die Wahl später teuer oder inkompatibel wäre.
- Frage zwingend vor Breaking Changes, neuen externen Services, Datenmigrationen,
  destruktiven Aktionen oder einer wesentlichen Erweiterung des Scopes.
- Stelle wenige konkrete Fragen mit Kontext und einer begründeten Empfehlung.
  Blockiere nicht wegen Details, die sicher aus Code, Tests oder Dokumentation
  ermittelt werden können.

## 4. Strikte Typisierung und Verträge

- TypeScript bleibt im Strict Mode. Verwende kein `any`, kein `@ts-ignore` und
  keine ungesicherten Type Assertions, um Fehler zu verdecken. Nutze `unknown`,
  Type Guards, generische Typen oder validierte Schemas.
- Validiere untrusted Daten an Systemgrenzen. Interne Typen ersetzen keine
  Runtime-Validierung von Requests, Umgebungsvariablen oder externen Antworten.
- Verwende vorhandene DTOs und gemeinsame Modelle. Erzeuge keine parallelen
  Varianten desselben Vertrags und halte discriminated unions exhaustiv.
- Öffentliche APIs und DTOs müssen dokumentiert werden: fachliche Bedeutung,
  Pflicht- und optionale Felder, Validierung, Responses, Statuscodes und
  Fehlerfälle. Aktualisiere vorhandene OpenAPI-, Swagger-, XML- oder Markdown-
  Dokumentation zusammen mit dem Vertrag. Vermeide stille Breaking Changes.

## 5. Dependencies

- Führe keine neue Dependency ein, wenn Plattform-APIs, vorhandene Pakete oder
  eine kleine lokale Implementierung die Aufgabe wartbar lösen.
- Prüfe vor einer neuen Dependency anhand offizieller Quellen: aktive Wartung,
  aktuelle Releases, Sicherheitslage, Lizenz, Bundle-/Runtime-Kosten sowie
  Kompatibilität mit Bun, Next.js 16, React 19 und der vorhandenen Architektur.
- Bevorzuge stabile, verbreitete Pakete mit klarer Ownership. Nutze kein nicht
  gewartetes, experimentelles oder unnötig großes Paket ohne ausdrückliche
  Begründung und Zustimmung. Aktualisiere Lockfile und Dokumentation gemeinsam.
- Verwende `workspace:*` für interne `@mardu/*`-Abhängigkeiten und erzeuge keine
  zweite Quelle für bereits zentral gepinnte Versionen oder Overrides.

## 6. Benennung und Lesbarkeit

- Folge zuerst der Konvention des betroffenen Bereichs. Standard im TypeScript-
  Code: `kebab-case` für Dateien, `PascalCase` für React-Komponenten und Typen,
  `camelCase` für Variablen und Funktionen sowie `UPPER_SNAKE_CASE` für echte
  Konstanten und Umgebungsvariablen.
- Verwende fachlich präzise Namen. Vermeide unklare Abkürzungen, generische Namen
  wie `data`, `item`, `helper` oder `utils` ohne Kontext und widersprüchliche
  Begriffe für dasselbe Domänenkonzept.
- Ersetze Magic Strings und Magic Numbers durch vorhandene Konstanten, Config,
  Enums oder benannte Werte, sofern das die Bedeutung tatsächlich klärt.

## 7. Projektstruktur

- Platziere app-spezifischen Code in der jeweiligen App. Verschiebe Code erst in
  ein Shared Package, wenn er von mehreren Apps genutzt wird oder eine etablierte
  repositoryweite Verantwortung erfüllt.
- Respektiere vorhandene Modulgrenzen und öffentliche `exports`. Importiere keine
  privaten Interna eines Packages und erzeuge keine zyklischen Abhängigkeiten.
- Ordne neue Dateien nach dem bestehenden Feature- und App-Router-Muster ein.
  Lege keine parallelen Ordnersysteme oder Sammelmodule ohne konkreten Bedarf an.
- Halte Server-Code, Secrets und server-only APIs aus Client-Bundles heraus.

## 8. End-to-End-Tests

- Prüfe kritische, appübergreifende Nutzerflüsse Ende-zu-Ende, insbesondere wenn
  Routing, Formulare, Authentifizierung, Persistenz, Payload oder externe APIs
  gemeinsam betroffen sind.
- Nutze den vorhandenen E2E-Stack und vorhandene Fixtures. Falls kein E2E-Harness
  existiert, füge nicht beiläufig ein neues Framework hinzu: dokumentiere den
  manuellen Ablauf und kläre die Einführung eines passenden Tools separat.
- E2E-Tests müssen deterministisch sein, Testdaten isolieren und auf beobachtbares
  Verhalten warten; keine festen Sleeps oder Abhängigkeit von Produktionsdaten.

## 9. UI- und visuelle Tests

- Verifiziere UI-Änderungen im laufenden Browser auf den betroffenen Routen und
  mindestens in relevanten Desktop- und Mobile-Viewports.
- Prüfe sichtbare Zustände wie Loading, Empty, Error, Erfolg, lange Inhalte und
  Tastaturbedienung. Achte auf Semantik, Fokusführung, Kontrast und Reduced Motion.
- Vergleiche bei visuellen Änderungen Screenshots vor und nach dem Patch. Wenn es
  keine automatisierte visuelle Testinfrastruktur gibt, dokumentiere die manuell
  geprüften Routen und Viewports statt unbelegte Aussagen zu machen.

## 10. Performance

- Miss oder profiliere, bevor du optimierst, und nenne die relevante Messgröße.
  Nutze bei Bundle-Fragen das vorhandene `build:analyze`-Skript.
- Bewahre Server Components als Standard. Füge Client Components, globale States,
  Effekte und Hydration nur hinzu, wenn Interaktivität sie erfordert.
- Vermeide unnötige Requests, N+1-Zugriffe, große Client-Bundles, Render-Schleifen
  und unoptimierte Medien. Nutze vorhandene Next.js- und Asset-Pipelines.
- Setze Memoization, Caching oder Parallelisierung nur mit korrekter Invalidierung
  und einem belegbaren Nutzen ein; Performance darf Korrektheit nicht gefährden.

## 11. Fehlerbehandlung

- Ignoriere Fehler nicht und verwende keine leeren `catch`-Blöcke. Behandle einen
  Fehler dort, wo Kontext für Recovery, Mapping oder eine Nutzerreaktion besteht;
  erhalte beim Weiterwerfen die ursprüngliche Ursache.
- Validiere früh an Systemgrenzen und liefere stabile, dokumentierte Fehlerformen.
  Exponiere keine Secrets, Stacktraces oder internen Implementierungsdetails.
- Zeige Nutzern klare, handlungsorientierte Fehlermeldungen. Logging enthält
  ausreichend Kontext zur Diagnose, aber keine Tokens, Passwörter oder unnötigen
  personenbezogenen Daten.
- Definiere Timeouts, Retries und Fallbacks bewusst. Wiederhole nur idempotente
  Operationen und vermeide unbegrenzte Retry-Schleifen.

## 12. Architektur und Systemdesign

- Bevorzuge die einfachste Lösung, die die aktuellen Anforderungen vollständig
  erfüllt. Führe keine neue Schicht, keinen Service oder kein Pattern nur für eine
  hypothetische spätere Nutzung ein.
- Halte Verantwortlichkeiten und Datenfluss eindeutig. Domänenlogik gehört nicht
  in Präsentationskomponenten; Integrationsdetails dürfen nicht unkontrolliert in
  gemeinsame Verträge durchsickern.
- Prüfe bei Architekturänderungen Abhängigkeiten, Failure Modes, Sicherheit,
  Observability, Migration, Rollback, Betriebskosten und Rückwärtskompatibilität.
- Bei einer folgenreichen Entscheidung: dokumentiere Kontext, Alternativen,
  Entscheidung und Konsequenzen im bestehenden Dokumentationsweg und hole vor
  der Implementierung die fachliche Klärung ein.

## Was in Skills oder Dokumentation gehört

- In `AGENTS.md` gehören kurze, dauerhafte Regeln, Befehle, Architekturgrenzen,
  Benennungskonventionen und häufige repositoryspezifische Stolperfallen.
- In Skills gehören mehrstufige, bei Bedarf auszuführende Workflows, detaillierte
  Framework-Anleitungen, wiederverwendbare Checklisten, Skripte und Templates.
- In `docs/` oder READMEs gehören Produktwissen, Betriebs- und Deployment-Guides,
  API-Referenzen, ADRs und ausführliche Erklärungen.
- In Tests, Linter, Typechecker und CI gehören maschinell erzwingbare Regeln.
  Dokumentiere sie nicht nur, wenn sie automatisiert zuverlässig prüfbar sind.

## Abschlussbericht

Berichte am Ende knapp:

- geänderte Dateien und Umsetzung,
- wiederverwendete APIs, Komponenten und Patterns,
- angepasste API-/DTO-Dokumentation oder warum keine nötig war,
- ausgeführte Checks mit Ergebnis,
- offene Risiken und nicht geprüfte Bereiche.
