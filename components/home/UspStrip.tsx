const items = [
  { icon: '🎁', title: 'Gratis Muster', sub: 'Bis zu 5 kostenlos' },
  { icon: '🚚', title: '24h Express', sub: 'Bis 14 Uhr = morgen da' },
  { icon: '↩️', title: '60 Tage Rückgabe', sub: 'Kostenlos & einfach' },
  { icon: '💳', title: 'PayPal · Klarna · Visa', sub: 'Auch Rechnung' },
  { icon: '⭐', title: '4,9 / 5 Sterne', sub: '1.200+ Bewertungen' },
]

export default function UspStrip() {
  return (
    <div className="flex px-10" style={{ background: 'var(--red)' }}>
      {items.map((item, i) => (
        <div key={i} className="flex-1 flex items-center gap-3 py-4" style={{ borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.18)' : 'none', paddingRight: i < items.length - 1 ? '24px' : 0, marginRight: i < items.length - 1 ? '24px' : 0 }}>
          <span className="text-xl flex-shrink-0">{item.icon}</span>
          <div>
            <div className="text-[13px] font-bold text-white">{item.title}</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.62)' }}>{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
