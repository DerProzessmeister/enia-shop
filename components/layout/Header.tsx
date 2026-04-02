'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/store'

export default function Header() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const { count, openCart } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/produkte?search=${encodeURIComponent(query)}`)
  }

  return (
    <header style={{
      background: 'var(--primary)',
      position: 'sticky',
      top: '41px',
      zIndex: 90,
      borderBottom: '2px solid rgba(245,200,66,0.2)',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '0 24px',
        height: '72px',
      }}>
        {/* LOGO */}
        <Link href="/" style={{ flexShrink: 0, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'var(--accent)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 900,
            color: 'var(--primary)',
            flexShrink: 0,
          }}>E</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '18px', color: '#ffffff', lineHeight: 1.2 }}>
              Enia <span style={{ color: 'var(--accent)' }}>Bodenbelag</span>
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', lineHeight: 1 }}>
              Premium Designböden · Hamburg
            </div>
          </div>
        </Link>

        {/* SEARCH */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '600px', display: 'flex', borderRadius: '10px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Boden suchen — z.B. "LARIX oak" oder "Betonoptik"...'
            style={{
              flex: 1,
              border: 'none',
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              padding: '0 16px',
              fontSize: '14px',
              outline: 'none',
              minHeight: '44px',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'var(--accent)',
              border: 'none',
              padding: '0 20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--primary)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            🔍
          </button>
        </form>

        {/* SPACER */}
        <div style={{ flex: 1 }} />

        {/* PHONE */}
        <div style={{ textAlign: 'right', display: 'none' }} className="md-show">
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>Kostenlose Beratung</div>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'white' }}>040 55 63 32 69</div>
        </div>

        {/* SAMPLE */}
        <Link href="/muster" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0 16px',
          height: '44px',
          borderRadius: '8px',
          border: '1.5px solid rgba(255,255,255,0.25)',
          color: 'white',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          background: 'rgba(255,255,255,0.06)',
        }}>
          🎁 Gratis Muster
        </Link>

        {/* ACCOUNT */}
        <Link href="/konto" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0 14px',
          height: '44px',
          borderRadius: '8px',
          border: '1.5px solid rgba(255,255,255,0.2)',
          color: 'white',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 600,
          background: 'rgba(255,255,255,0.06)',
        }}>
          👤 Konto
        </Link>

        {/* CART */}
        <button
          onClick={openCart}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 18px',
            height: '44px',
            borderRadius: '8px',
            background: 'var(--accent)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--primary)',
            position: 'relative',
          }}
        >
          🛒 Warenkorb
          <span style={{
            background: 'var(--primary)',
            color: 'var(--accent)',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '10px',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {count()}
          </span>
        </button>
      </div>
    </header>
  )
}
