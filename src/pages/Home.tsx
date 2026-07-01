import { useState } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Our Approach', href: '/sales-marketing' },
  { label: 'Web Design', href: '/web-design' },
  { label: 'Contact', href: '/contact' },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background video */}
      <video
        className="fixed inset-0 w-full h-full object-cover object-[center_20%] md:object-center"
        style={{ zIndex: 0, transform: 'scale(1)', transformOrigin: 'center top' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
        autoPlay muted loop playsInline
      />

      {/* Bottom blur overlay */}
      <div
        className="fixed inset-0 pointer-events-none backdrop-blur-xl"
        style={{
          zIndex: 1,
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
        }}
      />

      {/* Gradient for readability */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }}
      />

      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 10 }}>

        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 md:px-12 py-6">
          <a href="/" className="text-white font-semibold text-xl tracking-widest animate-blur-fade-up" style={{ animationDelay: '0ms' }}>
            LUMORIA
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                className="text-white/80 text-sm hover:text-white transition-colors animate-blur-fade-up"
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden lg:flex liquid-glass rounded-full px-6 py-2 text-white text-sm animate-blur-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              Free consultation
            </a>
            <button
              className="flex lg:hidden liquid-glass rounded-full w-10 h-10 items-center justify-center text-white animate-blur-fade-up"
              style={{ animationDelay: '300ms' }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`absolute transition-all duration-300 ${menuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}><X size={18} /></span>
              <span className={`absolute transition-all duration-300 ${menuOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}><Menu size={18} /></span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-[80px] lg:hidden liquid-glass border-t border-white/10 px-6 py-4 flex flex-col gap-3" style={{ zIndex: 40 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="text-white py-2 text-sm">{label}</a>
            ))}
            <a href="/contact" className="mt-2 text-center liquid-glass rounded-full px-6 py-2 text-white text-sm">Free consultation</a>
          </div>
        )}

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-8 pb-32">
          <div className="animate-blur-fade-up mb-8" style={{ animationDelay: '200ms' }}>
            <span className="liquid-glass rounded-full px-5 py-2 text-white/60 text-xs tracking-widest uppercase">
              Lumen · Aura · Purpose
            </span>
          </div>

          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white mb-6 animate-blur-fade-up"
            style={{ letterSpacing: '-0.04em', animationDelay: '300ms', fontFamily: "'Instrument Serif', serif" }}
          >
            Lumoria
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-white/60 mb-4 max-w-2xl leading-relaxed animate-blur-fade-up"
            style={{ animationDelay: '420ms', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
          >
            Where inner light becomes business impact.
          </p>

          <p
            className="text-sm md:text-base text-white/45 mb-12 max-w-xl leading-relaxed animate-blur-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            Lumoria is composed of <em className="text-white/65 not-italic">Lumen</em> — the Latin word for light — and <em className="text-white/65 not-italic">Aura</em>, the energetic presence every entity radiates. Together they stand for <em className="text-white/65 not-italic">enlightened presence with business force</em>. We bring that philosophy to every website we build and every sales system we create.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-blur-fade-up" style={{ animationDelay: '600ms' }}>
            <a href="/contact" className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-8 py-3 hover:bg-white/90 transition-colors">
              Get Started <ChevronRight size={18} />
            </a>
            <a href="/sales-marketing" className="liquid-glass rounded-full font-medium text-white px-8 py-3 hover:bg-white/5 transition-colors">
              Sales & Marketing
            </a>
          </div>
        </div>

        {/* Philosophy strip */}
        <div className="relative px-6 md:px-12 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'Lumen — Light',
                body: 'We bring clarity to your brand, strategy and market position. No noise, no ambiguity — only focus on what works.',
              },
              {
                label: 'Aura — Presence',
                body: 'A strong brand radiates without shouting. We create digital presences that people feel before they read.',
              },
              {
                label: 'Purpose — Direction',
                body: 'Every business has a why. We translate that into websites, sales processes and growth that endures.',
              },
            ].map(({ label, body }, i) => (
              <div
                key={label}
                className="liquid-glass rounded-3xl p-8 animate-blur-fade-up"
                style={{ animationDelay: `${700 + i * 120}ms` }}
              >
                <p className="text-white/40 text-xs tracking-widest uppercase mb-3">{label}</p>
                <p className="text-white/75 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
