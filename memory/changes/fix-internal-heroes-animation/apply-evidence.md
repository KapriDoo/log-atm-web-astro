---
type: apply-evidence
change_name: "fix-internal-heroes-animation"
created: "2026-10-02"
---

# Apply evidence — fix-internal-heroes-animation

Los bloques `evidencia` los escribe `evidence_block.py registrar`. La medición Lighthouse usa un script (forma archivo) que levanta `astro preview` sobre el `dist/` ya construido, corre Lighthouse 13.3.0 (móvil, solo performance, 3 corridas por página) con el Chrome for Testing de `log-atm-web-astro/chrome/`, deja los reportes JSON en el directorio de temporales del despacho y detiene el preview al salir. El `dist/` se construye antes con `npm run build` fuera de los bloques (escribe `dist/` y `.astro/`, ambos ignorados por git).

## T1 — Línea base de Lighthouse (código sin modificar)


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"archivo","argv":null,"texto":"#!/usr/bin/env bash\n# Medición Lighthouse (móvil, performance) contra `astro preview` del dist/ ya construido.\n# cwd esperado: <worktree\u003e/log-atm-web-astro. Reportes JSON en un directorio temporal nuevo.\nset -euo pipefail\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nLH=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/.bin/lighthouse\nTMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-apply-3mp42zw9\nOUT=$(mktemp -d \"$TMPROOT/lh.XXXXXXXX\")\nPORT=4399\nRUNS=3\n\nnpx astro preview --port \"$PORT\" --host 127.0.0.1 \u003e \"$OUT/preview.log\" 2\u003e&1 &\nPREVIEW_PID=$!\ndetener() { kill \"$PREVIEW_PID\" 2\u003e/dev/null || true; pkill -P \"$PREVIEW_PID\" 2\u003e/dev/null || true; wait \"$PREVIEW_PID\" 2\u003e/dev/null || true; }\ntrap detener EXIT\n\nfor _ in $(seq 1 60); do\n  if curl -s -o /dev/null \"http://127.0.0.1:$PORT/servicios/\"; then break; fi\n  sleep 0.5\ndone\n\necho \"lighthouse $(\"$LH\" --version) | chrome $(\"$CHROME_PATH\" --version) | runs=$RUNS | form-factor=mobile (default)\"\nfor PAGE in /servicios/ /cotizar/; do\n  for RUN in $(seq 1 \"$RUNS\"); do\n    F=\"$OUT/$(echo \"$PAGE\" | tr -d '/')-$RUN.json\"\n    \"$LH\" \"http://127.0.0.1:$PORT$PAGE\" --only-categories=performance --output=json --output-path=\"$F\" \\\n      --chrome-flags=\"--headless=new --no-sandbox\" --quiet \u003e/dev/null 2\u003e&1\n  done\n  node -e '\n    const fs = require(\"fs\");\n    const [page, ...files] = process.argv.slice(1);\n    const rows = files.map((f) =\u003e {\n      const r = JSON.parse(fs.readFileSync(f, \"utf8\"));\n      const lcpEl = r.audits[\"largest-contentful-paint-element\"];\n      const item = lcpEl?.details?.items?.[0]?.items?.[0]?.node;\n      return {\n        score: Math.round(r.categories.performance.score * 100),\n        lcp: Math.round(r.audits[\"largest-contentful-paint\"].numericValue),\n        fcp: Math.round(r.audits[\"first-contentful-paint\"].numericValue),\n        el: item ? `${item.selector} | ${(item.nodeLabel || \"\").slice(0, 60)}` : \"n/d\",\n      };\n    });\n    rows.forEach((x, i) =\u003e console.log(`${page} run${i + 1}: perf=${x.score} LCP=${x.lcp}ms FCP=${x.fcp}ms LCP-el=${x.el}`));\n    const med = (a) =\u003e a.slice().sort((p, q) =\u003e p - q)[Math.floor(a.length / 2)];\n    console.log(`${page} MEDIANA: perf=${med(rows.map((x) =\u003e x.score))} LCP=${med(rows.map((x) =\u003e x.lcp))}ms FCP=${med(rows.map((x) =\u003e x.fcp))}ms`);\n  ' \"$PAGE\" \"$OUT/$(echo \"$PAGE\" | tr -d '/')\"-*.json\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro","head":"9277e471563e6bc52d7b0c295e148c3f3597603d","fecha":"2026-10-02T20:16:28-03:00","exit":0,"sha256":"b35868348133269a7fa5527bfc3148e79f9a7c8ed0459982a08ef997f56de2ad","lineas":9,"omitidas":0,"no_recomprobable":"línea base medida sobre el código previo al cambio; T2/T3 cambian el bundle medido y Lighthouse varía entre corridas"} -->
**Evidencia `apply-evidence.1`** · exit 0 · 9 líneas, 0 omitidas · HEAD `9277e471563e` · 2026-10-02T20:16:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro`
No re-comprobable: línea base medida sobre el código previo al cambio; T2/T3 cambian el bundle medido y Lighthouse varía entre corridas

```bash
#!/usr/bin/env bash
# Medición Lighthouse (móvil, performance) contra `astro preview` del dist/ ya construido.
# cwd esperado: <worktree>/log-atm-web-astro. Reportes JSON en un directorio temporal nuevo.
set -euo pipefail
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
LH=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/.bin/lighthouse
TMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-apply-3mp42zw9
OUT=$(mktemp -d "$TMPROOT/lh.XXXXXXXX")
PORT=4399
RUNS=3

npx astro preview --port "$PORT" --host 127.0.0.1 > "$OUT/preview.log" 2>&1 &
PREVIEW_PID=$!
detener() { kill "$PREVIEW_PID" 2>/dev/null || true; pkill -P "$PREVIEW_PID" 2>/dev/null || true; wait "$PREVIEW_PID" 2>/dev/null || true; }
trap detener EXIT

for _ in $(seq 1 60); do
  if curl -s -o /dev/null "http://127.0.0.1:$PORT/servicios/"; then break; fi
  sleep 0.5
done

