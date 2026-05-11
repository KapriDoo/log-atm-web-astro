---
type: capability-spec
title: "Utilidad reutilizable de animaciones de entrada por scroll"
capability: "scroll-animations"
slug: "scroll-entrance-utility"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[gsap-scroll-animations]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/gsap-scroll-animations"
feature_branch: "feature/gsap-scroll-animations"
commits: []
mr: ""
acceptance_criteria:
  - "Los elementos marcados para animación aparecen con una entrada progresiva al llegar al viewport del usuario"
  - "La animación de entrada funciona en todas las páginas del sitio sin configuración adicional por página"
  - "Los usuarios que prefieren movimiento reducido no ven animaciones"
  - "Los elementos en cuadrículas grandes se animan en lotes para mantener fluidez visual"

related:
  - "[[scroll-stats-counters]]"
  - "[[scroll-why-reveal]]"
  - "[[scroll-cta-blobs]]"
  - "[[scroll-404-effect]]"
  - "[[scroll-inner-pages]]"
affects:
  - "src/scripts/scroll-animations.ts"
  - "src/layouts/BaseLayout.astro"
adrs: []
scope:
  - "src/scripts/scroll-animations.ts"
  - "src/layouts/BaseLayout.astro"
verified_at: "2026-05-10"

created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Utilidad reutilizable de animaciones de entrada por scroll

## Purpose

El sitio LOG ATM carece de animaciones de entrada al hacer scroll en la mayoría de sus secciones y páginas. Los usuarios ven todo el contenido estáticamente al cargar la página, sin progresión visual que guíe la lectura. Esta utilidad provee un sistema centralizado de animaciones de entrada por scroll que cualquier sección o página puede usar de forma declarativa, evitando duplicar lógica de animación en cada componente.

## Requirements

- El sistema SHALL proveer un mecanismo declarativo basado en atributos de datos para marcar elementos que deben animarse al entrar en el viewport
- El sistema SHALL aplicar animaciones de entrada con desplazamiento vertical y transición de opacidad como comportamiento por defecto
- El sistema SHALL soportar retrasos escalonados configurables para crear secuencias de entrada progresivas entre elementos hermanos
- El sistema SHALL soportar agrupación por lotes para grids con muchos elementos, animándolos en grupos en vez de individualmente
- El sistema SHALL respetar la preferencia del usuario de movimiento reducido, desactivando todas las animaciones cuando esta preferencia está activa
- El sistema SHALL cargarse globalmente para funcionar en todas las páginas sin configuración manual por página
- El sistema SHOULD soportar diferentes tipos de animación de entrada configurables por atributo
- El sistema SHALL garantizar que el contenido sea visible incluso si el script no se ejecuta (fallback no-JS)

## Scenarios

### Scenario: Entrada estándar al hacer scroll

**GIVEN** un visitante navega una página del sitio con secciones marcadas para animación
**WHEN** una sección entra en el área visible de la pantalla al hacer scroll
**THEN** los elementos de esa sección aparecen progresivamente con una transición suave desde abajo hacia su posición final

### Scenario: Entrada escalonada de elementos en lista

**GIVEN** una sección contiene múltiples tarjetas o elementos en cuadrícula marcados para animación escalonada
**WHEN** la sección entra en el viewport
**THEN** cada elemento aparece con un breve retraso respecto al anterior, creando un efecto de cascada visual

### Scenario: Agrupación por lotes en cuadrículas grandes

**GIVEN** una sección contiene más de 8 elementos marcados para animación
**WHEN** el usuario hace scroll y los elementos entran al viewport
**THEN** los elementos se animan en grupos para mantener una experiencia fluida sin caídas de rendimiento

### Scenario: Respeto de preferencia de movimiento reducido

**GIVEN** un visitante tiene activada la preferencia de sistema "reducir movimiento"
**WHEN** navega cualquier página del sitio
**THEN** no se ejecuta ninguna animación de entrada y todo el contenido es visible inmediatamente en su posición final

### Scenario: Contenido visible sin JavaScript

**GIVEN** un visitante accede al sitio con JavaScript deshabilitado
**WHEN** la página termina de cargar
**THEN** todo el contenido es visible en su posición final sin depender de animaciones

## Acceptance Criteria

- [x] Los elementos marcados para animación aparecen con una entrada progresiva al llegar al viewport del usuario
- [x] La animación de entrada funciona en todas las páginas del sitio sin configuración adicional por página
- [x] Los usuarios que prefieren movimiento reducido no ven animaciones
- [x] Los elementos en cuadrículas grandes se animan en lotes para mantener fluidez visual
- [x] El contenido es visible incluso si JavaScript está deshabilitado

## Related

- [[scroll-stats-counters]] — Especialización para contadores numéricos, depende de esta utilidad base
- [[scroll-why-reveal]] — Especialización con clip-path reveal, independiente pero coexiste con esta utilidad
- [[scroll-cta-blobs]] — Animación ambient independiente de esta utilidad
- [[scroll-404-effect]] — Animación one-shot independiente de esta utilidad
- [[scroll-inner-pages]] — Consume esta utilidad para las entradas de páginas internas
