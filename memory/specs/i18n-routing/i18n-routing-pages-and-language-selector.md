---
type: capability-spec
title: "Seis páginas por idioma con prefijo y selector de idioma en el navbar"
capability: "i18n-routing"
slug: "i18n-routing-pages-and-language-selector"
domain: "debt"
delta_type: MODIFY
supersedes: "[[i18n-routing-locale-prefixes]]"
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: medium
depends_on:
  - "[[i18n-core-three-locales-single-source]]"
change_ref: "[[debt-i18n-three-locales]]"
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales
feature_branch: feature/debt-i18n-three-locales
mr: ""
acceptance_criteria:
  - "[ ] La construcción del sitio genera, por idioma, las seis páginas prerenderizadas (18 HTML en total), las mismas que la línea base medida en `main@1c70406`, y la 404 bajo demanda no figura entre ellas."
  - "[ ] Las URLs en español no tienen prefijo de idioma y las de inglés y portugués se sirven bajo `/en/` y `/pt/`."
  - "[ ] Una URL en cualquier idioma abierta directamente preserva el idioma sin redirección."
  - "[ ] El selector aparece en el navbar de escritorio y dentro del drawer móvil, y lista los tres idiomas."
  - "[ ] Cambiar de idioma redirige a la misma ruta con el prefijo correcto, y el idioma activo es identificable visualmente y con `aria-current`."
  - "[ ] El drawer móvil mantiene inert, focus-trap y respeto a `prefers-reduced-motion`, y el selector se opera completo con teclado."
  - "[ ] `npm run a11y` termina con exit 0 y `npm run check-i18n-links` no encuentra enlaces internos fuera de su idioma."
  - "[ ] Ninguna spec vigente de esta capability menciona `zh`, `hi` ni `ar`, y las specs [[i18n-not-found-localized]], [[i18n-not-found-navigation-and-seo-signals]] y [[i18n-internal-links-keep-language]] conservan su contenido y estado."
  - "[ ] [[i18n-routing-locale-prefixes]] e [[i18n-ui-selector-navbar]] declaran `superseded_by` hacia esta spec."
  - "[ ] ADR-0002 referencia a ADR-0007 en su nota de actualización fechada."

related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-ui-selector-navbar]]"
  - "[[i18n-internal-links-keep-language]]"
  - "[[i18n-not-found-localized]]"
  - "[[i18n-not-found-navigation-and-seo-signals]]"
  - "[[i18n-core-three-locales-single-source]]"
  - "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]"
affects:
  - "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]"
adrs:
  - "[[0002-i18n-routing-pages-lang-folder]]"
  - "[[0007-not-found-page-on-demand-single]]"
scope:
  - "log-atm-web-astro/src/pages/[lang]/"
  - "log-atm-web-astro/src/components/ui/LanguageSelector.astro"
  - "log-atm-web-astro/src/components/ui/Navbar.astro"
  - "log-atm-web-astro/astro.config.mjs"
verified_at: null

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec, i18n]
---

# Seis páginas por idioma con prefijo y selector de idioma en el navbar

## Purpose

Cada página de LOG ATM (home, servicios, industrias, nosotros, contacto y cotizar) está disponible en español, inglés y portugués, con URLs predecibles que un visitante puede copiar, compartir y volver a abrir conservando el idioma elegido. El selector de idioma del navbar permite cambiar de idioma desde cualquier página y dispositivo sin perder la página actual, y no degrada la accesibilidad del navbar. Esta spec reemplaza a [[i18n-routing-locale-prefixes]] y absorbe los requisitos de [[i18n-ui-selector-navbar]], que la declara como sucesora; los requisitos del selector se trasladan sin cambio de comportamiento. La página 404 se rige por [[i18n-not-found-localized]] y [[i18n-not-found-navigation-and-seo-signals]], según [[0007-not-found-page-on-demand-single]].

## Requirements

- El sistema SHALL ofrecer las seis páginas existentes (home, servicios, industrias, nosotros, contacto y cotizar) en los tres idiomas.
- El sistema SHALL servir las versiones en español sin prefijo de idioma en la URL.
- El sistema SHALL servir las versiones en inglés y portugués bajo el prefijo `/{código-idioma}/` en la URL.
- El sistema SHALL preservar el idioma seleccionado al navegar entre páginas internas, según [[i18n-internal-links-keep-language]].
- El sistema SHALL tratar la página 404 como una página única, generada bajo demanda, que toma el idioma del prefijo de la URL; la 404 queda fuera de la cuenta de páginas por idioma y se rige por [[i18n-not-found-localized]], [[i18n-not-found-navigation-and-seo-signals]] y [[0007-not-found-page-on-demand-single]].
- El sistema SHALL exponer un selector de idioma visible en el navbar de cualquier página, en variante de escritorio (junto a la navegación principal) y en variante móvil (dentro del drawer).
- El sistema SHALL listar los tres idiomas soportados en el selector con una etiqueta corta y un nombre nativo accesible para lectores de pantalla.
- El sistema SHALL marcar el idioma activo de forma visual y para tecnologías de apoyo.
- El sistema SHALL conducir al visitante a la misma página en el idioma elegido cuando lo selecciona.
- El sistema SHALL preservar el comportamiento del drawer móvil: inert al cerrarse, focus-trap al abrirse y respeto a `prefers-reduced-motion`.
- El sistema SHALL preservar el orden de encabezados y la jerarquía de landmarks del navbar.
- El sistema SHALL permitir operar el selector exclusivamente con teclado: tabular hasta él, abrirlo, navegar las opciones y seleccionar.

