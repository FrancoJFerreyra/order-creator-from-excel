---
name: create-react-component
description: "Trigger: new component, variants, form field, page UI, styling. Build React components that match this repo's structure and theme."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "2.0"
---

## Activation Contract

Load before creating, moving, or restyling a React component in `src/`.

## Hard Rules

- Reusable, domain-blind component → `src/components/<name>/<Name>.tsx`. Page-specific component → `src/pages/<Page>/<Name>.tsx`, next to the page that owns it. Layout chrome → `src/pages/Layout/`.
- Styling uses `tailwind-variants`: export a `tv({...})` config from a sibling `<Name>.variants.ts` and export its variant types (`ModalSize`, `CardRadius`, …). See `src/components/button/Button.variants.ts`, `src/components/modal/Modal.variants.ts`.
- Use theme tokens from `src/css/theme.css` (`bg-ui-primary`, `text-ui-muted-foreground`, `border-ui-error-border`, …). No raw hex values and no JS Tailwind config — v4 is CSS-first; `src/index.css` imports `base`, `theme` and `components` layers.
- Forms are controlled with `useState` and the wrappers in `src/components/form/` (`FormInput`, `FormSelect`, `FormField`, `FormLabel`, `FormErrorMessage`). Never a bare `<input>`; `type="number"` already routes to `fields/InputNumber` (Ark UI `NumberInput`). No `react-hook-form`, no `zod`.
- Every user-facing string is Spanish, inline, in the existing voseo voice (`Cargá un catálogo`, `Ingresá una cantidad mayor a 0.`). There is no i18n layer.
- Import reusable code with the `@/` alias (`@/components/…`, `@/types/…`, `@/hooks/…`). Siblings inside the same page folder use relative paths. No file extension on imports.
- Take font weight, spacing, radius, and shadows from existing components; do not invent a parallel scale. Page/section titles use `<Subtitle title="…" />`.

## Decision Gates

| Need | Do |
| --- | --- |
| new variant or prop | extend the `tv` config, not inline `className` conditionals |
| numeric input | `FormInput type="number"` (do not hand-roll a number field) |
| confirm / toast feedback | `src/utils/sweetAlert.utils.ts`, no new dialog library |
| dialog | `src/components/modal/Modal` (`open`, `onClose`, `title`, `size`) |
| new page | create `src/pages/<Page>/<Page>.tsx` and register it in `src/router.tsx` |
| shared class merge | `cn` from `src/utils/css.utils.ts` |

## Execution Steps

1. Search for an existing component that already does most of it.
2. Read a sibling component and its `.variants.ts`.
3. Create the component and variants files; keep page-local state inside the page component that owns it.
4. Wire the page/route (`src/router.tsx`) when it is a new screen.
5. Run `yarn build` (`tsc -b && vite build`) and report the result.

## Output Contract

Return files created/modified, variant names, and the build result.

## References

- `src/components/` — reusable component patterns (`button`, `card`, `form`, `table`, `modal`, `heading`).
- `src/pages/Settings/` — page split into small sibling components.
- `src/pages/Home/Catalog/` — page with local hook (`useCatalog`), search component and domain modal.
- `src/css/theme.css` — available design tokens.
- `src/router.tsx` — route table (`react-router-dom` `createBrowserRouter`).
