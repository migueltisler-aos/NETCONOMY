'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      marginTop: '6rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: '#050916',
      paddingTop: '4rem',
      paddingBottom: '4rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* About */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#ffffff',
                margin: '0 0 0.5rem 0'
              }}>
                Miguel Tisler
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0,
                fontStyle: 'italic'
              }}>
                Senior Consultant – Operational Transformation
              </p>
            </div>
            <p style={{
              maxWidth: '18rem',
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.55)',
              lineHeight: '1.6'
            }}>
              €15M+ operational transformation. From legacy systems to AI-native, self-learning organizations.
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
              🚀 NETCONOMY
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0
            }}>
              Portfolio
            </h4>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.55)',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li>
                <a href="#stories" style={{
                  transition: 'color 200ms',
                  color: 'inherit',
                  textDecoration: 'none'
                }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}>
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#chat" style={{
                  transition: 'color 200ms',
                  color: 'inherit',
                  textDecoration: 'none'
                }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}>
                  Miguel's Mind
                </a>
              </li>
              <li>
                <a href="https://github.com/migueltisler-aos/NETCONOMY" target="_blank" rel="noopener noreferrer" style={{
                  transition: 'color 200ms',
                  color: 'inherit',
                  textDecoration: 'none'
                }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}>
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.6)',
              margin: 0
            }}>
              Get in Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <a href="mailto:miguel.tisler@gmx.de" style={{
                color: 'rgba(255, 255, 255, 0.55)',
                textDecoration: 'none',
                transition: 'color 200ms'
              }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}>
                📧 miguel.tisler@gmx.de
              </a>
              <a href="tel:+4917787956337" style={{
                color: 'rgba(255, 255, 255, 0.55)',
                textDecoration: 'none',
                transition: 'color 200ms'
              }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}>
                📞 0177 - 879 56 37
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://github.com/migueltisler-aos" icon={Github} label="GitHub" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1.5rem',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} Miguel Tisler. Senior Consultant - Operational Transformation.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <a href="#" style={{
              transition: 'color 200ms',
              color: 'inherit',
              textDecoration: 'none'
            }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}>
              Privacy
            </a>
            <a href="#" style={{
              transition: 'color 200ms',
              color: 'inherit',
              textDecoration: 'none'
            }} onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)')}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
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
      target="_blank"
      rel="noopener noreferrer"
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
