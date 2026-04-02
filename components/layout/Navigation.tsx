'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/produkte', label: 'Alle Kollektionen' },
  { href: '/produkte?raum=wohnzimmer', label: 'Nach Raum' },
  { href: '/muster', label: 'Muster bestellen' },
  { href: '/berater', label: 'Berater' },
  { href: '/sale', label: '🔥 Sale', highlight: true },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav style={{
      background: 'var(--white)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: '113px',
      zIndex: 80,
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        overflowX: 'auto',
      }}
      className="no-scrollbar"
      >
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: '14px',
              fontWeight: link.highlight ? 700 : 600,
              padding: '14px 20px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              color: link.highlight
                ? '#dc2626'
                : pathname === link.href
                  ? 'var(--primary)'
                  : 'var(--text)',
              borderBottom: pathname === link.href ? '2px solid var(--primary)' : '2px solid transparent',
              transition: 'color 0.15s, border-color 0.15s',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ flex: 1 }} />
        <Link href="/ratgeber" style={{
          fontSize: '13px',
          color: 'var(--muted)',
          padding: '14px 12px',
          textDecoration: 'none',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
        }}>
          Ratgeber
        </Link>
        <Link href="/ueber-uns" style={{
          fontSize: '13px',
          color: 'var(--muted)',
          padding: '14px 12px',
          textDecoration: 'none',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
        }}>
          Über uns
        </Link>
      </div>
    </nav>
  )
}
