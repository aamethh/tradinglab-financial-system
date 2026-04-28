import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 0.03, 0.26, 1];

// ── Data ──────────────────────────────────────────────────────────────────────

const EQUITY = [
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Tecnología · Software Enterprise · Cloud',
    rating: 'COMPRAR',
    conviction: 'Alta',
    date: 'Abril 2026',
    status: 'complete',
    currentPrice: '~$420',
    intrinsic: '$424',
    upside: '+1.0%',
    upsidePositive: true,
    desc: 'Análisis completo con ratios FY2021–FY2024, simulación Monte Carlo (10k rutas) y modelo DCF de 3 escenarios. Rango de valoración: $268–$625.',
    outputs: ['ratios_table.csv', 'monte_carlo_chart.png', 'investment_brief_es.md'],
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Tecnología · Hardware · Servicios',
    status: 'pending',
    desc: 'Análisis de márgenes por segmento (iPhone, Services, Mac), modelo DCF con escenarios de penetración de servicios y simulación de ingresos recurrentes.',
  },
  {
    ticker: 'GOOG',
    name: 'Alphabet Inc.',
    sector: 'Tecnología · Publicidad Digital · IA',
    status: 'pending',
    desc: 'Valoración por segmentos (Google Search, Cloud, YouTube, Other Bets). Análisis del impacto de la IA generativa en el modelo de publicidad.',
  },
];

const FINANCIAL = [
  {
    ticker: 'BG',
    name: 'Banco General',
    sector: 'Banca · Panamá',
    status: 'pending',
    desc: 'Análisis de capital regulatorio, rentabilidad (ROE, ROA, NIM), calidad de cartera y eficiencia operativa del mayor banco panameño.',
  },
  {
    ticker: 'FBG',
    name: 'Financiera BG',
    sector: 'Financiero · Crédito al Consumo',
    status: 'pending',
    desc: 'Análisis de captación, colocación y spread de tasas. Segmento de crédito personal y financiamiento de vehículos en el mercado panameño.',
  },
  {
    ticker: 'TIX',
    name: 'Grupo TIX',
    sector: 'Conglomerado · Panamá',
    status: 'pending',
    desc: 'Valoración de conglomerado con análisis de subsidiarias, estructura de capital y descuento por holding aplicado al valor intrínseco consolidado.',
  },
];

const FUNDS = [
  {
    ticker: '—',
    name: 'Comparativa Fondos de Renta Fija',
    sector: 'Renta Fija · Mercado Local',
    status: 'pending',
    desc: 'Análisis comparativo de rendimiento ajustado por riesgo, duración, composición y costos de gestión entre fondos de renta fija disponibles en el mercado.',
  },
];

// ── Components ────────────────────────────────────────────────────────────────

function CompletedCard({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
      transition={{ duration: 0.18 }}
      className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-6 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xl font-semibold text-white mb-0.5">{item.ticker}</div>
          <div className="text-sm text-slate-300 font-medium leading-snug">{item.name}</div>
          <div className="text-xs text-slate-500 mt-0.5">{item.sector}</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="px-2.5 py-1 rounded border border-blue-500/25 bg-blue-500/[0.07] text-blue-300 text-xs font-medium">
            {item.rating}
          </span>
          <span className="text-[10px] text-slate-600">Convicción {item.conviction}</span>
        </div>
      </div>

      {/* Micro valuation summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-2.5 text-center">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">Precio actual</p>
          <p className="font-mono text-sm font-medium text-slate-300">{item.currentPrice}</p>
        </div>
        <div className="rounded-lg border border-blue-500/15 bg-blue-500/[0.04] p-2.5 text-center">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">DCF Base</p>
          <p className="font-mono text-sm font-medium text-blue-300">{item.intrinsic}</p>
        </div>
        <div className="rounded-lg border border-white/[0.05] bg-black/20 p-2.5 text-center">
          <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">Potencial</p>
          <p className={`font-mono text-sm font-medium ${item.upsidePositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {item.upside}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>

      {/* Outputs */}
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
      whileHover={{ scale: 1.015, opacity: 0.85 }}
      transition={{ duration: 0.18 }}
      className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-6 flex flex-col gap-3 opacity-55"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xl font-semibold text-slate-400 mb-0.5">{item.ticker}</div>
          <div className="text-sm text-slate-500 leading-snug">{item.name}</div>
          <div className="text-xs text-slate-600 mt-0.5">{item.sector}</div>
        </div>
        <span className="px-2.5 py-1 rounded border border-white/[0.07] text-slate-600 text-xs shrink-0">
          En progreso
        </span>
      </div>
      <div className="h-px w-full bg-white/[0.04]" />
      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

function CategoryHeader({ label, count }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/[0.04]" />
      <span className="text-[10px] font-mono text-slate-700">{count}</span>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const makeDelay = (groupOffset, i) => groupOffset + i * 0.07;

  return (
    <section id="portafolio" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Portafolio</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Análisis en progreso
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl">
            Cada análisis incluye ratios detallados, simulación Monte Carlo y valoración DCF
            con escenarios bajista, base y alcista.
          </p>
        </motion.div>

        {/* A — Empresas / Equity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="mb-12"
        >
          <CategoryHeader label="Empresas — Equity" count={`${EQUITY.length} activos`} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EQUITY.map((item, i) => (
              <motion.div
                key={item.ticker}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: makeDelay(0.12, i), ease: EASE }}
              >
                {item.status === 'complete'
                  ? <CompletedCard item={item} />
                  : <PendingCard item={item} />
                }
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* B — Instituciones Financieras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
          className="mb-12"
        >
          <CategoryHeader label="Instituciones Financieras" count={`${FINANCIAL.length} activos`} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FINANCIAL.map((item, i) => (
              <motion.div
                key={item.ticker}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: makeDelay(0.28, i), ease: EASE }}
              >
                <PendingCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* C — Fondos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.38, ease: EASE }}
        >
          <CategoryHeader label="Fondos" count={`${FUNDS.length} análisis`} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FUNDS.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: makeDelay(0.42, i), ease: EASE }}
              >
                <PendingCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
