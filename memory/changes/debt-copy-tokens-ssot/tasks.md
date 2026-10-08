# Tasks: debt-copy-tokens-ssot

Todas las rutas de código son relativas a `{WORKTREE}/log-atm-web-astro/` (la app Astro), salvo que se indique otra raíz. `{WORKTREE}` = `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot`. Camino `spec-first`: no hay `design.md`; las decisiones técnicas viven en los requisitos de las specs.

Particularidades de verificación de este repo (Chrome local, quirks de `astro preview`, `npm run a11y`, grep sobre `dist/`): `/home/kapridoo/projects/log-atm-web-astro/.sdd/briefs/auditoria-2026-10/00-contexto-operativo.md` (leer antes de las tareas 1, 7 y 20; no se copia aquí).

Este repo no tiene corredor de tests; ninguna tarea es `[TDD]`. Los escenarios de las specs se verifican con `npm run build`, `npm run check`, `npm run validate-i18n`, búsquedas sobre `src/` y `dist/client`, y el diff contra la línea base de la tarea 1.

## Orden de ejecución

1. Tarea 1 (línea base) corre ANTES de tocar cualquier archivo versionado; Tarea 2 prepara dependencias.
2. Copy (`copy-single-source`): Tarea 3 (helper) → Tareas 4 y 5 (migrar los 12 sitios; independientes entre sí) → Tarea 6 (depurar `constants.ts`) → Tarea 7 (prueba de fallo del build) → Tarea 8 (perfil del proyecto).
3. Identidad (`site-identity-single-source`): Tarea 9 (`site.ts`) → Tareas 10, 11 y 12 (consumidores; independientes entre sí).
4. Host canónico (`canonical-host-www`): Tarea 13 (`astro.config.mjs`) y Tarea 14 (endpoint de robots); requieren Tarea 9.
5. Cotizador (`quote-extras-and-origin-options`): Tarea 15 (i18n y opción «Otro»); requiere Tareas 5 y 6.
6. Color (`color-token-policy`): Tareas 16, 17 y 18 (independientes entre sí y del resto del código).
7. Cierre: Tarea 19 (build, diff contra la línea base) → Tarea 20 (checks del repo y a11y). Requieren todas las anteriores.

Convención de commits para `sdd-apply`: un commit por capa (copy, identidad+host, cotizador, color), en inglés y Conventional Commits; los pasos de verificación no generan commit.

---

## Spec: [[copy-single-source]] — Todo el texto visible sale del i18n y un desalineamiento con los datos rompe la construcción

### Tarea 1: Capturar la línea base de `dist/client` en el commit base

- **Archivos**: `{WORKTREE}/log-atm-web-astro/.wrangler/baseline/` (gitignored por `log-atm-web-astro/.gitignore`; confirmar con `git -C {WORKTREE} check-ignore -v log-atm-web-astro/.wrangler/baseline`). No se versiona nada.
- **Qué hacer**: construir el commit base `e9d68aeda82ebb3cbb7d43264c33c31251ea70ff` en una copia aislada y guardar las señales de sus páginas en el directorio gitignored, para que las tareas 19 y `sdd-verify` puedan diffear. Esta tarea va ANTES de cualquier edición de código.
- **Criterio de completado**: `.wrangler/baseline/before/` contiene una extracción por cada `index.html` de `dist/client` (home, servicios, nosotros, cotizar, industrias, contacto, y la página 404 si se prerenderiza; en es, en y pt), más `sitemap*.xml`, `robots.txt` y los CSS construidos; `.wrangler/baseline/extract-site-signals.mjs` queda guardado junto a ellos; `git -C {WORKTREE} status --short` no muestra archivos nuevos.
- **Requiere**: ninguna.

