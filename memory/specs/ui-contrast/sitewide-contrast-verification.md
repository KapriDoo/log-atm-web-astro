---
type: capability-spec
title: "Contraste AA verificado en todas las páginas y estados"
capability: "ui-contrast"
slug: "sitewide-contrast-verification"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[ui-contrast/cta-button-contrast]]"
  - "[[ui-contrast/brand-button-contrast]]"
  - "[[ui-contrast/whatsapp-button-contrast]]"
  - "[[forms-email/email-whatsapp-button-contrast]]"
  - "[[ui-contrast/nav-link-state-contrast]]"
  - "[[ui-contrast/accent-text-contrast]]"
  - "[[ui-contrast/dark-surface-heading-legibility]]"
  - "[[ui-contrast/quote-summary-empty-values-contrast]]"
  - "[[ui-contrast/secondary-text-dark-surface-contrast]]"
  - "[[ui-contrast/error-page-code-contrast]]"
  - "[[ui-contrast/services-filter-active-state-contrast]]"
  - "[[ui-contrast/focus-indicator-contrast]]"
  - "[[ui-contrast/contrast-token-single-source]]"
change_ref: "[[fix-color-contrast-sitewide]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide"
feature_branch: "feature/fix-color-contrast-sitewide"
commits:
  - 3bc419b
mr: ""
acceptance_criteria:
  - "[ ] La auditoría automática en navegador real reporta 0 violaciones de contraste en las 42 combinaciones de página, idioma y tamaño de pantalla"
  - "[ ] Todos los estados interactivos de texto cumplen ≥ 4.5:1 y los de texto grande o gráficos cumplen ≥ 3:1"
  - "[ ] El resultado se mantiene con movimiento reducido activado"
  - "[ ] La revisión visual de industrias y contacto no encuentra textos ilegibles"
  - "[ ] La sección final de llamada a la acción es legible en portada, servicios, industrias y nosotros"

related:
  - "[[ui-contrast/services-process-step-title-contrast]]"
  - "[[internal-page-heroes/hero-title-contrast]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/styles/"
  - "log-atm-web-astro/src/components/"
  - "log-atm-web-astro/src/pages/"
verified_at: null

created: "2026-10-04"
updated: "2026-10-05"
tags: [capability-spec]
---

# Contraste AA verificado en todas las páginas y estados

## Purpose

El proyecto exige WCAG AA como mínimo en todos los componentes. Esta spec fija el criterio de cierre del barrido de contraste: ninguna página en ningún idioma ni tamaño de pantalla presenta violaciones de contraste, y los estados interactivos también cumplen. Cubre texto sobre fondos sólidos y degradados controlados; el texto blanco sobre fotografías y video corresponde a un cambio posterior.

## Requirements

- El sistema MUST no presentar ninguna violación de contraste de color en una auditoría automática en navegador real, en la portada, servicios, industrias, nosotros, contacto, cotizar y la página 404, en español, inglés y portugués, en escritorio y móvil.
- El sistema MUST mantener un contraste mínimo de 4.5:1 para texto normal y de 3:1 para texto grande y elementos gráficos en los estados con cursor, foco de teclado, presionado, menú móvil abierto, pasos del asistente de cotización y mensajes de éxito del formulario.
- El sistema SHALL cumplir lo anterior con la preferencia de movimiento reducido activada.
- El sistema SHALL mostrar legible la sección final de llamada a la acción en las cuatro páginas que la incluyen.
- El sistema SHOULD confirmar con muestreo de píxeles y revisión visual los textos que la auditoría automática no resuelve, con revisión explícita de las páginas de industrias y contacto.

## Scenarios

### Scenario: Auditoría automática de todas las páginas

**GIVEN** las 21 direcciones del sitio (siete páginas en tres idiomas) están publicadas en una vista previa local
**WHEN** se ejecuta la auditoría de contraste en navegador real en escritorio y en móvil
**THEN** ninguna combinación de página, idioma y tamaño reporta violaciones de contraste

### Scenario: Revisión de estados interactivos

**GIVEN** un revisor recorre las páginas con cursor, teclado y menú móvil abierto
**WHEN** activa cada estado interactivo de botones, enlaces, filtros y campos
**THEN** cada estado cumple el contraste mínimo correspondiente

### Scenario: Revisión visual de zonas que la auditoría no resuelve

**GIVEN** un revisor abre las páginas de industrias y contacto
**WHEN** inspecciona los textos sobre degradados y capas
**THEN** todos los textos se leen con claridad, sin títulos invisibles

## Acceptance Criteria

- [ ] La auditoría automática en navegador real reporta 0 violaciones de contraste en las 42 combinaciones de página, idioma y tamaño de pantalla
- [ ] Todos los estados interactivos de texto cumplen ≥ 4.5:1 y los de texto grande o gráficos cumplen ≥ 3:1
- [ ] El resultado se mantiene con movimiento reducido activado
- [ ] La revisión visual de industrias y contacto no encuentra textos ilegibles
- [ ] La sección final de llamada a la acción es legible en portada, servicios, industrias y nosotros

## Related

- [[ui-contrast/services-process-step-title-contrast]]
- [[internal-page-heroes/hero-title-contrast]]
