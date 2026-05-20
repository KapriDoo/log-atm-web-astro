---
type: capability-spec
title: "Ritmo vertical entre secciones en páginas internas"
capability: "sections"
slug: "internal-pages-vertical-rhythm"
domain: "fix"
delta_type: "additive"
supersedes: null
superseded_by: null
status: completed
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["2b35b92"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] Las secciones con clase .section en /industrias, /nosotros, /contacto y /cotizar muestran padding vertical equivalente al de /index"
  - "[x] No existe colapso visual entre secciones adyacentes en ninguna página interna"
  - "[x] El spacing en /index no regresa ni se duplica tras el cambio"
  - "[x] La regla .section { padding-block } está disponible para todas las páginas internas sin necesidad de importar sections/services.css"
related: ["[[sections/services-styles]]", "[[tokens/consolidate-tokens]]"]
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/styles/pages/shared.css"
  - "log-atm-web-astro/src/styles/sections/services.css"
  - "log-atm-web-astro/src/pages/industrias.astro"
  - "log-atm-web-astro/src/pages/nosotros.astro"
  - "log-atm-web-astro/src/pages/contacto.astro"
verified_at: "2026-05-19"
mr: ""
updated: "2026-05-20"
---

## Purpose

Las páginas internas del sitio (`/industrias`, `/nosotros`, `/contacto`, `/cotizar`) deben presentar el mismo ritmo visual entre secciones que la página de inicio (`/index`). Actualmente, las secciones `.section` en las páginas internas no tienen separación vertical porque la regla de espaciado solo existe en un archivo de estilos que únicamente importa la página de inicio.

## Requirements

- **SHALL**: la regla de espaciado vertical de `.section` DEBE estar disponible en el contexto de estilos compartido que usan todas las páginas internas.
- **MUST**: las secciones con clase `.section` en `/industrias`, `/nosotros`, `/contacto` y `/cotizar` DEBEN mostrar padding vertical consistente con las secciones equivalentes de `/index`.
- **MUST**: el token `--section-pad` DEBE ser el valor utilizado para el espaciado, sin hardcodear valores.
- **SHOULD**: la solución NO DEBE generar doble definición de la regla en páginas que ya la reciben correctamente (como `/index`).

## Scenarios

### Scenario 1: Usuario accede a /industrias

GIVEN que el usuario navega a la página `/industrias`
WHEN la página termina de cargar
THEN las secciones de la página se ven con espaciado vertical visible entre ellas, separadas por el espacio equivalente al de las secciones de `/index`

### Scenario 2: Usuario accede a /nosotros

GIVEN que el usuario navega a la página `/nosotros`
WHEN la página termina de cargar
THEN las secciones de manifiesto, timeline, valores y cómo trabajamos muestran separación visual entre sí, sin aparecer pegadas unas a otras

### Scenario 3: Usuario accede a /contacto

GIVEN que el usuario navega a la página `/contacto`
WHEN la página termina de cargar
THEN la sección del formulario de contacto tiene separación visible respecto al hero de la página

### Scenario 4: La página /index no se ve afectada

GIVEN que el usuario navega a la página de inicio `/index`
WHEN la página termina de cargar
THEN el espaciado entre secciones en `/index` es idéntico al que tenía antes del cambio — ni duplicado ni eliminado

## Acceptance Criteria

- [ ] En `/industrias`, `/nosotros`, `/contacto` y `/cotizar`, las secciones `.section` muestran padding-block visible (paridad visual con `/index`)
- [ ] En `/index`, el spacing de secciones permanece sin cambio visible
- [ ] El valor del spacing usa el token de diseño, no un valor literal
- [ ] La regla no genera conflictos de especificidad con modificadores `.section--surface` ni `.section--alt`
