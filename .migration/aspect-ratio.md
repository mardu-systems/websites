# aspect-ratio

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to native CSS because Base UI has no Aspect Ratio primitive.

## Changed

- `packages/ui/src/components/aspect-ratio.tsx`: replaced Radix AspectRatio with a typed `<div>` using the native `aspect-ratio` CSS property; retained the `ratio` prop with its default of `1` and exported its prop type.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/aspect-ratio.tsx` returned no matches.

## Left alone

- No consumers currently import this wrapper, so no call-site changes were required.
- Unrelated media and image components were not modified.

## Behavior changes

The implementation now uses the browser's native `aspect-ratio` layout instead of Radix's nested sizing element. The public ratio behavior remains the same, but consumers that depended on Radix-specific internal DOM structure would need visual review.

## Verify by hand

- Render the wrapper with `ratio={16 / 9}` and confirm its box remains 16:9 while resizing.
- Render it without a ratio and confirm the default square layout.
