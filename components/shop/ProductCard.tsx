'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Product } from '@/lib/types'
import { formatPrice, calcM2Price } from '@/lib/utils'
import { useCart, useWishlist } from '@/lib/store'

interface Props {
  product: Product
  rank?: number
  delay?: number
}

export default function ProductCard({ product, rank, delay = 0 }: Props) {
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggle(product)
  }

  const isWished = has(product.id)
  const isOnSale = product.id % 3 === 0
  const isNew = product.id % 7 === 0

  return (
    <Link href={`/produkte/${product.slug}`} className="block group">
      <div
        className="bg-white rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer hover:-translate-y-1"
        style={{ borderColor: 'var(--border)', boxShadow: '0 0 0 rgba(0,0,0,0)' }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.13)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)')}
        style={{ animationDelay: `${delay}s` }}
      >
        {/* IMAGE */}
        <div className="h-[185px] relative overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          ) : (
            <div className="w-full h-full" style={{ background: 'linear-gradient(140deg, #e8d5b7, #c8a070, #a07840)' }} />
          )}
          {/* Number badge */}
          {rank && (
            <span className="absolute top-2.5 left-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black text-white shadow-lg" style={{ background: 'var(--red)' }}>
              {rank}
            </span>
          )}
          {/* Sale/New badge */}
          {isOnSale && (
            <span className="absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-black text-white" style={{ background: 'rgba(239,68,68,0.9)' }}>
              −15%
            </span>
          )}
          {isNew && !isOnSale && (
            <span className="absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-black text-white" style={{ background: 'rgba(37,99,235,0.9)' }}>
              NEU
            </span>
          )}
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute bottom-2.5 right-2.5 z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm shadow-md transition-transform hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.92)' }}
          >
            {isWished ? '❤️' : '♡'}
          </button>
        </div>

        {/* BODY */}
        <div className="p-3.5">
          <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--red)' }}>
            Enia · {product.kollektion.slice(0,12)}
          </div>
          <div className="text-[13.5px] font-bold leading-tight mb-1.5">{product.name}</div>
          <div className="flex gap-1 mb-2 flex-wrap">
            {product.groesse && <span className="text-[10.5px] px-1.5 py-0.5 rounded" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>{product.groesse}</span>}
            {product.nutzschicht && <span className="text-[10.5px] px-1.5 py-0.5 rounded" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>{product.nutzschicht}</span>}
          </div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[#f59e0b] text-xs">★★★★★</span>
            <span className="text-[11px]" style={{ color: 'var(--muted)' }}>(48)</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black">{formatPrice(product.price)}</span>
            {isOnSale && <span className="text-[12.5px] line-through" style={{ color: 'var(--muted)' }}>{formatPrice(product.price * 1.18)}</span>}
          </div>
          <div className="text-[10.5px] mb-1" style={{ color: 'var(--muted)' }}>pro Karton (2,28 m²)</div>
          <div className="text-[11px] font-semibold mb-2.5" style={{ color: 'var(--green)' }}>
            = {calcM2Price(product.price)}/m²
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2.5 rounded-lg text-[12.5px] font-bold text-white transition-colors"
              style={{ background: added ? 'var(--green)' : 'var(--red)' }}
            >
              {added ? '✓ Hinzugefügt' : 'In den Warenkorb'}
            </button>
            <button
              onClick={e => e.preventDefault()}
              className="px-3 py-2 rounded-lg text-xs font-bold border-[1.5px] transition-colors hover:bg-red-50"
              style={{ background: 'var(--red-lt)', color: 'var(--red)', borderColor: '#fca5a5' }}
            >
              Muster
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
