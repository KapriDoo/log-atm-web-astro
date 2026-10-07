---
type: capability-spec
title: "La compilación del sitio no depende de la verificación de tipos"
capability: "type-check"
slug: "type-check-build-independence"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[type-check-zero-errors]]"
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 9122439
mr: ""
acceptance_criteria:
  - "[x] El comando de compilación del sitio no ejecuta la verificación de tipos"
  - "[x] La verificación de tipos es un comando independiente de la compilación"
  - "[x] Una compilación del sitio con un error de tipos deliberado termina con éxito"

related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/package.json"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# La compilación del sitio no depende de la verificación de tipos

## Purpose

El despliegue a producción compila el sitio en un entorno alojado cuyo comando de build no está verificado. Encadenar la verificación de tipos a la compilación podría detener un despliegue por un error de tipado que no afecta el comportamiento del sitio. La compilación y la verificación de tipos son operaciones separadas que cada persona ejecuta cuando corresponde.

## Requirements

- El sistema MUST mantener la compilación del sitio independiente de la verificación de tipos.
- El sistema SHALL ofrecer la verificación de tipos como un comando propio, separado de la compilación.
- El sistema MUST NOT detener una compilación por errores de tipos.

## Scenarios

### Scenario: Compilación con un error de tipos

**GIVEN** un cambio con un error de tipos que no afecta la ejecución del sitio
**WHEN** se compila el sitio para desplegarlo
**THEN** la compilación termina con éxito

### Scenario: Verificación separada

**GIVEN** una persona que quiere comprobar los tipos de su cambio
**WHEN** busca cómo hacerlo
**THEN** dispone de un comando propio que no compila el sitio

## Acceptance Criteria

- [x] El comando de compilación del sitio no ejecuta la verificación de tipos
- [x] La verificación de tipos es un comando independiente de la compilación
- [x] Una compilación del sitio con un error de tipos deliberado termina con éxito

## Related

- [[type-check-zero-errors]] — comando de verificación de tipos
