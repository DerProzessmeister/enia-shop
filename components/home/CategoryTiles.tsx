import Link from 'next/link'
import Image from 'next/image'

const categories = [
  {
    label: 'Eiche',
    slug: 'eiche',
    count: 84,
    image: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-oak-nature.jpg.webp',
    description: 'Zeitlose Wärme',
  },
  {
    label: 'Beton',
    slug: 'beton',
    count: 38,
    image: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-screed-light-.jpg.webp',
    description: 'Urban & Modern',
  },
  {
    label: 'Stein',
    slug: 'stein',
    count: 32,
    image: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-stone-light.jpg.webp',
    description: 'Natürliche Eleganz',
  },
  {
    label: 'Großformat',
    slug: 'xxl',
    count: 67,
    image: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-oak-fresh.jpg.webp',
    description: 'XXL-Dielen',
  },
  {
    label: '🔥 Sale',
    slug: 'sale',
    count: 43,
    image: 'https://bodenfachhandel-hamburg.de/wp-content/uploads/2025/02/Enia-LARIX-oak-smoked-.jpg.webp',
    description: 'Bis −30%',
    isHighlight: true,
  },
]

export default function CategoryTiles() {
  return (
    <section style={{ background: 'var(--bg)', padding: '56px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section title */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>
            Entdecke deine Kollektion
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)' }}>
            Wähle nach Optik — von klassischem Eiche bis modernem Beton
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
        }}
        className="category-grid"
        >
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/produkte?kat=${cat.slug}`}
              style={{
                display: 'block',
                borderRadius: '14px',
                overflow: 'hidden',
                textDecoration: 'none',
                position: 'relative',
                aspectRatio: '3/4',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                border: cat.isHighlight ? '2px solid var(--accent)' : '1px solid var(--border)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              className="cat-tile"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: cat.isHighlight
                  ? 'linear-gradient(to top, rgba(26,26,46,0.85) 0%, rgba(26,26,46,0.2) 50%, transparent 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
              }} />

              {/* Sale badge */}
              {cat.isHighlight && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'var(--accent)',
                  color: 'var(--primary)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 800,
                }}>
                  SALE
                </div>
              )}

              {/* Count badge */}
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(255,255,255,0.9)',
                color: 'var(--primary)',
                borderRadius: '50px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: 700,
              }}>
                {cat.count}
              </div>

              {/* Bottom label */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 14px 18px',
              }}>
                <div style={{ fontWeight: 800, fontSize: '18px', color: 'white', lineHeight: 1.2 }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                  {cat.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .cat-tile:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.14) !important; }
        @media (max-width: 1024px) {
          .category-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .category-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
