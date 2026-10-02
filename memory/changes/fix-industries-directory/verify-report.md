---
verdict: PASS
---

# Verify Report: fix-industries-directory

**Fecha**: 2026-10-02

Camino `apply-only` con `spec_refs: []`: se verifican los Acceptance de `tasks.md` (T1-T4) y los AC A2/A3 de `interactive-component-transitions`, que el cambio modifica. Cada criterio se verifica con evidencia propia de esta fase (bloques `verify-report.N`); la evidencia de `apply-evidence.md` no cumple ningún criterio por sí sola.

## Resultados por Spec

### interactive-component-transitions (A2, A3; edición en sitio, `status: review`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| A2: transiciones rápidas no dejan slides visibles inconsistentes | ✅ | `verify-report.2`: tras hovers 5>2>8>1 cada 120 ms y 1,5 s de estabilización, solo el slide activo (índice 1) tiene opacidad computada 1,00 y el resto 0,00 en las tres rutas (`T2`). |
| A3: sin rotación durante el hover (≥ 7 s) | ✅ | `verify-report.2` (`T3 hover 8 s`): el slide activo no cambia en 8 s con el puntero sobre `#ind-directory`, en es/en/pt. |
| A3: al salir del hover, la rotación se reanuda en ≤ 3,5 s y avanza al siguiente | ✅ | `verify-report.2` (`T3 salida del hover`): reanuda en 2828 / 2829 / 2802 ms y avanza de 1 a 2, con caption correcto. |
| A3: un solo interval activo | ✅ | `verify-report.2` (`A3 un solo interval`): tras 6 clics manuales, tres rotaciones consecutivas separadas por 3499-3501 ms en las tres rutas. |
| A3: `destroy()` limpia el interval y cancela los tweens | ✅ | Lectura de `gsap-ind-directory.ts`: `destroy()` hace `clearInterval(timer)` y `gsap.killTweensOf(slides)`; registrado en `astro:before-swap` (el sitio no usa router, como declara A3). Sin test dinámico: el sitio no emite el evento. |
| A3: con `prefers-reduced-motion: reduce` la autorrotación nunca arranca | ✅ | `verify-report.2` (`RM sin autorrotacion`): con la preferencia emulada (`matchMedia_reduce=true`), el activo no cambia en 8 s. |

Se marcaron `[x]` en la spec los ocho AC que esta fase verificó (A2 AC4, los cinco de A3 y los dos de A4 medidos sin JS). El resto de AC de A1/A2/A4 y de los behaviors B1-B4 del stepper no los toca este cambio y quedan sin marcar. `status` permanece `review`: solo `sdd-archive` escribe `completed` (`sdd-phase-common.md §D`).

### Tasks del cambio

| Criterion | Status | Notas |
|-----------|--------|-------|
| T1: tras clic en el ítem N, caption/contador/tags muestran N (es/en/pt) | ✅ | `verify-report.2` (`T1 clic item 4` y `item 7`): contador, eyebrow, nombre y tags coinciden con los datos de la página en las tres rutas. |
| T1: tras la autorrotación (3,5 s), caption/contador/tags muestran el slide visible | ✅ | `verify-report.2` (`T1 autorrotacion`): caption y tags siguen al slide activo (7 a 8) en las tres rutas. |
| T1: el comentario de la línea 165 ya no afirma un «orden crítico» | ✅ | `industrias.astro` líneas 165-166 describen el lookup lazy; la lectura del global en `onRender` es `window.__indDirectoryOnRender?.(i)`. |
| T2: tras hovers 5>2>8>1, solo el activo con opacidad 1, el resto 0 | ✅ | `verify-report.2` (`T2`), mismas cifras que en A2. |
| T2: con `prefers-reduced-motion: reduce`, cambios instantáneos y sin regresiones | ✅ | `verify-report.2` (`RM cambio instantaneo`): secuencia 3>6>3>5>2>8>1>0>1 con lectura a 40 ms; en cada paso el activo vale 1, el resto 0 y el caption es correcto, en las tres rutas. |
| T3: durante el hover no hay rotación y al salir se reanuda (medido) | ✅ | Ver A3 arriba. |
| T3: A3 describe comportamiento observable y es coherente con el código | ✅ | A3 describe pausa/reanudación, único interval y `destroy()`; coincide con `startAutoRotation()` (limpia el timer previo), el flag `paused` y los listeners `mouseenter`/`mouseleave`/`focusin`/`focusout`. |
| T3: el `status` de la spec refleja el cumplimiento real | ✅ | La tarea pedía `completed`; el contrato de fases (`sdd-phase-common.md §D`) reserva ese valor a `sdd-archive`, y la spec queda en `review`, el valor que escribe `sdd-apply`. No es defecto del cambio; `sdd-archive` la pasa a `completed`. |
| T4: evidencia (comando + salida) de cada medición en las tres rutas | ✅ | `verify-report.2`. |
| T4: `npm run build` termina sin errores | ✅ | `verify-report.1` muestra exit 0. |
| T4: el servidor de preview queda detenido | ✅ | El script lo baja con `trap` al salir; `pgrep -af "astro preview"` posterior no lista procesos. |

