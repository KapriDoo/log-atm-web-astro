---
type: capability-spec
title: "Selección de modalidad en el wizard de cotización"
capability: "interactive-component-transitions"
slug: "wizard-step-modality-selection"
domain: "fix"
delta_type: "behavior-correction"
supersedes: null
superseded_by: null
status: completed
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["b4ab389"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] El usuario puede hacer click en cualquier tile de modalidad de servicio y ver la selección reflejada visualmente"
  - "[x] Tras seleccionar una modalidad, el botón 'Siguiente' del wizard se habilita"
  - "[x] El wizard avanza al paso 2 al hacer click en 'Siguiente' con una modalidad seleccionada"
  - "[x] El comportamiento descrito funciona tanto en la carga inicial como después de navegar con View Transitions"
  - "[x] Si isAnimating estaba colgado de una navegación anterior, el wizard resetea el flag al inicializar"
related: ["[[interactive-component-transitions/spec]]"]
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/pages/cotizar.astro"
  - "log-atm-web-astro/src/scripts/gsap-stepper.ts"
verified_at: "2026-05-19"
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/19"
updated: "2026-05-20"
---

## Purpose

El wizard de cotización de `/cotizar` permite al usuario configurar un pedido de cotización paso a paso. En el paso inicial, el usuario debe seleccionar la modalidad de servicio (aéreo, marítimo, terrestre, etc.) para poder avanzar al siguiente paso. Esta selección debe funcionar correctamente tanto en la carga inicial de la página como después de navegar con View Transitions, sin quedar bloqueada por estado residual de animaciones previas.

## Requirements

- **SHALL**: los tiles de modalidad de servicio DEBEN responder a click en todo momento durante la sesión del usuario en `/cotizar`.
- **SHALL**: al seleccionar un tile de modalidad, el botón "Siguiente" DEBE habilitarse, permitiendo avanzar al paso 2.
- **MUST**: el wizard DEBE inicializar sus listeners en cada carga de página, incluyendo cargas posteriores a View Transitions.
- **MUST**: si el flag de animación en curso (`isAnimating`) quedó activo de una sesión de navegación anterior, el wizard DEBE restablecerlo a `false` al inicializar.
- **SHOULD**: la selección de una modalidad DEBE reflejarse visualmente (tile marcado como activo) inmediatamente al hacer click.

## Scenarios

### Scenario 1: Selección de modalidad en carga inicial

GIVEN que el usuario navega a `/cotizar` por primera vez en la sesión
WHEN la página carga y el usuario hace click en un tile de modalidad de servicio
THEN el tile seleccionado se marca como activo visualmente, y el botón "Siguiente" pasa de deshabilitado a habilitado

### Scenario 2: Avance al paso 2

GIVEN que el usuario ha seleccionado una modalidad en el paso 1
WHEN el usuario hace click en el botón "Siguiente"
THEN el wizard avanza al paso 2 con la transición de slide correspondiente, y el indicador de paso en el stepper se actualiza

### Scenario 3: Selección tras View Transitions

GIVEN que el usuario navegó desde `/cotizar` a otra página y luego regresó
WHEN la página vuelve a cargar y el usuario intenta seleccionar una modalidad
THEN los tiles responden al click igual que en la carga inicial — no hay bloqueo por estado de animación residual

### Scenario 4: Intento de avance sin selección

GIVEN que el usuario está en el paso 1 del wizard sin haber seleccionado ninguna modalidad
WHEN el usuario intenta hacer click en el botón "Siguiente"
THEN el botón permanece deshabilitado y el wizard no avanza al paso 2

## Acceptance Criteria

- [ ] Los tiles de modalidad de servicio responden a click en la carga inicial de `/cotizar`
- [ ] Después de navegar y regresar a `/cotizar`, los tiles siguen respondiendo a click
- [ ] Al seleccionar un tile, el botón "Siguiente" se habilita
- [ ] Con una modalidad seleccionada, el botón "Siguiente" lleva al usuario al paso 2
- [ ] Sin modalidad seleccionada, el botón "Siguiente" permanece deshabilitado
