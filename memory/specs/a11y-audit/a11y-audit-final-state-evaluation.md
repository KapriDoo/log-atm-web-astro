---
type: capability-spec
title: "La auditoría evalúa el estado final de cada página"
capability: "a11y-audit"
slug: "a11y-audit-final-state-evaluation"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: review
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
  - "[ ] La auditoría se ejecuta con el movimiento reducido activado por defecto"
  - "[ ] Sobre el sitio vigente, la auditoría informa 0 violaciones de contraste en las páginas de portada de los tres idiomas, sin falsos positivos por animaciones de entrada"
  - "[ ] La documentación del comando explica que se evalúa el estado final de las páginas y por qué es el relevante para el contraste"

related:
  - "[[ui-contrast/sitewide-contrast-verification]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/scripts/axe-audit.mjs"
  - "log-atm-web-astro/README.md"
verified_at: null

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# La auditoría evalúa el estado final de cada página

## Purpose

Las animaciones de entrada del sitio parten de textos casi transparentes. Una auditoría que mide el contraste en mitad de esas animaciones informa violaciones que el visitante nunca ve en reposo. El contraste relevante es el del estado final de la página, así que la auditoría la evalúa con el movimiento reducido activado, de modo que los textos aparecen en su estado definitivo.

## Requirements

- El sistema SHALL ejecutar la auditoría de accesibilidad con la preferencia de movimiento reducido activada por defecto.
- El sistema MUST evaluar los textos en su estado final, sin falsos positivos derivados de animaciones de entrada en curso.
- El sistema MUST documentar, junto al comando, el motivo de evaluar el estado final.

## Scenarios

### Scenario: Portada con animaciones de entrada

**GIVEN** una portada cuyos textos aparecen con una animación de entrada
**WHEN** se ejecuta la auditoría
**THEN** el contraste se evalúa con los textos en su estado final y la auditoría no informa violaciones por la animación

### Scenario: Persona se pregunta por qué se reduce el movimiento

**GIVEN** una persona que lee la documentación de la auditoría
**WHEN** busca por qué se activa el movimiento reducido
**THEN** encuentra que el contraste relevante es el del estado final de la página

## Acceptance Criteria

- [ ] La auditoría se ejecuta con el movimiento reducido activado por defecto
- [ ] Sobre el sitio vigente, la auditoría informa 0 violaciones de contraste en las páginas de portada de los tres idiomas, sin falsos positivos por animaciones de entrada
- [ ] La documentación del comando explica que se evalúa el estado final de las páginas y por qué es el relevante para el contraste

## Related

- [[a11y-audit-real-browser-coverage]] — cobertura de la auditoría
- [[ui-contrast/sitewide-contrast-verification]] — resultado de contraste que se confirma en movimiento reducido
