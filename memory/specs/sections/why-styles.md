---
type: capability-spec
title: "Centralizar estilos de Why section"
capability: "sections"
slug: "why-styles"
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
scope: ["src/styles/sections/why.css", "src/components/sections/WhySection.astro"]
verified_at: null
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Centralizar estilos de Why section

## Purpose

Reemplazar valores rgba hardcodeados para sombras, border-radius fijos, y colores SVG en `why.css` y `WhySection.astro` por tokens del sistema de diseño.

## Requirements

- El sistema SHALL reemplazar `rgba(74,123,181,0.18)` y `rgba(0,0,0,0.10)` en sombras por tokens
- El sistema SHALL reemplazar `border-radius: 24px` por token de border-radius
- El sistema SHALL reemplazar colores SVG inline (`#aec7e5`, `#2b4e78`) en `WhySection.astro` por tokens
- El sistema SHALL preservar el efecto visual

## Scenarios

### Scenario: Sombras y radius tokenizados

**GIVEN** que `why.css` usa valores literales
**WHEN** se reemplazan por tokens
**THEN** los elementos se ven idénticos

### Scenario: Colores SVG tokenizados

**GIVEN** que `WhySection.astro` tiene rectángulos SVG con colores hardcodeados
**WHEN** se reemplazan por tokens de color
**THEN** los SVGs mantienen sus colores

## Acceptance Criteria

- [ ] No hay rgba literales en `why.css`
- [ ] No hay border-radius fijos en `why.css`
- [ ] No hay colores hex literales en `WhySection.astro`
- [ ] La sección Why se ve idéntica

## Output Expected

- Archivos modificados: `src/styles/sections/why.css`, `src/components/sections/WhySection.astro`
