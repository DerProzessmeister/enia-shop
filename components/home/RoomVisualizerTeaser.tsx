import Link from 'next/link'
import Image from 'next/image'

export default function RoomVisualizerTeaser() {
  return (
    <section style={{
      background: 'var(--primary)',
      overflow: 'hidden',
      margin: '0',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '400px',
      }}
      className="room-grid"
      >
        {/* Left — image collage */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '360px' }}>
          <Image
            src="https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-screed-middle.jpg.webp"
            alt="Raumvisualisierung"
            fill
            style={{ objectFit: 'cover' }}
            sizes="50vw"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, transparent 50%, rgba(26,26,46,0.7) 100%)',
          }} />

          {/* Room sample cards */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {[
              { img: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-oak-nature.jpg.webp', label: 'Wohnzimmer' },
              { img: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-stone-light.jpg.webp', label: 'Küche' },
            ].map(r => (
              <div key={r.label} style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '10px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                minWidth: '160px',
              }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '6px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <Image src={r.img} alt={r.label} fill style={{ objectFit: 'cover' }} sizes="40px" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)' }}>{r.label}</div>
                  <div style={{ fontSize: '10.5px', color: 'var(--muted)' }}>Vorschau →</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — text */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '56px 48px 56px 64px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245,200,66,0.15)',
            border: '1px solid rgba(245,200,66,0.3)',
            borderRadius: '50px',
            padding: '5px 16px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--accent)',
            width: 'fit-content',
            marginBottom: '16px',
          }}>
            ✨ Neu: Raum-Visualisierer
          </div>

          <h2 style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}>
            Wie sieht der Boden<br />
            <span style={{ color: 'var(--accent)' }}>bei dir</span> aus?
          </h2>

          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            marginBottom: '28px',
          }}>
            Lade ein Foto deines Raumes hoch und sieh sofort, wie der neue Boden bei dir aussehen wird. Probiere verschiedene Farben und Formate aus — kostenlos.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/visualisierer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--accent)',
              color: 'var(--primary)',
              textDecoration: 'none',
              padding: '0 24px',
              height: '50px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '14px',
              boxShadow: '0 4px 20px rgba(245,200,66,0.3)',
            }}>
              📷 Raum visualisieren
            </Link>
            <Link href="/muster" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              textDecoration: 'none',
              padding: '0 20px',
              height: '50px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '14px',
              border: '1.5px solid rgba(255,255,255,0.2)',
            }}>
              🎁 Muster bestellen
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .room-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
