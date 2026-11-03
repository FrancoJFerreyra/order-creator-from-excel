import type { ColumnHeader } from "@/types/FileConfig"
import type { CatalogConfig } from "@/types/AppConfig"
import type { CatalogSummary, Product } from "@/types/Catalog"
import { invoke } from '@tauri-apps/api/core';

export const getHeaders = async ({ filePath, sheetName, headerRow = 0 }: { filePath: string, sheetName: string, headerRow?: number }) => {
  return await invoke<ColumnHeader[]>(
    'get_sheet_headers',
      {
        path: filePath,
        sheetName: sheetName,
        headerRow: headerRow,
      },
    )
  }

export const getSheets = async (filePath: string) => {
  return await invoke<string[]>(
    'get_workbook_sheets',
      {
        path: filePath,
      },
    )
  }

export const importCatalog = async (config: CatalogConfig) => {
  return await invoke<CatalogSummary>('import_catalog', { config })
}

export const loadCatalog = async () => {
  return await invoke<CatalogSummary | null>('load_catalog')
}

export const searchProducts = async (query: string, limit = 50) => {
  return await invoke<Product[]>('search_products', { query, limit })
}
