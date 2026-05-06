import { Link } from 'react-router-dom';

const DCF_SCENARIOS = [
  {
    label: 'Bajista',
    tag: 'Bear',
    intrinsic: '$268',
    gordon: '$171',
    exitMult: '$366',
    wacc: '10.7%',
    tgr: '2.5%',
    cagrRevenue: '7.8%',
    ebitda: '49%',
    vs: '–36% vs precio actual',
    color: 'text-red-400',
    border: 'border-red-500/25',
    bg: 'bg-red-500/[0.05]',
  },
  {
    label: 'Base',
    tag: 'Base',
    intrinsic: '$424',
    gordon: '$322',
    exitMult: '$526',
    wacc: '9.2%',
    tgr: '3.5%',
    cagrRevenue: '13.4%',
    ebitda: '52%',
    vs: '+1% vs precio actual → HOLD',
    color: 'text-amber-300',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/[0.06]',
  },
  {
    label: 'Alcista',
    tag: 'Bull',
    intrinsic: '$625',
    gordon: '$587',
    exitMult: '$662',
    wacc: '7.7%',
    tgr: '4.0%',
    cagrRevenue: '16.0%',
    ebitda: '55%',
    vs: '+49% vs precio actual',
    color: 'text-emerald-400',
    border: 'border-emerald-500/25',
    bg: 'bg-emerald-500/[0.05]',
  },
];

export default function ResearchMsft() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div
          className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10">
        <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">

          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
            ← Volver al portafolio
          </Link>

          <div className="mb-3">
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-600">Methodology Demonstration · US Megacap</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Microsoft Corporation
          </h1>
          <p className="font-mono text-sm text-slate-500 mb-10">
            MSFT · DCF + Monte Carlo · Abril 2026 ·{' '}
            <span className="text-amber-400 font-semibold">HOLD</span>
            <span className="text-slate-600 ml-3 text-xs">· Convicción Media</span>
          </p>

          {/* Methodology note */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-8 mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Nota Metodológica</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              Caso utilizado para demostrar capacidades cuantitativas: DCF de 3 escenarios, Monte Carlo GBM
              (10.000 trayectorias), y sensibilidad WACC × TGR. Las mismas técnicas se aplican al coverage
              de emisores Latinex sin cobertura sell-side global.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              <span className="text-amber-400">Threshold institucional:</span> BUY requiere upside &gt;15% ·
              HOLD 0–15% · SELL/AVOID &lt;0%. Upside base +1% no califica como BUY bajo ningún criterio del oficio.
            </p>
          </div>

          {/* DCF Scenarios table */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">
              DCF — 3 Escenarios · 50/50 Gordon Growth + Múltiplo de Salida
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DCF_SCENARIOS.map((s) => (
                <div key={s.tag} className={`rounded-xl border ${s.border} ${s.bg} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest">{s.label}</p>
                    <span className={`font-mono text-xs ${s.color}`}>{s.tag}</span>
                  </div>
                  <p className={`font-mono text-4xl font-semibold mb-1 ${s.color}`}>{s.intrinsic}</p>
                  <p className="text-[10px] text-slate-600 mb-4">valor intrínseco ponderado</p>
                  <div className="space-y-2 border-t border-white/[0.05] pt-4">
                    {[
                      { k: 'Gordon Growth', v: s.gordon },
                      { k: 'Múltiplo Salida', v: s.exitMult },
                      { k: 'WACC', v: s.wacc },
                      { k: 'TGR', v: s.tgr },
                      { k: 'CAGR Revenue', v: s.cagrRevenue },
                      { k: 'Margen EBITDA', v: s.ebitda },
                    ].map((item) => (
                      <div key={item.k} className="flex justify-between">
                        <span className="text-[10px] text-slate-600">{item.k}</span>
                        <span className="font-mono text-[10px] text-slate-400">{item.v}</span>
                      </div>
                    ))}
                  </div>
                  <p className={`text-xs mt-4 pt-3 border-t border-white/[0.05] ${s.color}`}>{s.vs}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monte Carlo summary */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-4">
              Simulación Monte Carlo GBM · 10.000 trayectorias
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Bajista (P5)', value: '$390B', cagr: '9.7%', color: 'text-red-400' },
                { label: 'Base (P50)', value: '$469B', cagr: '13.9%', color: 'text-blue-400' },
                { label: 'Alcista (P95)', value: '$564B', cagr: '18.2%', color: 'text-emerald-400' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className={`font-mono text-lg font-semibold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-slate-500">CAGR {s.cagr}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-700 mt-4">
              μ=14% · σ=5% · FY2025–FY2029 · Fuente: MSFT 10-K FY2021–FY2024 · Aameth Quant GBM Engine
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:eameth107@gmail.com?subject=Methodology%20Inquiry%20-%20MSFT"
              className="px-6 py-3 rounded border border-blue-500/30 bg-blue-500/[0.08] text-blue-300 text-sm font-medium text-center hover:bg-blue-500/15 hover:border-blue-400/40 transition-all duration-200"
            >
              Solicitar demostración metodológica
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
