import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import UrgencyBar from '@/components/layout/UrgencyBar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import ExpertChatButton from '@/components/layout/ExpertChatButton'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Enia Bodenbelag Hamburg — Premium Designböden direkt vom Fachhandel',
  description: '277 Enia-Designböden vom Hamburger Fachhandel. Gratis Muster, 24h-Versand, 60 Tage Rückgabe. Eiche, Beton, Stein, Großformat.',
  keywords: 'Enia, Bodenbelag, Designboden, Vinylboden, Hamburg, Fachhandel, Eichenboden, Betonoptik',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <UrgencyBar />
        <Header />
        <Navigation />
        {children}
        <Footer />
        <CartDrawer />
        <ExpertChatButton />
      </body>
    </html>
  )
}
