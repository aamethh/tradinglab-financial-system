import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 0.03, 0.26, 1];

const ANALYSES = [
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Tecnología · Software Enterprise',
    rating: 'COMPRAR',
    conviction: 'Alta',
    date: 'Abril 2026',
    intrinsic: '$424',
    status: 'complete',
    outputs: ['ratios_table.csv', 'monte_carlo_chart.png', 'investment_brief_es.md'],
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Tecnología · Hardware · Servicios',
    status: 'pending',
  },
  {
    ticker: 'GOOG',
    name: 'Alphabet Inc.',
    sector: 'Tecnología · Publicidad Digital',
    status: 'pending',
  },
  {
    ticker: 'JPM',
    name: 'JPMorgan Chase',
    sector: 'Financiero · Banca Global',
    status: 'pending',
  },
];

function CompletedCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      transition={{ duration: 0.18 }}
      className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-7 flex flex-col gap-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-2xl font-semibold text-white mb-1">{item.ticker}</div>
          <div className="text-sm text-slate-300 font-medium">{item.name}</div>
          <div className="text-xs text-slate-500 mt-0.5">{item.sector}</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="px-2.5 py-1 rounded border border-blue-500/25 bg-blue-500/[0.07] text-blue-300 text-xs font-medium">
            {item.rating}
          </span>
          <span className="text-[10px] text-slate-600">Convicción {item.conviction}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-3">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">Valor Intrínseco</p>
          <p className="font-mono text-lg font-semibold text-blue-300">{item.intrinsic}</p>
          <p className="text-[10px] text-slate-600">por acción · caso base</p>
        </div>
        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-3">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">Publicado</p>
          <p className="text-sm text-slate-300 font-medium">{item.date}</p>
          <p className="text-[10px] text-slate-600">Informe completo</p>
        </div>
      </div>

      <div>
        <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-2">Entregables</p>
        <div className="flex flex-wrap gap-1.5">
          {item.outputs.map((o) => (
            <span key={o} className="px-2 py-0.5 rounded border border-white/[0.06] text-slate-500 text-[10px] font-mono">
              {o}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#analisis"
        className="mt-auto w-full py-2 rounded border border-blue-500/25 bg-blue-500/[0.07] text-blue-300 text-sm text-center font-medium hover:bg-blue-500/15 hover:border-blue-400/35 transition-all duration-200"
      >
        Ver análisis completo
      </a>
    </motion.div>
  );
}

function PendingCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.18 }}
      className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-7 flex flex-col gap-4 opacity-60"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-2xl font-semibold text-slate-400 mb-1">{item.ticker}</div>
          <div className="text-sm text-slate-500">{item.name}</div>
          <div className="text-xs text-slate-600 mt-0.5">{item.sector}</div>
        </div>
        <span className="px-2.5 py-1 rounded border border-white/[0.08] text-slate-600 text-xs">
          En progreso
        </span>
      </div>
      <div className="h-px w-full bg-white/[0.04]" />
      <p className="text-xs text-slate-600">Análisis en preparación.</p>
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="portafolio" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Portafolio</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Análisis completados
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl">
            Cada análisis incluye informe estructurado, ratios detallados,
            simulación Monte Carlo y valoración DCF con escenarios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ANALYSES.map((item, i) => (
            <motion.div
              key={item.ticker}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
            >
              {item.status === 'complete'
                ? <CompletedCard item={item} />
                : <PendingCard item={item} />
              }
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
