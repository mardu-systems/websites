# switch

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI with checked-state styling preserved.

## Changed

- `packages/ui/src/components/switch.tsx`: replaced Radix Switch parts with Base UI, converted state selectors to `data-checked` and `data-unchecked`, and moved disabled styles to `data-disabled` for Base UI's generic root element.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/switch.tsx` returned no matches.

## Left alone

- No application call sites currently import the shared Switch wrapper, so no consumer changes were required.
- Checkbox and other form controls remain independently composed.

## Behavior changes

None. Boolean state, hidden form input behavior, keyboard interaction, and thumb motion remain equivalent.

## Verify by hand

- Toggle the switch with mouse and Space and confirm the thumb and background animate in both directions.
- Place it in a form with `name` and confirm checked submission behavior.
- Confirm disabled switches cannot be changed and show the existing dimmed cursor treatment.
