import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, ArrowRight, Instagram, Twitter, ArrowUpRight } from 'lucide-react'

/* ── Video with fade loop ── */
function FadeVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  function cancelRaf() {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }

  function fadeOpacity(video: HTMLVideoElement, from: number, to: number, duration: number, onDone?: () => void) {
    cancelRaf()
    const start = performance.now()
    const step = (now: number) => {
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
    const onCanPlay = () => { video.play().catch(() => {}); fadeOpacity(video, 0, 1, 500) }
    const onTimeUpdate = () => {
      if (!video || fadingOutRef.current) return
      if (video.duration - video.currentTime <= 0.55) {
        fadingOutRef.current = true
        fadeOpacity(video, parseFloat(video.style.opacity || '1'), 0, 500)
      }
    }
    const onEnded = () => {
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

  return <video ref={videoRef} src={src} muted autoPlay playsInline preload="auto" className={className} style={{ opacity: 0 }} />
}

/* ── About Section ── */
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section ref={ref} className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="max-w-6xl mx-auto relative">
        <motion.p
          className="text-white/40 text-sm tracking-widest uppercase mb-6"
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Pioneering{' '}
          <em className="italic text-white/60">ideas</em> for
          <br className="hidden md:block" />{' '}
          minds that{' '}
          <em className="italic text-white/60">create, build, and inspire.</em>
        </motion.h2>
      </div>
    </section>
  )
}

/* ── Featured Video Section ── */
function FeaturedVideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="rounded-3xl overflow-hidden aspect-video relative"
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 60 }}
          transition={{ duration: 0.9 }}
        >
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
            muted autoPlay loop playsInline preload="auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
              <p className="text-white/50 text-xs tracking-widest uppercase mb-3">Our Approach</p>
              <p className="text-white text-sm md:text-base leading-relaxed">
                We believe in the power of curiosity-driven exploration. Every project starts with a question, and every answer opens a new door to innovation.
              </p>
            </div>
            <motion.button
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore more
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Philosophy Section ── */
function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
          transition={{ duration: 0.8 }}
        >
          Innovation{' '}
          <em className="italic text-white/40">x</em>{' '}
          Vision
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            className="rounded-3xl overflow-hidden aspect-[4/3]"
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              muted autoPlay loop playsInline preload="auto"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center gap-8"
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Choose your space</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. We operate at that crossroads, turning bold thinking into tangible outcomes that move people and reshape industries.
              </p>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Shape the future</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                We believe that the best work emerges when curiosity meets conviction. Our process is designed to uncover hidden opportunities and translate them into experiences that resonate long after the first impression.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Services Section ── */
const SERVICES = [
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    tag: 'Strategy',
    title: 'Research & Insight',
    description: 'We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.',
  },
  {
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    tag: 'Craft',
    title: 'Design & Execution',
    description: 'From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.',
  },
]

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          className="flex items-end justify-between mb-12 md:mb-16"
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
            What we do
          </h2>
          <span className="hidden md:block text-white/40 text-sm">Our services</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="liquid-glass rounded-3xl overflow-hidden group"
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <video
                  src={svc.video}
                  muted autoPlay loop playsInline preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/40 text-xs tracking-widest uppercase">{svc.tag}</span>
                  <button className="liquid-glass rounded-full p-2 text-white">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {svc.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{svc.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Main page ── */
export default function SalesMarketing() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  function cancelRaf() {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }

  function fadeOpacity(video: HTMLVideoElement, from: number, to: number, duration: number, onDone?: () => void) {
    cancelRaf()
    const start = performance.now()
    const step = (now: number) => {
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
    const onCanPlay = () => { video.play().catch(() => {}); fadeOpacity(video, 0, 1, 500) }
    const onTimeUpdate = () => {
      if (!video || fadingOutRef.current) return
      if (video.duration - video.currentTime <= 0.55) {
        fadingOutRef.current = true
        fadeOpacity(video, parseFloat(video.style.opacity || '1'), 0, 500)
      }
    }
    const onEnded = () => {
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
      <div className="min-h-screen overflow-hidden relative flex flex-col">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted autoPlay playsInline preload="auto"
          style={{ opacity: 0 }}
        />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-2">
              <Globe size={24} className="text-white" />
              <span className="text-white font-semibold text-lg">Lumoria</span>
              <div className="hidden md:flex items-center gap-8 ml-8">
                {['Features', 'Pricing', 'About'].map(link => (
                  <a key={link} href="#" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white text-sm font-medium">Sign Up</button>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">Login</button>
            </div>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
          <h1
            className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Know it then <em className="italic">all</em>.
          </h1>

          <div className="max-w-xl w-full space-y-4">
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none"
              />
              <button className="bg-white rounded-full p-3 text-black flex items-center justify-center">
                <ArrowRight size={20} />
              </button>
            </div>
            <p className="text-white text-sm leading-relaxed px-4">
              Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
            </p>
            <div className="flex justify-center">
              <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
                Our Manifesto
              </button>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <button aria-label="Instagram" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Instagram size={20} />
          </button>
          <button aria-label="Twitter" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Twitter size={20} />
          </button>
          <button aria-label="Website" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Globe size={20} />
          </button>
        </div>
      </div>

      {/* Sections */}
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  )
}
