---
type: judgment
judge: B
focus: code-quality-regressions
change_name: "fix-cotizar-mobile-wizard-stepper"
created: "2026-05-20"
verdict: PASS
---
# Juicio B

## Veredicto: PASS

La implementación es correcta, sin leaks, sin código muerto, y la premisa técnica de ambos fixes (touch-action + cleanup manual) es válida. Soporte de `overflow:clip` y de la base touch-action verificado contra el target iOS 16+. Único señalamiento (no bloqueante): pérdida de contexto textual del paso para lectores de pantalla en ≤640px por `display:none` sobre `.stepper__label`, sin equivalente accesible — calidad, no bug funcional.

---

## Auditoría del refactor de listeners (leaks, refs, cleanup)

Verificado directamente sobre `src/scripts/wizard.ts` (no solo sobre el verify-report).

### Misma referencia en add/remove — CORRECTO

```ts
function on<E extends Event>(target, type, handler): void {
  if (!target) return;
  const h = handler as EventListener;   // ① referencia única materializada
  target.addEventListener(type, h);     // ② usa h
  cleanups.push(() => target.removeEventListener(type, h)); // ③ usa el MISMO h y target
}
```

- `h` se materializa UNA vez por invocación y el closure de cleanup captura exactamente esa misma referencia `h` y el mismo `target`. `removeEventListener` empareja por (type, listener, capture); como capture es el default (false) en ambos y `h` es idéntico, **el listener SÍ se remueve**. No cae en el antipatrón clásico de pasar una función distinta (p.ej. envolver el handler en otra arrow en el remove). PASS.

### `cleanups.length = 0` — PRESENTE

```ts
() => { cleanups.forEach((fn) => fn()); cleanups.length = 0; }
```
Vacía el array tras ejecutar todos los cleanups. Evita doble-cleanup si el handler se reentrara. PASS.

### Registro único del cleanup por page-load — CORRECTO (sin acumulación)

Punto que suele fallar y aquí está bien resuelto:
- Todo el bloque (incluido `const cleanups = []` y el `addEventListener('astro:before-swap', ..., {once:true})`) vive DENTRO del handler de `astro:page-load`. Cada entrada a la página crea un `cleanups[]` fresco y un before-swap nuevo con `{once:true}`.
- `{once:true}` garantiza que ese before-swap se auto-remueve tras dispararse. No quedan handlers before-swap apilados navegación tras navegación. PASS.
- Conteo de `addEventListener` en fuente: 4 literales = page-load (L61) + helper interno (L121) + before-swap (L125) + 1 falso positivo en comentario (L109). No hay listeners sueltos fuera de `on()`. PASS.

### Edge case: hard navigation (before-swap NO se dispara)

- Si el usuario hace navegación dura (recarga completa / cierre de pestaña), `astro:before-swap` no se dispara y los DOM listeners no se remueven explícitamente. **Esto NO es un leak real**: en una navegación dura el documento entero se descarta y el GC recupera nodos+listeners. El cleanup manual solo importa para View Transitions (mismo documento), que es exactamente el caso que cubre. Correcto por diseño. Sin acción.
- Matiz menor (no bloqueante): si Astro dispara `astro:page-load` dos veces sobre el MISMO documento sin un `before-swap` intermedio (escenario teórico, no observado en Astro VT estándar), se acumularía un segundo set de listeners sobre los mismos nodos → doble-fire de handlers. No es el flujo normal de Astro y el patrón anterior (AbortController) tenía la misma característica. No es regresión introducida por este cambio.

**Conclusión refactor**: sin leaks, refs correctas, cleanup idempotente. Equivalente funcional 1:1 al AbortController previo, con mejor compatibilidad. PASS.

---

## Correctness iOS Safari

### touch-action en base, no en media query — CORRECTO

- `.stepper__step`: `touch-action: manipulation` + `-webkit-tap-highlight-color: transparent` en regla BASE (cotizar.css:70-71).
- `.mode-tile`: ídem en base (cotizar.css:163-164).
- `#btn-next, #btn-back`: regla BASE nueva (cotizar.css:289-294), fuera de `@media`.
- Verificado: aplican siempre, incluyendo tablets/iPad portrait (768-1024px), no solo ≤640px. Coherente con el MUST "todos los tappables". PASS.

### `-webkit-tap-highlight-color: transparent` — PRESENTE en los 3 grupos. PASS.

### Premisa del fix AbortSignal — VÁLIDA (no es no-op)

- Safari añadió soporte de `AbortSignal` como opción de `addEventListener` en **15.4**. En iOS Safari < 15.4 el tercer argumento `{signal}` se interpreta como diccionario de opciones desconocido → no aborta y, según la versión, el handler puede registrarse igual (las options desconocidas se ignoran) o no. La premisa de "fallo silencioso de registro" es **plausible y conservadora**; el refactor a cleanup manual es estrictamente más seguro y elimina la incógnita. No es un no-op: cambia el comportamiento real para esa cohorte. PASS.
- Realismo: para iOS 16+ (target declarado), el AbortController YA funcionaba; el lever dominante de "modalidad no seleccionable" en 16+ es el **delay de 300ms / ausencia de touch-action**, no el AbortSignal. El design.md lo reconoce explícitamente (línea 70). Ambos fixes son complementarios y de bajo riesgo. Premisa correcta y honestamente acotada.

### Otros patrones iOS-unsafe en el código tocado