echo "lighthouse $("$LH" --version) | chrome $("$CHROME_PATH" --version) | runs=$RUNS | form-factor=mobile (default)"
for PAGE in /servicios/ /cotizar/; do
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
      const lcpEl = r.audits["largest-contentful-paint-element"];
      const item = lcpEl?.details?.items?.[0]?.items?.[0]?.node;
      return {
        score: Math.round(r.categories.performance.score * 100),
        lcp: Math.round(r.audits["largest-contentful-paint"].numericValue),
        fcp: Math.round(r.audits["first-contentful-paint"].numericValue),
        el: item ? `${item.selector} | ${(item.nodeLabel || "").slice(0, 60)}` : "n/d",
      };
    });
    rows.forEach((x, i) => console.log(`${page} run${i + 1}: perf=${x.score} LCP=${x.lcp}ms FCP=${x.fcp}ms LCP-el=${x.el}`));
    const med = (a) => a.slice().sort((p, q) => p - q)[Math.floor(a.length / 2)];
    console.log(`${page} MEDIANA: perf=${med(rows.map((x) => x.score))} LCP=${med(rows.map((x) => x.lcp))}ms FCP=${med(rows.map((x) => x.fcp))}ms`);
  ' "$PAGE" "$OUT/$(echo "$PAGE" | tr -d '/')"-*.json
done
```

```text
lighthouse 13.3.0 | chrome Google Chrome for Testing 148.0.7778.167  | runs=3 | form-factor=mobile (default)
/servicios/ run1: perf=97 LCP=2092ms FCP=2017ms LCP-el=n/d
/servicios/ run2: perf=93 LCP=2777ms FCP=2314ms LCP-el=n/d
/servicios/ run3: perf=97 LCP=2294ms FCP=1994ms LCP-el=n/d
/servicios/ MEDIANA: perf=97 LCP=2294ms FCP=2017ms
/cotizar/ run1: perf=90 LCP=2463ms FCP=2152ms LCP-el=n/d
/cotizar/ run2: perf=93 LCP=2142ms FCP=1842ms LCP-el=n/d
/cotizar/ run3: perf=93 LCP=2139ms FCP=1839ms LCP-el=n/d
/cotizar/ MEDIANA: perf=93 LCP=2142ms FCP=1842ms
```
<!-- evidencia:fin apply-evidence.1 -->

El bloque `apply-evidence.1` deja `LCP-el=n/d`: en Lighthouse 13 el audit `largest-contentful-paint-element` ya no existe y el elemento LCP se publica en el insight `lcp-breakdown-insight`. El bloque `apply-evidence.2` repite la línea base sobre el mismo `dist/` con el script corregido (lee el nodo LCP y el `elementRenderDelay` de ese insight) y 5 corridas por página para bajar la varianza; es la línea base que usa la comparación de T4.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"archivo","argv":null,"texto":"#!/usr/bin/env bash\n# Medición Lighthouse (móvil, performance) contra `astro preview` del dist/ ya construido.\n# cwd esperado: <worktree\u003e/log-atm-web-astro. Reportes JSON en un directorio temporal nuevo.\nset -euo pipefail\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nLH=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/.bin/lighthouse\nTMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-apply-3mp42zw9\nOUT=$(mktemp -d \"$TMPROOT/lh.XXXXXXXX\")\nPORT=4399\nRUNS=5\n\nnpx astro preview --port \"$PORT\" --host 127.0.0.1 \u003e \"$OUT/preview.log\" 2\u003e&1 &\nPREVIEW_PID=$!\ndetener() { kill \"$PREVIEW_PID\" 2\u003e/dev/null || true; pkill -P \"$PREVIEW_PID\" 2\u003e/dev/null || true; wait \"$PREVIEW_PID\" 2\u003e/dev/null || true; }\ntrap detener EXIT\n\nfor _ in $(seq 1 60); do\n  if curl -s -o /dev/null \"http://127.0.0.1:$PORT/servicios/\"; then break; fi\n  sleep 0.5\ndone\n\necho \"lighthouse $(\"$LH\" --version) | chrome $(\"$CHROME_PATH\" --version) | runs=$RUNS | form-factor=mobile (default)\"\nfor PAGE in /servicios/ /cotizar/; do\n  for RUN in $(seq 1 \"$RUNS\"); do\n    F=\"$OUT/$(echo \"$PAGE\" | tr -d '/')-$RUN.json\"\n    \"$LH\" \"http://127.0.0.1:$PORT$PAGE\" --only-categories=performance --output=json --output-path=\"$F\" \\\n      --chrome-flags=\"--headless=new --no-sandbox\" --quiet \u003e/dev/null 2\u003e&1\n  done\n  node -e '\n    const fs = require(\"fs\");\n    const [page, ...files] = process.argv.slice(1);\n    const rows = files.map((f) =\u003e {\n      const r = JSON.parse(fs.readFileSync(f, \"utf8\"));\n      // Lighthouse 13: el elemento LCP vive en el insight lcp-breakdown-insight (ítem de tipo node)\n      const parts = r.audits[\"lcp-breakdown-insight\"]?.details?.items ?? [];\n      const item = parts.find((x) =\u003e x.type === \"node\");\n      const rd = parts.find((x) =\u003e x.type === \"table\")?.items?.find((x) =\u003e x.subpart === \"elementRenderDelay\");\n      return {\n        score: Math.round(r.categories.performance.score * 100),\n        lcp: Math.round(r.audits[\"largest-contentful-paint\"].numericValue),\n        fcp: Math.round(r.audits[\"first-contentful-paint\"].numericValue),\n        rdelay: rd ? Math.round(rd.duration) : \"n/d\",\n        el: item ? `${item.selector} | ${(item.nodeLabel || \"\").slice(0, 60)}` : \"n/d\",\n      };\n    });\n    rows.forEach((x, i) =\u003e console.log(`${page} run${i + 1}: perf=${x.score} LCP=${x.lcp}ms FCP=${x.fcp}ms renderDelay=${x.rdelay}ms LCP-el=${x.el}`));\n    const med = (a) =\u003e a.slice().sort((p, q) =\u003e p - q)[Math.floor(a.length / 2)];\n    console.log(`${page} MEDIANA: perf=${med(rows.map((x) =\u003e x.score))} LCP=${med(rows.map((x) =\u003e x.lcp))}ms FCP=${med(rows.map((x) =\u003e x.fcp))}ms`);\n  ' \"$PAGE\" \"$OUT/$(echo \"$PAGE\" | tr -d '/')\"-*.json\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro","head":"9277e471563e6bc52d7b0c295e148c3f3597603d","fecha":"2026-10-02T20:18:49-03:00","exit":0,"sha256":"b2656553948b3ec004236d9ec9fc54a9ab7bfe72a2edc4185362001f3de2e4d4","lineas":13,"omitidas":0,"no_recomprobable":"línea base medida sobre el código previo al cambio; T2/T3 cambian el bundle medido y Lighthouse varía entre corridas"} -->
**Evidencia `apply-evidence.2`** · exit 0 · 13 líneas, 0 omitidas · HEAD `9277e471563e` · 2026-10-02T20:18:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro`
No re-comprobable: línea base medida sobre el código previo al cambio; T2/T3 cambian el bundle medido y Lighthouse varía entre corridas

```bash
#!/usr/bin/env bash
# Medición Lighthouse (móvil, performance) contra `astro preview` del dist/ ya construido.
# cwd esperado: <worktree>/log-atm-web-astro. Reportes JSON en un directorio temporal nuevo.
set -euo pipefail
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
LH=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/.bin/lighthouse
TMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-apply-3mp42zw9
OUT=$(mktemp -d "$TMPROOT/lh.XXXXXXXX")
PORT=4399
RUNS=5

npx astro preview --port "$PORT" --host 127.0.0.1 > "$OUT/preview.log" 2>&1 &
PREVIEW_PID=$!
detener() { kill "$PREVIEW_PID" 2>/dev/null || true; pkill -P "$PREVIEW_PID" 2>/dev/null || true; wait "$PREVIEW_PID" 2>/dev/null || true; }
trap detener EXIT

for _ in $(seq 1 60); do
  if curl -s -o /dev/null "http://127.0.0.1:$PORT/servicios/"; then break; fi
  sleep 0.5
done

echo "lighthouse $("$LH" --version) | chrome $("$CHROME_PATH" --version) | runs=$RUNS | form-factor=mobile (default)"
for PAGE in /servicios/ /cotizar/; do
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
      // Lighthouse 13: el elemento LCP vive en el insight lcp-breakdown-insight (ítem de tipo node)
      const parts = r.audits["lcp-breakdown-insight"]?.details?.items ?? [];
      const item = parts.find((x) => x.type === "node");
      const rd = parts.find((x) => x.type === "table")?.items?.find((x) => x.subpart === "elementRenderDelay");
      return {
        score: Math.round(r.categories.performance.score * 100),
        lcp: Math.round(r.audits["largest-contentful-paint"].numericValue),
        fcp: Math.round(r.audits["first-contentful-paint"].numericValue),
        rdelay: rd ? Math.round(rd.duration) : "n/d",
        el: item ? `${item.selector} | ${(item.nodeLabel || "").slice(0, 60)}` : "n/d",
      };
    });
    rows.forEach((x, i) => console.log(`${page} run${i + 1}: perf=${x.score} LCP=${x.lcp}ms FCP=${x.fcp}ms renderDelay=${x.rdelay}ms LCP-el=${x.el}`));
    const med = (a) => a.slice().sort((p, q) => p - q)[Math.floor(a.length / 2)];
    console.log(`${page} MEDIANA: perf=${med(rows.map((x) => x.score))} LCP=${med(rows.map((x) => x.lcp))}ms FCP=${med(rows.map((x) => x.fcp))}ms`);
  ' "$PAGE" "$OUT/$(echo "$PAGE" | tr -d '/')"-*.json
