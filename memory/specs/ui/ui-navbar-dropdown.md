---
type: spec
title: "Implementar dropdown de navegación en navbar"
capability: ui
slug: ui-navbar-dropdown
domain: feature
delta_type: add
supersedes: null
superseded_by: null
status: review
assigned_agent: null
priority: high
depends_on: []
change_ref: alinear-contenido-notion
commits: [c5d7002]
feature_branch: feature/alinear-contenido-notion
acceptance_criteria:
  - "[x] El navbar muestra dos dropdowns: Servicios e Industrias"
  - "[x] Cada dropdown lista todos los items de su categoría (11 servicios, 14 industrias)"
  - "[x] El dropdown se abre al hover/click y cierra al click outside o Escape"
  - "[x] El dropdown es accesible (ARIA expanded, roles, foco)"
  - "[x] En mobile (≤1023px) el drawer muestra las categorías agrupadas"
related: []
affects: [src/components/ui/Navbar.astro]
adrs: []
scope: [src/components/ui/Navbar.astro]
verified_at: null
---

## Purpose

Evitar la saturación visual del navbar al agrupar 11 servicios y 14 industrias en dropdowns desplegables, manteniendo la navegación usable y accesible.

## Requirements

- El navbar DEBE mostrar dos triggers de dropdown: "Servicios" e "Industrias".
- Cada dropdown DEBE listar todos los items de su array correspondiente.
- El dropdown DEBE abrirse al click (desktop) y cerrarse al:
  - Click fuera del dropdown
  - Presionar Escape
  - Click en un item
- El dropdown DEBE ser accesible:
  - `aria-expanded` en el trigger
  - `role="menu"` en la lista
  - Manejo de foco con teclado (Tab, Shift+Tab, Enter)
- En mobile (drawer), los items DEBEN agruparse bajo secciones "Servicios" e "Industrias".

## Scenarios

### S1 — Abrir dropdown Servicios
GIVEN un usuario en desktop ve el navbar
WHEN hace click en "Servicios"
THEN se despliega un panel con los 11 servicios listados

### S2 — Cerrar dropdown al click outside
GIVEN el dropdown de Industrias está abierto
WHEN el usuario hace click en cualquier otra parte de la página
THEN el dropdown se cierra

### S3 — Navegación por teclado
GIVEN el dropdown está abierto
WHANDO el usuario presiona Escape
THEN el dropdown se cierra y el foco retorna al trigger

### S4 — Drawer mobile
GIVEN un usuario en un viewport ≤1023px abre el drawer
WHEN expande la sección de navegación
THEN ve "Servicios" e "Industrias" como grupos colapsables o lista agrupada

## Acceptance Criteria

- [ ] Navbar tiene triggers "Servicios" e "Industrias" visibles en desktop
- [ ] Dropdown de servicios muestra 11 items
- [ ] Dropdown de industrias muestra 14 items
- [ ] Click outside cierra el dropdown activo
- [ ] Escape cierra el dropdown y devuelve foco
- [ ] aria-expanded refleja el estado correcto
- [ ] Drawer mobile agrupa servicios e industrias sin saturar
