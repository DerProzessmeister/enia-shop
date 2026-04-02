'use client'
export default function UrgencyBar() {
  return (
    <div
      style={{
        background: 'var(--accent)',
        color: 'var(--primary)',
        textAlign: 'center',
        padding: '10px 16px',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.01em',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      🚀 Bestell bis 14 Uhr → <strong>Versand heute!</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
      🎁 Gratis Muster bis zu 5 Stück&nbsp;&nbsp;|&nbsp;&nbsp;
      ↩ 60 Tage Rückgabe&nbsp;&nbsp;|&nbsp;&nbsp;
      ⭐ 4,9 / 5 · über 1.200 Bewertungen
    </div>
  )
}
