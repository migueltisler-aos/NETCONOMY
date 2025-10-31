import type { Metadata } from 'next'
import './globals.css'
import './utils.css'

export const metadata: Metadata = {
  title: 'Innovation Connect Berlin',
  description: 'Innovation Connect Berlin verbindet Bedarf, Kompetenz und Technologie in Echtzeit.',
  keywords: ['Innovation', 'Berlin', 'Technologie', 'Netzwerk', 'Matching'],
  authors: [{ name: 'Miguel Tisler' }],
  openGraph: {
    title: 'Innovation Connect Berlin',
    description: 'Innovation Connect Berlin verbindet Bedarf, Kompetenz und Technologie in Echtzeit.',
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
