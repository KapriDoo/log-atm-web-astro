---
type: capability-spec
title: "Contadores numéricos animados en la sección de estadísticas"
capability: "scroll-animations"
slug: "scroll-stats-counters"
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
  - "Los números de las estadísticas se animan desde cero hasta su valor final cuando la sección entra en el viewport"
  - "Los valores numéricos se muestran siempre como enteros durante y después de la animación"
  - "Los sufijos textuales se conservan intactos junto al valor numérico animado"
  - "La animación de conteo se ejecuta una sola vez al primer scroll"

related:
  - "[[scroll-entrance-utility]]"
affects:
  - "src/components/sections/StatsSection.astro"
adrs: []
scope:
  - "src/components/sections/StatsSection.astro"
verified_at: "2026-05-10"

created: "2026-05-10"
updated: "2026-05-10"
tags: [capability-spec]
---

# Contadores numéricos animados en la sección de estadísticas

## Purpose

La sección de estadísticas del homepage muestra cifras clave del negocio de LOG ATM (años de experiencia, clientes, destinos, etc.) de forma estática. Los números que se animan desde cero hasta su valor real al entrar en pantalla captan la atención del visitante y comunican magnitud de forma más impactante que cifras estáticas.

## Requirements

- El sistema SHALL animar los valores numéricos de cada estadística desde cero hasta su valor objetivo cuando la sección entre en el viewport del usuario
- El sistema SHALL redondear los valores a números enteros durante toda la interpolación, sin mostrar decimales intermedios
- El sistema SHALL preservar cualquier sufijo textual asociado al número (como "+" o "%") sin alterarlo durante ni después de la animación
- El sistema SHALL ejecutar la animación de conteo una sola vez, no re-disparándose si el usuario hace scroll arriba y vuelve
- El sistema SHOULD completar la animación de conteo en un tiempo perceptible pero no excesivo (entre 1 y 3 segundos)
- El sistema SHALL respetar la preferencia de movimiento reducido, mostrando los valores finales de inmediato sin animación

## Scenarios

### Scenario: Conteo animado al entrar en viewport

**GIVEN** un visitante navega el homepage y la sección de estadísticas no es visible inicialmente
**WHEN** el visitante hace scroll y la sección de estadísticas entra en el área visible
**THEN** cada cifra se anima desde cero hasta su valor real con una transición fluida

### Scenario: Preservación de sufijos durante el conteo

**GIVEN** una estadística muestra un valor como "500+" o "98%"
**WHEN** la animación de conteo está en progreso
**THEN** el sufijo "+" o "%" permanece visible junto al número durante toda la animación

### Scenario: Valores siempre enteros

**GIVEN** la animación de conteo está interpolando hacia un valor objetivo
**WHEN** el valor intermedio es un número con decimales
**THEN** el valor mostrado al usuario es siempre un entero redondeado, sin decimales visibles

### Scenario: Animación no se repite

**GIVEN** un visitante ya vio la animación de conteo completa
**WHEN** el visitante hace scroll hacia arriba y luego regresa a la sección
**THEN** las cifras permanecen en su valor final sin repetir la animación

### Scenario: Movimiento reducido

**GIVEN** un visitante tiene activada la preferencia de reducir movimiento
**WHEN** la sección de estadísticas entra en el viewport
**THEN** las cifras muestran sus valores finales de inmediato sin animación de conteo

## Acceptance Criteria

- [x] Los números de las estadísticas se animan desde cero hasta su valor final cuando la sección entra en el viewport
- [x] Los valores numéricos se muestran siempre como enteros durante y después de la animación
- [x] Los sufijos textuales se conservan intactos junto al valor numérico animado
- [x] La animación de conteo se ejecuta una sola vez al primer scroll
- [x] La preferencia de movimiento reducido se respeta mostrando valores finales inmediatamente

## Related

- [[scroll-entrance-utility]] — Utilidad base que este script complementa; la sección también usa entradas genéricas para otros elementos
