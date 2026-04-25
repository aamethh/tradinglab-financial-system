# TradingLab Financial System
### Institutional-grade financial analysis infrastructure — built for scale, designed for decisions.

---

## Executive Summary

TradingLab is a modular financial analysis system that replicates core workflows used at asset management firms and investment banks: structured data ingestion, ratio-based performance analysis, probabilistic revenue forecasting, and dashboard-ready outputs.

The system is not a one-off analysis. It is a reusable infrastructure layer — designed so that any new company or dataset can be analyzed by plugging into existing pipelines without rebuilding from scratch.

**Who uses systems like this:** equity research desks, FP&A teams, fintech companies, and portfolio analysts who need to move from raw financial data to investment-grade insight quickly and reproducibly.

---

## Key Capabilities

**Financial Ratio Analysis**
Automated calculation of 15+ ratios across four dimensions: profitability (ROE, ROA, ROCE, margins), liquidity (current ratio, working capital), leverage (D/E, debt-to-EBITDA, interest coverage), and operational efficiency (CCC, YoY growth). Output is standardized and Power BI-ready.

**Monte Carlo Revenue Simulation**
Geometric Brownian Motion engine running 10,000 simulations per execution. Produces P5/P50/P95 scenario bands, fan charts, and distribution histograms. Parameters (growth rate, volatility, horizon) are fully configurable. Used to quantify asymmetric risk/reward profiles in forward projections.

**SQL Server Integration**
Normalized schema design with dedicated tables for financials, margins, ratios, metrics, and time series. Python-to-SQL pipeline handles ingestion, upserts, and analytical queries. Designed for environments where Excel is the source but a relational database is the analytical layer.

**Power BI-Ready Outputs**
Every pipeline exports flat CSVs structured for direct connection to Power BI. No manual transformation required. Dashboard layout and DAX measures are documented per project.

**Modular Reusable Architecture**
Core engines (ratio calculator, GBM simulator, DB connector) are separated from project-specific scripts. A new analysis project imports from `core/` and inherits the full analytical stack immediately.

---

## System Architecture

```
tradinglab-financial-system/
│
├── core/                      Shared engines — imported by all projects
│   ├── ratios.py              15+ financial ratios (profitability, leverage, liquidity)
│   ├── monte_carlo.py         GBM simulation engine (parameterized, 10k runs)
│   └── db_connect.py          SQL Server connection factory (env-based credentials)
│
├── data/                      Raw source files (Excel, CSV)
├── analysis/                  Project-level pipeline scripts (ingest, transform, export)
├── model/                     Simulation scripts consuming core/monte_carlo.py
├── dashboard/                 Power BI CSVs and connection documentation
├── outputs/                   Charts, PDF reports, summary tables
│
├── config.template.py         Parameter template (DB credentials, simulation defaults)
├── requirements.txt           Full dependency list
└── CLAUDE.md                  System role definition and analytical standards
```

The `core/` layer is the key design decision. It enforces consistency across projects and eliminates code duplication — the same ratio logic and simulation engine runs whether the subject is a bank, a fintech, or a listed company.

---

## Example Use Case

**Objective:** Analyze a fintech company's financial position and generate a 5-year revenue forecast.

**Step 1 — Ingest**
Raw Excel files (P&L, balance sheet, margin detail) are loaded via `analysis/01_ingest.py`, cleaned, and written to SQL Server with full upsert logic.

**Step 2 — Ratio Analysis**
`analysis/02_ratios.py` imports `core/ratios.py`, calculates the full ratio set, and exports `outputs/metrics.csv`. Key outputs: EBITDA margin expansion (+1.5pp over two years), D/E compression (6.3x to 4.1x), CCC improvement (72 to 65 days).

**Step 3 — Simulation**
`model/simulation.py` imports `core/monte_carlo.py`. Using two years of observed growth (23% and 15%), the engine estimates a 19% mean growth rate with 4.8% annual volatility. 10,000 paths are simulated over 5 years.

**Results:**
| Scenario | 2030 Revenue | vs. Base |
|---|---|---|
| Bear (P5) | $88.3M | +98% |
| Median (P50) | $105.6M | +137% |
| Bull (P95) | $126.3M | +184% |

**Step 4 — Output**
Three CSVs exported to `dashboard/` for Power BI. Fan chart and histogram saved to `outputs/`. Full analysis complete without modifying any core module.

---

## Technical Stack

| Layer | Tools |
|---|---|
| Data processing | Python 3.11, pandas, numpy, openpyxl |
| Statistical modeling | numpy (GBM), scipy-compatible output |
| Database | SQL Server, SQLAlchemy, pyodbc |
| Visualization | matplotlib, seaborn |
| Reporting | reportlab (PDF generation) |
| BI integration | Power BI (CSV-based connection) |
| Version control | Git, GitHub |

---

## Why This Matters

Most financial analysis work is produced in isolated Excel files — useful once, impossible to scale or audit. This system is built around the opposite principle.

**Structured thinking:** every component has a defined responsibility. Ingestion, transformation, modeling, and export are separate scripts. No monolithic notebooks, no undocumented logic.

**Scalability:** adding a new company requires no changes to `core/`. A new project folder, a `config.py`, and the full analytical stack is available.

**Real-world application:** the pipeline mirrors what FP&A and research teams operate in practice — raw data enters, structured insight exits. The Monte Carlo layer adds the probabilistic dimension that separates descriptive analysis from forward-looking decision support.

**Decision orientation:** every output is designed to answer a specific question — not to display data. Scenario tables answer "what is the range of outcomes." Ratio trends answer "is the business improving." Distribution histograms answer "how likely is each outcome."

---

## Projects Built on This System

| Project | Description | Repo |
|---|---|---|
| `grupo-tx-fintech-analysis` | Fintech P&L analysis, Monte Carlo 5-year revenue projection | [View](https://github.com/aamethh/grupo-tx-fintech-analysis) |
| `financial-analysis-gfbg` | Banking equity research, institutional PDF report | [View](https://github.com/aamethh/financial-analysis-gfbg) |

---

## Roadmap

- Extend `core/ratios.py` to support cash flow statement inputs (FCF, capex intensity)
- Add `core/valuation.py` — DCF and comparable multiples engines
- Build `projects/` folder structure for full monorepo migration
- Add automated testing for ratio calculations (pytest)
- Connect Power BI via SQL Server DirectQuery instead of CSV

---

## Author

**Ameth Espinosa** — Financial Analyst Jr.
Panama | [github.com/aamethh](https://github.com/aamethh)
