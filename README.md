# Mardu Websites Monorepo

Dieses Repository bündelt Website, Payload-CMS und Lead-Backend von `mardu.de` in einem gemeinsamen Workspace mit einer einzigen deploybaren App.

## Apps

- `apps/mardu-de`: öffentliche Marketing- und Produktseite, Payload-Admin (`/admin`), Content-API und Lead-Backend in einer Next.js-16-Instanz (Frontend unter `app/(site)`)

## Packages

- `packages/ui`: wiederverwendbare UI-Primitives
- `packages/sections`: gemeinsame Marketing-Sektionen
- `packages/styles`: globale Basis-Styles und Site-Themes
- `packages/site-config`: zentrale Site-Registry, Domains und Branding
- `packages/content-core`: gemeinsame Content-Modelle und Frontend-Mapper
- `packages/lead-core`: gemeinsame DTOs, Lead-Services und CRM-Helfer
- `packages/eslint-config`: geteilte ESLint-Konfigurationen
- `packages/tsconfig`: geteilte TypeScript-Basiskonfigurationen

## Workspace-Befehle

```bash
bun install
bun run lint
bun run type-check
bun test
bun run build
```

Katalog, Lösungen, Integrationen, Blog und Rechtstexte kommen aus der lokalen Payload-Runtime derselben App (Postgres via `DATABASE_URI`). Der reguläre Startbefehl lautet:

```bash
bun run dev:mardu-de
```

Lokale Entwicklung gegen Postgres (Admin unter `http://localhost:3000/admin`): siehe `apps/mardu-de/.env.example` (`DATABASE_URI`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL`).

## Vercel Deployment

Die Vercel-Einrichtung für dieses Monorepo ist in [docs/vercel-deployment.md](./docs/vercel-deployment.md) dokumentiert.
