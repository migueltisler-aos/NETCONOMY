'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Send, Loader2, CheckCircle2, AlertCircle, Mail } from 'lucide-react'

type FormMode = 'suche' | 'biete' | 'view'

interface SucheEntry {
  id: string
  technologie: string
  branche: string
  beschreibung: string
  ruckrufnummer: string
  timestamp: string
  matches?: number
}

interface BieteEntry {
  id: string
  name: string
  technologie: string
  zielgruppe: string
  losung: string
  email: string
  website: string
  timestamp: string
}

const technologieOptions = [
  'Edge AI',
  '5G/6G',
  'IoT',
  'Blockchain',
  'Cybersecurity',
  'Immersive Tech',
  'Robotik',
  'KI Agents',
]

const branchenOptions = [
  'Logistik',
  'Manufacturing',
  'FinTech',
  'HealthTech',
  'Retail',
  'Smart City',
  'Energie',
  'Sonstiges',
]

const zielgruppenOptions = [
  'Corporate/Unternehmen',
  'Forschung',
  'Government',
  'Startups',
  'Alle',
]

export default function InnovationBoard() {
  const [formMode, setFormMode] = useState<FormMode>('view')
  const [sucheEntries, setSucheEntries] = useState<SucheEntry[]>([
    {
      id: '1',
      technologie: 'Edge AI',
      branche: 'Logistik',
      beschreibung: 'DB Cargo sucht KI-Lösung für Echtzeit-Lagerverwaltung mit Anomalieerkennung',
      ruckrufnummer: '030-12345678',
      timestamp: 'vor 2 Tagen',
    },
    {
      id: '2',
      technologie: 'Cybersecurity',
      branche: 'Manufacturing',
      beschreibung: 'Siemens Mobility sucht Zero-Trust-Architektur für Supply-Chain-Netzwerke',
      ruckrufnummer: '030-87654321',
      timestamp: 'vor 1 Woche',
    },
    {
      id: '3',
      technologie: 'IoT',
      branche: 'Smart City',
      beschreibung: 'Vattenfall sucht IoT-Sensoren für intelligente Stromverteilnetze in Berlin',
      ruckrufnummer: '030-11223344',
      timestamp: 'vor 3 Tagen',
    },
    {
      id: '4',
      technologie: 'KI Agents',
      branche: 'FinTech',
      beschreibung: 'Berliner Bank braucht KI-Agenten für automatisierte Kundenberatung',
      ruckrufnummer: '030-55667788',
      timestamp: 'vor 1 Tag',
    },
    {
      id: '5',
      technologie: 'Immersive Tech',
      branche: 'HealthTech',
      beschreibung: 'Charité sucht VR/AR-Lösungen für Medizinische Ausbildung und Therapie',
      ruckrufnummer: '030-99887766',
      timestamp: 'vor 4 Tagen',
    },
  ])
  const [bieteEntries, setBieteEntries] = useState<BieteEntry[]>([
    {
      id: '1',
      name: 'ConBotics',
      technologie: 'Robotik',
      zielgruppe: 'Corporate/Unternehmen',
      losung: 'Robotik für Bau und Logistik – autonome Systeme für komplexe Umgebungen',
      email: 'hello@conbotics.de',
      website: 'conbotics.de',
      timestamp: 'vor 3 Tagen',
    },
    {
      id: '2',
      name: 'WISTA Adlershof',
      technologie: 'IoT & Edge Computing',
      zielgruppe: 'Alle',
      losung: 'Innovation Campus mit 1000+ Tech-Startups und Forschungsprojekten',
      email: 'kontakt@wista.de',
      website: 'wista.de',
      timestamp: 'vor 5 Tagen',
    },
    {
      id: '3',
      name: 'Konduit AI',
      technologie: 'KI Agents',
      zielgruppe: 'Corporate/Unternehmen',
      losung: 'Enterprise-ready KI Agenten für automatisierte Business-Prozesse',
      email: 'hello@konduit.ai',
      website: 'konduit.ai',
      timestamp: 'vor 1 Tag',
    },
    {
      id: '4',
      name: 'Blackridge Technology',
      technologie: 'Cybersecurity',
      zielgruppe: 'Corporate/Unternehmen',
      losung: 'Zero-Trust Security Plattform für Supply-Chain-Schutz',
      email: 'contact@blackridge.de',
      website: 'blackridge.de',
      timestamp: 'vor 4 Tagen',
    },
    {
      id: '5',
      name: 'Fraunhofer FOKUS',
      technologie: '5G/6G',
      zielgruppe: 'Forschung',
      losung: 'Next-Gen Netzwerk-Technologien und 5G/6G Anwendungsszenarien',
      email: 'info@fokus.fraunhofer.de',
      website: 'fokus.fraunhofer.de',
      timestamp: 'vor 2 Tagen',
    },
  ])

  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [searchTerm, setSearchTerm] = useState('')

  // SUCHE Form
  const [sucheForm, setSucheForm] = useState({
    technologie: '',
    branche: '',
    beschreibung: '',
    ruckrufnummer: '',
  })

  // Filtering logic
  const filteredSucheEntries = sucheEntries.filter((entry) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      entry.technologie.toLowerCase().includes(searchLower) ||
      entry.branche.toLowerCase().includes(searchLower) ||
      entry.beschreibung.toLowerCase().includes(searchLower)
    )
  })

  const filteredBieteEntries = bieteEntries.filter((entry) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      entry.name.toLowerCase().includes(searchLower) ||
      entry.technologie.toLowerCase().includes(searchLower) ||
      entry.losung.toLowerCase().includes(searchLower)
    )
  })

  // BIETE Form
  const [bieteForm, setBieteForm] = useState({
    name: '',
    technologie: '',
    zielgruppe: '',
    losung: '',
    email: '',
    website: '',
  })

  const handleSucheSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/innovation-board/suche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sucheForm),
      })

      if (!response.ok) throw new Error('Failed to submit')

      const newEntry: SucheEntry = {
        id: Date.now().toString(),
        ...sucheForm,
        timestamp: 'gerade eben',
        matches: Math.floor(Math.random() * 5),
      }

      setSucheEntries([newEntry, ...sucheEntries])
      setSucheForm({ technologie: '', branche: '', beschreibung: '', ruckrufnummer: '' })
      setSubmitStatus('success')
      setTimeout(() => {
        setSubmitStatus('idle')
        setFormMode('view')
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 2000)
    } finally {
      setLoading(false)
    }
  }

  const handleBieteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/innovation-board/biete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bieteForm),
      })

      if (!response.ok) throw new Error('Failed to submit')

      const newEntry: BieteEntry = {
        id: Date.now().toString(),
        ...bieteForm,
        timestamp: 'gerade eben',
      }

      setBieteEntries([newEntry, ...bieteEntries])
      setBieteForm({ name: '', technologie: '', zielgruppe: '', losung: '', email: '', website: '' })
      setSubmitStatus('success')
      setTimeout(() => {
        setSubmitStatus('idle')
        setFormMode('view')
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '8rem', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute',
          top: '33%',
          right: 0,
          width: '24rem',
          height: '24rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          filter: 'blur(120px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '25%',
          width: '24rem',
          height: '24rem',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          borderRadius: '50%',
          mixBlendMode: 'multiply',
          filter: 'blur(120px)',
        }} />
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
            <Search style={{ width: '1rem', height: '1rem', color: '#60a5fa' }} />
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255, 255, 255, 0.6)' }}>Innovation Matching Board</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
            Finde deine Partner in Berlin
          </h2>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '42rem', margin: '0 auto' }}>
            Poste deine Anfrage oder Lösung – unser Smart Matching verbindet dich automatisch mit passenden Partnern. Wenn's nicht passt, schaut Miguel vorbei.
          </p>
        </motion.div>

        {/* Mode Selector */}
        {formMode === 'view' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => setFormMode('suche')}
              style={{
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontWeight: '600',
                transition: 'all 300ms',
                backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 20px 50px rgba(59, 130, 246, 0.3)',
                cursor: 'pointer',
                transform: 'scale(1)',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.125rem' }}>🔍 ICH SUCHE</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>Nach Partner & Lösung</div>
              </div>
            </button>
            <button
              onClick={() => setFormMode('biete')}
              style={{
                padding: '1rem 2rem',
                borderRadius: '1rem',
                fontWeight: '600',
                transition: 'all 300ms',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
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
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.125rem' }}>🚀 ICH BIETE</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Meine Lösung</div>
              </div>
            </button>
          </motion.div>
        )}

        {/* Forms */}
        <AnimatePresence mode="wait">
          {formMode === 'suche' && (
            <motion.div
              key="suche-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ maxWidth: '42rem', margin: '0 auto 4rem' }}
            >
              <div style={{
                padding: '2rem',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(4px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>Was suchst du?</h3>
                  <button
                    onClick={() => setFormMode('view')}
                    style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.5rem',
                      transition: 'color 200ms',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSucheSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                        Technologie-Bereich *
                      </label>
                      <select
                        required
                        value={sucheForm.technologie}
                        onChange={(e) => setSucheForm({ ...sucheForm, technologie: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          transition: 'border-color 200ms',
                          cursor: 'pointer',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                      >
                        <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Wähle eine Technologie</option>
                        {technologieOptions.map((tech) => (
                          <option key={tech} value={tech} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                            {tech}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                        Branche *
                      </label>
                      <select
                        required
                        value={sucheForm.branche}
                        onChange={(e) => setSucheForm({ ...sucheForm, branche: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          transition: 'border-color 200ms',
                          cursor: 'pointer',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                      >
                        <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Wähle eine Branche</option>
                        {branchenOptions.map((branche) => (
                          <option key={branche} value={branche} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                            {branche}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                      Beschreibung deines Problems *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={sucheForm.beschreibung}
                      onChange={(e) => setSucheForm({ ...sucheForm, beschreibung: e.target.value })}
                      placeholder="z.B. Wir brauchen eine Edge-AI Lösung für Echtzeit-Lagerverwaltung mit Anomalieerkennung..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        transition: 'border-color 200ms',
                        resize: 'none',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                      Rückrufnummer *
                    </label>
                    <input
                      required
                      type="tel"
                      value={sucheForm.ruckrufnummer}
                      onChange={(e) => setSucheForm({ ...sucheForm, ruckrufnummer: e.target.value })}
                      placeholder="+49 30 XXXX XXXX"
                      style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        transition: 'border-color 200ms',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                    />
                  </div>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          color: 'rgba(134, 239, 172, 1)',
                        }}
                      >
                        <CheckCircle2 style={{ width: '1.25rem', height: '1.25rem' }} />
                        <span>Super! Deine Anfrage wurde eingereicht. Miguel schaut sich das an!</span>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          color: 'rgba(252, 165, 165, 1)',
                        }}
                      >
                        <AlertCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                        <span>Fehler beim Absenden. Versuche es später nochmal.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                      color: '#ffffff',
                      fontWeight: '600',
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'transform 200ms',
                      transform: 'scale(1)',
                    }}
                    onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {loading ? (
                      <>
                        <Loader2 style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
                        Wird eingereicht...
                      </>
                    ) : (
                      <>
                        <Send style={{ width: '1.25rem', height: '1.25rem' }} />
                        Anfrage einreichen
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {formMode === 'biete' && (
            <motion.div
              key="biete-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ maxWidth: '42rem', margin: '0 auto 4rem' }}
            >
              <div style={{
                padding: '2rem',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(4px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>Was bietest du an?</h3>
                  <button
                    onClick={() => setFormMode('view')}
                    style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.5rem',
                      transition: 'color 200ms',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleBieteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                        Dein Name / Startup-Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={bieteForm.name}
                        onChange={(e) => setBieteForm({ ...bieteForm, name: e.target.value })}
                        placeholder="z.B. ConBotics"
                        style={{
                          width: '100%',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          transition: 'border-color 200ms',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                        Technologie-Bereich *
                      </label>
                      <select
                        required
                        value={bieteForm.technologie}
                        onChange={(e) => setBieteForm({ ...bieteForm, technologie: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          transition: 'border-color 200ms',
                          cursor: 'pointer',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                      >
                        <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Wähle eine Technologie</option>
                        {technologieOptions.map((tech) => (
                          <option key={tech} value={tech} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                            {tech}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                      Zielgruppe *
                    </label>
                    <select
                      required
                      value={bieteForm.zielgruppe}
                      onChange={(e) => setBieteForm({ ...bieteForm, zielgruppe: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        transition: 'border-color 200ms',
                        cursor: 'pointer',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                    >
                      <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>Wähle eine Zielgruppe</option>
                      {zielgruppenOptions.map((zg) => (
                        <option key={zg} value={zg} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                          {zg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                      Beschreibung deiner Lösung *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={bieteForm.losung}
                      onChange={(e) => setBieteForm({ ...bieteForm, losung: e.target.value })}
                      placeholder="z.B. Wir entwickeln 5G-basierte Positionierungslösungen für Smart Warehouses mit +/- 10cm Genauigkeit..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        transition: 'border-color 200ms',
                        resize: 'none',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                        E-Mail *
                      </label>
                      <input
                        required
                        type="email"
                        value={bieteForm.email}
                        onChange={(e) => setBieteForm({ ...bieteForm, email: e.target.value })}
                        placeholder="hello@startup.de"
                        style={{
                          width: '100%',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          transition: 'border-color 200ms',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                        Website / LinkedIn
                      </label>
                      <input
                        type="url"
                        value={bieteForm.website}
                        onChange={(e) => setBieteForm({ ...bieteForm, website: e.target.value })}
                        placeholder="startup.de"
                        style={{
                          width: '100%',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: '#ffffff',
                          transition: 'border-color 200ms',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          color: 'rgba(134, 239, 172, 1)',
                        }}
                      >
                        <CheckCircle2 style={{ width: '1.25rem', height: '1.25rem' }} />
                        <span>Top! Dein Angebot ist online. Du wirst benachrichtigt wenn passende Anfragen reinkommen!</span>
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          padding: '1rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          color: 'rgba(252, 165, 165, 1)',
                        }}
                      >
                        <AlertCircle style={{ width: '1.25rem', height: '1.25rem' }} />
                        <span>Fehler beim Absenden. Versuche es später nochmal.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)',
                      color: '#ffffff',
                      fontWeight: '600',
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'transform 200ms',
                      transform: 'scale(1)',
                    }}
                    onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    {loading ? (
                      <>
                        <Loader2 style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
                        Wird eingereicht...
                      </>
                    ) : (
                      <>
                        <Send style={{ width: '1.25rem', height: '1.25rem' }} />
                        Angebot veröffentlichen
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {formMode === 'view' && (
            <>
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '2rem' }}
              >
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#60a5fa', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder="Suche nach Technologie, Branche oder Lösung..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      borderRadius: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '1rem',
                      transition: 'all 300ms',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                      e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    }}
                  />
                </div>
              </motion.div>

              {/* Results Info */}
              {searchTerm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}
                >
                  <span style={{ color: '#60a5fa', fontWeight: '600' }}>{filteredSucheEntries.length}</span> Anfragen &amp; <span style={{ color: '#60a5fa', fontWeight: '600' }}>{filteredBieteEntries.length}</span> Lösungen gefunden
                </motion.div>
              )}

            <motion.div
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}
            >
              {/* SUCHE Section */}
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Search style={{ width: '1.5rem', height: '1.5rem', color: '#60a5fa' }} />
                  Aktuelle Suchanfragen
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredSucheEntries.length > 0 ? (
                    filteredSucheEntries.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{
                        padding: '1.5rem',
                        borderRadius: '1.125rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 300ms',
                        cursor: 'pointer',
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
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          color: '#93c5fd',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                        }}>
                          {entry.technologie}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>{entry.timestamp}</span>
                      </div>
                      <p style={{ color: '#ffffff', fontWeight: '600', marginBottom: '0.5rem' }}>{entry.branche}</p>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', marginBottom: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{entry.beschreibung}</p>
                      <button style={{
                        color: '#93c5fd',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 200ms, transform 200ms',
                        padding: 0,
                      }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#bfdbfe'
                          e.currentTarget.style.transform = 'translateX(4px)'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#93c5fd'
                          e.currentTarget.style.transform = 'translateX(0)'
                        }}
                      >
                        Passt zu deiner Lösung? →
                      </button>
                    </motion.div>
                  ))
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
                      Keine Suchanfragen gefunden
                    </div>
                  )}
                </div>
              </div>

              {/* BIETE Section */}
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus style={{ width: '1.5rem', height: '1.5rem', color: '#c084fc' }} />
                  Partner & Lösungen
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filteredBieteEntries.length > 0 ? (
                    filteredBieteEntries.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      style={{
                        padding: '1.5rem',
                        borderRadius: '1.125rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 300ms',
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
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div>
                          <p style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.125rem' }}>{entry.name}</p>
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>{entry.timestamp}</span>
                        </div>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          backgroundColor: 'rgba(168, 85, 247, 0.2)',
                          color: '#d8b4fe',
                          border: '1px solid rgba(168, 85, 247, 0.3)',
                        }}>
                          {entry.technologie}
                        </span>
                      </div>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem', marginBottom: '1rem' }}>{entry.losung}</p>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <a
                          href={`mailto:${entry.email}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: '#93c5fd',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            transition: 'color 200ms',
                            textDecoration: 'none',
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.color = '#bfdbfe')}
                          onMouseOut={(e) => (e.currentTarget.style.color = '#93c5fd')}
                        >
                          <Mail style={{ width: '1rem', height: '1rem' }} />
                          Kontakt
                        </a>
                        {entry.website && (
                          <a
                            href={`https://${entry.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#93c5fd',
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              transition: 'color 200ms',
                              textDecoration: 'none',
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.color = '#bfdbfe')}
                            onMouseOut={(e) => (e.currentTarget.style.color = '#93c5fd')}
                          >
                            Website →
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
                      Keine Partner & Lösungen gefunden
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
