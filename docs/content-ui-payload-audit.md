# Audit der Content-UIs und Payload-Anbindung

Diese Matrix dokumentiert den Ist-Zustand nach der Implementierung der Payload-Migration für Content-UIs.

## Matrix

| UI / Route | Aktueller Datenursprung | Payload angebunden | Import möglich | DTOs aus `@mardu/content-core` | Öffentliche API-Doku | Fehlende Bausteine | Empfohlene nächste Maßnahme |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `mardu.de /blog` | `apps/platform` via `packages/content-core` | Ja | Ja, redaktionell / Payload | Ja | Ja | Keine produktkritische Lücke im Audit | optional Feature-Flag-Aktivierung produktiv prüfen |
| `mardu.de /integrations` | `apps/platform` via `packages/content-core` und lokaler Proxy | Ja | Ja, Seed über `seed:integrations` | Ja | Ja | keine Import-Automation aus Fremdquellen | optional zusätzliche externe Importquellen definieren |
| `mardu.de /privacy`, `/publisher` | `apps/platform` via `packages/content-core/legal-pages` | Ja | Ja, Seed über `seed:legal-pages` | Ja | Ja | keine | redaktionelle Prozesse im Payload-Admin nutzen |
| `mardu.space /solutions` | `apps/platform` via neue `content-core`-Fetcher | Ja | Ja, Seed über `seed:solutions` | Ja | Ja | noch kein dediziertes Bulk-Importformat jenseits Seed-Datei | bei Bedarf CSV-/MDX-Import später ergänzen |
| `mardu.space /products` | `apps/platform` via neue `content-core`-Fetcher | Ja | Ja, Seed über `seed:catalog` | Ja | Ja | noch kein dediziertes Bulk-Importformat jenseits Seed-Dateien | bei Bedarf ERP/PIM-Import spezifizieren |
| `mardu-space` Lead-/Newsletter-/Whitepaper-Routen | `apps/platform` via Forwarding/Redirect-Helfer | Teilweise, API-bezogen | Bestehende Lead-Migration für Legacy-Daten | Lead-DTOs, nicht primär Content-DTOs | Ja | nicht Inhaltspfad, sondern Prozesspfad | getrennt von Content-Audit weiter betreiben |

## Wichtige Befunde

- `apps/platform` ist jetzt auch für `solutions` und `products` der zentrale Runtime-Owner.
- `packages/content-core` ist nun der gemeinsame Read-/Mapping-Layer für Blog, Integrationen, Legal Pages, Catalog und Solutions.
- Die früheren statischen Dateien in `apps/mardu-space/data/` dienen weiterhin als Seed-Quelle, aber nicht mehr als primäre Runtime-Quelle.
- Die öffentlichen Collection-Endpunkte für Catalog und Solutions sind dokumentiert.

## Seed- und Migrationspfade

- `bun --filter @mardu/app-platform run seed:integrations`
- `bun --filter @mardu/app-platform run seed:legal-pages`
- `bun --filter @mardu/app-platform run seed:roadmap-items`
- `bun --filter @mardu/app-platform run seed:solutions`
- `bun --filter @mardu/app-platform run seed:catalog`

## Prüfregeln

- Neue öffentliche Content-Collections dürfen nur eingeführt werden, wenn DTO-Vertrag, Consumer-Vertrag und Plattform-Endpunkte dokumentiert sind.
- `mardu-space` und `mardu.de` bleiben Owner von Routing, Metadaten und CTA-Zielen.
- App-nahe Seed-Dateien sind kein Ersatz für Runtime-Content aus Payload.
