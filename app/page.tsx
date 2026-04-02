import { getBestsellers, getAllProducts } from '@/lib/products'
import HeroSection from '@/components/home/HeroSection'
import TrustBadges from '@/components/home/TrustBadges'
import BestsellerSection from '@/components/home/BestsellerSection'
import BundleSection from '@/components/home/BundleSection'
import GallerySection from '@/components/home/GallerySection'
import ExpertSection from '@/components/home/ExpertSection'
import RoomSection from '@/components/home/RoomSection'
import BrandsSection from '@/components/home/BrandsSection'
import DualBanners from '@/components/home/DualBanners'
import TrustStrip from '@/components/home/TrustStrip'
import UspStrip from '@/components/home/UspStrip'

export default function HomePage() {
  const bestsellers = getBestsellers(5)
  const allProducts = getAllProducts()

  return (
    <main>
      <HeroSection />
      <UspStrip />
      <TrustBadges />
      <BestsellerSection products={bestsellers} />
      <BundleSection />
      <GallerySection products={allProducts.slice(0, 8)} />
      <ExpertSection />
      <RoomSection />
      <BrandsSection />
      <DualBanners />
      <TrustStrip />
    </main>
  )
}
