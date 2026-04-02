'use client'
import { useState } from 'react'
import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, total } = useCart()
  const cartTotal = total()
  const shipping = cartTotal >= 499 ? 0 : 9.95
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ email:'', name:'', street:'', city:'', zip:'', payment:'klarna' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <div className="max-w-[1100px] mx-auto px-10 py-10">
      <h1 className="text-2xl font-black mb-8">Kasse</h1>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        {['Kontakt', 'Lieferung', 'Zahlung', 'Bestätigung'].map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all ${i+1 <= step ? 'text-white' : 'text-gray-400 border-2'}`}
                 style={i+1 <= step ? { background: 'var(--red)' } : { borderColor: 'var(--border)' }}>
              {i+1 < step ? '✓' : i+1}
            </div>
            <span className={`text-sm font-semibold ${i+1 === step ? '' : 'text-gray-400'}`}>{s}</span>
            {i < 3 && <span className="text-gray-300 text-lg">›</span>}
          </div>
        ))}
      </div>

      <div className="grid gap-8" style={{ gridTemplateColumns: '1fr 380px' }}>
        {/* Form */}
        <div className="space-y-5">
          {/* Step 1: Contact */}
          <div className="p-5 rounded-xl border-2" style={{ borderColor: step >= 1 ? 'var(--red)' : 'var(--border)' }}>
            <h2 className="font-black text-base mb-4">1. Kontakt</h2>
            <input name="email" placeholder="E-Mail-Adresse" value={form.email} onChange={handleChange}
              className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors"
              style={{ borderColor: 'var(--border)' }} />
          </div>

          {/* Step 2: Address */}
          <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <h2 className="font-black text-base mb-4">2. Lieferadresse</h2>
            <div className="space-y-3">
              <input name="name" placeholder="Vor- und Nachname" value={form.name} onChange={handleChange}
                className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors"
                style={{ borderColor: 'var(--border)' }} />
              <input name="street" placeholder="Straße und Hausnummer" value={form.street} onChange={handleChange}
                className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors"
                style={{ borderColor: 'var(--border)' }} />
              <div className="flex gap-3">
                <input name="zip" placeholder="PLZ" value={form.zip} onChange={handleChange}
                  className="w-28 border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors"
                  style={{ borderColor: 'var(--border)' }} />
                <input name="city" placeholder="Stadt" value={form.city} onChange={handleChange}
                  className="flex-1 border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors"
                  style={{ borderColor: 'var(--border)' }} />
              </div>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <h2 className="font-black text-base mb-4">3. Zahlungsmethode</h2>
            <div className="space-y-2.5">
              {[
                { id: 'klarna', label: 'Klarna — Jetzt kaufen, später zahlen', icon: '🏷️' },
                { id: 'paypal', label: 'PayPal', icon: '💳' },
                { id: 'card', label: 'Kreditkarte (Visa / Mastercard)', icon: '💳' },
                { id: 'sepa', label: 'SEPA-Lastschrift', icon: '🏦' },
                { id: 'sofort', label: 'Sofortüberweisung', icon: '⚡' },
              ].map(p => (
                <label key={p.id} className="flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all hover:border-[var(--red)]"
                       style={{ borderColor: form.payment === p.id ? 'var(--red)' : 'var(--border)', background: form.payment === p.id ? 'var(--red-lt)' : '#fff' }}>
                  <input type="radio" name="payment" value={p.id} checked={form.payment === p.id} onChange={handleChange} className="accent-[var(--red)]" />
                  <span className="text-base">{p.icon}</span>
                  <span className="text-sm font-medium">{p.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="sticky top-[140px] h-fit">
          <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-black text-base mb-4">Bestellübersicht</h3>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <span>{product.name} × {quantity}</span>
                <span className="font-semibold">{formatPrice(product.price * quantity)}</span>
              </div>
            ))}
            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted)' }}>Zwischensumme</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted)' }}>Versand</span>
                <span style={{ color: shipping === 0 ? 'var(--green)' : '' }}>{shipping === 0 ? 'GRATIS ✅' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-black text-base border-t pt-2.5 mt-2.5" style={{ borderColor: 'var(--border)' }}>
                <span>Gesamt</span>
                <span>{formatPrice(cartTotal + shipping)}</span>
              </div>
            </div>
            <button className="w-full mt-5 py-4 rounded-xl font-black text-base text-white transition-all hover:-translate-y-0.5 border-none cursor-pointer"
                    style={{ background: 'var(--red)' }}>
              Jetzt kaufen → {formatPrice(cartTotal + shipping)}
            </button>
            <div className="flex justify-center gap-2 mt-3 flex-wrap">
              {['PayPal','Klarna','Visa','MC'].map(m => (
                <span key={m} className="text-[11px] px-2 py-0.5 rounded font-semibold" style={{ background: 'var(--surface)', color: 'var(--muted)' }}>{m}</span>
              ))}
            </div>
            <div className="text-center text-[11px] mt-2" style={{ color: 'var(--muted)' }}>
              🔒 SSL-verschlüsselt · Trusted Shops · Käuferschutz
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
