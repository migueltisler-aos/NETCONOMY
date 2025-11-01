'use client'

import { motion } from 'framer-motion'

export default function CallToAction() {
  const questions = [
    {
      emoji: '🤔',
      question: 'Wie wird aus Ihrer Operation eine digitale Strategie?',
      subtext: 'Operations-First Approach: Von Process-Expertise zur Digital Transformation'
    },
    {
      emoji: '🔒',
      question: 'Welche Legacy-Systeme blockieren Ihr Wachstum?',
      subtext: 'Reale Beispiele: Von 7 Jahren Verlust zu Break-Even, +95% Produktivität'
    },
    {
      emoji: '⚙️',
      question: 'Brauchen Sie operative Exzellenz als Digitalisierungs-Fundament?',
      subtext: '220+ Mitarbeitende geleitet, €60M+ Transformation, bewährte Methodologie'
    },
    {
      emoji: '📈',
      question: 'Wollen Sie von Verlusten zu Profitabilität durch digitale Transformation?',
      subtext: 'Konkrete Zahlen: -60% Kosten, +95% Produktivität, 4% → 0,2% Fehlerquote'
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
        backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
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
          <h2 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            Schnelle Fragen – Klare Antworten
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '42rem',
            margin: '0 auto'
          }}>
            Operative Exzellenz trifft digitale Strategie. Lassen Sie uns sprechen über Ihre Transformation.
          </p>
        </motion.div>

        {/* Questions Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {questions.map((item, idx) => (
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
              <div style={{ fontSize: '2rem' }}>{item.emoji}</div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#bfdbfe',
                margin: 0,
                lineHeight: '1.4'
              }}>
                {item.question}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.65)',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {item.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            borderRadius: '1.5rem',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            backdropFilter: 'blur(4px)'
          }}
        >
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '2rem'
          }}>
            Kontakt
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: '0 0 0.5rem 0'
              }}>
                Telefon
              </p>
              <a
                href="tel:+4917787956337"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#60a5fa',
                  textDecoration: 'none'
                }}
              >
                📞 0177 - 879 56 37
              </a>
            </div>
            <div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: '0 0 0.5rem 0'
              }}>
                Email
              </p>
              <a
                href="mailto:miguel.tisler@gmx.de"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#60a5fa',
                  textDecoration: 'none'
                }}
              >
                📧 miguel.tisler@gmx.de
              </a>
            </div>
            <div>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: '0 0 0.5rem 0'
              }}>
                LinkedIn
              </p>
              <a
                href="https://www.linkedin.com/in/miguel-tisler-0a2976120/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#60a5fa',
                  textDecoration: 'none'
                }}
              >
                🔗 LinkedIn Profile
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
