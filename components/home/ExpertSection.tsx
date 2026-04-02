import Link from 'next/link'

export default function ExpertSection() {
  return (
    <section style={{
      background: 'var(--surface)',
      padding: '56px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
      }}
      className="expert-grid"
      >
        {/* LEFT — Expert intro */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#fef9c3',
            border: '1px solid #fde047',
            borderRadius: '50px',
            padding: '5px 14px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#713f12',
            marginBottom: '20px',
          }}>
            👨‍💼 Persönliche Beratung
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', marginBottom: '12px', lineHeight: 1.2 }}>
            Unser Bodenexperte<br />berät dich persönlich
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '24px' }}>
            Du weißt nicht welcher Boden zu deinem Raum passt? Kein Problem — unser Fachberater hilft dir, den perfekten Boden zu finden. Kostenlos, unverbindlich, auf Deutsch.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <Link href="/berater" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--primary)',
              color: 'white',
              textDecoration: 'none',
              padding: '0 24px',
              height: '50px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '14px',
            }}>
              💬 Kostenlos beraten lassen
            </Link>
            <a href="tel:04055633269" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              color: 'var(--primary)',
              textDecoration: 'none',
              padding: '0 20px',
              height: '50px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '14px',
              border: '2px solid var(--primary)',
            }}>
              📞 040 55 63 32 69
            </a>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { icon: '⏱', text: 'Mo–Fr 8–18 Uhr' },
              { icon: '🌐', text: 'Auch per WhatsApp' },
              { icon: '🎁', text: 'Muster auf Anfrage' },
            ].map(i => (
              <div key={i.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)' }}>
                <span>{i.icon}</span> {i.text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Process steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--primary)', marginBottom: '4px' }}>
            So einfach geht's:
          </h3>
          {[
            { step: '01', title: 'Kostenlose Muster anfragen', desc: 'Bis zu 5 Muster gratis — sieh und fühle den Boden vor dem Kauf.' },
            { step: '02', title: 'Persönliche Beratung', desc: 'Unser Experte empfiehlt den perfekten Boden für deinen Raum.' },
            { step: '03', title: 'Bequem bestellen', desc: 'Online bestellen, morgen geliefert. Montage-Hilfe inklusive.' },
          ].map(s => (
            <div key={s.step} style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
              background: 'white',
              borderRadius: '12px',
              padding: '16px 20px',
              border: '1px solid var(--border)',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'var(--accent)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '12px',
                color: 'var(--primary)',
                flexShrink: 0,
              }}>
                {s.step}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{s.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .expert-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}
