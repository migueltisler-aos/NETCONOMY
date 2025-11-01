'use client'

import { motion } from 'framer-motion'

export default function DigitalStrategyApproach() {
  const steps = [
    {
      number: '1',
      title: 'VERSTEHEN',
      subtitle: 'Operative Prozesse durchdringen',
      description: '20 Jahre Erfahrung in Logistik & Operations. Identifiziere echte Digitalisierungs-Potentiale statt oberflächliche Tech-Features.',
      icon: '🔍'
    },
    {
      number: '2',
      title: 'ANALYSIEREN',
      subtitle: 'Digital Maturity Assessment',
      description: '€60M+ operative Transformation. Entwickle KPI-getriebene Digitalstrategien basierend auf realen Business-Metriken.',
      icon: '📊'
    },
    {
      number: '3',
      title: 'STRATEGIEN',
      subtitle: 'Business-Tech-Translation',
      description: 'Übersetze komplexe Technologie in umsetzbare Strategien. Brückenbauer zwischen IT und Business-Leadership.',
      icon: '🌉'
    },
    {
      number: '4',
      title: 'IMPLEMENTIEREN',
      subtitle: 'Operative Exzellenz',
      description: '220+ Mitarbeitende geleitet. Führe digitale Transformation mit messbaren Ergebnissen durch – nicht nur theoretisch.',
      icon: '✅'
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
        backgroundImage: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.05), rgba(59, 130, 246, 0.05))',
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
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.6)' }}>Methodology</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Operations-First Digital Strategy
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Mein bewährter 4-Schritte-Ansatz: Von Process-Expertise zu messbarer digitaler Transformation
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
        }}>
          {steps.map((step, idx) => (
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
                border: '1px solid rgba(59, 130, 246, 0.3)',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {/* Step Number Circle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '1.25rem'
                }}>
                  {step.number}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#bfdbfe',
                    margin: 0
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#60a5fa',
                    margin: 0
                  }}>
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {/* Icon */}
              <div style={{
                fontSize: '2.5rem',
                opacity: 0.8
              }}>
                {step.icon}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6',
                margin: 0
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
