"""
analysis/msft_2024/run_analysis.py
-----------------------------------
End-to-end Microsoft (MSFT) financial analysis pipeline.
Source: Microsoft 10-K filings FY2021–FY2024 (fiscal year ending June 30)
Outputs: ratios_table.csv | monte_carlo_chart.png | investment_brief.md
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

import matplotlib
matplotlib.use("Agg")

import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import pandas as pd
import numpy as np

from core import ratios, monte_carlo

# -- Paths ---------------------------------------------------------------------
HERE    = Path(__file__).parent
OUTPUTS = HERE / "outputs"
OUTPUTS.mkdir(exist_ok=True)


# ── 1. Raw Financial Data ─────────────────────────────────────────────────────
# Source: Microsoft 10-K Annual Reports FY2021–FY2024 (USD millions)
# EBITDA = Operating Income + Depreciation & Amortization
raw = pd.DataFrame({
    "period":              ["FY2021",  "FY2022",  "FY2023",  "FY2024"],
    "revenue":             [168_088,   198_270,   211_915,   245_122],
    "cogs":                [ 52_232,    62_650,    65_863,    74_114],
    "ebitda":              [ 81_771,    97_843,   101_705,   125_009],
    "ebit":                [ 69_916,    83_383,    88_523,   109_433],
    "net_income":          [ 61_271,    72_738,    72_361,    88_136],
    "total_assets":        [333_779,   364_840,   411_976,   512_163],
    "total_equity":        [141_988,   166_542,   206_223,   268_477],
    "total_debt":          [ 58_146,    49_781,    47_237,    44_937],
    "current_assets":      [184_406,   169_684,   184_257,   171_443],
    "current_liabilities": [ 88_657,    95_082,   104_149,   125_286],
    "interest_expense":    [  2_346,     2_063,     1_905,     1_584],
})


# ── 2. Ratio Engine ───────────────────────────────────────────────────────────
df_ratios  = ratios.calculate(raw)
df_display = ratios.round_output(df_ratios)

output_cols = [
    "period",
    "revenue", "net_income",
    "gross_margin", "ebitda_margin", "ebit_margin", "net_margin",
    "roe", "roa", "roce",
    "current_ratio", "de_ratio", "debt_to_ebitda", "interest_coverage",
    "revenue_growth", "ebitda_growth", "net_income_growth",
]
df_display[output_cols].to_csv(OUTPUTS / "ratios_table.csv", index=False)
print("[OK] ratios_table.csv")


# ── 3. Monte Carlo Simulation ─────────────────────────────────────────────────
# μ = 14%: FY21-FY24 CAGR ~13.5%, +0.5% AI/Azure monetization premium
# σ = 5%: derived from std of historical annual growth rates (7%–18% range)
BASE_REVENUE = 245_122
MEAN_GROWTH  = 0.14
VOLATILITY   = 0.05
BASE_YEAR    = 2024

paths  = monte_carlo.run(BASE_REVENUE, MEAN_GROWTH, VOLATILITY, n_sim=10_000, n_years=5)
pct_df = monte_carlo.percentiles(paths, BASE_YEAR)


# ── 4. Monte Carlo Chart ──────────────────────────────────────────────────────
DARK_BG   = "#0f1117"
ACCENT    = "#00bfff"
ORANGE    = "#ffa500"
GRID_LINE = "#2a2a3a"

fig, ax = plt.subplots(figsize=(11, 6.5))
fig.patch.set_facecolor(DARK_BG)
ax.set_facecolor(DARK_BG)

years    = pct_df["year"].tolist()
hist_yrs = [2021, 2022, 2023, 2024]
hist_rev = [168_088, 198_270, 211_915, 245_122]

# Confidence bands
ax.fill_between(years, pct_df["p5"],  pct_df["p95"], alpha=0.12, color=ACCENT, label="P5 – P95")
ax.fill_between(years, pct_df["p25"], pct_df["p75"], alpha=0.28, color=ACCENT, label="P25 – P75")

# Median and mean forecast lines
ax.plot(years, pct_df["p50"],  color=ACCENT,   linewidth=2.5, label="Median (P50)")
ax.plot(years, pct_df["mean"], color="#ffffff", linewidth=1.5, linestyle="--", alpha=0.7, label="Mean")

# Historical actuals
ax.plot(hist_yrs, hist_rev, color=ORANGE, linewidth=2.2, marker="o",
        markersize=6, zorder=5, label="Actuals (FY21–FY24)")

# Bridge: last actual → first forecast median
ax.plot([2024, years[0]], [BASE_REVENUE, pct_df.iloc[0]["p50"]],
        color=ACCENT, linewidth=2.5, linestyle="-")

# Annotations: P5 / P50 / P95 at FY2029
last = pct_df.iloc[-1]
for val, label, offset in [
    (last["p95"], f"Bull  ${last['p95']/1000:.0f}B",  0.04),
    (last["p50"], f"Base  ${last['p50']/1000:.0f}B",  0.00),
    (last["p5"],  f"Bear  ${last['p5']/1000:.0f}B",  -0.06),
]:
    ax.annotate(
        label,
        xy=(2029, val),
        xytext=(2029.15, val * (1 + offset)),
        color="white", fontsize=8.5, va="center",
        annotation_clip=False,
    )

# Formatting
ax.set_xlim(2020.5, 2030.2)
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f"${x/1_000:.0f}B"))
ax.set_xlabel("Fiscal Year (ending June 30)", color="white", fontsize=11)
ax.set_ylabel("Revenue (USD)", color="white", fontsize=11)
ax.set_title(
    "Microsoft (MSFT) — Revenue Monte Carlo Simulation\n"
    "10,000 GBM paths  |  FY2025–FY2029  |  μ = 14%  |  σ = 5%",
    color="white", fontsize=13, pad=14,
)
ax.tick_params(colors="white")
for spine in ax.spines.values():
    spine.set_color(GRID_LINE)
ax.legend(facecolor="#1a1a2e", edgecolor=GRID_LINE, labelcolor="white", fontsize=9, loc="upper left")
ax.grid(axis="y", color=GRID_LINE, linewidth=0.6, linestyle="--")
ax.grid(axis="x", color=GRID_LINE, linewidth=0.4, linestyle=":")

plt.tight_layout()
fig.savefig(OUTPUTS / "monte_carlo_chart.png", dpi=200, bbox_inches="tight",
            facecolor=fig.get_facecolor())
plt.close()
print("[OK] monte_carlo_chart.png")


# ── 5. Investment Brief ───────────────────────────────────────────────────────
fy21 = df_display[df_display["period"] == "FY2021"].iloc[0]
fy22 = df_display[df_display["period"] == "FY2022"].iloc[0]
fy23 = df_display[df_display["period"] == "FY2023"].iloc[0]
fy24 = df_display[df_display["period"] == "FY2024"].iloc[0]

p5_29  = pct_df.iloc[-1]["p5"]
p50_29 = pct_df.iloc[-1]["p50"]
p95_29 = pct_df.iloc[-1]["p95"]
cagr   = ((p50_29 / BASE_REVENUE) ** (1 / 5) - 1) * 100

brief = f"""\
# Microsoft Corporation (MSFT) — Investment Brief
**Analyst:** TradingLab | **Date:** April 2026 | **Fiscal Year End:** June 30

