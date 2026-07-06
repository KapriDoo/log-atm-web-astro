---
type: capability-spec
title: "Ruta frecuente Manzanillo → Valparaíso en Home"
capability: "content-home"
slug: "home-frequent-routes"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["9f8e34c"]
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/28"
acceptance_criteria:
  - "[x] La sección de rutas frecuentes de Home muestra 'Manzanillo → Valparaíso' en lugar de 'Hong Kong → Iquique'"
related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/lib/constants.ts"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Ruta frecuente Manzanillo → Valparaíso en Home

## Purpose

La sección "Rutas frecuentes" de la página de inicio muestra una ruta que ya no representa el tráfico real de la empresa. Esta spec reemplaza esa ruta por la ruta vigente.

## Requirements

- El sistema SHALL mostrar en la sección de rutas frecuentes de Home la ruta "Manzanillo → Valparaíso".
- El sistema SHALL no mostrar la ruta "Hong Kong → Iquique".
- El sistema SHALL mantener el resto de las rutas frecuentes sin cambios.

## Scenarios

### Scenario: Visitante revisa las rutas frecuentes en Home

**GIVEN** un visitante navega a la página de inicio
**WHEN** llega a la sección de rutas frecuentes
**THEN** ve "Manzanillo → Valparaíso" entre las rutas listadas y no ve "Hong Kong → Iquique"

## Acceptance Criteria

- [x] La ruta "Manzanillo → Valparaíso" aparece en la sección de rutas frecuentes de Home
- [x] La ruta "Hong Kong → Iquique" no aparece en ningún lugar del sitio
