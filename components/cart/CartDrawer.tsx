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
      <div className="fixed inset-0 bg-black/40 z-[90] backdrop-blur-sm" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[420px] bg-white z-[100] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold">Warenkorb ({count()} Artikel)</h2>
          <button onClick={closeCart} className="text-2xl hover:opacity-70 transition-opacity">×</button>
        </div>

        {/* Free shipping bar */}
        {remaining > 0 && (
          <div className="px-5 py-3" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <div className="text-[12.5px] mb-1.5" style={{ color: 'var(--muted)' }}>
              Noch <strong style={{ color: 'var(--green)' }}>{formatPrice(remaining)}</strong> bis kostenloser Versand 🚚
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%`, background: 'var(--green)' }}
              />
            </div>
          </div>
        )}
        {remaining <= 0 && (
          <div className="px-5 py-2.5 text-[12.5px] font-semibold" style={{ background: '#f0fdf4', color: 'var(--green)', borderBottom: '1px solid #bbf7d0' }}>
            ✅ Gratisversand inklusive!
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <div className="text-center py-12" style={{ color: 'var(--muted)' }}>
              <div className="text-5xl mb-4">🛒</div>
              <p className="font-medium">Dein Warenkorb ist leer</p>
              <Link href="/produkte" onClick={closeCart} className="mt-4 inline-block px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: 'var(--red)' }}>
                Jetzt shoppen →
              </Link>
            </div>
          )}
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-3 p-3 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                {product.image ? (
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="w-full h-full" style={{ background: 'linear-gradient(135deg,#c8a070,#8b6530)' }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold uppercase" style={{ color: 'var(--red)' }}>Enia</div>
                <div className="text-sm font-semibold leading-tight truncate">{product.name}</div>
                <div className="text-sm font-black mt-1">{formatPrice(product.price * quantity)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(product.id, quantity - 1)} className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold hover:bg-gray-50 text-sm" style={{ borderColor: 'var(--border)' }}>−</button>
                  <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                  <button onClick={() => updateQty(product.id, quantity + 1)} className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold hover:bg-gray-50 text-sm" style={{ borderColor: 'var(--border)' }}>+</button>
                  <button onClick={() => removeItem(product.id)} className="ml-auto text-xs hover:opacity-70" style={{ color: 'var(--muted)' }}>Entfernen</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t space-y-3" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>Zwischensumme</span>
              <span className="font-semibold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--muted)' }}>Versand</span>
              <span className="font-semibold" style={{ color: remaining <= 0 ? 'var(--green)' : 'var(--dark)' }}>
                {remaining <= 0 ? 'KOSTENLOS ✅' : formatPrice(9.95)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black border-t pt-2.5" style={{ borderColor: 'var(--border)' }}>
              <span>Gesamt</span>
              <span>{formatPrice(cartTotal + (remaining <= 0 ? 0 : 9.95))}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-3.5 rounded-xl text-center font-bold text-white text-[15px] transition-opacity hover:opacity-90"
              style={{ background: 'var(--red)' }}
            >
              Zur Kasse →
            </Link>
            <div className="flex justify-center gap-2 flex-wrap">
              {['PayPal','Klarna','Visa','MC'].map(m => (
                <span key={m} className="text-[11px] px-2 py-0.5 rounded font-semibold" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>{m}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
