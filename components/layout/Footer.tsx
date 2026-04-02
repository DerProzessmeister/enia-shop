import Link from 'next/link'

const footerLinks = {
  'Produkte': [
    { label: 'Alle Kollektionen', href: '/produkte' },
    { label: 'Eicheoptik', href: '/produkte?farbe=eiche' },
    { label: 'Betonoptik', href: '/produkte?farbe=beton' },
    { label: 'Steinoptik', href: '/produkte?farbe=stein' },
    { label: 'Großformat XXL', href: '/produkte?format=xxl' },
    { label: 'Sale & Angebote', href: '/sale' },
  ],
  'Service': [
    { label: 'Gratis Muster', href: '/muster' },
    { label: 'Bodenberater', href: '/berater' },
    { label: 'Verlege-Ratgeber', href: '/ratgeber' },
    { label: 'Versandinfos', href: '/versand' },
    { label: 'Rückgabe & Umtausch', href: '/rueckgabe' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  'Informationen': [
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
    { label: 'Widerrufsrecht', href: '/widerruf' },
    { label: 'Cookie-Einstellungen', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary)', color: 'rgba(255,255,255,0.75)', marginTop: '60px' }}>
      {/* Top section */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '56px 24px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
      }}>
        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '36px', height: '36px',
              background: 'var(--accent)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: 900,
              color: 'var(--primary)', flexShrink: 0,
            }}>E</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '16px', color: 'white', lineHeight: 1.2 }}>
                Enia <span style={{ color: 'var(--accent)' }}>Bodenbelag</span>
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>
                Premium Designböden · Hamburg
              </div>
            </div>
          </div>
          <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: '20px' }}>
            Ihr Fachhandel für Enia-Designböden seit 2015. 277 Produkte, kostenlose Muster, schnelle Lieferung.
          </p>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
            📞 040 55 63 32 69
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
            ✉ info@bodenfachhandel-hamburg.de
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            📍 Bahrenfelder Chaussee 80, 22761 Hamburg
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 style={{ fontWeight: 700, fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
              {title}
            </h4>
            <ul style={{ listStyle: 'none' }}>
              {links.map(link => (
                <li key={link.href} style={{ marginBottom: '10px' }}>
                  <Link href={link.href} style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '13.5px',
                    transition: 'color 0.15s',
                  }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust badges row */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {[
            { icon: '🏅', text: 'Trusted Shops zertifiziert' },
            { icon: '🔒', text: 'SSL-verschlüsselt' },
            { icon: '↩', text: '60 Tage Rückgabe' },
            { icon: '🚚', text: 'Gratis Versand ab 499€' },
            { icon: '⭐', text: '4,9 / 5 Sterne' },
          ].map(({ icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ fontSize: '16px' }}>{icon}</span>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontSize: '12px',
        color: 'rgba(255,255,255,0.35)',
      }}>
        <div>© 2026 Bodenfachhandel Hamburg · Alle Rechte vorbehalten</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['PayPal', 'Klarna', 'Visa', 'Mastercard', 'SEPA', 'Vorkasse'].map(m => (
            <span key={m} style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
            }}>{m}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
