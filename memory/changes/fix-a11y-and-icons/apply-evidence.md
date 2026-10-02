---
type: apply-evidence
change_name: "fix-a11y-and-icons"
created: "2026-10-02"
---

# Apply evidence — fix-a11y-and-icons

Camino `apply-only`, sin specs en `spec_refs`; ninguna tarea está marcada `[TDD]`, por lo que no hay RED/GREEN/mutación. El proyecto no tiene suite de tests automatizada (el perfil no declara filtro de casos ni corrida completa); la verificación es la que pide T4: build, `scripts/axe-audit.mjs` y prueba en Chrome real.

Entorno de verificación: `jsdom`, `axe-core` y `puppeteer-core` no son dependencias del proyecto, así que se instalaron en el directorio de temporales del despacho (`tools.*`), fuera del repo. El build y `astro preview` corren sobre una copia aislada de HEAD (`git archive HEAD | tar -x`, bajo `iso.*` del directorio de temporales, con `node_modules` enlazado al del worktree). Chrome: `/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome` vía `CHROME_PATH`. El harness de navegador es `tools.*/browser-check.mjs` (modos `keyboard`, `axe`, `wizard`).

## T1 — Selector de idioma al patrón disclosure

Commit: `31d21dc` — `fix(a11y): switch language selector to disclosure pattern`.

Se quitaron `aria-haspopup="listbox"`, `role="listbox"`, `role="option"` y `aria-selected`; el trigger conserva `aria-expanded` y suma `aria-controls="lang-menu"`; la lista es un `<ul id="lang-menu">` simple de enlaces y el activo lleva `aria-current="page"` en desktop y en móvil (antes `"true"` en móvil). Escape, click fuera y reduced-motion no se tocaron. El comentario de cabecera ya no menciona `:focus-within` y describe el comportamiento real.

