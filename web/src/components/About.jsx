import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 0.03, 0.26, 1];

const STACK = [
  { name: 'Python 3.11', role: 'Motor analítico' },
  { name: 'pandas / NumPy', role: 'Manipulación de datos' },
  { name: 'SQLAlchemy', role: 'Conector SQL Server' },
  { name: 'Matplotlib / Seaborn', role: 'Visualización' },
  { name: 'reportlab', role: 'Generación de PDF' },
  { name: 'React 18', role: 'Interfaz web' },
  { name: 'Tailwind CSS', role: 'Sistema de diseño' },
  { name: 'Framer Motion', role: 'Animaciones' },
];

const STANDARDS = [
  'Modelos DCF de 3 escenarios con tabla de sensibilidad',
  'Simulación GBM reproducible con semilla fija',
  'Pipelines de datos auditables Excel → SQL → Python',
  'Informes estructurados en inglés y español',
  'Arquitectura modular reutilizable entre proyectos',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="acerca" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Acerca</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            TradingLab
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="flex flex-col gap-6"
          >
            <p className="text-slate-300 text-base leading-relaxed">
              TradingLab es una plataforma de análisis financiero cuantitativo construida con estándares
              de gestoras institucionales de primer nivel (BlackRock, JP Morgan). El sistema integra
              modelos propietarios de valoración, simulación estocástica y pipelines de datos en un
              entorno reproducible y auditables.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Cada análisis parte de datos primarios (informes 10-K, 10-Q), aplica ratios calculados
              desde cero y construye un modelo DCF de tres escenarios con tabla de sensibilidad
              WACC × TGR. El objetivo no es complejidad: es claridad institucional.
            </p>

            <div className="pt-2">
              <p className="text-[10px] tracking-[0.18em] uppercase text-slate-600 mb-4">
                Estándares de entrega
              </p>
              <ul className="flex flex-col gap-2.5">
                {STANDARDS.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="text-blue-500 mt-0.5 shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="flex flex-col gap-4"
          >
            <p className="text-[10px] tracking-[0.18em] uppercase text-slate-600 mb-2">Stack tecnológico</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STACK.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-0.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-4 py-3"
                >
                  <span className="font-mono text-sm text-slate-200 font-medium">{item.name}</span>
                  <span className="text-[10px] text-slate-600">{item.role}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/[0.05] bg-white/[0.02] p-5">
              <p className="text-[10px] tracking-[0.18em] uppercase text-slate-600 mb-3">Metodología</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Datos 10-K primarios',
                  'DCF 3 escenarios',
                  'CAPM WACC',
                  'Gordon Growth + Múltiplo',
                  'GBM 10k rutas',
                  'Sens. WACC × TGR',
                  'Bilingüe EN / ES',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded border border-white/[0.06] text-slate-500 text-[10px] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
