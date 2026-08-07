# dropdown-menu

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI Menu.

## Changed

- `packages/ui/src/components/dropdown-menu.tsx`: mapped dropdown exports to Base UI Menu Root, Trigger, Portal, Positioner, Popup, groups, items, indicators, separators, and submenu primitives.
- Routed positioning props through Positioner and updated state selectors and CSS variables.
- Removed the obsolete type-check suppression and all Radix imports.

## Left alone

- Existing export names, variants, inset styling, shortcuts, check/radio indicators, submenu arrows, placement defaults, and visual design remain unchanged.

## Behavior changes

Base UI now controls menu focus, typeahead, dismissal, collision positioning, and submenu state.

## Verify by hand

- Test trigger and keyboard opening, arrow/typeahead navigation, item activation, disabled/destructive items, checkbox/radio state, submenus, Escape/outside dismissal, focus restoration, and collision handling.