done
```

```text
lighthouse 13.3.0 | chrome Google Chrome for Testing 148.0.7778.167  | runs=5 | form-factor=mobile (default)
/servicios/ run1: perf=97 LCP=2146ms FCP=1996ms renderDelay=154ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ run2: perf=93 LCP=2774ms FCP=2312ms renderDelay=148ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ run3: perf=97 LCP=2298ms FCP=1998ms renderDelay=147ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ run4: perf=97 LCP=2295ms FCP=1995ms renderDelay=141ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ run5: perf=97 LCP=2292ms FCP=1992ms renderDelay=136ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ MEDIANA: perf=97 LCP=2295ms FCP=1996ms
/cotizar/ run1: perf=89 LCP=2762ms FCP=2227ms renderDelay=134ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ run2: perf=92 LCP=2138ms FCP=1988ms renderDelay=117ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ run3: perf=91 LCP=2465ms FCP=2015ms renderDelay=127ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ run4: perf=90 LCP=2466ms FCP=2166ms renderDelay=126ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ run5: perf=92 LCP=2135ms FCP=1985ms renderDelay=115ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ MEDIANA: perf=91 LCP=2465ms FCP=2015ms
```
<!-- evidencia:fin apply-evidence.2 -->

**Lectura de la línea base (`apply-evidence.2`)**: en `/servicios/` el elemento LCP es el `h1.page-hero__title` (lleva `data-hero-animate`) y en `/cotizar/` es el `p.quote-hero__lead` (también lleva `data-hero-animate`); hoy ninguno se anima, porque el listener `astro:page-load` no corre. La mediana de performance de `/cotizar/` ya está bajo 95 antes del cambio: el umbral del proyecto no se cumple en esa página con el código previo (hallazgo preexistente, fuera del alcance de este cambio). Ambos elementos LCP pasan a animarse con T2, así que el `elementRenderDelay` y el LCP son las cifras a comparar en T4.

Commit: sin commit propio (medición); el bloque se versiona junto con la evidencia de T4.

## T2 + T3 — Auto-init de heroes en el nivel superior y retiro del listener `astro:page-load`

`src/scripts/scroll-animations.ts`: la detección de `.page-hero` / `.quote-hero` y las llamadas a `animatePageHero` pasan a `initPageHeroes()`, invocada en el nivel superior del módulo después de `init()`; el listener `astro:page-load` y su comentario se eliminan. `animatePageHero` no cambia (defaults 0.12 s / 24 px / 0.6 s, sin opciones). El `dist/` de los bloques siguientes sale de `npm run build` sobre este código (corrida fuera de bloque porque escribe `dist/` y `.astro/`).

Verificación en navegador (script en forma archivo; puppeteer-core del paquete Lighthouse y el mismo Chrome for Testing, contra `astro preview`). Por cada elemento `[data-hero-animate]` cuenta las veces que su `opacity` inline pasa a `0` (inicio del `gsap.from`), los elementos con opacidad computada 1 a los 2,5 s, el estilo inline residual tras `clearProps` y la separación entre los fines de tween consecutivos:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"archivo","argv":null,"texto":"#!/usr/bin/env bash\n# Verificación en navegador de la entrada de los heroes contra `astro preview` del dist/ construido.\n# Cuenta, por elemento [data-hero-animate], cuántas veces GSAP lo pone en opacity:0 (inicio del tween\n# gsap.from) y comprueba el estado final visible. cwd esperado: <worktree\u003e/log-atm-web-astro.\nset -euo pipefail\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nexport PPTR=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/puppeteer-core\nTMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-apply-3mp42zw9\nOUT=$(mktemp -d \"$TMPROOT/hv.XXXXXXXX\")\nexport PORT=4398\n\nnpx astro preview --port \"$PORT\" --host 127.0.0.1 \u003e \"$OUT/preview.log\" 2\u003e&1 &\nPREVIEW_PID=$!\ndetener() { kill \"$PREVIEW_PID\" 2\u003e/dev/null || true; pkill -P \"$PREVIEW_PID\" 2\u003e/dev/null || true; wait \"$PREVIEW_PID\" 2\u003e/dev/null || true; }\ntrap detener EXIT\n\nfor _ in $(seq 1 60); do\n  if curl -s -o /dev/null \"http://127.0.0.1:$PORT/servicios/\"; then break; fi\n  sleep 0.5\ndone\n\nnode --input-type=module -e '\nconst { default: puppeteer } = await import(process.env.PPTR + \"/lib/esm/puppeteer/puppeteer-core.js\");\nconst base = `http://127.0.0.1:${process.env.PORT}`;\nconst pages = [\"servicios\", \"industrias\", \"nosotros\", \"contacto\", \"cotizar\"];\nconst urls = [\"\", \"/en\", \"/pt\"].flatMap((l) =\u003e pages.map((p) =\u003e `${l}/${p}/`));\n// Observador instalado antes de cualquier script: por cada [data-hero-animate] cuenta las\n// transiciones de su opacity inline a \"0\" (inicio de gsap.from) y guarda el instante en que GSAP\n// limpia el estilo inline (fin del tween, clearProps).\nconst observer = () =\u003e {\n  window.__heroStarts = new Map();\n  window.__heroEnds = new Map();\n  const ultimo = new WeakMap();\n  new MutationObserver((muts) =\u003e {\n    for (const m of muts) {\n      const el = m.target;\n      if (!(el instanceof HTMLElement) || !el.hasAttribute(\"data-hero-animate\")) continue;\n      const op = el.style.opacity;\n      if (op === \"0\" && ultimo.get(el) !== \"0\") window.__heroStarts.set(el, (window.__heroStarts.get(el) || 0) + 1);\n      if (op === \"\" && ultimo.get(el) !== undefined && ultimo.get(el) !== \"\") window.__heroEnds.set(el, performance.now());\n      ultimo.set(el, op);\n    }\n  }).observe(document, { subtree: true, attributes: true, attributeFilter: [\"style\"] });\n};\nconst leer = () =\u003e {\n  const els = [...document.querySelectorAll(\"[data-hero-animate]\")];\n  const starts = els.map((e) =\u003e window.__heroStarts?.get(e) || 0);\n  return {\n    n: els.length,\n    starts: [...new Set(starts)].join(\"/\"),\n    visibles: els.filter((e) =\u003e getComputedStyle(e).opacity === \"1\").length,\n    inline: els.filter((e) =\u003e e.style.opacity !== \"\" || e.style.transform !== \"\").length,\n    // Separación entre fines de tween consecutivos (ms): refleja el stagger\n    stagger: (() =\u003e {\n      const t = els.map((e) =\u003e window.__heroEnds?.get(e)).filter((x) =\u003e x !== undefined);\n      return t.length \u003e 1 ? t.slice(1).map((x, i) =\u003e Math.round(x - t[i])).join(\",\") : \"-\";\n    })(),\n    raiz: document.querySelector(\".page-hero\") ? \".page-hero\" : document.querySelector(\".quote-hero\") ? \".quote-hero\" : document.querySelector(\".hero-b\") ? \".hero-b\" : \"-\",\n  };\n};\nconst browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: [\"--no-sandbox\"] });\nconst casos = [\n  [\"movimiento\", urls.concat([\"/\"]), async () =\u003e {}],\n  [\"reduced-motion\", [\"/servicios/\", \"/cotizar/\", \"/en/nosotros/\", \"/pt/contacto/\", \"/\"], async (pg) =\u003e pg.emulateMediaFeatures([{ name: \"prefers-reduced-motion\", value: \"reduce\" }])],\n  [\"sin-js\", [\"/servicios/\", \"/cotizar/\", \"/en/industrias/\", \"/pt/nosotros/\"], async (pg) =\u003e pg.setJavaScriptEnabled(false)],\n];\nfor (const [modo, lista, preparar] of casos) {\n  for (const u of lista) {\n    const pg = await browser.newPage();\n    await preparar(pg);\n    if (modo !== \"sin-js\") await pg.evaluateOnNewDocument(observer);\n    await pg.goto(base + u, { waitUntil: \"load\" });\n    await new Promise((r) =\u003e setTimeout(r, 2500));\n    const r = await pg.evaluate(leer);\n    console.log(`${modo.padEnd(14)} ${u.padEnd(16)} raiz=${r.raiz} hero-animate=${r.n} inicios-por-elemento=${r.starts || \"-\"} visibles=${r.visibles}/${r.n} estilo-inline-residual=${r.inline} separacion-fin-ms=${r.stagger}`);\n    await pg.close();\n  }\n}\nawait browser.close();\n'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro","head":"9277e471563e6bc52d7b0c295e148c3f3597603d","fecha":"2026-10-02T20:21:29-03:00","exit":0,"sha256":"e0dd5050d80770d70859678ea93aad19589236ea8825a50859eefd27d9ec4f79","lineas":25,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.3`** · exit 0 · 25 líneas, 0 omitidas · HEAD `9277e471563e` · 2026-10-02T20:21:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro`

