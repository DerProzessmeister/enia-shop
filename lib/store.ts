'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from './types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: number) => void
  updateQty: (productId: number, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  count: () => number
}

interface WishlistStore {
  items: Product[]
  toggle: (product: Product) => void
  has: (productId: number) => boolean
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, qty = 1) => {
        const items = get().items
        const existing = items.find(i => i.product.id === product.id)
        if (existing) {
          set({ items: items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i), isOpen: true })
        } else {
          set({ items: [...items, { product, quantity: qty }], isOpen: true })
        }
      },
      removeItem: (productId) => set(s => ({ items: s.items.filter(i => i.product.id !== productId) })),
      updateQty: (productId, qty) => {
        if (qty <= 0) { get().removeItem(productId); return }
        set(s => ({ items: s.items.map(i => i.product.id === productId ? { ...i, quantity: qty } : i) }))
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'enia-cart' }
  )
)

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const items = get().items
        const exists = items.find(p => p.id === product.id)
        set({ items: exists ? items.filter(p => p.id !== product.id) : [...items, product] })
      },
      has: (productId) => get().items.some(p => p.id === productId),
    }),
    { name: 'enia-wishlist' }
  )
)
