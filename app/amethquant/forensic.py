"""Motor de Forensic Score de AmethQuant.

Base oficial: Schilit Framework tal como aparece en amethquant.vercel.app
(revenue inflado, gastos diferidos, one-time gains recurrentes, capitalización
agresiva, reconciliación FCO vs UN, DSO, patrimonio operativo, Asuntos de
Énfasis del auditor, ROIC vs WACC, cobertura de intereses).

El score numérico 0-100 es una ADICIÓN PROPUESTA (P1 del Method Inventory):
agrega las banderas oficiales en un número interno. No es metodología oficial
publicada; el entregable cliente sigue siendo la tabla de banderas.
"""

# (clave, pregunta, peso, descripción del umbral)
CHECKLIST = [
    ("fco_un", "FCO / Utilidad Neta < 1.0x", 15,
     "Utilidades sin respaldo de caja — señal primaria Schilit (caso GRPOTX: 0.61x)."),
    ("fco_negativo", "FCO negativo con utilidad neta positiva", 12,
     "Divergencia extrema caja vs P&L (GRPOTX: FCO -$15.0M vs UN +$0.6M)."),
    ("dso", "DSO > 1.5x su nivel histórico", 12,
     "Revenue pull-forward / cuentas por cobrar infladas (GRPOTX: 669d vs 53d modelo)."),
    ("one_time", "Ganancias 'one-time' en 2+ períodos consecutivos", 10,
     "Resultados extraordinarios presentados como recurrentes."),
    ("capitalizacion", "Capex/Ingresos > 1.5x promedio histórico o intangibles +30% YoY", 8,
     "Posible diferimiento de gastos operativos vía capitalización."),
    ("patrimonio_op", "Patrimonio operativo negativo excluyendo revaluaciones", 10,
     "Capital real vs cosmético (GRPOTX: -$10.7M operativo)."),
    ("auditor", "Asunto de Énfasis / opinión calificada del auditor", 10,
     "El auditor señaló algo material (GRPOTX: Nota 17)."),
    ("cobertura", "Cobertura de intereses < 2.0x", 8,
     "Estrés de servicio de deuda (GRPOTX: 1.22x)."),
    ("roic_wacc", "ROIC < WACC", 6,
     "Destrucción de valor (GRPOTX: ROIC 1.35% vs WACC 7.65%)."),
    ("partes_rel", "Transacciones con partes relacionadas materiales sin detalle", 4,
     "Riesgo de transferencia de valor fuera del perímetro."),
    ("divergencia", "Crecimiento de ingresos divergente vs sector sin explicación", 3,
     "GRPOTX: +18% YoY con sector en contracción."),
    ("apalancamiento", "Deuda/EBITDA en alza sostenida (3+ períodos)", 2,
     "Deterioro estructural del balance."),
]

MAX_SCORE = sum(w for _, _, w, _ in CHECKLIST)  # 100


def score(flags_active: dict) -> dict:
    """flags_active: {clave: bool}. Devuelve score 0-100 y clasificación."""
    raw = sum(w for key, _, w, _ in CHECKLIST if flags_active.get(key))
    pct = round(raw * 100 / MAX_SCORE)
    if pct >= 60:
        level, action = "Crítico", "AVOID — banderas múltiples activas"
    elif pct >= 35:
        level, action = "Alto", "Revisión forense profunda antes de cualquier posición"
    elif pct >= 15:
        level, action = "Moderado", "Monitorear banderas activas en próximos estados"
    else:
        level, action = "Bajo", "Sin señales forenses materiales con la información disponible"
    return {"score": pct, "level": level, "action": action,
            "active": [q for key, q, _, _ in CHECKLIST if flags_active.get(key)]}
