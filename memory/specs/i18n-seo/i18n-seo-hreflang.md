---
type: capability-spec
title: "SEO multi-idioma: hreflang, lang, OG/JSON-LD parametrizado y sitemap"
capability: "i18n-seo"
slug: "i18n-seo-hreflang"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: draft
assigned_agent: "sdd-apply"
priority: high
depends_on:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-translations-json-structure]]"
change_ref: "[[multi-language-support]]"
worktree: ""
feature_branch: ""
commits: []
mr: ""
acceptance_criteria:
  - "[ ] Cada página incluye etiquetas <link rel='alternate' hreflang> apuntando a todas las versiones de idioma de esa página, incluido x-default apuntando a la versión española"
  - "[ ] El atributo lang de <html> refleja el locale activo en cada página"
  - "[ ] El meta og:locale refleja el locale activo (ej. en_US para inglés)"
  - "[ ] El schema JSON-LD de la organización tiene slogan y description en el idioma de la página"
  - "[ ] El sitemap generado incluye entradas para cada locale de cada página con sus correspondientes hreflang"
  - "[ ] Las URLs en español (sin prefijo) están correctamente referenciadas en los hreflang con x-default"
  - "[ ] Los validadores de Rich Results de Google no reportan errores en las páginas del sitio"

related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-translations-json-structure]]"
affects: []
adrs: []
scope:
  - "src/layouts/BaseLayout.astro"
  - "astro.config.mjs"
verified_at: null

created: "2026-05-11"
updated: "2026-05-11"
tags: [capability-spec, i18n, seo, hreflang, sitemap, schema]
---

# SEO multi-idioma: hreflang, lang, OG/JSON-LD parametrizado y sitemap

## Purpose

Para que los motores de búsqueda indexen correctamente las versiones en distintos idiomas del sitio LOG ATM y muestren a cada usuario la versión en su idioma, el sitio debe comunicar de forma explícita la relación entre páginas equivalentes en distintos locales. Esto se logra mediante atributos `lang` en el documento, etiquetas `hreflang` que enlazan las versiones alternas, metadatos Open Graph adaptados al locale y un sitemap que exponga todas las URLs por idioma con sus relaciones `hreflang`.

## Requirements

- El sistema SHALL incluir en el `<head>` de cada página etiquetas `<link rel="alternate" hreflang="{locale}">` que apunten a las URLs de esa página en todos los locales soportados
- El sistema SHALL incluir una etiqueta `<link rel="alternate" hreflang="x-default">` apuntando a la versión española de cada página
- El sistema SHALL renderizar el atributo `lang` de `<html>` con el código BCP-47 correspondiente al locale activo (ej. `es`, `en`, `zh`, `hi`, `ar`, `pt`)
- El sistema SHALL parametrizar el meta `og:locale` para reflejar el locale activo en formato IETF (ej. `en_US`, `zh_CN`)
- El sistema SHALL parametrizar las propiedades de texto del schema JSON-LD de la organización (`slogan`, `description`, `breadcrumb name`) para cada locale
- El sistema SHALL configurar el generador de sitemap para que incluya todas las URLs por locale con sus relaciones `hreflang` automáticas
- El sistema SHOULD mantener el schema JSON-LD de la empresa en español como idioma corporativo principal, con versiones localizadas como alternativas
- El sistema NO debe cambiar las URLs canónicas en español; el sitio fue indexado sin prefijo y esas URLs deben mantenerse

## Scenarios

### Scenario: Motor de búsqueda procesa una página y descubre todas sus variantes

**GIVEN** un rastreador de motores de búsqueda que visita la página de inicio en español (`/`)
**WHEN** analiza el `<head>` de la página
**THEN** encuentra etiquetas `hreflang` que lo dirigen a `/en/`, `/zh/`, `/hi/`, `/ar/`, `/pt/` y una etiqueta `x-default` que apunta a `/`

### Scenario: Resultado de búsqueda en Google muestra la versión correcta por idioma

**GIVEN** un usuario cuyo navegador está configurado en inglés realiza una búsqueda relacionada con servicios de LOG ATM
**WHEN** Google elige qué versión de la página mostrar
**THEN** Google presenta el resultado con la URL en inglés (`/en/`) gracias a los `hreflang` correctamente configurados

### Scenario: Atributo lang refleja el idioma de la página

**GIVEN** un lector de pantalla o un traductor automático del navegador que accede a cualquier página del sitio
**WHEN** el documento carga
**THEN** el atributo `lang` de `<html>` corresponde al idioma en que está redactado el contenido de esa página

### Scenario: Compartir enlace en redes sociales muestra metadatos en el idioma correcto

**GIVEN** un usuario que copia y comparte la URL de la página de servicios en portugués (`/pt/servicios`)
**WHEN** la red social genera la vista previa del enlace
**THEN** el título, la descripción y el locale del Open Graph corresponden al portugués

### Scenario: Sitemap incluye entradas para todos los idiomas

**GIVEN** un rastreador de motores de búsqueda que accede al sitemap del sitio
**WHEN** analiza el archivo
**THEN** encuentra entradas para cada combinación de página e idioma, con las relaciones `hreflang` entre ellas correctamente definidas

### Scenario: Schema JSON-LD de organización localizado

**GIVEN** un motor de búsqueda que procesa los datos estructurados de la página de inicio en inglés
**WHEN** analiza el schema JSON-LD
**THEN** encuentra el campo `slogan` y `description` en inglés (no en español)

## Acceptance Criteria

- [ ] Cada página incluye etiquetas `<link rel="alternate" hreflang>` apuntando a todas las versiones de idioma de esa página, incluido `x-default` apuntando a la versión española
- [ ] El atributo `lang` de `<html>` refleja el locale activo en cada página
- [ ] El meta `og:locale` refleja el locale activo (ej. `en_US` para inglés)
- [ ] El schema JSON-LD de la organización tiene `slogan` y `description` en el idioma de la página
- [ ] El sitemap generado incluye entradas para cada locale de cada página con sus correspondientes `hreflang`
- [ ] Las URLs en español (sin prefijo) están correctamente referenciadas en los `hreflang` con `x-default`
- [ ] Los validadores de Rich Results de Google no reportan errores en las páginas del sitio

## Related

- [[i18n-routing-locale-prefixes]] — las URLs que los hreflang referencian provienen del esquema de routing
- [[i18n-translations-json-structure]] — los textos del schema JSON-LD (slogan, description) provienen de los JSONs de traducción
