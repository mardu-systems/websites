# navigation-menu

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI NavigationMenu.

## Changed

- `packages/ui/src/components/navigation-menu.tsx`: replaced Radix with Base UI Root, List, Item, Trigger, Icon, Content, Link, Portal, Positioner, Popup, Viewport, and Arrow.
- Updated trigger/content state selectors, activation direction, sizing variables, and transform origin for Base UI.
- Removed the type-check suppression and confirmed the wrapper contains no Radix imports.

## Left alone

- Existing exports, viewport option, trigger/link styles, content layout, active links, and visual arrow remain available.

## Behavior changes

Base UI now manages popup positioning and viewport dimensions; the indicator export maps to Base UI Arrow and trigger chevrons use Base UI Icon state.

## Verify by hand

- Test hover, click, keyboard and focus navigation, active links, content transitions in both directions, viewport sizing, arrow placement, outside/Escape dismissal, and collision handling.
