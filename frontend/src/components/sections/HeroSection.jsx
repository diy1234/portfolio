// components/sections/HeroSection.jsx
// Layout: left = badge + name + subtitle + CTA buttons
//         right = interactive 3D glowing sphere (R3F Canvas)
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars, Ring } from '@react-three/drei'
import { PERSONAL } from '../../data/portfolioData'

// ── 3D Sphere (right side hero) ───────────────────────────────
function HeroSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]}  color="#00d4ff" intensity={3} />
      <pointLight position={[-3, -2, 2]} color="#7c3aed" intensity={2} />
      <pointLight position={[0, -3, 1]}  color="#3b82f6" intensity={1.5} />

      <Stars radius={30} depth={20} count={600} factor={2} fade speed={0.6} />

      {/* Outer glow ring */}
      <Float speed={1} floatIntensity={0.3}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.55, 0.004, 8, 120]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.25} />
        </mesh>

        {/* Main sphere */}
        <Sphere ref={meshRef} args={[1.2, 80, 80]}>
          <MeshDistortMaterial
            color="#0a1a3a"
            emissive="#001a33"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
            distort={0.18}
            speed={1.5}
            transparent
            opacity={0.92}
          />
        </Sphere>

        {/* Wireframe overlay for the network effect */}
        <Sphere args={[1.22, 18, 18]}>
          <meshBasicMaterial
            color="#00d4ff"
            wireframe
            transparent
            opacity={0.12}
          />
        </Sphere>

        {/* Inner glow core */}
        <Sphere args={[0.5, 32, 32]}>
          <meshBasicMaterial color="#1e40af" transparent opacity={0.15} />
        </Sphere>
      </Float>

      {/* Orbiting dots */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        return (
          <Float key={i} speed={1.5 + i * 0.3} floatIntensity={0.2}>
            <mesh position={[Math.cos(angle) * 1.7, Math.sin(angle) * 0.4, Math.sin(angle) * 1.2]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshBasicMaterial color="#00d4ff" />
            </mesh>
          </Float>
        )
      })}
    </>
  )
}

// ── Text animation variants ───────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 2.1 + delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
})

export default function HeroSection() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: '80px' }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Text content ─────────────────────── */}
          <div className="order-2 lg:order-1">

            {/* "Available for opportunities" badge */}
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs text-slate-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-neon3 shrink-0"
                  style={{ boxShadow: '0 0 8px #10b981', animation: 'pulse 2s ease-in-out infinite' }}
                />
                Available for opportunities
              </div>
            </motion.div>

            {/* Big name */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-syne font-extrabold leading-none mb-4"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
            >
              Hi, I'm{' '}
              <span className="neon-text">{PERSONAL.name.split(' ')[0]}</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              {...fadeUp(0.2)}
              className="font-syne text-slate-400 mb-5"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
            >
              MCA Student &nbsp;|&nbsp; Web Developer
            </motion.p>

            {/* Bio */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-slate-400 leading-relaxed mb-8 max-w-lg"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
            >
              I build <strong className="text-white font-semibold">scalable</strong>, modern web applications
              with clean UI &amp; strong backend logic.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
              {/* Primary — View Projects */}
              <motion.button
                onClick={() => scrollTo('#projects')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-syne font-semibold text-sm text-white transition-all"
                style={{
                  background: 'rgba(0,212,255,0.12)',
                  border: '1px solid rgba(0,212,255,0.35)',
                }}
                whileHover={{ scale: 1.04, background: 'rgba(0,212,255,0.2)', boxShadow: '0 0 24px rgba(0,212,255,0.25)' }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects <span className="text-neon">›</span>
              </motion.button>

              {/* Secondary — Download Resume */}
              <motion.a
                href="/resume(1).pdf"
                download
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-syne font-semibold text-sm text-white transition-all"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.97 }}
              >
                Download Resume <span>↓</span>
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D sphere ───────────────────────── */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative"
              style={{ width: 'clamp(280px, 45vw, 520px)', height: 'clamp(280px, 45vw, 520px)' }}
            >
              {/* Outer glow behind canvas */}
              <div
                className="absolute inset-8 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)' }}
              />
              <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}>
                <HeroSphere />
              </Canvas>
            </div>
          </motion.div>

        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-slate-600">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-transparent to-neon"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}`}</style>
    </section>
  )
}
