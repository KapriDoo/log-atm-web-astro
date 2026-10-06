---
type: capability-spec
title: "La verificación de tipos del sitio termina sin errores"
capability: "type-check"
slug: "type-check-zero-errors"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 9122439
  - 69df563
mr: ""
acceptance_criteria:
  - "[x] Un comando único del proyecto ejecuta la verificación de tipos de todo el sitio"
  - "[x] Ese comando termina con 0 errores sobre el código del repositorio"
  - "[x] Los cuatro errores de tipos existentes se corrigen en su origen, sin suprimirlos con comentarios de omisión ni excluir archivos de la verificación"
  - "[x] Un error de tipos introducido a propósito hace que el comando termine con código de salida distinto de cero"
  - "[x] Una instalación de dependencias desde cero no reporta incompatibilidad de versiones entre la herramienta de verificación y el lenguaje de tipado"

related: []
affects:
  - "[[profile-verification-commands]]"
  - "[[readme-project-accuracy]]"
  - "[[type-check-build-independence]]"
adrs: []
scope:
  - "log-atm-web-astro/package.json"
  - "log-atm-web-astro/astro.config.mjs"
  - "log-atm-web-astro/src/lib/mailer.ts"
  - "log-atm-web-astro/src/scripts/gsap-ind-directory.ts"
  - "log-atm-web-astro/src/types/"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# La verificación de tipos del sitio termina sin errores

## Purpose

El proceso de compilación del sitio no revisa tipos, de modo que los errores de tipado pasan inadvertidos hasta que alguien los encuentra por casualidad. Un comando de verificación de tipos que termina limpio le da a cada cambio una comprobación objetiva y reproducible, y un estado inicial en cero errores permite detectar al instante cualquier regresión.

## Requirements

- El sistema SHALL ofrecer un comando único que verifique los tipos de todo el código del sitio.
- El sistema MUST terminar ese comando con 0 errores sobre el código del repositorio.
- El sistema MUST corregir los errores de tipos en su origen, sin ocultarlos mediante supresiones ni exclusiones de la verificación.
- El sistema MUST terminar el comando con código de salida distinto de cero cuando existe al menos un error de tipos.
- El sistema SHALL fijar la versión del lenguaje de tipado dentro del rango que soporta la herramienta de verificación.

## Scenarios

### Scenario: Verificación sobre el código vigente

**GIVEN** el código del sitio tal como queda al terminar el cambio
**WHEN** una persona ejecuta el comando de verificación de tipos
**THEN** el comando informa 0 errores y termina con éxito

### Scenario: Cambio que introduce un error de tipos

**GIVEN** un cambio que asigna un valor de tipo incompatible
**WHEN** una persona ejecuta el comando de verificación de tipos
**THEN** el comando informa el error con su ubicación y termina con código de salida distinto de cero

### Scenario: Instalación de dependencias limpia

**GIVEN** un equipo que instala las dependencias del proyecto desde cero
**WHEN** ejecuta el comando de verificación de tipos
**THEN** la herramienta y la versión del lenguaje de tipado resuelven sin advertencias de incompatibilidad

## Acceptance Criteria

- [x] Un comando único del proyecto ejecuta la verificación de tipos de todo el sitio
- [x] Ese comando termina con 0 errores sobre el código del repositorio
- [x] Los cuatro errores de tipos existentes se corrigen en su origen, sin suprimirlos con comentarios de omisión ni excluir archivos de la verificación
- [x] Un error de tipos introducido a propósito hace que el comando termine con código de salida distinto de cero
- [x] Una instalación de dependencias desde cero no reporta incompatibilidad de versiones entre la herramienta de verificación y el lenguaje de tipado

## Related

- [[type-check-build-independence]] — relación entre la verificación y la compilación del sitio
