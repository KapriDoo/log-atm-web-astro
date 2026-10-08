---
type: capability-spec
title: "Tres idiomas soportados con lista única y respaldo en español"
capability: "i18n-core"
slug: "i18n-core-three-locales-single-source"
domain: "debt"
delta_type: MODIFY
supersedes: "[[i18n-core-translation-helpers]]"
superseded_by: null
status: review
assigned_agent: "sdd-apply"
priority: medium
depends_on: []
change_ref: "[[debt-i18n-three-locales]]"
worktree: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales
feature_branch: feature/debt-i18n-three-locales
mr: ""
acceptance_criteria:
  - "[ ] La página `/` muestra textos en español; `/en/` y `/pt/` muestran inglés y portugués respectivamente."
  - "[ ] Una clave traducida solo en español se muestra en español en los tres idiomas."
  - "[ ] Una clave inexistente en todos los diccionarios se muestra como su literal y deja un aviso visible en consola."
  - "[ ] Una traducción con marcador `{nombre}` interpola correctamente el valor pasado."
  - "[ ] Todas las páginas generadas declaran dirección de lectura de izquierda a derecha y una búsqueda en `src` de `RTL_LOCALES`, `isRTL`, `is-rtl` y `[dir=\"rtl\"]` no arroja resultados."
  - "[ ] Existe un registro de la línea base medida con un build de `main@1c70406` antes de modificar código (lista de HTML de `dist/client`, `sitemap-*.xml` y `hreflang`; hoy 6 rutas prerenderizadas por idioma, 18 HTML, más la 404 bajo demanda), y los criterios de paridad de las specs de este cambio se evalúan contra ese registro y no contra las cifras del input."
  - "[ ] El diff de `dist/client` contra la línea base difiere solo en la lista cerrada: (1) el `name` del primer ítem del `BreadcrumbList` en `/en` y `/pt` (Home e Início), y (2) el script de cliente de `CTASection` y `WhyVideoSection` (contenido inline o nombre con hash del bundle) cuyo único cambio es la eliminación de los respaldos en español; el sitemap y los `hreflang` son idénticos a la línea base."
  - "[ ] En una copia aislada bajo el directorio de temporales, sin commit, agregar un idioma ficticio solo en la definición única de idiomas hace que el enrutamiento de Astro, el sitemap y `npm run validate-i18n` lo reconozcan sin editar otro archivo, y ni `astro.config.mjs` ni `scripts/validate-i18n.ts` declaran literales de idiomas."
  - "[ ] `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links`, `npm run a11y` y `npm run measure:images` terminan con exit 0 y la guarda de prerender ([[0012-prerender-output-guard]]) queda en verde en `npm run build`."
  - "[ ] ADR-0002 incluye una nota de actualización fechada que declara los tres idiomas y las seis páginas prerenderizadas por idioma más la 404 bajo demanda, y referencia a ADR-0007, sin reescribir la decisión."

related:
  - "[[i18n-core-translation-helpers]]"
  - "[[i18n-rtl-support-arabic]]"
  - "[[i18n-routing-pages-and-language-selector]]"
  - "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]"
  - "[[i18n-translations-parity-and-build-validation]]"
  - "[[copy-single-source]]"
affects:
  - "[[i18n-routing-pages-and-language-selector]]"
  - "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]"
  - "[[i18n-translations-parity-and-build-validation]]"
adrs:
  - "[[0002-i18n-routing-pages-lang-folder]]"
scope:
  - "log-atm-web-astro/src/i18n/config.ts"
  - "log-atm-web-astro/src/i18n/utils.ts"
  - "log-atm-web-astro/src/layouts/BaseLayout.astro"
  - "log-atm-web-astro/src/components/ui/Navbar.astro"
  - "log-atm-web-astro/astro.config.mjs"
  - "log-atm-web-astro/scripts/validate-i18n.ts"
verified_at: null

created: "2026-10-08"
updated: "2026-10-08"
tags: [capability-spec, i18n]
---

# Tres idiomas soportados con lista única y respaldo en español

## Purpose

LOG ATM atiende clientes en tres idiomas: español, inglés y portugués. El sitio ofrece cada texto en el idioma del visitante, con español como respaldo confiable cuando una traducción falta. La lista de idiomas soportados se define en un solo lugar del que toman sus valores el enrutamiento, el sitemap y la validación de traducciones, y todas las páginas se leen de izquierda a derecha. Esta spec reemplaza a [[i18n-core-translation-helpers]] y declara cancelada la dirección de lectura de derecha a izquierda ([[i18n-rtl-support-arabic]]).

## Requirements

- El sistema SHALL reconocer tres idiomas soportados: español (por defecto), inglés y portugués.
- El sistema SHALL servir el contenido en español cuando el visitante accede sin indicador de idioma en la URL.
- El sistema SHALL servir el contenido en el idioma indicado cuando el visitante accede a una URL con prefijo de idioma reconocido.
- El sistema SHALL caer a español como respaldo cuando una traducción específica no esté disponible en el idioma actual.
- El sistema SHALL exponer el texto crudo (la propia clave) y registrar un aviso visible al desarrollador cuando una traducción no esté disponible ni en el idioma actual ni en español.
- El sistema SHOULD soportar interpolación de variables (por ejemplo nombres y números) en los textos traducidos.
- El sistema SHALL declarar la dirección de lectura de izquierda a derecha en todas las páginas de los tres idiomas.
- El sistema SHALL NOT mantener lógica ni estilos que cambien la dirección de lectura según el idioma; un idioma de derecha a izquierda que se agregue en el futuro se especifica con su propia spec. Las propiedades lógicas de CSS (inicio y fin en lugar de izquierda y derecha físicas) se conservan como buena práctica de estilo.
- El sistema SHALL definir en un único lugar la lista de idiomas soportados, el idioma por defecto y los códigos regionales de cada idioma, y SHALL derivar de esa definición la lista de idiomas con prefijo.
- El sistema SHALL tomar de esa definición única los idiomas del enrutamiento, del sitemap y de la validación de traducciones, sin repetirlos en ningún otro archivo.
- El sistema SHALL mantener esa definición cargable por las herramientas de construcción sin arrastrar imágenes, componentes ni otros recursos del sitio.

