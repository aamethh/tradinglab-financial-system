"""
core/dcf.py
-----------
Institutional DCF valuation engine.

3-statement logic:
  P&L : Revenue -> EBITDA -> D&A -> EBIT -> NOPAT
  CF  : NOPAT + D&A - Capex - delta_NWC = Unlevered Free Cash Flow
  Val : PV(FCFs) + PV(Terminal Value) - Net Debt = Equity Value

Two terminal value methods:
  Gordon Growth  — FCF_n*(1+g)/(WACC-g)
  Exit Multiple  — EBITDA_n * EV/EBITDA multiple
"""
import numpy as np
import pandas as pd


def project_statements(
    base_revenue: float,
    growth_rates: list,
    ebitda_margin: float,
    da_pct: float,
    tax_rate: float,
    capex_pct: float,
    nwc_pct: float,
    base_year: int = 2024,
) -> pd.DataFrame:
    """
    Project P&L and unlevered FCF for len(growth_rates) years.

    Parameters
    ----------
    base_revenue  : FY0 revenue ($M)
    growth_rates  : list of annual revenue growth rates, e.g. [0.15, 0.14, ...]
    ebitda_margin : EBITDA / Revenue, assumed constant across forecast
    da_pct        : D&A / Revenue
    tax_rate      : effective corporate tax rate
    capex_pct     : Capex / Revenue (normalized, not peak-cycle)
    nwc_pct       : Net Working Capital / Revenue; delta_NWC = nwc_pct * delta_revenue
    base_year     : fiscal year of base_revenue (projections start base_year+1)
    """
    rows = []
    revenue = base_revenue
    for i, g in enumerate(growth_rates):
        prev_rev = revenue
        revenue  = prev_rev * (1 + g)
        ebitda   = revenue * ebitda_margin
        da       = revenue * da_pct
        ebit     = ebitda - da
        nopat    = ebit * (1 - tax_rate)
        capex    = revenue * capex_pct
        delta_nwc = (revenue - prev_rev) * nwc_pct
        fcf      = nopat + da - capex - delta_nwc
        rows.append({
            "year":       base_year + i + 1,
            "revenue":    revenue,
            "ebitda":     ebitda,
            "ebit_margin": ebit / revenue,
            "da":         da,
            "ebit":       ebit,
            "nopat":      nopat,
            "capex":      capex,
            "delta_nwc":  delta_nwc,
            "fcf":        fcf,
            "fcf_margin": fcf / revenue,
        })
    return pd.DataFrame(rows)


def calc_wacc(
    rfr: float,
    erp: float,
    beta: float,
    cost_of_debt: float,
    tax_rate: float,
    equity_value: float,
    debt_value: float,
) -> float:
    """
    CAPM-based WACC.
      Ke   = rfr + beta * erp
      WACC = (E/V)*Ke + (D/V)*Kd*(1-t)

    Parameters
    ----------
    rfr          : risk-free rate (10-yr Treasury yield)
    erp          : equity risk premium
    beta         : levered equity beta
    cost_of_debt : pre-tax yield on company debt
    tax_rate     : effective tax rate (for debt tax shield)
    equity_value : market cap ($M)
    debt_value   : total debt outstanding ($M)
    """
    ke = rfr + beta * erp
    v  = equity_value + debt_value
    return (equity_value / v) * ke + (debt_value / v) * cost_of_debt * (1 - tax_rate)


def terminal_value(
    fcf_n: float,
    ebitda_n: float,
    wacc: float,
    terminal_growth: float,
    exit_multiple: float,
) -> tuple:
    """
    Compute terminal value via two methods.

    Returns
    -------
    (tv_gordon, tv_exit) both in $M
    """
    if wacc <= terminal_growth:
        raise ValueError(
            f"WACC ({wacc:.2%}) must exceed terminal growth rate ({terminal_growth:.2%})"
        )
    tv_gordon = fcf_n * (1 + terminal_growth) / (wacc - terminal_growth)
    tv_exit   = ebitda_n * exit_multiple
    return tv_gordon, tv_exit