- [ ] Obtener el árbol del commit base con `git -C {WORKTREE} archive e9d68aeda82ebb3cbb7d43264c33c31251ea70ff | tar -x -C ${DEST}`, con `${DEST}` creado por `mktemp -d` bajo el directorio de temporales del despacho; comprobar por `realpath` que `${DEST}` no cae dentro del repo principal ni de ningún worktree
- [ ] Enlazar `${DEST}/log-atm-web-astro/node_modules` a `/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules` (solo lectura; la copia está fuera de todo repo)
- [ ] Construir en la copia con `npm run build` dentro de `${DEST}/log-atm-web-astro` y confirmar que termina en verde (quirk de `astro preview` no aplica: no se sirve nada)
- [ ] Escribir `{WORKTREE}/log-atm-web-astro/.wrangler/baseline/extract-site-signals.mjs`: recibe un `dist/client` y un directorio de salida, y por cada `index.html` escribe un archivo con (a) texto visible (sin `script`, `style` ni `noscript`, entidades decodificadas, espacios colapsados), (b) `<title>` y todas las `<meta>` (name/property y content), (c) los `<link rel="canonical">` y `<link rel="alternate">`, y (d) cada bloque JSON-LD parseado e impreso con claves ordenadas
- [ ] Ejecutar el script sobre `${DEST}/log-atm-web-astro/dist/client` con salida en `.wrangler/baseline/before/`
- [ ] Copiar a `.wrangler/baseline/before/` los `sitemap*.xml`, `robots.txt` y los CSS de `dist/client/_astro/`
- [ ] Guardar el SHA base en `.wrangler/baseline/base-sha.txt`
- [ ] Borrar `${DEST}` al terminar (ruta literal del `mktemp` asignada en el mismo comando)

### Tarea 2: Instalar dependencias en el worktree

- **Archivos**: `node_modules/` (gitignored)
- **Qué hacer**: dejar el worktree capaz de ejecutar `build`, `check` y los validadores.
- **Criterio de completado**: `npm run check` y `npm run validate-i18n` corren en el worktree sobre el commit base sin errores (referencia de estado inicial); `git status` no muestra cambios nuevos.
- **Requiere**: Tarea 1.

- [ ] Ejecutar `npm ci` dentro de `log-atm-web-astro/` (un `node_modules` simbólico quedaría sin ignorar: el patrón `node_modules/` solo cubre directorios)
- [ ] Ejecutar `npm run check` y `npm run validate-i18n` y anotar que parten en verde

### Tarea 3: Crear el helper compartido de listas alineadas

- **Archivos**: `src/i18n/utils.ts`
- **Qué hacer**: añadir, junto a `tList`, un único helper exportado que recibe `lang`, la clave de la lista y la lista de datos; resuelve el texto con `tList`, y si la cantidad de ítems del texto difiere de la de los datos lanza un `Error` cuyo mensaje nombra la clave, el idioma y ambas longitudes; si coinciden, retorna la lista de texto. Sin valor de respaldo. Actualizar la cabecera del archivo con una línea que lo describe.
- **Criterio de completado**: el helper está exportado y tipado; no hay otra función que compare longitudes; `npm run check` sin errores.
- **Requiere**: Tarea 2.

- [ ] Escribir el helper (nombre sugerido `tListFor`) con tipo genérico sobre el ítem de texto
- [ ] Redactar el mensaje de error en español con clave, idioma y las dos longitudes
- [ ] Documentar el helper con un comentario en español

### Tarea 4: Migrar los sitios de la portada al helper

- **Archivos**: `src/components/sections/ServicesSection.astro`, `src/components/sections/HeroSection.astro`, `src/components/sections/WhyVideoSection.astro`, `src/components/sections/IndustriesSection.astro`, `src/components/sections/CTASection.astro`
- **Qué hacer**: en cada archivo, reemplazar `tList` + fusión con `?? datos` por el helper de la Tarea 3, de modo que title, desc, tag, label, name, sub y las etiquetas de las opciones salgan solo del i18n (`servicios.list`, `home.hero.stripStats`, `home.why.items`, `industrias.names`, `home.cta.modeOptions`, `home.cta.volumeOptions`). Los valores que el formulario rápido envía (`QUICK_QUOTE_MODES` y `QUICK_QUOTE_VOLUMES`) siguen siendo el `value`; la etiqueta visible sale del i18n.
- **Criterio de completado**: ningún `??` ni `|| ` fusiona texto de datos en estos cinco archivos; el build sigue en verde con los datos aún presentes; el HTML de la portada no cambia (se confirma en la Tarea 19).
- **Requiere**: Tarea 3.

