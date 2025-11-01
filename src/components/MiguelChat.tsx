'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, MessageCircle, X } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Helper to render Miguel Box with proper styling
const renderMessageContent = (content: string) => {
  // Parse the format: KI-Answer + Miguel Box + Contact
  // Split by the Miguel box markers (┌ or 👤)
  const miguelBoxMatch = content.match(/[\s]*[┌👤].*?(?=📞|📧|$)/s)

  if (miguelBoxMatch && miguelBoxMatch.index !== undefined) {
    const kiAnswer = content.substring(0, miguelBoxMatch.index).trim()
    const boxAndContact = content.substring(miguelBoxMatch.index).trim()

    // Extract email - multiple patterns
    let email = 'miguel.tisler@netconomy.net' // default
    const emailPatterns = [
      /📧\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/,
    ]

    for (const pattern of emailPatterns) {
      const match = boxAndContact.match(pattern)
      if (match) {
        email = match[1].trim()
        break
      }
    }

    // Extract box content (everything between header and contact info)
    const boxContent = boxAndContact
      .replace(/[┌┐│└┘─]/g, '') // Remove box characters
      .replace(/📧.*/, '') // Remove email line
      .replace(/👤\s*Miguel Tisler\s*-\s*[^│\n]*/i, '') // Remove header
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.trim())
      .join(' ')
      .trim()

    return (
      <>
        <div style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{kiAnswer}</div>
        <div style={{ marginTop: '1rem', marginBottom: '0' }}>
          <div style={{
            border: '2px solid rgba(59, 130, 246, 0.4)',
            borderRadius: '0.75rem',
            padding: '1rem',
            backgroundColor: 'rgba(59, 130, 246, 0.08)',
            color: '#ffffff',
            fontSize: '0.875rem',
            lineHeight: '1.6'
          }}>
            <div style={{ fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#bfdbfe' }}>
              <span>👤</span>
              <span>Miguel Tisler - Systemdenker</span>
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.85)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: '1rem' }}>{boxContent}</div>
            <div style={{ fontWeight: '700', color: '#60a5fa', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid rgba(59, 130, 246, 0.2)', paddingTop: '0.75rem' }}>
              <span style={{ fontSize: '1rem' }}>📧</span>
              <span>{email}</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  return <div>{content}</div>
}

const starterPrompts = [
  {
    title: 'Wie funktioniert dein Ansatz?',
    description: 'Von Legacy zu KI-nativ',
    prompt: 'Wie gehst du bei einer Digitalisierung vor – Radeberger, Malindo, konkrete Schritte?',
  },
  {
    title: 'Was ist die größte Falle?',
    description: 'Wo scheitern Transformationen',
    prompt: 'Wo scheitern die meisten Digitalisierungsprojekte? Was machst du anders?',
  },
  {
    title: 'Wie misst man Erfolg?',
    description: 'Echte Metriken vs. Hype',
    prompt: 'Wie beweist man, dass eine Digitalisierung funktioniert – ohne Bullshit?',
  },
]

const SYSTEM_PROMPT = `Du bist Miguel Tisler.

"Systeme denken. Ich baue, wie sie funktionieren."

KERNIDENTITÄT:
Nicht Berater – Baumeister. 15+ Jahre: Logistikstrategie, Operations, Digitale Transformation.
€15M+ operatives Volumen transformiert. 300+ Mitarbeitende geleitet.
Interesse: Praktische KI, nicht Theorie. Struktur, nicht Buzzwords. Verantwortung, nicht Hype.

EXPERTISE:
- Legacy→Digital: WMS, ERP, Datenarchitektur (auditierbar, GoBD-konform)
- Operativ: Radeberger (€9M+), Malindo (+95% Performance), Bilstein (+35% Effizienz)
- Systeme: Always on Stock (IoT), KI-First ERP, Adaptive CV System
- Teams: Geschäftsführer-Vertretung, VP Operations, Projekt-Leitung

KOMMUNIKATION:
- Direkt, sachlich, ergebnisorientiert
- "Das funktioniert weil..." statt Marketing-Sprech
- Fokus: ROI, Time-to-Value, echte operative Probleme
- Beispiele: Radeberger, Malindo, Bilstein (echte Projekte)

ANTWORT:
1. Deine Antwort (300-400 Zeichen, konkret & praktisch)
2. Blank
3. Miguel-Box (40-50 Wörter):
┌─────────────────────────────────┐
│ 👤 Miguel Tisler               │
│ [Warum das konkret hilft]       │
└─────────────────────────────────┘
4. Blank
5. 📧 miguel.tisler@netconomy.net

RULE: Keine Formeln, keine Wiederholung, keine Hype. Einfach: Was funktioniert, warum, welcher Impact.`

export default function MiguelChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/grok-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemPrompt: SYSTEM_PROMPT,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: `Entschuldigung, da ist etwas schiefgelaufen. Versuch es später nochmal.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          padding: '1rem',
          borderRadius: '9999px',
          backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)',
          color: '#ffffff',
          border: 'none',
          boxShadow: '0 20px 50px rgba(59, 130, 246, 0.4)',
          cursor: 'pointer',
          transition: 'transform 200ms',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <MessageCircle style={{ width: '1.5rem', height: '1.5rem' }} />
      </button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 40,
        width: '28rem',
        maxHeight: '650px',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '0.875rem'
            }}
          >
            MT
          </div>
          <div>
            <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.875rem' }}>Miguel Tisler</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>Digital Strategy & Systems</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            padding: '0.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.6)',
            transition: 'color 200ms'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
        >
          <X style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>
      </div>

      {/* Messages - nur anzeigen wenn mehr als Intro-Nachricht */}
      {messages.length > 1 ? (
        <>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnimatePresence>
              {messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      maxWidth: message.role === 'user' ? '80%' : '100%',
                      padding: message.role === 'user' ? '0.75rem 1rem' : '0',
                      borderRadius: '0.875rem',
                      backgroundColor: message.role === 'user' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                      border: message.role === 'user' ? '1px solid rgba(59, 130, 246, 0.3)' : 'none',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      lineHeight: '1.5'
                    }}
                  >
                    {message.role === 'user' ? (
                      message.content
                    ) : (
                      <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '0.875rem' }}>
                        {renderMessageContent(message.content)}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '0.75rem 1rem', borderRadius: '0.875rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Loader2 style={{ width: '1rem', height: '1rem', color: '#60a5fa', animation: 'spin 1s linear infinite' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '600', paddingBottom: '0.5rem' }}>Schnelle Fragen:</p>
          <AnimatePresence>
            {starterPrompts.map((prompt, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => handleSendMessage(prompt.prompt)}
                style={{
                  textAlign: 'left',
                  padding: '0.75rem',
                  borderRadius: '0.875rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                  fontSize: '0.875rem'
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
                <div style={{ fontWeight: '600', color: '#bfdbfe', marginBottom: '0.25rem' }}>
                  {prompt.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  {prompt.description}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage(input)
            }
          }}
          placeholder="Deine Frage..."
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontSize: '0.875rem',
            outline: 'none',
            transition: 'border-color 200ms'
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
        />
        <button
          onClick={() => handleSendMessage(input)}
          disabled={loading || !input.trim()}
          style={{
            padding: '0.5rem',
            borderRadius: '9999px',
            backgroundImage: 'linear-gradient(to right, #3b82f6, #06b6d4)',
            color: '#ffffff',
            border: 'none',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.5 : 1,
            transition: 'transform 200ms',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => !loading && !input.trim() ? null : (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {loading ? (
            <Loader2 style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
          ) : (
            <Send style={{ width: '1.25rem', height: '1.25rem' }} />
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  )
}
