# direction

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to Base UI's Direction Provider.

## Changed

- `packages/ui/src/components/direction.tsx`: replaced the Radix direction wrapper and type suppression with direct, typed Base UI exports.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/direction.tsx` returned no matches.

## Left alone

- No consumers currently import the shared Direction Provider, so no call-site changes were required.
- Component-specific direction props elsewhere will be reviewed with their respective wrappers.

## Behavior changes

The provider now accepts Base UI's `direction` prop instead of Radix's `dir` prop. The prior compatibility wrapper already exposed `direction`, and there are no current consumers of `dir`.

## Verify by hand

- Wrap a Base UI control with `<DirectionProvider direction="rtl">` and confirm keyboard direction and popup alignment follow RTL.
- Remove the provider and confirm the default remains left-to-right.
