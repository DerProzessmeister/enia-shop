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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* FILTER SIDEBAR */}
      <aside style={{
        width: '260px',
        flexShrink: 0,
        borderRight: '1px solid var(--border)',
        padding: '24px 20px',
        position: 'sticky',
        top: '160px',
        height: 'fit-content',
        background: 'white',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontWeight: 800, fontSize: '15px', color: 'var(--primary)' }}>Filter</h3>
          <button
            onClick={() => setFilters({ koll: '', maxPrice: 200, search: '' })}
            style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', minHeight: 'auto' }}
          >
            Zurücksetzen
          </button>
        </div>

        {/* Kollektion filter */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '10px' }}>
            Kollektion
          </div>
          {kollektionen.slice(0, 12).map(k => (
            <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', cursor: 'pointer', fontSize: '13.5px' }}>
              <input
                type="checkbox"
                checked={filters.koll === k}
                onChange={e => setFilters(f => ({ ...f, koll: e.target.checked ? k : '' }))}
                style={{ accentColor: 'var(--primary)' }}
              />
              {k}
            </label>
          ))}
        </div>

        {/* Price filter */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '10px' }}>
            Preis bis
          </div>
          <input
            type="range" min={67} max={200} value={filters.maxPrice}
            onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
            style={{ width: '100%', accentColor: 'var(--primary)' } as React.CSSProperties}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px', color: 'var(--muted)' }}>
            <span>67 €</span>
            <span style={{ fontWeight: 700, color: 'var(--text)' }}>bis {filters.maxPrice} €</span>
          </div>
        </div>
      </aside>

      {/* PRODUCT GRID */}
      <div style={{ flex: 1, padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '14px', color: 'var(--muted)' }}>
            <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--primary)' }}>{filtered.length}</span> Produkte gefunden
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '13.5px',
              border: '1.5px solid var(--border)',
              outline: 'none',
              color: 'var(--text)',
              background: 'white',
              minHeight: '44px',
            }}
          >
            <option value="popular">Beliebtheit</option>
            <option value="price-asc">Preis aufsteigend</option>
            <option value="price-desc">Preis absteigend</option>
          </select>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '18px',
        }}
        className="product-grid-4"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 0.03} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) { .product-grid-4 { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .product-grid-4 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .product-grid-4 { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}

export default function ProdukteSeite() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: 'var(--muted)' }}>Lädt...</div>}>
      <ProdukteContent />
    </Suspense>
  )
}
