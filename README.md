# Excel Order Creator

A small desktop app for taking phone orders without manually digging through a price-list Excel.

Today the workflow is: listen to the order, open the price list, look up every product one by one (by reference or by name), then copy name and reference into a second Excel that holds the pending-orders queue. This app replaces the lookup and the copy-paste: load the price list once, search products, build the order, and paste the result into the existing queue file.

## Why a clipboard export instead of writing the Excel

The output Excel is a shared queue on OneDrive, not a history: rows are added per order and deleted by hand when they are done. It must stay current at all times, so the app never writes to it. Instead it produces the rows as tab-separated text and puts them on the clipboard; the user focuses the first empty cell of the queue and presses `Ctrl + V`.

The queue format is preserved as-is:

| cliente | fecha | referencia | nombre |
| --- | --- | --- | --- |
| Ana | 02/11/2026 | REF-001 | 10, Coca Cola 330ml |
|  |  | REF-002 | 2, Agua 500ml |

Quantity is embedded in the `nombre` column as `"{quantity}, {product name}"`, and follow-up rows of the same order leave `cliente` and `fecha` empty.

## Stack

- **Tauri v2** shell with a **Rust** backend (`src-tauri`)
- **React 19 + TypeScript** frontend built with **Vite**
- **Tailwind CSS v4** with **tailwind-variants** for component styles
- **Ark UI** for form primitives (`Field`, `Select`)
- **Zustand** for shared configuration state
- **calamine** to read `.xlsx` workbooks in Rust

## Getting started

Requirements: Node.js, Yarn, a Rust toolchain, and the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) for your OS.

```bash
yarn install
yarn tauri dev      # desktop app with hot reload
```

Other scripts:

```bash
yarn dev            # Vite only; Tauri commands are unavailable in the browser
yarn build          # type-check + production build
yarn lint           # ESLint
```

## How configuration works

Rust persists the user's selections in `config.json` inside the app local data directory (`app_local_data_dir`, identifier `com.tauri.dev`; on Linux that is `~/.local/share/com.tauri.dev/config.json`). The imported product cache lives next to it as `catalog.json`. Nothing is kept in `localStorage`, so the desktop app and a future installer behave the same way.

```json
{
  "catalog": {
    "filePath": "/home/ana/Documents/lista-de-precios.xlsx",
    "sheetName": "Productos",
    "headerRow": 0,
    "referenceColumn": 0,
    "nameColumn": 1
  },
  "output": {
    "headers": ["cliente", "fecha", "referencia", "nombre"]
  }
}
```

- `headerRow`, `referenceColumn` and `nameColumn` are zero-based indices, so the catalog does not have to follow a fixed layout.
- On startup `App` calls `get_app_config` and stores the result in Zustand. Components must subscribe to `state.config` (not to a store function) so they re-render when the config arrives or changes.
- Settings persists every change immediately through `save_app_config`.

## Screens

- **Settings** — load the price-list `.xlsx`, then map which Excel header is the product reference and which one is the name. Once a header is assigned to one field it is no longer offered in the other, so the same column cannot be mapped twice.
- **New order** — left panel: searchable catalog table; right panel: customer name and the order lines that will be copied to the clipboard.

## Tauri commands

| Command | Purpose |
| --- | --- |
| `get_app_config` / `save_app_config` | Read and persist `config.json` |
| `get_workbook_sheets` | List sheet names of an `.xlsx` |
| `get_sheet_headers` | Read the header row of a sheet as `{ index, name }` |
| `import_catalog` | Read the sheet and cache the products locally |
| `load_catalog` | Load the cached catalog into memory |
| `search_products` | Search the in-memory catalog by reference or name |

## Project layout

```
src/
  components/          UI primitives (button, card, table, form fields)
    form/              Form wrappers: label + field + error
      fields/          Ark UI based inputs (Input, Select)
  infraestructure/
    store/             Zustand config store
    tauri/             Typed wrappers around invoke()
  pages/
    Home/              Order creation screen
    Settings/          Catalog file and header mapping
  types/               Shared TypeScript types
src-tauri/
  src/catalog.rs       Excel reading, catalog cache, search
  src/config.rs        config.json persistence
  src/lib.rs           Plugin and command registration
```

## Status

Working today: catalog file selection, sheet/header discovery, header mapping, and config persistence.

Not wired to the UI yet: catalog import and product search, building the order table, and the clipboard export. The Rust commands for the first two already exist.

## Known issues

- `src-tauri/tauri.conf.json` points `frontendDist` to `../build` while Vite outputs to `dist`, and `beforeDevCommand`/`beforeBuildCommand` use `npm run` while the repo uses Yarn. Align both before producing an installer.
- `src/pages/Home/Catalog.tsx` still has placeholder state and fails the strict TypeScript build, so `yarn build` and `yarn tauri build` stop there.
- `yarn lint` fails to start: the installed `typescript-eslint` does not support TypeScript 7 yet.
