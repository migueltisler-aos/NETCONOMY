import HeroSection from '@/components/HeroSection'
import EventsSection from '@/components/EventsSection'
import InnovationBoard from '@/components/InnovationBoard'
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
      {/* Miguel's Header Banner */}
      <div style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
        padding: '1.5rem 20px',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 30
      }}>
        <div style={{
          maxWidth: '1280px',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '1.5rem',
                color: '#ffffff',
                fontWeight: '700',
                margin: 0,
                marginBottom: '0.5rem'
              }}>
                Miguel Tisler – Digital Strategy
              </h1>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0,
                fontStyle: 'italic'
              }}>
                "Ich übersetze Visionen in digitale Realitäten"
              </p>
            </div>
            <div style={{
              textAlign: 'right',
              whiteSpace: 'nowrap'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#ffffff',
                margin: '0 0 0.5rem 0',
                fontWeight: '600'
              }}>
                📧 miguel.tisler@gmx.de
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: '#60a5fa',
                margin: 0,
                fontWeight: '600'
              }}>
                📞 0177 - 879 56 37
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ paddingTop: '10rem' }}>
        <HeroSection />
      </div>

      {/* Events Section */}
      <section id="events">
        <EventsSection />
      </section>

      {/* Innovation Board */}
      <section id="board">
        <InnovationBoard />
      </section>

      {/* Footer */}
      <Footer />

      {/* Miguel Chat */}
      <MiguelChat />
    </main>
  )
}
