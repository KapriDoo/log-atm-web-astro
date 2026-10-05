---
type: capability-spec
title: "Código decorativo de la página 404 con contraste de texto grande"
capability: "ui-contrast"
slug: "error-page-code-contrast"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[fix-color-contrast-sitewide]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "[ ] El código de la página 404 cumple ≥ 3:1 en los tres idiomas"
  - "[ ] El tamaño calculado del código es ≥ 24 px en todos los tamaños de pantalla"
  - "[ ] El código sigue siendo decorativo para lectores de pantalla"

related:
  - "[[ui-contrast/cta-button-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/pages/404.astro"
verified_at: null

created: "2026-10-04"
updated: "2026-10-04"
tags: [capability-spec]
---

# Código decorativo de la página 404 con contraste de texto grande

## Purpose

La página de error muestra un código de gran tamaño en un azul muy claro, con 1.62:1 sobre el fondo. Es un elemento decorativo, pero las herramientas de auditoría lo miden como texto. Con un azul de marca más intenso cumple el mínimo de 3:1 que WCAG exige al texto grande.

## Requirements

- El sistema SHALL mostrar el código de la página de error con un azul de marca más intenso que el actual.
- El sistema MUST mantener un contraste mínimo de 3:1 entre el código y el fondo de la página.
- El sistema MUST mostrar el código con un tamaño que califique como texto grande según WCAG (al menos 24 px, o 18.66 px en negrita) en todos los tamaños de pantalla.
- El sistema SHALL mantener el código como elemento decorativo, sin anunciarlo a lectores de pantalla.

## Scenarios

### Scenario: Visitante en escritorio llega a la página de error

**GIVEN** un visitante abre una dirección inexistente en una pantalla de escritorio
**WHEN** ve el código grande
**THEN** lo distingue del fondo con un contraste igual o superior a 3:1

### Scenario: Visitante en móvil llega a la página de error

**GIVEN** un visitante abre una dirección inexistente en un teléfono
**WHEN** ve el código grande
**THEN** el código mantiene tamaño de texto grande y contraste igual o superior a 3:1

## Acceptance Criteria

- [ ] El código de la página 404 cumple ≥ 3:1 en los tres idiomas
- [ ] El tamaño calculado del código es ≥ 24 px en todos los tamaños de pantalla
- [ ] El código sigue siendo decorativo para lectores de pantalla

## Related

- [[ui-contrast/cta-button-contrast]]
