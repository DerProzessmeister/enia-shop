export default function DualBanners() {
  return (
    <div className="grid gap-5 px-10 py-12" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className="flex items-center gap-5 rounded-[14px] p-8 border" style={{ background: 'linear-gradient(120deg,#fff1f2,#ffe4e6)', borderColor: '#fecaca' }}>
        <span className="text-[42px] flex-shrink-0">📐</span>
        <div className="flex-1">
          <h3 className="text-[17px] font-black mb-1">Kostenloser Raumrechner</h3>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>Raumgröße eingeben — wir berechnen genau wieviel Kartons du brauchst, inklusive Verschnitt.</p>
        </div>
        <button className="flex-shrink-0 px-5 py-3 rounded-lg text-[13px] font-bold text-white hover:opacity-90 transition-all hover:-translate-y-0.5 border-none cursor-pointer" style={{ background: 'var(--red)' }}>
          Jetzt berechnen
        </button>
      </div>
      <div className="flex items-center gap-5 rounded-[14px] p-8 border" style={{ background: 'linear-gradient(120deg,#fffbeb,#fef3c7)', borderColor: '#fde68a' }}>
        <span className="text-[42px] flex-shrink-0">🎁</span>
        <div className="flex-1">
          <h3 className="text-[17px] font-black mb-1">Gratis Muster bestellen</h3>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--muted)' }}>Bis zu 5 Bodenproben kostenlos nach Hause — damit du in Ruhe entscheiden kannst.</p>
        </div>
        <button className="flex-shrink-0 px-5 py-3 rounded-lg text-[13px] font-bold text-white hover:opacity-90 transition-all hover:-translate-y-0.5 border-none cursor-pointer" style={{ background: '#d97706' }}>
          Muster bestellen
        </button>
      </div>
    </div>
  )
}
