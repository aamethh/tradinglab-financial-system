import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import useCountUp from '../hooks/useCountUp';

const SCENARIOS = {
  Bear: {
    label: 'Bajista',
    accentText: 'text-red-400',
    accentBorder: 'border-red-500/25',
    accentBg: 'bg-red-500/[0.06]',
    activeBtn: 'bg-red-500/10 text-red-300 border-red-500/30',
    cagrRevenue: '7.8%',
    ebitdaMargin: '49%',
    wacc: '10.7%',
    tgr: '2.5%',
    gordon: '$171',
    exitMult: '$366',
    intrinsic: '$268',
    intrinsicNum: 268,
    description:
      'Estrés regulatorio y retraso en la monetización de IA. Presión de márgenes por competencia cloud. La posición de caja neta ($30.608M) evita deterioro estructural del balance.',
  },
  Base: {
    label: 'Base',
    accentText: 'text-blue-400',
    accentBorder: 'border-blue-500/25',
    accentBg: 'bg-blue-500/[0.06]',
    activeBtn: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    cagrRevenue: '13.4%',
    ebitdaMargin: '52%',
    wacc: '9.2%',
    tgr: '3.5%',
    gordon: '$322',
    exitMult: '$526',
    intrinsic: '$424',
    intrinsicNum: 424,
    description:
      'Estimación de consenso. Azure mantiene cuota, Copilot Enterprise se monetiza gradualmente. WACC derivado de CAPM (Rf 4.3% · ERP 5.5% · Beta 0.90). Expansión moderada de márgenes.',
  },
  Bull: {
    label: 'Alcista',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-500/25',
    accentBg: 'bg-emerald-500/[0.06]',
    activeBtn: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    cagrRevenue: '16.0%',
    ebitdaMargin: '55%',
    wacc: '7.7%',
    tgr: '4.0%',
    gordon: '$587',
    exitMult: '$662',
    intrinsic: '$625',
    intrinsicNum: 625,
    description:
      'Monetización completa de IA. Copilot Enterprise captura adopción masiva en la base Office. Apalancamiento operativo lleva el margen EBITDA al 55%. Azure supera el ritmo de crecimiento de AWS.',
  },
};

const RATIOS = [
  { label: 'Margen Bruto', value: '69.8%', signal: 'Mejor de su clase' },
  { label: 'Margen EBITDA', value: '51.0%', signal: 'Economías de plataforma' },
  { label: 'Margen Neto', value: '36.0%', signal: 'Sostenido 3 ejercicios' },
  { label: 'ROE', value: '32.8%', signal: 'Alto retorno patrimonial' },
  { label: 'Deuda / EBITDA', value: '0.36x', signal: 'Apalancamiento mínimo' },
  { label: 'Cobertura Intereses', value: '69.1x', signal: 'Refinanciación nula' },
];

const MC_SCENARIOS = [
  { label: 'Bajista (P5)', value: '$390B', cagr: '9.7%', color: 'text-red-400' },
  { label: 'Base (P50)', value: '$469B', cagr: '13.9%', color: 'text-blue-400' },
  { label: 'Alcista (P95)', value: '$564B', cagr: '18.2%', color: 'text-emerald-400' },
];

const EASE = [0.22, 0.03, 0.26, 1];

function ScenarioValue({ intrinsicNum, accentText }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const count = useCountUp(intrinsicNum, 900, inView);
  return (
    <div ref={ref} className={`font-mono text-5xl md:text-6xl font-semibold tabular ${accentText}`}>
      ${count}
    </div>
  );
}

