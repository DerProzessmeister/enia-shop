'use client'

const bundles = [
  {
    save: '9% sparen',
    tag: 'Bundle · Wohnzimmer',
    name: 'Boden + Dämmung Komplett-Paket',
    desc: 'NANTES Oak Dark 10 Kartons + Trittschalldämmung 30m² + Sockelleisten-Set',
    newPrice: 956.30,
    oldPrice: 1051.50,
    colors: ['linear-gradient(135deg,#d4b896,#8b6530)', 'linear-gradient(135deg,#546e7a,#cfd8dc)'],
  },
  {
    save: '12% sparen',
    tag: 'Bundle · Büro/Gewerbe',
    name: 'Monaco Profi-Paket',
    desc: 'MONACO Concrete Grey 15 Kartons + Heavy-Duty Dämmung + Reinigungsset',
    newPrice: 1914.00,
    oldPrice: 2175.00,
    colors: ['linear-gradient(135deg,#607d8b,#b0bec5)', 'linear-gradient(135deg,#d4b896,#8b6530)'],
  },
  {
    save: '15% sparen',
    tag: 'Bundle · Haus Komplett',
    name: 'Premium Haus-Renovierung',
    desc: 'Sorex + Monaco je 10 Kartons + 2× Dämmung + Sockelleisten + Pflege-Set',
    newPrice: 2081.00,
    oldPrice: 2449.00,
    colors: ['linear-gradient(135deg,#a07840,#d4b896)', 'linear-gradient(135deg,#795548,#efebe9)'],
  },
]

export default function BundleSection() {
  return (
    <section className="px-10 py-12" style={{ background: 'var(--surface)' }}>
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="text-[23px] font-black">💡 Komplett-Pakete — Spare mehr als 10%</h2>
        <a href="#" className="text-[13.5px] font-bold" style={{ color: 'var(--red)' }}>Alle Pakete →</a>
      </div>
      <div className="grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {bundles.map((b, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden border-2 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl relative" style={{ borderColor: 'var(--border)' }}>
            <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[11px] font-black text-white" style={{ background: 'var(--green)' }}>{b.save}</span>
            <div className="flex h-[100px]">
              {b.colors.map((c, j) => <div key={j} className="flex-1" style={{ background: c }} />)}
            </div>
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--red)' }}>{b.tag}</div>
              <div className="text-[14.5px] font-bold mb-1.5">{b.name}</div>
              <div className="text-[12.5px] leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>{b.desc}</div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[22px] font-black">{b.newPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                <span className="text-sm line-through" style={{ color: 'var(--muted)' }}>{b.oldPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
              </div>
              <button className="w-full py-3 rounded-lg font-bold text-[13px] text-white transition-opacity hover:opacity-90 border-none cursor-pointer" style={{ background: 'var(--red)' }}>
                Paket in den Warenkorb →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
