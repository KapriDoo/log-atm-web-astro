---
type: capability-spec
title: "Indicador de foco visible sobre superficies claras y oscuras"
capability: "ui-contrast"
slug: "focus-indicator-contrast"
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
  - 3fc9985
  - 4611441
mr: ""
acceptance_criteria:
  - "[x] El indicador de foco cumple ≥ 3:1 sobre superficies claras y sobre superficies oscuras"
  - "[x] Las opciones del selector de idioma muestran indicador de foco visible"
  - "[x] Los campos de formulario enfocados cumplen ≥ 3:1 contra su estado sin foco"
  - "[x] Ningún control interactivo elimina el contorno de foco sin indicador alternativo visible"

related:
  - "[[i18n-ui-selector/i18n-ui-selector-navbar]]"
  - "[[ui-contrast/cta-button-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/tokens.css"
  - "log-atm-web-astro/src/styles/global.css"
  - "log-atm-web-astro/src/components/ui/LanguageSelector.astro"
  - "log-atm-web-astro/src/styles/pages/shared.css"
  - "log-atm-web-astro/src/styles/sections/cta.css"
  - "log-atm-web-astro/src/pages/404.astro"
verified_at: "2026-10-06"

created: "2026-10-04"
updated: "2026-10-06"
tags: [capability-spec]
---

# Indicador de foco visible sobre superficies claras y oscuras

## Purpose

Quien navega con teclado necesita ver dónde está el foco. El anillo de foco actual mide 2.33:1 sobre fondos claros, bajo el mínimo de 3:1 de WCAG, y las opciones del selector de idioma lo eliminan sin ofrecer otro indicador. Cada tipo de superficie, clara u oscura, usa un anillo que la contraste, y ningún control interactivo queda sin indicador de foco visible.

## Requirements

- El sistema SHALL mostrar un indicador de foco visible en todo control interactivo cuando se enfoca con teclado.
- El sistema MUST mantener un contraste mínimo de 3:1 entre el indicador de foco y el fondo adyacente, tanto en superficies claras como en oscuras.
- El sistema SHALL usar un color de anillo distinto para superficies claras y para superficies oscuras, porque un único color no cumple el mínimo en ambas.
- El sistema MUST mostrar un indicador de foco visible en las opciones del selector de idioma.
- El sistema MUST mostrar, en los campos de los formularios, un indicador de foco con contraste mínimo de 3:1 contra su estado sin foco.
- El sistema SHALL conservar un indicador de foco alternativo visible en todo control que reemplace el contorno estándar.

## Scenarios

### Scenario: Usuario de teclado recorre una página de fondo claro

**GIVEN** un usuario navega con teclado sobre una sección de fondo claro
**WHEN** enfoca un enlace o botón
**THEN** ve un indicador de foco que se distingue con claridad del fondo

### Scenario: Usuario de teclado recorre una sección oscura

**GIVEN** un usuario navega con teclado sobre una sección de fondo oscuro
**WHEN** enfoca un enlace, botón o campo
**THEN** ve un indicador de foco que se distingue con claridad del fondo oscuro

### Scenario: Usuario elige idioma con teclado

**GIVEN** un usuario abre el selector de idioma con teclado
**WHEN** recorre las opciones con las flechas
**THEN** la opción enfocada muestra un indicador visible

### Scenario: Usuario completa un formulario con teclado

**GIVEN** un usuario recorre los campos del formulario de contacto
**WHEN** enfoca cada campo
**THEN** el campo enfocado se distingue claramente de los demás

## Acceptance Criteria

- [x] El indicador de foco cumple ≥ 3:1 sobre superficies claras y sobre superficies oscuras
- [x] Las opciones del selector de idioma muestran indicador de foco visible
- [x] Los campos de formulario enfocados cumplen ≥ 3:1 contra su estado sin foco
- [x] Ningún control interactivo elimina el contorno de foco sin indicador alternativo visible

## Related

- [[i18n-ui-selector/i18n-ui-selector-navbar]]
- [[ui-contrast/cta-button-contrast]]