**Scenarios verificados**: 6/6 AC de A2/A3 aplicables y 10/10 Acceptance de tasks.md.

### Tests

El proyecto no declara suite de tests ni filtro de casos en `_profile.md` (solo `npm run build` y `validate-i18n`). La corrida completa es `verify-report.1` (`npm run build`, exit 0). La comprobación empírica en navegador es `verify-report.2` (exit 0, 31 líneas, 30 PASS y 0 FAIL, más la línea de resultado). Entorno: Chrome 148 local con `playwright-core`, viewport 1280x900, `astro preview` sobre el `dist/` recién construido.

**Cobertura**: sin instrumento declarado.

Comprobaciones de evidencia: `verify-report.3` (`comprobar` sobre `apply-evidence.md`: 3 bloques, todos omitidos por marca de no re-comprobable, 0 que no calzan, sin error) y `verify-report.4` (`comprobar` sobre `verify-report.md`: 3 bloques omitidos, 0 que no calzan, sin error).

## Coherencia de Grafo de Specs

`spec_refs` está vacío: no hay specs en alcance para el recorrido bidireccional. No aplica. Sin correcciones de metadata ni actualización de `verified_at`.

## Hallazgos de Seguridad (si aplica)

Dominio `fix`: análisis de seguridad no requerido. Sin hallazgos de seguridad.

## Observaciones

- Tasks pedía pasar la spec a `completed`; queda en `review` por contrato de fase (ver T3).
- Los AC de A1 sobre duración y escala exactas de los tweens (0,5 s, 1,06) no se midieron en navegador; el cambio no los modifica.

## Acciones Requeridas

Ninguna.

## Evidencia


<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro","head":"cdeddda2d8fe6add84154c109bf748abe9bcdc77","fecha":"2026-10-02T20:00:57-03:00","exit":0,"sha256":"32c4a5d6616c0fffbdd5fea2a0ae38e62dc8c3384260f52ac0e933a9e3b473a7","lineas":146,"omitidas":106,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.1`** · exit 0 · 146 líneas, 106 omitidas · HEAD `cdeddda2d8fe` · 2026-10-02T20:00:57-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

20:00:47 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
20:00:47 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
20:00:49 [types] Generated 1.73s
20:00:49 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
20:00:49 [build] output: "static"
20:00:49 [build] mode: "server"
20:00:49 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro/dist/
20:00:49 [build] adapter: @astrojs/cloudflare
20:00:49 [build] Collecting build info...
20:00:49 [build] ✓ Completed in 2.37s.
20:00:49 [build] Building server entrypoints...
20:00:53 [vite] ✓ built in 3.53s
20:00:54 [vite] ✓ built in 1.29s
20:00:55 [vite] ✓ built in 1.28s

 prerendering static routes 