Criterio de grep de la tarea: el bloque siguiente muestra la búsqueda sin coincidencias (exit 1 de `grep` = ninguna línea).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["grep","-nE","role=\"(listbox|option)\"|aria-selected|aria-haspopup=\"listbox\"","src/components/ui/LanguageSelector.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"ba9526b7a183f922fb8fe3fa94a13551f44e9b1f","fecha":"2026-10-02T20:45:29-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.1`** · exit 1 · 0 líneas, 0 omitidas · HEAD `ba9526b7a183` · 2026-10-02T20:45:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
grep -nE 'role="(listbox|option)"|aria-selected|aria-haspopup="listbox"' src/components/ui/LanguageSelector.astro
```

```text
```
<!-- evidencia:fin apply-evidence.1 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"argv","argv":["grep","-nE","aria-current|aria-expanded|aria-controls|id=\"lang-menu\"","src/components/ui/LanguageSelector.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"ba9526b7a183f922fb8fe3fa94a13551f44e9b1f","fecha":"2026-10-02T20:45:29-03:00","exit":0,"sha256":"b891a53fa31b57fdade58896a73b87c27bc12823d80f39a7d9ef6a84c74fa0b6","lineas":16,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.2`** · exit 0 · 16 líneas, 0 omitidas · HEAD `ba9526b7a183` · 2026-10-02T20:45:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

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
<!-- evidencia:fin apply-evidence.2 -->

El bloque 2 muestra el estado ARIA resultante: `aria-current` con valor `page` en ambas variantes (líneas 37 y 72), `aria-expanded` + `aria-controls` en el trigger y el `id` de la lista.

Build (`npm run build`) sobre la copia aislada de HEAD; las líneas finales del bloque siguiente muestran el cierre del build.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"argv","argv":["bash","-c","npm run build 2\u003e&1 | tail -n 12; exit ${PIPESTATUS[0]}"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/iso.HzwD4qSu/log-atm-web-astro","head":null,"fecha":"2026-10-02T20:45:46-03:00","exit":0,"sha256":"126c1f5f5fc1a98e0c72111a719eb8603b36de8607e8f884c85401d4d6e53fc0","lineas":12,"omitidas":0,"no_recomprobable":"corre en una copia aislada de HEAD bajo el directorio de temporales del despacho, que no persiste tras la fase"} -->
**Evidencia `apply-evidence.3`** · exit 0 · 12 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:45:46-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/iso.HzwD4qSu/log-atm-web-astro`
No re-comprobable: corre en una copia aislada de HEAD bajo el directorio de temporales del despacho, que no persiste tras la fase

```text
bash -c 'npm run build 2>&1 | tail -n 12; exit ${PIPESTATUS[0]}'
```

```text
20:45:46   ▶ /_astro/svc-maritima.BKF8Hpyr_11jnSe.webp (reused cache entry) (+0ms) (85/89)
20:45:46   ▶ /_astro/svc-maritima.BKF8Hpyr_1eWode.webp (reused cache entry) (+0ms) (86/89)
20:45:46   ▶ /_astro/svc-maritima.BKF8Hpyr_ZEeQQf.jpeg (reused cache entry) (+0ms) (87/89)
20:45:46   ▶ /_astro/svc-maritima.BKF8Hpyr_Z1uMjq4.jpeg (reused cache entry) (+0ms) (88/89)
20:45:46   ▶ /_astro/svc-maritima.BKF8Hpyr_Z2NbgH.jpeg (reused cache entry) (+0ms) (89/89)
20:45:46 ✓ Completed in 12ms.

20:45:46 [build] Rearranging server assets...
20:45:46 [build] ✓ Completed in 4.86s.
20:45:46 [@astrojs/sitemap] `sitemap-index.xml` created at `dist/client`
20:45:46 [build] Server built in 7.43s
20:45:46 [build] Complete!
```
<!-- evidencia:fin apply-evidence.3 -->

## T2 — Guard de reduced-motion en el scroll del wizard

Commit: `5daab3e` — `fix(a11y): honor prefers-reduced-motion in wizard success scroll`.

`showSuccess()` usa `behavior: prefersReducedMotion ? 'auto' : 'smooth'`, reutilizando el helper exportado por `src/scripts/scroll-animations.ts` (ya importado de la misma forma por `gsap-stepper.ts`, `gsap-counters.ts`, `gsap-ind-directory.ts` y `404.astro`). Es la única llamada a `scrollIntoView` del archivo.

Prueba en Chrome real: el harness recorre el wizard de `/cotizar/` hasta el envío (respuesta de `/api/cotizacion` interceptada con un folio de prueba), con `prefers-reduced-motion` emulado en `reduce` y en `no-preference`, y registra el `behavior` que recibe `scrollIntoView` sobre `#quote-success` y el `scrollY` antes y después de la misma llamada.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","BASE=http://127.0.0.1:4399","node","browser-check.mjs","wizard"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/tools.JnLrFNff","head":null,"fecha":"2026-10-02T20:46:16-03:00","exit":0,"sha256":"88004e2b06c3e41c3a3a67c43816f9a6d08f1a96fdc8d82fc5956fec7243d007","lineas":3,"omitidas":0,"no_recomprobable":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.4`** · exit 0 · 3 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:46:16-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/tools.JnLrFNff`
No re-comprobable: depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome BASE=http://127.0.0.1:4399 node browser-check.mjs wizard
```

```text
PASS wizard reduce=true: behavior 'auto' — behavior=auto scrollY 584→376 en la misma llamada (instantáneo)
PASS wizard reduce=false: behavior 'smooth' — behavior=smooth scrollY 584→584 en la misma llamada (animado)
OK: 0 fallas
```
<!-- evidencia:fin apply-evidence.4 -->

## T3 — apple-touch-icon.png 180×180

Commit: `ba9526b` — `fix(favicons): generate and version 180x180 apple-touch-icon`.

`scripts/generate-favicons.mjs` suma la salida `public/apple-touch-icon.png` desde `public/logo.svg` con `sharp` (`fit: 'contain'` sobre fondo blanco opaco y `flatten`, porque iOS rellena la transparencia con negro); el docstring nombra la nueva salida. `npm run favicons` se ejecutó una vez en el worktree para generar el PNG versionado; `favicon.svg` y `favicon.ico` se regeneraron byte a byte idénticos (no aparecen en el commit). `favicon.ico` no se tocó en el script (YAGNI).

Metadatos del PNG versionado (bloque 5) y respuesta HTTP de `astro preview` (bloque 6):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"argv","argv":["node","-e","require('sharp')('public/apple-touch-icon.png').metadata().then(m=\u003econsole.log(m.format, m.width+'x'+m.height, 'channels='+m.channels, 'hasAlpha='+m.hasAlpha))"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"ba9526b7a183f922fb8fe3fa94a13551f44e9b1f","fecha":"2026-10-02T20:46:24-03:00","exit":0,"sha256":"9662f5a721203683a3f13d18c478b461d59b6f0968377ba60e205593a23e1f38","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.5`** · exit 0 · 1 líneas, 0 omitidas · HEAD `ba9526b7a183` · 2026-10-02T20:46:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
node -e 'require('"'"'sharp'"'"')('"'"'public/apple-touch-icon.png'"'"').metadata().then(m=>console.log(m.format, m.width+'"'"'x'"'"'+m.height, '"'"'channels='"'"'+m.channels, '"'"'hasAlpha='"'"'+m.hasAlpha))'
```

```text
png 180x180 channels=3 hasAlpha=false
```
<!-- evidencia:fin apply-evidence.5 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"argv","argv":["curl","-s","-o","/dev/null","-w","HTTP %{http_code} %{content_type} %{size_download} bytes\\n","http://127.0.0.1:4399/apple-touch-icon.png"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","head":"ba9526b7a183f922fb8fe3fa94a13551f44e9b1f","fecha":"2026-10-02T20:46:24-03:00","exit":0,"sha256":"131cc8b915bf2e2522f8b9e64bbb6ab91ba2451ba85e7950b6a03c9dd2e93b2a","lineas":1,"omitidas":0,"no_recomprobable":"depende del astro preview levantado por la fase sobre la copia aislada"} -->
**Evidencia `apply-evidence.6`** · exit 0 · 1 líneas, 0 omitidas · HEAD `ba9526b7a183` · 2026-10-02T20:46:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons`
No re-comprobable: depende del astro preview levantado por la fase sobre la copia aislada

```text
curl -s -o /dev/null -w 'HTTP %{http_code} %{content_type} %{size_download} bytes\n' http://127.0.0.1:4399/apple-touch-icon.png
```

```text
HTTP 200 image/png 8973 bytes
```
<!-- evidencia:fin apply-evidence.6 -->

## T4 — Verificación con axe y con teclado

Sin commit de código (tarea de verificación); su evidencia y este informe van en el commit de cierre de la fase.

### axe-audit.mjs (jsdom + axe-core) sobre el build de HEAD

`scripts/axe-audit.mjs` lee rutas fijas `dist/<página>/index.html` relativas a la raíz del proyecto, mientras que el build con el adaptador de Cloudflare publica en `dist/client/` (es en la raíz, en/pt bajo `/en/` y `/pt/`). Sin reescribir el script, la invocación usa una raíz por locale con una copia idéntica del script (el bloque lo comprueba con `cmp`), `node_modules` enlazado a las herramientas temporales y `dist` enlazado a la salida real del locale.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"archivo","argv":null,"texto":"# axe-audit.mjs sin modificar (copia byte a byte, ver cmp), con ROOT cuya dist/ apunta a la\n# salida real del build por locale: es -\u003e dist/client, en -\u003e dist/client/en, pt -\u003e dist/client/pt\nset -u\nAX=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/axe.Zjhb4Sbn\ncmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro/scripts/axe-audit.mjs $AX/es/scripts/axe-audit.mjs && echo \"axe-audit.mjs: copia idéntica al worktree\"\nfor L in es en pt; do\n  node $AX/$L/scripts/axe-audit.mjs \u003e $AX/$L/out.log 2\u003e&1; rc=$?\n  echo \"== $L (exit $rc) ==\"\n  grep -E \"^=== /|^Violations:\" $AX/$L/out.log | paste - - | sed 's/\\t/ /'\n  grep -E \"^Total (violations|weighted)\" $AX/$L/out.log\n  echo \"nodos con violación dentro del selector de idioma: $(grep -cE 'lang-selector|lang-menu|lang-trigger' $AX/$L/out.log)\"\ndone\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru","head":null,"fecha":"2026-10-02T20:47:02-03:00","exit":0,"sha256":"63bfa1a9934c91c66ef700430b7b35d2cf8af3866ab9b9dce27c9e928ce7d1f0","lineas":31,"omitidas":0,"no_recomprobable":"depende de la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.7`** · exit 0 · 31 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:47:02-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru`
No re-comprobable: depende de la copia aislada y de herramientas instaladas en el directorio de temporales del despacho

```bash
# axe-audit.mjs sin modificar (copia byte a byte, ver cmp), con ROOT cuya dist/ apunta a la
# salida real del build por locale: es -> dist/client, en -> dist/client/en, pt -> dist/client/pt
set -u
AX=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/axe.Zjhb4Sbn
cmp /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro/scripts/axe-audit.mjs $AX/es/scripts/axe-audit.mjs && echo "axe-audit.mjs: copia idéntica al worktree"
for L in es en pt; do
  node $AX/$L/scripts/axe-audit.mjs > $AX/$L/out.log 2>&1; rc=$?
  echo "== $L (exit $rc) =="
  grep -E "^=== /|^Violations:" $AX/$L/out.log | paste - - | sed 's/\t/ /'
  grep -E "^Total (violations|weighted)" $AX/$L/out.log
  echo "nodos con violación dentro del selector de idioma: $(grep -cE 'lang-selector|lang-menu|lang-trigger' $AX/$L/out.log)"
done
```

```text
axe-audit.mjs: copia idéntica al worktree
== es (exit 1) ==
=== / === Violations: 0 | Incomplete: 3 | Weight: 0
=== /servicios === Violations: 0 | Incomplete: 2 | Weight: 0
=== /industrias === Violations: 0 | Incomplete: 2 | Weight: 0
=== /nosotros === Violations: 0 | Incomplete: 2 | Weight: 0
=== /contacto === Violations: 0 | Incomplete: 2 | Weight: 0
=== /cotizar === Violations: 0 | Incomplete: 3 | Weight: 0
Total violations: 0
Total weighted severity: 0
nodos con violación dentro del selector de idioma: 0
== en (exit 1) ==
=== / === Violations: 0 | Incomplete: 3 | Weight: 0
=== /servicios === Violations: 0 | Incomplete: 2 | Weight: 0
=== /industrias === Violations: 0 | Incomplete: 2 | Weight: 0
=== /nosotros === Violations: 0 | Incomplete: 2 | Weight: 0
=== /contacto === Violations: 0 | Incomplete: 2 | Weight: 0
=== /cotizar === Violations: 0 | Incomplete: 3 | Weight: 0
Total violations: 0
Total weighted severity: 0
nodos con violación dentro del selector de idioma: 0
== pt (exit 1) ==
=== / === Violations: 0 | Incomplete: 3 | Weight: 0
=== /servicios === Violations: 0 | Incomplete: 2 | Weight: 0
=== /industrias === Violations: 0 | Incomplete: 2 | Weight: 0
=== /nosotros === Violations: 0 | Incomplete: 2 | Weight: 0
=== /contacto === Violations: 0 | Incomplete: 2 | Weight: 0
=== /cotizar === Violations: 0 | Incomplete: 3 | Weight: 0
Total violations: 0
Total weighted severity: 0
nodos con violación dentro del selector de idioma: 0
```
<!-- evidencia:fin apply-evidence.7 -->

El bloque 7 muestra 0 violaciones en las 6 páginas de cada locale (`es`, `en`, `pt`) y 0 nodos del selector entre las violaciones. El `exit 1` no viene de las violaciones (el script sale con 1 solo si el peso supera 30, y el peso es 0): es un defecto preexistente del script en su última línea, `dom?.window.close?.()` fuera del bloque donde `dom` está declarado, que lanza `ReferenceError` después de imprimir el resumen. El bloque siguiente lo muestra; el script no se modifica (T4 lo prohíbe) y el defecto queda registrado en `observations.md`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"argv","argv":["tail","-n","6","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/axe.Zjhb4Sbn/es/out.log"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru","head":null,"fecha":"2026-10-02T20:47:17-03:00","exit":0,"sha256":"5cff5c0654b1e70e6a4057a4fc43d51afcd90493324bb920247994d09bd15f5f","lineas":6,"omitidas":0,"no_recomprobable":"lee el log de la corrida anterior, en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.8`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:47:17-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru`
No re-comprobable: lee el log de la corrida anterior, en el directorio de temporales del despacho

```text
tail -n 6 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/axe.Zjhb4Sbn/es/out.log
```

```text
^

ReferenceError: dom is not defined
    at file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/axe.Zjhb4Sbn/es/scripts/axe-audit.mjs:74:1

Node.js v24.15.0
```
<!-- evidencia:fin apply-evidence.8 -->

### Chrome real: axe-core acotado al selector, desktop y drawer móvil

`axe-core` inyectado en Chrome 148 contra `astro preview` de la copia aislada, con las mismas etiquetas que `axe-audit.mjs` (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`) y `include` acotado al selector: en desktop (1280×800) con el panel abierto, y en móvil (390×844) con el drawer abierto (`aria-hidden="false"`), para `es`, `en` y `pt`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","BASE=http://127.0.0.1:4399","node","browser-check.mjs","axe"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/tools.JnLrFNff","head":null,"fecha":"2026-10-02T20:47:27-03:00","exit":1,"sha256":"46936644a067e9d23f5531fb11f1e66d944e341dcf4962001b32b8693456ce80","lineas":7,"omitidas":0,"no_recomprobable":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.9`** · exit 1 · 7 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:47:27-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/tools.JnLrFNff`
No re-comprobable: depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome BASE=http://127.0.0.1:4399 node browser-check.mjs axe
```

```text
FAIL [es] axe desktop (panel abierto) — violations color-contrast · passes 21
FAIL [es] axe drawer móvil (abierto) — drawer aria-hidden=false · violations color-contrast · passes 16
FAIL [en] axe desktop (panel abierto) — violations color-contrast · passes 21
FAIL [en] axe drawer móvil (abierto) — drawer aria-hidden=false · violations color-contrast · passes 16
FAIL [pt] axe desktop (panel abierto) — violations color-contrast · passes 21
FAIL [pt] axe drawer móvil (abierto) — drawer aria-hidden=false · violations color-contrast · passes 16
FALLAS: 6 fallas
```
<!-- evidencia:fin apply-evidence.9 -->

### Chrome real: prueba de teclado del selector desktop

Por locale: Tab desde el inicio de la página hasta `#lang-trigger`; Enter abre (`aria-expanded="true"` y panel `visibility: visible`); Tab recorre los tres enlaces en orden; Escape cierra (`aria-expanded="false"`, panel `hidden`) y el foco vuelve a `#lang-trigger`; Espacio abre y Escape cierra; `aria-current="page"` solo en el enlace activo, en desktop y en el drawer móvil; Enter sobre otro idioma navega a su URL.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","BASE=http://127.0.0.1:4399","node","browser-check.mjs","keyboard"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/tools.JnLrFNff","head":null,"fecha":"2026-10-02T20:48:32-03:00","exit":0,"sha256":"9eafac99cdc6e615fdc2f55aa95f8a9f45fc5ca11cd93bc2b8e3115b57b15569","lineas":22,"omitidas":0,"no_recomprobable":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.10`** · exit 0 · 22 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:48:32-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/tools.JnLrFNff`
No re-comprobable: depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome BASE=http://127.0.0.1:4399 node browser-check.mjs keyboard
```

```text
PASS [es] Tab llega al botón — 7 tabs
PASS [es] Enter abre
PASS [es] Tab recorre los links — a[hreflang=es],a[hreflang=en],a[hreflang=pt]
PASS [es] Escape cierra y devuelve foco
PASS [es] Espacio abre
PASS [es] aria-current="page" solo en el activo — desktop es=page · móvil es=page
PASS [es] Enter navega a en — /en/
PASS [en] Tab llega al botón — 7 tabs
PASS [en] Enter abre
PASS [en] Tab recorre los links — a[hreflang=es],a[hreflang=en],a[hreflang=pt]
PASS [en] Escape cierra y devuelve foco
PASS [en] Espacio abre
PASS [en] aria-current="page" solo en el activo — desktop en=page · móvil en=page
PASS [en] Enter navega a pt — /pt/
PASS [pt] Tab llega al botón — 7 tabs
PASS [pt] Enter abre
PASS [pt] Tab recorre los links — a[hreflang=es],a[hreflang=en],a[hreflang=pt]
PASS [pt] Escape cierra y devuelve foco
PASS [pt] Espacio abre
PASS [pt] aria-current="page" solo en el activo — desktop pt=page · móvil pt=page
PASS [pt] Enter navega a en — /en/
OK: 0 fallas
```
<!-- evidencia:fin apply-evidence.10 -->

### Hallazgo: `color-contrast` en el selector, preexistente y fuera del alcance de las tareas

El bloque 9 reporta una única regla, `color-contrast` (WCAG 1.4.3), en desktop y en el drawer móvil de los tres locales; el bloque 10 confirma que la operación con teclado y la semántica ARIA cumplen. El commit de T1 no tocó ninguna regla CSS: el bloque siguiente lista los hunks del diff de `LanguageSelector.astro` contra la base del cambio; ninguno cae dentro del bloque `<style>` de la base (líneas 80 a 183): están entre las líneas 4 y 68 (markup) y en la 189 (comentario del `<script>`).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"argv","argv":["git","-C","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","diff","-U0","9277e47","31d21dc","--","log-atm-web-astro/src/components/ui/LanguageSelector.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","head":"ba9526b7a183f922fb8fe3fa94a13551f44e9b1f","fecha":"2026-10-02T20:48:53-03:00","exit":0,"sha256":"adc9929e183e1af00d97146c47aa4f0e84b3a64a7cca3a9493ddb74afadbedb2","lineas":30,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.11`** · exit 0 · 30 líneas, 0 omitidas · HEAD `ba9526b7a183` · 2026-10-02T20:48:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons`

```text
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons diff -U0 9277e47 31d21dc -- log-atm-web-astro/src/components/ui/LanguageSelector.astro
```

```text
diff --git a/log-atm-web-astro/src/components/ui/LanguageSelector.astro b/log-atm-web-astro/src/components/ui/LanguageSelector.astro
index 7283b44..b7e2d65 100644
--- a/log-atm-web-astro/src/components/ui/LanguageSelector.astro
+++ b/log-atm-web-astro/src/components/ui/LanguageSelector.astro
@@ -4,2 +4,5 @@
- * - Variante 'desktop': dropdown con `:focus-within` + click handler.
- * - Variante 'mobile': lista plana dentro del drawer.
+ * - Variante 'desktop': patrón disclosure — botón con `aria-expanded` y `aria-controls`
+ *   que muestra/oculta una lista simple de enlaces; se abre y cierra por click (o
+ *   Enter/Espacio), se cierra con click fuera o con Escape (devolviendo el foco al botón).
+ * - Variante 'mobile': lista plana de enlaces dentro del drawer.
+ * - En ambas, el idioma activo lleva `aria-current="page"`.
@@ -34 +37 @@ const isMobile = variant === 'mobile';
-            aria-current={lang === currentLang ? 'true' : undefined}
+            aria-current={lang === currentLang ? 'page' : undefined}
@@ -49 +51,0 @@ const isMobile = variant === 'mobile';
-      aria-haspopup="listbox"
@@ -50,0 +53 @@ const isMobile = variant === 'mobile';
+      aria-controls="lang-menu"
@@ -62 +65 @@ const isMobile = variant === 'mobile';
-    <ul class="lang-selector__listbox" role="listbox" aria-labelledby="lang-trigger">
+    <ul class="lang-selector__listbox" id="lang-menu">
@@ -64 +67 @@ const isMobile = variant === 'mobile';
-        <li role="option" aria-selected={lang === currentLang ? 'true' : 'false'}>
+        <li>
@@ -68,0 +72 @@ const isMobile = variant === 'mobile';
+            aria-current={lang === currentLang ? 'page' : undefined}
@@ -189 +193 @@ const isMobile = variant === 'mobile';
-   * Dropdown toggle accesible para variante desktop.
+   * Toggle del disclosure accesible para la variante desktop.
```
<!-- evidencia:fin apply-evidence.11 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"argv","argv":["grep","-nE","color: var\\(--color-(brand|neutral-500)\\)|background: var\\(--color-primary-50\\)|^  <style\u003e|^<style\u003e","src/components/ui/LanguageSelector.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"ba9526b7a183f922fb8fe3fa94a13551f44e9b1f","fecha":"2026-10-02T20:48:53-03:00","exit":0,"sha256":"1e37756a3aefcb1e2c9fb2cfa363167cce53a02832d4e47bd36867d2275d42c2","lineas":9,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.12`** · exit 0 · 9 líneas, 0 omitidas · HEAD `ba9526b7a183` · 2026-10-02T20:48:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
grep -nE 'color: var\(--color-(brand|neutral-500)\)|background: var\(--color-primary-50\)|^  <style>|^<style>' src/components/ui/LanguageSelector.astro
```

```text
84:<style>
105:    border-color: var(--color-brand);
106:    color: var(--color-brand);
146:    background: var(--color-primary-50);
147:    color: var(--color-brand);
151:    background: var(--color-primary-50);
152:    color: var(--color-brand);
163:  .lang-selector__option.is-active .lang-selector__code { color: var(--color-brand); }
175:    color: var(--color-neutral-500);
```
<!-- evidencia:fin apply-evidence.12 -->

El bloque 12 muestra las reglas involucradas: texto `--color-brand` (primary-500) sobre `--color-primary-50` en la opción activa y en hover/focus, el trigger expandido en `--color-brand` sobre el fondo de la navbar (neutral-50), y el encabezado móvil en `--color-neutral-500` sobre blanco. El bloque siguiente calcula la razón de contraste WCAG de esos pares con los valores de `src/styles/tokens.css`, y de los tokens que `DESIGN.md` destina a texto (`--color-brand-dark` = primary-700, y `--color-text-muted` = neutral-600) como referencia para la decisión pendiente.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.13","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/contrast.mjs"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru","head":null,"fecha":"2026-10-02T20:48:53-03:00","exit":0,"sha256":"f9f9d5891ebd115ea062f97897f460ee119e5fd9607325bdf266d4176575a503","lineas":6,"omitidas":0,"no_recomprobable":"el script vive en el directorio de temporales del despacho; su texto completo está en este bloque"} -->
**Evidencia `apply-evidence.13`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:48:53-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru`
No re-comprobable: el script vive en el directorio de temporales del despacho; su texto completo está en este bloque

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-he822uru/contrast.mjs
```

```text
3.96:1 NO-AA  actual   opción activa/hover: primary-500 #4a7bb5 sobre primary-50 #eef4fb
4.10:1 NO-AA  actual   trigger expandido:   primary-500 #4a7bb5 sobre neutral-50 #f8f7f6
3.66:1 NO-AA  actual   encabezado móvil:    neutral-500 #898580 sobre blanco #ffffff
7.70:1 AA  referencia brand-dark:        primary-700 #2b4e78 sobre primary-50 #eef4fb
7.97:1 AA  referencia brand-dark:        primary-700 #2b4e78 sobre neutral-50 #f8f7f6
5.44:1 AA  referencia text-muted:        neutral-600 #6e6963 sobre blanco #ffffff
```
<!-- evidencia:fin apply-evidence.13 -->

Lectura: las tres combinaciones actuales quedan bajo 4.5:1 (bloque 13) y explican las violaciones del bloque 9; los tokens de texto de `DESIGN.md` las superan. El contraste es anterior a este cambio (bloque 11) y corregirlo exige editar reglas CSS del selector y elegir tokens, algo que ninguna tarea de `tasks.md` pide (T1 se limita a la semántica ARIA; T4 es verificación). `axe-audit.mjs` (bloque 7) no lo detecta: en jsdom no hay cálculo de estilos ni layout, de modo que las 0 violaciones de ese script no cubren el contraste — inferencia consistente con los resultados `incomplete` que reporta en cada página, no verificada regla por regla.

Estado de los criterios de T4: la prueba de teclado cumple (bloque 10); "axe sin violaciones atribuibles al selector" no se cumple por `color-contrast`, y queda pendiente de una decisión de alcance (ver el envelope de la fase).


## T5 — Contraste del selector de idioma (re-despacho tras la decisión de alcance del 2026-10-02)

Commit: `8d3d413` — `fix(a11y): raise language selector text contrast to WCAG AA`.

El diff de `src/` de la tarea toca solo el bloque `<style>` de `LanguageSelector.astro` y usa dos tokens funcionales ya definidos en `src/styles/tokens.css` (`--color-brand-dark: var(--color-primary-700)` y `--color-text-muted: var(--color-neutral-600)`), sin valores hex nuevos:

| Estado | Antes (token → valor) | Después (token → valor) | Fondo |
|---|---|---|---|
| Opción activa (desktop y drawer), texto y código | `--color-brand` → primary-500 `#4a7bb5` | `--color-brand-dark` → primary-700 `#2b4e78` | `--color-primary-50` `#eef4fb` |
| Opción hover / focus-visible | `--color-brand` → `#4a7bb5` | `--color-brand-dark` → `#2b4e78` | `--color-primary-50` `#eef4fb` |
| Trigger expandido (y hover, misma regla), texto y borde | `--color-brand` → `#4a7bb5` | `--color-brand-dark` → `#2b4e78` | navbar `#f8f7f6` (neutral-50) |
| Encabezado del drawer móvil | `--color-neutral-500` → `#898580` | `--color-text-muted` → neutral-600 `#6e6963` | `--color-surface` `#ffffff` |

El trigger comparte una sola regla para `:hover` y `[aria-expanded="true"]`; se sustituyó el token en esa regla completa (color y borde), así que el hover del trigger también queda en `--color-brand-dark`. El código de idioma de las opciones no activas conserva `--color-text-muted`, que ya cumplía (ver bloque 19). Las razones medidas antes y después están en los bloques 18 y 19.

Build de HEAD (con T5) en una copia aislada, base del `astro preview` del puerto 4402 usado en el resto de esta sección (la copia de `ddc120b`, previa a T5, sirve en el puerto 4401):

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.14","forma":"argv","argv":["bash","-c","npm run build 2\u003e&1 | tail -n 5; exit ${PIPESTATUS[0]}"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/after.d9MA2ren/log-atm-web-astro","head":null,"fecha":"2026-10-02T20:53:52-03:00","exit":0,"sha256":"01f3196137de1f98700844cb1c9acb4aa6b699e5a579c30d65b207bef00a04bc","lineas":5,"omitidas":0,"no_recomprobable":"corre en una copia aislada de HEAD bajo el directorio de temporales del despacho, que no persiste tras la fase"} -->
**Evidencia `apply-evidence.14`** · exit 0 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:53:52-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/after.d9MA2ren/log-atm-web-astro`
No re-comprobable: corre en una copia aislada de HEAD bajo el directorio de temporales del despacho, que no persiste tras la fase

```text
bash -c 'npm run build 2>&1 | tail -n 5; exit ${PIPESTATUS[0]}'
```

```text
20:53:52 [build] Rearranging server assets...
20:53:52 [build] ✓ Completed in 4.75s.
20:53:52 [@astrojs/sitemap] `sitemap-index.xml` created at `dist/client`
20:53:52 [build] Server built in 7.23s
20:53:52 [build] Complete!
```
<!-- evidencia:fin apply-evidence.14 -->

El bloque 14 muestra el cierre del build. Alcance del diff de `src/` de la tarea (bloques 15 y 16) y definición de los tokens usados (bloque 17):

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.15","forma":"argv","argv":["git","-C","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","diff","--stat","ddc120b","8d3d413","--","log-atm-web-astro/src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","head":"8d3d413c51903973c101c70f16772889e4f79a42","fecha":"2026-10-02T20:54:42-03:00","exit":0,"sha256":"6cf74f02b2c9d8ea35e494e0c74b4b54791fd626abe8440d4af254ef06c3ad2d","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.15`** · exit 0 · 2 líneas, 0 omitidas · HEAD `8d3d413c5190` · 2026-10-02T20:54:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons`

```text
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons diff --stat ddc120b 8d3d413 -- log-atm-web-astro/src
```

```text
 log-atm-web-astro/src/components/ui/LanguageSelector.astro | 12 ++++++------
 1 file changed, 6 insertions(+), 6 deletions(-)
```
<!-- evidencia:fin apply-evidence.15 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.16","forma":"argv","argv":["git","-C","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","diff","-U0","ddc120b","8d3d413","--","log-atm-web-astro/src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons","head":"8d3d413c51903973c101c70f16772889e4f79a42","fecha":"2026-10-02T20:54:42-03:00","exit":0,"sha256":"e91256c6303e8df5870a6a92e5ff4357f7e8551f65121a5abef02b34fb3130d8","lineas":21,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.16`** · exit 0 · 21 líneas, 0 omitidas · HEAD `8d3d413c5190` · 2026-10-02T20:54:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons`

```text
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons diff -U0 ddc120b 8d3d413 -- log-atm-web-astro/src
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
<!-- evidencia:fin apply-evidence.16 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.17","forma":"argv","argv":["grep","-nE","--","--color-(primary-(50|500|700)|neutral-(50|500|600)|brand|brand-dark|text-muted|surface): ","src/styles/tokens.css"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro","head":"8d3d413c51903973c101c70f16772889e4f79a42","fecha":"2026-10-02T20:54:42-03:00","exit":0,"sha256":"2a1ffedb54e3414c3c16cc2f76b1716b09413dabe8df0cec02549a2130ffce4b","lineas":19,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.17`** · exit 0 · 19 líneas, 0 omitidas · HEAD `8d3d413c5190` · 2026-10-02T20:54:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-a11y-and-icons/log-atm-web-astro`

```text
grep -nE -- '--color-(primary-(50|500|700)|neutral-(50|500|600)|brand|brand-dark|text-muted|surface): ' src/styles/tokens.css
```

```text
13:    --color-primary-50:  #eef4fb;
18:    --color-primary-500: #4A7BB5; /* ← MARCA */
20:    --color-primary-700: #2b4e78;
33:    --color-neutral-50:  #f8f7f6; /* ← background página */
38:    --color-neutral-500: #898580;
39:    --color-neutral-600: #6e6963;
62:    --color-surface:     #ffffff;
66:    --color-text-muted:  var(--color-neutral-600);
69:    --color-brand:       var(--color-primary-500);
71:    --color-brand-dark:  var(--color-primary-700);
145:  --color-primary-50:  #eef4fb;
150:  --color-primary-500: #4A7BB5;
152:  --color-primary-700: #2b4e78;
165:  --color-neutral-50:  #f8f7f6;
170:  --color-neutral-500: #898580;
171:  --color-neutral-600: #6e6963;
194:  --color-surface:     #ffffff;
198:  --color-text-muted:  #6e6963;
199:  --color-brand:       #4A7BB5;
```
<!-- evidencia:fin apply-evidence.17 -->

### Contraste por estado, medido en Chrome real (antes y después)

`tools.*/browser-check.mjs contrast` (harness del directorio de temporales del despacho, con `axe-core` y `puppeteer-core` instalados ahí) ejecuta solo la regla `color-contrast` de axe-core sobre cada estado del selector en Chrome 148, con el estado provocado de verdad: hover del trigger cerrado, trigger expandido con el puntero fuera, opción activa, hover del puntero sobre una opción no activa, foco por teclado (Tab, `:focus-visible`) en una opción no activa, y en el drawer móvil (390×844, abierto con `#nav-burger`) el encabezado y la opción activa. Cada línea agrega los nodos de `es`, `en` y `pt` e informa los pares color/fondo que calcula axe y la razón mínima. Primero contra el build de `ddc120b` (antes de T5, puerto 4401) y luego contra el de `8d3d413` (con T5, puerto 4402):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.18","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","BASE=http://127.0.0.1:4401","node","browser-check.mjs","contrast"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/tools.Gq3eaMla","head":null,"fecha":"2026-10-02T20:55:15-03:00","exit":1,"sha256":"b9e7cac0880acca2a19f69a184625da79ed18543e841405381cf91c4c44de42c","lineas":8,"omitidas":0,"no_recomprobable":"depende del astro preview del build previo a T5, levantado por la fase en el directorio de temporales del despacho; su resultado es el estado anterior al cambio"} -->
**Evidencia `apply-evidence.18`** · exit 1 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:55:15-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/tools.Gq3eaMla`
No re-comprobable: depende del astro preview del build previo a T5, levantado por la fase en el directorio de temporales del despacho; su resultado es el estado anterior al cambio

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome BASE=http://127.0.0.1:4401 node browser-check.mjs contrast
```

```text
FAIL trigger hover (cerrado) — #4a7bb5 sobre #f8f7f6 · mínimo 4.09:1 en 3 nodos (es/en/pt)
FAIL trigger expandido — #4a7bb5 sobre #f8f7f6 · mínimo 4.09:1 en 3 nodos (es/en/pt)
FAIL opción activa (desktop) — #4a7bb5 sobre #eef4fb · mínimo 3.95:1 en 6 nodos (es/en/pt)
FAIL opción hover (desktop) — #4a7bb5 sobre #eef4fb | #6e6963 sobre #eef4fb · mínimo 3.95:1 en 6 nodos (es/en/pt)
FAIL opción focus-visible (desktop) — #4a7bb5 sobre #eef4fb | #6e6963 sobre #eef4fb · mínimo 3.95:1 en 6 nodos (es/en/pt)
FAIL encabezado drawer móvil — #898580 sobre #ffffff · mínimo 3.66:1 en 3 nodos (es/en/pt)
FAIL opción activa (drawer) — #4a7bb5 sobre #eef4fb · mínimo 3.95:1 en 6 nodos (es/en/pt)
FALLAS: 7 fallas
```
<!-- evidencia:fin apply-evidence.18 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.19","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","BASE=http://127.0.0.1:4402","node","browser-check.mjs","contrast"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/tools.Gq3eaMla","head":null,"fecha":"2026-10-02T20:55:33-03:00","exit":0,"sha256":"96049690f888268e2314be2bd3ab3774bb0e614a54733b2e4a2516278383fc6a","lineas":8,"omitidas":0,"no_recomprobable":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.19`** · exit 0 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:55:33-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/tools.Gq3eaMla`
No re-comprobable: depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome BASE=http://127.0.0.1:4402 node browser-check.mjs contrast
```

```text
PASS trigger hover (cerrado) — #2b4e78 sobre #f8f7f6 · mínimo 7.96:1 en 3 nodos (es/en/pt)
PASS trigger expandido — #2b4e78 sobre #f8f7f6 · mínimo 7.96:1 en 3 nodos (es/en/pt)
PASS opción activa (desktop) — #2b4e78 sobre #eef4fb · mínimo 7.69:1 en 6 nodos (es/en/pt)
PASS opción hover (desktop) — #6e6963 sobre #eef4fb | #2b4e78 sobre #eef4fb · mínimo 4.9:1 en 6 nodos (es/en/pt)
PASS opción focus-visible (desktop) — #6e6963 sobre #eef4fb | #2b4e78 sobre #eef4fb · mínimo 4.9:1 en 6 nodos (es/en/pt)
PASS encabezado drawer móvil — #6e6963 sobre #ffffff · mínimo 5.43:1 en 3 nodos (es/en/pt)
PASS opción activa (drawer) — #2b4e78 sobre #eef4fb · mínimo 7.69:1 en 6 nodos (es/en/pt)
OK: 0 fallas
```
<!-- evidencia:fin apply-evidence.19 -->

El bloque 18 reproduce, estado por estado, las razones bajo 4.5:1 que explicaban la violación `color-contrast` del bloque 9; el bloque 19 muestra todos los estados sobre 4.5:1 tras T5, incluido el código de idioma de las opciones no activas en hover/focus (`#6e6963` sobre `#eef4fb`), que T5 no tocó.

## T4 (cierre) — axe-core en Chrome real y teclado, después de T5

Misma medición que el bloque 9 (axe-core inyectado en Chrome 148, etiquetas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`, `include` acotado al selector; desktop 1280×800 con el panel abierto y móvil 390×844 con el drawer abierto), ahora contra el build con T5:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.20","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","BASE=http://127.0.0.1:4402","node","browser-check.mjs","axe"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/tools.Gq3eaMla","head":null,"fecha":"2026-10-02T20:55:53-03:00","exit":0,"sha256":"6ca922bc437ad04a1fb1069ff5fa28b91d23203d2f9c19da557b4abfe5902acc","lineas":7,"omitidas":0,"no_recomprobable":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.20`** · exit 0 · 7 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:55:53-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/tools.Gq3eaMla`
No re-comprobable: depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome BASE=http://127.0.0.1:4402 node browser-check.mjs axe
```

```text
PASS [es] axe desktop (panel abierto) — violations ninguna · passes 21
PASS [es] axe drawer móvil (abierto) — drawer aria-hidden=false · violations ninguna · passes 16
PASS [en] axe desktop (panel abierto) — violations ninguna · passes 21
PASS [en] axe drawer móvil (abierto) — drawer aria-hidden=false · violations ninguna · passes 16
PASS [pt] axe desktop (panel abierto) — violations ninguna · passes 21
PASS [pt] axe drawer móvil (abierto) — drawer aria-hidden=false · violations ninguna · passes 16
OK: 0 fallas
```
<!-- evidencia:fin apply-evidence.20 -->

Prueba de teclado del selector desktop repetida sobre el árbol final (los pasos de teclado del bloque 10: Tab hasta el botón, Enter abre, Tab recorre los tres enlaces, Escape cierra y devuelve el foco, Espacio abre, Enter sobre otro idioma navega; la comprobación de `aria-current` de ese bloque no se repite porque T5 no toca el marcado):

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.21","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","BASE=http://127.0.0.1:4402","node","browser-check.mjs","keyboard"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/tools.Gq3eaMla","head":null,"fecha":"2026-10-02T20:56:06-03:00","exit":0,"sha256":"06308e40db91ac9ee44c931143538f8414132fea6f42ab26728f32507e6ba004","lineas":19,"omitidas":0,"no_recomprobable":"depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.21`** · exit 0 · 19 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:56:06-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-a11y-and-icons/sdd-apply-gu6e15xm/tools.Gq3eaMla`
No re-comprobable: depende del astro preview levantado por la fase sobre la copia aislada y de herramientas instaladas en el directorio de temporales del despacho

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome BASE=http://127.0.0.1:4402 node browser-check.mjs keyboard
```

```text
PASS [es] Tab llega al botón — 7 tabs
PASS [es] Enter abre
PASS [es] Tab recorre los links — a[hreflang=es],a[hreflang=en],a[hreflang=pt]
PASS [es] Escape cierra y devuelve foco
PASS [es] Espacio abre
PASS [es] Enter navega a en — /en/
PASS [en] Tab llega al botón — 7 tabs
PASS [en] Enter abre
PASS [en] Tab recorre los links — a[hreflang=es],a[hreflang=en],a[hreflang=pt]
PASS [en] Escape cierra y devuelve foco
PASS [en] Espacio abre
PASS [en] Enter navega a pt — /pt/
PASS [pt] Tab llega al botón — 7 tabs
PASS [pt] Enter abre
PASS [pt] Tab recorre los links — a[hreflang=es],a[hreflang=en],a[hreflang=pt]
PASS [pt] Escape cierra y devuelve foco
PASS [pt] Espacio abre
PASS [pt] Enter navega a en — /en/
OK: 0 fallas
```
<!-- evidencia:fin apply-evidence.21 -->

### Estado de los criterios (re-despacho)

- T5: el bloque 20 muestra axe-core en Chrome real sin violaciones (ninguna regla, incluida `color-contrast`) en desktop y drawer móvil para `es`, `en` y `pt`; el bloque 19, todos los estados medidos sobre 4.5:1; los bloques 15 y 16, un diff de `src/` limitado al `<style>` de `LanguageSelector.astro` con tokens existentes (bloque 17); la tabla de la sección T5 registra antes/después por estado.
- T4: "axe sin violaciones atribuibles al selector" queda cumplido por el bloque 20 (antes, bloque 9); la prueba de teclado se mantiene en verde sobre el árbol final (bloque 21). `scripts/axe-audit.mjs` (jsdom) ya daba 0 violaciones en el bloque 7 y no evalúa `color-contrast`, por lo que no se repite.
- Pares de contraste iguales fuera del selector y el resto del barrido de `color-contrast` del sitio: registrados en `memory/observations.md`, sin cambios de código.
