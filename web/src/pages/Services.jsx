import { Link } from 'react-router-dom';

const OFFICIAL = [
  {
    title: 'Custom Equity Research',
    timeline: '2 semanas',
    accent: 'border-blue-500/25 bg-blue-500/[0.05]',
    labelColor: 'text-blue-400',
    scope: 'Análisis forense profundo de un emisor (Latinex o internacional).',
    deliverables: [
      'Investment memo institucional (PDF)',
      'Modelo DCF de 3 escenarios + sensibilidad WACC × TGR',
      'Checklist forense Schilit con evidencia citada',
      'Dashboard de métricas',
    ],
    limits: 'No es asesoría de inversión ni auditoría. Banderas con evidencia, no veredictos legales.',
  },
  {
    title: 'Coverage Retainer',
    timeline: 'Continuo',
    accent: 'border-emerald-500/25 bg-emerald-500/[0.05]',
    labelColor: 'text-emerald-400',
    scope: 'Monitoring continuo de 3–5 emisores.',
    deliverables: [
      'Updates trimestrales por emisor',
      'Alerts ante eventos materiales (≤48h hábiles)',
      'Revisión de tesis con cada estado auditado nuevo',
    ],
    limits: 'Máximo 5 emisores por retainer.',
  },
];

const PACKAGES = [
  {
    title: 'Forensic Financial Screen',
    timeline: '5 días hábiles',
    scope: 'Checklist Schilit de 12 puntos sobre 1 empresa: FCO/UN, DSO, one-time gains, capitalización, patrimonio operativo, informe del auditor.',
    audience: 'Family offices · acreedores · due diligence preliminar',
  },
  {
    title: 'Financial Statement Red Flags',
    timeline: '3 días hábiles',
    scope: 'Revisión rápida de banderas en estados financieros con semáforo por dimensión.',
    audience: 'Abogados M&A · contadores · inversionistas',
  },
  {
    title: 'Credit / Solvency Review',
    timeline: '1 semana',
    scope: 'Capacidad de pago: cobertura de intereses, DSCR, liquidez, vencimientos, calidad de caja.',
    audience: 'Acreedores · proveedores · tesorerías',
  },
  {
    title: 'Panama Market Research',
    timeline: '2 semanas',
    scope: 'Research sectorial o de emisor Latinex/Panamá con comparables regionales y fuentes primarias (SBP, Latinex, SMV).',
    audience: 'Fondos · family offices · entrantes al mercado',
  },
  {
    title: 'AI-assisted Research Automation',
    timeline: 'Por proyecto',
    scope: 'Pipelines de extracción de PDFs, scoring forense automatizado y generación de memos — la infraestructura de AmethQuant adaptada a tu operación.',
    audience: 'Fintechs · fondos pequeños · research shops',
  },
  {
    title: 'Custom Dashboards for Investors',
    timeline: '1–2 semanas',
    scope: 'Dashboard Power BI o web sobre tu cartera, conectado al pipeline Excel → SQL → Python → BI.',
    audience: 'Inversionistas · gestores de cartera',
  },
];

const USE_CASES = [
  {
    q: '¿Vas a invertir o prestar a una empresa privada panameña?',
    a: 'El Forensic Screen detecta utilidades sin respaldo de caja antes de que firmes. En GRPOTX: FCO -$15.0M con utilidad reportada +$0.6M y DSO real de 669 días.',
    link: '/research/grupo-tx',
    linkText: 'Ver el caso GRPOTX →',
  },
  {
    q: '¿Necesitas una opinión independiente sobre un banco o fondo local?',
    a: 'Marco FIG completo: capital, morosidad, cobertura, eficiencia, concentración. Si el emisor es sólido, lo decimos — la credibilidad del AVOID depende de la honestidad del OUTPERFORM.',
    link: '/research/bgfg',
    linkText: 'Ver el coverage BGFG →',
  },
  {
    q: '¿Tu equipo pierde horas extrayendo datos de PDFs financieros?',
    a: 'Automatizamos extracción, ratios y scoring con Python + SQL, con verificación humana como regla de la casa.',
    link: '/research/msft',
    linkText: 'Ver la demostración metodológica →',
  },
];

export default function Services() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-100" />
      </div>

      <div className="relative z-10">
        <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">

          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-10 transition-colors">
            ← Volver al inicio
          </Link>

          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Servicios</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Research independiente, precio claro, entregable concreto
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mb-14">
            Cada servicio aplica la misma metodología publicada en este sitio: el cash flow precede
            al P&L, la calidad de utilidades importa más que el crecimiento, y las tesis se revisan con datos.
          </p>

          {/* Servicios principales */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">Servicios principales</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
            {OFFICIAL.map((s) => (
              <div key={s.title} className={`rounded-xl border ${s.accent} p-7 flex flex-col gap-4`}>
                <div className="flex items-start justify-between">
                  <p className={`text-sm font-medium ${s.labelColor}`}>{s.title}</p>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-slate-600">{s.timeline}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{s.scope}</p>
                <ul className="flex flex-col gap-1.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="text-xs text-slate-500 flex items-start gap-2">
                      <span className="text-blue-500 shrink-0">✓</span>{d}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-slate-600 border-t border-white/[0.05] pt-3">{s.limits}</p>
              </div>
            ))}
          </div>

          {/* Paquetes */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">Paquetes especializados</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {PACKAGES.map((p) => (
              <div key={p.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-white text-sm font-medium leading-snug">{p.title}</p>
                </div>
                <p className="text-[10px] text-slate-600 font-mono">{p.timeline}</p>
                <p className="text-slate-500 text-xs leading-relaxed flex-1">{p.scope}</p>
                <p className="text-[10px] text-slate-600 border-t border-white/[0.04] pt-3">{p.audience}</p>
              </div>
            ))}
          </div>

          {/* Casos de uso */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">Casos de uso</p>
          <div className="space-y-4 mb-14">
            {USE_CASES.map((u) => (
              <div key={u.q} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-white text-sm font-medium mb-2">{u.q}</p>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">{u.a}</p>
                <Link to={u.link} className="text-blue-400 text-xs hover:text-blue-300 transition-colors">{u.linkText}</Link>
              </div>
            ))}
          </div>

          {/* Política comercial + CTA */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-4">Cómo trabajamos</p>
            <ul className="text-slate-400 text-sm leading-relaxed space-y-1.5 mb-6">
              <li>· Propuesta por escrito con alcance, entregable, timeline y precio antes de empezar.</li>
              <li>· 50% anticipo / 50% contra entrega. 1 ronda de revisión incluida.</li>
              <li>· Todo entregable cita fuentes primarias y diferencia dato, inferencia y opinión.</li>
              <li>· No aceptamos encargos que pidan justificar una conclusión predefinida.</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:eameth107@gmail.com?subject=Propuesta%20de%20servicio%20AmethQuant"
                className="px-6 py-3 rounded border border-blue-500/30 bg-blue-500/[0.08] text-blue-300 text-sm font-medium text-center hover:bg-blue-500/15 transition-all duration-200"
              >
                Pedir propuesta
              </a>
              <Link
                to="/work-with-me"
                className="px-6 py-3 rounded border border-white/[0.07] text-slate-400 text-sm font-medium text-center hover:text-slate-200 hover:border-white/[0.15] transition-all duration-200"
              >
                ¿Buscas contratar a un analista? →
              </Link>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
