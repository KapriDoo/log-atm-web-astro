---
type: judgment-report
change_name: "fix-ux-multipage-bugs"
created: "2026-05-19"
verdict: CONFIRMED_ISSUES
iteration: 1
max_iterations: 2
---

# Judgment Report — fix-ux-multipage-bugs (iteración 1/2)

## Veredicto: CONFIRMED_ISSUES — REGRESAR a sdd-apply

## Síntesis de Juez A + Juez B

Ambos jueces, independientemente y sin coordinarse, identificaron **el mismo issue High bloqueante**. Esto es señal alta de un defecto real (no ruido).

## Issues confirmados (intersección A ∩ B)

### High — bloqueantes para archive

| ID | Descripción | Evidencia | Fix recomendado |
|----|-------------|-----------|-----------------|
| **H-1** (A-1 ≡ B-1) | `cotizar.astro <script define:vars>` (L347-727) contiene sintaxis TypeScript (`type Unit = ...`, `as HTMLSelectElement`, generics) que NO se transpila. Astro la emite verbatim al HTML producción. Browser parsea con `SyntaxError: Unexpected identifier 'Unit'` → ningún listener se registra → wizard NO funciona en runtime → specs B7, B8, B9 (modalidad-selection, folio, responsive, email) NO se cumplen en runtime aunque build/typecheck pasen. | `node --check dist/client/cotizar/index.html` falla; verificado en ambos juicios. | Mover lógica del script inline a un módulo TS aparte (ej. `src/scripts/wizard.ts`), importarlo con `<script>import "../scripts/wizard.ts";</script>` (Astro lo transpila al ser archivo `.ts` standalone). Eliminar `<script define:vars>` o reescribirlo en JS puro sin types. Patrón ya correcto en `gsap-ind-directory.ts`. |

### Medium — fix recomendado pero no bloqueante

| ID | Descripción | Fix recomendado |
|----|-------------|-----------------|
| **M-1** (B-2, ligado a H-1) | `globals.d.ts` declara `__stepperState` (unused) y omite los globals reales (`__stepperTransition`, `__stepperIsAnimating`, `__stepperReset`). Sale a la luz al refactor de H-1. | Como parte del refactor de H-1, eliminar `define:vars` y dejar el módulo TS gestionar el estado; entonces `globals.d.ts` solo necesita los globals realmente expuestos al window (idealmente: ninguno). |
| **M-2** (B-3) | `.section { padding-block }` duplicada en `shared.css` y `services.css`. Documentado como Plan B en design. | Aceptable — está documentado con comentario. Sin acción. |
| **M-3** (A-3) | Contraste WCAG AA del hero title no fue medido en browser. Plan A funcionó por revisión estática. | Recomendación: tras el fix de H-1, verificar contraste en DevTools Accessibility Checker en `/industrias`. |
| **M-4** (A-2 ≡ B-7) | `favicon.ico` es PNG 32×32 renombrado, no ICO real. >95% browsers OK; falla en Safari iOS <14, IE11, algunos crawlers. | Decisión de scope: si se desea soporte legacy, instalar `to-ico` y regenerar; si no, aceptar como limitación documentada. **Recomendación: aceptar** (target del sitio probablemente no incluye browsers legacy). |
| **M-5** (B-4) | `/api/cotizacion` sin rate limiting (pre-existente, no introducido por este cambio). | Out of scope para este cambio. Registrar como deuda técnica futura. |

### Low — registrar como deuda técnica

| ID | Descripción |
|----|-------------|
| L-1 (A-4) | Unicidad de folio es probabilística (1/4.3B colisión por mismo ms). AC dice "no producen el mismo folio" → pragmáticamente verdadero pero formalmente probabilístico. Sin acción inmediata. |
| L-2 (A-5) | `WhatsAppIcon` usa `aria-label="WhatsApp"` junto al texto adyacente "WhatsApp" → doble anuncio en lectores. Cambiar a `aria-hidden="true"` en el SVG. **Easy fix, incluir en re-apply**. |
| L-3 (B-5) | `tagsEl.innerHTML = tags.map(...)` en `industrias.astro`: pattern XSS, aunque los tags son project-controlled. Out of scope. |
| L-4 (B-6) | `sharp` en `dependencies` debería ser `devDependencies` (solo se usa en script de build). **Easy fix**. |
| L-5 (B-8) | `isAnimating` en `gsap-stepper.ts` es estado de módulo (acoplamiento global). Aceptable mientras el módulo sea singleton; out of scope. |

## Calidad del verify-report

**No defendible**: marcó PASS basado en build estático sin smoke test del HTML producido. Habría detectado H-1 si hubiera ejecutado `node --check` sobre la página construida o un `astro preview` + curl. El smoke test fue SKIPPED por "error CJS/ESM del dev server" pero la build estática SÍ se podía inspeccionar.

**Lección registrable** (post-archive, para observations.md): el contrato de verify debe incluir "validar sintaxis del HTML/JS producido por build" para changes que tocan scripts inline `<script define:vars>`.

## Plan de remediación (para sdd-apply iteración 2)

### Cambios obligatorios
1. **Fix H-1**: refactor de `<script define:vars>` en `cotizar.astro` a módulo TS aparte.
   - Crear `log-atm-web-astro/src/scripts/wizard.ts` con la lógica del wizard.
   - Mover types, fetch del folio, manejo de pasos, listeners.
   - En `cotizar.astro`: reemplazar `<script define:vars={...}>...</script>` con `<script>import "../scripts/wizard.ts";</script>`. Si necesita pasar vars del frontmatter, hacerlo via `data-*` attributes en un container DOM.
2. **Fix M-1** (consecuencia de H-1): limpiar `globals.d.ts` para reflejar solo los globals realmente expuestos.
3. **Fix L-2** (easy): `WhatsAppIcon.astro` → `aria-hidden="true"` en el SVG (porque el texto adyacente ya lo nombra).
4. **Fix L-4** (easy): mover `sharp` de `dependencies` a `devDependencies` en `package.json`.

### Verify reforzado (iteración 2)
- Tras el fix, ejecutar `npm run build`.
- Ejecutar `node --check log-atm-web-astro/dist/client/cotizar/index.html` (o equivalente que extraiga el script y lo valide).
- Opcional: `astro preview` + `curl http://localhost:4321/cotizar` y `grep` por sintaxis TS sospechosa en el HTML.
- Verify-report debe reportar este check explícitamente.

## Recomendación al orquestador

REGRESAR a `sdd-apply` (iteración 1 → 2 de máximo 2). Si esta iteración no resuelve H-1, escalar al usuario.
