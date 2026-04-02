'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

const FEATURED_PRODUCT = {
  slug: 'enia-nantes-oak-dark',
  name: 'NANTES Oak Dark',
  kollektion: 'Nantes',
  price: 92.43,
  image: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2024/11/80c9a7_2b1ea8cf236b41b786f1883d37a9ca4dmv2.jpg.webp',
}

const CATEGORIES = [
  { name: 'Vinylboden', count: 142, color: 'linear-gradient(135deg,#d4b896,#8b6530)', slug: 'vinyl' },
  { name: 'Laminat', count: 58, color: 'linear-gradient(135deg,#a07840,#d4b896)', slug: 'laminat' },
  { name: 'Betonoptik', count: 38, color: 'linear-gradient(135deg,#607d8b,#cfd8dc)', slug: 'beton' },
  { name: 'Steinoptik', count: 24, color: 'linear-gradient(135deg,#795548,#efebe9)', slug: 'stein' },
  { name: 'Parkett', count: 19, color: 'linear-gradient(135deg,#5d4037,#8d6e63)', slug: 'parkett' },
  { name: 'Bioboden', count: 16, color: 'linear-gradient(135deg,#388e3c,#c8e6c9)', slug: 'bio' },
]

function CountdownTimer({ initial }: { initial: string }) {
  const [time, setTime] = useState(initial)
  useEffect(() => {
    const id = setInterval(() => {
      setTime(t => {
        const [h, m, s] = t.split(':').map(Number)
        let ns = s - 1, nm = m, nh = h
        if (ns < 0) { ns = 59; nm-- }
        if (nm < 0) { nm = 59; nh-- }
        if (nh < 0) { nh = 4; nm = 59; ns = 59 }
        return `${String(nh).padStart(2,'0')}:${String(nm).padStart(2,'0')}:${String(ns).padStart(2,'0')}`
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="text-xl font-black" style={{ color: '#92400e', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
}

export default function HeroSection() {
  const { addItem } = useCart()
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section className="grid" style={{ gridTemplateColumns: '1fr 380px', height: '510px' }}>
      {/* LEFT — Main hero */}
      <div className="relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        {/* Room scene */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-[40%]" style={{ background: 'linear-gradient(180deg,#f5f0ea,#ede5d8)' }} />
          <div className="absolute bottom-0 left-[-8%] right-[-8%] h-[64%] overflow-hidden">
            <div className="w-full h-full" style={{
              background: `
                repeating-linear-gradient(90deg, transparent 0, transparent 181px, rgba(255,255,255,0.06) 181px, rgba(255,255,255,0.06) 183px),
                repeating-linear-gradient(0deg, transparent 0, transparent 47px, rgba(0,0,0,0.07) 47px, rgba(0,0,0,0.07) 49px),
                linear-gradient(180deg, #d4b896 0%, #c49a72 25%, #a07840 60%, #8b6530 100%)
              `,
              transform: 'perspective(600px) rotateX(46deg)',
              transformOrigin: 'bottom',
            }} />
          </div>
        </div>
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(14,5,5,0.84) 0%, rgba(14,5,5,0.52) 55%, rgba(14,5,5,0.08) 100%)' }} />

        {/* Content */}
        <div className="absolute left-[52px] text-white z-10 max-w-[520px]" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3.5 animate-fadeup" style={{ background: 'rgba(183,6,6,0.22)', border: '1px solid rgba(252,165,165,0.4)', color: '#fca5a5' }}>
            🏅 Zertifizierter Fachhandel seit 2015
          </div>

          <h1 className="text-[48px] font-black leading-[1.12] mb-3 animate-fadeup [animation-delay:0.1s]" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.55)' }}>
            277 Premium-Böden<br />
            direkt vom{' '}
            <em className="not-italic" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#fcd34d' }}>
              Experten
            </em>
          </h1>

          {/* Triple Trust like farbenbote */}
          <div className="flex gap-3 mb-3.5 animate-fadeup [animation-delay:0.2s]">
            {[
              { label: '4,9 Google', icon: '⭐' },
              { label: '4,85 Trusted Shops', icon: '🏅' },
              { label: '4,9 Trustpilot', icon: '★' },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px]" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
                <span style={{ color: '#fbbf24' }}>{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>

          <p className="text-[15.5px] leading-[1.65] mb-7 animate-fadeup [animation-delay:0.2s]" style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 300 }}>
            Hamburger Fachhandel für Enia-Designböden.<br />Gratis Muster, 24h-Versand, 60 Tage Rückgabe.
          </p>

          <div className="flex gap-2.5 animate-fadeup [animation-delay:0.3s]">
            <Link href="/produkte" className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-[15px] text-white transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ background: 'var(--red)', boxShadow: '0 4px 20px rgba(183,6,6,0.45)' }}>
              Shop entdecken →
            </Link>
            <button className="px-6 py-3 rounded-lg font-semibold text-[15px] text-white transition-colors hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.35)' }}>
              🎁 Gratis Muster
            </button>
          </div>
        </div>

        {/* Floating product chip */}
        <div className="absolute top-6 right-6 z-20 rounded-xl p-3.5 min-w-[210px] animate-[zoomIn_0.7s_0.3s_both]" style={{ background: 'rgba(255,255,255,0.97)', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
          <span className="inline-block bg-[var(--red)] text-white text-[9px] font-black px-2 py-0.5 rounded mb-1.5">Nr. 1 BESTSELLER</span>
          <div className="text-[10px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--muted)' }}>Kollektion · Nantes</div>
          <div className="text-[14.5px] font-bold mb-0.5">{FEATURED_PRODUCT.name}</div>
          <div className="text-2xl font-black mb-0.5">{formatPrice(FEATURED_PRODUCT.price)}</div>
          <div className="text-[11px] mb-2.5" style={{ color: 'var(--muted)' }}>pro Karton (2,28 m²) · 40,54 €/m²</div>
          <button
            onClick={() => addItem({ id: 1, slug: FEATURED_PRODUCT.slug, name: FEATURED_PRODUCT.name, price: FEATURED_PRODUCT.price, image: FEATURED_PRODUCT.image, kollektion: 'DOUBLE N&N', sku: '32200 400', category: 'Designboden', groesse: '122,7 cm x 18,7 cm', nutzschicht: '0,55 mm', farbe: 'Schwarz', einsatzbereich: 'Innen', availability: 'InStock', url: '' })}
            className="block w-full py-2.5 rounded-lg text-center font-bold text-[12.5px] text-white transition-opacity hover:opacity-90 border-none cursor-pointer"
            style={{ background: 'var(--red)' }}
          >
            + In den Warenkorb
          </button>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-5 left-[52px] flex gap-1.5 z-10">
          {[0,1,2,3].map(i => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="rounded-full transition-all"
              style={{
                width: activeSlide === i ? '26px' : '7px',
                height: '7px',
                background: activeSlide === i ? 'var(--red)' : 'rgba(255,255,255,0.35)',
                borderRadius: activeSlide === i ? '4px' : '50%',
              }}
            />
          ))}
        </div>
      </div>

      {/* RIGHT — Category panel */}
      <div className="bg-white flex flex-col" style={{ borderLeft: '1px solid var(--border)' }}>
        <div className="px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-wider" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>
          Alle Kategorien
        </div>
        <div className="flex-1 overflow-hidden">
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/produkte?kat=${cat.slug}`} className="flex items-center gap-3 px-5 py-2.5 border-b cursor-pointer hover:bg-gray-50 transition-colors group" style={{ borderColor: 'var(--border)' }}>
              <div className="w-12 h-9 rounded-md flex-shrink-0" style={{ background: cat.color }} />
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold">{cat.name}</div>
                <div className="text-[11px]" style={{ color: 'var(--muted)' }}>{cat.count} Produkte</div>
              </div>
              <span className="text-gray-300 text-base transition-colors group-hover:text-[var(--red)]">›</span>
            </Link>
          ))}
        </div>

        {/* Flash Deal */}
        <div className="px-5 py-3.5" style={{ background: '#fff8ee', borderTop: '1px solid #fde68a' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black text-white px-2 py-0.5 rounded animate-pulse-slow" style={{ background: 'var(--gold)' }}>⚡ FLASH</span>
            <span className="text-xs font-semibold" style={{ color: '#92400e' }}>Endet in</span>
          </div>
          <div className="text-[13px] font-bold mb-2">NANTES Oak Dark − 15%</div>
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[21px] font-black" style={{ color: 'var(--gold)' }}>78,57 €</span>
            <CountdownTimer initial="04:23:17" />
          </div>
          <button className="w-full py-2 rounded-lg text-[12px] font-bold text-white transition-opacity hover:opacity-90 border-none cursor-pointer" style={{ background: 'var(--gold)' }}>
            Zum Angebot →
          </button>
        </div>
      </div>
    </section>
  )
}
