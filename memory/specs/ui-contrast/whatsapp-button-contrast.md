---
type: capability-spec
title: "Botones y canal de WhatsApp legibles"
capability: "ui-contrast"
slug: "whatsapp-button-contrast"
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
  - a8c8198
mr: ""
acceptance_criteria:
  - "[ ] Los botones de WhatsApp cumplen ≥ 4.5:1 en reposo, cursor, foco y presionado"
  - "[ ] El bloque del canal de WhatsApp en contacto muestra fondo uniforme y texto con contraste ≥ 4.5:1 en toda su superficie"
  - "[ ] El verde de fondo de WhatsApp sigue siendo el verde reconocible de la plataforma"

related:
  - "[[components/contacto-channels/contact-channels-whatsapp-icon]]"
  - "[[ui-contrast/email-whatsapp-button-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/styles/tokens.css"
  - "log-atm-web-astro/src/styles/global.css"
  - "log-atm-web-astro/src/styles/pages/shared.css"
verified_at: null

created: "2026-10-04"
updated: "2026-10-05"
tags: [capability-spec]
---

# Botones y canal de WhatsApp legibles

## Purpose

Los botones de WhatsApp del sitio y el bloque del canal de WhatsApp en la página de contacto muestran texto blanco sobre el verde de WhatsApp, con un contraste de 1.98:1. La marca conserva el verde reconocible de WhatsApp y adopta texto casi negro, y el bloque del canal usa un fondo uniforme para que todo su texto cumpla el mínimo.

## Requirements

- El sistema SHALL conservar el verde reconocible de WhatsApp como fondo de los botones y del bloque del canal de WhatsApp.
- El sistema SHALL mostrar el texto de esos elementos en un tono casi negro.
- El sistema MUST mantener un contraste mínimo de 4.5:1 en reposo, con el cursor encima, con foco de teclado y presionado.
- El sistema SHALL mostrar el bloque del canal de WhatsApp con un fondo de color uniforme, sin degradado que oscurezca una de sus zonas por debajo del mínimo.
- El sistema SHALL aplicar la regla a todos los botones de WhatsApp: la sección final de llamada a la acción, el menú y el menú móvil, y la pantalla de éxito de la cotización.

## Scenarios

### Scenario: Visitante lee un botón de WhatsApp

**GIVEN** un visitante ve un botón de WhatsApp en cualquier página
**WHEN** lee el texto del botón
**THEN** lo lee con claridad sobre el verde de WhatsApp

### Scenario: Visitante pasa el cursor sobre WhatsApp

**GIVEN** un visitante ve un botón de WhatsApp
**WHEN** mueve el cursor sobre él
**THEN** el fondo se oscurece levemente y el texto mantiene un contraste igual o superior a 4.5:1

### Scenario: Visitante revisa el canal de WhatsApp en contacto

**GIVEN** un visitante abre la página de contacto
**WHEN** observa el bloque del canal de WhatsApp
**THEN** todo el texto del bloque se lee con claridad, en cualquier zona del fondo

## Acceptance Criteria

- [ ] Los botones de WhatsApp cumplen ≥ 4.5:1 en reposo, cursor, foco y presionado
- [ ] El bloque del canal de WhatsApp en contacto muestra fondo uniforme y texto con contraste ≥ 4.5:1 en toda su superficie
- [ ] El verde de fondo de WhatsApp sigue siendo el verde reconocible de la plataforma

## Related

- [[components/contacto-channels/contact-channels-whatsapp-icon]]
- [[ui-contrast/email-whatsapp-button-contrast]]
