---
type: capability-spec
title: "Soporte de dirección RTL para árabe"
capability: "i18n-rtl-support"
slug: "i18n-rtl-support-arabic"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[i18n-core-translation-helpers]]"
  - "[[i18n-ui-selector-navbar]]"
change_ref: "[[rescue-multi-language-support]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "Cuando el idioma activo es árabe, la página se lee de derecha a izquierda."
  - "Los elementos posicionados (drawer móvil, dropdowns, iconos direccionales) reflejan la direccionalidad sin romperse."
  - "Los demás idiomas siguen mostrándose de izquierda a derecha sin alteración."
related:
  - "[[i18n-ui-selector-navbar]]"
  - "[[i18n-core-translation-helpers]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/layouts/"
  - "log-atm-web-astro/src/components/ui/Navbar.astro"
  - "log-atm-web-astro/src/styles/"
verified_at: null
created: "2026-05-12"
updated: "2026-05-12"
tags: [capability-spec, i18n, rtl, a11y]
---

# Soporte de dirección RTL para árabe

## Purpose

Los visitantes en árabe deben experimentar el sitio en su dirección natural de lectura (de derecha a izquierda) sin que esto deteriore la experiencia de los demás idiomas, que se mantienen de izquierda a derecha.

## Requirements

- El sistema SHALL declarar la dirección de lectura como `rtl` cuando el idioma activo es árabe.
- El sistema SHALL declarar la dirección de lectura como `ltr` para los otros cinco idiomas.
- El sistema SHALL invertir el origen del drawer móvil del navbar cuando el idioma activo es árabe (entra desde la izquierda en lugar de desde la derecha).
- El sistema SHALL invertir la apertura de menús desplegables o popovers cuando el idioma activo es árabe, evitando que se salgan de la pantalla.
- El sistema SHALL preservar la a11y del navbar (focus-trap, inert, reduced-motion) bajo RTL.
- El sistema SHOULD evitar duplicar reglas CSS entre LTR y RTL usando propiedades lógicas (inicio/fin lógico en lugar de izquierda/derecha físicas) cuando sea posible.

## Scenarios

### Scenario: Visitante en árabe lee la home

**GIVEN** un visitante en `/ar/`
**WHEN** la página se renderiza
**THEN** el texto fluye de derecha a izquierda, los elementos visuales están alineados a la derecha donde corresponde y nada queda cortado por el borde de la pantalla

### Scenario: Visitante en árabe abre el drawer móvil

**GIVEN** un visitante en `/ar/contacto` en un móvil
**WHEN** abre el drawer del navbar
**THEN** el drawer entra desde la izquierda, el contenido se lee de derecha a izquierda y el focus-trap funciona igual que en LTR

### Scenario: Visitante cambia de árabe a inglés

**GIVEN** un visitante en `/ar/servicios` con dirección RTL aplicada
**WHEN** elige inglés en el selector de idioma
**THEN** llega a `/en/servicios` y la página vuelve a leerse de izquierda a derecha sin restos de RTL

## Acceptance Criteria

- [ ] Las páginas bajo `/ar/` aplican `dir="rtl"` a nivel de documento.
- [ ] Las páginas en los otros idiomas no aplican RTL.
- [ ] El drawer móvil entra desde el lado correcto según el idioma activo.
- [ ] La auditoría manual con `lang=ar` no encuentra textos invertidos, recortados o solapados.
- [ ] Lighthouse a11y ≥ 95 en `/ar/` y en `/ar/contacto`.

## Related

- [[i18n-ui-selector-navbar]] — el drawer cuyo origen cambia con la dirección
- [[i18n-core-translation-helpers]] — flag de dirección consumido desde aquí