- [ ] Migrar `ServicesSection.astro` (sitio 1: servicios en home)
- [ ] Migrar `HeroSection.astro` (sitio 3: estadísticas del hero)
- [ ] Migrar `WhyVideoSection.astro` (sitio 4: motivos de «por qué»)
- [ ] Migrar `IndustriesSection.astro` (sitio 5: industrias en home)
- [ ] Migrar `CTASection.astro` (sitio 12: opciones de modalidad y volumen del cotizador rápido)
- [ ] Auditar los campos que se renderizan como texto y no existen en el i18n (`num`, `metric` y `n`/`step` de numeración): si son cifras neutras al idioma (`20+`, `1:1`, `24/7`, `4`, `01`) se tratan como id y permanecen en los datos; anotar la decisión en `memory/observations.md`; todo otro texto renderizado debe estar en el i18n

### Tarea 5: Migrar los sitios de las sub-páginas al helper

- **Archivos**: `src/pages/servicios.astro`, `src/pages/nosotros.astro`, `src/pages/cotizar.astro`, `src/pages/industrias.astro`
- **Qué hacer**: mismo cambio que la Tarea 4 en `servicios.astro` (servicios), `nosotros.astro` (`nosotros.values.items` y `nosotros.how.items`), `cotizar.astro` (`cotizar.modes` y `cotizar.steps`) e `industrias.astro` (`industrias.names`, `industrias.tags` y `industrias.servicesPer`). En `industrias.astro` las tres listas se alinean contra `INDUSTRIES` con el helper y se eliminan los `?? []` y `?? ind.name`.
- **Criterio de completado**: ningún `??` fusiona texto de datos en los cuatro archivos; el build sigue en verde; los 12 sitios usan el helper (`grep` del nombre del helper en `src/` lista los ocho archivos de las Tareas 4 y 5).
- **Requiere**: Tarea 3.

- [ ] Migrar `servicios.astro` (sitio 2)
- [ ] Migrar `nosotros.astro` (sitios 6 y 7: valores y cómo trabajamos)
- [ ] Migrar `cotizar.astro` (sitios 8 y 9: modalidades y pasos)
- [ ] Migrar `industrias.astro` (sitio 10: industrias en su página)
- [ ] Confirmar con búsqueda en `src/` que ninguna página conserva `tList` + `??` con datos de texto

### Tarea 6: Depurar los datos no textuales de `constants.ts`

- **Archivos**: `src/lib/constants.ts`
- **Qué hacer**: en `SERVICES`, `HERO_STRIP_STATS`, `WHY_ITEMS`, `INDUSTRIES`, `VALUES`, `HOW_WE_WORK`, `QUOTE_MODES` y `QUOTE_STEPS` dejar solo ids, imágenes, íconos, tamaños, enlaces y colores (eliminar title, desc, tag, label, name, sub y demás texto visible); eliminar el export `SEO`. No tocar `SITE` (lo maneja la Tarea 9) ni los topónimos (`LIVE_ROUTES`, orígenes y destinos) ni los valores del cotizador rápido. Añadir sobre los colores de `INDUSTRIES` un comentario de una línea en español que diga que son datos de contenido por industria (no tokens de diseño).
- **Criterio de completado**: `grep` en `src/` de los cuatro textos obsoletos («tiempos garantizados» con «Express · 48h», «Bodegaje, fulfillment y última milla», «KPIs medibles y revisión trimestral», «Express 48h–7d») no devuelve resultados; `SEO` no existe y no tiene consumidores; `npm run build` y `npm run check` terminan sin error; el comentario de una línea sobre los colores de industrias está presente (cubre también el criterio de [[color-token-policy]]).
- **Requiere**: Tareas 4 y 5.

- [ ] Quitar los campos de texto de `SERVICES` (title, desc, tag)
- [ ] Quitar el texto de `HERO_STRIP_STATS` (label), `WHY_ITEMS` (title, desc, sub), `INDUSTRIES` (name, sub), `VALUES`, `HOW_WE_WORK`, `QUOTE_MODES` (name, desc) y `QUOTE_STEPS` (label, name)
- [ ] Eliminar `SEO` tras confirmar con búsqueda que no tiene consumidores
- [ ] Añadir el comentario de una línea sobre los colores de `INDUSTRIES`
- [ ] Ejecutar `npm run build` y `npm run check`
- [ ] Buscar en `src/` los cuatro textos obsoletos con `/usr/bin/grep` dentro de `bash -c` (el `grep` de zsh puede ser ugrep)

### Tarea 7: Verificar que un desalineamiento rompe validación y build

