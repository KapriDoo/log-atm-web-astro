---
type: capability-spec
title: "Botón CTA verde legible en todos sus estados"
capability: "ui-contrast"
slug: "cta-button-contrast"
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
  - 84ce2fc
  - 9d1687e
mr: ""
acceptance_criteria:
  - "[x] Todo botón CTA muestra texto azul marino oscuro sobre fondo verde de marca con contraste ≥ 4.5:1 en reposo, con cursor, con foco de teclado y presionado"
  - "[x] El contraste del botón CTA con el cursor encima es ≥ 5:1"
  - "[x] La etiqueta CTA de tarjetas de servicios, el botón de envío de contacto y el botón de la página 404 cumplen ≥ 4.5:1 en todos sus estados"
  - "[x] La marca de selección, el sello de éxito y el pin de oficina sobre verde cumplen ≥ 3:1"
  - "[x] El color de fondo verde de los botones CTA no cambia respecto al actual"
  - "[x] La marca de completado de la viñeta de cada paso terminado del asistente de cotización usa el mismo texto oscuro del CTA y cumple ≥ 4.5:1 sobre el verde de marca"

related:
  - "[[ui-contrast/brand-button-contrast]]"
  - "[[ui-contrast/focus-indicator-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/tokens.css"
  - "log-atm-web-astro/src/styles/global.css"
  - "log-atm-web-astro/src/styles/sections/services.css"
  - "log-atm-web-astro/src/styles/pages/shared.css"
  - "log-atm-web-astro/src/styles/pages/cotizar.css"
  - "log-atm-web-astro/src/pages/404.astro"
verified_at: "2026-10-06"

created: "2026-10-04"
updated: "2026-10-06"
tags: [capability-spec]
---

# Botón CTA verde legible en todos sus estados

## Purpose

Los botones de llamada a la acción (CTA) del sitio muestran texto blanco sobre el verde de marca y no se leen bien: el contraste medido es 2.5:1 en reposo y 3.6:1 al pasar el cursor. La marca conserva el fondo verde y adopta texto azul marino oscuro, de modo que cada CTA cumpla WCAG AA en todos sus estados.

## Requirements

- El sistema SHALL conservar el verde de marca como fondo de todo botón CTA.
- El sistema SHALL mostrar el texto de todo botón CTA en azul marino oscuro de marca.
- El sistema MUST mantener un contraste mínimo de 4.5:1 entre texto y fondo del botón CTA en reposo, con el cursor encima, con foco de teclado y al ser presionado.
- El sistema SHOULD ofrecer, con el cursor encima, un contraste con margen sobre el mínimo (no inferior a 5:1) en lugar de quedar en el límite.
- El sistema SHALL aplicar la misma regla de color a toda superficie verde de marca que lleve texto: el botón CTA del menú y del menú móvil, la etiqueta CTA de las tarjetas de servicios, el botón de envío del formulario de contacto, el botón de la página de error 404 y la viñeta de cada paso completado del asistente de cotización.
- El sistema MUST mantener un contraste mínimo de 3:1 en los elementos gráficos de estado que se dibujan sobre el verde de marca: la marca de selección del modo de envío, el sello de éxito de la cotización y el pin de las tarjetas de oficina.

## Scenarios

### Scenario: Visitante lee el CTA principal de la portada

**GIVEN** un visitante abre la portada del sitio
**WHEN** observa el botón CTA del hero
**THEN** lee su texto con claridad sobre el fondo verde de marca

### Scenario: Visitante pasa el cursor sobre un CTA

**GIVEN** un visitante ve un botón CTA en cualquier página
**WHEN** mueve el cursor sobre el botón
**THEN** el texto sigue siendo legible, con un contraste igual o superior a 4.5:1

### Scenario: Usuario de teclado enfoca un CTA

**GIVEN** un usuario navega con teclado
**WHEN** enfoca un botón CTA
**THEN** el botón mantiene texto legible y el indicador de foco es visible

### Scenario: Visitante envía el formulario de contacto

**GIVEN** un visitante completa el formulario de contacto
**WHEN** ve el botón de envío
**THEN** lee su texto con un contraste igual o superior a 4.5:1, también al pasar el cursor

### Scenario: Visitante llega a la página de error

**GIVEN** un visitante abre una dirección inexistente del sitio
**WHEN** ve el botón de regreso al inicio
**THEN** el botón mantiene el verde de marca y su texto es legible en reposo y con el cursor encima

### Scenario: Elementos de estado sobre el verde

**GIVEN** un usuario avanza en el asistente de cotización o ve las oficinas
**WHEN** se muestran la marca de selección, el sello de éxito o el pin de oficina sobre el verde de marca
**THEN** cada elemento se distingue de su fondo con un contraste igual o superior a 3:1

### Scenario: Usuario completa un paso del asistente de cotización

**GIVEN** un usuario avanza al siguiente paso del asistente de cotización
**WHEN** el paso anterior muestra su viñeta verde con la marca de completado
**THEN** la marca se lee sobre el verde de marca con un contraste igual o superior a 4.5:1

## Acceptance Criteria

- [x] Todo botón CTA muestra texto azul marino oscuro sobre fondo verde de marca con contraste ≥ 4.5:1 en reposo, con cursor, con foco de teclado y presionado
- [x] El contraste del botón CTA con el cursor encima es ≥ 5:1
- [x] La etiqueta CTA de tarjetas de servicios, el botón de envío de contacto y el botón de la página 404 cumplen ≥ 4.5:1 en todos sus estados
- [x] La marca de selección, el sello de éxito y el pin de oficina sobre verde cumplen ≥ 3:1
- [x] El color de fondo verde de los botones CTA no cambia respecto al actual
- [x] La marca de completado de la viñeta de cada paso terminado del asistente de cotización usa el mismo texto oscuro del CTA y cumple ≥ 4.5:1 sobre el verde de marca

## Related

- [[ui-contrast/brand-button-contrast]]
- [[ui-contrast/focus-indicator-contrast]]
