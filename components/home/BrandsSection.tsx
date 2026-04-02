import Image from 'next/image'

const brands = [
  { name: 'JOKA', img: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2023/09/JOKA_Logo-2048x700-1.png' },
  { name: 'ENIA', img: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2023/09/einza-logo-2-2.png' },
  { name: 'HARO', img: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2023/09/haro-logo-2.jpg' },
  { name: 'WEITZER', img: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2023/09/weitzer-parkett-logo-vector-2.png' },
  { name: 'PARADOR', img: '' },
  { name: 'MEISTER', img: '' },
]

export default function BrandsSection() {
  return (
    <section className="px-10 py-8 border-t" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="text-center text-xs font-bold uppercase tracking-[1.5px] mb-5.5" style={{ color: 'var(--muted)' }}>Unsere Markenpartner</div>
      <div className="flex items-center justify-center gap-11 flex-wrap">
        {brands.map(b => (
          <div key={b.name} className="opacity-40 grayscale hover:opacity-90 hover:grayscale-0 transition-all cursor-pointer">
            {b.img ? (
              <div className="relative h-9 w-24">
                <Image src={b.img} alt={b.name} fill className="object-contain" sizes="96px" />
              </div>
            ) : (
              <span className="text-[17px] font-black" style={{ color: '#555' }}>{b.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
