---
type: capability-spec
title: "Favicon con marca Log ATM"
capability: "branding"
slug: "favicon-logo-atm"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: completed
feature_branch: "feature/fix-ux-multipage-bugs"
commits: ["83dbedb"]
worktree: "fix-ux-multipage-bugs"
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "fix-ux-multipage-bugs"
acceptance_criteria:
  - "[x] La pestaña del navegador muestra el logo de Log ATM en todas las rutas del sitio"
  - "[x] No aparece el triángulo/letra A del favicon por defecto de Astro en ningún navegador"
  - "[x] El favicon está disponible en formato SVG y en formato ICO 32x32 para compatibilidad con navegadores antiguos"
  - "[x] El logo como favicon es reconocible como la identidad de Log ATM"
related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/public/favicon.svg"
  - "log-atm-web-astro/public/favicon.ico"
  - "log-atm-web-astro/public/logo.svg"
  - "log-atm-web-astro/src/layouts/BaseLayout.astro"
verified_at: "2026-05-19"
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/19"
updated: "2026-05-20"
---

## Purpose

El sitio web de Log ATM debe mostrar la identidad visual de la marca en la pestaña del navegador y en los marcadores (bookmarks) del usuario. Actualmente, el favicon es el triángulo azul por defecto del framework Astro, lo que comunica falta de cuidado en la identidad de marca y puede confundir a usuarios que tengan el sitio marcado como favorito. El favicon debe ser reemplazado por el logo de Log ATM.

## Requirements

- **SHALL**: el sitio DEBE exponer un favicon que muestre el logo de Log ATM en la pestaña del navegador para todas las rutas del sitio.
- **SHALL**: el favicon DEBE estar disponible en formato `.svg` (para navegadores modernos) y `.ico` de 32x32 píxeles (para compatibilidad con navegadores que no soportan SVG favicon).
- **MUST**: el `favicon.svg` generado DEBE derivarse del logo oficial de la marca disponible en `public/logo.svg`.
- **MUST**: el `favicon.ico` DEBE ser generado a partir del mismo logo de marca, con dimensiones 32x32 píxeles.
- **SHOULD**: el favicon SVG DEBE simplificarse al símbolo principal del logo si el logotipo completo (texto + símbolo) no es legible a tamaño pequeño.

## Scenarios

### Scenario 1: Usuario navega al sitio en Chrome

GIVEN que un usuario abre el sitio de Log ATM en su navegador
WHEN la página carga cualquier ruta del sitio
THEN la pestaña del navegador muestra el logo de Log ATM (no el triángulo de Astro), tanto en Chrome como en Firefox y Safari

### Scenario 2: Usuario guarda el sitio como marcador

GIVEN que el usuario agrega el sitio de Log ATM a sus marcadores o favoritos
WHEN el navegador captura el favicon para el marcador
THEN el marcador muestra el logo de Log ATM, haciendo la marca reconocible en la lista de favoritos del usuario

### Scenario 3: Navegador antiguo sin soporte de SVG favicon

GIVEN que el usuario utiliza un navegador que solo soporta `.ico` como favicon
WHEN la página carga
THEN el navegador muestra el favicon en formato `.ico` con el logo de Log ATM a 32x32 píxeles

## Acceptance Criteria

- [ ] En Chrome, Firefox y Safari, la pestaña muestra el logo de Log ATM al cargar cualquier ruta del sitio
- [ ] El triángulo/letra A del favicon de Astro ya no aparece en ningún navegador
- [ ] `public/favicon.svg` contiene el logo de marca de Log ATM (no el default de Astro)
- [ ] `public/favicon.ico` existe y tiene dimensiones 32x32 píxeles con el logo de Log ATM
- [ ] El favicon es reconocible como la identidad de Log ATM en el tamaño pequeño de la pestaña
