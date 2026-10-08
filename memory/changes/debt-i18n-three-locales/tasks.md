# Tasks: debt-i18n-three-locales

Rutas de código relativas a `log-atm-web-astro/` del worktree (`/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-i18n-three-locales/log-atm-web-astro/`); rutas de corpus relativas a `memory/`. El proyecto no tiene suite de tests: ninguna tarea es `[TDD]`; la verificación es por build, diff de `dist/client` contra la línea base y los comandos de cierre.

## Orden de ejecución

Numeración por aparición en el documento; el orden de ejecución es:

1. Tarea 1 (línea base): se mide con el código intacto, antes de cualquier edición.
2. Tarea 2 (retirar RTL), Tarea 3 (lista única), Tarea 10 (migas) y Tarea 12 (respaldos de CTA y video): ediciones de código. La Tarea 3 requiere la Tarea 2 (ambas tocan `src/i18n/config.ts`).
3. Tarea 4 (ADR-0002), Tarea 13 (ADR-0003) y Tarea 5 (perfil): corpus; independientes del código.
4. Tarea 6 (build y diff contra la línea base): requiere las Tareas 1, 2, 3, 10 y 12.
5. Tarea 7 (comandos de cierre), Tarea 9 (rutas, selector y enlaces), Tarea 11 (SEO) y Tarea 14 (validación negativa): requieren la Tarea 6.
6. Tarea 8 (prueba de lista única en copia aislada): requiere las Tareas 3 y 6.

Los temporales de verificación (copia de la línea base, copias aisladas) viven bajo el `Directorio de temporales:` del despacho de `sdd-apply`, cada uno en un directorio nuevo de `mktemp -d`; ninguna verificación muta el worktree ni hace commit de fixtures.

---

## Spec: [[i18n-core-three-locales-single-source]] — Tres idiomas soportados con lista única y respaldo en español

### Tarea 1: Medir y registrar la línea base de `main@1c70406`

- **Archivos**: `memory/changes/debt-i18n-three-locales/baseline.md` (nuevo); copia de `dist/client` bajo el directorio de temporales
- **Qué hacer**: construir el sitio con el código sin modificar y registrar la medición contra la que se evalúan todos los criterios de paridad del cambio.
- **Criterio de completado**: `baseline.md` existe con la lista de HTML de `dist/client`, las URLs de `sitemap-*.xml`, los `hreflang` de cada página y el `name` del primer ítem del `BreadcrumbList` de cada página; la lista de HTML tiene 18 entradas (6 por idioma) y no incluye la 404; la copia de `dist/client` queda disponible para el diff de la Tarea 6.
- **Modo**: sin TDD (medición)

- [ ] Confirmar que `git -C <worktree> rev-parse HEAD` es `1c70406` y que `git -C <worktree> status --short -- log-atm-web-astro` no lista cambios de código
- [ ] Ejecutar `npm ci` en `log-atm-web-astro/` si no existe `node_modules`
- [ ] Ejecutar `npm run build` y confirmar exit 0 con la guarda de prerender (ADR-0012) en verde
- [ ] Copiar `dist/client` a `<temporales>/baseline/dist-client` (directorio nuevo de `mktemp -d`)
- [ ] Listar los HTML de `dist/client` y registrar la cuenta (18) y las rutas en `baseline.md`
- [ ] Registrar en `baseline.md` las URLs de `sitemap-*.xml` y sus enlaces alternativos
- [ ] Registrar en `baseline.md` los `<link rel="alternate" hreflang>` y los `og:locale` de cada página
- [ ] Registrar en `baseline.md` el `name` del primer ítem del `BreadcrumbList` de cada página que lo emite
- [ ] Registrar en `baseline.md` la cuenta de rutas prerenderizadas por idioma (6) y la 404 bajo demanda fuera de la cuenta

### Tarea 2: Retirar el código RTL muerto

