import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 0.03, 0.26, 1];

const SERVICES = [
  {
    title: 'Custom Equity Research',
    body: [
      'Análisis forense profundo de un emisor.',
      'Entregable: investment memo institucional + modelo DCF + dashboard.',
      'Timeline: 2 semanas.',
      'Desde $1,500.',
    ],
    accent: 'border-blue-500/25 bg-blue-500/[0.05]',
    labelColor: 'text-blue-400',
  },
  {
    title: 'Coverage Retainer',
    body: [
      'Monitoring continuo de 3–5 emisores.',
      'Updates trimestrales + alerts ante eventos materiales.',
      'Desde $800/mes.',
    ],
    accent: 'border-emerald-500/25 bg-emerald-500/[0.05]',
    labelColor: 'text-emerald-400',
  },
  {
    title: 'Roles Institucionales',
    body: [
      'Abierto a posiciones de:',
      '· Equity Research Analyst (sell-side / buy-side)',
      '· Family Office / Hedge Fund',
      '· Geografías: Panamá · LatAm · Remote',
      'Conversación inicial: 30 minutos.',
    ],
    accent: 'border-amber-500/25 bg-amber-500/[0.05]',
    labelColor: 'text-amber-400',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="contacto" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Divider */}
        <div className="h-px w-full bg-white/[0.05] mb-28" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          className="mb-12"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-4">Contacto</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Trabajemos juntos
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
            Disponible para coverage independiente, advisory a family offices, y posiciones full-time
            en equity research o buy-side.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.08, ease: EASE }}
              className={`rounded-xl border ${svc.accent} p-6 flex flex-col gap-4`}
            >
              <p className={`text-xs font-medium tracking-wide ${svc.labelColor}`}>{svc.title}</p>
              <ul className="flex flex-col gap-1.5">
                {svc.body.map((line, j) => (
                  <li key={j} className="text-slate-400 text-sm leading-relaxed">{line}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.35, ease: EASE }}
          className="flex flex-wrap gap-3"
        >
          <motion.a
            href="mailto:eameth107@gmail.com?subject=Coverage%20Inquiry"
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(37,99,235,0.2)' }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-blue-500/30 bg-blue-500/[0.08] text-blue-300 text-sm font-medium hover:bg-blue-500/15 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Agendar 30 min
          </motion.a>

          <motion.a
            href="mailto:eameth107@gmail.com"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20 text-sm font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            eameth107@gmail.com
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/aameth"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20 text-sm font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </motion.a>

          <motion.a
            href="https://github.com/aamethh/tradinglab-financial-system"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20 text-sm font-medium transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-400 text-[10px] font-bold">AQ</span>
            </div>
            <span className="text-slate-600 text-xs">Aameth Quant &mdash; amethquant.vercel.app</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-700 text-xs font-mono">
              Python · SQL · React · Framer Motion
            </span>
            <span className="text-slate-700 text-xs">&copy; 2026</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
