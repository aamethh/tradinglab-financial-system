import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0.22, 0.03, 0.26, 1];

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/[0.04]" />
    </div>
  );
}

function CardSection({ title, children }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-widest text-slate-600 mb-2">{title}</p>
      {children}
    </div>
  );
}

function MetricRow({ label, value, indicator, note }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-xs text-slate-500 shrink-0">{label}</span>
      <span className="font-mono text-xs text-slate-300 text-right flex items-baseline gap-1">
        {value}
        {indicator && <span>{indicator}</span>}
        {note && <span className="text-slate-600 text-[10px]">{note}</span>}
      </span>
    </div>
  );
}

// ── ForensicCard — GRPOTX flagship ────────────────────────────────────────────

function ForensicCard({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      className="rounded-xl border border-red-500/20 bg-red-500/[0.02] p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-2xl font-semibold text-white mb-1">GRPOTX</div>
          <div className="text-slate-300 text-sm font-medium">Grupo TX, S.A. y Subsidiarias</div>
          <div className="text-slate-500 text-xs mt-0.5">Conglomerado · Panamá · Latinex</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="px-2.5 py-1 rounded border border-red-500/30 bg-red-500/[0.08] text-red-400 text-xs font-medium font-mono">
            AVOID
          </span>
          <span className="text-[10px] text-slate-600">Convicción Alta</span>
        </div>
      </div>

      {/* Body: 2 columnas en md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <CardSection title="Coverage Timeline">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-slate-600 w-16 shrink-0">Initiation</span>
              <span className="text-xs text-slate-400">HOLD · Q3 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-slate-600 w-16 shrink-0">Update</span>
              <span className="text-xs text-slate-400">
                AVOID · Mar 2026{' '}
                <span className="text-slate-600">(post audited FY)</span>
              </span>
            </div>
          </div>
        </CardSection>

        <CardSection title="Detección Forense">
          <ul className="flex flex-col gap-1.5">
            {[
              'DSO real 669 días vs 53 días en modelo inicial',
              'FCO -$15.0M con utilidad neta reportada +$0.6M',
              'Asunto de Énfasis del auditor (Nota 17)',
              'ROIC 1.35% vs WACC 7.65% — destrucción de valor',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-yellow-500 shrink-0 mt-0.5">⚠</span>
                {item}
              </li>
            ))}
          </ul>
        </CardSection>
      </div>

      {/* Métricas Clave 2025 */}
      <CardSection title="Métricas Clave 2025">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
          {[
            { label: 'Ingresos',       value: '$35.7M',  note: '-4.2% YoY',      indicator: '🟡' },
            { label: 'FCO',            value: '-$15.0M', note: '',                indicator: '🔴' },
            { label: 'Cob. intereses', value: '1.22x',   note: '< 2.0x',         indicator: '🔴' },
            { label: 'Patrimonio op.', value: '-$10.7M', note: 'negativo real',   indicator: '🔴' },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-white/[0.04] bg-black/20 p-3">
              <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">{m.label}</p>
              <p className="font-mono text-sm font-medium text-slate-200">
                {m.value} {m.indicator}
              </p>
              {m.note && <p className="text-[10px] text-slate-600 mt-0.5">{m.note}</p>}
            </div>
          ))}
        </div>
      </CardSection>

      {/* Tags + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
        <div className="flex flex-wrap gap-1.5">
          {['Schilit Framework', 'DCF 3 Escenarios', 'Quality of Cash', 'Audit Trail Reconciliation'].map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded border border-white/[0.06] text-slate-500 text-[10px] font-mono">
              {tag}
            </span>
          ))}
        </div>
        <Link
          to="/research/grupo-tx"
          className="shrink-0 px-5 py-2 rounded border border-red-500/25 bg-red-500/[0.06] text-red-400 text-sm font-medium hover:bg-red-500/[0.10] hover:border-red-400/35 transition-all duration-200 whitespace-nowrap"
        >
          Ver coverage completo →
        </Link>
      </div>
    </motion.div>
  );
}

// ── StandardCard — shell reutilizable (BGFG, FGIN, MSFT) ─────────────────────

function StandardCard({ ticker, badgeText, badgeClass, company, sector, conviction, children, tags, ctaText, ctaTo, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xl font-semibold text-white mb-0.5">{ticker}</div>
          <div className="text-slate-300 text-sm leading-snug">{company}</div>
          <div className="text-slate-500 text-xs mt-0.5">{sector}</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`px-2.5 py-1 rounded border text-xs font-medium font-mono ${badgeClass}`}>
            {badgeText}
          </span>
          {conviction && (
            <span className="text-[10px] text-slate-600">Convicción {conviction}</span>
          )}
        </div>
      </div>

      {/* Secciones */}
      <div className="flex flex-col gap-4 flex-1">
        {children}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded border border-white/[0.06] text-slate-500 text-[10px] font-mono">
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to={ctaTo}
        className="w-full py-2 rounded border border-white/[0.08] text-slate-400 text-sm text-center font-medium hover:text-slate-200 hover:border-white/[0.15] transition-all duration-200"
      >
        {ctaText}
      </Link>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="portafolio" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 mb-3">Portafolio</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Research activo
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-xl">
            4 coverages en 3 verticales: forensic equity, financial institutions, y fixed income.
          </p>
        </motion.div>

        {/* ── SECCIÓN 1: GRPOTX flagship ── */}
        <SectionLabel label="Coverage Forense — Análisis Destacado" />
        <div className="mb-16">
          <ForensicCard inView={inView} />
        </div>

        {/* ── SECCIONES 2/3/4: grid 3 cards ── */}
        <SectionLabel label="Coverage Activo — 3 Verticales" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* BGFG */}
          <StandardCard
            ticker="BGFG"
            badgeText="OUTPERFORM"
            badgeClass="border-emerald-500/30 bg-emerald-500/[0.07] text-emerald-400"
            company="Grupo Financiero BG, S.A."
            sector="Banking + Asset Management · Panamá · Latinex"
            conviction="Alta"
            tags={['P/B vs Regional Peers', 'ROE Decomposition', 'AUM Growth Analysis', 'Capital Adequacy']}
            ctaText="Ver coverage completo →"
            ctaTo="/research/bgfg"
            delay={0.15}
            inView={inView}
          >
            <CardSection title="Investment Thesis">
              <p className="text-xs text-slate-400 leading-relaxed">
                Banco transformándose en asset manager: AUM ($19.9B) crece 3× más rápido que loans.
              </p>
            </CardSection>
            <CardSection title="Métricas Clave 2025">
              <div className="flex flex-col gap-1.5">
                <MetricRow label="AUM Growth YoY" value="+20.9%" indicator="🟢" />
                <MetricRow label="ROAE"            value="21.2%"  indicator="🟢" note="top-tier LatAm" />
                <MetricRow label="Capital ratio"   value="27.2%" indicator="🟢" note="vs 10.5% min" />
                <MetricRow label="Cost-to-income"  value="28.1%" indicator="🟢" note="best-in-class" />
                <MetricRow label="NPL coverage"    value="124.3%" indicator="🟡" note="↓ from 152.6%" />
              </div>
            </CardSection>
            <CardSection title="Key Risks">
              <ul className="flex flex-col gap-1">
                {[
                  'NPL coverage en declinación (monitorear)',
                  'Concentración geográfica Panamá 85.8%',
                  'EGI controla 59.39% (gobierno corporativo)',
                ].map((r) => (
                  <li key={r} className="text-xs text-slate-500 flex items-start gap-1.5">
                    <span className="shrink-0">·</span>{r}
                  </li>
                ))}
              </ul>
            </CardSection>
          </StandardCard>

          {/* FGIN */}
          <StandardCard
            ticker="FGIN"
            badgeText="CORE POSITION"
            badgeClass="border-blue-500/25 bg-blue-500/[0.06] text-blue-300"
            company="Fondo General de Inversiones"
            sector="Renta Fija USD · Banco General · Soc. Inversión Cerrada"
            conviction={null}
            tags={['Duration Analysis', 'Credit Risk Assessment', 'Peer Benchmarking', 'Macro Sensitivity']}
            ctaText="Ver análisis comparativo →"
            ctaTo="/research/fgin"
            delay={0.22}
            inView={inView}
          >
            <CardSection title="Análisis Comparativo">
              <p className="text-xs text-slate-400 leading-relaxed">
                FGIN vs Fondo Global (Global Bank) vs MMG FI
              </p>
            </CardSection>
            <CardSection title="Posicionamiento">
              <div className="flex flex-col gap-1.5">
                <MetricRow label="Patrimonio"     value="~$555M"  note="Largest LatAm" />
                <MetricRow label="Duración"       value="~3 años" note="Conservadora" />
                <MetricRow label="Retorno típico" value="6–7%"    indicator="🟢" note="vs 5–6% peers" />
                <MetricRow label="Perfil"         value="Conservador-moderado" />
              </div>
            </CardSection>
            <CardSection title="Rol en Portafolio">
              <p className="text-xs text-slate-500 leading-relaxed">
                Pieza central (core) de renta fija USD. Comparado con Fondo Global (equilibrado) y MMG FI (satélite de mayor riesgo).
              </p>
            </CardSection>
          </StandardCard>

          {/* MSFT */}
          <StandardCard
            ticker="MSFT"
            badgeText="HOLD"
            badgeClass="border-yellow-500/25 bg-yellow-500/[0.06] text-yellow-400"
            company="Microsoft Corporation"
            sector="Methodology Demonstration · NASDAQ"
            conviction="Media"
            tags={['DCF 3 Escenarios', 'Monte Carlo GBM', 'Modelos Estocásticos', 'Sensibilidad WACC×TGR']}
            ctaText="Ver demostración metodológica →"
            ctaTo="/research/msft"
            delay={0.29}
            inView={inView}
          >
            <CardSection title="Nota Metodológica">
              <p className="text-xs text-slate-400 leading-relaxed">
                Caso para demostrar capacidades cuantitativas: DCF 3 escenarios, Monte Carlo GBM (10K trayectorias), modelos estocásticos aplicables a coverage frontier.
              </p>
            </CardSection>
            <CardSection title="Valoración">
              <div className="flex flex-col gap-1.5">
                <MetricRow label="Precio actual"        value="~$420" />
                <MetricRow label="Valor intrínseco DCF" value="$424" />
                <MetricRow label="Margen de seguridad"  value="1.0%" indicator="🟡" note="fair value" />
              </div>
            </CardSection>
            <CardSection title="Call">
              <p className="text-xs text-slate-500 leading-relaxed">
                Trading near intrinsic value. Insufficient margin of safety to recommend initiation.
                Reiterate HOLD pending Azure growth reassessment FY2026.
              </p>
            </CardSection>
          </StandardCard>

        </div>
      </div>
    </section>
  );
}
