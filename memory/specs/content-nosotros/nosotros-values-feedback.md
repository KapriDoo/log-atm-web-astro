---
type: capability-spec
title: "Cuarto valor de Nosotros centrado en feedback del cliente"
capability: "content-nosotros"
slug: "nosotros-values-feedback"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["c960637"]
mr: ""
acceptance_criteria:
  - "[x] El cuarto valor de Nosotros dice 'Nos preocupamos del feedback de nuestros clientes' (o equivalente traducido)"
  - "[x] El cuarto valor no menciona 'KPIs medibles' ni 'revisión trimestral'"
related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/nosotros.astro"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Cuarto valor de Nosotros centrado en feedback del cliente

## Purpose

El cuarto valor listado en la página Nosotros describe un proceso interno de medición (KPIs, revisión trimestral) en lugar de comunicar un valor orientado al cliente. Esta spec reemplaza esa descripción por un mensaje centrado en el feedback del cliente.

## Requirements

- El sistema SHALL mostrar como descripción del cuarto valor de Nosotros el mensaje "Nos preocupamos del feedback de nuestros clientes" (o su traducción fiel).
- El sistema SHALL no mencionar "KPIs medibles" ni "revisión trimestral" en la descripción de ese valor.
- El sistema SHALL aplicar este cambio de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante lee los valores de la empresa

**GIVEN** un visitante navega a la página Nosotros y llega a la sección de valores
**WHEN** lee la descripción del cuarto valor
**THEN** ve un mensaje sobre el feedback de los clientes, sin mención a KPIs ni revisión trimestral

## Acceptance Criteria

- [x] El cuarto valor muestra el mensaje sobre feedback del cliente en los 3 idiomas
- [x] "KPIs medibles" y "revisión trimestral" no aparecen en la descripción de ese valor
