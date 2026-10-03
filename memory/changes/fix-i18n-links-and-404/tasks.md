# Tasks: fix-i18n-links-and-404

Rutas relativas a `log-atm-web-astro/` (subdirectorio del worktree). Sin suite de tests en el proyecto: la verificación es por `astro build`, el barrido `check-i18n-links` y `astro preview` (design.md § Estrategia de Testing). Ninguna tarea es `[TDD]`: no existe un test automatizado que preceda a la implementación; el barrido es la herramienta de verificación y se construye primero para disponer de una contraprueba contra `main`.

Archivos prohibidos (PR #33): `src/components/ui/LanguageSelector.astro`, `src/scripts/wizard.ts`, `scripts/generate-favicons.mjs`, `public/apple-touch-icon.png`. Sin cambios: `src/lib/constants.ts`, `src/i18n/utils.ts`, `src/i18n/config.ts`, `Footer.astro`, `astro.config.mjs`, `wrangler.toml`.

## Orden de ejecución

1. Tarea 1 (script de barrido) primero: permite medir la línea base contra `main` y validar al final.
2. Tareas 2 a 6 (localización de hrefs, spec `i18n-internal-links-keep-language`): independientes entre sí, salvo que la Tarea 7 requiere la Tarea 3 (mismo archivo `servicios.astro`).
3. Tarea 7 (self-link del catálogo) después de la Tarea 3.
4. Tareas 8 y 9 (`Navbar` y `BaseLayout`, spec `i18n-not-found-navigation-and-seo-signals`) antes de la Tarea 10.
5. Tarea 10 (404 bajo demanda) requiere Tareas 8 y 9.
6. Tarea 11 (verificación final: build, barrido, preview) al final; requiere todas las anteriores.

---

## Spec: [[i18n-internal-links-keep-language]] — Los enlaces internos conservan el idioma de la página

### Tarea 1: Crear el script de barrido de links internos

- **Archivos**: `scripts/check-i18n-links.ts`, `package.json`
- **Qué hacer**: crear el script `tsx` según el contrato de design.md § Contratos de Componentes (`scripts/check-i18n-links.ts`) y registrar `"check-i18n-links": "tsx scripts/check-i18n-links.ts"` en `scripts`. Sin dependencias nuevas; solo `node:fs`/`node:path`/`node:url` e imports de `LOCALES`, `NON_DEFAULT_LOCALES`, `DEFAULT_LOCALE` desde `../src/i18n/config.ts`. Comentarios y cabecera de uso en español, como `scripts/validate-i18n.ts`.
- **Criterio de completado**: sin `dist/client` imprime «ejecutá `npm run build` primero» y sale con 2; con build reporta una línea `<archivo>: <href> — <regla>` por violación, un resumen de páginas y enlaces evaluados, y sale con 1 si hay violaciones y 0 si no.
- **Modo**: estándar

- [ ] Leer `scripts/validate-i18n.ts` para replicar estilo de cabecera y manejo de errores
- [ ] Crear `scripts/check-i18n-links.ts` con recorrido de todos los `**/*.html` bajo `dist/client`
- [ ] Derivar el locale de la página del primer segmento de su ruta (`NON_DEFAULT_LOCALES`, si no `DEFAULT_LOCALE`)
- [ ] Extraer las `<a …>` del `<body>` con `href` y aplicar las exclusiones (`hreflang`, `#`, esquema, `//`, `/_astro/`, `/api/`, extensión de archivo)
- [ ] Aplicar la regla 1 (locale del href igual al de la página) y la regla 2 (path termina en `/`)
- [ ] Implementar salida, resumen y exit codes 0/1/2
- [ ] Agregar el script `check-i18n-links` en `package.json`
- [ ] Medir línea base: construir `main` en una copia aislada bajo el directorio de temporales (`git -C <worktree> archive main | tar -x -C <DEST>`) y confirmar que el script reporta las violaciones conocidas (`/servicios`, `/cotizar`, `/contacto`, `/`)

### Tarea 2: Localizar los hrefs de las tarjetas de servicios de la home

- **Archivos**: `src/components/sections/ServicesSection.astro`
- **Qué hacer**: dentro del `map` de tarjetas, calcular `href = s.href ? buildLocaleUrl(currentLang, s.href) : null` y usarlo en el markup en lugar de `s.href` crudo (línea 52 aprox.), reutilizando el `currentLang` y el import de `buildLocaleUrl` que el componente ya tiene.
- **Criterio de completado**: en `dist/client/{,en/,pt/}index.html` las tarjetas de servicios enlazan a `/servicios/`, `/en/servicios/`, `/pt/servicios/` respectivamente; las tarjetas con `href: null` siguen sin enlace.
- **Modo**: estándar

- [ ] Localizar el `map` de `SERVICES` y el uso de `s.href`
- [ ] Reemplazar el href crudo por `buildLocaleUrl(currentLang, s.href)` con guarda de `null`
- [ ] Verificar que la lógica de `servicesHref` existente del componente no se duplica ni contradice

### Tarea 3: Localizar migaja y CTA de contacto en `servicios.astro`

- **Archivos**: `src/pages/servicios.astro`
- **Qué hacer**: importar `buildLocaleUrl` desde `../i18n/utils` si falta; declarar en el frontmatter `homeHref = buildLocaleUrl(currentLang, '/')` y `contactHref = buildLocaleUrl(currentLang, '/contacto')`; usar `homeHref` en la migaja «Inicio» (línea 45 aprox.) y `contactHref` en el CTA de detalle (línea 124 aprox.). Las tarjetas se tratan en la Tarea 7.
- **Criterio de completado**: en `/servicios/`, `/en/servicios/`, `/pt/servicios/` la migaja y el CTA apuntan a `/`, `/en/`, `/pt/` y `/contacto/`, `/en/contacto/`, `/pt/contacto/`; sin literales `href="/"` ni `href="/contacto"` en el archivo.
- **Modo**: estándar

- [ ] Agregar `buildLocaleUrl` al import de `../i18n/utils` si no está
- [ ] Declarar `homeHref` y `contactHref` en el frontmatter
- [ ] Reemplazar el `href="/"` de la migaja por `{homeHref}`
- [ ] Reemplazar el `/contacto` del CTA por `{contactHref}`

### Tarea 4: Localizar migaja y CTA de las filas en `industrias.astro`

- **Archivos**: `src/pages/industrias.astro`
- **Qué hacer**: importar `buildLocaleUrl`; declarar `homeHref` y `contactHref`; usar `homeHref` en la migaja (línea 43 aprox.) y `contactHref` en el CTA de las 12 filas (línea 141 aprox.).
- **Criterio de completado**: en las tres versiones de `/industrias/` la migaja y los 12 CTA apuntan a la home y a contacto del idioma de la página; sin literales `href="/"` ni `href="/contacto"`.
- **Modo**: estándar

- [ ] Agregar `buildLocaleUrl` al import de `../i18n/utils` si no está
- [ ] Declarar `homeHref` y `contactHref` en el frontmatter
- [ ] Reemplazar el href de la migaja y el del CTA de filas

### Tarea 5: Localizar la migaja «Inicio» en `contacto.astro` y `nosotros.astro`

- **Archivos**: `src/pages/contacto.astro`, `src/pages/nosotros.astro`
- **Qué hacer**: en cada archivo importar `buildLocaleUrl` si falta, declarar `homeHref = buildLocaleUrl(currentLang, '/')` y usarlo en la migaja (`contacto.astro:28`, `nosotros.astro:35`).
- **Criterio de completado**: la migaja «Inicio» de ambas páginas apunta a `/`, `/en/`, `/pt/` según el idioma; sin literal `href="/"` en la migaja.
- **Modo**: estándar

- [ ] `contacto.astro`: import, `homeHref`, migaja
- [ ] `nosotros.astro`: import, `homeHref`, migaja

### Tarea 6: Localizar la migaja y el botón «volver al inicio» en `cotizar.astro`

- **Archivos**: `src/pages/cotizar.astro`
- **Qué hacer**: importar `buildLocaleUrl` si falta; declarar `homeHref = buildLocaleUrl(currentLang, '/')`; usarlo en la migaja (línea 57 aprox.) y en el botón «volver al inicio» de la pantalla final (línea 342 aprox.).
- **Criterio de completado**: ambos enlaces apuntan a la home del idioma de la página; sin literales `href="/"` en el archivo para navegación.
- **Modo**: estándar

- [ ] Agregar `buildLocaleUrl` al import si no está y declarar `homeHref`
- [ ] Reemplazar el href de la migaja
- [ ] Reemplazar el href de «volver al inicio» (si el botón se renderiza desde un script del cliente, resolver el valor desde un atributo `data-` o el href ya renderizado, sin literal)

---

## Spec: [[services-catalog-no-self-link]] — Las tarjetas del catálogo no enlazan a la propia página

### Tarea 7: Renderizar como contenido estático las tarjetas con destino igual al catálogo

- **Archivos**: `src/pages/servicios.astro`
- **Qué hacer**: declarar `catalogHref = buildLocaleUrl(currentLang, '/servicios')`; para cada tarjeta calcular `href = s.href ? buildLocaleUrl(currentLang, s.href) : null` e `isLink = href !== null && href !== catalogHref`. Renderizar las tarjetas con `isLink` como `<a href={href}>` y el resto como `<div>` con la clase existente `svc-card--static` (`src/styles/sections/services.css:35-36`), sin CSS nuevo. Preservar el tratamiento actual de Carga Aérea y Carga Marítima.
- **Criterio de completado**: en `dist/client/{servicios,en/servicios,pt/servicios}/index.html` ninguna `a.svc-card` tiene href al catálogo; Consultoría enlaza a `/cotizar/`, `/en/cotizar/`, `/pt/cotizar/`; el resto de tarjetas es `div.svc-card--static`; el catálogo no muestra regresiones visuales.
- **Requiere**: Tarea 3
- **Modo**: estándar

- [ ] Declarar `catalogHref` en el frontmatter
- [ ] Calcular `href` e `isLink` por tarjeta en el `map`
- [ ] Renderizar condicionalmente `<a>` o `<div class="svc-card svc-card--static">` conservando el contenido interno idéntico
- [ ] Confirmar que `svc-card--static` ya cubre cursor por defecto y ausencia de hover

---

## Spec: [[i18n-not-found-navigation-and-seo-signals]] — La página 404 ofrece salidas útiles y no emite señales SEO a la URL inexistente

### Tarea 8: Aceptar `currentPath` opcional en `Navbar`

- **Archivos**: `src/components/ui/Navbar.astro`
- **Qué hacer**: declarar `interface Props { currentPath?: string }` con comentario en español; calcular `cleanPath = stripLocaleFromPath(Astro.props.currentPath ?? Astro.url.pathname)`; mantener `currentLang` desde `getLangFromUrl(Astro.url)` y el resto del componente sin cambios. No tocar `LanguageSelector.astro`.
- **Criterio de completado**: sin la prop, el HTML de las páginas existentes es idéntico al de `main`; con `currentPath="/"`, el selector emite `buildLocaleUrl(lang, '/')` (`/`, `/en/`, `/pt/`) en desktop y mobile y ningún ítem de navegación queda con `aria-current="page"`.
- **Modo**: estándar

- [ ] Agregar la interfaz `Props` y leer `Astro.props`
- [ ] Sustituir el origen de `cleanPath` por el override con fallback a `Astro.url.pathname`
- [ ] Confirmar que ambas instancias de `LanguageSelector` reciben el `cleanPath` calculado

### Tarea 9: Omitir señales de URL en `BaseLayout` cuando `noindex` es verdadero

- **Archivos**: `src/layouts/BaseLayout.astro`
- **Qué hacer**: con `noindex === true` no emitir `<link rel="canonical">`, `<link rel="alternate" hreflang>`, `<meta property="og:url">` ni el `<script>` JSON-LD de `BreadcrumbList` (`breadcrumbSchema = null`). Conservar `<html lang>`, `meta robots`, `og:locale`, `og:locale:alternate`, title/description, Twitter y los JSON-LD `FreightForwarder`/`WebSite`. Documentar la regla con un comentario en español junto al cálculo. Sin props nuevas.
- **Criterio de completado**: el `<head>` de una página con `noindex` carece de las cuatro señales y conserva las demás; el `<head>` de las páginas indexables es idéntico al de `main` (diff).
- **Modo**: estándar

- [ ] Ubicar el cálculo de `canonical`, alternates, `og:url` y `breadcrumbSchema`
- [ ] Condicionar su emisión a `!noindex`
- [ ] Agregar el comentario en español con la regla
- [ ] Verificar con grep que solo `404.astro` usa `noindex`

---

## Spec: [[i18n-not-found-localized]] — La página 404 se muestra en el idioma del prefijo de la URL

### Tarea 10: Convertir `404.astro` en página única bajo demanda y eliminar `[lang]/404.astro`

- **Archivos**: `src/pages/404.astro`, `src/pages/[lang]/404.astro`
- **Qué hacer**: en `404.astro` agregar `export const prerender = false`, eliminar la prop `lang` (`langProp`) y fijar `currentLang = getLangFromUrl(Astro.url)`, y cambiar `<Navbar />` por `<Navbar currentPath="/" />`; conservar `lang={currentLang}`, `noindex={true}`, el script GSAP y los estilos intactos; quitar el import de tipo `Locale` si queda sin uso. Eliminar `src/pages/[lang]/404.astro`.
- **Criterio de completado**: `dist/client` no contiene `404.html`, `en/404/` ni `pt/404/`; el import de `NON_DEFAULT_LOCALES` desde `[lang]/404.astro` desaparece junto con el archivo; el build compila sin referencias rotas.
- **Requiere**: Tareas 8 y 9
- **Modo**: estándar

- [ ] Agregar `export const prerender = false` al frontmatter
- [ ] Quitar `langProp` y derivar el locale de `getLangFromUrl(Astro.url)`
- [ ] Pasar `currentPath="/"` a `Navbar`
- [ ] Limpiar imports sin uso
- [ ] Eliminar `src/pages/[lang]/404.astro`
- [ ] Buscar referencias residuales a `[lang]/404` o al delegador (grep)

---

## Verificación final (transversal a las cuatro specs)

### Tarea 11: Verificar build, barrido y comportamiento en `astro preview`

- **Archivos**: ninguno (solo verificación; registrar evidencia en `observations.md` si hay hallazgos)
- **Qué hacer**: ejecutar la estrategia de testing de design.md. No modificar código salvo que un hallazgo lo exija, en cuyo caso corregir en la tarea de origen.
- **Criterio de completado**: todos los ítems siguientes en verde.
- **Requiere**: Tareas 1 a 10
- **Modo**: estándar

- [ ] `npm run build` exitoso (incluye `validate-i18n`); `dist/client` sin `404.html`, `en/404/`, `pt/404/`
- [ ] `npm run check-i18n-links` sale con 0 sobre el build del cambio (es incluido, sin prefijo)
- [ ] Contraprueba: el mismo script contra el build de `main` en copia aislada reporta las violaciones conocidas
- [ ] Self-link: en `servicios`, `en/servicios`, `pt/servicios` ninguna `a.svc-card` apunta al catálogo; Consultoría con `/cotizar/` localizado; tarjetas de la home con `/<lang>/servicios/`
- [ ] `astro preview` + `curl -i`: `/no-existe`, `/en/no-existe`, `/en/no-existe/`, `/pt/a/b/c`, `/en/404/`, `/pt/404/` responden 404 con `<html lang>` `es-CL`/`en-US`/`pt-BR` y `meta robots noindex, nofollow`
- [ ] En esas respuestas: sin `rel="canonical"`, sin `hreflang` en `<head>`, sin `og:url`, sin `BreadcrumbList`; selector con `href` `/`, `/en/`, `/pt/` y `aria-current` en el idioma activo; ningún `nav__link` con `aria-current="page"`
- [ ] El HTML de la 404 incluye el `<script type="module">` del efecto GSAP
- [ ] Rutas existentes (`/`, `/en/servicios/`, `/pt/contacto/`) responden 200 con canonical, hreflang, `og:url` y `BreadcrumbList` idénticos a `main` (diff del `<head>`)
- [ ] `POST /api/contacto` vacío responde 400 y `GET /api/contacto` responde 405
- [ ] `git status` confirma que ningún archivo prohibido (PR #33) fue modificado
