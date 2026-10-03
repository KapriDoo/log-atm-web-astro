---
type: capability-spec
title: "Las tarjetas de servicios no enlazadas no amplían su imagen al pasar el cursor"
capability: "content-services"
slug: "services-static-card-no-hover-zoom"
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
commits: ["7859ca1"]
mr: ""
acceptance_criteria:
  - "[x] Al pasar el cursor sobre una tarjeta de servicio no enlazada, su imagen no se amplía"
  - "[x] Al pasar el cursor sobre una tarjeta de servicio enlazada del inicio, su imagen se amplía"

related:
  - "[[content-services/services-catalog-cta-and-detail-pages]]"
  - "[[sections/services-styles]]"
affects: []
adrs: []
scope:
  - "src/styles/sections/services.css"
verified_at: null

created: "2026-10-03"
updated: "2026-10-03"
tags: [capability-spec]
---

# Las tarjetas de servicios no enlazadas no amplían su imagen al pasar el cursor

## Purpose

En la página de servicios las tarjetas de carga aérea y marítima dejaron de ser enlaces, pero al pasar el cursor su imagen se sigue ampliando, lo que sugiere un clic que no existe. Esta spec limita ese efecto de ampliación a las tarjetas que sí llevan a otra página, de modo que el comportamiento visual no prometa una interacción inexistente.

## Requirements

- El sistema SHALL NOT ampliar la imagen de una tarjeta de servicio no enlazada al pasar el cursor sobre ella.
- El sistema SHALL ampliar la imagen de una tarjeta de servicio enlazada al pasar el cursor, tanto en el inicio como en la página de servicios.
- El sistema SHALL aplicar esta regla en el inicio y en la página de servicios.

## Scenarios

### Scenario: Cursor sobre una tarjeta no enlazada

**GIVEN** un visitante en la página de servicios frente a una tarjeta de carga aérea o marítima, que no es un enlace
**WHEN** pasa el cursor sobre la tarjeta
**THEN** la imagen permanece sin ampliarse

### Scenario: Cursor sobre una tarjeta enlazada del inicio

**GIVEN** un visitante en la página de inicio frente a una tarjeta de servicio que lleva a su detalle
**WHEN** pasa el cursor sobre la tarjeta
**THEN** la imagen se amplía levemente

## Acceptance Criteria

- [x] Al pasar el cursor sobre una tarjeta de servicio no enlazada, su imagen no se amplía
- [x] Al pasar el cursor sobre una tarjeta de servicio enlazada del inicio, su imagen se amplía

## Related

- [[content-services/services-catalog-cta-and-detail-pages]] — define qué tarjetas no son enlaces ni muestran affordance de enlace
- [[sections/services-styles]] — estilos de la sección de servicios
