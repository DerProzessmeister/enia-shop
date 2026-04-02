'use client'
import { use, useState } from 'react'
import Image from 'next/image'
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/products'
import { formatPrice, calcM2Price, calcKartonsNeeded } from '@/lib/utils'
import { useCart, useWishlist } from '@/lib/store'
import ProductCard from '@/components/shop/ProductCard'
import { notFound } from 'next/navigation'

export default function ProduktSeite({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const [qty, setQty] = useState(1)
  const [m2, setM2] = useState(25)
  const [activeTab, setActiveTab] = useState('beschreibung')
  const [added, setAdded] = useState(false)

  const kartons = calcKartonsNeeded(m2)
  const totalPrice = product.price * kartons

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const tabs = [
    { id: 'beschreibung', label: 'Beschreibung' },
    { id: 'daten', label: 'Technische Daten' },
    { id: 'bewertungen', label: 'Bewertungen (48)' },
    { id: 'verlegung', label: 'Verlegeanleitung' },
  ]

  return (
    <div className="max-w-[1400px] mx-auto px-10 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--muted)' }}>
        <a href="/" className="hover:text-[var(--red)] transition-colors">Startseite</a>
        <span>›</span>
        <a href="/produkte" className="hover:text-[var(--red)] transition-colors">Designboden</a>
        <span>›</span>
        <span style={{ color: 'var(--dark)' }}>{product.name}</span>
      </div>

      <div className="grid gap-10 mb-12" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* LEFT — Images */}
        <div>
          <div className="rounded-xl overflow-hidden relative" style={{ height: '420px' }}>
            {product.image ? (
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="600px" />
            ) : (
              <div className="w-full h-full" style={{ background: 'linear-gradient(135deg,#d4b896,#8b6530)' }} />
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-3">
            {[product.image, product.image, product.image].filter(Boolean).map((img, i) => (
              <div key={i} className="w-20 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors hover:border-[var(--red)]" style={{ borderColor: i === 0 ? 'var(--red)' : 'var(--border)' }}>
                <Image src={img!} alt="" width={80} height={64} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Info */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--red)' }}>
            Enia · {product.kollektion}
          </div>
          <h1 className="text-[28px] font-black leading-tight mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-sm">★★★★★</span>
            <span className="text-sm font-semibold">4,9</span>
            <span className="text-sm" style={{ color: 'var(--muted)' }}>(48 Bewertungen)</span>
            <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold" style={{ background: product.availability === 'InStock' ? '#f0fdf4' : '#fef2f2', color: product.availability === 'InStock' ? 'var(--green)' : 'var(--red)' }}>
              {product.availability === 'InStock' ? '✓ Auf Lager' : 'Nicht verfügbar'}
            </span>
          </div>

          {/* PRICE */}
          <div className="mb-5 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="text-[32px] font-black">{formatPrice(product.price)}</div>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>pro Karton (2,28 m²)</div>
            <div className="text-sm font-semibold mt-0.5" style={{ color: 'var(--green)' }}>= {calcM2Price(product.price)}/m²</div>
          </div>

          {/* ROOM CALCULATOR */}
          <div className="mb-5 p-4 rounded-xl border-2" style={{ borderColor: 'var(--red)', background: 'var(--red-lt)' }}>
            <div className="text-sm font-black mb-2.5" style={{ color: 'var(--red)' }}>📐 Raumrechner</div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm">Meine Raumgröße:</span>
              <input
                type="number" value={m2} onChange={e => setM2(+e.target.value)} min={1} max={500}
                className="w-20 px-3 py-1.5 rounded-lg text-sm text-center font-bold border-2 outline-none"
                style={{ borderColor: 'var(--red)' }}
              />
              <span className="text-sm">m²</span>
            </div>
            <div className="text-sm">
              → Du brauchst: <strong>{kartons} Kartons</strong> (inkl. 10% Verschnitt)
            </div>
            <div className="text-sm mt-0.5">
              → Gesamtkosten: <strong>{formatPrice(totalPrice)}</strong>
            </div>
          </div>

          {/* QTY + CART */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 border-2 rounded-lg overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-4 py-2.5 font-bold text-lg hover:bg-gray-50 border-none cursor-pointer bg-white">−</button>
              <span className="w-10 text-center font-bold text-sm">{qty}</span>
              <button onClick={() => setQty(q => q+1)} className="px-4 py-2.5 font-bold text-lg hover:bg-gray-50 border-none cursor-pointer bg-white">+</button>
            </div>
            <button onClick={handleAdd} className="flex-1 py-3.5 rounded-xl font-bold text-base text-white transition-all hover:-translate-y-0.5 border-none cursor-pointer"
              style={{ background: added ? 'var(--green)' : 'var(--red)' }}>
              {added ? '✓ Hinzugefügt!' : '+ In den Warenkorb'}
            </button>
            <button onClick={() => toggle(product)} className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl transition-colors hover:border-[var(--red)] cursor-pointer bg-white" style={{ borderColor: has(product.id) ? 'var(--red)' : 'var(--border)' }}>
              {has(product.id) ? '❤️' : '♡'}
            </button>
          </div>

          <button className="w-full py-3 rounded-xl font-bold text-sm border-2 hover:bg-red-50 transition-colors cursor-pointer bg-white" style={{ color: 'var(--red)', borderColor: '#fca5a5' }}>
            🎁 Gratis Muster bestellen
          </button>

          {/* Trust */}
          <div className="flex gap-3 mt-4 text-[11.5px]" style={{ color: 'var(--muted)' }}>
            <span>🚚 2–5 Werktage</span>
            <span>↩ 60 Tage Rückgabe</span>
            <span>💳 PayPal · Klarna</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-10">
        <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="px-6 py-3 text-sm font-semibold border-b-2 transition-colors cursor-pointer bg-white border-none" style={{ borderBottomColor: activeTab === tab.id ? 'var(--red)' : 'transparent', color: activeTab === tab.id ? 'var(--red)' : 'var(--muted)' }}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="pt-5">
          {activeTab === 'daten' && (
            <table className="w-full text-sm border-collapse">
              <tbody>
                {[
                  ['SKU', product.sku],
                  ['Kategorie', product.category],
                  ['Kollektion', product.kollektion],
                  ['Maße', product.groesse],
                  ['Nutzschicht', product.nutzschicht],
                  ['Farbe', product.farbe],
                  ['Einsatzbereich', product.einsatzbereich],
                  ['Inhalt pro Karton', '2,28 m²'],
                  ['Verlegeart', 'Klick-System'],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b" style={{ borderColor: 'var(--border)' }}>
                    <td className="py-2.5 pr-6 font-semibold w-48" style={{ color: 'var(--muted)' }}>{k}</td>
                    <td className="py-2.5">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'beschreibung' && (
            <div className="prose max-w-none text-sm leading-relaxed" style={{ color: 'var(--dark2)' }}>
              <p>{product.name} ist ein hochwertiger Designboden aus der {product.kollektion}-Kollektion von Enia. Mit einer Nutzschicht von {product.nutzschicht} bietet dieser Boden maximale Strapazierfähigkeit für Wohn- und Gewerbebereiche.</p>
              <p className="mt-3">Die natürliche Holzoptik in {product.farbe}-Tönen verleiht jedem Raum eine warme, einladende Atmosphäre. Das innovative Klick-System ermöglicht eine schnelle und einfache Verlegung ohne Kleber.</p>
            </div>
          )}
          {activeTab === 'bewertungen' && (
            <div className="space-y-4">
              {[
                { name: 'Thomas M.', stars: 5, text: 'Sehr schöner Boden, einfach zu verlegen. Qualität top!', date: '15.03.2026' },
                { name: 'Sandra K.', stars: 5, text: 'Bin sehr zufrieden. Passt perfekt ins Wohnzimmer.', date: '02.03.2026' },
              ].map((r, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: 'var(--red)' }}>{r.name[0]}</div>
                    <div>
                      <div className="text-sm font-bold">{r.name}</div>
                      <div className="text-[11px]" style={{ color: 'var(--muted)' }}>{r.date} · Verified Buyer ✓</div>
                    </div>
                    <div className="ml-auto text-sm text-yellow-400">{'★'.repeat(r.stars)}</div>
                  </div>
                  <p className="text-sm">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div>
          <h2 className="text-[22px] font-black mb-5">Ähnliche Produkte</h2>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
