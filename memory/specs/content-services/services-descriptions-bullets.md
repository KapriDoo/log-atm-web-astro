---
type: capability-spec
title: "Descripciones y bullets corregidos por servicio"
capability: "content-services"
slug: "services-descriptions-bullets"
domain: "feature"
delta_type: "MODIFY"
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["c086b40"]
mr: ""
acceptance_criteria:
  - "[x] Carga Aérea muestra la descripción y los 5 bullets exactos definidos, sin bullets adicionales"
  - "[x] Carga Marítima corrige el bullet FCL/LCL, incluye 'Carga general, Reefer y open-top disponibles' y no menciona negociación de tarifas por contrato"
  - "[x] Aduana y Documentación no menciona 'OEA' ni 'Operador Económico Autorizado' y su bullet de documentos incluye DUS, DIN, certificados de origen y fumigación"
  - "[x] Almacenaje muestra la descripción 'Bodegaje de carga general' y solo los 3 bullets definidos (sin última milla ni fulfillment)"
  - "[x] Consultoría Logística no menciona 'KPI dashboard mensual'"
  - "[x] Ruta Medio Oriente muestra únicamente los dos bullets nuevos definidos, sin los bullets anteriores"
related:
  - "[[content-services/services-catalog-cta-and-detail-pages]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/servicios.astro"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Descripciones y bullets corregidos por servicio

## Purpose

Varias descripciones y bullets del catálogo de servicios contienen afirmaciones inexactas, promesas de tiempo, menciones a certificaciones inexistentes o contenido redundante. Esta spec fija el contenido correcto y definitivo para cada servicio afectado, en los tres idiomas.

## Requirements

- El sistema SHALL mostrar en Carga Aérea la descripción "courier internacional y chárter aéreo, carga general, vuelo pasajero" junto con exactamente estos bullets: Courier internacional; Chárter aéreo; Cadena de frío y dangerous goods; Carga general; Vuelo pasajero.
- El sistema SHALL mostrar en el bullet de detalle de Carga Marítima el texto "FCL/FCL, LCL/LCL" y el bullet "Carga general, Reefer y open-top disponibles".
- El sistema SHALL no mostrar en Carga Marítima ningún bullet sobre "Negociación de tarifas por contrato".
- El sistema SHALL no mencionar "OEA" ni "Operador Económico Autorizado" en Aduana y Documentación, y SHALL mostrar el bullet "DUS, DIN, certificados de origen, fumigación".
- El sistema SHALL mostrar en Almacenaje la descripción "Bodegaje de carga general" y únicamente los bullets Bodegaje, Desconsolidado y Consolidado de contenedores.
- El sistema SHALL no mencionar "KPI dashboard mensual" en Consultoría Logística.
- El sistema SHALL mostrar en Ruta Medio Oriente los bullets "Llevamos tu negocio al medio oriente" y "Servicio Broker", sin ningún bullet previo.
- El sistema SHALL aplicar estas correcciones de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante revisa Carga Aérea

**GIVEN** un visitante abre la tarjeta o el detalle de Carga Aérea
**WHEN** lee la descripción y los bullets
**THEN** ve la descripción y exactamente los 5 bullets definidos, sin menciones a otros servicios adicionales

### Scenario: Visitante revisa Carga Marítima

**GIVEN** un visitante abre la tarjeta de Carga Marítima
**WHEN** lee el detalle
**THEN** ve el bullet "FCL/FCL, LCL/LCL", el bullet de carga general/reefer/open-top, y no ve mención a negociación de tarifas por contrato

### Scenario: Visitante revisa Aduana y Documentación

**GIVEN** un visitante abre el servicio de Aduana y Documentación
**WHEN** lee su descripción y bullets
**THEN** no encuentra ninguna mención a "OEA" y ve el bullet de documentos con DUS, DIN, certificados de origen y fumigación

### Scenario: Visitante revisa Almacenaje

**GIVEN** un visitante abre el servicio de Almacenaje
**WHEN** lee su descripción y bullets
**THEN** ve "Bodegaje de carga general" como descripción y solo los bullets Bodegaje, Desconsolidado y Consolidado de contenedores

### Scenario: Visitante revisa Consultoría Logística

**GIVEN** un visitante abre el servicio de Consultoría Logística
**WHEN** lee sus bullets
**THEN** no encuentra ninguna mención a un KPI dashboard mensual

### Scenario: Visitante revisa Ruta Medio Oriente

**GIVEN** un visitante abre el servicio de Ruta Medio Oriente
**WHEN** lee sus bullets
**THEN** ve únicamente "Llevamos tu negocio al medio oriente" y "Servicio Broker"

## Acceptance Criteria

- [x] Los 6 servicios revisados muestran el contenido exacto especificado, en los 3 idiomas
- [x] Ningún bullet retirado aparece en ningún idioma
- [x] Ninguna mención a "OEA", "KPI dashboard" o "negociación de tarifas por contrato" persiste en estos servicios