- **Archivos**: ninguno versionado; trabajar sobre una copia aislada bajo el directorio de temporales del despacho (`git -C {WORKTREE} archive HEAD | tar -x -C ${DEST}` con `${DEST}` de `mktemp -d`, fuera de todo repo)
- **Qué hacer**: en la copia, quitar un ítem de una lista del i18n y comprobar los escenarios de la spec. Referencia de ejecución: `00-contexto-operativo.md`.
- **Criterio de completado**: quitar un ítem solo de `en.json` hace fallar `npm run validate-i18n` (exit distinto de 0, el reporte nombra idioma y clave); quitarlo de `es.json`, `en.json` y `pt.json` hace fallar `astro build` con un mensaje que nombra la clave y las dos longitudes; sin mutación, `npm run build` y `npm run check` terminan sin error; la copia se borra al terminar.
- **Requiere**: Tareas 3 a 6.

- [ ] Preparar la copia aislada, enlazar `node_modules` del checkout principal y borrar un ítem de `servicios.list` en `en.json`
- [ ] Ejecutar `npm run validate-i18n` en la copia y registrar el reporte
- [ ] Borrar el mismo ítem en los tres idiomas y ejecutar `npm run build` en la copia; registrar el mensaje del helper
- [ ] Repetir con una lista de otro sitio (p. ej. `industrias.tags`) para confirmar que el helper cubre las alineaciones anidadas
- [ ] Borrar la copia; ejecutar `npm run build` y `npm run check` en el worktree sin mutaciones

### Tarea 8: Actualizar la convención de fuentes de datos en el perfil del proyecto

- **Archivos**: `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/_profile.md`
- **Qué hacer**: en `## Conventions` y en la línea «**Convention:**» de `## Image Pipeline (Current)` reemplazar la convención de que `constants.ts` es la fuente de contenido por la vigente: todo texto visible sale del i18n; `constants.ts` conserva datos no textuales (ids, imágenes, íconos, tamaños, enlaces y colores); la identidad del sitio vive en `src/lib/site.ts`. Redactar en presente, sin historia del cambio, y no tocar `## Pipeline SDD` ni otras secciones.
- **Criterio de completado**: `_profile.md` enuncia las tres fuentes únicas sin mencionar el cambio; `updated` del frontmatter refleja la fecha.
- **Requiere**: Tarea 6.

- [ ] Editar la sección `## Conventions`
- [ ] Reescribir la línea «**Convention:** `constants.ts` is the single source of truth...» de `## Image Pipeline (Current)`

---

## Spec: [[site-identity-single-source]] — Identidad del sitio con una única fuente

### Tarea 9: Crear `src/lib/site.ts` con la identidad del sitio

- **Archivos**: `src/lib/site.ts` (nuevo)
- **Qué hacer**: definir sin imports `SITE` con `name` («LOG ATM»), `url` (`https://www.logatm.com`), `phone` (`+56982708492`), `phoneDisplay` (`+56 9 8270 8492`), `email` (`contacto@logatm.com`), `address` estructurada (`street` «Av. Pdte Kennedy 5600, Of. 507», `locality` «Vitacura», `city` «Santiago», `region` «Región Metropolitana», `country` «Chile», `countryCode` «CL»), `geo` (latitud -33.4081, longitud -70.5756) y `social` (facebook, twitter, instagram con las URLs actuales). Sin slogan. Exportar además lo derivado: el enlace de WhatsApp (dígitos de `phone` + el texto prellenado actual, que no cambia) y una función o constante que arma la línea de dirección. Comentarios en español.
- **Criterio de completado**: el archivo no importa nada; los valores de teléfono y email son idénticos a los vigentes; ningún otro archivo define estos datos tras las Tareas 10 a 12.
- **Requiere**: Tarea 2.

- [ ] Crear `site.ts` con el objeto `SITE`
- [ ] Derivar el enlace de WhatsApp del teléfono
- [ ] Derivar la línea de dirección (`street, locality, city, country`) y la variante del correo (`street<br>locality · city · country` con separadores `&middot;`, idéntica al HTML actual)
- [ ] Verificar que `site.ts` carga con `node --experimental-strip-types` o `tsx` sin otras dependencias

### Tarea 10: Migrar los consumidores de las páginas y componentes a `site.ts`

