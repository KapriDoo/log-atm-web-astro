---
type: capability-spec
title: "Construir y ejecutar el contenedor con un comando cada uno"
capability: "local-container"
slug: "container-build-run-commands"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[container-production-parity]]"
  - "[[container-secrets-isolation]]"
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 6ff4c84
mr: ""
acceptance_criteria:
  - "[x] Un único comando del proyecto construye la imagen y otro único comando la ejecuta y publica el sitio en el puerto 4321"
  - "[x] El comando de ejecución localiza el archivo de credenciales por su ubicación absoluta, sin depender del directorio desde el que se invoca"
  - "[x] Tras reconstruir la imagen y volver a ejecutar el contenedor, el sitio responde con éxito, sin necesidad de pasos manuales adicionales"

related: []
affects:
  - "[[readme-deployment-and-local-container]]"
  - "[[static-server-container-removal]]"
adrs: []
scope:
  - "log-atm-web-astro/package.json"
  - "log-atm-web-astro/Containerfile"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# Construir y ejecutar el contenedor con un comando cada uno

## Purpose

Quien quiere ver el sitio en un contenedor local necesita un camino corto y repetible: construir la imagen y ejecutarla, sin armar a mano opciones de red, puertos ni archivos de credenciales. Un único camino, con un comando por paso, reduce los errores y deja el flujo documentable en una línea.

## Requirements

- El sistema SHALL ofrecer un comando único para construir la imagen del contenedor local.
- El sistema SHALL ofrecer un comando único para ejecutar el contenedor, que publique el sitio en el puerto 4321 del equipo y entregue las credenciales locales en modo solo lectura.
- El sistema MUST producir, tras reconstruir y volver a ejecutar, un sitio que responde con éxito sin pasos manuales intermedios.
- El sistema SHALL ofrecer un único camino de ejecución del contenedor, sin alternativas paralelas ni servicios adicionales.

## Scenarios

### Scenario: Primera ejecución

**GIVEN** un desarrollador con su archivo de credenciales locales creado a partir del ejemplo
**WHEN** ejecuta el comando de construcción y luego el comando de ejecución
**THEN** el sitio queda disponible en el puerto 4321 de su equipo

### Scenario: Reconstrucción tras cambios

**GIVEN** un contenedor ya ejecutado antes y cambios posteriores en el código del sitio
**WHEN** el desarrollador reconstruye la imagen y vuelve a ejecutar el contenedor
**THEN** el sitio responde con éxito y refleja los cambios

## Acceptance Criteria

- [x] Un único comando del proyecto construye la imagen y otro único comando la ejecuta y publica el sitio en el puerto 4321
- [x] El comando de ejecución localiza el archivo de credenciales por su ubicación absoluta, sin depender del directorio desde el que se invoca
- [x] Tras reconstruir la imagen y volver a ejecutar el contenedor, el sitio responde con éxito, sin necesidad de pasos manuales adicionales

## Related

- [[container-production-parity]] — comportamiento del sitio que el contenedor sirve
- [[container-secrets-isolation]] — entrega de credenciales en la ejecución
