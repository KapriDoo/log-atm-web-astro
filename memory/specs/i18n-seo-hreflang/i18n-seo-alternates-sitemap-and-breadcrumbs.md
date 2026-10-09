---
type: capability-spec
title: "Alternativas de idioma, sitemap y migas localizadas en tres idiomas"
capability: "i18n-seo-hreflang"
slug: "i18n-seo-alternates-sitemap-and-breadcrumbs"
domain: "debt"
delta_type: MODIFY
supersedes: "[[i18n-seo-hreflang]]"
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[i18n-routing-pages-and-language-selector]]"
  - "[[i18n-core-three-locales-single-source]]"
change_ref: "[[debt-i18n-three-locales]]"
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales
feature_branch: feature/debt-i18n-three-locales
mr: ""
acceptance_criteria:
  - "[x] Cada página HTML indexable contiene 3 `<link rel=\"alternate\" hreflang>` de idioma más 1 `x-default`, idénticos a los de la línea base medida en `main@1c70406`."
  - "[x] El `<head>` declara `og:locale` correcto por idioma y los otros dos como `og:locale:alternate`."
  - "[x] El sitemap incluye 18 URLs, idénticas a las de la línea base, con sus enlaces alternativos y sin la 404."
  - "[x] Los tags BCP-47 del sitemap y de los `hreflang` coinciden con el atributo de idioma del documento y con la definición única de idiomas."
  - "[x] La página 404 no emite alternativas de idioma, canónica, dirección para redes sociales ni migas."
  - "[x] El `name` del primer ítem de `BreadcrumbList` es «Inicio» en `dist/client/**`, «Home» en `dist/client/en/**` e «Início» en `dist/client/pt/**`, y es la única diferencia de los datos estructurados respecto de la línea base."
  - "[x] [[i18n-seo-hreflang]] declara `superseded_by` hacia esta spec."

related:
  - "[[i18n-seo-hreflang]]"
  - "[[i18n-routing-pages-and-language-selector]]"
  - "[[i18n-core-three-locales-single-source]]"
  - "[[i18n-not-found-navigation-and-seo-signals]]"
  - "[[i18n-not-found-localized]]"
affects: []
adrs:
  - "[[0007-not-found-page-on-demand-single]]"
scope:
  - "log-atm-web-astro/src/layouts/BaseLayout.astro"
  - "log-atm-web-astro/src/i18n/utils.ts"
  - "log-atm-web-astro/astro.config.mjs"
verified_at: 2026-10-08

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec, i18n]
---

# Alternativas de idioma, sitemap y migas localizadas en tres idiomas

## Purpose

Los buscadores descubren, indexan y muestran la versión correcta de cada página según el idioma preferido del usuario, y las redes sociales reflejan el idioma correcto en los previews compartidos. Los datos estructurados de migas muestran el nombre del inicio en el idioma de la página. Esta spec reemplaza a [[i18n-seo-hreflang]] para los tres idiomas y deja fuera la página 404, que no emite señales hacia su URL ([[i18n-not-found-navigation-and-seo-signals]], [[0007-not-found-page-on-demand-single]]).

## Requirements

- El sistema SHALL declarar en el `<head>` de cada página indexable los enlaces alternativos `<link rel="alternate" hreflang>` hacia sus equivalentes en los tres idiomas (la propia versión incluida).
- El sistema SHALL incluir un enlace alternativo adicional con `hreflang="x-default"` hacia la versión en español.
- El sistema SHALL declarar `og:locale` con el código del idioma activo y `og:locale:alternate` para los otros dos idiomas.
- El sistema SHALL generar un sitemap que incluye las URLs de las seis páginas en los tres idiomas (18 entradas), con los enlaces alternativos de cada bloque de URL.
- El sistema SHALL usar tags BCP-47 con región (`es-CL`, `en-US`, `pt-BR`) tomados de la definición única de idiomas, de modo que el sitemap, los `hreflang` y el atributo de idioma del documento coincidan.
- El sistema SHALL NOT emitir alternativas de idioma, dirección canónica, dirección para redes sociales ni datos estructurados de migas en la página 404.
- El sistema SHALL mostrar, en el primer elemento de los datos estructurados de migas, el nombre del inicio en el idioma de la página: «Inicio» en español, «Home» en inglés e «Início» en portugués.

## Scenarios

### Scenario: Buscador rastrea la home en español

**GIVEN** un buscador que rastrea `/`
**WHEN** lee el `<head>` de la página
**THEN** encuentra enlaces alternativos a las versiones en español, inglés y portugués y un enlace `x-default` a `/`

### Scenario: Usuario comparte un enlace en portugués en redes sociales

**GIVEN** un usuario que comparte `/pt/servicios` en una red social
**WHEN** la red social genera el preview
**THEN** el preview indica el idioma portugués y declara los otros dos idiomas como alternativos

### Scenario: Auditoría de sitemap

**GIVEN** un equipo que verifica el sitemap del sitio
**WHEN** lo descarga
**THEN** encuentra las 18 URLs esperadas (6 páginas en 3 idiomas), con cada bloque declarando sus enlaces alternativos, y ninguna URL de la 404

### Scenario: Buscador rastrea una URL inexistente

**GIVEN** un buscador que llega a una URL inexistente
**WHEN** recibe la página 404
**THEN** la página no declara alternativas de idioma, dirección canónica ni migas hacia la URL inexistente

### Scenario: Buscador lee las migas de una página en inglés

**GIVEN** un buscador que rastrea una página interna en inglés
**WHEN** lee los datos estructurados de migas
**THEN** el primer elemento se llama «Home»

### Scenario: Buscador lee las migas de una página en portugués

**GIVEN** un buscador que rastrea una página interna en portugués
**WHEN** lee los datos estructurados de migas
**THEN** el primer elemento se llama «Início»

## Acceptance Criteria

- [x] Cada página HTML indexable contiene 3 `<link rel="alternate" hreflang>` de idioma más 1 `x-default`, idénticos a los de la línea base medida en `main@1c70406`.
- [x] El `<head>` declara `og:locale` correcto por idioma y los otros dos como `og:locale:alternate`.
- [x] El sitemap incluye 18 URLs, idénticas a las de la línea base, con sus enlaces alternativos y sin la 404.
- [x] Los tags BCP-47 del sitemap y de los `hreflang` coinciden con el atributo de idioma del documento y con la definición única de idiomas.
- [x] La página 404 no emite alternativas de idioma, canónica, dirección para redes sociales ni migas.
- [x] El `name` del primer ítem de `BreadcrumbList` es «Inicio» en `dist/client/**`, «Home» en `dist/client/en/**` e «Início» en `dist/client/pt/**`, y es la única diferencia de los datos estructurados respecto de la línea base.
- [x] [[i18n-seo-hreflang]] declara `superseded_by` hacia esta spec.

## Related

- [[i18n-seo-hreflang]] — spec reemplazada por esta; su texto concuerda con esta spec en los tres idiomas y las 18 URLs del sitemap
- [[i18n-routing-pages-and-language-selector]] — URLs que se referencian en las alternativas
- [[i18n-core-three-locales-single-source]] — fuente única de idiomas y de tags BCP-47
- [[i18n-not-found-navigation-and-seo-signals]] — la 404 no emite señales hacia la URL inexistente
- [[i18n-not-found-localized]] — la 404 toma el idioma del prefijo
