# Newsletter + Contact CRM Integration

`mardu.de` führt Newsletter- und Kontakt-Flows lokal aus: Lead-Routen, Payload-Collections und Twenty-Synchronisierung laufen in derselben App.

## Kanonische Implementierung

Quelle: [`lib/integrations/twenty.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/lib/integrations/twenty.ts)

## Verhalten

- `POST /api/contact` und `POST /api/newsletter` schreiben direkt via `getPayload()` in `contact-leads` / `newsletter-subscribers`
- Newsletter-Anmeldungen senden `role: 'newsletter'` an `POST /api/newsletter`
- Twenty-Sync wird ausschließlich in diesen Routen ausgeführt
- CRM-Fehler bleiben best effort und werden in Payload-Statusfeldern dokumentiert

## Request-Vertrag `POST /api/newsletter`

- Pflichtfelder:
  - `email`: gültige E-Mail-Adresse
  - `role`: ausschließlich `newsletter`
- Optionale Felder:
  - `firstName`, `lastName`: jeweils maximal 100 Zeichen
  - `company`: maximal 150 Zeichen
  - `token`: reCAPTCHA-Token, wenn der Schutz in der Zielumgebung aktiv ist
- Die öffentliche Route ergänzt serverseitig `site: 'mardu-de'`.
- Statuscodes:
  - `200`: Anfrage angenommen
  - `400`: ungültiges JSON oder ungültiger Payload
  - `429`: Schutz- oder Rate-Limit-Prüfung abgelehnt
  - `500`: Persistierung oder E-Mail-Versand fehlgeschlagen

## DTOs

- [`types/api/newsletter-crm.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/types/api/newsletter-crm.ts)
- [`types/api/twenty-sync.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/types/api/twenty-sync.ts)
