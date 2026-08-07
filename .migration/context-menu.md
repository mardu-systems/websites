# context-menu

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI ContextMenu.

## Changed

- `packages/ui/src/components/context-menu.tsx`: replaced Radix with Base UI ContextMenu roots/triggers plus shared Menu positioning, popup, groups, items, indicators, separators, and submenu primitives.
- Routed positioning props through Positioner and updated state selectors and CSS variables.
- Leftover scan confirmed the wrapper contains no Radix imports.

## Left alone

- Existing export names, right-click trigger behavior, variants, inset styling, shortcuts, check/radio indicators, submenu arrows, and visual design remain unchanged.

## Behavior changes

Base UI now controls context-menu focus, typeahead, dismissal, collision positioning, and submenu state.

## Verify by hand

- Test right-click and keyboard opening, arrow/typeahead navigation, activation, disabled/destructive items, checkbox/radio state, submenus, Escape/outside dismissal, focus restoration, and collision handling.
