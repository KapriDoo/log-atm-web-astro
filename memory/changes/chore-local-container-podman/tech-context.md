# Tech context: chore-local-container-podman

Librerías: `playwright-core` 1.63.0 · `axe-core` 4.14.0 · `@astrojs/check` 0.9.10 · `typescript` 6.0.3 (última de la rama 6; `latest` es 7.x)
Fuente: Context7 (`/microsoft/playwright`, `/dequelabs/axe-core`, `/withastro/docs`) + `npm view` para versiones
Fecha de consulta: 2026-10-06

## playwright-core

- Lanzar Chromium con un ejecutable provisto: `chromium.launch({ executablePath })`.
  `playwright-core` no descarga navegadores; sin `executablePath` busca el navegador
  gestionado por Playwright, que este proyecto no instala.
- Contextos: `browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', isMobile, hasTouch })`.
  `isMobile` hace que se respete `<meta name="viewport">` y habilita eventos táctiles.
  `reducedMotion: 'reduce'` emula `prefers-reduced-motion: reduce` para todas las páginas del contexto.
- `page.goto(url, { waitUntil: 'load' })` devuelve la `Response` (o `null`); `response.status()` da el código HTTP.
- `page.addScriptTag({ path })`: inyecta el contenido del archivo como `<script>`; `path`
  relativo se resuelve contra el directorio de trabajo del proceso, por eso se pasa ruta
  absoluta (`createRequire(import.meta.url).resolve('axe-core/axe.min.js')`).
- `page.evaluate(fn, arg)` ejecuta en la página y devuelve el resultado serializable
  (`axe.run` devuelve una promesa que `evaluate` espera).
- Cerrar con `browser.close()`.

## axe-core

- `axe.run(context, options)` devuelve una promesa con `{ violations, passes, incomplete, inapplicable }`.
- `options.runOnly`: `{ type: 'tag', values: ['wcag2a', 'wcag2aa', ...] }` limita las reglas
  por etiqueta. Etiquetas usadas: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`.
- `options.resultTypes: ['violations']` reduce el procesamiento de los demás tipos.
- Cada violación: `id`, `impact` (`minor|moderate|serious|critical`), `help`, `helpUrl`,
  `nodes[]`; cada nodo trae `target` (array de selectores; con iframes/shadow DOM, anidado) y `html`.
- `color-contrast` forma parte de `wcag2aa` y solo es fiable en un navegador que calcula estilos.

## @astrojs/check + typescript

- Desde Astro 3, `astro check` requiere instalar `@astrojs/check` y `typescript` en el proyecto.
- `astro check` verifica todos los archivos incluidos por el `tsconfig.json` (incluidos `.astro`)
  y ejecuta la sincronización de tipos de contenido antes; termina con código distinto de
  cero si hay errores (las advertencias y pistas no fallan).
- `astro build` transpila con esbuild y no verifica tipos; la documentación sugiere
  `astro check && astro build` para bloquear el build, opción que este cambio no adopta (ADR-0011).
- Peer de `@astrojs/check@0.9.10`: `typescript ^5.0.0 || ^6.0.0` → fijar `typescript@^6.0.3`.