- **Archivos**: `src/components/ui/Footer.astro`, `src/components/ui/Navbar.astro`, `src/components/sections/HeroSection.astro`, `src/components/sections/CTASection.astro`, `src/pages/contacto.astro`, `src/pages/cotizar.astro`, `src/lib/constants.ts`
- **Qué hacer**: cambiar el import de `SITE` a `../lib/site` (y su equivalente por profundidad) en cada consumidor; el enlace de WhatsApp y la línea de dirección salen de los derivados de `site.ts`. Eliminar `SITE` de `constants.ts` sin dejar copias. `CURRENT_YEAR` permanece en `constants.ts`.
- **Criterio de completado**: `SITE` ya no existe en `constants.ts`; búsqueda de `SITE.address`, `SITE.whatsappUrl` y `+56 9 8270 8492` en `src/` solo encuentra usos que leen de `site.ts`; el teléfono y el email mostrados no cambian; `npm run build` y `npm run check` terminan sin error.
- **Requiere**: Tarea 9 (y Tarea 6 para evitar conflicto de edición sobre `constants.ts`).

- [ ] Migrar `Footer.astro` (teléfono, email, línea de dirección, nombre)
- [ ] Migrar `Navbar.astro` (enlace de WhatsApp)
- [ ] Migrar `HeroSection.astro` y `CTASection.astro` (enlace de WhatsApp, `data-wa-number`, `data-email`)
- [ ] Migrar `contacto.astro` (canales, línea de dirección de la oficina) y `cotizar.astro` (enlace de WhatsApp)
- [ ] Eliminar `SITE` de `constants.ts` y confirmar que ningún archivo lo importa de ahí

### Tarea 11: Migrar el layout base y los datos estructurados

- **Archivos**: `src/layouts/BaseLayout.astro`
- **Qué hacer**: eliminar `SITE_NAME` y `SITE_URL`; usar `SITE.name` y `SITE.url` de `site.ts` en canonical, hreflang, `og:image`, `og:site_name`, `WebSite` y `BreadcrumbList`. El título por defecto sale de `t('meta.defaultTitle')`. El JSON-LD `FreightForwarder` toma nombre, URL, teléfono, email, dirección (`streetAddress`, `addressLocality`, `addressRegion`, `addressCountry`), `geo` y `sameAs` de `SITE`, y su `slogan` es `t('meta.tagline')` del idioma de la página. El `name: 'Inicio'` del `BreadcrumbList` no cambia.
- **Criterio de completado**: `BaseLayout.astro` no contiene el nombre ni la URL del sitio como literales; el JSON-LD de `/en/` y `/pt/` publica «Logistics tailored to you» y «Logística sob medida», el de `/` «Logística a tu medida»; `npm run build` en verde.
- **Requiere**: Tarea 9.

- [ ] Reemplazar las constantes locales por `SITE`
- [ ] Reemplazar el título por defecto por `t('meta.defaultTitle')`
- [ ] Armar el JSON-LD desde `SITE` con el `slogan` localizado
- [ ] Mantener `sameAs` en el orden facebook, twitter, instagram

### Tarea 12: Migrar la plantilla de correo

- **Archivos**: `src/lib/email-templates.ts`
- **Qué hacer**: el nombre («LOG ATM») y la dirección del encabezado y el pie salen de `SITE` (importado de `./site`); el eslogan sale de `meta.tagline` del español mediante un import nombrado de la clave `meta` de `../i18n/translations/es.json` (no el JSON completo). Los colores literales del correo permanecen (excepción declarada); las menciones textuales «logatm.com» del copy y el texto prellenado de WhatsApp no cambian.
- **Criterio de completado**: `email-templates.ts` no contiene el nombre, el eslogan ni la dirección como literales fuera de comentarios; los tres correos mantienen el mismo HTML de encabezado y pie; `npm run build` y `npm run check` en verde; el bundle del worker de correo importa solo `meta`.
- **Requiere**: Tarea 9.

- [ ] Importar `SITE` y la clave `meta` del JSON español
- [ ] Reemplazar nombre y eslogan en el encabezado y el pie
- [ ] Reemplazar la dirección con la línea derivada de `site.ts`
- [ ] Confirmar que `npm run check` acepta el import nombrado del JSON (si el tipo falla, ajustar el import sin duplicar el eslogan)