## Scenarios

### Scenario: Visitante accede a la home en español

**GIVEN** un visitante que abre la URL raíz del sitio
**WHEN** la página se renderiza
**THEN** todos los textos visibles aparecen en español

### Scenario: Visitante accede a una página en inglés o en portugués

**GIVEN** un visitante que abre una URL con prefijo `/en/` o `/pt/`
**WHEN** la página se renderiza
**THEN** todos los textos visibles aparecen en el idioma del prefijo

### Scenario: Una traducción falta en el idioma seleccionado

**GIVEN** un visitante en una página en portugués en la que falta una traducción específica
**WHEN** la página se renderiza
**THEN** ese fragmento aparece en español, las demás traducciones se muestran en portugués y la página no falla

### Scenario: Una traducción falta también en español

**GIVEN** un visitante en cualquier idioma en una página cuya clave no existe en ningún diccionario
**WHEN** la página se renderiza
**THEN** se muestra la propia clave técnica como texto, queda un aviso en consola del navegador y la página no falla

### Scenario: Visitante lee el sitio en cualquier idioma

**GIVEN** un visitante en la versión en español, en inglés o en portugués
**WHEN** la página se renderiza
**THEN** el texto fluye de izquierda a derecha y la página declara esa dirección de lectura

### Scenario: El equipo agrega un idioma a la lista única

**GIVEN** un equipo de desarrollo que agrega un idioma de prueba únicamente a la definición única de idiomas
**WHEN** construye el sitio y ejecuta la validación de traducciones
**THEN** el enrutamiento, el sitemap y la validación reconocen el idioma nuevo sin que el equipo toque ningún otro archivo

### Scenario: El equipo retira la lógica de dirección de lectura

**GIVEN** un sitio cuyas tres versiones ya se leen de izquierda a derecha
**WHEN** el equipo construye el sitio sin la lógica de dirección por idioma
**THEN** las páginas generadas son las mismas que las de la línea base medida, salvo las diferencias admitidas que declaran las specs de este cambio

## Acceptance Criteria

- [ ] La página `/` muestra textos en español; `/en/` y `/pt/` muestran inglés y portugués respectivamente.
- [ ] Una clave traducida solo en español se muestra en español en los tres idiomas.
- [ ] Una clave inexistente en todos los diccionarios se muestra como su literal y deja un aviso visible en consola.
- [ ] Una traducción con marcador `{nombre}` interpola correctamente el valor pasado.
- [ ] Todas las páginas generadas declaran dirección de lectura de izquierda a derecha y una búsqueda en `src` de `RTL_LOCALES`, `isRTL`, `is-rtl` y `[dir="rtl"]` no arroja resultados.
- [ ] Existe un registro de la línea base medida con un build de `main@1c70406` antes de modificar código (lista de HTML de `dist/client`, `sitemap-*.xml` y `hreflang`; hoy 6 rutas prerenderizadas por idioma, 18 HTML, más la 404 bajo demanda), y los criterios de paridad de las specs de este cambio se evalúan contra ese registro y no contra las cifras del input.
- [ ] El diff de `dist/client` contra la línea base difiere solo en la lista cerrada: (1) el `name` del primer ítem del `BreadcrumbList` en `/en` y `/pt` (Home e Início), y (2) el script de cliente de `CTASection` y `WhyVideoSection` (contenido inline o nombre con hash del bundle) cuyo único cambio es la eliminación de los respaldos en español; el sitemap y los `hreflang` son idénticos a la línea base.
- [ ] En una copia aislada bajo el directorio de temporales, sin commit, agregar un idioma ficticio solo en la definición única de idiomas hace que el enrutamiento de Astro, el sitemap y `npm run validate-i18n` lo reconozcan sin editar otro archivo, y ni `astro.config.mjs` ni `scripts/validate-i18n.ts` declaran literales de idiomas.
- [ ] `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links`, `npm run a11y` y `npm run measure:images` terminan con exit 0 y la guarda de prerender ([[0012-prerender-output-guard]]) queda en verde en `npm run build`.
- [ ] ADR-0002 incluye una nota de actualización fechada que declara los tres idiomas y las seis páginas prerenderizadas por idioma más la 404 bajo demanda, y referencia a ADR-0007, sin reescribir la decisión.

## Related

- [[i18n-core-translation-helpers]] — spec reemplazada por esta; su texto concuerda con esta spec en los tres idiomas
- [[i18n-rtl-support-arabic]] — spec cancelada: el sitio no ofrece idiomas de derecha a izquierda
- [[i18n-routing-pages-and-language-selector]] — páginas por idioma y selector que consumen la definición única
- [[i18n-seo-alternates-sitemap-and-breadcrumbs]] — sitemap y alternativas de idioma derivadas de la definición única
- [[i18n-translations-parity-and-build-validation]] — validación de traducciones que toma los idiomas de la definición única
- [[copy-single-source]] — todo el texto visible sale del i18n
