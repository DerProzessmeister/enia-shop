'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { formatPrice, getKollektionBadge } from '@/lib/utils'

const FALLBACKS = [
  'linear-gradient(135deg,#c9a07a,#8b6530,#d4b896)',
  'linear-gradient(135deg,#8b6914,#c9a07a)',
  'linear-gradient(135deg,#607d8b,#cfd8dc)',
  'linear-gradient(135deg,#795548,#d7ccc8)',
  'linear-gradient(135deg,#388e3c,#a5d6a7)',
  'linear-gradient(135deg,#3e2723,#8d6e63)',
  'linear-gradient(135deg,#6b4c2a,#d4b896)',
  'linear-gradient(135deg,#546e7a,#90a4ae)',
]

export default function GallerySection({ products }: { products: Product[] }) {
  return (
    <section className="py-12 overflow-hidden" style={{ paddingLeft: '40px', background: 'var(--surface)' }}>
      <div className="flex items-baseline justify-between mb-5.5 pr-10">
        <h2 className="text-[23px] font-black">📸 Alle Kollektionen entdecken</h2>
        <Link href="/produkte" className="text-[13.5px] font-bold" style={{ color: 'var(--red)' }}>Alle 277 Produkte →</Link>
      </div>
      <div className="flex gap-3.5 overflow-x-auto pb-2 pr-10 no-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
        {products.map((p, i) => (
          <Link
            key={p.id}
            href={`/produkte/${p.slug}`}
            className="min-w-[270px] h-[230px] rounded-xl overflow-hidden cursor-pointer flex-shrink-0 relative group transition-all duration-250 hover:scale-[1.03]"
            style={{ scrollSnapAlign: 'start' }}
          >
            {p.image ? (
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="270px" />
            ) : (
              <div className="absolute inset-0" style={{ background: FALLBACKS[i % FALLBACKS.length] }} />
            )}
            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
            {/* Info */}
            <div className="absolute bottom-3.5 left-4 text-white">
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Kollektion</div>
              <div className="text-base font-black">{getKollektionBadge(p.kollektion)}</div>
              <div className="text-[13px] opacity-90">ab {formatPrice(p.price)}</div>
            </div>
            {/* Add to cart on hover */}
            <button className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-lg text-[12px] font-bold text-white border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'var(--red)' }}>
              + Warenkorb
            </button>
          </Link>
        ))}
      </div>
    </section>
  )
}
