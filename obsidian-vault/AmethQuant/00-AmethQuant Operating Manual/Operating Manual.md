# AmethQuant — Operating Manual

> Abrir esta carpeta (`obsidian-vault/AmethQuant`) como vault en Obsidian: File → Open Vault → Open folder as vault.

## Qué es AmethQuant
Firma boutique independiente de equity research, forensic financial analytics y AI-assisted
financial analysis enfocada en Panamá y LatAm. Pequeña, seria, rápida, clara. Cobra competitivo
entregando más valor del esperado.

## Identidad oficial (literal de la web)
- "Equity Research Independiente"
- "Tesis basadas en flujo de caja real, no en narrativa corporativa."
- Verticales: Forensic Equity · Financial Institutions · Fixed Income · US Megacap
- Coverage: GRPOTX (AVOID) · BGFG (OUTPERFORM) · FGIN (CORE POSITION) · MSFT (HOLD)

## Principios operativos (oficiales)
1. **El cash flow precede al P&L.** Empezar todo análisis por el FCO.
2. **La calidad de utilidades importa más que el crecimiento.** Schilit: FCO/UN, DSO, patrimonio operativo, Asuntos de Énfasis.
3. **Las tesis se revisan con datos.** Matar tesis equivocadas > tener razón al primer intento.

## Reglas de calidad (no negociables)
- Citar fuentes primarias siempre (filing + página).
- No inventar cifras. Dato ≠ inferencia ≠ opinión — etiquetarlos.
- No acusar sin evidencia: una bandera forense es una señal, no un veredicto.
- Rating por threshold: BUY >15% upside · HOLD 0–15% · SELL/AVOID <0%. Sin excepciones.
- 80/20: insight de negocio > complejidad técnica.

## Stack
Python 3.11 (pandas, numpy, openpyxl, reportlab) · SQL (PostgreSQL/SQLite) · Power BI ·
React+Tailwind (web) · Streamlit (AmethQuant OS interno) · Obsidian (este vault).

## Mapa del sistema
- **App interna:** `app/` → `streamlit run app/app.py`
- **Web pública:** `web/` → amethquant.vercel.app
- **DB:** `database/schema.sql`
- **Excel:** `templates/excel/`
- **Métodos:** `docs/method-inventory.md` ← fuente de verdad metodológica

## Cadencia semanal
- Lun: pipeline comercial (leads, follow-ups)
- Mar–Jue: research / entregables de clientes
- Vie: job search (aplicaciones aprobadas) + 1 pieza de contenido LinkedIn
- Continuo: cada hallazgo relevante → nota en 07-Case Studies
