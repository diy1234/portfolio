// components/sections/ProjectsSection.jsx
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../../data/portfolioData'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

// ── Project detail modal ──────────────────────────────────────
function ProjectModal({ project, onClose }) {
  return (
    <motion.div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 cursor-pointer"
        style={{ background:'rgba(2,6,23,0.92)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)' }}
        onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg rounded-2xl p-7 overflow-y-auto max-h-[80vh]"
        style={{ background:'rgba(10,17,40,0.98)', border:`1px solid ${project.color}40`,
          boxShadow:`0 0 60px ${project.color}15, 0 24px 48px rgba(0,0,0,0.6)` }}
        initial={{ scale:0.88, y:32 }} animate={{ scale:1, y:0 }} exit={{ scale:0.92, y:16 }}
        transition={{ type:'spring', stiffness:300, damping:26 }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg font-mono text-sm text-slate-400 hover:text-red-400 border border-white/10 bg-white/5">
          ✕
        </button>

        <div className="w-10 h-1 rounded-full mb-4" style={{ background: project.color }} />
        <h3 className="font-syne font-bold text-2xl mb-2">{project.name}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.desc}</p>

        {/* Screenshot */}
        {project.image ? (
          <img src={project.image} alt={project.name} className="w-full h-48 rounded-xl mb-5 object-cover" />
        ) : (
          <div className="w-full h-48 rounded-xl mb-5 flex items-center justify-center font-mono text-xs text-slate-600"
            style={{ background:'rgba(255,255,255,0.03)', border:'1px dashed rgba(255,255,255,0.08)' }}>
            [ No screenshot available ]
          </div>
        )}

        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Tech Stack</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map(t => (
            <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md"
              style={{ background:`${project.color}15`, border:`1px solid ${project.color}30`, color:project.color }}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs text-slate-300 hover:text-white transition-colors"
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)' }}>
            ⌂ GitHub
          </a>
          <a href={project.live} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs hover:opacity-80 transition-opacity"
            style={{ background:`${project.color}18`, border:`1px solid ${project.color}40`, color:project.color }}>
            ↗ Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Single project card ───────────────────────────────────────
function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      variants={fadeUp}
      onClick={onClick}
      className="group relative rounded-2xl p-5 cursor-pointer overflow-hidden"
      style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}
      // Floating animation retained from orbital design
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
      whileHover={{ borderColor:`${project.color}50`, background:'rgba(255,255,255,0.05)' }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Colour gradient overlay on hover */}
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background:`linear-gradient(135deg, ${project.color}06, transparent)` }} />

      <div className="w-2 h-2 rounded-full mb-3"
        style={{ background: project.color, boxShadow:`0 0 8px ${project.color}` }} />

      <h3 className="font-syne font-bold text-base mb-1">{project.name}</h3>
      <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{project.desc}</p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.stack.slice(0, 3).map(t => (
          <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded"
            style={{ background:`${project.color}12`, border:`1px solid ${project.color}25`, color:project.color }}>
            {t}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span className="font-mono text-[10px] px-2 py-0.5 rounded text-slate-500"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)' }}>
            +{project.stack.length - 3}
          </span>
        )}
      </div>

      <p className="font-mono text-[10px] text-slate-600 group-hover:text-neon transition-colors">
        Click for details ↗
      </p>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────
export default function ProjectsSection() {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  return (
    <>
      <section id="projects" ref={ref} className="py-28 px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background:'#10b981' }} />
            <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color:'#10b981' }}>03 — Projects</span>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="flex items-end justify-between gap-4 mb-14 flex-wrap">
            <h2 className="font-syne font-bold text-4xl md:text-5xl">Projects</h2>
            <p className="font-mono text-xs text-slate-500">{PROJECTS.length} projects shipped</p>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {PROJECTS.map((proj, i) => (
              <ProjectCard key={proj.id} project={proj} index={i} onClick={() => setSelected(proj)} />
            ))}
          </motion.div>

        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
