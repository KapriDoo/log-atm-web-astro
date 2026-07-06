---
type: capability-spec
title: "Proceso 'Cómo trabajamos' sin promesas de tiempo ni certificaciones"
capability: "content-services"
slug: "services-how-we-work-process"
domain: "feature"
delta_type: null
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
  - "[x] El paso 3 (Cotización) no menciona un plazo de '24h' ni ningún otro plazo finito"
  - "[x] El paso 5 (Aduana) no menciona 'OEA'"
  - "[x] El paso 6 (Entrega) dice 'Entrega de carga en bodega y cierre documental del proceso aduanero', sin mencionar última milla ni KPIs"
  - "[x] Ningún paso de la sección menciona KPI, OEA o un compromiso de tiempo finito"
related:
  - "[[ui-contrast/services-process-step-title-contrast]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/i18n/translations/es.json"
  - "log-atm-web-astro/src/i18n/translations/en.json"
  - "log-atm-web-astro/src/i18n/translations/pt.json"
  - "log-atm-web-astro/src/pages/servicios.astro"
verified_at: null
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Proceso "Cómo trabajamos" sin promesas de tiempo ni certificaciones

## Purpose

La sección "Cómo trabajamos" del catálogo de servicios (6 pasos: Diagnóstico, Diseño de ruta, Cotización, Ejecución, Aduana, Entrega) contiene un compromiso de tiempo finito, una mención a una certificación que la empresa no exhibe como parte de este flujo, y referencias a indicadores internos que no aportan al visitante. Esta spec retira esas menciones y fija el texto final del paso de entrega.

## Requirements

- El sistema SHALL no mencionar "24h" ni ningún otro plazo de tiempo finito en el paso de Cotización (paso 3).
- El sistema SHALL no mencionar "OEA" en el paso de Aduana (paso 5).
- El sistema SHALL mostrar en el paso de Entrega (paso 6) el texto "Entrega de carga en bodega y cierre documental del proceso aduanero".
- El sistema SHALL no mencionar "última milla" ni "KPIs" en el paso de Entrega.
- El sistema SHALL no mencionar KPI, OEA, ni ningún compromiso de tiempo finito en ningún paso de esta sección.
- El sistema SHALL aplicar estos cambios de forma idéntica en español, inglés y portugués.

## Scenarios

### Scenario: Visitante lee el paso de Cotización

**GIVEN** un visitante llega a la sección "Cómo trabajamos" del catálogo de servicios
**WHEN** lee el paso de Cotización
**THEN** no encuentra ninguna promesa de tiempo de respuesta expresada en horas

### Scenario: Visitante lee el paso de Aduana

**GIVEN** un visitante recorre los 6 pasos del proceso
**WHEN** llega al paso de Aduana
**THEN** no ve ninguna mención a "OEA"

### Scenario: Visitante lee el paso de Entrega

**GIVEN** un visitante recorre los 6 pasos del proceso
**WHEN** llega al último paso
**THEN** lee "Entrega de carga en bodega y cierre documental del proceso aduanero", sin mención a última milla ni a KPIs

### Scenario: Visitante recorre toda la sección

**GIVEN** un visitante lee los 6 pasos completos
**WHEN** termina de leer la sección
**THEN** no encontró en ningún paso una mención a KPI, OEA o un plazo de tiempo finito

## Acceptance Criteria

- [x] El paso 3 no contiene "24h" ni equivalentes en ningún idioma
- [x] El paso 5 no contiene "OEA" en ningún idioma
- [x] El paso 6 dice exactamente "Entrega de carga en bodega y cierre documental del proceso aduanero" (o su traducción fiel) en los 3 idiomas
- [x] Ningún paso de la sección menciona KPI, OEA o tiempos finitos
