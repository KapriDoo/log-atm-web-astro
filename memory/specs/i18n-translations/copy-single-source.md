---
type: capability-spec
title: "Todo el texto visible sale del i18n y un desalineamiento con los datos rompe la construcción"
capability: "i18n-translations"
slug: "copy-single-source"
domain: "debt"
delta_type: null
supersedes: null
superseded_by: null
status: completed
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[debt-copy-tokens-ssot]]"
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
feature_branch: feature/debt-copy-tokens-ssot
mr: ""
acceptance_criteria:
  - "[x] Los datos no textuales del sitio no contienen texto visible: las listas de servicios, estadísticas del hero, motivos de «por qué», industrias, valores, cómo trabajamos, modalidades y pasos de cotización conservan solo ids, imágenes, íconos, tamaños, enlaces y colores; y SEO no existe"
  - "[x] Los 12 sitios que combinan datos con texto (servicios en home y en su página, estadísticas del hero, motivos de «por qué», industrias en home y en su página, valores y cómo trabajamos en nosotros, modalidades y pasos de cotizar, y las opciones de modalidad y volumen del cotizador rápido) obtienen su texto exclusivamente del i18n, sin valor de respaldo ni operador de fusión con datos de texto"
  - "[x] Un único helper del módulo de utilidades i18n, junto a tList, recibe la clave y la lista de datos, lanza un Error con la clave, el idioma y las dos longitudes cuando difieren y, si coinciden, retorna el texto; los 12 sitios lo usan"
  - "[x] Quitar un ítem de una lista del i18n en un solo idioma hace fallar npm run validate-i18n"
  - "[x] Quitar un ítem de una lista del i18n en los tres idiomas hace fallar astro build (exit 1): el log del build muestra el mensaje del helper con la clave, el idioma y las dos longitudes, y la guarda post-build nombra cada página afectada"
  - "[x] Un throw forzado en el render de una página cualquiera hace fallar astro build (exit 1) y la guarda post-build nombra esa página"
  - "[x] La guarda post-build hace fallar astro build cuando una página prerenderizada esperada no existe en dist/client, pesa 0 bytes o no contiene <html; las páginas esperadas salen de los paths que Astro registra antes de renderizar (getStaticPaths o el path fijo de la ruta) y cada ruta de página prerenderizada tiene al menos uno, también cuando su getStaticPaths no entrega ninguno"
  - "[x] La guarda post-build corre dentro de npm run build y de npm run build:ci"
  - "[x] Con los datos y el i18n alineados, npm run build y npm run check terminan sin error"
  - "[x] Una búsqueda en src de los cuatro textos que contradicen el i18n vigente (el eslogan «tiempos garantizados» con la etiqueta «Express · 48h», «Bodegaje, fulfillment y última milla», «KPIs medibles y revisión trimestral» y «Express 48h–7d») no arroja resultados"
  - "[x] El texto visible, los meta y el JSON-LD de home, servicios, nosotros, cotizar, industrias y contacto en es, en y pt son idénticos antes y después del cambio, salvo las diferencias intencionales declaradas en esta spec y en las specs hermanas del cambio"

related:
  - "[[i18n-core-translation-helpers]]"
  - "[[i18n-translations-build-validation]]"
  - "[[i18n-translations-json-structure]]"
  - "[[quote-extras-and-origin-options]]"
affects: []
adrs:
  - "[[0012-prerender-output-guard]]"
scope:
  - "log-atm-web-astro/src/lib/constants.ts"
  - "log-atm-web-astro/src/i18n/utils.ts"
  - "log-atm-web-astro/src/components/sections/ServicesSection.astro"
  - "log-atm-web-astro/src/components/sections/HeroSection.astro"
  - "log-atm-web-astro/src/components/sections/WhyVideoSection.astro"
  - "log-atm-web-astro/src/components/sections/IndustriesSection.astro"
  - "log-atm-web-astro/src/components/sections/CTASection.astro"
  - "log-atm-web-astro/src/pages/servicios.astro"
  - "log-atm-web-astro/src/pages/nosotros.astro"
  - "log-atm-web-astro/src/pages/cotizar.astro"
  - "log-atm-web-astro/src/pages/industrias.astro"
  - "log-atm-web-astro/astro.config.mjs"
