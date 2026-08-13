# Vercel Deployment und Release-Betrieb

Diese Anleitung beschreibt den gemeinsamen Release von `apps/platform` und `apps/mardu-de`. Ein Release ist erst freigegeben, wenn Platform, Payload-Inhalte und öffentliches Frontend gemeinsam geprüft wurden.

## Zielbild

- Ein Git-Repository mit zwei getrennten Vercel-Projekten.
- Projekt `websites-platform` mit Root Directory `apps/platform`.
- Projekt `mardu-de` mit Root Directory `apps/mardu-de`.
- `Include source files outside of the Root Directory` ist für beide Projekte aktiv, damit `packages/*` verfügbar bleibt.
- Preview verwendet eine eigene Platform-Instanz und eine eigene Datenbank. Preview darf niemals auf `DATABASE_URI` der Produktion zeigen.
- Production wird nicht neu gebaut, sondern aus einem vollständig geprüften Preview-Artefakt promotet.
- `ALLOW_LOCAL_CONTENT_IMAGES=true` ist ausschließlich für den lokalen CI-Upstream vorgesehen und darf in keiner Vercel-Umgebung gesetzt sein.

Vercel erkennt den Root-`bun.lock` und die Next.js-Projekte. Install-, Build- und Output-Commands werden nicht überschrieben. `vercel.json` legt Bun `1.x` fest; der Workspace selbst pinnt die konkrete CI-Version.

## Umgebungsvariablen

Secrets werden ausschließlich in Vercel beziehungsweise in lokalen `.env.*.local`-Dateien gespeichert. Werte mit `NEXT_PUBLIC_` sind Teil des Browser-Bundles und dürfen keine Secrets enthalten.

### `mardu-de`

