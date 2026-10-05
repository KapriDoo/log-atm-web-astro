---
type: capability-spec
title: "Valores pendientes del resumen de cotización legibles"
capability: "ui-contrast"
slug: "quote-summary-empty-values-contrast"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[fix-color-contrast-sitewide]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "[ ] Los valores «Por definir» cumplen ≥ 4.5:1 sobre blanco"
  - "[ ] Un valor pendiente se distingue visualmente de un valor completado"

related:
  - "[[ui-contrast/dark-surface-heading-legibility]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/pages/cotizar.css"
verified_at: null

created: "2026-10-04"
updated: "2026-10-04"
tags: [capability-spec]
---

# Valores pendientes del resumen de cotización legibles

## Purpose

En el resumen de cotización, los datos que el usuario aún no define muestran «Por definir» en un gris muy claro, con un contraste de 2.41:1 sobre blanco. El texto en un gris más oscuro sigue pareciendo un valor pendiente y se lee con claridad.

## Requirements

- El sistema SHALL mostrar los valores pendientes del resumen de cotización con un gris más oscuro que el actual.
- El sistema MUST mantener un contraste mínimo de 4.5:1 entre esos valores y el fondo blanco.
- El sistema SHOULD distinguir un valor pendiente de uno completado mediante un tono más suave que el de los datos ya ingresados.

## Scenarios

### Scenario: Usuario ve datos pendientes

**GIVEN** un usuario abre el asistente de cotización sin completar todos los datos
**WHEN** mira el resumen
**THEN** lee «Por definir» con claridad y lo reconoce como dato pendiente

## Acceptance Criteria

- [ ] Los valores «Por definir» cumplen ≥ 4.5:1 sobre blanco
- [ ] Un valor pendiente se distingue visualmente de un valor completado

## Related

- [[ui-contrast/dark-surface-heading-legibility]]
