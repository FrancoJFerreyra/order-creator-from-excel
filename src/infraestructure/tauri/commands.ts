import type { ColumnHeader } from "@/types/FileConfig"
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