- **Archivos**: `src/i18n/config.ts`, `src/i18n/utils.ts`, `src/layouts/BaseLayout.astro`, `src/components/ui/Navbar.astro`
- **Qué hacer**: eliminar `RTL_LOCALES`, `isRTL` y su re-export, el `dir` dinámico, la clase `is-rtl` y las reglas CSS RTL del drawer. `<html>` conserva `dir="ltr"` literal para mantener el HTML idéntico. Las propiedades lógicas de CSS se conservan.
- **Criterio de completado**: una búsqueda en `src` de `RTL_LOCALES`, `isRTL`, `is-rtl` y `[dir="rtl"]` no arroja resultados; `npm run check` termina con exit 0; el HTML generado declara `dir="ltr"` en las 18 páginas.
- **Requiere**: Tarea 1
- **Modo**: sin TDD

- [ ] En `config.ts`, eliminar la constante `RTL_LOCALES`
- [ ] En `utils.ts`, eliminar `RTL_LOCALES` del import desde `./config`
- [ ] En `utils.ts`, eliminar la función `isRTL` y su comentario de documentación
- [ ] En `utils.ts`, eliminar `RTL_LOCALES` del re-export final y `isRTL` de la línea de resumen del comentario de cabecera
- [ ] En `BaseLayout.astro`, eliminar `isRTL` del import y la constante `dir`
- [ ] En `BaseLayout.astro`, cambiar el elemento raíz a `<html lang={htmlLang} dir="ltr">`
- [ ] En `Navbar.astro`, eliminar `isRTL` del import y la constante `rtl`
- [ ] En `Navbar.astro`, reemplazar `class:list={['nav-drawer', { 'is-rtl': rtl }]}` por `class="nav-drawer"`
- [ ] En `Navbar.astro`, eliminar el bloque CSS `[dir="rtl"] .nav-drawer__panel, .nav-drawer.is-rtl .nav-drawer__panel` y su comentario
- [ ] En `Navbar.astro`, reemplazar `--drawer-offset` por `translateX(100%)` en `.nav-drawer__panel` y eliminar la variable y su comentario (`src` no la usa en otro archivo)
- [ ] Buscar en `src` `RTL_LOCALES`, `isRTL`, `is-rtl` y `[dir="rtl"]` y confirmar cero resultados
- [ ] Ejecutar `npm run check` y confirmar exit 0

### Tarea 3: Tomar los idiomas de la definición única en `config.ts`

- **Archivos**: `src/i18n/config.ts`, `astro.config.mjs`, `scripts/validate-i18n.ts`
- **Qué hacer**: derivar `NON_DEFAULT_LOCALES` de `LOCALES` dentro de `config.ts`, y hacer que el routing y el sitemap de `astro.config.mjs` y el validador tomen idiomas y maestro de `config.ts`, sin literales de idiomas en esos dos archivos. `config.ts` conserva cero imports (cargable por la configuración de Astro y por `tsx`).
- **Criterio de completado**: `astro.config.mjs` y `scripts/validate-i18n.ts` no contienen los literales `'es'`, `'en'` ni `'pt'` como definición de idiomas; `NON_DEFAULT_LOCALES` conserva el valor `['en', 'pt']` y su uso en `src/pages/[lang]/*.astro` no cambia; `npm run check`, `npm run validate-i18n` y `npm run build` terminan con exit 0.
- **Requiere**: Tarea 2
- **Modo**: sin TDD

