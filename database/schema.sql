-- ============================================================
-- AmethQuant — Esquema PostgreSQL
-- Ejecutar en pgAdmin4 o DBeaver:  CREATE DATABASE amethquant;
-- luego correr este script conectado a esa base.
-- La app local (app/) usa SQLite con el MISMO esquema lógico,
-- por lo que la migración es 1:1.
-- ============================================================

-- Emisores bajo coverage (método oficial: Latinex + NASDAQ, 3 verticales)
CREATE TABLE companies (
    id              SERIAL PRIMARY KEY,
    ticker          VARCHAR(12) UNIQUE NOT NULL,
    name            TEXT NOT NULL,
    sector          TEXT,
    country         TEXT,
    exchange        TEXT,                       -- Latinex, NASDAQ...
    vertical        TEXT CHECK (vertical IN ('forensic','fig','fixed_income','megacap')),
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Filings primarios (método oficial 25: datos 10-K / EEFF auditados, siempre con fuente)
CREATE TABLE filings (
    id              SERIAL PRIMARY KEY,
    company_id      INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    filing_type     TEXT,                       -- 10-K, EEFF auditados, trimestral, prospecto
    period          TEXT,
    source_url      TEXT,
    file_path       TEXT,
    pages           INT,
    uploaded_at     TIMESTAMPTZ DEFAULT now()
);

-- Line items extraídos. verified=false hasta validar contra el filing.
CREATE TABLE financial_statements (
    id              SERIAL PRIMARY KEY,
    company_id      INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    filing_id       INT REFERENCES filings(id) ON DELETE SET NULL,
    period          TEXT NOT NULL,
    statement       TEXT NOT NULL CHECK (statement IN ('income','balance','cashflow','auto')),
    line_item       TEXT NOT NULL,
    value           NUMERIC,
    currency        VARCHAR(8) DEFAULT 'USD',
    verified        BOOLEAN DEFAULT FALSE,
    UNIQUE (company_id, period, statement, line_item)
);

-- Ratios y métricas calculadas (método oficial 9: motor 15+ ratios)
CREATE TABLE metrics (
    id              SERIAL PRIMARY KEY,
    company_id      INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    period          TEXT NOT NULL,
    metric          TEXT NOT NULL,
    value           NUMERIC,
    benchmark       TEXT,
    signal          TEXT
);

-- Banderas forenses (método oficial 1: Schilit Framework)
CREATE TABLE forensic_flags (
    id              SERIAL PRIMARY KEY,
    company_id      INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    flag            TEXT NOT NULL,
    finding         TEXT,
    implication     TEXT,
    severity        TEXT CHECK (severity IN ('Crítica','Alta','Media','Baja')),
    framework       TEXT DEFAULT 'Schilit',
    period          TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Memos versionados (métodos oficiales 20, 22, 23: rating threshold,
-- coverage timeline, formato sell-side)
CREATE TABLE memos (
    id              SERIAL PRIMARY KEY,
    company_id      INT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    rating          TEXT,                       -- BUY/HOLD/SELL/AVOID/OUTPERFORM/CORE POSITION
    conviction      TEXT,
    upside_pct      NUMERIC,
    body_md         TEXT,
    version         INT DEFAULT 1,
    published       BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Casos de estudio públicos (portfolio)
CREATE TABLE case_studies (
    id              SERIAL PRIMARY KEY,
    company_id      INT REFERENCES companies(id) ON DELETE SET NULL,
    title           TEXT NOT NULL,
    summary         TEXT,
    body_md         TEXT,
    public          BOOLEAN DEFAULT TRUE
);

-- Clientes con contrato/servicio
CREATE TABLE clients (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    org             TEXT,
    email           TEXT,
    service         TEXT,
    status          TEXT DEFAULT 'prospecto' CHECK (status IN ('prospecto','propuesta','activo','cerrado')),
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Pipeline comercial pre-cliente
CREATE TABLE leads (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    org             TEXT,
    channel         TEXT,                       -- linkedin, email, referido, web
    service_interest TEXT,
    stage           TEXT DEFAULT 'nuevo' CHECK (stage IN ('nuevo','contactado','reunion','propuesta','ganado','perdido')),
    next_action     TEXT,
    next_action_date DATE,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Búsqueda laboral (regla: nada se envía sin aprobación)
CREATE TABLE job_applications (
    id              SERIAL PRIMARY KEY,
    role            TEXT NOT NULL,
    company         TEXT NOT NULL,
    source          TEXT,                       -- linkedin, wellfound, indeed, glassdoor, remoteok, flexjobs, efinancialcareers
    url             TEXT,
    fit_score       INT CHECK (fit_score BETWEEN 0 AND 100),
    status          TEXT DEFAULT 'identificado' CHECK (status IN ('identificado','aplicado','entrevista','oferta','rechazado')),
    message_sent    TEXT,
    applied_at      DATE,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Red de contactos (recruiters, founders, fondos)
CREATE TABLE contacts (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    org             TEXT,
    role            TEXT,
    email           TEXT,
    linkedin        TEXT,
    relationship    TEXT,                       -- recruiter, founder, fondo, cliente, mentor
    notes           TEXT
);

-- Tareas operativas
CREATE TABLE tasks (
    id              SERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    area            TEXT,                       -- research, clientes, jobs, producto
    due             DATE,
    done            BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Índices para las consultas más frecuentes
CREATE INDEX idx_fs_company_period   ON financial_statements (company_id, period);
CREATE INDEX idx_metrics_company     ON metrics (company_id, period);
CREATE INDEX idx_flags_company       ON forensic_flags (company_id);
CREATE INDEX idx_memos_company       ON memos (company_id, version);
CREATE INDEX idx_leads_stage         ON leads (stage);
CREATE INDEX idx_jobs_status         ON job_applications (status, fit_score DESC);
