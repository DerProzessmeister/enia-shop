import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import Ticker from '@/components/layout/Ticker'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

const ibm = IBM_Plex_Sans({
  weight: ['300','400','500','600','700'],
  subsets: ['latin'],
  variable: '--font-ibm',
})

export const metadata: Metadata = {
  title: 'Bodenfachhandel Hamburg — Premium Designböden',
  description: '277 Enia-Designböden vom Hamburger Fachhandel. Gratis Muster, Express-Lieferung, 60 Tage Rückgabe. PayPal · Klarna · Visa.',
  keywords: 'Bodenbelag, Designboden, Vinylboden, Enia, Hamburg, Fachhandel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${ibm.variable} font-sans`}>
        <Ticker />
        <Header />
        <Navigation />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
