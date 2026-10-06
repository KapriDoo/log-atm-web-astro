---
type: capability-spec
title: "Enlaces de navegación legibles al pasar el cursor y en página activa"
capability: "ui-contrast"
slug: "nav-link-state-contrast"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[fix-color-contrast-sitewide]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide"
feature_branch: "feature/fix-color-contrast-sitewide"
commits:
  - 7a9e438
mr: ""
acceptance_criteria:
  - "[x] Los enlaces del menú principal cumplen ≥ 4.5:1 con cursor, foco, presionado y como página actual"
  - "[x] Los enlaces del menú móvil cumplen ≥ 4.5:1 con cursor, foco y presionado"
  - "[x] El enlace de la página actual sigue distinguiéndose de los demás"

related:
  - "[[i18n-ui-selector/i18n-ui-selector-navbar]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/components/ui/Navbar.astro"
verified_at: "2026-10-06"

created: "2026-10-04"
updated: "2026-10-06"
tags: [capability-spec]
---

# Enlaces de navegación legibles al pasar el cursor y en página activa

## Purpose

Los enlaces del menú principal cambian a azul de marca al pasar el cursor, recibir foco o marcar la página actual, y quedan en 3.75:1 sobre el fondo del menú. En el menú móvil el contraste al pasar el cursor es 3.95:1. Un azul de marca más profundo en estos estados los deja sobre el mínimo, con el mismo criterio ya aplicado al selector de idioma.

## Requirements

- El sistema SHALL mostrar los enlaces del menú principal con un azul de marca profundo cuando el cursor está encima, cuando tienen foco y cuando corresponden a la página actual.
- El sistema SHALL mostrar los enlaces del menú móvil con el mismo azul profundo cuando el cursor está encima o tienen foco.
- El sistema MUST mantener un contraste mínimo de 4.5:1 entre el texto del enlace y el fondo en todos esos estados.
- El sistema SHALL distinguir el enlace de la página actual de los demás sin depender solo del contraste del color.

## Scenarios

### Scenario: Visitante identifica la página actual

**GIVEN** un visitante está en una página interna
**WHEN** mira el menú principal
**THEN** el enlace de la página actual se lee con claridad y se distingue de los demás

### Scenario: Visitante pasa el cursor sobre un enlace del menú

**GIVEN** un visitante ve el menú principal
**WHEN** mueve el cursor sobre un enlace
**THEN** el texto cambia de color y se lee con un contraste igual o superior a 4.5:1

### Scenario: Visitante usa el menú móvil

**GIVEN** un visitante abre el menú móvil
**WHEN** pasa el dedo o el cursor sobre un enlace
**THEN** el texto del enlace se lee con un contraste igual o superior a 4.5:1

## Acceptance Criteria

- [x] Los enlaces del menú principal cumplen ≥ 4.5:1 con cursor, foco, presionado y como página actual
- [x] Los enlaces del menú móvil cumplen ≥ 4.5:1 con cursor, foco y presionado
- [x] El enlace de la página actual sigue distinguiéndose de los demás

## Related

- [[i18n-ui-selector/i18n-ui-selector-navbar]]
