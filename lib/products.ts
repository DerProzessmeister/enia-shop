import productsData from '@/data/products.json'
import { Product } from './types'

const products = productsData as Product[]

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getBestsellers(limit = 5): Product[] {
  return products.slice(0, limit)
}

export function getProductsByKollektion(kollektion: string): Product[] {
  return products.filter(p => 
    p.kollektion.toLowerCase().includes(kollektion.toLowerCase())
  )
}

export function getKollektionen(): string[] {
  const set = new Set(products.map(p => p.kollektion).filter(Boolean))
  return Array.from(set).slice(0, 16)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.kollektion.toLowerCase().includes(q) ||
    p.farbe.toLowerCase().includes(q)
  )
}

export function filterProducts(filters: {
  kollektion?: string
  maxPrice?: number
  nutzschicht?: string
  einsatzbereich?: string
  search?: string
}): Product[] {
  return products.filter(p => {
    if (filters.kollektion && !p.kollektion.toLowerCase().includes(filters.kollektion.toLowerCase())) return false
    if (filters.maxPrice && p.price > filters.maxPrice) return false
    if (filters.nutzschicht && p.nutzschicht !== filters.nutzschicht) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (!p.name.toLowerCase().includes(q) && !p.kollektion.toLowerCase().includes(q)) return false
    }
    return true
  })
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.id !== product.id && p.kollektion === product.kollektion)
    .slice(0, limit)
}