verified_at: 2026-10-08

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec]
---

# Todo el texto visible sale del i18n y un desalineamiento con los datos rompe la construcción

## Purpose

Cada texto que ve un visitante tiene una sola fuente: las traducciones. Los datos no textuales del sitio (identificadores, imágenes, íconos, tamaños, enlaces y colores) se alinean con esas traducciones por posición, y si una lista pierde un ítem el desalineamiento se detecta al construir el sitio y no degrada el contenido en silencio. Esto evita que reaparezca, sin aviso y en los tres idiomas, texto en español obsoleto.

## Requirements

- El sistema SHALL obtener todo texto visible por el usuario exclusivamente de las traducciones (i18n), en los 12 lugares donde combina datos con texto: servicios (home y página de servicios), estadísticas del hero, motivos de «por qué», industrias (home y página de industrias), valores y cómo trabajamos (nosotros), modalidades y pasos de cotizar, y las opciones de modalidad y volumen del cotizador rápido.
- El sistema SHALL mantener en los datos no textuales solo ids, imágenes, íconos, tamaños, enlaces y colores, y SHALL NOT conservar texto visible, valores de respaldo en español ni la configuración de SEO sin consumidores.
- El sistema SHALL detener la construcción del sitio cuando, para algún idioma, una lista de datos y su lista de texto difieren en cantidad de ítems, e informar la clave de la lista, el idioma y ambas cantidades.
- El sistema SHALL detener la construcción del sitio cuando una página prerenderizada esperada no existe en la salida, está vacía o no contiene un documento HTML, y nombrar la página. Una guarda post-build (`astro:build:done`, [[0012-prerender-output-guard]]) lo comprueba porque el prerender en workerd devuelve los errores de render sin lanzar.
- El sistema SHALL tomar las páginas esperadas de una fuente independiente del resultado del render: los paths que la construcción registra antes de renderizar (los de `getStaticPaths` o el path fijo de cada ruta), con al menos uno por cada ruta de página prerenderizada.
- El sistema SHALL ejecutar esa guarda en toda construcción del sitio, incluida la de CI (`build:ci`).
- El sistema SHALL resolver esa comprobación con un único mecanismo compartido por los 12 lugares, ubicado junto a los demás helpers de listas traducidas, y fusionar datos y texto sin valores de respaldo.
- El sistema SHALL hacer fallar la validación de traducciones cuando un ítem de una lista falta en un solo idioma, porque la paridad de claves incluye los índices de las listas.
- El sistema SHALL mantener idéntico el contenido visible de las páginas cuando datos y texto están alineados.
- El sistema SHOULD conservar fuera del alcance de esta regla los nombres propios de lugares y los valores que el cotizador envía al operador, cuyas etiquetas visibles salen del i18n.

## Scenarios

### Scenario: Una lista pierde un ítem en un solo idioma

**GIVEN** una lista de texto traducida que pierde un ítem solo en inglés
**WHEN** el equipo ejecuta la validación de traducciones
**THEN** la validación falla e identifica la diferencia

### Scenario: Una lista pierde un ítem en los tres idiomas

**GIVEN** una lista de texto traducida que pierde un ítem en español, inglés y portugués
**WHEN** el equipo construye el sitio
**THEN** la construcción se detiene: el log muestra un mensaje que nombra la lista, el idioma y las dos cantidades distintas, y la guarda post-build nombra cada página afectada
**AND** ningún texto en español de respaldo llega a una página

### Scenario: El render de una página lanza un error

