# collapsible

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI while preserving the public wrapper names.

## Changed

- `packages/ui/src/components/collapsible.tsx`: replaced Radix Root and Trigger with Base UI equivalents and mapped Radix Content to Base UI Panel.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/collapsible.tsx` returned no matches.

## Left alone

- No current application consumers import the shared Collapsible wrapper, so no call-site changes were required.
- Accordion and other disclosure components remain separate migration units.

## Behavior changes

The low-level persistence prop is now `keepMounted` instead of Radix's `forceMount`. No current consumer uses either prop.

## Verify by hand

- Render a Collapsible with a trigger and panel, then open and close it with mouse and Enter/Space.
- Confirm focus remains on the trigger and `aria-expanded` follows the open state.
- Add `keepMounted` to the panel and confirm closed content stays in the DOM while hidden.
