---
type: capability-spec
title: "La página 404 ofrece salidas útiles y no emite señales SEO a la URL inexistente"
capability: "i18n-routing"
slug: "i18n-not-found-navigation-and-seo-signals"
domain: "fix"
delta_type: ADD
supersedes: null
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[fix-i18n-links-and-404]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404"
feature_branch: "feature/fix-i18n-links-and-404"
commits: ["d8bfa0e", "bbd659c", "84af1c9"]
mr: ""
acceptance_criteria:
  - "En la página 404, el selector de idioma ofrece la home de cada idioma y ninguna dirección derivada de la URL inexistente."
  - "La página 404 no declara dirección canónica, dirección para redes sociales, enlaces alternativos de idioma ni datos estructurados de migas que apunten a la URL inexistente."
  - "En las páginas existentes, el selector de idioma y las señales de SEO (canónica, redes sociales, idiomas alternativos, migas) se mantienen como antes."
related:
  - "[[i18n-not-found-localized]]"
  - "[[i18n-ui-selector-navbar]]"
  - "[[i18n-seo-hreflang]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/components/ui/Navbar.astro"
  - "log-atm-web-astro/src/layouts/BaseLayout.astro"
  - "log-atm-web-astro/src/pages/404.astro"
verified_at: null
created: "2026-10-02"
updated: "2026-10-02"
tags: [capability-spec, i18n, seo, 404]
---

# La página 404 ofrece salidas útiles y no emite señales SEO a la URL inexistente

## Purpose

Como la página 404 se genera según la URL solicitada, el selector de idioma y las señales de SEO podrían derivarse de una dirección que no existe: el visitante vería tres enlaces que llevan a más errores 404 y los buscadores recibirían direcciones canónicas inexistentes. Esta spec fija que la 404 ofrece salidas útiles y no emite señales que apunten a la URL inexistente.

## Requirements

- El sistema SHALL ofrecer en el selector de idioma de la página 404 un enlace a la home de cada idioma disponible.
- El sistema SHALL NOT ofrecer en el selector de idioma de la página 404 ninguna dirección derivada de la URL inexistente.
- El sistema SHALL NOT declarar en la página 404 una dirección canónica, una dirección para redes sociales, enlaces alternativos de idioma ni datos estructurados de migas de pan que apunten a la URL inexistente.
- El sistema SHALL mantener sin cambios el selector de idioma y las señales de SEO de todas las páginas existentes.
- El sistema SHALL mantener la página 404 indicando el idioma activo en el selector.

## Scenarios

### Scenario: Visitante cambia de idioma desde la 404 en inglés

**GIVEN** un visitante en la página 404 en inglés tras abrir una URL inexistente
**WHEN** abre el selector de idioma y elige portugués
**THEN** llega a la home en portugués y no a otra página 404

### Scenario: Buscador lee la página 404

**GIVEN** un buscador que recibe la página 404 de una URL inexistente
**WHEN** revisa la información de cabecera de la página
**THEN** no encuentra dirección canónica, ni idiomas alternativos, ni migas de pan que apunten a la URL inexistente

### Scenario: Páginas existentes conservan sus señales

**GIVEN** un buscador o un visitante en una página existente
**WHEN** revisa el selector de idioma y las señales de SEO
**THEN** son idénticos a los de antes del cambio

## Acceptance Criteria

- [ ] El selector de idioma de la 404 ofrece las homes de cada idioma y ninguna dirección derivada de la URL inexistente.
- [ ] La 404 no emite canónica, dirección social, idiomas alternativos ni migas estructuradas.
- [ ] Las páginas existentes mantienen selector y señales SEO sin cambios.

## Related

- [[i18n-not-found-localized]] — idioma y estado de la página 404
- [[i18n-ui-selector-navbar]] — comportamiento general del selector de idioma
- [[i18n-seo-hreflang]] — señales de idioma alternativo de las páginas existentes
