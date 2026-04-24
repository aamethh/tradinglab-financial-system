"""
core/monte_carlo.py
-------------------
Reusable GBM Monte Carlo engine.
Import run() in any project simulation script.
"""
import numpy as np
import pandas as pd


def run(
    base_value: float,
    mean_growth: float,
    volatility: float,
    n_sim: int = 10_000,
    n_years: int = 5,
    seed: int = 42,
) -> np.ndarray:
    """
    Simulate revenue (or any value) paths via Geometric Brownian Motion.

    Parameters
    ----------
    base_value  : starting value (e.g. last known revenue)
    mean_growth : expected annual growth rate (e.g. 0.19 for 19%)
    volatility  : annual standard deviation of growth (e.g. 0.05)
    n_sim       : number of simulations
    n_years     : forecast horizon in years
    seed        : random seed for reproducibility

    Returns
    -------
    np.ndarray of shape (n_sim, n_years)
    """
    np.random.seed(seed)
    mu    = np.log(1 + mean_growth)
    drift = mu - 0.5 * volatility ** 2
    shocks = np.random.normal(0, 1, size=(n_sim, n_years))
    returns = np.exp(drift + volatility * shocks)
    return base_value * np.cumprod(returns, axis=1)


def percentiles(paths: np.ndarray, base_year: int) -> pd.DataFrame:
    """Build a summary DataFrame with P5/P25/P50/P75/P95 per year."""
    records = []
    for i in range(paths.shape[1]):
        col = paths[:, i]
        records.append({
            "year":  base_year + i + 1,
            "p5":    np.percentile(col,  5),
            "p25":   np.percentile(col, 25),
            "p50":   np.percentile(col, 50),
            "mean":  col.mean(),
            "p75":   np.percentile(col, 75),
            "p95":   np.percentile(col, 95),
            "std":   col.std(),
        })
    return pd.DataFrame(records)