```bash
#!/usr/bin/env bash
# Verificación en navegador de la entrada de los heroes contra `astro preview` del dist/ construido.
# Cuenta, por elemento [data-hero-animate], cuántas veces GSAP lo pone en opacity:0 (inicio del tween
# gsap.from) y comprueba el estado final visible. cwd esperado: <worktree>/log-atm-web-astro.
set -euo pipefail
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
export PPTR=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/puppeteer-core
TMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-apply-3mp42zw9
OUT=$(mktemp -d "$TMPROOT/hv.XXXXXXXX")
export PORT=4398

npx astro preview --port "$PORT" --host 127.0.0.1 > "$OUT/preview.log" 2>&1 &
PREVIEW_PID=$!
detener() { kill "$PREVIEW_PID" 2>/dev/null || true; pkill -P "$PREVIEW_PID" 2>/dev/null || true; wait "$PREVIEW_PID" 2>/dev/null || true; }
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
// Observador instalado antes de cualquier script: por cada [data-hero-animate] cuenta las
// transiciones de su opacity inline a "0" (inicio de gsap.from) y guarda el instante en que GSAP
// limpia el estilo inline (fin del tween, clearProps).
const observer = () => {
  window.__heroStarts = new Map();
  window.__heroEnds = new Map();
  const ultimo = new WeakMap();
  new MutationObserver((muts) => {
    for (const m of muts) {
      const el = m.target;
      if (!(el instanceof HTMLElement) || !el.hasAttribute("data-hero-animate")) continue;
      const op = el.style.opacity;
      if (op === "0" && ultimo.get(el) !== "0") window.__heroStarts.set(el, (window.__heroStarts.get(el) || 0) + 1);
      if (op === "" && ultimo.get(el) !== undefined && ultimo.get(el) !== "") window.__heroEnds.set(el, performance.now());
      ultimo.set(el, op);
    }
  }).observe(document, { subtree: true, attributes: true, attributeFilter: ["style"] });
};
const leer = () => {
  const els = [...document.querySelectorAll("[data-hero-animate]")];
  const starts = els.map((e) => window.__heroStarts?.get(e) || 0);
  return {
    n: els.length,
    starts: [...new Set(starts)].join("/"),
    visibles: els.filter((e) => getComputedStyle(e).opacity === "1").length,
    inline: els.filter((e) => e.style.opacity !== "" || e.style.transform !== "").length,
    // Separación entre fines de tween consecutivos (ms): refleja el stagger
    stagger: (() => {
      const t = els.map((e) => window.__heroEnds?.get(e)).filter((x) => x !== undefined);
      return t.length > 1 ? t.slice(1).map((x, i) => Math.round(x - t[i])).join(",") : "-";
    })(),
    raiz: document.querySelector(".page-hero") ? ".page-hero" : document.querySelector(".quote-hero") ? ".quote-hero" : document.querySelector(".hero-b") ? ".hero-b" : "-",
  };
};
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: ["--no-sandbox"] });
const casos = [
  ["movimiento", urls.concat(["/"]), async () => {}],
  ["reduced-motion", ["/servicios/", "/cotizar/", "/en/nosotros/", "/pt/contacto/", "/"], async (pg) => pg.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])],
  ["sin-js", ["/servicios/", "/cotizar/", "/en/industrias/", "/pt/nosotros/"], async (pg) => pg.setJavaScriptEnabled(false)],
];
for (const [modo, lista, preparar] of casos) {
  for (const u of lista) {
    const pg = await browser.newPage();
    await preparar(pg);
    if (modo !== "sin-js") await pg.evaluateOnNewDocument(observer);
    await pg.goto(base + u, { waitUntil: "load" });
    await new Promise((r) => setTimeout(r, 2500));
    const r = await pg.evaluate(leer);
    console.log(`${modo.padEnd(14)} ${u.padEnd(16)} raiz=${r.raiz} hero-animate=${r.n} inicios-por-elemento=${r.starts || "-"} visibles=${r.visibles}/${r.n} estilo-inline-residual=${r.inline} separacion-fin-ms=${r.stagger}`);
    await pg.close();
  }
}
await browser.close();
'
```

