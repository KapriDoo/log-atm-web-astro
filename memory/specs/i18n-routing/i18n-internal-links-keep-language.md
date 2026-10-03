---
type: capability-spec
title: "Los enlaces internos conservan el idioma de la página"
capability: "i18n-routing"
slug: "i18n-internal-links-keep-language"
domain: "fix"
delta_type: ADD
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[fix-i18n-links-and-404]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404"
feature_branch: "feature/fix-i18n-links-and-404"
commits: ["c50f5df", "4a496a0"]
mr: ""
acceptance_criteria:
  - "En las páginas en inglés y portugués, todo enlace interno de navegación lleva a la versión de la página en el mismo idioma."
  - "Las tarjetas de servicios de la home y del catálogo, los llamados a contacto de servicios e industrias, la migaja «Inicio» de las cinco páginas internas y el botón «volver al inicio» de la pantalla final de cotización conservan el idioma."
  - "Una revisión automatizada y repetible de todas las páginas en inglés y portugués no encuentra enlaces internos fuera de su idioma, excluyendo los del selector de idioma."
  - "Las páginas en español mantienen sus URLs sin prefijo de idioma."
related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[services-catalog-cta-and-detail-pages]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/components/sections/ServicesSection.astro"
  - "log-atm-web-astro/src/pages/servicios.astro"
  - "log-atm-web-astro/src/pages/industrias.astro"
  - "log-atm-web-astro/src/pages/contacto.astro"
  - "log-atm-web-astro/src/pages/nosotros.astro"
  - "log-atm-web-astro/src/pages/cotizar.astro"
  - "log-atm-web-astro/scripts/"
verified_at: null
created: "2026-10-02"
updated: "2026-10-02"
tags: [capability-spec, i18n, routing]
---

# Los enlaces internos conservan el idioma de la página

## Purpose

Un visitante que lee el sitio en inglés o en portugués espera seguir en ese idioma al hacer clic en cualquier enlace interno. Hoy varios enlaces de las tarjetas de servicios, de los llamados a contacto, de la migaja «Inicio» y del botón final de la cotización lo devuelven a la versión en español. Esta spec fija que la navegación interna respeta el idioma de la página de origen.

## Requirements

- El sistema SHALL llevar todo enlace interno de navegación de una página en inglés o portugués a la versión de la página de destino en ese mismo idioma.
- El sistema SHALL aplicar esta regla a las tarjetas de servicios de la home y del catálogo, a los llamados a contacto de las filas de servicios e industrias, a la migaja «Inicio» de las páginas internas (servicios, industrias, contacto, nosotros y cotizar) y al botón «volver al inicio» de la pantalla final de la cotización.
- El sistema SHALL mantener las URLs de las páginas en español sin prefijo de idioma.
- El sistema SHALL mantener los enlaces del selector de idioma apuntando a cada versión de idioma, porque ese es su propósito.
- El sistema SHOULD llevar al visitante a la página de destino en un solo paso, sin una redirección intermedia.
- El sistema SHOULD contar con una revisión automatizada y repetible que detecte enlaces internos fuera del idioma de la página, para evitar regresiones futuras.

## Scenarios

### Scenario: Visitante abre un servicio desde la home en inglés

**GIVEN** un visitante en la home en inglés
**WHEN** hace clic en una tarjeta de servicio que lleva al catálogo
**THEN** llega al catálogo de servicios en inglés

### Scenario: Visitante pide cotización desde la tarjeta de consultoría en portugués

**GIVEN** un visitante en el catálogo de servicios en portugués
**WHEN** hace clic en la tarjeta de consultoría
**THEN** llega al formulario de cotización en portugués

### Scenario: Visitante contacta desde la lista de industrias en inglés

**GIVEN** un visitante en la página de industrias en inglés
**WHEN** hace clic en el llamado a contacto de una industria
**THEN** llega a la página de contacto en inglés

### Scenario: Visitante vuelve al inicio desde una página interna en portugués

**GIVEN** un visitante en cualquiera de las páginas internas en portugués
**WHEN** hace clic en «Inicio» de la migaja de navegación
**THEN** llega a la home en portugués

### Scenario: Visitante termina una cotización en inglés

**GIVEN** un visitante que completó la cotización en inglés
**WHEN** hace clic en «volver al inicio» de la pantalla final
**THEN** llega a la home en inglés

### Scenario: Visitante en español navega sin prefijo

**GIVEN** un visitante en una página en español
**WHEN** hace clic en cualquier enlace interno de navegación
**THEN** llega a la versión en español, con una URL sin prefijo de idioma

### Scenario: Visitante cambia de idioma con el selector

**GIVEN** un visitante en una página en inglés
**WHEN** elige otro idioma en el selector
**THEN** llega a la misma página en el idioma elegido

## Acceptance Criteria

- [ ] En las páginas en inglés y portugués, ningún enlace interno de navegación lleva a una versión en otro idioma, con excepción de los enlaces del selector de idioma.
- [ ] Las tarjetas de servicios (home y catálogo), los llamados a contacto de servicios e industrias, la migaja «Inicio» de las cinco páginas internas y el botón «volver al inicio» de cotización conservan el idioma en inglés y portugués.
- [ ] Una revisión automatizada y repetible de todas las páginas en inglés y portugués confirma cero enlaces internos fuera de su idioma, excluyendo el selector de idioma.
- [ ] Las páginas en español mantienen sus URLs sin prefijo.

## Related

- [[i18n-routing-locale-prefixes]] — requisito general de preservar el idioma al navegar entre páginas internas
- [[services-catalog-cta-and-detail-pages]] — comportamiento vigente de las tarjetas de servicios
