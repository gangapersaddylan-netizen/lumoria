import { useState } from 'react'
import {
  Search,
  User,
  Menu,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  Calendar,
} from 'lucide-react'

const NAV_LINKS = ['Movies', 'TV Series', "Editor's Pick", 'Interviews', 'User Reviews']

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-black overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background video */}
      <video
        className="fixed inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Bottom blur overlay (mask fade) */}
      <div
        className="fixed inset-0 pointer-events-none backdrop-blur-xl"
        style={{
          zIndex: 1,
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 10 }}>

        {/* Navbar */}
        <nav className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6" style={{ zIndex: 50 }}>
          {/* Logo */}
          <span
            className="text-white font-semibold text-lg md:text-xl tracking-widest animate-blur-fade-up"
            style={{ animationDelay: '0ms' }}
          >
            LUMORIA
          </span>

          {/* Center nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className="text-white text-sm hover:text-gray-300 transition-colors animate-blur-fade-up"
                style={{ animationDelay: `${100 + i * 50}ms` }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search button (sm+) */}
            <button
              className="hidden sm:flex items-center gap-2 liquid-glass rounded-full px-4 md:px-6 py-2 text-white text-sm animate-blur-fade-up"
              style={{ animationDelay: '350ms' }}
            >
              <Search size={18} />
              Search
            </button>

            {/* User button (sm+) */}
            <button
              className="hidden sm:flex items-center justify-center liquid-glass rounded-full w-10 h-10 text-white animate-blur-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              <User size={18} />
            </button>

            {/* Hamburger (below lg) */}
            <button
              className="flex lg:hidden items-center justify-center liquid-glass rounded-full w-10 h-10 text-white animate-blur-fade-up"
              style={{ animationDelay: '350ms' }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`absolute transition-all duration-500 ease-out ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'}`}>
                <X size={18} />
              </span>
              <span className={`absolute transition-all duration-500 ease-out ${menuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                <Menu size={18} />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`absolute left-0 right-0 top-[72px] lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl transition-all duration-500 ease-out ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: 40 }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className="text-white py-3 px-3 rounded-lg hover:bg-gray-800/50 text-sm transition-all"
                style={{
                  transform: menuOpen ? 'translateX(0)' : 'translateX(-12px)',
                  opacity: menuOpen ? 1 : 0,
                  transitionDelay: `${i * 50}ms`,
                  transitionDuration: '400ms',
                }}
              >
                {link}
              </a>
            ))}
          </div>
          <div className="px-4 pb-4 pt-2 border-t border-gray-800 flex gap-3 sm:hidden">
            <button className="flex items-center gap-2 liquid-glass rounded-full px-4 py-2 text-white text-sm">
              <Search size={18} /> Search
            </button>
            <button className="flex items-center justify-center liquid-glass rounded-full w-10 h-10 text-white">
              <User size={18} />
            </button>
          </div>
        </div>

        {/* Hero content */}
        <div className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16" style={{ zIndex: 10 }}>
          <div className="flex flex-col md:flex-row items-end gap-8">
            {/* Left */}
            <div className="flex-1">
              {/* Metadata */}
              <div
                className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm text-white animate-blur-fade-up"
                style={{ animationDelay: '300ms' }}
              >
                <span className="flex items-center gap-1.5">
                  <Star size={16} className="fill-white sm:w-5 sm:h-5" />
                  <span className="font-medium">8.7/10 IMDB</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  132 min
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} className="sm:w-5 sm:h-5" />
                  April, 2025
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-4 md:mb-6 animate-blur-fade-up"
                style={{ letterSpacing: '-0.04em', animationDelay: '400ms' }}
              >
                Step Through. Work Smarter.
              </h1>

              {/* Description */}
              <p
                className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl animate-blur-fade-up"
                style={{ animationDelay: '500ms' }}
              >
                A voyage through forgotten realms, where past and future intertwine.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <button
                  className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors animate-blur-fade-up"
                  style={{ animationDelay: '600ms' }}
                >
                  <Play size={18} className="fill-black" />
                  Watch Now
                </button>
                <button
                  className="liquid-glass rounded-full font-medium text-white px-6 sm:px-8 py-2.5 sm:py-3 animate-blur-fade-up"
                  style={{ animationDelay: '700ms' }}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right: nav arrows */}
            <div className="flex gap-3">
              <button
                className="liquid-glass rounded-full text-white px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-1 animate-blur-fade-up"
                style={{ animationDelay: '800ms' }}
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              <button
                className="liquid-glass rounded-full text-white px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-1 animate-blur-fade-up"
                style={{ animationDelay: '900ms' }}
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
