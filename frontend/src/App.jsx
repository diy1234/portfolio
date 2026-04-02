// App.jsx — Scrollable layout with navbar + sections
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader       from './components/ui/Loader'
import Navbar       from './components/ui/Navbar'
import HeroSection  from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection   from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection  from './components/sections/ContactSection'
import Scene3D      from './components/3d/Scene3D'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const { mounted } = useTheme()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader key="loader" />}
      </AnimatePresence>

      {/* Fixed 3D particle background */}
      <Scene3D />

      {/* Fixed top navbar */}
      <Navbar />

      {/* Scrollable page */}
      <main className="relative z-10 overflow-y-auto overflow-x-hidden" style={{ height: '100vh' }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />

        {/* Footer */}
        <footer className="text-center py-8 font-mono text-xs text-slate-600 border-t border-white/5">
          <span className="text-neon">◉</span> Built with React + Three.js · {new Date().getFullYear()}
        </footer>
      </main>
    </>
  )
}
