---
verdict: PASS
---

# Verify Report: fix-internal-heroes-animation

**Fecha**: 2026-10-02

Notación: `verify-report.N` son los bloques de evidencia registrados al final de este informe; cada afirmación remite al bloque que la muestra.

## Resultados por Spec

### Internal Page Heroes (`internal-page-heroes/spec`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| `/servicios`, `/industrias`, `/nosotros`, `/contacto` (es/en/pt) animan el `.page-hero` una sola vez en carga directa | ✅ | `verify-report.2` (modo movimiento): cada elemento cruza una única vez la opacidad 0.5 y termina visible, sin estilo inline residual |
| `/cotizar` (es/en/pt) anima el `.quote-hero` con la misma entrada | ✅ | `verify-report.2`: H1, lead y chips (3 elementos), un cruce por elemento |
| Páginas sin hero (`/`) sin errores ni efectos | ✅ | `verify-report.2`: `errores=0` en las 18 URLs de movimiento; `/` conserva su animación propia con un solo cruce (sin doble animación) |
| Reduced motion: visible de inmediato, sin animación | ✅ | `verify-report.2` (modo reduced-motion): cero cruces y opacidad 1 desde el primer frame en las 16 URLs |
| `data-hero-animate` en eyebrow, H1, lead y meta-items (2 en servicios/industrias/nosotros, 3 en contacto) | ✅ | `verify-report.8` coincide con el conteo de elementos de `verify-report.2` |
| Stagger visible, no simultáneo | ✅ | `verify-report.2`: separación entre cruces consecutivos cercana al stagger de 120 ms del código |
| Sin JS el hero es visible | ✅ | `verify-report.2` (modo sin-js): todos los elementos mostrados quedan visibles (el bloque acota la salida y omite 9 URLs; el mecanismo es `gsap.from` sin ocultamiento CSS, y `apply-evidence.3` cubre otras URLs sin JS) |
| `/cotizar`: H1 y lead con fade-up, chips tras el lead | ✅ | `verify-report.2` + marcado en `verify-report.8` (title, lead y chips) |
| Stepper fuera del `.quote-hero`, sin interferencia con pasos 1-3 `hidden` | ✅ | `cotizar.astro`: el stepper es hermano de `section.quote-hero`; `animatePageHero` solo consulta dentro de su raíz; los paneles 1-3 conservan `hidden` en el markup |

**Scenarios verificados**: 4/4 behaviors (auto-init global, markup `.page-hero`, markup `.quote-hero`, constraints de reduced-motion y JS caído).

### Cobertura real de animaciones de entrada (`scroll-animations/scroll-inner-pages-real-coverage`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| Hero de las 5 páginas internas en es/en/pt con entrada escalonada | ✅ | `verify-report.2` |
| CTA (servicios, industrias, nosotros) y pie de página (5 páginas) animan por scroll | ✅ | Verificado por lectura de código: `CTASection.astro` y `Footer.astro` llevan `data-scroll-animate`/`data-scroll-batch`; `CTASection` se monta solo en esas 3 páginas internas (más el home); sin prueba de scroll en navegador (observación, el comportamiento lo cubre la spec base ya completada) |
| Contenido visible sin JavaScript | ✅ | `verify-report.2` (sin-js) |
| Movimiento reducido respetado en las 5 páginas | ✅ | `verify-report.2` (reduced-motion) |

**Scenarios verificados**: 4/4 (el de scroll de CTA/Footer por lectura de código).

### Acceptance criteria del brief (input.md)

- Listener `astro:page-load` eliminado de `scroll-animations.ts` y auto-init invocado en el nivel superior tras `init()`: `verify-report.7` muestra el diff; `verify-report.6` confirma que no queda ningún `astro:page-load` en ese archivo y que el sitio no monta `ClientRouter` ni `astro:transitions`. El diff de `src/` toca solo `scroll-animations.ts` (`verify-report.5`) y no agrega atributos `data-scroll-*`.
- LCP sin degradación material: `apply-evidence.2` (línea base) frente a `verify-report.3` (medición propia sobre el código final). El elemento LCP no cambia (`h1.page-hero__title` en `/servicios/`, `p.quote-hero__lead` en `/cotizar/`), la mediana de LCP no sube y el `elementRenderDelay` queda dentro de la dispersión de la línea base. El LCP no se oculta más que el tween porque el módulo corre diferido tras el primer pintado.
- Lighthouse >= 95: `/servicios/` e `/industrias/` lo cumplen (`verify-report.3`); `/cotizar/` queda bajo 95 antes (`apply-evidence.2`) y después (`verify-report.3`) del cambio. El CLS medido con puppeteer es el mismo con y sin animación (`verify-report.4`), así que el cambio no lo introduce. Se registra como hallazgo preexistente y fuera de alcance, no como falla del cambio.
- Specs actualizadas: `internal-page-heroes/spec.md` declara defaults 120 ms / 24 px / 600 ms, 2-3 meta-items y auto-init en la carga del módulo, y `scroll-inner-pages` queda superseded por la delta `scroll-inner-pages-real-coverage`.

### Tests

Corrida completa del perfil (`validate-i18n`, única suite declarada; el proyecto no define test runner ni cobertura): `verify-report.1`. Compilación `npm run build` ejecutada fuera de bloque porque escribe `dist/` y `.astro/` (ambos ignorados por git); terminó sin errores.

Verificación en navegador (Chrome for Testing + `astro preview`, 15 URLs internas más 3 del home): `verify-report.2`. Lighthouse móvil, 5 corridas por página: `verify-report.3`. CLS con y sin animación: `verify-report.4`.

**Cobertura**: no hay instrumento de cobertura en el proyecto.

## Hallazgos de Seguridad (si aplica)

Domain `fix`: el análisis de seguridad no aplica. El cambio no introduce entradas de usuario, dependencias ni secretos.

## Coherencia de Grafo de Specs

| Slug | Campo | Descripción |
|------|-------|-------------|
| `scroll-inner-pages-real-coverage` | `depends_on` -> `scroll-entrance-utility` | WARN: `scroll-entrance-utility` existe pero no declara `affects` ni `related` hacia la delta. La corrección exige decidir entre `affects` y `related` (su `affects` hoy lista rutas de archivo), así que no se aplicó corrección automática |
| `internal-page-heroes/spec` | `depends_on` / `affects` / `adrs` | Vacíos; sin inconsistencias |
| `scroll-inner-pages-real-coverage` | `adrs`, `affects` | Vacíos; sin inconsistencias |

