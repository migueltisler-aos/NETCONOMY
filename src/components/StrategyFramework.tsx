'use client'

import { motion } from 'framer-motion'

const framework = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Geschäftsmodell & Markt verstehen',
    details: 'Analyse des aktuellen Geschäftsmodells, Marktposition, Wettbewerbsumfeld und digitaler Reifungsgrad',
    icon: '🔍'
  },
  {
    number: '02',
    title: 'DIAGNOSE',
    description: 'Digitale Reifegrad & Gaps analysieren',
    details: 'Identifikation von Optimierungspotentialen in Prozessen, Technologie und Organisation',
    icon: '📊'
  },
  {
    number: '03',
    title: 'DESIGN',
    description: 'Strategische Roadmap entwickeln',
    details: 'Erstellung einer priorisierten Transformations-Roadmap mit KPIs und Meilensteinen',
    icon: '✏️'
  },
  {
    number: '04',
    title: 'DEPLOY',
    description: 'Pilotprojekte & Quick Wins',
    details: 'Umsetzung von Pilot-Projekten zur Validierung der Strategie und schnelle Erfolge',
    icon: '🚀'
  },
  {
    number: '05',
    title: 'DELIVER',
    description: 'Skalierung & Continuous Improvement',
    details: 'Vollständige Skalierung, Optimierung und kontinuierliche Verbesserung der Lösung',
    icon: '📈'
  }
]

export default function StrategyFramework() {
  return (
    <section id="strategy" style={{
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
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.6)' }}>Mein Ansatz</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            5-Stufen Digital Strategy Framework
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Von der Problemanalyse zur Skalierung – systematisch und messbar
          </p>
        </motion.div>

        {/* Framework Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {framework.map((step, idx) => (
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
                transition: 'all 300ms',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'
              }}
            >
              {/* Step Number */}
              <div style={{
                position: 'absolute',
                top: '-1rem',
                left: '2rem',
                fontSize: '3rem',
                fontWeight: '700',
                color: 'rgba(59, 130, 246, 0.1)',
                lineHeight: '1'
              }}>
                {step.number}
              </div>

              {/* Icon */}
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>
                {step.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '0.5rem'
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                {step.description}
              </p>

              {/* Details */}
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                fontStyle: 'italic',
                lineHeight: '1.5'
              }}>
                {step.details}
              </p>

              {/* Arrow - Hidden on mobile, shown on desktop */}
              {idx < framework.length - 1 && (
                <div className="arrow-hidden-mobile" style={{
                  position: 'absolute',
                  right: '-1.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.5rem',
                  color: 'rgba(59, 130, 246, 0.3)',
                  display: 'none'
                }}>
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            borderRadius: '1.5rem',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            padding: '2rem',
            backdropFilter: 'blur(4px)'
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1.5rem'
          }}>
            Warum dieser Ansatz?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Business-fokussiert',
                description: 'Jeder Schritt ist an Geschäftsziele gekoppelt, nicht an Technologie'
              },
              {
                title: 'Messbar & transparent',
                description: 'KPI-getrieben mit klaren Erfolgs-Indikatoren in jeder Phase'
              },
              {
                title: 'Risiko-minimiert',
                description: 'Pilot-Phase validiert die Strategie vor Full-Scale Rollout'
              },
              {
                title: 'Skalierbar',
                description: 'Von kleinen Piloten bis zu unternehmensweiten Transformationen'
              }
            ].map((benefit, idx) => (
              <div key={idx}>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#bfdbfe',
                  marginBottom: '0.5rem'
                }}>
                  ✓ {benefit.title}
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '1.5'
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .arrow-hidden-mobile {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}
