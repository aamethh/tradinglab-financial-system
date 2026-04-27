"""
analysis/msft_2024/run_dcf.py
------------------------------
MSFT DCF valuation — 3 scenarios (Bear / Base / Bull).
Appends a DCF Valuation section to investment_brief.md.
Source: Microsoft 10-K FY2024 | April 2026 market assumptions
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

import pandas as pd
from core import dcf

HERE = Path(__file__).parent


# ── WACC Derivation (CAPM) ────────────────────────────────────────────────────
# 10-yr Treasury yield (April 2026): 4.3%
# Equity Risk Premium (Damodaran US ERP): 5.5%
# MSFT levered beta: 0.90 (5yr monthly vs S&P 500)
# Pre-tax cost of debt: 3.2% (Aaa/AAA rated, Aug-2027 senior notes yield)
# Market cap estimate (April 2026): ~$3,100,000M
# Total debt (FY2024 10-K): $44,937M
WACC = dcf.calc_wacc(
    rfr          = 0.043,
    erp          = 0.055,
    beta         = 0.90,
    cost_of_debt = 0.032,
    tax_rate     = 0.18,
    equity_value = 3_100_000,
    debt_value   =    44_937,
)

# ── Shared Inputs ─────────────────────────────────────────────────────────────
# FY2024 10-K balance sheet:
#   Cash + ST investments: $75,545M | Total debt: $44,937M -> net cash: $30,608M
# Shares outstanding (diluted, FY2024): 7,430M
COMMON = dict(
    base_revenue  = 245_122,    # FY2024 revenue ($M)
    da_pct        = 0.063,      # D&A / revenue  (FY2024: $15,500M / $245,122M)
    tax_rate      = 0.18,       # effective tax rate (FY2024 10-K)
    capex_pct     = 0.09,       # normalized capex % (FY2024 actual 18% is AI peak-cycle)
    nwc_pct       = 0.010,      # NWC / revenue; delta_NWC = nwc_pct * revenue change
    exit_multiple = 22.0,       # EV/EBITDA exit (MSFT 3yr avg: 25x; discount for terminal)
    net_debt      = -30_608,    # negative = net cash position
    shares        = 7_430,      # diluted shares (M)
    base_year     = 2024,
)

SCENARIOS = {
    "Bear": dict(
        growth_rates   = [0.09, 0.08, 0.08, 0.07, 0.07],   # regulatory drag + AI delay
        ebitda_margin  = 0.49,                               # margin compression
        wacc           = round(WACC + 0.015, 4),             # +150bps risk premium
        terminal_growth = 0.025,
    ),
    "Base": dict(
        growth_rates   = [0.15, 0.14, 0.13, 0.13, 0.12],   # consensus + AI tailwind
        ebitda_margin  = 0.52,
        wacc           = round(WACC, 4),
        terminal_growth = 0.035,
    ),
    "Bull": dict(
        growth_rates   = [0.18, 0.17, 0.16, 0.15, 0.14],   # full AI monetization
        ebitda_margin  = 0.55,                               # operating leverage kicks in
        wacc           = round(WACC - 0.015, 4),             # lower risk premium
        terminal_growth = 0.040,
    ),
}

# Fixed sensitivity ranges (clean round numbers for presentation)
WACC_RANGE = [round(0.075 + i * 0.005, 3) for i in range(9)]   # 7.5% to 11.5%
TGR_RANGE  = [round(0.025 + i * 0.005, 3) for i in range(5)]   # 2.5% to 4.5%


# ── Run All Scenarios ─────────────────────────────────────────────────────────
results = {}
for name, overrides in SCENARIOS.items():
    params = {**COMMON, **overrides, "wacc_range": WACC_RANGE, "tgr_range": TGR_RANGE}
    results[name] = dcf.run(**params)

base = results["Base"]
bear = results["Bear"]
bull = results["Bull"]


# ── Console Output ────────────────────────────────────────────────────────────
print(f"\nWACC (CAPM-derived): {WACC:.2%}\n")

print("== BASE CASE — 5-Year Projections ($M) ==")
proj = base["projections"].copy()
proj_display = proj[["year", "revenue", "ebitda", "ebit", "nopat", "capex", "fcf"]].copy()
for col in ["revenue", "ebitda", "ebit", "nopat", "capex", "fcf"]:
    proj_display[col] = proj_display[col].apply(lambda x: f"${x:,.0f}")
print(proj_display.to_string(index=False))

print("\n== VALUATION SUMMARY ==")
summary_rows = []
for name, res in results.items():
    summary_rows.append({
        "Scenario": name,
        "WACC":     f"{res['wacc']:.1%}",
        "TGR":      f"{res['terminal_growth']:.1%}",
        "Gordon ($)": f"${res['gordon']['price']:,.0f}",
        "Exit Mult ($)": f"${res['exit']['price']:,.0f}",
        "Blended ($)": f"${res['price_avg']:,.0f}",
    })
print(pd.DataFrame(summary_rows).to_string(index=False))

print("\n== SENSITIVITY TABLE (Gordon Growth | Base Projections) ==")
print("   Rows = WACC | Cols = Terminal Growth Rate | Values = Price/Share ($)")
print(base["sensitivity"].to_string())
print()


# ── Build DCF Section for Investment Brief ────────────────────────────────────
sens_df = base["sensitivity"]

def _sens_md(df: pd.DataFrame, base_wacc: float, base_tgr: float) -> str:
    """Format sensitivity DataFrame as a markdown table. Bold the base case cell."""
    wacc_label = f"{base_wacc * 100:.1f}%"
    tgr_label  = f"{base_tgr * 100:.1f}%"
    cols = list(df.columns)
    header  = "| WACC \\ TGR | " + " | ".join(cols) + " |"
    divider = "|" + "---|" * (len(cols) + 1)
    rows = [header, divider]
    for idx, row in df.iterrows():
        cells = []
        for col in cols:
            val = row[col]
            cell = f"**${val:,.0f}**" if (idx == wacc_label and col == tgr_label) else f"${val:,.0f}"
            cells.append(cell)
        rows.append(f"| {idx} | " + " | ".join(cells) + " |")
    return "\n".join(rows)


proj_base = base["projections"]
proj_rows = []
for _, r in proj_base.iterrows():
    proj_rows.append(
        f"| FY{int(r['year'])} | ${r['revenue']/1000:.1f}B | ${r['ebitda']/1000:.1f}B "
        f"| {r['ebit_margin']:.1%} | ${r['fcf']/1000:.1f}B | {r['fcf_margin']:.1%} |"
    )
proj_table = "\n".join(proj_rows)

sens_md = _sens_md(sens_df, SCENARIOS["Base"]["wacc"], SCENARIOS["Base"]["terminal_growth"])

dcf_section = f"""
---

