# Research Frameworks (oficiales de la web)

## 1. Forensic / Quality of Earnings — Schilit Framework
Detecta: revenue inflado, gastos diferidos, one-time gains presentados como recurrentes,
capitalización agresiva. Herramientas:
- Reconciliación FCO vs Utilidad Neta (umbral 1.0x)
- DSO analytics (vs histórico y vs modelo)
- Descomposición patrimonio operativo vs revaluaciones cosméticas
- Lectura crítica de Asuntos de Énfasis del auditor
- ROIC vs WACC (test de creación de valor)
Caso: [[GRPOTX — HOLD a AVOID]]

## 2. Valoración — DCF 3 escenarios
P&L proyectado → FCF libre → WACC (CAPM: Rf + β×ERP) → Valor Terminal (Gordon + Múltiplo
de Salida, blend 50/50) → sensibilidad WACC × TGR (9×5).
Rating threshold: BUY >15% · HOLD 0–15% · SELL/AVOID <0%.
Caso: MSFT ($268/$424/$625).

## 3. Probabilístico — Monte Carlo GBM
10.000 trayectorias, semilla fija, percentiles P5/P25/P50/P75/P95, fan chart.
Inputs: μ y σ de crecimiento histórico. Output: bandas de escenarios.
Código: `core/monte_carlo.py`.

## 4. FIG (bancos) — ver [[04-Banking Analysis]]
ROE decomposition · P/B vs peers · AUM growth · capital adequacy. Caso: BGFG.

## 5. Fixed Income — comparativo
Duration · credit risk · peer benchmarking (tabla multi-dimensión) · macro sensitivity.
Caso: FGIN vs Fondo Global vs MMG FI.

## Flujo estándar de un coverage
1. Filing primario (Latinex/SEC) → registrar en DB con URL
2. Extracción + verificación humana de line items
3. Motor de ratios (15+) → señales
4. Checklist forense (si aplica) → banderas con severidad
5. DCF 3 escenarios + Monte Carlo (si hay base para proyectar)
6. Memo sell-side: tesis → QoE → forensics → valoración → risk matrix → catalysts → fuentes
7. Rating por threshold + convicción. Revisar al llegar nuevos estados auditados.
