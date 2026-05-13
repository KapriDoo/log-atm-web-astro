---
type: capability-spec
title: "Helpers de traducción y resolución de locale"
capability: "i18n-core"
slug: "i18n-core-translation-helpers"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[rescue-multi-language-support]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "Las páginas servidas en español, inglés, chino, hindi, árabe y portugués muestran cada texto en el idioma correspondiente."
  - "Cuando una traducción no existe en el idioma actual, el visitante ve la versión en español sin que la página falle."
  - "Cuando una traducción tampoco existe en español, el visitante ve la propia clave (texto técnico visible) y queda registro en consola del navegador para diagnóstico."
related:
  - "[[i18n-translations-json-structure]]"
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-rtl-support-arabic]]"
affects: []
adrs:
  - "[[0002-i18n-routing-pages-lang-folder]]"
scope:
  - "log-atm-web-astro/src/i18n/config.ts"
  - "log-atm-web-astro/src/i18n/types.ts"
  - "log-atm-web-astro/src/i18n/utils.ts"
verified_at: null
created: "2026-05-12"
updated: "2026-05-12"
tags: [capability-spec, i18n]
---

# Helpers de traducción y resolución de locale

## Purpose

LOG ATM atiende clientes en seis idiomas (español, inglés, chino, hindi, árabe, portugués). El sitio debe ofrecer cada texto del UI en el idioma del visitante, con español como respaldo confiable cuando una traducción aún no esté disponible.

## Requirements

- El sistema SHALL reconocer seis idiomas soportados: español (default), inglés, chino, hindi, árabe y portugués.
- El sistema SHALL servir el contenido en español cuando el visitante accede sin indicador de idioma en la URL.
- El sistema SHALL servir el contenido en el idioma indicado cuando el visitante accede a una URL con prefijo de idioma reconocido.
- El sistema SHALL caer a español como respaldo cuando una traducción específica no esté disponible en el idioma actual.
- El sistema SHALL exponer texto crudo (la propia clave) y registrar un aviso visible al desarrollador cuando una traducción no esté disponible ni en el idioma actual ni en español.
- El sistema SHOULD soportar interpolación de variables (p. ej. nombres, números) en los textos traducidos.
- El sistema SHALL identificar el árabe como idioma de escritura de derecha a izquierda; los demás idiomas como izquierda a derecha.

## Scenarios

### Scenario: Visitante accede a la home en español

**GIVEN** un visitante que abre la URL raíz del sitio
**WHEN** la página se renderiza
**THEN** todos los textos visibles aparecen en español

### Scenario: Visitante accede a una página en inglés

**GIVEN** un visitante que abre una URL con prefijo `/en/`
**WHEN** la página se renderiza
**THEN** todos los textos visibles aparecen en inglés

### Scenario: Una traducción falta en el idioma seleccionado

**GIVEN** un visitante en una página en hindi en la que falta una traducción específica
**WHEN** la página se renderiza
**THEN** ese fragmento aparece en español, las demás traducciones se muestran en hindi y la página no falla

### Scenario: Una traducción falta también en español

**GIVEN** un visitante en cualquier idioma en una página cuya clave no existe en ningún diccionario
**WHEN** la página se renderiza
**THEN** se muestra la propia clave técnica como texto, queda un aviso en consola del navegador y la página no falla

## Acceptance Criteria

- [ ] La página `/` muestra textos en español; `/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/` muestran el respectivo idioma.
- [ ] Una clave traducida solo en español se muestra en español en los seis idiomas.
- [ ] Una clave inexistente en todos los diccionarios se muestra como su literal y deja warning visible en consola.
- [ ] Una traducción con placeholder `{nombre}` interpola correctamente el valor pasado.

## Related

- [[i18n-translations-json-structure]] — formato de los diccionarios JSON que estos helpers consumen
- [[i18n-routing-locale-prefixes]] — cómo se obtiene el idioma activo desde la URL
- [[i18n-rtl-support-arabic]] — uso del flag de direccionalidad
