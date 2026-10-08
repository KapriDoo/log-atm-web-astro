---
type: capability-spec
title: "SEO multilingüe — hreflang, og:locale y sitemap"
capability: "i18n-seo-hreflang"
slug: "i18n-seo-hreflang"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]"
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-core-translation-helpers]]"
change_ref: "[[rescue-multi-language-support]]"
worktree: ".sdd/worktrees/rescue-multi-language-support"
feature_branch: "feature/rescue-multi-language-support"
commits: []
mr: ""
acceptance_criteria:
  - "Cada página indexable declara explícitamente sus equivalentes en los otros dos idiomas."
  - "El sitemap del sitio incluye las URLs de las seis páginas en los tres idiomas y no incluye la 404."
  - "Cada página declara el atributo `og:locale` con el código correcto."
related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-core-translation-helpers]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/layouts/"
  - "log-atm-web-astro/astro.config.mjs"
verified_at: null
created: "2026-05-12"
updated: "2026-10-08"
tags: [capability-spec, i18n, seo]
---

# SEO multilingüe — hreflang, og:locale y sitemap

## Purpose

Los buscadores deben poder descubrir, indexar y mostrar al usuario la versión correcta de cada página según su idioma preferido. Las redes sociales deben reflejar el idioma correcto en los previews compartidos. [[i18n-seo-alternates-sitemap-and-breadcrumbs]] reemplaza a esta spec y concuerda con ella en los tres idiomas, en las 18 URLs del sitemap y en la exclusión de la página 404.

## Requirements

- El sistema SHALL declarar en el `<head>` de cada página indexable los enlaces alternativos `<link rel="alternate" hreflang>` hacia sus equivalentes en los tres idiomas (la propia versión incluida).
- El sistema SHALL incluir un enlace alternativo adicional con `hreflang="x-default"` apuntando a la versión en español.
- El sistema SHALL declarar `og:locale` con el código BCP-47 del idioma activo y `og:locale:alternate` para los otros dos idiomas.
- El sistema SHALL generar un sitemap que incluye las URLs de las seis páginas en los tres idiomas (18 entradas), con los enlaces alternativos de cada bloque de URL, y sin la página 404.
- El sistema SHALL usar tags BCP-47 con región (`es-CL`, `en-US`, `pt-BR`).

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

## Acceptance Criteria

- [ ] Cada página HTML indexable contiene 3 `<link rel="alternate" hreflang>` de idioma más 1 `x-default`.
- [ ] El `<head>` declara `og:locale` correcto por idioma y los otros dos como `og:locale:alternate`.
- [ ] El sitemap incluye 18 URLs, con sus enlaces alternativos y sin la 404.
- [ ] Los tags BCP-47 del sitemap y de los `hreflang` coinciden con el atributo de idioma del documento.

## Related

- [[i18n-routing-locale-prefixes]] — URLs que se referencian en los hreflang
- [[i18n-core-translation-helpers]] — fuente del flag de idioma y tags BCP-47
- [[i18n-seo-alternates-sitemap-and-breadcrumbs]] — spec que reemplaza a esta
