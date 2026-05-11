---
type: capability-spec
title: "Revelación progresiva con clip-path en la sección Why"
capability: "scroll-animations"
slug: "scroll-why-reveal"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[scroll-entrance-utility]]"
change_ref: "[[gsap-scroll-animations]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/gsap-scroll-animations"
feature_branch: "feature/gsap-scroll-animations"
commits: []
mr: ""
acceptance_criteria:
  - "La imagen de la sección Why se revela progresivamente desde un recorte inicial hasta mostrarse completa al hacer scroll"
  - "Los elementos de contenido textual de la sección aparecen con entrada escalonada"
  - "La animación de reveal se dispara al entrar la sección en el viewport"

related:
  - "[[scroll-entrance-utility]]"
affects:
  - "src/components/sections/WhySection.astro"
adrs: []
scope:
  - "src/components/sections/WhySection.astro"
verified_at: "2026-05-10"

created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Revelación progresiva con clip-path en la sección Why

## Purpose

La sección "Por qué elegirnos" del homepage combina una imagen destacada con argumentos de valor. Actualmente la imagen aparece de forma estática. Una revelación progresiva mediante recorte crea un efecto visual distintivo que dirige la atención del visitante hacia la imagen y refuerza la propuesta de valor mientras los textos entran de forma escalonada.

## Requirements

- El sistema SHALL revelar la imagen principal de la sección desde un recorte parcial hasta su visualización completa mediante una transición progresiva disparada por scroll
- El sistema SHALL aplicar una entrada escalonada a los elementos de contenido textual de la sección (título, argumentos, párrafos)
- El sistema SHALL disparar ambas animaciones cuando la sección entre en el viewport del usuario
- El sistema SHALL ejecutar las animaciones una sola vez
- El sistema SHALL respetar la preferencia de movimiento reducido, mostrando la imagen completa y todo el contenido de inmediato
- El sistema SHOULD coordinar el timing entre el reveal de la imagen y la entrada del contenido textual para una experiencia visual coherente

## Scenarios

### Scenario: Revelación de imagen al hacer scroll

**GIVEN** un visitante navega el homepage y la sección Why no es visible
**WHEN** la sección entra en el área visible al hacer scroll
**THEN** la imagen se revela progresivamente desde un recorte parcial hasta mostrarse en su totalidad

### Scenario: Entrada escalonada del contenido

**GIVEN** la sección Why entra en el viewport
**WHEN** la animación de revelación de imagen comienza
**THEN** los argumentos y textos de la sección aparecen con una entrada escalonada, cada uno ligeramente después del anterior

### Scenario: Movimiento reducido

**GIVEN** un visitante tiene activada la preferencia de reducir movimiento
**WHEN** la sección Why entra en el viewport
**THEN** la imagen se muestra completa y todo el contenido textual es visible de inmediato sin animaciones

## Acceptance Criteria

- [x] La imagen de la sección Why se revela progresivamente desde un recorte inicial hasta mostrarse completa al hacer scroll
- [x] Los elementos de contenido textual de la sección aparecen con entrada escalonada
- [x] La animación de reveal se dispara al entrar la sección en el viewport
- [x] La preferencia de movimiento reducido se respeta

## Related

- [[scroll-entrance-utility]] — Provee las entradas genéricas que complementan el reveal especializado de esta sección
