---
type: capability-spec
title: "SEO multilingüe — hreflang, og:locale y sitemap"
capability: "i18n-seo-hreflang"
slug: "i18n-seo-hreflang"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
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
  - "Cada página declara explícitamente sus equivalentes en los otros cinco idiomas."
  - "El sitemap del sitio incluye todas las URLs de los seis idiomas."
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
updated: "2026-05-12"
tags: [capability-spec, i18n, seo]
---

# SEO multilingüe — hreflang, og:locale y sitemap

## Purpose

Los buscadores deben poder descubrir, indexar y mostrar al usuario la versión correcta de cada página según su idioma preferido. Las redes sociales deben reflejar el idioma correcto en los previews compartidos.

## Requirements

- El sistema SHALL declarar en el `<head>` de cada página los enlaces alternativos `<link rel="alternate" hreflang>` apuntando a sus equivalentes en los otros cinco idiomas.
- El sistema SHALL incluir un enlace alternativo adicional con `hreflang="x-default"` apuntando a la versión en español.
- El sistema SHALL declarar `og:locale` con el código BCP-47 del idioma activo y `og:locale:alternate` para los otros cinco idiomas.
- El sistema SHALL generar un sitemap que incluye todas las URLs de las nueve rutas en los seis idiomas (al menos 54 entradas).
- El sistema SHALL usar tags BCP-47 con región cuando aplique (por ejemplo `es-CL`, `en-US`, `pt-BR`) y los códigos puros cuando no (`zh`, `hi`, `ar`).

## Scenarios

### Scenario: Buscador rastrea la home en español

**GIVEN** un buscador que rastrea `/`
**WHEN** lee el `<head>` de la página
**THEN** encuentra cinco enlaces alternativos a `/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/` y un enlace `x-default` a `/`

### Scenario: Usuario comparte un enlace en árabe en redes sociales

**GIVEN** un usuario que comparte `/ar/servicios` en una red social
**WHEN** la red social genera el preview
**THEN** el preview indica `og:locale: ar` (o equivalente) y el contenido refleja el árabe

### Scenario: Auditoría de sitemap

**GIVEN** un equipo que verifica el sitemap del sitio
**WHEN** lo descarga
**THEN** encuentra al menos las 54 URLs esperadas (9 rutas × 6 idiomas), con cada bloque de URL declarando sus enlaces alternativos hreflang

## Acceptance Criteria

- [ ] Cada página HTML generada contiene 5 `<link rel="alternate" hreflang>` no-default + 1 `x-default`.
- [ ] El `<head>` declara `og:locale` correcto por idioma.
- [ ] El sitemap incluye las 54 URLs (mínimo).
- [ ] Tags BCP-47 alineados con `HTML_LANG` de la configuración.

## Related

- [[i18n-routing-locale-prefixes]] — URLs que se referencian en los hreflang
- [[i18n-core-translation-helpers]] — fuente del flag de idioma y tags BCP-47
