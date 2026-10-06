---
type: capability-spec
title: "Títulos legibles sobre fondos oscuros y fotografías"
capability: "ui-contrast"
slug: "dark-surface-heading-legibility"
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
  - a6d9510
  - 3bc419b
mr: ""
acceptance_criteria:
  - "[x] El nombre de cada industria del directorio es legible con contraste ≥ 4.5:1 sobre su fotografía"
  - "[x] El título del resumen de cotización cumple ≥ 4.5:1 sobre su panel oscuro"
  - "[x] Ningún título sobre fondo oscuro del sitio queda con color oscuro heredado"

related:
  - "[[internal-page-heroes/hero-title-contrast]]"
  - "[[ui-contrast/services-process-step-title-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/global.css"
  - "log-atm-web-astro/src/styles/pages/shared.css"
  - "log-atm-web-astro/src/styles/pages/cotizar.css"
verified_at: "2026-10-06"

created: "2026-10-04"
updated: "2026-10-06"
tags: [capability-spec]
---

# Títulos legibles sobre fondos oscuros y fotografías

## Purpose

Algunos títulos heredan el color oscuro de los encabezados y quedan casi invisibles sobre fondos oscuros: el nombre de cada industria en el directorio de industrias, sobre la fotografía, y el título del resumen de cotización, sobre un panel azul marino (contraste 1.02:1). Cada título sobre fondo oscuro o fotografía declara su propio color claro.

## Requirements

- El sistema SHALL mostrar con color claro todo título que se ubica sobre un fondo oscuro o una fotografía oscura.
- El sistema MUST mantener un contraste mínimo de 4.5:1 entre ese título y su fondo.
- El sistema SHALL mostrar el nombre de cada industria del directorio de industrias, incluida «Minería», legible sobre su fotografía.
- El sistema SHALL mostrar el título del resumen de cotización legible sobre su panel oscuro.

## Scenarios

### Scenario: Visitante lee el directorio de industrias

**GIVEN** un visitante abre la página de industrias
**WHEN** mira el nombre de cada industria sobre su fotografía
**THEN** lee todos los nombres, incluido «Minería»

### Scenario: Usuario lee el resumen de cotización

**GIVEN** un usuario avanza en el asistente de cotización
**WHEN** mira el título del resumen
**THEN** lo lee con claridad sobre el panel oscuro

## Acceptance Criteria

- [x] El nombre de cada industria del directorio es legible con contraste ≥ 4.5:1 sobre su fotografía
- [x] El título del resumen de cotización cumple ≥ 4.5:1 sobre su panel oscuro
- [x] Ningún título sobre fondo oscuro del sitio queda con color oscuro heredado

## Related

- [[internal-page-heroes/hero-title-contrast]]
- [[ui-contrast/services-process-step-title-contrast]]
