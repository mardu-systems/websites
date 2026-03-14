# Legacy Data Migration

Diese Dokumentation beschreibt den einmaligen Import der Altbestaende in `apps/platform`.

## Ziel

- `newsletter.json` und `preorders.json` aus `apps/mardu-de`, `apps/mardu-space` und `apps/platform` in die neuen Payload-Collections importieren.
- Optional einen Export der alten `mardu.space`-Subscriber-Tabelle in `newsletter-subscribers` uebernehmen.
- Deduplizierung ueber `subscriptionKey = site + email + role`.

## Script

Ausfuehrung:

```bash
bun run migrate:legacy-data
```

Implementierung:
[scripts/migrate-legacy-data.mjs](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/scripts/migrate-legacy-data.mjs)

## Standardquellen

- [apps/mardu-de/data/newsletter.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/data/newsletter.json)
- [apps/mardu-de/data/preorders.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-de/data/preorders.json)
- [apps/mardu-space/data/newsletter.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/data/newsletter.json)
- [apps/mardu-space/data/preorders.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/mardu-space/data/preorders.json)
- [apps/platform/data/newsletter.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/data/newsletter.json)
- [apps/platform/data/preorders.json](/Users/lucaschoeneberg/Documents/GitHub/websites/apps/platform/data/preorders.json)

## Optionaler Import der alten `mardu.space`-Subscriber-Tabelle

Falls ein JSON-Export der alten TypeORM-Tabelle vorliegt, kann er ueber die Umgebungsvariable eingebunden werden:

```bash
SPACE_SUBSCRIBERS_EXPORT=/absolute/path/to/subscribers-export.json bun run migrate:legacy-data
```

Erwartete Minimalfelder pro Eintrag:

- `email`
- optional `site`
- optional `role`
- optional `firstName`
- optional `lastName`
- optional `company`
- optional `status` oder `confirmed`
- optional `confirmedAt`
- optional `unsubscribedAt`

## Ergebnis

- Newsletter-Eintraege landen in `newsletter-subscribers`
- Preorders landen in `preorder-requests`
- Bereits vorhandene Eintraege werden aktualisiert statt doppelt angelegt
