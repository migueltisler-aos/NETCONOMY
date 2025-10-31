'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ position: 'relative', marginTop: '6rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: '#050916', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10, display: 'grid', gap: '3rem', gridTemplateColumns: '1.3fr 0.7fr 0.7fr 0.7fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              display: 'grid',
              placeItems: 'center',
              width: '3rem',
              height: '3rem',
              borderRadius: '0.5rem',
              backgroundImage: 'linear-gradient(to bottom right, #6366f1, #a855f7, #ec4899)',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#ffffff',
            }}>
              IC
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.112em', color: 'rgba(255, 255, 255, 0.45)' }}>Berlin Partner</p>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#ffffff' }}>Innovation Connect</p>
            </div>
          </div>
          <p style={{ maxWidth: '14rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.55)' }}>
            Ein Operating System fuer Innovation in Berlin. Wir verbinden Bedarf, Technologie, Kapital und Menschen in Echtzeit und begleiten Projekte von der Idee bis zum Deployment.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '0.75rem 1.25rem',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.6)',
            width: 'fit-content',
          }}>
            Made in Berlin
          </div>
        </div>

        <FooterColumn
          title="Navigation"
          links={[
            { label: 'DigiTech Monitor', href: '#trends' },
            { label: 'Innovation Network', href: '#network' },
            { label: 'Matching Assistent', href: '#matching' },
          ]}
        />
        <FooterColumn
          title="Ressourcen"
          links={[
            { label: 'Use Case Library', href: '#' },
            { label: 'Partner API', href: '#' },
            { label: 'Event Kalender', href: '#' },
          ]}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.6)' }}>Kontakt</h4>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.55)' }}>
            Kuratorinnen-Team Innovation Connect Berlin Partner
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <SocialLink href="mailto:innovation@berlin-partner.de" icon={Mail} label="Mail" />
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="#" icon={Github} label="GitHub" />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', marginTop: '3rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.5rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.45)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p>&copy; {new Date().getFullYear()} Innovation Connect Berlin. Alle Rechte vorbehalten.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <a href="#" style={{ transition: 'color 200ms', color: 'inherit', textDecoration: 'none' }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}>Datenschutz</a>
            <a href="#" style={{ transition: 'color 200ms', color: 'inherit', textDecoration: 'none' }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}>Impressum</a>
            <a href="#" style={{ transition: 'color 200ms', color: 'inherit', textDecoration: 'none' }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}>Nutzungsbedingungen</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h4 style={{ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.6)' }}>{title}</h4>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.55)', listStyle: 'none', padding: 0, margin: 0 }}>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} style={{ transition: 'color 200ms', color: 'inherit', textDecoration: 'none' }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: typeof Mail
  label: string
}) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '0.75rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: '#ffffff',
        transition: 'all 200ms',
        textDecoration: 'none',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
      }}
    >
      <Icon style={{ width: '1rem', height: '1rem' }} />
    </a>
  )
}
