---
type: spec
title: "Agregar servicios nuevos al sitio web"
capability: content
slug: content-services
domain: feature
delta_type: add
supersedes: null
superseded_by: "[[content-services/services-catalog-cta-and-detail-pages]]"
status: completed
assigned_agent: null
priority: high
depends_on: []
change_ref: alinear-contenido-notion
commits: [c5d7002]
feature_branch: feature/alinear-contenido-notion
mr: ""
updated: "2026-07-05"
acceptance_criteria:
  - "[x] El array SERVICES contiene 11 items (5 originales + 6 nuevos)"
  - "[x] Los 6 servicios nuevos son: Courier internacional, Seguros de Carga, Desconsolidado, Servicio de Casillero USA, Asesoria en Compras Internacionales, Te conectamos con el Medio Oriente"
  - "[x] Cada servicio tiene icono, titulo, descripcion, href y accent definidos"
  - "[x] ServicesSection renderiza todos los 11 servicios"
related: []
affects: [src/lib/constants.ts, src/components/sections/ServicesSection.astro]
adrs: []
scope: [src/lib/constants.ts, src/components/sections/ServicesSection.astro]
verified_at: "2026-05-08"
---

## Purpose

Extender el catálogo de servicios mostrado en el sitio web para reflejar la oferta completa de LOG ATM según anotaciones de negocio.

## Requirements

- El array `SERVICES` en `src/lib/constants.ts` DEBE incluir 6 servicios adicionales.
- Cada servicio DEBE tener: número secuencial, icono de lucide, título, descripción breve, href (anchor) y flag accent.
- Los servicios nuevos DEBEN ser:
  1. Courier internacional
  2. Seguros de Carga
  3. Desconsolidado
  4. Servicio de Casillero USA
  5. Asesoria en Compras Internacionales
  6. Te conectamos con el Medio Oriente

## Scenarios

### S1 — Visualización completa
GIVEN un usuario navega a la sección de servicios
WHEN la página carga
THEN se muestran 11 tarjetas de servicio en el grid

### S2 — Navegación desde dropdown
GIVEN un usuario expande el dropdown de Servicios en el navbar
WHEN selecciona un servicio nuevo
THEN la página scrollea al anchor correspondiente

## Acceptance Criteria

- [ ] Array SERVICES tiene longitud 11
- [ ] Los 6 nombres de servicios nuevos coinciden exactamente con los solicitados
- [ ] Cada servicio tiene descripción coherente con el negocio
- [ ] ServicesSection renderiza todos sin errores
