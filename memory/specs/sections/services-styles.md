---
type: capability-spec
title: "Centralizar estilos de Services section"
capability: "sections"
slug: "services-styles"
domain: "refactoring"
delta_type: null
supersedes: null
superseded_by: null
status: review
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
scope: ["src/styles/sections/services.css"]
verified_at: null
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Centralizar estilos de Services section

## Purpose

Reemplazar los valores rgba hardcodeados para sombras y overlays en `services.css` por tokens del sistema de diseño.

## Requirements

- El sistema SHALL reemplazar `rgba(74,123,181,0.14)` en sombras por tokens
- El sistema SHALL reemplazar gradient overlays `rgba(74,123,181,0.92)` y `rgba(204,118,20,0.92)` por tokens de opacidad/color
- El sistema SHALL preservar el efecto visual de cards y overlays

## Scenarios

### Scenario: Sombras tokenizadas

**GIVEN** que las cards de servicios usan `box-shadow` con rgba literales
**WHEN** se reemplazan por tokens de sombra
**THEN** las cards mantienen la misma elevación y color de sombra

### Scenario: Overlays tokenizados

**GIVEN** que los overlays de servicios usan gradientes con rgba literales
**WHEN** se reemplazan por `color-mix()` con tokens
**THEN** los overlays mantienen la misma apariencia

## Acceptance Criteria

- [ ] No hay rgba literales en `services.css`
- [ ] Las sombras y overlays se ven idénticos
- [ ] Se usan tokens o clases utilitarias

## Output Expected

- Archivo modificado: `src/styles/sections/services.css`
