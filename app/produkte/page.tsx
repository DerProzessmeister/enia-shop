'use client'
import { useState, useMemo } from 'react'
import { getAllProducts, getKollektionen } from '@/lib/products'
import ProductCard from '@/components/shop/ProductCard'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ProdukteContent() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const kat = searchParams.get('kat') || ''

  const allProducts = getAllProducts()
  const kollektionen = getKollektionen()

  const [filters, setFilters] = useState({ koll: '', maxPrice: 200, search })
  const [sort, setSort] = useState('popular')

  const filtered = useMemo(() => {
    let p = allProducts
    if (filters.koll) p = p.filter(x => x.kollektion.includes(filters.koll))
    if (filters.maxPrice < 200) p = p.filter(x => x.price <= filters.maxPrice)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      p = p.filter(x => x.name.toLowerCase().includes(q) || x.kollektion.toLowerCase().includes(q))
    }
    if (sort === 'price-asc') p = [...p].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') p = [...p].sort((a, b) => b.price - a.price)
    return p
  }, [filters, sort, allProducts])

  return (
    <div className="flex gap-0 min-h-screen">
      {/* FILTER SIDEBAR */}
      <aside className="w-[260px] flex-shrink-0 border-r p-5 sticky top-[130px] h-fit" style={{ borderColor: 'var(--border)' }}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-base">Filter</h3>
          <button onClick={() => setFilters({ koll: '', maxPrice: 200, search: '' })} className="text-xs font-semibold" style={{ color: 'var(--red)' }}>Zurücksetzen</button>
        </div>

        <div className="mb-5">
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--muted)' }}>Kollektion</div>
          {kollektionen.slice(0, 12).map(k => (
            <label key={k} className="flex items-center gap-2 py-1 cursor-pointer text-sm hover:text-[var(--red)] transition-colors">
              <input
                type="checkbox"
                checked={filters.koll === k}
                onChange={e => setFilters(f => ({ ...f, koll: e.target.checked ? k : '' }))}
                className="accent-[var(--red)]"
              />
              {k}
            </label>
          ))}
        </div>

        <div className="mb-5">
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--muted)' }}>Preis bis</div>
          <input
            type="range" min={67} max={200} value={filters.maxPrice}
            onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
            className="w-full accent-[var(--red)]"
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--muted)' }}>
            <span>67 €</span><span className="font-bold" style={{ color: 'var(--dark)' }}>bis {filters.maxPrice} €</span>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: 'var(--muted)' }}>Eignung</div>
          {['Fußbodenheizung','Feuchtraum','Büro/Gewerbe','Haustiere'].map(e => (
            <label key={e} className="flex items-center gap-2 py-1 cursor-pointer text-sm hover:text-[var(--red)] transition-colors">
              <input type="checkbox" className="accent-[var(--red)]" />
              {e}
            </label>
          ))}
        </div>
      </aside>

      {/* PRODUCT GRID */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm" style={{ color: 'var(--muted)' }}>
            <span className="font-bold text-base" style={{ color: 'var(--dark)' }}>{filtered.length}</span> Produkte gefunden
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 rounded-lg text-sm border-[1.5px] outline-none" style={{ borderColor: 'var(--border)' }}>
            <option value="popular">Beliebtheit</option>
            <option value="price-asc">Preis aufsteigend</option>
            <option value="price-desc">Preis absteigend</option>
          </select>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 0.03} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProdukteSeite() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Lädt...</div>}>
      <ProdukteContent />
    </Suspense>
  )
}