20:00:56   ├─ /404.html (+27ms) 
20:00:56   ├─ /contacto/index.html (+16ms) 
20:00:56   ├─ /cotizar/index.html (+17ms) 
20:00:56   ├─ /industrias/index.html (+26ms) 
20:00:56   ├─ /nosotros/index.html (+18ms) 
20:00:56   ├─ /servicios/index.html (+21ms) 
20:00:56   ├─ /en/404/index.html (+15ms) 
20:00:56   ├─ /pt/404/index.html (+16ms) 
20:00:56   ├─ /en/contacto/index.html (+14ms) 
20:00:56   ├─ /pt/contacto/index.html (+11ms) 
20:00:56   ├─ /en/cotizar/index.html (+13ms) 
20:00:56   ├─ /pt/cotizar/index.html (+11ms) 
20:00:56   ├─ /en/industrias/index.html (+17ms) 
20:00:56   ├─ /pt/industrias/index.html (+14ms) 
20:00:56   ├─ /en/nosotros/index.html (+15ms) 
20:00:56   ├─ /pt/nosotros/index.html (+12ms) 
20:00:56   ├─ /en/servicios/index.html (+17ms) 
20:00:56   ├─ /pt/servicios/index.html (+15ms) 
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"archivo","argv":null,"texto":"# Medicion propia de sdd-verify: preview sobre dist/ + playwright-core con Chrome local; baja el servidor al salir.\nset -u\nAPP=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro\nPORT=4412\ncd \"$APP\" || exit 2\nnode_modules/.bin/astro preview --host 127.0.0.1 --port \"$PORT\" \u003e/dev/null 2\u003e&1 &\nPREVIEW=$!\ntrap 'kill \"$PREVIEW\" 2\u003e/dev/null; wait \"$PREVIEW\" 2\u003e/dev/null' EXIT\nfor _ in $(seq 1 60); do curl -s -o /dev/null \"http://127.0.0.1:$PORT/industrias/\" && break; sleep 0.5; done\nBASE_URL=\"http://127.0.0.1:$PORT\" node --input-type=module <<'EOF_NODE'\nimport { createRequire } from 'node:module';\nconst require = createRequire(process.cwd() + '/');\nconst { chromium } = require('/home/kapridoo/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');\nconst CHROME = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst BASE = process.env.BASE_URL;\nconst ROUTES = ['/industrias', '/en/industrias', '/pt/industrias'];\nlet fails = 0;\nconst check = (route, label, ok, detail) =\u003e { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'} ${route} | ${label} | ${detail}`); };\nconst pad = (i) =\u003e String(i + 1).padStart(2, '0');\n\nconst readState = (page) =\u003e page.evaluate(() =\u003e {\n  const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];\n  return {\n    active: slides.findIndex((s) =\u003e s.classList.contains('is-active')),\n    ops: slides.map((s) =\u003e Number(getComputedStyle(s).opacity)),\n    counter: document.getElementById('dir-counter-active')?.textContent?.trim(),\n    eyebrow: document.getElementById('dir-eyebrow')?.textContent?.trim(),\n    name: document.getElementById('dir-name')?.textContent?.trim(),\n    tags: [...document.querySelectorAll('#dir-tags .ind-directory__tag')].map((t) =\u003e t.textContent.trim()),\n  };\n});\nconst readData = (page) =\u003e page.evaluate(() =\u003e {\n  const src = [...document.scripts].map((s) =\u003e s.textContent).find((t) =\u003e t.includes('const industries'));\n  const m = src.match(/const industries = (\\[[\\s\\S]*?\\]);\\s*const sectorPrefix/);\n  return JSON.parse(m[1]);\n});\nconst capOk = (st, d, i) =\u003e st.active === i && st.counter === pad(i) && st.eyebrow?.endsWith('· ' + pad(i)) && st.name === d[i].name && JSON.stringify(st.tags) === JSON.stringify(d[i].tags ?? []);\nconst onlyActive = (st) =\u003e st.ops.every((o, k) =\u003e (k === st.active ? o === 1 : o === 0));\nconst fmt = (st) =\u003e `active=${st.active} counter=${st.counter} name=\"${st.name}\" tags=[${st.tags.join('|')}]`;\nconst ops = (st) =\u003e '[' + st.ops.map((o) =\u003e o.toFixed(2)).join(',') + ']';\nconst item = (n) =\u003e `#ind-directory .ind-directory__item[data-item=\"${n}\"]`;\nconst waitChange = async (page, from, timeout) =\u003e {\n  const t0 = Date.now();\n  try { await page.waitForFunction((f) =\u003e [...document.querySelectorAll('#ind-directory .ind-directory__slide')].findIndex((s) =\u003e s.classList.contains('is-active')) !== f, from, { timeout, polling: 25 }); return Date.now() - t0; }\n  catch { return null; }\n};\n\nconst browser = await chromium.launch({ executablePath: CHROME, headless: true });\ntry {\n  for (const route of ROUTES) {\n    const url = BASE + route;\n    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });\n    const page = await ctx.newPage();\n    await page.goto(url, { waitUntil: 'load' });\n    const d = await readData(page);\n    await page.locator('#ind-directory').scrollIntoViewIfNeeded();\n    await page.waitForTimeout(300);\n\n    // T1: clic en el item N -\u003e caption/contador/tags\n    for (const n of [4, 7]) {\n      await page.click(item(n));\n      await page.waitForTimeout(900);\n      const st = await readState(page);\n      check(route, `T1 clic item ${n}`, capOk(st, d, n) && onlyActive(st), `${fmt(st)} ops=${ops(st)}`);\n    }\n    // T1: autorrotacion (3,5 s) sin interaccion\n    await page.mouse.move(2, 2);\n    const b = (await readState(page)).active;\n    const ms = await waitChange(page, b, 4500);\n    await page.waitForTimeout(900);\n    const sa = await readState(page);\n    check(route, 'T1 autorrotacion -\u003e caption sigue al slide visible', ms !== null && capOk(sa, d, sa.active) && sa.active === (b + 1) % d.length && onlyActive(sa), `antes=${b} cambio_en_ms=${ms} ${fmt(sa)} ops=${ops(sa)}`);\n\n    // T2: hovers 5-\u003e2-\u003e8-\u003e1 cada 120 ms\n    for (const n of [5, 2, 8, 1]) { await page.hover(item(n)); await page.waitForTimeout(120); }\n    await page.waitForTimeout(1500);\n    const sh = await readState(page);\n    check(route, 'T2 hovers 5\u003e2\u003e8\u003e1 -\u003e solo el activo en 1', sh.active === 1 && onlyActive(sh) && capOk(sh, d, 1), `${fmt(sh)} ops=${ops(sh)}`);\n\n    // T3: sin rotacion durante hover \u003e= 7 s; reanudacion al salir\n    await page.hover('#ind-directory .ind-directory__viewer');\n    const h0 = (await readState(page)).active;\n    await page.waitForTimeout(8000);\n    const h1 = await readState(page);\n    check(route, 'T3 hover 8 s -\u003e sin rotacion', h1.active === h0 && capOk(h1, d, h0), `antes=${h0} tras8s=${h1.active}`);\n    await page.mouse.move(2, 2);\n    const rms = await waitChange(page, h0, 4500);\n    await page.waitForTimeout(900);\n    const sr = await readState(page);\n    check(route, 'T3 salida del hover -\u003e rotacion reanudada <= 3,5 s', rms !== null && rms <= 3700 && sr.active === (h0 + 1) % d.length && capOk(sr, d, sr.active), `reanuda_en_ms=${rms} ${fmt(sr)}`);\n\n    // A3: un solo interval -\u003e tras interacciones repetidas, rotaciones consecutivas separadas ~3,5 s\n    for (const n of [3, 6, 2, 5, 3, 6]) { await page.click(item(n)); await page.waitForTimeout(150); }\n    await page.evaluate(() =\u003e {\n      window.__rot = [];\n      const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];\n      new MutationObserver(() =\u003e window.__rot.push(Math.round(performance.now()))).observe(slides[0].parentElement, { subtree: true, attributes: true, attributeFilter: ['class'], });\n    });\n    await page.mouse.move(2, 2);\n    await page.waitForTimeout(12500);\n    const rot = await page.evaluate(() =\u003e window.__rot);\n    // cada rotacion cambia clase en 2 slides + 2 items: agrupar eventos a < 200 ms\n    const groups = []; for (const t of rot) { if (!groups.length || t - groups[groups.length - 1] \u003e 200) groups.push(t); }\n    const gaps = groups.slice(1).map((t, k) =\u003e t - groups[k]);\n    check(route, 'A3 un solo interval -\u003e separacion ~3500 ms', gaps.length \u003e= 2 && gaps.every((g) =\u003e g \u003e 3300 && g < 3700), `rotaciones=${groups.length} separaciones_ms=[${gaps.join(',')}]`);\n    await ctx.close();\n\n    // reduced motion\n    const rctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });\n    const rp = await rctx.newPage();\n    await rp.goto(url, { waitUntil: 'load' });\n    await rp.locator('#ind-directory').scrollIntoViewIfNeeded();\n    const rmq = await rp.evaluate(() =\u003e matchMedia('(prefers-reduced-motion: reduce)').matches);\n    const seq = [3, 6, 3, 5, 2, 8, 1, 0, 1], res = [];\n    for (const n of seq) {\n      await rp.click(item(n));\n      await rp.waitForTimeout(40); // sin tween: el cambio debe ser instantaneo\n      const s = await readState(rp);\n      res.push(capOk(s, d, n) && onlyActive(s) ? 'ok' : `KO(${n}:${ops(s)})`);\n    }\n    check(route, 'RM cambio instantaneo (40 ms), activo=1 resto=0, caption correcto', rmq && res.every((r) =\u003e r === 'ok'), `matchMedia_reduce=${rmq} seq=${seq.join('\u003e')} res=${res.join(',')}`);\n    await rp.mouse.move(2, 2);\n    const r0 = (await readState(rp)).active;\n    await rp.waitForTimeout(8000);\n    const r1 = await readState(rp);\n    check(route, 'RM sin autorrotacion (8 s)', r1.active === r0 && onlyActive(r1), `antes=${r0} tras8s=${r1.active} ops=${ops(r1)}`);\n    await rctx.close();\n\n    // A4: sin JS\n    const nctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });\n    const np = await nctx.newPage();\n    await np.goto(url, { waitUntil: 'load' });\n    const nj = await readState(np);\n    check(route, 'A4 sin JS -\u003e slide 0 visible, resto 0', nj.active === 0 && onlyActive(nj), `ops=${ops(nj)}`);\n    await nctx.close();\n  }\n} finally { await browser.close(); }\nconsole.log(fails === 0 ? 'RESULTADO: todas las comprobaciones pasan' : `RESULTADO: ${fails} comprobacion(es) fallan`);\nprocess.exit(fails === 0 ? 0 : 1);\nEOF_NODE\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory","head":"cdeddda2d8fe6add84154c109bf748abe9bcdc77","fecha":"2026-10-02T20:03:38-03:00","exit":0,"sha256":"8a89c9e6a011e4967700012b0c373f88b2de6d71027e06ff533268b7abd09624","lineas":31,"omitidas":0,"no_recomprobable":"medicion en navegador con temporizadores reales (3,5 s, 8 s); la salida incluye tiempos no deterministas"} -->
**Evidencia `verify-report.2`** · exit 0 · 31 líneas, 0 omitidas · HEAD `cdeddda2d8fe` · 2026-10-02T20:03:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory`
No re-comprobable: medicion en navegador con temporizadores reales (3,5 s, 8 s); la salida incluye tiempos no deterministas

```bash
# Medicion propia de sdd-verify: preview sobre dist/ + playwright-core con Chrome local; baja el servidor al salir.
set -u
APP=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro
PORT=4412
cd "$APP" || exit 2
node_modules/.bin/astro preview --host 127.0.0.1 --port "$PORT" >/dev/null 2>&1 &
PREVIEW=$!
trap 'kill "$PREVIEW" 2>/dev/null; wait "$PREVIEW" 2>/dev/null' EXIT
for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/industrias/" && break; sleep 0.5; done
BASE_URL="http://127.0.0.1:$PORT" node --input-type=module <<'EOF_NODE'
import { createRequire } from 'node:module';
const require = createRequire(process.cwd() + '/');
const { chromium } = require('/home/kapridoo/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const CHROME = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const BASE = process.env.BASE_URL;
const ROUTES = ['/industrias', '/en/industrias', '/pt/industrias'];
let fails = 0;
const check = (route, label, ok, detail) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'} ${route} | ${label} | ${detail}`); };
const pad = (i) => String(i + 1).padStart(2, '0');

const readState = (page) => page.evaluate(() => {
  const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];
  return {
    active: slides.findIndex((s) => s.classList.contains('is-active')),
    ops: slides.map((s) => Number(getComputedStyle(s).opacity)),
    counter: document.getElementById('dir-counter-active')?.textContent?.trim(),
    eyebrow: document.getElementById('dir-eyebrow')?.textContent?.trim(),
    name: document.getElementById('dir-name')?.textContent?.trim(),
    tags: [...document.querySelectorAll('#dir-tags .ind-directory__tag')].map((t) => t.textContent.trim()),
  };
});
const readData = (page) => page.evaluate(() => {
  const src = [...document.scripts].map((s) => s.textContent).find((t) => t.includes('const industries'));
  const m = src.match(/const industries = (\[[\s\S]*?\]);\s*const sectorPrefix/);
  return JSON.parse(m[1]);
});
const capOk = (st, d, i) => st.active === i && st.counter === pad(i) && st.eyebrow?.endsWith('· ' + pad(i)) && st.name === d[i].name && JSON.stringify(st.tags) === JSON.stringify(d[i].tags ?? []);
const onlyActive = (st) => st.ops.every((o, k) => (k === st.active ? o === 1 : o === 0));
const fmt = (st) => `active=${st.active} counter=${st.counter} name="${st.name}" tags=[${st.tags.join('|')}]`;
const ops = (st) => '[' + st.ops.map((o) => o.toFixed(2)).join(',') + ']';
const item = (n) => `#ind-directory .ind-directory__item[data-item="${n}"]`;
const waitChange = async (page, from, timeout) => {
  const t0 = Date.now();
  try { await page.waitForFunction((f) => [...document.querySelectorAll('#ind-directory .ind-directory__slide')].findIndex((s) => s.classList.contains('is-active')) !== f, from, { timeout, polling: 25 }); return Date.now() - t0; }
  catch { return null; }
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
try {
  for (const route of ROUTES) {
    const url = BASE + route;
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    const d = await readData(page);
    await page.locator('#ind-directory').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // T1: clic en el item N -> caption/contador/tags
    for (const n of [4, 7]) {
      await page.click(item(n));
      await page.waitForTimeout(900);
      const st = await readState(page);
      check(route, `T1 clic item ${n}`, capOk(st, d, n) && onlyActive(st), `${fmt(st)} ops=${ops(st)}`);
    }
    // T1: autorrotacion (3,5 s) sin interaccion
    await page.mouse.move(2, 2);
    const b = (await readState(page)).active;
    const ms = await waitChange(page, b, 4500);
    await page.waitForTimeout(900);
    const sa = await readState(page);
    check(route, 'T1 autorrotacion -> caption sigue al slide visible', ms !== null && capOk(sa, d, sa.active) && sa.active === (b + 1) % d.length && onlyActive(sa), `antes=${b} cambio_en_ms=${ms} ${fmt(sa)} ops=${ops(sa)}`);

    // T2: hovers 5->2->8->1 cada 120 ms
    for (const n of [5, 2, 8, 1]) { await page.hover(item(n)); await page.waitForTimeout(120); }
    await page.waitForTimeout(1500);
    const sh = await readState(page);
    check(route, 'T2 hovers 5>2>8>1 -> solo el activo en 1', sh.active === 1 && onlyActive(sh) && capOk(sh, d, 1), `${fmt(sh)} ops=${ops(sh)}`);

    // T3: sin rotacion durante hover >= 7 s; reanudacion al salir
    await page.hover('#ind-directory .ind-directory__viewer');
    const h0 = (await readState(page)).active;
    await page.waitForTimeout(8000);
    const h1 = await readState(page);
    check(route, 'T3 hover 8 s -> sin rotacion', h1.active === h0 && capOk(h1, d, h0), `antes=${h0} tras8s=${h1.active}`);
    await page.mouse.move(2, 2);
    const rms = await waitChange(page, h0, 4500);
    await page.waitForTimeout(900);
    const sr = await readState(page);
    check(route, 'T3 salida del hover -> rotacion reanudada <= 3,5 s', rms !== null && rms <= 3700 && sr.active === (h0 + 1) % d.length && capOk(sr, d, sr.active), `reanuda_en_ms=${rms} ${fmt(sr)}`);

    // A3: un solo interval -> tras interacciones repetidas, rotaciones consecutivas separadas ~3,5 s
    for (const n of [3, 6, 2, 5, 3, 6]) { await page.click(item(n)); await page.waitForTimeout(150); }
    await page.evaluate(() => {
      window.__rot = [];
      const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];
      new MutationObserver(() => window.__rot.push(Math.round(performance.now()))).observe(slides[0].parentElement, { subtree: true, attributes: true, attributeFilter: ['class'], });
    });
    await page.mouse.move(2, 2);
    await page.waitForTimeout(12500);
    const rot = await page.evaluate(() => window.__rot);
    // cada rotacion cambia clase en 2 slides + 2 items: agrupar eventos a < 200 ms
    const groups = []; for (const t of rot) { if (!groups.length || t - groups[groups.length - 1] > 200) groups.push(t); }
    const gaps = groups.slice(1).map((t, k) => t - groups[k]);
    check(route, 'A3 un solo interval -> separacion ~3500 ms', gaps.length >= 2 && gaps.every((g) => g > 3300 && g < 3700), `rotaciones=${groups.length} separaciones_ms=[${gaps.join(',')}]`);
    await ctx.close();

    // reduced motion
    const rctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const rp = await rctx.newPage();
    await rp.goto(url, { waitUntil: 'load' });
    await rp.locator('#ind-directory').scrollIntoViewIfNeeded();
    const rmq = await rp.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
    const seq = [3, 6, 3, 5, 2, 8, 1, 0, 1], res = [];
    for (const n of seq) {
      await rp.click(item(n));
      await rp.waitForTimeout(40); // sin tween: el cambio debe ser instantaneo
      const s = await readState(rp);
      res.push(capOk(s, d, n) && onlyActive(s) ? 'ok' : `KO(${n}:${ops(s)})`);
    }
    check(route, 'RM cambio instantaneo (40 ms), activo=1 resto=0, caption correcto', rmq && res.every((r) => r === 'ok'), `matchMedia_reduce=${rmq} seq=${seq.join('>')} res=${res.join(',')}`);
    await rp.mouse.move(2, 2);
    const r0 = (await readState(rp)).active;
    await rp.waitForTimeout(8000);
    const r1 = await readState(rp);
    check(route, 'RM sin autorrotacion (8 s)', r1.active === r0 && onlyActive(r1), `antes=${r0} tras8s=${r1.active} ops=${ops(r1)}`);
    await rctx.close();

    // A4: sin JS
    const nctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
    const np = await nctx.newPage();
    await np.goto(url, { waitUntil: 'load' });
    const nj = await readState(np);
    check(route, 'A4 sin JS -> slide 0 visible, resto 0', nj.active === 0 && onlyActive(nj), `ops=${ops(nj)}`);
    await nctx.close();
  }
} finally { await browser.close(); }
console.log(fails === 0 ? 'RESULTADO: todas las comprobaciones pasan' : `RESULTADO: ${fails} comprobacion(es) fallan`);
process.exit(fails === 0 ? 0 : 1);
EOF_NODE
```

```text
PASS /industrias | T1 clic item 4 | active=4 counter=05 name="E-commerce" tags=[Cross-border|Fulfillment] ops=[0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /industrias | T1 clic item 7 | active=7 counter=08 name="Iluminarias" tags=[LED|Industrial|Consolidado Asia] ops=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00]
PASS /industrias | T1 autorrotacion -> caption sigue al slide visible | antes=7 cambio_en_ms=1164 active=8 counter=09 name="Vehículos Usados" tags=[Ro-Ro|Trámites|Almacenaje] ops=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00]
PASS /industrias | T2 hovers 5>2>8>1 -> solo el activo en 1 | active=1 counter=02 name="Retail" tags=[Moda|Consumo|Temporada alta] ops=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /industrias | T3 hover 8 s -> sin rotacion | antes=1 tras8s=1
PASS /industrias | T3 salida del hover -> rotacion reanudada <= 3,5 s | reanuda_en_ms=2828 active=2 counter=03 name="Agroindustria" tags=[Fruta fresca|Vinos|Granos]
PASS /industrias | A3 un solo interval -> separacion ~3500 ms | rotaciones=4 separaciones_ms=[3499,3501,3500]
PASS /industrias | RM cambio instantaneo (40 ms), activo=1 resto=0, caption correcto | matchMedia_reduce=true seq=3>6>3>5>2>8>1>0>1 res=ok,ok,ok,ok,ok,ok,ok,ok,ok
PASS /industrias | RM sin autorrotacion (8 s) | antes=1 tras8s=1 ops=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /industrias | A4 sin JS -> slide 0 visible, resto 0 | ops=[1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /en/industrias | T1 clic item 4 | active=4 counter=05 name="E-commerce" tags=[Cross-border|Fulfillment] ops=[0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /en/industrias | T1 clic item 7 | active=7 counter=08 name="Lighting" tags=[LED|Industrial|Asia consolidation] ops=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00]
PASS /en/industrias | T1 autorrotacion -> caption sigue al slide visible | antes=7 cambio_en_ms=1215 active=8 counter=09 name="Used Vehicles" tags=[Ro-Ro|Paperwork|Warehousing] ops=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00]
PASS /en/industrias | T2 hovers 5>2>8>1 -> solo el activo en 1 | active=1 counter=02 name="Retail" tags=[Fashion|Consumer|Peak season] ops=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /en/industrias | T3 hover 8 s -> sin rotacion | antes=1 tras8s=1
PASS /en/industrias | T3 salida del hover -> rotacion reanudada <= 3,5 s | reanuda_en_ms=2829 active=2 counter=03 name="Agribusiness" tags=[Fresh fruit|Wines|Grains]
PASS /en/industrias | A3 un solo interval -> separacion ~3500 ms | rotaciones=4 separaciones_ms=[3500,3500,3500]
PASS /en/industrias | RM cambio instantaneo (40 ms), activo=1 resto=0, caption correcto | matchMedia_reduce=true seq=3>6>3>5>2>8>1>0>1 res=ok,ok,ok,ok,ok,ok,ok,ok,ok
PASS /en/industrias | RM sin autorrotacion (8 s) | antes=1 tras8s=1 ops=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /en/industrias | A4 sin JS -> slide 0 visible, resto 0 | ops=[1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /pt/industrias | T1 clic item 4 | active=4 counter=05 name="E-commerce" tags=[Cross-border|Fulfillment] ops=[0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /pt/industrias | T1 clic item 7 | active=7 counter=08 name="Iluminação" tags=[LED|Industrial|Consolidado Ásia] ops=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00]
PASS /pt/industrias | T1 autorrotacion -> caption sigue al slide visible | antes=7 cambio_en_ms=1063 active=8 counter=09 name="Veículos Usados" tags=[Ro-Ro|Trâmites|Armazenagem] ops=[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00]
PASS /pt/industrias | T2 hovers 5>2>8>1 -> solo el activo en 1 | active=1 counter=02 name="Varejo" tags=[Moda|Consumo|Alta temporada] ops=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /pt/industrias | T3 hover 8 s -> sin rotacion | antes=1 tras8s=1
PASS /pt/industrias | T3 salida del hover -> rotacion reanudada <= 3,5 s | reanuda_en_ms=2802 active=2 counter=03 name="Agroindústria" tags=[Fruta fresca|Vinhos|Grãos]
PASS /pt/industrias | A3 un solo interval -> separacion ~3500 ms | rotaciones=4 separaciones_ms=[3499,3500,3500]
PASS /pt/industrias | RM cambio instantaneo (40 ms), activo=1 resto=0, caption correcto | matchMedia_reduce=true seq=3>6>3>5>2>8>1>0>1 res=ok,ok,ok,ok,ok,ok,ok,ok,ok
PASS /pt/industrias | RM sin autorrotacion (8 s) | antes=1 tras8s=1 ops=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /pt/industrias | A4 sin JS -> slide 0 visible, resto 0 | ops=[1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
RESULTADO: todas las comprobaciones pasan
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/memory/changes/fix-industries-directory/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory","head":"cdeddda2d8fe6add84154c109bf748abe9bcdc77","fecha":"2026-10-02T20:03:50-03:00","exit":0,"sha256":"14520b3d0d2f52fd51b773424e1d4b6c9fabb1601dc3c38aea2960f15375f4de","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volveria a comprobar este mismo informe"} -->
**Evidencia `verify-report.3`** · exit 0 · 1 líneas, 0 omitidas · HEAD `cdeddda2d8fe` · 2026-10-02T20:03:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory`
No re-comprobable: comprobar sobre verify-report.md volveria a comprobar este mismo informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/memory/changes/fix-industries-directory/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/memory/changes/fix-industries-directory/apply-evidence.md","bloques":3,"comprobados":0,"calzan":[],"no_calzan":[],"omitidos":[{"id":"apply-evidence.1","motivo":"l\u00ednea base sobre el build previo al fix; el \u00e1rbol final corrige los defectos que esta corrida muestra"},{"id":"apply-evidence.2","motivo":"la salida del build incluye marcas de hora y duraciones que cambian en cada corrida"},{"id":"apply-evidence.3","motivo":"la salida incluye tiempos medidos en el navegador que var\u00edan en cada corrida y depende del dist/ construido por el bloque anterior"}],"error":null}
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/memory/changes/fix-industries-directory/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory","head":"cdeddda2d8fe6add84154c109bf748abe9bcdc77","fecha":"2026-10-02T20:03:54-03:00","exit":0,"sha256":"1247108b1cea7aadeaa845fd32df27eaef3b542d97bbc87c78413562f5e198c1","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria el informe a si mismo"} -->
**Evidencia `verify-report.4`** · exit 0 · 1 líneas, 0 omitidas · HEAD `cdeddda2d8fe` · 2026-10-02T20:03:54-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory`
No re-comprobable: re-ejecutarlo comprobaria el informe a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/memory/changes/fix-industries-directory/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/memory/changes/fix-industries-directory/verify-report.md","bloques":3,"comprobados":0,"calzan":[],"no_calzan":[],"omitidos":[{"id":"verify-report.1","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.2","motivo":"medicion en navegador con temporizadores reales (3,5 s, 8 s); la salida incluye tiempos no deterministas"},{"id":"verify-report.3","motivo":"comprobar sobre verify-report.md volveria a comprobar este mismo informe"}],"error":null}
```
<!-- evidencia:fin verify-report.4 -->