- [ ] En `config.ts`, derivar `NON_DEFAULT_LOCALES` con `LOCALES.filter((l) => l !== DEFAULT_LOCALE)` tipado como `ReadonlyArray<Exclude<Locale, typeof DEFAULT_LOCALE>>`, y mover `DEFAULT_LOCALE` antes de la derivación si hace falta
- [ ] En `config.ts`, actualizar el comentario de cabecera para declarar que es la definición única de idiomas y que no importa imágenes, componentes ni otros recursos
- [ ] En `astro.config.mjs`, importar `LOCALES`, `DEFAULT_LOCALE` y `SITEMAP_LOCALES` de `./src/i18n/config.ts` con el patrón de `./src/lib/site.ts` (extensión `.ts`)
- [ ] En `astro.config.mjs`, reemplazar `defaultLocale: 'es'` y `locales: ['es', 'en', 'pt']` del bloque `i18n` por `DEFAULT_LOCALE` y `[...LOCALES]`
- [ ] En `astro.config.mjs`, reemplazar el bloque `i18n` del plugin `sitemap` por `defaultLocale: DEFAULT_LOCALE` y `locales: SITEMAP_LOCALES`
- [ ] En `scripts/validate-i18n.ts`, importar `LOCALES` y `DEFAULT_LOCALE` de `../src/i18n/config.ts` (mismo patrón que `check-i18n-links.ts`) y eliminar las constantes locales `LOCALES` y `MASTER` literales, usando `DEFAULT_LOCALE` como maestro
- [ ] En `scripts/validate-i18n.ts`, ajustar los tipos (`lang === DEFAULT_LOCALE`) y la cabecera para citar la definición única
- [ ] Buscar `'es'`, `'en'` y `'pt'` en `astro.config.mjs` y `scripts/validate-i18n.ts` y confirmar cero literales de idiomas
- [ ] Ejecutar `npm run validate-i18n` y confirmar exit 0 con los reportes de `en` y `pt` en OK
- [ ] Ejecutar `npm run check` y confirmar exit 0

### Tarea 4: Anexar la nota de actualización fechada a ADR-0002

- **Archivos**: `memory/adrs/0002-i18n-routing-pages-lang-folder.md`
- **Qué hacer**: anexar al final una sección «Nota de actualización — 2026-10-08» que declara los tres idiomas (es, en, pt), las seis páginas prerenderizadas por idioma (18 HTML) más la 404 bajo demanda, y referencia `[[0007-not-found-page-on-demand-single]]`, sin reescribir la decisión.
- **Criterio de completado**: la nota está al final del ADR, el texto de la decisión es byte a byte el anterior, y la nota nombra los tres idiomas, las seis páginas, la 404 bajo demanda y ADR-0007 en redacción de presente positivo.
- **Modo**: sin TDD (prosa)

- [ ] Leer el ADR completo y confirmar que la sección `## Estado` es el último bloque
- [ ] Anexar la sección `## Nota de actualización — 2026-10-08` después de `## Estado`
- [ ] Declarar en la nota los tres idiomas y las seis páginas prerenderizadas por idioma (18 HTML)
- [ ] Declarar en la nota la 404 única bajo demanda con `[[0007-not-found-page-on-demand-single]]`
- [ ] Comparar el diff del archivo y confirmar que solo hay líneas añadidas

### Tarea 5: Registrar la lista única de idiomas en el perfil del proyecto

- **Archivos**: `memory/_profile.md`
- **Qué hacer**: el cambio introduce una convención de proyecto (los idiomas viven en `src/i18n/config.ts` y el resto los importa). Actualizar la sección `## Conventions` del perfil, sin historia del cambio y sin tocar `## Pipeline SDD`.
- **Criterio de completado**: `## Conventions` declara que la lista de idiomas, el idioma por defecto y los códigos regionales viven en `src/i18n/config.ts` y que `astro.config.mjs` y `scripts/validate-i18n.ts` los importan; ninguna otra sección cambia respecto de su estado actual.
- **Modo**: sin TDD (prosa)

- [ ] Leer `memory/_profile.md` completo y localizar la línea `Fuentes de datos` de `## Conventions`
- [ ] Agregar una viñeta `Idiomas` en `## Conventions`, en presente y sin referencias al estado anterior
- [ ] Comparar el diff del archivo y confirmar que solo cambia `## Conventions`

### Tarea 6: Construir y comparar `dist/client` contra la línea base