- No se introducen `passive` listeners problemáticos (los handlers no llaman `preventDefault` en scroll/touch; son `click`/`change`/`input`). Sin riesgo.
- `position: sticky; top: 60px` en `.stepper` (preexistente, no tocado) puede tener jitter con bounce scrolling en Safari, pero es fuera de scope y no introducido aquí.
- No hay otros `addEventListener` con opciones iOS-unsafe restantes (grep confirma 0 `signal`/`AbortController` en fuente).

### Soporte de `overflow-x: clip` en Safari 16

- **Verificado**: Safari implementó `overflow: clip` / `overflow-x: clip` en **16.0**. El acceptance apunta a iOS 16+, por lo que está cubierto.
- Robustez ante iOS 15.x (donde `clip` no existe): la declaración se ignora (CSS tolera valores desconocidos) → fallback a comportamiento `visible` del default, PERO el no-overflow ya está garantizado por el box model (`minmax(0,1fr)` + label/name ocultos + padding/gap comprimidos ⇒ ~156px requeridos vs ~353px disponibles). El `clip` es un guard rail, no la defensa primaria. **No hay regresión en iOS 15.x**. PASS.

---

## Regresiones potenciales

| ID | Severidad | Descripción | Recomendación |
|----|-----------|-------------|---------------|
| RB-1 | Baja | Breakpoint ampliado 480px→640px afecta la banda 481-640px (phones grandes / tablet portrait pequeño): ahora entran en modo compacto solo-bullets. Antes ese rango mostraba bullet+label. No es breakage; es cambio estético en una banda donde `@media ≤720px` ya ocultaba `.stepper__name`. | Aceptar. Validar visualmente en ~600px si el usuario lo considera relevante. |
| RB-2 | Baja | `overflow-x: clip` en `.stepper__track`: si en el futuro algún hijo del stepper usa popover/tooltip que desborde el track, quedaría recortado. Hoy no hay tal elemento. | Sin acción; monitorear si se añaden overlays al stepper. |
| RB-3 | Info | El `overflow-x: hidden` sobre `.quote-layout` del PR#19 se conservó. NO es código muerto: scopea el layout debajo del stepper. El guard real del stepper es ahora `overflow-x: clip` en `.stepper__track`. Limpieza correcta del fix erróneo de PR#19. | Sin acción. |
| RB-4 | Nula | Desktop (>640px): reglas base del stepper intactas; el bloque mobile está confinado al media query. Sin regresión desktop. | Sin acción. |
| RB-5 | Nula | Lógica de selección de modalidad, render, transición GSAP y fallback sin GSAP: idénticos pre/post refactor. Solo cambió el mecanismo de registro/cleanup. | Sin acción. |

No se detectaron regresiones de severidad media/alta.

---

## Accesibilidad (stepper__label display:none)

- Markup (cotizar.astro:82-90): cada `.stepper__step` es un `<div>` (no `<button>`/`<a>`, no `role`, no `tabindex`) con `.stepper__bullet` (número "01") + `.stepper__label` ("PASO 01") + `.stepper__name` (nombre del paso). No hay `aria-current`, `aria-label`, ni `role="list"/listitem`, ni texto visually-hidden.
- En ≤640px: `display:none` sobre `.stepper__label` Y `.stepper__name` ⇒ el lector de pantalla solo encontrará el número del bullet ("01".."04"). Se pierde el nombre/etiqueta del paso para tecnología asistiva en mobile.
- **Severidad: BAJA, no bloqueante.**
  - `display:none` retira el contenido del árbol de accesibilidad (correcto si quisiéramos ocultarlo de todos), pero aquí se hace por espacio visual, no por redundancia → idealmente debería preservarse para SR vía `.sr-only`/visually-hidden o `aria-label` en el step.
  - No es un fallo WCAG duro: el número de paso permanece perceptible y el panel activo de cada step tiene su propio `<h2 class="quote-step__title">` (cotizar.astro:105,133,175) que SÍ describe el contenido. La navegación por pasos no depende del label del stepper.
  - El gap es **preexistente al patrón** (los `<div>` del stepper nunca fueron interactivos a nivel semántico, aunque JS les añade click). Este change no lo empeora respecto al estado funcional; solo lo hace más visible al ocultar el texto en mobile.
- **Recomendación (mejora opcional, fuera del scope del fix):** en ≤640px usar una técnica visually-hidden en `.stepper__label` en lugar de `display:none`, o añadir `aria-label={`${stepLabel} ${n}: ${name}`}` + `aria-current="step"` al `.stepper__step` activo. No condiciona el PASS de este change.

---

## Recomendación final

**PROCEDER.**

El refactor de listeners es correcto y sin leaks (refs idénticas en add/remove, `cleanups.length=0`, before-swap `{once:true}` por page-load sin acumulación). Las reglas iOS (touch-action + tap-highlight) están en base como corresponde. `overflow:clip` está soportado en el target iOS 16+ y es solo guard rail (no-overflow garantizado por box model). No hay código muerto del PR#19. Conventional commits correctos.

Condiciones que ya están bien capturadas en el pipeline:
1. Validación runtime en iPhone físico (iOS 16+) sigue pendiente y es responsabilidad del usuario (D2). No bloquea el merge del PR pero sí el cierre del bug como resuelto en producción.
2. Mejora de accesibilidad del stepper (label oculto para SR en mobile) queda como deuda menor opcional, no como blocker.
