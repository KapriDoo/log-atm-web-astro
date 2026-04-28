---
type: capability-spec
title: "Centralizar estilos de Hero section"
capability: "sections"
slug: "hero-styles"
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
scope: ["src/styles/sections/hero.css", "src/components/sections/HeroSection.astro"]
verified_at: "2026-04-27"
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Centralizar estilos de Hero section

## Purpose

Reemplazar todos los valores hardcodeados de colores, opacidades rgba, y dimensiones fijas en `hero.css` y `HeroSection.astro` por referencias a tokens del sistema de diseño.

## Requirements

- El sistema SHALL reemplazar `rgba(255,255,255,0.x)` en `hero.css` por tokens de opacidad
- El sistema SHALL reemplazar dimensiones fijas (`600px`, `400px`) por tokens de espaciado/tamaño cuando existan
- El sistema SHALL reemplazar colores inline de avatars (`#658fc3`, `#3b6497`, `#4A7BB5`) en `HeroSection.astro` por tokens de color
- El sistema SHALL preservar el efecto visual exacto (sin regresiones)

## Scenarios

### Scenario: Overlay con opacidad tokenizada

**GIVEN** que el hero tiene overlays con rgba literales
**WHEN** se reemplazan por tokens de opacidad
**THEN** el efecto visual del overlay es idéntico

### Scenario: Colores de avatar tokenizados

**GIVEN** que `HeroSection.astro` define colores inline para avatars
**WHEN** se reemplazan por tokens del sistema
**THEN** los avatars mantienen sus colores y el HTML es más mantenible

## Acceptance Criteria

- [ ] No hay valores rgba literales en `hero.css`
- [ ] No hay colores hex literales en estilos de `HeroSection.astro`
- [ ] Los valores hardcodeados usan tokens o clases utilitarias
- [ ] El hero se ve idéntico antes y después

## Output Expected

- Archivos modificados: `src/styles/sections/hero.css`, `src/components/sections/HeroSection.astro`
