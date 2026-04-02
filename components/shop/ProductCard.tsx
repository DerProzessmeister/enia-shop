'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/store'
import { Product } from '@/lib/types'

interface Props {
  product: Product
  rank?: number
  delay?: number
}

export default function ProductCard({ product, rank, delay = 0 }: Props) {
  const { addItem } = useCart()

  const displayName = product.name
    .replace(/^(110% Qualität:|1A)\s*/i, '')
    .replace(/- Jetzt bestellen!$/i, '')
    .trim()

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        animationDelay: `${delay}s`,
      }}
      className="product-card animate-fadeup"
    >
      {/* Image */}
      <Link href={`/produkte/${product.slug}`} style={{ display: 'block', position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
        <Image
          src={product.image}
          alt={displayName}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
          sizes="(max-width: 640px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="card-img"
        />
        {/* Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {rank && rank <= 3 && (
            <span style={{
              background: rank === 1 ? '#f5c842' : rank === 2 ? '#e5e7eb' : '#d97706',
              color: rank === 1 ? '#1a1a2e' : '#374151',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 800,
              display: 'block',
            }}>
              #{rank} 🏆
            </span>
          )}
          {product.availability === 'InStock' && (
            <span style={{
              background: '#dcfce7',
              color: '#166534',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 700,
              display: 'block',
            }}>
              ✓ Auf Lager
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
          {product.kollektion}
        </div>

        <Link href={`/produkte/${product.slug}`} style={{ textDecoration: 'none', color: 'var(--text)' }}>
          <div style={{
            fontSize: '13.5px',
            fontWeight: 700,
            lineHeight: 1.35,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
          }}>
            {displayName}
          </div>
        </Link>

        {/* Details row */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {product.nutzschicht && (
            <span style={{
              fontSize: '10.5px',
              background: 'var(--surface)',
              color: 'var(--muted)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 500,
            }}>
              {product.nutzschicht}
            </span>
          )}
          {product.groesse && (
            <span style={{
              fontSize: '10.5px',
              background: 'var(--surface)',
              color: 'var(--muted)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '120px',
            }}>
              {product.groesse}
            </span>
          )}
        </div>

        {/* Price & Cart */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '18px', color: 'var(--primary)' }}>
              {product.price.toFixed(2).replace('.', ',')} €
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>pro Karton</div>
          </div>
          <button
            onClick={() => addItem(product)}
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.15s',
              minHeight: '44px',
              minWidth: '44px',
            }}
            title="In den Warenkorb"
          >
            +
          </button>
        </div>
      </div>

      <style>{`
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
        .product-card:hover .card-img { transform: scale(1.04); }
      `}</style>
    </div>
  )
}
