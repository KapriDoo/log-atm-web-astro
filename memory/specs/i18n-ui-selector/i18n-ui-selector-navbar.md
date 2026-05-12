---
type: capability-spec
title: "Selector de idioma en Navbar (desktop y mobile)"
capability: "i18n-ui-selector"
slug: "i18n-ui-selector-navbar"
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
change_ref: "[[multi-language-support]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support"
feature_branch: "feature/multi-language-support"
commits:
  - "76664bf"
mr: ""
acceptance_criteria:
  - "[ ] El selector de idioma es visible en la Navbar en escritorio (a la derecha del botón CTA)"
  - "[ ] El selector de idioma es accesible dentro del menú drawer en móvil"
  - "[ ] Al seleccionar un idioma, el usuario permanece en la misma sección/página del sitio pero en el nuevo locale"
  - "[ ] El idioma activo está visualmente destacado en el selector"
  - "[ ] El selector es operable con teclado (focus, Enter, Escape) y anuncia su estado a lectores de pantalla"
  - "[ ] El selector no usa cookies ni almacenamiento local; la preferencia se refleja solo en la URL"

related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-translations-json-structure]]"
  - "[[i18n-rtl-support-arabic]]"
affects:
  - "[[i18n-rtl-support-arabic]]"
adrs: []
scope:
  - "src/components/ui/Navbar.astro"
verified_at: "2026-05-12"

created: "2026-05-11"
updated: "2026-05-12"
archived: "2026-05-12"
tags: [capability-spec, i18n, ui, selector, navbar]
---

# Selector de idioma en Navbar (desktop y mobile)

## Purpose

Los visitantes del sitio LOG ATM que prefieren un idioma distinto al español necesitan un mecanismo intuitivo para cambiar el idioma de visualización sin perder su contexto de navegación. El selector de idioma expuesto en la barra de navegación (tanto en escritorio como en el menú móvil) permite realizar este cambio con un clic, preservando la página en la que se encuentran y reflejando la preferencia únicamente en la URL.

## Requirements

- El sistema SHALL mostrar un selector de idioma en la Navbar en la vista de escritorio, posicionado a la derecha del botón de llamada a la acción principal
- El sistema SHALL incluir el selector de idioma dentro del menú drawer en la vista móvil
- El sistema SHALL construir los enlaces del selector de forma que al cambiar de idioma el usuario llegue a la ruta equivalente en el nuevo locale (preservación de path)
- El sistema SHALL destacar visualmente el idioma activo dentro de las opciones del selector
- El sistema SHALL implementar el selector como un control accesible operable por teclado y anunciado correctamente por lectores de pantalla
- El sistema SHALL gestionar la preferencia de idioma exclusivamente a través de la URL, sin cookies ni almacenamiento local en esta versión
- El sistema SHOULD mostrar el nombre del idioma en su forma nativa abreviada (ej. ES, EN, 中, हि, ع, PT)

## Scenarios

### Scenario: Visitante cambia de español a inglés desde escritorio

**GIVEN** un visitante que está en la página de inicio en español (`/`)
**WHEN** hace clic en la opción "EN" del selector de idioma en la barra de navegación
**THEN** es llevado a `/en/` y ve todo el contenido de la página de inicio en inglés

### Scenario: Visitante cambia de idioma desde una página interior

**GIVEN** un visitante que está leyendo la página de servicios en inglés (`/en/servicios`)
**WHEN** selecciona "PT" en el selector de idioma
**THEN** es llevado a `/pt/servicios` y ve la misma página de servicios en portugués

### Scenario: Visitante cambia de idioma desde el menú móvil

**GIVEN** un visitante en dispositivo móvil con el drawer del menú abierto
**WHEN** toca la opción de idioma deseado dentro del drawer
**THEN** el drawer se cierra, el visitante es llevado al mismo contenido en el nuevo locale

### Scenario: Idioma activo destacado visualmente

**GIVEN** un visitante que navega en árabe (`/ar/`)
**WHEN** abre el selector de idioma
**THEN** la opción árabe aparece visualmente diferenciada del resto de opciones (color, peso tipográfico, o indicador gráfico)

### Scenario: Selector operable con teclado

**GIVEN** un usuario que navega el sitio sin ratón, usando únicamente el teclado
**WHEN** enfoca el selector de idioma con Tab y lo activa con Enter
**THEN** puede moverse entre las opciones con las teclas de dirección, seleccionar con Enter y cerrar con Escape

### Scenario: Sin persistencia entre sesiones

**GIVEN** un visitante que eligió inglés en una sesión anterior y regresa al sitio desde la URL raíz `/`
**WHEN** la página carga
**THEN** ve el contenido en español (idioma por defecto de la URL raíz), sin que el sitio recuerde la preferencia previa

## Acceptance Criteria

- [ ] El selector de idioma es visible en la Navbar en escritorio (a la derecha del botón CTA)
- [ ] El selector de idioma es accesible dentro del menú drawer en móvil
- [ ] Al seleccionar un idioma, el usuario permanece en la misma sección/página del sitio pero en el nuevo locale
- [ ] El idioma activo está visualmente destacado en el selector
- [ ] El selector es operable con teclado (Tab, Enter, Escape) y anuncia su estado a lectores de pantalla
- [ ] El selector no usa cookies ni almacenamiento local; la preferencia se refleja solo en la URL

## Related

- [[i18n-routing-locale-prefixes]] — el selector construye URLs usando el esquema de prefijos definido por el routing
- [[i18n-translations-json-structure]] — las etiquetas del propio selector se sirven desde los JSONs de traducción
- [[i18n-rtl-support-arabic]] — al cambiar a árabe, el selector debe funcionar correctamente en layout RTL
