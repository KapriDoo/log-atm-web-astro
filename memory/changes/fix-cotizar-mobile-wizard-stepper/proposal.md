---
type: proposal
change_name: "fix-cotizar-mobile-wizard-stepper"
domain: "fix"
status: approved
created: "2026-05-20"
approved: "2026-05-20"
effort: S
risks_overall: Media
predecessor_pr: 19
---

# Propuesta — fix-cotizar-mobile-wizard-stepper

## Intent

El PR #19 intentó resolver dos bugs mobile en `/cotizar` (B7 modalidad no seleccionable, B9 stepper descuadrado), pero su verify estático perdió ambas regresiones en runtime iOS Safari real. La exploración confirma que el media query `≤480px` **sí aplica** en iPhones modernos (393–430px CSS), pero las reglas internas son insuficientes (mantienen `padding 1.25rem 1rem` + `.stepper__label` visible → ~556px requeridos vs ~353px disponibles → overflow garantizado), y los tiles de modalidad carecen de `touch-action: manipulation` (delay 300ms iOS) y posiblemente sufren fallo silencioso del patrón `addEventListener(_, _, { signal })` en iOS < 15.4. Este fix supersede el delta de PR #19 atacando la causa raíz CSS + táctil, sin rehacer el wizard.

## Scope

**Incluye**:
- Fix CSS del stepper en mobile: eliminar `.stepper__label` + reducir `padding`/`gap` del `.stepper__step` en un breakpoint ampliado (≤640px) para cubrir todos los iPhones modernos en portrait.
- Fix de interacción táctil en iOS Safari: `touch-action: manipulation` y `-webkit-tap-highlight-color: transparent` en `.mode-tile` (y opcionalmente en `.stepper__step`, `#btn-next`, `#btn-back`).
- Audit defensivo de listeners en `src/scripts/wizard.ts`: si se confirma uso de `addEventListener(_, _, { signal })`, refactor a manual cleanup con map de handler refs limpiados en `astro:before-swap` (compatibilidad iOS Safari < 15.4).
- Verify reforzado: smoke test manual obligatorio en browser real (BrowserStack o iPhone físico) antes de archive.

**Excluye** (explícito):
- Refactor del wizard a otro framework / componente React / radio inputs.
- Cambios fuera de `/cotizar` o de los archivos directamente afectados.
- Tests automatizados e2e (proyecto sin infra Playwright/Cypress).
- Soporte de iOS < 14 / Safari < 14.
- Rediseño visual del stepper (mantener layout horizontal, solo compactar).

## Approach recomendado

Corrección de cascada CSS + endurecimiento táctil + audit defensivo del patrón AbortSignal. Mantener delta supersedente sobre las specs heredadas del PR #19; no se reescribe el wizard.

| # | Bug | Fix de alto nivel | Esfuerzo |
|---|-----|-------------------|----------|
| B1.1 | Stepper overflow mobile | (a) ampliar breakpoint a `max-width: 640px`; (b) `.stepper__label { display: none }` dentro del media query; (c) `.stepper__step { padding: 0.5rem 0.25rem; gap: 0.25rem }`; (d) `.stepper__track { overflow-x: clip }` como guard rail | S |
| B2.1 | touch-action ausente | Agregar `touch-action: manipulation` + `-webkit-tap-highlight-color: transparent` a `.mode-tile`, `#btn-next`, `#btn-back`, `.stepper__step` | XS |
| B2.2 | AbortSignal Safari fallback | Audit `grep` de `{ signal:` en `wizard.ts`; si presente, refactor a manual cleanup (almacenar refs en `Map`, removeEventListener en `astro:before-swap`) | S |

## Trade-offs explícitos

- **B1.1 stepper layout mobile**:
  - **Opción A (recomendada)**: mantener layout horizontal compacto con solo bullets numerados en `≤640px`, ocultando `.stepper__label`. Coherente visualmente con desktop, sin overflow, sin nuevo widget.
  - Opción B: stepper colapsado vertical o acordeón en mobile. Cambio visual significativo, mayor esfuerzo, riesgo de regresión de estilo.
  - Opción C: `overflow-x: auto` con scroll horizontal. UX inferior (el usuario tendría que scrollear para ver pasos), aceptable solo como fallback.
  - **Recomendado: A**.

