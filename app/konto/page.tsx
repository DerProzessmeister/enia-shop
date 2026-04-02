'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useWishlist } from '@/lib/store'
import ProductCard from '@/components/shop/ProductCard'
import { formatPrice, calcKartonsNeeded } from '@/lib/utils'
import { getAllProducts } from '@/lib/products'
import Link from 'next/link'

const TABS = [
  { id: 'dashboard', icon: '🏠', label: 'Übersicht' },
  { id: 'bestellungen', icon: '📦', label: 'Bestellungen' },
  { id: 'wunschliste', icon: '❤', label: 'Wunschliste' },
  { id: 'raumrechner', icon: '📐', label: 'Raumrechner' },
  { id: 'muster', icon: '🎁', label: 'Muster' },
  { id: 'adressen', icon: '📍', label: 'Adressen' },
  { id: 'tickets', icon: '🎫', label: 'Support' },
  { id: 'einstellungen', icon: '⚙️', label: 'Einstellungen' },
]

const MOCK_ORDERS = [
  { id: '#BFH-104523', date: '12.03.2026', items: 'NANTES Oak Dark × 3 Karton', total: 277.29, status: 'Geliefert', statusColor: 'var(--green)', tracking: 'DHL1234567890' },
  { id: '#BFH-097812', date: '01.02.2026', items: 'TENSA Oak Nature × 2 Karton', total: 179.98, status: 'Abgeschlossen', statusColor: 'var(--muted)' },
  { id: '#BFH-089234', date: '15.01.2026', items: 'MONACO Concrete × 5 Karton', total: 725.00, status: 'Abgeschlossen', statusColor: 'var(--muted)' },
]

