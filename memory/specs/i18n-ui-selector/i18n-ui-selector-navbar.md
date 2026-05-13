---
type: capability-spec
title: "Selector de idioma en navbar (desktop y móvil)"
capability: "i18n-ui-selector"
slug: "i18n-ui-selector-navbar"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-core-translation-helpers]]"
change_ref: "[[rescue-multi-language-support]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "El visitante encuentra el selector de idioma desde cualquier página, en escritorio y en móvil."
  - "Cambiar de idioma desde el selector preserva la página actual y solo cambia el idioma."
  - "El selector es operable con teclado y lector de pantalla."
  - "La integración del selector en navbar no altera los criterios de accesibilidad ya aplicados (heading order, landmark nesting, drawer con inert/focus-trap)."
related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-rtl-support-arabic]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/components/ui/LanguageSelector.astro"
  - "log-atm-web-astro/src/components/ui/Navbar.astro"
verified_at: null
created: "2026-05-12"
updated: "2026-05-12"
tags: [capability-spec, i18n, ui, a11y]
---

# Selector de idioma en navbar (desktop y móvil)

## Purpose

El visitante debe poder cambiar el idioma del sitio en cualquier momento, desde cualquier página y desde cualquier dispositivo, sin perder la página en la que está navegando. La incorporación del selector no puede degradar la accesibilidad ya conseguida en el navbar actual.

## Requirements

- El sistema SHALL exponer un selector de idioma visible en el navbar de cualquier página.
- El sistema SHALL ofrecer el selector tanto en variante de escritorio (junto a la navegación principal) como en variante móvil (dentro del drawer).
- El sistema SHALL listar los seis idiomas soportados con etiqueta corta y nombre nativo accesible para lectores de pantalla.
- El sistema SHALL marcar visualmente y semánticamente cuál es el idioma activo.
- El sistema SHALL conducir al visitante a la misma página en el idioma elegido cuando este la selecciona.
- El sistema SHALL preservar el comportamiento del drawer móvil ya implementado: inert al cerrarse, focus-trap al abrirse, respeto a `prefers-reduced-motion`.
- El sistema SHALL preservar el orden de encabezados y la jerarquía de landmarks vigentes en el navbar.
- El sistema SHALL permitir operar el selector exclusivamente con teclado: tabular hasta él, abrirlo, navegar opciones y seleccionar.

## Scenarios

### Scenario: Visitante cambia de idioma desde escritorio

**GIVEN** un visitante en `/servicios` con el navegador en pantalla amplia
**WHEN** abre el selector de idioma y elige "English"
**THEN** llega a `/en/servicios` con el contenido traducido y el selector marca "English" como activo

### Scenario: Visitante cambia de idioma desde móvil

**GIVEN** un visitante en `/industrias` en un móvil
**WHEN** abre el drawer del navbar, navega al selector y elige "中文"
**THEN** llega a `/zh/industrias` con el contenido en chino y el drawer se cierra restaurando el foco al botón que lo abrió

### Scenario: Usuario con lector de pantalla cambia de idioma

**GIVEN** un usuario navegando con lector de pantalla
**WHEN** tabula hasta el selector de idioma
**THEN** escucha una etiqueta clara que indica el idioma actual y la posibilidad de cambiarlo, y puede activar y seleccionar opciones solo con teclado

### Scenario: Visitante con `prefers-reduced-motion` activo

**GIVEN** un visitante cuyo sistema operativo solicita reducir movimiento
**WHEN** abre el drawer móvil para cambiar de idioma
**THEN** el drawer aparece sin animaciones bruscas, conservando la operabilidad

## Acceptance Criteria

- [ ] El selector aparece en navbar desktop y dentro del drawer móvil.
- [ ] Cambiar de idioma redirige a la misma ruta con el prefijo correcto.
- [ ] El idioma activo es identificable visual y semánticamente (atributo de selección y/o `aria-current`).
- [ ] La auditoría Lighthouse de accesibilidad sigue ≥ 95 tras la integración.
- [ ] El drawer móvil mantiene inert, focus-trap y respeto a reduced-motion.
- [ ] Tabulación con teclado puede abrir, navegar y elegir un idioma sin uso de mouse.

## Related

- [[i18n-routing-locale-prefixes]] — destino de la navegación al cambiar idioma
- [[i18n-rtl-support-arabic]] — comportamiento del drawer cuando el idioma activo es árabe
