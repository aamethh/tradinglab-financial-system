"""Generador de investment memos formato sell-side institucional.

Estructura oficial (método 23 del inventory): tesis, quality of earnings,
balance sheet forensics, valoración DCF 3 escenarios, risk matrix, catalysts.
Rating según threshold institucional oficial (método 20):
BUY requiere upside >15% · HOLD 0–15% · SELL/AVOID <0%.
"""
from datetime import date

DISCLAIMER = (
    "Este documento es research independiente con fines informativos. No constituye "
    "asesoría de inversión ni oferta de valores. Fuentes: estados financieros "
    "auditados y filings públicos citados en el cuerpo del memo. AmethQuant — "
    "amethquant.vercel.app"
)


def rating_from_upside(upside_pct: float) -> str:
    if upside_pct > 15:
        return "BUY"
    if upside_pct >= 0:
        return "HOLD"
    return "SELL/AVOID"


def build_memo(*, ticker, company, sector, analyst="Ameth Espinosa", price=None,
               intrinsic=None, thesis="", qoe="", flags=None, metrics=None,
               dcf=None, risks=None, catalysts=None, sources=None,
               conviction="Media") -> str:
    upside = None
    rating = "N/D"
    if price and intrinsic:
        upside = (intrinsic / price - 1) * 100
        rating = rating_from_upside(upside)

    lines = [
        f"# {company} ({ticker}) — Investment Memo",
        f"**Fecha:** {date.today().isoformat()} · **Analista:** {analyst} · AmethQuant",
        f"**Sector:** {sector}",
        f"**Rating:** {rating}" + (f" · Upside {upside:+.1f}% (threshold: BUY >15% · HOLD 0–15% · SELL/AVOID <0%)" if upside is not None else ""),
        f"**Convicción:** {conviction}",
        "",
        "## 1. Investment Thesis",
        thesis or "_Pendiente._",
        "",
        "## 2. Quality of Earnings (Schilit Framework)",
        qoe or "_Pendiente. Empezar por reconciliación FCO vs Utilidad Neta — el cash flow precede al P&L._",
    ]

    if flags:
        lines += ["", "## 3. Banderas Forenses",
                  "| Bandera | Hallazgo | Severidad |", "|---|---|---|"]
        lines += [f"| {f['flag']} | {f.get('finding','')} | {f.get('severity','')} |" for f in flags]

    if metrics:
        lines += ["", "## 4. Métricas Clave",
                  "| Métrica | Valor | Benchmark | Señal |", "|---|---|---|---|"]
        lines += [f"| {m['metric']} | {m['value']} | {m.get('benchmark','—')} | {m.get('signal','')} |" for m in metrics]

    if dcf:
        lines += ["", "## 5. Valoración — DCF 3 Escenarios (50/50 Gordon + Múltiplo de Salida)",
                  "| Escenario | WACC | TGR | Valor Intrínseco |", "|---|---|---|---|"]
        lines += [f"| {s['label']} | {s['wacc']} | {s['tgr']} | {s['value']} |" for s in dcf]

    if risks:
        lines += ["", "## 6. Risk Matrix", "| Riesgo | Detalle | Nivel |", "|---|---|---|"]
        lines += [f"| {r['risk']} | {r.get('detail','')} | {r.get('level','')} |" for r in risks]

    if catalysts:
        lines += ["", "## 7. Catalysts"] + [f"- {c}" for c in catalysts]

    lines += ["", "## 8. Fuentes"]
    lines += [f"- {s}" for s in (sources or ["Pendiente: citar filings primarios (regla de la casa)."])]
    lines += ["", "---", f"*{DISCLAIMER}*"]
    return "\n".join(lines)
