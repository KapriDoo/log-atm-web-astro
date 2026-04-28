---
type: capability-spec
title: "Centralizar estilos de Industries section"
capability: "sections"
slug: "industries-styles"
domain: "refactoring"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on: ["[[tokens/create-functional-tokens]]"]
change_ref: "[[centralizar-estilos]]"
worktree: ""
branch: "feature/centralizar-estilos"
commits: ["98824b0"]
mr: ""
acceptance_criteria: []
related: []
affects: []
adrs: []
scope: ["src/styles/sections/industries.css"]
verified_at: "2026-04-27"
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Centralizar estilos de Industries section

## Purpose

Reemplazar el color fallback hardcodeado en `color-mix()` de `industries.css` por un token del sistema de diseño.

## Requirements

- El sistema SHALL reemplazar `#4A7BB5` fallback en `color-mix()` por token de color
- El sistema SHALL preservar el efecto visual de las tarjetas de industrias

## Scenarios

### Scenario: Fallback tokenizado

**GIVEN** que `industries.css` usa un color hex literal como fallback
**WHEN** se reemplaza por token de color
**THEN** las tarjetas de industrias se ven idénticas

## Acceptance Criteria

- [ ] No hay colores hex literales en `industries.css`
- [ ] La sección Industries se ve idéntica

## Output Expected

- Archivo modificado: `src/styles/sections/industries.css`