## Scenarios

### Scenario: Visitante navega a la home en cada idioma

**GIVEN** un visitante en el sitio
**WHEN** abre las URLs `/`, `/en/` y `/pt/`
**THEN** cada una le muestra la home en el idioma correspondiente

### Scenario: Visitante navega a una página interna en inglés

**GIVEN** un visitante en `/en/`
**WHEN** sigue el enlace de servicios
**THEN** llega a `/en/servicios` con el contenido en inglés y el idioma se mantiene

### Scenario: Visitante comparte una URL en portugués

**GIVEN** un visitante que copia `/pt/cotizar` y la abre en otro navegador
**WHEN** la página carga
**THEN** se muestra el formulario de cotización en portugués sin pasos adicionales

### Scenario: Visitante accede a una URL inexistente con prefijo de idioma

**GIVEN** un visitante que abre `/pt/ruta-inexistente`
**WHEN** la página se renderiza
**THEN** ve la página 404 en portugués, como describe [[i18n-not-found-localized]]

### Scenario: Visitante cambia de idioma desde escritorio

**GIVEN** un visitante en `/servicios` con el navegador en pantalla amplia
**WHEN** abre el selector de idioma y elige «English»
**THEN** llega a `/en/servicios` con el contenido traducido y el selector marca «English» como activo

### Scenario: Visitante cambia de idioma desde móvil

**GIVEN** un visitante en `/industrias` en un móvil
**WHEN** abre el drawer del navbar, navega al selector y elige «Português»
**THEN** llega a `/pt/industrias` con el contenido en portugués y el drawer se cierra restaurando el foco al botón que lo abrió

### Scenario: Usuario con lector de pantalla cambia de idioma

**GIVEN** un usuario navegando con lector de pantalla
**WHEN** tabula hasta el selector de idioma
**THEN** escucha una etiqueta clara que indica el idioma actual y la posibilidad de cambiarlo, y puede activar y seleccionar opciones solo con teclado

### Scenario: Visitante con movimiento reducido activo

**GIVEN** un visitante cuyo sistema operativo solicita reducir movimiento
**WHEN** abre el drawer móvil para cambiar de idioma
**THEN** el drawer aparece sin animaciones bruscas, conservando la operabilidad

## Acceptance Criteria

- [ ] La construcción del sitio genera, por idioma, las seis páginas prerenderizadas (18 HTML en total), las mismas que la línea base medida en `main@1c70406`, y la 404 bajo demanda no figura entre ellas.
- [ ] Las URLs en español no tienen prefijo de idioma y las de inglés y portugués se sirven bajo `/en/` y `/pt/`.
- [ ] Una URL en cualquier idioma abierta directamente preserva el idioma sin redirección.
- [ ] El selector aparece en el navbar de escritorio y dentro del drawer móvil, y lista los tres idiomas.
- [ ] Cambiar de idioma redirige a la misma ruta con el prefijo correcto, y el idioma activo es identificable visualmente y con `aria-current`.
- [ ] El drawer móvil mantiene inert, focus-trap y respeto a `prefers-reduced-motion`, y el selector se opera completo con teclado.
- [ ] `npm run a11y` termina con exit 0 y `npm run check-i18n-links` no encuentra enlaces internos fuera de su idioma.
- [ ] Ninguna spec vigente de esta capability menciona `zh`, `hi` ni `ar`, y las specs [[i18n-not-found-localized]], [[i18n-not-found-navigation-and-seo-signals]] y [[i18n-internal-links-keep-language]] conservan su contenido y estado.
- [ ] [[i18n-routing-locale-prefixes]] e [[i18n-ui-selector-navbar]] declaran `superseded_by` hacia esta spec.
- [ ] ADR-0002 referencia a ADR-0007 en su nota de actualización fechada.

## Related

- [[i18n-routing-locale-prefixes]] — spec reemplazada por esta; su texto concuerda con esta spec en los tres idiomas y las seis páginas
- [[i18n-ui-selector-navbar]] — spec absorbida: sus requisitos del selector viven aquí y su texto concuerda con esta spec
- [[i18n-internal-links-keep-language]] — los enlaces internos conservan el idioma
- [[i18n-not-found-localized]] — la 404 toma el idioma del prefijo
- [[i18n-not-found-navigation-and-seo-signals]] — la 404 ofrece salidas útiles y no emite señales a la URL inexistente
- [[i18n-core-three-locales-single-source]] — define los tres idiomas y su fuente única
- [[i18n-seo-alternates-sitemap-and-breadcrumbs]] — señales de SEO de las mismas páginas
