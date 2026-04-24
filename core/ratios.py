"""
core/ratios.py
--------------
Shared financial ratio engine.
Accepts a DataFrame with standardized column names.
Returns all ratios as new columns.
"""
import pandas as pd


REQUIRED = [
    "revenue", "cogs", "ebitda", "ebit", "net_income",
    "total_assets", "total_equity", "total_debt",
    "current_assets", "current_liabilities", "interest_expense"
]


def calculate(df: pd.DataFrame) -> pd.DataFrame:
    d = df.copy()

    # Profitability
    d["gross_margin"]    = (d["revenue"] - d["cogs"]) / d["revenue"]
    d["ebitda_margin"]   = d["ebitda"]     / d["revenue"]
    d["ebit_margin"]     = d["ebit"]       / d["revenue"]
    d["net_margin"]      = d["net_income"] / d["revenue"]
    d["roe"]             = d["net_income"] / d["total_equity"]
    d["roa"]             = d["net_income"] / d["total_assets"]
    d["roce"]            = d["ebit"] / (d["total_assets"] - d["current_liabilities"])

    # Liquidity
    d["current_ratio"]   = d["current_assets"] / d["current_liabilities"]
    d["working_capital"] = d["current_assets"] - d["current_liabilities"]

    # Leverage
    d["de_ratio"]        = d["total_debt"]  / d["total_equity"]
    d["debt_to_assets"]  = d["total_debt"]  / d["total_assets"]
    d["debt_to_ebitda"]  = d["total_debt"]  / d["ebitda"]
    d["interest_coverage"] = d["ebit"]      / d["interest_expense"]

    # Growth (YoY — requires sort by period first)
    for col, out in [
        ("revenue",    "revenue_growth"),
        ("ebitda",     "ebitda_growth"),
        ("net_income", "net_income_growth"),
    ]:
        d[out] = d[col].pct_change()

    return d


def round_output(df: pd.DataFrame, pct_cols: list = None, x_cols: list = None) -> pd.DataFrame:
    d = df.copy()
    pct_cols = pct_cols or [
        "gross_margin", "ebitda_margin", "ebit_margin", "net_margin",
        "roe", "roa", "roce", "debt_to_assets",
        "revenue_growth", "ebitda_growth", "net_income_growth"
    ]
    x_cols = x_cols or ["de_ratio", "debt_to_ebitda", "interest_coverage",
                        "current_ratio", "capital_multiplier"]
    for col in pct_cols:
        if col in d.columns:
            d[col] = (d[col] * 100).round(2)
    for col in x_cols:
        if col in d.columns:
            d[col] = d[col].round(2)
    return d
