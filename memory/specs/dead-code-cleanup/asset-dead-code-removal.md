---
type: capability-spec
title: "Eliminación de assets y módulos sin consumidores del repositorio"
capability: "dead-code-cleanup"
slug: "asset-dead-code-removal"
domain: "refactoring"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[image-multiformat-delivery]]"
  - "[[image-asset-migration]]"
change_ref: "[[optimize-images-webp]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/optimize-images-webp"
feature_branch: "feature/optimize-images-webp"
commits:
  - e6ade3a
mr: ""
acceptance_criteria:
  - "Los 14 archivos JPG de la carpeta src/assets/industries/ han sido eliminados del repositorio"
  - "El archivo src/lib/industryImages.ts ha sido eliminado del repositorio"
  - "El archivo src/assets/logo.svg ha sido eliminado del repositorio"
  - "El sitio construye sin errores (npm run build pasa) después de la eliminación"
  - "Ninguna búsqueda en el código fuente del proyecto encuentra referencias a INDUSTRY_IMAGES, industryImages ni a src/assets/logo.svg"
  - "El peso total del repositorio se reduce en al menos 10 MB respecto al estado previo"

related:
  - "[[image-optimization-pipeline/image-asset-migration]]"
  - "[[image-optimization-pipeline/image-multiformat-delivery]]"
affects: []
adrs:
  - "[[0006-picture-multiformat-content-images]]"
scope:
  - "src/assets/industries/"
  - "src/lib/industryImages.ts"
  - "src/assets/logo.svg"
verified_at: null

created: "2026-05-28"
updated: "2026-05-28"
tags: [capability-spec]
---

# Eliminación de assets y módulos sin consumidores del repositorio

## Purpose

El repositorio contiene tres grupos de archivos que no son referenciados por ningún componente, página ni módulo activo del sitio: 14 imágenes JPG duplicadas en `src/assets/industries/`, un módulo TypeScript que exporta un mapa de esas imágenes (`industryImages.ts`), y un SVG de logo sin referenciadores. Estos archivos suman más de 10 MB de peso en el repositorio sin aportar valor, confunden el inventario de assets del proyecto y podrían ser procesados erróneamente por herramientas de análisis. Esta spec define el resultado esperado tras su eliminación.

## Requirements

- El sistema SHALL eliminar todos los archivos de imagen duplicados en la carpeta de assets de industrias antigua (`src/assets/industries/`) que no son referenciados por ningún componente activo.
- El módulo que exporta el mapa de imágenes de industrias antiguo (`industryImages.ts`) SHALL ser eliminado junto con sus assets, dado que es código muerto sin consumidores.
- El archivo de logo SVG sin referenciadores SHALL ser eliminado del repositorio.
- La eliminación SHALL ejecutarse DESPUÉS de verificar que el build pasa con la migración de assets completada, para garantizar que los archivos a eliminar no tienen consumidores activos.
- El sitio SHALL construir y ejecutarse sin errores tras la eliminación; la ausencia de errores de import constituye la verificación de que los archivos eliminados no tenían consumidores activos.
- El repositorio SHALL reducir su peso total en al menos 10 MB como resultado de esta limpieza.

## Scenarios

### Scenario: Build pasa sin los archivos de código muerto

**GIVEN** los archivos de imagen duplicados, el módulo de mapa de imágenes antiguo y el logo SVG sin uso han sido eliminados del repositorio
**WHEN** el proceso de construcción del sitio se ejecuta
**THEN** el build completa sin errores de import ni referencias rotas, confirmando que ningún componente activo dependía de los archivos eliminados

### Scenario: El repositorio no contiene referencias a los módulos eliminados

**GIVEN** los archivos de código muerto han sido eliminados
**WHEN** se busca en el código fuente del proyecto cualquier referencia a los identificadores de los módulos eliminados
**THEN** no se encuentra ninguna referencia activa en componentes, páginas, layouts ni archivos de configuración del proyecto

### Scenario: El peso del repositorio se reduce de forma medible

**GIVEN** la eliminación de los 14 JPG de industrias antiguas, el módulo TypeScript y el logo SVG sin uso
**WHEN** se compara el peso total del repositorio antes y después de la limpieza
**THEN** el repositorio pesa al menos 10 MB menos, confirmando que los archivos no serán procesados ni incluidos en futuros builds

### Scenario: El sitio renderiza las secciones de industrias correctamente tras la limpieza

**GIVEN** los assets de industrias antiguos han sido eliminados y la migración a assets gestionados ha sido completada
**WHEN** un visitante navega a la sección de industrias en cualquier idioma del sitio
**THEN** las imágenes de industrias se muestran correctamente, sirviendo desde los nuevos assets gestionados (no desde los archivos eliminados)

## Acceptance Criteria

- [ ] Los 14 archivos JPG de la carpeta `src/assets/industries/` han sido eliminados del repositorio
- [ ] El archivo `src/lib/industryImages.ts` ha sido eliminado del repositorio
- [ ] El archivo `src/assets/logo.svg` ha sido eliminado del repositorio
- [ ] El sitio construye sin errores (`npm run build` pasa) después de la eliminación
- [ ] Ninguna búsqueda en el código fuente del proyecto encuentra referencias a `INDUSTRY_IMAGES`, `industryImages` ni a `src/assets/logo.svg`
- [ ] El peso total del repositorio se reduce en al menos 10 MB respecto al estado previo

## Related

- [[image-optimization-pipeline/image-asset-migration]] — la migración de assets debe estar completada y validada antes de ejecutar esta limpieza
- [[image-optimization-pipeline/image-multiformat-delivery]] — confirmar que las nuevas imágenes gestionadas cubren todos los casos antes de eliminar los duplicados
