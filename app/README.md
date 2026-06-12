# AmethQuant OS — app interna

Sistema interno de research, pipeline comercial y búsqueda laboral. Streamlit + SQLite
(mismo esquema lógico que `database/schema.sql` para migrar a PostgreSQL 1:1).

## Ejecutar

```bash
pip install -r requirements.txt
streamlit run app/app.py
```

Abre http://localhost:8501. En el primer arranque crea `app/amethquant.db` y la siembra con los
4 coverages publicados en amethquant.vercel.app (GRPOTX, BGFG, FGIN, MSFT) — datos literales de la web.

## Módulos

| Módulo | Qué hace |
|---|---|
| Dashboard | KPIs (coverages, memos, leads, aplicaciones) + tareas |
| Servicios | Catálogo oficial + propuesto con precios |
| Portfolio / Case Studies | Caso GRPOTX completo (HOLD → AVOID) |
| Compañías | Alta y listado de emisores por vertical |
| Carga de PDFs | Registro de filings con fuente (regla: datos primarios) |
| Extracción de Métricas | Regex sobre texto pypdf; todo entra como NO verificado |
| Forensic Score | Checklist Schilit 12 puntos → score 0–100 (interno) |
| Research Memos | Historial versionado de memos con rating |
| Generar Memo | Plantilla sell-side + rating automático por threshold (BUY >15% · HOLD 0–15% · SELL <0%) |
| Client Pipeline | Leads con etapas nuevo→ganado/perdido |
| Jobs Tracker | Oportunidades con fit score; nada se envía sin aprobación |
| Exportar | Memo a Markdown/HTML (imprimir → PDF; Word vía pandoc) |

## Arquitectura

```
app/
├── app.py                 # UI Streamlit (12 módulos)
└── amethquant/
    ├── db.py              # SQLite, esquema espejo de PostgreSQL
    ├── forensic.py        # checklist Schilit ponderado + score
    ├── extract.py         # extracción PDF (pypdf + regex ES/EN)
    ├── memo.py            # generador de memos formato sell-side
    └── seed.py            # datos de los 4 coverages de la web
```
