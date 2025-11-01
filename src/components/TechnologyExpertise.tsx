'use client'

import { motion } from 'framer-motion'

export default function TechnologyExpertise() {
  const technologies = [
    {
      category: 'Automatisierung & Integration',
      tech: ['Python', 'SQL', 'Node-RED', 'API-Integration'],
      description: 'Automatisierte Prozesse, Datenintegration, Legacy-System-Konnektivität'
    },
    {
      category: 'Data Science & Analytics',
      tech: ['KPI-Systeme', 'Data Analysis', 'GA4', 'Predictive Analytics'],
      description: 'Datengetriebene Entscheidungen, Performance-Monitoring, Trend-Analyse'
    },
    {
      category: 'Enterprise Systems',
      tech: ['WMS-Integration', 'ERP-Modernisierung', 'Legacy-Transformation'],
      description: 'Supply Chain Digitalisierung, Prozess-Optimierung, System-Architektur'
    },
    {
      category: 'IoT & Echtzeit-Systeme',
      tech: ['GPS-Tracking', 'Route-Optimization', 'Sensor-Integration'],
      description: 'Echtzeitdaten, automatische Kundenzuordnung, Tourenplanung'
    },
  ]

  return (
    <section style={{
      position: 'relative',
      paddingTop: '6rem',
      paddingBottom: '6rem',
      overflow: 'hidden'
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(6, 182, 212, 0.05))',
        pointerEvents: 'none'
      }} />

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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.6)' }}>Tech Stack</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Bewährte Technologien für operative Transformation
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Keine theoretischen Tech-Stacks. Nur Tools, die in €60M+ Operationen real funktionieren.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{
                position: 'relative',
                padding: '2rem',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {/* Category */}
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#bfdbfe',
                margin: 0
              }}>
                {tech.category}
              </h3>

              {/* Technologies */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                {tech.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#60a5fa',
                      backgroundColor: 'rgba(96, 165, 250, 0.1)',
                      border: '1px solid rgba(96, 165, 250, 0.3)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: '1.5',
                margin: 0
              }}>
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
