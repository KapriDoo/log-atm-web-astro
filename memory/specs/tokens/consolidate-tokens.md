---
type: capability-spec
title: "Consolidar tokens de diseño en tokens.css"
capability: "tokens"
slug: "consolidate-tokens"
domain: "refactoring"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[centralizar-estilos]]"
worktree: ""
branch: "feature/centralizar-estilos"
commits: ["98824b0"]
mr: ""
acceptance_criteria: []
related: []
affects: []
adrs: []
scope: ["src/styles/tokens.css", "src/styles/global.css"]
verified_at: null
created: "2026-04-26"
updated: "2026-04-26"
tags: [capability-spec]
---

# Consolidar tokens de diseño en tokens.css

## Purpose

Eliminar la duplicación de tokens entre `tokens.css` y `global.css` estableciendo `tokens.css` como la única fuente de verdad para el sistema de diseño, y simplificar `global.css` a un archivo de importación pura.

## Requirements

- El sistema SHALL mantener todos los tokens de diseño en `src/styles/tokens.css` únicamente
- El sistema SHALL eliminar la duplicación de definiciones `@theme` de `global.css`
- El sistema SHALL mantener `global.css` como importador de tokens más clases utilitarias globales
- El sistema SHALL preservar todos los valores visuales existentes (sin regresiones)

## Scenarios

### Scenario: Compilación exitosa tras consolidación

**GIVEN** que `global.css` tiene tokens duplicados
**WHEN** se eliminan los tokens duplicados y se mantiene solo `@import './tokens.css'`
**THEN** el build de Astro/Tailwind compila sin errores

### Scenario: Visual regression check

**GIVEN** que los tokens son la fuente de todos los estilos
**WHEN** se comparan las páginas antes y después
**THEN** no hay diferencias visuales en colores, espaciados, tipografía o sombras

## Acceptance Criteria

- [ ] `tokens.css` contiene la definición completa de `@theme` con todos los tokens
- [ ] `global.css` importa `tokens.css` sin redefinir tokens
- [ ] No hay duplicación de variables CSS en `:root` entre ambos archivos
- [ ] Build de desarrollo y producción funcionan correctamente
- [ ] Lighthouse score se mantiene ≥ 95

## Output Expected

- Archivo `src/styles/tokens.css` consolidado
- Archivo `src/styles/global.css` limpio (solo imports + utilidades)
