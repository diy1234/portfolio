import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-[#020617]"
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-[#0f172a]"
          style={{ borderTopColor:'#00d4ff', animation:'spin 1s linear infinite' }} />
        <div className="absolute inset-2 rounded-full border border-[#0f172a]"
          style={{ borderTopColor:'#7c3aed', animation:'spin 1.5s linear infinite reverse' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#00d4ff]" style={{ boxShadow:'0 0 12px #00d4ff' }} />
        </div>
      </div>
      <motion.p className="font-mono text-xs tracking-[0.2em] text-[#00d4ff] uppercase"
        animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.5, repeat:Infinity }}>
        Loading Portfolio...
      </motion.p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </motion.div>
  )
}
