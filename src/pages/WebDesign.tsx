import { useRef, useEffect } from 'react'
import { Globe, ArrowRight, Monitor, Film, Box } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}

const SITE_TYPES = [
  {
    icon: Monitor,
    name: 'Statische Website',
    tagline: 'Snel. Scherp. Converterend.',
    description:
      "Een statische site is de snelste en meest betrouwbare optie voor bedrijven die een professionele online aanwezigheid willen zonder complexiteit. Perfect voor landingspagina's, portfolio's en bedrijfssites.",
    features: ['Bliksemsnelle laadtijd', 'SEO-geoptimaliseerd', 'Lage onderhoudskosten', 'Ideaal voor leads & conversie'],
    ideal: 'Startups, lokale bedrijven, professionals',
  },
  {
    icon: Film,
    name: 'Video Header Website',
    tagline: 'Visuele impact vanaf seconde één.',
    description:
      'Met een cinematische videohero grijp je de aandacht van elke bezoeker in de eerste seconde. Dit type combineert krachtige visuals met een heldere boodschap — perfect voor merken die willen indruk maken.',
    features: ['Filmisch intro-effect', 'Liquid glass design', 'Smooth scroll animaties', 'Mobiel geoptimaliseerd'],
    ideal: 'Agencies, luxury brands, creatieve studios',
  },
  {
    icon: Box,
    name: '3D Interactive Website',
    tagline: 'De toekomst van webdesign, nu.',
    description:
      'Een volledig interactieve 3D-ervaring die bezoekers meeneemt in jouw wereld. Met WebGL en Three.js bouwen wij unieke digitale omgevingen die nergens anders te vinden zijn — een website die mensen onthouden.',
    features: ['WebGL & Three.js', 'Unieke brand-ervaring', 'Interactieve 3D-elementen', 'Onderscheidend vermogen'],
    ideal: 'Tech-bedrijven, innovators, premium merken',
  },
]

const PROCESS = [
  { step: '01', title: 'Discovery', body: 'Wij duiken in jouw merk, doelen en doelgroep. Geen standaard templates — elk project begint bij het waarom.' },
  { step: '02', title: 'Design', body: 'Van wireframe tot pixel-perfect design. Jij ziet elke stap en geeft feedback voordat er een regel code geschreven wordt.' },
  { step: '03', title: 'Development', body: 'Wij bouwen met moderne technologie: React, Vite, Tailwind. Snel, schaalbaar en toekomstbestendig.' },
  { step: '04', title: 'Launch & Support', body: 'Na de lancering laten wij je niet los. We monitoren, optimaliseren en staan klaar voor aanpassingen.' },
]

export default function WebDesign() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  function cancelRaf() {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }

  function fadeOpacity(video: HTMLVideoElement, from: number, to: number, duration: number, onDone?: () => void) {
    cancelRaf()
    const start = performance.now()
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1)
      video.style.opacity = String(from + (to - from) * t)
      if (t < 1) { rafRef.current = requestAnimationFrame(step) } else { rafRef.current = null; onDone?.() }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.style.opacity = '0'
    function onCanPlay() { video!.play().catch(() => {}); fadeOpacity(video!, 0, 1, 500) }
    function onTimeUpdate() {
      if (!video || fadingOutRef.current) return
      if (video.duration - video.currentTime <= 0.55) {
        fadingOutRef.current = true
        fadeOpacity(video, parseFloat(video.style.opacity || '1'), 0, 500)
      }
    }
    function onEnded() {
      if (!video) return
      video.style.opacity = '0'; fadingOutRef.current = false
      setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}); fadeOpacity(video, 0, 1, 500) }, 100)
    }
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
      cancelRaf()
    }
  }, [])

  return (
    <div className="bg-black" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Hero */}
      <div className="min-h-screen relative flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
          style={{ opacity: 0 }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
          muted autoPlay playsInline preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-2">
              <Globe size={22} className="text-white" />
              <a href="/" className="text-white font-semibold text-lg">Lumoria</a>
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a href="/sales-marketing" className="text-white/70 hover:text-white transition-colors text-sm">Marketing & Sales</a>
                <a href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">Contact</a>
              </div>
            </div>
            <a href="/contact" className="liquid-glass rounded-full px-6 py-2 text-white text-sm">Gratis gesprek</a>
          </div>
        </nav>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
          <div className="animate-blur-fade-up mb-6" style={{ animationDelay: '100ms' }}>
            <span className="liquid-glass rounded-full px-5 py-2 text-white/50 text-xs tracking-widest uppercase">
              Web Development
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6 animate-blur-fade-up"
            style={{ fontFamily: "'Instrument Serif', serif", animationDelay: '200ms' }}
          >
            Websites gebouwd<br />voor de <em className="italic text-white/60">curious.</em>
          </h1>
          <p className="text-white/55 text-lg md:text-xl max-w-xl leading-relaxed mb-10 animate-blur-fade-up" style={{ animationDelay: '320ms' }}>
            Wij bouwen drie types websites — elk ontworpen voor maximale impact.
          </p>
          <a
            href="/contact"
            className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-8 py-3 hover:bg-white/90 transition-colors animate-blur-fade-up"
            style={{ animationDelay: '420ms' }}
          >
            Bespreek jouw project <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* 3 Site Types */}
      <section className="bg-black py-28 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeSection className="mb-20">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Wat wij bouwen</p>
            <h2 className="text-4xl md:text-6xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Drie types.<br /><em className="italic text-white/60">Één standaard: uitmuntend.</em>
            </h2>
          </FadeSection>

          <div className="space-y-8">
            {SITE_TYPES.map(({ icon: Icon, name, tagline, description, features, ideal }, i) => (
              <FadeSection key={name}>
                <div className="liquid-glass rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="liquid-glass rounded-2xl p-4">
                        <Icon size={28} className="text-white/70" />
                      </div>
                      <div>
                        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Type {String(i + 1).padStart(2, '0')}</p>
                        <h3 className="text-white text-2xl md:text-3xl tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>{name}</h3>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm italic mb-4">{tagline}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{description}</p>
                    <p className="text-white/30 text-xs tracking-widest uppercase mt-6">Ideaal voor</p>
                    <p className="text-white/50 text-sm mt-1">{ideal}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Kenmerken</p>
                    <ul className="space-y-3">
                      {features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-white/65 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="/contact" className="inline-flex items-center gap-2 mt-8 liquid-glass rounded-full px-6 py-2.5 text-white text-sm hover:bg-white/5 transition-colors">
                      Meer info <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-black py-28 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeSection className="mb-20">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Hoe wij werken</p>
            <h2 className="text-4xl md:text-6xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Ons proces
            </h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROCESS.map(({ step, title, body }) => (
              <FadeSection key={step}>
                <div className="liquid-glass rounded-3xl p-8">
                  <p className="text-white/20 text-5xl font-light mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>{step}</p>
                  <h3 className="text-white text-xl mb-3 tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{body}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="liquid-glass rounded-3xl p-10 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl text-white tracking-tight mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Welk type past bij jou?
              </h2>
              <p className="text-white/55 text-base leading-relaxed max-w-lg mx-auto mb-8">
                Plan een gratis gesprek en wij adviseren je welk type website het beste aansluit bij jouw doelen en budget.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 bg-white text-black rounded-full font-medium px-8 py-3 hover:bg-white/90 transition-colors text-sm">
                Plan een gratis gesprek <ArrowRight size={16} />
              </a>
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  )
}
