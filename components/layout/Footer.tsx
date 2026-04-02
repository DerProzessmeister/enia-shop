export default function Footer() {
  return (
    <footer style={{ background: '#111', color: '#4b5563' }} className="px-10 py-5 flex items-center justify-between text-[12.5px]">
      <div>© 2026 Bodenfachhandel Hamburg · Bahrenfelder Chaussee 80 · 22761 Hamburg</div>
      <div className="flex gap-1.5">
        {['PayPal','Klarna','Visa','MC','SEPA'].map(m => (
          <span key={m} className="px-2.5 py-1 rounded text-xs font-bold" style={{ background: '#1f2937', color: '#9ca3af' }}>{m}</span>
        ))}
      </div>
      <div className="flex">
        {['Impressum','Datenschutz','AGB','Versand'].map(l => (
          <a key={l} href="#" className="ml-3.5 hover:text-gray-400 transition-colors" style={{ color: '#6b7280' }}>{l}</a>
        ))}
      </div>
    </footer>
  )
}
