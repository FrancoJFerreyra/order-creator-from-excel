---
name: i18n
description: "Trigger: i18n, translation, locale, user-facing string, namespace, language. Add or change localized copy in the React app."
license: MIT
metadata:
  author: "FrancoJFerreyra"
  version: "2.0"
---

## Activation Contract

Load when adding, changing, or removing user-facing text, or when someone asks to introduce translations.

## Current state (verify before acting)

This repo has **no i18n layer**. There is no `react-i18next`, no locale files, no namespaces and no `localStorage` language key. Copy is Spanish and lives inline in components and in `src-tauri` error strings.

## Hard Rules

- Add user-facing copy inline, in Spanish, matching the existing voice: Argentine voseo, sentence case, no UI jargon. Examples in the codebase: `Cargá un catálogo desde Configuración.`, `Ingresá una cantidad mayor a 0.`, `Agregar al pedido`.
- Keep the same wording for the same action across screens (button label and its confirmation/alert use one term).
- Do not introduce `react-i18next`, a `locales/` tree, or a language switcher unless the user explicitly asks for internationalization. That is a new architecture decision, not a copy edit.
- Error text coming from Rust (`src-tauri/src/*.rs`) is surfaced through `String(reason)` in the React layer; keep it readable Spanish rather than a raw enum or panic string.
- Do not add a string that duplicates an existing label with a synonym; search the touched page folder first.

## Decision Gates

| String type | Do |
| --- | --- |
| product copy (labels, buttons, empty/error states) | inline in the component that renders it |
| error from a Tauri command | craft it in Rust, display it where the command is called |
| user explicitly asks for i18n | propose the structure first (library, locale location, namespace list) and wait for approval |

## Execution Steps

1. Search the page folder and `src/components/` for an existing label with the same meaning.
2. Write the string in Spanish with the repo's voice.
3. Verify it renders by running `yarn dev` (`yarn tauri dev` when the Tauri commands are involved).

## Output Contract

Return the strings added/changed, the files touched, and how you verified they render.

## References

- `src/pages/Settings/FileManager.tsx` — existing inline copy and empty-state wording.
- `src/pages/Home/Catalog/ModalAddQuantity.tsx` — validation message wording.
- `src-tauri/src/catalog.rs` — backend error strings.
