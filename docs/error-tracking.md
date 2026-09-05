# GlitchTip-Fehlererfassung

Beide Next.js-Apps verwenden `@mardu/observability` als gemeinsame Abstraktion über
das offizielle `@sentry/nextjs`-SDK. Der Empfänger wird ausschließlich durch die DSN
bestimmt; eine GlitchTip-Instanz wird durch diesen Patch nicht bereitgestellt.

## Aktivieren

In GlitchTip ein Projekt anlegen und dessen **öffentliche DSN** in der jeweiligen
App unter `.env.local` beziehungsweise im zugehörigen Vercel-Projekt hinterlegen:

```dotenv
NEXT_PUBLIC_GLITCHTIP_DSN=https://PUBLICKEY@glitchtip.example.com/1
NEXT_PUBLIC_GLITCHTIP_ENVIRONMENT=production
```

Dies aktiviert Browser- und Servererfassung. Für beide Apps sind getrennte Projekte
empfohlen; bei gemeinsamer DSN unterscheidet das Tag `app` zwischen `mardu-de` und
`platform`. Lokal `development`, in Preview `preview` als Environment verwenden.
Nach Änderungen an `NEXT_PUBLIC_*` neu bauen: Diese Werte werden beim Build in den
Browsercode eingebettet. Beim Promoten eines Preview-Builds bleiben sie unverändert.

| Variable                            | Pflicht / Standard            | Bedeutung                                                                                             |
| ----------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_GLITCHTIP_DSN`         | Optional, leer = Browser aus  | Öffentliche Projekt-DSN; gleichzeitig Server-Fallback. Darf keinen geheimen API-Token enthalten.      |
| `GLITCHTIP_DSN`                     | Optional                      | Nur auf dem Server; überschreibt dort die öffentliche DSN. Ermöglicht reine Servererfassung.          |
| `NEXT_PUBLIC_GLITCHTIP_ENVIRONMENT` | Optional, `NODE_ENV`          | Umgebungsname für Browser und Server. Preview ausdrücklich konfigurieren.                             |
| `NEXT_PUBLIC_GLITCHTIP_RELEASE`     | Optional                      | Release-ID, z. B. Commit-SHA; für SDK und Source-Map-Upload identisch verwenden.                      |
| `GLITCHTIP_URL`                     | Pflicht bei Source-Map-Upload | Basis-URL der eigenen GlitchTip-Instanz.                                                              |
| `GLITCHTIP_ORG`                     | Pflicht bei Source-Map-Upload | Organisations-Slug.                                                                                   |
| `GLITCHTIP_PROJECT`                 | Pflicht bei Source-Map-Upload | Projekt-Slug der jeweiligen App.                                                                      |
| `GLITCHTIP_AUTH_TOKEN`              | Optional, leer = kein Upload  | Geheimer Build-Token mit den für Source Maps benötigten Rechten. Niemals `NEXT_PUBLIC_` voranstellen. |

DSNs müssen `http(s)://PUBLICKEY@host/[prefix/]project-id` entsprechen. Der Schlüssel
enthält Buchstaben, Ziffern oder Unterstriche, die Projekt-ID nur Ziffern. Passwörter,
Query und Fragment sind unzulässig. Ungültige Werte brechen die Konfiguration mit
einer generischen Meldung ab, ohne die DSN auszugeben. Leere Werte deaktivieren die
Initialisierung; bestehende Konsolenlogs bleiben erhalten.

`apps/mardu-de/next.config.ts` ergänzt automatisch nur den Ursprung der öffentlichen
DSN in `connect-src`. Für eine selbst gehostete Instanz muss deren CORS-Konfiguration
die jeweilige Website zulassen. Beide Apps behalten ihre bestehenden Next- und
Payload-Konfigurationswrapper. Die Variablen sind im Turbo-Cache berücksichtigt.

## Erfasste Fehler

- Unbehandelte Browserfehler und Promise-Rejections ab Client-Initialisierung.
- React-Fehler über die vorhandene Seiten-Fehlergrenze und beide globalen Fehlergrenzen.
- Next.js-Serverfehler über `instrumentation.ts` / `onRequestError`, einschließlich
  Server Components, Route Handler, Server Actions und Edge-Runtime.
- Bestehende `console.error`-Aufrufe, auch in Shared Packages und CRM-/E-Mail-Fallbacks.
- Zuvor stille Newsletter-, SSO-, Feature-Flag-, Rate-Limit-Store- und Dashboardfehler.
- Payload-API-Fehler ab Status 500 über den vorhandenen `afterError`-Hook des Frameworks.
  Erwartete Payload-Validierungs- und Berechtigungsfehler unter 500 werden ausgelassen.

