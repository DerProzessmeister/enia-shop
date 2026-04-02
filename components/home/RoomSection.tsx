'use client'
import Link from 'next/link'

const rooms = [
  { name: 'Wohnzimmer', count: 45, color: 'linear-gradient(145deg,#d4b896,#c49a72,#8b6530)', slug: 'wohnzimmer', big: true },
  { name: 'Küche', count: 38, color: 'linear-gradient(145deg,#546e7a,#90a4ae,#cfd8dc)', slug: 'kueche' },
  { name: 'Schlafzimmer', count: 52, color: 'linear-gradient(145deg,#a1887f,#d7ccc8,#efebe9)', slug: 'schlafzimmer' },
  { name: 'Büro & Gewerbe', count: 60, color: 'linear-gradient(145deg,#4caf50,#a5d6a7,#e8f5e9)', slug: 'buero' },
  { name: 'Bad & Feuchtraum', count: 28, color: 'linear-gradient(145deg,#5d4037,#8d6e63,#d7ccc8)', slug: 'bad' },
]

export default function RoomSection() {
  return (
    <section className="px-10 py-12" style={{ background: 'var(--surface)' }}>
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="text-[23px] font-black">🏠 Shop by Room</h2>
        <a href="#" className="text-[13.5px] font-bold" style={{ color: 'var(--red)' }}>Alle Räume →</a>
      </div>
      <div className="grid gap-3.5" style={{ gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '225px 225px' }}>
        {rooms.map((r, i) => (
          <Link
            key={r.slug}
            href={`/produkte?raum=${r.slug}`}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            style={r.big ? { gridRow: '1 / 3' } : {}}
          >
            <div className="w-full h-full" style={{ background: r.color }} />
            <div className="absolute inset-0 transition-all" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.58) 0%, transparent 55%)' }}
                 onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(to top, rgba(183,6,6,0.45) 0%, transparent 50%)')}
                 onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(to top, rgba(0,0,0,0.58) 0%, transparent 55%)')} />
            <div className="absolute bottom-4 left-4.5 text-white">
              <div className="text-[10.5px] uppercase tracking-wider opacity-75">Bereich</div>
              <div className="text-[19px] font-black mt-0.5">{r.name}</div>
              <div className="text-[11.5px] opacity-70">{r.count} Böden</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
