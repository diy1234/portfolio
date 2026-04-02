// components/sections/AboutSection.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PERSONAL, EDUCATION } from '../../data/portfolioData'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

export default function AboutSection() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-neon" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-neon">01 — About</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="font-syne font-bold text-4xl md:text-5xl mb-14">
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — Bio + tags (floating card with animation from orbital design) */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="rounded-2xl p-7"
            style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}
            whileHover={{ y: -4, borderColor:'rgba(0,212,255,0.25)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Avatar row */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-extrabold text-white shrink-0"
                style={{ background:'linear-gradient(135deg,#7c3aed,#00d4ff)', boxShadow:'0 0 24px rgba(0,212,255,0.3)' }}
              >
                {PERSONAL.avatar}
              </div>
              <div>
                <h3 className="font-syne font-bold text-lg">{PERSONAL.name}</h3>
                <p className="font-mono text-xs text-neon tracking-widest uppercase mt-0.5">
                  {PERSONAL.role}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-5">{PERSONAL.bio}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {['MCA Student','Full Stack Dev','3D Web','Open Source','AI Enthusiast'].map(t => (
                <motion.span
                  key={t}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-md text-neon"
                  style={{ background:'rgba(0,212,255,0.08)', border:'1px solid rgba(0,212,255,0.2)' }}
                  // Floating animation from original design
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right — Education timeline */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-neon mb-6">
              <span className="w-5 h-px bg-neon inline-block" /> Education Timeline
            </p>

            <div className="flex flex-col gap-6 relative">
              {/* Vertical line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-px"
                style={{ background:'linear-gradient(to bottom, #00d4ff44, transparent)' }} />

              {EDUCATION.map((edu, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-5 items-start pl-1">
                  <div className="shrink-0 w-3 h-3 rounded-full mt-1 z-10"
                    style={{ background: edu.color, boxShadow:`0 0 8px ${edu.color}` }} />
                  <motion.div
                    className="flex-1 rounded-xl p-4"
                    style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}
                    whileHover={{ borderColor:`${edu.color}40`, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                      <h4 className="font-syne font-bold text-sm">{edu.degree}</h4>
                      <span className="font-mono text-[10px] shrink-0" style={{ color: edu.color }}>{edu.score}</span>
                    </div>
                    <p className="font-mono text-xs text-slate-500">{edu.school} · {edu.year}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
