'use client'
export default function Ticker() {
  const items = [
    '🚚 Gratis Versand ab 499 €',
    '🎁 Gratis Muster bis zu 5 Stück',
    '↩ 60 Tage Rückgabe',
    '⭐ 4,9 / 5 bei über 1.200 Bewertungen',
    '📞 040 55 63 32 69  Mo–Fr 8–18 Uhr',
    '💳 PayPal · Klarna · Visa · SEPA',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-2 border-b-2" style={{ background: 'var(--dark)', borderColor: 'var(--red)' }}>
      <div className="flex whitespace-nowrap animate-ticker">
        {doubled.map((item, i) => (
          <span key={i} className="px-10 text-xs text-white/80" style={{ fontSize: '12.5px' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
