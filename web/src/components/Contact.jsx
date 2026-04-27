import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 0.03, 0.26, 1];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contacto" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Divider */}
        <div className="h-px w-full bg-white/[0.05] mb-28" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-4">Contacto</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
            ¿Preguntas sobre la metodología?
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-10">
            Disponible para discutir modelos, supuestos o colaboraciones en análisis financiero cuantitativo.
            También abierto a feedback sobre la metodología DCF y los modelos de simulación.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href="mailto:eameth107@gmail.com"
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(37,99,235,0.2)' }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded border border-blue-500/30 bg-blue-500/[0.08] text-blue-300 text-sm font-medium hover:bg-blue-500/15 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              eameth107@gmail.com
            </motion.a>

            <motion.a
              href="https://github.com/aamethh/tradinglab-financial-system"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/20 text-sm font-medium transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              tradinglab-financial-system
            </motion.a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-400 text-[10px] font-bold">TL</span>
            </div>
            <span className="text-slate-600 text-xs">TradingLab &mdash; Análisis Financiero Institucional</span>
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
