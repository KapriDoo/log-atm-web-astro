---
type: capability-spec
title: "Coherencia narrativa de 'años de experiencia' con 'Desde 2023'"
capability: "content-nosotros"
slug: "years-experience-narrative-consistency"
domain: "feature"
delta_type: "MODIFY"
supersedes: "[[content/content-stats]]"
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[content-nosotros/nosotros-hero-identity]]"
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["c960637"]
mr: ""
acceptance_criteria:
  - "[x] Ninguna mención a los años de experiencia de la empresa contradice 'Desde 2023' en ninguna página"
  - "[x] El eyebrow del hero de Home es coherente con la nueva fecha de fundación"
  - "[x] La descripción de marca del footer es coherente con la nueva fecha de fundación"
  - "[x] Los metadatos (meta description) de la página Nosotros son coherentes con la nueva fecha de fundación"
related:
  - "[[content-nosotros/nosotros-hero-identity]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
verified_at: null
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Coherencia narrativa de "años de experiencia" con "Desde 2023"

## Purpose

Varias superficies del sitio (hero de Home, pie de página, metadatos SEO) mencionan "años de experiencia" de forma que puede contradecir la fecha de fundación corregida ("Desde 2023") de la página Nosotros. Esta spec establece que toda mención a la trayectoria temporal de la empresa debe ser coherente entre sí en todo el sitio.

## Requirements

- El sistema SHALL mantener una narrativa temporal coherente entre todas las menciones a la antigüedad o experiencia de la empresa, en cualquier página o sección donde aparezcan.
- El sistema SHALL no mostrar en ninguna página una afirmación de años de experiencia que contradiga "Desde 2023" mostrado en la página Nosotros.
- El sistema SHALL aplicar la misma narrativa temporal en el eyebrow del hero de Home, en la descripción de marca del pie de página, y en los metadatos descriptivos (meta description) de la página Nosotros.
- El sistema SHALL aplicar estos cambios de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante compara la fecha de fundación con la experiencia declarada

**GIVEN** un visitante lee "Nosotros · Desde 2023" en la página Nosotros
**WHEN** luego revisa el hero de Home, el pie de página o los metadatos de Nosotros
**THEN** encuentra una narrativa de experiencia coherente con esa fecha de fundación, sin contradicción aparente

### Scenario: Visitante lee el pie de página

**GIVEN** un visitante revisa la descripción de marca en el pie de página de cualquier sección del sitio
**WHEN** compara esa descripción con la fecha de fundación de Nosotros
**THEN** no percibe una contradicción entre ambas afirmaciones

## Acceptance Criteria

- [x] El eyebrow del hero de Home no contradice "Desde 2023"
- [x] La descripción de marca del footer no contradice "Desde 2023"
- [x] La meta description de Nosotros no contradice "Desde 2023"
- [x] No queda ninguna mención de años de experiencia inconsistente con la fecha de fundación en los 3 idiomas
