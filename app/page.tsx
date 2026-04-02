import { getBestsellers } from '@/lib/products'
import HeroSection from '@/components/home/HeroSection'
import TrustBadges from '@/components/home/TrustBadges'
import CategoryTiles from '@/components/home/CategoryTiles'
import BestsellerSection from '@/components/home/BestsellerSection'
import RoomVisualizerTeaser from '@/components/home/RoomVisualizerTeaser'
import ExpertSection from '@/components/home/ExpertSection'

export default function HomePage() {
  const bestsellers = getBestsellers(10)

  return (
    <main>
      <HeroSection />
      <TrustBadges />
      <CategoryTiles />
      <BestsellerSection products={bestsellers} />
      <RoomVisualizerTeaser />
      <ExpertSection />
    </main>
  )
}
