import { Link } from 'react-router-dom';

const SAMPLES = [
  { to: '/research/grupo-tx', ticker: 'GRPOTX', rating: 'AVOID', color: 'text-red-400', desc: 'Forensic equity: 4 banderas Schilit, DSO 669d, FCO -$15.0M vs UN +$0.6M. HOLD → AVOID con estados auditados.' },
  { to: '/research/bgfg', ticker: 'BGFG', rating: 'OUTPERFORM', color: 'text-emerald-400', desc: 'Financial institutions: tesis banco → asset manager. ROAE 21.2%, capital 27.2%, NPL coverage en monitoreo.' },
  { to: '/research/fgin', ticker: 'FGIN', rating: 'CORE POSITION', color: 'text-blue-300', desc: 'Fixed income: comparativo 3 fondos × 6 dimensiones. Duración, crédito, liquidez, rol en portafolio.' },
  { to: '/research/msft', ticker: 'MSFT', rating: 'HOLD', color: 'text-amber-400', desc: 'Demostración metodológica: DCF 3 escenarios, Monte Carlo GBM 10k trayectorias, disciplina de threshold (+1% ≠ BUY).' },
];

const SKILLS = [
  'Análisis forense de estados financieros (Schilit Framework)',
  'Equity research con memos formato sell-side',
  'Modelado: DCF 3 escenarios, CAPM WACC, sensibilidad, Monte Carlo GBM',
  'Python (pandas, NumPy), SQL, pipelines de datos, Power BI',
  'Automatización de research con IA',
];

const ROLES = [
  'Equity Research Assistant / Analyst Jr',
  'Financial Research Analyst',
  'Forensic Financial Analyst Assistant',
  'Credit Research Analyst',
  'Due Diligence Analyst',
  'Financial Modeling Analyst',
  'AI-assisted Finance Research',
  'Data Analyst (Finance)',
];

export default function WorkWithMe() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-100" />
      </div>

      <div className="relative z-10">
        <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">

          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
            ← Volver al inicio
          </Link>

          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Work With Me</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Ameth Espinosa
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mb-12">
            Estudiante de Ciberseguridad (Universidad Tecnológica de Panamá) y constructor independiente
            de research financiero. AmethQuant es mi firma boutique en construcción: todo el coverage,
            el código y la metodología de este sitio son trabajo propio, publicado y verificable.
          </p>

          {/* About honesto */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-4">Formación</p>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-2 mb-6">
              <li>· <span className="text-slate-200">Programa de Alta Especialización en Finanzas Corporativas</span> aplicado con softwares e IA — Escuela Global, 450 horas académicas (abril 2026). Finanzas corporativas, análisis de estados financieros, proyecciones, Crystal Ball, Tableau, Python, ML aplicado a finanzas.</li>
              <li>· <span className="text-slate-200">Estudiante de Ciberseguridad</span> (2.º año) — Universidad Tecnológica de Panamá.</li>
              <li>· Español nativo · Inglés básico (en mejora activa).</li>
            </ul>
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Lo que demuestro con trabajo, no con títulos</p>
            <ul className="flex flex-col gap-1.5">
              {SKILLS.map((s) => (
                <li key={s} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-blue-500 shrink-0">✓</span>{s}
                </li>
              ))}
            </ul>
          </div>

          {/* Research samples */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">Research Samples</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {SAMPLES.map((s) => (
              <Link key={s.ticker} to={s.to} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/[0.14] transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-base text-white font-semibold">{s.ticker}</span>
                  <span className={`font-mono text-xs ${s.color}`}>{s.rating}</span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>

          {/* Para empleadores */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-8 mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Para empleadores y fondos</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Busco roles remotos o freelance junior/intermedio donde el trabajo publicado aquí
              sea la prueba de capacidad:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {ROLES.map((r) => (
                <span key={r} className="px-2.5 py-1 rounded border border-white/[0.06] text-slate-400 text-[11px]">{r}</span>
              ))}
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Geografías: Panamá · LatAm · Remote. Disponible para prueba técnica o research sample
              ad-hoc sobre el emisor que el equipo elija.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:eameth107@gmail.com?subject=Oportunidad%20-%20Research%20Analyst"
                className="px-6 py-3 rounded border border-amber-500/30 bg-amber-500/[0.08] text-amber-300 text-sm font-medium text-center hover:bg-amber-500/15 transition-all duration-200"
              >
                Contactar para roles
              </a>
              <a
                href="https://www.linkedin.com/in/ameth-espinosa-2b7181273/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded border border-white/[0.07] text-slate-400 text-sm font-medium text-center hover:text-slate-200 hover:border-white/[0.15] transition-all duration-200"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/aamethh/tradinglab-financial-system"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded border border-white/[0.07] text-slate-400 text-sm font-medium text-center hover:text-slate-200 hover:border-white/[0.15] transition-all duration-200"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Para clientes */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/servicios"
              className="px-6 py-3 rounded border border-blue-500/30 bg-blue-500/[0.08] text-blue-300 text-sm font-medium text-center hover:bg-blue-500/15 transition-all duration-200"
            >
              ¿Necesitas research? Ver servicios y precios →
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
