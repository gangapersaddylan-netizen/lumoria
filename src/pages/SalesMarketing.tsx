import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, ArrowRight, CheckCircle, TrendingUp, Users, Zap } from 'lucide-react'

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

const TRUST_ITEMS = [
  'Transparent communication & fixed deadlines',
  'Results-driven — no vague promises',
  'Custom-tailored for every budget and stage',
  'Experience with both B2B and B2C',
  'Full end-to-end service from A to Z',
  'Long-term partnerships, not one-off projects',
]

const SERVICES = [
  {
    icon: Globe,
    tag: 'Web Development',
    title: 'Websites that convert',
    body: 'From static landing pages to fully interactive 3D sites — we build websites that turn visitors into clients.',
  },
  {
    icon: TrendingUp,
    tag: 'Sales Outsourcing',
    title: 'Your sales team, our people',
    body: 'We take over your sales process or strengthen your existing team. From lead generation to deal closing — results-driven and scalable.',
  },
  {
    icon: Users,
    tag: 'Brand Strategy',
    title: 'A brand that sticks',
    body: 'Positioning, messaging, visual identity — we make sure your brand instantly builds trust with the right audience.',
  },
  {
    icon: Zap,
    tag: 'Lead Generation',
    title: 'A constant flow of leads',
    body: 'Outreach, content, ads — we build systems that deliver new qualified leads to you every single day.',
  },
]

export default function SalesMarketing() {
  return (
    <div className="bg-black" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Hero */}
      <div className="min-h-screen relative flex flex-col overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted autoPlay loop playsInline preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-2">
              <Globe size={22} className="text-white" />
              <a href="/" className="text-white font-semibold text-lg">Lumoria</a>
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a href="/web-design" className="text-white/70 hover:text-white transition-colors text-sm">Web Design</a>
                <a href="/contact" className="text-white/70 hover:text-white transition-colors text-sm">Contact</a>
              </div>
            </div>
            <a href="/contact" className="liquid-glass rounded-full px-6 py-2 text-white text-sm">Free consultation</a>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="animate-blur-fade-up mb-6" style={{ animationDelay: '100ms' }}>
            <span className="liquid-glass rounded-full px-5 py-2 text-white/50 text-xs tracking-widest uppercase">
              Marketing & Sales Agency
            </span>
          </div>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6 animate-blur-fade-up"
            style={{ fontFamily: "'Instrument Serif', serif", animationDelay: '200ms' }}
          >
            Growth is not<br />
            <em className="italic text-white/70">an accident.</em>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10 animate-blur-fade-up" style={{ animationDelay: '320ms' }}>
            We are a full-service marketing and sales agency focused on building websites and outsourcing sales — for businesses that are serious about growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-blur-fade-up" style={{ animationDelay: '420ms' }}>
            <a href="/contact" className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-8 py-3 hover:bg-white/90 transition-colors">
              Start a project <ArrowRight size={18} />
            </a>
            <a href="/web-design" className="liquid-glass rounded-full text-white px-8 py-3 hover:bg-white/5 transition-colors">
              View Web Design
            </a>
          </div>
        </div>
      </div>

      {/* About */}
      <section className="bg-black py-28 md:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Who we are</p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-8 max-w-4xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              We build the <em className="italic text-white/60">foundation</em> for sustainable business growth.
            </h2>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-2xl">
              Lumoria was founded on one conviction: too many businesses leave growth on the table because they have the wrong priorities or lack the right partner. We fix that — with sharp websites, structured sales processes and an approach that builds trust from day one.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-black pb-28 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeSection>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Why Lumoria</p>
              <h2
                className="text-3xl md:text-5xl text-white tracking-tight mb-8"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Trust is built with actions, not words.
              </h2>
              <ul className="space-y-4">
                {TRUST_ITEMS.map(item => (
                  <li key={item} className="flex items-start gap-3 text-white/65 text-sm leading-relaxed">
                    <CheckCircle size={18} className="text-white/40 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/contact" className="inline-flex items-center gap-2 mt-10 bg-white text-black rounded-full font-medium px-8 py-3 hover:bg-white/90 transition-colors text-sm">
                Schedule a call <ArrowRight size={16} />
              </a>
            </FadeSection>

            <FadeSection>
              <div className="liquid-glass rounded-3xl overflow-hidden aspect-[4/5]">
                <video
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
                  muted autoPlay loop playsInline preload="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-black py-28 md:py-40 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto relative">
          <FadeSection className="mb-16">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">What we do</p>
            <h2
              className="text-4xl md:text-6xl text-white tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Our services
            </h2>
          </FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map(({ icon: Icon, tag, title, body }) => (
              <FadeSection key={title}>
                <div className="liquid-glass rounded-3xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="liquid-glass rounded-full p-3">
                      <Icon size={20} className="text-white/70" />
                    </div>
                    <span className="text-white/40 text-xs tracking-widest uppercase">{tag}</span>
                  </div>
                  <h3
                    className="text-white text-2xl md:text-3xl mb-4 tracking-tight"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{body}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-black py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeSection>
            <div className="liquid-glass rounded-3xl p-10 md:p-16 text-center">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Our philosophy</p>
              <h2
                className="text-4xl md:text-6xl text-white tracking-tight mb-6"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Business is a <em className="italic text-white/60">vehicle</em>,<br />
                impact is the <em className="italic text-white/60">destination</em>.
              </h2>
              <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Every business we work with has a story that deserves to be told. We make sure that story is heard, felt and remembered — through the right channels, at the right moment.
              </p>
              <a href="/contact" className="inline-flex items-center gap-2 bg-white text-black rounded-full font-medium px-8 py-3 hover:bg-white/90 transition-colors text-sm">
                Let's talk <ArrowRight size={16} />
              </a>
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  )
}
