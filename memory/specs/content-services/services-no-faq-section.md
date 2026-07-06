---
type: capability-spec
title: "Catálogo de servicios sin sección de preguntas frecuentes"
capability: "content-services"
slug: "services-no-faq-section"
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
commits: ["84f5369"]
mr: ""
acceptance_criteria:
  - "[x] La página de catálogo de servicios no muestra ninguna sección de preguntas frecuentes"
  - "[x] No queda ningún rastro visual (título, acordeón vacío) de la sección retirada"
related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/servicios.astro"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Catálogo de servicios sin sección de preguntas frecuentes

## Purpose

El catálogo de servicios incluye una sección "Preguntas frecuentes" que se retira del sitio. Esta spec establece que la página ya no debe presentar ese apartado en ningún idioma.

## Requirements

- El sistema SHALL no mostrar ninguna sección de "Preguntas frecuentes" en la página de catálogo de servicios.
- El sistema SHALL no dejar ningún encabezado, acordeón o estilo huérfano asociado a la sección retirada.
- El sistema SHALL aplicar la eliminación de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante recorre el catálogo de servicios completo

**GIVEN** un visitante navega la página de catálogo de servicios de principio a fin
**WHEN** llega al final de la página
**THEN** no encuentra ninguna sección de preguntas frecuentes

## Acceptance Criteria

- [x] No existe ninguna sección de preguntas frecuentes en /servicios en ningún idioma
- [x] No quedan elementos visuales vacíos o huérfanos en el lugar donde estaba la sección
