# select

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI Select.

## Changed

- `packages/ui/src/components/select.tsx`: replaced Radix with Base UI Root, Group, Value, Trigger, Icon, Portal, Positioner, Popup, List, GroupLabel, Item, ItemIndicator, ItemText, Separator, and scroll arrows.
- Preserved the legacy `position` option by mapping item-aligned/popper modes to Base UI Positioner, and updated CSS variables and open/closed states.
- Removed the obsolete type-check suppression and confirmed the wrapper contains no Radix imports.

## Left alone

- Public export names, sizes, item markup, icons, default alignment, styling, keyboard selection, and controlled/uncontrolled value APIs remain available.

## Behavior changes

Base UI Positioner now controls alignment and collision behavior; SelectIcon uses `render` composition rather than `asChild`.

## Verify by hand

- Test placeholder/value display, mouse and keyboard opening, arrow/typeahead navigation, selection, disabled items, groups, scrolling arrows, item-aligned and popper modes, collision handling, and form integration.
