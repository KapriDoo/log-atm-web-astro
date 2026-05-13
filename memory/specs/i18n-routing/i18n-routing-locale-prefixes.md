---
type: capability-spec
title: "Rutas multilingües con prefijo de idioma"
capability: "i18n-routing"
slug: "i18n-routing-locale-prefixes"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
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
  - "Cada página actual del sitio existe en los seis idiomas con URL predecible."
  - "Las URLs en español no llevan prefijo de idioma."
  - "Las URLs en los otros cinco idiomas llevan el prefijo `/{idioma}/`."
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
updated: "2026-05-12"
tags: [capability-spec, i18n, routing]
---

# Rutas multilingües con prefijo de idioma

## Purpose

Cada página actual de LOG ATM (home, servicios, industrias, nosotros, contacto, cotizar, 404 y los detalles de carga aérea y marítima) debe estar disponible en los seis idiomas, con URLs predecibles que un visitante puede copiar, compartir y volver a abrir conservando el idioma elegido.

## Requirements

- El sistema SHALL ofrecer las nueve páginas existentes (home, servicios, servicios/carga-aérea, servicios/carga-marítima, industrias, nosotros, contacto, cotizar, 404) en los seis idiomas.
- El sistema SHALL servir las versiones en español sin prefijo de idioma en la URL.
- El sistema SHALL servir las versiones en inglés, chino, hindi, árabe y portugués bajo el prefijo `/{código-idioma}/` en la URL.
- El sistema SHALL preservar el idioma seleccionado al navegar entre páginas internas.
- El sistema SHALL devolver la versión 404 en el idioma del prefijo cuando la URL incluye prefijo válido y el resto del path no existe.

## Scenarios

### Scenario: Visitante navega a la home en cada idioma

**GIVEN** un visitante en el sitio
**WHEN** abre las URLs `/`, `/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/`
**THEN** cada una le muestra la home en el idioma correspondiente

### Scenario: Visitante navega a una página interna en inglés

**GIVEN** un visitante en `/en/`
**WHEN** sigue el enlace de servicios
**THEN** llega a `/en/servicios` con el contenido en inglés y el idioma se mantiene

### Scenario: Visitante accede a una URL en chino que no existe

**GIVEN** un visitante que abre `/zh/ruta-inexistente`
**WHEN** la página se renderiza
**THEN** ve la página 404 en chino

### Scenario: Visitante comparte una URL en árabe

**GIVEN** un visitante que copia `/ar/cotizar` y lo abre en otro navegador
**WHEN** la página carga
**THEN** se muestra el formulario de cotización en árabe sin pasos adicionales

## Acceptance Criteria

- [ ] `astro build` genera al menos 54 páginas HTML (9 rutas × 6 idiomas).
- [ ] Las URLs en español no tienen prefijo de idioma.
- [ ] Los otros 5 idiomas se sirven bajo `/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/`.
- [ ] Una URL en cualquier idioma abierta directamente preserva el idioma sin redirección.

## Related

- [[i18n-core-translation-helpers]] — cómo se resuelve el idioma activo
- [[i18n-seo-hreflang]] — links alternativos entre idiomas equivalentes
