---
type: capability-spec
title: "Crear tokens semánticos funcionales"
capability: "tokens"
slug: "create-functional-tokens"
domain: "refactoring"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: ["[[tokens/consolidate-tokens]]"]
change_ref: "[[centralizar-estilos]]"
worktree: ""
branch: "feature/centralizar-estilos"
commits: ["98824b0"]
mr: ""
acceptance_criteria: []
related: []
affects: []
adrs: []
scope: ["src/styles/tokens.css"]
verified_at: "2026-04-27"
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Crear tokens semánticos funcionales

## Purpose

Expandir el sistema de tokens con valores semánticos para opacidades, sombras, border-radius y espaciados que actualmente están hardcodeados en múltiples archivos, permitiendo su reutilización consistente.

## Requirements

- El sistema SHALL definir tokens para opacidades usadas en overlays (0.10, 0.14, 0.15, 0.18, 0.25, 0.92, etc.)
- El sistema SHALL definir tokens para sombras usadas en cards y secciones
- El sistema SHALL definir tokens para border-radius repetidos (24px, etc.)
- El sistema SHALL usar `color-mix()` o variables CSS para expresar rgba a partir de tokens base
- El sistema SHALL mantener la compatibilidad con Tailwind v4 `@theme`

## Scenarios

### Scenario: Token de opacidad reutilizable

**GIVEN** que existe un token `--opacity-overlay-light: 0.15`
**WHEN** un componente necesita `rgba(255,255,255,0.15)`
**THEN** puede usar `color-mix(in srgb, white var(--opacity-overlay-light), transparent)` o clase utilitaria

### Scenario: Token de sombra consistente

**GIVEN** que existe `--shadow-card: 0 4px 20px color-mix(in srgb, var(--color-brand) 14%, transparent)`
**WHEN** se aplica a una card de servicios
**THEN** el resultado visual es idéntico al valor hardcodeado anterior

## Acceptance Criteria

- [ ] Tokens de opacidad definidos para todos los valores literales del proyecto
- [ ] Tokens de sombra definidos para todos los box-shadow hardcodeados
- [ ] Tokens de border-radius definidos para valores repetidos
- [ ] Tokens documentados con comentarios indicando su uso previsto
- [ ] Tailwind v4 reconoce los tokens en `@theme`

## Output Expected

- Archivo `src/styles/tokens.css` expandido con tokens semánticos funcionales
