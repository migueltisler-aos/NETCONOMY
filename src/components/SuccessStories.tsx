'use client'

import { motion } from 'framer-motion'

const stories = [
  {
    title: 'Mittelständischer Logistik-Betrieb',
    challenge: 'Manuelle Bestandsverwaltung mit Ineffizienzen, häufige Fehlbestände',
    solution: 'IoT-basiertes Nachbestellungssystem mit automatischer Bestandsoptimierung',
    result: 'Bestandskosten um 32% gesenkt, Fehlbestandsrate auf 2% reduziert',
    metrics: [
      { label: 'Kostenersparnis', value: '-32%' },
      { label: 'Fehlbestandsrate', value: '-89%' },
      { label: 'Prozessautomation', value: '95%' },
    ]
  },
  {
    title: 'Mittelständisches Produktionsunternehmen',
    challenge: 'Fragmentierte Verwaltungsprozesse über 5 verschiedene Systeme',
    solution: 'Einheitliche KI-First ERP mit vollständiger Datensynthese',
    result: 'Prozesskosten um 28% reduziert, Prozesszeiten um 62% beschleunigt',
    metrics: [
      { label: 'Prozesskosten', value: '-28%' },
      { label: 'Prozesszeiten', value: '-62%' },
      { label: 'Datensynthese', value: '100%' },
    ]
  },
  {
    title: 'Tech-Startup mit Recruiting-Bottleneck',
    challenge: 'CV-Screening dauerte 8 Stunden pro Tag, viele falsche Kandidaten',
    solution: 'Adaptive CV-Matching-Systeme mit dynamischen Rollenprofilen',
    result: 'CV-Screening auf 45 Minuten pro Tag reduziert, Matching-Genauigkeit 94%',
    metrics: [
      { label: 'Screening-Zeit', value: '-94%' },
      { label: 'Matching-Genauigkeit', value: '94%' },
      { label: 'Candidate Quality', value: '+41%' },
    ]
  },
]

export default function SuccessStories() {
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
        backgroundImage: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.03), rgba(6, 182, 212, 0.03))',
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
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.6)' }}>Proof of Concept</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Praktische Erfolgsbeispiele
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Anonymisierte Case Studies zeigen, wie das Framework in der Praxis funktioniert
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              style={{
                position: 'relative',
                padding: '2rem',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(4px)',
                transition: 'all 300ms',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
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
              {/* Title */}
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#bfdbfe',
                marginBottom: '1.5rem'
              }}>
                {story.title}
              </h3>

              {/* Challenge */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  Challenge
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.5'
                }}>
                  {story.challenge}
                </p>
              </div>

              {/* Solution */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  Solution
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.5'
                }}>
                  {story.solution}
                </p>
              </div>

              {/* Result */}
              <div style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
                <p style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  Result
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#60a5fa',
                  fontWeight: '600',
                  lineHeight: '1.5'
                }}>
                  {story.result}
                </p>
              </div>

              {/* Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {story.metrics.map((metric, metricIdx) => (
                  <div key={metricIdx} style={{ textAlign: 'center' }}>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      color: '#bfdbfe',
                      marginBottom: '0.25rem'
                    }}>
                      {metric.value}
                    </p>
                    <p style={{
                      fontSize: '0.7rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      lineHeight: '1.3'
                    }}>
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
