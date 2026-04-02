'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/shop/ProductCard'
import { Product } from '@/lib/types'

const FILTER_TABS = ['Alle', 'Eicheoptik', 'Betonoptik', 'Steinoptik', 'Großformat XXL', 'Unter 100€']

export default function BestsellerSection({ products }: { products: Product[] }) {
  const [active, setActive] = useState('Alle')

  return (
    <section style={{ padding: '56px 0', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', marginBottom: '6px' }}>
              🏆 Meistgekaufte Böden
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Die beliebtesten Enia-Designböden unserer Kunden</p>
          </div>
          <Link href="/produkte" style={{
            color: 'var(--primary)',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            border: '1.5px solid var(--primary)',
            padding: '8px 18px',
            borderRadius: '8px',
            minHeight: '44px',
          }}>
            Alle 277 Produkte →
          </Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 600,
                border: '1.5px solid',
                cursor: 'pointer',
                transition: 'all 0.15s',
                minHeight: '44px',
                ...(active === tab
                  ? { background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' }
                  : { background: 'white', color: 'var(--text)', borderColor: 'var(--border)' }),
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
        }}
        className="product-grid"
        >
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} rank={i + 1} delay={i * 0.06} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .product-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