- **Archivos**: `memory/changes/debt-i18n-three-locales/baseline.md` (sección de resultado del diff); lectura de `dist/client` y de la copia de la Tarea 1
- **Qué hacer**: construir con el código final y verificar que `dist/client` difiere de la línea base solo en la lista cerrada de diferencias admitidas.
- **Criterio de completado**: `npm run build` termina con exit 0 y la guarda de prerender en verde; el diff contra la línea base muestra únicamente (1) el `name` del primer ítem del `BreadcrumbList` en `/en` y `/pt` (Home e Início) y (2) el script de cliente de `CTASection` y `WhyVideoSection` (contenido inline o nombre con hash del bundle) cuyo único cambio es la eliminación de los respaldos; sitemap y `hreflang` idénticos; el resultado queda en `baseline.md`.
- **Requiere**: Tareas 1, 2, 3, 10 y 12
- **Modo**: sin TDD (verificación)

- [ ] Ejecutar `npm run build` y confirmar exit 0 y la línea de la guarda `[prerender]` con 18 páginas
- [ ] Comparar la lista de HTML de `dist/client` con la de la línea base y confirmar igualdad (18 archivos, sin 404)
- [ ] Ejecutar `diff -r` de `dist/client` contra `<temporales>/baseline/dist-client` y clasificar cada diferencia
- [ ] Confirmar que `sitemap-*.xml` es idéntico a la línea base
- [ ] Confirmar que cada página conserva `dir="ltr"` y los `hreflang` idénticos a la línea base
- [ ] Si el diff muestra una diferencia fuera de la lista cerrada (por ejemplo el CSS del Navbar, inline o con nombre con hash, por las reglas RTL retiradas), no admitirla en silencio: registrarla en `baseline.md` y en `observations.md` con tag `[hallazgo]` y reportarla en `Riesgos identificados` del envelope
- [ ] Registrar en `baseline.md` el resultado del diff con cada diferencia admitida y su causa

### Tarea 7: Ejecutar los comandos de cierre

- **Archivos**: ninguno (verificación)
- **Qué hacer**: ejecutar los cinco comandos del criterio de cierre sobre el build de la Tarea 6.
- **Criterio de completado**: `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links`, `npm run a11y` y `npm run measure:images` terminan con exit 0; la guarda de prerender ([[0012-prerender-output-guard]]) queda en verde en `npm run build`.
- **Requiere**: Tarea 6
- **Modo**: sin TDD (verificación)

- [ ] Ejecutar `npm run check` y confirmar exit 0
- [ ] Ejecutar `npm run validate-i18n` y confirmar exit 0
- [ ] Ejecutar `npm run check-i18n-links` y confirmar exit 0
- [ ] Ejecutar `npm run a11y` con `CHROME_PATH` o `./chrome` disponible y confirmar exit 0
- [ ] Ejecutar `npm run measure:images` y confirmar exit 0
- [ ] Registrar los cinco exit codes en `baseline.md`

### Tarea 8: Probar la lista única con un idioma ficticio en copia aislada

- **Archivos**: copia aislada bajo el directorio de temporales (ningún archivo del worktree)
- **Qué hacer**: demostrar que agregar un idioma ficticio solo en `src/i18n/config.ts` lo propaga al routing de Astro, al sitemap y a `validate-i18n`. La copia se obtiene con `git -C <worktree> archive HEAD log-atm-web-astro` más los cambios de las Tareas 2 y 3 copiados desde el worktree, o con una copia del directorio sin `node_modules` ni `dist`, siempre bajo un `mktemp -d` nuevo fuera de todo worktree (comprobar `realpath`); `node_modules` se enlaza simbólicamente desde el worktree.
- **Criterio de completado**: en la copia, con un idioma ficticio (por ejemplo `xx`) agregado solo a `LOCALES`, a `HTML_LANG`/`SITEMAP_LOCALES`, a `OG_LOCALE`, a `LOCALE_LABELS` y a `LOCALE_NAMES` de `config.ts`, `npm run validate-i18n` exige `xx.json` (falla con `xx` faltante), el config de Astro y el sitemap lo reconocen sin editar `astro.config.mjs` ni `validate-i18n.ts`, y esos dos archivos no declaran literales de idiomas; el worktree queda sin cambios y sin commit.
- **Requiere**: Tareas 3 y 6
- **Modo**: sin TDD (verificación)

