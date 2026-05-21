---
type: judgment
judge: A
focus: correctness-vs-specs
change_name: "fix-cotizar-mobile-wizard-stepper"
created: "2026-05-20"
verdict: PASS
---
# Juicio A

## Veredicto: PASS

La implementación es correcta y completa frente a ambas specs. El refactor de listeners migró el 100% de los call sites sin alterar la lógica del wizard, y el CSS del stepper corrige la causa raíz del overflow sin regresión en desktop. El verify PASS es defendible y, a diferencia del PR#19, es riguroso sobre el punto exacto que falló (overflow del stepper). Todo lo verificable estáticamente está confirmado por lectura directa de código + bundle + build fresco; lo no verificable (comportamiento táctil iOS real) está honestamente marcado como pendiente de device.

---

## Auditoría del refactor de listeners

**Migración completa — CONFIRMADO.**
- `grep -cn "{ signal" src/scripts/wizard.ts` = **0**. `AbortController`/`controller.signal`/`.abort()` = **0**. (verificado por mí, no asumido).
- Original (`dec5e29`) tenía **18 call sites interactivos** de `addEventListener(..., sig)`: 5 dentro de `.forEach` (mode-tile, cargo-chips, extras-chips, unit-toggle, stepper-steps) + 13 escalares (origin, dest, incoterm, volume, weight, count, name, company, email, phone, notes, btnBack, btnNext).
- Nueva versión tiene **exactamente 18 invocaciones `on(...)`** que mapean 1:1 con los originales. No quedó ningún `, sig)` ni `.addEventListener` huérfano para elementos interactivos: solo persisten los 2 listeners de ciclo de vida (`astro:page-load` línea 61, `astro:before-swap` línea 125) y el `target.addEventListener` interno del helper (línea 121). Migración íntegra.

**Helper `on()` correcto — CONFIRMADO.**
- Registra (`target.addEventListener(type, h)`) Y guarda la referencia exacta del mismo handler casteado (`const h = handler as EventListener`) en `cleanups.push(() => target.removeEventListener(type, h))`. El par add↔remove usa la MISMA referencia `h`, requisito indispensable para que `removeEventListener` funcione. Correcto.
- Guard `if (!target) return` absorbe el `?.` previo de los `$('#...')?.addEventListener`. Para selectores ausentes simplemente no registra (igual que el `?.` original). Semánticamente equivalente.

**Cleanup en `astro:before-swap` — CORRECTO.**
- `() => { cleanups.forEach((fn) => fn()); cleanups.length = 0; }` con `{ once: true }`. `{ once: true }` está soportado desde iOS Safari 10 (no es AbortSignal), así que es compatible con la cohorte target < 15.4. Limpia TODOS los listeners acumulados y vacía el array (evita doble-cleanup). Correcto.

**Lógica de selección de modalidad (.mode-tile) INTACTA — leída, no asumida.**
- `wizard.ts:242-252`: el forEach sobre `.mode-tile` y el cuerpo del handler (set `state.mode`/`state.modeName`, toggle de `mode-tile--active` vía `b === btn`, `renderSummary()`, `renderStep()`) son IDÉNTICOS al original. El diff solo reemplazó la envoltura `btn.addEventListener('click', fn, sig)` → `on(btn, 'click', fn)`. Cero cambio de comportamiento.
- Los tiles son `<button type="button" data-mode data-mode-name>` (cotizar.astro:110-124), no input/label — selección 100% JS, lo que hace que el fallo silencioso por AbortSignal en iOS < 15.4 fuera causa plausible del bug original. El fix elimina esa rama de fallo.

**Listeners críticos preservados — CONFIRMADO.**
- mode-tile (243), btn-next (389), btn-back (321), stepper-steps (401), inputs de contacto (314-318), unit-toggle (286), chips (261/273), selects de ruta (255-257): todos presentes vía `on()`. El submit del folio se dispara desde el handler de `btnNext` (389→`submitQuote()`→`fetch('/api/cotizacion')` línea 360) — la cadena fetch/folio NO fue tocada por el refactor. Intacta.

**Doble-registro en re-ejecución de `astro:page-load` — SIN REGRESIÓN.**
- Cada disparo de `astro:page-load` crea un `cleanups` nuevo (scope local del handler) y registra un `astro:before-swap` nuevo con `{ once: true }`. El cleanup previo ya removió los listeners del DOM saliente; el DOM entrante es nuevo (View Transitions reemplaza el árbol), así que los nuevos listeners no se solapan con los viejos. Comportamiento equivalente al patrón AbortController original (que también creaba un controller fresco por carga). No introduce acumulación.

