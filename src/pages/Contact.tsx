import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Globe, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

const SERVICE_ID = 'service_gnizfwq'
const TEMPLATE_ID = 'template_lumoria_contact'
const PUBLIC_KEY = '2BUPqpQPgvYkZBETf'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Globe size={22} className="text-white" />
            <a href="/" className="text-white font-semibold text-lg">Lumoria</a>
            <div className="hidden md:flex items-center gap-8 ml-8">
              <a href="/web-design" className="text-white/70 hover:text-white transition-colors text-sm">Web Design</a>
              <a href="/sales-marketing" className="text-white/70 hover:text-white transition-colors text-sm">Marketing & Sales</a>
            </div>
          </div>
          <a href="/" className="liquid-glass rounded-full px-6 py-2 text-white text-sm">Home</a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">

        {/* Header */}
        <div className="mb-20 animate-blur-fade-up" style={{ animationDelay: '100ms' }}>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Contact</p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Laten we <em className="italic text-white/60">praten.</em>
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            Of je nu een website wil laten bouwen, je salesproces wil uitbesteden of gewoon meer wil weten — wij staan klaar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact form */}
          <div className="animate-blur-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="liquid-glass rounded-3xl p-8 md:p-10">
              <h2 className="text-white text-2xl mb-8 tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Stuur ons een bericht
              </h2>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <CheckCircle size={48} className="text-white/60" />
                  <p className="text-white text-xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Bericht verzonden!</p>
                  <p className="text-white/55 text-sm">We nemen zo snel mogelijk contact met je op.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 liquid-glass rounded-full px-6 py-2 text-white text-sm"
                  >
                    Nieuw bericht
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Naam</label>
                      <input
                        name="from_name"
                        type="text"
                        required
                        placeholder="Je naam"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">E-mail</label>
                      <input
                        name="from_email"
                        type="email"
                        required
                        placeholder="je@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Onderwerp</label>
                    <input
                      name="subject"
                      type="text"
                      placeholder="Waar gaat het over?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Bericht</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Vertel ons over jouw project of vraag..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400/80 text-sm">
                      <AlertCircle size={16} />
                      Er ging iets mis. Probeer het opnieuw of mail ons direct.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-full font-medium py-3 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {status === 'sending' ? 'Versturen...' : (
                      <><Send size={16} /> Verstuur bericht</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6 animate-blur-fade-up" style={{ animationDelay: '320ms' }}>
            {/* Address */}
            <div className="liquid-glass rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="liquid-glass rounded-full p-3 shrink-0">
                  <MapPin size={20} className="text-white/70" />
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Kantooradres</p>
                  <p className="text-white text-sm leading-relaxed">
                    Georgia, Tbilisi<br />
                    Saburtalo district<br />
                    Kukuri Gogiashvili I lane<br />
                    N8, floor N3, apartment N44
                  </p>
                </div>
              </div>
            </div>

            {/* What to expect */}
            <div className="liquid-glass rounded-3xl p-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Wat kun je verwachten</p>
              <ul className="space-y-4">
                {[
                  'Reactie binnen 24 uur op werkdagen',
                  'Gratis kennismakingsgesprek van 30 min',
                  'Geen verplichtingen, geen verborgen kosten',
                  'Direct antwoord van een echte persoon',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-white/60 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services quick links */}
            <div className="liquid-glass rounded-3xl p-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Onze diensten</p>
              <div className="space-y-3">
                {[
                  { label: 'Website laten bouwen', href: '/web-design' },
                  { label: 'Marketing & Sales', href: '/sales-marketing' },
                  { label: 'Over Lumoria', href: '/' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center justify-between text-white/60 hover:text-white text-sm py-2 border-b border-white/5 last:border-0 transition-colors group"
                  >
                    {label}
                    <span className="text-white/30 group-hover:text-white/60 transition-colors">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
