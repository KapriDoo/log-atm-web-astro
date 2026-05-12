---
type: capability-spec
title: "Soporte RTL para árabe (dir, logical properties, Navbar drawer)"
capability: "i18n-rtl-support"
slug: "i18n-rtl-support-arabic"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-translations-json-structure]]"
  - "[[i18n-typography-system-fonts]]"
change_ref: "[[multi-language-support]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support"
feature_branch: "feature/multi-language-support"
commits:
  - "76664bf"
mr: ""
acceptance_criteria:
  - "[ ] En rutas /ar/, el documento HTML tiene el atributo dir='rtl' en la etiqueta html"
  - "[ ] El menú drawer en móvil aparece desde el lado izquierdo de la pantalla cuando el locale es árabe (espejado respecto al LTR)"
  - "[ ] Los textos de todos los componentes fluyen de derecha a izquierda en /ar/"
  - "[ ] No aparecen elementos con posicionamiento absoluto o fijo que queden visualmente desalineados en RTL"
  - "[ ] El selector de idioma en Navbar sigue siendo operable y visible en la vista árabe"
  - "[ ] Las animaciones del drawer no muestran artefactos visuales en RTL"
  - "[ ] En todos los demás locales, el atributo dir no está presente o es 'ltr'"

related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-ui-selector-navbar]]"
  - "[[i18n-translations-json-structure]]"
affects: []
adrs: []
scope:
  - "src/components/ui/Navbar.astro"
  - "src/layouts/BaseLayout.astro"
  - "src/styles/global.css"
verified_at: "2026-05-12"

created: "2026-05-11"
updated: "2026-05-12"
archived: "2026-05-12"
tags: [capability-spec, i18n, rtl, arabic, layout]
---

# Soporte RTL para árabe (dir, logical properties, Navbar drawer)

## Purpose

El árabe se escribe de derecha a izquierda (RTL), por lo que presentarlo en un layout diseñado exclusivamente para idiomas LTR produce una experiencia degradada: textos que fluyen en dirección incorrecta, menús que aparecen del lado equivocado de la pantalla y elementos posicionados que quedan visualmente desalineados. El sitio LOG ATM debe adaptar su presentación cuando el visitante navega en árabe, garantizando una experiencia de lectura y navegación natural para este idioma.

## Requirements

- El sistema SHALL agregar el atributo `dir="rtl"` a la etiqueta `<html>` cuando el locale activo sea árabe (`/ar/`)
- El sistema SHALL reposicionar el panel drawer del menú móvil para que aparezca desde el borde izquierdo de la pantalla en RTL (en lugar del borde derecho que usa en LTR)
- El sistema SHALL reemplazar cualquier propiedad CSS de posicionamiento direccional explícita (`left`, `right`, `margin-left`, `margin-right`, etc.) que afecte componentes visibles en árabe por sus equivalentes lógicos (`inset-inline-start`, `inset-inline-end`, `margin-inline-start`, `margin-inline-end`)
- El sistema SHALL espejar las animaciones de apertura y cierre del drawer para que sean coherentes con la dirección RTL
- El sistema SHALL garantizar que el selector de idioma en Navbar sea operable y visible en la vista árabe
- El sistema SHALL aplicar `dir="rtl"` exclusivamente cuando el locale es árabe; todos los demás locales utilizan el flujo LTR por defecto
- El sistema SHOULD verificar que ningún elemento con posicionamiento absoluto o fijo quede desalineado visualmente en el layout RTL

## Scenarios

### Scenario: Visitante árabe accede al sitio

**GIVEN** un visitante que navega a cualquier página bajo `/ar/`
**WHEN** la página carga en su navegador
**THEN** todos los textos fluyen de derecha a izquierda y el layout general respeta la dirección de lectura árabe

### Scenario: Apertura del menú en dispositivo móvil en árabe

**GIVEN** un visitante árabe en dispositivo móvil
**WHEN** pulsa el ícono de menú hamburguesa
**THEN** el panel drawer aparece deslizándose desde el borde izquierdo de la pantalla (lado de inicio en RTL)

### Scenario: Cierre del menú con animación espejada

**GIVEN** un visitante árabe que tiene el drawer abierto
**WHEN** pulsa el botón de cierre o hace tap fuera del panel
**THEN** el panel se desliza de vuelta hacia el borde izquierdo sin artefactos visuales ni saltos bruscos

### Scenario: Elementos posicionados no quedan desalineados

**GIVEN** un visitante que navega el sitio en árabe en distintas páginas
**WHEN** revisa visualmente la Navbar, el Hero, las secciones de servicios y el footer
**THEN** ningún elemento aparece cortado, superpuesto o desplazado de forma inesperada por conflicto entre el flujo RTL y el posicionamiento CSS

### Scenario: Selector de idioma funcional en RTL

**GIVEN** un visitante árabe que quiere cambiar a otro idioma
**WHEN** interactúa con el selector de idioma en la Navbar
**THEN** el selector responde correctamente, es visualmente legible y permite completar el cambio de idioma

### Scenario: Otros idiomas no afectados por el cambio RTL

**GIVEN** un visitante que navega en inglés, chino, hindi o portugués
**WHEN** la página carga
**THEN** el layout es LTR como de costumbre; no hay rastro de reglas RTL que afecten la presentación

## Acceptance Criteria

- [ ] En rutas `/ar/`, el documento HTML tiene el atributo `dir="rtl"` en la etiqueta `<html>`
- [ ] El menú drawer en móvil aparece desde el lado izquierdo de la pantalla cuando el locale es árabe (espejado respecto al LTR)
- [ ] Los textos de todos los componentes fluyen de derecha a izquierda en `/ar/`
- [ ] No aparecen elementos con posicionamiento absoluto o fijo que queden visualmente desalineados en RTL
- [ ] El selector de idioma en Navbar sigue siendo operable y visible en la vista árabe
- [ ] Las animaciones del drawer no muestran artefactos visuales en RTL
- [ ] En todos los demás locales, el atributo `dir` no está presente o es `ltr`

## Related

- [[i18n-routing-locale-prefixes]] — el locale árabe se activa mediante el prefijo `/ar/` en la URL
- [[i18n-ui-selector-navbar]] — el selector de idioma debe funcionar correctamente en el contexto RTL
- [[i18n-translations-json-structure]] — el contenido árabe proviene de `ar.json`
