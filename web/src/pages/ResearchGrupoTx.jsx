import { Link } from 'react-router-dom';

export default function ResearchGrupoTx() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div
          className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.055) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10">
        <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">

          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
            ← Volver al portafolio
          </Link>

          <div className="mb-3">
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-600">Forensic Equity Research</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Grupo TX, S.A. y Subsidiarias
          </h1>
          <p className="font-mono text-sm text-slate-500 mb-10">
            GRPOTX · Coverage Update · Marzo 2026 ·{' '}
            <span className="text-red-400 font-semibold">AVOID</span>
          </p>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 mb-8">
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Memo institucional en preparación para publicación pública.
            </p>
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Disponible bajo solicitud directa para:</p>
            <ul className="space-y-2 mb-6">
              {['Portfolio Managers', 'Recruiters de equity research / buy-side', 'Family offices y advisory professionals'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-600 leading-relaxed">
              El memo completo incluye: investment thesis, quality of earnings analysis, balance sheet forensics,
              DCF de 3 escenarios, risk matrix cuantificada, y catalysts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:eameth107@gmail.com?subject=Memo%20Request%20-%20GRPOTX"
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
