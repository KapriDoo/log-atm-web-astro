---
type: capability-spec
title: "Centralizar estilos de Footer"
capability: "components"
slug: "footer-styles"
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
scope: ["src/components/ui/Footer.astro"]
verified_at: null
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Centralizar estilos de Footer

## Purpose

Reemplazar colores hardcodeados de WhatsApp en `Footer.astro` por tokens semánticos del sistema de diseño.

## Requirements

- El sistema SHALL reemplazar `#128C7E` (color WhatsApp) por token semántico
- El sistema SHALL reemplazar `#1da851` (hover WhatsApp) por token semántico
- El sistema SHALL preservar la identidad visual del botón WhatsApp

## Scenarios

### Scenario: Colores WhatsApp tokenizados

**GIVEN** que `Footer.astro` define colores WhatsApp inline
**WHEN** se reemplazan por tokens semánticos
**THEN** el botón mantiene sus colores exactos

## Acceptance Criteria

- [ ] No hay colores hex literales de WhatsApp en `Footer.astro`
- [ ] El botón WhatsApp se ve idéntico
- [ ] Los tokens usan nombres semánticos (ej: `--color-whatsapp`, `--color-whatsapp-hover`)

## Output Expected

- Archivo modificado: `src/components/ui/Footer.astro`
