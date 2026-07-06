---
type: capability-spec
title: "Correo transaccional sin compromiso de tiempo finito"
capability: "forms-email"
slug: "email-sla-no-finite-commitment"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[forms-email/email-cta-conditional]]"
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["e8aef42"]
mr: ""
acceptance_criteria:
  - "[x] El correo transaccional de notificación no promete un plazo de respuesta expresado en horas"
  - "[x] El texto de recordatorio de tiempo de respuesta usa un término general sin comprometer un número de horas"
related:
  - "[[forms-email/email-cta-conditional]]"
  - "[[content-contact/contact-no-time-commitment]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/lib/email-templates.ts"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Correo transaccional sin compromiso de tiempo finito

## Purpose

El correo de notificación que recibe el equipo comercial ante un nuevo formulario incluye un recordatorio de tiempo de respuesta que compromete un plazo finito ("antes de 24 h hábiles"). Esta spec reemplaza ese recordatorio por un término general, alineado con el criterio de no comprometer plazos finitos aplicado en el resto del sitio.

## Requirements

- El sistema SHALL no mencionar un plazo de respuesta expresado en horas concretas en el correo transaccional de notificación.
- El sistema SHALL mostrar en su lugar un término general (por ejemplo "a la brevedad" o equivalente) que comunique prontitud sin comprometer un número de horas.
- El sistema SHALL mantener el recordatorio de tiempo de respuesta como referencia útil para el equipo comercial, solo que sin plazo finito.

## Scenarios

### Scenario: El equipo comercial recibe una notificación de formulario

**GIVEN** el equipo comercial recibe un correo de notificación por un nuevo formulario
**WHEN** lee el recordatorio de tiempo de respuesta en el correo
**THEN** encuentra un término general de prontitud, sin un plazo expresado en horas concretas

## Acceptance Criteria

- [x] El correo transaccional no contiene "24 h" ni ningún otro plazo expresado en horas concretas
- [x] El recordatorio de tiempo de respuesta sigue presente, con un término general en su lugar
