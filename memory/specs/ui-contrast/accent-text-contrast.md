---
type: capability-spec
title: "Textos de acento verde legibles sobre fondos claros"
capability: "ui-contrast"
slug: "accent-text-contrast"
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
  - "[ ] Los rótulos de sección cumplen ≥ 4.5:1 en todas las páginas, incluido el fondo gris alterno"
  - "[ ] El número de paso, la etiqueta del formulario y el plazo de respuesta cumplen ≥ 4.5:1"
  - "[ ] La paleta de marca incorpora un único tono de acento oscuro para estos textos"

related:
  - "[[ui-contrast/contrast-token-single-source]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/tokens.css"
  - "log-atm-web-astro/src/styles/global.css"
  - "log-atm-web-astro/src/styles/pages/cotizar.css"
  - "log-atm-web-astro/src/styles/pages/shared.css"
verified_at: null

created: "2026-10-04"
updated: "2026-10-04"
tags: [capability-spec]
---

# Textos de acento verde legibles sobre fondos claros

## Purpose

Los rótulos superiores de sección, el número de cada paso del asistente de cotización, la etiqueta del formulario de contacto y el plazo de respuesta del resumen usan un verde que mide entre 3.05:1 y 4.41:1 sobre sus fondos. Un verde de acento más oscuro, dentro de la paleta de marca, los deja sobre el mínimo AA en cada fondo donde aparecen, incluido el gris cálido de la sección «Por qué LOG ATM».

## Requirements

- El sistema SHALL mostrar los rótulos superiores de sección, el número de paso del asistente de cotización, la etiqueta del formulario de contacto y el plazo de respuesta del resumen de cotización en un verde de acento oscuro de la paleta de marca.
- El sistema MUST mantener un contraste mínimo de 4.5:1 entre ese texto y cada fondo donde aparece: blanco, gris cálido claro, gris alterno de sección y verde claro de etiqueta.
- El sistema SHOULD conservar el carácter verde de marca de estos textos.

## Scenarios

### Scenario: Visitante lee los rótulos de sección

**GIVEN** un visitante recorre la portada, servicios, industrias, nosotros o contacto
**WHEN** lee el rótulo superior de cada sección
**THEN** lo lee con un contraste igual o superior a 4.5:1, también sobre el gris alterno de «Por qué LOG ATM»

### Scenario: Usuario sigue los pasos de la cotización

**GIVEN** un usuario avanza en el asistente de cotización
**WHEN** mira el número de cada paso
**THEN** lo lee con un contraste igual o superior a 4.5:1

### Scenario: Usuario lee la etiqueta y el plazo de respuesta

**GIVEN** un usuario ve la etiqueta del formulario de contacto y el resumen de cotización
**WHEN** lee la etiqueta sobre verde claro y el plazo de respuesta
**THEN** ambos textos se leen con un contraste igual o superior a 4.5:1

## Acceptance Criteria

- [ ] Los rótulos de sección cumplen ≥ 4.5:1 en todas las páginas, incluido el fondo gris alterno
- [ ] El número de paso, la etiqueta del formulario y el plazo de respuesta cumplen ≥ 4.5:1
- [ ] La paleta de marca incorpora un único tono de acento oscuro para estos textos

## Related

- [[ui-contrast/contrast-token-single-source]]
