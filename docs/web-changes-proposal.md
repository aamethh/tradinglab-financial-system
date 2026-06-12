# Cambios a la web comercial — hechos y propuestos

## Hechos en esta rama (listos para deploy al hacer merge)

1. **Nueva página `/servicios`** — 2 servicios oficiales con precio/timeline/alcance/entregables/límites,
   6 paquetes especializados, 3 casos de uso enlazados al research publicado, política comercial y CTA "Pedir propuesta".
2. **Nueva página `/work-with-me`** — About Ameth honesto (formación real, sin títulos inventados),
   Research Samples (los 4 coverages), CTA para empleadores (roles objetivo) y CTA para clientes.
3. **Navbar** — enlaces "Servicios" y "Work With Me" (desktop + móvil).
4. **Hero** — tercer CTA "Servicios y precios".

Verificado: `npm run build` pasa sin errores. Deploy: merge a la rama que Vercel observa (o `vercel --prod`).

## Propuestos (requieren tu aprobación — NO implementados)

1. **Headline.** El actual ("Equity Research Independiente") es correcto pero genérico. Alternativa
   más vendedora manteniendo la voz de la casa:
   > **"Research que lee el cash flow, no la narrativa."**
   > Equity research independiente y forensic financial analytics — Panamá · LatAm.
2. **Sección de precios en la home** — hoy los precios viven en Contact y /servicios; un bloque
   resumen en la home subiría conversión.
3. **Testimonios** — agregar cuando exista el primer cliente real (no inventar).
4. **Página "Research Samples" separada** — hoy es sección de /work-with-me; separarla si crece el coverage.
5. **Formulario de contacto** (Formspree/Tally) en lugar de solo mailto, para capturar leads aunque
   el visitante no tenga cliente de correo configurado.
6. **Versión EN de la web** — necesaria para clientes/empleadores internacionales; priorizar tras los CV.
