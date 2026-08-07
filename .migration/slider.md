# slider

2026-08-07, transformation engine validated against the current Base UI registry anatomy, migrated successfully with one- and two-thumb support.

## Changed

- `packages/ui/src/components/slider.tsx`: replaced Radix Slider with Base UI Root, Control, Track, Indicator, and indexed Thumbs; mapped orientation selectors, set edge thumb alignment, and retained the existing two-thumb default while supporting Base UI's scalar one-thumb value.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/slider.tsx` returned no matches.

## Left alone

- No current application consumers import the shared Slider wrapper, so no call-site changes were required.
- Number inputs in the configurator are not slider primitives and were not modified.

## Behavior changes

Base UI renames `onValueCommit` to `onValueCommitted` and `minStepsBetweenThumbs` to `minStepsBetweenValues`; it does not support Radix's `inverted` prop. No current consumer uses these props.

## Verify by hand

- Render the default range slider and drag both thumbs without letting them escape the track edges.
- Render a controlled scalar value and confirm exactly one thumb appears.
- Test keyboard arrows, Home/End, and a vertical orientation; confirm committed callbacks fire after interaction ends.
