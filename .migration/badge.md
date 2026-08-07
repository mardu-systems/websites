# badge

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully from Radix Slot to Base UI render composition.

## Changed

- `packages/ui/src/components/badge.tsx`: replaced Radix Slot and `asChild` with Base UI's typed `useRender` composition while retaining all variants and classes.
- `packages/integrations-ui/src/integrations-filters.tsx`: converted Badge consumers from nested `asChild` links to `render` links.
- Leftover scan confirmed the Badge wrapper contains no Radix imports.

## Left alone

- Badge variants, semantic content, links, and filter URL generation remain unchanged.

## Behavior changes

The public polymorphic API now uses Base UI's `render` prop instead of Radix's `asChild`; rendered DOM and interaction behavior remain equivalent.

## Verify by hand

- Open the integrations filters and verify all category and protocol badges navigate correctly.
- Check default, outline, secondary, and destructive badge styling and keyboard focus.