```text
movimiento     /servicios/      raiz=.page-hero hero-animate=5 inicios-por-elemento=1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=116,131,117,117
movimiento     /industrias/     raiz=.page-hero hero-animate=5 inicios-por-elemento=0/1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=116,134,117,117
movimiento     /nosotros/       raiz=.page-hero hero-animate=5 inicios-por-elemento=0/1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=117,117,133,117
movimiento     /contacto/       raiz=.page-hero hero-animate=6 inicios-por-elemento=0/1 visibles=6/6 estilo-inline-residual=0 separacion-fin-ms=116,117,133,117,117
movimiento     /cotizar/        raiz=.quote-hero hero-animate=3 inicios-por-elemento=1 visibles=3/3 estilo-inline-residual=0 separacion-fin-ms=117,117
movimiento     /en/servicios/   raiz=.page-hero hero-animate=5 inicios-por-elemento=0/1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=133,117,116,117
movimiento     /en/industrias/  raiz=.page-hero hero-animate=5 inicios-por-elemento=0/1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=133,117,117,117
movimiento     /en/nosotros/    raiz=.page-hero hero-animate=5 inicios-por-elemento=0/1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=116,117,133,117
movimiento     /en/contacto/    raiz=.page-hero hero-animate=6 inicios-por-elemento=1 visibles=6/6 estilo-inline-residual=0 separacion-fin-ms=116,116,117,133,117
movimiento     /en/cotizar/     raiz=.quote-hero hero-animate=3 inicios-por-elemento=0/1 visibles=3/3 estilo-inline-residual=0 separacion-fin-ms=116,117
movimiento     /pt/servicios/   raiz=.page-hero hero-animate=5 inicios-por-elemento=0/1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=133,116,117,117
movimiento     /pt/industrias/  raiz=.page-hero hero-animate=5 inicios-por-elemento=0/1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=133,117,117,117
movimiento     /pt/nosotros/    raiz=.page-hero hero-animate=5 inicios-por-elemento=0/1 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=116,117,133,117
movimiento     /pt/contacto/    raiz=.page-hero hero-animate=6 inicios-por-elemento=0/1 visibles=6/6 estilo-inline-residual=0 separacion-fin-ms=117,117,116,117,133
movimiento     /pt/cotizar/     raiz=.quote-hero hero-animate=3 inicios-por-elemento=0/1 visibles=3/3 estilo-inline-residual=0 separacion-fin-ms=133,117
movimiento     /                raiz=.hero-b hero-animate=4 inicios-por-elemento=0/1 visibles=4/4 estilo-inline-residual=0 separacion-fin-ms=117,117,116
reduced-motion /servicios/      raiz=.page-hero hero-animate=5 inicios-por-elemento=0 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=-
reduced-motion /cotizar/        raiz=.quote-hero hero-animate=3 inicios-por-elemento=0 visibles=3/3 estilo-inline-residual=0 separacion-fin-ms=-
reduced-motion /en/nosotros/    raiz=.page-hero hero-animate=5 inicios-por-elemento=0 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=-
reduced-motion /pt/contacto/    raiz=.page-hero hero-animate=6 inicios-por-elemento=0 visibles=6/6 estilo-inline-residual=0 separacion-fin-ms=-
reduced-motion /                raiz=.hero-b hero-animate=4 inicios-por-elemento=0 visibles=4/4 estilo-inline-residual=0 separacion-fin-ms=-
sin-js         /servicios/      raiz=.page-hero hero-animate=5 inicios-por-elemento=0 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=-
sin-js         /cotizar/        raiz=.quote-hero hero-animate=3 inicios-por-elemento=0 visibles=3/3 estilo-inline-residual=0 separacion-fin-ms=-
sin-js         /en/industrias/  raiz=.page-hero hero-animate=5 inicios-por-elemento=0 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=-
sin-js         /pt/nosotros/    raiz=.page-hero hero-animate=5 inicios-por-elemento=0 visibles=5/5 estilo-inline-residual=0 separacion-fin-ms=-
```
<!-- evidencia:fin apply-evidence.3 -->

