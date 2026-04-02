export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price)
}

export function calcM2Price(kartonPrice: number, m2PerKarton = 2.28): string {
  return formatPrice(kartonPrice / m2PerKarton)
}

export function calcKartonsNeeded(m2: number, m2PerKarton = 2.28, verschnitt = 0.1): number {
  return Math.ceil((m2 * (1 + verschnitt)) / m2PerKarton)
}

export function getKollektionBadge(kollektion: string): string {
  if (kollektion.includes('SOREX')) return 'SOREX'
  if (kollektion.includes('ADORIA')) return 'ADORIA'
  if (kollektion.includes('DUPLEX')) return 'DUPLEX'
  if (kollektion.includes('MONACO')) return 'MONACO'
  if (kollektion.includes('NANTES') || kollektion.includes('DOUBLE N')) return 'NANTES'
  if (kollektion.includes('JAZZ')) return 'JAZZ X'
  if (kollektion.includes('TENSA')) return 'TENSA'
  if (kollektion.includes('LARIX')) return 'LARIX'
  return kollektion.slice(0, 10)
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
