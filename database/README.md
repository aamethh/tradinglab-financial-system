# Base de datos AmethQuant

## Diseño

12 tablas en 3 dominios:

1. **Research** — `companies` → `filings` → `financial_statements` → `metrics` / `forensic_flags` → `memos` / `case_studies`.
   El flujo replica el pipeline oficial (Excel/PDF → SQL → Python → BI): cada dato apunta a su filing
   de origen (`filings.source_url`) y nada se considera confiable hasta `verified = TRUE`.
2. **Comercial** — `leads` (pipeline pre-venta con etapas) y `clients` (contratos activos).
3. **Carrera** — `job_applications` (con `fit_score` 0–100 y regla de no-envío sin aprobación) y `contacts`.

`tasks` cruza los tres dominios.

## Relaciones clave

- `memos.version` + `created_at` implementan el **coverage timeline** oficial (HOLD → AVOID de GRPOTX):
  nunca se sobreescribe un memo, se crea una versión nueva.
- `forensic_flags.severity` usa los mismos niveles que la web (Crítica/Alta/Media/Baja).
- `financial_statements.verified` aplica la regla "datos primarios": lo extraído por regex queda en FALSE.

## Cómo usarla

**pgAdmin4:** clic derecho en Databases → Create → `amethquant` → Query Tool → abrir `schema.sql` → F5.
**DBeaver:** nueva conexión PostgreSQL → SQL Editor → pegar `schema.sql` → Ctrl+Enter.

**Sin servidor PostgreSQL:** la app (`app/`) crea automáticamente `app/amethquant.db` en SQLite
con el mismo esquema y datos seed de los 4 coverages. Cuando tengas PostgreSQL, migra con:

```bash
sqlite3 app/amethquant.db .dump | grep -v 'PRAGMA\|BEGIN\|COMMIT' > dump.sql
# revisar tipos y cargar con psql -d amethquant -f dump.sql
```

## Consultas de ejemplo

```sql
-- Coverage activo con último rating
SELECT c.ticker, c.vertical, m.rating, m.conviction
FROM companies c
JOIN LATERAL (SELECT * FROM memos WHERE company_id = c.id ORDER BY created_at DESC LIMIT 1) m ON TRUE;

-- Banderas críticas/altas abiertas por emisor
SELECT c.ticker, COUNT(*) AS banderas
FROM forensic_flags f JOIN companies c ON c.id = f.company_id
WHERE f.severity IN ('Crítica','Alta')
GROUP BY c.ticker ORDER BY banderas DESC;

-- Pipeline comercial por etapa
SELECT stage, COUNT(*) FROM leads GROUP BY stage;

-- Aplicaciones priorizadas pendientes de aprobación
SELECT role, company, fit_score, url FROM job_applications
WHERE status = 'identificado' ORDER BY fit_score DESC;
```
