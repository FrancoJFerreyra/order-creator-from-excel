export interface CatalogItem {
  reference: string
  name: string
  quantity: number
}

export interface Catalog {
  customer: string
  date: string
  items: CatalogItem[]
}