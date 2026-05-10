---
type: spec
title: "Agregar industrias nuevas al sitio web"
capability: content
slug: content-industries
domain: feature
delta_type: add
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
  - "[x] El array INDUSTRIES contiene 14 items (6 originales + 8 nuevas)"
  - "[x] Las 8 industrias nuevas son: Chatarra Ferrosa, Iluminarias, Vehiculos Usados, Efectos Personales, Maquinaria, Repuestos Automotrices y de maquinaria Pesada, Textil, Proyectos"
  - "[x] Cada industria tiene icono, nombre, subtitulo y color definidos"
  - "[x] IndustriesSection renderiza todas las 14 industrias"
related: []
affects: [src/lib/constants.ts, src/components/sections/IndustriesSection.astro]
adrs: []
scope: [src/lib/constants.ts, src/components/sections/IndustriesSection.astro]
verified_at: "2026-05-08"
---

## Purpose

Extender el listado de industrias atendidas para cubrir los sectores adicionales identificados por la usuaria.

## Requirements

- El array `INDUSTRIES` en `src/lib/constants.ts` DEBE incluir 8 industrias adicionales.
- Cada industria DEBE tener: icono de lucide, nombre, subtítulo descriptivo y color identitario.
- Las industrias nuevas DEBEN ser:
  1. Chatarra Ferrosa
  2. Iluminarias
  3. Vehiculos Usados
  4. Efectos Personales
  5. Maquinaria
  6. Repuestos Automotrices y de maquinaria Pesada
  7. Textil
  8. Proyectos

## Scenarios

### S1 — Visualización completa
GIVEN un usuario navega a la sección de industrias
WHEN la página carga
THEN se muestran 14 tarjetas de industria en el grid

### S2 — Consistencia visual
GIVEN las nuevas tarjetas de industria se renderizan
WHEN se comparan con las originales
THEN mantienen el mismo formato, tipografía y comportamiento hover

## Acceptance Criteria

- [ ] Array INDUSTRIES tiene longitud 14
- [ ] Los 8 nombres de industrias nuevas coinciden exactamente con los solicitados
- [ ] Cada industria tiene color distintivo válido (hex)
- [ ] IndustriesSection renderiza todas sin errores
