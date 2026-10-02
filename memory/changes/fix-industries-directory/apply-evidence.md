---
type: apply-evidence
change_name: "fix-industries-directory"
created: "2026-10-02"
---

# Apply evidence — fix-industries-directory

Ninguna tarea está marcada `[TDD]` y el proyecto no declara suites de test ni filtro de casos en `_profile.md`; la evidencia de comportamiento es la medición empírica de T4 (script Playwright embebido en cada bloque, que levanta `astro preview` sobre `dist/`, mide `/industrias`, `/en/industrias` y `/pt/industrias` y baja el servidor al salir).

## Línea base (árbol previo al fix, HEAD 2d6b506)

Medición sobre el build del árbol sin cambios, para dejar constancia de los defectos B1 (caption congelado) y N2 (slides fantasma) antes de corregirlos.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"archivo","argv":null,"texto":"# Medición empírica del directorio de industrias (T4): levanta astro preview sobre dist/,\n# corre la medición con playwright-core + Chrome local y baja el servidor al salir.\nset -u\nAPP=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro\nPORT=4391\ncd \"$APP\" || exit 2\nnode_modules/.bin/astro preview --host 127.0.0.1 --port \"$PORT\" \u003e/dev/null 2\u003e&1 &\nPREVIEW=$!\ntrap 'kill \"$PREVIEW\" 2\u003e/dev/null; wait \"$PREVIEW\" 2\u003e/dev/null' EXIT\nfor _ in $(seq 1 60); do curl -s -o /dev/null \"http://127.0.0.1:$PORT/industrias/\" && break; sleep 0.5; done\nBASE_URL=\"http://127.0.0.1:$PORT\" node --input-type=module <<'EOF_NODE'\n// Medición empírica del directorio de industrias (fix-industries-directory, T4).\n// Uso: BASE_URL=<origen del preview\u003e node --input-type=module < este script\n// Sale con código 1 si alguna comprobación falla.\nimport { createRequire } from 'node:module';\n\nconst require = createRequire(process.cwd() + '/');\nconst { chromium } = require('/home/kapridoo/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');\n\nconst CHROME = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst BASE = process.env.BASE_URL;\nconst ROUTES = ['/industrias', '/en/industrias', '/pt/industrias'];\n\nlet fails = 0;\nconst check = (route, label, ok, detail) =\u003e {\n  if (!ok) fails++;\n  console.log(`${ok ? 'PASS' : 'FAIL'} ${route} | ${label} | ${detail}`);\n};\n\nconst pad = (i) =\u003e String(i + 1).padStart(2, '0');\n\n// Estado observable del directorio: slide con .is-active, opacidades computadas y caption\nasync function readState(page) {\n  return page.evaluate(() =\u003e {\n    const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];\n    return {\n      active: slides.findIndex((s) =\u003e s.classList.contains('is-active')),\n      opacities: slides.map((s) =\u003e Number(getComputedStyle(s).opacity)),\n      counter: document.getElementById('dir-counter-active')?.textContent?.trim(),\n      eyebrow: document.getElementById('dir-eyebrow')?.textContent?.trim(),\n      name: document.getElementById('dir-name')?.textContent?.trim(),\n      sub: document.getElementById('dir-sub')?.textContent?.trim(),\n      tags: [...document.querySelectorAll('#dir-tags .ind-directory__tag')].map((t) =\u003e t.textContent.trim()),\n    };\n  });\n}\n\n// Datos de referencia por índice, leídos del script define:vars de la página\nasync function readIndustries(page) {\n  return page.evaluate(() =\u003e {\n    const src = [...document.scripts].map((s) =\u003e s.textContent).find((t) =\u003e t.includes('__indDirectoryOnRender') && t.includes('const industries'));\n    const m = src && src.match(/const industries = (\\[[\\s\\S]*?\\]);\\s*const sectorPrefix/);\n    return m ? JSON.parse(m[1]) : null;\n  });\n}\n\nfunction captionMatches(st, ind, i) {\n  const exp = ind[i];\n  return st.counter === pad(i)\n    && st.eyebrow?.endsWith(`· ${pad(i)}`)\n    && st.name === exp.name\n    && st.sub === exp.sub\n    && JSON.stringify(st.tags) === JSON.stringify(exp.tags ?? []);\n}\n\nconst fmt = (st) =\u003e `active=${st.active} counter=${st.counter} name=${st.name} tags=[${st.tags.join(', ')}]`;\nconst onlyActiveVisible = (st) =\u003e st.opacities.every((o, idx) =\u003e (idx === st.active ? o === 1 : o === 0));\nconst opStr = (st) =\u003e st.opacities.map((o) =\u003e o.toFixed(2)).join(',');\n\n// Espera a que la autorrotación cambie el slide activo (o agota el plazo)\nasync function waitActiveChange(page, from, timeout) {\n  try {\n    await page.waitForFunction((f) =\u003e {\n      const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];\n      return slides.findIndex((s) =\u003e s.classList.contains('is-active')) !== f;\n    }, from, { timeout, polling: 50 });\n    return true;\n  } catch {\n    return false;\n  }\n}\n\nasync function moveOutside(page) {\n  // Esquina superior izquierda: fuera de #ind-directory\n  await page.mouse.move(2, 2);\n}\n\nasync function hoverItem(page, idx) {\n  await page.hover(`#ind-directory .ind-directory__item[data-item=\"${idx}\"]`);\n}\n\nconst browser = await chromium.launch({ executablePath: CHROME, headless: true });\ntry {\n  for (const route of ROUTES) {\n    const url = BASE + route;\n\n    // ── Movimiento normal ──────────────────────────────────────────────\n    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });\n    const page = await ctx.newPage();\n    await page.goto(url, { waitUntil: 'load' });\n    const ind = await readIndustries(page);\n    check(route, 'datos de referencia', Array.isArray(ind) && ind.length \u003e 8, `industrias=${ind?.length}`);\n\n    // 1. Caption tras clic en el ítem N\n    await page.locator('#ind-directory').scrollIntoViewIfNeeded();\n    await page.click('#ind-directory .ind-directory__item[data-item=\"4\"]');\n    await page.waitForTimeout(800);\n    let st = await readState(page);\n    check(route, 'clic ítem 4 → caption/contador/tags', st.active === 4 && captionMatches(st, ind, 4), fmt(st));\n\n    // 2. Caption tras autorrotación (mouse fuera, espera \u003e 3,5 s)\n    await moveOutside(page);\n    const before = (await readState(page)).active;\n    const rotated = await waitActiveChange(page, before, 4000);\n    await page.waitForTimeout(700);\n    st = await readState(page);\n    check(route, 'autorrotación → caption sigue al slide visible',\n      rotated && st.active === (before + 1) % ind.length && onlyActiveVisible(st) && captionMatches(st, ind, st.active),\n      `antes=${before} ${fmt(st)}`);\n\n    // 3. Hovers rápidos 5→2→8→1 cada 120 ms y estabilización\n    for (const idx of [5, 2, 8, 1]) {\n      await hoverItem(page, idx);\n      await page.waitForTimeout(120);\n    }\n    await page.waitForTimeout(1500);\n    st = await readState(page);\n    check(route, 'hovers 5→2→8→1 → solo el activo con opacidad 1', st.active === 1 && onlyActiveVisible(st) && captionMatches(st, ind, 1),\n      `active=${st.active} opacidades=[${opStr(st)}]`);\n\n    // 4. Sin rotación durante el hover; reanudación al salir\n    await page.hover('#ind-directory .ind-directory__viewer');\n    const held = (await readState(page)).active;\n    await page.waitForTimeout(8000);\n    const during = (await readState(page)).active;\n    check(route, 'hover 8 s → sin rotación', during === held, `antes=${held} tras8s=${during}`);\n    await moveOutside(page);\n    const resumed = await waitActiveChange(page, held, 4000);\n    await page.waitForTimeout(700);\n    st = await readState(page);\n    check(route, 'salida del hover → rotación reanudada (≤ 4 s)', resumed && st.active === (held + 1) % ind.length && captionMatches(st, ind, st.active),\n      `antes=${held} ${fmt(st)}`);\n    await ctx.close();\n\n    // ── prefers-reduced-motion: reduce ────────────────────────────────\n    const rctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });\n    const rpage = await rctx.newPage();\n    await rpage.goto(url, { waitUntil: 'load' });\n    await rpage.locator('#ind-directory').scrollIntoViewIfNeeded();\n    // Secuencia que reactiva un slide ya ocultado (3 → 6 → 3) y hovers rápidos\n    const seq = [3, 6, 3, 5, 2, 8, 1];\n    const results = [];\n    for (const idx of seq) {\n      await rpage.click(`#ind-directory .ind-directory__item[data-item=\"${idx}\"]`);\n      await rpage.waitForTimeout(50);\n      const s = await readState(rpage);\n      results.push(s.active === idx && onlyActiveVisible(s) && captionMatches(s, ind, idx) ? 'ok' : `KO(${idx}:[${opStr(s)}])`);\n    }\n    check(route, 'reduced-motion: cambio instantáneo, activo visible, resto 0', results.every((r) =\u003e r === 'ok'),\n      `secuencia=${seq.join('→')} resultados=${results.join(',')}`);\n    await moveOutside(rpage);\n    const rBefore = (await readState(rpage)).active;\n    await rpage.waitForTimeout(4300);\n    const rAfter = (await readState(rpage)).active;\n    check(route, 'reduced-motion: sin autorrotación', rAfter === rBefore, `antes=${rBefore} tras4.3s=${rAfter}`);\n    await rctx.close();\n  }\n} finally {\n  await browser.close();\n}\n\nconsole.log(fails === 0 ? 'RESULTADO: todas las comprobaciones pasan' : `RESULTADO: ${fails} comprobación(es) fallan`);\nprocess.exit(fails === 0 ? 0 : 1);\nEOF_NODE\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory","head":"2d6b506d91077dd28ca45c4e0b6c30c66912c7fc","fecha":"2026-10-02T19:55:28-03:00","exit":1,"sha256":"bc1c223e92c79c506eb1e34ef164e34f454f0a90c4fcb105a073df8c6379b2ff","lineas":25,"omitidas":0,"no_recomprobable":"línea base sobre el build previo al fix; el árbol final corrige los defectos que esta corrida muestra"} -->
**Evidencia `apply-evidence.1`** · exit 1 · 25 líneas, 0 omitidas · HEAD `2d6b506d9107` · 2026-10-02T19:55:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory`
No re-comprobable: línea base sobre el build previo al fix; el árbol final corrige los defectos que esta corrida muestra

```bash
# Medición empírica del directorio de industrias (T4): levanta astro preview sobre dist/,
# corre la medición con playwright-core + Chrome local y baja el servidor al salir.
set -u
APP=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro
PORT=4391
cd "$APP" || exit 2
node_modules/.bin/astro preview --host 127.0.0.1 --port "$PORT" >/dev/null 2>&1 &
PREVIEW=$!
trap 'kill "$PREVIEW" 2>/dev/null; wait "$PREVIEW" 2>/dev/null' EXIT
for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/industrias/" && break; sleep 0.5; done
BASE_URL="http://127.0.0.1:$PORT" node --input-type=module <<'EOF_NODE'
// Medición empírica del directorio de industrias (fix-industries-directory, T4).
// Uso: BASE_URL=<origen del preview> node --input-type=module < este script
// Sale con código 1 si alguna comprobación falla.
import { createRequire } from 'node:module';

