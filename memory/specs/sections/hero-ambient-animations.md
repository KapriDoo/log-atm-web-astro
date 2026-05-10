---
type: capability-spec
title: "Animaciones ambientales continuas en Hero"
capability: "sections"
slug: "hero-ambient-animations"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[animaciones-hero-gsap]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "Las 3 cards decorativas flotan suavemente con movimiento yoyo continuo"
  - "Los blobs de fondo tienen animación sutil de escala y opacidad"
  - "Las grid lines se revelan progresivamente al cargar"
  - "El wave SVG tiene animación continua de su path"
  - "Todas las animaciones respetan prefers-reduced-motion"
  - "Las animaciones no afectan el rendimiento (60fps)"
related: []
affects: []
adrs: []
scope: ["src/components/sections/HeroSection.astro", "src/styles/sections/hero.css"]
verified_at: null
created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Animaciones ambientales continuas en Hero

## Purpose

Añadir vida visual al Hero section mediante animaciones continuas y sutiles en elementos decorativos (cards flotantes, blobs de fondo, grid lines y wave SVG), creando una sensación de dinamismo profesional sin distraer del contenido principal.

## Requirements

- El sistema SHALL animar las 3 cards decorativas con un movimiento de flotación continuo (yoyo)
- El sistema SHALL animar los 2 blobs de fondo con transformaciones sutiles de escala y posición
- El sistema SHALL revelar las grid lines progresivamente al cargar la página
- El sistema SHALL animar el path SVG del wave con un movimiento ondulante continuo
- El sistema SHALL detectar prefers-reduced-motion y detener todas las animaciones ambientales en ese caso
- El sistema SHOULD mantener un frame rate estable de 60fps durante las animaciones

## Scenarios

### Scenario: Cards flotantes en reposo

**GIVEN** que un usuario está visualizando el Hero section
**WHEN** la página ha completado su carga inicial
**THEN** las 3 cards decorativas flotan suavemente arriba y abajo de forma independiente y continua

### Scenario: Efectos de fondo activos

**GIVEN** que un usuario está en la página de inicio
**WHEN** observa el área de fondo del Hero
**THEN** los blobs cambian sutilmente de tamaño y los grid lines se revelan con un efecto de barrido

### Scenario: Wave animado

**GIVEN** que el Hero section está visible
**WHEN** se observa la parte inferior del hero
**THEN** el wave SVG muestra un movimiento ondulante suave y continuo

### Scenario: Accesibilidad con movimiento reducido

**GIVEN** que un usuario tiene activado prefers-reduced-motion
**WHEN** carga la página
**THEN** todas las animaciones ambientales están detenidas y los elementos se muestran estáticos

## Acceptance Criteria

- [ ] Las 3 cards decorativas flotan suavemente con movimiento yoyo continuo
- [ ] Los blobs de fondo tienen animación sutil de escala y opacidad
- [ ] Las grid lines se revelan progresivamente al cargar
- [ ] El wave SVG tiene animación continua de su path
- [ ] Todas las animaciones respetan prefers-reduced-motion
- [ ] Las animaciones no afectan el rendimiento (60fps)

## Related

- [[hero-content-entrance]] — Animaciones de entrada escalonada del contenido
