import { Link } from 'react-router-dom';

const FORENSIC_FINDINGS = [
  {
    flag: 'Revenue Pull-Forward',
    finding: 'Ingresos crecen +18% YoY mientras sector Latinex presenta contracción moderada.',
    implication: 'Posible aceleración artificial de reconocimiento de ingresos. DSO expanded +14 días vs ejercicio previo.',
    severity: 'Alta',
    severityColor: 'text-red-400 border-red-500/30 bg-red-500/[0.06]',
  },
  {
    flag: 'One-Time Gains (Recurrentes)',
    finding: 'Ganancias extraordinarias reportadas en 4 períodos consecutivos (Q4 2023–Q3 2025).',
    implication: 'Patrón inconsistente con framing "one-time". Excluir estos ítems reduce EBITDA reportado en ~22%.',
    severity: 'Alta',
    severityColor: 'text-red-400 border-red-500/30 bg-red-500/[0.06]',
  },
  {
    flag: 'Capitalización Agresiva',
    finding: 'Capex/Ingresos ratio sube a 9.8% vs promedio histórico de 5.1%. Activos intangibles +34% YoY.',
    implication: 'Diferimiento de costos operativos vía capitalización. Ajuste a FCO reduce flujo en ~$3.2M estimado.',
    severity: 'Media',
    severityColor: 'text-amber-400 border-amber-500/30 bg-amber-500/[0.06]',
  },
  {
    flag: 'Reconciliación FCO vs Utilidad Neta',
    finding: 'Utilidad neta +12% pero FCO –8%. Brecha acumulada $4.7M en 18 meses.',
    implication: 'Señal primaria del framework Schilit: earnings sin respaldo de caja. Calidad de utilidades: Baja.',
    severity: 'Crítica',
    severityColor: 'text-red-400 border-red-500/30 bg-red-500/[0.06]',
  },
];

const METRICS = [
  { label: 'FCO / Utilidad Neta', value: '0.61x', vs: '1.0x+ (threshold)', signal: 'Bajo umbral' },
  { label: 'DSO', value: '74 días', vs: '60 días (histórico)', signal: 'Deteriorado' },
  { label: 'Deuda / EBITDA Ajustado', value: '3.8x', vs: '2.5x (2023)', signal: 'En alza' },
  { label: 'EBITDA Ajustado (ex one-time)', value: '–22% vs reportado', vs: 'EBITDA oficial', signal: 'Material' },
];

const TIMELINE = [
  { date: 'Q3 2025', rating: 'HOLD', color: 'text-amber-400', note: 'Señales forenses detectadas. Monitoreo activo iniciado.' },
  { date: 'Q4 2025', rating: 'HOLD', color: 'text-amber-400', note: 'Confirmación brecha FCO vs utilidad. Thesis deteriorada.' },
  { date: 'Mar 2026', rating: 'AVOID', color: 'text-red-400', note: 'Patrón recurrente confirmado. 4 banderas Schilit activas.' },
];

export default function ResearchGrupoTx() {
  return (
    <div className="relative min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div
          className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 60%)' }}
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

          {/* Institutional memo box */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 mb-8">
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Memo institucional completo disponible bajo solicitud. Incluye investment thesis, quality of
              earnings analysis, balance sheet forensics, DCF de 3 escenarios, risk matrix cuantificada y catalysts.
            </p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest">
              Metodología: Schilit Framework · DSO Analytics · FCO Reconciliation
            </p>
          </div>

          {/* Forensic findings table */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">
              Hallazgos Forenses — 4 Banderas Activas
            </p>
            <div className="space-y-3">
              {FORENSIC_FINDINGS.map((f) => (
                <div key={f.flag} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-white text-sm font-medium">{f.flag}</p>
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-mono shrink-0 ${f.severityColor}`}>
                      {f.severity}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-1">{f.finding}</p>
                  <p className="text-slate-600 text-xs leading-relaxed">{f.implication}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key metrics */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">
              Métricas Clave 2025 — vs Proyección Interna
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-[10px] text-slate-600 uppercase tracking-widest pb-3 pr-4">Métrica</th>
                    <th className="text-left text-[10px] text-slate-600 uppercase tracking-widest pb-3 pr-4">Valor</th>
                    <th className="text-left text-[10px] text-slate-600 uppercase tracking-widest pb-3 pr-4">Benchmark</th>
                    <th className="text-left text-[10px] text-slate-600 uppercase tracking-widest pb-3">Señal</th>
                  </tr>
                </thead>
                <tbody>
                  {METRICS.map((m) => (
                    <tr key={m.label} className="border-b border-white/[0.03]">
                      <td className="py-3 pr-4 text-slate-300 text-xs">{m.label}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-red-400">{m.value}</td>
                      <td className="py-3 pr-4 text-slate-500 text-xs">{m.vs}</td>
                      <td className="py-3 text-red-400 text-xs">{m.signal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Coverage timeline */}
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-5">
              Timeline de Coverage
            </p>
            <div className="space-y-3">
              {TIMELINE.map((t) => (
                <div key={t.date} className="flex items-start gap-5">
                  <div className="shrink-0 w-20">
                    <p className="font-mono text-xs text-slate-500">{t.date}</p>
                    <p className={`font-mono text-xs font-semibold ${t.color}`}>{t.rating}</p>
                  </div>
                  <div className="h-full border-l border-white/[0.06] pl-5">
                    <p className="text-slate-400 text-sm">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
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
