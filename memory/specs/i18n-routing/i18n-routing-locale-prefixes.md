---
type: capability-spec
title: "Rutas multilingües con prefijo de idioma"
capability: "i18n-routing"
slug: "i18n-routing-locale-prefixes"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: "[[i18n-routing-pages-and-language-selector]]"
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[i18n-core-translation-helpers]]"
change_ref: "[[rescue-multi-language-support]]"
worktree: ".sdd/worktrees/rescue-multi-language-support"
feature_branch: "feature/rescue-multi-language-support"
commits: []
mr: ""
acceptance_criteria:
  - "Cada página prerenderizada del sitio existe en los tres idiomas con URL predecible."
  - "Las URLs en español no llevan prefijo de idioma."
  - "Las URLs en inglés y portugués llevan el prefijo `/{idioma}/`."
  - "Compartir la URL de una página y abrirla preserva el idioma elegido."
related:
  - "[[i18n-core-translation-helpers]]"
  - "[[i18n-seo-hreflang]]"
affects: []
adrs:
  - "[[0002-i18n-routing-pages-lang-folder]]"
scope:
  - "log-atm-web-astro/src/pages/[lang]/"
  - "log-atm-web-astro/astro.config.mjs"
verified_at: null
created: "2026-05-12"
updated: "2026-10-08"
tags: [capability-spec, i18n, routing]
---

# Rutas multilingües con prefijo de idioma

## Purpose

Cada página de LOG ATM (home, servicios, industrias, nosotros, contacto y cotizar) debe estar disponible en español, inglés y portugués, con URLs predecibles que un visitante puede copiar, compartir y volver a abrir conservando el idioma elegido. [[i18n-routing-pages-and-language-selector]] reemplaza a esta spec y concuerda con ella en los tres idiomas y en las seis páginas; la página 404 es única, se genera bajo demanda y se rige por [[0007-not-found-page-on-demand-single]].

## Requirements

- El sistema SHALL ofrecer las seis páginas existentes (home, servicios, industrias, nosotros, contacto y cotizar) en los tres idiomas.
- El sistema SHALL servir las versiones en español sin prefijo de idioma en la URL.
- El sistema SHALL servir las versiones en inglés y portugués bajo el prefijo `/{código-idioma}/` en la URL.
- El sistema SHALL preservar el idioma seleccionado al navegar entre páginas internas.
- El sistema SHALL tratar la página 404 como una página única, generada bajo demanda, que toma el idioma del prefijo de la URL; la 404 queda fuera de la cuenta de páginas por idioma.

## Scenarios

### Scenario: Visitante navega a la home en cada idioma

**GIVEN** un visitante en el sitio
**WHEN** abre las URLs `/`, `/en/` y `/pt/`
**THEN** cada una le muestra la home en el idioma correspondiente

### Scenario: Visitante navega a una página interna en inglés

**GIVEN** un visitante en `/en/`
**WHEN** sigue el enlace de servicios
**THEN** llega a `/en/servicios` con el contenido en inglés y el idioma se mantiene

### Scenario: Visitante accede a una URL inexistente con prefijo de idioma

**GIVEN** un visitante que abre `/pt/ruta-inexistente`
**WHEN** la página se renderiza
**THEN** ve la página 404 en portugués, como describe [[i18n-not-found-localized]]

### Scenario: Visitante comparte una URL en portugués

**GIVEN** un visitante que copia `/pt/cotizar` y la abre en otro navegador
**WHEN** la página carga
**THEN** se muestra el formulario de cotización en portugués sin pasos adicionales

## Acceptance Criteria

- [ ] La construcción del sitio genera, por idioma, las seis páginas prerenderizadas (18 HTML en total), y la 404 bajo demanda no figura entre ellas.
- [ ] Las URLs en español no tienen prefijo de idioma.
- [ ] Los otros dos idiomas se sirven bajo `/en/` y `/pt/`.
- [ ] Una URL en cualquier idioma abierta directamente preserva el idioma sin redirección.

## Related

- [[i18n-core-translation-helpers]] — cómo se resuelve el idioma activo
- [[i18n-seo-hreflang]] — links alternativos entre idiomas equivalentes
- [[i18n-routing-pages-and-language-selector]] — spec que reemplaza a esta
