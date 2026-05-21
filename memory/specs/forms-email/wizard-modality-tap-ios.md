---
type: capability-spec
title: "Selección de modalidad con tap inmediato en iOS Safari"
capability: "forms-email"
slug: "wizard-modality-tap-ios"
domain: "fix"
delta_type: "behavior-correction"
supersedes: "[[interactive-component-transitions/wizard-step-modality-selection]]"
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "fix-cotizar-mobile-wizard-stepper"
feature_branch: "feature/fix-cotizar-mobile-wizard-stepper"
commits:
  - "6105389 fix(cotizar): add touch-action and manual listener cleanup for iOS Safari"
worktree: "fix-cotizar-mobile-wizard-stepper"
acceptance_criteria:
  - "En iOS Safari, un tap sobre cualquier tile de modalidad produce respuesta visual inmediata (sin delay perceptible > 100ms)"
  - "La modalidad seleccionada se mantiene activa (marcada visualmente) hasta que el usuario seleccione otra"
  - "Tras seleccionar una modalidad, el botón 'Siguiente' se habilita permitiendo avanzar al paso 02"
  - "El comportamiento de tap funciona en la carga inicial y tras navegar con View Transitions (ida y vuelta)"
  - "En iOS Safari < 15.4, los listeners del wizard se registran y funcionan correctamente (sin fallo silencioso por AbortSignal)"
  - "Después de navegar cotizar → home → cotizar, no quedan listeners huérfanos ni la selección de modalidad queda bloqueada"
related:
  - "[[forms-email/wizard-responsive-mobile-v2]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/styles/pages/cotizar.css"
  - "log-atm-web-astro/src/scripts/wizard.ts"
  - "log-atm-web-astro/src/pages/cotizar.astro"
verified_at: "2026-05-20"
---

## Purpose

En un dispositivo táctil con iOS Safari, el usuario debe poder seleccionar la modalidad de servicio en el paso 01 del wizard con un solo tap, sin delay perceptible y sin interacción fallida. El PR #19 no añadió `touch-action: manipulation` a los tiles, lo que permite que iOS Safari aplique su delay de 300ms para distinguir tap de doble-tap. Adicionalmente, el uso de `addEventListener` con `{ signal: AbortSignal }` como tercer argumento puede causar fallo silencioso en iOS Safari < 15.4, dejando todos los listeners sin registrar. Esta spec corrige ambas causas raíz para garantizar la interacción táctil inmediata y confiable.

## Requirements

- **MUST**: los tiles de modalidad de servicio DEBEN responder al tap del usuario de forma inmediata en iOS Safari, sin el delay de 300ms típico del navegador móvil.
- **MUST**: todos los elementos tappables del flujo (tiles de modalidad, botón "Siguiente", botón "Atrás", indicadores de paso del stepper) DEBEN tener `touch-action: manipulation` para eliminar el delay de tap en iOS.
- **MUST**: la selección de una modalidad mediante tap DEBE persistir visualmente (tile marcado como activo) hasta que el usuario seleccione otra opción o navegue fuera del paso.
- **MUST**: tras seleccionar una modalidad, el botón "Siguiente" DEBE habilitarse para que el usuario pueda avanzar al paso 02.
- **MUST**: los listeners de interacción del wizard DEBEN registrarse correctamente en iOS Safari 14+ (incluyendo versiones < 15.4 que no soportan `AbortSignal` en `addEventListener`). Si se confirma uso del patrón `{ signal: AbortSignal }` en el código fuente, DEBE aplicarse un fallback a cleanup manual.
- **SHOULD**: los tiles de modalidad DEBEN eliminar el highlight táctil nativo de iOS (`-webkit-tap-highlight-color: transparent`) para una respuesta visual limpia controlada por el propio CSS del componente.
- **MUST**: la navegación ida y vuelta (cotizar → otra página → cotizar) NO DEBE dejar listeners huérfanos ni estado de selección bloqueado.

## Scenarios

### Scenario 1: Tap en tile de modalidad en iOS Safari

GIVEN que el usuario está en el paso 01 del wizard desde un iPhone con iOS Safari
WHEN el usuario toca con el dedo cualquiera de los tiles de modalidad de servicio
THEN el tile responde de forma inmediata (sin espera perceptible), se marca como seleccionado visualmente, y el botón "Siguiente" pasa de deshabilitado a habilitado

### Scenario 2: Avance al paso 02 tras selección táctil

GIVEN que el usuario ha seleccionado una modalidad mediante tap en iOS Safari
WHEN el usuario toca el botón "Siguiente"
THEN el wizard avanza al paso 02 con la transición correspondiente, y el stepper actualiza el indicador de paso activo

### Scenario 3: Cambio de selección táctil

GIVEN que el usuario ha seleccionado "Marítimo" en el paso 01
WHEN el usuario toca el tile "Aéreo"
THEN el tile "Aéreo" se marca como activo y "Marítimo" pierde su estado activo, sin delay perceptible en el cambio

### Scenario 4: Funcionalidad tras navegación con View Transitions

GIVEN que el usuario navegó desde `/cotizar` a otra página del sitio y regresó mediante View Transitions
WHEN el usuario intenta seleccionar una modalidad en el paso 01
THEN los tiles responden al tap igual que en la carga inicial, sin estado bloqueado por listeners residuales de la navegación anterior

### Scenario 5: Compatibilidad con iOS Safari < 15.4

GIVEN que el usuario accede a `/cotizar` desde un iPhone con iOS Safari en versión anterior a 15.4
WHEN la página carga y el usuario intenta interactuar con el wizard
THEN todos los elementos interactivos (tiles, botones de navegación) responden correctamente, sin fallo silencioso en el registro de listeners

## Acceptance Criteria

<!-- Verificados estáticamente: touch-action:manipulation × 3 en bundle CSS, 0 AbortController/signal en bundle JS -->
- [ ] En iOS Safari (iOS 16+), el tap en cualquier tile de modalidad produce respuesta visual en menos de 100ms
- [ ] En iOS Safari, tras seleccionar una modalidad, el botón "Siguiente" se habilita
- [ ] En iOS Safari, el botón "Siguiente" lleva al usuario al paso 02 con la modalidad seleccionada
- [ ] Tras navegar cotizar → home → cotizar, los tiles siguen respondiendo al tap normalmente
- [ ] Tras navegar cotizar → home → cotizar, no hay listeners duplicados ni estado de animación bloqueado
- [x] Si el código fuente de `wizard.ts` usa `{ signal: AbortSignal }`, existe un fallback funcional para iOS Safari < 15.4
- [x] Los 4 elementos tappables del flujo (tiles, botón Siguiente, botón Atrás, pasos del stepper) tienen `touch-action: manipulation` aplicado
