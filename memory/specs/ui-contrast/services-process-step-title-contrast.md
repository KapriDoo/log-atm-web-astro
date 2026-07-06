---
type: capability-spec
title: "Contraste legible en títulos de 'Cómo trabajamos' de Servicios"
capability: "ui-contrast"
slug: "services-process-step-title-contrast"
domain: "fix"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["f84cdf8"]
mr: "https://github.com/KapriDoo/log-atm-web-astro/pull/28"
acceptance_criteria:
  - "[x] El título de cada paso de 'Cómo trabajamos' en /servicios es legible sobre su fondo, en cualquier navegador moderno"
  - "[x] El contraste entre el título y el fondo cumple WCAG AA (ratio ≥ 4.5:1)"
related:
  - "[[content-services/services-how-we-work-process]]"
  - "[[internal-page-heroes/hero-title-contrast]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/styles/pages/shared.css"
  - "log-atm-web-astro/src/styles/global.css"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Contraste legible en títulos de "Cómo trabajamos" de Servicios

## Purpose

En la sección "Cómo trabajamos" del catálogo de servicios, el título de cada paso se muestra prácticamente invisible: el color del texto coincide con el color de fondo de la sección. Esta spec corrige ese defecto para que el título de cada paso sea legible con contraste suficiente.

## Requirements

- El sistema SHALL mostrar el título de cada paso de "Cómo trabajamos" (en el catálogo de servicios) con un color que contraste claramente contra el fondo de la sección.
- El sistema MUST cumplir un ratio de contraste WCAG AA (≥ 4.5:1) entre el título de cada paso y su fondo.
- El sistema SHALL mantener este contraste correcto en cualquier navegador moderno.
- El sistema SHOULD no introducir regresiones de contraste en otras secciones de texto ya corregidas (por ejemplo, los títulos de hero de páginas internas).

## Scenarios

### Scenario: Visitante lee los títulos de los pasos del proceso

**GIVEN** un visitante navega al catálogo de servicios y llega a la sección "Cómo trabajamos"
**WHEN** observa el título de cada uno de los 6 pasos
**THEN** puede leer claramente cada título, sin que se confunda con el fondo de la tarjeta

### Scenario: Una herramienta de accesibilidad mide el contraste

**GIVEN** una herramienta de auditoría de accesibilidad evalúa la sección "Cómo trabajamos"
**WHEN** mide el contraste entre el título de un paso y su fondo
**THEN** el ratio medido es igual o superior a 4.5:1

## Acceptance Criteria

- [x] Los 6 títulos de paso de "Cómo trabajamos" en /servicios son legibles en Chrome, Firefox y Safari
- [x] El contraste medido entre título y fondo es ≥ 4.5:1 en todos los pasos
- [x] Ninguna otra sección de texto pierde contraste como efecto secundario de esta corrección
