---
type: capability-spec
title: "Contacto y cotización sin compromisos de tiempo finito"
capability: "content-contact"
slug: "contact-no-time-commitment"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["d5e6362"]
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/28"
acceptance_criteria:
  - "[x] La página de contacto no promete un plazo de respuesta expresado en horas"
  - "[x] La página de cotización no promete un plazo de respuesta expresado en horas"
  - "[x] El término general que reemplaza los plazos comunica prontitud sin comprometer un número de horas"
related:
  - "[[forms-email/email-sla-no-finite-commitment]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/contacto.astro"
  - "log-atm-web-astro/src/pages/cotizar.astro"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Contacto y cotización sin compromisos de tiempo finito

## Purpose

Las páginas de Contacto y Cotización prometen tiempos de respuesta expresados en horas concretas ("24h"), un compromiso que la empresa no puede garantizar de forma consistente. Esta spec retira esos plazos finitos y los reemplaza por un término general que comunica prontitud sin comprometer un número exacto de horas.

## Requirements

- El sistema SHALL no mostrar ningún plazo de respuesta expresado en horas concretas ("24h" o equivalente) en la página de Contacto.
- El sistema SHALL no mostrar ningún plazo de respuesta expresado en horas concretas en la página de Cotización.
- El sistema SHALL reemplazar cada mención de plazo finito por un término general (por ejemplo "rápido" o equivalente) que comunique prontitud sin comprometer un número de horas.
- El sistema SHALL aplicar estos cambios de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante lee la página de Contacto

**GIVEN** un visitante navega a la página de Contacto
**WHEN** lee el mensaje sobre el tiempo de respuesta
**THEN** no encuentra un plazo expresado en horas, sino un término general que comunica prontitud

### Scenario: Visitante completa el flujo de Cotización

**GIVEN** un visitante navega la página de Cotización, incluyendo su mensaje de éxito al enviar
**WHEN** busca información sobre cuándo recibirá respuesta
**THEN** no encuentra un plazo expresado en horas, sino un término general que comunica prontitud

## Acceptance Criteria

- [x] Ningún plazo expresado en horas concretas aparece en Contacto ni en Cotización, en ningún idioma
- [x] El término general que reemplaza los plazos aparece de forma consistente en ambas páginas
