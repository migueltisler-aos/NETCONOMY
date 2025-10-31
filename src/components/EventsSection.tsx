'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'GITEX EUROPE 2025',
    date: '20.–22. Mai 2025',
    location: 'Messe Berlin',
    description: 'Europas Ableger der weltgrößten Tech- und Startup-Messe mit Fokus auf KI, IoT, 5G, Blockchain, IT Security und Zukunftstrends.',
    tags: ['KI', 'IoT', '5G', 'Blockchain', 'IT Security'],
  },
  {
    id: 2,
    title: 'FIBE 2025 (FinTech International Berlin)',
    date: '9.–10. April 2025',
    location: 'CityCube Berlin',
    description: 'Das internationale Festival zu Finanzen, Technologie und Digitalisierung mit KI, Blockchain und FinTech-Trends.',
    tags: ['FinTech', 'KI', 'Blockchain', 'Digitalisierung'],
  },
  {
    id: 3,
    title: 'Berlin Blockchain Week 2025',
    date: 'Frühjahr/Sommer 2025',
    location: 'Berlin',
    description: 'Zentraler Treffpunkt für Blockchain- und Web3-Ökosysteme mit starkem Bezug zu KI und Innovation.',
    tags: ['Blockchain', 'Web3', 'KI', 'Innovation'],
  },
  {
    id: 4,
    title: 'AI Agent Summit 2025',
    date: 'Parallel zur Blockchain Week',
    location: 'Berlin',
    description: 'Fokus auf autonome, KI-basierte Lösungen, Decision Making & Automatisierung mit Demonstrations und Praxis-Usecases.',
    tags: ['KI', 'Agents', 'Automatisierung', 'Decision Making'],
  },
  {
    id: 5,
    title: 'DEICy 2025 – Matchmaking Digitalwirtschaft, IoT & Cybersecurity',
    date: '24.–28. November 2025',
    location: 'Online & vor Ort',
    description: 'Matchmaking für Unternehmen & Innovationen zu IoT, Digitalisierung und Cybersecurity, Förderung internationaler Kooperationen.',
    tags: ['IoT', 'Cybersecurity', 'Digitalisierung', 'Matchmaking'],
  },
  {
    id: 6,
    title: 'Falling Walls Science Summit 2025',
    date: '6. November 2025',
    location: 'Berlin',
    description: 'Interdisziplinäre Innovations-Konferenz mit führenden Köpfen aus Technologiefeldern inkl. KI, Security und digitaler Transformation.',
    tags: ['Innovation', 'KI', 'Security', 'Transformation'],
  },
]

export default function EventsSection() {
  return (
    <section style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '8rem', overflow: 'hidden', backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: 0,
            width: '24rem',
            height: '24rem',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '50%',
            mixBlendMode: 'multiply',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Calendar style={{ width: '1rem', height: '1rem', color: '#60a5fa' }} />
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.6)' }}>
              Events & Veranstaltungen
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
            Wo Berlin Partner präsent ist
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '42rem', margin: '0 auto' }}>
            Treffe die innovativsten Köpfe der Berliner Tech-Szene auf führenden Konferenzen und Matchmaking-Events
          </p>
        </motion.div>

        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              style={{
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '2rem',
                backdropFilter: 'blur(4px)',
                transition: 'all 300ms ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Date & Location */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar style={{ width: '1rem', height: '1rem' }} />
                  <span>{event.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin style={{ width: '1rem', height: '1rem' }} />
                  <span>{event.location}</span>
                </div>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.75rem' }}>
                {event.title}
              </h3>

              {/* Description */}
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6', marginBottom: '1rem' }}>
                {event.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1rem' }}>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
