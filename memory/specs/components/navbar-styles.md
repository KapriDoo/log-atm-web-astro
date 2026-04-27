---
type: capability-spec
title: "Centralizar estilos de Navbar"
capability: "components"
slug: "navbar-styles"
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
scope: ["src/components/ui/Navbar.astro"]
verified_at: null
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Centralizar estilos de Navbar

## Purpose

Reemplazar valores hardcodeados de rgba, px fijos, y dimensiones en los estilos inline de `Navbar.astro` por tokens del sistema de diseño.

## Requirements

- El sistema SHALL reemplazar `rgba(255,255,255,0.92)` por tokens de opacidad/color
- El sistema SHALL reemplazar `rgba(74,123,181,0.10)` por tokens
- El sistema SHALL reemplazar tamaños fijos en px por tokens de espaciado cuando existan
- El sistema SHALL preservar el comportamiento responsive y visual

## Scenarios

### Scenario: Fondo tokenizado

**GIVEN** que el navbar usa fondos con rgba literales
**WHEN** se reemplazan por tokens
**THEN** el fondo se ve idéntico en scroll y estados

### Scenario: Dimensiones tokenizadas

**GIVEN** que el navbar tiene tamaños fijos en px
**WHEN** se reemplazan por tokens de espaciado
**THEN** el layout se mantiene consistente

## Acceptance Criteria

- [ ] No hay rgba literales en `Navbar.astro`
- [ ] No hay px fijos innecesarios en `Navbar.astro`
- [ ] El navbar se ve y comporta idéntico

## Output Expected

- Archivo modificado: `src/components/ui/Navbar.astro`