- [ ] Crear el directorio aislado con `mktemp -d` bajo el directorio de temporales y comprobar con `realpath` que no cae dentro del repo ni de un worktree
- [ ] Copiar el código final de `log-atm-web-astro/` sin `node_modules` ni `dist` y enlazar `node_modules` del worktree
- [ ] Agregar `xx` en la copia solo en `src/i18n/config.ts`
- [ ] Ejecutar `npm run validate-i18n` en la copia y confirmar que reporta `xx` con el diccionario faltante
- [ ] Verificar en la copia que el routing de Astro y el sitemap incluyen `xx` (por ejemplo con `astro build` hasta el reporte de rutas, o leyendo la configuración resuelta)
- [ ] Confirmar que `astro.config.mjs` y `scripts/validate-i18n.ts` de la copia son idénticos a los del worktree
- [ ] Borrar la copia y confirmar con `git -C <worktree> status --short` que el worktree no cambió por esta prueba

---

## Spec: [[i18n-routing-pages-and-language-selector]] — Seis páginas por idioma con prefijo y selector de idioma en el navbar

### Tarea 9: Verificar páginas por idioma, selector y enlaces tras el cambio

- **Archivos**: ninguno salvo corrección de regresiones en `src/components/ui/Navbar.astro` y `src/components/ui/LanguageSelector.astro`; corpus de `memory/specs/i18n-routing/`
- **Qué hacer**: confirmar que retirar el RTL y tomar los idiomas de `config.ts` no altera las páginas, el selector ni el drawer, y que el corpus de la capability concuerda con tres idiomas.
- **Criterio de completado**: las 18 páginas prerenderizadas son las de la línea base y la 404 no figura entre ellas; el selector lista español, inglés y portugués con `aria-current` en el activo, en escritorio y en el drawer; el drawer conserva inert, focus-trap y `prefers-reduced-motion`; `npm run a11y` y `npm run check-i18n-links` terminan con exit 0; ninguna spec vigente de `i18n-routing` menciona `zh`, `hi` ni `ar`; `i18n-routing-locale-prefixes` e `i18n-ui-selector-navbar` declaran `superseded_by: "[[i18n-routing-pages-and-language-selector]]"`; `i18n-not-found-localized`, `i18n-not-found-navigation-and-seo-signals` e `i18n-internal-links-keep-language` no tienen cambios en git; ADR-0002 referencia a ADR-0007 (Tarea 4).
- **Requiere**: Tareas 4 y 6
- **Modo**: sin TDD (verificación)

- [ ] Comparar la lista de HTML de `dist/client` con la de `baseline.md` y confirmar 18 páginas sin 404
- [ ] Revisar en el HTML de `/`, `/en/` y `/pt/` que el selector lista los tres idiomas y marca el activo con `aria-current`
- [ ] Revisar en el diff de la Tarea 6 que el markup del drawer (`inert`, `aria-hidden`, focus-trap) no cambia
- [ ] Revisar que el CSS del drawer conserva la regla de `prefers-reduced-motion`
- [ ] Confirmar el exit 0 de `npm run a11y` y de `npm run check-i18n-links` (Tarea 7)
- [ ] Buscar `zh`, `hi` y `ar` como códigos de idioma en las specs de `memory/specs/i18n-routing/` no superseded y confirmar cero resultados
- [ ] Verificar en el frontmatter que `superseded_by` de las dos specs absorbidas apunta a esta spec
- [ ] Verificar con `git -C <worktree> status --short -- memory/specs/i18n-routing` que las tres specs de 404 y enlaces no figuran modificadas

---

## Spec: [[i18n-seo-alternates-sitemap-and-breadcrumbs]] — Alternativas de idioma, sitemap y migas localizadas en tres idiomas

### Tarea 10: Localizar el nombre del inicio en el `BreadcrumbList`

