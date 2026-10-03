---
type: capability-spec
title: "Una única copia del video institucional en el sitio desplegado"
capability: "dead-code-cleanup"
slug: "duplicate-video-removal"
domain: "debt"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[debt-assets-weight]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight"
feature_branch: "feature/debt-assets-weight"
commits: ["5e28cbd"]
mr: ""
acceptance_criteria:
  - "[ ] Existe una sola copia del video institucional en los archivos públicos del sitio"
  - "[ ] La carpeta pública de videos duplicada ya no existe"
  - "[ ] Ninguna referencia rota al video, ni en el código fuente ni en el sitio construido"
  - "[ ] La sección de video de la página de inicio reproduce el video institucional"

related:
  - "[[dead-code-cleanup/asset-dead-code-removal]]"
  - "[[image-optimization-pipeline/card-image-weight-budget]]"
affects: []
adrs: []
scope:
  - "public/video/"
  - "public/videos/"
  - "src/components/sections/WhyVideoSection.astro"
verified_at: null

created: "2026-10-03"
updated: "2026-10-03"
tags: [capability-spec]
---

# Una única copia del video institucional en el sitio desplegado

## Purpose

El sitio despliega tres copias idénticas del mismo video institucional, de las cuales solo una se usa. Las dos restantes agregan unos 7,5 MB de contenido inútil a cada despliegue y mantienen dos carpetas de videos con nombres casi iguales que confunden el inventario de assets. Esta spec define el resultado esperado tras dejar una sola copia.

## Requirements

- El sistema SHALL contener una única copia del video institucional entre los archivos públicos del sitio, la que usa la sección de video de la página de inicio.
- El sistema SHALL eliminar las copias idénticas no referenciadas y la carpeta de videos que quede sin uso.
- El sistema SHALL seguir reproduciendo el video institucional en la página de inicio tras la eliminación.
- El sistema SHALL NOT dejar referencias rotas a los archivos eliminados, ni en el código fuente ni en el sitio construido.

## Scenarios

### Scenario: El despliegue incluye una sola copia del video

**GIVEN** el sitio construido tras la limpieza
**WHEN** se inspecciona el contenido desplegable
**THEN** el video institucional aparece una sola vez y la carpeta de videos duplicada no existe

### Scenario: El visitante reproduce el video institucional

**GIVEN** un visitante en la sección de video de la página de inicio
**WHEN** inicia la reproducción
**THEN** el video institucional se reproduce sin errores

### Scenario: No quedan referencias a las copias eliminadas

**GIVEN** las copias duplicadas ya fueron eliminadas
**WHEN** se busca su nombre en el código fuente y en el sitio construido
**THEN** no se encuentra ninguna referencia a ellas

## Acceptance Criteria

- [ ] Existe una sola copia del video institucional en los archivos públicos del sitio
- [ ] La carpeta pública de videos duplicada ya no existe
- [ ] Ninguna referencia rota al video, ni en el código fuente ni en el sitio construido
- [ ] La sección de video de la página de inicio reproduce el video institucional

## Related

- [[dead-code-cleanup/asset-dead-code-removal]] — misma línea de eliminación de assets sin consumidores
- [[image-optimization-pipeline/card-image-weight-budget]] — comparte el objetivo de reducir peso de assets
