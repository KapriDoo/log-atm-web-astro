---
type: capability-spec
title: "Botón «Responder por email» del correo de formulario legible"
capability: "forms-email"
slug: "email-reply-button-contrast"
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
  - 84e0c03
  - 94eeb32
  - 81490f7
mr: ""
acceptance_criteria:
  - "[x] El botón «Responder por email» del correo muestra texto blanco sobre azul de marca con contraste ≥ 4.5:1"
  - "[x] El par de colores del botón del correo coincide con el del botón azul sólido del sitio"
  - "[x] El botón del correo conserva su condición de aparición, su enlace y su color azul corporativo"

related:
  - "[[forms-email/email-cta-conditional]]"
  - "[[forms-email/email-whatsapp-button-contrast]]"
  - "[[ui-contrast/brand-button-contrast]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec, judgment-fix]
---

# Botón «Responder por email» del correo de formulario legible

## Purpose

El botón «Responder por email» que recibe el equipo comercial en los correos de formulario muestra texto blanco sobre el azul de marca claro, con un contraste de 4.38:1, bajo el mínimo de 4.5:1 para su tamaño de texto. El sitio ya declara ese par como no válido para texto normal y usa un azul de marca más oscuro en sus botones sólidos. El correo aplica el mismo par que el sitio.

## Requirements

- El sistema MUST mantener un contraste mínimo de 4.5:1 entre el texto y el fondo del botón «Responder por email» del correo.
- El sistema SHALL usar en el botón del correo el mismo par de azul sólido y texto claro que los botones azules del sitio, declarado junto a su origen como el resto de los pares del correo.
- El sistema SHALL conservar el color azul corporativo del botón, su condición de aparición y su enlace de respuesta.

## Scenarios

### Scenario: Equipo comercial abre un correo con email del remitente

**GIVEN** un remitente envió un formulario con su email
**WHEN** el equipo comercial abre el correo recibido
**THEN** lee el botón «Responder por email» con un contraste igual o superior a 4.5:1, en azul corporativo

### Scenario: Correo sin email del remitente

**GIVEN** un remitente envió un formulario sin email
**WHEN** el equipo comercial abre el correo recibido
**THEN** el botón «Responder por email» no aparece, igual que antes del cambio

## Acceptance Criteria

- [x] El botón «Responder por email» del correo muestra texto blanco sobre azul de marca con contraste ≥ 4.5:1
- [x] El par de colores del botón del correo coincide con el del botón azul sólido del sitio
- [x] El botón del correo conserva su condición de aparición, su enlace y su color azul corporativo

## Related

- [[forms-email/email-cta-conditional]] — condición de aparición y enlace del botón
- [[forms-email/email-whatsapp-button-contrast]] — mismo tratamiento para el botón de WhatsApp del correo
- [[ui-contrast/brand-button-contrast]] — par azul sólido del sitio
