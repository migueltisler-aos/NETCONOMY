'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Landmark,
  Loader2,
  Microscope,
  Sparkles,
  Users,
} from 'lucide-react'

interface Match {
  actor_id: number
  name: string
  type: string
  topic?: string
  district?: string
}

interface MatchingResponse {
  aiResponse: string
  matches: Match[]
  structured_data: {
    rolle: string
    bedarf: string
    themenfeld: string | string[]
    status: string
  }
  saved: boolean
  needId: string
}

const typeIcons = {
  Forschung: Microscope,
  Unternehmen: Building2,
  Experte: Sparkles,
  Institution: Landmark,
} as const

export default function MatchingChat() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState<MatchingResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setError(null)

    try {
      const result = await fetch('/api/matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      }).then((res) => res.json())

      if (result.error) {
        setError(result.error)
        setResponse(null)
      } else {
        setResponse(result)
      }
    } catch (err) {
      console.error('Matching error:', err)
      setError('Verbindungsfehler. Bitte versuche es nochmal.')
      setResponse(null)
    } finally {
      setLoading(false)
    }
  }

  const themenfeldArray = response?.structured_data.themenfeld
    ? Array.isArray(response.structured_data.themenfeld)
      ? response.structured_data.themenfeld
      : [response.structured_data.themenfeld]
    : []

  return (
    <section className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.12),transparent_60%)]" />
      <div className="container relative z-10 grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/65">
              Matching Assistent
            </div>
            <h2 className="text-4xl font-semibold text-white sm:text-5xl">
              Stelle deine Herausforderung vor und erhalte ein kuratiertes Berlin Partner Match.
            </h2>
            <p className="max-w-2xl text-base text-white/65 sm:text-lg">
              Beschreibe Rolle, Bedarf und Zielsetzung. Unser KI-gestuetzter Kurator erstellt ein strukturiertes Profil, filtert das Netzwerk und verbindet dich mit den passenden Partnern.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="space-y-4 rounded-3xl border border-white/10 bg-[#0d142c]/80 p-8 shadow-[0_32px_80px_rgba(5,8,25,0.65)] backdrop-blur-2xl"
          >
            <label htmlFor="matching-input" className="text-xs uppercase tracking-[0.35em] text-white/45">
              Deine Anfrage
            </label>
            <textarea
              id="matching-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Beispiel: Wir sind ein Mittelstaendler aus Adlershof und suchen Partner fuer einen Edge-AI Pilot in der Produktion..."
              className="h-40 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/85 outline-none transition focus:border-white/30"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/45">
                Antworten erfolgen innerhalb von Minuten. Berlin Partner Kuratorinnen pruefen jede Anfrage.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_18px_60px_rgba(99,102,241,0.45)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Wird analysiert
                  </>
                ) : (
                  <>
                    Anfrage senden
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </motion.form>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: 'Analyse', description: 'KI strukturiert deine Anfrage in wenige Sekunden.' },
              { title: 'Match', description: 'Kuratorinnen validieren Vorschlaege und priorisieren die besten Optionen.' },
              { title: 'Connect', description: 'Du erhaeltst direkte Kontakte und Unterstuetzung beim Kick-off.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-white/65">
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">{item.title}</p>
                <p className="mt-3 text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {response && (
              <motion.div
                key={response.needId}
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 32, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-emerald-300/30 bg-emerald-500/10 p-6 text-sm text-emerald-100 shadow-[0_28px_70px_rgba(16,185,129,0.25)]">
                  <div className="flex items-center gap-3 font-semibold">
                    <CheckCircle2 className="h-5 w-5" />
                    Matching erstellt · ID {response.needId}
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <InfoBadge label="Rolle" value={response.structured_data.rolle} />
                    <InfoBadge label="Bedarf" value={response.structured_data.bedarf} />
                    <InfoBadge label="Status" value={response.structured_data.status} />
                    {themenfeldArray.length > 0 && (
                      <InfoBadge label="Themenfeld" value={themenfeldArray.join(' · ')} />
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.45 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-[0_32px_90px_rgba(6,10,29,0.55)] backdrop-blur-2xl"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-rose-200" />
                    <p className="text-xs uppercase tracking-[0.35em] text-white/45">Kurator Snapshot</p>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-white/75 whitespace-pre-wrap">
                    {response.aiResponse}
                  </p>
                </motion.div>

                {response.matches.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="space-y-4"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <Users className="h-5 w-5 text-white/60" />
                      <h3 className="text-xl font-semibold text-white">Empfohlene Partner</h3>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
                        {response.matches.length} Match{response.matches.length > 1 ? 'es' : ''}
                      </span>
                    </div>

                    <div className="grid gap-4">
                      {response.matches.map((match, index) => {
                        const IconComponent = typeIcons[match.type as keyof typeof typeIcons] ?? Users
                        return (
                          <motion.div
                            key={match.actor_id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="rounded-3xl border border-white/10 bg-[#0d142c]/75 p-6 shadow-[0_24px_70px_rgba(7,10,30,0.5)] backdrop-blur-xl"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex items-center gap-4">
                                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-rose-500/30 text-white">
                                  <IconComponent className="h-5 w-5" />
                                </span>
                                <div>
                                  <p className="text-lg font-semibold text-white">{match.name}</p>
                                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">{match.type}</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                                {match.topic && (
                                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                                    {match.topic}
                                  </span>
                                )}
                                {match.district && (
                                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/60">
                                    {match.district}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45 }}
                    className="flex items-center gap-3 rounded-3xl border border-amber-300/30 bg-amber-500/10 px-6 py-5 text-sm text-amber-100"
                  >
                    <AlertCircle className="h-5 w-5" />
                    Keine direkten Matches gefunden. Das Kuratoren-Team meldet sich mit individuellen Vorschlaegen.
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/80">
      <p className="uppercase tracking-[0.35em] text-white/45">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  )
}
