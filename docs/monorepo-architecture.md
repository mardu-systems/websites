# Monorepo Architecture

Diese Dokumentation beschreibt die Zielstruktur des Monorepos unter `../websites`. Es gibt genau eine deploybare App.

## Deploybare App

### `apps/mardu-de`

- öffentliche Produkt- und Marketingseite für `mardu.de` unter `app/(site)`
- einziges Payload-Admin unter `app/(payload)/admin`
- Content-API für Blog, Integrationen, Lösungen, Roadmap, Produktkatalog, Rechtstexte und Media unter `app/api`
- Lead-Backend für Newsletter und Kontakt unter `app/api`
- konsumiert gemeinsame UI-, Style- und Site-Config-Pakete

## Gemeinsame Packages

### `packages/styles`

- globale Tailwind-/Animation-Basis
- gemeinsame Browser- und Accessibility-Grundregeln
- Site-Theme für `mardu-de`

### `packages/site-config`

- zentrale Registry für Domains, Origins, Branding und API-Ursprünge
- reduziert hartcodierte Site-Konstanten in einzelnen Apps

### `packages/lead-core`

- zentrale DTOs und Zod-Schemas für Lead-nahe API-Verträge
- bildet die Basis für dokumentierte Lead-Endpunkte

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
- ein Vercel-Projekt
- Root Directory: `apps/mardu-de`
- geteilte Packages werden über den Workspace aufgelöst

## Verbindliche Grenzen

- Die Payload-Runtime in `apps/mardu-de` ist System of Record für CMS- und Lead-Daten.
- `apps/mardu-de` enthält keine Runtime-Fallback-Datensätze für Payload-Inhalte (ausgenommen gebündelte Legal-Fallbacks).
- Seed-Skripte liegen unter `apps/mardu-de/scripts` und werden nur durch explizite Seed-Skripte verwendet.
- Historische Datenmigrationen in `apps/mardu-de/migrations` bleiben unverändert; alte JSON-Importer und Aliasverträge sind entfernt.
