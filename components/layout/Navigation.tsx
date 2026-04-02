'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Startseite' },
  { href: '/produkte?kat=vinyl', label: 'Vinylboden' },
  { href: '/produkte?kat=designboden', label: 'Designboden' },
  { href: '/produkte?kat=laminat', label: 'Laminat' },
  { href: '/produkte?kat=parkett', label: 'Parkett' },
  { href: '/produkte?kat=beton', label: 'Betonoptik' },
  { href: '/produkte?kat=stein', label: 'Steinoptik', isNew: true },
  { href: '/produkte?kat=zubehoer', label: 'Zubehör' },
  { href: '/ratgeber', label: 'Ratgeber' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav style={{ background: 'var(--red)' }}>
      <div className="flex items-center px-10">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="relative text-[13.5px] font-medium px-4 py-3 whitespace-nowrap transition-colors border-b-[3px] border-transparent hover:text-white hover:bg-white/10"
            style={{
              color: pathname === link.href ? 'white' : 'rgba(255,255,255,0.82)',
              borderBottomColor: pathname === link.href ? 'white' : 'transparent',
            }}
          >
            {link.label}
            {link.isNew && (
              <span className="absolute top-1.5 right-0.5 bg-yellow-400 text-black text-[8px] font-black px-1 rounded">NEU</span>
            )}
          </Link>
        ))}
        <div className="flex-1" />
        <div className="flex items-center border-l border-white/20 pl-4">
          <Link href="/ueber-uns" className="text-white/65 text-xs px-2.5 py-3 hover:text-white transition-colors">Über uns</Link>
          <Link href="/filialen" className="text-white/65 text-xs px-2.5 py-3 hover:text-white transition-colors">Filialen</Link>
        </div>
        <Link
          href="/sale"
          className="text-[13.5px] font-black px-4 py-3 whitespace-nowrap"
          style={{ color: '#fef08a' }}
        >
          🔥 Sale −53%
        </Link>
      </div>
    </nav>
  )
}