## Correcciones de Metadata

Ninguna de grafo. `verified_at` de las dos specs de `spec_refs` pasa a `2026-10-02` y sus checkboxes de acceptance criteria quedan marcados `[x]`; `status` permanece `review` (lo pasa a `completed` `sdd-archive`).

## Evidencia de apply

`comprobar` sobre `apply-evidence.md` (`verify-report.9`): calzan los bloques re-ejecutables 4, 5, 7 y 8. El bloque `apply-evidence.3` figura en `no_calzan` porque su script crea su directorio de trabajo con `mktemp` bajo el directorio de temporales del despacho de `sdd-apply`, que ya no existe (exit 1); es un artefacto del entorno de re-ejecución, no una falla del código, y su contenido (inicio único de tween por elemento, estado final visible) queda cubierto por la medición propia `verify-report.2`. Que esos bloques calcen no cumple por sí solo ningún criterio: cada criterio se verificó con evidencia propia arriba.

`comprobar` sobre este informe (`verify-report.10`): sin bloques en `no_calzan` y sin errores.

## Acciones Requeridas

Ninguna para el archive. Observaciones no bloqueantes (también en `observations.md`):
1. `/cotizar/` incumple Lighthouse >= 95 de forma preexistente (deuda fuera de alcance).
2. WARN de metadata en `scroll-entrance-utility` (ver sección de grafo).
3. Quedan fuera de alcance los otros listeners `astro:page-load` (`wizard.ts`, `HeroSection.astro`, páginas de contacto/servicios/industrias; `verify-report.6`), deuda condicionada del brief 09.

---

# Evidencia registrada


<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro","head":"e88dff2a093c9c71af9002f601ffb88d148179b4","fecha":"2026-10-02T20:28:59-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.1`** · exit 0 · 6 líneas, 0 omitidas · HEAD `e88dff2a093c` · 2026-10-02T20:28:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"archivo","argv":null,"texto":"#!/usr/bin/env bash\n# Verificación independiente en navegador de la entrada de heroes contra `astro preview` del dist/.\n# Muestrea la opacidad computada de cada [data-hero-animate] en cada frame desde el inicio del documento:\n# cuenta los cruces ascendentes por 0.5 (1 = una sola animación; 2 = doble animación) y la separación\n# entre los instantes de cruce de elementos consecutivos (stagger). cwd: <worktree\u003e/log-atm-web-astro.\nset -euo pipefail\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nexport PPTR=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/puppeteer-core\nTMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz\nOUT=$(mktemp -d \"$TMPROOT/hv.XXXXXXXX\")\nexport PORT=4411\nnpx astro preview --port \"$PORT\" --host 127.0.0.1 \u003e \"$OUT/preview.log\" 2\u003e&1 &\nPID=$!\ndetener() { kill \"$PID\" 2\u003e/dev/null || true; pkill -P \"$PID\" 2\u003e/dev/null || true; wait \"$PID\" 2\u003e/dev/null || true; }\ntrap detener EXIT\nfor _ in $(seq 1 60); do\n  if curl -s -o /dev/null \"http://127.0.0.1:$PORT/servicios/\"; then break; fi\n  sleep 0.5\ndone\nnode --input-type=module -e '\nconst { default: puppeteer } = await import(process.env.PPTR + \"/lib/esm/puppeteer/puppeteer-core.js\");\nconst base = `http://127.0.0.1:${process.env.PORT}`;\nconst pages = [\"servicios\", \"industrias\", \"nosotros\", \"contacto\", \"cotizar\"];\nconst urls = [\"\", \"/en\", \"/pt\"].flatMap((l) =\u003e pages.map((p) =\u003e `${l}/${p}/`));\nconst sampler = () =\u003e {\n  window.__s = [];\n  const t0 = performance.now();\n  const tick = () =\u003e {\n    const els = [...document.querySelectorAll(\"[data-hero-animate]\")];\n    if (els.length) window.__s.push([performance.now() - t0, els.map((e) =\u003e +getComputedStyle(e).opacity)]);\n    if (performance.now() - t0 < 3500) requestAnimationFrame(tick);\n  };\n  requestAnimationFrame(tick);\n};\nconst analizar = () =\u003e {\n  const s = window.__s || [];\n  const n = s.length ? s[0][1].length : 0;\n  const cruces = [], tcruce = [], min = [];\n  for (let i = 0; i < n; i++) {\n    let c = 0, t = null, m = 1;\n    for (let k = 1; k < s.length; k++) {\n      const a = s[k - 1][1][i], b = s[k][1][i];\n      m = Math.min(m, b);\n      if (a < 0.5 && b \u003e= 0.5) { c++; if (t === null) t = s[k][0]; }\n    }\n    cruces.push(c); tcruce.push(t); min.push(m);\n  }\n  const fin = s.length ? s[s.length - 1][1] : [];\n  const gaps = tcruce.slice(1).map((x, i) =\u003e (x !== null && tcruce[i] !== null ? Math.round(x - tcruce[i]) : \"?\"));\n  const els = [...document.querySelectorAll(\"[data-hero-animate]\")];\n  return { n, cruces: [...new Set(cruces)].join(\"/\"), minOpac: Math.min(...min, 1).toFixed(2), visiblesFinal: fin.filter((o) =\u003e o === 1).length,\n           inline: els.filter((e) =\u003e e.style.opacity !== \"\" || e.style.transform !== \"\").length, gaps: gaps.join(\",\") };\n};\nconst browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: [\"--no-sandbox\"] });\nconst casos = [\n  [\"movimiento\", urls.concat([\"/\", \"/en/\", \"/pt/\"]), async () =\u003e {}],\n  [\"reduced-motion\", urls.concat([\"/\"]), async (pg) =\u003e pg.emulateMediaFeatures([{ name: \"prefers-reduced-motion\", value: \"reduce\" }])],\n  [\"sin-js\", urls, async (pg) =\u003e pg.setJavaScriptEnabled(false)],\n];\nfor (const [modo, lista, preparar] of casos) {\n  for (const u of lista) {\n    const pg = await browser.newPage();\n    await preparar(pg);\n    if (modo !== \"sin-js\") await pg.evaluateOnNewDocument(sampler);\n    const errs = [];\n    pg.on(\"pageerror\", (e) =\u003e errs.push(String(e).slice(0, 80)));\n    await pg.goto(base + u, { waitUntil: \"load\" });\n    await new Promise((r) =\u003e setTimeout(r, 3800));\n    const r = modo === \"sin-js\"\n      ? await pg.evaluate(() =\u003e { const e = [...document.querySelectorAll(\"[data-hero-animate]\")]; return { n: e.length, visiblesFinal: e.filter((x) =\u003e getComputedStyle(x).opacity === \"1\").length }; })\n      : await pg.evaluate(analizar);\n    console.log(`${modo.padEnd(14)} ${u.padEnd(16)} ${JSON.stringify(r)} errores=${errs.length}`);\n    await pg.close();\n  }\n}\nawait browser.close();\n'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro","head":"e88dff2a093c9c71af9002f601ffb88d148179b4","fecha":"2026-10-02T20:32:19-03:00","exit":0,"sha256":"62c09eaef45da70cfe3d7739ab986caac596286e0a332ad61ecd54a0dcb3f247","lineas":49,"omitidas":9,"no_recomprobable":"navegador y temporizacion de animacion: una re-ejecucion no reproduce el mismo sha256"} -->
**Evidencia `verify-report.2`** · exit 0 · 49 líneas, 9 omitidas · HEAD `e88dff2a093c` · 2026-10-02T20:32:19-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro`
No re-comprobable: navegador y temporizacion de animacion: una re-ejecucion no reproduce el mismo sha256

```bash
#!/usr/bin/env bash
# Verificación independiente en navegador de la entrada de heroes contra `astro preview` del dist/.
# Muestrea la opacidad computada de cada [data-hero-animate] en cada frame desde el inicio del documento:
# cuenta los cruces ascendentes por 0.5 (1 = una sola animación; 2 = doble animación) y la separación
# entre los instantes de cruce de elementos consecutivos (stagger). cwd: <worktree>/log-atm-web-astro.
set -euo pipefail
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
export PPTR=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/puppeteer-core
TMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz
OUT=$(mktemp -d "$TMPROOT/hv.XXXXXXXX")
export PORT=4411
npx astro preview --port "$PORT" --host 127.0.0.1 > "$OUT/preview.log" 2>&1 &
PID=$!
detener() { kill "$PID" 2>/dev/null || true; pkill -P "$PID" 2>/dev/null || true; wait "$PID" 2>/dev/null || true; }
trap detener EXIT
for _ in $(seq 1 60); do
  if curl -s -o /dev/null "http://127.0.0.1:$PORT/servicios/"; then break; fi
  sleep 0.5
