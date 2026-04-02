// components/ui/Navbar.jsx
// Fixed top navbar — logo, nav links, social icons, dark toggle
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PERSONAL } from '../../data/portfolioData'
import { useTheme } from '../../hooks/useTheme'

const LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [active,     setActive]     = useState('home')
  const [menuOpen,   setMenuOpen]   = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Add glass bg after scrolling 20px
  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    const onScroll = () => setScrolled(main.scrollTop > 20)
    main.addEventListener('scroll', onScroll)
    return () => main.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(2,6,23,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.1, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-2 font-syne font-bold text-lg text-white hover:text-neon transition-colors"
        >
          <span className="text-neon text-xl">/</span>
          <span className="text-neon">/</span>
          <span>{PERSONAL.name.split(' ')[0].toLowerCase()}.dev</span>
        </button>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`relative px-4 py-2 font-syne text-sm font-medium transition-colors rounded-lg
                ${active === link.href.slice(1)
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'}`}
            >
              {/* Active underline */}
              {active === link.href.slice(1) && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          {/* GitHub */}
          <a href={PERSONAL.github} target="_blank" rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-all border border-white/0 hover:border-white/10"
            title="GitHub">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-all border border-white/0 hover:border-white/10"
            title="LinkedIn">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* Email */}
          <a href={`mailto:${PERSONAL.email}`}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-all border border-white/0 hover:border-white/10"
            title="Email">
            <span className="text-lg">✉</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-all border border-white/0 hover:border-white/10"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 18C8.68 18 6 15.32 6 12s2.68-6 6-6 6 2.68 6 6-2.68 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM12 2c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1s1 .45 1 1v0c0 .55-.45 1-1 1zm0 20c-.55 0-1 .45-1 1v0c0 .55.45 1 1 1s1-.45 1-1v-1c0-.55-.45-1-1-1zM4.22 4.22c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l.01.01c.2.2.45.29.7.29.25 0 .51-.1.71-.3.39-.39.39-1.02-.01-1.41zm12.56 12.56c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l.01.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM19.78 4.22c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l.01.01c.2.2.45.29.71.29.25 0 .5-.1.7-.3.39-.39.39-1.02 0-1.41zM7.05 19.78c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l.01.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41zM23 11v1c0 .55-.45 1-1 1h0c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h0c.55 0 1 .45 1 1zM1 13v-1c0-.55.45-1 1-1h0c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1h0c-.55 0-1-.45-1-1z"/>
              </svg>
            ) : (
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 7c-1.66 0-3 1.34-3 3 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.66-1.34-3-3-3zm0 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7.78-2c.4 0 .72-.3.75-.69.15-1.51-.3-2.99-1.26-4.16-.2-.26-.51-.4-.83-.4-.55 0-.99.47-.98 1.03.01.34.15.65.4.85.69.78 1.06 1.81.95 2.84-.04.38.26.7.65.74.04.01.07.01.1.01zm.77 8.86c-.27.47-.68.74-1.17.82-.37.06-.76-.01-1.09-.23-.2-.13-.48-.25-.67-.26-.19-.01-.47.13-.66.26-.34.22-.73.29-1.09.23-.49-.07-.9-.33-1.17-.82-.51-.85-.22-1.96.61-2.46.25-.15.5-.37.50-.66 0-.29-.25-.52-.50-.66-.83-.49-1.12-1.61-.61-2.46.27-.47.68-.74 1.17-.82.49-.07.9.01 1.09.23.2.13.48.25.67.26.19.01.47-.13.66-.26.34-.22.73-.29 1.09-.23.49.07.9.33 1.17.82.51.85.22 1.96-.61 2.46-.25.15-.5.37-.50.66 0 .29.25.52.50.66.83.49 1.12 1.61.61 2.46z"/>
              </svg>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-white border border-white/10"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <motion.div
          className="md:hidden px-6 pb-4 flex flex-col gap-1"
          style={{ background: 'rgba(2,6,23,0.97)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {LINKS.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              className="text-left px-3 py-2.5 rounded-lg font-syne text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all">
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
