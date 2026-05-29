---
type: capability-spec
title: "Migración de assets de imagen de carpeta pública a carpeta de assets gestionados"
capability: "image-optimization-pipeline"
slug: "image-asset-migration"
domain: "refactoring"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: critical
depends_on: []
change_ref: "[[optimize-images-webp]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/optimize-images-webp"
feature_branch: "feature/optimize-images-webp"
commits:
  - e6ade3a
mr: ""
acceptance_criteria:
  - "Los 27 archivos JPEG de servicios, industrias y proceso están ubicados en la carpeta de assets gestionados del proyecto (no en la carpeta pública estática)"
  - "Ningún componente o página del sitio referencia rutas de imagen del tipo /images/... en su código fuente"
  - "Los datos de imagen de cada servicio, industria y paso del proceso se acceden desde una única fuente de verdad centralizada, sin duplicación entre componentes"
  - "El sistema de build del proyecto puede resolver sin errores cada referencia de imagen en los componentes y páginas afectados"
  - "Las versiones del sitio en español, inglés y portugués muestran las mismas imágenes correctamente sin cambios adicionales en sus archivos de página"

related:
  - "[[image-optimization-pipeline/image-multiformat-delivery]]"
  - "[[hero-lcp-performance/hero-lcp-priority]]"
affects:
  - "[[dead-code-cleanup/asset-dead-code-removal]]"
  - "[[hero-lcp-performance/hero-lcp-priority]]"
adrs:
  - "[[0001-image-optimization-astro-assets]]"
  - "[[0006-picture-multiformat-content-images]]"
scope:
  - "public/images/services/"
  - "public/images/industries/"
  - "public/images/process/"
  - "src/assets/images/services/"
  - "src/assets/images/industries/"
  - "src/assets/images/process/"
  - "src/lib/constants.ts"
verified_at: "2026-05-28"

created: "2026-05-28"
updated: "2026-05-28"
tags: [capability-spec]
---

# Migración de assets de imagen de carpeta pública a carpeta de assets gestionados

## Purpose

Las 27 imágenes de contenido del sitio (servicios, industrias y proceso de trabajo) están actualmente alojadas en la carpeta pública estática, lo que impide que el sistema de build del proyecto las procese y optimice. Esta spec define el resultado esperado de la reubicación de esos archivos a la carpeta de assets gestionados, donde el sistema puede transformarlos automáticamente durante la construcción, sin cambios en la experiencia visual del visitante ni en el contenido editorial.

## Requirements

- El sistema SHALL ubicar todos los archivos de imagen de contenido raster (servicios, industrias, proceso) en la carpeta de assets gestionados del proyecto, organizada por categoría (services, industries, process).
- Los datos editoriales de cada servicio, industria y paso del proceso (título, descripción, imagen, etc.) SHALL permanecer definidos en una única fuente de verdad centralizada, sin que ningún componente individual los duplique.
- El sistema SHALL resolver cada referencia de imagen durante el proceso de construcción del sitio; cualquier referencia inválida SHALL causar un error de build inmediato y detectable.
- Las páginas del sitio en todos los idiomas (español, inglés, portugués) SHALL mostrar las imágenes correctas sin requerir cambios específicos en sus archivos de página individuales.
- Las carpetas de imagen en la ubicación pública estática SHALL quedar vacías de archivos JPEG de contenido tras la migración completada.

## Scenarios

### Scenario: El build resuelve todas las referencias de imagen de contenido

**GIVEN** los 27 JPEG de contenido han sido reubicados a la carpeta de assets gestionados y las referencias en la fuente de datos central han sido actualizadas
**WHEN** el proceso de construcción del sitio se ejecuta
**THEN** el build completa sin errores de resolución de imagen, generando los archivos optimizados en el directorio de salida

### Scenario: Referencia de imagen inválida falla el build inmediatamente

**GIVEN** existe una discrepancia entre el nombre de un archivo de imagen en la carpeta de assets y su referencia en la fuente de datos central
**WHEN** el proceso de construcción del sitio se ejecuta
**THEN** el build falla con un mensaje de error que identifica la referencia inválida, sin producir un sitio con imágenes rotas

### Scenario: Versiones multiidioma muestran las imágenes sin cambios adicionales

**GIVEN** los 27 JPEG han sido migrados y las referencias actualizadas en la fuente de datos central
**WHEN** un visitante accede a la versión en inglés o portugués de las páginas de servicios, industrias o nosotros
**THEN** las imágenes se muestran correctamente sin que los archivos de página de cada idioma hayan requerido modificación

### Scenario: La carpeta pública no contiene los JPEG de contenido migrados

**GIVEN** la migración de assets ha sido completada
**WHEN** se inspecciona la carpeta pública estática del proyecto
**THEN** no se encuentran archivos JPEG de servicios, industrias ni proceso en esa carpeta; solo permanecen en ella los assets que corresponden estar públicos (logos SVG, favicon, videos, logo PNG)

## Acceptance Criteria

- [ ] Los 27 archivos JPEG de servicios, industrias y proceso están ubicados en la carpeta de assets gestionados del proyecto (no en la carpeta pública estática)
- [ ] Ningún componente o página del sitio referencia rutas de imagen del tipo /images/... en su código fuente
- [ ] Los datos de imagen de cada servicio, industria y paso del proceso se acceden desde una única fuente de verdad centralizada, sin duplicación entre componentes
- [ ] El sistema de build del proyecto puede resolver sin errores cada referencia de imagen en los componentes y páginas afectados
- [ ] Las versiones del sitio en español, inglés y portugués muestran las mismas imágenes correctamente sin cambios adicionales en sus archivos de página

## Related

- [[image-optimization-pipeline/image-multiformat-delivery]] — este spec es prerequisito; la entrega multiformat depende de que los assets estén en la carpeta gestionada
- [[dead-code-cleanup/asset-dead-code-removal]] — la limpieza de duplicados se ejecuta después de validar esta migración