Die Fehlersamplingrate ist 100 %. Tracing, Replay, Logs sowie Browser- und
Prozess-Session-Erfassung sind deaktiviert. Ein HTTP-Fehlerstatus allein löst keine
Erfassung aus: Behandelte Fehler müssen gemeldet werden. Absichtlich behandelte
Benutzereingaben, etwa ungültiges JSON oder abgelaufene Newsletter-Tokens, bleiben
normale API-Antworten.

## Gemeinsame API

```ts
import { reportError } from "@mardu/observability";

try {
  await loadContent();
} catch (error: unknown) {
  reportError(error, "load-content");
  // Bestehende Recovery / Nutzerreaktion beibehalten.
}
```

`reportError(error: unknown, operation?: string): string | undefined` meldet eine
Exception mit optionalem Operation-Tag. `operation` ist ein statisches fachliches
Label, keine URL, E-Mail-Adresse oder Request-Payload. Rückgabe: SDK-Ereignis-ID;
ohne Initialisierung `undefined`. Eine Ereignis-ID bestätigt noch keine Zustellung.

```ts
import { reportServerError } from "@mardu/observability/server";

await reportServerError(error, "contact");
```

`reportServerError(error: unknown, operation: string): Promise<void>` meldet und
protokolliert den Fehler und wartet bis zu zwei Sekunden auf den Versand. Dies wird
in den zentralen API-Catches und im Payload-Fehlerhook vor der Antwort verwendet,
damit der Versand auf Serverless-Plattformen nicht sofort abgebrochen wird.
`reportRequestError` ist der typisierte Next.js-Fehlerhook mit derselben Wartefrist.
Netzwerkfehler werden durch das SDK behandelt; ein Timeout bestätigt keine Zustellung.

Neue abgefangene Fehler über diese Funktionen oder bestehende `console.error`-Logs
melden. Nur Servercode darf `/server` importieren; `/client` enthält den Browser-
Navigationshook. Öffentliche HTTP-Responses, Statuscodes und DTOs bleiben unverändert.

## Datenfilter und Grenzen

Vor dem Versand werden User-Kontext, Request-Body, Header, Cookies, Queryparameter,
URL-Credentials, Breadcrumbs, zusätzliche Kontextdaten, lokale Stack-Variablen und
Quelltextausschnitte entfernt. Stack-Datei, Funktion und Zeilennummer bleiben erhalten.
Fehlertexte filtern E-Mail-Adressen, URL-Parameter, Bearer-Tokens und typische
`token`-/`password`-/`secret`-/`api-key`-Werte. Das ersetzt keine sorgfältige Auswahl
von Fehlermeldungen: Freitext kann weitere personenbezogene Daten enthalten.

Browseranfragen gehen direkt an die konfigurierte Instanz; diese sieht technisch die
Verbindungs-IP. Es werden keine Session-Replays und keine Formulareingaben gesammelt.
Der Betrieb und die Datenschutzhinweise müssen zur tatsächlich verwendeten Instanz
passen; im Code ist kein Betreiber oder Hostingstandort vorausgesetzt.

Adblocker, Offlinebetrieb, Prozessabbruch, DSN-Projektlimits oder das Ende einer
Serverless-Laufzeit können Zustellung verhindern. Bereits vorhandene ungebundene
Hintergrund-Promises sind keine dauerhafte Job-Queue. CLI-/Migrationsprozesse, die
Next-Instrumentation nicht starten, sind nicht automatisch erfasst.

## Source Maps und Prüfung

Für lesbare Produktions-Stacktraces die vier `GLITCHTIP_*`-Uploadvariablen sowie eine
Release-ID setzen. Der Build lädt Source Maps an die konfigurierte Instanz hoch und
entfernt sie anschließend aus den Ausgabedateien. Ohne Token findet kein Upload
statt; Dateinamen und Zeilen können dann minifiziert sein. Build-Plugin-Telemetrie
ist deaktiviert. Ein konfigurierter Uploadfehler schlägt im Build fehl.

```bash
bun test packages/observability
bun run lint
bun run type-check
bun run build
```

Die Tests verwenden ausschließlich einen lokalen HTTP-Empfänger und prüfen
Deaktivierung, DSN-Validierung, Datenfilter und tatsächliche SDK-Übertragung von
manuellen, Konsolen- und Next.js-Requestfehlern. Browser-Smoke-Test in Preview:
kontrollierten `console.error(new Error('GlitchTip smoke test'))` in DevTools auslösen,
Envelope-Request und Eintrag im richtigen Projekt mit `app`/Environment prüfen.
Keine dauerhaft erreichbare Testfehler-Route in Produktion anlegen.

Grundlagen: [GlitchTip Next.js SDK](https://glitchtip.com/sdkdocs/javascript-nextjs/),
[Sentry JavaScript SDK](https://github.com/getsentry/sentry-javascript),
[Next.js Instrumentation](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation).
