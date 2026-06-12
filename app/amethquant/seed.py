"""Seed inicial: los 4 coverages publicados en amethquant.vercel.app.

Todos los datos provienen literalmente de la web (web/src/) — nada inventado.
"""
from . import db


def seed():
    if db.query("SELECT id FROM companies LIMIT 1"):
        return False  # ya sembrado

    companies = [
        ("GRPOTX", "Grupo TX, S.A. y Subsidiarias", "Conglomerado", "Panamá", "Latinex", "forensic",
         "Coverage forense flagship. AVOID desde Mar 2026."),
        ("BGFG", "Grupo Financiero BG, S.A.", "Banking + Asset Management", "Panamá", "Latinex", "fig",
         "OUTPERFORM. Tesis: banco transformándose en asset manager."),
        ("FGIN", "Fondo General de Inversiones", "Renta Fija USD", "Panamá", "Latinex", "fixed_income",
         "CORE POSITION. Comparativo vs Fondo Global y MMG FI."),
        ("MSFT", "Microsoft Corporation", "Software Enterprise / Cloud / IA", "EEUU", "NASDAQ", "megacap",
         "HOLD. Caso de demostración metodológica (DCF 3 escenarios + GBM)."),
    ]
    ids = {}
    for t, n, s, c, e, v, notes in companies:
        ids[t] = db.execute(
            "INSERT INTO companies (ticker,name,sector,country,exchange,vertical,notes) VALUES (?,?,?,?,?,?,?)",
            (t, n, s, c, e, v, notes))

    grpotx_flags = [
        ("Revenue Pull-Forward", "Ingresos +18% YoY con sector Latinex en contracción moderada. DSO +14 días.", "Posible aceleración artificial de reconocimiento de ingresos.", "Alta"),
        ("One-Time Gains (Recurrentes)", "Ganancias extraordinarias en 4 períodos consecutivos (Q4 2023–Q3 2025).", "Excluirlas reduce EBITDA reportado ~22%.", "Alta"),
        ("Capitalización Agresiva", "Capex/Ingresos 9.8% vs 5.1% histórico. Intangibles +34% YoY.", "Ajuste a FCO reduce flujo ~$3.2M estimado.", "Media"),
        ("Reconciliación FCO vs UN", "Utilidad neta +12% pero FCO –8%. Brecha acumulada $4.7M en 18 meses.", "Señal primaria Schilit. Calidad de utilidades: Baja.", "Crítica"),
    ]
    for flag, finding, impl, sev in grpotx_flags:
        db.execute("INSERT INTO forensic_flags (company_id,flag,finding,implication,severity,period) VALUES (?,?,?,?,?,?)",
                   (ids["GRPOTX"], flag, finding, impl, sev, "FY2025"))

    metrics = [
        ("GRPOTX", "FY2025", "Ingresos", 35.7, "USD M", "-4.2% YoY"),
        ("GRPOTX", "FY2025", "FCO", -15.0, "USD M", "Negativo con UN positiva"),
        ("GRPOTX", "FY2025", "Cobertura de intereses", 1.22, "< 2.0x threshold", "Estrés"),
        ("GRPOTX", "FY2025", "Patrimonio operativo", -10.7, "USD M", "Negativo real"),
        ("GRPOTX", "FY2025", "FCO/UN", 0.61, "1.0x+ threshold", "Bajo umbral"),
        ("GRPOTX", "FY2025", "DSO", 669, "53d modelo inicial", "Deteriorado"),
        ("GRPOTX", "FY2025", "ROIC", 1.35, "WACC 7.65%", "Destrucción de valor"),
        ("BGFG", "FY2025", "AUM Growth YoY", 20.9, "%", "Supera benchmarks regionales"),
        ("BGFG", "FY2025", "ROAE", 21.2, "%", "Top-quartile Latinex"),
        ("BGFG", "FY2025", "Capital Ratio BIS III", 27.2, "10.5% mínimo", "Buffer robusto"),
        ("BGFG", "FY2025", "Cost-to-Income", 28.1, "%", "Best-in-class"),
        ("BGFG", "FY2025", "NPL Coverage", 124.3, "152.6% previo", "En declinación — monitorear"),
        ("MSFT", "FY2024", "Margen Bruto", 69.8, "%", "Mejor de su clase"),
        ("MSFT", "FY2024", "Margen EBITDA", 51.0, "%", "Economías de plataforma"),
        ("MSFT", "FY2024", "ROE", 32.8, "%", "Alto retorno patrimonial"),
        ("MSFT", "FY2024", "Deuda/EBITDA", 0.36, "x", "Apalancamiento mínimo"),
    ]
    for t, p, m, v, b, s in metrics:
        db.execute("INSERT INTO metrics (company_id,period,metric,value,benchmark,signal) VALUES (?,?,?,?,?,?)",
                   (ids[t], p, m, v, b, s))

    memos = [
        ("GRPOTX", "GRPOTX — Coverage Update Mar 2026", "AVOID", "Alta", None,
         "Timeline: HOLD Q3 2025 → HOLD Q4 2025 → AVOID Mar 2026 (post audited FY). "
         "4 banderas Schilit activas. Memo institucional completo en repo grupo-tx-fintech-analysis."),
        ("BGFG", "BGFG — Financial Institutions Mar 2026", "OUTPERFORM", "Alta", None,
         "Tesis: banco transformándose en asset manager. AUM $19.9B crece 3× más rápido que loans."),
        ("FGIN", "FGIN — Comparative Analysis Dic 2025", "CORE POSITION", None, None,
         "Mejor balance retorno/riesgo (6.2–7.0%, duración 2.1 años) vs Fondo Global y MMG FI."),
        ("MSFT", "MSFT — DCF + Monte Carlo Abr 2026", "HOLD", "Media", 1.0,
         "Valor intrínseco base $424 vs precio ~$420. Upside +1% no califica BUY (threshold >15%)."),
    ]
    for t, title, rating, conv, upside, body in memos:
        db.execute("INSERT INTO memos (company_id,title,rating,conviction,upside_pct,body_md,published) VALUES (?,?,?,?,?,?,1)",
                   (ids[t], title, rating, conv, upside, body))

    db.execute("INSERT INTO case_studies (company_id,title,summary,body_md,public) VALUES (?,?,?,?,1)",
               (ids["GRPOTX"],
                "Caso GRPOTX: cómo el análisis forense cambió un HOLD a AVOID",
                "Detección de 4 banderas Schilit en emisor Latinex sin cobertura sell-side. "
                "DSO real 669 días vs 53 del modelo inicial; FCO -$15.0M contra utilidad reportada +$0.6M.",
                _GRPOTX_CASE))
    return True


