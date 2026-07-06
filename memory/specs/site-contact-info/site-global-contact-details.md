---
type: capability-spec
title: "Teléfono y email de contacto vigentes en todo el sitio"
capability: "site-contact-info"
slug: "site-global-contact-details"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[content-cleanup-mensajes]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/content-cleanup-mensajes/log-atm-web-astro"
feature_branch: "feature/content-cleanup-mensajes"
commits: ["ffaa4c8"]
mr: ""
acceptance_criteria:
  - "[x] El teléfono de contacto mostrado en cualquier página del sitio es '+56 9 8270 8492'"
  - "[x] El email de contacto mostrado en cualquier página del sitio es 'contacto@logatm.com'"
  - "[x] El teléfono y email vigentes aparecen también en los datos estructurados (JSON-LD) del sitio"
  - "[x] Ningún documento del proyecto (README, documentación) referencia el teléfono o email anteriores"
related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/lib/constants.ts"
  - "log-atm-web-astro/src/layouts/BaseLayout.astro"
  - "log-atm-web-astro/README.md"
  - "log-atm-web-astro/docs/project-brief.md"
verified_at: "2026-07-05"
created: "2026-07-05"
updated: "2026-07-05"
tags: [capability-spec]
---

# Teléfono y email de contacto vigentes en todo el sitio

## Purpose

El sitio muestra un teléfono y un email de contacto que ya no corresponden al canal vigente de la empresa. Esta spec establece que todo el sitio — incluidos los datos estructurados que consumen buscadores — debe mostrar el teléfono y el email vigentes de forma consistente, sin rastros de los anteriores.

## Requirements

- El sistema SHALL mostrar el teléfono "+56 9 8270 8492" como único teléfono de contacto en todo el sitio.
- El sistema SHALL mostrar el email "contacto@logatm.com" como único email de contacto en todo el sitio.
- El sistema SHALL reflejar el teléfono y el email vigentes en los datos estructurados (JSON-LD) que describen el negocio ante buscadores.
- El sistema SHALL no dejar ningún rastro del teléfono o email anteriores en ninguna página, componente o documento del proyecto.
- El sistema SHALL mostrar el mismo teléfono y email vigentes independientemente del idioma en que se navegue el sitio.

## Scenarios

### Scenario: Visitante busca el teléfono de contacto

**GIVEN** un visitante navega a cualquier página del sitio que muestre datos de contacto (pie de página, página de Contacto)
**WHEN** busca el teléfono de la empresa
**THEN** ve "+56 9 8270 8492" y no ve ningún teléfono anterior

### Scenario: Visitante busca el email de contacto

**GIVEN** un visitante navega a cualquier página del sitio que muestre datos de contacto
**WHEN** busca el email de la empresa
**THEN** ve "contacto@logatm.com" y no ve ningún email anterior

### Scenario: Un buscador indexa los datos estructurados del sitio

**GIVEN** un motor de búsqueda procesa los datos estructurados (schema.org) de cualquier página del sitio
**WHEN** extrae el teléfono y el email del negocio
**THEN** obtiene el teléfono y el email vigentes, no los anteriores

## Acceptance Criteria

- [x] El teléfono "+56 9 8270 8492" aparece en todas las superficies de contacto del sitio (pie de página, página de contacto, datos estructurados)
- [x] El email "contacto@logatm.com" aparece en todas las superficies de contacto del sitio
- [x] Ningún teléfono o email anterior aparece en el código, la documentación del repositorio o los datos estructurados
