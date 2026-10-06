---
type: capability-spec
title: "El perfil del proyecto lista los comandos de verificación"
capability: "project-verification"
slug: "profile-verification-commands"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[type-check-zero-errors]]"
  - "[[a11y-audit-real-browser-coverage]]"
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 10a8e07
  - 68b9a0e
mr: ""
acceptance_criteria:
  - "[ ] El perfil del proyecto lista el comando de verificación de tipos y el de auditoría de accesibilidad entre los comandos de verificación de cada cambio"
  - "[ ] El perfil indica que la verificación de tipos está separada de la compilación"
  - "[ ] El perfil indica que no existe integración continua que ejecute estas verificaciones automáticamente"
  - "[ ] El perfil describe el contenedor local con Podman y el destino de despliegue en Cloudflare Workers"

related:
  - "[[deployment-target-references]]"
affects: []
adrs: []
scope:
  - "memory/_profile.md"
verified_at: null

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# El perfil del proyecto lista los comandos de verificación

## Purpose

El proyecto no tiene integración continua: nada ejecuta las verificaciones de tipos y de accesibilidad salvo quien las invoca. El perfil del proyecto es la fuente que consulta la fase de verificación de cada cambio, de modo que listar allí ambos comandos garantiza que se ejecuten en cada cambio. El perfil también refleja el contenedor local y el destino de despliegue vigentes.

## Requirements

- El perfil del proyecto SHALL listar el comando de verificación de tipos y el de auditoría de accesibilidad como comandos de verificación de cada cambio.
- El perfil MUST indicar que la verificación de tipos está separada de la compilación del sitio.
- El perfil MUST indicar que el proyecto no tiene integración continua que ejecute las verificaciones.
- El perfil SHALL describir el contenedor local con Podman y Cloudflare Workers como destino de despliegue.

## Scenarios

### Scenario: Fase de verificación consulta el perfil

**GIVEN** un cambio que llega a su fase de verificación
**WHEN** la fase consulta los comandos de verificación del perfil del proyecto
**THEN** encuentra la verificación de tipos y la auditoría de accesibilidad entre ellos

### Scenario: Persona consulta cómo se ejecuta el sitio

**GIVEN** una persona que lee el perfil del proyecto
**WHEN** busca el destino de despliegue y las opciones de contenedor
**THEN** encuentra Cloudflare Workers como destino y el contenedor local con Podman

## Acceptance Criteria

- [ ] El perfil del proyecto lista el comando de verificación de tipos y el de auditoría de accesibilidad entre los comandos de verificación de cada cambio
- [ ] El perfil indica que la verificación de tipos está separada de la compilación
- [ ] El perfil indica que no existe integración continua que ejecute estas verificaciones automáticamente
- [ ] El perfil describe el contenedor local con Podman y el destino de despliegue en Cloudflare Workers

## Related

- [[type-check-zero-errors]] — comando de verificación de tipos
- [[a11y-audit-real-browser-coverage]] — comando de auditoría de accesibilidad
- [[deployment-target-references]] — nombre del destino de despliegue
