export interface CatalogConfig {
  filePath: string
  sheetName: string
  headerRow: number
  referenceColumn: number
  nameColumn: number
}

export interface OutputConfig {
  headers: string[]
}

export interface AppConfig {
  catalog: CatalogConfig | null
  output: OutputConfig
}