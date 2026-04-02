import Link from 'next/link'
import Image from 'next/image'

const HERO_PRODUCT = {
  name: 'LARIX oak nature',
  kollektion: 'DUPLEX XXL LARIX',
  price: 137.62,
  image: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-oak-nature.jpg.webp',
  slug: 'enia-larix-oak-nature',
}

export default function HeroSection() {
  return (
    <section style={{
      background: 'var(--primary)',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '520px',
      }}
      className="hero-grid"
      >
        {/* LEFT — text content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 56px 64px 40px',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245,200,66,0.15)',
            border: '1px solid rgba(245,200,66,0.3)',
            borderRadius: '50px',
            padding: '6px 16px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--accent)',
            width: 'fit-content',
            marginBottom: '20px',
          }}>
            🏅 Zertifizierter Enia-Fachhandel seit 2015
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Böden, die{' '}
            <span style={{ color: 'var(--accent)' }}>Räume</span>
            <br />verwandeln.
          </h1>

          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.7,
            marginBottom: '32px',
            maxWidth: '420px',
          }}>
            277 Enia-Designböden direkt vom Hamburger Fachhandel.
            Gratis Muster, 24h-Versand, 60 Tage Rückgabe — kein Risiko.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
            <Link href="/produkte" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--accent)',
              color: 'var(--primary)',
              textDecoration: 'none',
              padding: '0 28px',
              height: '52px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '15px',
              boxShadow: '0 6px 24px rgba(245,200,66,0.35)',
            }}>
              Jetzt entdecken →
            </Link>
            <Link href="/muster" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.08)',
              color: 'white',
              textDecoration: 'none',
              padding: '0 24px',
              height: '52px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '15px',
              border: '1.5px solid rgba(255,255,255,0.2)',
            }}>
              🎁 Gratis Muster
            </Link>
          </div>

          {/* Trust row */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { icon: '⭐', label: '4,9 · Google' },
              { icon: '🏅', label: '4,85 · Trusted Shops' },
              { icon: '🚚', label: 'Versand heute' },
            ].map(t => (
              <div key={t.label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12.5px',
                color: 'rgba(255,255,255,0.65)',
              }}>
                <span>{t.icon}</span> {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — product image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)',
        }}>
          {/* Main product image */}
          <div style={{
            position: 'absolute',
            inset: 0,
          }}>
            <Image
              src={HERO_PRODUCT.image}
              alt="Enia Premium Designboden"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(26,26,46,0.3) 0%, transparent 40%), linear-gradient(to top, rgba(26,26,46,0.5) 0%, transparent 50%)',
            }} />
          </div>

          {/* Product card overlay */}
          <div style={{
            position: 'absolute',
            bottom: '32px',
            right: '32px',
            background: 'white',
            borderRadius: '14px',
            padding: '16px 20px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            minWidth: '220px',
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}>
              🏆 Bestseller
            </div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '2px' }}>
              {HERO_PRODUCT.kollektion}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
              {HERO_PRODUCT.name}
            </div>
            <div style={{
              fontSize: '22px',
              fontWeight: 900,
              color: 'var(--primary)',
              marginBottom: '12px',
            }}>
              {HERO_PRODUCT.price.toFixed(2).replace('.', ',')} €
            </div>
            <Link href={`/produkte/${HERO_PRODUCT.slug}`} style={{
              display: 'block',
              background: 'var(--primary)',
              color: 'white',
              textDecoration: 'none',
              textAlign: 'center',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
            }}>
              Zum Produkt →
            </Link>
          </div>

          {/* Availability badge */}
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: '#dcfce7',
            color: '#166534',
            borderRadius: '50px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
            Auf Lager
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
