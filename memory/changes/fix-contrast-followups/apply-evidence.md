---
type: apply-evidence
change_name: "fix-contrast-followups"
created: "2026-10-06"
---

# Apply evidence — fix-contrast-followups

Camino apply-only; fuente de tareas: `tasks.md` (T1–T9). Sin tareas `[TDD]`. Rutas de código
relativas a `log-atm-web-astro/` del worktree.

## T1 — Colores inline de correos

Commit: `34cc48f` — fix(email): raise inline text and link colors to AA contrast.

Cambios: `#898580` → `#6e6963` (SLA y metadatos), `#4A7BB5` → `#3b6497` en `mailto`/`tel`, en la
empresa del subtítulo (contacto y cotización) y en la «A» del logo (18px/900 no alcanza el umbral
de texto grande: 18,66px en negrita). El barrido de todos los pares texto/fondo de los correos
detectó además el kicker del hero en `#339965` (accent-600) sobre blanco; se reemplazó por
`#22663f` (espejo de `--color-text-accent`, token validado), porque el criterio del brief exige
≥ 4,5:1 en todos los textos. Quedan en `#4A7BB5` la flecha «→» (24px/600, texto grande, umbral 3:1)
y el borde izquierdo del bloque de mensaje (no texto, umbral 3:1 de 1.4.11).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["/usr/bin/grep","-n","-i","-E","#898580|#4A7BB5|#339965","src/lib/email-templates.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"34cc48fc35db038312a3819375197e94100f851f","fecha":"2026-10-06T21:23:27-03:00","exit":0,"sha256":"70b6ff2d78f4e4adaa21c465de9308c8b1980724654655f5795f7fa12db9eaab","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.1`** · exit 0 · 2 líneas, 0 omitidas · HEAD `34cc48fc35db` · 2026-10-06T21:23:27-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -n -i -E '#898580|#4A7BB5|#339965' src/lib/email-templates.ts
```

```text
180:    `<span style="color:#4A7BB5;font-size:24px;font-weight:600;">&rarr;</span>` +
252:    `<div style="background:#f8f7f6;border-left:3px solid #4A7BB5;padding:18px 22px;font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.6;color:#37332f;border-radius:0 12px 12px 0;">` +
```
<!-- evidencia:fin apply-evidence.1 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"archivo","argv":null,"texto":"# Ratios WCAG de cada par texto/fondo de los correos (src/lib/email-templates.ts).\n# Fondos de los badges: rgba(color,.18) compuesto sobre el extremo claro del degradado (#1c3554).\npython3 - <<'PY'\ndef lum(h):\n    r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]\n    f=lambda c: c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4\n    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)\ndef ratio(a,b):\n    x,y=sorted([lum(a),lum(b)],reverse=True); return (x+0.05)/(y+0.05)\npares=[\n (\"SLA / metadatos / etiquetas\",\"6e6963\",\"ffffff\"),(\"metadatos (caja)\",\"6e6963\",\"f8f7f6\"),\n (\"mailto / tel / empresa\",\"3b6497\",\"ffffff\"),(\"logo «A» 18px/900\",\"3b6497\",\"ffffff\"),\n (\"etiquetas Ruta/Origen/Destino\",\"3b6497\",\"eef4fb\"),(\"kicker hero\",\"22663f\",\"ffffff\"),\n (\"título\",\"211f1c\",\"ffffff\"),(\"subtítulo\",\"544f4a\",\"ffffff\"),(\"pill\",\"2b4e78\",\"d7e4f4\"),\n (\"mensaje\",\"37332f\",\"f8f7f6\"),(\"valor metadatos\",\"544f4a\",\"f8f7f6\"),(\"ruta valor\",\"112236\",\"eef4fb\"),\n (\"header tagline\",\"aec7e5\",\"1c3554\"),(\"header LOG ATM\",\"ffffff\",\"1c3554\"),\n (\"badge azul\",\"9cc0ec\",\"244265\"),(\"badge verde\",\"87d3b0\",\"224d5a\"),(\"badge ámbar\",\"f0c074\",\"434c53\"),\n (\"footer texto\",\"aec7e5\",\"0a1624\"),(\"footer secundario\",\"658fc3\",\"0a1624\"),\n (\"botón email\",\"ffffff\",\"3b6497\"),(\"botón WhatsApp\",\"111b21\",\"25d366\"),\n (\"[3:1] flecha 24px/600\",\"4a7bb5\",\"eef4fb\"),(\"[3:1] borde mensaje\",\"4a7bb5\",\"f8f7f6\"),\n]\nfor n,a,b in pares:\n    r=ratio(a,b); umbral=3 if n.startswith(\"[3:1]\") else 4.5\n    print(f\"{n}: #{a} sobre #{b} = {r:.2f}:1 {'OK' if r\u003e=umbral else 'FALLA'}\")\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"34cc48fc35db038312a3819375197e94100f851f","fecha":"2026-10-06T21:23:27-03:00","exit":0,"sha256":"2597e9042b62d3cb323a257915f4747032b0400dca0386490f1797abf9739453","lineas":23,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.2`** · exit 0 · 23 líneas, 0 omitidas · HEAD `34cc48fc35db` · 2026-10-06T21:23:27-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```bash
# Ratios WCAG de cada par texto/fondo de los correos (src/lib/email-templates.ts).
# Fondos de los badges: rgba(color,.18) compuesto sobre el extremo claro del degradado (#1c3554).
python3 - <<'PY'
def lum(h):
    r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c: c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def ratio(a,b):
    x,y=sorted([lum(a),lum(b)],reverse=True); return (x+0.05)/(y+0.05)
pares=[
 ("SLA / metadatos / etiquetas","6e6963","ffffff"),("metadatos (caja)","6e6963","f8f7f6"),
 ("mailto / tel / empresa","3b6497","ffffff"),("logo «A» 18px/900","3b6497","ffffff"),
 ("etiquetas Ruta/Origen/Destino","3b6497","eef4fb"),("kicker hero","22663f","ffffff"),
 ("título","211f1c","ffffff"),("subtítulo","544f4a","ffffff"),("pill","2b4e78","d7e4f4"),
 ("mensaje","37332f","f8f7f6"),("valor metadatos","544f4a","f8f7f6"),("ruta valor","112236","eef4fb"),
 ("header tagline","aec7e5","1c3554"),("header LOG ATM","ffffff","1c3554"),
 ("badge azul","9cc0ec","244265"),("badge verde","87d3b0","224d5a"),("badge ámbar","f0c074","434c53"),
 ("footer texto","aec7e5","0a1624"),("footer secundario","658fc3","0a1624"),
 ("botón email","ffffff","3b6497"),("botón WhatsApp","111b21","25d366"),
 ("[3:1] flecha 24px/600","4a7bb5","eef4fb"),("[3:1] borde mensaje","4a7bb5","f8f7f6"),
]
for n,a,b in pares:
    r=ratio(a,b); umbral=3 if n.startswith("[3:1]") else 4.5
    print(f"{n}: #{a} sobre #{b} = {r:.2f}:1 {'OK' if r>=umbral else 'FALLA'}")
PY
```

```text
SLA / metadatos / etiquetas: #6e6963 sobre #ffffff = 5.44:1 OK
metadatos (caja): #6e6963 sobre #f8f7f6 = 5.08:1 OK
mailto / tel / empresa: #3b6497 sobre #ffffff = 6.08:1 OK
logo «A» 18px/900: #3b6497 sobre #ffffff = 6.08:1 OK
etiquetas Ruta/Origen/Destino: #3b6497 sobre #eef4fb = 5.49:1 OK
kicker hero: #22663f sobre #ffffff = 6.91:1 OK
título: #211f1c sobre #ffffff = 16.44:1 OK
subtítulo: #544f4a sobre #ffffff = 8.09:1 OK
pill: #2b4e78 sobre #d7e4f4 = 6.61:1 OK
mensaje: #37332f sobre #f8f7f6 = 11.70:1 OK
valor metadatos: #544f4a sobre #f8f7f6 = 7.57:1 OK
ruta valor: #112236 sobre #eef4fb = 14.53:1 OK
header tagline: #aec7e5 sobre #1c3554 = 7.17:1 OK
header LOG ATM: #ffffff sobre #1c3554 = 12.45:1 OK
badge azul: #9cc0ec sobre #244265 = 5.47:1 OK
badge verde: #87d3b0 sobre #224d5a = 5.26:1 OK
badge ámbar: #f0c074 sobre #434c53 = 5.21:1 OK
footer texto: #aec7e5 sobre #0a1624 = 10.49:1 OK
footer secundario: #658fc3 sobre #0a1624 = 5.44:1 OK
botón email: #ffffff sobre #3b6497 = 6.08:1 OK
botón WhatsApp: #111b21 sobre #25d366 = 8.80:1 OK
[3:1] flecha 24px/600: #4a7bb5 sobre #eef4fb = 3.96:1 OK
[3:1] borde mensaje: #4a7bb5 sobre #f8f7f6 = 4.10:1 OK
```
<!-- evidencia:fin apply-evidence.2 -->

`apply-evidence.1`: las únicas ocurrencias restantes de los colores reemplazados son la flecha y el
borde, ambos con umbral 3:1. `apply-evidence.2`: todos los pares texto/fondo de los correos de los 3
formularios (plantillas compartidas) cumplen su umbral.

## T2 — Token de éxito en la rama `success` del wizard

Commit: `a63ddd0` — fix(wizard): use text-accent token for quote success status.

`setQuoteStatus` usa `var(--color-text-accent)` en la rama `success`, el mismo token que
`src/pages/contacto.astro` (estado del formulario de contacto). El estado `#quote-status` vive en
`.quote-card` (`--color-surface`, blanco).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"argv","argv":["/usr/bin/grep","-rn","2d9b6f","src/"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"a63ddd0f0620b2e7b3a8bdc896b854d183d85d32","fecha":"2026-10-06T21:23:53-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.3`** · exit 1 · 0 líneas, 0 omitidas · HEAD `a63ddd0f0620` · 2026-10-06T21:23:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -rn 2d9b6f src/
```

```text
```
<!-- evidencia:fin apply-evidence.3 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"argv","argv":["/usr/bin/grep","-rn","-E","kind === 'success'","src/scripts/wizard.ts","src/pages/contacto.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"a63ddd0f0620b2e7b3a8bdc896b854d183d85d32","fecha":"2026-10-06T21:23:53-03:00","exit":0,"sha256":"3ac15519d149eba0dc504854a1b6a6501e9af363354246f7d8330b3a4c3e9fa9","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.4`** · exit 0 · 2 líneas, 0 omitidas · HEAD `a63ddd0f0620` · 2026-10-06T21:23:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -rn -E 'kind === '"'"'success'"'"'' src/scripts/wizard.ts src/pages/contacto.astro
```

```text
src/scripts/wizard.ts:337:      kind === 'error' ? '#c0392b' : kind === 'success' ? 'var(--color-text-accent)' : '';
src/pages/contacto.astro:222:        kind === 'error' ? '#c0392b' : kind === 'success' ? 'var(--color-text-accent)' : '';
```
<!-- evidencia:fin apply-evidence.4 -->

`apply-evidence.3`: el barrido de `2d9b6f` en `src/` termina sin coincidencias (exit 1 de grep = sin
resultados). Fuera de alcance queda `#2D9B6F` en mayúsculas en `src/lib/constants.ts` (color
decorativo de la industria «Agroindustria», `--ind-color`), que no es texto de estado.
`apply-evidence.4`: wizard y formulario de contacto usan el mismo token en la rama `success`.

## T3 — Color base de links y superficies oscuras

Commits: `fda79c3` — fix(styles): raise base link color to primary-600; `82d9b95` — docs(design):
record primary-600 as base link color.

La regla base `a` (en `@layer base`) pasa a `var(--color-primary-600)` con hover
`var(--color-primary-700)`. Toda regla de componente o sin capa gana sobre `@layer base`, así que las
superficies oscuras conservan su propio color de link. El recorrido siguiente lista, en las 18
páginas compiladas × escritorio/móvil, todo link visible que renderiza el color base y el fondo
opaco más cercano; la auditoría axe de T9 cubre además las 21 URL completas.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"archivo","argv":null,"texto":"# Script embebido (links.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4411 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/client <<'JS'\n// Links que renderizan el color base (primary-600, rgb(59, 100, 151)) en todas las páginas\n// compiladas, con el fondo opaco más cercano y su ratio. Uso: node links.mjs <baseUrl\u003e <distClient\u003e\nimport { createRequire } from 'node:module';\nimport { readdirSync } from 'node:fs';\nimport { join, relative } from 'node:path';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst [base, dist] = process.argv.slice(2);\nconst pages = []; (function walk(d) { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) pages.push('/' + relative(dist, f).replace(/(^|\\/)index\\.html$/, '$1')); } })(dist);\npages.sort();\nconst browser = await chromium.launch({ executablePath: '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome' });\nconst resumen = new Map(); let total = 0; let fallas = 0;\nfor (const vp of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {\n  const page = await (await browser.newContext({ viewport: vp, reducedMotion: 'reduce' })).newPage();\n  for (const p of pages) {\n    await page.goto(base + p, { waitUntil: 'load' });\n    const found = await page.evaluate(() =\u003e {\n      const lin = (c) =\u003e { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };\n      const lum = (r, g, b) =\u003e 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);\n      const out = [];\n      for (const a of document.querySelectorAll('a')) {\n        const cs = getComputedStyle(a); const r = a.getBoundingClientRect();\n        if (cs.color !== 'rgb(59, 100, 151)' || r.width === 0 || cs.visibility === 'hidden' || !a.textContent.trim()) continue;\n        let el = a; let bg = null; let img = false;\n        while (el) { const s = getComputedStyle(el); if (s.backgroundImage !== 'none') img = true; const m = s.backgroundColor.match(/[\\d.]+/g); if (m && (m.length < 4 || +m[3] === 1)) { bg = m.slice(0, 3).map(Number); break; } el = el.parentElement; }\n        bg ??= [255, 255, 255];\n        const [x, y] = [lum(59, 100, 151), lum(...bg)].sort((p, q) =\u003e q - p);\n        out.push({ sel: a.className ? `a.${a.className.split(' ')[0]}` : `a[href=\"${a.getAttribute('href')}\"]`, bg: `rgb(${bg.join(',')})`, ratio: +((x + 0.05) / (y + 0.05)).toFixed(2), img });\n      }\n      return out;\n    });\n    for (const f of found) { total++; const k = `${f.sel} sobre ${f.bg}${f.img ? ' (con imagen de fondo en un ancestro)' : ''} → ${f.ratio}:1`; resumen.set(k, (resumen.get(k) ?? 0) + 1); if (f.ratio < 4.5) fallas++; }\n  }\n}\nawait browser.close();\nconsole.log(`Páginas: ${pages.length} × 2 tamaños · links con color base: ${total} · bajo 4.5:1: ${fallas}`);\nfor (const [k, n] of [...resumen].sort()) console.log(`${n}× ${k}`);\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:34:48-03:00","exit":0,"sha256":"571462f9fa8d66097e99ac5d9a8fcaf5655d89bd88067d01bd1ff919448c0c32","lineas":5,"omitidas":0,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.5`** · exit 0 · 5 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:34:48-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (links.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4411 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/client <<'JS'
// Links que renderizan el color base (primary-600, rgb(59, 100, 151)) en todas las páginas
// compiladas, con el fondo opaco más cercano y su ratio. Uso: node links.mjs <baseUrl> <distClient>
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const [base, dist] = process.argv.slice(2);
const pages = []; (function walk(d) { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) pages.push('/' + relative(dist, f).replace(/(^|\/)index\.html$/, '$1')); } })(dist);
pages.sort();
const browser = await chromium.launch({ executablePath: '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome' });
const resumen = new Map(); let total = 0; let fallas = 0;
for (const vp of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
  const page = await (await browser.newContext({ viewport: vp, reducedMotion: 'reduce' })).newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'load' });
    const found = await page.evaluate(() => {
      const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
      const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
      const out = [];
      for (const a of document.querySelectorAll('a')) {
        const cs = getComputedStyle(a); const r = a.getBoundingClientRect();
        if (cs.color !== 'rgb(59, 100, 151)' || r.width === 0 || cs.visibility === 'hidden' || !a.textContent.trim()) continue;
        let el = a; let bg = null; let img = false;
        while (el) { const s = getComputedStyle(el); if (s.backgroundImage !== 'none') img = true; const m = s.backgroundColor.match(/[\d.]+/g); if (m && (m.length < 4 || +m[3] === 1)) { bg = m.slice(0, 3).map(Number); break; } el = el.parentElement; }
        bg ??= [255, 255, 255];
        const [x, y] = [lum(59, 100, 151), lum(...bg)].sort((p, q) => q - p);
        out.push({ sel: a.className ? `a.${a.className.split(' ')[0]}` : `a[href="${a.getAttribute('href')}"]`, bg: `rgb(${bg.join(',')})`, ratio: +((x + 0.05) / (y + 0.05)).toFixed(2), img });
      }
      return out;
    });
    for (const f of found) { total++; const k = `${f.sel} sobre ${f.bg}${f.img ? ' (con imagen de fondo en un ancestro)' : ''} → ${f.ratio}:1`; resumen.set(k, (resumen.get(k) ?? 0) + 1); if (f.ratio < 4.5) fallas++; }
  }
}
await browser.close();
console.log(`Páginas: ${pages.length} × 2 tamaños · links con color base: ${total} · bajo 4.5:1: ${fallas}`);
for (const [k, n] of [...resumen].sort()) console.log(`${n}× ${k}`);
JS
```

```text
Páginas: 18 × 2 tamaños · links con color base: 162 · bajo 4.5:1: 0
12× a.channel sobre rgb(255,255,255) → 6.08:1
72× a.ind-card sobre rgb(255,255,255) → 6.08:1
72× a.ind-services__cta sobre rgb(255,255,255) → 6.08:1
6× a[href="#"] sobre rgb(255,255,255) → 6.08:1
```
<!-- evidencia:fin apply-evidence.5 -->

`apply-evidence.5`: ningún link con el color base queda bajo 4,5:1; todos los que lo renderizan
están sobre blanco. Ningún link de superficie oscura hereda la regla base.

## T4 — Placeholder de `.cta-final__input` (muestreo de píxeles)

Commit: `e5e09a0` — fix(cta): raise final CTA input placeholder contrast.

Método: Chrome real (playwright-core), 5 páginas con la CTA final (`/`, `/servicios/`,
`/nosotros/`, `/industrias/`, `/pt/`) × 3 anchos (1280, 1440, 390) × 2 campos (`#qq-email`,
`#qq-phone`) × 2 estados (reposo y foco, que aclara el fondo del campo). En cada caso se oculta el
texto del placeholder y el cursor, se captura el campo y se recorre cada píxel interior (6px de
margen por el borde y el anillo, sin las esquinas redondeadas). El peor punto es el píxel más claro
(el placeholder es claro sobre fondo oscuro); el ratio se calcula contra ese píxel, componiendo el
alfa del placeholder cuando lo tiene. Primero sobre el build base (`8fa62c1`), luego sobre el
worktree.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"archivo","argv":null,"texto":"# Script embebido (sample.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4410 <<'JS'\n// Muestreo de píxeles del fondo real de .cta-final__input (placeholder ocultado) y ratio WCAG\n// del placeholder contra el píxel más claro. Uso: node sample.mjs <baseUrl\u003e\nimport { createRequire } from 'node:module';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst sharp = require('sharp');\nconst base = process.argv[2];\nconst exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst lin = (c) =\u003e { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };\nconst lum = ([r, g, b]) =\u003e 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);\nconst ratio = (a, b) =\u003e { const [x, y] = [lum(a), lum(b)].sort((p, q) =\u003e q - p); return (x + 0.05) / (y + 0.05); };\nconst hex = (rgb) =\u003e '#' + rgb.map((v) =\u003e v.toString(16).padStart(2, '0')).join('');\nconst browser = await chromium.launch({ executablePath: exe });\nconst pages = ['/', '/servicios/', '/nosotros/', '/industrias/', '/pt/'];\nconst viewports = [{ width: 1280, height: 800 }, { width: 1440, height: 900 }, { width: 390, height: 844 }];\nlet worst = null; let muestras = 0; const detalle = [];\nfor (const vp of viewports) {\n  const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });\n  const page = await ctx.newPage();\n  for (const p of pages) {\n    await page.goto(base + p, { waitUntil: 'load' });\n    // Color efectivo del placeholder declarado (se mide antes de ocultarlo).\n    const ph = await page.evaluate(() =\u003e getComputedStyle(document.querySelector('.cta-final__input'), '::placeholder').color);\n    await page.addStyleTag({ content: '.cta-final__input::placeholder{color:transparent!important}.cta-final__input{caret-color:transparent!important}' });\n    for (const sel of ['#qq-email', '#qq-phone']) {\n      for (const estado of ['reposo', 'foco']) {\n        const el = page.locator(sel);\n        await el.scrollIntoViewIfNeeded();\n        if (estado === 'foco') await el.focus(); else await page.evaluate(() =\u003e document.activeElement?.blur());\n        await page.waitForTimeout(100);\n        // Se excluye la franja del anillo de foco y del borde: 6px por lado y las esquinas redondeadas.\n        const png = await el.screenshot({ animations: 'disabled' });\n        const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });\n        let max = null; const m = 6; const corner = 12;\n        for (let y = m; y < info.height - m; y++) for (let x = m; x < info.width - m; x++) {\n          const inCorner = (x < corner || x \u003e= info.width - corner) && (y < corner || y \u003e= info.height - corner);\n          if (inCorner) continue;\n          const i = (y * info.width + x) * 3; const px = [data[i], data[i + 1], data[i + 2]];\n          muestras++;\n          if (!max || lum(px) \u003e lum(max.px)) max = { px };\n        }\n        const rec = { pagina: p, ancho: vp.width, campo: sel, estado, pixelMasClaro: hex(max.px), px: max.px, placeholderDeclarado: ph };\n        detalle.push(`${p} ${vp.width}px ${sel} ${estado}: píxel más claro ${hex(max.px)}`);\n        if (!worst || lum(max.px) \u003e lum(worst.px)) worst = rec;\n      }\n    }\n  }\n  await ctx.close();\n}\nawait browser.close();\nconsole.log(`Muestras: ${muestras} píxeles · peor punto (más claro): ${worst.pixelMasClaro} en ${worst.pagina} ${worst.ancho}px ${worst.campo} ${worst.estado}`);\nconsole.log(`Placeholder declarado (computed): ${worst.placeholderDeclarado}`);\n// Ratio del placeholder efectivo: si tiene alfa, se compone sobre el píxel más claro.\n// Formatos: `rgb(r g b)`/`rgba(...)` en 0–255, o `color(srgb r g b / a)` en 0–1.\nconst decl = worst.placeholderDeclarado;\nconst nums = decl.match(/[\\d.]+/g).map(Number);\nconst escala = decl.startsWith('color(srgb') ? 255 : 1;\nconst [r, g, b] = nums.slice(0, 3).map((v) =\u003e v * escala);\nconst a = nums.length \u003e 3 ? nums[3] : 1;\nconst comp = [r, g, b].map((c, i) =\u003e Math.round(c * a + worst.px[i] * (1 - a)));\nconsole.log(`Placeholder compuesto sobre el peor punto: ${hex(comp)} → ratio ${ratio(comp, worst.px).toFixed(2)}:1`);\nfor (const [n, c] of [['primary-100 #d7e4f4', [0xd7, 0xe4, 0xf4]], ['primary-200 #aec7e5', [0xae, 0xc7, 0xe5]], ['primary-300 #83a7d2', [0x83, 0xa7, 0xd2]]]) {\n  console.log(`Candidato ${n}: ${ratio(c, worst.px).toFixed(2)}:1`);\n}\nconsole.log('\\nDetalle por caso:');\nfor (const l of detalle) console.log(l);\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:36:03-03:00","exit":0,"sha256":"52edb94efb1d4d121bad61052002b6153fc1be4d3c00acb453e19b6a04ca8610","lineas":68,"omitidas":28,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.6`** · exit 0 · 68 líneas, 28 omitidas · HEAD `f005c160545b` · 2026-10-06T21:36:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (sample.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4410 <<'JS'
// Muestreo de píxeles del fondo real de .cta-final__input (placeholder ocultado) y ratio WCAG
// del placeholder contra el píxel más claro. Uso: node sample.mjs <baseUrl>
import { createRequire } from 'node:module';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const sharp = require('sharp');
const base = process.argv[2];
const exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const hex = (rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');
const browser = await chromium.launch({ executablePath: exe });
const pages = ['/', '/servicios/', '/nosotros/', '/industrias/', '/pt/'];
const viewports = [{ width: 1280, height: 800 }, { width: 1440, height: 900 }, { width: 390, height: 844 }];
let worst = null; let muestras = 0; const detalle = [];
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'load' });
    // Color efectivo del placeholder declarado (se mide antes de ocultarlo).
    const ph = await page.evaluate(() => getComputedStyle(document.querySelector('.cta-final__input'), '::placeholder').color);
    await page.addStyleTag({ content: '.cta-final__input::placeholder{color:transparent!important}.cta-final__input{caret-color:transparent!important}' });
    for (const sel of ['#qq-email', '#qq-phone']) {
      for (const estado of ['reposo', 'foco']) {
        const el = page.locator(sel);
        await el.scrollIntoViewIfNeeded();
        if (estado === 'foco') await el.focus(); else await page.evaluate(() => document.activeElement?.blur());
        await page.waitForTimeout(100);
        // Se excluye la franja del anillo de foco y del borde: 6px por lado y las esquinas redondeadas.
        const png = await el.screenshot({ animations: 'disabled' });
        const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
        let max = null; const m = 6; const corner = 12;
        for (let y = m; y < info.height - m; y++) for (let x = m; x < info.width - m; x++) {
          const inCorner = (x < corner || x >= info.width - corner) && (y < corner || y >= info.height - corner);
          if (inCorner) continue;
          const i = (y * info.width + x) * 3; const px = [data[i], data[i + 1], data[i + 2]];
          muestras++;
          if (!max || lum(px) > lum(max.px)) max = { px };
        }
        const rec = { pagina: p, ancho: vp.width, campo: sel, estado, pixelMasClaro: hex(max.px), px: max.px, placeholderDeclarado: ph };
        detalle.push(`${p} ${vp.width}px ${sel} ${estado}: píxel más claro ${hex(max.px)}`);
        if (!worst || lum(max.px) > lum(worst.px)) worst = rec;
      }
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`Muestras: ${muestras} píxeles · peor punto (más claro): ${worst.pixelMasClaro} en ${worst.pagina} ${worst.ancho}px ${worst.campo} ${worst.estado}`);
console.log(`Placeholder declarado (computed): ${worst.placeholderDeclarado}`);
// Ratio del placeholder efectivo: si tiene alfa, se compone sobre el píxel más claro.
// Formatos: `rgb(r g b)`/`rgba(...)` en 0–255, o `color(srgb r g b / a)` en 0–1.
const decl = worst.placeholderDeclarado;
const nums = decl.match(/[\d.]+/g).map(Number);
const escala = decl.startsWith('color(srgb') ? 255 : 1;
const [r, g, b] = nums.slice(0, 3).map((v) => v * escala);
const a = nums.length > 3 ? nums[3] : 1;
const comp = [r, g, b].map((c, i) => Math.round(c * a + worst.px[i] * (1 - a)));
console.log(`Placeholder compuesto sobre el peor punto: ${hex(comp)} → ratio ${ratio(comp, worst.px).toFixed(2)}:1`);
for (const [n, c] of [['primary-100 #d7e4f4', [0xd7, 0xe4, 0xf4]], ['primary-200 #aec7e5', [0xae, 0xc7, 0xe5]], ['primary-300 #83a7d2', [0x83, 0xa7, 0xd2]]]) {
  console.log(`Candidato ${n}: ${ratio(c, worst.px).toFixed(2)}:1`);
}
console.log('\nDetalle por caso:');
for (const l of detalle) console.log(l);
JS
```

```text
Muestras: 489220 píxeles · peor punto (más claro): #2f3b46 en /industrias/ 390px #qq-phone foco
Placeholder declarado (computed): color(srgb 1 1 1 / 0.5)
Placeholder compuesto sobre el peor punto: #979da3 → ratio 4.18:1
Candidato primary-100 #d7e4f4: 8.88:1
Candidato primary-200 #aec7e5: 6.59:1
Candidato primary-300 #83a7d2: 4.59:1

Detalle por caso:
/ 1280px #qq-email reposo: píxel más claro #27323e
/ 1280px #qq-email foco: píxel más claro #2d3743
/ 1280px #qq-phone reposo: píxel más claro #27323e
/ 1280px #qq-phone foco: píxel más claro #2d3743
/servicios/ 1280px #qq-email reposo: píxel más claro #27323e
/servicios/ 1280px #qq-email foco: píxel más claro #2d3743
/servicios/ 1280px #qq-phone reposo: píxel más claro #27323e
/servicios/ 1280px #qq-phone foco: píxel más claro #2d3743
/nosotros/ 1280px #qq-email reposo: píxel más claro #27323e
/nosotros/ 1280px #qq-email foco: píxel más claro #2d3743
/nosotros/ 1280px #qq-phone reposo: píxel más claro #27323e
/nosotros/ 1280px #qq-phone foco: píxel más claro #2d3743
/industrias/ 1280px #qq-email reposo: píxel más claro #27323e
/industrias/ 1280px #qq-email foco: píxel más claro #2d3743
/industrias/ 1280px #qq-phone reposo: píxel más claro #27323e
/industrias/ 1280px #qq-phone foco: píxel más claro #2d3743
/pt/ 1280px #qq-email reposo: píxel más claro #27323e
/pt/ 1280px #qq-email foco: píxel más claro #2d3743
/pt/ 1280px #qq-phone reposo: píxel más claro #27323e
/pt/ 1280px #qq-phone foco: píxel más claro #2d3743
/ 1440px #qq-email reposo: píxel más claro #28333f
/ 1440px #qq-email foco: píxel más claro #2e3844
/ 1440px #qq-phone reposo: píxel más claro #28333f
/ 1440px #qq-phone foco: píxel más claro #2e3844
/servicios/ 1440px #qq-email reposo: píxel más claro #27323e
/servicios/ 1440px #qq-email foco: píxel más claro #2d3743
/servicios/ 1440px #qq-phone reposo: píxel más claro #27323e
/servicios/ 1440px #qq-phone foco: píxel más claro #2d3743
/nosotros/ 1440px #qq-email reposo: píxel más claro #27323e
/nosotros/ 1440px #qq-email foco: píxel más claro #2d3743
/nosotros/ 1440px #qq-phone reposo: píxel más claro #27323e
/nosotros/ 1440px #qq-phone foco: píxel más claro #2d3743
```
<!-- evidencia:fin apply-evidence.6 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"archivo","argv":null,"texto":"# Script embebido (sample.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4411 <<'JS'\n// Muestreo de píxeles del fondo real de .cta-final__input (placeholder ocultado) y ratio WCAG\n// del placeholder contra el píxel más claro. Uso: node sample.mjs <baseUrl\u003e\nimport { createRequire } from 'node:module';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst sharp = require('sharp');\nconst base = process.argv[2];\nconst exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst lin = (c) =\u003e { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };\nconst lum = ([r, g, b]) =\u003e 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);\nconst ratio = (a, b) =\u003e { const [x, y] = [lum(a), lum(b)].sort((p, q) =\u003e q - p); return (x + 0.05) / (y + 0.05); };\nconst hex = (rgb) =\u003e '#' + rgb.map((v) =\u003e v.toString(16).padStart(2, '0')).join('');\nconst browser = await chromium.launch({ executablePath: exe });\nconst pages = ['/', '/servicios/', '/nosotros/', '/industrias/', '/pt/'];\nconst viewports = [{ width: 1280, height: 800 }, { width: 1440, height: 900 }, { width: 390, height: 844 }];\nlet worst = null; let muestras = 0; const detalle = [];\nfor (const vp of viewports) {\n  const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });\n  const page = await ctx.newPage();\n  for (const p of pages) {\n    await page.goto(base + p, { waitUntil: 'load' });\n    // Color efectivo del placeholder declarado (se mide antes de ocultarlo).\n    const ph = await page.evaluate(() =\u003e getComputedStyle(document.querySelector('.cta-final__input'), '::placeholder').color);\n    await page.addStyleTag({ content: '.cta-final__input::placeholder{color:transparent!important}.cta-final__input{caret-color:transparent!important}' });\n    for (const sel of ['#qq-email', '#qq-phone']) {\n      for (const estado of ['reposo', 'foco']) {\n        const el = page.locator(sel);\n        await el.scrollIntoViewIfNeeded();\n        if (estado === 'foco') await el.focus(); else await page.evaluate(() =\u003e document.activeElement?.blur());\n        await page.waitForTimeout(100);\n        // Se excluye la franja del anillo de foco y del borde: 6px por lado y las esquinas redondeadas.\n        const png = await el.screenshot({ animations: 'disabled' });\n        const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });\n        let max = null; const m = 6; const corner = 12;\n        for (let y = m; y < info.height - m; y++) for (let x = m; x < info.width - m; x++) {\n          const inCorner = (x < corner || x \u003e= info.width - corner) && (y < corner || y \u003e= info.height - corner);\n          if (inCorner) continue;\n          const i = (y * info.width + x) * 3; const px = [data[i], data[i + 1], data[i + 2]];\n          muestras++;\n          if (!max || lum(px) \u003e lum(max.px)) max = { px };\n        }\n        const rec = { pagina: p, ancho: vp.width, campo: sel, estado, pixelMasClaro: hex(max.px), px: max.px, placeholderDeclarado: ph };\n        detalle.push(`${p} ${vp.width}px ${sel} ${estado}: píxel más claro ${hex(max.px)}`);\n        if (!worst || lum(max.px) \u003e lum(worst.px)) worst = rec;\n      }\n    }\n  }\n  await ctx.close();\n}\nawait browser.close();\nconsole.log(`Muestras: ${muestras} píxeles · peor punto (más claro): ${worst.pixelMasClaro} en ${worst.pagina} ${worst.ancho}px ${worst.campo} ${worst.estado}`);\nconsole.log(`Placeholder declarado (computed): ${worst.placeholderDeclarado}`);\n// Ratio del placeholder efectivo: si tiene alfa, se compone sobre el píxel más claro.\n// Formatos: `rgb(r g b)`/`rgba(...)` en 0–255, o `color(srgb r g b / a)` en 0–1.\nconst decl = worst.placeholderDeclarado;\nconst nums = decl.match(/[\\d.]+/g).map(Number);\nconst escala = decl.startsWith('color(srgb') ? 255 : 1;\nconst [r, g, b] = nums.slice(0, 3).map((v) =\u003e v * escala);\nconst a = nums.length \u003e 3 ? nums[3] : 1;\nconst comp = [r, g, b].map((c, i) =\u003e Math.round(c * a + worst.px[i] * (1 - a)));\nconsole.log(`Placeholder compuesto sobre el peor punto: ${hex(comp)} → ratio ${ratio(comp, worst.px).toFixed(2)}:1`);\nfor (const [n, c] of [['primary-100 #d7e4f4', [0xd7, 0xe4, 0xf4]], ['primary-200 #aec7e5', [0xae, 0xc7, 0xe5]], ['primary-300 #83a7d2', [0x83, 0xa7, 0xd2]]]) {\n  console.log(`Candidato ${n}: ${ratio(c, worst.px).toFixed(2)}:1`);\n}\nconsole.log('\\nDetalle por caso:');\nfor (const l of detalle) console.log(l);\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:36:18-03:00","exit":0,"sha256":"e69e19531987d082173a0c1b26a4b27c01e3c11fca0a2ca615bf96fc373f1b35","lineas":68,"omitidas":28,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.7`** · exit 0 · 68 líneas, 28 omitidas · HEAD `f005c160545b` · 2026-10-06T21:36:18-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (sample.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4411 <<'JS'
// Muestreo de píxeles del fondo real de .cta-final__input (placeholder ocultado) y ratio WCAG
// del placeholder contra el píxel más claro. Uso: node sample.mjs <baseUrl>
import { createRequire } from 'node:module';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const sharp = require('sharp');
const base = process.argv[2];
const exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const hex = (rgb) => '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');
const browser = await chromium.launch({ executablePath: exe });
const pages = ['/', '/servicios/', '/nosotros/', '/industrias/', '/pt/'];
const viewports = [{ width: 1280, height: 800 }, { width: 1440, height: 900 }, { width: 390, height: 844 }];
let worst = null; let muestras = 0; const detalle = [];
for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'load' });
    // Color efectivo del placeholder declarado (se mide antes de ocultarlo).
    const ph = await page.evaluate(() => getComputedStyle(document.querySelector('.cta-final__input'), '::placeholder').color);
    await page.addStyleTag({ content: '.cta-final__input::placeholder{color:transparent!important}.cta-final__input{caret-color:transparent!important}' });
    for (const sel of ['#qq-email', '#qq-phone']) {
      for (const estado of ['reposo', 'foco']) {
        const el = page.locator(sel);
        await el.scrollIntoViewIfNeeded();
        if (estado === 'foco') await el.focus(); else await page.evaluate(() => document.activeElement?.blur());
        await page.waitForTimeout(100);
        // Se excluye la franja del anillo de foco y del borde: 6px por lado y las esquinas redondeadas.
        const png = await el.screenshot({ animations: 'disabled' });
        const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
        let max = null; const m = 6; const corner = 12;
        for (let y = m; y < info.height - m; y++) for (let x = m; x < info.width - m; x++) {
          const inCorner = (x < corner || x >= info.width - corner) && (y < corner || y >= info.height - corner);
          if (inCorner) continue;
          const i = (y * info.width + x) * 3; const px = [data[i], data[i + 1], data[i + 2]];
          muestras++;
          if (!max || lum(px) > lum(max.px)) max = { px };
        }
        const rec = { pagina: p, ancho: vp.width, campo: sel, estado, pixelMasClaro: hex(max.px), px: max.px, placeholderDeclarado: ph };
        detalle.push(`${p} ${vp.width}px ${sel} ${estado}: píxel más claro ${hex(max.px)}`);
        if (!worst || lum(max.px) > lum(worst.px)) worst = rec;
      }
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`Muestras: ${muestras} píxeles · peor punto (más claro): ${worst.pixelMasClaro} en ${worst.pagina} ${worst.ancho}px ${worst.campo} ${worst.estado}`);
console.log(`Placeholder declarado (computed): ${worst.placeholderDeclarado}`);
// Ratio del placeholder efectivo: si tiene alfa, se compone sobre el píxel más claro.
// Formatos: `rgb(r g b)`/`rgba(...)` en 0–255, o `color(srgb r g b / a)` en 0–1.
const decl = worst.placeholderDeclarado;
const nums = decl.match(/[\d.]+/g).map(Number);
const escala = decl.startsWith('color(srgb') ? 255 : 1;
const [r, g, b] = nums.slice(0, 3).map((v) => v * escala);
const a = nums.length > 3 ? nums[3] : 1;
const comp = [r, g, b].map((c, i) => Math.round(c * a + worst.px[i] * (1 - a)));
console.log(`Placeholder compuesto sobre el peor punto: ${hex(comp)} → ratio ${ratio(comp, worst.px).toFixed(2)}:1`);
for (const [n, c] of [['primary-100 #d7e4f4', [0xd7, 0xe4, 0xf4]], ['primary-200 #aec7e5', [0xae, 0xc7, 0xe5]], ['primary-300 #83a7d2', [0x83, 0xa7, 0xd2]]]) {
  console.log(`Candidato ${n}: ${ratio(c, worst.px).toFixed(2)}:1`);
}
console.log('\nDetalle por caso:');
for (const l of detalle) console.log(l);
JS
```

```text
Muestras: 489220 píxeles · peor punto (más claro): #2f3b46 en /industrias/ 390px #qq-phone foco
Placeholder declarado (computed): rgb(174, 199, 229)
Placeholder compuesto sobre el peor punto: #aec7e5 → ratio 6.59:1
Candidato primary-100 #d7e4f4: 8.88:1
Candidato primary-200 #aec7e5: 6.59:1
Candidato primary-300 #83a7d2: 4.59:1

Detalle por caso:
/ 1280px #qq-email reposo: píxel más claro #27323e
/ 1280px #qq-email foco: píxel más claro #2d3743
/ 1280px #qq-phone reposo: píxel más claro #27323e
/ 1280px #qq-phone foco: píxel más claro #2d3743
/servicios/ 1280px #qq-email reposo: píxel más claro #27323e
/servicios/ 1280px #qq-email foco: píxel más claro #2d3743
/servicios/ 1280px #qq-phone reposo: píxel más claro #27323e
/servicios/ 1280px #qq-phone foco: píxel más claro #2d3743
/nosotros/ 1280px #qq-email reposo: píxel más claro #27323e
/nosotros/ 1280px #qq-email foco: píxel más claro #2d3743
/nosotros/ 1280px #qq-phone reposo: píxel más claro #27323e
/nosotros/ 1280px #qq-phone foco: píxel más claro #2d3743
/industrias/ 1280px #qq-email reposo: píxel más claro #27323e
/industrias/ 1280px #qq-email foco: píxel más claro #2d3743
/industrias/ 1280px #qq-phone reposo: píxel más claro #27323e
/industrias/ 1280px #qq-phone foco: píxel más claro #2d3743
/pt/ 1280px #qq-email reposo: píxel más claro #27323e
/pt/ 1280px #qq-email foco: píxel más claro #2d3743
/pt/ 1280px #qq-phone reposo: píxel más claro #27323e
/pt/ 1280px #qq-phone foco: píxel más claro #2d3743
/ 1440px #qq-email reposo: píxel más claro #27323e
/ 1440px #qq-email foco: píxel más claro #2d3743
/ 1440px #qq-phone reposo: píxel más claro #27323e
/ 1440px #qq-phone foco: píxel más claro #2d3743
/servicios/ 1440px #qq-email reposo: píxel más claro #27323e
/servicios/ 1440px #qq-email foco: píxel más claro #2d3743
/servicios/ 1440px #qq-phone reposo: píxel más claro #27323e
/servicios/ 1440px #qq-phone foco: píxel más claro #2d3743
/nosotros/ 1440px #qq-email reposo: píxel más claro #27323e
/nosotros/ 1440px #qq-email foco: píxel más claro #2d3743
/nosotros/ 1440px #qq-phone reposo: píxel más claro #27323e
/nosotros/ 1440px #qq-phone foco: píxel más claro #2d3743
```
<!-- evidencia:fin apply-evidence.7 -->

`apply-evidence.6` (base): el placeholder blanco al 50 % da 4,18:1 sobre el peor punto, `#2f3b46`
(`/industrias/`, 390px, `#qq-phone` en foco). `apply-evidence.7` (worktree): el mismo peor punto y
el placeholder `primary-200` (`rgb(174, 199, 229)`) dan 6,59:1. `primary-300` quedaba en 4,59:1,
sin margen, y DESIGN.md lo declara no apto para texto; `primary-200` es además el color de las
etiquetas de ese mismo formulario.

## T5 — Anillo de foco del skip link

Commit: `d082b97` — fix(a11y): keep skip link focus ring off the header logo.

El skip link declara `--focus-ring-color: var(--color-focus-ring-inverse)` (es una superficie azul
sólida) y `outline-offset: -5px` en `:focus-visible`: el anillo queda dentro de su caja opaca. El
script enfoca el skip link con Tab en `/` a 1440 y 390px, registra su caja, la del logo y el estilo
del anillo, y captura la franja superior. El mismo script mide los títulos de card de T7.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"archivo","argv":null,"texto":"# Script embebido (shots.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4410 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-apply-lqj49snz/capt-antes antes <<'JS'\n// Uso: node shots.mjs <baseUrl\u003e <outDir\u003e <etiqueta\u003e\nimport { createRequire } from 'node:module';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst [base, out, tag] = process.argv.slice(2);\nconst exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst browser = await chromium.launch({ executablePath: exe });\nfor (const w of [1440, 390]) {\n  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 2 });\n  const page = await ctx.newPage();\n  // Skip link enfocado\n  await page.goto(base + '/', { waitUntil: 'load' });\n  await page.keyboard.press('Tab');\n  await page.waitForTimeout(400);\n  const sk = await page.evaluate(() =\u003e {\n    const a = document.activeElement; const r = a.getBoundingClientRect();\n    const logo = document.querySelector('#navbar .nav__brand-logo').getBoundingClientRect();\n    const cs = getComputedStyle(a);\n    return { cls: a.className, rect: [r.x, r.y, r.width, r.height], logo: [logo.x, logo.y, logo.width, logo.height], outline: cs.outline, offset: cs.outlineOffset };\n  });\n  console.log(`[${tag}] skip ${w}px`, JSON.stringify(sk));\n  await page.screenshot({ path: `${out}/t5-skiplink-${tag}-${w}.png`, clip: { x: 0, y: 0, width: Math.min(w, 520), height: 110 } });\n  // Títulos de card en servicios por idioma\n  for (const path of ['/servicios/', '/en/servicios/', '/pt/servicios/']) {\n    await page.goto(base + path, { waitUntil: 'load' });\n    const res = await page.evaluate(() =\u003e [...document.querySelectorAll('.svc-card__title')].map((h) =\u003e {\n      const card = h.closest('.svc-card').getBoundingClientRect(); const r = h.getBoundingClientRect();\n      const range = document.createRange(); range.selectNodeContents(h); const tr = range.getBoundingClientRect();\n      return { t: h.textContent, overflow: h.scrollWidth \u003e h.clientWidth || tr.right \u003e card.right + 0.5, textRight: Math.round(tr.right), cardRight: Math.round(card.right), lines: range.getClientRects().length };\n    }));\n    const bad = res.filter((x) =\u003e x.overflow);\n    console.log(`[${tag}] ${path} ${w}px títulos=${res.length} desbordados=${bad.length}`, JSON.stringify(bad));\n    if (path === '/pt/servicios/') {\n      const el = page.locator('.svc-card', { hasText: 'Desconsolida' }).first();\n      await el.scrollIntoViewIfNeeded();\n      await el.locator('img').evaluate((img) =\u003e (img.complete ? null : new Promise((r) =\u003e { img.onload = r; img.onerror = r; })));\n      await el.screenshot({ path: `${out}/t7-desconsolidacao-${tag}-${w}.png` });\n    }\n  }\n  await ctx.close();\n}\nawait browser.close();\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:36:34-03:00","exit":0,"sha256":"7101c72937f6145f0258d08c9ce0240fc068f0b6b6ebd82590b1a81f8f7da6c2","lineas":8,"omitidas":0,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.8`** · exit 0 · 8 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:36:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (shots.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4410 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-apply-lqj49snz/capt-antes antes <<'JS'
// Uso: node shots.mjs <baseUrl> <outDir> <etiqueta>
import { createRequire } from 'node:module';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const [base, out, tag] = process.argv.slice(2);
const exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const browser = await chromium.launch({ executablePath: exe });
for (const w of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  // Skip link enfocado
  await page.goto(base + '/', { waitUntil: 'load' });
  await page.keyboard.press('Tab');
  await page.waitForTimeout(400);
  const sk = await page.evaluate(() => {
    const a = document.activeElement; const r = a.getBoundingClientRect();
    const logo = document.querySelector('#navbar .nav__brand-logo').getBoundingClientRect();
    const cs = getComputedStyle(a);
    return { cls: a.className, rect: [r.x, r.y, r.width, r.height], logo: [logo.x, logo.y, logo.width, logo.height], outline: cs.outline, offset: cs.outlineOffset };
  });
  console.log(`[${tag}] skip ${w}px`, JSON.stringify(sk));
  await page.screenshot({ path: `${out}/t5-skiplink-${tag}-${w}.png`, clip: { x: 0, y: 0, width: Math.min(w, 520), height: 110 } });
  // Títulos de card en servicios por idioma
  for (const path of ['/servicios/', '/en/servicios/', '/pt/servicios/']) {
    await page.goto(base + path, { waitUntil: 'load' });
    const res = await page.evaluate(() => [...document.querySelectorAll('.svc-card__title')].map((h) => {
      const card = h.closest('.svc-card').getBoundingClientRect(); const r = h.getBoundingClientRect();
      const range = document.createRange(); range.selectNodeContents(h); const tr = range.getBoundingClientRect();
      return { t: h.textContent, overflow: h.scrollWidth > h.clientWidth || tr.right > card.right + 0.5, textRight: Math.round(tr.right), cardRight: Math.round(card.right), lines: range.getClientRects().length };
    }));
    const bad = res.filter((x) => x.overflow);
    console.log(`[${tag}] ${path} ${w}px títulos=${res.length} desbordados=${bad.length}`, JSON.stringify(bad));
    if (path === '/pt/servicios/') {
      const el = page.locator('.svc-card', { hasText: 'Desconsolida' }).first();
      await el.scrollIntoViewIfNeeded();
      await el.locator('img').evaluate((img) => (img.complete ? null : new Promise((r) => { img.onload = r; img.onerror = r; })));
      await el.screenshot({ path: `${out}/t7-desconsolidacao-${tag}-${w}.png` });
    }
  }
  await ctx.close();
}
await browser.close();
JS
```

```text
[antes] skip 1440px {"cls":"skip-link","rect":[0,0,242.484375,41.59375],"logo":[120,17,38,38],"outline":"rgb(59, 100, 151) solid 3px","offset":"2px"}
[antes] /servicios/ 1440px títulos=11 desbordados=0 []
[antes] /en/servicios/ 1440px títulos=11 desbordados=0 []
[antes] /pt/servicios/ 1440px títulos=11 desbordados=1 [{"t":"Desconsolidação","overflow":true,"textRight":1124,"cardRight":1117,"lines":1}]
[antes] skip 390px {"cls":"skip-link","rect":[0,0,242.484375,41.59375],"logo":[20,17,38,38],"outline":"rgb(59, 100, 151) solid 3px","offset":"2px"}
[antes] /servicios/ 390px títulos=11 desbordados=0 []
[antes] /en/servicios/ 390px títulos=11 desbordados=0 []
[antes] /pt/servicios/ 390px títulos=11 desbordados=0 []
```
<!-- evidencia:fin apply-evidence.8 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"archivo","argv":null,"texto":"# Script embebido (shots.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4411 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-apply-lqj49snz/capt-despues despues <<'JS'\n// Uso: node shots.mjs <baseUrl\u003e <outDir\u003e <etiqueta\u003e\nimport { createRequire } from 'node:module';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst [base, out, tag] = process.argv.slice(2);\nconst exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst browser = await chromium.launch({ executablePath: exe });\nfor (const w of [1440, 390]) {\n  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 2 });\n  const page = await ctx.newPage();\n  // Skip link enfocado\n  await page.goto(base + '/', { waitUntil: 'load' });\n  await page.keyboard.press('Tab');\n  await page.waitForTimeout(400);\n  const sk = await page.evaluate(() =\u003e {\n    const a = document.activeElement; const r = a.getBoundingClientRect();\n    const logo = document.querySelector('#navbar .nav__brand-logo').getBoundingClientRect();\n    const cs = getComputedStyle(a);\n    return { cls: a.className, rect: [r.x, r.y, r.width, r.height], logo: [logo.x, logo.y, logo.width, logo.height], outline: cs.outline, offset: cs.outlineOffset };\n  });\n  console.log(`[${tag}] skip ${w}px`, JSON.stringify(sk));\n  await page.screenshot({ path: `${out}/t5-skiplink-${tag}-${w}.png`, clip: { x: 0, y: 0, width: Math.min(w, 520), height: 110 } });\n  // Títulos de card en servicios por idioma\n  for (const path of ['/servicios/', '/en/servicios/', '/pt/servicios/']) {\n    await page.goto(base + path, { waitUntil: 'load' });\n    const res = await page.evaluate(() =\u003e [...document.querySelectorAll('.svc-card__title')].map((h) =\u003e {\n      const card = h.closest('.svc-card').getBoundingClientRect(); const r = h.getBoundingClientRect();\n      const range = document.createRange(); range.selectNodeContents(h); const tr = range.getBoundingClientRect();\n      return { t: h.textContent, overflow: h.scrollWidth \u003e h.clientWidth || tr.right \u003e card.right + 0.5, textRight: Math.round(tr.right), cardRight: Math.round(card.right), lines: range.getClientRects().length };\n    }));\n    const bad = res.filter((x) =\u003e x.overflow);\n    console.log(`[${tag}] ${path} ${w}px títulos=${res.length} desbordados=${bad.length}`, JSON.stringify(bad));\n    if (path === '/pt/servicios/') {\n      const el = page.locator('.svc-card', { hasText: 'Desconsolida' }).first();\n      await el.scrollIntoViewIfNeeded();\n      await el.locator('img').evaluate((img) =\u003e (img.complete ? null : new Promise((r) =\u003e { img.onload = r; img.onerror = r; })));\n      await el.screenshot({ path: `${out}/t7-desconsolidacao-${tag}-${w}.png` });\n    }\n  }\n  await ctx.close();\n}\nawait browser.close();\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:36:37-03:00","exit":0,"sha256":"d95ef0482fb35040d814ff8cf00fa7d7003e0bae98f92e002b39f8f08ca22487","lineas":8,"omitidas":0,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.9`** · exit 0 · 8 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:36:37-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (shots.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4411 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-contrast-followups/sdd-apply-lqj49snz/capt-despues despues <<'JS'
// Uso: node shots.mjs <baseUrl> <outDir> <etiqueta>
import { createRequire } from 'node:module';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const [base, out, tag] = process.argv.slice(2);
const exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const browser = await chromium.launch({ executablePath: exe });
for (const w of [1440, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  // Skip link enfocado
  await page.goto(base + '/', { waitUntil: 'load' });
  await page.keyboard.press('Tab');
  await page.waitForTimeout(400);
  const sk = await page.evaluate(() => {
    const a = document.activeElement; const r = a.getBoundingClientRect();
    const logo = document.querySelector('#navbar .nav__brand-logo').getBoundingClientRect();
    const cs = getComputedStyle(a);
    return { cls: a.className, rect: [r.x, r.y, r.width, r.height], logo: [logo.x, logo.y, logo.width, logo.height], outline: cs.outline, offset: cs.outlineOffset };
  });
  console.log(`[${tag}] skip ${w}px`, JSON.stringify(sk));
  await page.screenshot({ path: `${out}/t5-skiplink-${tag}-${w}.png`, clip: { x: 0, y: 0, width: Math.min(w, 520), height: 110 } });
  // Títulos de card en servicios por idioma
  for (const path of ['/servicios/', '/en/servicios/', '/pt/servicios/']) {
    await page.goto(base + path, { waitUntil: 'load' });
    const res = await page.evaluate(() => [...document.querySelectorAll('.svc-card__title')].map((h) => {
      const card = h.closest('.svc-card').getBoundingClientRect(); const r = h.getBoundingClientRect();
      const range = document.createRange(); range.selectNodeContents(h); const tr = range.getBoundingClientRect();
      return { t: h.textContent, overflow: h.scrollWidth > h.clientWidth || tr.right > card.right + 0.5, textRight: Math.round(tr.right), cardRight: Math.round(card.right), lines: range.getClientRects().length };
    }));
    const bad = res.filter((x) => x.overflow);
    console.log(`[${tag}] ${path} ${w}px títulos=${res.length} desbordados=${bad.length}`, JSON.stringify(bad));
    if (path === '/pt/servicios/') {
      const el = page.locator('.svc-card', { hasText: 'Desconsolida' }).first();
      await el.scrollIntoViewIfNeeded();
      await el.locator('img').evaluate((img) => (img.complete ? null : new Promise((r) => { img.onload = r; img.onerror = r; })));
      await el.screenshot({ path: `${out}/t7-desconsolidacao-${tag}-${w}.png` });
    }
  }
  await ctx.close();
}
await browser.close();
JS
```

```text
[despues] skip 1440px {"cls":"skip-link","rect":[0,0,242.484375,41.59375],"logo":[120,17,38,38],"outline":"rgb(135, 211, 176) solid 3px","offset":"-5px"}
[despues] /servicios/ 1440px títulos=11 desbordados=0 []
[despues] /en/servicios/ 1440px títulos=11 desbordados=0 []
[despues] /pt/servicios/ 1440px títulos=11 desbordados=0 []
[despues] skip 390px {"cls":"skip-link","rect":[0,0,242.484375,41.59375],"logo":[20,17,38,38],"outline":"rgb(135, 211, 176) solid 3px","offset":"-5px"}
[despues] /servicios/ 390px títulos=11 desbordados=0 []
[despues] /en/servicios/ 390px títulos=11 desbordados=0 []
[despues] /pt/servicios/ 390px títulos=11 desbordados=0 []
```
<!-- evidencia:fin apply-evidence.9 -->

`apply-evidence.8` (base) y `apply-evidence.9` (worktree): la caja del skip link no cambia
(0,0 · 242×42) y el logo sigue en 120,17 (1440px) y 20,17 (390px); el anillo pasa de primary-600
con `outline-offset: 2px` a accent-400 con `-5px`, es decir, de 2px por fuera de la caja (donde
cruzaba el logo) a 2–5px por dentro. Capturas (franja superior, DPR 2), bajo
`memory/changes/fix-contrast-followups/capturas/`:

- antes: `t5-skiplink-antes-1440.png`, `t5-skiplink-antes-390.png` — el borde inferior del anillo
  atraviesa el logo y la bajada.
- después: `t5-skiplink-despues-1440.png`, `t5-skiplink-despues-390.png` — el anillo queda dentro de
  la caja azul; la caja sigue tapando la parte superior de la marca mientras tiene foco, como todo
  skip link superpuesto al header.

## T6 — `DESIGN.md` alineado con el CSS de la navegación

Commit: `adc8fd6` — docs(design): align navigation section with Navbar CSS.

Fuente de verdad: los estilos de `src/components/ui/Navbar.astro`. El primer bloque muestra las
reglas de los enlaces; el segundo, la sección `### Navigation` resultante.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"argv","argv":["/usr/bin/grep","-n","-A8","-E","^  \\.nav__link \\{|^  \\.nav__link:hover,|^  \\.nav-drawer__link \\{","src/components/ui/Navbar.astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:36:56-03:00","exit":0,"sha256":"445963385622991668790d346eea51cc06f4b77d4c05b981d57251b6d1c0d639","lineas":28,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.10`** · exit 0 · 28 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:36:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -n -A8 -E '^  \.nav__link \{|^  \.nav__link:hover,|^  \.nav-drawer__link \{' src/components/ui/Navbar.astro
```

```text
170:  .nav__link {
171-    font-size: 0.9375rem;
172-    font-weight: 500;
173-    color: var(--color-text);
174-    padding: 0.5rem 0.875rem;
175-    border-radius: var(--radius-pill);
176-    transition: background 150ms, color 150ms;
177-    display: inline-flex;
178-  }
179:  .nav__link:hover,
180-  .nav__link:focus-visible,
181-  .nav__link.is-active {
182-    background: var(--color-surface-alt);
183-    color: var(--color-brand-dark);
184-  }
185-  /* Señal no cromática de página actual */
186-  .nav__link.is-active {
187-    text-decoration: underline;
--
321:  .nav-drawer__link {
322-    display: block;
323-    padding: 0.875rem 1rem;
324-    font-size: 1.0625rem;
325-    font-weight: 500;
326-    color: var(--color-neutral-700);
327-    border-radius: var(--radius-sm);
328-    transition: background 150ms, color 150ms;
329-  }
```
<!-- evidencia:fin apply-evidence.10 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"argv","argv":["/usr/bin/grep","-n","-A5","^### Navigation","DESIGN.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:36:56-03:00","exit":0,"sha256":"a85c708b23fd8b1c7848c1552bd78b38156352178a0740862b5461e6de4b3248","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.11`** · exit 0 · 6 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:36:56-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -n -A5 '^### Navigation' DESIGN.md
```

```text
178:### Navigation
179-- Desktop: horizontal; `.nav__link` en `--color-text` (neutral-900), font-weight 500, 15px; hover, foco y activo: fondo `--color-surface-alt` (neutral-100) y texto `--color-brand-dark`
180-- Mobile: hamburger menu; `.nav-drawer__link` en neutral-700, font-weight 500, 17px; hover y foco: fondo primary-50 y texto `--color-brand-dark`
181-- Active state: `--color-brand-dark` sobre neutral-100, mismo font-weight 500 y subrayado de 2px (`text-underline-offset: 0.3em`): la pagina actual no depende solo del color
182-- Nombre accesible del enlace de marca y del selector de idioma: el texto visible seguido de un sufijo `.sr-only` localizado (`a11y.brandHome`, `a11y.languageCurrent`), sin `aria-label` (WCAG 2.5.3)
183-
```
<!-- evidencia:fin apply-evidence.11 -->

`apply-evidence.10` y `apply-evidence.11`: escritorio en `--color-text` con peso 500; hover, foco y
activo con fondo `--color-surface-alt` y texto `--color-brand-dark`; drawer en neutral-700 con peso
500 y hover/foco sobre primary-50. `DESIGN.md` describe esos mismos valores (antes: neutral-700 y
peso 600 en escritorio). El mismo commit agrega el par neutral-700/blanco a la tabla y quita el uso
«navbar dark» de primary-900, que no existe en el código.

## T7 — Corte de palabra en títulos de card

Commit: `f005c16` — fix(services): wrap long service card titles inside the card.

`.svc-card__title` suma `hyphens: auto` (el `<html>` declara el `lang` de cada idioma) y
`overflow-wrap: anywhere` como corte garantizado. `apply-evidence.8`/`.9` (T5) ya muestran, a 1440 y
390px en es/en/pt, que el único título que desbordaba su tarjeta era «Desconsolidação» en
`/pt/servicios/` a 1440px, y que después ninguno desborda. El recorrido siguiente amplía a 5 anchos
y a la portada, y marca por título el número de líneas, si una palabra quedó partida y si el texto
sobrepasa el borde de la tarjeta.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"archivo","argv":null,"texto":"# Script embebido (titles.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4410 <<'JS'\n// Líneas y palabras partidas de cada .svc-card__title (servicios y portada, es/en/pt, varios anchos).\n// Uso: node titles.mjs <baseUrl\u003e\nimport { createRequire } from 'node:module';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst base = process.argv[2];\nconst exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst browser = await chromium.launch({ executablePath: exe });\nfor (const w of [1440, 1280, 1024, 768, 390]) {\n  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });\n  const page = await ctx.newPage();\n  for (const p of ['/servicios/', '/en/servicios/', '/pt/servicios/', '/', '/en/', '/pt/']) {\n    await page.goto(base + p, { waitUntil: 'load' });\n    const res = await page.evaluate(() =\u003e [...document.querySelectorAll('.svc-card__title')].map((h) =\u003e {\n      // Palabra partida: un nodo de texto cuyo corte de línea cae dentro de una palabra.\n      const text = h.textContent; const node = h.firstChild; const range = document.createRange();\n      let prevTop = null; const breaks = [];\n      for (let i = 0; i < text.length; i++) {\n        range.setStart(node, i); range.setEnd(node, i + 1);\n        const r = range.getClientRects()[0]; if (!r) continue;\n        if (prevTop !== null && r.top \u003e prevTop + 2) breaks.push(i);\n        prevTop = r.top;\n      }\n      const card = h.closest('.svc-card').getBoundingClientRect(); range.selectNodeContents(h);\n      const over = range.getBoundingClientRect().right \u003e card.right + 0.5;\n      const mid = breaks.filter((i) =\u003e /\\S/.test(text[i - 1] ?? ' ') && /\\S/.test(text[i]));\n      return `${text}|${breaks.length + 1}l${mid.length ? '|partida' : ''}${over ? '|DESBORDA' : ''}`;\n    }));\n    console.log(`${w} ${p} ${res.join(' ; ')}`);\n  }\n  await ctx.close();\n}\nawait browser.close();\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:37:10-03:00","exit":0,"sha256":"9614ac363a9b204bda1057a44537bfab22dd007d8ff5d6d23d00c731ab6936fc","lineas":30,"omitidas":0,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.12`** · exit 0 · 30 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:37:10-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (titles.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4410 <<'JS'
// Líneas y palabras partidas de cada .svc-card__title (servicios y portada, es/en/pt, varios anchos).
// Uso: node titles.mjs <baseUrl>
import { createRequire } from 'node:module';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const base = process.argv[2];
const exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const browser = await chromium.launch({ executablePath: exe });
for (const w of [1440, 1280, 1024, 768, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of ['/servicios/', '/en/servicios/', '/pt/servicios/', '/', '/en/', '/pt/']) {
    await page.goto(base + p, { waitUntil: 'load' });
    const res = await page.evaluate(() => [...document.querySelectorAll('.svc-card__title')].map((h) => {
      // Palabra partida: un nodo de texto cuyo corte de línea cae dentro de una palabra.
      const text = h.textContent; const node = h.firstChild; const range = document.createRange();
      let prevTop = null; const breaks = [];
      for (let i = 0; i < text.length; i++) {
        range.setStart(node, i); range.setEnd(node, i + 1);
        const r = range.getClientRects()[0]; if (!r) continue;
        if (prevTop !== null && r.top > prevTop + 2) breaks.push(i);
        prevTop = r.top;
      }
      const card = h.closest('.svc-card').getBoundingClientRect(); range.selectNodeContents(h);
      const over = range.getBoundingClientRect().right > card.right + 0.5;
      const mid = breaks.filter((i) => /\S/.test(text[i - 1] ?? ' ') && /\S/.test(text[i]));
      return `${text}|${breaks.length + 1}l${mid.length ? '|partida' : ''}${over ? '|DESBORDA' : ''}`;
    }));
    console.log(`${w} ${p} ${res.join(' ; ')}`);
  }
  await ctx.close();
}
await browser.close();
JS
```

```text
1440 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|2l ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidado|1l ; Casillero USA|1l ; Compras Internacionales|2l ; Ruta Medio Oriente|1l
1440 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l ; Cargo Insurance|2l ; Deconsolidation|1l ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
1440 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|2l ; Armazenagem|1l ; Consultoria Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidação|1l|DESBORDA ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
1440 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|2l ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l
1440 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l
1440 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|2l ; Armazenagem|1l ; Consultoria Logística|2l ; Courier Internacional|1l
1280 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|2l ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidado|1l ; Casillero USA|1l ; Compras Internacionales|2l ; Ruta Medio Oriente|1l
1280 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l ; Cargo Insurance|2l ; Deconsolidation|1l ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
1280 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|2l ; Armazenagem|1l ; Consultoria Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidação|1l|DESBORDA ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
1280 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|2l ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l
1280 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l
1280 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|2l ; Armazenagem|1l ; Consultoria Logística|2l ; Courier Internacional|1l
1024 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|1l ; Almacenaje|1l ; Consultoría Logística|1l ; Courier Internacional|1l ; Seguros de Carga|1l ; Desconsolidado|1l ; Casillero USA|1l ; Compras Internacionales|1l ; Ruta Medio Oriente|1l
1024 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|1l ; International Courier|1l ; Cargo Insurance|1l ; Deconsolidation|1l ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
1024 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|1l ; Armazenagem|1l ; Consultoria Logística|1l ; Courier Internacional|1l ; Seguros de Carga|1l ; Desconsolidação|1l ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
1024 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|1l ; Almacenaje|1l ; Consultoría Logística|1l ; Courier Internacional|1l
1024 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|1l ; International Courier|1l
1024 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|1l ; Armazenagem|1l ; Consultoria Logística|1l ; Courier Internacional|1l
768 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|2l ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidado|1l ; Casillero USA|1l ; Compras Internacionales|1l ; Ruta Medio Oriente|1l
768 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l ; Cargo Insurance|1l ; Deconsolidation|1l ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
768 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|2l ; Armazenagem|1l ; Consultoria Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidação|1l ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
768 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|2l ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l
768 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l
768 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|2l ; Armazenagem|1l ; Consultoria Logística|2l ; Courier Internacional|1l
390 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|1l ; Almacenaje|1l ; Consultoría Logística|1l ; Courier Internacional|1l ; Seguros de Carga|1l ; Desconsolidado|1l ; Casillero USA|1l ; Compras Internacionales|1l ; Ruta Medio Oriente|1l
390 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|1l ; Warehousing|1l ; Logistics Consulting|1l ; International Courier|1l ; Cargo Insurance|1l ; Deconsolidation|1l ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
390 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|1l ; Armazenagem|1l ; Consultoria Logística|1l ; Courier Internacional|1l ; Seguros de Carga|1l ; Desconsolidação|1l ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
390 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|1l ; Almacenaje|1l ; Consultoría Logística|1l ; Courier Internacional|1l
390 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|1l ; Warehousing|1l ; Logistics Consulting|1l ; International Courier|1l
390 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|1l ; Armazenagem|1l ; Consultoria Logística|1l ; Courier Internacional|1l
```
<!-- evidencia:fin apply-evidence.12 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.13","forma":"archivo","argv":null,"texto":"# Script embebido (titles.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4411 <<'JS'\n// Líneas y palabras partidas de cada .svc-card__title (servicios y portada, es/en/pt, varios anchos).\n// Uso: node titles.mjs <baseUrl\u003e\nimport { createRequire } from 'node:module';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst base = process.argv[2];\nconst exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';\nconst browser = await chromium.launch({ executablePath: exe });\nfor (const w of [1440, 1280, 1024, 768, 390]) {\n  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });\n  const page = await ctx.newPage();\n  for (const p of ['/servicios/', '/en/servicios/', '/pt/servicios/', '/', '/en/', '/pt/']) {\n    await page.goto(base + p, { waitUntil: 'load' });\n    const res = await page.evaluate(() =\u003e [...document.querySelectorAll('.svc-card__title')].map((h) =\u003e {\n      // Palabra partida: un nodo de texto cuyo corte de línea cae dentro de una palabra.\n      const text = h.textContent; const node = h.firstChild; const range = document.createRange();\n      let prevTop = null; const breaks = [];\n      for (let i = 0; i < text.length; i++) {\n        range.setStart(node, i); range.setEnd(node, i + 1);\n        const r = range.getClientRects()[0]; if (!r) continue;\n        if (prevTop !== null && r.top \u003e prevTop + 2) breaks.push(i);\n        prevTop = r.top;\n      }\n      const card = h.closest('.svc-card').getBoundingClientRect(); range.selectNodeContents(h);\n      const over = range.getBoundingClientRect().right \u003e card.right + 0.5;\n      const mid = breaks.filter((i) =\u003e /\\S/.test(text[i - 1] ?? ' ') && /\\S/.test(text[i]));\n      return `${text}|${breaks.length + 1}l${mid.length ? '|partida' : ''}${over ? '|DESBORDA' : ''}`;\n    }));\n    console.log(`${w} ${p} ${res.join(' ; ')}`);\n  }\n  await ctx.close();\n}\nawait browser.close();\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:37:15-03:00","exit":0,"sha256":"4beb653f94ea6e7c7fa4e7f2a8fe19f5811227e1d8e1a072990188a849a905a1","lineas":30,"omitidas":0,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.13`** · exit 0 · 30 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:37:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (titles.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4411 <<'JS'
// Líneas y palabras partidas de cada .svc-card__title (servicios y portada, es/en/pt, varios anchos).
// Uso: node titles.mjs <baseUrl>
import { createRequire } from 'node:module';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const base = process.argv[2];
const exe = '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome';
const browser = await chromium.launch({ executablePath: exe });
for (const w of [1440, 1280, 1024, 768, 390]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of ['/servicios/', '/en/servicios/', '/pt/servicios/', '/', '/en/', '/pt/']) {
    await page.goto(base + p, { waitUntil: 'load' });
    const res = await page.evaluate(() => [...document.querySelectorAll('.svc-card__title')].map((h) => {
      // Palabra partida: un nodo de texto cuyo corte de línea cae dentro de una palabra.
      const text = h.textContent; const node = h.firstChild; const range = document.createRange();
      let prevTop = null; const breaks = [];
      for (let i = 0; i < text.length; i++) {
        range.setStart(node, i); range.setEnd(node, i + 1);
        const r = range.getClientRects()[0]; if (!r) continue;
        if (prevTop !== null && r.top > prevTop + 2) breaks.push(i);
        prevTop = r.top;
      }
      const card = h.closest('.svc-card').getBoundingClientRect(); range.selectNodeContents(h);
      const over = range.getBoundingClientRect().right > card.right + 0.5;
      const mid = breaks.filter((i) => /\S/.test(text[i - 1] ?? ' ') && /\S/.test(text[i]));
      return `${text}|${breaks.length + 1}l${mid.length ? '|partida' : ''}${over ? '|DESBORDA' : ''}`;
    }));
    console.log(`${w} ${p} ${res.join(' ; ')}`);
  }
  await ctx.close();
}
await browser.close();
JS
```

```text
1440 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|3l|partida ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidado|2l|partida ; Casillero USA|1l ; Compras Internacionales|2l ; Ruta Medio Oriente|1l
1440 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|3l|partida ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l ; Cargo Insurance|2l ; Deconsolidation|2l|partida ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
1440 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|3l|partida ; Armazenagem|2l|partida ; Consultoria Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidação|2l|partida ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
1440 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|3l|partida ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l
1440 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|3l|partida ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l
1440 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|3l|partida ; Armazenagem|2l|partida ; Consultoria Logística|2l ; Courier Internacional|1l
1280 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|3l|partida ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidado|2l|partida ; Casillero USA|1l ; Compras Internacionales|2l ; Ruta Medio Oriente|1l
1280 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|3l|partida ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l ; Cargo Insurance|2l ; Deconsolidation|2l|partida ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
1280 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|3l|partida ; Armazenagem|2l|partida ; Consultoria Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidação|2l|partida ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
1280 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|3l|partida ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l
1280 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|3l|partida ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l
1280 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|3l|partida ; Armazenagem|2l|partida ; Consultoria Logística|2l ; Courier Internacional|1l
1024 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|1l ; Almacenaje|1l ; Consultoría Logística|1l ; Courier Internacional|1l ; Seguros de Carga|1l ; Desconsolidado|1l ; Casillero USA|1l ; Compras Internacionales|1l ; Ruta Medio Oriente|1l
1024 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|1l ; International Courier|1l ; Cargo Insurance|1l ; Deconsolidation|1l ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
1024 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|1l ; Armazenagem|1l ; Consultoria Logística|1l ; Courier Internacional|1l ; Seguros de Carga|1l ; Desconsolidação|1l ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
1024 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|1l ; Almacenaje|1l ; Consultoría Logística|1l ; Courier Internacional|1l
1024 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|1l ; International Courier|1l
1024 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|1l ; Armazenagem|1l ; Consultoria Logística|1l ; Courier Internacional|1l
768 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|2l ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidado|1l ; Casillero USA|1l ; Compras Internacionales|1l ; Ruta Medio Oriente|1l
768 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l ; Cargo Insurance|1l ; Deconsolidation|1l ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
768 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|2l ; Armazenagem|1l ; Consultoria Logística|2l ; Courier Internacional|1l ; Seguros de Carga|2l ; Desconsolidação|1l ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
768 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|2l ; Almacenaje|1l ; Consultoría Logística|2l ; Courier Internacional|1l
768 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|2l ; Warehousing|1l ; Logistics Consulting|2l ; International Courier|1l
768 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|2l ; Armazenagem|1l ; Consultoria Logística|2l ; Courier Internacional|1l
390 /servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana y Documentación|1l ; Almacenaje|1l ; Consultoría Logística|1l ; Courier Internacional|1l ; Seguros de Carga|1l ; Desconsolidado|1l ; Casillero USA|1l ; Compras Internacionales|1l ; Ruta Medio Oriente|1l
390 /en/servicios/ Air Freight|1l ; Ocean Freight|1l ; Customs & Documentation|1l ; Warehousing|1l ; Logistics Consulting|1l ; International Courier|1l ; Cargo Insurance|1l ; Deconsolidation|1l ; USA Mailbox|1l ; International Sourcing|1l ; Middle East Route|1l
390 /pt/servicios/ Carga Aérea|1l ; Carga Marítima|1l ; Aduana e Documentação|1l ; Armazenagem|1l ; Consultoria Logística|1l ; Courier Internacional|1l ; Seguros de Carga|1l ; Desconsolidação|1l ; Caixa Postal EUA|1l ; Compras Internacionais|1l ; Rota Oriente Médio|1l
390 / Carga Marítima|1l ; Carga Aérea|1l ; Aduana y Documentación|1l ; Almacenaje|1l ; Consultoría Logística|1l ; Courier Internacional|1l
390 /en/ Ocean Freight|1l ; Air Freight|1l ; Customs & Documentation|1l ; Warehousing|1l ; Logistics Consulting|1l ; International Courier|1l
390 /pt/ Carga Marítima|1l ; Carga Aérea|1l ; Aduana e Documentação|1l ; Armazenagem|1l ; Consultoria Logística|1l ; Courier Internacional|1l
```
<!-- evidencia:fin apply-evidence.13 -->

`apply-evidence.12` (base): «Desconsolidação» desborda su tarjeta en `/pt/servicios/` a 1440 y
1280px. `apply-evidence.13` (worktree): ningún título desborda en ningún ancho ni idioma.

Efecto en es/en (no es regresión, pero cambia la apariencia): en las tarjetas angostas (`span 2`,
187px a 1280/1440) varios títulos de es/en/pt ya invadían el padding derecho de la tarjeta sin
llegar a cortarse («Documentación», «Desconsolidado», «Documentation», «Deconsolidation»,
«Armazenagem»). Con el corte permitido, esos títulos se parten con guion dentro del área de
contenido y la fila crece algunas líneas; a 1024, 768 y 390px no cambia nada. Capturas bajo
`memory/changes/fix-contrast-followups/capturas/`:

- tarjeta «Desconsolidação»: `t7-desconsolidacao-antes-1440.jpg` (cortada en el borde),
  `t7-desconsolidacao-despues-1440.jpg` (completa, «Desconsoli-dação»),
  `t7-desconsolidacao-antes-390.jpg` y `t7-desconsolidacao-despues-390.jpg` (sin cambios).
- grilla completa a 1440px, antes y después: `t7-grid-{antes,despues}-servicios-1440.jpg` (es),
  `t7-grid-{antes,despues}-en-servicios-1440.jpg` (en), `t7-grid-{antes,despues}-pt-servicios-1440.jpg`
  (pt).

## T8 — Nombre accesible del enlace de marca y de `#lang-trigger` (WCAG 2.5.3)

Commit: `bac7a97` — fix(a11y): keep visible text in brand and language trigger names.

Se quitan ambos `aria-label`; el contexto va en un `<span class="sr-only">` después del texto
visible, con el patrón ya usado por `common.openInNewTab` (sufijo con espacio inicial en la
traducción). `a11y.brandHome` y `a11y.languageCurrent` cambian de uso: ahora guardan ese sufijo en
es/en/pt. El script lee el nombre accesible que calcula Chrome (árbol de accesibilidad vía CDP) y el
texto visible (sin los `.sr-only`).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.14","forma":"archivo","argv":null,"texto":"# Script embebido (names.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4410 <<'JS'\n// Nombre accesible calculado por Chrome (árbol de accesibilidad vía CDP) del enlace de marca y de\n// #lang-trigger, junto a su texto visible. Uso: node names.mjs <baseUrl\u003e\nimport { createRequire } from 'node:module';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst base = process.argv[2];\nconst browser = await chromium.launch({ executablePath: '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome' });\nconst page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();\nconst cdp = await page.context().newCDPSession(page);\nfor (const p of ['/', '/en/', '/pt/']) {\n  await page.goto(base + p, { waitUntil: 'load' });\n  for (const sel of ['#navbar .nav__brand', '#lang-trigger']) {\n    // Texto visible: innerText con los .sr-only ocultos temporalmente.\n    const visible = (await page.locator(sel).evaluate((el) =\u003e {\n      const sr = [...el.querySelectorAll('.sr-only')]; sr.forEach((s) =\u003e (s.style.display = 'none'));\n      const txt = el.innerText; sr.forEach((s) =\u003e (s.style.display = '')); return txt;\n    })).replace(/\\s+/g, ' ').trim();\n    const aria = await page.locator(sel).getAttribute('aria-label');\n    const { root } = await cdp.send('DOM.getDocument');\n    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });\n    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });\n    const name = nodes[0].name.value;\n    const contiene = name.toLowerCase().replace(/\\s+/g, ' ').includes(visible.toLowerCase());\n    console.log(`${p} ${sel} rol=${nodes[0].role.value} aria-label=${aria ?? 'ninguno'} visible=\"${visible}\" nombre=\"${name}\" contiene-visible=${contiene}`);\n  }\n}\nawait browser.close();\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:37:33-03:00","exit":0,"sha256":"faaf682b28852b18d337a29a285e635896e4fc6cdcf1c7ad6794035a3d3b0937","lineas":6,"omitidas":0,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.14`** · exit 0 · 6 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:37:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (names.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4410 <<'JS'
// Nombre accesible calculado por Chrome (árbol de accesibilidad vía CDP) del enlace de marca y de
// #lang-trigger, junto a su texto visible. Uso: node names.mjs <baseUrl>
import { createRequire } from 'node:module';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const base = process.argv[2];
const browser = await chromium.launch({ executablePath: '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome' });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
const cdp = await page.context().newCDPSession(page);
for (const p of ['/', '/en/', '/pt/']) {
  await page.goto(base + p, { waitUntil: 'load' });
  for (const sel of ['#navbar .nav__brand', '#lang-trigger']) {
    // Texto visible: innerText con los .sr-only ocultos temporalmente.
    const visible = (await page.locator(sel).evaluate((el) => {
      const sr = [...el.querySelectorAll('.sr-only')]; sr.forEach((s) => (s.style.display = 'none'));
      const txt = el.innerText; sr.forEach((s) => (s.style.display = '')); return txt;
    })).replace(/\s+/g, ' ').trim();
    const aria = await page.locator(sel).getAttribute('aria-label');
    const { root } = await cdp.send('DOM.getDocument');
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    const name = nodes[0].name.value;
    const contiene = name.toLowerCase().replace(/\s+/g, ' ').includes(visible.toLowerCase());
    console.log(`${p} ${sel} rol=${nodes[0].role.value} aria-label=${aria ?? 'ninguno'} visible="${visible}" nombre="${name}" contiene-visible=${contiene}`);
  }
}
await browser.close();
JS
```

```text
/ #navbar .nav__brand rol=link aria-label=LOG ATM — Inicio visible="LOG ATM LOGÍSTICA A TU MEDIDA" nombre="LOG ATM — Inicio" contiene-visible=false
/ #lang-trigger rol=button aria-label=Idioma actual: Español visible="ES" nombre="Idioma actual: Español" contiene-visible=true
/en/ #navbar .nav__brand rol=link aria-label=LOG ATM — Home visible="LOG ATM LOGISTICS TAILORED TO YOU" nombre="LOG ATM — Home" contiene-visible=false
/en/ #lang-trigger rol=button aria-label=Current language: English visible="EN" nombre="Current language: English" contiene-visible=true
/pt/ #navbar .nav__brand rol=link aria-label=LOG ATM — Início visible="LOG ATM LOGÍSTICA SOB MEDIDA" nombre="LOG ATM — Início" contiene-visible=false
/pt/ #lang-trigger rol=button aria-label=Idioma atual: Português visible="PT" nombre="Idioma atual: Português" contiene-visible=false
```
<!-- evidencia:fin apply-evidence.14 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.15","forma":"archivo","argv":null,"texto":"# Script embebido (names.mjs); requiere los servidores de vista previa indicados en los argumentos.\nnode --input-type=module - http://127.0.0.1:4411 <<'JS'\n// Nombre accesible calculado por Chrome (árbol de accesibilidad vía CDP) del enlace de marca y de\n// #lang-trigger, junto a su texto visible. Uso: node names.mjs <baseUrl\u003e\nimport { createRequire } from 'node:module';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst base = process.argv[2];\nconst browser = await chromium.launch({ executablePath: '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome' });\nconst page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();\nconst cdp = await page.context().newCDPSession(page);\nfor (const p of ['/', '/en/', '/pt/']) {\n  await page.goto(base + p, { waitUntil: 'load' });\n  for (const sel of ['#navbar .nav__brand', '#lang-trigger']) {\n    // Texto visible: innerText con los .sr-only ocultos temporalmente.\n    const visible = (await page.locator(sel).evaluate((el) =\u003e {\n      const sr = [...el.querySelectorAll('.sr-only')]; sr.forEach((s) =\u003e (s.style.display = 'none'));\n      const txt = el.innerText; sr.forEach((s) =\u003e (s.style.display = '')); return txt;\n    })).replace(/\\s+/g, ' ').trim();\n    const aria = await page.locator(sel).getAttribute('aria-label');\n    const { root } = await cdp.send('DOM.getDocument');\n    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });\n    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });\n    const name = nodes[0].name.value;\n    const contiene = name.toLowerCase().replace(/\\s+/g, ' ').includes(visible.toLowerCase());\n    console.log(`${p} ${sel} rol=${nodes[0].role.value} aria-label=${aria ?? 'ninguno'} visible=\"${visible}\" nombre=\"${name}\" contiene-visible=${contiene}`);\n  }\n}\nawait browser.close();\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:37:35-03:00","exit":0,"sha256":"7a830763c7bd66ebfc07807032b4bd51c11bd0cca4635609c24a1c4f45e9211e","lineas":6,"omitidas":0,"no_recomprobable":"requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar"} -->
**Evidencia `apply-evidence.15`** · exit 0 · 6 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:37:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere los servidores de vista previa levantados por la fase (4410 base 8fa62c1, 4411 worktree), que se bajan al cerrar

```bash
# Script embebido (names.mjs); requiere los servidores de vista previa indicados en los argumentos.
node --input-type=module - http://127.0.0.1:4411 <<'JS'
// Nombre accesible calculado por Chrome (árbol de accesibilidad vía CDP) del enlace de marca y de
// #lang-trigger, junto a su texto visible. Uso: node names.mjs <baseUrl>
import { createRequire } from 'node:module';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const base = process.argv[2];
const browser = await chromium.launch({ executablePath: '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome' });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 } })).newPage();
const cdp = await page.context().newCDPSession(page);
for (const p of ['/', '/en/', '/pt/']) {
  await page.goto(base + p, { waitUntil: 'load' });
  for (const sel of ['#navbar .nav__brand', '#lang-trigger']) {
    // Texto visible: innerText con los .sr-only ocultos temporalmente.
    const visible = (await page.locator(sel).evaluate((el) => {
      const sr = [...el.querySelectorAll('.sr-only')]; sr.forEach((s) => (s.style.display = 'none'));
      const txt = el.innerText; sr.forEach((s) => (s.style.display = '')); return txt;
    })).replace(/\s+/g, ' ').trim();
    const aria = await page.locator(sel).getAttribute('aria-label');
    const { root } = await cdp.send('DOM.getDocument');
    const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: sel });
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
    const name = nodes[0].name.value;
    const contiene = name.toLowerCase().replace(/\s+/g, ' ').includes(visible.toLowerCase());
    console.log(`${p} ${sel} rol=${nodes[0].role.value} aria-label=${aria ?? 'ninguno'} visible="${visible}" nombre="${name}" contiene-visible=${contiene}`);
  }
}
await browser.close();
JS
```

```text
/ #navbar .nav__brand rol=link aria-label=ninguno visible="LOG ATM LOGÍSTICA A TU MEDIDA" nombre="LOG ATM LOGÍSTICA A TU MEDIDA — Inicio" contiene-visible=true
/ #lang-trigger rol=button aria-label=ninguno visible="ES" nombre="ES — Idioma actual: Español, cambiar idioma" contiene-visible=true
/en/ #navbar .nav__brand rol=link aria-label=ninguno visible="LOG ATM LOGISTICS TAILORED TO YOU" nombre="LOG ATM LOGISTICS TAILORED TO YOU — Home" contiene-visible=true
/en/ #lang-trigger rol=button aria-label=ninguno visible="EN" nombre="EN — Current language: English, change language" contiene-visible=true
/pt/ #navbar .nav__brand rol=link aria-label=ninguno visible="LOG ATM LOGÍSTICA SOB MEDIDA" nombre="LOG ATM LOGÍSTICA SOB MEDIDA — Início" contiene-visible=true
/pt/ #lang-trigger rol=button aria-label=ninguno visible="PT" nombre="PT — Idioma atual: Português, mudar idioma" contiene-visible=true
```
<!-- evidencia:fin apply-evidence.15 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.16","forma":"argv","argv":["/usr/bin/grep","-n","-E","\"(brandHome|languageCurrent)\"","src/i18n/translations/es.json","src/i18n/translations/en.json","src/i18n/translations/pt.json"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:37:35-03:00","exit":0,"sha256":"1fed541d312605f02701d9c8f18848aa0ead4c697629a45b97d1d4b439c3ff6e","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.16`** · exit 0 · 6 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:37:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`

```text
/usr/bin/grep -n -E '"(brandHome|languageCurrent)"' src/i18n/translations/es.json src/i18n/translations/en.json src/i18n/translations/pt.json
```

```text
src/i18n/translations/es.json:64:    "brandHome": " — Inicio",
src/i18n/translations/es.json:70:    "languageCurrent": " — Idioma actual: {lang}, cambiar idioma",
src/i18n/translations/en.json:64:    "brandHome": " — Home",
src/i18n/translations/en.json:70:    "languageCurrent": " — Current language: {lang}, change language",
src/i18n/translations/pt.json:64:    "brandHome": " — Início",
src/i18n/translations/pt.json:70:    "languageCurrent": " — Idioma atual: {lang}, mudar idioma",
```
<!-- evidencia:fin apply-evidence.16 -->

`apply-evidence.14` (base): el enlace de marca tenía nombre «LOG ATM — Inicio», que no contiene su
texto visible (incluye la bajada), y `#lang-trigger` en pt «Idioma atual: Português», que no
contiene «PT»; en es/en el «ES»/«EN» solo aparecía por coincidencia dentro de «Español»/«English».
`apply-evidence.15` (worktree): sin `aria-label`, ambos nombres empiezan por el texto visible y
siguen anunciando su propósito (inicio / idioma actual y cambio de idioma) en los tres idiomas.
`apply-evidence.16`: los sufijos localizados. La paridad de claves (`npm run validate-i18n`) corre en
T9.

## T9 — Verificación integral (corrida completa de cierre)

Sin commit propio. `npm run build` corrió sobre el árbol final (`f005c16`, último commit de código)
antes de esta corrida; `npm run a11y` audita ese `dist/` con su propio `astro preview` y Chrome vía
`CHROME_PATH`. Los cuatro comandos son los de verificación de `memory/_profile.md`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.17","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:37:52-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.17`** · exit 0 · 6 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:37:52-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
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
<!-- evidencia:fin apply-evidence.17 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.18","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:37:53-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.18`** · exit 0 · 5 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:37:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin apply-evidence.18 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.19","forma":"argv","argv":["npm","run","check"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:38:00-03:00","exit":0,"sha256":"6fdbde44c1b9bd7f79f35cb73670baff9b5af9d31ec4b5f9225bc6129a96b7b2","lineas":13,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.19`** · exit 0 · 13 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:38:00-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run check
```

```text

> log-atm-web-astro@0.0.1 check
> astro check

21:37:55 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
21:37:55 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
21:37:56 [types] Generated 1.31s
21:37:56 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.19 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.20","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","npm","run","a11y"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"f005c160545b07a1f1b5920250a6b78696cbbad3","fecha":"2026-10-06T21:38:28-03:00","exit":0,"sha256":"993baf4aa3dc9a3f99ad11d35dc963408a496e012235d3c7ac9a3ca954bacc03","lineas":7,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.20`** · exit 0 · 7 líneas, 0 omitidas · HEAD `f005c160545b` · 2026-10-06T21:38:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 0 violaciones en 0 reglas · 0 estados HTTP inesperados
```
<!-- evidencia:fin apply-evidence.20 -->

`apply-evidence.17`: paridad de claves i18n OK en en/pt. `apply-evidence.18`: links i18n sin
errores. `apply-evidence.19`: `astro check` sin errores, advertencias ni sugerencias.
`apply-evidence.20`: `npm run a11y` termina en exit 0 sobre las 21 URL × escritorio/móvil, sin
violaciones (incluida `label-content-name-mismatch`) ni estados HTTP inesperados. Los servidores de
vista previa que levantó la fase (4410 y 4411) se bajaron antes de esta corrida; la auditoría baja el
suyo al terminar.

## Redespacho 1 — corrección de H1 de `verify-report.md` (T3, hover del skip link)

Commit: `bbecfe8` — fix(a11y): keep skip link text white on hover.

`verify-report.md` (H1, bloqueante de la segunda aceptación de T3) detecta que la regla base
`a:hover { color: var(--color-primary-700) }`, en `@layer base` igual que `.skip-link`, gana por
especificidad (0,1,1 frente a 0,1,0): con foco y puntero encima, el texto del skip link pasa de blanco
a primary-700 sobre su fondo primary-600. La corrección agrega `.skip-link:hover { color:
var(--color-brand-solid-text); }` en `src/styles/global.css` (especificidad 0,2,0), el mismo par
blanco/primary-600 que `DESIGN.md` documenta para el skip link. H2 (`#2D9B6F` en `constants.ts`) es
opcional según el propio informe, queda fuera de la fuente de tareas (el criterio de T2 es
`grep -rn 2d9b6f src/`, que distingue mayúsculas) y no se toca.

El bloque siguiente mide, sobre `dist/` compilado desde `bbecfe8` y servido por un `astro preview`
propio en el puerto 4431, el skip link enfocado por teclado y con el puntero encima en las 18
páginas a 1440, 1280 y 390 px, y repite el barrido de hover de todos los enlaces visibles en
escritorio para descartar otra regresión del color base.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.21","forma":"archivo","argv":null,"texto":"# Script embebido (hover.mjs): skip link enfocado + hover en 18 páginas a 1440/1280/390, y barrido de\n# hover de todos los enlaces visibles (escritorio 1280). Requiere el servidor de vista previa en 4431.\nnode --input-type=module - http://127.0.0.1:4431 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/client <<'JS'\nimport { createRequire } from 'node:module';\nimport { readdirSync } from 'node:fs';\nimport { join, relative } from 'node:path';\nconst require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');\nconst { chromium } = require('playwright-core');\nconst [base, dist] = process.argv.slice(2);\nconst pages = []; (function walk(d) { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) pages.push('/' + relative(dist, f).replace(/(^|\\/)index\\.html$/, '$1')); } })(dist);\npages.sort();\n// Color del texto y fondo opaco más cercano; marca si hay imagen/degradado en la cadena\nconst medir = (a) =\u003e {\n  const lin = (c) =\u003e { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };\n  const lum = ([r, g, b]) =\u003e 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);\n  const fg = getComputedStyle(a).color.match(/[\\d.]+/g).slice(0, 3).map(Number);\n  let el = a; let bg = null; let img = false;\n  while (el) { const s = getComputedStyle(el); if (s.backgroundImage !== 'none') img = true; const m = s.backgroundColor.match(/[\\d.]+/g); if (m && (m.length < 4 || +m[3] === 1)) { bg = m.slice(0, 3).map(Number); break; } el = el.parentElement; }\n  bg ??= [255, 255, 255];\n  const [x, y] = [lum(fg), lum(bg)].sort((p, q) =\u003e q - p);\n  return { fg: `rgb(${fg.join(', ')})`, bg: `rgb(${bg.join(', ')})`, img, ratio: +((x + 0.05) / (y + 0.05)).toFixed(2) };\n};\nconst browser = await chromium.launch({ executablePath: '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome' });\n// 1) Skip link: foco por teclado + puntero encima, en todas las páginas y tres anchos\nfor (const width of [1440, 1280, 390]) {\n  const page = await (await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })).newPage();\n  const combos = new Map(); let n = 0; let min = Infinity;\n  for (const p of pages) {\n    await page.goto(base + p, { waitUntil: 'load' });\n    await page.keyboard.press('Tab');\n    const enfocado = await page.evaluate(() =\u003e document.activeElement?.classList.contains('skip-link'));\n    if (!enfocado) { console.log(`[${width}] ${p}: el primer Tab no enfoca .skip-link`); continue; }\n    await page.hover('.skip-link');\n    const r = await page.$eval('.skip-link', (a, f) =\u003e ({ hover: a.matches(':hover'), fv: a.matches(':focus-visible'), ...new Function('return ' + f)()(a) }), medir.toString());\n    n++; min = Math.min(min, r.ratio);\n    const k = `hover=${r.hover} focus-visible=${r.fv} ${r.fg} sobre ${r.bg} = ${r.ratio}:1`; combos.set(k, (combos.get(k) ?? 0) + 1);\n  }\n  console.log(`[${width}] skip link enfocado + hover: ${n}/${pages.length} páginas, ratio mínimo ${min}:1`);\n  for (const [k, c] of combos) console.log(`  ${c}× ${k}`);\n  await page.context().close();\n}\n// 2) Barrido de hover: todo enlace visible con texto, escritorio 1280\nconst page = await (await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' })).newPage();\nlet medidos = 0; let tapados = 0; const bajos = new Map();\nfor (const p of pages) {\n  await page.goto(base + p, { waitUntil: 'load' });\n  const total = await page.$$eval('a', (as) =\u003e as.length);\n  for (let i = 0; i < total; i++) {\n    const a = (await page.$$('a'))[i];\n    const ok = await a.evaluate((el) =\u003e { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return r.width \u003e 0 && r.height \u003e 0 && cs.visibility !== 'hidden' && !!el.textContent.trim() && !el.closest('[inert],[aria-hidden=\"true\"]'); });\n    if (!ok) continue;\n    await a.scrollIntoViewIfNeeded();\n    const box = await a.boundingBox(); if (!box) continue;\n    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);\n    const r = await a.evaluate((el, f) =\u003e ({ hover: el.matches(':hover'), cls: el.className ? '.' + String(el.className).split(' ')[0] : `[href=\"${el.getAttribute('href')}\"]`, ...new Function('return ' + f)()(el) }), medir.toString());\n    if (!r.hover) { tapados++; continue; }\n    medidos++;\n    if (r.ratio < 4.5) { const k = `${r.cls} ${r.fg} sobre ${r.bg}${r.img ? ' (imagen/degradado en la cadena)' : ''} = ${r.ratio}:1`; bajos.set(k, (bajos.get(k) ?? 0) + 1); }\n  }\n}\nawait browser.close();\nconsole.log(`Barrido hover (1280): ${pages.length} páginas · enlaces medidos con :hover efectivo=${medidos} · no alcanzables por el puntero=${tapados} · bajo 4.5:1=${[...bajos.values()].reduce((s, v) =\u003e s + v, 0)}`);\nfor (const [k, c] of [...bajos].sort()) console.log(`  ${c}× ${k}`);\nJS\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"bbecfe84da10ff685aabf8097eeacc03c4512c4b","fecha":"2026-10-06T21:52:31-03:00","exit":0,"sha256":"cb26aa570c2091d0595313bd18358914c3037d68b394189873d1b2d93d1d8362","lineas":11,"omitidas":0,"no_recomprobable":"requiere el servidor de vista previa levantado por la fase (puerto 4431), que se baja al cerrar"} -->
**Evidencia `apply-evidence.21`** · exit 0 · 11 líneas, 0 omitidas · HEAD `bbecfe84da10` · 2026-10-06T21:52:31-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: requiere el servidor de vista previa levantado por la fase (puerto 4431), que se baja al cerrar

```bash
# Script embebido (hover.mjs): skip link enfocado + hover en 18 páginas a 1440/1280/390, y barrido de
# hover de todos los enlaces visibles (escritorio 1280). Requiere el servidor de vista previa en 4431.
node --input-type=module - http://127.0.0.1:4431 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/dist/client <<'JS'
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
const require = createRequire('/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/package.json');
const { chromium } = require('playwright-core');
const [base, dist] = process.argv.slice(2);
const pages = []; (function walk(d) { for (const e of readdirSync(d, { withFileTypes: true })) { const f = join(d, e.name); if (e.isDirectory()) walk(f); else if (e.name.endsWith('.html')) pages.push('/' + relative(dist, f).replace(/(^|\/)index\.html$/, '$1')); } })(dist);
pages.sort();
// Color del texto y fondo opaco más cercano; marca si hay imagen/degradado en la cadena
const medir = (a) => {
  const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const fg = getComputedStyle(a).color.match(/[\d.]+/g).slice(0, 3).map(Number);
  let el = a; let bg = null; let img = false;
  while (el) { const s = getComputedStyle(el); if (s.backgroundImage !== 'none') img = true; const m = s.backgroundColor.match(/[\d.]+/g); if (m && (m.length < 4 || +m[3] === 1)) { bg = m.slice(0, 3).map(Number); break; } el = el.parentElement; }
  bg ??= [255, 255, 255];
  const [x, y] = [lum(fg), lum(bg)].sort((p, q) => q - p);
  return { fg: `rgb(${fg.join(', ')})`, bg: `rgb(${bg.join(', ')})`, img, ratio: +((x + 0.05) / (y + 0.05)).toFixed(2) };
};
const browser = await chromium.launch({ executablePath: '/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome' });
// 1) Skip link: foco por teclado + puntero encima, en todas las páginas y tres anchos
for (const width of [1440, 1280, 390]) {
  const page = await (await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })).newPage();
  const combos = new Map(); let n = 0; let min = Infinity;
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'load' });
    await page.keyboard.press('Tab');
    const enfocado = await page.evaluate(() => document.activeElement?.classList.contains('skip-link'));
    if (!enfocado) { console.log(`[${width}] ${p}: el primer Tab no enfoca .skip-link`); continue; }
    await page.hover('.skip-link');
    const r = await page.$eval('.skip-link', (a, f) => ({ hover: a.matches(':hover'), fv: a.matches(':focus-visible'), ...new Function('return ' + f)()(a) }), medir.toString());
    n++; min = Math.min(min, r.ratio);
    const k = `hover=${r.hover} focus-visible=${r.fv} ${r.fg} sobre ${r.bg} = ${r.ratio}:1`; combos.set(k, (combos.get(k) ?? 0) + 1);
  }
  console.log(`[${width}] skip link enfocado + hover: ${n}/${pages.length} páginas, ratio mínimo ${min}:1`);
  for (const [k, c] of combos) console.log(`  ${c}× ${k}`);
  await page.context().close();
}
// 2) Barrido de hover: todo enlace visible con texto, escritorio 1280
const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' })).newPage();
let medidos = 0; let tapados = 0; const bajos = new Map();
for (const p of pages) {
  await page.goto(base + p, { waitUntil: 'load' });
  const total = await page.$$eval('a', (as) => as.length);
  for (let i = 0; i < total; i++) {
    const a = (await page.$$('a'))[i];
    const ok = await a.evaluate((el) => { const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && !!el.textContent.trim() && !el.closest('[inert],[aria-hidden="true"]'); });
    if (!ok) continue;
    await a.scrollIntoViewIfNeeded();
    const box = await a.boundingBox(); if (!box) continue;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    const r = await a.evaluate((el, f) => ({ hover: el.matches(':hover'), cls: el.className ? '.' + String(el.className).split(' ')[0] : `[href="${el.getAttribute('href')}"]`, ...new Function('return ' + f)()(el) }), medir.toString());
    if (!r.hover) { tapados++; continue; }
    medidos++;
    if (r.ratio < 4.5) { const k = `${r.cls} ${r.fg} sobre ${r.bg}${r.img ? ' (imagen/degradado en la cadena)' : ''} = ${r.ratio}:1`; bajos.set(k, (bajos.get(k) ?? 0) + 1); }
  }
}
await browser.close();
console.log(`Barrido hover (1280): ${pages.length} páginas · enlaces medidos con :hover efectivo=${medidos} · no alcanzables por el puntero=${tapados} · bajo 4.5:1=${[...bajos.values()].reduce((s, v) => s + v, 0)}`);
for (const [k, c] of [...bajos].sort()) console.log(`  ${c}× ${k}`);
JS
```

```text
[1440] skip link enfocado + hover: 18/18 páginas, ratio mínimo 6.08:1
  18× hover=true focus-visible=true rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1
[1280] skip link enfocado + hover: 18/18 páginas, ratio mínimo 6.08:1
  18× hover=true focus-visible=true rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1
[390] skip link enfocado + hover: 18/18 páginas, ratio mínimo 6.08:1
  18× hover=true focus-visible=true rgb(255, 255, 255) sobre rgb(59, 100, 151) = 6.08:1
Barrido hover (1280): 18 páginas · enlaces medidos con :hover efectivo=363 · no alcanzables por el puntero=18 · bajo 4.5:1=30
  15× .svc-card rgb(255, 255, 255) sobre rgb(255, 255, 255) = 1:1
  5× [href="/"] rgb(215, 228, 244) sobre rgb(248, 247, 246) (imagen/degradado en la cadena) = 1.2:1
  5× [href="/en/"] rgb(215, 228, 244) sobre rgb(248, 247, 246) (imagen/degradado en la cadena) = 1.2:1
  5× [href="/pt/"] rgb(215, 228, 244) sobre rgb(248, 247, 246) (imagen/degradado en la cadena) = 1.2:1
```
<!-- evidencia:fin apply-evidence.21 -->

`apply-evidence.21`: con foco de teclado y puntero encima, el skip link conserva el texto blanco
sobre primary-600 en las 18 páginas y en los tres anchos; ya no aparece la combinación primary-700
sobre primary-600 que reporta `verify-report.10`/`.11`. En el barrido de hover, los enlaces bajo
4,5:1 son los mismos falsos positivos que `verify-report.md` descarta en T3-a: `.svc-card` (texto
blanco propio del componente sobre la foto `.svc-card__media` y su degradado oscuro, hermanos
posicionados que la cadena de ancestros no ve) y el breadcrumb del hero (primary-100 propio, con
degradado en la cadena). Ninguno renderiza el color base ni su hover. El servidor de vista previa
del puerto 4431 se bajó al terminar el muestreo.

### Corrida completa de cierre del redespacho

Sin commit propio. `npm run build` corrió sobre `bbecfe8` antes del muestreo anterior; `npm run a11y`
audita ese `dist/` con su propio `astro preview` y Chrome vía `CHROME_PATH`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.22","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"bbecfe84da10ff685aabf8097eeacc03c4512c4b","fecha":"2026-10-06T21:52:59-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.22`** · exit 0 · 6 líneas, 0 omitidas · HEAD `bbecfe84da10` · 2026-10-06T21:52:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
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
<!-- evidencia:fin apply-evidence.22 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.23","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"bbecfe84da10ff685aabf8097eeacc03c4512c4b","fecha":"2026-10-06T21:52:59-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.23`** · exit 0 · 5 líneas, 0 omitidas · HEAD `bbecfe84da10` · 2026-10-06T21:52:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin apply-evidence.23 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.24","forma":"argv","argv":["npm","run","check"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"bbecfe84da10ff685aabf8097eeacc03c4512c4b","fecha":"2026-10-06T21:53:07-03:00","exit":0,"sha256":"231279c312ecac08fa1010ef7c9bbde416f7a462ef3dee2518d8a34a87ada68d","lineas":13,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.24`** · exit 0 · 13 líneas, 0 omitidas · HEAD `bbecfe84da10` · 2026-10-06T21:53:07-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run check
```

```text

> log-atm-web-astro@0.0.1 check
> astro check

21:53:01 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
21:53:01 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
21:53:02 [types] Generated 1.31s
21:53:02 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.24 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.25","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","npm","run","a11y"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro","head":"bbecfe84da10ff685aabf8097eeacc03c4512c4b","fecha":"2026-10-06T21:53:30-03:00","exit":0,"sha256":"993baf4aa3dc9a3f99ad11d35dc963408a496e012235d3c7ac9a3ca954bacc03","lineas":7,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.25`** · exit 0 · 7 líneas, 0 omitidas · HEAD `bbecfe84da10` · 2026-10-06T21:53:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 0 violaciones en 0 reglas · 0 estados HTTP inesperados
```
<!-- evidencia:fin apply-evidence.25 -->

`apply-evidence.22`: paridad de claves i18n OK en en/pt. `apply-evidence.23`: links i18n sin
errores. `apply-evidence.24`: `astro check` sin errores, advertencias ni sugerencias.
`apply-evidence.25`: `npm run a11y` termina en exit 0 sobre las 21 URL × escritorio/móvil, sin
violaciones ni estados HTTP inesperados. No queda ningún servidor de vista previa levantado.
