---
type: capability-spec
title: "Priorización de carga de la imagen principal del hero para mejorar el LCP"
capability: "hero-lcp-performance"
slug: "hero-lcp-priority"
domain: "refactoring"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: critical
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
  - "El HTML generado del hero contiene un elemento <img> con los atributos fetchpriority=\"high\", loading=\"eager\" y decoding=\"sync\""
  - "La imagen del hero en el build de producción pesa menos de 250 KB en formato AVIF o WebP (vs los 937 KB del JPEG original)"
  - "El hero genera variantes responsivas para los anchos de viewport más comunes (móvil, tablet, escritorio)"
  - "El atributo sizes del hero indica al navegador que la imagen ocupa el ancho completo del viewport (100vw)"
  - "La imagen del hero tiene dimensiones intrínsecas (width y height) presentes en el HTML para evitar desplazamiento de layout"

related:
  - "[[image-optimization-pipeline/image-multiformat-delivery]]"
  - "[[image-optimization-pipeline/image-asset-migration]]"
affects: []
adrs:
  - "[[0006-picture-multiformat-content-images]]"
scope:
  - "src/components/sections/HeroSection.astro"
  - "src/assets/images/services/svc-maritima.jpeg"
verified_at: null

created: "2026-05-28"
updated: "2026-05-28"
tags: [capability-spec]
---

# Priorización de carga de la imagen principal del hero para mejorar el LCP

## Purpose

La imagen de fondo del hero de la página de inicio es el elemento de mayor tamaño visible en la pantalla al cargar (Largest Contentful Paint). Actualmente ocupa 937 KB como JPEG sin optimización ni indicación de prioridad de descarga al navegador. Esta spec define el comportamiento esperado tras optimizar esa imagen con formatos modernos y declararla como elemento prioritario, de modo que el tiempo hasta que el visitante ve el contenido principal del sitio se reduzca de forma medible.

## Requirements

- El sistema SHALL indicar al navegador que descargue la imagen del hero con la mayor prioridad posible, antes que otros recursos de la página.
- El sistema SHALL cargar la imagen del hero de forma inmediata (sin carga diferida), dado que es visible en el área inicial de la pantalla sin desplazamiento.
- El sistema SHALL decodificar la imagen del hero de forma síncrona para que aparezca en pantalla tan pronto como los datos estén disponibles.
- El sistema SHALL proveer variantes de la imagen del hero para diferentes tamaños de pantalla, permitiendo que el navegador descargue solo la variante adecuada al dispositivo del visitante.
- El sistema SHALL declarar que la imagen del hero ocupa el ancho completo de la ventana, para que el navegador calcule correctamente qué variante descargar según el dispositivo.
- La imagen del hero SHALL pesar menos de 250 KB en la variante AVIF para pantallas de escritorio, reduciendo el peso original de 937 KB en al menos un 70%.

## Scenarios

### Scenario: Navegador prioriza la descarga de la imagen del hero sobre otros recursos

**GIVEN** un visitante accede a la página de inicio por primera vez (sin caché)
**WHEN** el navegador comienza a parsear el HTML de la página
**THEN** el navegador identifica la imagen del hero como de alta prioridad y la descarga antes que imágenes de secciones inferiores de la página, reduciendo el tiempo hasta el LCP

### Scenario: La imagen del hero aparece sin retraso perceptible en pantalla

**GIVEN** un visitante en una conexión típica de banda ancha carga la página de inicio
**WHEN** el HTML de la página ha sido recibido por el navegador
**THEN** la imagen del hero se muestra en pantalla dentro de los primeros 2.5 segundos de navegación en condiciones de red buenas, sin que el visitante vea un espacio vacío prolongado donde debería estar la imagen

### Scenario: El hero sirve una imagen apropiada al tamaño del dispositivo del visitante

**GIVEN** un visitante accede desde un dispositivo móvil con pantalla de 375px de ancho
**WHEN** el navegador selecciona qué variante de la imagen del hero descargar
**THEN** el navegador descarga la variante más pequeña disponible que se ajusta a la pantalla del dispositivo, en lugar del tamaño de escritorio completo, reduciendo el consumo de datos en móvil

### Scenario: La imagen del hero no provoca desplazamiento de layout durante la carga

**GIVEN** un visitante accede a la página de inicio
**WHEN** la imagen del hero está en proceso de descarga
**THEN** el espacio reservado para la imagen coincide exactamente con sus dimensiones finales, sin que el contenido del hero (título, subtítulo, CTA) se desplace durante la carga

### Scenario: El peso de la imagen del hero se reduce significativamente frente al JPEG original

**GIVEN** el sitio ha sido construido con la imagen del hero procesada como asset gestionado
**WHEN** se compara el tamaño del archivo AVIF/WebP del hero en el directorio de salida con el JPEG original
**THEN** la variante AVIF pesa menos de 250 KB (reducción de al menos 70% respecto a los 937 KB del JPEG original)

## Acceptance Criteria

- [ ] El HTML generado del hero contiene un elemento `<img>` con los atributos `fetchpriority="high"`, `loading="eager"` y `decoding="sync"`
- [ ] La imagen del hero en el build de producción pesa menos de 250 KB en formato AVIF o WebP (vs los 937 KB del JPEG original)
- [ ] El hero genera variantes responsivas para los anchos de viewport más comunes (móvil, tablet, escritorio)
- [ ] El atributo `sizes` del hero indica al navegador que la imagen ocupa el ancho completo del viewport (`100vw`)
- [ ] La imagen del hero tiene dimensiones intrínsecas (`width` y `height`) presentes en el HTML para evitar desplazamiento de layout

## Related

- [[image-optimization-pipeline/image-multiformat-delivery]] — el pipeline base de entrega multiformat es prerequisito de esta spec
- [[image-optimization-pipeline/image-asset-migration]] — la imagen del hero debe estar en la carpeta de assets gestionados
