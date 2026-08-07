# menubar

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI Menubar and Menu.

## Changed

- `packages/ui/src/components/menubar.tsx`: replaced the Radix container with Base UI Menubar and mapped each menu to Base UI Menu roots, triggers, positioning, popup, groups, items, indicators, separators, and submenus.
- Updated open/closed selectors and transform-origin variable; removed the type-check suppression and Radix import.

## Left alone

- Existing exports, visual layout, variants, shortcuts, check/radio state, inset styling, and submenu arrows remain unchanged.

## Behavior changes

Base UI now coordinates horizontal menubar focus and each menu's typeahead, dismissal, positioning, and submenu state.

## Verify by hand

- Test left/right movement between menus, up/down item navigation, typeahead, check/radio state, submenus, Escape/outside dismissal, focus restoration, and collision handling.
