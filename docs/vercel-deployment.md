# Vercel Deployment und Release-Betrieb

Diese Anleitung beschreibt den Release von `apps/mardu-de`. Die App enthält öffentliches Frontend, Payload-CMS (Admin unter `/admin`, Content-API unter `/api`) und Lead-Backend in einer Next.js-Instanz. Ein separates Platform-Projekt gibt es nicht mehr.

## Zielbild

- Ein Git-Repository mit einem Vercel-Projekt.
- Projekt `mardu-de` mit Root Directory `apps/mardu-de`.
- `Include source files outside of the Root Directory` ist aktiv, damit `packages/*` verfügbar bleibt.
- Preview verwendet eine eigene Datenbank. Preview darf niemals auf `DATABASE_URI` der Produktion zeigen.
- Production wird nicht neu gebaut, sondern aus einem vollständig geprüften Preview-Artefakt promotet.
- `ALLOW_LOCAL_CONTENT_IMAGES=true` ist ausschließlich für den lokalen CI-Upstream vorgesehen und darf in keiner Vercel-Umgebung gesetzt sein.

Vercel erkennt den Root-`bun.lock` und das Next.js-Projekt. Install-, Build- und Output-Commands werden nicht überschrieben. `vercel.json` legt Bun `1.x` fest; der Workspace selbst pinnt die konkrete CI-Version.

## Umgebungsvariablen

Secrets werden ausschließlich in Vercel beziehungsweise in lokalen `.env.*.local`-Dateien gespeichert. Werte mit `NEXT_PUBLIC_` sind Teil des Browser-Bundles und dürfen keine Secrets enthalten.

### `mardu-de`

| Variable                                                                             | Production                                         | Preview                                 | Bedeutung                                                                                   |
| ------------------------------------------------------------------------------------ | -------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------- |
| `APP_URL`                                                                            | `https://www.mardu.de`                             | Preview-Origin                          | Öffentlicher Ursprung für Links, Content-API und Newsletter-Token-URLs                      |
| `DATABASE_URI`                                                                       | erforderlich                                       | eigene Preview-Datenbank                | PostgreSQL-Verbindung (Payload)                                                             |
| `PAYLOAD_SECRET`                                                                     | erforderlich                                       | eigener Wert                            | Signatur-/Payload-Secret                                                                    |
| `PAYLOAD_PUBLIC_SERVER_URL`                                                          | `https://www.mardu.de`                             | Preview-Origin                          | Öffentliche Payload-/Admin-URL                                                              |
| `NEWSLETTER_SECRET`                                                                  | erforderlich                                       | eigener Wert                            | Signatur von Bestätigungs- und Abmelde-Tokens                                               |
| `RESEND_API_KEY`                                                                     | erforderlich                                       | Test-Key oder kontrollierter Versand    | E-Mail-Versand einschließlich Payload-Passwort-Reset                                        |
| `EMAIL_FROM` / `EMAIL_TO`                                                            | erforderlich                                       | Test-Absender und internes Testpostfach | Absender für Systemmails und Lead-Empfänger                                                 |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY`                            | erforderlich                                       | eigenes Test-Setup                      | Browser- und Serverteil der Abuse Protection                                                |
| `BLOB_READ_WRITE_TOKEN`                                                              | erforderlich, wenn Uploads über Vercel Blob laufen | eigener Preview-Store                   | Medien-Uploads                                                                              |
| `OIDC_*`                                                                             | als vollständige Gruppe, falls SSO aktiv ist       | separate Preview-Client-Konfiguration   | Payload-Admin-SSO (`OIDC_REDIRECT_URI` zeigt auf `/api/sso/callback` der jeweiligen Origin) |
| `TWENTY_*`                                                                           | optional                                           | optional/Testsystem                     | Nicht blockierende CRM-Synchronisation                                                      |
| `PAYLOAD_FETCH_TIMEOUT_MS`                                                           | optional, Standard `10000`                         | optional                                | Content-Timeout zwischen 1.000 und 30.000 ms                                                |
| `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`                                                  | optional                                           | normalerweise leer                      | GA4                                                                                         |
| `MARDU_DE_ENABLE_BLOG` / `MARDU_DE_ENABLE_INTEGRATIONS` / `MARDU_DE_ENABLE_PRODUCTS` | optional                                           | optional                                | Statischer Feature-Flag-Fallback (überschreibt PostHog)                                     |
| `POSTHOG_API_KEY`                                                                    | erforderlich für Dashboard-Steuerung               | eigener Wert je Environment             | PostHog-Projekt-Key für Feature-Flags                                                       |
| `POSTHOG_HOST`                                                                       | optional, Standard EU-Cloud                        | optional                                | PostHog-Host, Standard `https://app-eu.posthog.com`                                         |

