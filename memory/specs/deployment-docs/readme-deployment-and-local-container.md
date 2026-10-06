---
type: capability-spec
title: "El README describe el despliegue real y el contenedor local"
capability: "deployment-docs"
slug: "readme-deployment-and-local-container"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[container-build-run-commands]]"
  - "[[container-secrets-isolation]]"
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 6a738a2
mr: ""
acceptance_criteria:
  - "[ ] El README declara el destino de despliegue como «Cloudflare Workers (producción) · Podman (local, opcional)» y describe el despliegue por integración git con Workers Builds"
  - "[ ] El README documenta los comandos para construir y ejecutar el contenedor, el requisito previo de crear el archivo de credenciales a partir del ejemplo y el aviso del tamaño aproximado de la imagen"
  - "[ ] El README documenta la limitación de la vista previa local sin contenedor (error 500 tras reconstruir sin reiniciar) y que el contenedor la evita"
  - "[ ] El README indica cómo acceder desde la red local o desde un móvil cuando el equipo corre en WSL2"
  - "[ ] El README no contiene datos del dashboard de Cloudflare marcados como pendientes ni marcadores de tarea (TODO, «a confirmar»)"
  - "[ ] El README no menciona Docker, nginx ni `docker compose`"

related:
  - "[[container-production-parity]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/README.md"
verified_at: null

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# El README describe el despliegue real y el contenedor local

## Purpose

Quien se incorpora al proyecto lee el README para saber cómo llega el sitio a producción y cómo probarlo en su equipo. La documentación describe el flujo verificado: producción se despliega en Cloudflare Workers mediante la integración git con Workers Builds, y localmente existe un contenedor opcional con Podman. Los datos de configuración del dashboard que nadie pudo verificar no forman parte del README: se declaran en el Merge Request.

## Requirements

- El README SHALL declarar el destino de despliegue como «Cloudflare Workers (producción) · Podman (local, opcional)».
- El README MUST describir el despliegue a producción como integración git con Workers Builds, el único flujo verificado.
- El README MUST documentar los comandos de construcción y ejecución del contenedor local y el requisito previo de crear el archivo de credenciales a partir del ejemplo, sin el cual la ejecución falla.
- El README SHALL advertir que la imagen pesa aproximadamente 866 MB y que ese tamaño es aceptable para uso local opcional.
- El README MUST documentar la limitación de la vista previa local sin contenedor, que responde con error 500 tras reconstruir sin reiniciar, e indicar que el contenedor la evita.
- El README SHALL indicar que, para acceder al sitio desde la red local o desde un móvil cuando el equipo corre en WSL2, el modo de red espejo del archivo de configuración de WSL es el camino.
- El README MUST NOT presentar datos del dashboard de Cloudflare como pendientes de confirmar: comando de build, comando de deploy, directorio raíz, nombre del Worker y versión de Node quedan fuera del README.
- El README MUST NOT mencionar Docker, nginx ni `docker compose`.

## Scenarios

### Scenario: Persona nueva busca cómo se despliega

**GIVEN** una persona que abre el README por primera vez
**WHEN** busca cómo llega el sitio a producción
**THEN** encuentra que se despliega en Cloudflare Workers mediante la integración git con Workers Builds, sin datos pendientes de confirmar

### Scenario: Persona quiere probar el sitio en contenedor

**GIVEN** una persona con Podman instalado
**WHEN** sigue la sección del contenedor local del README
**THEN** sabe crear su archivo de credenciales, construir la imagen, ejecutarla y abrir el sitio en el puerto 4321, y conoce el tamaño aproximado de la imagen

### Scenario: Error 500 en la vista previa local

**GIVEN** una persona que usa la vista previa local sin contenedor y reconstruye el sitio sin reiniciarla
**WHEN** el sitio responde con error 500
**THEN** el README le explica la causa y le indica reiniciar la vista previa o usar el contenedor

### Scenario: Acceso desde un móvil

**GIVEN** una persona que desarrolla en WSL2 y quiere abrir el sitio desde su móvil
**WHEN** consulta la documentación del contenedor local
**THEN** encuentra la indicación del modo de red espejo de WSL

## Acceptance Criteria

- [ ] El README declara el destino de despliegue como «Cloudflare Workers (producción) · Podman (local, opcional)» y describe el despliegue por integración git con Workers Builds
- [ ] El README documenta los comandos para construir y ejecutar el contenedor, el requisito previo de crear el archivo de credenciales a partir del ejemplo y el aviso del tamaño aproximado de la imagen
- [ ] El README documenta la limitación de la vista previa local sin contenedor (error 500 tras reconstruir sin reiniciar) y que el contenedor la evita
- [ ] El README indica cómo acceder desde la red local o desde un móvil cuando el equipo corre en WSL2
- [ ] El README no contiene datos del dashboard de Cloudflare marcados como pendientes ni marcadores de tarea (TODO, «a confirmar»)
- [ ] El README no menciona Docker, nginx ni `docker compose`

## Related

- [[container-production-parity]] — comportamiento del contenedor que se documenta
- [[container-secrets-isolation]] — requisito previo del archivo de credenciales
