---
type: capability-spec
title: "Efecto bounce/glitch en la página 404"
capability: "scroll-animations"
slug: "scroll-404-effect"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[gsap-scroll-animations]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/gsap-scroll-animations"
feature_branch: "feature/gsap-scroll-animations"
commits: []
mr: ""
acceptance_criteria:
  - "El texto '404' de la página de error muestra un efecto de rebote o glitch al cargar la página"
  - "El efecto se ejecuta una sola vez al cargar, sin repetirse"
  - "La página sigue siendo funcional y legible después del efecto"

related: []
affects:
  - "src/pages/404.astro"
adrs: []
scope:
  - "src/pages/404.astro"
verified_at: "2026-05-10"

created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Efecto bounce/glitch en la página 404

## Purpose

La página de error 404 es actualmente una página estática genérica. Agregar un efecto de rebote o glitch al texto "404" transforma un momento negativo (página no encontrada) en una experiencia memorable que refuerza la personalidad de marca de LOG ATM y reduce la frustración del usuario al encontrar una página que no existe.

## Requirements

- El sistema SHALL mostrar un efecto visual de rebote o glitch en el texto "404" al cargar la página de error
- El sistema SHALL ejecutar el efecto una sola vez al cargar, sin loops ni repeticiones
- El sistema SHALL mantener el texto "404" legible y la página completamente funcional después del efecto
- El sistema SHALL respetar la preferencia de movimiento reducido, omitiendo el efecto y mostrando el texto estáticamente
- El sistema SHOULD completar el efecto en un tiempo breve para no retrasar la lectura del mensaje de error

## Scenarios

### Scenario: Efecto al cargar la página 404

**GIVEN** un visitante accede a una URL que no existe en el sitio
**WHEN** la página 404 termina de cargar
**THEN** el texto "404" aparece con un efecto de rebote o glitch visual que llama la atención

### Scenario: Efecto no se repite

**GIVEN** el efecto de 404 ya se ejecutó al cargar la página
**WHEN** el visitante permanece en la página o hace scroll
**THEN** el texto "404" permanece estable en su posición final sin repetir el efecto

### Scenario: Movimiento reducido

**GIVEN** un visitante tiene activada la preferencia de reducir movimiento
**WHEN** la página 404 termina de cargar
**THEN** el texto "404" se muestra de inmediato sin efecto de rebote ni glitch

## Acceptance Criteria

- [x] El texto "404" de la página de error muestra un efecto de rebote o glitch al cargar la página
- [x] El efecto se ejecuta una sola vez al cargar, sin repetirse
- [x] La página sigue siendo funcional y legible después del efecto
- [x] La preferencia de movimiento reducido se respeta

## Related

(Ninguna dependencia directa con otras specs de este cambio)
