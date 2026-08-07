# tabs

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI with public wrapper names preserved.

## Changed

- `packages/ui/src/components/tabs.tsx`: replaced Radix Root/List with Base UI parts, mapped Trigger to Tab and Content to Panel, converted active selectors to `data-active`, and updated disabled styling to `aria-disabled`.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/tabs.tsx` returned no matches.

## Left alone

- `packages/sections/src/scenario-showcase.tsx` required no code change because its controlled string value and one-argument handler remain compatible.
- Scenario content and layout were not modified.

## Behavior changes

Base UI defaults to manual tab activation: arrow keys move focus and Enter/Space activates the focused tab. Radix defaulted to automatic activation on focus. This intentional Base UI behavior delta is flagged and not silently overridden.

## Verify by hand

- Open the scenario showcase and click every tab; confirm the matching panel appears.
- Use Left/Right or Up/Down arrow keys to move focus, then Enter/Space to activate the focused tab.
- Confirm active, focus-visible, and dark-mode styling remain unchanged.
