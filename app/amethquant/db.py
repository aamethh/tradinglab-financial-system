"""Capa de datos de AmethQuant OS.

SQLite local para ejecución inmediata. El esquema replica database/schema.sql
(PostgreSQL) para que la migración sea 1:1 cuando exista un servidor.
"""
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "amethquant.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    sector TEXT,
    country TEXT,
    exchange TEXT,
    vertical TEXT,            -- forensic | fig | fixed_income | megacap
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS filings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER REFERENCES companies(id),
    filing_type TEXT,         -- 10-K, EEFF auditados, trimestral, prospecto
    period TEXT,
    source_url TEXT,
    file_path TEXT,
    pages INTEGER,
    extracted_text_path TEXT,
    uploaded_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS financial_statements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER REFERENCES companies(id),
    filing_id INTEGER REFERENCES filings(id),
    period TEXT NOT NULL,
    statement TEXT NOT NULL,  -- income | balance | cashflow
    line_item TEXT NOT NULL,
    value REAL,
    currency TEXT DEFAULT 'USD',
    verified INTEGER DEFAULT 0  -- 0 = extraído automático, 1 = verificado humano
);
CREATE TABLE IF NOT EXISTS metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER REFERENCES companies(id),
    period TEXT NOT NULL,
    metric TEXT NOT NULL,
    value REAL,
    benchmark TEXT,
    signal TEXT
);
CREATE TABLE IF NOT EXISTS forensic_flags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER REFERENCES companies(id),
    flag TEXT NOT NULL,
    finding TEXT,
    implication TEXT,
    severity TEXT,            -- Crítica | Alta | Media | Baja
    framework TEXT DEFAULT 'Schilit',
    period TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS memos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER REFERENCES companies(id),
    title TEXT NOT NULL,
    rating TEXT,              -- BUY | HOLD | SELL | AVOID | OUTPERFORM | CORE POSITION
    conviction TEXT,
    upside_pct REAL,
    body_md TEXT,
    version INTEGER DEFAULT 1,
    published INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS case_studies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER REFERENCES companies(id),
    title TEXT NOT NULL,
    summary TEXT,
    body_md TEXT,
    public INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    org TEXT,
    email TEXT,
    service TEXT,
    status TEXT DEFAULT 'prospecto',  -- prospecto | propuesta | activo | cerrado
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    org TEXT,
    channel TEXT,             -- linkedin | email | referido | web
    service_interest TEXT,
    stage TEXT DEFAULT 'nuevo',  -- nuevo | contactado | reunion | propuesta | ganado | perdido
    next_action TEXT,
    next_action_date TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    source TEXT,              -- linkedin | wellfound | indeed | ...
    url TEXT,
    fit_score INTEGER,        -- 0-100
    status TEXT DEFAULT 'identificado',  -- identificado | aplicado | entrevista | oferta | rechazado
    message_sent TEXT,
    applied_at TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    org TEXT,
    role TEXT,
    email TEXT,
    linkedin TEXT,
    relationship TEXT,        -- recruiter | founder | fondo | cliente | mentor
    notes TEXT
);
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    area TEXT,                -- research | clientes | jobs | producto
    due TEXT,
    done INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
"""


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.executescript(SCHEMA)
    return conn


def query(sql, params=()):
    with get_conn() as conn:
        return [dict(r) for r in conn.execute(sql, params).fetchall()]


def execute(sql, params=()):
    with get_conn() as conn:
        cur = conn.execute(sql, params)
        conn.commit()
        return cur.lastrowid