---

## Spec: [[canonical-host-www]] — Host canónico www en todas las señales de búsqueda

### Tarea 13: Leer la URL del sitio desde `site.ts` en la configuración de Astro

- **Archivos**: `astro.config.mjs`
- **Qué hacer**: importar `SITE` de `./src/lib/site.ts` y usar `SITE.url` como valor de `site`. `site.ts` no tiene imports, de modo que cargue en el entorno de construcción.
- **Criterio de completado**: `astro.config.mjs` no contiene el literal `https://logatm.com`; `npm run build` termina en verde; el sitemap generado usa `https://www.logatm.com`. Dejar anotado en el reporte de la fase que el primer build de Workers Builds tras el merge debe revisarse (el import de TS desde el config).
- **Requiere**: Tarea 9.

- [ ] Añadir el import y reemplazar el literal de `site`
- [ ] Ejecutar `npm run build` y revisar `dist/client/sitemap-0.xml` y `dist/client/sitemap-index.xml`

### Tarea 14: Reemplazar `public/robots.txt` por un endpoint prerenderizado

- **Archivos**: `src/pages/robots.txt.ts` (nuevo), `public/robots.txt` (eliminar)
- **Qué hacer**: crear el endpoint con `export const prerender = true` y un `GET` que responde `text/plain; charset=utf-8` con el mismo contenido del archivo actual (`User-agent: *`, `Allow: /`, línea en blanco, `Sitemap:` con la URL armada desde `SITE.url` + `/sitemap-index.xml`, newline final). Eliminar `public/robots.txt`.
- **Criterio de completado**: `public/robots.txt` no existe; `dist/client/robots.txt` existe y contiene `Sitemap: https://www.logatm.com/sitemap-index.xml`; la única diferencia del contenido respecto de la línea base es el host; el build no reporta colisión de rutas.
- **Requiere**: Tarea 9.

- [ ] Crear `src/pages/robots.txt.ts`
- [ ] Eliminar `public/robots.txt` del árbol
- [ ] Ejecutar `npm run build` y comparar `dist/client/robots.txt` con `.wrangler/baseline/before/robots.txt`
- [ ] Servir con `astro preview` (ver `00-contexto-operativo.md`: relanzar tras el build) y confirmar `Content-Type: text/plain` para `/robots.txt`; bajar el servidor al terminar

---

## Spec: [[quote-extras-and-origin-options]] — Opciones del cotizador: extras sin «Última milla» y origen «Otro» traducido

### Tarea 15: Quitar «Última milla» y traducir la opción de origen «Otro»

- **Archivos**: `src/i18n/translations/es.json`, `src/i18n/translations/en.json`, `src/i18n/translations/pt.json`, `src/pages/cotizar.astro`, `src/lib/constants.ts`
- **Qué hacer**: (1) quitar «Última milla», «Last mile» y «Última milha» de `cotizar.extras`; quedan cuatro opciones en los tres idiomas. (2) añadir la clave `cotizar.step2.originOther` («Otro», «Other», «Outro») en los tres idiomas. (3) quitar `'Otro'` de `QUOTE_ORIGINS` y renderizar al final del `<select id="q-origin">` una opción fija `<option value="Otro">` cuya etiqueta es `t('cotizar.step2.originOther')`. `src/pages/api/cotizacion.ts` no cambia.
- **Criterio de completado**: `cotizar.extras` tiene cuatro ítems por idioma; la opción «Otro» tiene `value="Otro"` en los tres idiomas y etiqueta traducida; `npm run validate-i18n` termina en exit 0; `npm run build` y `npm run check` en verde; el diff de texto visible de cotizar contra la línea base solo muestra la ausencia de «Última milla» y las etiquetas «Other»/«Outro» (se confirma en la Tarea 19).
- **Requiere**: Tareas 5 y 6.

- [ ] Editar `cotizar.extras` en los tres JSON
- [ ] Añadir `cotizar.step2.originOther` en los tres JSON
- [ ] Quitar `'Otro'` de `QUOTE_ORIGINS` y añadir la opción final en `cotizar.astro`
- [ ] Confirmar con búsqueda que `QUOTE_ORIGINS` solo se usa en `cotizar.astro` y que `api/cotizacion.ts` no depende del número de extras
- [ ] Ejecutar `npm run validate-i18n`
- [ ] Anotar en `observations.md` que el resumen del wizard muestra el valor «Otro» (no la etiqueta) tras elegir esa opción, coherente con la spec

