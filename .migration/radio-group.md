# radio-group

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI's split Radio Group and Radio primitives.

## Changed

- `packages/ui/src/components/radio-group.tsx`: mapped Radix Root to Base UI RadioGroup and each Item/Indicator to Base UI Radio parts; moved disabled styles to `data-disabled` for Base UI's generic radio root.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/radio-group.tsx` returned no matches.

## Left alone

- No current application consumers import this RadioGroup wrapper, so no call-site changes were required.
- Labels and field layouts remain separate shared components.

## Behavior changes

Base UI does not expose Radix's `orientation` or `loop` props; arrow-key navigation handles both axes and focus wrapping is built in. No current consumer uses those props.

## Verify by hand

- Select options with mouse, arrow keys, and Space and confirm only one item is selected.
- Confirm clicking an associated label changes the correct radio.
- Submit a named group in a form and confirm its selected value is included.
