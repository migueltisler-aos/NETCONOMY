'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Microscope, Lightbulb, Users } from 'lucide-react'

interface Actor {
  actor_id: number
  name: string
  type: string
  topic: string
  district: string
}

const typeIcons = {
  Forschung: Microscope,
  Unternehmen: Building2,
  Experte: Lightbulb,
  Institution: Users,
}

export default function NetworkMap() {
  const [actors, setActors] = useState<Actor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cluster')
      .then((res) => res.json())
      .then((data) => {
        setActors(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching cluster:', error)
        setLoading(false)
      })
  }, [])

  const groupedByDistrict = useMemo(() => {
    const buckets = actors.reduce<Record<string, number>>((acc, actor) => {
      const key = actor.district || 'Sonstiges'
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {})
    return Object.entries(buckets)
      .map(([district, count]) => ({ district, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
  }, [actors])

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),transparent_65%)]" />
      <div className="container relative z-10 space-y-14">
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/65 md:self-start">
            Netzwerkatlas
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold text-white sm:text-5xl">
                Berlin Innovation Network
              </h2>
              <p className="max-w-2xl text-base text-white/65 sm:text-lg">
                Eine kuratierte Karte aus Forschung, Unternehmen, Startups und Institutionen. Jede Karte steht fuer ein echtes Projekt mit Ansprechpartnern.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_24px_80px_rgba(8,13,35,0.55)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Top Bezirke</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {groupedByDistrict.map((item) => (
                  <div key={item.district} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
                    <span>{item.district}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid h-72 place-items-center rounded-3xl border border-white/10 bg-white/5 text-sm text-white/50">
            Lade Netzwerk ...
          </div>
        ) : actors.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-white/10 bg-white/5 py-20 text-white/60">
            Noch keine Akteure hinterlegt.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {actors.map((actor, index) => {
              const IconComponent = typeIcons[actor.type as keyof typeof typeIcons] || Building2
              return (
                <motion.div
                  key={actor.actor_id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1124]/80 p-6 shadow-[0_24px_70px_rgba(4,7,20,0.55)] backdrop-blur-2xl"
                >
                  <div className="absolute inset-px rounded-[26px] bg-gradient-to-br from-white/4 via-white/0 to-white/0 opacity-0 transition group-hover:opacity-100" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/40 to-purple-500/30 text-white">
                          <IconComponent className="h-5 w-5" />
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
                          {actor.type}
                        </span>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                        {actor.district || 'Berlin'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">{actor.name}</p>
                      {actor.topic && (
                        <p className="mt-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                          {actor.topic}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </motion.section>
  )
}
