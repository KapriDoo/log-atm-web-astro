---
verdict: PASS
---

# Verify Report: fix-a11y-and-icons

**Fecha**: 2026-10-02

## Alcance y método

Cambio `apply-only` sin specs en `spec_refs`: no hay Scenarios de spec ni coherencia de grafo que validar; los criterios son los cinco del despacho. Cada uno se verificó con evidencia propia sobre HEAD del worktree (build de `dist/` ignorado por git; `astro preview` en el puerto 4399, detenido al terminar; Chrome real bajo `CHROME_PATH`; `puppeteer-core` y `axe-core` instalados en el directorio de temporales, fuera del repo). `scripts/axe-audit.mjs` no se usó ni se tocó. El proyecto no declara suite de tests ni corrida completa (el bloque `verify-report.32` muestra que `package.json` no define `test`, `lint` ni `typecheck`), por lo que la verificación es la de los criterios: build, navegador y archivos.

## Criterios de aceptación

| # | Criterio | Estado | Evidencia |
|---|----------|--------|-----------|
| 1 | Selector sin `listbox`/`option`/`aria-selected`; activo con `aria-current="page"`; teclado completo | Cumplido | `verify-report.1` (grep sin coincidencias), `verify-report.2` (atributos del disclosure), `verify-report.20`, `.21`, `.22` (es/en/pt) |
| 2 | axe en Chrome real acotado al selector sin violaciones, ratios >= 4.5:1 por estado, solo tokens existentes y solo `<style>` | Cumplido | `verify-report.14`, `.16`, `.18` (desktop); `.25`, `.26`, `.27` (drawer móvil); `verify-report.5`, `.28`, `.29`, `.30` (diff) |
| 3 | Wizard con scroll instantáneo bajo `reduce` y suave sin la preferencia | Cumplido | `verify-report.23` y `verify-report.24` |
| 4 | `GET /apple-touch-icon.png` 200, PNG 180x180 generado por `npm run favicons` | Cumplido | `verify-report.13`, `.10`, `.11`, `.12`, `.8`, `.9` |
| 5 | `npm run build` sin errores | Cumplido | `verify-report.6` |

### 1. Disclosure y teclado

- `verify-report.1`: el patrón `role="(listbox|option)"|aria-selected|aria-haspopup` no coincide en `LanguageSelector.astro` (exit 1 de `grep`). `verify-report.2` muestra `aria-expanded`, `aria-controls="lang-menu"`, el `id="lang-menu"` de la lista y `aria-current` en los enlaces.
- `verify-report.20`, `.21` y `.22` (idiomas `es`, `en`, `pt`) muestran en Chrome real: ningún rol/atributo de listbox en el DOM; el idioma activo, y solo ese, lleva `aria-current="page"` en desktop y en la lista móvil; Tab llega al trigger; Enter y Espacio abren (`aria-expanded=true`, lista visible); Tab recorre los tres enlaces en orden; Escape cierra y deja el foco en `button#lang-trigger`; Enter sobre un enlace navega a la ruta del otro idioma.

### 2. axe y contraste

- Cada bloque de auditoría (`verify-report.14`, `.16`, `.18` desktop; `.25`, `.26`, `.27` drawer móvil) corre `axe.run` con `include` limitado al selector, con todas las reglas activas, en el estado base, con hover y con foco por teclado: 0 violaciones en cada corrida, `color-contrast` evaluado sobre todos los nodos de texto del selector y sin resultados `incomplete`.
- Los mismos bloques miden, con el color computado y el fondo compuesto por ancestros, cada estado pedido: opción activa, hover, foco visible, trigger expandido (desktop) y encabezado del drawer (móvil). Todas las filas son `OK` (>= 4.5:1). El valor más bajo es el código de idioma no activo sobre fondo hover/foco (`--color-text-muted` sobre `--color-primary-50`), con margen sobre el umbral; la opción activa, el trigger expandido y el hover usan `--color-brand-dark`; el encabezado móvil usa `--color-text-muted`.
- Alcance del diff: `verify-report.28` muestra que el commit de contraste toca un solo archivo; `verify-report.29` ubica el bloque `<style>` de ese archivo entre sus líneas de apertura y cierre, y los hunks de `verify-report.5` (cambios de `var(--color-...)`) caen dentro; `verify-report.30` cuenta cero líneas añadidas con literales hex (el exit 1 es el de `grep -c` sin coincidencias). Solo se usan los tokens existentes `--color-brand-dark` y `--color-text-muted`.
- Las primeras corridas móviles se descartaron y se repitieron tras corregir el harness: su paso de foco no llegaba al selector por el orden de Tab del drawer (cierre y enlaces de navegación primero). Los bloques vigentes son `.25`, `.26` y `.27`.