Vor jedem Release die Variablen getrennt pro Environment prüfen:

```bash
vercel env ls production
vercel env ls preview
```

`vercel env pull` überschreibt die Zieldatei. Produktionswerte nur in eine ignorierte Datei ziehen und niemals committen:

```bash
vercel env pull .env.production.local --yes --environment=production
```

## Fehlererfassung

Die optionale Fehlererfassung, DSNs, Release-IDs und geheime
Source-Map-Uploadtokens sind unter [GlitchTip-Fehlererfassung](error-tracking.md)
dokumentiert. `NEXT_PUBLIC_GLITCHTIP_*` muss bereits beim Build korrekt gesetzt sein;
beim Promoten eines Preview-Artefakts werden diese Werte nicht ersetzt.

## Content-Flags auf mardu.de

Die öffentlichen Bereiche Blog, Integrationen und Produkte verwenden die PostHog-Flag-Keys
`blog`, `integrations` und `products` (PostHog-EU-Projekt, serverseitige Auswertung ohne Personenbezug). Alle drei sind im Code standardmäßig deaktiviert. Im
deaktivierten Zustand fehlen die Bereiche in Header, Footer, internen Einstiegen und Sitemap;
auch `llms.txt` verlinkt sie nicht. Direkte Seitenaufrufe liefern HTTP 404 und versteckte Metadaten
bleiben `noindex`.

Aktivierung ohne neuen Code-Release:

1. Im PostHog-Projekt das gewünschte Flag öffnen und für die Umgebung aktivieren (zuerst Preview/Development, dann Production).
2. Content, Navigation, Sitemap, Responsive-Verhalten und SEO in Preview abnehmen.
3. Dieselbe Konfiguration separat für Production setzen und unmittelbar den Release-Verifier ausführen.

```bash
RELEASE_BASE_URL=https://www.mardu.de \
RELEASE_EXPECT_HIDDEN_PATHS=/blog,/integrations,/products \
bun run --cwd apps/mardu-de release:verify
```

`RELEASE_EXPECT_HIDDEN_PATHS` enthält nur die aktuell deaktivierten Landing-Pfade. Nach der
Aktivierung wird der betreffende Pfad aus der Liste entfernt. Der Verifier stellt sicher, dass
deaktivierte Bereiche weder in der Sitemap stehen noch einen anderen Status als 404 liefern.

Die Flags sperren bewusst nur das öffentliche Frontend. Payload-Inhalte und öffentliche
Content-API-Verträge bleiben bestehen, damit Content vor der Freischaltung gepflegt und geprüft
werden kann. Die `MARDU_DE_ENABLE_*`-Variablen sind lokale beziehungsweise statische Fallbacks und
überschreiben die PostHog-Auswertung; sie dürfen daher in Vercel nicht widersprüchlich gesetzt sein.
Das Root-Layout wird dynamisch ausgewertet, damit Header, Footer und interne Einstiege eine
Dashboard-Änderung ohne neuen Build übernehmen.

## Release-Gates vor dem Push

```bash
bun install --frozen-lockfile
bun run lint
bun run type-check
bun test
git diff --check
bun run --cwd apps/mardu-de clean
bun run --cwd apps/mardu-de build
```

Der GitHub-Workflow wiederholt diese Gates mit PostgreSQL, Migrationen, Fixtures, Turbopack-Build und dem vollständigen Release-Crawl. `seed:all` ist dort nur mit `ALLOW_FIXTURE_SEED=true` erlaubt.

## Datenbank, Migration und Content-Freigabe

1. Vor der Migration einen wiederherstellbaren Provider-Snapshot der Produktionsdatenbank erstellen und die Snapshot-ID im Release-Check festhalten.
2. Snapshot in eine isolierte Datenbank wiederherstellen.
3. Gegen diese Kopie ausführen:

```bash
bun run --cwd apps/mardu-de payload:migrate:status
bun run --cwd apps/mardu-de payload:migrate
bun run --cwd apps/mardu-de build
```

4. Vor jedem produktiven Seed einen read-only Inhaltsvergleich erzeugen:

```bash
bun run --cwd apps/mardu-de release:content:audit
CONTENT_AUDIT_INCLUDE_DOCUMENTS=true bun run --cwd apps/mardu-de release:content:audit
```

Exit-Code `2` bedeutet, dass erwartete Dokumente fehlen. Vorhandene Slugs sind nicht automatisch überschreibbar: Sie werden mit dem aktuellen CMS-Export verglichen und vom Content-Verantwortlichen freigegeben. Bei einem Konflikt wird der betreffende Collection-Seeder nicht ausgeführt; nur die genehmigten Felder werden im Payload-Admin gepflegt und veröffentlicht.

5. In Produktion ausschließlich einzeln und nach dokumentierter Freigabe ausführen:

```bash
bun run --cwd apps/mardu-de seed:legal-pages
bun run --cwd apps/mardu-de seed:integrations
bun run --cwd apps/mardu-de seed:roadmap-items
bun run --cwd apps/mardu-de seed:solutions
bun run --cwd apps/mardu-de seed:catalog
```

`seed:all` ist verboten: Der Befehl erzeugt Demo-Admin, Test-Leads und Test-Abonnenten und verweigert ohne die explizite Fixture-Freigabe die Ausführung.

## Rollout

1. Release-Branch pushen und Draft-PR öffnen.
2. GitHub CI und Vercel-Preview vollständig grün abwarten.
3. Preview gegen die isolierte Datenbank prüfen: mindestens Produkte, Lösungen, Integrationen, Roadmap sowie Rechtstexte über die Content-API.
4. Migration auf Produktion ausführen und Status erneut prüfen.
5. mardu.de-Preview mit produktionsnahen Daten prüfen:

```bash
RELEASE_BASE_URL=https://<mardu-preview-url> \
RELEASE_CANONICAL_ORIGIN=https://www.mardu.de \
bun run --cwd apps/mardu-de release:verify
```

6. Erst danach das identische Artefakt promoten.
7. Produktionsabnahme wiederholen:

```bash
RELEASE_BASE_URL=https://www.mardu.de \
bun run --cwd apps/mardu-de release:verify
```

Der Verifier verlangt für alle Sitemap- und internen HTML-Routen HTTP 200, genau eine H1, eine Description, gültiges JSON-LD sowie einen selbstreferenzierenden Canonical. Newsletter-Statusseiten müssen `noindex` sein.

Kontakt, Konfigurator sowie Newsletter Double-Opt-in und Abmeldung werden zusätzlich manuell mit dem konfigurierten internen `EMAIL_TO`-Postfach geprüft. Testdatensätze werden eindeutig als Release-Test markiert und anschließend kontrolliert entfernt.

Hinweis zur ehemaligen Platform: `platform.mardu.de` ist stillgelegt. Falls die Domain noch existiert, als Redirect auf `https://www.mardu.de` konfigurieren (Admin: `https://www.mardu.de/admin`). Die Umgebungsvariablen `MARDU_PLATFORM_ORIGIN` und das Vercel-Projekt `websites-platform` werden nicht mehr verwendet und können nach erfolgreicher Migration entfernt werden.

## Rollback und Beobachtung

- Schlägt Migration, Content-API oder Content-Freigabe fehl, wird nicht promotet.
- Bei einer fehlerhaften Version das vorherige Deployment promoten. Die Datenbank wird nur aus dem dokumentierten Snapshot wiederhergestellt, wenn das Schema nicht vorwärtskompatibel reparierbar ist.
- Rollback ist verpflichtend, sobald eine primäre oder in der Sitemap enthaltene Route nicht 200 liefert, Lead-Flows scheitern oder neue wiederkehrende 5xx auftreten.
- Nach Go-live Vercel-Logs, Analytics, Content-API-Fehler sowie Lead-/E-Mail-Zustellung mindestens 24 Stunden beobachten. Anschließend Sitemap in Google Search Console und Bing Webmaster Tools erneut einreichen.