- **Archivos**: `src/layouts/BaseLayout.astro`
- **Qué hacer**: reemplazar el literal `'Inicio'` del primer ítem de `breadcrumbSchema` por `t('common.breadcrumbHome')` (clave existente: Inicio / Home / Início).
- **Criterio de completado**: el `name` del primer ítem es «Inicio» en `dist/client/**`, «Home» en `dist/client/en/**` e «Início» en `dist/client/pt/**`, y es la única diferencia de los datos estructurados respecto de la línea base; la 404 sigue sin emitir migas.
- **Requiere**: Tarea 2 (mismo archivo)
- **Modo**: sin TDD

- [ ] En `BaseLayout.astro`, reemplazar `name: 'Inicio'` por `name: t('common.breadcrumbHome')`
- [ ] Confirmar que `t` está definido antes de `breadcrumbSchema` en el frontmatter
- [ ] Buscar el literal `'Inicio'` en `BaseLayout.astro` y confirmar cero resultados
- [ ] Ejecutar `npm run check` y confirmar exit 0

### Tarea 11: Verificar alternativas, sitemap, `og:locale` y migas contra la línea base

- **Archivos**: ninguno (verificación); registro en `memory/changes/debt-i18n-three-locales/baseline.md`
- **Qué hacer**: confirmar sobre el build de la Tarea 6 que las señales SEO coinciden con la línea base salvo el nombre de las migas.
- **Criterio de completado**: cada página indexable tiene 3 `hreflang` de idioma más `x-default` idénticos a la línea base; `og:locale` y los dos `og:locale:alternate` son correctos por idioma; el sitemap tiene 18 URLs idénticas a la línea base, con alternativas y sin la 404; los tags BCP-47 del sitemap y de los `hreflang` coinciden con `lang` del documento y con `config.ts`; la 404 no emite alternativas, canónica, `og:url` ni migas (se comprueba sobre el HTML de la 404 servido por `astro preview`, vía el script `a11y` o una sonda equivalente); el `name` del primer ítem de migas es la única diferencia de datos estructurados.
- **Requiere**: Tarea 6
- **Modo**: sin TDD (verificación)

- [ ] Comparar los `hreflang` de cada HTML con los registrados en la línea base y confirmar igualdad
- [ ] Revisar `og:locale` y `og:locale:alternate` en una página por idioma
- [ ] Comparar `sitemap-*.xml` con la línea base y confirmar 18 URLs idénticas sin la 404
- [ ] Confirmar que los tags `es-CL`, `en-US` y `pt-BR` del sitemap y de los `hreflang` coinciden con `<html lang>` y con `HTML_LANG`
- [ ] Extraer el `name` del primer ítem del `BreadcrumbList` de las 15 páginas internas (5 por idioma) y confirmar Inicio, Home e Início
- [ ] Confirmar que, fuera del `name` del primer ítem, el JSON-LD es idéntico a la línea base
- [ ] Servir el build con `astro preview`, pedir una URL inexistente y confirmar que su HTML no contiene canónica, `og:url`, `hreflang` alternos ni `BreadcrumbList`
- [ ] Verificar en el frontmatter que `i18n-seo-hreflang` declara `superseded_by: "[[i18n-seo-alternates-sitemap-and-breadcrumbs]]"`

---

## Spec: [[i18n-translations-parity-and-build-validation]] — Paridad de diccionarios en tres idiomas, validación en build y textos sin respaldo

### Tarea 12: Retirar los respaldos en español de los scripts de cliente

- **Archivos**: `src/components/sections/CTASection.astro`, `src/components/sections/WhyVideoSection.astro`
- **Qué hacer**: eliminar el operador `?? "<texto en español>"` de las lecturas `dataset.…` que el script de cliente usa para mensajes visibles; los `data-*` ya se renderizan desde el i18n. Se conserva el literal `payload.preference = "Email"` (valor de payload) y los `?? ""` de lecturas que no son texto visible.
- **Criterio de completado**: una búsqueda del operador `??` seguido de un texto literal en español en los scripts de ambos componentes no arroja resultados (el valor enviado al operador queda fuera de la búsqueda); el HTML de las páginas que incluyen esos scripts difiere de la línea base solo en el script de cliente y únicamente por esa eliminación; `npm run check` termina con exit 0.
- **Requiere**: Tarea 1
- **Modo**: sin TDD

