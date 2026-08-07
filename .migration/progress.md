# progress

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI's computed progress anatomy.

## Changed

- `packages/ui/src/components/progress.tsx`: replaced Radix Progress with Base UI Root, Track, and Indicator; removed manual translate math because Base UI computes indicator width from `value` and `max`.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/progress.tsx` returned no matches.

## Left alone

- No current application consumers import the shared Progress wrapper, so no call-site changes were required.
- The separate stepper progress line is a custom visual and was not modified.

## Behavior changes

The indicator now animates its computed width instead of translating a full-width element. Determinate, complete, and indeterminate state attributes are provided by Base UI.

## Verify by hand

- Render values `0`, `50`, and `100` and confirm the fill width matches each value.
- Render `value={null}` and confirm the component exposes an indeterminate accessibility state.
- Change the value dynamically and confirm the fill transition remains smooth.