export default function KontoPage() {
  const [tab, setTab] = useState('dashboard')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const [error, setError] = useState('')
  const [m2, setM2] = useState(30)
  const [ticketForm, setTicketForm] = useState({ subject: '', category: 'bestellung', message: '' })
  const { items: wishItems } = useWishlist()
  const router = useRouter()
  const allProducts = getAllProducts()

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => {
      setUser(d.user)
      setLoading(false)
    })
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const body = isLogin ? { email: form.email, password: form.password } : form
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      const me = await fetch('/api/auth/me').then(r => r.json())
      setUser(me.user)
    } catch { setError('Fehler beim Anmelden') }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }

  const kartons = calcKartonsNeeded(m2)

  if (loading) return <div className="text-center py-20">Lädt...</div>

  // NOT LOGGED IN — Login/Register Form
  if (!user) return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4" style={{ background: 'var(--surface)' }}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">🏪</div>
          <h1 className="text-2xl font-black">Mein Konto</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            {isLogin ? 'Mit deinem Konto anmelden' : 'Neues Konto erstellen'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold mb-1.5">Vor- und Nachname</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Thomas Müller" className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors" style={{ borderColor: 'var(--border)' }} />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold mb-1.5">E-Mail-Adresse</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="ihre@email.de" className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors" style={{ borderColor: 'var(--border)' }} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Passwort</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••" className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors" style={{ borderColor: 'var(--border)' }} />
          </div>
          {error && <div className="text-sm font-medium px-3 py-2 rounded-lg" style={{ background: 'var(--red-lt)', color: 'var(--red)' }}>{error}</div>}
          <button type="submit" className="w-full py-3.5 rounded-xl font-black text-base text-white transition-all hover:-translate-y-0.5 border-none cursor-pointer" style={{ background: 'var(--red)' }}>
            {isLogin ? 'Anmelden' : 'Konto erstellen'}
          </button>
        </form>

        <div className="text-center mt-5 text-sm" style={{ color: 'var(--muted)' }}>
          {isLogin ? 'Noch kein Konto?' : 'Bereits registriert?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="font-bold border-none bg-transparent cursor-pointer" style={{ color: 'var(--red)' }}>
            {isLogin ? 'Jetzt registrieren' : 'Anmelden'}
          </button>
        </div>

        {/* Guest option */}
        <div className="mt-5 pt-5 border-t text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          Oder <Link href="/checkout" className="font-bold" style={{ color: 'var(--red)' }}>als Gast bestellen →</Link>
        </div>
      </div>
    </div>
  )

  // LOGGED IN — Dashboard
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--surface)' }}>
      {/* SIDEBAR */}
      <aside className="w-[240px] flex-shrink-0 bg-white border-r sticky top-[130px] h-fit" style={{ borderColor: 'var(--border)' }}>
        {/* User Info */}
        <div className="p-5 border-b text-center" style={{ borderColor: 'var(--border)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white mx-auto mb-3" style={{ background: 'var(--red)' }}>
            {user.name?.[0] || user.email[0].toUpperCase()}
          </div>
          <div className="font-black text-sm">{user.name || 'Mein Konto'}</div>
          <div className="text-[11px] mt-0.5" style={{ color: 'var(--muted)' }}>{user.email}</div>
          {/* Loyalty */}
          <div className="mt-3 px-3 py-1.5 rounded-lg text-[11px] font-bold" style={{ background: 'var(--red-lt)', color: 'var(--red)' }}>
            ⭐ {user.loyaltyPoints || 0} Boden-Punkte
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-0.5">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm flex items-center gap-3 transition-all cursor-pointer border-none" style={tab === t.id ? { background: 'var(--red-lt)', color: 'var(--red)', fontWeight: 700 } : { background: 'transparent', color: 'var(--dark)' }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
          <button onClick={handleLogout} className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm flex items-center gap-3 transition-all cursor-pointer border-none mt-2" style={{ color: 'var(--muted)', background: 'transparent' }}>
            <span>🚪</span>Abmelden
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 max-w-[1000px]">
        
        {/* DASHBOARD OVERVIEW */}
        {tab === 'dashboard' && (
          <div>
            <h1 className="text-2xl font-black mb-2">Guten Morgen, {user.name?.split(' ')[0] || 'Kunde'}! 👋</h1>
            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Willkommen in deinem Kundenkonto</p>
            
            {/* Stats */}
            <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {[
                { label: 'Bestellungen', value: '3', icon: '📦', color: 'var(--red-lt)' },
                { label: 'Wunschliste', value: String(wishItems.length), icon: '❤', color: '#fff1f2' },
                { label: 'Boden-Punkte', value: String(user.loyaltyPoints || 0), icon: '⭐', color: '#fffbeb' },
                { label: 'Muster', value: '5/5', icon: '🎁', color: '#f0fdf4' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-4 border" style={{ background: s.color, borderColor: 'var(--border)' }}>
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Last Order */}
            <div className="bg-white rounded-xl border p-5 mb-5" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-black text-sm mb-3">Letzte Bestellung</h3>
              {MOCK_ORDERS[0] && (
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm">{MOCK_ORDERS[0].id}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{MOCK_ORDERS[0].date} · {MOCK_ORDERS[0].items}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black">{formatPrice(MOCK_ORDERS[0].total)}</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: MOCK_ORDERS[0].statusColor }}>✓ {MOCK_ORDERS[0].status}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Loyalty Progress */}
            <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold">⭐ Boden-Punkte</span>
                <span className="text-sm font-black" style={{ color: 'var(--red)' }}>{user.loyaltyPoints || 0} Punkte</span>
              </div>
              <div className="h-2 rounded-full mb-2" style={{ background: 'var(--border)' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(((user.loyaltyPoints || 0) / 500) * 100, 100)}%`, background: 'var(--red)' }} />
              </div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>
                {Math.max(0, 500 - (user.loyaltyPoints || 0))} Punkte bis zur ersten Einlösung · 100 Punkte = 1 € Rabatt
              </div>
            </div>
          </div>
        )}

        {/* BESTELLUNGEN */}
        {tab === 'bestellungen' && (
          <div>
            <h2 className="text-xl font-black mb-5">Meine Bestellungen</h2>
            <div className="space-y-3">
              {MOCK_ORDERS.map(order => (
                <div key={order.id} className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-black">{order.id}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{order.date}</div>
                      <div className="text-sm mt-1">{order.items}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-lg">{formatPrice(order.total)}</div>
                      <div className="text-xs font-bold mt-0.5" style={{ color: order.statusColor }}>✓ {order.status}</div>
                    </div>
                  </div>
                  {order.tracking && (
                    <div className="text-xs mb-3 px-3 py-2 rounded-lg font-semibold" style={{ background: '#f0fdf4', color: 'var(--green)' }}>
                      🚚 DHL Tracking: {order.tracking}
                    </div>
                  )}
                  {/* Status Timeline */}
                  <div className="flex items-center gap-0 mb-3">
                    {['Bestellt', 'Bezahlt', 'Versendet', 'Geliefert'].map((s, i) => (
                      <div key={s} className="flex items-center flex-1">
                        <div className="flex-1 h-1 rounded-full" style={{ background: i < 4 ? 'var(--green)' : 'var(--border)' }} />
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: 'var(--green)' }} />
                        {i === 3 && <div className="flex-1" />}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg text-xs font-bold text-white border-none cursor-pointer" style={{ background: 'var(--red)' }}>Nachbestellen</button>
                    <button className="px-4 py-2 rounded-lg text-xs font-bold border cursor-pointer bg-white" style={{ borderColor: 'var(--border)' }}>📄 Rechnung</button>
                    <button className="px-4 py-2 rounded-lg text-xs font-bold border cursor-pointer bg-white" style={{ borderColor: 'var(--border)' }}>↩ Rückgabe</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WUNSCHLISTE */}
        {tab === 'wunschliste' && (
          <div>
            <h2 className="text-xl font-black mb-5">Wunschliste ({wishItems.length})</h2>
            {wishItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl" style={{ color: 'var(--muted)' }}>
                <div className="text-5xl mb-3">❤️</div>
                <p className="font-medium">Deine Wunschliste ist leer</p>
                <Link href="/produkte" className="mt-4 inline-block px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: 'var(--red)' }}>Produkte entdecken →</Link>
              </div>
            ) : (
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {wishItems.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        )}

        {/* RAUMRECHNER */}
        {tab === 'raumrechner' && (
          <div>
            <h2 className="text-xl font-black mb-5">📐 Raumrechner</h2>
            <div className="bg-white rounded-xl border p-6 max-w-lg" style={{ borderColor: 'var(--border)' }}>
              <div className="mb-5">
                <label className="block text-sm font-bold mb-2">Raumgröße (m²)</label>
                <div className="flex items-center gap-3">
                  <input type="number" value={m2} onChange={e => setM2(+e.target.value)} min={1} max={500}
                    className="w-28 px-4 py-3 text-center font-black text-xl rounded-lg border-2 outline-none"
                    style={{ borderColor: 'var(--red)' }} />
                  <span className="text-lg font-bold">m²</span>
                </div>
                <input type="range" min={5} max={200} value={m2} onChange={e => setM2(+e.target.value)} className="w-full mt-3 accent-[var(--red)]" />
              </div>
              <div className="p-4 rounded-xl space-y-2" style={{ background: 'var(--red-lt)', border: '1px solid #fca5a5' }}>
                <div className="text-sm">→ Du brauchst: <strong className="text-base">{kartons} Kartons</strong></div>
                <div className="text-sm">→ Gesamtfläche: <strong>{(kartons * 2.28).toFixed(1)} m²</strong> (inkl. 10% Verschnitt)</div>
                <div className="text-sm">→ Karton-Inhalt: <strong>2,28 m² / Karton</strong></div>
              </div>
              <Link href={`/produkte?m2=${m2}`} className="mt-4 block w-full py-3 rounded-xl text-center font-bold text-white" style={{ background: 'var(--red)' }}>
                Passende Böden für {m2} m² anzeigen →
              </Link>
            </div>
          </div>
        )}

        {/* MUSTER */}
        {tab === 'muster' && (
          <div>
            <h2 className="text-xl font-black mb-5">🎁 Gratis Muster</h2>
            <div className="bg-white rounded-xl border p-6" style={{ borderColor: 'var(--border)' }}>
              <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: '#f0fdf4', color: 'var(--green)' }}>
                <div className="text-sm font-bold">✅ 5/5 Muster bereits bestellt</div>
                <div className="text-xs mt-0.5">Pro Haushalt sind max. 5 kostenlose Muster möglich</div>
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                Du hast dein Muster-Kontingent aufgebraucht. Weitere Böden findest du direkt im Shop.
              </p>
              <Link href="/produkte" className="inline-block px-6 py-2.5 rounded-lg font-bold text-sm text-white" style={{ background: 'var(--red)' }}>
                Zum Shop →
              </Link>
            </div>
          </div>
        )}

        {/* SUPPORT TICKET */}
        {tab === 'tickets' && (
          <div>
            <h2 className="text-xl font-black mb-5">🎫 Support & Hilfe</h2>
            <div className="bg-white rounded-xl border p-6 max-w-lg" style={{ borderColor: 'var(--border)' }}>
              <h3 className="font-bold mb-4 text-sm">Neues Ticket erstellen</h3>
              <form onSubmit={async e => {
                e.preventDefault()
                const res = await fetch('/api/tickets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...ticketForm, email: user.email, name: user.name }) })
                const data = await res.json()
                if (data.success) alert(`Ticket ${data.ticketId} erstellt! Wir melden uns innerhalb von 4 Stunden.`)
              }} className="space-y-3">
                <select value={ticketForm.category} onChange={e => setTicketForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none" style={{ borderColor: 'var(--border)' }}>
                  <option value="bestellung">Bestellung & Lieferung</option>
                  <option value="rueckgabe">Rückgabe & Umtausch</option>
                  <option value="produkt">Produktfragen</option>
                  <option value="reklamation">Reklamation</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
                <input value={ticketForm.subject} onChange={e => setTicketForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="Betreff" className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors" style={{ borderColor: 'var(--border)' }} />
                <textarea value={ticketForm.message} onChange={e => setTicketForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Wie können wir dir helfen?" rows={4}
                  className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors resize-none" style={{ borderColor: 'var(--border)' }} />
                <button type="submit" className="w-full py-3 rounded-lg font-bold text-sm text-white border-none cursor-pointer" style={{ background: 'var(--red)' }}>
                  Ticket absenden
                </button>
              </form>
              <div className="mt-4 pt-4 border-t text-xs" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
                📞 Oder direkt: <strong>040 55 63 32 69</strong> · Mo–Fr 8–18 Uhr
              </div>
            </div>
          </div>
        )}

        {/* EINSTELLUNGEN */}
        {tab === 'einstellungen' && (
          <div>
            <h2 className="text-xl font-black mb-5">⚙️ Kontoeinstellungen</h2>
            <div className="bg-white rounded-xl border p-6 max-w-lg space-y-4" style={{ borderColor: 'var(--border)' }}>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Name</label>
                <input defaultValue={user.name} className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)]" style={{ borderColor: 'var(--border)' }} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">E-Mail</label>
                <input defaultValue={user.email} className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)]" style={{ borderColor: 'var(--border)' }} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Neues Passwort</label>
                <input type="password" placeholder="••••••••" className="w-full border-[1.5px] rounded-lg px-4 py-3 text-sm outline-none focus:border-[var(--red)]" style={{ borderColor: 'var(--border)' }} />
              </div>
              <button className="w-full py-3 rounded-lg font-bold text-sm text-white border-none cursor-pointer" style={{ background: 'var(--red)' }}>
                Änderungen speichern
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