**GIVEN** una página cuyo render lanza un error en un solo idioma
**WHEN** el equipo o el CI construye el sitio
**THEN** la construcción sale con un código distinto de cero y la guarda post-build nombra esa página
**AND** no se despliega una página vacía ni una traza de error en su lugar

### Scenario: Una ruta no entrega ningún path

**GIVEN** una ruta de página prerenderizada cuyo `getStaticPaths` no entrega ningún path
**WHEN** el equipo construye el sitio
**THEN** la construcción se detiene y la guarda post-build nombra la ruta

### Scenario: Datos y texto alineados

**GIVEN** datos y traducciones con la misma cantidad de ítems en los tres idiomas
**WHEN** el equipo construye el sitio
**THEN** home, servicios, nosotros, cotizar, industrias y contacto muestran el mismo texto, los mismos meta y los mismos datos estructurados que antes del cambio, salvo las diferencias intencionales declaradas

### Scenario: Equipo busca texto obsoleto

**GIVEN** una persona del equipo busca en el código los cuatro textos que contradicen el copy vigente
**WHEN** ejecuta la búsqueda
**THEN** no encuentra ninguno

## Acceptance Criteria

- [x] Los datos no textuales del sitio no contienen texto visible: las listas de servicios, estadísticas del hero, motivos de «por qué», industrias, valores, cómo trabajamos, modalidades y pasos de cotización conservan solo ids, imágenes, íconos, tamaños, enlaces y colores; y SEO no existe
- [x] Los 12 sitios que combinan datos con texto (servicios en home y en su página, estadísticas del hero, motivos de «por qué», industrias en home y en su página, valores y cómo trabajamos en nosotros, modalidades y pasos de cotizar, y las opciones de modalidad y volumen del cotizador rápido) obtienen su texto exclusivamente del i18n, sin valor de respaldo ni operador de fusión con datos de texto
- [x] Un único helper del módulo de utilidades i18n, junto a tList, recibe la clave y la lista de datos, lanza un Error con la clave, el idioma y las dos longitudes cuando difieren y, si coinciden, retorna el texto; los 12 sitios lo usan
- [x] Quitar un ítem de una lista del i18n en un solo idioma hace fallar npm run validate-i18n
- [x] Quitar un ítem de una lista del i18n en los tres idiomas hace fallar astro build (exit 1): el log del build muestra el mensaje del helper con la clave, el idioma y las dos longitudes, y la guarda post-build nombra cada página afectada
- [x] Un throw forzado en el render de una página cualquiera hace fallar astro build (exit 1) y la guarda post-build nombra esa página
- [x] La guarda post-build hace fallar astro build cuando una página prerenderizada esperada no existe en dist/client, pesa 0 bytes o no contiene <html; las páginas esperadas salen de los paths que Astro registra antes de renderizar (getStaticPaths o el path fijo de la ruta) y cada ruta de página prerenderizada tiene al menos uno, también cuando su getStaticPaths no entrega ninguno
- [x] La guarda post-build corre dentro de npm run build y de npm run build:ci
- [x] Con los datos y el i18n alineados, npm run build y npm run check terminan sin error
- [x] Una búsqueda en src de los cuatro textos que contradicen el i18n vigente (el eslogan «tiempos garantizados» con la etiqueta «Express · 48h», «Bodegaje, fulfillment y última milla», «KPIs medibles y revisión trimestral» y «Express 48h–7d») no arroja resultados
- [x] El texto visible, los meta y el JSON-LD de home, servicios, nosotros, cotizar, industrias y contacto en es, en y pt son idénticos antes y después del cambio, salvo las diferencias intencionales declaradas en esta spec y en las specs hermanas del cambio

## Related

- [[i18n-core-translation-helpers]] — helpers de traducción y listas traducidas
- [[i18n-translations-build-validation]] — validación de paridad de claves entre idiomas
- [[i18n-translations-json-structure]] — estructura de los archivos de traducción
- [[quote-extras-and-origin-options]] — diferencias intencionales en las opciones del cotizar
