# item

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully from Radix Slot to Base UI render composition.

## Changed

- `packages/ui/src/components/item.tsx`: replaced the Item root's Radix Slot and `asChild` API with Base UI's typed `useRender` composition.
- Removed the obsolete type-check suppression and confirmed the wrapper contains no Radix imports.

## Left alone

- Item variants, size options, media/content/actions structure, separator behavior, data attributes, and styling remain unchanged.

## Behavior changes

Custom Item elements now use Base UI's `render` prop instead of Radix's `asChild`.

## Verify by hand

- Check default, outline, and muted items at both sizes, including linked items, media alignment, descriptions, separators, actions, and keyboard focus.
