---
type: capability-spec
title: "Pares de color de contraste definidos en una única fuente"
capability: "ui-contrast"
slug: "contrast-token-single-source"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[fix-color-contrast-sitewide]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide"
feature_branch: "feature/fix-color-contrast-sitewide"
commits:
  - b08df43
  - eb4735e
  - 58cb313
  - ae823e6
  - 94eeb32
  - 9223023
  - 81490f7
mr: ""
acceptance_criteria:
  - "[x] Cada par validado figura una sola vez en la fuente de tokens y el sitio construye sin errores"
  - "[x] No existen colores literales nuevos fuera de la fuente de tokens, salvo en las plantillas de correo"
  - "[x] La documentación de diseño declara la excepción de los correos"
  - "[x] Los ratios de la tabla de pares validados de la documentación coinciden con los medidos"
  - "[x] Los tokens de WhatsApp tienen el verde visible del sitio"
  - "[x] La documentación de diseño no describe como apto para texto normal un color cuyo par no alcanza 4.5:1 y declara las excepciones vigentes al anillo de foco por contexto"

related:
  - "[[tokens/consolidate-tokens]]"
  - "[[tokens/create-functional-tokens]]"
  - "[[ui-contrast/accent-text-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/tokens.css"
  - "log-atm-web-astro/DESIGN.md"
verified_at: "2026-10-06"

created: "2026-10-04"
updated: "2026-10-06"
tags: [capability-spec]
---

# Pares de color de contraste definidos en una única fuente

## Purpose

Cada par de color texto/fondo que cumple WCAG AA se define una vez en la fuente de tokens de diseño y todo estilo del sitio lo consume desde ahí. La documentación de diseño informa los contrastes medidos reales. Los correos, que exigen estilos en línea, son la única excepción declarada.

## Requirements

- El sistema SHALL definir cada par de color de texto y fondo validado una sola vez en la fuente de tokens de diseño.
- El sistema SHALL poner cada token nuevo a disposición tanto de los estilos del sitio como de las clases utilitarias de Tailwind.
- El sistema MUST NOT introducir colores literales nuevos fuera de la fuente de tokens, salvo en las plantillas de correo. La regla alcanza todo color escrito como valor fijo, también los colores con transparencia de las capas que oscurecen fotografías.
- El sistema SHALL declarar la excepción de las plantillas de correo en la documentación de diseño: los clientes de correo exigen estilos en línea y no leen los tokens.
- El sistema SHALL mostrar en la documentación de diseño los ratios de contraste medidos de cada par validado, incluidos los de botones CTA, WhatsApp, azul de marca y acento verde.
- El sistema SHALL hacer que los tokens de WhatsApp coincidan con el verde que el sitio muestra.
- El sistema SHALL mantener la documentación de diseño coherente con sus propios pares: no presenta como apto para texto normal un color cuyo par no alcanza 4.5:1, y declara las excepciones al anillo de foco por contexto que el sitio conserva.

## Scenarios

### Scenario: Equipo de diseño consulta los pares validados

**GIVEN** una persona del equipo abre la documentación de diseño
**WHEN** revisa la tabla de pares de contraste validados
**THEN** cada ratio coincide con el medido sobre el sitio

### Scenario: Equipo revisa los estilos tras el cambio

**GIVEN** una persona del equipo revisa las diferencias de estilos del cambio
**WHEN** busca colores literales nuevos
**THEN** no encuentra ninguno fuera de la fuente de tokens, salvo los botones de los correos (WhatsApp y «Responder por email»), que figuran como excepción declarada

### Scenario: Equipo consulta el uso de un color en la documentación

**GIVEN** una persona del equipo lee la descripción de un color en la documentación de diseño
**WHEN** la contrasta con la tabla de pares validados y con el anillo de foco del sitio
**THEN** la descripción no contradice la tabla ni omite una excepción vigente
**AND** esto vale para toda la documentación de diseño: los tonos de la paleta, los colores semánticos y la descripción de los botones no asignan a texto normal un color que la tabla limita a texto grande o declara no válido, y los botones descritos existen en el código con los tokens que se indican

### Scenario: Equipo cambia el color de un botón

**GIVEN** una persona del equipo necesita ajustar el color de un botón
**WHEN** modifica el token del par correspondiente
**THEN** el cambio se refleja en todos los lugares que usan ese par

## Acceptance Criteria

- [x] Cada par validado figura una sola vez en la fuente de tokens y el sitio construye sin errores
- [x] No existen colores literales nuevos fuera de la fuente de tokens, salvo en las plantillas de correo
- [x] La documentación de diseño declara la excepción de los correos
- [x] Los ratios de la tabla de pares validados de la documentación coinciden con los medidos
- [x] Los tokens de WhatsApp tienen el verde visible del sitio
- [x] La documentación de diseño no describe como apto para texto normal un color cuyo par no alcanza 4.5:1 y declara las excepciones vigentes al anillo de foco por contexto

## Related

- [[tokens/consolidate-tokens]]
- [[tokens/create-functional-tokens]]
- [[ui-contrast/accent-text-contrast]]
