export default function ExpertSection() {
  return (
    <section className="grid items-center gap-12 px-10 py-10" style={{ gridTemplateColumns: '260px 1fr', background: 'var(--dark)' }}>
      <div className="text-center">
        <div className="w-44 h-44 rounded-full mx-auto flex items-center justify-center text-6xl border-4" style={{ background: 'linear-gradient(135deg,#8b6530,#d4b896)', borderColor: 'var(--red)' }}>
          🏗️
        </div>
        <div className="text-xs mt-3 font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Timo Brandt<br />Inhaber & Bodenexperte
        </div>
        <button className="mt-3 flex items-center gap-2 mx-auto px-5 py-2.5 rounded-lg font-bold text-[13px] text-white transition-all hover:-translate-y-0.5 border-none cursor-pointer" style={{ background: 'var(--red)' }}>
          📞 Jetzt beraten lassen
        </button>
      </div>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[1.5px] mb-2" style={{ color: 'var(--red)' }}>Warum bei uns kaufen?</div>
        <h2 className="text-[28px] font-black text-white mb-3 leading-[1.2]">
          Vom Hamburger<br />Fachmann — nicht vom<br />anonymen Lager
        </h2>
        <p className="text-[14.5px] leading-[1.7] mb-5" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Als zertifizierter Enia-Fachhändler verkaufen wir dir nur das, was wir selbst verlegen würden.
          Du hast eine Frage beim Verlegen? Ruf an — wir helfen dir, bis der Boden perfekt sitzt.
          Kein Callcenter, keine Warteschleife. Direkt der Experte.
        </p>
        <div className="flex gap-8">
          {[
            { num: '277', label: 'Enia-Produkte' },
            { num: '10+', label: 'Jahre Erfahrung' },
            { num: '4,9★', label: 'Kundenbewertung' },
            { num: '24h', label: 'Lieferung' },
          ].map(s => (
            <div key={s.num} className="text-center">
              <div className="text-[28px] font-black" style={{ color: 'var(--red)' }}>{s.num}</div>
              <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