def _discount_to_equity(
    proj_df: pd.DataFrame,
    tv: float,
    wacc: float,
    net_debt: float,
    shares: float,
) -> dict:
    """
    Discount FCFs + terminal value to present. Derive equity value and price/share.

    Parameters
    ----------
    net_debt : total_debt - cash ($M). Negative means net cash (adds to equity value).
    shares   : diluted shares outstanding (M).
    """
    n       = len(proj_df)
    factors = [(1 + wacc) ** -(i + 1) for i in range(n)]
    pv_fcfs = sum(row["fcf"] * f for row, f in zip(proj_df.to_dict("records"), factors))
    pv_tv   = tv * factors[-1]
    ev      = pv_fcfs + pv_tv
    equity  = ev - net_debt          # subtract net debt (adding back net cash if negative)
    price   = equity / shares        # price per share in $
    return {
        "pv_fcfs":      pv_fcfs,
        "pv_tv":        pv_tv,
        "tv_pv_pct":    pv_tv / ev,
        "ev":           ev,
        "equity_value": equity,
        "price":        price,
    }


def sensitivity_table(
    proj_df: pd.DataFrame,
    wacc_range: list,
    tgr_range: list,
    exit_multiple: float,
    net_debt: float,
    shares: float,
) -> pd.DataFrame:
    """
    Sensitivity: WACC (rows) x Terminal Growth Rate (cols) -> intrinsic price/share.
    Uses Gordon Growth terminal value. Exit multiple terminal value does not vary
    with TGR so it is excluded from this table.

    Returns a DataFrame indexed by WACC label, columns are TGR labels.
    """
    last = proj_df.iloc[-1]
    table = {}
    for wacc in wacc_range:
        row   = {}
        label = f"{wacc * 100:.1f}%"
        for tgr in tgr_range:
            col_label = f"{tgr * 100:.1f}%"
            if wacc <= tgr:
                row[col_label] = float("nan")
                continue
            tv_g, _ = terminal_value(last["fcf"], last["ebitda"], wacc, tgr, exit_multiple)
            val      = _discount_to_equity(proj_df, tv_g, wacc, net_debt, shares)
            row[col_label] = round(val["price"], 0)
        table[label] = row

    df = pd.DataFrame(table).T
    df.index.name   = "WACC \\ TGR"
    return df


def run(
    base_revenue: float,
    growth_rates: list,
    ebitda_margin: float,
    da_pct: float,
    tax_rate: float,
    capex_pct: float,
    nwc_pct: float,
    wacc: float,
    terminal_growth: float,
    exit_multiple: float,
    net_debt: float,
    shares: float,
    base_year: int = 2024,
    wacc_range: list = None,
    tgr_range: list = None,
) -> dict:
    """
    Master DCF run.

    Returns
    -------
    dict with keys:
      projections   : DataFrame — projected P&L and FCF
      gordon        : dict — Gordon Growth valuation components
      exit          : dict — Exit Multiple valuation components
      price_avg     : float — blended (50/50) intrinsic price per share
      sensitivity   : DataFrame — WACC x TGR sensitivity on Gordon Growth price
      wacc          : float
      terminal_growth : float
      tv_gordon     : float — undiscounted terminal value (Gordon)
      tv_exit       : float — undiscounted terminal value (Exit Multiple)
    """
    proj = project_statements(
        base_revenue, growth_rates, ebitda_margin, da_pct,
        tax_rate, capex_pct, nwc_pct, base_year,
    )
    last      = proj.iloc[-1]
    tv_g, tv_e = terminal_value(last["fcf"], last["ebitda"], wacc, terminal_growth, exit_multiple)

    val_gordon = _discount_to_equity(proj, tv_g, wacc, net_debt, shares)
    val_exit   = _discount_to_equity(proj, tv_e, wacc, net_debt, shares)
    price_avg  = (val_gordon["price"] + val_exit["price"]) / 2

    if wacc_range is None:
        wacc_range = [round(0.075 + i * 0.005, 4) for i in range(9)]   # 7.5% to 11.5%
    if tgr_range is None:
        tgr_range  = [round(0.025 + i * 0.005, 4) for i in range(5)]   # 2.5% to 4.5%

    sens = sensitivity_table(proj, wacc_range, tgr_range, exit_multiple, net_debt, shares)

    return {
        "projections":      proj,
        "wacc":             wacc,
        "terminal_growth":  terminal_growth,
        "exit_multiple":    exit_multiple,
        "tv_gordon":        tv_g,
        "tv_exit":          tv_e,
        "gordon":           val_gordon,
        "exit":             val_exit,
        "price_avg":        price_avg,
        "sensitivity":      sens,
    }
