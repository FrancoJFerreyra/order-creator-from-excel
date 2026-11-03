export interface CatalogItem {
  reference: string
  name: string
  quantity: number
}

export interface Product {
  sourceRow: number
  reference: string
  name: string
}

export interface CatalogSummary {
  productCount: number
  filePath: string
  sheetName: string
  referenceColumn: number
  nameColumn: number
}

export interface Catalog {
  customer: string
  date: string
  items: CatalogItem[]
}