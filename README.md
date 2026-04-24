# TradingLab System

> Shared infrastructure for institutional-grade financial analysis.
> Python · SQL Server · Monte Carlo · Power BI

---

## What This Is

TradingLab System is a **reusable analytical foundation** — not a project, not a report.
It provides the shared core (ratio engine, simulation engine, database connector) and
folder conventions that individual analysis projects plug into.

Think of it as the internal toolkit of a small quantitative research desk.

---

## Structure

```
tradinglab-system/
│
├── CLAUDE.md                  ← system role and behavior instructions
├── requirements.txt           ← all Python dependencies
├── config.template.py         ← copy to config.py, never commit
│
├── core/                      ← shared modules (imported by all projects)
│   ├── db_connect.py          ← SQL Server connection factory
│   ├── ratios.py              ← financial ratio calculation engine
│   └── monte_carlo.py         ← GBM simulation engine (10k runs)
│
├── data/                      ← raw source files (per project)
├── analysis/                  ← ratio scripts and pipelines
├── model/                     ← simulation scripts
├── dashboard/                 ← Power BI CSVs and guides
└── outputs/                   ← charts, reports, summary tables
```

---

## Core Modules

### `core/ratios.py`
Calculates 15+ financial ratios from a standardized DataFrame.
Covers profitability, liquidity, leverage, and YoY growth.

```python
from core.ratios import calculate, round_output
df = calculate(df)           # adds ratio columns
df = round_output(df)        # formats % and x columns
```

### `core/monte_carlo.py`
GBM revenue simulation engine. Parameterized and reusable.

```python
from core.monte_carlo import run, percentiles

paths   = run(base_value=44_517_636, mean_growth=0.19, volatility=0.048)
summary = percentiles(paths, base_year=2025)
```

### `core/db_connect.py`
Single connection factory for SQL Server. Reads credentials from environment.

```python
from core.db_connect import get_engine
engine = get_engine()
```

---

## Setup

```bash
git clone https://github.com/aamethh/tradinglab-system
cd tradinglab-system
pip install -r requirements.txt
cp config.template.py config.py   # fill in DB credentials
```

---

## Conventions

| What | Convention |
|---|---|
| Python files | `snake_case.py` |
| Pipeline steps | `01_ingest.py`, `02_ratios.py`, `03_export.py` |
| SQL files | `schema.sql`, `queries.sql` |
| Output files | `ticker_type.ext` (e.g. `gtx_mc_summary.csv`) |
| Config constants | `UPPER_SNAKE_CASE` |

---

## Projects Built on This System

| Project | Description | Repo |
|---|---|---|
| `grupo-tx-fintech-analysis` | Fintech P&L analysis + Monte Carlo (5-year revenue) | [github.com/aamethh/grupo-tx-fintech-analysis](https://github.com/aamethh/grupo-tx-fintech-analysis) |
| `financial-analysis-gfbg` | Banking equity research + PDF report | [github.com/aamethh/financial-analysis-gfbg](https://github.com/aamethh/financial-analysis-gfbg) |

---

## Author

**Ameth Espinosa** — Financial Analyst Jr.
[github.com/aamethh](https://github.com/aamethh)