### 3. Scroll del wizard

`verify-report.23` (`reduce`): `scrollIntoView` se invoca con `behavior: "auto"` y el muestreo de `scrollY` por `requestAnimationFrame` durante la transición registra un único valor. `verify-report.24` (sin preferencia): se invoca con `behavior: "smooth"` y el muestreo registra una secuencia de valores intermedios. El envío se simuló interceptando `POST /api/cotizacion` en el navegador (el éxito del wizard se alcanza solo con respuesta del servidor).

### 4. apple-touch-icon

`verify-report.13`: la petición a `/apple-touch-icon.png` responde 200 con `image/png`. `verify-report.10`: `file` identifica el archivo versionado como PNG 180x180. `verify-report.8` (regenerado con `npm run favicons` en una copia aislada de HEAD, sin escribir en el repo), `verify-report.9` (archivo versionado) y `verify-report.11` (bytes servidos por preview) muestran el mismo sha256: el PNG versionado es la salida del script y es lo que sirve el sitio. `verify-report.12` confirma el tipo de lo servido. `verify-report.4` lista `public/apple-touch-icon.png` y `scripts/generate-favicons.mjs` en el diff del cambio.

### 5. Build

`verify-report.6`: `npm run build` termina con exit 0, valida la paridad i18n y prerrenderiza las rutas.

## Hallazgos de Seguridad (si aplica)

Dominio `fix`: no aplica análisis de seguridad. Sin hallazgos de seguridad.

## Comprobaciones

- `verify-report.33`: `comprobar` sobre `apply-evidence.md` lista `apply-evidence.12` en `no_calzan` (causa `distinto`). Es la captura "antes" de T5 (colores `--color-brand`/`--color-neutral-500` previos al commit de contraste), obsoleta por diseño: la vigente es `verify-report.5`. Hallazgo informativo, sin acción. Que los demás bloques de `apply-evidence.md` calcen no cumple ningún criterio; todos se verificaron con evidencia propia arriba.
- `verify-report.34`: `comprobar` sobre este informe, sin `no_calzan` ni `error`; los bloques `.6`, `.23` y `.24` van marcados no re-comprobables con su motivo y `.33` por la regla de la fase.

## Observaciones (no bloqueantes)

- `wizard.ts` reutiliza `prefersReducedMotion` de `scroll-animations.ts`, que se evalúa una vez al cargar el módulo: un cambio de la preferencia con la página abierta no se refleja hasta recargar. Es el patrón vigente en el resto de los scripts del proyecto.
- El contraste fuera del selector (mismos pares de color en otros componentes) queda fuera de alcance y no se evaluó.

## Acciones Requeridas

Ninguna. Listo para `sdd-archive`.