**Lectura de `apply-evidence.3`**: con movimiento, las 15 URLs internas (5 páginas × es/en/pt) y el home muestran a lo sumo un inicio de tween por elemento (`inicios-por-elemento` nunca llega a 2) y todos los elementos registran un fin de tween (`separacion-fin-ms` tiene n−1 valores), así que cada hero anima una sola vez; el valor 0 que aparece junto al 1 corresponde al primer elemento del stagger, que GSAP ya pinta con opacidad mayor que 0 en su primer frame (render diferido al primer tick). La separación entre fines que muestra el bloque es coherente con el stagger de 120 ms del código. El home usa `.hero-b` (no `.page-hero` ni `.quote-hero`), sin doble animación. Con `prefers-reduced-motion: reduce` y sin JavaScript no hay inicios de tween y todos los elementos quedan visibles, sin estilo inline residual.

Comprobaciones de T3 (sin `astro:page-load` en el archivo; el diff contra la base del cambio dentro de `src/` toca solo `scroll-animations.ts`):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"argv","argv":["grep","-c","astro:page-load","log-atm-web-astro/src/scripts/scroll-animations.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"3cb43dc62a3dec658a16fb82aa36f084c31f3c12","fecha":"2026-10-02T20:22:29-03:00","exit":1,"sha256":"9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.4`** · exit 1 · 1 líneas, 0 omitidas · HEAD `3cb43dc62a3d` · 2026-10-02T20:22:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`

```text
grep -c astro:page-load log-atm-web-astro/src/scripts/scroll-animations.ts
```

```text
0
```
<!-- evidencia:fin apply-evidence.4 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"argv","argv":["git","diff","--name-only","9277e47","HEAD","--","log-atm-web-astro/src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"3cb43dc62a3dec658a16fb82aa36f084c31f3c12","fecha":"2026-10-02T20:22:29-03:00","exit":0,"sha256":"73cd04fc7424907e00aae2559f4e34c2822cf141f627631d0d09f574a6e06291","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.5`** · exit 0 · 1 líneas, 0 omitidas · HEAD `3cb43dc62a3d` · 2026-10-02T20:22:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`

```text
git diff --name-only 9277e47 HEAD -- log-atm-web-astro/src
```

```text
log-atm-web-astro/src/scripts/scroll-animations.ts
```
<!-- evidencia:fin apply-evidence.5 -->

Commit: `3cb43dc` — fix(animations): run internal page hero entrance on module load.

## T4 — Lighthouse después del cambio

Mismo script que `apply-evidence.2` (5 corridas por página) sobre el `dist/` construido con el cambio:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"archivo","argv":null,"texto":"#!/usr/bin/env bash\n# Medición Lighthouse (móvil, performance) contra `astro preview` del dist/ ya construido.\n# cwd esperado: <worktree\u003e/log-atm-web-astro. Reportes JSON en un directorio temporal nuevo.\nset -euo pipefail\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nLH=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/.bin/lighthouse\nTMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-apply-3mp42zw9\nOUT=$(mktemp -d \"$TMPROOT/lh.XXXXXXXX\")\nPORT=4399\nRUNS=5\n\nnpx astro preview --port \"$PORT\" --host 127.0.0.1 \u003e \"$OUT/preview.log\" 2\u003e&1 &\nPREVIEW_PID=$!\ndetener() { kill \"$PREVIEW_PID\" 2\u003e/dev/null || true; pkill -P \"$PREVIEW_PID\" 2\u003e/dev/null || true; wait \"$PREVIEW_PID\" 2\u003e/dev/null || true; }\ntrap detener EXIT\n\nfor _ in $(seq 1 60); do\n  if curl -s -o /dev/null \"http://127.0.0.1:$PORT/servicios/\"; then break; fi\n  sleep 0.5\ndone\n\necho \"lighthouse $(\"$LH\" --version) | chrome $(\"$CHROME_PATH\" --version) | runs=$RUNS | form-factor=mobile (default)\"\nfor PAGE in /servicios/ /cotizar/; do\n  for RUN in $(seq 1 \"$RUNS\"); do\n    F=\"$OUT/$(echo \"$PAGE\" | tr -d '/')-$RUN.json\"\n    \"$LH\" \"http://127.0.0.1:$PORT$PAGE\" --only-categories=performance --output=json --output-path=\"$F\" \\\n      --chrome-flags=\"--headless=new --no-sandbox\" --quiet \u003e/dev/null 2\u003e&1\n  done\n  node -e '\n    const fs = require(\"fs\");\n    const [page, ...files] = process.argv.slice(1);\n    const rows = files.map((f) =\u003e {\n      const r = JSON.parse(fs.readFileSync(f, \"utf8\"));\n      // Lighthouse 13: el elemento LCP vive en el insight lcp-breakdown-insight (ítem de tipo node)\n      const parts = r.audits[\"lcp-breakdown-insight\"]?.details?.items ?? [];\n      const item = parts.find((x) =\u003e x.type === \"node\");\n      const rd = parts.find((x) =\u003e x.type === \"table\")?.items?.find((x) =\u003e x.subpart === \"elementRenderDelay\");\n      return {\n        score: Math.round(r.categories.performance.score * 100),\n        lcp: Math.round(r.audits[\"largest-contentful-paint\"].numericValue),\n        fcp: Math.round(r.audits[\"first-contentful-paint\"].numericValue),\n        rdelay: rd ? Math.round(rd.duration) : \"n/d\",\n        el: item ? `${item.selector} | ${(item.nodeLabel || \"\").slice(0, 60)}` : \"n/d\",\n      };\n    });\n    rows.forEach((x, i) =\u003e console.log(`${page} run${i + 1}: perf=${x.score} LCP=${x.lcp}ms FCP=${x.fcp}ms renderDelay=${x.rdelay}ms LCP-el=${x.el}`));\n    const med = (a) =\u003e a.slice().sort((p, q) =\u003e p - q)[Math.floor(a.length / 2)];\n    console.log(`${page} MEDIANA: perf=${med(rows.map((x) =\u003e x.score))} LCP=${med(rows.map((x) =\u003e x.lcp))}ms FCP=${med(rows.map((x) =\u003e x.fcp))}ms`);\n  ' \"$PAGE\" \"$OUT/$(echo \"$PAGE\" | tr -d '/')\"-*.json\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro","head":"3cb43dc62a3dec658a16fb82aa36f084c31f3c12","fecha":"2026-10-02T20:24:27-03:00","exit":0,"sha256":"7cfb07ebf28390e4a2f62f7eee287c651b13f410ded489578cb8d1315617d187","lineas":13,"omitidas":0,"no_recomprobable":"Lighthouse varía entre corridas (CPU y red simuladas); una re-ejecución no reproduce el mismo sha256"} -->
**Evidencia `apply-evidence.6`** · exit 0 · 13 líneas, 0 omitidas · HEAD `3cb43dc62a3d` · 2026-10-02T20:24:27-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro`
No re-comprobable: Lighthouse varía entre corridas (CPU y red simuladas); una re-ejecución no reproduce el mismo sha256

```bash
#!/usr/bin/env bash
# Medición Lighthouse (móvil, performance) contra `astro preview` del dist/ ya construido.
# cwd esperado: <worktree>/log-atm-web-astro. Reportes JSON en un directorio temporal nuevo.
set -euo pipefail
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
LH=/home/kapridoo/.npm/_npx/0f94ee7615faf582/node_modules/.bin/lighthouse
TMPROOT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-internal-heroes-animation/sdd-apply-3mp42zw9
OUT=$(mktemp -d "$TMPROOT/lh.XXXXXXXX")
PORT=4399
RUNS=5

npx astro preview --port "$PORT" --host 127.0.0.1 > "$OUT/preview.log" 2>&1 &
PREVIEW_PID=$!
detener() { kill "$PREVIEW_PID" 2>/dev/null || true; pkill -P "$PREVIEW_PID" 2>/dev/null || true; wait "$PREVIEW_PID" 2>/dev/null || true; }
trap detener EXIT

for _ in $(seq 1 60); do
  if curl -s -o /dev/null "http://127.0.0.1:$PORT/servicios/"; then break; fi
  sleep 0.5
done

echo "lighthouse $("$LH" --version) | chrome $("$CHROME_PATH" --version) | runs=$RUNS | form-factor=mobile (default)"
for PAGE in /servicios/ /cotizar/; do
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
      // Lighthouse 13: el elemento LCP vive en el insight lcp-breakdown-insight (ítem de tipo node)
      const parts = r.audits["lcp-breakdown-insight"]?.details?.items ?? [];
      const item = parts.find((x) => x.type === "node");
      const rd = parts.find((x) => x.type === "table")?.items?.find((x) => x.subpart === "elementRenderDelay");
      return {
        score: Math.round(r.categories.performance.score * 100),
        lcp: Math.round(r.audits["largest-contentful-paint"].numericValue),
        fcp: Math.round(r.audits["first-contentful-paint"].numericValue),
        rdelay: rd ? Math.round(rd.duration) : "n/d",
        el: item ? `${item.selector} | ${(item.nodeLabel || "").slice(0, 60)}` : "n/d",
      };
    });
    rows.forEach((x, i) => console.log(`${page} run${i + 1}: perf=${x.score} LCP=${x.lcp}ms FCP=${x.fcp}ms renderDelay=${x.rdelay}ms LCP-el=${x.el}`));
    const med = (a) => a.slice().sort((p, q) => p - q)[Math.floor(a.length / 2)];
    console.log(`${page} MEDIANA: perf=${med(rows.map((x) => x.score))} LCP=${med(rows.map((x) => x.lcp))}ms FCP=${med(rows.map((x) => x.fcp))}ms`);
  ' "$PAGE" "$OUT/$(echo "$PAGE" | tr -d '/')"-*.json
