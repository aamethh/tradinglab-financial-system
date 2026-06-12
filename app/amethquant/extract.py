"""Extracción de texto y métricas desde PDFs de estados financieros.

Extracción best-effort por regex sobre texto de pypdf. Todo dato extraído
entra a la DB con verified=0: la regla de la casa (datos primarios, método 25
del inventory) exige verificación humana contra el filing original antes de
usarse en un memo.
"""
import re
from pypdf import PdfReader

# Patrones para line items comunes en EEFF en español e inglés.
LINE_ITEMS = {
    "ingresos": r"(?:ingresos(?:\s+totales)?|total\s+revenues?|ventas\s+netas)",
    "utilidad_neta": r"(?:utilidad\s+neta|p[ée]rdida\s+neta|net\s+income|net\s+loss)",
    "fco": r"(?:flujo[s]?\s+(?:de\s+)?efectivo\s+(?:de|en|por)\s+(?:las\s+)?actividades\s+de\s+operaci[óo]n|cash\s+(?:flows?\s+)?from\s+operating)",
    "activos_totales": r"(?:total\s+(?:de\s+)?activos|total\s+assets)",
    "patrimonio": r"(?:total\s+(?:de\s+)?patrimonio|total\s+(?:stockholders.?\s+)?equity)",
    "cuentas_por_cobrar": r"(?:cuentas\s+por\s+cobrar|accounts\s+receivable)",
    "deuda": r"(?:deuda\s+(?:financiera|total)|total\s+debt|pr[ée]stamos\s+por\s+pagar)",
}

NUMBER = r"[\(\-]?\$?\s?([\d.,]{3,})\)?"


def extract_text(pdf_path: str, max_pages: int = 150) -> str:
    reader = PdfReader(pdf_path)
    pages = reader.pages[:max_pages]
    return "\n".join((p.extract_text() or "") for p in pages)


def _to_float(s: str):
    s = s.strip().replace(" ", "")
    # Formato 1.234.567,89 (latino) vs 1,234,567.89 (US)
    if s.count(",") == 1 and s.count(".") > 1:
        s = s.replace(".", "").replace(",", ".")
    else:
        s = s.replace(",", "")
    try:
        return float(s)
    except ValueError:
        return None


def extract_metrics(text: str) -> dict:
    """Devuelve {line_item: [valores encontrados]} para revisión humana."""
    found = {}
    for key, pattern in LINE_ITEMS.items():
        hits = []
        for m in re.finditer(pattern + r"[^\n\d]{0,40}" + NUMBER, text, re.IGNORECASE):
            val = _to_float(m.group(1))
            if val is not None:
                hits.append(val)
        if hits:
            found[key] = hits[:5]
    return found