done
node --input-type=module -e '
const { default: puppeteer } = await import(process.env.PPTR + "/lib/esm/puppeteer/puppeteer-core.js");
const base = `http://127.0.0.1:${process.env.PORT}`;
const pages = ["servicios", "industrias", "nosotros", "contacto", "cotizar"];
const urls = ["", "/en", "/pt"].flatMap((l) => pages.map((p) => `${l}/${p}/`));
const sampler = () => {
  window.__s = [];
  const t0 = performance.now();
  const tick = () => {
    const els = [...document.querySelectorAll("[data-hero-animate]")];
    if (els.length) window.__s.push([performance.now() - t0, els.map((e) => +getComputedStyle(e).opacity)]);
    if (performance.now() - t0 < 3500) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const analizar = () => {
  const s = window.__s || [];
  const n = s.length ? s[0][1].length : 0;
  const cruces = [], tcruce = [], min = [];
  for (let i = 0; i < n; i++) {
    let c = 0, t = null, m = 1;
    for (let k = 1; k < s.length; k++) {
      const a = s[k - 1][1][i], b = s[k][1][i];
      m = Math.min(m, b);
      if (a < 0.5 && b >= 0.5) { c++; if (t === null) t = s[k][0]; }
    }
    cruces.push(c); tcruce.push(t); min.push(m);
  }
  const fin = s.length ? s[s.length - 1][1] : [];
  const gaps = tcruce.slice(1).map((x, i) => (x !== null && tcruce[i] !== null ? Math.round(x - tcruce[i]) : "?"));
  const els = [...document.querySelectorAll("[data-hero-animate]")];
  return { n, cruces: [...new Set(cruces)].join("/"), minOpac: Math.min(...min, 1).toFixed(2), visiblesFinal: fin.filter((o) => o === 1).length,
           inline: els.filter((e) => e.style.opacity !== "" || e.style.transform !== "").length, gaps: gaps.join(",") };
};
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: ["--no-sandbox"] });
const casos = [
  ["movimiento", urls.concat(["/", "/en/", "/pt/"]), async () => {}],
  ["reduced-motion", urls.concat(["/"]), async (pg) => pg.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])],
  ["sin-js", urls, async (pg) => pg.setJavaScriptEnabled(false)],
];
for (const [modo, lista, preparar] of casos) {
  for (const u of lista) {
    const pg = await browser.newPage();
    await preparar(pg);
    if (modo !== "sin-js") await pg.evaluateOnNewDocument(sampler);
    const errs = [];
    pg.on("pageerror", (e) => errs.push(String(e).slice(0, 80)));
    await pg.goto(base + u, { waitUntil: "load" });
    await new Promise((r) => setTimeout(r, 3800));
    const r = modo === "sin-js"
      ? await pg.evaluate(() => { const e = [...document.querySelectorAll("[data-hero-animate]")]; return { n: e.length, visiblesFinal: e.filter((x) => getComputedStyle(x).opacity === "1").length }; })
      : await pg.evaluate(analizar);
    console.log(`${modo.padEnd(14)} ${u.padEnd(16)} ${JSON.stringify(r)} errores=${errs.length}`);
    await pg.close();
  }
}
await browser.close();
'
```

```text
movimiento     /servicios/      {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"117,117,117,133"} errores=0
movimiento     /industrias/     {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"132,117,131,117"} errores=0
movimiento     /nosotros/       {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"117,117,117,133"} errores=0
movimiento     /contacto/       {"n":6,"cruces":"1","minOpac":"0.00","visiblesFinal":6,"inline":0,"gaps":"133,117,117,117,117"} errores=0
movimiento     /cotizar/        {"n":3,"cruces":"1","minOpac":"0.00","visiblesFinal":3,"inline":0,"gaps":"117,117"} errores=0
movimiento     /en/servicios/   {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"133,117,117,117"} errores=0
movimiento     /en/industrias/  {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"117,117,116,117"} errores=0
movimiento     /en/nosotros/    {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"117,117,133,117"} errores=0
movimiento     /en/contacto/    {"n":6,"cruces":"1","minOpac":"0.00","visiblesFinal":6,"inline":0,"gaps":"117,134,116,117,117"} errores=0
movimiento     /en/cotizar/     {"n":3,"cruces":"1","minOpac":"0.00","visiblesFinal":3,"inline":0,"gaps":"134,117"} errores=0
movimiento     /pt/servicios/   {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"117,133,117,117"} errores=0
movimiento     /pt/industrias/  {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"134,117,117,117"} errores=0
movimiento     /pt/nosotros/    {"n":5,"cruces":"1","minOpac":"0.00","visiblesFinal":5,"inline":0,"gaps":"117,116,117,117"} errores=0
movimiento     /pt/contacto/    {"n":6,"cruces":"1","minOpac":"0.00","visiblesFinal":6,"inline":0,"gaps":"117,117,117,117,133"} errores=0
movimiento     /pt/cotizar/     {"n":3,"cruces":"1","minOpac":"0.00","visiblesFinal":3,"inline":0,"gaps":"117,117"} errores=0
movimiento     /                {"n":4,"cruces":"1","minOpac":"0.00","visiblesFinal":4,"inline":0,"gaps":"132,117,117"} errores=0
movimiento     /en/             {"n":4,"cruces":"1","minOpac":"0.00","visiblesFinal":4,"inline":0,"gaps":"116,117,115"} errores=0
movimiento     /pt/             {"n":4,"cruces":"1","minOpac":"0.00","visiblesFinal":4,"inline":0,"gaps":"117,117,117"} errores=0
reduced-motion /servicios/      {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /industrias/     {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /nosotros/       {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /contacto/       {"n":6,"cruces":"0","minOpac":"1.00","visiblesFinal":6,"inline":0,"gaps":"?,?,?,?,?"} errores=0
reduced-motion /cotizar/        {"n":3,"cruces":"0","minOpac":"1.00","visiblesFinal":3,"inline":0,"gaps":"?,?"} errores=0
reduced-motion /en/servicios/   {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /en/industrias/  {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /en/nosotros/    {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /en/contacto/    {"n":6,"cruces":"0","minOpac":"1.00","visiblesFinal":6,"inline":0,"gaps":"?,?,?,?,?"} errores=0
reduced-motion /en/cotizar/     {"n":3,"cruces":"0","minOpac":"1.00","visiblesFinal":3,"inline":0,"gaps":"?,?"} errores=0
reduced-motion /pt/servicios/   {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /pt/industrias/  {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /pt/nosotros/    {"n":5,"cruces":"0","minOpac":"1.00","visiblesFinal":5,"inline":0,"gaps":"?,?,?,?"} errores=0
reduced-motion /pt/contacto/    {"n":6,"cruces":"0","minOpac":"1.00","visiblesFinal":6,"inline":0,"gaps":"?,?,?,?,?"} errores=0
reduced-motion /pt/cotizar/     {"n":3,"cruces":"0","minOpac":"1.00","visiblesFinal":3,"inline":0,"gaps":"?,?"} errores=0
reduced-motion /                {"n":4,"cruces":"0","minOpac":"1.00","visiblesFinal":4,"inline":0,"gaps":"?,?,?"} errores=0
sin-js         /servicios/      {"n":5,"visiblesFinal":5} errores=0
sin-js         /industrias/     {"n":5,"visiblesFinal":5} errores=0
sin-js         /nosotros/       {"n":5,"visiblesFinal":5} errores=0
sin-js         /contacto/       {"n":6,"visiblesFinal":6} errores=0
sin-js         /cotizar/        {"n":3,"visiblesFinal":3} errores=0
sin-js         /en/servicios/   {"n":5,"visiblesFinal":5} errores=0
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"archivo","argv":null,"texto":"#!/usr/bin/env bash\n# Lighthouse (movil, performance) contra `astro preview` del dist/ construido sobre el codigo final. cwd: directorio de temporales.\nset -euo pipefail\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nLH=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/.bin/lighthouse\nWT=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro\nTMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz\nOUT=$(mktemp -d \"$TMPROOT/lh.XXXXXXXX\")\nPORT=4412\nRUNS=5\n(cd \"$WT\" && exec npx astro preview --port \"$PORT\" --host 127.0.0.1) \u003e \"$OUT/preview.log\" 2\u003e&1 &\nPID=$!\ndetener() { kill \"$PID\" 2\u003e/dev/null || true; pkill -P \"$PID\" 2\u003e/dev/null || true; wait \"$PID\" 2\u003e/dev/null || true; }\ntrap detener EXIT\nfor _ in $(seq 1 60); do\n  if curl -s -o /dev/null \"http://127.0.0.1:$PORT/servicios/\"; then break; fi\n  sleep 0.5\ndone\necho \"lighthouse $(\"$LH\" --version) | runs=$RUNS | mobile\"\nfor PAGE in /servicios/ /industrias/ /cotizar/; do\n  for RUN in $(seq 1 \"$RUNS\"); do\n    F=\"$OUT/$(echo \"$PAGE\" | tr -d '/')-$RUN.json\"\n    \"$LH\" \"http://127.0.0.1:$PORT$PAGE\" --only-categories=performance --output=json --output-path=\"$F\" \\\n      --chrome-flags=\"--headless=new --no-sandbox\" --quiet \u003e/dev/null 2\u003e&1\n  done\n  node -e '\n    const fs = require(\"fs\");\n    const [page, ...files] = process.argv.slice(1);\n    const rows = files.map((f) =\u003e {\n      const r = JSON.parse(fs.readFileSync(f, \"utf8\"));\n      const parts = r.audits[\"lcp-breakdown-insight\"]?.details?.items ?? [];\n      const item = parts.find((x) =\u003e x.type === \"node\");\n      const rd = parts.find((x) =\u003e x.type === \"table\")?.items?.find((x) =\u003e x.subpart === \"elementRenderDelay\");\n      return { score: Math.round(r.categories.performance.score * 100), lcp: Math.round(r.audits[\"largest-contentful-paint\"].numericValue),\n               tbt: Math.round(r.audits[\"total-blocking-time\"].numericValue), cls: r.audits[\"cumulative-layout-shift\"].numericValue.toFixed(3),\n               rdelay: rd ? Math.round(rd.duration) : \"n/d\", el: item ? item.selector.split(\" \u003e \").pop() : \"n/d\" };\n    });\n    rows.forEach((x, i) =\u003e console.log(`${page} run${i + 1}: perf=${x.score} LCP=${x.lcp}ms TBT=${x.tbt}ms CLS=${x.cls} renderDelay=${x.rdelay}ms LCP-el=${x.el}`));\n    const med = (a) =\u003e a.slice().sort((p, q) =\u003e p - q)[Math.floor(a.length / 2)];\n    console.log(`${page} MEDIANA: perf=${med(rows.map((x) =\u003e x.score))} LCP=${med(rows.map((x) =\u003e x.lcp))}ms`);\n  ' \"$PAGE\" \"$OUT/$(echo \"$PAGE\" | tr -d '/')\"-*.json\ndone\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz","head":null,"fecha":"2026-10-02T20:35:33-03:00","exit":0,"sha256":"b7d8679b3e9ea8d2245fb2b126857539dc76678c75ffe301561e9e4785368ed5","lineas":19,"omitidas":0,"no_recomprobable":"Lighthouse varia entre corridas; una re-ejecucion no reproduce el mismo sha256"} -->
**Evidencia `verify-report.3`** · exit 0 · 19 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:35:33-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz`
No re-comprobable: Lighthouse varia entre corridas; una re-ejecucion no reproduce el mismo sha256

```bash
#!/usr/bin/env bash
# Lighthouse (movil, performance) contra `astro preview` del dist/ construido sobre el codigo final. cwd: directorio de temporales.
set -euo pipefail
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
LH=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/.bin/lighthouse
WT=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro
TMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz
OUT=$(mktemp -d "$TMPROOT/lh.XXXXXXXX")
PORT=4412
RUNS=5
(cd "$WT" && exec npx astro preview --port "$PORT" --host 127.0.0.1) > "$OUT/preview.log" 2>&1 &
PID=$!
detener() { kill "$PID" 2>/dev/null || true; pkill -P "$PID" 2>/dev/null || true; wait "$PID" 2>/dev/null || true; }
trap detener EXIT
for _ in $(seq 1 60); do
  if curl -s -o /dev/null "http://127.0.0.1:$PORT/servicios/"; then break; fi
  sleep 0.5
done
echo "lighthouse $("$LH" --version) | runs=$RUNS | mobile"
for PAGE in /servicios/ /industrias/ /cotizar/; do
  for RUN in $(seq 1 "$RUNS"); do
    F="$OUT/$(echo "$PAGE" | tr -d '/')-$RUN.json"
    "$LH" "http://127.0.0.1:$PORT$PAGE" --only-categories=performance --output=json --output-path="$F" \
      --chrome-flags="--headless=new --no-sandbox" --quiet >/dev/null 2>&1
  done
  node -e '
    const fs = require("fs");
    const [page, ...files] = process.argv.slice(1);
    const rows = files.map((f) => {
      const r = JSON.parse(fs.readFileSync(f, "utf8"));
      const parts = r.audits["lcp-breakdown-insight"]?.details?.items ?? [];
      const item = parts.find((x) => x.type === "node");
      const rd = parts.find((x) => x.type === "table")?.items?.find((x) => x.subpart === "elementRenderDelay");
      return { score: Math.round(r.categories.performance.score * 100), lcp: Math.round(r.audits["largest-contentful-paint"].numericValue),
               tbt: Math.round(r.audits["total-blocking-time"].numericValue), cls: r.audits["cumulative-layout-shift"].numericValue.toFixed(3),
               rdelay: rd ? Math.round(rd.duration) : "n/d", el: item ? item.selector.split(" > ").pop() : "n/d" };
    });
    rows.forEach((x, i) => console.log(`${page} run${i + 1}: perf=${x.score} LCP=${x.lcp}ms TBT=${x.tbt}ms CLS=${x.cls} renderDelay=${x.rdelay}ms LCP-el=${x.el}`));
    const med = (a) => a.slice().sort((p, q) => p - q)[Math.floor(a.length / 2)];
    console.log(`${page} MEDIANA: perf=${med(rows.map((x) => x.score))} LCP=${med(rows.map((x) => x.lcp))}ms`);
  ' "$PAGE" "$OUT/$(echo "$PAGE" | tr -d '/')"-*.json
done
```

```text
lighthouse 13.3.0 | runs=5 | mobile
/servicios/ run1: perf=97 LCP=2151ms TBT=0ms CLS=0.024 renderDelay=154ms LCP-el=h1.page-hero__title
/servicios/ run2: perf=93 LCP=2786ms TBT=0ms CLS=0.016 renderDelay=145ms LCP-el=h1.page-hero__title
/servicios/ run3: perf=97 LCP=2151ms TBT=0ms CLS=0.049 renderDelay=137ms LCP-el=h1.page-hero__title
/servicios/ run4: perf=97 LCP=2143ms TBT=0ms CLS=0.024 renderDelay=132ms LCP-el=h1.page-hero__title
/servicios/ run5: perf=97 LCP=2143ms TBT=0ms CLS=0.024 renderDelay=134ms LCP-el=h1.page-hero__title
/servicios/ MEDIANA: perf=97 LCP=2151ms
/industrias/ run1: perf=97 LCP=2294ms TBT=0ms CLS=0.020 renderDelay=133ms LCP-el=p.page-hero__lead
/industrias/ run2: perf=97 LCP=2148ms TBT=0ms CLS=0.020 renderDelay=139ms LCP-el=p.page-hero__lead
/industrias/ run3: perf=97 LCP=2146ms TBT=0ms CLS=0.020 renderDelay=145ms LCP-el=p.page-hero__lead
/industrias/ run4: perf=97 LCP=2289ms TBT=0ms CLS=0.020 renderDelay=143ms LCP-el=p.page-hero__lead
/industrias/ run5: perf=97 LCP=2295ms TBT=0ms CLS=0.020 renderDelay=145ms LCP-el=p.page-hero__lead
/industrias/ MEDIANA: perf=97 LCP=2289ms
/cotizar/ run1: perf=93 LCP=2139ms TBT=0ms CLS=0.137 renderDelay=116ms LCP-el=p.quote-hero__lead
/cotizar/ run2: perf=90 LCP=2450ms TBT=0ms CLS=0.137 renderDelay=120ms LCP-el=p.quote-hero__lead
/cotizar/ run3: perf=93 LCP=2143ms TBT=0ms CLS=0.137 renderDelay=126ms LCP-el=p.quote-hero__lead
/cotizar/ run4: perf=90 LCP=2471ms TBT=0ms CLS=0.137 renderDelay=146ms LCP-el=p.quote-hero__lead
/cotizar/ run5: perf=90 LCP=2470ms TBT=0ms CLS=0.137 renderDelay=136ms LCP-el=p.quote-hero__lead
/cotizar/ MEDIANA: perf=90 LCP=2450ms
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"archivo","argv":null,"texto":"#!/usr/bin/env bash\n# CLS de /cotizar/ y /servicios/ con la animacion activa y con movimiento reducido (sin animacion, equivalente al\n# comportamiento previo al cambio), via PerformanceObserver layout-shift. cwd: directorio de temporales.\nset -euo pipefail\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nexport PPTR=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/puppeteer-core\nWT=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro\nOUT=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz/cls.XXXXXXXX)\nexport PORT=4413\n(cd \"$WT\" && exec npx astro preview --port \"$PORT\" --host 127.0.0.1) \u003e \"$OUT/preview.log\" 2\u003e&1 &\nPID=$!\ndetener() { kill \"$PID\" 2\u003e/dev/null || true; pkill -P \"$PID\" 2\u003e/dev/null || true; wait \"$PID\" 2\u003e/dev/null || true; }\ntrap detener EXIT\nfor _ in $(seq 1 60); do curl -s -o /dev/null \"http://127.0.0.1:$PORT/servicios/\" && break; sleep 0.5; done\nnode --input-type=module -e '\nconst { default: puppeteer } = await import(process.env.PPTR + \"/lib/esm/puppeteer/puppeteer-core.js\");\nconst browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: [\"--no-sandbox\"] });\nfor (const modo of [\"movimiento\", \"reduced\"]) for (const u of [\"/servicios/\", \"/cotizar/\"]) {\n  const vals = [];\n  for (let i = 0; i < 3; i++) {\n    const pg = await browser.newPage();\n    await pg.setViewport({ width: 412, height: 823, isMobile: true });\n    if (modo === \"reduced\") await pg.emulateMediaFeatures([{ name: \"prefers-reduced-motion\", value: \"reduce\" }]);\n    await pg.evaluateOnNewDocument(() =\u003e { window.__cls = 0; new PerformanceObserver((l) =\u003e { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: \"layout-shift\", buffered: true }); });\n    await pg.goto(`http://127.0.0.1:${process.env.PORT}${u}`, { waitUntil: \"load\" });\n    await new Promise((r) =\u003e setTimeout(r, 3000));\n    vals.push((await pg.evaluate(() =\u003e window.__cls)).toFixed(3));\n    await pg.close();\n  }\n  console.log(`${modo.padEnd(11)} ${u.padEnd(12)} CLS(3 corridas)=${vals.join(\",\")}`);\n}\nawait browser.close();\n'\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz","head":null,"fecha":"2026-10-02T20:36:29-03:00","exit":0,"sha256":"0441c1afd41b3a6fae5085736a1682e54d15d42ea88a0d0d37649ef18e0d7669","lineas":4,"omitidas":0,"no_recomprobable":"medicion de navegador no determinista; una re-ejecucion no reproduce el mismo sha256"} -->
**Evidencia `verify-report.4`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T20:36:29-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz`
No re-comprobable: medicion de navegador no determinista; una re-ejecucion no reproduce el mismo sha256

```bash
#!/usr/bin/env bash
# CLS de /cotizar/ y /servicios/ con la animacion activa y con movimiento reducido (sin animacion, equivalente al
# comportamiento previo al cambio), via PerformanceObserver layout-shift. cwd: directorio de temporales.
set -euo pipefail
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
export PPTR=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/puppeteer-core
WT=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro
OUT=$(mktemp -d /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-verify-tyl_3kmz/cls.XXXXXXXX)
export PORT=4413
(cd "$WT" && exec npx astro preview --port "$PORT" --host 127.0.0.1) > "$OUT/preview.log" 2>&1 &
PID=$!
detener() { kill "$PID" 2>/dev/null || true; pkill -P "$PID" 2>/dev/null || true; wait "$PID" 2>/dev/null || true; }
trap detener EXIT
for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/servicios/" && break; sleep 0.5; done
node --input-type=module -e '
const { default: puppeteer } = await import(process.env.PPTR + "/lib/esm/puppeteer/puppeteer-core.js");
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: ["--no-sandbox"] });
for (const modo of ["movimiento", "reduced"]) for (const u of ["/servicios/", "/cotizar/"]) {
  const vals = [];
  for (let i = 0; i < 3; i++) {
    const pg = await browser.newPage();
    await pg.setViewport({ width: 412, height: 823, isMobile: true });
    if (modo === "reduced") await pg.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await pg.evaluateOnNewDocument(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true }); });
    await pg.goto(`http://127.0.0.1:${process.env.PORT}${u}`, { waitUntil: "load" });
    await new Promise((r) => setTimeout(r, 3000));
    vals.push((await pg.evaluate(() => window.__cls)).toFixed(3));
    await pg.close();
  }
  console.log(`${modo.padEnd(11)} ${u.padEnd(12)} CLS(3 corridas)=${vals.join(",")}`);
}
await browser.close();
'
```

```text
movimiento  /servicios/  CLS(3 corridas)=0.000,0.000,0.000
movimiento  /cotizar/    CLS(3 corridas)=0.000,0.000,0.000
reduced     /servicios/  CLS(3 corridas)=0.000,0.000,0.000
reduced     /cotizar/    CLS(3 corridas)=0.000,0.000,0.000
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["git","diff","--stat","9277e47","HEAD","--","log-atm-web-astro/src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"e88dff2a093c9c71af9002f601ffb88d148179b4","fecha":"2026-10-02T20:36:35-03:00","exit":0,"sha256":"20761ae434634efee3c8f925d24cddb916681a0614462d1a254c1812a16e5838","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.5`** · exit 0 · 2 líneas, 0 omitidas · HEAD `e88dff2a093c` · 2026-10-02T20:36:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`

```text
git diff --stat 9277e47 HEAD -- log-atm-web-astro/src
```

```text
 log-atm-web-astro/src/scripts/scroll-animations.ts | 16 +++++++---------
 1 file changed, 7 insertions(+), 9 deletions(-)
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["grep","-rnE","astro:page-load|ClientRouter|astro:transitions|animatePageHero|initPageHeroes","log-atm-web-astro/src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"e88dff2a093c9c71af9002f601ffb88d148179b4","fecha":"2026-10-02T20:36:35-03:00","exit":0,"sha256":"b4ad709ce1ded8742e0258d8acc8103911a39aecbb80718ced15ec979bc065b5","lineas":16,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.6`** · exit 0 · 16 líneas, 0 omitidas · HEAD `e88dff2a093c` · 2026-10-02T20:36:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`

```text
grep -rnE 'astro:page-load|ClientRouter|astro:transitions|animatePageHero|initPageHeroes' log-atm-web-astro/src
```

```text
log-atm-web-astro/src/scripts/wizard.ts:44:/** Estado del wizard — se reinicializa en cada astro:page-load */
log-atm-web-astro/src/scripts/wizard.ts:434:document.addEventListener('astro:page-load', initWizard);
log-atm-web-astro/src/scripts/scroll-animations.ts:15: *   animatePageHero(rootSelector, opts?) — anima elementos [data-hero-animate] al cargar
log-atm-web-astro/src/scripts/scroll-animations.ts:61:export function animatePageHero(
log-atm-web-astro/src/scripts/scroll-animations.ts:146:function initPageHeroes(): void {
log-atm-web-astro/src/scripts/scroll-animations.ts:148:    animatePageHero('.page-hero');
log-atm-web-astro/src/scripts/scroll-animations.ts:151:    animatePageHero('.quote-hero');
log-atm-web-astro/src/scripts/scroll-animations.ts:157:initPageHeroes();
log-atm-web-astro/src/lib/ready.ts:10: *   document.addEventListener('astro:page-load', initMiComponente);
log-atm-web-astro/src/components/sections/HeroSection.astro:86:  import { animatePageHero } from '../../scripts/scroll-animations';
log-atm-web-astro/src/components/sections/HeroSection.astro:91:    animatePageHero('.hero-b');
log-atm-web-astro/src/components/sections/HeroSection.astro:96:  document.addEventListener('astro:page-load', initHero);
log-atm-web-astro/src/pages/contacto.astro:266:  document.addEventListener('astro:page-load', initContactForm);
log-atm-web-astro/src/pages/servicios.astro:182:  document.addEventListener('astro:page-load', initServiciosFilters);
log-atm-web-astro/src/pages/industrias.astro:185:  document.addEventListener('astro:page-load', initIndCaption);
log-atm-web-astro/src/pages/industrias.astro:201:  document.addEventListener('astro:page-load', initIndustrias);
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["git","diff","-U0","9277e47","HEAD","--","log-atm-web-astro/src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"e88dff2a093c9c71af9002f601ffb88d148179b4","fecha":"2026-10-02T20:36:35-03:00","exit":0,"sha256":"47478a4761c54d752599420d711ef49cd88a0edf73223ca8e23d711da609410c","lineas":22,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.7`** · exit 0 · 22 líneas, 0 omitidas · HEAD `e88dff2a093c` · 2026-10-02T20:36:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`

```text
git diff -U0 9277e47 HEAD -- log-atm-web-astro/src
```

```text
diff --git a/log-atm-web-astro/src/scripts/scroll-animations.ts b/log-atm-web-astro/src/scripts/scroll-animations.ts
index b2f516b..6c2a52e 100644
--- a/log-atm-web-astro/src/scripts/scroll-animations.ts
+++ b/log-atm-web-astro/src/scripts/scroll-animations.ts
@@ -145,8 +145,2 @@ function initIndividualElements(): void {
-// Ejecutar al cargar (primera navegación, sin View Transitions)
-init();
-
-// Auto-init tras navegación con View Transitions de Astro
-document.addEventListener('astro:page-load', () => {
-  // Re-inicializar animaciones de scroll (ScrollTrigger fue destruido en astro:before-swap)
-  init();
-  // Auto-init de page heroes en cualquier página que los tenga
+// Auto-init de page heroes en cualquier página interna que los tenga
+function initPageHeroes(): void {
@@ -159 +153,5 @@ document.addEventListener('astro:page-load', () => {
-});
+}
+
+// Ejecutar al cargar el módulo (una vez por página)
+init();
+initPageHeroes();
```
<!-- evidencia:fin verify-report.7 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"argv","argv":["grep","-rn","data-hero-animate","log-atm-web-astro/src/pages"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"e88dff2a093c9c71af9002f601ffb88d148179b4","fecha":"2026-10-02T20:36:35-03:00","exit":0,"sha256":"4cd6176f607646f9356636fc6ddeb75c4cf0e3edcc2c544c8eedcbbc8e671dca","lineas":24,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.8`** · exit 0 · 24 líneas, 0 omitidas · HEAD `e88dff2a093c` · 2026-10-02T20:36:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`

```text
grep -rn data-hero-animate log-atm-web-astro/src/pages
```

```text
log-atm-web-astro/src/pages/contacto.astro:32:            <span class="page-hero__eyebrow" data-hero-animate>{t('contacto.heroEyebrow')}</span>
log-atm-web-astro/src/pages/contacto.astro:33:            <h1 class="page-hero__title" set:html={t('contacto.heroTitleHtml')} data-hero-animate></h1>
log-atm-web-astro/src/pages/contacto.astro:34:            <p class="page-hero__lead" data-hero-animate>{t('contacto.heroLead')}</p>
log-atm-web-astro/src/pages/contacto.astro:37:            <div class="page-hero__meta-item" data-hero-animate><span class="v">1:1</span><span class="k">{t('contacto.metaExec')}</span></div>
log-atm-web-astro/src/pages/contacto.astro:38:            <div class="page-hero__meta-item" data-hero-animate><span class="v">24/7</span><span class="k">{t('contacto.metaSupport')}</span></div>
log-atm-web-astro/src/pages/contacto.astro:39:            <div class="page-hero__meta-item" data-hero-animate><span class="v">CL</span><span class="k">{t('contacto.metaOffice')}</span></div>
log-atm-web-astro/src/pages/cotizar.astro:59:          <h1 class="quote-hero__title" set:html={t('cotizar.heroTitleHtml')} data-hero-animate></h1>
log-atm-web-astro/src/pages/cotizar.astro:60:          <p class="quote-hero__lead" data-hero-animate>{t('cotizar.heroLead')}</p>
log-atm-web-astro/src/pages/cotizar.astro:62:        <div class="quote-hero__chips" data-hero-animate>
log-atm-web-astro/src/pages/servicios.astro:49:            <span class="page-hero__eyebrow" data-hero-animate>{t('servicios.heroEyebrow')}</span>
log-atm-web-astro/src/pages/servicios.astro:50:            <h1 class="page-hero__title" set:html={t('servicios.heroTitleHtml')} data-hero-animate></h1>
log-atm-web-astro/src/pages/servicios.astro:51:            <p class="page-hero__lead" data-hero-animate>{t('servicios.heroLead')}</p>
log-atm-web-astro/src/pages/servicios.astro:54:            <div class="page-hero__meta-item" data-hero-animate><span class="v">11</span><span class="k">{t('servicios.metaActive')}</span></div>
log-atm-web-astro/src/pages/servicios.astro:55:            <div class="page-hero__meta-item" data-hero-animate><span class="v">24/7</span><span class="k">{t('servicios.metaOps')}</span></div>
log-atm-web-astro/src/pages/nosotros.astro:39:            <span class="page-hero__eyebrow" data-hero-animate>{t('nosotros.heroEyebrow')}</span>
log-atm-web-astro/src/pages/nosotros.astro:40:            <h1 class="page-hero__title" set:html={t('nosotros.heroTitleHtml')} data-hero-animate></h1>
log-atm-web-astro/src/pages/nosotros.astro:41:            <p class="page-hero__lead" data-hero-animate>{t('nosotros.heroLead')}</p>
log-atm-web-astro/src/pages/nosotros.astro:44:            <div class="page-hero__meta-item" data-hero-animate><span class="v">20<em>+</em></span><span class="k">{t('nosotros.metaYears')}</span></div>
log-atm-web-astro/src/pages/nosotros.astro:45:            <div class="page-hero__meta-item" data-hero-animate><span class="v">CL</span><span class="k">{t('nosotros.metaCapital')}</span></div>
log-atm-web-astro/src/pages/industrias.astro:47:            <span class="page-hero__eyebrow" data-hero-animate>{t('industrias.heroEyebrow')}</span>
log-atm-web-astro/src/pages/industrias.astro:48:            <h1 class="page-hero__title" set:html={t('industrias.heroTitleHtml')} data-hero-animate></h1>
log-atm-web-astro/src/pages/industrias.astro:49:            <p class="page-hero__lead" data-hero-animate>{t('industrias.heroLead')}</p>
log-atm-web-astro/src/pages/industrias.astro:52:            <div class="page-hero__meta-item" data-hero-animate><span class="v">12</span><span class="k">{t('industrias.metaSectors')}</span></div>
log-atm-web-astro/src/pages/industrias.astro:53:            <div class="page-hero__meta-item" data-hero-animate><span class="v">20<em>+</em></span><span class="k">{t('industrias.metaExpertise')}</span></div>
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/memory/changes/fix-internal-heroes-animation/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"e88dff2a093c9c71af9002f601ffb88d148179b4","fecha":"2026-10-02T20:37:11-03:00","exit":1,"sha256":"47d69fb5dc9d42d2340256a213ff6db599f12daed5f641cd79a2e076ee4aae87","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volveria a comprobar ese informe"} -->
**Evidencia `verify-report.9`** · exit 1 · 1 líneas, 0 omitidas · HEAD `e88dff2a093c` · 2026-10-02T20:37:11-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`
No re-comprobable: comprobar sobre verify-report.md volveria a comprobar ese informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/memory/changes/fix-internal-heroes-animation/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/memory/changes/fix-internal-heroes-animation/apply-evidence.md","bloques":9,"comprobados":5,"calzan":["apply-evidence.4","apply-evidence.5","apply-evidence.7","apply-evidence.8"],"no_calzan":[{"id":"apply-evidence.3","causa":"distinto","exit_registrado":0,"exit_actual":1,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.1","motivo":"l\u00ednea base medida sobre el c\u00f3digo previo al cambio; T2/T3 cambian el bundle medido y Lighthouse var\u00eda entre corridas"},{"id":"apply-evidence.2","motivo":"l\u00ednea base medida sobre el c\u00f3digo previo al cambio; T2/T3 cambian el bundle medido y Lighthouse var\u00eda entre corridas"},{"id":"apply-evidence.6","motivo":"Lighthouse var\u00eda entre corridas (CPU y red simuladas); una re-ejecuci\u00f3n no reproduce el mismo sha256"},{"id":"apply-evidence.9","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"}],"error":null}
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/memory/changes/fix-internal-heroes-animation/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"e88dff2a093c9c71af9002f601ffb88d148179b4","fecha":"2026-10-02T20:37:17-03:00","exit":0,"sha256":"8b4ec662e9ee8a9623b8e376bfc83ede1c066bf5d736346d2f469fd73563bc26","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo lo comprobaria a si mismo"} -->
**Evidencia `verify-report.10`** · exit 0 · 1 líneas, 0 omitidas · HEAD `e88dff2a093c` · 2026-10-02T20:37:17-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`
No re-comprobable: re-ejecutarlo lo comprobaria a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/memory/changes/fix-internal-heroes-animation/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/memory/changes/fix-internal-heroes-animation/verify-report.md","bloques":9,"comprobados":4,"calzan":["verify-report.5","verify-report.6","verify-report.7","verify-report.8"],"no_calzan":[],"omitidos":[{"id":"verify-report.1","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.2","motivo":"navegador y temporizacion de animacion: una re-ejecucion no reproduce el mismo sha256"},{"id":"verify-report.3","motivo":"Lighthouse varia entre corridas; una re-ejecucion no reproduce el mismo sha256"},{"id":"verify-report.4","motivo":"medicion de navegador no determinista; una re-ejecucion no reproduce el mismo sha256"},{"id":"verify-report.9","motivo":"comprobar sobre verify-report.md volveria a comprobar ese informe"}],"error":null}
```
<!-- evidencia:fin verify-report.10 -->