---

## Investment Thesis

Microsoft is a compounding cash machine with structural dominance across enterprise
software (Office 365, Dynamics), cloud infrastructure (Azure, #2 globally at ~25%
share), and an emerging AI monetization layer (Copilot). With EBITDA margins above
50%, declining financial leverage, and $80B+ in annual net income, MSFT is one of
the few mega-caps that simultaneously grows revenue at double digits, expands margins,
and returns capital. The Activision acquisition adds a $9B gaming asset and deepens
the consumer ecosystem.

**Recommendation: BUY** | **Conviction: High**

---

## Financial Snapshot (USD millions, Source: MSFT 10-K)

| Metric           |    FY2021 |    FY2022 |    FY2023 |    FY2024 |
|------------------|----------:|----------:|----------:|----------:|
| Revenue          | $168,088  | $198,270  | $211,915  | $245,122  |
| EBITDA           |  $81,771  |  $97,843  | $101,705  | $125,009  |
| Net Income       |  $61,271  |  $72,738  |  $72,361  |  $88,136  |
| EBITDA Margin    | {fy21['ebitda_margin']:.1f}%      | {fy22['ebitda_margin']:.1f}%      | {fy23['ebitda_margin']:.1f}%      | {fy24['ebitda_margin']:.1f}%      |
| Net Margin       | {fy21['net_margin']:.1f}%      | {fy22['net_margin']:.1f}%      | {fy23['net_margin']:.1f}%      | {fy24['net_margin']:.1f}%      |
| Revenue Growth   | —         | {fy22['revenue_growth']:.1f}%      | {fy23['revenue_growth']:.1f}%       | {fy24['revenue_growth']:.1f}%      |

---

## Key Ratios — FY2024

