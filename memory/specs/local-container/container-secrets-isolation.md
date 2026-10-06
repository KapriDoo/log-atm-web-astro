---
type: capability-spec
title: "Las credenciales nunca forman parte de la imagen del contenedor"
capability: "local-container"
slug: "container-secrets-isolation"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[container-production-parity]]"
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 6ff4c84
mr: ""
acceptance_criteria:
  - "[ ] La construcción de la imagen con un archivo de credenciales de prueba presente en el proyecto no deja ese valor en el historial de capas, en los metadatos ni en el sistema de archivos de la imagen"
  - "[ ] Con el archivo de credenciales de prueba montado en modo solo lectura al ejecutar el contenedor, el servicio de contacto recibe el valor de la credencial de prueba"
  - "[ ] Ejecutar el contenedor sin el archivo de credenciales local falla con un error visible y no deja un sitio en ejecución"

related:
  - "[[forms-email/quote-email-delivery]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/.containerignore"
  - "log-atm-web-astro/Containerfile"
  - "log-atm-web-astro/package.json"
  - "log-atm-web-astro/.dev.vars.example"
verified_at: null

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# Las credenciales nunca forman parte de la imagen del contenedor

## Purpose

El envío de correos del formulario de contacto usa una credencial de correo que vive en un archivo local del desarrollador. Si ese archivo se copia a la imagen al construirla, cualquiera que reciba o inspeccione la imagen obtiene la credencial. La credencial llega al contenedor únicamente al ejecutarlo, desde el equipo del desarrollador, y nunca queda grabada en la imagen.

## Requirements

- El sistema MUST excluir de la construcción de la imagen todo archivo de credenciales locales del desarrollador, conservando únicamente el archivo de ejemplo sin valores reales.
- El sistema MUST entregar las credenciales al contenedor solo en el momento de ejecutarlo, desde el archivo local del desarrollador y en modo solo lectura.
- El sistema MUST dejar la imagen libre de cualquier valor de credencial, tanto en su historial de construcción como en sus metadatos y en su contenido.
- El sistema SHALL excluir también de la construcción las dependencias instaladas, los resultados de compilaciones previas y el navegador local de pruebas, para mantener el contexto de construcción acotado.
- El sistema SHOULD fallar de forma visible cuando el archivo de credenciales no existe al ejecutar el contenedor, en lugar de arrancar sin credenciales.

## Scenarios

### Scenario: Construcción con credenciales locales presentes

**GIVEN** el desarrollador tiene un archivo de credenciales locales con un valor secreto en su proyecto
**WHEN** construye la imagen del contenedor
**THEN** una inspección del historial, de los metadatos y del contenido de la imagen no encuentra ese valor secreto

### Scenario: Ejecución con credenciales del desarrollador

**GIVEN** una imagen construida y el archivo de credenciales locales del desarrollador
**WHEN** el desarrollador ejecuta el contenedor entregándole ese archivo en modo solo lectura
**THEN** el servicio de contacto dispone de la credencial y puede intentar el envío de correo con ella

### Scenario: Ejecución sin archivo de credenciales

**GIVEN** un desarrollador que no creó su archivo de credenciales a partir del ejemplo
**WHEN** intenta ejecutar el contenedor
**THEN** la ejecución falla con un error visible y no arranca un sitio sin credenciales

## Acceptance Criteria

- [ ] La construcción de la imagen con un archivo de credenciales de prueba presente en el proyecto no deja ese valor en el historial de capas, en los metadatos ni en el sistema de archivos de la imagen
- [ ] Con el archivo de credenciales de prueba montado en modo solo lectura al ejecutar el contenedor, el servicio de contacto recibe el valor de la credencial de prueba
- [ ] Ejecutar el contenedor sin el archivo de credenciales local falla con un error visible y no deja un sitio en ejecución

## Related

- [[forms-email/quote-email-delivery]] — entrega de correo que consume la credencial
- [[container-production-parity]] — comportamiento del contenedor que recibe las credenciales
