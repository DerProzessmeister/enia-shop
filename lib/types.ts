export interface Product {
  id: number
  slug: string
  name: string
  price: number
  sku: string
  category: string
  image: string
  availability: string
  kollektion: string
  groesse: string
  nutzschicht: string
  farbe: string
  einsatzbereich: string
  url: string
}

export interface CartItem {
  product: Product
  quantity: number
}
