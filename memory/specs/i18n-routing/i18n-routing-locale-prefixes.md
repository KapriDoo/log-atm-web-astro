---
type: capability-spec
title: "Routing multi-idioma con prefijos por locale"
capability: "i18n-routing"
slug: "i18n-routing-locale-prefixes"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: critical
depends_on: []
change_ref: "[[multi-language-support]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support"
feature_branch: "feature/multi-language-support"
commits:
  - "76664bf"
mr: ""
acceptance_criteria:
  - "[x] El sitio sirve contenido en español sin prefijo de idioma en la URL (ruta raíz /)"
  - "[x] El sitio sirve contenido en inglés bajo /en/, en chino bajo /zh/, en hindi bajo /hi/, en árabe bajo /ar/ y en portugués bajo /pt/"
  - "[x] Navegar a una ruta de idioma no existente redirige al contenido en español como fallback"
  - "[x] Todas las rutas de páginas existentes (servicios, nosotros, contacto, cotizar, industrias) están disponibles en cada locale"
  - "[x] Las rutas en español no cambian (sin prefijo /es/) manteniendo compatibilidad con URLs ya indexadas"
  - "[x] El build estático genera HTML para cada página en cada locale sin errores"

related:
  - "[[i18n-translations-json-structure]]"
  - "[[i18n-seo-hreflang]]"
affects:
  - "[[i18n-translations-json-structure]]"
  - "[[i18n-seo-hreflang]]"
adrs: []
scope:
  - "astro.config.mjs"
  - "src/pages/**/*.astro"
  - "src/i18n/utils.ts"
verified_at: "2026-05-12"

created: "2026-05-11"
updated: "2026-05-12"
archived: "2026-05-12"
tags: [capability-spec, i18n, routing]
---

# Routing multi-idioma con prefijos por locale

## Purpose

El sitio LOG ATM debe ser accesible en seis idiomas mediante URLs distintas por locale, de modo que usuarios internacionales lleguen a contenido en su idioma y los motores de búsqueda indexen cada versión de forma independiente. El español, idioma principal de la empresa, mantiene las URLs actuales sin prefijo para no romper indexaciones existentes. El resto de idiomas se agrupan bajo un prefijo de dos letras (ej. `/en/`, `/zh/`).

## Requirements

- El sistema SHALL servir el contenido en español bajo las URLs raíz sin prefijo de locale (`/`, `/servicios`, `/nosotros`, etc.)
- El sistema SHALL servir el contenido en inglés, chino, hindi, árabe y portugués bajo sus respectivos prefijos de locale (`/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/`)
- El sistema SHALL aplicar fallback automático al español cuando una clave de traducción no exista en el locale solicitado
- El sistema SHALL generar estáticamente todas las combinaciones de página × locale durante el build
- El sistema SHALL mantener intactas las URLs en español preexistentes sin redirecciones ni cambios de ruta
- El sistema SHOULD resolver el locale activo directamente desde la URL sin necesidad de cookies ni cabeceras HTTP

## Scenarios

### Scenario: Usuario hispanohablante accede a la página de inicio

**GIVEN** un visitante que abre el sitio desde la URL raíz `/`
**WHEN** el servidor entrega la página
**THEN** el visitante ve todo el contenido en español, sin ningún prefijo de idioma visible en la URL

### Scenario: Usuario anglófono accede al sitio en inglés

**GIVEN** un visitante que navega a `/en/`
**WHEN** la página carga
**THEN** el visitante ve el contenido en inglés y la URL muestra el prefijo `/en/` durante toda su sesión en ese idioma

### Scenario: Usuario accede a una ruta inexistente en un locale no-default

**GIVEN** un visitante que intenta acceder a una URL con locale válido pero página inexistente (ej. `/fr/servicios`)
**WHEN** el sistema no encuentra la ruta
**THEN** el visitante es dirigido al contenido equivalente en español como idioma de fallback

### Scenario: Página de servicio disponible en todos los idiomas

**GIVEN** un visitante que conoce la URL de un servicio en inglés (`/en/servicios`)
**WHEN** accede a esa ruta
**THEN** ve la página de servicios en inglés, con la misma estructura y secciones que la versión española

### Scenario: Build estático genera todas las rutas

**GIVEN** el equipo de desarrollo ejecuta el proceso de construcción del sitio
**WHEN** el build se completa
**THEN** existen archivos HTML para cada combinación de página e idioma, sin errores de compilación

## Acceptance Criteria

- [x] El sitio sirve contenido en español sin prefijo de idioma en la URL (ruta raíz `/`)
- [x] El sitio sirve contenido en inglés bajo `/en/`, en chino bajo `/zh/`, en hindi bajo `/hi/`, en árabe bajo `/ar/` y en portugués bajo `/pt/`
- [x] Navegar a una ruta de idioma no existente redirige al contenido en español como fallback
- [x] Todas las rutas de páginas existentes (`servicios`, `nosotros`, `contacto`, `cotizar`, `industrias`) están disponibles en cada locale
- [x] Las rutas en español no cambian (sin prefijo `/es/`) manteniendo compatibilidad con URLs ya indexadas
- [x] El build estático genera HTML para cada página en cada locale sin errores

## Related

- [[i18n-translations-json-structure]] — las traducciones son el contenido que el routing expone por locale
- [[i18n-seo-hreflang]] — el routing define las URLs que los hreflang referencian
- [[i18n-ui-selector-navbar]] — el selector de idioma construye URLs usando el esquema de routing definido aquí
