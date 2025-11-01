'use client'

import { motion } from 'framer-motion'

export default function FeaturedSpeaking() {
  const videos = [
    {
      year: '2020',
      title: 'Logistikleiter:innen-Panel – Logistics Summit',
      subtitle: 'Radeberger Gruppe (Getränke Hoffmann)',
      description: 'Corona-Krise: +200-500% Nachfrage, Kapazitätsmanagement, Mitarbeiter unter Druck',
      youtubeId: 'dVMr_7RXriU'
    },
    {
      year: '2021',
      title: 'Logistikleiter:innen-Panel – Logistics Summit',
      subtitle: 'Radeberger Gruppe (Getränke Hoffmann)',
      description: 'Von Krise zu Exzellenz: Digitalisierung, Tourenplanung, Nachhaltigkeit',
      youtubeId: '12BtcihJUqM?t=973'
    }
  ]

  return (
    <section style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '4rem', overflow: 'hidden' }}>
      {/* Background Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.1) 100%)'
      }} />

      {/* Content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <h2 style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 1rem 0',
            lineHeight: '1.2'
          }}>
            Featured Speaking
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '45rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            Live Case Studies: Radeberger Gruppe (Getränke Hoffmann) auf dem Logistics Summit 2020 & 2021. Von Corona-Krise zu operativer Exzellenz – direkt vom Logistikleiter selbst präsentiert.
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {/* Video Container */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(4px)'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '1rem'
                  }}
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: 'fit-content'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#60a5fa',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px'
                  }}>
                    {video.year}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {video.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#60a5fa',
                  fontWeight: '600',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {video.subtitle}
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.65)',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
