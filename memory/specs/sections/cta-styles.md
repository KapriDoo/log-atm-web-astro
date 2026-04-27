---
type: capability-spec
title: "Centralizar estilos de CTA section"
capability: "sections"
slug: "cta-styles"
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
scope: ["src/styles/sections/cta.css"]
verified_at: "2026-04-27"
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Centralizar estilos de CTA section

## Purpose

Reemplazar el valor rgba hardcodeado para sombras en `cta.css` por tokens del sistema de diseño.

## Requirements

- El sistema SHALL reemplazar `rgba(62,185,120,0.40)` en sombras por tokens
- El sistema SHALL preservar el efecto visual de la sección CTA

## Scenarios

### Scenario: Sombra tokenizada

**GIVEN** que la sección CTA usa `box-shadow` con rgba literal
**WHEN** se reemplaza por token de sombra
**THEN** la sombra se ve idéntica

## Acceptance Criteria

- [ ] No hay rgba literales en `cta.css`
- [ ] La sección CTA se ve idéntica

## Output Expected

- Archivo modificado: `src/styles/sections/cta.css`
