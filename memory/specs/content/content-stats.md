---
type: spec
title: "Corregir estadísticas de la banda de confianza"
capability: content
slug: content-stats
domain: feature
delta_type: update
supersedes: null
superseded_by: null
status: completed
assigned_agent: null
priority: high
depends_on: []
change_ref: alinear-contenido-notion
commits: [c5d7002]
feature_branch: feature/alinear-contenido-notion
mr: ""
updated: "2026-05-08"
acceptance_criteria:
  - "[x] El array STATS contiene exactamente 4 items"
  - "[x] Los valores son: 20+ años, 70+ países, 98% satisfacción, Atendemos de manera personalizada"
  - "[x] El item '5.000+ envíos por año' ha sido eliminado"
  - "[x] StatsSection renderiza las 4 stats correctamente"
related: []
affects: [src/lib/constants.ts, src/components/sections/StatsSection.astro]
adrs: []
scope: [src/lib/constants.ts, src/components/sections/StatsSection.astro]
verified_at: "2026-05-08"
---

## Purpose

Actualizar las estadísticas destacadas para reflejar los datos correctos del negocio según indicaciones de la usuaria.

## Requirements

- El array `STATS` en `src/lib/constants.ts` DEBE contener exactamente 4 items.
- Los valores DEBEN ser:
  1. `20+` — Años de experiencia
  2. `70+` — Países conectados
  3. `98%` — Satisfacción
  4. `Atendemos de manera personalizada` — (nuevo item sin número)
- El item `5.000+ Envíos por año` DEBE eliminarse.

## Scenarios

### S1 — Visualización correcta
GIVEN un usuario visualiza la banda de stats
WHEN la página carga
THEN se muestran exactamente 4 estadísticas con los valores actualizados

### S2 — Eliminación de stat obsoleto
GIVEN la sección de stats renderiza
WHEN se inspecciona el contenido
THEN no aparece el texto "5.000+" ni "Envíos por año"

## Acceptance Criteria

- [ ] STATS tiene longitud 4
- [ ] Los 4 labels coinciden exactamente con los solicitados
- [ ] No existe ningún stat referente a "envíos" o "5.000"
- [ ] StatsSection renderiza correctamente en desktop y mobile
