---
type: capability-spec
title: "Entrega de imágenes de contenido en formatos modernos AVIF/WebP con fallback JPEG"
capability: "image-optimization-pipeline"
slug: "image-multiformat-delivery"
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
  - "El sitio construye sin errores (npm run build pasa) con las 27 imágenes de contenido referenciadas como assets gestionados"
  - "El HTML generado de home, /servicios, /industrias y /nosotros (y sus versiones en/pt) contiene elementos <picture> con <source type=\"image/avif\"> y <source type=\"image/webp\"> para las imágenes de contenido"
  - "El directorio de salida de build contiene variantes .avif y .webp con hash de contenido para cada imagen de contenido"
  - "Cada imagen renderizada tiene atributos width y height presentes en el <img> interno (inferidos automáticamente por el sistema de build)"
  - "Las imágenes de cards y grids mantienen el encuadre visual idéntico al estado previo (object-fit:cover intacto)"
  - "El peso total de imágenes servidas en la página de inicio cae de ~5–8 MB a menos de 2 MB en navegadores con soporte AVIF"
  - "El poster del video en la sección Why muestra una imagen optimizada en WebP (no el JPEG original)"
  - "Los selectores CSS existentes de las secciones afectadas siguen aplicando correctamente a las imágenes"

related:
  - "[[hero-lcp-performance]]"
  - "[[dead-code-cleanup]]"
affects:
  - "[[dead-code-cleanup/asset-dead-code-removal]]"
  - "[[hero-lcp-performance/hero-lcp-priority]]"
  - "[[image-optimization-pipeline/image-asset-migration]]"
adrs:
  - "[[0001-image-optimization-astro-assets]]"
  - "[[0006-picture-multiformat-content-images]]"
scope:
  - "src/lib/constants.ts"
  - "src/assets/images/services/*.jpeg"
  - "src/assets/images/industries/*.jpeg"
  - "src/assets/images/process/*.jpeg"
  - "src/components/sections/ServicesSection.astro"
  - "src/components/sections/IndustriesSection.astro"
  - "src/components/sections/WhyVideoSection.astro"
  - "src/pages/servicios.astro"
  - "src/pages/nosotros.astro"
  - "src/pages/industrias.astro"
  - "astro.config.mjs"
verified_at: "2026-05-28"

created: "2026-05-28"
updated: "2026-05-28"
tags: [capability-spec]
---

# Entrega de imágenes de contenido en formatos modernos AVIF/WebP con fallback JPEG

## Purpose

El sitio publica actualmente sus imágenes de contenido (servicios, industrias, proceso) como JPEG sin comprimir, lo que resulta en transferencias de datos innecesariamente grandes para los visitantes. Esta spec define el comportamiento esperado del sistema una vez que las imágenes se procesen en build-time y se entreguen en el formato óptimo que cada navegador soporta, con JPEG como red de seguridad universal, eliminando así el desperdicio de ancho de banda sin cambios perceptibles para el usuario.

## Requirements

- El sistema SHALL entregar cada imagen de contenido en el formato más eficiente que el navegador del visitante soporte (AVIF primero, WebP como segunda opción, JPEG como fallback).
- El sistema SHALL reservar el espacio visual correcto para cada imagen antes de que esta termine de cargar, eliminando el desplazamiento de layout durante la carga.
- El sistema SHALL generar las variantes de imagen optimizadas durante el proceso de construcción del sitio, sin ningún cómputo adicional en el momento de servir la página.
- El sistema SHALL configurar explícitamente el servicio de procesamiento de imágenes con opciones de calidad documentadas en la configuración del proyecto.
- El sistema SHALL aplicar una calidad de compresión de 80 (sobre 100) a todas las imágenes de contenido para balancear fidelidad visual y peso de transferencia.
- El sistema SHOULD entregar el poster del video de la sección "¿Por qué ATM?" como una imagen WebP optimizada, reduciendo su peso respecto al JPEG original.
- Los datos de negocio (nombre, descripción, imagen) de cada servicio, industria y paso del proceso SHALL permanecer centralizados en una única fuente de verdad, accesibles desde todos los componentes que los consumen sin duplicación.