- [ ] En `CTASection.astro`, quitar los respaldos de las nueve entradas del objeto de mensajes (`noContact`, `badEmail`, `wa`, `email`, `sending`, `sent`, `reviewPrefix`, `sendFail`, `connError`) manteniendo `submitBtn?.dataset.msg…`
- [ ] En `CTASection.astro`, ajustar los tipos del objeto de mensajes si `dataset` devuelve `string | undefined` donde el código espera `string`
- [ ] En `WhyVideoSection.astro`, quitar `?? 'Pausar video'` y `?? 'Reproducir video'` de la línea del `aria-label`
- [ ] En `WhyVideoSection.astro`, ajustar el tipo del valor pasado a `setAttribute` si hace falta
- [ ] Buscar `?? "` y `?? '` seguidos de texto en español en ambos archivos y confirmar cero resultados salvo valores no visibles
- [ ] Confirmar que `payload.preference = "Email"` de `CTASection.astro` no cambia
- [ ] Ejecutar `npm run check` y confirmar exit 0

### Tarea 13: Anexar la nota de actualización fechada a ADR-0003

- **Archivos**: `memory/adrs/0003-i18n-key-validation-build-hook.md`
- **Qué hacer**: anexar al final una sección «Nota de actualización — 2026-10-08» que declara que `prebuild` nunca existió en el proyecto y que el hook `astro:build:start` de `astro.config.mjs` es el mecanismo único de validación en build, sin reescribir la decisión.
- **Criterio de completado**: la nota está al final del ADR, el texto de la decisión es byte a byte el anterior y la nota declara `prebuild` inexistente y el hook `astro:build:start` como único mecanismo.
- **Modo**: sin TDD (prosa)

- [ ] Leer el ADR completo y confirmar que `## Estado` es el último bloque
- [ ] Anexar la sección `## Nota de actualización — 2026-10-08` después de `## Estado`
- [ ] Declarar en la nota que `prebuild` nunca existió y que `astro:build:start` es el mecanismo único
- [ ] Comparar el diff del archivo y confirmar que solo hay líneas añadidas

### Tarea 14: Verificar la paridad y la validación en build en copia aislada

- **Archivos**: copia aislada bajo el directorio de temporales (ningún archivo del worktree); corpus de `memory/specs/i18n-translations/`
- **Qué hacer**: demostrar que la validación sigue fallando ante divergencia estructural y que el corpus de la capability declara la supersesión.
- **Criterio de completado**: en una copia aislada con una clave eliminada de `pt.json`, `npm run validate-i18n` termina con exit 1 e indica idioma y clave, y `npm run build` falla antes de generar HTML; en la copia con una clave sobrante en `en.json`, la validación la reporta como `extra`; `i18n-translations-json-structure` e `i18n-translations-build-validation` declaran `superseded_by: "[[i18n-translations-parity-and-build-validation]]"`; ADR-0003 contiene la nota (Tarea 13); el worktree queda sin cambios por esta prueba.
- **Requiere**: Tareas 6 y 13
- **Modo**: sin TDD (verificación)

- [ ] Crear la copia aislada con `mktemp -d` bajo el directorio de temporales (misma preparación que la Tarea 8)
- [ ] Eliminar una clave de `src/i18n/translations/pt.json` en la copia y ejecutar `npm run validate-i18n`; confirmar exit 1 y el reporte `pt` con la clave `missing`
- [ ] Ejecutar `npm run build` en la copia y confirmar que falla en `astro:build:start`, sin HTML generado
- [ ] Restaurar `pt.json` en la copia, agregar una clave extra a `en.json` y confirmar el reporte `extra` de `en` con exit 1
- [ ] Verificar en el frontmatter que las dos specs absorbidas declaran `superseded_by` hacia `i18n-translations-parity-and-build-validation`
- [ ] Borrar la copia y confirmar con `git -C <worktree> status --short -- log-atm-web-astro` que el código del worktree solo contiene los cambios de las Tareas 2, 3, 10 y 12
