# Coolify Deployment (`mardu.de`)

Diese Anleitung beschreibt den Betrieb von `apps/mardu-de` auf Coolify (Server `ats-server`).
Frontend, Payload-CMS (Admin `/admin`, API `/api`) und Lead-Backend laufen in einer
Next.js-Instanz aus dem `Dockerfile` im Repo-Root. Das Vercel-Setup ist abgelöst;
`docs/vercel-deployment.md` bleibt nur als Referenz bestehen.

## Architektur

- **Build Pack:** `Dockerfile`, Dockerfile-Pfad `/Dockerfile` (Repo-Root), Port `3000`
- **Image:** `oven/bun:1.3.14` (entspricht `packageManager` im Root-`package.json`);
  Install am Workspace-Root, Build via `bun run --cwd apps/mardu-de build`
- **Datenbank:** separates Coolify-Postgres im selben Projekt (`DATABASE_URI`)
- **Medien:** lokaler Payload-Disk-Storage unter `PAYLOAD_MEDIA_DIR=/data/media`,
  persistiert über ein Coolify-Volume auf `/data/media` (`BLOB_READ_WRITE_TOKEN` bleibt leer)
- **Migrationen:** laufen beim Boot automatisch (`prodMigrations` in `payload.config.ts`);
  kein separater Migrate-Schritt nötig
- **Healthcheck:** HTTP auf `/` (in Coolify aktivieren, im `Dockerfile` zusätzlich verdrahtet)

## Erst-Setup (Dashboard, einmalig)

1. PR in `main` mergen. Die App deployed Branch `main` aus `mardu-systems/websites`.
2. **Postgres erstellen:** im Coolify-Projekt `+ New` → `Database` → `PostgreSQL`
   (Version 17, Name z. B. `mardu-postgres`). Nach dem Start die **interne**
   Connection-String aus der Datenbank-Ansicht kopieren.
3. **App umstellen** (`mardu.de` → Configuration):
   - Build Pack: `Dockerfile`, Dockerfile Location: `/Dockerfile`
   - Ports Exposes: `3000`
   - Health Check aktivieren: Type `HTTP`, Path `/`, Port `3000`
   - **Storages:** Persistent Volume, Quelle beliebig (z. B. `mardu-media`),
     Ziel `/data/media`
   - **Domains:** zunächst die temporäre `*.sslip.io`-Domain behalten und dort
     verifizieren; erst danach `www.mardu.de` (+ Redirect `mardu.de` → `www`)
     eintragen und DNS umstellen (`A`-Record auf `37.120.171.167`)
4. **Umgebungsvariablen** in der App setzen (Werte aus Vercel übernehmen,
   soweit vorhanden; Secrets nie per Chat/MCP teilen):

   | Variable                                                 | Wert / Quelle                                                                                                |
   | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
   | `APP_URL`                                                | erst Temp-Domain (`http://…sslip.io`), nach DNS-Umzug `https://www.mardu.de`                                 |
   | `DATABASE_URI`                                           | interne Connection-String der Coolify-Postgres (s. Schritt 2)                                                |
   | `PAYLOAD_SECRET`                                         | neu generieren, z. B. `openssl rand -base64 48`                                                              |
   | `PAYLOAD_PUBLIC_SERVER_URL`                              | identisch zu `APP_URL`                                                                                       |
   | `PAYLOAD_MEDIA_DIR`                                      | `/data/media`                                                                                                |
   | `NEWSLETTER_SECRET`                                      | aus Vercel übernehmen oder neu generieren (invalidiert alte Token-Links)                                     |
   | `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_TO`               | aus Vercel übernehmen                                                                                        |
   | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` | aus Vercel übernehmen (ggf. neue Domain in reCAPTCHA freigeben)                                              |
   | `POSTHOG_API_KEY`                                        | PostHog-EU-Projekt; `POSTHOG_HOST` nur bei Abweichung vom EU-Default                                         |
   | `MARDU_DE_ENABLE_BLOG` / `_INTEGRATIONS` / `_PRODUCTS`   | optional, Standard leer (`false`); überschreiben PostHog                                                     |
   | `OIDC_*`                                                 | nur falls Admin-SSO aktiv ist; `OIDC_REDIRECT_URI` auf `…/api/sso/callback` der finalen Domain zeigen lassen |
   | `NIXPACKS_NODE_VERSION`                                  | kann entfernt werden (Dockerfile-Build, kein Nixpacks)                                                       |

5. **Deployen** (Dashboard oder per API) und Logs prüfen:
   - `✓ Ready` auf Port 3000, Migrationen laufen beim ersten Boot
   - `GET /` → 200, `/admin` → Admin-Login, `/api/blog-posts?limit=1` → 200
6. **Erst-Admin:** `/admin` öffnen und den ersten Admin-User anlegen
   (Create-First-User-Screen bei leerer Datenbank).
7. **Inhalte:** Seeds nur nach Freigabe (`seed:legal-pages` usw. laufen per CLI;
   produktive Inhalte primär über den Admin pflegen).
8. **Domain-Umschaltung:** DNS setzen, `APP_URL` + `PAYLOAD_PUBLIC_SERVER_URL` auf
   `https://www.mardu.de` ändern, erneut deployen, `release:verify` gegen Produktion.

## Hinweise

- `BLOB_READ_WRITE_TOKEN` wird auf Coolify **nicht** gesetzt (Vercel-Blob entfällt
  zugunsten des Volumes). `payload.config.ts` verlangt den Token nur bei `VERCEL=1`.
- `ALLOW_LOCAL_CONTENT_IMAGES` wird nicht gesetzt (nur für CI-Upstream).
- Build braucht Speicher (Next 16 + Payload): `NODE_OPTIONS` steht im `Dockerfile`
  auf `--max-old-space-size=3072`; bei OOM-Abbrüchen im Dashboard-Log erhöhen.
- Die beiden `metamcp-*`-Services im Projekt gehören nicht zu `mardu.de` und bleiben
  unberührt.
