'use client'
import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count } = useCart()
  const cartTotal = total()
  const freeShippingThreshold = 499
  const remaining = freeShippingThreshold - cartTotal

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 190, backdropFilter: 'blur(2px)' }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        width: '420px',
        maxWidth: '100vw',
        background: 'white',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.15)',
      }}
      className="animate-slideIn"
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--primary)',
          color: 'white',
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700 }}>
            🛒 Warenkorb ({count()} Artikel)
          </h2>
          <button
            onClick={closeCart}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              color: 'white',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              fontSize: '18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'auto',
            }}
          >
            ✕
          </button>
        </div>

        {/* Free shipping progress */}
        {remaining > 0 ? (
          <div style={{ padding: '12px 20px', background: '#fef9c3', borderBottom: '1px solid #fde047' }}>
            <div style={{ fontSize: '12.5px', color: '#713f12', marginBottom: '8px' }}>
              Noch <strong>{formatPrice(remaining)}</strong> bis kostenlosem Versand 🚚
            </div>
            <div style={{ height: '6px', background: '#fde68a', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                background: 'var(--accent)',
                borderRadius: '3px',
                width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%`,
                transition: 'width 0.3s',
              }} />
            </div>
          </div>
        ) : cartTotal > 0 ? (
          <div style={{ padding: '10px 20px', background: '#dcfce7', borderBottom: '1px solid #86efac', fontSize: '13px', fontWeight: 700, color: '#166534' }}>
            ✅ Gratisversand inklusive!
          </div>
        ) : null}

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--muted)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
              <p style={{ fontWeight: 600, marginBottom: '16px' }}>Dein Warenkorb ist leer</p>
              <Link
                href="/produkte"
                onClick={closeCart}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: 'var(--primary)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                Jetzt shoppen →
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map(({ product, quantity }) => {
                const displayName = product.name
                  .replace(/^(110% Qualität:|1A)\s*/i, '')
                  .replace(/- Jetzt bestellen!$/i, '')
                  .trim()

                return (
                  <div key={product.id} style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    background: 'white',
                  }}>
                    {/* Image */}
                    <div style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      {product.image ? (
                        <Image src={product.image} alt={displayName} fill style={{ objectFit: 'cover' }} sizes="72px" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'var(--surface)' }} />
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', background: 'var(--primary)', display: 'inline-block', padding: '1px 6px', borderRadius: '3px', marginBottom: '4px' }}>
                        ENIA
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {displayName}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--primary)', marginTop: '4px' }}>
                        {formatPrice(product.price * quantity)}
                      </div>

                      {/* Qty + Remove */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <button
                          onClick={() => updateQty(product.id, quantity - 1)}
                          style={{ width: '28px', height: '28px', border: '1.5px solid var(--border)', borderRadius: '6px', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'auto' }}
                        >−</button>
                        <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
                        <button
                          onClick={() => updateQty(product.id, quantity + 1)}
                          style={{ width: '28px', height: '28px', border: '1.5px solid var(--border)', borderRadius: '6px', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'auto' }}
                        >+</button>
                        <button
                          onClick={() => removeItem(product.id)}
                          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: 'var(--muted)', minHeight: 'auto' }}
                        >
                          Entfernen
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--muted)' }}>Zwischensumme</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(cartTotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--muted)' }}>Versand</span>
              <span style={{ fontWeight: 600, color: remaining <= 0 ? 'var(--green)' : 'var(--text)' }}>
                {remaining <= 0 ? 'KOSTENLOS ✅' : formatPrice(9.95)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 900, paddingTop: '12px', borderTop: '2px solid var(--border)', marginBottom: '16px' }}>
              <span>Gesamt</span>
              <span>{formatPrice(cartTotal + (remaining <= 0 ? 0 : 9.95))}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                background: 'var(--accent)',
                color: 'var(--primary)',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 800,
                fontSize: '15px',
                borderRadius: '10px',
                marginBottom: '12px',
                boxShadow: '0 4px 16px rgba(245,200,66,0.3)',
              }}
            >
              Zur Kasse →
            </Link>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {['PayPal', 'Klarna', 'Visa', 'Mastercard'].map(m => (
                <span key={m} style={{ fontSize: '11px', padding: '3px 8px', background: 'var(--surface)', borderRadius: '4px', color: 'var(--muted)', fontWeight: 600 }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
