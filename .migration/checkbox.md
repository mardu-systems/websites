# checkbox

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI with existing visuals preserved.

## Changed

- `packages/ui/src/components/checkbox.tsx`: replaced the individual Radix Checkbox package with Base UI Checkbox parts, converted checked-state selectors to `data-checked`, and moved disabled styling to `data-disabled` because Base UI renders a generic root element.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/checkbox.tsx` returned no matches.

## Left alone

- Checkbox consumers were unchanged because none use Radix's string-valued indeterminate state; their boolean checked and form props remain compatible.
- Form orchestration remains on React Hook Form and is outside this primitive migration.

## Behavior changes

None for current consumers. Base UI models indeterminate state as a separate boolean prop if it is introduced later.

## Verify by hand

- Toggle consent and newsletter checkboxes with mouse, Space, and their labels.
- Submit required forms with the checkbox empty and selected; confirm native validation and submitted values.
- Confirm disabled checkboxes cannot be changed and retain the dimmed cursor treatment.
