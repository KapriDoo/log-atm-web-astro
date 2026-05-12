---
type: capability-spec
title: "Estructura de archivos JSON de traducción y helper t()"
capability: "i18n-translations"
slug: "i18n-translations-json-structure"
domain: "feature"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: critical
depends_on:
  - "[[i18n-routing-locale-prefixes]]"
change_ref: "[[multi-language-support]]"
worktree: "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/multi-language-support"
feature_branch: "feature/multi-language-support"
commits:
  - "76664bf"
mr: ""
acceptance_criteria:
  - "[ ] Existe un archivo JSON por cada uno de los seis idiomas (es, en, zh, hi, ar, pt)"
  - "[ ] El español es la fuente canónica; todos los demás JSONs tienen exactamente las mismas claves que es.json"
  - "[ ] El helper t(key) resuelve correctamente claves con notación de punto (ej. nav.services)"
  - "[ ] Cuando una clave no existe en el locale activo, el helper retorna el valor del JSON español sin error visible"
  - "[ ] Los JSONs no-español tienen un comentario o campo que marca las traducciones como pendientes de revisión nativa"
  - "[ ] El build falla si un JSON de locale tiene claves que no existen en es.json (detección de drift)"
  - "[ ] Todos los textos visibles de la interfaz en producción provienen de los archivos JSON, no de strings literales en componentes"

related:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-ui-selector-navbar]]"
  - "[[i18n-seo-hreflang]]"
affects:
  - "[[i18n-routing-locale-prefixes]]"
  - "[[i18n-ui-selector-navbar]]"
  - "[[i18n-seo-hreflang]]"
  - "[[i18n-rtl-support-arabic]]"
  - "[[i18n-typography-system-fonts]]"
adrs: []
scope:
  - "src/i18n/translations/*.json"
  - "src/i18n/utils.ts"
  - "src/lib/constants.ts"
verified_at: "2026-05-12"

created: "2026-05-11"
updated: "2026-05-12"
archived: "2026-05-12"
tags: [capability-spec, i18n, translations]
---

# Estructura de archivos JSON de traducción y helper t()

## Purpose

Para que el sitio LOG ATM muestre contenido en seis idiomas, cada cadena de texto visible al usuario debe residir en un archivo de traducción centralizado, uno por locale. Un helper de acceso tipado permite a los componentes obtener la traducción correcta para el idioma activo sin duplicar lógica. El español actúa como fuente de verdad: si una traducción falta en otro idioma, el sitio muestra el texto en español en lugar de un error o campo vacío.

## Requirements

- El sistema SHALL mantener un archivo JSON por cada locale soportado (`es`, `en`, `zh`, `hi`, `ar`, `pt`) con todas las cadenas de la interfaz organizadas por namespaces (`nav.*`, `hero.*`, `services.*`, `industries.*`, `why.*`, `cta.*`, `footer.*`, `seo.*`, `forms.*`, `pages.*`)
- El sistema SHALL designar `es.json` como fuente canónica; los demás JSONs deben contener exactamente las mismas claves
- El sistema SHALL proveer un helper `t(key)` que resuelve claves en notación de punto y retorna el string correspondiente al locale activo
- El sistema SHALL aplicar fallback automático a `es.json` cuando una clave no exista en el locale solicitado
- El sistema SHALL marcar todas las traducciones en archivos no-español con una indicación visible de que están pendientes de revisión nativa
- El sistema SHALL verificar en tiempo de build que ningún JSON de locale tiene claves ausentes respecto a `es.json`
- El sistema SHOULD soportar interpolación simple de variables mediante placeholders `{var}` en los strings
- Los componentes NO deben contener strings literales en español ni en ningún otro idioma directamente en el markup

## Scenarios

### Scenario: Componente muestra texto en el idioma del visitante

**GIVEN** un visitante que accede al sitio en inglés (`/en/`)
**WHEN** cualquier sección de la página (encabezado, servicios, footer) carga
**THEN** todos los textos visibles aparecen en inglés, obtenidos del archivo `en.json`

### Scenario: Fallback a español ante traducción ausente

**GIVEN** un visitante que accede al sitio en hindi
**WHEN** una sección de la página solicita una clave que aún no está traducida en `hi.json`
**THEN** la sección muestra el texto en español sin errores visibles ni espacios en blanco

### Scenario: Detección de drift de claves en build

**GIVEN** un desarrollador que agrega una nueva clave a `es.json` para una nueva sección
**WHEN** ejecuta el proceso de construcción del sitio sin actualizar los otros JSONs
**THEN** el build emite un aviso o error indicando qué claves faltan en cada locale afectado

### Scenario: Texto con variable interpolada

**GIVEN** una sección que muestra un mensaje personalizado con el nombre de un servicio
**WHEN** el componente solicita la clave con el valor de la variable
**THEN** el texto resultante incluye el valor interpolado en el idioma activo

### Scenario: Todas las traducciones no-español marcadas para revisión

**GIVEN** un editor de contenido que abre `en.json`, `zh.json`, `hi.json`, `ar.json` o `pt.json`
**WHEN** revisa las traducciones generadas automáticamente
**THEN** cada entrada o el archivo en su conjunto tiene una marca visible que indica "pendiente de revisión nativa"

## Acceptance Criteria

- [ ] Existe un archivo JSON por cada uno de los seis idiomas (`es`, `en`, `zh`, `hi`, `ar`, `pt`)
- [ ] El español es la fuente canónica; todos los demás JSONs tienen exactamente las mismas claves que `es.json`
- [ ] El helper `t(key)` resuelve correctamente claves con notación de punto (ej. `nav.services`)
- [ ] Cuando una clave no existe en el locale activo, el helper retorna el valor del JSON español sin error visible
- [ ] Los JSONs no-español tienen un campo o comentario que marca las traducciones como pendientes de revisión nativa
- [ ] El build falla o emite advertencia si un JSON de locale tiene claves ausentes respecto a `es.json`
- [ ] Todos los textos visibles de la interfaz en producción provienen de los archivos JSON, no de strings literales en componentes

## Related

- [[i18n-routing-locale-prefixes]] — el routing determina qué locale activa cada conjunto de traducciones
- [[i18n-ui-selector-navbar]] — el selector usa las traducciones para sus propias etiquetas
- [[i18n-seo-hreflang]] — los metadatos SEO (og:title, description, schema) también provienen de los JSONs
