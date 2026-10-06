---
type: capability-spec
title: "Auditoría de accesibilidad en navegador real sobre todas las páginas"
capability: "a11y-audit"
slug: "a11y-audit-real-browser-coverage"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[chore-local-container-podman]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "[ ] Un comando único del proyecto ejecuta la auditoría de accesibilidad sobre el sitio compilado, en un navegador real"
  - "[ ] La lista de páginas auditadas se obtiene del contenido compilado y abarca todas las páginas en español, inglés y portugués, más las páginas de «no encontrado»"
  - "[ ] Cada página se audita en un tamaño de pantalla de escritorio y en uno de móvil"
  - "[ ] El comando termina con código de salida distinto de cero ante cualquier violación y con éxito cuando no hay ninguna"
  - "[ ] El informe identifica cada violación con su página, tamaño de pantalla y elemento afectado"
  - "[ ] La auditoría detecta violaciones de contraste de color, que una simulación de documento sin navegador no calcula"
  - "[ ] Una página agregada al sitio entra en la auditoría sin modificar la herramienta"

related:
  - "[[ui-contrast/sitewide-contrast-verification]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/scripts/axe-audit.mjs"
  - "log-atm-web-astro/package.json"
verified_at: null

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# Auditoría de accesibilidad en navegador real sobre todas las páginas

## Purpose

La accesibilidad del sitio, en especial el contraste de color, solo se comprueba de forma fiable en un navegador real que calcula los estilos finales. La herramienta de auditoría existente termina con error antes de entregar resultados y no mide contraste. Una auditoría reproducible, que recorre todas las páginas del sitio compilado en escritorio y móvil, aporta la evidencia que cada cambio necesita antes de cerrarse.

## Requirements

- El sistema SHALL ofrecer un comando único que audite la accesibilidad del sitio compilado en un navegador real.
- El sistema MUST derivar la lista de páginas a auditar del contenido compilado, sin una lista fija, e incluir todas las páginas de los tres idiomas y las páginas de «no encontrado».
- El sistema MUST auditar cada página en un tamaño de pantalla de escritorio y en uno de móvil.
- El sistema MUST evaluar el contraste de color de los textos como parte de la auditoría.
- El sistema MUST terminar con código de salida distinto de cero ante cualquier violación y con éxito si no hay ninguna.
- El sistema SHALL informar cada violación con su página, tamaño de pantalla y elemento afectado.
- El sistema MUST ser la única herramienta de auditoría de accesibilidad del proyecto.

## Scenarios

### Scenario: Auditoría sin violaciones

**GIVEN** el sitio compilado cumple las reglas de accesibilidad en todas sus páginas
**WHEN** una persona ejecuta la auditoría
**THEN** la herramienta recorre todas las páginas en escritorio y móvil, informa 0 violaciones y termina con éxito

### Scenario: Auditoría con un texto de bajo contraste

**GIVEN** una página con un texto cuyo contraste es inferior al mínimo AA
**WHEN** una persona ejecuta la auditoría
**THEN** la herramienta informa la página, el tamaño de pantalla y el elemento afectado, y termina con código de salida distinto de cero

### Scenario: Página nueva en el sitio

**GIVEN** una página agregada al sitio y compilada
**WHEN** una persona ejecuta la auditoría
**THEN** la página nueva se audita sin que nadie modifique la herramienta

### Scenario: Páginas de «no encontrado»

**GIVEN** el sitio compilado con una página de «no encontrado»
**WHEN** una persona ejecuta la auditoría
**THEN** esa página se audita junto con las demás

## Acceptance Criteria

- [ ] Un comando único del proyecto ejecuta la auditoría de accesibilidad sobre el sitio compilado, en un navegador real
- [ ] La lista de páginas auditadas se obtiene del contenido compilado y abarca todas las páginas en español, inglés y portugués, más las páginas de «no encontrado»
- [ ] Cada página se audita en un tamaño de pantalla de escritorio y en uno de móvil
- [ ] El comando termina con código de salida distinto de cero ante cualquier violación y con éxito cuando no hay ninguna
- [ ] El informe identifica cada violación con su página, tamaño de pantalla y elemento afectado
- [ ] La auditoría detecta violaciones de contraste de color, que una simulación de documento sin navegador no calcula
- [ ] Una página agregada al sitio entra en la auditoría sin modificar la herramienta

## Related

- [[ui-contrast/sitewide-contrast-verification]] — verificación de contraste cuyo resultado esta auditoría reproduce
- [[a11y-audit-final-state-evaluation]] — estado en que se evalúa cada página
- [[a11y-audit-browser-portability]] — navegador utilizado por la auditoría
