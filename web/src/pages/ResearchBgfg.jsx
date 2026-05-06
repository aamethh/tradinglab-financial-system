import { Link } from 'react-router-dom';

const KEY_METRICS = [
  { label: 'AUM Growth (YoY)', value: '+20.9%', signal: 'Supera benchmarks regionales', color: 'text-emerald-400' },
  { label: 'ROAE', value: '21.2%', signal: 'Top-quartile Latinex bancos', color: 'text-emerald-400' },
  { label: 'Capital Ratio (BIS III)', value: '27.2%', signal: 'Buffer robusto vs requerimiento', color: 'text-emerald-400' },
  { label: 'Cost-to-Income', value: '48.3%', signal: 'Eficiencia operativa mejorada', color: 'text-blue-400' },
  { label: 'NPL Ratio', value: '1.8%', signal: 'Bajo pero en tendencia alcista', color: 'text-amber-400' },
];

const RISKS = [
  {
    risk: 'NPL Coverage Declining',
    detail: 'Cobertura de NPLs bajó de 185% (2023) a 141% (2025). Tendencia a monitorear si continúa deterioro.',
    level: 'Medio',
    levelColor: 'text-amber-400 border-amber-500/30 bg-amber-500/[0.06]',
  },
  {
    risk: 'Concentración Geográfica Panamá',
    detail: '~87% de exposición crediticia en Panamá. Sensibilidad alta a ciclo económico local y política fiscal.',
    level: 'Medio',
    levelColor: 'text-amber-400 border-amber-500/30 bg-amber-500/[0.06]',
  },
  {
    risk: 'Estructura de Control EGI',
    detail: 'EGI controla >50% del voto. Riesgo de gobernanza para minoritarios. Ausencia de independent chairman.',
    level: 'Alto',
    levelColor: 'text-red-400 border-red-500/30 bg-red-500/[0.06]',
  },
];

export default function ResearchBgfg() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div
          className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10">
        <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">

          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
            ← Volver al portafolio
          </Link>

          <div className="mb-3">
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-600">Financial Institutions Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Grupo Financiero BG, S.A.
          </h1>
          <p className="font-mono text-sm text-slate-500 mb-10">
            BGFG · Financial Institutions · Marzo 2026 ·{' '}
            <span className="text-emerald-400 font-semibold">OUTPERFORM</span>
          </p>

          {/* Investment thesis */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Tesis de Inversión</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              <span className="text-emerald-400 font-medium">Banco transformándose en asset manager.</span>{' '}
              BG está monetizando su franquicia bancaria de alta calidad para construir un negocio de gestión de
              activos con mayor múltiplo de valoración. El AUM creció +20.9% YoY mientras el banco mantiene
              ROE top-quartile.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              Memo completo incluye: AUM growth analysis, descomposición ROE, P/B vs peers regionales,
              sensitivity analysis de capital, y catalysts de re-rating.
            </p>
          </div>

          {/* Key metrics */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">
              5 Métricas Clave — FY2025
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {KEY_METRICS.map((m) => (
                <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-2">{m.label}</p>
                  <p className={`font-mono text-2xl font-semibold mb-1 ${m.color}`}>{m.value}</p>
                  <p className="text-slate-500 text-[10px] leading-snug">{m.signal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk matrix */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">
              Risk Matrix — Factores a Monitorear
            </p>
            <div className="space-y-3">
              {RISKS.map((r) => (
                <div key={r.risk} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-white text-sm font-medium">{r.risk}</p>
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-mono shrink-0 ${r.levelColor}`}>
                      {r.level}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:eameth107@gmail.com?subject=Memo%20Request%20-%20BGFG"
              className="px-6 py-3 rounded border border-blue-500/30 bg-blue-500/[0.08] text-blue-300 text-sm font-medium text-center hover:bg-blue-500/15 hover:border-blue-400/40 transition-all duration-200"
            >
              Solicitar memo completo
            </a>
            <Link
              to="/"
              className="px-6 py-3 rounded border border-white/[0.07] text-slate-500 text-sm font-medium text-center hover:text-slate-300 hover:border-white/[0.12] transition-all duration-200"
            >
              ← Volver al portafolio
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
