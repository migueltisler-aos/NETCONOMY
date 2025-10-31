'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChartCandlestick, Cpu, Network } from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

interface TrendItem {
  name: string
  value: number
}

const snapshot = [
  { icon: Cpu, label: 'AI Initiativen', value: '28', detail: '+9 aktiv seit Q2' },
  { icon: Network, label: '5G Testbeds', value: '11', detail: '4 neue Partnerschaften' },
  { icon: ChartCandlestick, label: 'Deep Tech Deals', value: 'EUR 420M', detail: '+32% YoY' },
]

export default function DigiTechMonitor() {
  const [trends, setTrends] = useState<TrendItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/trends')
      .then((res) => res.json())
      .then((data) => {
        setTrends(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching trends:', error)
        setLoading(false)
      })
  }, [])

  return (
    <motion.section
      id="trends"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="container relative z-10 space-y-12">
        <div className="flex flex-col gap-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 md:self-start">
            Realtime Insights
          </div>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold text-white sm:text-5xl">
                Digital Tech Monitor
              </h2>
              <p className="max-w-2xl text-base text-white/65 sm:text-lg">
                Ein konsolidierter Blick auf die wichtigsten Technologiebewegungen in Berlin: Kapital, Cluster, neue Partnerschaften und Pilotprojekte.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Datenstand live aus dem Innovation Operating System
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-[#0b1124]/80 p-8 shadow-[0_32px_80px_rgba(3,7,18,0.6)] backdrop-blur-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/45">Tech Traction</p>
                <p className="mt-3 text-3xl font-semibold text-white">Trend Score</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-semibold text-emerald-300">
                +12% im Vergleich zur Vorwoche
              </div>
            </div>
            <div className="mt-10 h-80 w-full">
              {loading ? (
                <div className="grid h-full place-items-center text-sm text-white/50">
                  Lade Daten ...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trends}>
                    <defs>
                      <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.7} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148, 163, 184, 0.1)" strokeDasharray="3 6" />
                    <XAxis dataKey="name" stroke="rgba(248, 250, 252, 0.45)" tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: '#0f172a',
                        borderRadius: '16px',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        color: '#f8fafc',
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} fill="url(#trendGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="grid gap-5">
            {snapshot.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_60px_rgba(10,12,28,0.45)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-rose-500/30 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/55">{item.label}</p>
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-emerald-200/80">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
