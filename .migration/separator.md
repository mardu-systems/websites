# separator

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI with orientation styling preserved.

## Changed

- `packages/ui/src/components/separator.tsx`: replaced Radix Separator Root with the callable Base UI Separator and retained horizontal and vertical layout classes.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/separator.tsx` returned no matches.

## Left alone

- Existing separator consumers were unchanged because they only use orientation and standard DOM props.
- Visual separators embedded in ButtonGroup, Item, Field, and Sidebar remain composed through the shared wrapper.

## Behavior changes

Base UI separators are always semantic with `role="separator"`; Radix's `decorative` prop has no equivalent and was removed. Current consumers did not pass the prop, but the old wrapper defaulted to decorative output, so assistive technologies may now announce these separators.

## Verify by hand

- Inspect horizontal separators in forms and item groups and confirm they remain one pixel high and full width.
- Inspect vertical separators in button groups and the sidebar and confirm their height and spacing are unchanged.
- Check the accessibility tree and confirm the new semantic separators are acceptable for these group boundaries.