<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["grep","-nE","role=\"(listbox|option)\"|aria-selected|aria-haspopup","src/components/ui/LanguageSelector.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:58:50-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.1`** · exit 1 · 0 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:58:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
grep -nE 'role="(listbox|option)"|aria-selected|aria-haspopup' src/components/ui/LanguageSelector.astro
```

```text
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["grep","-nE","aria-current|aria-expanded|aria-controls|id=\"lang-menu\"","src/components/ui/LanguageSelector.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:58:50-03:00","exit":0,"sha256":"b891a53fa31b57fdade58896a73b87c27bc12823d80f39a7d9ef6a84c74fa0b6","lineas":16,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 16 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:58:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
grep -nE 'aria-current|aria-expanded|aria-controls|id="lang-menu"' src/components/ui/LanguageSelector.astro
```

```text
4: * - Variante 'desktop': patrón disclosure — botón con `aria-expanded` y `aria-controls`
8: * - En ambas, el idioma activo lleva `aria-current="page"`.
37:            aria-current={lang === currentLang ? 'page' : undefined}
52:      aria-expanded="false"
53:      aria-controls="lang-menu"
65:    <ul class="lang-selector__listbox" id="lang-menu">
72:            aria-current={lang === currentLang ? 'page' : undefined}
104:  .lang-selector--desktop .lang-selector__trigger[aria-expanded="true"] {
109:  .lang-selector--desktop .lang-selector__trigger[aria-expanded="true"] .lang-selector__chevron {
215:        trigger.setAttribute('aria-expanded', 'true');
233:          trigger.setAttribute('aria-expanded', 'false');
239:          trigger.setAttribute('aria-expanded', 'false');
250:            trigger.setAttribute('aria-expanded', 'false');
258:        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
273:        if (!root.contains(e.target as Node) && trigger.getAttribute('aria-expanded') === 'true') {
280:        if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["grep","-n","scrollIntoView\\|prefersReducedMotion","src/scripts/wizard.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:58:50-03:00","exit":0,"sha256":"fa1fb171ad2117146a9e02008f2ac9822a4e5c6c88ddb94664f3f69d65e13a9e","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.3`** · exit 0 · 2 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:58:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
grep -n 'scrollIntoView\|prefersReducedMotion' src/scripts/wizard.ts
```

```text
17:import { prefersReducedMotion } from './scroll-animations';
426:    success?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["git","-C","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","diff","--stat","main..HEAD","--","log-atm-web-astro/src","log-atm-web-astro/scripts","log-atm-web-astro/public"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:58:50-03:00","exit":0,"sha256":"100221aaf4f3111e69c8e842adfa23b34dcac06c7346028a33bdb7f9dd2e5898","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 6 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:58:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons diff --stat main..HEAD -- log-atm-web-astro/src log-atm-web-astro/scripts log-atm-web-astro/public
```

```text
 log-atm-web-astro/public/apple-touch-icon.png      | Bin 0 -> 8973 bytes
 log-atm-web-astro/scripts/generate-favicons.mjs    |  12 ++++++++-
 .../src/components/ui/LanguageSelector.astro       |  30 ++++++++++++---------
 log-atm-web-astro/src/scripts/scroll-animations.ts |  16 ++++++-----
 log-atm-web-astro/src/scripts/wizard.ts            |   4 ++-
 5 files changed, 40 insertions(+), 22 deletions(-)
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["git","-C","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","diff","-U0","8d3d413~1","8d3d413","--","log-atm-web-astro/src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:58:51-03:00","exit":0,"sha256":"e91256c6303e8df5870a6a92e5ff4357f7e8551f65121a5abef02b34fb3130d8","lineas":21,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.5`** · exit 0 · 21 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:58:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons diff -U0 '8d3d413~1' 8d3d413 -- log-atm-web-astro/src
```

```text
diff --git a/log-atm-web-astro/src/components/ui/LanguageSelector.astro b/log-atm-web-astro/src/components/ui/LanguageSelector.astro
index b7e2d65..4a3ccd8 100644
--- a/log-atm-web-astro/src/components/ui/LanguageSelector.astro
+++ b/log-atm-web-astro/src/components/ui/LanguageSelector.astro
@@ -105,2 +105,2 @@ const isMobile = variant === 'mobile';
-    border-color: var(--color-brand);
-    color: var(--color-brand);
+    border-color: var(--color-brand-dark);
+    color: var(--color-brand-dark);
@@ -147 +147 @@ const isMobile = variant === 'mobile';
-    color: var(--color-brand);
+    color: var(--color-brand-dark);
@@ -152 +152 @@ const isMobile = variant === 'mobile';
-    color: var(--color-brand);
+    color: var(--color-brand-dark);
@@ -163 +163 @@ const isMobile = variant === 'mobile';
-  .lang-selector__option.is-active .lang-selector__code { color: var(--color-brand); }
+  .lang-selector__option.is-active .lang-selector__code { color: var(--color-brand-dark); }
@@ -175 +175 @@ const isMobile = variant === 'mobile';
-    color: var(--color-neutral-500);
+    color: var(--color-text-muted);
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:59:03-03:00","exit":0,"sha256":"c6073fcdf5ac307fdf5068993c9f3e82c869c0101330194eef49b6ab78e0d3f7","lineas":152,"omitidas":112,"no_recomprobable":"salida con tiempos de build, no estable entre corridas; escribe dist/ (ignorado por git)"} -->
**Evidencia `verify-report.6`** · exit 0 · 152 líneas, 112 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:59:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`
No re-comprobable: salida con tiempos de build, no estable entre corridas; escribe dist/ (ignorado por git)

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

20:58:56 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
20:58:56 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
20:58:56 [vite] Re-optimizing dependencies because vite config has changed
20:58:57 [vite] ✨ new dependencies optimized: @astrojs/cloudflare/entrypoints/server
20:58:57 [vite] ✨ optimized dependencies changed. reloading
20:58:57 [vite] [vite] program reload
20:58:58 [vite] Re-optimizing dependencies because vite config has changed
20:58:58 [vite] Re-optimizing dependencies because vite config has changed
20:58:58 [types] Generated 1.98s
20:58:58 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
20:58:59 [build] output: "static"
20:58:59 [build] mode: "server"
20:58:59 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro/dist/
20:58:59 [build] adapter: @astrojs/cloudflare
20:58:59 [build] Collecting build info...
20:58:59 [build] ✓ Completed in 2.44s.
20:58:59 [build] Building server entrypoints...
20:59:01 [vite] ✓ built in 2.29s
20:59:02 [vite] ✓ built in 835ms
20:59:03 [vite] ✓ built in 738ms

 prerendering static routes 
20:59:03   ├─ /404.html (+20ms) 
20:59:03   ├─ /contacto/index.html (+11ms) 
20:59:03   ├─ /cotizar/index.html (+11ms) 
20:59:03   ├─ /industrias/index.html (+18ms) 
20:59:03   ├─ /nosotros/index.html (+12ms) 
20:59:03   ├─ /servicios/index.html (+15ms) 
20:59:03   ├─ /en/404/index.html (+9ms) 
20:59:03   ├─ /pt/404/index.html (+10ms) 
20:59:03   ├─ /en/contacto/index.html (+9ms) 
20:59:03   ├─ /pt/contacto/index.html (+8ms) 
20:59:03   ├─ /en/cotizar/index.html (+8ms) 
20:59:03   ├─ /pt/cotizar/index.html (+8ms) 
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"argv","argv":["sha256sum","public/apple-touch-icon.png"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/iso.pbfgMhJs/log-atm-web-astro","head":null,"fecha":"2026-10-02T20:59:20-03:00","exit":0,"sha256":"75bae2e81c1aef9ee6a51f9ea657ffb765c9fb290d9eecb2a19da9430565492e","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.8`** · exit 0 · 1 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:59:20-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/iso.pbfgMhJs/log-atm-web-astro`

```text
sha256sum public/apple-touch-icon.png
```

```text
014452327f15543d0834b4418c04005f3b04f4f42b976feca0362d815c8bb6d6  public/apple-touch-icon.png
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"argv","argv":["sha256sum","public/apple-touch-icon.png"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:59:20-03:00","exit":0,"sha256":"75bae2e81c1aef9ee6a51f9ea657ffb765c9fb290d9eecb2a19da9430565492e","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.9`** · exit 0 · 1 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:59:20-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
sha256sum public/apple-touch-icon.png
```

```text
014452327f15543d0834b4418c04005f3b04f4f42b976feca0362d815c8bb6d6  public/apple-touch-icon.png
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"argv","argv":["file","public/apple-touch-icon.png"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:59:20-03:00","exit":0,"sha256":"1d3d2352562391666418f75f7bd74aa9f73718164c2485b3e2c5f286f61fc8b7","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.10`** · exit 0 · 1 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:59:20-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
file public/apple-touch-icon.png
```

```text
public/apple-touch-icon.png: PNG image data, 180 x 180, 8-bit/color RGB, non-interlaced
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"argv","argv":["sha256sum","apple.png"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb","head":null,"fecha":"2026-10-02T20:59:20-03:00","exit":0,"sha256":"c355683237f075cb4f5c6b27ed754ce946d8acbecfe25a38cca0c5e7ceff86d6","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.11`** · exit 0 · 1 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:59:20-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb`

```text
sha256sum apple.png
```

```text
014452327f15543d0834b4418c04005f3b04f4f42b976feca0362d815c8bb6d6  apple.png
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"argv","argv":["file","apple.png"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb","head":null,"fecha":"2026-10-02T20:59:20-03:00","exit":0,"sha256":"7b64f5caa11d6b7afa30a5ad6401d75f46c74f3a88ce433234457f2a1f5ed1f7","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.12`** · exit 0 · 1 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:59:20-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb`

```text
file apple.png
```

```text
apple.png: PNG image data, 180 x 180, 8-bit/color RGB, non-interlaced
```
<!-- evidencia:fin verify-report.12 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"argv","argv":["curl","-s","-o","/dev/null","-w","%{http_code} %{content_type} %{size_download}\\n","http://127.0.0.1:4399/apple-touch-icon.png"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T20:59:33-03:00","exit":0,"sha256":"4f773fa9a49b7e94c7ddc24f0285527c9c016eab683bb8867888dcc00efffcac","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.13`** · exit 0 · 1 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T20:59:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
curl -s -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' http://127.0.0.1:4399/apple-touch-icon.png
```

```text
200 image/png 8973
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"argv","argv":["node","check.mjs","audit","es","desktop"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:01:26-03:00","exit":0,"sha256":"4ebe9e09f36265b78f342973f8dc980aa0e1aba521a68f72571a51502c4421e3","lineas":25,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.14`** · exit 0 · 25 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:01:26-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs audit es desktop
```

```text
# es desktop
trigger reposo                     fg=#544f4a bg=#f8f7f6 ratio=7.57 OK
trigger hover                      fg=#2b4e78 bg=#f8f7f6 ratio=7.97 OK
trigger expandido                  fg=#2b4e78 bg=#f8f7f6 ratio=7.97 OK
axe[estado base (menu abierto)] violaciones=0 color-contrast(pass=7 incomplete=0)
es activa reposo nombre            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es activa reposo codigo            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
en reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
pt reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
pt reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
es activa hover nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es activa hover codigo             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
pt hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
axe[hover en] violaciones=0 color-contrast(pass=7 incomplete=0)
es activa foco-visible nombre      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es activa foco-visible codigo      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
axe[foco en] violaciones=0 color-contrast(pass=7 incomplete=0)
pt foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"argv","argv":["node","check.mjs","audit","en","desktop"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:01:41-03:00","exit":0,"sha256":"e31c56a1bb4f670346347efc3adbb6d918c4a22af1b879218cfcb0f1a234414b","lineas":25,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.16`** · exit 0 · 25 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:01:41-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs audit en desktop
```

```text
# en desktop
trigger reposo                     fg=#544f4a bg=#f8f7f6 ratio=7.57 OK
trigger hover                      fg=#2b4e78 bg=#f8f7f6 ratio=7.97 OK
trigger expandido                  fg=#2b4e78 bg=#f8f7f6 ratio=7.97 OK
axe[estado base (menu abierto)] violaciones=0 color-contrast(pass=7 incomplete=0)
es reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
es reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
en activa reposo nombre            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en activa reposo codigo            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
pt reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
es hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
en activa hover nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en activa hover codigo             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
axe[hover es] violaciones=0 color-contrast(pass=7 incomplete=0)
es foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
en activa foco-visible nombre      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en activa foco-visible codigo      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
axe[foco en] violaciones=0 color-contrast(pass=7 incomplete=0)
pt foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
```
<!-- evidencia:fin verify-report.16 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"argv","argv":["node","check.mjs","audit","pt","desktop"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:01:57-03:00","exit":0,"sha256":"cf418588d410635a1394388b309550beeb7109ea020b6aa3415c1d16f7855798","lineas":25,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.18`** · exit 0 · 25 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:01:57-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs audit pt desktop
```

```text
# pt desktop
trigger reposo                     fg=#544f4a bg=#f8f7f6 ratio=7.57 OK
trigger hover                      fg=#2b4e78 bg=#f8f7f6 ratio=7.97 OK
trigger expandido                  fg=#2b4e78 bg=#f8f7f6 ratio=7.97 OK
axe[estado base (menu abierto)] violaciones=0 color-contrast(pass=7 incomplete=0)
es reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
es reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
en reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
en reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
pt activa reposo nombre            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt activa reposo codigo            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
en hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
pt activa hover nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt activa hover codigo             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
axe[hover es] violaciones=0 color-contrast(pass=7 incomplete=0)
es foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
en foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
axe[foco en] violaciones=0 color-contrast(pass=7 incomplete=0)
pt activa foco-visible nombre      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt activa foco-visible codigo      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.20","forma":"argv","argv":["node","check.mjs","keyboard","es"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:02:08-03:00","exit":0,"sha256":"06d4a37cdf408a7c315e0b0d616d7f34b2de385819c630e1251944b07f57ca62","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.20`** · exit 0 · 11 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:02:08-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs keyboard es
```

```text
roles listbox/option/aria-selected en el selector: 0
aria-current de los enlaces (desktop): es=page en=null pt=null
aria-current de los enlaces (mobile): es=page en=null pt=null
trigger: aria-expanded=false aria-controls=lang-menu lista-existe=true
Tab llega al trigger en 7 pulsaciones; foco=button#lang-trigger
Enter abre: aria-expanded=true lista visible=visible
Tab recorre enlaces: a[hreflang=es] -> a[hreflang=en] -> a[hreflang=pt]
Escape: aria-expanded=false lista=hidden foco=button#lang-trigger
Espacio abre: aria-expanded=true
Tab hasta enlace en en 2 pulsaciones; foco=a[hreflang=en]
Enter navega a: /en/
```
<!-- evidencia:fin verify-report.20 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"argv","argv":["node","check.mjs","keyboard","en"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:02:12-03:00","exit":0,"sha256":"60111f9a6baad994175162e4270d954d94a4c71149d1cca36c00d14694a62855","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.21`** · exit 0 · 11 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:02:12-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs keyboard en
```

```text
roles listbox/option/aria-selected en el selector: 0
aria-current de los enlaces (desktop): es=null en=page pt=null
aria-current de los enlaces (mobile): es=null en=page pt=null
trigger: aria-expanded=false aria-controls=lang-menu lista-existe=true
Tab llega al trigger en 7 pulsaciones; foco=button#lang-trigger
Enter abre: aria-expanded=true lista visible=visible
Tab recorre enlaces: a[hreflang=es] -> a[hreflang=en] -> a[hreflang=pt]
Escape: aria-expanded=false lista=hidden foco=button#lang-trigger
Espacio abre: aria-expanded=true
Tab hasta enlace pt en 3 pulsaciones; foco=a[hreflang=pt]
Enter navega a: /pt/
```
<!-- evidencia:fin verify-report.21 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"argv","argv":["node","check.mjs","keyboard","pt"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:02:16-03:00","exit":0,"sha256":"3d1aa0b46a08f75c6af8dab0260e22a42936b3c2650974eb94c0c12af31f7a06","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.22`** · exit 0 · 11 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:02:16-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs keyboard pt
```

```text
roles listbox/option/aria-selected en el selector: 0
aria-current de los enlaces (desktop): es=null en=null pt=page
aria-current de los enlaces (mobile): es=null en=null pt=page
trigger: aria-expanded=false aria-controls=lang-menu lista-existe=true
Tab llega al trigger en 7 pulsaciones; foco=button#lang-trigger
Enter abre: aria-expanded=true lista visible=visible
Tab recorre enlaces: a[hreflang=es] -> a[hreflang=en] -> a[hreflang=pt]
Escape: aria-expanded=false lista=hidden foco=button#lang-trigger
Espacio abre: aria-expanded=true
Tab hasta enlace en en 2 pulsaciones; foco=a[hreflang=en]
Enter navega a: /en/
```
<!-- evidencia:fin verify-report.22 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.23","forma":"argv","argv":["node","check.mjs","wizard","es","reduce"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:02:21-03:00","exit":0,"sha256":"7861fd27f5eaaed8f87e2f3567292a7cf67fb319047312cda2386f69885b6670","lineas":4,"omitidas":0,"no_recomprobable":"la corrida depende de la temporización del scroll y requiere preview y Chrome vivos"} -->
**Evidencia `verify-report.23`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:02:21-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`
No re-comprobable: la corrida depende de la temporización del scroll y requiere preview y Chrome vivos

```text
node check.mjs wizard es reduce
```

```text
prefers-reduced-motion=reduce matchMedia=true
scrollIntoView llamadas=[{"id":"quote-success","arg":"{\"behavior\":\"auto\",\"block\":\"start\"}"}]
success visible=true folio=Folio · LOG-TEST-0001
scrollY: muestras=55 valores distintos=1 -> 376
```
<!-- evidencia:fin verify-report.23 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.24","forma":"argv","argv":["node","check.mjs","wizard","es","no-preference"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:02:26-03:00","exit":0,"sha256":"a35f83ec52e33bdcf4f587e1088efa5e8bd585213338120d4808d59b0238c4e6","lineas":4,"omitidas":0,"no_recomprobable":"la corrida depende de la temporización del scroll y requiere preview y Chrome vivos"} -->
**Evidencia `verify-report.24`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:02:26-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`
No re-comprobable: la corrida depende de la temporización del scroll y requiere preview y Chrome vivos

```text
node check.mjs wizard es no-preference
```

```text
prefers-reduced-motion=no-preference matchMedia=false
scrollIntoView llamadas=[{"id":"quote-success","arg":"{\"behavior\":\"smooth\",\"block\":\"start\"}"}]
success visible=true folio=Folio · LOG-TEST-0001
scrollY: muestras=55 valores distintos=20 -> 771,769,759,737,689,608,542,499,469,447,430,416
```
<!-- evidencia:fin verify-report.24 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.25","forma":"argv","argv":["node","check.mjs","audit","es","mobile"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:03:04-03:00","exit":0,"sha256":"6f3055e9027472d537458fa431fcbc3de87f83e071d46ece2eba1aa8ab2150fd","lineas":23,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.25`** · exit 0 · 23 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:03:04-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs audit es mobile
```

```text
# es mobile
heading                            fg=#6e6963 bg=#ffffff ratio=5.44 OK
axe[estado base] violaciones=0 color-contrast(pass=7 incomplete=0)
es activa reposo nombre            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es activa reposo codigo            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
en reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
pt reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
pt reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
es activa hover nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es activa hover codigo             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
pt hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
axe[hover en] violaciones=0 color-contrast(pass=7 incomplete=0)
es activa foco-visible nombre      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es activa foco-visible codigo      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
axe[foco en] violaciones=0 color-contrast(pass=7 incomplete=0)
pt foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
```
<!-- evidencia:fin verify-report.25 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.26","forma":"argv","argv":["node","check.mjs","audit","en","mobile"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:03:13-03:00","exit":0,"sha256":"73f9c4d1b8a3f7132367ea531e87aa0ffe3bf6facdd7cf1bdf5ad84946f3250f","lineas":23,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.26`** · exit 0 · 23 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:03:13-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs audit en mobile
```

```text
# en mobile
heading                            fg=#6e6963 bg=#ffffff ratio=5.44 OK
axe[estado base] violaciones=0 color-contrast(pass=7 incomplete=0)
es reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
es reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
en activa reposo nombre            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en activa reposo codigo            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
pt reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
es hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
en activa hover nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en activa hover codigo             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
axe[hover es] violaciones=0 color-contrast(pass=7 incomplete=0)
es foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
en activa foco-visible nombre      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en activa foco-visible codigo      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
axe[foco en] violaciones=0 color-contrast(pass=7 incomplete=0)
pt foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
```
<!-- evidencia:fin verify-report.26 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.27","forma":"argv","argv":["node","check.mjs","audit","pt","mobile"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools","head":null,"fecha":"2026-10-02T21:03:21-03:00","exit":0,"sha256":"3f229f122990a7c4ede9d8cb31bf5b87810b69a43a6b86733de5d33620482480","lineas":23,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.27`** · exit 0 · 23 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T21:03:21-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/tools`

```text
node check.mjs audit pt mobile
```

```text
# pt mobile
heading                            fg=#6e6963 bg=#ffffff ratio=5.44 OK
axe[estado base] violaciones=0 color-contrast(pass=7 incomplete=0)
es reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
es reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
en reposo nombre                   fg=#544f4a bg=#ffffff ratio=8.09 OK
en reposo codigo                   fg=#6e6963 bg=#ffffff ratio=5.44 OK
pt activa reposo nombre            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt activa reposo codigo            fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
en hover nombre                    fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en hover codigo                    fg=#6e6963 bg=#eef4fb ratio=4.91 OK
pt activa hover nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt activa hover codigo             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
axe[hover es] violaciones=0 color-contrast(pass=7 incomplete=0)
es foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
es foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
en foco-visible nombre             fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
en foco-visible codigo             fg=#6e6963 bg=#eef4fb ratio=4.91 OK
axe[foco en] violaciones=0 color-contrast(pass=7 incomplete=0)
pt activa foco-visible nombre      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
pt activa foco-visible codigo      fg=#2b4e78 bg=#eef4fb ratio=7.7 OK
```
<!-- evidencia:fin verify-report.27 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.28","forma":"argv","argv":["git","-C","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","show","--stat","--format=%h:%s","8d3d413"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T21:03:32-03:00","exit":0,"sha256":"09448d7537376e6e51d41c75316536be744136b98f2007b0aca9c544a449eeeb","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.28`** · exit 0 · 4 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T21:03:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons show --stat --format=%h:%s 8d3d413
```

```text
8d3d413:fix(a11y): raise language selector text contrast to WCAG AA

 log-atm-web-astro/src/components/ui/LanguageSelector.astro | 12 ++++++------
 1 file changed, 6 insertions(+), 6 deletions(-)
```
<!-- evidencia:fin verify-report.28 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.29","forma":"argv","argv":["grep","-nE","^\\s*</?style\u003e","src/components/ui/LanguageSelector.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T21:03:32-03:00","exit":0,"sha256":"7e5836c654e1c4a6cf7d7b8f50230840e9cfbea185948f2f31c9926006409ad1","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.29`** · exit 0 · 2 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T21:03:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
grep -nE '^\s*</?style>' src/components/ui/LanguageSelector.astro
```

```text
84:<style>
187:</style>
```
<!-- evidencia:fin verify-report.29 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.30","forma":"argv","argv":["/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/hexcheck.sh"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T21:03:32-03:00","exit":1,"sha256":"9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.30`** · exit 1 · 1 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T21:03:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-verify-59ew2_nb/hexcheck.sh
```

```text
0
```
<!-- evidencia:fin verify-report.30 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.31","forma":"argv","argv":["git","-C","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","status","--short"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T21:03:32-03:00","exit":0,"sha256":"7b90c181482a274aecd2b3bd2a0743e2f147f15dca735e549df9d3aa7122e3ef","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.31`** · exit 0 · 3 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T21:03:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons status --short
```

```text
 M memory/changes/fix-a11y-and-icons/state.md
 M memory/observations.md
?? memory/changes/fix-a11y-and-icons/verify-report.md
```
<!-- evidencia:fin verify-report.31 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.32","forma":"argv","argv":["grep","-nE","\"(test|lint|typecheck)\"","package.json"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T21:03:42-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.32`** · exit 1 · 0 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T21:03:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
grep -nE '"(test|lint|typecheck)"' package.json
```

```text
```
<!-- evidencia:fin verify-report.32 -->


<!-- evidencia:inicio {"v":1,"id":"verify-report.33","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/memory/changes/fix-a11y-and-icons/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T21:03:57-03:00","exit":1,"sha256":"cc25b0b1ecf9229cc1ecd8559ee7f7550f9b91bddfe55f1beb60bcee74432b87","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria verify-report.md, que a su vez se comprueba una sola vez en el bloque siguiente"} -->
**Evidencia `verify-report.33`** · exit 1 · 1 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T21:03:57-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`
No re-comprobable: re-ejecutarlo comprobaria verify-report.md, que a su vez se comprueba una sola vez en el bloque siguiente

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/memory/changes/fix-a11y-and-icons/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/memory/changes/fix-a11y-and-icons/apply-evidence.md","bloques":21,"comprobados":8,"calzan":["apply-evidence.1","apply-evidence.2","apply-evidence.5","apply-evidence.11","apply-evidence.15","apply-evidence.16","apply-evidence.17"],"no_calzan":[{"id":"apply-evidence.12","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.3","motivo":"corre en una copia aislada de HEAD bajo el directorio de temporales del despacho, que no persiste tras la fase"},{"id":"apply-evidence.4","motivo":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"},{"id":"apply-evidence.6","motivo":"depende del astro preview levantado por la fase sobre la copia aislada"},{"id":"apply-evidence.7","motivo":"depende de la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"},{"id":"apply-evidence.8","motivo":"lee el log de la corrida anterior, en el directorio de temporales del despacho"},{"id":"apply-evidence.9","motivo":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"},{"id":"apply-evidence.10","motivo":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"},{"id":"apply-evidence.13","motivo":"el script vive en el directorio de temporales del despacho; su texto completo est\u00e1 en este bloque"},{"id":"apply-evidence.14","motivo":"corre en una copia aislada de HEAD bajo el directorio de temporales del despacho, que no persiste tras la fase"},{"id":"apply-evidence.18","motivo":"depende del astro preview del build previo a T5, levantado por la fase en el directorio de temporales del despacho; su resultado es el esta…(+584 caracteres)
```
<!-- evidencia:fin verify-report.33 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.34","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/memory/changes/fix-a11y-and-icons/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"1f87c20361d5415c32d3538abd4c8434559aa8fb","fecha":"2026-10-02T21:04:58-03:00","exit":0,"sha256":"734a425c0ce2ba561c5f938106478dcecd16ce73ba2fd2447b744fa804065f5c","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria este informe a si mismo"} -->
**Evidencia `verify-report.34`** · exit 0 · 1 líneas, 0 omitidas · HEAD `1f87c20361d5` · 2026-10-02T21:04:58-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`
No re-comprobable: re-ejecutarlo comprobaria este informe a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/memory/changes/fix-a11y-and-icons/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/memory/changes/fix-a11y-and-icons/verify-report.md","bloques":29,"comprobados":25,"calzan":["verify-report.1","verify-report.2","verify-report.3","verify-report.4","verify-report.5","verify-report.8","verify-report.9","verify-report.10","verify-report.11","verify-report.12","verify-report.13","verify-report.14","verify-report.16","verify-report.18","verify-report.20","verify-report.21","verify-report.22","verify-report.25","verify-report.26","verify-report.27","verify-report.28","verify-report.29","verify-report.30","verify-report.31","verify-report.32"],"no_calzan":[],"omitidos":[{"id":"verify-report.6","motivo":"salida con tiempos de build, no estable entre corridas; escribe dist/ (ignorado por git)"},{"id":"verify-report.23","motivo":"la corrida depende de la temporizaci\u00f3n del scroll y requiere preview y Chrome vivos"},{"id":"verify-report.24","motivo":"la corrida depende de la temporizaci\u00f3n del scroll y requiere preview y Chrome vivos"},{"id":"verify-report.33","motivo":"re-ejecutarlo comprobaria verify-report.md, que a su vez se comprueba una sola vez en el bloque siguiente"}],"error":null}
```
<!-- evidencia:fin verify-report.34 -->
