'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart, useWishlist } from '@/lib/store'

export default function Header() {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const { count, openCart } = useCart()
  const { items: wishItems } = useWishlist()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/produkte?search=${encodeURIComponent(query)}`)
  }

  return (
    <header className="bg-white sticky top-0 z-50" style={{ borderBottom: '2px solid var(--border)' }}>
      <div className="flex items-center gap-5 px-10 h-[72px]">
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0">
          <div className="font-bold text-xl leading-tight" style={{ color: 'var(--dark)' }}>
            Bodenfachhandel<span style={{ color: 'var(--red)' }}>.</span>Hamburg
          </div>
          <div className="text-[10.5px] tracking-wide mt-0.5" style={{ color: 'var(--muted)' }}>
            Ihr Fachhandel für Premium-Designböden
          </div>
        </Link>

        {/* SEARCH */}
        <form onSubmit={handleSearch} className="flex-1 max-w-[560px] flex rounded-lg overflow-hidden border-2 transition-colors focus-within:border-[var(--red)]" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Boden suchen — z.B. "NANTES Oak Dark" oder "Betonoptik"...'
            className="flex-1 border-none bg-transparent px-4 py-2.5 text-sm outline-none"
          />
          <select className="border-none border-l bg-transparent px-3 text-sm outline-none cursor-pointer" style={{ borderLeftColor: 'var(--border)', color: 'var(--muted)' }}>
            <option>Alle</option>
            <option>Vinyl</option>
            <option>Parkett</option>
            <option>Laminat</option>
          </select>
          <button type="submit" className="px-4 text-white text-base transition-colors hover:opacity-90" style={{ background: 'var(--red)' }}>
            🔍
          </button>
        </form>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-2.5">
          <div className="text-right border-r pr-3.5" style={{ borderColor: 'var(--border)' }}>
            <div className="text-[10px]" style={{ color: 'var(--muted)' }}>Kostenlose Beratung</div>
            <div className="font-bold text-sm">040 55 63 32 69</div>
          </div>

          <Link href="/konto/wunschliste" className="relative px-4 py-2 rounded-lg text-sm font-bold transition-colors" style={{ background: 'var(--surface)', color: 'var(--dark)' }}>
            ❤ Merkliste
            {wishItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center text-white" style={{ background: 'var(--red)' }}>
                {wishItems.length}
              </span>
            )}
          </Link>

          <Link href="/konto" className="px-4 py-2 rounded-lg text-sm font-bold transition-colors" style={{ background: 'var(--surface)', color: 'var(--dark)' }}>
            👤 Konto
          </Link>

          <button onClick={openCart} className="relative px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 text-white transition-opacity hover:opacity-90" style={{ background: 'var(--red)' }}>
            🛒 Warenkorb
            <span className="bg-white rounded-full w-[18px] h-[18px] text-[10px] font-black flex items-center justify-center" style={{ color: 'var(--red)' }}>
              {count()}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
