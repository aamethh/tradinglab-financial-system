"""AmethQuant OS — sistema interno de research, pipeline y carrera.

Ejecutar:  streamlit run app/app.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import pandas as pd
import streamlit as st

from amethquant import db, forensic, memo as memo_mod, seed
from amethquant.extract import extract_text, extract_metrics

st.set_page_config(page_title="AmethQuant OS", page_icon="📊", layout="wide")
seed.seed()

UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

PAGES = [
    "Dashboard", "Servicios", "Portfolio / Case Studies", "Compañías",
    "Carga de PDFs", "Extracción de Métricas", "Forensic Score",
    "Research Memos", "Generar Memo", "Client Pipeline",
    "Jobs Tracker", "Exportar",
]
page = st.sidebar.radio("AmethQuant OS", PAGES)
st.sidebar.markdown("---")
st.sidebar.caption("Tesis basadas en flujo de caja real, no en narrativa corporativa.")


def df(rows):
    return pd.DataFrame(rows) if rows else pd.DataFrame()


def companies_select(label="Compañía"):
    comps = db.query("SELECT id, ticker, name FROM companies ORDER BY ticker")
    if not comps:
        st.info("No hay compañías. Crea una en el módulo Compañías.")
        return None
    opt = st.selectbox(label, comps, format_func=lambda c: f"{c['ticker']} — {c['name']}")
    return opt


# ── Dashboard ──────────────────────────────────────────────────────────────────
if page == "Dashboard":
    st.title("AmethQuant — Dashboard")
    st.caption("Equity Research Independiente · Forensic Equity · Financial Institutions · Fixed Income · US Megacap")
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Coverages", len(db.query("SELECT id FROM companies")))
    c2.metric("Memos", len(db.query("SELECT id FROM memos")))
    c3.metric("Leads activos", len(db.query("SELECT id FROM leads WHERE stage NOT IN ('ganado','perdido')")))
    c4.metric("Aplicaciones de empleo", len(db.query("SELECT id FROM job_applications")))

    st.subheader("Coverage activo")
    st.dataframe(df(db.query(
        "SELECT c.ticker, c.name, c.vertical, m.rating, m.conviction FROM companies c "
        "LEFT JOIN memos m ON m.company_id=c.id ORDER BY c.ticker")), use_container_width=True)

    st.subheader("Tareas pendientes")
    tasks = db.query("SELECT id, title, area, due FROM tasks WHERE done=0 ORDER BY due")
    st.dataframe(df(tasks), use_container_width=True)
    with st.form("task"):
        t = st.text_input("Nueva tarea")
        area = st.selectbox("Área", ["research", "clientes", "jobs", "producto"])
        due = st.date_input("Fecha límite")
        if st.form_submit_button("Agregar") and t:
            db.execute("INSERT INTO tasks (title,area,due) VALUES (?,?,?)", (t, area, str(due)))
            st.rerun()

# ── Servicios ─────────────────────────────────────────────────────────────────
elif page == "Servicios":
    st.title("Servicios AmethQuant")
    st.caption("Oficiales = publicados en amethquant.vercel.app. Propuestos = pendientes de aprobación (ver docs/services-pricing.md).")
    st.subheader("Oficiales (en la web)")
    st.markdown("""
| Servicio | Alcance | Entregable | Timeline | Precio |
|---|---|---|---|---|
| **Custom Equity Research** | Análisis forense profundo de un emisor | Investment memo institucional + modelo DCF + dashboard | 2 semanas | Desde $1,500 |
| **Coverage Retainer** | Monitoring continuo de 3–5 emisores | Updates trimestrales + alerts ante eventos materiales | Continuo | Desde $800/mes |
""")
    st.subheader("Propuestos (requieren aprobación de Ameth)")
    st.markdown("""
