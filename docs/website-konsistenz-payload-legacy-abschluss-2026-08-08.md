# Abschluss: Website-Konsistenz, Payload-Verträge und Legacy-Abbau

Stand: 8. August 2026

## Ergebnis

- Next.js 16 baut `mardu-de` mit Turbopack; die Bun-Dev-Skripte verwenden die gültige `--cwd`-Syntax.
- Der gemeinsame Site-Shell besitzt genau ein Header-Offset. Seitenlokale, nicht gesetzte Header-Variablen wurden entfernt.
- Base-UI-Link-Buttons verwenden korrekte Anchor-Semantik.
- `apps/platform` ist alleiniger Runtime-Owner für Lösungen, Roadmap, Integrationen, Katalog und Rechtstexte.
- Payload-Reads unterscheiden leere Collections von Netzwerk-, HTTP- und DTO-Vertragsfehlern.
- Lead-Rollen, Sources und Newsletter-Tokens akzeptieren ausschließlich die aktuellen Verträge.
- Produktanfragen transportieren den vollständigen `CatalogInquiryContextDto` zur Kontakt-API.
- Die sichtbare Ansprache von `mardu.de` ist auf „du“ vereinheitlicht.
- Root-CI prüft Lint, Typecheck und Tests sowie beide Builds gegen eine migrierte und befüllte temporäre Payload-Datenbank.

## Legacy-Matrix

| Kandidat                                          | Entscheidung | Ergebnis                                                                              |
| ------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| `apps/old assets`                                 | REMOVE       | Referenzierte Kataloglogos zur Plattform verschoben; Rest aus dem Repository entfernt |
| leere Newsletter-/Preorder-JSON-Dateien           | REMOVE       | entfernt                                                                              |
| `migrate-legacy-data.mjs`                         | REMOVE       | Skript, Package-Script und Anleitung entfernt                                         |
| lokale Solutions-/Roadmap-/Integrations-Fallbacks | REMOVE       | durch Payload und explizite Leer-/Fehlerzustände ersetzt                              |
| Katalog- und Solution-Seeds                       | MIGRATE      | nach `apps/platform/data` verschoben                                                  |
| colon-delimited Newsletter-Token                  | REMOVE       | Parser entfernt; Ablehnung ist getestet                                               |
| Rollen-/Source-Aliase                             | REMOVE       | nur aktuelle Enum-Werte werden validiert                                              |
| Layout-Typ-Aliase                                 | REMOVE       | entfernt                                                                              |
| `@mardu/ui`-Root-Barrel                           | REMOVE       | Export und Datei entfernt; nur Subpath-Imports                                        |
| alte Hero-Medien-Props                            | REMOVE       | `HeroMediaCard.media` ist verpflichtend                                               |
| Collection-Adapter `*.js`                         | REMOVE       | ungenutzte Reexports entfernt                                                         |
| mardu-de API-Catch-all                            | REMOVE       | nur explizite Lead-Proxies bleiben                                                    |
| Payload-Migrationen                               | HISTORY      | bewusst unverändert erhalten                                                          |

## Öffentliche Fehlerverträge

- Content: `ContentApiError` mit `NETWORK`, `HTTP` oder `INVALID_PAYLOAD`.
- Lead-POSTs: `400` bei fehlerhaftem JSON oder DTO, `429` bei Rate-Limit, `503` bei fehlendem produktivem Captcha, `500` bei internen Persistenz-/Versandfehlern.
- Nicht vorhandener veröffentlichter Slug: 404.
- Erfolgreiche leere Collection: expliziter Leerzustand der jeweiligen Seite.

## Schutz vor Rückfällen

Neue Runtime-Fallbacks, Aliase oder alternative Payload-Quellen benötigen einen benannten Owner, einen dokumentierten Zweck, ein Ablaufdatum und einen Test. Seeds dürfen nicht aus `apps/mardu-de` importiert werden.

## Verifikation

- `bun run build`: erfolgreich für `mardu-de` mit Turbopack und für die Payload-Plattform mit dem stabilen Webpack-Build.
- `bun run type-check`: erfolgreich.
- `bun test`: 20 Tests erfolgreich, 0 fehlgeschlagen.
- `bun run lint`: erfolgreich ohne Fehler; 20 bestehende Warnungen betreffen ausschließlich historische Payload-Migrationen.
- `git diff --check`: erfolgreich.
- Browser-QA bei 1440 px und 390 px: zentrale Seiten, Mobile-Navigation, Link-Semantik, Produktanfrage-Kontext, Bilder und horizontaler Overflow geprüft; keine finalen Browserfehler oder -warnungen.
- React Doctor: Vertrags-, Fetch-, Zod-, Metadaten-, Key- und Framer-Motion-Befunde behoben. Verbleibende Hinweise betreffen bestehende öffentliche Exporte, zwei durch Base UI korrekt gerenderte Link-Buttons sowie die interne Größe des Whitepaper-Formulars.

Der repository-weite `format:check` bleibt wegen bereits bestehender Formatabweichungen in generierten Dateien, Skills, Migrationen und weiteren unberührten Dateien rot. Eine globale Neuformatierung ist bewusst nicht Teil dieses fachlichen Patches, da sie umfangreiche, sachfremde Änderungen erzeugen würde.