## Scenarios

### Scenario: Visitante con navegador moderno ve las imágenes de contenido

**GIVEN** un visitante accede al sitio desde un navegador con soporte para AVIF (Chrome, Edge, Firefox modernos)
**WHEN** el navegador carga la página de inicio, de servicios, de industrias o de nosotros
**THEN** el navegador descarga la variante AVIF de cada imagen de contenido, que ocupa entre un 40% y 60% menos espacio que el JPEG equivalente, y las imágenes aparecen con el encuadre visual idéntico al diseño original

### Scenario: Visitante con navegador sin soporte AVIF recibe WebP

**GIVEN** un visitante accede al sitio desde un navegador que soporta WebP pero no AVIF (Safari antiguo, algunos móviles)
**WHEN** el navegador carga cualquier página con imágenes de contenido
**THEN** el navegador descarga la variante WebP, que ocupa entre un 25% y 35% menos que el JPEG, y la experiencia visual es idéntica

### Scenario: Visitante con navegador antiguo recibe JPEG

**GIVEN** un visitante accede al sitio desde un navegador que no soporta WebP ni AVIF
**WHEN** el navegador carga cualquier página con imágenes de contenido
**THEN** el navegador descarga el JPEG original como imagen de respaldo, la página carga correctamente y sin errores visuales

### Scenario: Construcción del sitio valida integridad de todos los assets de imagen

**GIVEN** el equipo de desarrollo ejecuta el proceso de construcción del sitio
**WHEN** el build procesa las 27 imágenes de contenido referenciadas
**THEN** el proceso termina sin errores, genera variantes AVIF y WebP con nombre de archivo basado en hash de contenido, e inyecta las dimensiones intrínsecas (ancho y alto) en el HTML de cada imagen

### Scenario: Imágenes de contenido no producen desplazamiento de layout

**GIVEN** un visitante carga una página con grids o tarjetas de imágenes (servicios, industrias, proceso)
**WHEN** las imágenes están en proceso de descarga
**THEN** el espacio reservado para cada imagen coincide exactamente con sus dimensiones finales, sin que el contenido circundante salte o se reposicione durante la carga

### Scenario: El poster del video muestra una miniatura optimizada

**GIVEN** un visitante carga la sección de video en la página de inicio
**WHEN** el video aún no ha comenzado a reproducirse
**THEN** el cuadro previo del video se muestra en formato WebP optimizado, con un peso notablemente menor al JPEG original, sin diferencia visual perceptible

## Acceptance Criteria

- [ ] El sitio construye sin errores (npm run build pasa) con las 27 imágenes de contenido referenciadas como assets gestionados
- [ ] El HTML generado de home, /servicios, /industrias y /nosotros (y sus versiones en/pt) contiene elementos `<picture>` con `<source type="image/avif">` y `<source type="image/webp">` para las imágenes de contenido
- [ ] El directorio de salida de build contiene variantes .avif y .webp con hash de contenido para cada imagen de contenido
- [ ] Cada imagen renderizada tiene atributos width y height presentes en el `<img>` interno (inferidos automáticamente por el sistema de build)
- [ ] Las imágenes de cards y grids mantienen el encuadre visual idéntico al estado previo (object-fit:cover intacto)
- [ ] El peso total de imágenes servidas en la página de inicio cae de ~5–8 MB a menos de 2 MB en navegadores con soporte AVIF
- [ ] El poster del video en la sección Why muestra una imagen optimizada en WebP (no el JPEG original)
- [ ] Los selectores CSS existentes de las secciones afectadas siguen aplicando correctamente a las imágenes

## Related

- [[hero-lcp-performance/hero-lcp-priority]] — la priorización del hero es una extensión de este pipeline aplicada específicamente al LCP
- [[dead-code-cleanup/asset-dead-code-removal]] — la limpieza de código muerto es el complemento necesario de esta migración
