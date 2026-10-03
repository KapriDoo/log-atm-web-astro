---
type: capability-spec
title: "Registro de deuda técnica alineado con el estado real de los assets"
capability: "dead-code-cleanup"
slug: "observations-debt-log-sync"
domain: "debt"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[debt-assets-weight]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight"
feature_branch: "feature/debt-assets-weight"
commits: ["b38d775"]
mr: ""
acceptance_criteria:
  - "[ ] Los candidatos de deuda de assets de industrias y de logo duplicado figuran como resueltos e indican el commit que los resolvió"
  - "[ ] La ruta errónea del logo eliminado queda corregida en el registro"
  - "[ ] El candidato de videos duplicados figura como cerrado por este cambio"
  - "[ ] El contenido original de cada entrada se conserva y solo se agrega su estado"

related:
  - "[[dead-code-cleanup/asset-dead-code-removal]]"
  - "[[dead-code-cleanup/duplicate-video-removal]]"
affects: []
adrs: []
scope:
  - "memory/observations.md"
verified_at: null

created: "2026-10-03"
updated: "2026-10-03"
tags: [capability-spec]
---

# Registro de deuda técnica alineado con el estado real de los assets

## Purpose

El registro de observaciones del proyecto aún presenta como abiertos dos candidatos de deuda que la limpieza previa ya resolvió, contiene una ruta equivocada del logo eliminado y mantiene como posible el candidato de videos duplicados, ya confirmado. Quien lo consulte hoy obtiene una imagen desactualizada de la deuda pendiente. Esta spec define el registro tal como debe reflejar el estado real.

## Requirements

- El registro SHALL marcar como resueltos los candidatos de deuda de assets de industrias sin uso y de logo duplicado, indicando el commit que los resolvió.
- El registro SHALL corregir la ruta errónea que atribuye la eliminación del logo a una carpeta equivocada.
- El registro SHALL marcar como cerrado por este cambio el candidato de videos duplicados.
- El registro SHALL conservar el contenido original de cada entrada modificada y agregar el estado junto a ella, sin borrar el texto previo.
- Cada entrada a modificar SHALL ubicarse por su contenido y no por su número de línea.

## Scenarios

### Scenario: Una persona consulta una deuda ya resuelta

**GIVEN** un candidato de deuda que la limpieza previa resolvió
**WHEN** una persona del equipo lo lee en el registro
**THEN** ve junto al texto original que está resuelto y qué commit lo resolvió

### Scenario: La ruta del logo eliminado es correcta

**GIVEN** la entrada que menciona la eliminación del logo
**WHEN** una persona la lee
**THEN** la ruta que indica corresponde al archivo realmente eliminado

### Scenario: El candidato de videos queda cerrado

**GIVEN** el candidato de videos posiblemente duplicados, ya confirmado y resuelto
**WHEN** una persona lo consulta
**THEN** ve que está cerrado por este cambio

### Scenario: El texto histórico permanece

**GIVEN** una entrada del registro actualizada con su estado
**WHEN** se compara con su versión anterior
**THEN** el texto original sigue presente y la única diferencia es el estado agregado

## Acceptance Criteria

- [ ] Los candidatos de deuda de assets de industrias y de logo duplicado figuran como resueltos e indican el commit que los resolvió
- [ ] La ruta errónea del logo eliminado queda corregida en el registro
- [ ] El candidato de videos duplicados figura como cerrado por este cambio
- [ ] El contenido original de cada entrada se conserva y solo se agrega su estado

## Related

- [[dead-code-cleanup/asset-dead-code-removal]] — la limpieza que resolvió los candidatos de assets e industrias y de logo
- [[dead-code-cleanup/duplicate-video-removal]] — el cambio que cierra el candidato de videos
