# sidebar

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully from Radix Slot to Base UI render composition.

## Changed

- `packages/ui/src/components/sidebar.tsx`: replaced Radix Slot in group labels/actions, menu buttons/actions, and submenu buttons with typed Base UI `useRender` composition.
- Reused the already migrated Base UI Sheet and Tooltip wrappers and removed the obsolete type-check suppression.
- Leftover scan confirmed the Sidebar wrapper contains no Radix imports.

## Left alone

- Sidebar state, responsive sheet, cookie persistence, keyboard shortcut, variants, collapse modes, tooltip behavior, and styling remain unchanged.

## Behavior changes

Polymorphic Sidebar controls now use Base UI's `render` prop instead of `asChild`.

## Verify by hand

- Test desktop and mobile opening, icon collapse, keyboard shortcut, persisted state, nested links, menu actions, active states, tooltips, focus, and responsive sheet dismissal.
