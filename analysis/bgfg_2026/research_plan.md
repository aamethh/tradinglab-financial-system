# Research Plan — Banco General / Grupo Financiero BG (BGFG)

**Vertical:** Financial Institutions (FIG) · **Marco:** bancario, NO industrial (ver
`obsidian-vault/.../04-Banking Analysis/Marco bancario.md` y `templates/excel/03_bank_analysis.xlsx`)
**Coverage previo:** OUTPERFORM, Mar 2026 (publicado en amethquant.vercel.app/research/bgfg)
**Objetivo:** profundizar el coverage existente a memo institucional completo con marco bancario de 15 dimensiones.

## Fuentes primarias identificadas (verificadas, públicas)

1. **EEFF auditados consolidados Grupo Financiero BG dic-2025:**
   https://www.bgeneral.com/wp-content/uploads/2026/03/Grupo%20Financiero%20BG,%20S.%20A.%20y%20subsidiarias%20Dic.%202025.pdf
2. **Informe de Actualización Anual (INA) SMV dic-2025:**
   https://www.bgeneral.com/wp-content/uploads/2026/03/INA,%20EF%20y%20DJ%20-%20Grupo%20Financiero%20BG,%20S.%20A.%20Dic.%202025.pdf
3. **Información corporativa Banco General:** https://www.bgeneral.com/informacion-corporativa/
4. **SBP — estados financieros auditados del sistema:** https://www.superbancos.gob.pa/estadisticas-financieras/estados-financieros
5. **SBP — calificaciones de bancos de licencia general:** https://www.superbancos.gob.pa/en/calificaciones/licencia-general

## Plan por dimensión (15) — qué buscar y dónde

| # | Dimensión | Pregunta clave | Fuente |
|---|---|---|---|
| 1 | Loan book | Tamaño, mix (hipotecas/consumo/corporativo), crecimiento vs sistema | EEFF nota de cartera + SBP sistema |
| 2 | Morosidad/NPL | NPL ratio y tendencia 3 ejercicios; vs sistema panameño | EEFF + estadísticas SBP |
| 3 | Provisiones | Cobertura provisión/NPL — **dato web: 124.3% ↓ de 152.6%; punto crítico del memo** | EEFF nota de provisiones |
| 4 | ROA/ROAE | ROAE 21.2% (web) — descomponer: margen, rotación, apalancamiento | EEFF |
| 5 | NIM | Margen de interés neto y sensibilidad a tasas | EEFF / INA |
| 6 | Efficiency | **Verificado: 28.11% FY2025 vs 28.74% FY2024** (ingreso op. +8.8%, gastos +6.5%) | INA |
| 7 | Capital | **Verificado: 27.17% sobre APR vs 8% mínimo SBP; 19.29% sobre activos** | INA |
| 8 | Liquidez | **Verificado: 39.01% liquidez regulatoria vs 30% mínimo; $6,618.8M inversiones líquidas primarias** | INA |
| 9 | Depósitos | Base, costo de fondeo, % del pasivo, estabilidad | EEFF |
| 10 | Concentración | Geográfica (web: Panamá ~85.8%), sectorial, top deudores | EEFF notas |
| 11 | Soberano | Tenencia de bonos de Panamá / activos; nexo soberano-banco (Panamá BBB con presión) | EEFF nota de inversiones |
| 12 | Regulatorio | Basilea/SBP, cambios fiscales, requerimientos de capital | SBP |
| 13 | Reputacional | Listas GAFI/UE (Panamá salió de lista gris GAFI en 2023 — verificar estatus vigente), litigios | Prensa + GAFI |
| 14 | Comparables | P/B y ROE vs bancos LatAm listados (Bladex como comp panameño listado en NYSE; bancos CA) | Filings comparables |
| 15 | Gobierno corporativo | Control EGI 59.39% (web); independencia del directorio; trato a minoritarios | INA / actas |

## Tareas pendientes de verificación (NO usar hasta confirmar)
- [ ] Ratings vigentes 2026 de Fitch/Moody's/S&P — los resultados de búsqueda mezclan fechas
      (Fitch BBB- 2022, S&P BBB 2023, Moody's Baa2 2022, una nota de Fitch BBB+ sin fecha confiable).
      Fuente correcta: página de calificaciones SBP (#5) o web de las calificadoras.
- [ ] Descargar y extraer EEFF dic-2025 (fuente #1) con el módulo de PDFs de AmethQuant OS.
- [ ] NPL ratio exacto y cobertura desde notas del EEFF (la web de AmethQuant reporta 124.3%).
- [ ] AUM exacto de BG Valores/Wealth Management ($19.9B según coverage web — confirmar contra INA).

## Postura honesta (regla de la casa)
Con lo verificado hasta ahora (capital 27.17% vs 8% mínimo, liquidez 39.01% vs 30% mínimo,
eficiencia mejorando), **Banco General se ve sólido**. No hay drama que inventar. El memo se
enfoca en: (a) la tendencia de cobertura de NPL como punto de monitoreo real, (b) concentración
Panamá como riesgo estructural, (c) nexo soberano, (d) gobernanza (control EGI). Red flags solo
si la evidencia las sostiene.

## Cronograma sugerido (1 semana)
D1: descarga EEFF + INA, extracción de line items. D2: dimensiones 1–5. D3: 6–10.
D4: 11–15 + comparables. D5: memo completo + risk matrix + rating con threshold.
