---
type: capability-spec
title: "Estructura de datos de industrias con imágenes fotográficas"
capability: "data"
slug: "industries-images"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[redesign-experiencia-sector]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/redesign-experiencia-sector"
feature_branch: "feature/redesign-experiencia-sector"
commits: ["aac99af"]
mr: ""
acceptance_criteria:
  - "[x] Cada una de las 14 industrias tiene una imagen fotográfica asociada."
  - "[x] Las imágenes están disponibles en un directorio de assets público."
  - "[x] Cada imagen cuenta con texto alternativo descriptivo."
  - "[x] Las imágenes se sirven en formato optimizado para web (WebP o AVIF) con fallback."
  - "[x] No hay regresiones en el modelo de datos existente (icono, nombre, subtítulo y color se mantienen)."
related: []
affects:
  - "[[sections/industries-home]]"
  - "[[sections/industries-page]]"
adrs: []
scope:
  - "src/lib/constants.ts"
  - "public/industries/"
verified_at: "2026-05-10"
created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Estructura de datos de industrias con imágenes fotográficas

## Purpose

Permitir que cada industria del catálogo tenga asociada una imagen fotográfica representativa, de modo que las secciones visuales del sitio puedan mostrar fotografías en lugar de iconos abstractos.

## Requirements

- El sistema SHALL permitir asociar una imagen fotográfica a cada una de las 14 industrias del catálogo.
- El sistema SHALL alojar las imágenes en un directorio de assets estático accesible desde cualquier página del sitio.
- El sistema SHALL proporcionar un texto alternativo descriptivo para cada imagen.
- El sistema SHOULD optimizar las imágenes para entrega web (formatos modernos, compresión sin pérdida perceptible).

## Scenarios

### Scenario: Consulta de industria con imagen

**GIVEN** que el catálogo de industrias está cargado
**WHEN** se consulta una industria específica
**THEN** su información incluye una referencia a una imagen fotográfica y su texto alternativo

### Scenario: Entrega de assets de imagen

**GIVEN** que un usuario accede al sitio web
**WHEN** el navegador solicita las imágenes de industrias
**THEN** el servidor entrega los archivos optimizados con los encabezados de caché apropiados

## Acceptance Criteria

- [ ] Cada una de las 14 industrias tiene una imagen fotográfica asociada.
- [ ] Las imágenes están disponibles en un directorio de assets público.
- [ ] Cada imagen cuenta con texto alternativo descriptivo.
- [ ] Las imágenes se sirven en formato optimizado para web (WebP o AVIF) con fallback.
- [ ] No hay regresiones en el modelo de datos existente (icono, nombre, subtítulo y color se mantienen).

## Related

- [[sections/industries-home]] — Tarjetas de industria en la página de inicio que consumirán estas imágenes
- [[sections/industries-page]] — Página dedicada de industrias que consumirá estas imágenes