---

## Spec: [[color-token-policy]] — Política de color: tokens para marca y semántica, sin literales nuevos

### Tarea 16: Retirar los tokens sin consumidores de `tokens.css`

- **Archivos**: `src/styles/tokens.css`
- **Qué hacer**: eliminar los 18 tokens `--opacity-*` y sus encabezados de sección, tanto en `:root` como en `@theme`, y eliminar `--color-whatsapp-hover-dark` en ambos bloques. Conservar `--color-whatsapp`, `--color-whatsapp-hover` y `--color-whatsapp-text` con sus valores. Conservar tokens de sombra y de radio en `:root` y los de radio en `@theme`; añadir los tokens de sombra (`--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-cta`) a `@theme` si no están, para que existan como utilidades de Tailwind.
- **Criterio de completado**: `grep` de `--opacity-` y `whatsapp-hover-dark` en `src/` y `DESIGN.md` no encuentra definiciones ni usos de `var()`; el build termina en verde; el CSS construido, comparado con `.wrangler/baseline/before/` (Tarea 1), difiere solo en las declaraciones eliminadas. Si añadir las sombras a `@theme` hace aparecer declaraciones nuevas en el CSS construido, registrar la tensión entre los criterios 4 y 5 de la spec en `observations.md` y en `Riesgos identificados` del reporte, sin decidirla por cuenta propia.
- **Requiere**: Tarea 2.

- [ ] Confirmar con `/usr/bin/grep` dentro de `bash -c` que no hay consumidores de `--opacity-*` ni de `--color-whatsapp-hover-dark` en `src/`
- [ ] Eliminar el bloque de opacidad de `:root` y de `@theme`
- [ ] Eliminar `--color-whatsapp-hover-dark` de ambos bloques
- [ ] Comprobar si los tokens de sombra están en `@theme` y añadirlos con los mismos valores de `:root` si faltan
- [ ] Construir y diffear los CSS contra `.wrangler/baseline/before/` (esto se repite con el build final en la Tarea 19)

### Tarea 17: Enunciar la misma política de color en `tokens.css` y en `DESIGN.md`

- **Archivos**: `src/styles/tokens.css`, `DESIGN.md`
- **Qué hacer**: reemplazar la regla de la cabecera de `tokens.css` («nunca usar colores hardcodeados…») y la regla «Don't» de `DESIGN.md` por el mismo enunciado: colores de marca, semánticos y pares validados solo vía tokens; ningún literal nuevo fuera de `tokens.css` salvo en las plantillas de correo; los literales existentes son legado tolerado que no se migra. Mantener la sección «Excepción: plantillas de correo». Verificar que la tabla de pares validados de `DESIGN.md` coincide con los ratios medidos y que ningún texto describe como apto para texto normal un color cuyo par no alcanza 4.5:1; mantener la declaración de excepciones vigentes al anillo de foco por contexto. Quitar de `DESIGN.md` toda mención a los tokens retirados si la hubiera.
- **Criterio de completado**: ambos archivos contienen el mismo enunciado de la política; la excepción de correos sigue declarada; los ratios de la tabla coinciden con el recálculo WCAG sobre los hex de `tokens.css` (anotar el método usado); `DESIGN.md` y `tokens.css` en español sin historia del cambio.
- **Requiere**: Tarea 16.

- [ ] Reescribir la cabecera de `tokens.css`
- [ ] Reescribir la regla «Don't» de colores en `DESIGN.md` con el mismo enunciado
- [ ] Recalcular los ratios de la tabla «Pares de contraste validados» y corregir los que difieran
- [ ] Revisar las líneas «no apto para texto normal» (primary-400, neutral-500, error, info, brand) y la sección «Focus ring»

### Tarea 18: Verificar las declaraciones de sucesión de las specs previas

