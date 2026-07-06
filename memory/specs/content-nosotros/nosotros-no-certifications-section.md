---
type: capability-spec
title: "Nosotros sin sección de Certificaciones"
capability: "content-nosotros"
slug: "nosotros-no-certifications-section"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["84f5369"]
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/28"
acceptance_criteria:
  - "[x] La página Nosotros no muestra ninguna sección de 'Certificaciones'"
  - "[x] No queda ningún rastro visual o de estilo huérfano de la sección retirada"
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

# Nosotros sin sección de Certificaciones

## Purpose

La página Nosotros incluye una sección "Certificaciones" que se retira por completo del sitio. Esta spec establece que la página ya no debe presentar ese apartado en ningún idioma.

## Requirements

- El sistema SHALL no mostrar ninguna sección de "Certificaciones" en la página Nosotros.
- El sistema SHALL no dejar ningún encabezado o estilo huérfano asociado a la sección retirada.
- El sistema SHALL aplicar la eliminación de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante recorre la página Nosotros completa

**GIVEN** un visitante navega la página Nosotros de principio a fin
**WHEN** busca una sección de certificaciones
**THEN** no encuentra ninguna sección de "Certificaciones"

## Acceptance Criteria

- [x] No existe ninguna sección de "Certificaciones" en la página Nosotros en ningún idioma
- [x] No quedan elementos visuales huérfanos en el lugar donde estaba la sección
