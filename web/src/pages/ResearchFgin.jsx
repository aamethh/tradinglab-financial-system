import { Link } from 'react-router-dom';

const COMPARISON = [
  {
    metric: 'Patrimonio administrado',
    fgin: '$285M',
    global: '$410M',
    mmg: '$190M',
  },
  {
    metric: 'Duración promedio',
    fgin: '2.1 años',
    global: '3.8 años',
    mmg: '1.4 años',
  },
  {
    metric: 'Retorno típico (anualizado)',
    fgin: '6.2–7.0%',
    global: '5.8–6.5%',
    mmg: '5.5–6.0%',
  },
  {
    metric: 'Exposición LatAm',
    fgin: '~60%',
    global: '~45%',
    mmg: '~70%',
  },
  {
    metric: 'Perfil crediticio dominante',
    fgin: 'BBB– / BB+',
    global: 'BBB / BBB+',
    mmg: 'BB / BB–',
  },
  {
    metric: 'Liquidez (redemptions)',
    fgin: 'Mensual',
    global: 'Mensual',
    mmg: 'Trimestral',
  },
];

export default function ResearchFgin() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div
          className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.045) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10">
        <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">

          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
            ← Volver al portafolio
          </Link>

          <div className="mb-3">
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-600">Fixed Income Coverage</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Fondo General de Inversiones
          </h1>
          <p className="font-mono text-sm text-slate-500 mb-10">
            FGIN · Comparative Analysis · Diciembre 2025 ·{' '}
            <span className="text-blue-300 font-semibold">CORE POSITION</span>
          </p>

          {/* Institutional memo box */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 mb-8">
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Análisis comparativo de fondos de renta fija listados en Latinex. Objetivo: selección óptima
              para exposición fixed income en portafolios diversificados con perfil de riesgo moderado.
            </p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest">
              Metodología: Duration Analysis · Credit Risk · Peer Benchmarking · Macro Sensitivity
            </p>
          </div>

          {/* Comparative table */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">
              Análisis Comparativo — FGIN vs Fondo Global vs MMG FI
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-[10px] text-slate-600 uppercase tracking-widest pb-3 pr-4 min-w-[160px]">Dimensión</th>
                    <th className="text-left text-[10px] text-blue-400 uppercase tracking-widest pb-3 pr-4">FGIN</th>
                    <th className="text-left text-[10px] text-slate-600 uppercase tracking-widest pb-3 pr-4">Fondo Global</th>
                    <th className="text-left text-[10px] text-slate-600 uppercase tracking-widest pb-3">MMG FI</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.metric} className="border-b border-white/[0.03]">
                      <td className="py-3 pr-4 text-slate-400 text-xs">{row.metric}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-blue-300 font-medium">{row.fgin}</td>
                      <td className="py-3 pr-4 text-slate-500 text-xs">{row.global}</td>
                      <td className="py-3 text-slate-500 text-xs">{row.mmg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role in portfolio */}
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.04] p-7 mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">
              Rol en Portafolio Diversificado
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              FGIN ofrece el mejor balance entre retorno ajustado por riesgo (6.2–7.0% con duración 2.1 años)
              y liquidez mensual entre los tres comparables analizados. Su exposición BBB– / BB+ es apropiada
              para tramos de renta fija con horizonte 18–36 meses.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              Sustitución recomendada sobre MMG FI (menor retorno, menor liquidez) y complementaria a
              Fondo Global en carteras con mayor tolerancia a riesgo crediticio LatAm.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:eameth107@gmail.com?subject=Memo%20Request%20-%20FGIN"
              className="px-6 py-3 rounded border border-blue-500/30 bg-blue-500/[0.08] text-blue-300 text-sm font-medium text-center hover:bg-blue-500/15 hover:border-blue-400/40 transition-all duration-200"
            >
              Solicitar análisis comparativo
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
