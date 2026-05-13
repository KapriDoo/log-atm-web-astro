---
type: capability-spec
title: "Estructura y paridad de los diccionarios de traducción"
capability: "i18n-translations"
slug: "i18n-translations-json-structure"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[i18n-core-translation-helpers]]"
change_ref: "[[rescue-multi-language-support]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "Existen seis diccionarios (es, en, zh, hi, ar, pt) con exactamente el mismo conjunto de claves."
  - "El diccionario en español incluye todos los textos visibles en el sitio actual, alineados con la pasada UX writing más reciente."
  - "El proceso de build falla cuando un diccionario tiene claves faltantes o sobrantes respecto al español."
related:
  - "[[i18n-core-translation-helpers]]"
  - "[[i18n-translations-build-validation]]"
affects: []
adrs:
  - "[[0003-i18n-key-validation-build-hook]]"
scope:
  - "log-atm-web-astro/src/i18n/translations/"
verified_at: null
created: "2026-05-12"
updated: "2026-05-12"
tags: [capability-spec, i18n, content]
---

# Estructura y paridad de los diccionarios de traducción

## Purpose

El equipo de contenido y el equipo de desarrollo deben poder agregar, modificar y traducir textos del sitio sin romper la integridad: cualquier clave declarada en el idioma maestro (español) debe existir en los otros cinco idiomas y viceversa.

## Requirements

- El sistema SHALL contener un diccionario por cada idioma soportado: español, inglés, chino, hindi, árabe y portugués.
- El sistema SHALL tratar el diccionario en español como maestro: ninguna clave puede existir en otro idioma sin estar también en español.
- El sistema SHALL organizar las claves por áreas de negocio en namespaces (al menos: navegación, footer, home, servicios, industrias, nosotros, contacto, cotizar, comunes, accesibilidad).
- El sistema SHALL incluir, al cierre de este cambio, todos los textos visibles del sitio vigente (incluyendo los refinamientos de UX writing aplicados en la última pasada).
- El sistema SHALL preservar la paridad estructural de claves entre los seis diccionarios; las traducciones que falten contenido real pueden quedar provisionales pero deben existir.

## Scenarios

### Scenario: El equipo añade un nuevo texto al sitio

**GIVEN** un desarrollador que agrega una clave nueva al diccionario en español
**WHEN** ejecuta el build del sitio sin actualizar los otros diccionarios
**THEN** el build falla indicando qué clave falta en qué idiomas

### Scenario: Una traducción quedó huérfana

**GIVEN** un diccionario en chino que conserva una clave eliminada del maestro
**WHEN** se ejecuta el build
**THEN** el build falla indicando la clave sobrante en chino

### Scenario: Un visitante navega tras la pasada UX writing

**GIVEN** un visitante en cualquier página del sitio en español
**WHEN** lee los CTAs, headings, aria-labels y mensajes de formulario
**THEN** ve exactamente el microcopy refinado en la última pasada de UX writing (no el original anterior al refinamiento)

## Acceptance Criteria

- [ ] Los seis diccionarios tienen el mismo conjunto exacto de claves.
- [ ] El diccionario maestro español refleja el microcopy actual del código (no copias antiguas).
- [ ] El build falla local y en CI cuando hay desbalance de claves entre diccionarios.
- [ ] Los namespaces declarados existen en al menos un namespace por área de negocio enumerada.

## Related

- [[i18n-core-translation-helpers]] — consumidor de los diccionarios
- [[i18n-translations-build-validation]] — validación bloqueante en build
