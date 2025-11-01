import HeroSection from '@/components/HeroSection'
import SuccessStories from '@/components/SuccessStories'
import FeaturedSpeaking from '@/components/FeaturedSpeaking'
import MiguelChat from '@/components/MiguelChat'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{
      position: 'relative',
      minHeight: '100vh',
      overflowX: 'hidden',
      paddingBottom: '6rem',
      backgroundImage: 'linear-gradient(to bottom, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 1))',
      backgroundColor: '#0f172a'
    }}>
      {/* Hero */}
      <HeroSection />

      {/* Success Stories */}
      <section id="stories">
        <SuccessStories />
      </section>

      {/* Featured Speaking */}
      <section id="speaking">
        <FeaturedSpeaking />
      </section>

      {/* Footer */}
      <Footer />

      {/* Miguel Chat */}
      <MiguelChat />
    </main>
  )
}
