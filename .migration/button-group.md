# button-group

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully from Radix Slot to Base UI render composition.

## Changed

- `packages/ui/src/components/button-group.tsx`: replaced ButtonGroupText's Radix Slot and `asChild` API with Base UI's typed `useRender` composition and added its missing `data-slot` marker.
- Removed the obsolete type-check suppression and confirmed the wrapper contains no Radix imports.

## Left alone

- Group orientation, variants, separator behavior, styles, and native group semantics remain unchanged.

## Behavior changes

ButtonGroupText now accepts Base UI's `render` prop instead of `asChild`; its output additionally exposes `data-slot="button-group-text"` for consistent styling and inspection.

## Verify by hand

- Test horizontal and vertical groups, focus rings, borders, separators, nested select triggers, and custom rendered text elements.
