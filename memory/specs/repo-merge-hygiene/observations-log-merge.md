---
type: capability-spec
title: "El registro de observaciones se fusiona sin conflictos"
capability: "repo-merge-hygiene"
slug: "observations-log-merge"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - a89d8c7
mr: ""
acceptance_criteria:
  - "[x] Dos ramas que agregan entradas distintas al final del registro de observaciones se fusionan sin conflicto y conservan las entradas de ambas"
  - "[x] La regla de fusión sin conflicto aplica únicamente al registro de observaciones y a ningún otro archivo del vault"
  - "[x] La regla vive en el repositorio y no exige configuración local en cada equipo"

related:
  - "[[dead-code-cleanup/observations-debt-log-sync]]"
affects: []
adrs: []
scope:
  - ".gitattributes"
  - "memory/observations.md"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# El registro de observaciones se fusiona sin conflictos

## Purpose

Cada cambio en curso agrega entradas al final del registro de observaciones. Cuando varias ramas convergen, el contenido añadido por cada una choca en el mismo punto final del archivo y genera conflictos de fusión que no aportan información. Como el registro solo crece por agregación, conservar las entradas de ambas ramas resuelve el caso. Los demás archivos del vault no son registros de agregación y siguen señalando los conflictos reales.

## Requirements

- El sistema MUST fusionar sin conflicto las entradas que dos ramas agregan al final del registro de observaciones, conservando las de ambas.
- El sistema MUST limitar esa regla de fusión al registro de observaciones.
- El sistema MUST mantener la regla dentro del repositorio, sin requerir configuración por equipo.
- El sistema SHOULD conservar la detección de conflictos en las especificaciones, los ADR, los archivos de cambio y el perfil, que no son registros de agregación.

## Scenarios

### Scenario: Dos cambios agregan observaciones en paralelo

**GIVEN** dos ramas que agregan entradas distintas al final del registro de observaciones
**WHEN** se fusionan las ramas
**THEN** la fusión termina sin conflicto y el registro contiene las entradas de ambas ramas

### Scenario: Conflicto en una especificación

**GIVEN** dos ramas que modifican la misma línea de una especificación
**WHEN** se fusionan las ramas
**THEN** la fusión señala el conflicto para que una persona lo resuelva

### Scenario: Equipo recién clonado

**GIVEN** una persona que clona el repositorio sin ninguna configuración adicional
**WHEN** fusiona dos ramas que agregan observaciones
**THEN** la fusión termina sin conflicto

## Acceptance Criteria

- [x] Dos ramas que agregan entradas distintas al final del registro de observaciones se fusionan sin conflicto y conservan las entradas de ambas
- [x] La regla de fusión sin conflicto aplica únicamente al registro de observaciones y a ningún otro archivo del vault
- [x] La regla vive en el repositorio y no exige configuración local en cada equipo

## Related

- [[dead-code-cleanup/observations-debt-log-sync]] — otro cambio sobre el mismo registro
