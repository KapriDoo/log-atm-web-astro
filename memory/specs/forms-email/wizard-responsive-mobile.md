---
type: capability-spec
title: "Wizard de cotización accesible en dispositivos móviles"
capability: "forms-email"
slug: "wizard-responsive-mobile"
domain: "fix"
delta_type: "additive"
supersedes: null
superseded_by: null
status: completed
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["bac1e9b"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] En pantallas de 480px o menos, todos los pasos del wizard son visibles sin scroll horizontal"
  - "[x] El indicador de pasos (stepper) se muestra compacto pero legible en pantallas de 375px"
  - "[x] Los controles del wizard (botones Siguiente y Atrás, tiles de selección) son tocables con el dedo sin superposición"
  - "[x] El contenido de cada paso no se corta ni desborda el viewport en móvil"
related: ["[[interactive-component-transitions/spec]]", "[[forms-email/spec]]"]
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/styles/pages/cotizar.css"
  - "log-atm-web-astro/src/pages/cotizar.astro"
verified_at: "2026-05-19"
mr: ""
updated: "2026-05-20"
---

## Purpose

El wizard de cotización de Log ATM debe ser completamente funcional en dispositivos móviles, que representan una parte significativa de los usuarios potenciales. Actualmente, el indicador de pasos y los controles del wizard presentan desbordamiento y superposición en pantallas pequeñas, impidiendo que los usuarios móviles completen el proceso de cotización.

## Requirements

- **SHALL**: el wizard de cotización DEBE ser completamente utilizable en pantallas con ancho de 375px o más (tamaño de iPhone SE).
- **MUST**: el indicador de pasos del stepper DEBE mostrar los 4 pasos sin desbordamiento horizontal en pantallas de 375px.
- **MUST**: todos los controles interactivos (tiles de modalidad, campos de formulario, botones de navegación) DEBEN ser accesibles por toque con un área mínima de 44x44px.
- **MUST**: no DEBE existir scroll horizontal en ningún paso del wizard en pantallas de hasta 375px de ancho.
- **SHOULD**: en pantallas entre 375px y 480px, los elementos del wizard DEBEN adaptarse de forma fluida sin comprometer la legibilidad del contenido.

## Scenarios

### Scenario 1: Usuario accede al wizard en móvil

GIVEN que el usuario accede a `/cotizar` desde un dispositivo móvil con pantalla de 375px de ancho
WHEN la página carga y muestra el paso 1 del wizard
THEN todos los elementos del paso son visibles dentro del viewport — el stepper, los tiles de modalidad y el botón "Siguiente" — sin necesitar scroll horizontal

### Scenario 2: Usuario navega los pasos en móvil

GIVEN que el usuario está en el wizard en un móvil de 375px
WHEN el usuario avanza por los 4 pasos del wizard seleccionando las opciones correspondientes
THEN cada paso se muestra correctamente dentro del viewport, los campos de formulario son accesibles, y los botones de navegación son claramente tocables sin superponer otros elementos

### Scenario 3: Stepper indica progreso en pantalla pequeña

GIVEN que el usuario está en el paso 3 del wizard en un móvil
WHEN observa el indicador de pasos en la parte superior
THEN el stepper muestra el progreso (paso 3 activo) de forma legible, sin que los textos o bullets se recorten o desborden

## Acceptance Criteria

- [ ] En viewport de 375px, el stepper de 4 pasos es completamente visible sin scroll horizontal
- [ ] En viewport de 375px, los tiles de selección de modalidad no se superponen entre sí
- [ ] En viewport de 375px, los botones "Siguiente" y "Atrás" son tocables (altura mínima 44px)
- [ ] En viewport de 375px, los campos de texto en los pasos del wizard tienen tamaño suficiente para escribir (no hay overflow del contenedor)
- [ ] No hay scroll horizontal en ningún paso del wizard en pantallas de 375px o 480px