done
```

```text
lighthouse 13.3.0 | chrome Google Chrome for Testing 148.0.7778.167  | runs=5 | form-factor=mobile (default)
/servicios/ run1: perf=97 LCP=2152ms FCP=2002ms renderDelay=155ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ run2: perf=97 LCP=2301ms FCP=2001ms renderDelay=146ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ run3: perf=97 LCP=2156ms FCP=2006ms renderDelay=143ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ run4: perf=97 LCP=2297ms FCP=1997ms renderDelay=143ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ run5: perf=97 LCP=2141ms FCP=1991ms renderDelay=136ms LCP-el=div.container > div.page-hero__inner > div > h1.page-hero__title | Cobertura logística end-to-end.
/servicios/ MEDIANA: perf=97 LCP=2156ms FCP=2001ms
/cotizar/ run1: perf=90 LCP=2461ms FCP=2161ms renderDelay=121ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ run2: perf=92 LCP=2144ms FCP=1994ms renderDelay=125ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ run3: perf=93 LCP=2138ms FCP=1838ms renderDelay=119ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ run4: perf=92 LCP=2140ms FCP=1990ms renderDelay=127ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ run5: perf=92 LCP=2138ms FCP=1988ms renderDelay=129ms LCP-el=section.quote-hero > div.container > div > p.quote-hero__lead | Recibe una propuesta clara y desglosada a la brevedad, con t
/cotizar/ MEDIANA: perf=92 LCP=2140ms FCP=1990ms
```
<!-- evidencia:fin apply-evidence.6 -->

**Comparación con la línea base (`apply-evidence.2` frente a `apply-evidence.6`)**: el elemento LCP no cambia en ninguna de las dos páginas (`h1.page-hero__title` en `/servicios/`, `p.quote-hero__lead` en `/cotizar/`), y la mediana de LCP, la de performance y el `elementRenderDelay` de cada corrida quedan dentro de la dispersión entre corridas de la línea base: no hay degradación material de LCP. El LCP no se retrasa porque el primer pintado del hero ocurre antes de que el módulo diferido ejecute `gsap.from`; el elemento LCP queda oculto solo durante su propio tramo del tween (el segundo del stagger: 120 ms de retardo más 600 ms de duración), dentro de la duración del tween que permite el criterio.

Umbral del proyecto: `/servicios/` cumple performance ≥ 95. `/cotizar/` queda bajo 95 antes y después del cambio, con la misma dispersión: el incumplimiento es preexistente y no lo introduce este cambio (registrado en `observations.md` como deuda fuera de alcance).

Commit: sin commit de código (medición); la evidencia se versiona en el commit de cierre de la fase.

## T5 — Spec internal-page-heroes alineada al código

`memory/specs/internal-page-heroes/spec.md` editada en sitio: defaults de `animatePageHero` (stagger 120 ms, y 24 px → 0, 600 ms), 2-3 meta-items por página (2 en servicios, industrias y nosotros; 3 en contacto), contenedor de chips en `/cotizar`, cobertura es/en/pt y auto-init en la carga del módulo sin depender de eventos de router. `status: review` (§D del protocolo: `sdd-apply` escribe `review`; `completed` lo escribe `sdd-archive`, que recorre `spec_refs`, donde la spec queda registrada). El bloque muestra las líneas con los valores vigentes y que no quedan los valores antiguos ni `page-load`:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"argv","argv":["grep","-nE","^status:|stagger [0-9]+ms|450ms|y 16|4 meta-items|meta-items de su|2-3|page-load","memory/specs/internal-page-heroes/spec.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"3cb43dc62a3dec658a16fb82aa36f084c31f3c12","fecha":"2026-10-02T20:26:18-03:00","exit":0,"sha256":"c3da30a893d0daab8d3777422df1604799377e6405cd33e9afe0ce9296a037aa","lineas":8,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.7`** · exit 0 · 8 líneas, 0 omitidas · HEAD `3cb43dc62a3d` · 2026-10-02T20:26:18-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`

```text
grep -nE '^status:|stagger [0-9]+ms|450ms|y 16|4 meta-items|meta-items de su|2-3|page-load' memory/specs/internal-page-heroes/spec.md
```

```text
4:status: review
28:- Atributo `data-hero-animate` aplicado a los elementos internos del hero en 4 páginas con `.page-hero`: eyebrow, H1, lead y los 2-3 meta-items de cada página
47:- Si existe, invocar `animatePageHero('.page-hero')` con los defaults de `animatePageHero` (eyebrow → H1 → lead → meta-items, stagger 120ms, opacity 0→1, y 24px→0, 600ms por elemento)
68:  - Cada `.page-hero__meta-item` — animados en stagger tras lead (2-3 por página: 2 en `/servicios`, `/industrias` y `/nosotros`; 3 en `/contacto`)
73:- [ ] `servicios.astro` tiene `data-hero-animate` en eyebrow, H1, lead y los 2 meta-items de su `.page-hero`
74:- [ ] `industrias.astro` tiene `data-hero-animate` en eyebrow, H1, lead y los 2 meta-items de su `.page-hero`
75:- [ ] `nosotros.astro` tiene `data-hero-animate` en eyebrow, H1, lead y los 2 meta-items de su `.page-hero`
76:- [ ] `contacto.astro` tiene `data-hero-animate` en eyebrow, H1, lead y los 3 meta-items de su `.page-hero`
```
<!-- evidencia:fin apply-evidence.7 -->

## T6 — Delta MODIFY de scroll-inner-pages

Nueva spec `memory/specs/scroll-animations/scroll-inner-pages-real-coverage.md` (`delta_type: MODIFY`, `supersedes: [[scroll-animations/scroll-inner-pages]]`): 5 páginas internas, entrada del hero vía `animatePageHero`, entradas por scroll vía `CTASection` (servicios, industrias, nosotros) y `Footer` (las 5). La base recibe `superseded_by` y mantiene `## Purpose` y `## Acceptance Criteria` en acuerdo con la delta. Ningún archivo de `src/` recibe atributos `data-scroll-*` (ver `apply-evidence.5`: el único archivo de `src/` tocado es `scroll-animations.ts`). Ambas specs del cambio quedan en `spec_refs` de `state.md`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"argv","argv":["grep","-nE","^(slug|delta_type|supersedes|superseded_by|status):","memory/specs/scroll-animations/scroll-inner-pages.md","memory/specs/scroll-animations/scroll-inner-pages-real-coverage.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation","head":"3cb43dc62a3dec658a16fb82aa36f084c31f3c12","fecha":"2026-10-02T20:26:18-03:00","exit":0,"sha256":"0d6bc69e4874d31448ddec9dc3572ea724d96274601a5ef42f11db097f7b26ee","lineas":10,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.8`** · exit 0 · 10 líneas, 0 omitidas · HEAD `3cb43dc62a3d` · 2026-10-02T20:26:18-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation`