| Servicio | Alcance | Timeline | Precio sugerido |
|---|---|---|---|
| Forensic Financial Screen | Checklist Schilit 12 puntos sobre 1 emisor | 5 días | $600 |
| Financial Statement Red Flags | Revisión rápida de banderas en EEFF | 3 días | $350 |
| Credit / Solvency Review | Capital, cobertura, liquidez, deuda | 1 semana | $800 |
| Panama Market Research | Research sectorial Latinex/Panamá | 2 semanas | $1,200 |
| AI-assisted Research Automation | Pipelines de extracción y scoring | Por proyecto | Desde $1,000 |
| Custom Dashboards for Investors | Dashboard Power BI/web sobre cartera | 1–2 semanas | Desde $700 |
""")

# ── Portfolio / Case Studies ──────────────────────────────────────────────────
elif page == "Portfolio / Case Studies":
    st.title("Portfolio / Case Studies")
    for cs in db.query("SELECT cs.*, c.ticker FROM case_studies cs JOIN companies c ON c.id=cs.company_id"):
        with st.expander(f"📁 {cs['title']}", expanded=True):
            st.markdown(f"**Resumen:** {cs['summary']}")
            st.markdown(cs["body_md"])

# ── Compañías ─────────────────────────────────────────────────────────────────
elif page == "Compañías":
    st.title("Compañías bajo coverage")
    st.dataframe(df(db.query("SELECT ticker,name,sector,country,exchange,vertical,notes FROM companies")), use_container_width=True)
    with st.form("comp"):
        st.subheader("Agregar compañía")
        c1, c2 = st.columns(2)
        ticker = c1.text_input("Ticker")
        name = c2.text_input("Nombre")
        sector = c1.text_input("Sector")
        country = c2.text_input("País", value="Panamá")
        exchange = c1.text_input("Bolsa", value="Latinex")
        vertical = c2.selectbox("Vertical", ["forensic", "fig", "fixed_income", "megacap"])
        notes = st.text_area("Notas")
        if st.form_submit_button("Guardar") and ticker and name:
            db.execute("INSERT INTO companies (ticker,name,sector,country,exchange,vertical,notes) VALUES (?,?,?,?,?,?,?)",
                       (ticker.upper(), name, sector, country, exchange, vertical, notes))
            st.rerun()

# ── Carga de PDFs ─────────────────────────────────────────────────────────────
elif page == "Carga de PDFs":
    st.title("Carga de filings (PDF)")
    st.caption("Regla de la casa: datos primarios. Cada filing queda registrado con fuente.")
    comp = companies_select()
    if comp:
        up = st.file_uploader("PDF del filing (10-K, EEFF auditados, trimestral)", type="pdf")
        ftype = st.text_input("Tipo de filing", value="EEFF auditados")
        period = st.text_input("Período", value="FY2025")
        url = st.text_input("URL de la fuente (Latinex / SEC / web del emisor)")
        if up and st.button("Guardar filing"):
            dest = UPLOAD_DIR / up.name
            dest.write_bytes(up.getvalue())
            db.execute("INSERT INTO filings (company_id,filing_type,period,source_url,file_path) VALUES (?,?,?,?,?)",
                       (comp["id"], ftype, period, url, str(dest)))
            st.success(f"Filing guardado: {dest.name}")
    st.subheader("Filings registrados")
    st.dataframe(df(db.query(
        "SELECT f.id, c.ticker, f.filing_type, f.period, f.source_url, f.file_path FROM filings f JOIN companies c ON c.id=f.company_id")), use_container_width=True)

# ── Extracción de Métricas ────────────────────────────────────────────────────
elif page == "Extracción de Métricas":
    st.title("Extracción de métricas desde PDF")
    st.warning("Extracción automática best-effort. Todo valor entra como NO verificado hasta confirmarlo contra el filing (método oficial: datos primarios).")
    filings = db.query("SELECT f.id, f.file_path, f.period, c.ticker, c.id AS cid FROM filings f JOIN companies c ON c.id=f.company_id")
    if not filings:
        st.info("Primero carga un PDF en el módulo Carga de PDFs.")
    else:
        f = st.selectbox("Filing", filings, format_func=lambda x: f"{x['ticker']} {x['period']} — {Path(x['file_path']).name}")
        if st.button("Extraer"):
            try:
                text = extract_text(f["file_path"])
                found = extract_metrics(text)
                if not found:
                    st.error("No se detectaron line items con los patrones actuales. Revisa el PDF (¿escaneado sin OCR?).")
                for k, vals in found.items():
                    st.write(f"**{k}**: candidatos {vals}")
                    for v in vals[:1]:
                        db.execute("INSERT INTO financial_statements (company_id,filing_id,period,statement,line_item,value,verified) VALUES (?,?,?,?,?,?,0)",
                                   (f["cid"], f["id"], f["period"], "auto", k, v))
                st.success("Candidatos guardados (verified=0). Verifícalos antes de usar en memos.")
            except Exception as e:
                st.error(f"Error extrayendo: {e}")
    st.subheader("Métricas registradas (seed + manuales)")
    st.dataframe(df(db.query(
        "SELECT c.ticker, m.period, m.metric, m.value, m.benchmark, m.signal FROM metrics m JOIN companies c ON c.id=m.company_id ORDER BY c.ticker")), use_container_width=True)

# ── Forensic Score ────────────────────────────────────────────────────────────
elif page == "Forensic Score":
    st.title("Forensic Score — Checklist Schilit")
    st.caption("Banderas oficiales del framework publicado en la web. El score 0–100 es agregación interna (Proposed Addition P1), no metodología publicada.")
    comp = companies_select()
    if comp:
        st.subheader(f"Checklist para {comp['ticker']}")
        answers = {}
        for key, q, w, desc in forensic.CHECKLIST:
            answers[key] = st.checkbox(f"**{q}** (+{w})", help=desc, key=key)
        if st.button("Calcular score"):
            result = forensic.score(answers)
            c1, c2 = st.columns(2)
            c1.metric("Forensic Score", f"{result['score']}/100")
            c2.metric("Nivel de riesgo", result["level"])
            st.info(f"Acción sugerida: {result['action']}")
            for key, q, w, d in forensic.CHECKLIST:
                if answers.get(key):
                    db.execute("INSERT INTO forensic_flags (company_id,flag,finding,severity) VALUES (?,?,?,?)",
                               (comp["id"], q, d, "Alta" if w >= 10 else "Media"))
            st.success("Banderas activas guardadas en forensic_flags.")
        st.subheader("Banderas históricas")
        st.dataframe(df(db.query("SELECT flag,finding,implication,severity,period,created_at FROM forensic_flags WHERE company_id=?", (comp["id"],))), use_container_width=True)

# ── Research Memos ────────────────────────────────────────────────────────────
elif page == "Research Memos":
    st.title("Research Memos")
    memos = db.query("SELECT m.*, c.ticker FROM memos m JOIN companies c ON c.id=m.company_id ORDER BY m.created_at DESC")
    for m in memos:
        badge = m["rating"] or "—"
        with st.expander(f"[{badge}] {m['title']} (v{m['version']})"):
            st.markdown(f"**Convicción:** {m['conviction'] or '—'} · **Upside:** {m['upside_pct'] if m['upside_pct'] is not None else '—'}%")
            st.markdown(m["body_md"] or "")

# ── Generar Memo ──────────────────────────────────────────────────────────────
elif page == "Generar Memo":
    st.title("Generador de memo sell-side")
    comp = companies_select()
    if comp:
        full = db.query("SELECT * FROM companies WHERE id=?", (comp["id"],))[0]
        thesis = st.text_area("Investment thesis")
        qoe = st.text_area("Quality of earnings (FCO/UN, DSO, one-time items)")
        c1, c2 = st.columns(2)
        price = c1.number_input("Precio actual", min_value=0.0, value=0.0)
        intrinsic = c2.number_input("Valor intrínseco (DCF ponderado)", min_value=0.0, value=0.0)
        conviction = st.selectbox("Convicción", ["Alta", "Media", "Baja"])
        sources = st.text_area("Fuentes (una por línea) — obligatorio citar filings primarios")
        if st.button("Generar"):
            flags = db.query("SELECT flag,finding,severity FROM forensic_flags WHERE company_id=?", (comp["id"],))
            mets = db.query("SELECT metric,value,benchmark,signal FROM metrics WHERE company_id=?", (comp["id"],))
            body = memo_mod.build_memo(
                ticker=full["ticker"], company=full["name"], sector=full["sector"] or "",
                price=price or None, intrinsic=intrinsic or None, thesis=thesis, qoe=qoe,
                flags=flags, metrics=mets, conviction=conviction,
                sources=[s for s in sources.splitlines() if s.strip()])
            upside = (intrinsic / price - 1) * 100 if price and intrinsic else None
            rating = memo_mod.rating_from_upside(upside) if upside is not None else None
            db.execute("INSERT INTO memos (company_id,title,rating,conviction,upside_pct,body_md) VALUES (?,?,?,?,?,?)",
                       (comp["id"], f"{full['ticker']} — Memo draft", rating, conviction, upside, body))
            st.success(f"Memo generado. Rating automático: {rating or 'N/D'} (threshold institucional).")
            st.markdown(body)
            st.download_button("Descargar memo (.md)", body, file_name=f"{full['ticker']}_memo.md")

# ── Client Pipeline ───────────────────────────────────────────────────────────
elif page == "Client Pipeline":
    st.title("Client Pipeline")
    st.dataframe(df(db.query("SELECT id,name,org,channel,service_interest,stage,next_action,next_action_date FROM leads ORDER BY created_at DESC")), use_container_width=True)
    with st.form("lead"):
        st.subheader("Nuevo lead")
        c1, c2 = st.columns(2)
        name = c1.text_input("Nombre")
        org = c2.text_input("Organización")
        channel = c1.selectbox("Canal", ["linkedin", "email", "referido", "web"])
        interest = c2.selectbox("Servicio de interés", [
            "Custom Equity Research", "Coverage Retainer", "Forensic Financial Screen",
            "Credit / Solvency Review", "Red Flags Review", "Panama Market Research",
            "AI-assisted Automation", "Custom Dashboards"])
        next_action = c1.text_input("Próxima acción")
        next_date = c2.date_input("Fecha próxima acción")
        notes = st.text_area("Notas")
        if st.form_submit_button("Guardar") and name:
            db.execute("INSERT INTO leads (name,org,channel,service_interest,next_action,next_action_date,notes) VALUES (?,?,?,?,?,?,?)",
                       (name, org, channel, interest, next_action, str(next_date), notes))
            st.rerun()
    leads = db.query("SELECT id,name,stage FROM leads")
    if leads:
        st.subheader("Actualizar etapa")
        sel = st.selectbox("Lead", leads, format_func=lambda l: f"{l['name']} ({l['stage']})")
        stage = st.selectbox("Nueva etapa", ["nuevo", "contactado", "reunion", "propuesta", "ganado", "perdido"])
        if st.button("Actualizar"):
            db.execute("UPDATE leads SET stage=? WHERE id=?", (stage, sel["id"]))
            st.rerun()

# ── Jobs Tracker ──────────────────────────────────────────────────────────────
elif page == "Jobs Tracker":
    st.title("Jobs / Applications Tracker")
    st.caption("Regla: NO aplicar sin aprobación de Ameth. Este módulo prepara, no envía.")
    st.dataframe(df(db.query("SELECT id,role,company,source,url,fit_score,status,applied_at FROM job_applications ORDER BY fit_score DESC")), use_container_width=True)
    with st.form("job"):
        st.subheader("Registrar oportunidad")
        c1, c2 = st.columns(2)
        role = c1.text_input("Rol")
        company = c2.text_input("Empresa")
        source = c1.selectbox("Fuente", ["linkedin", "wellfound", "indeed", "glassdoor", "remoteok", "flexjobs", "efinancialcareers", "directo"])
        url = c2.text_input("URL")
        fit = st.slider("Fit score", 0, 100, 60)
        msg = st.text_area("Mensaje sugerido (para aprobación)")
        if st.form_submit_button("Guardar") and role and company:
            db.execute("INSERT INTO job_applications (role,company,source,url,fit_score,message_sent) VALUES (?,?,?,?,?,?)",
                       (role, company, source, url, fit, msg))
            st.rerun()
    jobs = db.query("SELECT id,role,company,status FROM job_applications")
    if jobs:
        sel = st.selectbox("Actualizar estado", jobs, format_func=lambda j: f"{j['role']} @ {j['company']} ({j['status']})")
        status = st.selectbox("Estado", ["identificado", "aplicado", "entrevista", "oferta", "rechazado"])
        if st.button("Actualizar estado"):
            db.execute("UPDATE job_applications SET status=?, applied_at=CASE WHEN ?='aplicado' THEN date('now') ELSE applied_at END WHERE id=?",
                       (status, status, sel["id"]))
            st.rerun()

# ── Exportar ──────────────────────────────────────────────────────────────────
elif page == "Exportar":
    st.title("Exportación de entregables")
    st.caption("Markdown listo para convertir a PDF/Word (pandoc, Word, o impresión del navegador).")
    memos = db.query("SELECT m.id, m.title, m.body_md, c.ticker FROM memos m JOIN companies c ON c.id=m.company_id")
    if memos:
        sel = st.selectbox("Memo", memos, format_func=lambda m: m["title"])
        st.download_button("Descargar Markdown", sel["body_md"] or "", file_name=f"{sel['ticker']}_memo.md")
        html = f"""<!doctype html><html><head><meta charset='utf-8'>
<style>body{{font-family:Georgia,serif;max-width:760px;margin:40px auto;line-height:1.55;color:#111}}
h1{{border-bottom:2px solid #1d4ed8;padding-bottom:8px}}table{{border-collapse:collapse;width:100%}}
td,th{{border:1px solid #ccc;padding:6px 10px;font-size:14px}}</style></head>
<body><pre style='white-space:pre-wrap;font-family:inherit'>{sel['body_md'] or ''}</pre>
<hr><small>AmethQuant — amethquant.vercel.app</small></body></html>"""
        st.download_button("Descargar HTML (imprimir → PDF)", html, file_name=f"{sel['ticker']}_memo.html")
    st.markdown("**Para Word:** abre el `.md` en Word o usa `pandoc memo.md -o memo.docx`.")
