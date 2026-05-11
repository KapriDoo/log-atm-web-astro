---
type: capability-spec
title: "Sección de industrias en página de inicio con imágenes fotográficas"
capability: "sections"
slug: "industries-home"
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
  - "src/components/sections/IndustriesSection.astro"
  - "src/styles/sections/industries.css"
verified_at: null
created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Sección de industrias en página de inicio con imágenes fotográficas

## Purpose

Actualizar la sección "Experiencia en tu sector" de la página de inicio para que muestre imágenes fotográficas en lugar de iconos abstractos, logrando un impacto visual más moderno y profesional sin comprometer la legibilidad ni la accesibilidad.

## Requirements

- El sistema SHALL mostrar una imagen fotográfica en la parte superior de cada tarjeta de industria (patrón header image).
- El sistema SHALL mantener el texto de la tarjeta (nombre, subtítulo) sobre un fondo sólido, separado de la imagen.
- El sistema SHALL preservar los efectos de interacción actuales (elevación, transición) respetando las preferencias de movimiento del usuario.
- El sistema SHALL garantizar que las imágenes no causen saltos de layout durante la carga.
- El sistema SHOULD cargar las imágenes de forma diferida cuando estén fuera del viewport inicial.

## Scenarios

### Scenario: Visualización de tarjetas con fotografías

**GIVEN** que un usuario visita la página de inicio
**WHEN** se desplaza hasta la sección de industrias
**THEN** observa 14 tarjetas, cada una con una imagen fotográfica en la parte superior y el texto de la industria debajo

### Scenario: Interacción hover sobre tarjeta con imagen

**GIVEN** que las tarjetas de industria se muestran con imágenes fotográficas
**WHEN** el usuario posiciona el cursor sobre una tarjeta
**THEN** la tarjeta responde con la elevación y transición definidas, sin distorsión de la imagen

### Scenario: Preferencia de movimiento reducido

**GIVEN** que el usuario ha configurado su sistema para reducir animaciones
**WHEN** interactúa con las tarjetas de industria
**THEN** las transiciones se desactivan o se reducen a cambios instantáneos

### Scenario: Carga en dispositivo móvil

**GIVEN** que un usuario accede desde un dispositivo móvil
**WHEN** carga la página de inicio
**THEN** las tarjetas se adaptan al ancho de pantalla y las imágenes mantienen su proporción sin deformarse

## Acceptance Criteria

- [ ] Las 14 tarjetas de la sección de industrias muestran una imagen fotográfica en la parte superior.
- [ ] El texto de cada tarjeta permanece legible sobre fondo sólido (sin solapamiento con la imagen).
- [ ] Las imágenes no causan saltos de layout (CLS igual a cero).
- [ ] Las imágenes fuera del viewport inicial se cargan de forma diferida.
- [ ] Las transiciones hover respetan `prefers-reduced-motion`.
- [ ] El diseño es responsive y funciona correctamente en los breakpoints 639px y 479px.
- [ ] Cada imagen tiene texto alternativo descriptivo.

## Related

- [[data/industries-images]] — Estructura de datos y assets de imágenes de industrias
- [[sections/industries-page]] — Página dedicada de industrias con el mismo patrón visual
