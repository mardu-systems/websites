# Payload MCP Surface

Diese Datei dokumentiert die freigegebene MCP-Oberflaeche von `apps/platform` fuer CMS- und Ops-Workflows.

## Zweck

- Sichere MCP-Schnittstelle fuer redaktionelle Pflege und operative Lead-Bearbeitung bereitstellen.
- Hochriskante Admin-/Developer-Funktionen bewusst ausschliessen.
- Den Berechtigungsvertrag fuer `payload-mcp-api-keys` dokumentieren.

## Endpoint

- MCP wird ueber den von `@payloadcms/plugin-mcp` bereitgestellten Handler unter `/api/mcp` exposed.
- Authentifizierung und Funktionsfreigabe laufen ueber Dokumente in `payload-mcp-api-keys`.

Quelle der Konfiguration:
[payload.shared-config.mjs](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/payload.shared-config.mjs)

## Freigegebene Collections

### Redaktioneller Vollzugriff

Diese Collections sind fuer typische CMS-Workflows mit vollem CRUD freigegeben:

- `blog-posts`: `find`, `create`, `update`, `delete`
- `integrations`: `find`, `create`, `update`, `delete`
- `legal-pages`: `find`, `create`, `update`, `delete`
- `blog-categories`: `find`, `create`, `update`, `delete`
- `blog-authors`: `find`, `create`, `update`, `delete`
- `integration-categories`: `find`, `create`, `update`, `delete`
- `integration-protocols`: `find`, `create`, `update`, `delete`

### Medienzugriff

- `media`: nur `find`

Begruendung:
- Assets duerfen fuer Referenzen und Auswahl gelesen werden.
- Uploads, Ersetzungen und Loeschungen bleiben regulierten Admin-/REST-Workflows vorbehalten.

### Operative Lead-/CRM-Collections

Diese Collections sind fuer Ops-Workflows freigegeben, aber bewusst ohne Loeschrechte:

- `newsletter-subscribers`: `find`, `create`, `update`
- `contact-leads`: `find`, `create`, `update`
- `preorder-requests`: `find`, `create`, `update`

Begruendung:
- Operative Datensaetze sollen per MCP gepflegt werden koennen.
- Versehentliche Datenvernichtung per Agent oder Tool wird ausgeschlossen.

## Bewusst ausgeschlossene Collections

- `users`

Begruendung:
- Keine MCP-Freigabe fuer Benutzer- und Authentifizierungsverwaltung in diesem Schritt.

## Keine Globals

- Es werden aktuell keine Payload-Globals ueber MCP freigegeben.
- Es existiert in `apps/platform` kein produktiv noetiger Singleton-Global, der fuer den CMS-/Ops-Umfang exponiert werden muss.

## Keine experimentellen MCP-Tools

Folgende experimentelle Toolbereiche bleiben deaktiviert:

- `auth`
- `collections`
- `config`
- `jobs`

Begruendung:
- Fokus auf inhaltlicher und operativer Pflege.
- Keine agentische Schema-, Config- oder Auth-Manipulation in Produktion.

## API- und Berechtigungsvertrag

- Jede aktivierte Collection erzeugt in `payload-mcp-api-keys` eine eigene Berechtigungsgruppe fuer die freigegebenen Operationen.
- Ein API-Key sieht nur die Tools, die in seinem Dokument erlaubt wurden.
- Die MCP-Oberflaeche ist damit kein separater Hardcode-Vertrag, sondern ein konfigurierter Berechtigungsvertrag ueber Payload.

## DTO- und Datenvertrags-Hinweis

- Die MCP-Oberflaeche arbeitet auf den nativen Payload-Collections und deren Feldern.
- Fuer Frontend-Consumer bleiben die kanonischen DTOs in `packages/content-core` massgeblich.

Verwandte DTO-Dokumentation:

- [blog-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/blog-payload-integration.md)
- [integrations-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/integrations-payload-integration.md)
- [legal-pages-payload-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/legal-pages-payload-integration.md)
- [newsletter-crm-integration.md](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/docs/api/newsletter-crm-integration.md)

## Betriebsregeln

- `db push` bleibt deaktiviert; Schema-Aenderungen laufen ueber Migrationen.
- MCP-Ausbau selbst aktiviert keine zusaetzlichen Datenbankobjekte ausser denen des Payload-MCP-Plugins.
- Nach Schema-Aenderungen ist `bun run payload migrate` der verbindliche Weg, um die Runtime mit der Datenbank zu synchronisieren.
