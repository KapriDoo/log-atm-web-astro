---
type: capability-spec
title: "Botones azul de marca y enlace de salto legibles"
capability: "ui-contrast"
slug: "brand-button-contrast"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[fix-color-contrast-sitewide]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide"
feature_branch: "feature/fix-color-contrast-sitewide"
commits:
  - 58cb313
mr: ""
acceptance_criteria:
  - "[ ] Botones azul de marca, enlace de salto y botones de la sección final cumplen ≥ 4.5:1 en reposo, cursor, foco y presionado"
  - "[ ] El botón CTA de la sección final muestra fondo azul con texto claro en la portada, servicios, industrias y nosotros"
  - "[ ] Ningún botón de la sección final muestra texto oscuro sobre fondo azul"

related:
  - "[[ui-contrast/cta-button-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/global.css"
  - "log-atm-web-astro/src/styles/sections/cta.css"
  - "log-atm-web-astro/src/styles/tokens.css"
verified_at: null

created: "2026-10-04"
updated: "2026-10-05"
tags: [capability-spec]
---

# Botones azul de marca y enlace de salto legibles

## Purpose

Los botones azul de marca, el enlace de salto al contenido y los botones de la sección final de llamada a la acción muestran texto blanco sobre un azul que mide 4.38:1, por debajo del mínimo AA. Un azul de marca más profundo para estos botones deja el texto claro legible. La sección final conserva su botón azul sobre fondo oscuro con texto claro.

## Requirements

- El sistema SHALL mostrar los botones azul de marca, el enlace de salto al contenido y los botones de la sección final con texto claro sobre un tono de azul de marca más profundo que el actual.
- El sistema MUST mantener un contraste mínimo de 4.5:1 entre texto y fondo de estos botones en reposo, con el cursor encima, con foco de teclado y al ser presionados.
- El sistema SHALL oscurecer el fondo de estos botones cuando el cursor está encima, manteniendo el contraste mínimo.
- El sistema MUST mostrar, dentro de la sección final de llamada a la acción, el botón CTA con fondo azul de marca y texto claro, nunca con texto oscuro sobre azul.
- El sistema SHALL presentar este comportamiento en las cuatro páginas que incluyen la sección final de llamada a la acción.

## Scenarios

### Scenario: Visitante ve un botón azul de marca

**GIVEN** un visitante abre una página con un botón azul de marca
**WHEN** lee el texto del botón
**THEN** lo lee con claridad, con un contraste igual o superior a 4.5:1

### Scenario: Visitante pasa el cursor sobre un botón azul

**GIVEN** un visitante ve un botón azul de marca
**WHEN** mueve el cursor sobre él
**THEN** el fondo se oscurece y el texto sigue siendo legible

### Scenario: Usuario de teclado usa el enlace de salto

**GIVEN** un usuario de teclado abre una página
**WHEN** enfoca el enlace de salto al contenido
**THEN** el enlace aparece con texto claro legible sobre su fondo azul

### Scenario: Visitante llega a la sección final de llamada a la acción

**GIVEN** un visitante recorre la portada, servicios, industrias o nosotros hasta el final
**WHEN** observa el botón CTA de la sección final
**THEN** el botón se ve azul con texto claro legible, en reposo y con el cursor encima

## Acceptance Criteria

- [ ] Botones azul de marca, enlace de salto y botones de la sección final cumplen ≥ 4.5:1 en reposo, cursor, foco y presionado
- [ ] El botón CTA de la sección final muestra fondo azul con texto claro en la portada, servicios, industrias y nosotros
- [ ] Ningún botón de la sección final muestra texto oscuro sobre fondo azul

## Related

- [[ui-contrast/cta-button-contrast]]
