# label

2026-08-07, transformation engine for legacy `new-york` style, migrated successfully to the native HTML label recommended by Base UI.

## Changed

- `packages/ui/src/components/label.tsx`: replaced the Radix Label root with a strictly typed native `<label>` while preserving all existing classes and `htmlFor` behavior.
- Leftover scan confirmed clean: `grep -n "radix-ui\|@radix-ui" packages/ui/src/components/label.tsx` returned no matches.

## Left alone

- Existing Label consumers were unchanged because none use Radix-specific `asChild` behavior and native label props are API-compatible.
- Other form wrappers remain unchanged until their own component migration.

## Behavior changes

None. The wrapper retains native label association, selection styling, disabled peer styling, and its public component name.

## Verify by hand

- Click labels in the newsletter, whitepaper, and CTA forms and confirm focus moves to the associated input.
- Tab through the forms and confirm disabled labels retain their existing visual treatment.
