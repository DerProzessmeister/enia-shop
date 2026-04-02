const badges = [
  {
    icon: '🛡️',
    title: 'Käuferschutz 4,9★',
    sub: 'Trusted Shops zertifiziert',
  },
  {
    icon: '🎁',
    title: 'Gratis Muster',
    sub: 'Bis zu 5 Muster kostenlos',
  },
  {
    icon: '🚚',
    title: 'Lieferung in 24h',
    sub: 'Bestell bis 14 Uhr → heute',
  },
  {
    icon: '↩',
    title: '60 Tage Rückgabe',
    sub: 'Kein Risiko, volle Flexibilität',
  },
]

export default function TrustBadges() {
  return (
    <section style={{
      background: 'var(--white)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderLeft: '1px solid var(--border)',
      }}
      className="trust-grid"
      >
        {badges.map((b) => (
          <div key={b.title} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 28px',
            borderRight: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: '32px', flexShrink: 0 }}>{b.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--primary)', lineHeight: 1.3 }}>
                {b.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                {b.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .trust-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