```text
grep -nE '^(slug|delta_type|supersedes|superseded_by|status):' memory/specs/scroll-animations/scroll-inner-pages.md memory/specs/scroll-animations/scroll-inner-pages-real-coverage.md
```

```text
memory/specs/scroll-animations/scroll-inner-pages.md:5:slug: "scroll-inner-pages"
memory/specs/scroll-animations/scroll-inner-pages.md:7:delta_type: null
memory/specs/scroll-animations/scroll-inner-pages.md:8:supersedes: null
memory/specs/scroll-animations/scroll-inner-pages.md:9:superseded_by: "[[scroll-animations/scroll-inner-pages-real-coverage]]"
memory/specs/scroll-animations/scroll-inner-pages.md:10:status: completed
memory/specs/scroll-animations/scroll-inner-pages-real-coverage.md:5:slug: "scroll-inner-pages-real-coverage"
memory/specs/scroll-animations/scroll-inner-pages-real-coverage.md:7:delta_type: "MODIFY"
memory/specs/scroll-animations/scroll-inner-pages-real-coverage.md:8:supersedes: "[[scroll-animations/scroll-inner-pages]]"
memory/specs/scroll-animations/scroll-inner-pages-real-coverage.md:9:superseded_by: null
memory/specs/scroll-animations/scroll-inner-pages-real-coverage.md:10:status: review
```
<!-- evidencia:fin apply-evidence.8 -->

Commit: `0657b08` — docs(spec): align internal page heroes and inner-pages coverage with code (T5 + T6).

## Cierre — corrida completa

El perfil no declara suite de tests ni filtro de casos; declara `npm run build` (escribe `dist/` y `.astro/`, corrido fuera de bloque sobre el código final antes de `apply-evidence.3` y `apply-evidence.6`) y `npm run validate-i18n`, que es la corrida de cierre registrada:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro","head":"0657b08d38ecb359ab9c789dd6ab2319b85fc2ee","fecha":"2026-10-02T20:26:34-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.9`** · exit 0 · 6 líneas, 0 omitidas · HEAD `0657b08d38ec` · 2026-10-02T20:26:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-internal-heroes-animation/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
```
<!-- evidencia:fin apply-evidence.9 -->
