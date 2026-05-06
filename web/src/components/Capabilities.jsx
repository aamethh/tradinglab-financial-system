import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 0.03, 0.26, 1];

const CAPS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Análisis de Ratios Financieros',
    desc: 'Motor de ratios con 15+ métricas: márgenes, apalancamiento, liquidez y crecimiento. Detección automática de inconsistencias. Proyecciones multiperiodo desde fuentes 10-K.',
    tech: ['pandas', 'NumPy', 'Python 3.11'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: 'Simulación Monte Carlo (GBM)',
    desc: 'Motor GBM reproducible con 10.000 trayectorias por activo. Percentiles P5/P25/P50/P75/P95. Semilla configurable. Exportación nativa a Power BI y CSV.',
    tech: ['NumPy GBM', 'Matplotlib', 'Seaborn'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Valoración DCF — 3 Escenarios',
    desc: 'Modelo de 3 estados: P&L proyectado → FCF libre → WACC (CAPM) → Valor Terminal (Gordon + Múltiplo de Salida). Tabla de sensibilidad WACC × TGR de 9×5 celdas.',
    tech: ['DCF Engine', 'CAPM WACC', 'Sensitivity'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625v2.625m0 2.625v2.625M3.75 9v2.625m0 2.625v2.625" />
      </svg>
    ),
    title: 'Pipelines de Datos',
    desc: 'Flujo completo Excel → SQL Server → Python → Power BI. Conexión SQLAlchemy con autenticación Windows. Exportación automatizada a CSV, PDF (reportlab) e informes estructurados.',
    tech: ['SQLAlchemy', 'SQL Server', 'reportlab'],
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: 'Forensic Financial Analysis',
    desc: 'Detección de calidad de utilidades aplicando framework Schilit: revenue inflado, gastos diferidos, one-time gains presentados como recurrentes, capitalización agresiva. Reconciliación FCO vs Utilidad Neta, descomposición de patrimonio operativo vs revaluaciones cosméticas, lectura crítica de Asuntos de Énfasis del auditor. Aplicado a emisores Latinex sin cobertura sell-side global (caso GRPOTX).',
    tech: ['Schilit Framework', 'DSO Analytics', 'Audit Trail', 'Quality of Cash'],
  },
];

export default function Capabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="capacidades" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Capacidades</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Infraestructura analítica
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl">
            Módulos reutilizables construidos con estándares de gestoras institucionales.
            Cada componente es independiente, testeable y orientado a la entrega de valor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAPS.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              whileHover={{ scale: 1.02, boxShadow: '0 16px 50px rgba(0,0,0,0.45)' }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 flex flex-col gap-5 cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg border border-blue-500/20 bg-blue-500/[0.08] flex items-center justify-center text-blue-400 shrink-0">
                  {cap.icon}
                </div>
                <h3 className="text-white font-medium text-base leading-snug pt-1">{cap.title}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{cap.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/[0.04]">
                {cap.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded border border-white/[0.06] text-slate-500 text-[10px] font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
