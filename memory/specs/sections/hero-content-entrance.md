---
type: capability-spec
title: "Animaciones de entrada escalonada en Hero"
capability: "sections"
slug: "hero-content-entrance"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[animaciones-hero-gsap]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/animaciones-hero-gsap"
feature_branch: "feature/animaciones-hero-gsap"
commits: ["91d819e"]
mr: ""
acceptance_criteria:
  - "[x] Los elementos de contenido del Hero aparecen secuencialmente al cargar la página"
  - "[x] La animación respeta prefers-reduced-motion mostrando elementos estáticos"
  - "[x] El orden de aparición es: badge → título → lead → CTAs → trust indicators"
  - "[x] La animación no bloquea la interactividad de los elementos"
related:
  - "[[hero-ambient-animations]]"
affects: []
adrs: []
scope: ["src/components/sections/HeroSection.astro", "src/styles/sections/hero.css"]
verified_at: null
created: "2026-05-10"
updated: "2026-05-10"
verified_at: "2026-05-10"
tags: [capability-spec]
---

# Animaciones de entrada escalonada en Hero

## Purpose

Mejorar la experiencia visual de primera impresión del sitio mediante una animación de entrada progresiva y coordinada para todos los elementos de contenido del Hero section, creando un efecto de revelación elegante que guíe la atención del usuario desde el badge hacia los call-to-action.

## Requirements

- El sistema SHALL animar la entrada del badge con su indicador de estado
- El sistema SHALL animar la entrada del título principal y su span degradado
- El sistema SHALL animar la entrada del párrafo lead
- El sistema SHALL animar la entrada de los botones de llamada a la acción (CTAs)
- El sistema SHALL animar la entrada de los indicadores de confianza (avatars y texto)
- El sistema SHALL aplicar un retraso escalonado (stagger) entre elementos consecutivos
- El sistema SHOULD completar la secuencia de entrada en menos de 1.5 segundos
- El sistema SHALL detectar prefers-reduced-motion y en ese caso mostrar todos los elementos en su estado final sin animación

## Scenarios

### Scenario: Entrada progresiva al cargar la página

**GIVEN** que un usuario visita la página de inicio
**WHEN** el Hero section se renderiza en el viewport
**THEN** los elementos de contenido aparecen secuencialmente con un efecto de fade-in y desplazamiento vertical

### Scenario: Respeto a preferencias de movimiento reducido

**GIVEN** que un usuario tiene configurado prefers-reduced-motion
**WHEN** carga la página de inicio
**THEN** todos los elementos del Hero se muestran inmediatamente en su estado final sin ninguna animación

### Scenario: Interactividad durante la animación

**GIVEN** que la animación de entrada está en progreso
**WHEN** el usuario intenta hacer clic en un CTA
**THEN** el elemento es clickeable y funcional incluso si aún no ha completado su animación

## Acceptance Criteria

- [ ] Los elementos de contenido del Hero aparecen secuencialmente al cargar la página
- [ ] La animación respeta prefers-reduced-motion mostrando elementos estáticos
- [ ] El orden de aparición es: badge → título → lead → CTAs → trust indicators
- [ ] La animación no bloquea la interactividad de los elementos

## Related

- [[hero-ambient-animations]] — Animaciones continuas de elementos decorativos
