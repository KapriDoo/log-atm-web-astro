---
type: capability-spec
title: "Peso de imágenes del inicio bajo 2 MB mediante variantes acordes al tamaño de cada tarjeta"
capability: "image-optimization-pipeline"
slug: "card-image-weight-budget"
domain: "debt"
delta_type: null
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[image-multiformat-delivery]]"
change_ref: "[[debt-assets-weight]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight"
feature_branch: "feature/debt-assets-weight"
commits: ["78c66b5", "bb38fc0", "3cbeb00"]
mr: ""
acceptance_criteria:
  - "[x] El peso AVIF servido en la página de inicio tras recorrerla completa es menor a 2 MB en escritorio de 1440×900 con densidad de pantalla 1"
  - "[x] El peso AVIF servido en la página de inicio tras recorrerla completa es menor a 2 MB en móvil de 390×844 con densidad de pantalla 3"
  - "[x] Existe una medición reproducible sobre el build del sitio que simula la elección de variante del navegador y entrega el peso total por escenario"
  - "[ ] Las tarjetas se ven sin pérdida visible de nitidez en pantallas de densidad 2, en escritorio y en móvil"
  - "[x] Todas las tarjetas con imagen del sitio (inicio, servicios, industrias y nosotros) declaran variantes de ancho y tamaño de render"
  - "[x] La imagen principal del inicio conserva su prioridad de carga y su peso actual"

related:
  - "[[image-optimization-pipeline/image-multiformat-delivery]]"
  - "[[hero-lcp-performance/hero-lcp-priority]]"
  - "[[dead-code-cleanup/asset-dead-code-removal]]"
affects: []
adrs:
  - "[[0001-image-optimization-astro-assets]]"
  - "[[0006-picture-multiformat-content-images]]"
scope:
  - "src/components/sections/ServicesSection.astro"
  - "src/components/sections/IndustriesSection.astro"
  - "src/styles/sections/industries.css"
  - "src/pages/servicios.astro"
  - "src/pages/nosotros.astro"
  - "src/pages/industrias.astro"
  - "scripts/"
verified_at: null

created: "2026-10-03"
updated: "2026-10-03"
tags: [capability-spec]
---

# Peso de imágenes del inicio bajo 2 MB mediante variantes acordes al tamaño de cada tarjeta

## Purpose

La entrega multiformato vigente exige que la página de inicio sirva menos de 2 MB de imágenes en navegadores con AVIF, pero hoy un visitante descarga cerca de 2,9 MB en escritorio y entre 3,0 y 3,1 MB en móvil, porque cada tarjeta recibe la misma variante grande sin importar el espacio que ocupa. Esta spec fija el comportamiento que cumple ese presupuesto: cada tarjeta entrega una variante proporcional a su tamaño real en pantalla, sin degradar la nitidez percibida, y el cumplimiento se comprueba con una medición repetible.

## Requirements

- El sistema SHALL servir, para cada tarjeta con imagen, una variante cuyo tamaño sea proporcional al espacio que la tarjeta ocupa en la pantalla del visitante, en lugar de una única variante grande para todos los dispositivos.
- El sistema SHALL mantener el peso total de imágenes AVIF servidas en la página de inicio, tras recorrerla completa, por debajo de 2 MB en escritorio de 1440×900 con densidad 1.
- El sistema SHALL mantener ese mismo peso por debajo de 2 MB en móvil de 390×844 con densidad 3.
- El sistema SHALL conservar la nitidez de las tarjetas sin pérdida visible en pantallas de densidad 2.
- El sistema SHALL aplicar el mismo criterio de variantes por tamaño a las tarjetas de servicios, industrias y nosotros, por consistencia, sin fijar para ellas un presupuesto de peso propio.
- El sistema SHALL ofrecer una medición reproducible que, a partir del sitio construido, simule la elección de variante AVIF de un navegador en los dos escenarios anteriores e informe el peso total acumulado.
- El sistema SHOULD priorizar el cumplimiento del presupuesto móvil limitando las variantes más grandes al doble del ancho máximo que cada tarjeta ocupa, y SHOULD reducir la calidad de compresión AVIF de las tarjetas solo si la medición aún supera el presupuesto.
- El sistema SHALL NOT alterar la imagen principal del inicio, que conserva su carga prioritaria y su peso actual.

## Scenarios

### Scenario: Visitante de escritorio recorre el inicio completo

**GIVEN** un visitante con un navegador compatible con AVIF y una pantalla de 1440×900 con densidad 1
**WHEN** recorre la página de inicio de punta a punta
**THEN** el total de imágenes descargadas es menor a 2 MB y cada tarjeta se ve nítida

### Scenario: Visitante móvil recorre el inicio completo

**GIVEN** un visitante con un navegador compatible con AVIF y una pantalla móvil de 390×844 con densidad 3
**WHEN** recorre la página de inicio de punta a punta
**THEN** el total de imágenes descargadas es menor a 2 MB

### Scenario: Cada tarjeta recibe una variante acorde a su espacio

**GIVEN** una tarjeta que ocupa una fracción del ancho de pantalla en una grilla
**WHEN** el navegador elige qué variante descargar
**THEN** descarga una variante proporcional al espacio que la tarjeta ocupa y no la variante de mayor tamaño disponible

### Scenario: Pantalla de densidad 2 mantiene la nitidez

**GIVEN** un visitante con una pantalla de densidad 2, ya sea en escritorio o en móvil
**WHEN** observa las tarjetas del sitio
**THEN** las imágenes se ven sin pérdida visible de nitidez respecto a una variante de mayor tamaño

### Scenario: Equipo comprueba el presupuesto con una medición repetible

**GIVEN** el sitio construido y la medición reproducible disponible
**WHEN** el equipo la ejecuta para los escenarios de escritorio y móvil
**THEN** obtiene el peso total AVIF de cada escenario y puede contrastarlo contra el límite de 2 MB con el mismo resultado en ejecuciones sucesivas

### Scenario: La imagen principal del inicio no cambia

**GIVEN** la imagen principal de la página de inicio, que carga con prioridad
**WHEN** se aplican las variantes por tamaño a las tarjetas
**THEN** la imagen principal conserva su carga prioritaria y un peso no mayor al actual

## Acceptance Criteria

- [x] El peso AVIF servido en la página de inicio tras recorrerla completa es menor a 2 MB en escritorio de 1440×900 con densidad de pantalla 1
- [x] El peso AVIF servido en la página de inicio tras recorrerla completa es menor a 2 MB en móvil de 390×844 con densidad de pantalla 3
- [x] Existe una medición reproducible sobre el build del sitio que simula la elección de variante del navegador y entrega el peso total por escenario
- [ ] Las tarjetas se ven sin pérdida visible de nitidez en pantallas de densidad 2, en escritorio y en móvil
- [x] Todas las tarjetas con imagen del sitio (inicio, servicios, industrias y nosotros) declaran variantes de ancho y tamaño de render
- [x] La imagen principal del inicio conserva su prioridad de carga y su peso actual

## Related

- [[image-optimization-pipeline/image-multiformat-delivery]] — fija el presupuesto de 2 MB que esta spec hace cumplir; permanece vigente sin cambios
- [[hero-lcp-performance/hero-lcp-priority]] — la imagen principal queda fuera de este ajuste
- [[dead-code-cleanup/asset-dead-code-removal]] — misma línea de saneamiento de assets