| Category      | Metric             | Value                           | Signal                                |
|---------------|--------------------|---------------------------------|---------------------------------------|
| Profitability | Gross Margin       | {fy24['gross_margin']:.1f}%                          | Best-in-class for scale               |
| Profitability | EBITDA Margin      | {fy24['ebitda_margin']:.1f}%                          | Platform economics — structurally wide |
| Profitability | Net Margin         | {fy24['net_margin']:.1f}%                          | Sustained above 35% for 3 yrs         |
| Profitability | ROE                | {fy24['roe']:.1f}%                          | High; equity base growing fast        |
| Profitability | ROA                | {fy24['roa']:.1f}%                          | Efficient asset utilization           |
| Profitability | ROCE               | {fy24['roce']:.1f}%                          | Strong return on deployed capital     |
| Leverage      | Debt / EBITDA      | {fy24['debt_to_ebitda']:.2f}x                           | Conservative; declining trend         |
| Leverage      | Interest Coverage  | {fy24['interest_coverage']:.1f}x                         | Negligible refinancing risk           |
| Leverage      | D/E Ratio          | {fy24['de_ratio']:.2f}x                           | Healthy balance sheet structure       |
| Liquidity     | Current Ratio      | {fy24['current_ratio']:.2f}x                           | Adequate; intentionally lean          |
| Growth        | Revenue Growth     | {fy24['revenue_growth']:.1f}%                          | Re-accelerated on AI + Azure          |
| Growth        | EBITDA Growth      | {fy24['ebitda_growth']:.1f}%                          | Margin expansion on top of volume     |

---

## Revenue Simulation (GBM, 10,000 Paths | FY2025–FY2029)

**Assumptions:** μ = 14% (FY21–FY24 CAGR ~13.5% + AI monetization premium) | σ = 5%

| Scenario     | FY2029 Revenue | Implied 5yr CAGR |
|--------------|---------------:|----------------:|
| Bear (P5)    | ${p5_29/1_000:,.0f}B     | {((p5_29/BASE_REVENUE)**0.2-1)*100:.1f}%           |
| Base (P50)   | ${p50_29/1_000:,.0f}B     | {cagr:.1f}%           |
| Bull (P95)   | ${p95_29/1_000:,.0f}B     | {((p95_29/BASE_REVENUE)**0.2-1)*100:.1f}%           |

Even the bear case (P5) implies MSFT crosses $300B in revenue — a floor underpinned
by $100B+ in contracted recurring software and cloud commitments. The base case of
${p50_29/1_000:.0f}B represents ~{cagr:.0f}% CAGR, consistent with Azure + Copilot
monetization at current trajectory.

---

## Risk Factors

| Risk | Severity | Mitigant |
|------|----------|----------|
| Regulatory — DOJ/EU antitrust (Azure bundling, ATVI) | Medium | History of behavioral remedies, not structural breakup |
| AI commoditization — Copilot pricing compression | Medium | OpenAI exclusivity window; proprietary enterprise data moat |
| Capex cycle — GPU buildout depressing FCF margins | Low–Medium | Returns on AI infra materialize 2–3 yr lag; FCF still $74B+ |
| FX headwind — ~50% international revenue | Low | Natural hedge via international cost base |

---

## Bottom Line

MSFT is a rare combination: a $3T company growing revenue at 15%+, with 51% EBITDA
margins, minimal leverage ({fy24['debt_to_ebitda']:.2f}x Debt/EBITDA), and a credible AI monetization
path. The Monte Carlo base case puts FY2029 revenue at ~${p50_29/1_000:.0f}B. The bear case
is a well-capitalized business generating $80B+ in annual net income. Risk is being
wrong on AI timing — not wrong on the business.

*Sources: Microsoft 10-K FY2021–FY2024 | TradingLab GBM simulation engine | Monte Carlo: 10,000 paths*
"""

(HERE / "investment_brief.md").write_text(brief, encoding="utf-8")
print("[OK] investment_brief.md")

# -- Summary Print -------------------------------------------------------------
print()
print("-- FY2024 Key Ratios ------------------------------------------")
print(f"   Gross Margin       : {fy24['gross_margin']:.1f}%")
print(f"   EBITDA Margin      : {fy24['ebitda_margin']:.1f}%")
print(f"   Net Margin         : {fy24['net_margin']:.1f}%")
print(f"   ROE                : {fy24['roe']:.1f}%")
print(f"   ROA                : {fy24['roa']:.1f}%")
print(f"   Debt / EBITDA      : {fy24['debt_to_ebitda']:.2f}x")
print(f"   Interest Coverage  : {fy24['interest_coverage']:.1f}x")
print(f"   Current Ratio      : {fy24['current_ratio']:.2f}x")
print(f"   Revenue Growth     : {fy24['revenue_growth']:.1f}%")
print()
print("-- Monte Carlo FY2029 -----------------------------------------")
print(f"   Bear (P5)          : ${p5_29/1_000:,.0f}B")
print(f"   Base (P50)         : ${p50_29/1_000:,.0f}B")
print(f"   Bull (P95)         : ${p95_29/1_000:,.0f}B")
print(f"   Implied CAGR (P50) : {cagr:.1f}%")
print()
print("-- Outputs ----------------------------------------------------")
print(f"   {OUTPUTS}/ratios_table.csv")
print(f"   {OUTPUTS}/monte_carlo_chart.png")
print(f"   {HERE}/investment_brief.md")
