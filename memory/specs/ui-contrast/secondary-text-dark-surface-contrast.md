---
type: capability-spec
title: "Textos de apoyo legibles sobre superficies oscuras"
capability: "ui-contrast"
slug: "secondary-text-dark-surface-contrast"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[fix-color-contrast-sitewide]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide"
feature_branch: "feature/fix-color-contrast-sitewide"
commits:
  - 64fe893
  - d5792b0
mr: ""
acceptance_criteria:
  - "[x] El aviso y el mensaje de error de la sección final cumplen ≥ 4.5:1"
  - "[x] Los números de ítem y el total del directorio de industrias cumplen ≥ 4.5:1"
  - "[x] La etiqueta de paso de «Cómo trabajamos» cumple ≥ 4.5:1"
  - "[x] Las migas de pan de los heroes internos cumplen ≥ 4.5:1"
  - "[x] El contador del directorio de industrias se muestra sobre una pastilla ajustada a su contenido, no sobre una franja de todo el ancho de la foto"

related:
  - "[[internal-page-heroes/hero-title-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/components/sections/CTASection.astro"
  - "log-atm-web-astro/src/styles/pages/shared.css"
  - "log-atm-web-astro/src/styles/tokens.css"
verified_at: "2026-10-06"

created: "2026-10-04"
updated: "2026-10-06"
tags: [capability-spec]
---

# Textos de apoyo legibles sobre superficies oscuras

## Purpose

Varios textos de apoyo se ven apagados sobre superficies oscuras: el aviso y el mensaje de error de la sección final de llamada a la acción, los números y el total del directorio de industrias, la etiqueta de paso de las tarjetas de «Cómo trabajamos» y los enlaces de migas de pan sobre el hero. Todos quedan bajo 4.5:1 y deben alcanzarlo.

## Requirements

- El sistema SHALL mostrar con un tono claro los textos de apoyo que se ubican sobre superficies oscuras.
- El sistema MUST mantener un contraste mínimo de 4.5:1 en el aviso de campos requeridos y en el mensaje de estado de error de la sección final de llamada a la acción.
- El sistema MUST mantener un contraste mínimo de 4.5:1 en los números de ítem y en el total del contador del directorio de industrias.
- El sistema SHOULD mostrar el contador del directorio de industrias sobre una pastilla oscura ajustada a su contenido, sin una franja que cubra todo el ancho de la fotografía.
- El sistema MUST mantener un contraste mínimo de 4.5:1 en la etiqueta de paso de las tarjetas de «Cómo trabajamos».
- El sistema MUST mantener un contraste mínimo de 4.5:1 en los enlaces de migas de pan de los heroes de páginas internas.

## Scenarios

### Scenario: Visitante lee el aviso de la sección final

**GIVEN** un visitante llega a la sección final de llamada a la acción
**WHEN** lee el aviso sobre los campos requeridos
**THEN** lo lee con claridad sobre el fondo oscuro

### Scenario: Visitante ve un mensaje de error en la sección final

**GIVEN** un visitante envía el formulario de la sección final con un error
**WHEN** aparece el mensaje de error
**THEN** lo lee con un contraste igual o superior a 4.5:1

### Scenario: Visitante usa el directorio de industrias

**GIVEN** un visitante recorre el directorio de industrias
**WHEN** mira el número de cada ítem y el contador total
**THEN** los lee con claridad, sobre una pastilla oscura del tamaño del contador

### Scenario: Visitante lee las migas de pan

**GIVEN** un visitante abre una página interna con hero
**WHEN** mira el recorrido de migas de pan
**THEN** lee cada enlace con un contraste igual o superior a 4.5:1

## Acceptance Criteria

- [x] El aviso y el mensaje de error de la sección final cumplen ≥ 4.5:1
- [x] Los números de ítem y el total del directorio de industrias cumplen ≥ 4.5:1
- [x] La etiqueta de paso de «Cómo trabajamos» cumple ≥ 4.5:1
- [x] Las migas de pan de los heroes internos cumplen ≥ 4.5:1
- [x] El contador del directorio de industrias se muestra sobre una pastilla ajustada a su contenido, no sobre una franja de todo el ancho de la foto

## Related

- [[internal-page-heroes/hero-title-contrast]]
