import { useRef, useEffect } from 'react'
import { Globe, ArrowRight, Camera, Share2 } from 'lucide-react'

export default function WebDesign() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadingOutRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  function cancelRaf() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }

  function fadeOpacity(video: HTMLVideoElement, from: number, to: number, duration: number, onDone?: () => void) {
    cancelRaf()
    const start = performance.now()
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1)
      video.style.opacity = String(from + (to - from) * t)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
        onDone?.()
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    function onCanPlay() {
      video!.play().catch(() => {})
      fadeOpacity(video!, 0, 1, 500)
    }

    function onTimeUpdate() {
      if (!video) return
      const remaining = video.duration - video.currentTime
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true
        const currentOpacity = parseFloat(video.style.opacity || '1')
        fadeOpacity(video, currentOpacity, 0, 500)
      }
    }

    function onEnded() {
      if (!video) return
      video.style.opacity = '0'
      fadingOutRef.current = false
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        fadeOpacity(video, 0, 1, 500)
      }, 100)
    }

    video.style.opacity = '0'
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
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col" style={{ fontFamily: "'Instrument Serif', serif" }}>
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
        style={{ opacity: 0 }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        muted
        autoPlay
        playsInline
        preload="auto"
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
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap">
          Built for the curious
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

      {/* Social icons footer */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <button aria-label="Instagram" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <Camera size={20} />
        </button>
        <button aria-label="Twitter" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <Share2 size={20} />
        </button>
        <button aria-label="Website" className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
          <Globe size={20} />
        </button>
      </div>
    </div>
  )
}
