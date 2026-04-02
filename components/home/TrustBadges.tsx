const badges = [
  { icon: '🌟', score: '4,9', stars: '★★★★★', starColor: 'var(--red)', label: 'Google', count: '847 Bewertungen' },
  { icon: '🏅', score: '4,85', stars: '★★★★★', starColor: '#f59e0b', label: 'Trusted Shops', count: 'Zertifiziert' },
  { icon: '⭐', score: '4,9', stars: '★★★★★', starColor: '#00b67a', label: 'Trustpilot', count: '320 Bewertungen' },
  { icon: '🏪', score: '10+', stars: '', starColor: '', label: 'Jahre Erfahrung', count: 'Hamburg seit 2015' },
]

export default function TrustBadges() {
  return (
    <div className="flex items-center justify-center gap-0 bg-white border-b-2" style={{ borderColor: 'var(--border)' }}>
      {badges.map((b, i) => (
        <div key={i} className="flex items-center gap-3 px-8 py-4 border-r last:border-r-0" style={{ borderColor: 'var(--border)' }}>
          <span className="text-3xl">{b.icon}</span>
          <div>
            <div className="text-xl font-black" style={{ color: i === 0 ? 'var(--red)' : 'var(--dark)' }}>{b.score}</div>
            {b.stars && <div className="text-sm tracking-[-1px]" style={{ color: b.starColor }}>{b.stars}</div>}
          </div>
          <div>
            <div className="text-sm font-bold">{b.label}</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>{b.count}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
