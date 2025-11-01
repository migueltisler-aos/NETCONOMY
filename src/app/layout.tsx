import type { Metadata } from 'next'
import './globals.css'
import './utils.css'

export const metadata: Metadata = {
  title: 'Bewerbung Miguel Tisler – Senior Digital Strategy Consultant',
  description: '€60M+ Logistik gesteuert. 15+ Jahre operative Exzellenz in Digital Strategy, Turnarounds und Kostenreduktion. Logistikleiter:innen-Panel Logistics Summit 2020 & 2021.',
  keywords: ['Digital Strategy', 'Operational Transformation', 'Logistik', 'Business Model', 'Digital Transformation', 'Miguel Tisler', 'NETCONOMY'],
  authors: [{ name: 'Miguel Tisler' }],
  openGraph: {
    title: 'Bewerbung Miguel Tisler – Senior Digital Strategy Consultant',
    description: '€60M+ Logistik gesteuert. 15+ Jahre operative Exzellenz in Digital Strategy, Turnarounds und Kostenreduktion.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="min-h-screen bg-transparent text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  )
}
