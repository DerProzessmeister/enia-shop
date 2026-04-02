'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/shop/ProductCard'
import { Product } from '@/lib/types'

const FILTER_TABS = ['Alle','Eicheoptik','Betonoptik','Steinoptik','Großformat XXL','Unter 100€','Fußbodenheizung']

export default function BestsellerSection({ products }: { products: Product[] }) {
  const [active, setActive] = useState('Alle')

  return (
    <section className="px-10 py-12">
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="text-[23px] font-black">🏆 Topseller — Meistgekaufte Böden</h2>
        <Link href="/produkte" className="text-[13.5px] font-bold" style={{ color: 'var(--red)' }}>Alle 277 Produkte →</Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <span className="text-[12.5px] font-semibold mr-1" style={{ color: 'var(--muted)' }}>Filter:</span>
        {FILTER_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="px-4 py-[7px] rounded-full text-[12.5px] font-medium border-[1.5px] transition-all cursor-pointer"
            style={
              active === tab
                ? { background: 'var(--red)', color: '#fff', borderColor: 'var(--red)' }
                : { background: '#fff', color: 'var(--muted)', borderColor: 'var(--border)' }
            }
          >
            {tab}
          </button>
        ))}
        <select className="ml-auto px-3 py-2 rounded-lg text-sm border-[1.5px] outline-none cursor-pointer" style={{ borderColor: 'var(--border)', color: 'var(--dark)' }}>
          <option>Beliebtheit</option>
          <option>Preis ↑</option>
          <option>Preis ↓</option>
          <option>Neueste</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} rank={i + 1} delay={i * 0.08} />
        ))}
      </div>
    </section>
  )
}
