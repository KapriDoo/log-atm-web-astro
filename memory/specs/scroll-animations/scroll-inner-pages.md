---
type: capability-spec
title: "Animaciones de entrada por scroll en páginas internas con migración CSS"
capability: "scroll-animations"
slug: "scroll-inner-pages"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[scroll-entrance-utility]]"
change_ref: "[[gsap-scroll-animations]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/gsap-scroll-animations"
feature_branch: "feature/gsap-scroll-animations"
commits: []
mr: ""
acceptance_criteria:
  - "Las 7 páginas internas muestran animaciones de entrada por scroll en sus secciones de contenido"
  - "Las páginas de servicios e industrias ya no usan animaciones CSS propias para las entradas"
  - "El contenido de las páginas migradas es visible incluso sin JavaScript"
  - "Las animaciones de entrada son consistentes con las del homepage"

related:
  - "[[scroll-entrance-utility]]"
affects:
  - "src/pages/servicios.astro"
  - "src/pages/industrias.astro"
  - "src/pages/nosotros.astro"
  - "src/pages/cotizar.astro"
  - "src/pages/contacto.astro"
  - "src/pages/servicios/carga-aerea.astro"
  - "src/pages/servicios/carga-maritima.astro"
adrs: []
scope:
  - "src/pages/servicios.astro"
  - "src/pages/industrias.astro"
  - "src/pages/nosotros.astro"
  - "src/pages/cotizar.astro"
  - "src/pages/contacto.astro"
  - "src/pages/servicios/carga-aerea.astro"
  - "src/pages/servicios/carga-maritima.astro"
verified_at: "2026-05-10"

created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Animaciones de entrada por scroll en páginas internas con migración CSS

## Purpose

Las 7 páginas internas del sitio (servicios, industrias, nosotros, cotizar, contacto, carga aérea y carga marítima) carecen de animaciones de entrada por scroll o utilizan animaciones CSS independientes que no son consistentes con el sistema de animación del homepage. Esta spec cubre la aplicación uniforme de entradas por scroll usando la utilidad central y la migración de las animaciones CSS existentes en servicios e industrias hacia el sistema unificado, eliminando conflictos de doble control de visibilidad.

## Requirements

- El sistema SHALL aplicar animaciones de entrada por scroll en las secciones de contenido de las 7 páginas internas: servicios, industrias, nosotros, cotizar, contacto, carga aérea y carga marítima
- El sistema SHALL remover las animaciones CSS de entrada existentes en las páginas de servicios e industrias, reemplazándolas por el sistema unificado de animación por scroll
- El sistema SHALL garantizar que el contenido de las páginas migradas sea visible incluso cuando JavaScript no está disponible, evitando el problema de contenido invisible por estilos de opacidad inicial
- El sistema SHALL mantener consistencia visual en las animaciones de entrada entre el homepage y las páginas internas
- El sistema SHOULD usar agrupación por lotes en páginas con muchas tarjetas o elementos repetidos para mantener rendimiento óptimo
- El sistema SHALL respetar la preferencia de movimiento reducido en todas las páginas internas

## Scenarios

### Scenario: Entrada por scroll en página interna

**GIVEN** un visitante accede a cualquiera de las 7 páginas internas del sitio
**WHEN** hace scroll y las secciones de contenido entran en el viewport
**THEN** los elementos aparecen con animaciones de entrada progresivas consistentes con las del homepage

### Scenario: Migración de animaciones CSS en servicios

**GIVEN** la página de servicios anteriormente usaba una animación CSS independiente para la entrada de sus tarjetas
**WHEN** un visitante navega la página de servicios actualizada
**THEN** las tarjetas se animan mediante el sistema unificado de scroll sin que existan restos de la animación CSS anterior

### Scenario: Migración de animaciones CSS en industrias

**GIVEN** la página de industrias anteriormente usaba una animación CSS independiente para la entrada de sus tarjetas
**WHEN** un visitante navega la página de industrias actualizada
**THEN** las tarjetas se animan mediante el sistema unificado de scroll sin que existan restos de la animación CSS anterior

### Scenario: Fallback sin JavaScript en páginas migradas

**GIVEN** un visitante accede a la página de servicios o industrias con JavaScript deshabilitado
**WHEN** la página termina de cargar
**THEN** todas las tarjetas y secciones de contenido son visibles en su posición final, sin quedarse ocultas por estilos de opacidad

### Scenario: Movimiento reducido en páginas internas

**GIVEN** un visitante con preferencia de movimiento reducido accede a una página interna
**WHEN** la página carga y el visitante hace scroll
**THEN** todo el contenido es visible de inmediato sin animaciones de entrada

## Acceptance Criteria

- [x] Las 7 páginas internas muestran animaciones de entrada por scroll en sus secciones de contenido
- [x] Las páginas de servicios e industrias ya no usan animaciones CSS propias para las entradas
- [x] El contenido de las páginas migradas es visible incluso sin JavaScript
- [x] Las animaciones de entrada son consistentes con las del homepage
- [x] La preferencia de movimiento reducido se respeta en todas las páginas internas

## Related

- [[scroll-entrance-utility]] — Esta spec consume la utilidad base para todas las entradas; es su principal dependencia
