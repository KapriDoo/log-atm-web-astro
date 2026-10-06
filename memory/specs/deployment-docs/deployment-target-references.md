---
type: capability-spec
title: "El destino de despliegue se nombra como Cloudflare Workers"
capability: "deployment-docs"
slug: "deployment-target-references"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: low
depends_on: []
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 5be9818
mr: ""
acceptance_criteria:
  - "[x] Ningún comentario ni archivo de configuración del proyecto nombra a Cloudflare Pages como destino de despliegue"
  - "[x] El archivo de ejemplo de credenciales y la configuración del sitio nombran a Cloudflare Workers como destino"

related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/astro.config.mjs"
  - "log-atm-web-astro/.dev.vars.example"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# El destino de despliegue se nombra como Cloudflare Workers

## Purpose

Producción se despliega en Cloudflare Workers. Un comentario que nombra Cloudflare Pages induce a configurar credenciales o variables en el lugar equivocado del dashboard. Cada mención al destino de despliegue nombra la plataforma real.

## Requirements

- El sistema SHALL nombrar a Cloudflare Workers como destino de despliegue en los comentarios y archivos de configuración del proyecto.
- El sistema MUST NOT contener menciones a Cloudflare Pages como destino de despliegue en comentarios ni configuración del proyecto.

## Scenarios

### Scenario: Persona configura credenciales para producción

**GIVEN** una persona que abre el archivo de ejemplo de credenciales
**WHEN** lee dónde configurar los valores de producción
**THEN** el comentario nombra Cloudflare Workers como plataforma

### Scenario: Persona revisa la configuración del sitio

**GIVEN** una persona que lee la configuración del sitio
**WHEN** busca el destino de despliegue
**THEN** el comentario nombra Cloudflare Workers

## Acceptance Criteria

- [x] Ningún comentario ni archivo de configuración del proyecto nombra a Cloudflare Pages como destino de despliegue
- [x] El archivo de ejemplo de credenciales y la configuración del sitio nombran a Cloudflare Workers como destino

## Related

- [[readme-deployment-and-local-container]] — documentación del despliegue real
