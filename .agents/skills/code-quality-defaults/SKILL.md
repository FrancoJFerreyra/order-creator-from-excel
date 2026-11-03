---
name: code-quality-defaults
description: "Trigger: implement, refactor, simplify, types, duplicate, cleanup. Apply this repo's quality bar before writing or reshaping code."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "2.0"
---

## Activation Contract

Load for any implementation, refactor, or cleanup in the React app (`src/`) or the Tauri backend (`src-tauri/src/`).

## Hard Rules

- Make the smallest change that satisfies the request; search before adding a helper.
- Reuse existing primitives: `src/components/**`, `src/components/form/**`, `src/hooks/**`, `src/utils/**`.
- One component per file; styles live in a sibling `*.variants.ts` built with `tailwind-variants`.
- No new `any`, no non-null `!` used to silence a real null risk, and no fallbacks that hide missing data — fix the type or the producer.
- Every Tauri command lives in Rust (`src-tauri/src/catalog.rs`, `src-tauri/src/config.rs`), is registered in the `invoke_handler` of `src-tauri/src/lib.rs`, and gets a typed wrapper in `src/infraestructure/tauri/commands.ts`. Never call `invoke` from a component.
- Match existing file naming: `use<Resource>.ts` in `src/hooks/`, `*.utils.ts` in `src/utils/`, page folders `src/pages/<Page>/<Component>.tsx`.
- Do not reformat untouched files; keep diffs scoped.
- User-facing copy is Spanish (Argentine voseo: `Cargá`, `Ingresá`) and lives inline. There is no i18n layer.

## Decision Gates

| Situation | Do |
| --- | --- |
| same markup or Tailwind in 2+ files | extract to `src/components/<name>/` and compose |
| logic needed by 2+ pages | move it to `src/hooks/` (state) or `src/utils/` (pure) |
| new dependency | justify it; the repo has Tailwind v4, `tailwind-variants`, Ark UI, Zustand, `sweetalert2`, `lucide-react` |
| dialog / confirm | `src/utils/sweetAlert.utils.ts` (`successAlert`, `errorAlert`, `warningAlert`, `infoAlert`) |
| tests | no test runner exists; state the verification you actually ran |

## Execution Steps

1. Read the nearest existing implementation of the same shape (`src/components/button/`, `src/pages/Settings/`).
2. Write the smallest diff that matches it.
3. Run `yarn build` (`tsc -b && vite build`) and report the literal result.

## Output Contract

Return changed files, the patterns you reused, and the commands run with their outcome. Do not restate these rules as prose.

## References

- `README.md` — stack, scripts, Tauri command table, config layout.
- `src/components/button/Button.variants.ts` — variant-file pattern.
- `src/components/form/FormInput.tsx` — form field wrapper (delegates to `fields/Input` and `fields/InputNumber`).
- `src/infraestructure/tauri/commands.ts` — typed `invoke` wrappers.

## Known pre-existing failure

`yarn lint` fails before linting anything: `typescript-eslint does not support TS 7.0`. Report it; do not fix it as part of an unrelated change.
