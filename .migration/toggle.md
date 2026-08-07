# toggle

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to the callable Base UI Toggle.

## Changed

- `packages/ui/src/components/toggle.tsx`: replaced Radix Toggle Root with Base UI Toggle, retained all variants, and converted pressed selectors from `data-[state=on]` to `data-pressed`.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/toggle.tsx` returned no matches.

## Left alone

- No current application consumers import the standalone Toggle wrapper, so no call-site changes were required.
- ToggleGroup remains a separate migration because its value model changes to arrays.

## Behavior changes

None. Pressed state, keyboard activation, disabled behavior, sizing, and visual variants remain equivalent.

## Verify by hand

- Activate the toggle with mouse and Space and confirm `data-pressed` styling appears.
- Test default and outline variants at all sizes.
- Confirm a disabled toggle is not interactive and remains visibly dimmed.