export default function Analysis() {
  const [active, setActive] = useState('Base');
  const scenario = SCENARIOS[active];
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="analisis" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">
            Análisis Destacado
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                Microsoft Corporation
                <span className="ml-3 font-mono text-lg text-slate-500 font-normal">MSFT</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Tecnología · Software Enterprise · Infraestructura Cloud · IA Generativa
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase text-slate-600 mr-1">Recomendación</span>
              <span className="px-2.5 py-1 rounded border border-blue-500/25 bg-blue-500/[0.07] text-blue-300 text-xs font-medium tracking-wide">
                COMPRAR
              </span>
              <span className="px-2.5 py-1 rounded border border-white/10 text-slate-400 text-xs">
                Convicción Alta
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scenario toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="flex items-center gap-1 p-1 rounded-lg border border-white/[0.06] bg-white/[0.02] w-fit mb-8"
        >
          {Object.entries(SCENARIOS).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-1.5 rounded-md text-sm font-medium border transition-all duration-200 ${
                active === key
                  ? s.activeBtn
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        {/* Main valuation block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4"
        >
          {/* Intrinsic value card */}
          <div className={`lg:col-span-2 rounded-xl border ${scenario.accentBorder} ${scenario.accentBg} p-7 flex flex-col gap-5`}>
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-slate-600 mb-4">
                Valor Intrínseco Ponderado
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <ScenarioValue
                    intrinsicNum={scenario.intrinsicNum}
                    accentText={scenario.accentText}
                  />
                  <p className="text-slate-500 text-xs mt-1">por acción · 50/50 Gordon + Múltiplo</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Gordon Growth', val: scenario.gordon },
                { label: 'Múltiplo Salida', val: scenario.exitMult },
              ].map((item) => (
                <AnimatePresence key={item.label} mode="wait">
                  <motion.div
                    key={active + item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg border border-white/[0.05] bg-black/20 p-3"
                  >
                    <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-mono text-sm font-medium text-slate-200">{item.val}</p>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-slate-400 text-xs leading-relaxed border-t border-white/[0.05] pt-4"
              >
                {scenario.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* DCF parameters */}
          <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-7">
            <p className="text-[10px] tracking-[0.18em] uppercase text-slate-600 mb-6">
              Parámetros DCF
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'CAGR Ingresos', val: scenario.cagrRevenue },
                { label: 'Margen EBITDA', val: scenario.ebitdaMargin },
                { label: 'WACC', val: scenario.wacc },
                { label: 'Crecimiento Terminal', val: scenario.tgr },
              ].map((item) => (
                <AnimatePresence key={item.label} mode="wait">
                  <motion.div
                    key={active + item.label}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1 py-3 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-[10px] text-slate-600 uppercase tracking-widest">{item.label}</span>
                    <span className={`font-mono text-2xl font-medium ${scenario.accentText}`}>{item.val}</span>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-white/[0.04]">
              <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-2">Supuestos adicionales</p>
              <div className="flex flex-wrap gap-2">
                {['Capex 9% ingresos', 'D&A 6.3%', 'Tax rate 18%', 'Caja neta $30.6B', '7.430M acciones'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded border border-white/[0.06] text-slate-500 text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key ratios grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4"
        >
          {RATIOS.map((r) => (
            <motion.div
              key={r.label}
              whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}
              transition={{ duration: 0.18 }}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 flex flex-col gap-2 cursor-default"
            >
              <p className="text-[9px] text-slate-600 uppercase tracking-widest leading-tight">{r.label}</p>
              <p className="font-mono text-xl font-semibold text-white">{r.value}</p>
              <p className="text-[10px] text-slate-500 leading-tight">{r.signal}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Monte Carlo summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0">
              <p className="text-[10px] tracking-[0.18em] uppercase text-slate-600 mb-1">
                Simulación Monte Carlo GBM
              </p>
              <p className="text-xs text-slate-500">
                10.000 trayectorias · FY2025–FY2029 · &mu;=14% · &sigma;=5%
              </p>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4">
              {MC_SCENARIOS.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-slate-600 uppercase tracking-widest">{s.label}</span>
                  <span className={`font-mono text-lg font-semibold ${s.color}`}>{s.value}</span>
                  <span className="text-[10px] text-slate-500">CAGR {s.cagr}</span>
                </div>
              ))}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">Fuente</p>
              <p className="text-xs text-slate-500">MSFT 10-K FY2021–FY2024</p>
              <p className="text-xs text-slate-500">Aameth Quant GBM Engine</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
