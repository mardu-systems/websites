# accordion

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI with consumer value modes updated.

## Changed

- `packages/ui/src/components/accordion.tsx`: replaced Radix parts with Base UI Root, Item, Header, Trigger, and Panel; mapped trigger state to `data-panel-open`, updated disabled selectors, and moved height animation to `--accordion-panel-height` with Base UI transition hooks.
- `packages/sections/src/faq.tsx`: removed Radix's single/collapsible props because Base UI single mode is inherently collapsible.
- `packages/catalog-ui/src/catalog-feature-spec-sections.tsx`: replaced `type="multiple"` with Base UI's `multiple` boolean while retaining the existing array state.
- `apps/platform/components/utilities/security-accordion.tsx`: removed Radix-only single/collapsible props.
- `apps/mardu-de/components/utilities/security-accordion.tsx`: removed Radix-only single/collapsible props.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/accordion.tsx` returned no matches.

## Left alone

- FAQ and security accordion content, typography, and data DTOs were not changed.
- Collapsible is already migrated separately and was not modified here.

## Behavior changes

Base UI single mode always allows the open item to collapse; this matches every current consumer, which explicitly used Radix `collapsible`. Accordion values are always arrays in Base UI; the only controlled consumer already uses `string[]`.

## Verify by hand

- Open and close FAQ and security items with mouse, Enter, and Space; confirm the chevron rotates and height transition completes cleanly.
- In product specifications, open multiple sections, then use expand-all and collapse-all controls.
- Confirm focus remains on the trigger and `aria-expanded` follows each panel.
