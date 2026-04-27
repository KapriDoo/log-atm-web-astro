---
type: capability-spec
title: "Evaluar y migrar colores de industrias"
capability: "data"
slug: "industries-colors"
domain: "refactoring"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: low
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
scope: ["src/lib/constants.ts"]
verified_at: "2026-04-27"
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Evaluar y migrar colores de industrias

## Purpose

Evaluar si los colores hardcodeados del array `INDUSTRIES` en `constants.ts` deben moverse a tokens del sistema o mantenerse en JS con referencias a CSS vars, y aplicar la decisión.

## Requirements

- El sistema SHALL evaluar si los colores de industrias son datos puros o tokens visuales
- El sistema SHALL decidir entre: (a) mantener en constants.ts con referencias a CSS vars, (b) crear tokens semánticos por industria, o (c) mantener como está
- El sistema SHALL documentar la decisión en un comentario

## Scenarios

### Scenario: Evaluación de colores de industria

**GIVEN** que `constants.ts` tiene colores hex en `INDUSTRIES`
**WHEN** se evalúa su naturaleza (dato vs token visual)
**THEN** se toma una decisión documentada sobre su ubicación

## Acceptance Criteria

- [ ] Los colores de industrias tienen una decisión documentada
- [ ] Si se migran, no hay regresiones visuales en la sección Industries
- [ ] Si se mantienen, hay un comentario explicando por qué

## Output Expected

- Archivo evaluado: `src/lib/constants.ts`
- Decisión documentada en el código o en spec
