# Monorepo Architecture

Diese Dokumentation beschreibt die Zielstruktur des Monorepos unter `../websites` und den technischen Zuschnitt der beiden Apps.

## Deploybare Apps

### `apps/mardu-de`

- öffentliche Produkt- und Marketingseite für `mardu.de`
- konsumiert gemeinsame UI-, Style- und Site-Config-Pakete
- konsumiert Content und Lead-APIs ausschließlich aus `apps/platform`

### `apps/platform`

- einziges Payload-Admin
- zentrale Content-API für Blog, Integrationen, Lösungen, Roadmap, Produktkatalog, Rechtstexte und Media
- zentrales Lead-Backend für Newsletter und Kontakt

## Gemeinsame Packages

### `packages/styles`

- globale Tailwind-/Animation-Basis
- gemeinsame Browser- und Accessibility-Grundregeln
- Site-Themes für `mardu-de` und `platform`

### `packages/site-config`

- zentrale Registry für Domains, Origins, Branding und API-Ursprünge
- reduziert hartcodierte Site-Konstanten in einzelnen Apps

### `packages/lead-core`

- zentrale DTOs und Zod-Schemas für Lead-nahe API-Verträge
- bildet die Basis für dokumentierte Plattform-Endpunkte

### `packages/content-core`

- gemeinsame Site-Sichtbarkeit, öffentliche DTOs und strikte Payload-Mapper
- kapselt die geteilte Inhaltsdomäne
- unterscheidet Netzwerk-, HTTP- und Vertragsfehler von leeren Collections

## Tooling

- Workspace-Management: `bun`
- Task-Orchestrierung: `turbo`
- TypeScript-Basis: `packages/tsconfig`
- ESLint-Basis: `packages/eslint-config`

## Vercel-Zuschnitt

- ein Git-Repository
- zwei getrennte Vercel-Projekte
- Root Directories:
  - `apps/mardu-de`
  - `apps/platform`
- geteilte Packages werden über den Workspace aufgelöst

## Verbindliche Grenzen

- `apps/platform` ist System of Record für CMS- und Lead-Daten.
- `apps/mardu-de` enthält keine Runtime-Fallback-Datensätze für Payload-Inhalte.
- Seed-Daten liegen ausschließlich unter `apps/platform/data` und werden nur durch explizite Seed-Skripte verwendet.
- Historische Datenmigrationen in `apps/platform/migrations` bleiben unverändert; alte JSON-Importer und Aliasverträge sind entfernt.
