---
type: capability-spec
title: "Animación ambient de blobs flotantes en la sección CTA"
capability: "scroll-animations"
slug: "scroll-cta-blobs"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[gsap-scroll-animations]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/gsap-scroll-animations"
feature_branch: "feature/gsap-scroll-animations"
commits: []
mr: ""
acceptance_criteria:
  - "Los elementos decorativos blob de la sección CTA flotan y se escalan suavemente de forma continua"
  - "La animación es ambient: se ejecuta en loop continuo sin requerir interacción del usuario"
  - "La animación no afecta el rendimiento de scroll de la página"

related:
  - "[[scroll-entrance-utility]]"
affects:
  - "src/components/sections/CTASection.astro"
adrs: []
scope:
  - "src/components/sections/CTASection.astro"
verified_at: "2026-05-10"

created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Animación ambient de blobs flotantes en la sección CTA

## Purpose

La sección de llamada a la acción (CTA) del homepage contiene elementos decorativos tipo blob que actualmente son estáticos. Agregar movimiento ambient sutil — flotación y escalado en loop — aporta dinamismo visual que atrae la atención hacia el call-to-action sin distraer del mensaje principal, creando una experiencia más viva y moderna.

## Requirements

- El sistema SHALL animar los elementos decorativos blob de la sección CTA con movimiento de flotación y escalado sutil en loop continuo
- El sistema SHALL ejecutar la animación de forma ambient, es decir, sin depender de scroll ni de interacción del usuario para mantenerse activa
- El sistema SHALL evitar que la animación ambient impacte negativamente el rendimiento de scroll y la fluidez general de la página
- El sistema SHALL respetar la preferencia de movimiento reducido, deteniendo o no iniciando la animación cuando esta preferencia esté activa
- El sistema SHOULD usar transiciones suaves y orgánicas para que el movimiento se perciba natural

## Scenarios

### Scenario: Blobs flotando en la sección CTA

**GIVEN** un visitante navega al homepage y la sección CTA es visible
**WHEN** la sección se muestra en pantalla
**THEN** los elementos decorativos blob flotan y se escalan suavemente de forma continua, creando un efecto de movimiento orgánico

### Scenario: Animación continua sin interacción

**GIVEN** la sección CTA está visible en pantalla
**WHEN** el visitante no interactúa con la página (no hace scroll ni clicks)
**THEN** los blobs continúan su animación de flotación en loop sin detenerse

### Scenario: Movimiento reducido

**GIVEN** un visitante tiene activada la preferencia de reducir movimiento
**WHEN** la sección CTA se muestra en pantalla
**THEN** los blobs permanecen estáticos en su posición original sin animación

## Acceptance Criteria

- [x] Los elementos decorativos blob de la sección CTA flotan y se escalan suavemente de forma continua
- [x] La animación es ambient: se ejecuta en loop continuo sin requerir interacción del usuario
- [x] La animación no afecta el rendimiento de scroll de la página
- [x] La preferencia de movimiento reducido se respeta

## Related

- [[scroll-entrance-utility]] — La sección CTA también usa entradas genéricas para sus elementos de contenido; los blobs son una animación independiente que coexiste
