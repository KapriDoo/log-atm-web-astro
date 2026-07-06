---
type: capability-spec
title: "Identidad del hero de Nosotros: Desde 2023, sin OEA/B2B"
capability: "content-nosotros"
slug: "nosotros-hero-identity"
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
commits: ["c960637", "86fe114"]
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/28"
acceptance_criteria:
  - "[x] El hero de Nosotros muestra 'Nosotros · Desde 2023' en lugar de 'Desde 2003'"
  - "[x] El título del hero de Nosotros dice 'Profesionales 20+ años de experiencia'"
  - "[x] Los metadatos del hero de Nosotros no muestran 'OEA' ni 'B2B'"
related:
  - "[[content-nosotros/years-experience-narrative-consistency]]"
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

# Identidad del hero de Nosotros: Desde 2023, sin OEA/B2B

## Purpose

El hero de la página Nosotros muestra una fecha de fundación incorrecta y dos metadatos ("OEA", "B2B") que ya no forman parte del posicionamiento de la empresa. Esta spec corrige la fecha, ajusta el título y retira esos metadatos.

## Requirements

- El sistema SHALL mostrar "Nosotros · Desde 2023" en el hero de la página Nosotros.
- El sistema SHALL no mostrar "Desde 2003" en ningún lugar del sitio.
- El sistema SHALL mostrar como título del hero de Nosotros "Profesionales 20+ años de experiencia".
- El sistema SHALL no mostrar "OEA" ni "B2B" en los metadatos del hero de Nosotros.
- El sistema SHALL aplicar estos cambios de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante lee el hero de Nosotros

**GIVEN** un visitante navega a la página Nosotros
**WHEN** lee el eyebrow y el título del hero
**THEN** ve "Nosotros · Desde 2023" y "Profesionales 20+ años de experiencia"

### Scenario: Visitante revisa los metadatos del hero

**GIVEN** un visitante lee los metadatos junto al título del hero de Nosotros
**WHEN** revisa cada uno
**THEN** no encuentra "OEA" ni "B2B" entre ellos

## Acceptance Criteria

- [x] "Nosotros · Desde 2023" aparece en el hero de Nosotros en los 3 idiomas
- [x] "Desde 2003" no aparece en ningún idioma
- [x] El título del hero dice "Profesionales 20+ años de experiencia" (o su traducción fiel) en los 3 idiomas
- [x] "OEA" y "B2B" no aparecen en los metadatos del hero de Nosotros