- **Archivos**: `memory/specs/sections/cta-styles.md`, `hero-styles.md`, `services-styles.md`, `why-styles.md`, `industries-styles.md`, `memory/specs/components/navbar-styles.md`, `footer-styles.md`, `memory/specs/tokens/create-functional-tokens.md`, `memory/specs/ui-contrast/contrast-token-single-source.md` (rutas bajo `{WORKTREE}/memory/`)
- **Qué hacer**: confirmar que el frontmatter de cada una declara `superseded_by` hacia `[[color-token-policy]]` (el resumen de contexto extendido ya las lista como superseded); corregir solo si alguna falta. No editar su Purpose ni sus criterios.
- **Criterio de completado**: las nueve specs apuntan a `color-token-policy` como sucesora.
- **Requiere**: ninguna.

- [ ] Leer el frontmatter de las nueve specs
- [ ] Completar `superseded_by` donde falte

### Tarea 19: Construir y comparar `dist/client` contra la línea base

- **Archivos**: `{WORKTREE}/log-atm-web-astro/.wrangler/baseline/after/` (gitignored)
- **Qué hacer**: construir el árbol final, ejecutar `extract-site-signals.mjs` de la Tarea 1 sobre `dist/client` y diffear `before/` contra `after/`. Cubre el diff de texto visible, meta y JSON-LD de [[copy-single-source]], las señales SEO de [[canonical-host-www]], las etiquetas de [[quote-extras-and-origin-options]] y el CSS de [[color-token-policy]].
- **Criterio de completado**: las únicas diferencias son las declaradas en la propuesta: (a) «Última milla» ausente en los tres idiomas; (b) «Other»/«Outro» en `/en/cotizar/` y `/pt/cotizar/`; (c) host `www` en canonical, hreflang, `og:url`, `og:image`, sitemap, robots y JSON-LD; (d) `slogan` del JSON-LD localizado en `/en` y `/pt`; (e) en el CSS, solo las declaraciones eliminadas de `--opacity-*` y `--color-whatsapp-hover-dark`. Cero apariciones de `https://logatm.com` (sin `www`) en HTML, sitemap y robots; `manifest.json` sin cambios; teléfono y email sin cambios en todas las páginas.
- **Requiere**: Tareas 1 a 18.

- [ ] Ejecutar `npm run build` y confirmar éxito
- [ ] Ejecutar el script de extracción con salida en `.wrangler/baseline/after/`
- [ ] Diffear `before/` y `after/` página por página y clasificar cada diferencia contra la lista (a) a (e)
- [ ] Diffear los CSS de `dist/client/_astro/` contra `before/`
- [ ] Buscar `https://logatm.com` (sin `www`) con `/usr/bin/grep` dentro de `bash -c` sobre `dist/client` (el `grep` de zsh puede ignorar `dist/`)
- [ ] Confirmar que `public/manifest.json` y el email `contacto@logatm.com` no cambiaron (`git -C {WORKTREE} diff --stat`)
- [ ] Si hay diferencias fuera de la lista, corregir el código; no ampliar la lista

### Tarea 20: Ejecutar los checks del repo y la auditoría a11y

- **Archivos**: ninguno
- **Qué hacer**: correr las verificaciones del repo sobre el estado final. Referencia de ejecución (Chrome de `log-atm-web-astro/chrome/`, `CHROME_PATH`, quirk de `astro preview` que responde 500 tras cada build, `npm run a11y` levanta su propio preview, grep sobre `dist/`): `/home/kapridoo/projects/log-atm-web-astro/.sdd/briefs/auditoria-2026-10/00-contexto-operativo.md`.
- **Criterio de completado**: `npm run check` y `npm run validate-i18n` terminan en 0; `npm run check-i18n-links` sin hallazgos nuevos; `npm run measure:images` sin variación frente al commit base (el cambio no toca imágenes); `npm run a11y` no añade violaciones respecto del commit base (el exit 1 por `label-content-name-mismatch` es deuda conocida del contexto operativo, no regresión); ningún servidor queda levantado.
- **Requiere**: Tarea 19.

- [ ] Ejecutar `npm run check` y `npm run validate-i18n`
- [ ] Ejecutar `npm run check-i18n-links`
- [ ] Ejecutar `npm run measure:images` y comparar con el valor del commit base
- [ ] Ejecutar `npm run a11y` con `CHROME_PATH` apuntando al Chrome local y comparar sus violaciones con las conocidas
- [ ] Repetir `/en/no-existe` y `/pt/no-existe` en `astro preview` solo si `package.json` cambió (no debería); bajar el servidor
- [ ] Anotar en `memory/observations.md` los residuales que no se corrijan
