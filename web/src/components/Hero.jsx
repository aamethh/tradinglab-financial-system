import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';

const METRICS = [
  { label: 'Ingresos FY2024', value: 245, suffix: 'B', prefix: '$', sub: 'Microsoft 10-K' },
  { label: 'Valor Intrínseco Base', value: 424, suffix: '', prefix: '$', sub: 'DCF ponderado / acción' },
  { label: 'Margen EBITDA', value: 51, suffix: '%', prefix: '', sub: 'FY2024 · Clase mundial' },
];

function MetricCard({ label, value, suffix, prefix, sub, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCountUp(value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.03, 0.26, 1] }}
      className="flex flex-col items-center gap-1"
    >
      <div className="font-mono text-4xl md:text-5xl font-semibold text-white tabular tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs font-medium text-slate-300 tracking-wide">{label}</div>
      <div className="text-[10px] text-slate-600 tracking-wider uppercase">{sub}</div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-24 px-6 overflow-hidden"
    >
      {/* Animated ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full animate-blob-slow"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/[0.07] text-blue-400 text-xs tracking-wider"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-dot" />
          Análisis activo: MSFT &mdash; Abril 2026
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.03, 0.26, 1] }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-4xl md:text-6xl font-semibold text-white leading-[1.1] tracking-tight">
            Desarrollo modelos financieros
          </h1>
          <h1 className="text-4xl md:text-6xl font-light text-slate-400 leading-[1.1] tracking-tight">
            con rigor cuantitativo.
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col gap-3 max-w-2xl"
        >
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Para estimar el valor intrínseco de empresas y analizar escenarios de inversión con rigor cuantitativo.
          </p>
          <p className="text-slate-600 text-sm">
            DCF &middot; Simulación Monte Carlo &middot; Análisis fundamental estructurado
          </p>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 py-8 border-y border-white/[0.05]"
        >
          {METRICS.map((m, i) => (
            <MetricCard key={m.label} {...m} delay={0.65 + i * 0.1} />
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <motion.a
            href="#analisis"
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(37,99,235,0.25)' }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
            className="px-6 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors duration-200"
          >
            Ver análisis MSFT
          </motion.a>
          <motion.a
            href="https://github.com/aamethh/tradinglab-financial-system"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.15 }}
            className="px-6 py-2.5 rounded border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
          >
            Repositorio GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-slate-600/0 via-slate-500/50 to-slate-600/0"
        />
      </motion.div>
    </section>
  );
}
