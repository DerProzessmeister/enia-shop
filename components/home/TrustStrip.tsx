const items = [
  { icon: '🏪', title: 'Hamburger Fachhandel', desc: 'Persönliche Beratung, kein anonymes Call-Center. Echte Bodenexperten.' },
  { icon: '🔬', title: 'Geprüfte Qualität', desc: 'Nur Ware erster Wahl. Kein B-Sortiment. Enia-Partnerbetrieb.' },
  { icon: '📦', title: 'Gratis Einlagerung', desc: 'Heute kaufen, zum Wunschtermin liefern. Bis 6 Monate kostenlos.' },
  { icon: '💬', title: 'WhatsApp & Chat', desc: 'Mo–Fr 8–18 Uhr direkt erreichbar. Auch nach dem Kauf.' },
]

export default function TrustStrip() {
  return (
    <div className="grid gap-6.5 px-10 py-8" style={{ gridTemplateColumns: 'repeat(4,1fr)', background: 'var(--dark)' }}>
      {items.map(item => (
        <div key={item.title} className="flex items-start gap-3.5">
          <span className="text-[26px] flex-shrink-0 mt-0.5">{item.icon}</span>
          <div>
            <div className="text-[14px] font-bold text-white mb-1">{item.title}</div>
            <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
