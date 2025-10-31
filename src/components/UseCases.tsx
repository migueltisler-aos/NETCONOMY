'use client'

import { motion } from 'framer-motion'

const useCases = [
  {
    icon: '📊',
    title: 'ERP-Automatisierung & -Modernisierung',
    description: 'Fragmentierte Legacy-Systeme konsolidieren, Automatisierung über Abteilungsgrenzen hinweg',
    benefits: [
      'Buchhaltung: Automatische Transaktionsverarbeitung & Compliance-Audits',
      'Planung: KI-gestützte Forecast-Modelle mit historischen Daten',
      'Lagerverwaltung: Echtzeit-Bestands-Synchronisation über Standorte'
    ]
  },
  {
    icon: '🤖',
    title: 'Operative Prozessautomation mit KI',
    description: 'Geschäftsprozesse, die sich selbst optimieren & adapatieren',
    benefits: [
      'RPA + LLM: Dokumentenverarbeitung, Datenextraktion, Validierung',
      'Anomalie-Detection: Automatische Warnung bei Compliance-Risiken',
      'Self-Healing Systems: Prozesse erkennen Fehler, korrigieren sich selbst'
    ]
  },
  {
    icon: '🔍',
    title: 'KI-gestützte Entscheidungssysteme',
    description: 'Daten in nachvollziehbare, audit-sichere Empfehlungen übersetzen',
    benefits: [
      'Transparente KI: Jede Entscheidung ist rückverfolgbar & erklärbar',
      'Dynamische Modelle: ML-Modelle, die mit neuen Daten kontinuierlich lernen',
      'Risk-Scoring: Automatische Bewertung von Chancen und Risiken'
    ]
  },
  {
    icon: '📈',
    title: 'Dateninfrastruktur & Business Intelligence',
    description: 'Von Daten-Silos zu einem einheitlichen, intelligenten Datensystem',
    benefits: [
      'Data Lake mit Built-in Governance: Zentrales Repository, alle konform',
      'Real-Time Dashboards: KPI-Tracking über alle Business-Bereiche',
      'Predictive Analytics: Datenbasierte Strategien für Wachstum'
    ]
  },
  {
    icon: '🧠',
    title: 'Talent & Organizational Intelligence',
    description: 'HR, Recruiting und Organisation mit Datenansatz & KI',
    benefits: [
      'CV-Screening: Automatisch & fair, Skills-basiertes Matching',
      'Succession Planning: Daten-gestützte Identifikation von Leaders',
      'Learning Pathways: Adaptive Entwicklungsprogramme per KI'
    ]
  },
  {
    icon: '🏗️',
    title: 'Digitale Transformations-Roadmaps',
    description: 'Strategische Planung mit Pilot-Validierung & schnellen Gewinnen',
    benefits: [
      'DISCOVER→DELIVER Framework: Von Analyse bis Skalierung',
      'Quick Wins: Kurz-term Impact neben Long-term Strategy',
      'Change Management: Organisationen vorbereiten, KI-native zu arbeiten'
    ]
  },
]

export default function UseCases() {
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
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.6)' }}>Anwendungsszenarien</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Wo Digital Strategy + KI zusammen wirken
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Konkrete Anwendungsfelder, in denen das Framework seine Kraft zeigt
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {useCases.map((useCase, idx) => (
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
              {/* Icon */}
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem'
              }}>
                {useCase.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '0.75rem'
              }}>
                {useCase.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {useCase.description}
              </p>

              {/* Benefits List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {useCase.benefits.map((benefit, benefitIdx) => (
                  <div key={benefitIdx} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start'
                  }}>
                    <span style={{
                      color: '#60a5fa',
                      marginTop: '0.125rem',
                      flexShrink: 0
                    }}>
                      ✓
                    </span>
                    <p style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: '1.4'
                    }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: '4rem',
            textAlign: 'center'
          }}
        >
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '1.5rem'
          }}>
            Passt eines dieser Szenarien zu deiner Organisation?
          </p>
          <button
            style={{
              padding: '0.875rem 2rem',
              borderRadius: '9999px',
              backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)',
              color: '#ffffff',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'transform 200ms',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => {
              const chatButton = document.querySelector('button[style*="bottom: 1.5rem"]') as HTMLElement
              if (chatButton) chatButton.click()
            }}
          >
            Lass uns talken
          </button>
        </motion.div>
      </div>
    </section>
  )
}