_GRPOTX_CASE = """\
## Contexto
Grupo TX, S.A. (GRPOTX) es un conglomerado panameño listado en Latinex sin cobertura
sell-side global. Iniciación de coverage en Q3 2025 con rating HOLD.

## Qué encontró el análisis forense (Schilit Framework)
1. **Revenue Pull-Forward** — ingresos +18% YoY con el sector en contracción; DSO +14 días.
2. **One-time gains recurrentes** — 4 períodos consecutivos; sin ellos el EBITDA cae ~22%.
3. **Capitalización agresiva** — Capex/Ingresos 9.8% vs 5.1% histórico; intangibles +34% YoY.
4. **FCO vs Utilidad Neta** — UN +12% pero FCO –8%; brecha acumulada $4.7M en 18 meses.

## Confirmación con estados auditados (Mar 2026)
- DSO real: **669 días** (el modelo inicial asumía 53).
- FCO **-$15.0M** con utilidad neta reportada **+$0.6M**.
- Asunto de Énfasis del auditor (Nota 17).
- ROIC 1.35% vs WACC 7.65% — destrucción de valor.
- Patrimonio operativo **-$10.7M** excluyendo revaluaciones.
- Cobertura de intereses 1.22x (< 2.0x).

## Decisión
HOLD → AVOID, convicción alta. Principio operativo #3 de AmethQuant: las tesis se
revisan con datos; la disciplina de matar tesis equivocadas vale más que tener razón
al primer intento.

## Por qué importa para un cliente
El mismo proceso aplicado antes de invertir, prestar o adquirir habría evitado
exposición a un emisor con utilidades sin respaldo de caja.

*Fuente: coverage publicado en amethquant.vercel.app/research/grupo-tx. Memo
institucional completo disponible bajo solicitud.*
"""
