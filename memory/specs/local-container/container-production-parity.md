---
type: capability-spec
title: "Contenedor local que se comporta como producción"
capability: "local-container"
slug: "container-production-parity"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 6ff4c84
mr: ""
acceptance_criteria:
  - "[x] Con el contenedor en ejecución, la portada responde con éxito en español, inglés y portugués, tanto en la dirección de bucle local IPv4 como en `localhost`"
  - "[x] Una ruta inexistente en español, inglés y portugués responde «no encontrado» y no la portada"
  - "[x] Un envío de contacto con datos inválidos recibe una respuesta de validación en formato estructurado, no una página del sitio"
  - "[x] El contenedor se ejecuta sin privilegios de administrador del equipo"

related:
  - "[[i18n-routing/i18n-not-found-localized]]"
affects:
  - "[[container-build-run-commands]]"
  - "[[container-secrets-isolation]]"
adrs:
  - "[[0007-not-found-page-on-demand-single]]"
scope:
  - "log-atm-web-astro/Containerfile"
  - "log-atm-web-astro/.containerignore"
  - "log-atm-web-astro/package.json"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# Contenedor local que se comporta como producción

## Purpose

Quien desarrolla necesita ver el sitio en su equipo tal como lo sirve producción: con las mismas páginas, la misma API de contacto y las mismas respuestas de «no encontrado». Un servidor estático que devuelve la portada ante cualquier ruta oculta errores reales y omite la API. El contenedor local, ejecutado sin privilegios de administrador, reproduce el comportamiento de producción para que lo observado en local sea lo que verá el visitante.

## Requirements

- El sistema SHALL ofrecer una forma opcional de ejecutar el sitio completo en un contenedor local sin privilegios de administrador.
- El sistema MUST servir en ese contenedor las páginas en español, inglés y portugués y el servicio de envío del formulario de contacto, con el mismo comportamiento que en producción.
- El sistema MUST responder «no encontrado» a las rutas inexistentes de cada idioma, sin sustituirlas por la portada.
- El sistema MUST responder a las peticiones inválidas del formulario de contacto con una respuesta de validación estructurada.
- El sistema SHALL ser accesible desde el navegador del equipo local usando `localhost` y la dirección de bucle local IPv4.
- El sistema SHOULD mantener la versión de Node del contenedor alineada con la mínima que exige el proyecto.

## Scenarios

### Scenario: Desarrollador abre el sitio en cada idioma

**GIVEN** el contenedor local está en ejecución
**WHEN** el desarrollador abre la portada en español, inglés y portugués desde su navegador mediante `localhost`
**THEN** cada portada se muestra correctamente

### Scenario: Ruta inexistente

**GIVEN** el contenedor local está en ejecución
**WHEN** el desarrollador visita una dirección que no existe, sin prefijo de idioma, con prefijo de inglés o con prefijo de portugués
**THEN** recibe la página de «no encontrado» con el código de «no encontrado», no la portada

### Scenario: Formulario de contacto con datos inválidos

**GIVEN** el contenedor local está en ejecución
**WHEN** se envía una solicitud de contacto con datos incompletos
**THEN** la respuesta indica un error de validación en formato estructurado y el sitio no devuelve una página HTML

### Scenario: Equipo sin privilegios de administrador

**GIVEN** un desarrollador sin privilegios de administrador en su equipo
**WHEN** construye y ejecuta el contenedor
**THEN** ambas operaciones se completan sin solicitar elevación de privilegios

## Acceptance Criteria

- [x] Con el contenedor en ejecución, la portada responde con éxito en español, inglés y portugués, tanto en la dirección de bucle local IPv4 como en `localhost`
- [x] Una ruta inexistente en español, inglés y portugués responde «no encontrado» y no la portada
- [x] Un envío de contacto con datos inválidos recibe una respuesta de validación en formato estructurado, no una página del sitio
- [x] El contenedor se ejecuta sin privilegios de administrador del equipo

## Related

- [[i18n-routing/i18n-not-found-localized]] — comportamiento de las páginas de «no encontrado» por idioma que el contenedor reproduce