**Build/typecheck — VERIFICADO POR MÍ.**
- `npm run build` fresco → `[build] Complete!` en ~6.3s. El generic `on<E extends Event>` y el cast `handler as EventListener` transpilan sin error de tipo. (No hay `tsc`/`astro check` standalone; el build de Astro cubre el transpile-check — limitación honesta heredada del verify.)

---

## Auditoría del CSS del stepper

**Breakpoint 640px reemplazó al 480px (no duplicó) — CONFIRMADO.**
- `grep -n "480px"` = **sin resultados**. Único media nuevo en línea 401 `@media (max-width: 640px)`. No hay dos bloques mobile solapados. (El `@media (max-width: 720px) { .stepper__name { display:none } }` de línea 104 es preexistente y redundante con el 640px pero inofensivo — el 640 también oculta `.stepper__name`.)

**`.stepper__label { display: none }` DENTRO del media 640px — CONFIRMADO.**
- `cotizar.css:413`, dentro del bloque abierto en 401 y cerrado en 429. Bundle confirma `...640px){...stepper__label,.stepper__name{display:none}...}`.

**`overflow-x: clip` en el track CORRECTO (no en hermano) — CONFIRMADO (este era el bug del PR#19).**
- DOM real (cotizar.astro): `.stepper#stepper` > `.container` > `.stepper__track` (línea 80). `.quote-layout` es un `<section>` HERMANO separado (línea 98). El PR#19 puso `overflow-x: hidden` en `.quote-layout`, que NO envuelve al stepper → no lo protegía (causa raíz del bug que el PR#19 no vio). El fix pone `overflow-x: clip` en `.stepper__track` (cotizar.css:405), el contenedor directo de los steps. Ubicación correcta y verificada contra el markup.

**Cálculo de ancho — CIERRA.**
- `.container { padding-inline: clamp(1.25rem, 5vw, 2.5rem) }` (global.css:317). En iPhone 14 (393px): 5vw=19.65px/lado → ~354px útiles. En iPhone SE (375px): 5vw=18.75px → ~337px útiles.
- Track: `repeat(4, minmax(0, 1fr))`. El `minmax(0, …)` es el elemento crítico: permite que cada celda se comprima por debajo del min-content, evitando el blowout del grid. Cada celda = ancho_útil/4 ≈ 88px (393px) / 84px (375px).
- Contenido por step en modo compacto: padding 0.25rem×2 = 8px + bullet 28px = 36px ≪ 84-88px disponibles. 4 celdas + 3 gaps de 4px llenan exactamente el track por definición de `1fr`. Sin overflow en 375/393/430px. Math sólida.

**Regresión desktop (>640px) — SIN RIESGO.**
- Todas las reglas del fix están confinadas dentro de `@media (max-width: 640px)`. Las reglas BASE (touch-action, padding 1.25rem, bullet 30px, label/name visibles) quedan intactas para >640px. `touch-action: manipulation` y `-webkit-tap-highlight-color` son neutros en desktop (no afectan layout ni hover). Scenario 4 (desktop sin regresión) satisfecho por construcción.

**touch-action (B2.1) — CONFIRMADO en base.**
- `.stepper__step` (cotizar.css:70-71), `.mode-tile` (163-164), `#btn-next,#btn-back` (290-293) — los 4 tappables, en reglas BASE (fuera de @media), correcto para cubrir también iPad portrait. Bundle: `touch-action:manipulation` ×3 (los 4 selectores agrupados en 3 reglas). `-webkit-tap-highlight-color: transparent` en los 3.

> Nota menor (no bloqueante): los tokens `--space-1`/`--space-3` referenciados en el media 640px NO están definidos en el CSS del proyecto; siempre aplican los fallbacks (`0.25rem`/`1rem`), que son los valores correctos pretendidos. Sin impacto funcional. Inconsistencia cosmética con el resto del codebase, opcional de limpiar.

---

## Hallazgos confirmados

| ID | Severidad | Spec | Descripción | Recomendación |
|----|-----------|------|-------------|---------------|
| A-1 | Info (no bloqueante) | responsive-mobile-v2 | `--space-1`/`--space-3` no definidos como tokens; siempre cae al fallback (valores correctos). | Opcional: usar literal `0.25rem`/`1rem` o definir los tokens. No bloquea archive. |
| A-2 | Info (no bloqueante) | responsive-mobile-v2 | `@media (max-width: 720px){.stepper__name{display:none}}` (línea 104) queda redundante con el 640px. Inofensivo. | Sin acción requerida. |

**Ningún hallazgo de severidad media o alta.** Ningún defecto de correctness. Ningún listener perdido. Lógica de wizard intacta.

---

## Acceptance criteria

### wizard-responsive-mobile-v2

| AC | Verificable estáticamente | Estado |
|----|---------------------------|--------|
| Etiquetas "PASO XX" no visibles ≤640px | SÍ (CSS `.stepper__label{display:none}` en media + bundle) | ✅ defendible |
| Bullet activo identificable ≤640px | SÍ (regla `.stepper__step--active .stepper__bullet` base no tocada; visible) | ✅ defendible |
| Desktop >640px sin regresión | SÍ (fix 100% confinado en media; base intacta) | ✅ defendible |
| `overflow-x: clip` en contenedor del stepper | SÍ (track, verificado vs DOM + bundle) | ✅ defendible |
| Stepper visible sin overflow en 375/393/430px | PARCIAL — math estática lo prueba con alto rigor; **render final requiere device/headless** | Marcado `[ ]` honestamente en la spec |

### wizard-modality-tap-ios

| AC | Verificable estáticamente | Estado |
|----|---------------------------|--------|
| Fallback funcional si código usa `{ signal }` | SÍ (refactor a cleanup manual confirmado, 0 signal en fuente+bundle) | ✅ defendible |
| 4 tappables con `touch-action: manipulation` | SÍ (CSS + bundle ×3 reglas) | ✅ defendible |
| Tap < 100ms en iOS 16+ | NO — **requiere iPhone real** (touch-action elimina el delay, pero la latencia perceptible solo se mide en device) | Marcado `[ ]` honestamente |
| "Siguiente" se habilita tras seleccionar | PARCIAL — la lógica `canAdvance()`/`updateStepperUI()` es correcta estáticamente; el tap real requiere device | Marcado `[ ]` honestamente |
| Avanza a paso 02 | PARCIAL — lógica `btnNext` correcta; tap real requiere device | Marcado `[ ]` honestamente |
| cotizar→home→cotizar sin listeners huérfanos | PARCIAL — cleanup correcto por diseño (1:1 add/remove + `cleanups.length=0`); View Transitions reales requieren browser | Marcado `[ ]` honestamente |

**Veredicto sobre los AC**: los marcados `[x]` en ambas specs son todos verificables estáticamente y los confirmé independientemente. Los marcados `[ ]` son genuinamente dependientes de device/browser y están honestamente sin marcar. NO hay ningún AC marcado `[x]` que yo no pueda defender — ninguna "✅ inflada".

---

## ¿El verify PASS es defendible?

**SÍ, y es más riguroso que el del PR#19.** El PR#19 falló porque dio PASS sin verificar el punto exacto que rompía: `overflow-x` en el contenedor equivocado (hermano `.quote-layout` en vez del `.stepper__track`). Este verify:
- Audita explícitamente la ubicación del `overflow-x: clip` contra el DOM (el punto que el PR#19 erró) y yo lo re-confirmé contra `cotizar.astro`.
- Confirma `480px` ausente (no solo `640px` presente) — descarta el solapamiento de breakpoints.
- Inspecciona el bundle producido (no solo la fuente), cerrando la brecha entre "lo que escribí" y "lo que se sirve".
- Es honesto sobre las 4 limitaciones (device iOS, headless, typecheck formal, View Transitions). No infla.

La única salvedad legítima — idéntica a la del verify — es que el cierre del bug en producción depende de confirmación del usuario en iPhone físico (D2 aprobado). Eso es una característica del scope, no una debilidad del verify.

---

## Recomendación final

**PROCEDER a archive**, con la nota de runtime ya documentada: el archive prepara el PR pero el bug NO se considera cerrado en producción hasta confirmación del usuario en iPhone real (iOS 16+) de: (a) stepper compacto sin scroll horizontal en portrait, (b) tap inmediato en modalidad que habilita "Siguiente", (c) avance a paso 02, (d) cotizar→home→cotizar sin bloqueo. Los hallazgos A-1/A-2 son cosméticos y no bloquean.
