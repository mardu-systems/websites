# toggle-group

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI ToggleGroup with Base UI Toggle items.

## Changed

- `packages/ui/src/components/toggle-group.tsx`: replaced Radix Root with callable Base UI ToggleGroup and Radix Items with Base UI Toggle; retained the existing variant, size, spacing context, CSS gap variable, and grouped border styling.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/toggle-group.tsx` returned no matches.

## Left alone

- No current application consumers import ToggleGroup, so no value-shape call-site changes were required.
- The standalone Toggle wrapper was already migrated and its shared variants were reused.

## Behavior changes

Base UI replaces Radix's `type="single"|"multiple"` with a `multiple` boolean and always uses arrays for group values. Roving focus is always enabled, and `loop` is renamed to `loopFocus`. These deltas are flagged for future consumers.

## Verify by hand

- Render a single-selection group and confirm only one item remains pressed.
- Render with `multiple` and confirm multiple items can be selected and the callback receives an array.
- Test arrow-key focus, all size/variant combinations, and zero versus nonzero spacing.
