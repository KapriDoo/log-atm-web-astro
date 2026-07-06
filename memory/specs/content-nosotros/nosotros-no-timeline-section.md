---
type: capability-spec
title: "Nosotros sin sección de Trayectoria"
capability: "content-nosotros"
slug: "nosotros-no-timeline-section"
domain: "feature"
delta_type: "DEPRECATE"
supersedes: "[[nosotros-timeline-reveal/spec]]"
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
  - "[x] La página Nosotros no muestra ninguna sección de 'Trayectoria' ni línea de tiempo histórica"
  - "[x] No queda ningún rastro visual, de estilo ni de script dedicado exclusivamente a la sección retirada"
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

# Nosotros sin sección de Trayectoria

## Purpose

La página Nosotros incluye una sección "Trayectoria" con una línea de tiempo de hitos históricos que se retira del sitio. Esta spec deprecia el comportamiento descrito por la capability `nosotros-timeline-reveal` (animación de esa línea de tiempo), que deja de aplicar al no existir ya la sección que anima.

## Requirements

- El sistema SHALL no mostrar ninguna sección de "Trayectoria" ni línea de tiempo histórica en la página Nosotros.
- El sistema SHALL no dejar ningún encabezado, estilo o comportamiento de animación huérfano asociado a la sección retirada.
- El sistema SHALL aplicar la eliminación de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante recorre la página Nosotros completa

**GIVEN** un visitante navega la página Nosotros de principio a fin
**WHEN** busca una sección de hitos históricos o línea de tiempo
**THEN** no encuentra ninguna sección de "Trayectoria"

## Acceptance Criteria

- [x] No existe ninguna sección de "Trayectoria" en la página Nosotros en ningún idioma
- [x] No queda ningún comportamiento de animación ni estilo huérfano asociado a la sección retirada

## Nota de supersesión

Esta spec deprecia `[[nosotros-timeline-reveal/spec]]`: al eliminarse la sección "Trayectoria", el comportamiento de animación por scroll que esa capability documentaba deja de tener markup sobre el cual operar.
