---
type: capability-spec
title: "El repositorio no contiene el contenedor de servidor estático"
capability: "local-container"
slug: "static-server-container-removal"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[container-build-run-commands]]"
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 0809264
mr: ""
acceptance_criteria:
  - "[ ] El repositorio no contiene ninguna definición de imagen, configuración de servidor web estático ni archivo de orquestación que sirva el sitio como contenido estático"
  - "[ ] El repositorio no contiene el script de redirección de puertos de Windows hacia WSL2"
  - "[ ] Ningún archivo del repositorio referencia los archivos retirados"

related: []
affects: []
adrs: []
scope:
  - "log-atm-web-astro/Dockerfile"
  - "log-atm-web-astro/nginx.conf"
  - "log-atm-web-astro/default.conf"
  - "docker-compose.yml"
  - "fix-wsl2-port.bat"
verified_at: null

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# El repositorio no contiene el contenedor de servidor estático

## Purpose

Producción ejecuta el sitio en Cloudflare Workers, con API y respuestas reales de «no encontrado». Un contenedor que sirve solo archivos estáticos con un servidor web genérico muestra un sitio distinto: sin API y con la portada como respuesta a cualquier ruta. Mantenerlo junto al contenedor que reproduce producción confunde sobre cuál usar. El repositorio conserva un único camino de contenedor local.

## Requirements

- El sistema SHALL contener un único contenedor local, el que reproduce el comportamiento de producción.
- El sistema MUST NOT incluir definiciones de imagen, configuraciones de servidor web estático ni archivos de orquestación de servicios que sirvan el sitio como contenido estático.
- El sistema MUST NOT incluir el script de redirección de puertos de Windows hacia WSL2, cuyo funcionamiento depende de una distribución fija y que ninguna documentación referencia.
- El sistema MUST NOT contener referencias a los archivos retirados desde ningún otro archivo.

## Scenarios

### Scenario: Desarrollador busca cómo ejecutar el sitio en contenedor

**GIVEN** un desarrollador que explora el repositorio
**WHEN** busca definiciones de contenedor, archivos de orquestación o configuraciones de servidor web
**THEN** encuentra únicamente la definición del contenedor que reproduce producción

### Scenario: Referencias a lo retirado

**GIVEN** el repositorio con los archivos del servidor estático retirados
**WHEN** se busca en la documentación y en los scripts cualquier mención a ellos
**THEN** no se encuentra ninguna

## Acceptance Criteria

- [ ] El repositorio no contiene ninguna definición de imagen, configuración de servidor web estático ni archivo de orquestación que sirva el sitio como contenido estático
- [ ] El repositorio no contiene el script de redirección de puertos de Windows hacia WSL2
- [ ] Ningún archivo del repositorio referencia los archivos retirados

## Related

- [[container-build-run-commands]] — el camino único que permanece
