---
type: capability-spec
title: "Retiro de la herramienta de vectorización de logo y de sus referencias obsoletas"
capability: "dead-code-cleanup"
slug: "logo-vectorization-residue-removal"
domain: "debt"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[debt-assets-weight]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight"
feature_branch: "feature/debt-assets-weight"
commits: ["2904775"]
mr: ""
acceptance_criteria:
  - "[ ] Una búsqueda de la ubicación eliminada del logo en los scripts, la documentación y el README no encuentra resultados"
  - "[ ] La herramienta de vectorización del logo y su dependencia ya no forman parte del proyecto"
  - "[ ] La documentación del proyecto y el README señalan el logo vectorial vigente como fuente"
  - "[ ] La generación de favicons y el build del sitio funcionan sin errores"

related:
  - "[[dead-code-cleanup/asset-dead-code-removal]]"
affects: []
adrs: []
scope:
  - "scripts/png-to-svg.mjs"
  - "package.json"
  - "README.md"
  - "docs/project-brief.md"
verified_at: null

created: "2026-10-03"
updated: "2026-10-03"
tags: [capability-spec]
---

# Retiro de la herramienta de vectorización de logo y de sus referencias obsoletas

## Purpose

La limpieza previa de código muerto eliminó el logo vectorial de la carpeta de assets del código fuente, pero la herramienta que lo generaba sigue apuntando a esa ubicación y la documentación del proyecto la cita como destino. El criterio de aquella limpieza exigía cero referencias, y hoy no se cumple. El logo vectorial vigente ya está generado y versionado en los archivos públicos, por lo que la herramienta de un solo uso y su dependencia no aportan valor. Esta spec define el estado esperado tras retirarlas.

## Requirements

- El sistema SHALL NOT contener referencias a la ubicación eliminada del logo en los scripts, la documentación ni el README.
- El sistema SHALL retirar la herramienta de vectorización del logo y la dependencia que solo ella consume.
- La documentación del proyecto y el README SHALL señalar el logo vectorial vigente en los archivos públicos como fuente del logo.
- El sistema SHALL conservar el logo vectorial público y la generación de favicons que lo usa, sin modificarlos.
- El sistema SHALL construirse sin errores tras el retiro.

## Scenarios

### Scenario: No quedan referencias a la ubicación eliminada

**GIVEN** la herramienta de vectorización y sus referencias ya fueron retiradas
**WHEN** se busca la ubicación eliminada del logo en scripts, documentación y README
**THEN** la búsqueda no devuelve resultados

### Scenario: La documentación apunta al logo vigente

**GIVEN** una persona del equipo que consulta la documentación del proyecto o el README para ubicar el logo
**WHEN** lee la sección dedicada al logo
**THEN** encuentra el logo vectorial público como fuente y no encuentra instrucciones para generarlo desde un script retirado

### Scenario: Los favicons se siguen generando

**GIVEN** el logo vectorial público intacto
**WHEN** el equipo ejecuta la generación de favicons y el build del sitio
**THEN** ambos terminan sin errores

## Acceptance Criteria

- [ ] Una búsqueda de la ubicación eliminada del logo en los scripts, la documentación y el README no encuentra resultados
- [ ] La herramienta de vectorización del logo y su dependencia ya no forman parte del proyecto
- [ ] La documentación del proyecto y el README señalan el logo vectorial vigente como fuente
- [ ] La generación de favicons y el build del sitio funcionan sin errores

## Related

- [[dead-code-cleanup/asset-dead-code-removal]] — el criterio de cero referencias al logo eliminado nace de esa spec
