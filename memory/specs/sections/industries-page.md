---
type: capability-spec
title: "Página dedicada de industrias con imágenes fotográficas"
capability: "sections"
slug: "industries-page"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[data/industries-images]]"
change_ref: "[[redesign-experiencia-sector]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria: []
related: []
affects: []
adrs: []
scope:
  - "src/pages/industrias.astro"
verified_at: null
created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Página dedicada de industrias con imágenes fotográficas

## Purpose

Actualizar la página dedicada `/industrias` para que las tarjetas expandidas de cada industria muestren imágenes fotográficas en lugar de iconos abstractos, manteniendo la coherencia visual con la sección de inicio y mejorando el impacto profesional del listado completo.

## Requirements

- El sistema SHALL mostrar una imagen fotográfica en la parte superior de cada tarjeta expandida de industria.
- El sistema SHALL mantener el área de contenido textual (nombre, descripción detallada, lista de especialidades) sobre fondo sólido, separada de la imagen.
- El sistema SHALL preservar el diseño expandido actual con mayor altura de imagen que en la página de inicio.
- El sistema SHALL garantizar que las imágenes no causen saltos de layout durante la carga.
- El sistema SHOULD cargar las imágenes de forma diferida cuando estén fuera del viewport inicial.

## Scenarios

### Scenario: Visualización de tarjetas expandidas con fotografías

**GIVEN** que un usuario navega a la página de industrias
**WHEN** la página termina de cargar
**THEN** observa 14 tarjetas expandidas, cada una con una imagen fotográfica en la parte superior y el contenido detallado de la industria debajo

### Scenario: Navegación desde la página de inicio

**GIVEN** que un usuario llega a la página de industrias desde el enlace de la sección de inicio
**WHEN** compara ambas secciones
**THEN** percibe consistencia visual en el tratamiento de las imágenes, con la diferencia esperada de tamaño entre tarjetas compactas y expandidas

### Scenario: Carga en dispositivo móvil

**GIVEN** que un usuario accede desde un dispositivo móvil
**WHEN** carga la página de industrias
**THEN** las tarjetas expandidas se adaptan al ancho de pantalla y las imágenes mantienen su proporción sin deformarse

## Acceptance Criteria

- [ ] Las 14 tarjetas expandidas de la página de industrias muestran una imagen fotográfica en la parte superior.
- [ ] El contenido textual de cada tarjeta permanece legible sobre fondo sólido (sin solapamiento con la imagen).
- [ ] Las imágenes no causan saltos de layout (CLS igual a cero).
- [ ] Las imágenes fuera del viewport inicial se cargan de forma diferida.
- [ ] El diseño es responsive y funciona correctamente en los breakpoints 639px y 479px.
- [ ] Cada imagen tiene texto alternativo descriptivo.
- [ ] No hay regresiones en el contenido textual (nombres, descripciones, especialidades).

## Related

- [[data/industries-images]] — Estructura de datos y assets de imágenes de industrias
- [[sections/industries-home]] — Sección de industrias en la página de inicio con el mismo patrón visual
