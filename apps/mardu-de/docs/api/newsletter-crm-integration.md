# Newsletter + Contact CRM Integration

`mardu.de` nutzt fuer Newsletter-, Contact- und Preorder-Flows die zentrale CRM-Synchronisierung aus `apps/platform`.

## Kanonische Implementierung

Quelle: [`apps/platform/lib/integrations/twenty.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/lib/integrations/twenty.ts)

## Verhalten

- `mardu.de`-Lead-Routen proxyen an `apps/platform`
- Twenty-Sync wird ausschliesslich dort ausgefuehrt
- CRM-Fehler bleiben best effort und werden in Payload-Statusfeldern dokumentiert

## DTOs

- [`apps/platform/types/api/newsletter-crm.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/newsletter-crm.ts)
- [`apps/platform/types/api/twenty-sync.ts`](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/types/api/twenty-sync.ts)