const require = createRequire(process.cwd() + '/');
const { chromium } = require('/home/kapridoo/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const CHROME = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const BASE = process.env.BASE_URL;
const ROUTES = ['/industrias', '/en/industrias', '/pt/industrias'];

let fails = 0;
const check = (route, label, ok, detail) => {
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${route} | ${label} | ${detail}`);
};

const pad = (i) => String(i + 1).padStart(2, '0');

// Estado observable del directorio: slide con .is-active, opacidades computadas y caption
async function readState(page) {
  return page.evaluate(() => {
    const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];
    return {
      active: slides.findIndex((s) => s.classList.contains('is-active')),
      opacities: slides.map((s) => Number(getComputedStyle(s).opacity)),
      counter: document.getElementById('dir-counter-active')?.textContent?.trim(),
      eyebrow: document.getElementById('dir-eyebrow')?.textContent?.trim(),
      name: document.getElementById('dir-name')?.textContent?.trim(),
      sub: document.getElementById('dir-sub')?.textContent?.trim(),
      tags: [...document.querySelectorAll('#dir-tags .ind-directory__tag')].map((t) => t.textContent.trim()),
    };
  });
}

// Datos de referencia por índice, leídos del script define:vars de la página
async function readIndustries(page) {
  return page.evaluate(() => {
    const src = [...document.scripts].map((s) => s.textContent).find((t) => t.includes('__indDirectoryOnRender') && t.includes('const industries'));
    const m = src && src.match(/const industries = (\[[\s\S]*?\]);\s*const sectorPrefix/);
    return m ? JSON.parse(m[1]) : null;
  });
}

function captionMatches(st, ind, i) {
  const exp = ind[i];
  return st.counter === pad(i)
    && st.eyebrow?.endsWith(`· ${pad(i)}`)
    && st.name === exp.name
    && st.sub === exp.sub
    && JSON.stringify(st.tags) === JSON.stringify(exp.tags ?? []);
}

const fmt = (st) => `active=${st.active} counter=${st.counter} name=${st.name} tags=[${st.tags.join(', ')}]`;
const onlyActiveVisible = (st) => st.opacities.every((o, idx) => (idx === st.active ? o === 1 : o === 0));
const opStr = (st) => st.opacities.map((o) => o.toFixed(2)).join(',');

// Espera a que la autorrotación cambie el slide activo (o agota el plazo)
async function waitActiveChange(page, from, timeout) {
  try {
    await page.waitForFunction((f) => {
      const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];
      return slides.findIndex((s) => s.classList.contains('is-active')) !== f;
    }, from, { timeout, polling: 50 });
    return true;
  } catch {
    return false;
  }
}

async function moveOutside(page) {
  // Esquina superior izquierda: fuera de #ind-directory
  await page.mouse.move(2, 2);
}

async function hoverItem(page, idx) {
  await page.hover(`#ind-directory .ind-directory__item[data-item="${idx}"]`);
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
try {
  for (const route of ROUTES) {
    const url = BASE + route;

    // ── Movimiento normal ──────────────────────────────────────────────
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    const ind = await readIndustries(page);
    check(route, 'datos de referencia', Array.isArray(ind) && ind.length > 8, `industrias=${ind?.length}`);

    // 1. Caption tras clic en el ítem N
    await page.locator('#ind-directory').scrollIntoViewIfNeeded();
    await page.click('#ind-directory .ind-directory__item[data-item="4"]');
    await page.waitForTimeout(800);
    let st = await readState(page);
    check(route, 'clic ítem 4 → caption/contador/tags', st.active === 4 && captionMatches(st, ind, 4), fmt(st));

    // 2. Caption tras autorrotación (mouse fuera, espera > 3,5 s)
    await moveOutside(page);
    const before = (await readState(page)).active;
    const rotated = await waitActiveChange(page, before, 4000);
    await page.waitForTimeout(700);
    st = await readState(page);
    check(route, 'autorrotación → caption sigue al slide visible',
      rotated && st.active === (before + 1) % ind.length && onlyActiveVisible(st) && captionMatches(st, ind, st.active),
      `antes=${before} ${fmt(st)}`);

    // 3. Hovers rápidos 5→2→8→1 cada 120 ms y estabilización
    for (const idx of [5, 2, 8, 1]) {
      await hoverItem(page, idx);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1500);
    st = await readState(page);
    check(route, 'hovers 5→2→8→1 → solo el activo con opacidad 1', st.active === 1 && onlyActiveVisible(st) && captionMatches(st, ind, 1),
      `active=${st.active} opacidades=[${opStr(st)}]`);

    // 4. Sin rotación durante el hover; reanudación al salir
    await page.hover('#ind-directory .ind-directory__viewer');
    const held = (await readState(page)).active;
    await page.waitForTimeout(8000);
    const during = (await readState(page)).active;
    check(route, 'hover 8 s → sin rotación', during === held, `antes=${held} tras8s=${during}`);
    await moveOutside(page);
    const resumed = await waitActiveChange(page, held, 4000);
    await page.waitForTimeout(700);
    st = await readState(page);
    check(route, 'salida del hover → rotación reanudada (≤ 4 s)', resumed && st.active === (held + 1) % ind.length && captionMatches(st, ind, st.active),
      `antes=${held} ${fmt(st)}`);
    await ctx.close();

    // ── prefers-reduced-motion: reduce ────────────────────────────────
    const rctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const rpage = await rctx.newPage();
    await rpage.goto(url, { waitUntil: 'load' });
    await rpage.locator('#ind-directory').scrollIntoViewIfNeeded();
    // Secuencia que reactiva un slide ya ocultado (3 → 6 → 3) y hovers rápidos
    const seq = [3, 6, 3, 5, 2, 8, 1];
    const results = [];
    for (const idx of seq) {
      await rpage.click(`#ind-directory .ind-directory__item[data-item="${idx}"]`);
      await rpage.waitForTimeout(50);
      const s = await readState(rpage);
      results.push(s.active === idx && onlyActiveVisible(s) && captionMatches(s, ind, idx) ? 'ok' : `KO(${idx}:[${opStr(s)}])`);
    }
    check(route, 'reduced-motion: cambio instantáneo, activo visible, resto 0', results.every((r) => r === 'ok'),
      `secuencia=${seq.join('→')} resultados=${results.join(',')}`);
    await moveOutside(rpage);
    const rBefore = (await readState(rpage)).active;
    await rpage.waitForTimeout(4300);
    const rAfter = (await readState(rpage)).active;
    check(route, 'reduced-motion: sin autorrotación', rAfter === rBefore, `antes=${rBefore} tras4.3s=${rAfter}`);
    await rctx.close();
  }
} finally {
  await browser.close();
}

console.log(fails === 0 ? 'RESULTADO: todas las comprobaciones pasan' : `RESULTADO: ${fails} comprobación(es) fallan`);
process.exit(fails === 0 ? 0 : 1);
EOF_NODE
```

```text
PASS /industrias | datos de referencia | industrias=12
FAIL /industrias | clic ítem 4 → caption/contador/tags | active=4 counter=01 name=Minería tags=[Cobre, Litio]
FAIL /industrias | autorrotación → caption sigue al slide visible | antes=4 active=5 counter=01 name=Minería tags=[Cobre, Litio]
FAIL /industrias | hovers 5→2→8→1 → solo el activo con opacidad 1 | active=1 opacidades=[0.00,1.00,0.61,0.00,0.00,0.96,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /industrias | hover 8 s → sin rotación | antes=1 tras8s=1
FAIL /industrias | salida del hover → rotación reanudada (≤ 4 s) | antes=1 active=2 counter=01 name=Minería tags=[Cobre, Litio]
FAIL /industrias | reduced-motion: cambio instantáneo, activo visible, resto 0 | secuencia=3→6→3→5→2→8→1 resultados=KO(3:[0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(6:[0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00]),KO(3:[0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(5:[0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(2:[0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(8:[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00]),KO(1:[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00])
PASS /industrias | reduced-motion: sin autorrotación | antes=1 tras4.3s=1
PASS /en/industrias | datos de referencia | industrias=12
FAIL /en/industrias | clic ítem 4 → caption/contador/tags | active=4 counter=01 name=Mining tags=[Copper, Lithium]
FAIL /en/industrias | autorrotación → caption sigue al slide visible | antes=4 active=5 counter=01 name=Mining tags=[Copper, Lithium]
FAIL /en/industrias | hovers 5→2→8→1 → solo el activo con opacidad 1 | active=1 opacidades=[0.00,1.00,0.59,0.00,0.00,0.96,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /en/industrias | hover 8 s → sin rotación | antes=1 tras8s=1
FAIL /en/industrias | salida del hover → rotación reanudada (≤ 4 s) | antes=1 active=2 counter=01 name=Mining tags=[Copper, Lithium]
FAIL /en/industrias | reduced-motion: cambio instantáneo, activo visible, resto 0 | secuencia=3→6→3→5→2→8→1 resultados=KO(3:[0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(6:[0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00]),KO(3:[0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(5:[0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(2:[0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(8:[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00]),KO(1:[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00])
PASS /en/industrias | reduced-motion: sin autorrotación | antes=1 tras4.3s=1
PASS /pt/industrias | datos de referencia | industrias=12
FAIL /pt/industrias | clic ítem 4 → caption/contador/tags | active=4 counter=01 name=Mineração tags=[Cobre, Lítio]
FAIL /pt/industrias | autorrotación → caption sigue al slide visible | antes=4 active=5 counter=01 name=Mineração tags=[Cobre, Lítio]
FAIL /pt/industrias | hovers 5→2→8→1 → solo el activo con opacidad 1 | active=1 opacidades=[0.00,1.00,0.59,0.00,0.00,0.96,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /pt/industrias | hover 8 s → sin rotación | antes=1 tras8s=1
FAIL /pt/industrias | salida del hover → rotación reanudada (≤ 4 s) | antes=1 active=2 counter=01 name=Mineração tags=[Cobre, Lítio]
FAIL /pt/industrias | reduced-motion: cambio instantáneo, activo visible, resto 0 | secuencia=3→6→3→5→2→8→1 resultados=KO(3:[0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(6:[0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00]),KO(3:[0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(5:[0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(2:[0.00,0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]),KO(8:[0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00]),KO(1:[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00])
PASS /pt/industrias | reduced-motion: sin autorrotación | antes=1 tras4.3s=1
RESULTADO: 15 comprobación(es) fallan
```
<!-- evidencia:fin apply-evidence.1 -->

La línea base (bloque `apply-evidence.1`) muestra, en las tres rutas: caption, contador y tags fijos en el ítem 01 tras clic, tras autorrotación y tras reanudar (B1); opacidades intermedias en los slides 2 y 5 tras la secuencia de hovers 5→2→8→1 (N2); y el flag `paused` ya cumpliendo el comportamiento observable de A3 (sin rotación durante 8 s de hover, avance al salir). Los fallos de la corrida con `prefers-reduced-motion` provienen solo del caption: las opacidades ya eran correctas.

## T1 — Lookup lazy del callback de caption

Commit `9c08a6c` — `fix(industrias): resolve directory caption callback lazily on each render`. `initIndustrias()` pasa `onRender: (i) => window.__indDirectoryOnRender?.(i)` (con el cast de `Window` del archivo) y el comentario del script inline describe el lookup lazy en lugar de un «orden crítico». Evidencia de comportamiento: comprobaciones de caption del bloque de T4.

## T2 — Opacidad 0 en los slides no involucrados

Commit `a725d87` — `fix(industrias): hide uninvolved directory slides after killing tweens`. Tras `killTweensOf`, `gsap.set` fuerza `opacity: 0` en los slides que no son saliente ni entrante. Con `prefers-reduced-motion`, el saliente y el entrante también se fijan inline (0 y 1): sin eso, un slide ocultado por ese `set` quedaría invisible al volver a ser activo, porque el estilo inline prevalece sobre `.is-active`. La secuencia 3→6→3 de la corrida con movimiento reducido cubre ese caso.

## T3 — AC A3 de interactive-component-transitions

Commit `931439c` — `docs(spec): restate directory autorotation AC A3 as observable behavior`. La línea base confirma que el flag `paused` da el comportamiento observable, así que el timer no se reescribe: A3 pasa a describir pausa durante hover/foco, reanudación al salir, un solo interval (cadencia ~3,5 s), `destroy()` como limpieza, y deja constancia de que `astro:before-swap` no se emite en el sitio sin router. La spec queda en `status: review` (§D del protocolo: `completed` lo escribe `sdd-archive`). Evaluación de A1–A4 y B1–B4 contra el código actual: A1, A2 (tras T2), A3 (reescrito) y A4 se cumplen y se miden en T4; B1–B4 (stepper de `/cotizar`, `gsap-stepper.ts` + `wizard.ts`) se cumplen por lectura de código (dirección ±40 px, `hidden` en el midpoint, guard `isAnimating`, rama de movimiento reducido, `canAdvance()` intacto) y no forman parte de la medición de este cambio.

## T4 — Verificación empírica en es/en/pt

Build del árbol final:

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro","head":"931439c65d9dccdba4d1dc721b738575f8fafe89","fecha":"2026-10-02T19:57:18-03:00","exit":0,"sha256":"db2354ed4130a92893503b8f9a142c3ec6df9071a090d272df3fe0364f6a5dac","lineas":146,"omitidas":106,"no_recomprobable":"la salida del build incluye marcas de hora y duraciones que cambian en cada corrida"} -->
**Evidencia `apply-evidence.2`** · exit 0 · 146 líneas, 106 omitidas · HEAD `931439c65d9d` · 2026-10-02T19:57:18-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro`
No re-comprobable: la salida del build incluye marcas de hora y duraciones que cambian en cada corrida

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

19:57:09 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
19:57:09 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
19:57:11 [types] Generated 1.79s
19:57:11 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
19:57:11 [build] output: "static"
19:57:11 [build] mode: "server"
19:57:11 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro/dist/
19:57:11 [build] adapter: @astrojs/cloudflare
19:57:11 [build] Collecting build info...
19:57:11 [build] ✓ Completed in 2.45s.
19:57:11 [build] Building server entrypoints...
19:57:15 [vite] ✓ built in 3.29s
19:57:16 [vite] ✓ built in 1.22s
19:57:17 [vite] ✓ built in 1.07s

 prerendering static routes 
19:57:18   ├─ /404.html (+28ms) 
19:57:18   ├─ /contacto/index.html (+16ms) 
19:57:18   ├─ /cotizar/index.html (+15ms) 
19:57:18   ├─ /industrias/index.html (+26ms) 
19:57:18   ├─ /nosotros/index.html (+16ms) 
19:57:18   ├─ /servicios/index.html (+23ms) 
19:57:18   ├─ /en/404/index.html (+13ms) 
19:57:18   ├─ /pt/404/index.html (+13ms) 
19:57:18   ├─ /en/contacto/index.html (+12ms) 
19:57:18   ├─ /pt/contacto/index.html (+12ms) 
19:57:18   ├─ /en/cotizar/index.html (+11ms) 
19:57:18   ├─ /pt/cotizar/index.html (+11ms) 
19:57:18   ├─ /en/industrias/index.html (+17ms) 
19:57:18   ├─ /pt/industrias/index.html (+13ms) 
19:57:18   ├─ /en/nosotros/index.html (+14ms) 
19:57:18   ├─ /pt/nosotros/index.html (+11ms) 
19:57:18   ├─ /en/servicios/index.html (+15ms) 
19:57:18   ├─ /pt/servicios/index.html (+20ms) 
```
<!-- evidencia:fin apply-evidence.2 -->

Medición del árbol final (mismo script que la línea base, más la comprobación de cadencia del interval):

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"archivo","argv":null,"texto":"# Medición empírica del directorio de industrias (T4): levanta astro preview sobre dist/,\n# corre la medición con playwright-core + Chrome local y baja el servidor al salir.\nset -u\nAPP=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro\nPORT=4391\ncd \"$APP\" || exit 2\nnode_modules/.bin/astro preview --host 127.0.0.1 --port \"$PORT\" \u003e/dev/null 2\u003e&1 &\nPREVIEW=$!\ntrap 'kill \"$PREVIEW\" 2\u003e/dev/null; wait \"$PREVIEW\" 2\u003e/dev/null' EXIT\nfor _ in $(seq 1 60); do curl -s -o /dev/null \"http://127.0.0.1:$PORT/industrias/\" && break; sleep 0.5; done\nBASE_URL=\"http://127.0.0.1:$PORT\" node --input-type=module <<'EOF_NODE'\n// Medición empírica del directorio de industrias (fix-industries-directory, T4).\n// Uso: BASE_URL=<origen del preview\u003e node --input-type=module < este script\n// Sale con código 1 si alguna comprobación falla.\nimport { createRequire } from 'node:module';\n\nconst require = createRequire(process.cwd() + '/');\nconst { chromium } = require('/home/kapridoo/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');\n\nconst CHROME = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst BASE = process.env.BASE_URL;\nconst ROUTES = ['/industrias', '/en/industrias', '/pt/industrias'];\n\nlet fails = 0;\nconst check = (route, label, ok, detail) =\u003e {\n  if (!ok) fails++;\n  console.log(`${ok ? 'PASS' : 'FAIL'} ${route} | ${label} | ${detail}`);\n};\n\nconst pad = (i) =\u003e String(i + 1).padStart(2, '0');\n\n// Estado observable del directorio: slide con .is-active, opacidades computadas y caption\nasync function readState(page) {\n  return page.evaluate(() =\u003e {\n    const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];\n    return {\n      active: slides.findIndex((s) =\u003e s.classList.contains('is-active')),\n      opacities: slides.map((s) =\u003e Number(getComputedStyle(s).opacity)),\n      counter: document.getElementById('dir-counter-active')?.textContent?.trim(),\n      eyebrow: document.getElementById('dir-eyebrow')?.textContent?.trim(),\n      name: document.getElementById('dir-name')?.textContent?.trim(),\n      sub: document.getElementById('dir-sub')?.textContent?.trim(),\n      tags: [...document.querySelectorAll('#dir-tags .ind-directory__tag')].map((t) =\u003e t.textContent.trim()),\n    };\n  });\n}\n\n// Datos de referencia por índice, leídos del script define:vars de la página\nasync function readIndustries(page) {\n  return page.evaluate(() =\u003e {\n    const src = [...document.scripts].map((s) =\u003e s.textContent).find((t) =\u003e t.includes('__indDirectoryOnRender') && t.includes('const industries'));\n    const m = src && src.match(/const industries = (\\[[\\s\\S]*?\\]);\\s*const sectorPrefix/);\n    return m ? JSON.parse(m[1]) : null;\n  });\n}\n\nfunction captionMatches(st, ind, i) {\n  const exp = ind[i];\n  return st.counter === pad(i)\n    && st.eyebrow?.endsWith(`· ${pad(i)}`)\n    && st.name === exp.name\n    && st.sub === exp.sub\n    && JSON.stringify(st.tags) === JSON.stringify(exp.tags ?? []);\n}\n\nconst fmt = (st) =\u003e `active=${st.active} counter=${st.counter} name=${st.name} tags=[${st.tags.join(', ')}]`;\nconst onlyActiveVisible = (st) =\u003e st.opacities.every((o, idx) =\u003e (idx === st.active ? o === 1 : o === 0));\nconst opStr = (st) =\u003e st.opacities.map((o) =\u003e o.toFixed(2)).join(',');\n\n// Espera a que la autorrotación cambie el slide activo (o agota el plazo)\nasync function waitActiveChange(page, from, timeout) {\n  try {\n    await page.waitForFunction((f) =\u003e {\n      const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];\n      return slides.findIndex((s) =\u003e s.classList.contains('is-active')) !== f;\n    }, from, { timeout, polling: 50 });\n    return true;\n  } catch {\n    return false;\n  }\n}\n\nasync function moveOutside(page) {\n  // Esquina superior izquierda: fuera de #ind-directory\n  await page.mouse.move(2, 2);\n}\n\nasync function hoverItem(page, idx) {\n  await page.hover(`#ind-directory .ind-directory__item[data-item=\"${idx}\"]`);\n}\n\nconst browser = await chromium.launch({ executablePath: CHROME, headless: true });\ntry {\n  for (const route of ROUTES) {\n    const url = BASE + route;\n\n    // ── Movimiento normal ──────────────────────────────────────────────\n    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });\n    const page = await ctx.newPage();\n    await page.goto(url, { waitUntil: 'load' });\n    const ind = await readIndustries(page);\n    check(route, 'datos de referencia', Array.isArray(ind) && ind.length \u003e 8, `industrias=${ind?.length}`);\n\n    // 1. Caption tras clic en el ítem N\n    await page.locator('#ind-directory').scrollIntoViewIfNeeded();\n    await page.click('#ind-directory .ind-directory__item[data-item=\"4\"]');\n    await page.waitForTimeout(800);\n    let st = await readState(page);\n    check(route, 'clic ítem 4 → caption/contador/tags', st.active === 4 && captionMatches(st, ind, 4), fmt(st));\n\n    // 2. Caption tras autorrotación (mouse fuera, espera \u003e 3,5 s)\n    await moveOutside(page);\n    const before = (await readState(page)).active;\n    const rotated = await waitActiveChange(page, before, 4000);\n    await page.waitForTimeout(700);\n    st = await readState(page);\n    check(route, 'autorrotación → caption sigue al slide visible',\n      rotated && st.active === (before + 1) % ind.length && onlyActiveVisible(st) && captionMatches(st, ind, st.active),\n      `antes=${before} ${fmt(st)}`);\n\n    // 3. Hovers rápidos 5→2→8→1 cada 120 ms y estabilización\n    for (const idx of [5, 2, 8, 1]) {\n      await hoverItem(page, idx);\n      await page.waitForTimeout(120);\n    }\n    await page.waitForTimeout(1500);\n    st = await readState(page);\n    check(route, 'hovers 5→2→8→1 → solo el activo con opacidad 1', st.active === 1 && onlyActiveVisible(st) && captionMatches(st, ind, 1),\n      `active=${st.active} opacidades=[${opStr(st)}]`);\n\n    // 4. Sin rotación durante el hover; reanudación al salir\n    await page.hover('#ind-directory .ind-directory__viewer');\n    const held = (await readState(page)).active;\n    await page.waitForTimeout(8000);\n    const during = (await readState(page)).active;\n    check(route, 'hover 8 s → sin rotación', during === held, `antes=${held} tras8s=${during}`);\n    await moveOutside(page);\n    const resumed = await waitActiveChange(page, held, 4000);\n    await page.waitForTimeout(700);\n    st = await readState(page);\n    check(route, 'salida del hover → rotación reanudada (≤ 4 s)', resumed && st.active === (held + 1) % ind.length && captionMatches(st, ind, st.active),\n      `antes=${held} ${fmt(st)}`);\n\n    // 5. Un solo interval: tras interacciones repetidas, dos rotaciones consecutivas separadas ~3,5 s\n    const a = (await readState(page)).active;\n    await waitActiveChange(page, a, 4000);\n    const t0 = Date.now();\n    const b = (await readState(page)).active;\n    const second = await waitActiveChange(page, b, 4500);\n    const gap = Date.now() - t0;\n    check(route, 'cadencia de autorrotación (un solo interval)', second && gap \u003e= 3200 && gap <= 3800, `separación=${gap}ms`);\n    await ctx.close();\n\n    // ── prefers-reduced-motion: reduce ────────────────────────────────\n    const rctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });\n    const rpage = await rctx.newPage();\n    await rpage.goto(url, { waitUntil: 'load' });\n    await rpage.locator('#ind-directory').scrollIntoViewIfNeeded();\n    // Secuencia que reactiva un slide ya ocultado (3 → 6 → 3) y hovers rápidos\n    const seq = [3, 6, 3, 5, 2, 8, 1];\n    const results = [];\n    for (const idx of seq) {\n      await rpage.click(`#ind-directory .ind-directory__item[data-item=\"${idx}\"]`);\n      await rpage.waitForTimeout(50);\n      const s = await readState(rpage);\n      results.push(s.active === idx && onlyActiveVisible(s) && captionMatches(s, ind, idx) ? 'ok' : `KO(${idx}:[${opStr(s)}])`);\n    }\n    check(route, 'reduced-motion: cambio instantáneo, activo visible, resto 0', results.every((r) =\u003e r === 'ok'),\n      `secuencia=${seq.join('→')} resultados=${results.join(',')}`);\n    await moveOutside(rpage);\n    const rBefore = (await readState(rpage)).active;\n    await rpage.waitForTimeout(4300);\n    const rAfter = (await readState(rpage)).active;\n    check(route, 'reduced-motion: sin autorrotación', rAfter === rBefore, `antes=${rBefore} tras4.3s=${rAfter}`);\n    await rctx.close();\n  }\n} finally {\n  await browser.close();\n}\n\nconsole.log(fails === 0 ? 'RESULTADO: todas las comprobaciones pasan' : `RESULTADO: ${fails} comprobación(es) fallan`);\nprocess.exit(fails === 0 ? 0 : 1);\nEOF_NODE\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory","head":"931439c65d9dccdba4d1dc721b738575f8fafe89","fecha":"2026-10-02T19:58:59-03:00","exit":0,"sha256":"630939c10e30f426eb6f9a72a4fe3fda998cb780e092f34b2fec0af5278ec56f","lineas":28,"omitidas":0,"no_recomprobable":"la salida incluye tiempos medidos en el navegador que varían en cada corrida y depende del dist/ construido por el bloque anterior"} -->
**Evidencia `apply-evidence.3`** · exit 0 · 28 líneas, 0 omitidas · HEAD `931439c65d9d` · 2026-10-02T19:58:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory`
No re-comprobable: la salida incluye tiempos medidos en el navegador que varían en cada corrida y depende del dist/ construido por el bloque anterior

```bash
# Medición empírica del directorio de industrias (T4): levanta astro preview sobre dist/,
# corre la medición con playwright-core + Chrome local y baja el servidor al salir.
set -u
APP=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-industries-directory/log-atm-web-astro
PORT=4391
cd "$APP" || exit 2
node_modules/.bin/astro preview --host 127.0.0.1 --port "$PORT" >/dev/null 2>&1 &
PREVIEW=$!
trap 'kill "$PREVIEW" 2>/dev/null; wait "$PREVIEW" 2>/dev/null' EXIT
for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/industrias/" && break; sleep 0.5; done
BASE_URL="http://127.0.0.1:$PORT" node --input-type=module <<'EOF_NODE'
// Medición empírica del directorio de industrias (fix-industries-directory, T4).
// Uso: BASE_URL=<origen del preview> node --input-type=module < este script
// Sale con código 1 si alguna comprobación falla.
import { createRequire } from 'node:module';

const require = createRequire(process.cwd() + '/');
const { chromium } = require('/home/kapridoo/.npm/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const CHROME = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const BASE = process.env.BASE_URL;
const ROUTES = ['/industrias', '/en/industrias', '/pt/industrias'];

let fails = 0;
const check = (route, label, ok, detail) => {
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${route} | ${label} | ${detail}`);
};

const pad = (i) => String(i + 1).padStart(2, '0');

// Estado observable del directorio: slide con .is-active, opacidades computadas y caption
async function readState(page) {
  return page.evaluate(() => {
    const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];
    return {
      active: slides.findIndex((s) => s.classList.contains('is-active')),
      opacities: slides.map((s) => Number(getComputedStyle(s).opacity)),
      counter: document.getElementById('dir-counter-active')?.textContent?.trim(),
      eyebrow: document.getElementById('dir-eyebrow')?.textContent?.trim(),
      name: document.getElementById('dir-name')?.textContent?.trim(),
      sub: document.getElementById('dir-sub')?.textContent?.trim(),
      tags: [...document.querySelectorAll('#dir-tags .ind-directory__tag')].map((t) => t.textContent.trim()),
    };
  });
}

// Datos de referencia por índice, leídos del script define:vars de la página
async function readIndustries(page) {
  return page.evaluate(() => {
    const src = [...document.scripts].map((s) => s.textContent).find((t) => t.includes('__indDirectoryOnRender') && t.includes('const industries'));
    const m = src && src.match(/const industries = (\[[\s\S]*?\]);\s*const sectorPrefix/);
    return m ? JSON.parse(m[1]) : null;
  });
}

function captionMatches(st, ind, i) {
  const exp = ind[i];
  return st.counter === pad(i)
    && st.eyebrow?.endsWith(`· ${pad(i)}`)
    && st.name === exp.name
    && st.sub === exp.sub
    && JSON.stringify(st.tags) === JSON.stringify(exp.tags ?? []);
}

const fmt = (st) => `active=${st.active} counter=${st.counter} name=${st.name} tags=[${st.tags.join(', ')}]`;
const onlyActiveVisible = (st) => st.opacities.every((o, idx) => (idx === st.active ? o === 1 : o === 0));
const opStr = (st) => st.opacities.map((o) => o.toFixed(2)).join(',');

// Espera a que la autorrotación cambie el slide activo (o agota el plazo)
async function waitActiveChange(page, from, timeout) {
  try {
    await page.waitForFunction((f) => {
      const slides = [...document.querySelectorAll('#ind-directory .ind-directory__slide')];
      return slides.findIndex((s) => s.classList.contains('is-active')) !== f;
    }, from, { timeout, polling: 50 });
    return true;
  } catch {
    return false;
  }
}

async function moveOutside(page) {
  // Esquina superior izquierda: fuera de #ind-directory
  await page.mouse.move(2, 2);
}

async function hoverItem(page, idx) {
  await page.hover(`#ind-directory .ind-directory__item[data-item="${idx}"]`);
}

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
try {
  for (const route of ROUTES) {
    const url = BASE + route;

    // ── Movimiento normal ──────────────────────────────────────────────
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    const ind = await readIndustries(page);
    check(route, 'datos de referencia', Array.isArray(ind) && ind.length > 8, `industrias=${ind?.length}`);

    // 1. Caption tras clic en el ítem N
    await page.locator('#ind-directory').scrollIntoViewIfNeeded();
    await page.click('#ind-directory .ind-directory__item[data-item="4"]');
    await page.waitForTimeout(800);
    let st = await readState(page);
    check(route, 'clic ítem 4 → caption/contador/tags', st.active === 4 && captionMatches(st, ind, 4), fmt(st));

    // 2. Caption tras autorrotación (mouse fuera, espera > 3,5 s)
    await moveOutside(page);
    const before = (await readState(page)).active;
    const rotated = await waitActiveChange(page, before, 4000);
    await page.waitForTimeout(700);
    st = await readState(page);
    check(route, 'autorrotación → caption sigue al slide visible',
      rotated && st.active === (before + 1) % ind.length && onlyActiveVisible(st) && captionMatches(st, ind, st.active),
      `antes=${before} ${fmt(st)}`);

    // 3. Hovers rápidos 5→2→8→1 cada 120 ms y estabilización
    for (const idx of [5, 2, 8, 1]) {
      await hoverItem(page, idx);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1500);
    st = await readState(page);
    check(route, 'hovers 5→2→8→1 → solo el activo con opacidad 1', st.active === 1 && onlyActiveVisible(st) && captionMatches(st, ind, 1),
      `active=${st.active} opacidades=[${opStr(st)}]`);

    // 4. Sin rotación durante el hover; reanudación al salir
    await page.hover('#ind-directory .ind-directory__viewer');
    const held = (await readState(page)).active;
    await page.waitForTimeout(8000);
    const during = (await readState(page)).active;
    check(route, 'hover 8 s → sin rotación', during === held, `antes=${held} tras8s=${during}`);
    await moveOutside(page);
    const resumed = await waitActiveChange(page, held, 4000);
    await page.waitForTimeout(700);
    st = await readState(page);
    check(route, 'salida del hover → rotación reanudada (≤ 4 s)', resumed && st.active === (held + 1) % ind.length && captionMatches(st, ind, st.active),
      `antes=${held} ${fmt(st)}`);

    // 5. Un solo interval: tras interacciones repetidas, dos rotaciones consecutivas separadas ~3,5 s
    const a = (await readState(page)).active;
    await waitActiveChange(page, a, 4000);
    const t0 = Date.now();
    const b = (await readState(page)).active;
    const second = await waitActiveChange(page, b, 4500);
    const gap = Date.now() - t0;
    check(route, 'cadencia de autorrotación (un solo interval)', second && gap >= 3200 && gap <= 3800, `separación=${gap}ms`);
    await ctx.close();

    // ── prefers-reduced-motion: reduce ────────────────────────────────
    const rctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const rpage = await rctx.newPage();
    await rpage.goto(url, { waitUntil: 'load' });
    await rpage.locator('#ind-directory').scrollIntoViewIfNeeded();
    // Secuencia que reactiva un slide ya ocultado (3 → 6 → 3) y hovers rápidos
    const seq = [3, 6, 3, 5, 2, 8, 1];
    const results = [];
    for (const idx of seq) {
      await rpage.click(`#ind-directory .ind-directory__item[data-item="${idx}"]`);
      await rpage.waitForTimeout(50);
      const s = await readState(rpage);
      results.push(s.active === idx && onlyActiveVisible(s) && captionMatches(s, ind, idx) ? 'ok' : `KO(${idx}:[${opStr(s)}])`);
    }
    check(route, 'reduced-motion: cambio instantáneo, activo visible, resto 0', results.every((r) => r === 'ok'),
      `secuencia=${seq.join('→')} resultados=${results.join(',')}`);
    await moveOutside(rpage);
    const rBefore = (await readState(rpage)).active;
    await rpage.waitForTimeout(4300);
    const rAfter = (await readState(rpage)).active;
    check(route, 'reduced-motion: sin autorrotación', rAfter === rBefore, `antes=${rBefore} tras4.3s=${rAfter}`);
    await rctx.close();
  }
} finally {
  await browser.close();
}

console.log(fails === 0 ? 'RESULTADO: todas las comprobaciones pasan' : `RESULTADO: ${fails} comprobación(es) fallan`);
process.exit(fails === 0 ? 0 : 1);
EOF_NODE
```

```text
PASS /industrias | datos de referencia | industrias=12
PASS /industrias | clic ítem 4 → caption/contador/tags | active=4 counter=05 name=E-commerce tags=[Cross-border, Fulfillment]
PASS /industrias | autorrotación → caption sigue al slide visible | antes=4 active=5 counter=06 name=Construcción tags=[Maquinaria, Materiales, Open-top]
PASS /industrias | hovers 5→2→8→1 → solo el activo con opacidad 1 | active=1 opacidades=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /industrias | hover 8 s → sin rotación | antes=1 tras8s=1
PASS /industrias | salida del hover → rotación reanudada (≤ 4 s) | antes=1 active=2 counter=03 name=Agroindustria tags=[Fruta fresca, Vinos, Granos]
PASS /industrias | cadencia de autorrotación (un solo interval) | separación=3470ms
PASS /industrias | reduced-motion: cambio instantáneo, activo visible, resto 0 | secuencia=3→6→3→5→2→8→1 resultados=ok,ok,ok,ok,ok,ok,ok
PASS /industrias | reduced-motion: sin autorrotación | antes=1 tras4.3s=1
PASS /en/industrias | datos de referencia | industrias=12
PASS /en/industrias | clic ítem 4 → caption/contador/tags | active=4 counter=05 name=E-commerce tags=[Cross-border, Fulfillment]
PASS /en/industrias | autorrotación → caption sigue al slide visible | antes=4 active=5 counter=06 name=Construction tags=[Machinery, Materials, Open-top]
PASS /en/industrias | hovers 5→2→8→1 → solo el activo con opacidad 1 | active=1 opacidades=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /en/industrias | hover 8 s → sin rotación | antes=1 tras8s=1
PASS /en/industrias | salida del hover → rotación reanudada (≤ 4 s) | antes=1 active=2 counter=03 name=Agribusiness tags=[Fresh fruit, Wines, Grains]
PASS /en/industrias | cadencia de autorrotación (un solo interval) | separación=3471ms
PASS /en/industrias | reduced-motion: cambio instantáneo, activo visible, resto 0 | secuencia=3→6→3→5→2→8→1 resultados=ok,ok,ok,ok,ok,ok,ok
PASS /en/industrias | reduced-motion: sin autorrotación | antes=1 tras4.3s=1
PASS /pt/industrias | datos de referencia | industrias=12
PASS /pt/industrias | clic ítem 4 → caption/contador/tags | active=4 counter=05 name=E-commerce tags=[Cross-border, Fulfillment]
PASS /pt/industrias | autorrotación → caption sigue al slide visible | antes=4 active=5 counter=06 name=Construção tags=[Maquinário, Materiais, Open-top]
PASS /pt/industrias | hovers 5→2→8→1 → solo el activo con opacidad 1 | active=1 opacidades=[0.00,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00]
PASS /pt/industrias | hover 8 s → sin rotación | antes=1 tras8s=1
PASS /pt/industrias | salida del hover → rotación reanudada (≤ 4 s) | antes=1 active=2 counter=03 name=Agroindústria tags=[Fruta fresca, Vinhos, Grãos]
PASS /pt/industrias | cadencia de autorrotación (un solo interval) | separación=3470ms
PASS /pt/industrias | reduced-motion: cambio instantáneo, activo visible, resto 0 | secuencia=3→6→3→5→2→8→1 resultados=ok,ok,ok,ok,ok,ok,ok
PASS /pt/industrias | reduced-motion: sin autorrotación | antes=1 tras4.3s=1
RESULTADO: todas las comprobaciones pasan
```
<!-- evidencia:fin apply-evidence.3 -->

El build del árbol final termina con exit 0 (bloque `apply-evidence.2`). La medición final (bloque `apply-evidence.3`) pasa todas sus comprobaciones en `/industrias`, `/en/industrias` y `/pt/industrias`: el caption, el contador y los tags siguen al slide activo tras clic, autorrotación y reanudación; tras los hovers 5→2→8→1 solo el activo queda con opacidad 1; no hay rotación durante 8 s de hover y se reanuda al salir; dos rotaciones consecutivas quedan separadas por un intervalo de ~3,5 s; con `prefers-reduced-motion: reduce` cada cambio es instantáneo con el activo visible y el resto en 0, sin autorrotación. El script levanta `astro preview` y lo baja al salir (`trap ... EXIT`); al cierre de la fase no queda ningún proceso `astro preview` activo.
