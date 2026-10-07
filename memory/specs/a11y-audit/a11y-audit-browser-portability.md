---
type: capability-spec
title: "La auditoría corre en cualquier equipo con un navegador disponible"
capability: "a11y-audit"
slug: "a11y-audit-browser-portability"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[a11y-audit-real-browser-coverage]]"
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - a5cb95f
  - 928caa0
mr: ""
acceptance_criteria:
  - "[x] La ubicación del navegador de la auditoría se indica mediante una variable de entorno"
  - "[x] Cuando no hay un navegador disponible, la auditoría termina con un error que explica qué falta y cómo indicarlo"
  - "[x] Sin contenido compilado del sitio, la auditoría termina con un error que indica compilar primero"
  - "[x] Las dependencias que la auditoría necesita están declaradas en el proyecto, de modo que una instalación limpia basta para ejecutarla"

related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/scripts/axe-audit.mjs"
  - "log-atm-web-astro/package.json"
  - "log-atm-web-astro/README.md"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# La auditoría corre en cualquier equipo con un navegador disponible

## Purpose

El navegador local de pruebas de un desarrollador no se comparte con el repositorio. Una auditoría que solo funciona donde ese navegador existe se rompe en cualquier otro equipo sin explicar por qué. La auditoría permite indicar qué navegador usar y, cuando falta algo, dice exactamente qué es y cómo resolverlo.

## Requirements

- El sistema SHALL permitir indicar la ubicación del navegador de la auditoría mediante una variable de entorno.
- El sistema MUST terminar con un error explícito, que indica qué falta y cómo resolverlo, cuando no dispone de un navegador.
- El sistema MUST terminar con un error explícito que indica compilar primero cuando no existe el contenido compilado del sitio.
- El sistema MUST declarar en el proyecto todas las dependencias que la auditoría necesita, de modo que una instalación limpia baste para ejecutarla.
- El sistema SHOULD documentar en el README la variable de entorno y el requisito de contar con un navegador.

## Scenarios

### Scenario: Equipo con un navegador en otra ubicación

**GIVEN** un equipo que tiene un navegador instalado fuera de la ubicación habitual
**WHEN** la persona indica su ubicación mediante la variable de entorno y ejecuta la auditoría
**THEN** la auditoría usa ese navegador y se completa

### Scenario: Equipo sin navegador

**GIVEN** un equipo sin navegador disponible para la auditoría
**WHEN** la persona ejecuta la auditoría
**THEN** recibe un mensaje claro de qué falta y cómo indicar un navegador, y la auditoría termina con código de salida distinto de cero

### Scenario: Sitio sin compilar

**GIVEN** un equipo donde el sitio no se ha compilado
**WHEN** la persona ejecuta la auditoría
**THEN** recibe un mensaje que le indica compilar el sitio primero

## Acceptance Criteria

- [x] La ubicación del navegador de la auditoría se indica mediante una variable de entorno
- [x] Cuando no hay un navegador disponible, la auditoría termina con un error que explica qué falta y cómo indicarlo
- [x] Sin contenido compilado del sitio, la auditoría termina con un error que indica compilar primero
- [x] Las dependencias que la auditoría necesita están declaradas en el proyecto, de modo que una instalación limpia basta para ejecutarla

## Related

- [[a11y-audit-real-browser-coverage]] — auditoría que consume el navegador
