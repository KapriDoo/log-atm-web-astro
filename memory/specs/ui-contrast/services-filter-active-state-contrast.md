---
type: capability-spec
title: "Filtro activo de servicios legible al pasar el cursor"
capability: "ui-contrast"
slug: "services-filter-active-state-contrast"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[fix-color-contrast-sitewide]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide"
feature_branch: "feature/fix-color-contrast-sitewide"
commits:
  - 7b357dc
mr: ""
acceptance_criteria:
  - "[x] El filtro activo cumple ≥ 4.5:1 con cursor, foco y presionado"
  - "[x] Los filtros inactivos conservan su respuesta al cursor"

related: []
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/pages/shared.css"
verified_at: "2026-10-06"

created: "2026-10-04"
updated: "2026-10-06"
tags: [capability-spec]
---

# Filtro activo de servicios legible al pasar el cursor

## Purpose

En el catálogo de servicios, el filtro seleccionado queda con texto casi negro sobre fondo azul marino al pasar el cursor (1.02:1), porque la regla de hover pisa el color del filtro activo. El filtro activo mantiene su texto claro en todos sus estados.

## Requirements

- El sistema SHALL mantener el texto claro del filtro activo cuando el cursor está encima, cuando tiene foco y cuando es presionado.
- El sistema MUST mantener un contraste mínimo de 4.5:1 entre el texto y el fondo del filtro activo en todos sus estados.
- El sistema SHALL mantener el comportamiento de los filtros inactivos al pasar el cursor.

## Scenarios

### Scenario: Visitante pasa el cursor sobre el filtro activo

**GIVEN** un visitante tiene seleccionado un filtro en el catálogo de servicios
**WHEN** mueve el cursor sobre ese filtro
**THEN** su texto sigue siendo claro y legible sobre el fondo oscuro

### Scenario: Visitante pasa el cursor sobre un filtro inactivo

**GIVEN** un visitante ve filtros no seleccionados
**WHEN** mueve el cursor sobre uno
**THEN** el filtro responde al cursor y su texto es legible

## Acceptance Criteria

- [x] El filtro activo cumple ≥ 4.5:1 con cursor, foco y presionado
- [x] Los filtros inactivos conservan su respuesta al cursor