## DCF Valuation

**WACC:** {WACC:.2%} (CAPM: Rf={4.3:.1f}% | ERP={5.5:.1f}% | Beta=0.90 | Kd={3.2:.1f}% | {98.6:.1f}% equity / {1.4:.1f}% debt)
**Net Cash Position:** $30,608M (Cash+STI $75,545M minus Debt $44,937M)
**Diluted Shares:** 7,430M

### Base Case Projections ($M)

| Year | Revenue | EBITDA | EBIT Margin | FCF | FCF Margin |
|------|--------:|-------:|------------:|----:|-----------:|
{proj_table}

*Capex assumption: 9% of revenue (normalized; FY2024 actual ~18% reflects AI data center peak cycle)*

### Scenario Valuation Summary

| Scenario | Revenue CAGR | EBITDA Margin | WACC | Terminal Growth | Gordon | Exit Multiple | Blended |
|----------|-------------:|--------------:|-----:|----------------:|-------:|--------------:|--------:|
| Bear | {sum(SCENARIOS['Bear']['growth_rates'])/5:.1%} avg | {SCENARIOS['Bear']['ebitda_margin']:.0%} | {bear['wacc']:.1%} | {bear['terminal_growth']:.1%} | ${bear['gordon']['price']:,.0f} | ${bear['exit']['price']:,.0f} | **${bear['price_avg']:,.0f}** |
| Base | {sum(SCENARIOS['Base']['growth_rates'])/5:.1%} avg | {SCENARIOS['Base']['ebitda_margin']:.0%} | {base['wacc']:.1%} | {base['terminal_growth']:.1%} | ${base['gordon']['price']:,.0f} | ${base['exit']['price']:,.0f} | **${base['price_avg']:,.0f}** |
| Bull | {sum(SCENARIOS['Bull']['growth_rates'])/5:.1%} avg | {SCENARIOS['Bull']['ebitda_margin']:.0%} | {bull['wacc']:.1%} | {bull['terminal_growth']:.1%} | ${bull['gordon']['price']:,.0f} | ${bull['exit']['price']:,.0f} | **${bull['price_avg']:,.0f}** |

*Gordon Growth = FCF perpetuity. Exit Multiple = {COMMON['exit_multiple']:.0f}x EV/EBITDA on terminal EBITDA. Blended = 50/50 average.*

**Valuation range: ${bear['price_avg']:,.0f} (Bear) — ${base['price_avg']:,.0f} (Base) — ${bull['price_avg']:,.0f} (Bull)**

### Sensitivity Table — Intrinsic Price per Share
*Base case projections | Gordon Growth terminal value | Bold = base case assumption*

{sens_md}

*TV represents {base['gordon']['tv_pv_pct']:.0%} of Enterprise Value in base case — normal for high-quality compounder with long reinvestment runway.*

"""

# Append DCF section before Bottom Line
brief_path = HERE / "investment_brief.md"
existing   = brief_path.read_text(encoding="utf-8")

MARKER = "\n## Bottom Line\n"
if MARKER in existing:
    updated = existing.replace(MARKER, dcf_section + MARKER)
else:
    updated = existing + dcf_section

brief_path.write_text(updated, encoding="utf-8")
print("[OK] investment_brief.md updated with DCF Valuation section")
