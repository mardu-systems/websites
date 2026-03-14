# Monorepo Architecture

Diese Dokumentation beschreibt die Zielstruktur des Monorepos unter `../websites` und den technischen Zuschnitt der drei Apps.

## Deploybare Apps

### `apps/mardu-de`

- öffentliche Produkt- und Marketingseite für `mardu.de`
- konsumiert gemeinsame UI-, Style- und Site-Config-Pakete
- konsumiert mittelfristig Content und Lead-APIs aus `apps/platform`

### `apps/mardu-space`

- öffentliche Produkt-, Whitepaper- und Funnel-Site für `mardu.space`
- konsumiert gemeinsame UI-, Style- und Site-Config-Pakete
- behält kompatible Public-API-Routen als dünne Proxy-Schicht

### `apps/platform`

- einziges Payload-Admin
- zentrale Content-API für Blog, Integrationen und Media
- zentrales Lead-Backend für Newsletter, Kontakt, Whitepaper und Preorder

## Gemeinsame Packages

### `packages/styles`

- globale Tailwind-/Animation-Basis
- gemeinsame Browser- und Accessibility-Grundregeln
- Site-Themes für `mardu-de`, `mardu-space` und `platform`

### `packages/site-config`

- zentrale Registry für Domains, Origins, Branding und API-Ursprünge
- reduziert hartcodierte Site-Konstanten in einzelnen Apps

### `packages/lead-core`

- zentrale DTOs und Zod-Schemas für Lead-nahe API-Verträge
- bildet die Basis für dokumentierte Plattform-Endpunkte

### `packages/content-core`

- gemeinsame Site-Sichtbarkeit und spätere Payload-Mapper
- kapselt die geteilte Inhaltsdomäne

## Tooling

- Workspace-Management: `bun`
- Task-Orchestrierung: `turbo`
- TypeScript-Basis: `packages/tsconfig`
- ESLint-Basis: `packages/eslint-config`

## Vercel-Zuschnitt

- ein Git-Repository
- drei getrennte Vercel-Projekte
- Root Directories:
  - `apps/mardu-de`
  - `apps/mardu-space`
  - `apps/platform`
- geteilte Packages werden über den Workspace aufgelöst

## Offene Migrationsschritte

- Payload von `apps/platform` fachlich vom aktuellen `mardu.de`-Stand trennen
- Blog-/Integrations-Collections site-fähig machen
- Lead-Flows aus `mardu.de` und `mardu.space` vollständig nach `apps/platform` ziehen
- `mardu.space`-TypeORM-/CleverReach-Altpfade entfernen
- Media-Uploads von lokalem Dateisystem auf Vercel Blob umstellen
