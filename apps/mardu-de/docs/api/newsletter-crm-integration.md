# Newsletter + Contact CRM Integration

`mardu.de` nutzt für Newsletter- und Kontakt-Flows die zentrale CRM-Synchronisierung aus `apps/platform`.

## Kanonische Implementierung

Quelle: [`apps/platform/lib/integrations/twenty.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/lib/integrations/twenty.ts)

## Verhalten

- `mardu.de`-Lead-Routen proxyen an `apps/platform`
- Newsletter-Anmeldungen senden `role: 'newsletter'` an `POST /api/newsletter`
- Twenty-Sync wird ausschließlich dort ausgeführt
- CRM-Fehler bleiben best effort und werden in Payload-Statusfeldern dokumentiert

## Request-Vertrag `POST /api/newsletter`

- Pflichtfelder:
  - `email`: gültige E-Mail-Adresse
  - `role`: ausschließlich `newsletter`
- Optionale Felder:
  - `firstName`, `lastName`: jeweils maximal 100 Zeichen
  - `company`: maximal 150 Zeichen
  - `token`: reCAPTCHA-Token, wenn der Schutz in der Zielumgebung aktiv ist
- Die öffentliche `mardu.de`-Route ergänzt serverseitig `site: 'mardu-de'`.
- Statuscodes:
  - `200`: Anfrage angenommen
  - `400`: ungültiges JSON oder ungültiger Payload
  - `429`: Schutz- oder Rate-Limit-Prüfung abgelehnt
  - `500`: Weiterleitung oder E-Mail-Versand fehlgeschlagen

## DTOs

- [`apps/platform/types/api/newsletter-crm.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/newsletter-crm.ts)
- [`apps/platform/types/api/twenty-sync.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/twenty-sync.ts)
