import { useRef, useState } from 'react'
import { Globe, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    const data = new FormData(formRef.current)
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('from_name'),
          email: data.get('from_email'),
          subject: data.get('subject') || 'New contact form submission',
          message: data.get('message'),
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        formRef.current.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: "'Inter', sans-serif" }}>

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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">

        {/* Header */}
        <div className="mb-20 animate-blur-fade-up" style={{ animationDelay: '100ms' }}>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Contact</p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Let's <em className="italic text-white/60">talk.</em>
          </h1>
          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            Whether you want a new website, want to outsource your sales, or just want to learn more — we are here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <div className="animate-blur-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="liquid-glass rounded-3xl p-8 md:p-10">
              <h2 className="text-white text-2xl mb-8 tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Send us a message
              </h2>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <CheckCircle size={48} className="text-white/60" />
                  <p className="text-white text-xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Message sent!</p>
                  <p className="text-white/55 text-sm">We will get back to you as soon as possible.</p>
                  <button onClick={() => setStatus('idle')} className="mt-4 liquid-glass rounded-full px-6 py-2 text-white text-sm">
                    New message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Name</label>
                      <input
                        name="from_name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Email</label>
                      <input
                        name="from_email"
                        type="email"
                        required
                        placeholder="you@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Subject</label>
                    <input
                      name="subject"
                      type="text"
                      placeholder="What is it about?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase block mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project or question..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400/80 text-sm">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-full font-medium py-3 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {status === 'sending' ? 'Sending...' : <><Send size={16} /> Send message</>}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6 animate-blur-fade-up" style={{ animationDelay: '320ms' }}>
            <div className="liquid-glass rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="liquid-glass rounded-full p-3 shrink-0">
                  <MapPin size={20} className="text-white/70" />
                </div>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Office address</p>
                  <p className="text-white text-sm leading-relaxed">
                    Georgia, Tbilisi<br />
                    Saburtalo district<br />
                    Kukuri Gogiashvili I lane<br />
                    N8, floor N3, apartment N44
                  </p>
                </div>
              </div>
            </div>

            <div className="liquid-glass rounded-3xl p-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6">What to expect</p>
              <ul className="space-y-4">
                {[
                  'Response within 24 hours on business days',
                  'Free 30-minute introductory call',
                  'No obligations, no hidden costs',
                  'Direct reply from a real person',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-white/60 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="liquid-glass rounded-3xl p-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Our services</p>
              <div className="space-y-3">
                {[
                  { label: 'Build a website', href: '/web-design' },
                  { label: 'Marketing & Sales', href: '/sales-marketing' },
                  { label: 'About Lumoria', href: '/' },
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
