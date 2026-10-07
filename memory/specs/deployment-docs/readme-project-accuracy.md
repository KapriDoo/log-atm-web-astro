---
type: capability-spec
title: "El README refleja el stack y los comandos de verificación reales"
capability: "deployment-docs"
slug: "readme-project-accuracy"
domain: "migration"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: low
depends_on:
  - "[[type-check-zero-errors]]"
  - "[[a11y-audit-real-browser-coverage]]"
change_ref: "[[chore-local-container-podman]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-local-container-podman"
feature_branch: "feature/chore-local-container-podman"
commits:
  - 928caa0
mr: ""
acceptance_criteria:
  - "[x] El README documenta los comandos de verificación de tipos, de auditoría de accesibilidad, de medición de imágenes y de chequeo de enlaces i18n, con qué hace cada uno"
  - "[x] El README no menciona Potrace ni dependencias que el proyecto no usa"
  - "[x] La versión de Astro que declara el README coincide con la que declara el proyecto"

related:
  - "[[readme-deployment-and-local-container]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/README.md"
verified_at: "2026-10-06"

created: "2026-10-06"
updated: "2026-10-06"
tags: [capability-spec]
---

# El README refleja el stack y los comandos de verificación reales

## Purpose

Un README con herramientas que el proyecto no usa o con comandos sin documentar lleva a quien lo lee a buscar lo que no existe y a ignorar lo que sí. El README presenta el stack vigente y todos los comandos de verificación disponibles para que cada persona sepa cómo comprobar sus cambios.

## Requirements

- El README SHALL documentar los comandos de verificación de tipos, de auditoría de accesibilidad, de medición de imágenes y de chequeo de enlaces i18n, indicando la finalidad de cada uno.
- El README MUST NOT listar Potrace ni dependencias que el proyecto no emplea.
- El README MUST declarar la versión de Astro vigente del proyecto.
- El README SHOULD indicar que la auditoría de accesibilidad requiere un navegador provisto por quien la ejecuta.

## Scenarios

### Scenario: Persona busca cómo verificar su cambio

**GIVEN** una persona que modificó el sitio
**WHEN** consulta la sección de comandos del README
**THEN** encuentra los comandos para verificar tipos, accesibilidad, peso de imágenes y enlaces de idiomas, cada uno con su propósito

### Scenario: Persona revisa el stack

**GIVEN** una persona que lee la tabla de tecnologías del README
**WHEN** compara cada entrada con las dependencias reales del proyecto
**THEN** todas las entradas existen en el proyecto y la versión de Astro coincide

## Acceptance Criteria

- [x] El README documenta los comandos de verificación de tipos, de auditoría de accesibilidad, de medición de imágenes y de chequeo de enlaces i18n, con qué hace cada uno
- [x] El README no menciona Potrace ni dependencias que el proyecto no usa
- [x] La versión de Astro que declara el README coincide con la que declara el proyecto

## Related

- [[readme-deployment-and-local-container]] — documentación de despliegue en el mismo README
- [[type-check-zero-errors]] — comando de verificación de tipos
- [[a11y-audit-real-browser-coverage]] — comando de auditoría de accesibilidad