- **B1.1 breakpoint**:
  - **Opción A (recomendada)**: `max-width: 640px` — cubre iPhone SE (375px), iPhone 14/15 (393–430px) y casos de iPhone Pro Max landscape parcial.
  - Opción B: mantener `max-width: 480px` (PR #19). Insuficiente para layout compacto si en el futuro el contenido crece; cubre los iPhones actuales solo por el viewport, no con margen.
  - Opción C: `max-width: 768px`. Cubre tablets en portrait, pero podría afectar diseño tablet ya validado.
  - **Recomendado: A** (640px).

- **B2.1 touch-action**:
  - **Opción A (recomendada)**: `touch-action: manipulation` (soporte iOS 9.3+, elimina delay 300ms tap).
  - Opción B: además, migrar a Pointer Events API. Mayor complejidad, sin beneficio claro para este caso.
  - **Recomendado: A**.

- **B2.2 AbortSignal**:
  - **Opción A (recomendada)**: confirmar uso vía `grep` en `wizard.ts`; si presente, refactor a manual cleanup (Map<event, handler> + remove en `before-swap`). Compatible iOS 14+.
  - Opción B: polyfill global de AbortSignal. Riesgo de side-effects y aumenta bundle.
  - Opción C: no tocar (apostar a que iOS < 15.4 es marginal). Deja el bug en producción para una cohorte de usuarios.
  - **Recomendado: A** (confirmar primero, aplicar si presente).

## Riesgos

| ID | Riesgo | Probabilidad | Mitigación |
|----|--------|--------------|------------|
| R1 | Sin browser real en pipeline → verify estático insuficiente otra vez | Alta | Verify reforzado obligatorio: `astro preview` + inspección HTML producido + smoke manual en iPhone real (o BrowserStack/Simulator iOS 16+); marcar verify como FAIL si no se ejecuta browser real |
| R2 | Fix CSS rompe layout desktop (especificidad mal calculada) | Media | Confinar todos los cambios dentro de `@media (max-width: 640px)`; audit visual desktop tras fix |
| R3 | Causa real del Bug 2 distinta a las dos hipótesis (touch-action y AbortSignal) | Media | Smoke test en browser real es la única forma de confirmar; si persiste tras fixes, abrir nueva fase de exploración con DevTools remoto sobre Safari iOS |
| R4 | Refactor de AbortSignal en `wizard.ts` introduce leaks de listeners | Baja | Patrón conocido: `Map<string, EventListener>` + cleanup en `astro:before-swap`; smoke de navegación interna (cotizar → home → cotizar) |
| R5 | Ocultar `.stepper__label` en mobile reduce affordance de pasos | Baja | Bullets numerados (01, 02, 03, 04) preservan la información esencial; estado activo claramente diferenciado por color |

## Esfuerzo total

- **S** — 2–3 archivos modificados (`src/styles/pages/cotizar.css` + posible `src/scripts/wizard.ts`). ~1 día implementación + 0.5 día verify reforzado (incluye smoke en device real).

## Capabilities afectadas (specs a crear/deltar)

- `forms-email/wizard-responsive-mobile` → **delta supersedente** (breakpoint y reglas internas insuficientes en la versión PR #19).
- `forms-email/wizard-step-modality-selection` → **delta supersedente** (no contempla `touch-action` ni fallback AbortSignal).
- `interactive-component-transitions/wizard-step-modality-selection` → **delta supersedente** (espejo de la anterior).
- (Opcional) Nueva capability `ios-safari-compatibility` si se quiere consolidar reglas Safari-specific transversales — no requerido para este change, evaluar si surge un patrón.

## Acceptance global

- En iPhone Safari iOS 16+ (modelos 8 a 15 Pro Max), `/cotizar` muestra el stepper compacto sin overflow horizontal en portrait.
- Tap en cualquier `.mode-tile` selecciona la modalidad de forma inmediata (sin delay perceptible > 100ms).
- Tras seleccionar modalidad, el botón "Siguiente" se habilita y al tap avanza a paso 02.
- Navegación interna ida/vuelta (cotizar → home → cotizar) no deja listeners huérfanos ni pierde funcionalidad.
- Verify reforzado documentado: build PASS + smoke en device real PASS antes de archive.

## Decisiones pendientes (HITL)

1. **Breakpoint correcto**: ¿`≤640px` (recomendado, cubre iPhone Pro Max y margen) o mantener `≤480px` (PR #19, justo en el límite) o ampliar a `≤768px` (incluye tablets portrait)? → **Recomendado: ≤640px**.
2. **Verify tooling**: ¿añadir Playwright local solo para smoke en este fix, o usar `astro preview` + revisión manual del que implementa + validación del usuario en iPhone real? → **Recomendado: sin nueva dep, validación manual del usuario en iPhone real obligatoria como criterio de archive**.
3. **Refactor AbortSignal**: ¿aplicar siempre por defensa, o solo si `grep '{ signal:' src/scripts/wizard.ts` confirma uso? → **Recomendado: confirmar primero, aplicar si presente**.
4. **Alcance de `touch-action`**: ¿solo `.mode-tile` o también `.stepper__step`, `#btn-next`, `#btn-back`? → **Recomendado: todos los elementos tappables del flujo (4)**.

---

## Approval Record

**Aprobado por usuario el 2026-05-20** vía "A" tras presentación del HITL canónico de sdd-propose.

Decisiones D1-D4 resueltas con los defaults recomendados (sin override):
- **D1 (breakpoint)**: `max-width: 640px` para las reglas mobile del stepper.
- **D2 (verify tooling)**: sin nueva dependencia (no Playwright). Verify reforzado = build + `astro preview` + inspección del HTML producido + validación del usuario en iPhone real como criterio previo a archive. Importante: el archive NO debe darse por cerrado en runtime real sin la validación del usuario; pero el pipeline puede preparar el PR y dejar la validación final al usuario.
- **D3 (AbortSignal)**: confirmar uso con `grep '{ signal:' src/scripts/wizard.ts`; aplicar refactor a manual cleanup solo si presente.
- **D4 (touch-action)**: aplicar a los 4 elementos tappables del flujo (`.mode-tile`, `.stepper__step`, `#btn-next`, `#btn-back`).

Pipeline avanza a `sdd-spec`.
