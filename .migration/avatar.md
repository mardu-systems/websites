# avatar

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI with the existing anatomy and styling preserved.

## Changed

- `packages/ui/src/components/avatar.tsx`: replaced Radix Root, Image, and Fallback parts with their Base UI equivalents and retained state-aware class composition.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/avatar.tsx` returned no matches.

## Left alone

- No current application consumers import the shared Avatar wrapper, so no call-site changes were required.
- Image loading and content components outside this wrapper were not modified.

## Behavior changes

The Base UI fallback delay prop is named `delay` instead of Radix's `delayMs`. No current consumer uses that prop.

## Verify by hand

- Render an avatar with a valid image and confirm it fills the circular frame.
- Use a broken image URL and confirm the fallback appears.
- Add `delay={300}` to the fallback and confirm it waits before appearing.
