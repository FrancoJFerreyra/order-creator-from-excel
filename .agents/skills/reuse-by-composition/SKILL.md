---
name: reuse-by-composition
description: "Trigger: duplicate className, copy JSX, shared layout, repeated markup, module boundary. Compose instead of pasting in this codebase."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "2.0"
---

## Activation Contract

Load before pasting markup, Tailwind clusters, hooks, or helpers into a second place.

## Hard Rules

- Search `src/components/` before writing another copy of a visual block.
- Domain-blind UI (button, card, container, form field, table, modal) belongs in `src/components/<name>/` as `<Name>.tsx` plus `<Name>.variants.ts`.
- Page-bound UI stays inside its page folder: `src/pages/<Page>/<Name>.tsx`. Layout chrome goes in `src/pages/Layout/`.
- Shared state logic goes to `src/hooks/use<Resource>.ts`; pure helpers go to `src/utils/<topic>.utils.ts`. Pages import them; they never reach into a page's internals from somewhere else.
- Cross-page component that owns domain state (e.g. `ModalAddQuantity` taking a `Product`) belongs to its page folder, and composes the generic `src/components/modal/Modal` instead of reimplementing the dialog.
- Tauri equivalent: a command is declared once in `src-tauri/src/`, registered once in `lib.rs`, and wrapped once in `src/infraestructure/tauri/commands.ts`; never copied.
- Compose with `children` and props; do not duplicate structure and then let the copies diverge.
- Do not create an abstraction for a single use — this rule triggers at the second use.

## Decision Gates

| Situation | Do |
| --- | --- |
| 2nd use, domain-blind | extract to `src/components/<name>/` |
| 2nd use, domain-specific | extract inside the page folder that owns it |
| import crosses a page boundary | move the piece to `src/components/` or `src/hooks/`, then import |
| variants differ | add a `tv` variant; do not fork the component |

## Execution Steps

1. Search `src/components/` and the sibling page folder for the block.
2. If it exists, extend it with a variant or prop instead of copying.
3. If not, extract it and update every callsite in the same change.
4. Run `yarn build` and check the touched screens for visual regressions.

## Output Contract

Return the extracted component, the callsites updated, and why crossing that boundary was safe.

## References

- `src/components/` — reusable primitives.
- `src/pages/Settings/` — `Settings.tsx` composing `FileManager` and `FileConfig`.
- `src/pages/Home/Catalog/` — `Catalog.tsx` composing `CatalogSearch`, `ModalAddQuantity` and `useCatalog`.
- `src/hooks/`, `src/utils/`
