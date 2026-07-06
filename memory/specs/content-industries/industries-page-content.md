---
type: capability-spec
title: "Página de industrias sin métricas propias ni sector destacado"
capability: "content-industries"
slug: "industries-page-content"
domain: "feature"
delta_type: "MODIFY"
supersedes: "[[content/content-industries]]"
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["84f5369", "5236635"]
mr: ""
acceptance_criteria:
  - "[x] La página de industrias no muestra la cifra '300+ clientes activos'"
  - "[x] La página de industrias no muestra la cifra '98% retención'"
  - "[x] La página de industrias no tiene ninguna sección de 'Sector destacado'"
  - "[x] La sección 'Qué movemos en cada sector' no menciona 'OEA' ni 'Última milla'"
related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/industrias.astro"
verified_at: null
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Página de industrias sin métricas propias ni sector destacado

## Purpose

La página de industrias exhibe cifras de clientes y retención que ya no se sostienen como afirmación pública, además de una sección que destaca un único sector por encima del resto. Esta spec retira esas cifras y esa sección, y limpia menciones a certificaciones y a un servicio específico dentro del listado de lo que se mueve por sector.

## Requirements

- El sistema SHALL no mostrar la cifra "300+ clientes activos" en la página de industrias.
- El sistema SHALL no mostrar la cifra "98% retención" en la página de industrias.
- El sistema SHALL no mostrar ninguna sección de "Sector destacado" en la página de industrias.
- El sistema SHALL no mencionar "OEA" ni "Última milla" en la sección "Qué movemos en cada sector".
- El sistema SHALL aplicar estos cambios de forma idéntica en español, inglés y portugués.
- El sistema SHALL mantener el listado completo de sectores atendidos sin alterar su cantidad ni sus nombres.

## Scenarios

### Scenario: Visitante revisa el encabezado de la página de industrias

**GIVEN** un visitante navega a la página de industrias
**WHEN** lee el encabezado y las cifras destacadas
**THEN** no encuentra "300+ clientes activos" ni "98% retención"

### Scenario: Visitante recorre la página de industrias completa

**GIVEN** un visitante navega la página de industrias de principio a fin
**WHEN** busca una sección que destaque un sector particular
**THEN** no encuentra ninguna sección de "Sector destacado"

### Scenario: Visitante revisa qué se mueve en cada sector

**GIVEN** un visitante consulta la sección "Qué movemos en cada sector"
**WHEN** lee las etiquetas de cada sector
**THEN** no encuentra menciones a "OEA" ni a "Última milla"

## Acceptance Criteria

- [x] Las cifras "300+" y "98%" no aparecen en la página de industrias en ningún idioma
- [x] La sección "Sector destacado" no existe en la página de industrias
- [x] La sección "Qué movemos en cada sector" no menciona "OEA" ni "Última milla"
- [x] El listado de sectores atendidos permanece completo y sin cambios de contenido
