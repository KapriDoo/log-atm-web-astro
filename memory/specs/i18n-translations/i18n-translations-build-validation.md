---
type: capability-spec
title: "Validación bloqueante de paridad de claves en build"
capability: "i18n-translations"
slug: "i18n-translations-build-validation"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[i18n-translations-json-structure]]"
change_ref: "[[rescue-multi-language-support]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "El comando de build falla con código distinto de cero cuando los diccionarios divergen estructuralmente."
  - "El reporte indica exactamente qué claves faltan o sobran en qué idioma."
  - "La validación corre antes de generar archivos HTML."
related:
  - "[[i18n-translations-json-structure]]"
affects: []
adrs:
  - "[[0003-i18n-key-validation-build-hook]]"
scope:
  - "log-atm-web-astro/scripts/validate-i18n.ts"
  - "log-atm-web-astro/astro.config.mjs"
  - "log-atm-web-astro/package.json"
verified_at: null
created: "2026-05-12"
updated: "2026-05-12"
tags: [capability-spec, i18n, build]
---

# Validación bloqueante de paridad de claves en build

## Purpose

Evitar que el sitio se publique con diccionarios desbalanceados que producirían claves visibles al visitante o textos huérfanos. El build local y el de CI deben ser la última línea de defensa antes de promover el sitio.

## Requirements

- El sistema SHALL ejecutar una validación de paridad de claves entre los seis diccionarios antes de generar el HTML de salida.
- El sistema SHALL hacer fallar el proceso de build cuando alguno de los cinco idiomas no-default tenga claves faltantes o sobrantes respecto al maestro español.
- El sistema SHALL reportar al desarrollador la lista exacta de claves divergentes por idioma cuando la validación falla.
- El sistema SHOULD permitir ejecutar la validación de forma aislada (sin build completo) para iterar rápido.

## Scenarios

### Scenario: Build con diccionarios alineados

**GIVEN** los seis diccionarios con paridad estructural completa
**WHEN** un desarrollador ejecuta el build
**THEN** la validación pasa silenciosamente y el build continúa hasta generar el HTML

### Scenario: Build con clave faltante en portugués

**GIVEN** el diccionario portugués al que se le borró una clave por error
**WHEN** un desarrollador ejecuta el build
**THEN** el build se aborta antes de generar HTML, devuelve código de salida distinto de cero y reporta la clave faltante en portugués

### Scenario: Desarrollador valida sin compilar

**GIVEN** un desarrollador que acaba de modificar diccionarios
**WHEN** ejecuta el comando dedicado de validación
**THEN** obtiene el mismo reporte de divergencias sin necesidad de generar el sitio completo

## Acceptance Criteria

- [ ] `npm run build` falla cuando hay divergencia estructural.
- [ ] El reporte de error indica idioma y clave en cada divergencia.
- [ ] Existe un script ejecutable de validación independiente del build.
- [ ] La validación termina antes del paso de generación de HTML.

## Related

- [[i18n-translations-json-structure]] — definición de la paridad esperada
