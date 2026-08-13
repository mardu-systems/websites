# Payload OIDC SSO Integration

Diese Datei dokumentiert den OIDC-SSO-Vertrag für den Payload Admin Login.

## Ziel

- Login in `/admin` über externen Identity Provider (OIDC).
- Kompatibel mit Keycloak, Auth0, Okta, Azure Entra ID.
- Bun-basiertes Setup ohne zusätzlichen Auth-Proxy.

## Admin-Oberfläche

- Die Oberfläche ist deutsch lokalisiert und verwendet die Mardu-Marke in Titel, Favicon,
  Login und Navigation.
- Bei aktiver OIDC-Konfiguration ist Mardu SSO der primäre Login-Weg. Die lokale
  E-Mail-/Passwort-Anmeldung bleibt als Notfallzugang verfügbar.
- Das Dashboard zeigt ausschließlich aggregierte operative Kennzahlen und verlinkt auf
  gefilterte Payload-Listen. Es verändert keine Datensätze.
- Datumswerte werden in der Zeitzone `Europe/Berlin` dargestellt.

## Endpunkte

Implementierung:

- [app/api/sso/login/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/sso/login/route.ts)
- [app/api/sso/callback/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/sso/callback/route.ts)
- [app/api/sso/logout/route.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/app/api/sso/logout/route.ts)

1. `GET /api/sso/login`
2. `GET /api/sso/callback`
3. `GET /api/sso/logout`
4. `GET /api/sso/debug` (nur bei `OIDC_DEBUG=true`)

## DTOs

Kanonische Typen:
[types/api/payload-sso.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/payload-sso.ts)

- `PayloadSsoLoginQueryDto`
- `PayloadSsoLogoutQueryDto`
- `PayloadSsoCallbackQueryDto`
- `PayloadSsoErrorCode`
- `PayloadSsoErrorDto`
- `PayloadSsoDebugDto`

## Query-Parameter

### `GET /api/sso/login`

- `returnTo` (optional): Relativer Pfad für Redirect nach erfolgreichem Login, default `/admin`.

### `GET /api/sso/callback`

- `code`: OIDC Authorization Code
- `state`: CSRF/PKCE state
- `error`: Provider-Fehlercode (falls Login abgebrochen/fehlgeschlagen)

### `GET /api/sso/logout`

- `redirect` (optional): Ziel nach Logout, default `/admin/login`

### `GET /api/sso/debug`

- Kein Input.
- Gibt Debug-Zustand für Cookies/Session/User-Lookup zurück.
- Nur aktiv in `development` mit `OIDC_DEBUG=true`, sonst `404`.

## Laufzeit-Matrix

- OIDC aktiv:
  - Login zeigt OIDC-CTA plus Passwort-Form (Login-Modus: OIDC + Passwort).
  - Admin-Settings zeigen Auth-Status mit aktiver Strategy.
- OIDC inaktiv:
  - Login zeigt keinen OIDC-CTA.
  - Passwort-Login bleibt verfuegbar.
- Debug in Development:
  - `[OIDC]` Logs aktiv bei `OIDC_DEBUG=true`.
  - `/api/sso/debug` verfügbar.
- Debug in Production:
  - keine OIDC-Debug-Logs.
  - `/api/sso/debug` liefert `404`.

## Access und Sicherheitsregeln

- Aktiv nur wenn `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET` gesetzt sind.
- OIDC-Flow nutzt PKCE (`S256`) und signed state-cookie.
- ID-Token-Signaturen werden abhängig vom vom Provider angekündigten Algorithmus geprüft:
  - `HS256` mit `OIDC_CLIENT_SECRET` als symmetrischem Verifikationsschlüssel.
  - Asymmetrische Algorithmen wie `RS256` über den öffentlichen `jwks_uri` des Providers.
  - Der Algorithmus im Token muss vom Discovery-Dokument angekündigt sein; `none` wird abgelehnt.
- Session basiert auf signed, `httpOnly` Cookie (`mardu_oidc_session`).
- Optionales Hardening:
  - `OIDC_ALLOWED_EMAILS`
  - `OIDC_ALLOWED_EMAIL_DOMAINS`
- Optionales Auto-Provisioning:
  - `OIDC_AUTO_CREATE_USERS=true`
  - Default ohne gesetzte Variable: `true` in Development, `false` in Production
- Optionales Debugging:
  - `OIDC_DEBUG=true` schreibt Schritt-fuer-Schritt Logs in den Server-Output.
  - wirksam nur in `development`.

Auth-Strategie in Payload:

- [collections/users.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/collections/users.ts)
- [lib/payload-sso-strategy.ts](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/lib/payload-sso-strategy.ts)

## Fehlerverhalten

Typische Redirect-Fehlercodes (auf `/admin/login?error=<code>`):

- `oidc_not_configured`
- `oidc_login_init_failed`
- `oidc_missing_callback_params`
- `oidc_state_missing`
- `oidc_state_invalid`
- `oidc_state_mismatch`
- `oidc_email_not_allowed`
- `oidc_user_not_found`
- `oidc_callback_failed`
- `oidc_<provider_error>`

`GET /api/sso/login` kann alternativ `503` JSON liefern, wenn OIDC nicht konfiguriert ist:

```json
{
  "error": "OIDC SSO is not configured."
}
```

## ENV-Vertrag

```env
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_SECRET=

OIDC_ISSUER=
OIDC_DISCOVERY_URL=
OIDC_CLIENT_ID=
OIDC_CLIENT_SECRET=
OIDC_REDIRECT_URI=http://localhost:3000/api/sso/callback
OIDC_JWKS_URI=
OIDC_ALLOWED_EMAILS=
OIDC_ALLOWED_EMAIL_DOMAINS=
OIDC_AUTO_CREATE_USERS=false
OIDC_SESSION_SECRET=
OIDC_DEBUG=false
```

`OIDC_DISCOVERY_URL` und `OIDC_JWKS_URI` sind optionale Overrides fuer Provider, deren Discovery- oder JWKS-Endpunkte von der Standardableitung aus `OIDC_ISSUER` abweichen.

Bei einem reinen `HS256`-Provider darf der JWKS-Endpunkt leer sein, weil die Signatur mit dem
Client-Secret verifiziert wird. Bei einem asymmetrischen Algorithmus muss `OIDC_JWKS_URI`
hingegen ein JSON Web Key Set mit einem nicht leeren `keys`-Array liefern.
