---
type: capability-spec
title: "Interacción del selector de industrias tras View Transitions"
capability: "interactive-component-transitions"
slug: "industries-selector-interaction"
domain: "fix"
delta_type: "behavior-correction"
supersedes: null
superseded_by: null
status: completed
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["1b2e996"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] El selector de industrias responde a click, hover y focus en cualquier ítem del directorio"
  - "[x] Al seleccionar un ítem, el spotlight cambia a la industria correspondiente con crossfade visible"
  - "[x] La interacción funciona tanto en la carga inicial de la página como después de navegar de vuelta con View Transitions"
  - "[x] El caption (nombre, tags, contador) se actualiza al cambiar de industria activa"
related: ["[[interactive-component-transitions/spec]]"]
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/pages/industrias.astro"
  - "log-atm-web-astro/src/scripts/gsap-ind-directory.ts"
verified_at: "2026-05-19"
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/19"
updated: "2026-05-20"
---

## Purpose

El directorio editorial de `/industrias` permite al usuario explorar las industrias del portafolio de Log ATM seleccionando un ítem del listado. Esta interacción debe funcionar correctamente en la carga inicial de la página y también después de que el usuario navega fuera y vuelve usando View Transitions del navegador, garantizando que el selector no quede bloqueado ni sin respuesta.

## Requirements

- **SHALL**: el directorio de industrias DEBE inicializar sus listeners de interacción en cada carga de página, incluyendo las cargas posteriores a View Transitions.
- **MUST**: al hacer click, hover o focus en cualquier ítem del directorio, el spotlight DEBE cambiar a la industria correspondiente.
- **MUST**: el callback que actualiza el caption del spotlight (`window.__indDirectoryOnRender`) DEBE estar disponible en el momento en que los listeners de interacción se registran.
- **SHOULD**: la autorotación DEBE detenerse cuando el usuario interactúa manualmente y reanudarse al dejar de interactuar.

## Scenarios

### Scenario 1: Selección de industria en carga inicial

GIVEN que el usuario navega directamente a `/industrias`
WHEN la página termina de cargar y el usuario hace click en cualquier ítem del directorio
THEN el spotlight muestra la industria seleccionada con una transición visible, y el caption (nombre, tags, contador) se actualiza para reflejar la industria activa

### Scenario 2: Selección de industria tras View Transitions

GIVEN que el usuario navegó desde `/industrias` a otra página y luego regresa a `/industrias` usando el botón Atrás o un enlace de navegación interna
WHEN la página termina de cargar y el usuario hace click en cualquier ítem del directorio
THEN el directorio responde correctamente a la interacción — el spotlight cambia y el caption se actualiza, igual que en la carga inicial

### Scenario 3: Interacción por teclado (focus)

GIVEN que el usuario navega el directorio con el teclado (Tab + Enter/Space)
WHEN el usuario pone foco en un ítem y lo activa
THEN el spotlight cambia a la industria correspondiente, igual que con el click con ratón

### Scenario 4: Pausa y reanudación de autorotación

GIVEN que la autorotación del directorio está activa
WHEN el usuario posiciona el cursor sobre el directorio
THEN la autorotación se pausa; al retirar el cursor, la autorotación se reanuda sin acumular timers adicionales

## Acceptance Criteria

- [ ] En carga directa de `/industrias`, todos los ítems del directorio responden a click cambiando el spotlight
- [ ] Después de navegar a otra página y regresar a `/industrias`, los ítems del directorio siguen respondiendo a click
- [ ] El caption (nombre de industria, tags, número de ítem) se actualiza correctamente al cambiar de ítem activo
- [ ] No se acumulan timers de autorotación tras interacciones sucesivas (verificable en DevTools)
