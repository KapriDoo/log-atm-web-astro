---
type: capability-spec
title: "Botón WhatsApp del correo de formulario legible"
capability: "forms-email"
slug: "email-whatsapp-button-contrast"
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
  - 4481fc6
mr: ""
acceptance_criteria:
  - "[x] El botón de WhatsApp del correo muestra texto casi negro sobre verde de WhatsApp con contraste ≥ 4.5:1"
  - "[x] El par de colores del botón del correo coincide con el del botón de WhatsApp del sitio"
  - "[x] El botón del correo conserva su condición de aparición y su enlace"

related:
  - "[[forms-email/email-cta-conditional]]"
  - "[[ui-contrast/whatsapp-button-contrast]]"
affects:
  - "[[ui-contrast/sitewide-contrast-verification]]"
adrs: []
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-10-06"

created: "2026-10-04"
updated: "2026-10-06"
tags: [capability-spec]
---

# Botón WhatsApp del correo de formulario legible

## Purpose

El botón de WhatsApp que recibe el equipo comercial en los correos de formulario muestra texto blanco sobre verde con un contraste de 1.98:1. El correo aplica la misma decisión de marca que el sitio: verde de WhatsApp con texto casi negro, legible en el cliente de correo.

## Requirements

- El sistema SHALL mostrar el botón de WhatsApp del correo de formulario con el verde de WhatsApp como fondo y texto casi negro.
- El sistema MUST mantener un contraste mínimo de 4.5:1 entre texto y fondo de ese botón.
- El sistema SHALL mostrar el mismo par de colores en el correo y en el botón de WhatsApp del sitio.
- El sistema SHALL conservar el comportamiento del botón definido para los correos: aparece solo cuando el remitente entregó teléfono y abre la conversación con el número indicado.

## Scenarios

### Scenario: Equipo comercial lee el botón de WhatsApp del correo

**GIVEN** el equipo recibe un correo de formulario con teléfono del remitente
**WHEN** mira el botón de WhatsApp
**THEN** lee su texto con claridad sobre el fondo verde

### Scenario: Correo sin teléfono del remitente

**GIVEN** el equipo recibe un correo de formulario sin teléfono
**WHEN** abre el correo
**THEN** el botón de WhatsApp no aparece

## Acceptance Criteria

- [x] El botón de WhatsApp del correo muestra texto casi negro sobre verde de WhatsApp con contraste ≥ 4.5:1
- [x] El par de colores del botón del correo coincide con el del botón de WhatsApp del sitio
- [x] El botón del correo conserva su condición de aparición y su enlace

## Related

- [[forms-email/email-cta-conditional]]
- [[ui-contrast/whatsapp-button-contrast]]