| Variable                                                                             | Production                           | Preview                                       | Bedeutung                                         |
| ------------------------------------------------------------------------------------ | ------------------------------------ | --------------------------------------------- | ------------------------------------------------- |
| `APP_URL`                                                                            | `https://www.mardu.de`               | Preview-Origin                                | Öffentlicher Ursprung für Links und Integrationen |
| `MARDU_PLATFORM_ORIGIN`                                                              | `https://platform.mardu.de`          | Dedizierte Preview-/Staging-Platform          | Content- und Lead-Upstream                        |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`                                                     | erforderlich                         | eigener Preview-Key oder bewusstes Test-Setup | Öffentlicher reCAPTCHA-Schlüssel                  |
| `PAYLOAD_FETCH_TIMEOUT_MS`                                                           | optional, Standard `10000`           | optional                                      | Content-Timeout zwischen 1.000 und 30.000 ms      |
| `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`                                                  | optional                             | normalerweise leer                            | GA4                                               |
| `MARDU_DE_ENABLE_BLOG` / `MARDU_DE_ENABLE_INTEGRATIONS` / `MARDU_DE_ENABLE_PRODUCTS` | optional                             | optional                                      | Statischer Feature-Flag-Fallback                  |
| `FLAGS` / `FLAGS_SECRET`                                                             | erforderlich für Dashboard-Steuerung | eigene Werte je Environment                   | Vercel-Flags-Auswertung und geschützte Discovery  |

### `websites-platform`

| Variable                                                  | Production                                         | Preview                                 | Bedeutung                                                  |
| --------------------------------------------------------- | -------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `DATABASE_URI`                                            | erforderlich                                       | eigene Preview-Datenbank                | PostgreSQL-Verbindung                                      |
| `PAYLOAD_SECRET`                                          | erforderlich                                       | eigener Wert                            | Signatur-/Payload-Secret                                   |
| `PAYLOAD_PUBLIC_SERVER_URL`                               | `https://platform.mardu.de`                        | Platform-Preview-Origin                 | Öffentliche Payload-/Admin-URL                             |
| `MARDU_PLATFORM_ORIGIN`                                   | `https://platform.mardu.de`                        | Platform-Preview-Origin                 | Links in Newsletter- und Lead-Flows                        |
| `NEWSLETTER_SECRET`                                       | erforderlich                                       | eigener Wert                            | Signatur von Bestätigungs- und Abmelde-Tokens |
| `RESEND_API_KEY`                                          | erforderlich                                       | Test-Key oder kontrollierter Versand    | E-Mail-Versand                                             |
| `EMAIL_FROM` / `EMAIL_TO`                                 | erforderlich                                       | Test-Absender und internes Testpostfach | Absender und Lead-Empfänger                                |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` | erforderlich                                       | eigenes Test-Setup                      | Browser- und Serverteil der Abuse Protection               |
| `BLOB_READ_WRITE_TOKEN`                                   | erforderlich, wenn Uploads über Vercel Blob laufen | eigener Preview-Store                   | Medien-Uploads                                             |
| `OIDC_*`                                                  | als vollständige Gruppe, falls SSO aktiv ist       | separate Preview-Client-Konfiguration   | Payload-Admin-SSO                                          |
| `TWENTY_*`                                                | optional                                           | optional/Testsystem                     | Nicht blockierende CRM-Synchronisation                     |
| `MARDU_PLATFORM_ENABLE_*` / `FLAGS`                       | optional                                           | optional                                | Feature Flags                                              |

Vor jedem Release die Variablen getrennt pro Projekt und Environment prüfen:

```bash
vercel env ls production
vercel env ls preview
```

`vercel env pull` überschreibt die Zieldatei. Produktionswerte nur in eine ignorierte Datei ziehen und niemals committen:

```bash
vercel env pull .env.production.local --yes --environment=production
```

## Content-Flags auf mardu.de

Die öffentlichen Bereiche Blog, Integrationen und Produkte verwenden die Vercel-Flag-Keys
`blog`, `integrations` und `products`. Alle drei sind im Code standardmäßig deaktiviert. Im
deaktivierten Zustand fehlen die Bereiche in Header, Footer, internen Einstiegen und Sitemap;
auch `llms.txt` verlinkt sie nicht. Direkte Seitenaufrufe liefern HTTP 404 und versteckte Metadaten
bleiben `noindex`.

Aktivierung ohne neuen Code-Release:

1. Im Vercel-Projekt `mardu-de` unter **Flags** das gewünschte Flag öffnen.
2. Zuerst Preview konfigurieren, Zielgruppe `Everyone` auf `true` setzen und speichern.
3. Content, Navigation, Sitemap, Responsive-Verhalten und SEO in Preview abnehmen.
4. Dieselbe Konfiguration separat für Production setzen und unmittelbar den Release-Verifier ausführen.

```bash
RELEASE_BASE_URL=https://www.mardu.de \
RELEASE_EXPECT_HIDDEN_PATHS=/blog,/integrations,/products \
bun run --cwd apps/mardu-de release:verify
```

`RELEASE_EXPECT_HIDDEN_PATHS` enthält nur die aktuell deaktivierten Landing-Pfade. Nach der
Aktivierung wird der betreffende Pfad aus der Liste entfernt. Der Verifier stellt sicher, dass
deaktivierte Bereiche weder in der Sitemap stehen noch einen anderen Status als 404 liefern.

Die Flags sperren bewusst nur das öffentliche mardu.de-Frontend. Payload-Inhalte und öffentliche
Platform-API-Verträge bleiben bestehen, damit Content vor der Freischaltung gepflegt und geprüft
werden kann. Die `MARDU_DE_ENABLE_*`-Variablen sind lokale beziehungsweise statische Fallbacks und
überschreiben die Dashboard-Auswertung; sie dürfen daher in Vercel nicht widersprüchlich gesetzt sein.
Das Root-Layout wird dynamisch ausgewertet, damit Header, Footer und interne Einstiege eine
Dashboard-Änderung ohne neuen Build übernehmen.

## Release-Gates vor dem Push

```bash
bun install --frozen-lockfile
bun run lint
bun run type-check
bun test
git diff --check
bun run --cwd apps/platform clean
bun run --cwd apps/mardu-de clean
bun run --cwd apps/platform build
bun run --cwd apps/mardu-de build
```

Der GitHub-Workflow wiederholt diese Gates mit PostgreSQL, Migrationen, Fixtures, beiden Turbopack-Builds und dem vollständigen Release-Crawl. `seed:all` ist dort nur mit `ALLOW_FIXTURE_SEED=true` erlaubt.

## Datenbank, Migration und Content-Freigabe

1. Vor der Migration einen wiederherstellbaren Provider-Snapshot der Produktionsdatenbank erstellen und die Snapshot-ID im Release-Check festhalten.
2. Snapshot in eine isolierte Datenbank wiederherstellen.
3. Gegen diese Kopie ausführen:

```bash
bun run --cwd apps/platform payload:migrate:status
bun run --cwd apps/platform payload:migrate
bun run --cwd apps/platform build
```

4. Vor jedem produktiven Seed einen read-only Inhaltsvergleich erzeugen:

```bash
bun run --cwd apps/platform release:content:audit
CONTENT_AUDIT_INCLUDE_DOCUMENTS=true bun run --cwd apps/platform release:content:audit
```

Exit-Code `2` bedeutet, dass erwartete Dokumente fehlen. Vorhandene Slugs sind nicht automatisch überschreibbar: Sie werden mit dem aktuellen CMS-Export verglichen und vom Content-Verantwortlichen freigegeben. Bei einem Konflikt wird der betreffende Collection-Seeder nicht ausgeführt; nur die genehmigten Felder werden im Payload-Admin gepflegt und veröffentlicht.

5. In Produktion ausschließlich einzeln und nach dokumentierter Freigabe ausführen:

```bash
bun run --cwd apps/platform seed:legal-pages
bun run --cwd apps/platform seed:integrations
bun run --cwd apps/platform seed:roadmap-items
bun run --cwd apps/platform seed:solutions
bun run --cwd apps/platform seed:catalog
```

`seed:all` ist verboten: Der Befehl erzeugt Demo-Admin, Test-Leads und Test-Abonnenten und verweigert ohne die explizite Fixture-Freigabe die Ausführung.

## Rollout

1. Release-Branch pushen und Draft-PR öffnen.
2. GitHub CI und beide Vercel-Previews vollständig grün abwarten.
3. Platform-Preview gegen die isolierte Datenbank prüfen.
4. Migration auf Produktion ausführen und Status erneut prüfen.
5. Geprüftes Platform-Preview-Artefakt nach Produktion promoten.
6. Freigegebene Inhalte veröffentlichen und mindestens Produkte, Lösungen, Integrationen, Roadmap sowie Rechtstexte über die öffentliche Platform-API prüfen.
7. mardu.de-Preview gegen die produktionsnahe Platform prüfen:

```bash
RELEASE_BASE_URL=https://<mardu-preview-url> \
RELEASE_CANONICAL_ORIGIN=https://www.mardu.de \
bun run --cwd apps/mardu-de release:verify
```

8. Erst danach das identische mardu.de-Artefakt promoten.
9. Produktionsabnahme wiederholen:

```bash
RELEASE_BASE_URL=https://www.mardu.de \
bun run --cwd apps/mardu-de release:verify
```

Der Verifier verlangt für alle Sitemap- und internen HTML-Routen HTTP 200, genau eine H1, eine Description, gültiges JSON-LD sowie einen selbstreferenzierenden Canonical. Newsletter-Statusseiten müssen `noindex` sein.

Kontakt, Konfigurator sowie Newsletter Double-Opt-in und Abmeldung werden zusätzlich manuell mit dem konfigurierten internen `EMAIL_TO`-Postfach geprüft. Testdatensätze werden eindeutig als Release-Test markiert und anschließend kontrolliert entfernt.

## Rollback und Beobachtung

- Schlägt Migration, Platform-API oder Content-Freigabe fehl, wird mardu.de nicht promotet.
- Bei einer fehlerhaften Platform-Version das vorherige Deployment promoten. Die Datenbank wird nur aus dem dokumentierten Snapshot wiederhergestellt, wenn das Schema nicht vorwärtskompatibel reparierbar ist.
- Bei Frontendfehlern sofort das vorherige mardu.de-Deployment promoten; die additiven Platform-/DTO-Änderungen dürfen bestehen bleiben, sofern APIs und Datenbank stabil sind.
- Rollback ist verpflichtend, sobald eine primäre oder in der Sitemap enthaltene Route nicht 200 liefert, Lead-Flows scheitern oder neue wiederkehrende 5xx auftreten.
- Nach Go-live Vercel-Logs, Analytics, Content-API-Fehler sowie Lead-/E-Mail-Zustellung mindestens 24 Stunden beobachten. Anschließend Sitemap in Google Search Console und Bing Webmaster Tools erneut einreichen.
