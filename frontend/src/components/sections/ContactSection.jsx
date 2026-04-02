// components/sections/ContactSection.jsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { PERSONAL } from '../../data/portfolioData'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const SOCIALS = [
  { label:'GitHub',   href: PERSONAL.github,   icon: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )},
  { label:'LinkedIn', href: PERSONAL.linkedin, icon: (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )},
  { label:'Email',    href: `mailto:${PERSONAL.email}`, icon: '✉' },
]

function InputField({ label, name, type = 'text', placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-slate-400 mb-2">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="w-full rounded-xl px-4 py-3 text-sm font-syne text-slate-200 outline-none transition-all"
        style={{
          background: focused ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.04)',
          border: focused ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
        }}
      />
    </div>
  )
}

export default function ContactSection() {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm]     = useState({ name:'', email:'', message:'' })
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [msgFocus, setMsgFocus] = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    
    setLoading(true)
    
    // Debug: Log API URL
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    console.log('📤 Sending to API_URL:', API_URL)
    console.log('📝 Form data:', form)
    
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      
      console.log('✓ Response status:', res.status)
      const data = await res.json()
      console.log('✓ Response data:', data)
      
      if (data.success) {
        setSent(true)
        setForm({ name:'', email:'', message:'' })
        setTimeout(() => setSent(false), 5000) // Hide success message after 5s
      } else {
        console.error('✗ Server error:', data.error)
      }
    } catch (error) {
      console.error('✗ Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-28 px-6"
      style={{ background:'rgba(255,255,255,0.01)' }}>
      <div className="max-w-6xl mx-auto">

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background:'#f59e0b' }} />
          <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color:'#f59e0b' }}>04 — Contact</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="font-syne font-bold text-4xl md:text-5xl mb-4">
          Get In Touch
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="text-slate-500 text-sm font-mono mb-14 max-w-md">
          Have a project in mind? Let's build something incredible together.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-4">
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
              <InputField label="Email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-slate-400 mb-2">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                onFocus={() => setMsgFocus(true)} onBlur={() => setMsgFocus(false)}
                className="w-full rounded-xl px-4 py-3 text-sm font-syne text-slate-200 outline-none resize-none transition-all"
                style={{
                  background: msgFocus ? 'rgba(0,212,255,0.04)' : 'rgba(255,255,255,0.04)',
                  border: msgFocus ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                }} />
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
              <motion.button onClick={handleSubmit} disabled={sent || loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-syne font-semibold text-sm text-white"
                style={{ background:'linear-gradient(135deg,#7c3aed,#00d4ff)', opacity: sent ? 0.7 : 1 }}
                whileHover={{ scale:1.03, boxShadow:'0 8px 28px rgba(0,212,255,0.3)' }}
                whileTap={{ scale:0.97 }}>
                {loading ? 'Sending...' : sent ? '✓ Sent!' : 'Send Message ↗'}
              </motion.button>
              {sent && (
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
                  className="font-mono text-xs" style={{ color:'#10b981' }}>
                  ✓ Message sent successfully!
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* Social links + info */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-4">
            <motion.div variants={fadeUp}>
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-neon mb-4">
                <span className="w-5 h-px bg-neon inline-block" /> Find Me Online
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SOCIALS.map(s => (
                  <motion.a key={s.label} href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-syne text-sm text-slate-300 transition-colors"
                    style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                    whileHover={{ borderColor:'rgba(0,212,255,0.35)', color:'#00d4ff', y:-3, background:'rgba(0,212,255,0.06)' }}
                    transition={{ duration: 0.15 }}>
                    <span className="text-base shrink-0">{s.icon}</span>
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Direct email card */}
            <motion.div variants={fadeUp}
              className="rounded-2xl p-5 mt-2"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Direct Email</p>
              <a href={`mailto:${PERSONAL.email}`}
                className="font-syne text-sm text-neon hover:underline">{PERSONAL.email}</a>
              <p className="font-mono text-xs text-slate-500 mt-2">
                Usually reply within 24 hours
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
