---
type: capability-spec
title: "La página 404 se muestra en el idioma del prefijo de la URL"
capability: "i18n-routing"
slug: "i18n-not-found-localized"
domain: "fix"
delta_type: ADD
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: high
depends_on: []
change_ref: "[[fix-i18n-links-and-404]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404"
feature_branch: "feature/fix-i18n-links-and-404"
commits: ["84af1c9"]
mr: ""
acceptance_criteria:
  - "[x] Una URL inexistente bajo /en/ responde «no encontrado» con la página 404 en inglés, a cualquier profundidad y con o sin barra final."
  - "[x] Una URL inexistente bajo /pt/ responde «no encontrado» con la página 404 en portugués, a cualquier profundidad y con o sin barra final."
  - "[x] Una URL inexistente sin prefijo responde «no encontrado» con la página 404 en español."
  - "[x] La página 404 declara el idioma que corresponde al prefijo y pide a los buscadores no indexarla."
  - "[x] Las direcciones /en/404/ y /pt/404/ responden «no encontrado» y no como páginas existentes."
  - "[x] Las páginas existentes y el servicio del formulario de contacto mantienen su comportamiento."
related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[scroll-404-effect]]"
  - "[[i18n-not-found-navigation-and-seo-signals]]"
affects: []
adrs: []
scope:
  - "log-atm-web-astro/src/pages/404.astro"
  - "log-atm-web-astro/src/pages/[lang]/404.astro"
verified_at: "2026-10-02"
created: "2026-10-02"
updated: "2026-10-02"
tags: [capability-spec, i18n, routing, 404]
---

# La página 404 se muestra en el idioma del prefijo de la URL

## Purpose

Un visitante que llega a una dirección inexistente dentro de la versión en inglés o en portugués del sitio debe ver el mensaje de error en su idioma. Hoy ve la página 404 en español. Esta spec cumple, para los idiomas con prefijo vigentes, el requisito de que la 404 se devuelva en el idioma del prefijo.

## Requirements

- El sistema SHALL mostrar la página 404 en inglés cuando la URL inexistente comienza con el prefijo de inglés, sea cual sea la profundidad de la ruta y con o sin barra final.
- El sistema SHALL mostrar la página 404 en portugués cuando la URL inexistente comienza con el prefijo de portugués, con las mismas condiciones.
- El sistema SHALL mostrar la página 404 en español cuando la URL inexistente no lleva prefijo de idioma.
- El sistema SHALL responder con el estado «no encontrado» (404) en todos los casos anteriores.
- El sistema SHALL declarar en la página 404 el idioma que corresponde al prefijo de la URL.
- El sistema SHALL pedir a los buscadores que no indexen la página 404 ni sigan sus enlaces.
- El sistema SHALL responder «no encontrado» ante las direcciones de la página 404 con prefijo (por ejemplo `/en/404/`), en lugar de servirlas como páginas existentes.
- El sistema SHALL mantener sin cambios la respuesta de las páginas existentes y del servicio del formulario de contacto.
- El sistema SHALL mantener el efecto de rebote del texto «404» y el respeto a la preferencia de movimiento reducido, en los tres idiomas.
- El sistema SHOULD mantener una única definición de la página 404 para todos los idiomas.

## Scenarios

### Scenario: Visitante abre una URL inexistente en inglés

**GIVEN** un visitante que abre una URL inexistente bajo el prefijo de inglés
**WHEN** el sitio responde
**THEN** ve el mensaje «Page not found» en inglés, con estado «no encontrado»

### Scenario: Visitante abre una URL inexistente profunda en portugués

**GIVEN** un visitante que abre una URL inexistente de varios niveles bajo el prefijo de portugués
**WHEN** el sitio responde
**THEN** ve el mensaje «Página não encontrada» en portugués, con estado «no encontrado»

### Scenario: Visitante abre una URL inexistente sin prefijo

**GIVEN** un visitante que abre una URL inexistente sin prefijo de idioma
**WHEN** el sitio responde
**THEN** ve la página 404 en español, con estado «no encontrado»

### Scenario: Visitante abre la dirección de la propia página 404 en inglés

**GIVEN** un visitante que abre `/en/404/`
**WHEN** el sitio responde
**THEN** el sitio responde «no encontrado» y muestra la página 404 en inglés

### Scenario: Buscador rastrea una URL inexistente

**GIVEN** un buscador que solicita una URL inexistente en cualquier idioma
**WHEN** recibe la página 404
**THEN** recibe la instrucción de no indexarla

### Scenario: Páginas existentes y formulario de contacto

**GIVEN** un visitante que abre una página existente o usa el formulario de contacto
**WHEN** el sitio responde
**THEN** el comportamiento es idéntico al previo al cambio

## Acceptance Criteria

- [x] Una URL inexistente bajo `/en/` y bajo `/pt/` responde 404 con la página en el idioma del prefijo, a cualquier profundidad y con o sin barra final.
- [x] Una URL inexistente sin prefijo responde 404 con la página en español.
- [x] La página 404 declara el idioma correspondiente y la instrucción de no indexar.
- [x] `/en/404/` y `/pt/404/` responden 404.
- [x] Páginas existentes y servicio del formulario de contacto sin cambios.
- [x] El efecto de rebote del «404» y el movimiento reducido siguen funcionando en es, en y pt.
- [x] El comportamiento se verifica en una vista previa local que reproduce el entorno de ejecución del sitio (el criterio de producción se declara en el MR).

## Related

- [[i18n-routing-locale-prefixes]] — contiene el requisito general de devolver la 404 en el idioma del prefijo, que esta spec concreta para los idiomas vigentes
- [[scroll-404-effect]] — efecto de rebote del «404», que se conserva
- [[i18n-not-found-navigation-and-seo-signals]] — selector de idioma y señales de SEO de la misma página
