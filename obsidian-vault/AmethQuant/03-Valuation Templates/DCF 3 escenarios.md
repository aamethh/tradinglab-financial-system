# Plantilla DCF 3 Escenarios (método oficial)

Archivo Excel: `templates/excel/05_valuation_scenarios.xlsx` · Código: `core/dcf.py`

## Estructura
1. **P&L proyectado** (5 años): CAGR ingresos + margen EBITDA por escenario
2. **FCF libre**: EBITDA − impuestos − capex − Δ working capital
3. **WACC por CAPM**: Rf + β × ERP (MSFT base: Rf 4.3% · ERP 5.5% · β 0.90 → 9.2%)
4. **Valor Terminal**: 50% Gordon Growth (FCF×(1+g)/(WACC−g)) + 50% Múltiplo de Salida
5. **Sensibilidad WACC × TGR**: tabla 9×5
6. **Rating**: upside vs precio → BUY >15% / HOLD 0–15% / SELL <0% + convicción

## Referencia calibrada (MSFT, abril 2026)
| | Bear | Base | Bull |
|---|---|---|---|
| CAGR ingresos | 7.8% | 13.4% | 16.0% |
| Margen EBITDA | 49% | 52% | 55% |
| WACC | 10.7% | 9.2% | 7.7% |
| TGR | 2.5% | 3.5% | 4.0% |
| Intrínseco | $268 | $424 | $625 |

Resultado: precio ~$420 → upside +1% → **HOLD** (no BUY: disciplina de threshold).

## Errores a evitar
- TGR ≥ WACC (Gordon explota)
- Un solo escenario "puntual" — siempre rango
- Olvidar caja neta / deuda neta en el puente equity value
- Usar el DCF en bancos → para FIG usar P/B + ROE decomposition ([[04-Banking Analysis]])
