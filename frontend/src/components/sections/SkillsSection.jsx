// components/sections/SkillsSection.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '../../data/portfolioData'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }

function SkillBar({ name, pct, color, delay }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="flex items-center gap-3 mb-3">
      <span className="font-mono text-[11px] text-slate-400 w-24 shrink-0">{name}</span>
      <div className="flex-1 h-[3px] rounded-full" style={{ background:'rgba(255,255,255,0.07)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background:`linear-gradient(90deg,${color}66,${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width:`${pct}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: 'easeOut' }}
        />
      </div>
      <span className="font-mono text-[10px] text-slate-600 w-7 text-right shrink-0">{pct}%</span>
    </div>
  )
}

export default function SkillsSection() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="py-28 px-6"
      style={{ background:'rgba(255,255,255,0.01)' }}>
      <div className="max-w-6xl mx-auto">

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-neon2" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-neon2">02 — Skills</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="font-syne font-bold text-4xl md:text-5xl mb-14">
          Skills & Tech
        </motion.h2>

        {/* Skill category cards — with floating animation from original design */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12"
        >
          {SKILLS.map((cat, ci) => (
            <motion.div
              key={cat.category}
              variants={fadeUp}
              className="rounded-2xl p-5"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}
              // Floating animation from original orbital design
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + ci * 0.7, repeat: Infinity, ease: 'easeInOut', delay: ci * 0.4 }}
              whileHover={{ borderColor:`${cat.color}40`, background:'rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow:`0 0 8px ${cat.color}` }} />
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold"
                  style={{ color: cat.color }}>
                  {cat.category}
                </p>
              </div>
              {cat.items.map((skill, si) => (
                <SkillBar key={skill.name} name={skill.name} pct={skill.pct}
                  color={cat.color} delay={0.2 + ci * 0.1 + si * 0.05} />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Also familiar with badges */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-neon mb-4">
            <span className="w-5 h-px bg-neon inline-block" /> Also Familiar With
          </p>
          <div className="flex flex-wrap gap-2">
            {['PowerBI','MSExcel','Pandas','Numpy','Linux','Figma','Canva'].map(t => (
              <motion.span key={t}
                className="font-mono text-[11px] px-3 py-1.5 rounded-lg text-slate-400 cursor-default"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                whileHover={{ color:'#00d4ff', borderColor:'rgba(0,212,255,0.3)', y: -2 }}
                transition={{ duration: 0.15 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
