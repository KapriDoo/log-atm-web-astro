---
type: apply-evidence
change_name: "fix-color-contrast-sitewide"
created: "2026-10-05"
updated: "2026-10-06"
tags: [apply-evidence]
---

# Apply evidence: fix-color-contrast-sitewide

Ninguna tarea es `[TDD]` (el proyecto no tiene suite de tests; ver `tasks.md`). Las tareas 1–25
modifican código y documentación; las tareas 26–29 verifican el resultado con scripts que viven
fuera del repo (directorio de temporales de la fase) y cuyo texto queda embebido en cada bloque.

Antes de la Tarea 1 se registraron los artefactos de planificación pendientes del worktree
(`726d6c6 chore(sdd): record fix-color-contrast-sitewide planning artifacts`).

## Tareas 1–25 — commits

| Tarea | Spec | Commit |
|---|---|---|
| 1 | `contrast-token-single-source` | `b08df43` fix(tokens): declare contrast pair, accent text and focus ring tokens |
| 2 | `contrast-token-single-source` | `eb4735e` docs(design): document contrast pairs, focus ring context and email exception |
| 3, 4, 5 | `cta-button-contrast` | `84ce2fc` fix(a11y): use dark text on green CTA surfaces |
| 6, 7 | `brand-button-contrast` | `58cb313` fix(a11y): render solid brand buttons on primary-600 with light text |
| 8, 9 | `whatsapp-button-contrast` | `a8c8198` fix(a11y): use dark text on WhatsApp green surfaces |
| 10 | `email-whatsapp-button-contrast` | `4481fc6` fix(email): use dark text on the WhatsApp reply button |
| 11 | `nav-link-state-contrast` | `7a9e438` fix(a11y): darken nav link hover, focus and active states |
| 12, 13, 14 | `accent-text-contrast` | `952417d` fix(a11y): render green accent text with accent-800 |
| 15, 16 | `dark-surface-heading-legibility` | `a6d9510` fix(a11y): give light color to headings on dark surfaces |
| 17 | `quote-summary-empty-values-contrast` | `e38e7c1` fix(a11y): raise pending quote summary values to text-muted |
| 18, 19 | `secondary-text-dark-surface-contrast` | `64fe893` fix(a11y): raise secondary text contrast on dark surfaces |
| 20 | `error-page-code-contrast` | `f3779d5` fix(a11y): color the decorative 404 code with the brand blue |
| 21 | `services-filter-active-state-contrast` | `7b357dc` fix(a11y): keep the active services filter legible on hover |
| 22, 23 | `focus-indicator-contrast` | `3fc9985` fix(a11y): take focus ring color from the surface context |
| 24, 25 | `focus-indicator-contrast` | `4611441` fix(a11y): restore visible focus on language options and form fields |

Notas de implementación:

- Tarea 20: `.error-page__code` ya tenía `font-size: clamp(6rem, 15vw, 10rem)` y `font-weight: 900`; solo cambió el color. El markup conserva `aria-hidden="true"`.
- Tarea 19: la pastilla del contador usa `padding: 0.4rem 0.9rem` y agrega `-webkit-backdrop-filter` junto a `backdrop-filter`, como el resto de `shared.css`.
- Tarea 11: `.nav__link:focus-visible` se suma a la regla compartida de hover/activo (fondo `surface-alt` + `--color-brand-dark`).

El bloque siguiente lista los commits de las tareas 1–25 con sus archivos tocados (rango fijo).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["git","log","--reverse","--format=%h %s","--name-only","726d6c6..4611441"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:11:34-03:00","exit":0,"sha256":"04548d013d7d976de274036f4fa28b23e88e2163a962895543ba644b459c8002","lineas":65,"omitidas":25,"no_recomprobable":null} -->
**Evidencia `apply-evidence.1`** · exit 0 · 65 líneas, 25 omitidas · HEAD `461144149251` · 2026-10-05T00:11:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```text
git log --reverse '--format=%h %s' --name-only 726d6c6..4611441
```

```text
b08df43 fix(tokens): declare contrast pair, accent text and focus ring tokens

log-atm-web-astro/src/styles/tokens.css
eb4735e docs(design): document contrast pairs, focus ring context and email exception

log-atm-web-astro/DESIGN.md
84ce2fc fix(a11y): use dark text on green CTA surfaces

log-atm-web-astro/src/pages/404.astro
log-atm-web-astro/src/styles/global.css
log-atm-web-astro/src/styles/pages/cotizar.css
log-atm-web-astro/src/styles/pages/shared.css
log-atm-web-astro/src/styles/sections/services.css
58cb313 fix(a11y): render solid brand buttons on primary-600 with light text

log-atm-web-astro/src/styles/global.css
log-atm-web-astro/src/styles/sections/cta.css
log-atm-web-astro/src/styles/tokens.css
a8c8198 fix(a11y): use dark text on WhatsApp green surfaces

log-atm-web-astro/src/styles/global.css
log-atm-web-astro/src/styles/pages/shared.css
4481fc6 fix(email): use dark text on the WhatsApp reply button

log-atm-web-astro/src/lib/email-templates.ts
7a9e438 fix(a11y): darken nav link hover, focus and active states

log-atm-web-astro/src/components/ui/Navbar.astro
952417d fix(a11y): render green accent text with accent-800

log-atm-web-astro/src/styles/global.css
log-atm-web-astro/src/styles/pages/cotizar.css
log-atm-web-astro/src/styles/pages/shared.css
a6d9510 fix(a11y): give light color to headings on dark surfaces

log-atm-web-astro/src/styles/pages/cotizar.css
log-atm-web-astro/src/styles/pages/shared.css
e38e7c1 fix(a11y): raise pending quote summary values to text-muted

log-atm-web-astro/src/styles/pages/cotizar.css
```
<!-- evidencia:fin apply-evidence.1 -->

## Tarea 26 — Build y reglas estáticas sobre el diff

Commit: ninguno (verificación). Con las tareas 1–25 aplicadas, el build de este bloque es además
la corrida completa de cierre de la fase: la Tarea 29 solo toca `DESIGN.md`, que no entra al
build, y el proyecto no declara otra suite.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:11:47-03:00","exit":0,"sha256":"3b530e376d8297dfcae1f8cd544142ff1cc2ca5663416cad3be6f133936b9f7a","lineas":143,"omitidas":103,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.2`** · exit 0 · 143 líneas, 103 omitidas · HEAD `461144149251` · 2026-10-05T00:11:47-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

00:11:40 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
00:11:40 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
00:11:41 [types] Generated 1.28s
00:11:41 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
00:11:42 [build] output: "static"
00:11:42 [build] mode: "server"
00:11:42 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/dist/
00:11:42 [build] adapter: @astrojs/cloudflare
00:11:42 [build] Collecting build info...
00:11:42 [build] ✓ Completed in 1.70s.
00:11:42 [build] Building server entrypoints...
00:11:44 [vite] ✓ built in 2.05s
00:11:45 [vite] ✓ built in 1.49s
00:11:46 [vite] ✓ built in 731ms

 prerendering static routes 
00:11:47   ├─ /contacto/index.html (+20ms) 
00:11:47   ├─ /cotizar/index.html (+11ms) 
00:11:47   ├─ /industrias/index.html (+18ms) 
00:11:47   ├─ /nosotros/index.html (+11ms) 
00:11:47   ├─ /servicios/index.html (+17ms) 
00:11:47   ├─ /en/contacto/index.html (+8ms) 
00:11:47   ├─ /pt/contacto/index.html (+9ms) 
00:11:47   ├─ /en/cotizar/index.html (+9ms) 
00:11:47   ├─ /pt/cotizar/index.html (+9ms) 
00:11:47   ├─ /en/industrias/index.html (+11ms) 
00:11:47   ├─ /pt/industrias/index.html (+11ms) 
00:11:47   ├─ /en/nosotros/index.html (+8ms) 
00:11:47   ├─ /pt/nosotros/index.html (+8ms) 
00:11:47   ├─ /en/servicios/index.html (+10ms) 
00:11:47   ├─ /pt/servicios/index.html (+11ms) 
00:11:47   ├─ /en/index.html (+11ms) 
00:11:47   ├─ /pt/index.html (+11ms) 
00:11:47   ├─ /index.html (+11ms) 
```
<!-- evidencia:fin apply-evidence.2 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"archivo","argv":null,"texto":"# Líneas agregadas con hex de color en src/ fuera de las dos excepciones (tokens.css, email-templates.ts)\nset -u\nbase=$(git merge-base main HEAD)\necho \"base=$base\"\nadded=$(git diff \"$base\" HEAD -U0 -- src ':(exclude)src/styles/tokens.css' ':(exclude)src/lib/email-templates.ts' | grep -E '^\\+[^+]' || true)\nhits=$(printf '%s\\n' \"$added\" | grep -E '#[0-9a-fA-F]{3,8}\\b' || true)\necho \"lineas_agregadas=$(printf '%s\\n' \"$added\" | grep -c . )\"\necho \"hex_fuera_de_excepciones=$(printf '%s\\n' \"$hits\" | grep -c . )\"\nprintf '%s\\n' \"$hits\" | grep . || true\n# --color-brand-hover retirado y sin consumidores\necho \"color-brand-hover_en_src=$(grep -rn -e '--color-brand-hover' src | wc -l)\"\n# outline: none restantes\necho \"outline_none_en_src=$(grep -rnE 'outline:\\s*(none|0)\\b' src | wc -l)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:12:10-03:00","exit":0,"sha256":"900dd969ef618d09b4f5b4f5bb4b4610948e4d12e0fb52aa10776c0d1e34fda7","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.3`** · exit 0 · 5 líneas, 0 omitidas · HEAD `461144149251` · 2026-10-05T00:12:10-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Líneas agregadas con hex de color en src/ fuera de las dos excepciones (tokens.css, email-templates.ts)
set -u
base=$(git merge-base main HEAD)
echo "base=$base"
added=$(git diff "$base" HEAD -U0 -- src ':(exclude)src/styles/tokens.css' ':(exclude)src/lib/email-templates.ts' | grep -E '^\+[^+]' || true)
hits=$(printf '%s\n' "$added" | grep -E '#[0-9a-fA-F]{3,8}\b' || true)
echo "lineas_agregadas=$(printf '%s\n' "$added" | grep -c . )"
echo "hex_fuera_de_excepciones=$(printf '%s\n' "$hits" | grep -c . )"
printf '%s\n' "$hits" | grep . || true
# --color-brand-hover retirado y sin consumidores
echo "color-brand-hover_en_src=$(grep -rn -e '--color-brand-hover' src | wc -l)"
# outline: none restantes
echo "outline_none_en_src=$(grep -rnE 'outline:\s*(none|0)\b' src | wc -l)"
```

```text
base=587a8af23626491d5995a897c568005797df7e98
lineas_agregadas=85
hex_fuera_de_excepciones=0
color-brand-hover_en_src=0
outline_none_en_src=0
```
<!-- evidencia:fin apply-evidence.3 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"archivo","argv":null,"texto":"# Cada token nuevo figura en :root (capa base) y en @theme de tokens.css\nset -u\npython3 - src/styles/tokens.css <<'PY'\nimport re, sys\nsrc = open(sys.argv[1]).read()\nroot, theme = src.split('\\n@theme {')\nstrip = lambda t: re.sub(r'/\\*.*?\\*/', '', t, flags=re.S)\nnames = lambda t: set(re.findall(r'(--[\\w-]+)\\s*:', strip(t)))\nr, th = names(root), names(theme)\nnuevos = ['--color-accent-800','--color-error-light','--color-cta-hover','--color-cta-text',\n          '--color-cta-hover-text','--color-whatsapp','--color-whatsapp-text','--color-brand-solid',\n          '--color-brand-solid-hover','--color-brand-solid-text','--color-text-accent',\n          '--color-focus-ring','--color-focus-ring-inverse']\nfalta = 0\nfor n in nuevos:\n    ok = n in r and n in th; falta += not ok\n    print(f\"{n}: root={'si' if n in r else 'NO'} theme={'si' if n in th else 'NO'}\")\nwa = re.search(r'--color-whatsapp\\s*:\\s*([^;]+);', strip(root)).group(1).strip()\nprint(f\"--color-whatsapp (:root) = {wa}\")\nprint(f\"tokens={len(nuevos)} faltantes={falta}\")\nsys.exit(1 if falta or wa.lower() != '#25d366' else 0)\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:12:10-03:00","exit":0,"sha256":"79956de5878ea60ba16a9193c28e5293fe371a5fccc9f12717c739e16529925f","lineas":15,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.4`** · exit 0 · 15 líneas, 0 omitidas · HEAD `461144149251` · 2026-10-05T00:12:10-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Cada token nuevo figura en :root (capa base) y en @theme de tokens.css
set -u
python3 - src/styles/tokens.css <<'PY'
import re, sys
src = open(sys.argv[1]).read()
root, theme = src.split('\n@theme {')
strip = lambda t: re.sub(r'/\*.*?\*/', '', t, flags=re.S)
names = lambda t: set(re.findall(r'(--[\w-]+)\s*:', strip(t)))
r, th = names(root), names(theme)
nuevos = ['--color-accent-800','--color-error-light','--color-cta-hover','--color-cta-text',
          '--color-cta-hover-text','--color-whatsapp','--color-whatsapp-text','--color-brand-solid',
          '--color-brand-solid-hover','--color-brand-solid-text','--color-text-accent',
          '--color-focus-ring','--color-focus-ring-inverse']
falta = 0
for n in nuevos:
    ok = n in r and n in th; falta += not ok
    print(f"{n}: root={'si' if n in r else 'NO'} theme={'si' if n in th else 'NO'}")
wa = re.search(r'--color-whatsapp\s*:\s*([^;]+);', strip(root)).group(1).strip()
print(f"--color-whatsapp (:root) = {wa}")
print(f"tokens={len(nuevos)} faltantes={falta}")
sys.exit(1 if falta or wa.lower() != '#25d366' else 0)
PY
```

```text
--color-accent-800: root=si theme=si
--color-error-light: root=si theme=si
--color-cta-hover: root=si theme=si
--color-cta-text: root=si theme=si
--color-cta-hover-text: root=si theme=si
--color-whatsapp: root=si theme=si
--color-whatsapp-text: root=si theme=si
--color-brand-solid: root=si theme=si
--color-brand-solid-hover: root=si theme=si
--color-brand-solid-text: root=si theme=si
--color-text-accent: root=si theme=si
--color-focus-ring: root=si theme=si
--color-focus-ring-inverse: root=si theme=si
--color-whatsapp (:root) = #25D366
tokens=13 faltantes=0
```
<!-- evidencia:fin apply-evidence.4 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"archivo","argv":null,"texto":"# Ratios WCAG 2.x de los pares de la tabla de contratos de design.md, resueltos desde tokens.css\npython3 - src/styles/tokens.css <<'PY'\nimport re, sys\nsrc = open(sys.argv[1]).read()\nroot = re.sub(r'/\\*.*?\\*/', '', src.split('\\n@theme {')[0], flags=re.S)\ndecl = dict(re.findall(r'(--[\\w-]+)\\s*:\\s*([^;]+);', root))\ndef res(n, d=0):\n    v = decl[n].strip()\n    m = re.fullmatch(r'var\\((--[\\w-]+)\\)', v)\n    return res(m.group(1), d+1) if m else v\ndef lum(h):\n    h = h.lstrip('#')\n    if len(h) == 3: h = ''.join(c*2 for c in h)\n    c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]\n    c = [x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4 for x in c]\n    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]\ndef ratio(a, b):\n    la, lb = sorted([lum(a), lum(b)], reverse=True)\n    return (la+0.05)/(lb+0.05)\ndef val(x): return x if x.startswith('#') else res(x)\npairs = [\n ('--color-cta-text','--color-cta',4.5),\n ('--color-cta-hover-text','--color-cta-hover',5.0),\n ('--color-whatsapp-text','--color-whatsapp',4.5),\n ('--color-whatsapp-text','--color-whatsapp-hover',4.5),\n ('--color-brand-solid-text','--color-brand-solid',4.5),\n ('--color-brand-solid-text','--color-brand-solid-hover',4.5),\n ('--color-text-accent','#ffffff',4.5),\n ('--color-text-accent','--color-neutral-50',4.5),\n ('--color-text-accent','--color-neutral-100',4.5),\n ('--color-text-accent','--color-accent-300',4.5),\n ('--color-focus-ring','#ffffff',3.0),\n ('--color-focus-ring','--color-neutral-50',3.0),\n ('--color-focus-ring','--color-neutral-100',3.0),\n ('--color-focus-ring','--color-primary-50',3.0),\n ('--color-focus-ring-inverse','--color-primary-950',3.0),\n ('--color-focus-ring-inverse','--color-primary-900',3.0),\n ('--color-focus-ring-inverse','--color-primary-800',3.0),\n ('--color-focus-ring-inverse','--color-primary-700',3.0),\n ('--color-focus-ring-inverse','--color-neutral-950',3.0),\n ('--color-focus-ring','--color-neutral-200',3.0),\n ('--color-brand-dark','--color-neutral-100',4.5),\n ('--color-brand-dark','--color-primary-50',4.5),\n ('--color-text-inverse','--color-primary-900',4.5),\n ('--color-text-muted','#ffffff',4.5),\n ('--color-brand','--color-neutral-50',3.0),\n ('--color-primary-200','--color-primary-900',4.5),\n ('--color-primary-100','--color-primary-800',4.5),\n ('--color-neutral-900','--color-neutral-50',4.5),\n]\nfails = 0\nfor fg, bg, th in pairs:\n    r = ratio(val(fg), val(bg)); ok = r \u003e= th; fails += not ok\n    print(f\"{fg} ({val(fg)}) / {bg} ({val(bg)}): {r:.2f} umbral {th} {'OK' if ok else 'FALLA'}\")\nprint(f\"pares={len(pairs)} fallas={fails}\")\nsys.exit(1 if fails else 0)\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:12:10-03:00","exit":0,"sha256":"4f423eaa2de6cde5dce9908844d5813d7257d453044cd4db08bdbaaaccbee4d4","lineas":29,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.5`** · exit 0 · 29 líneas, 0 omitidas · HEAD `461144149251` · 2026-10-05T00:12:10-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Ratios WCAG 2.x de los pares de la tabla de contratos de design.md, resueltos desde tokens.css
python3 - src/styles/tokens.css <<'PY'
import re, sys
src = open(sys.argv[1]).read()
root = re.sub(r'/\*.*?\*/', '', src.split('\n@theme {')[0], flags=re.S)
decl = dict(re.findall(r'(--[\w-]+)\s*:\s*([^;]+);', root))
def res(n, d=0):
    v = decl[n].strip()
    m = re.fullmatch(r'var\((--[\w-]+)\)', v)
    return res(m.group(1), d+1) if m else v
def lum(h):
    h = h.lstrip('#')
    if len(h) == 3: h = ''.join(c*2 for c in h)
    c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    c = [x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]
def ratio(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True)
    return (la+0.05)/(lb+0.05)
def val(x): return x if x.startswith('#') else res(x)
pairs = [
 ('--color-cta-text','--color-cta',4.5),
 ('--color-cta-hover-text','--color-cta-hover',5.0),
 ('--color-whatsapp-text','--color-whatsapp',4.5),
 ('--color-whatsapp-text','--color-whatsapp-hover',4.5),
 ('--color-brand-solid-text','--color-brand-solid',4.5),
 ('--color-brand-solid-text','--color-brand-solid-hover',4.5),
 ('--color-text-accent','#ffffff',4.5),
 ('--color-text-accent','--color-neutral-50',4.5),
 ('--color-text-accent','--color-neutral-100',4.5),
 ('--color-text-accent','--color-accent-300',4.5),
 ('--color-focus-ring','#ffffff',3.0),
 ('--color-focus-ring','--color-neutral-50',3.0),
 ('--color-focus-ring','--color-neutral-100',3.0),
 ('--color-focus-ring','--color-primary-50',3.0),
 ('--color-focus-ring-inverse','--color-primary-950',3.0),
 ('--color-focus-ring-inverse','--color-primary-900',3.0),
 ('--color-focus-ring-inverse','--color-primary-800',3.0),
 ('--color-focus-ring-inverse','--color-primary-700',3.0),
 ('--color-focus-ring-inverse','--color-neutral-950',3.0),
 ('--color-focus-ring','--color-neutral-200',3.0),
 ('--color-brand-dark','--color-neutral-100',4.5),
 ('--color-brand-dark','--color-primary-50',4.5),
 ('--color-text-inverse','--color-primary-900',4.5),
 ('--color-text-muted','#ffffff',4.5),
 ('--color-brand','--color-neutral-50',3.0),
 ('--color-primary-200','--color-primary-900',4.5),
 ('--color-primary-100','--color-primary-800',4.5),
 ('--color-neutral-900','--color-neutral-50',4.5),
]
fails = 0
for fg, bg, th in pairs:
    r = ratio(val(fg), val(bg)); ok = r >= th; fails += not ok
    print(f"{fg} ({val(fg)}) / {bg} ({val(bg)}): {r:.2f} umbral {th} {'OK' if ok else 'FALLA'}")
print(f"pares={len(pairs)} fallas={fails}")
sys.exit(1 if fails else 0)
PY
```

```text
--color-cta-text (#112236) / --color-cta (#3EB978): 6.44 umbral 4.5 OK
--color-cta-hover-text (#0a1624) / --color-cta-hover (#339965): 5.10 umbral 5.0 OK
--color-whatsapp-text (#111b21) / --color-whatsapp (#25D366): 8.80 umbral 4.5 OK
--color-whatsapp-text (#111b21) / --color-whatsapp-hover (#1da851): 5.63 umbral 4.5 OK
--color-brand-solid-text (#ffffff) / --color-brand-solid (#3b6497): 6.08 umbral 4.5 OK
--color-brand-solid-text (#ffffff) / --color-brand-solid-hover (#2b4e78): 8.52 umbral 4.5 OK
--color-text-accent (#22663f) / #ffffff (#ffffff): 6.91 umbral 4.5 OK
--color-text-accent (#22663f) / --color-neutral-50 (#f8f7f6): 6.46 umbral 4.5 OK
--color-text-accent (#22663f) / --color-neutral-100 (#efedeb): 5.91 umbral 4.5 OK
--color-text-accent (#22663f) / --color-accent-300 (#d8f1e6): 5.80 umbral 4.5 OK
--color-focus-ring (#3b6497) / #ffffff (#ffffff): 6.08 umbral 3.0 OK
--color-focus-ring (#3b6497) / --color-neutral-50 (#f8f7f6): 5.68 umbral 3.0 OK
--color-focus-ring (#3b6497) / --color-neutral-100 (#efedeb): 5.20 umbral 3.0 OK
--color-focus-ring (#3b6497) / --color-primary-50 (#eef4fb): 5.49 umbral 3.0 OK
--color-focus-ring-inverse (#87d3b0) / --color-primary-950 (#0a1624): 10.38 umbral 3.0 OK
--color-focus-ring-inverse (#87d3b0) / --color-primary-900 (#112236): 9.17 umbral 3.0 OK
--color-focus-ring-inverse (#87d3b0) / --color-primary-800 (#1c3554): 7.10 umbral 3.0 OK
--color-focus-ring-inverse (#87d3b0) / --color-primary-700 (#2b4e78): 4.86 umbral 3.0 OK
--color-focus-ring-inverse (#87d3b0) / --color-neutral-950 (#131210): 10.68 umbral 3.0 OK
--color-focus-ring (#3b6497) / --color-neutral-200 (#e1dedb): 4.54 umbral 3.0 OK
--color-brand-dark (#2b4e78) / --color-neutral-100 (#efedeb): 7.30 umbral 4.5 OK
--color-brand-dark (#2b4e78) / --color-primary-50 (#eef4fb): 7.70 umbral 4.5 OK
--color-text-inverse (#ffffff) / --color-primary-900 (#112236): 16.08 umbral 4.5 OK
--color-text-muted (#6e6963) / #ffffff (#ffffff): 5.44 umbral 4.5 OK
--color-brand (#4A7BB5) / --color-neutral-50 (#f8f7f6): 4.10 umbral 3.0 OK
--color-primary-200 (#aec7e5) / --color-primary-900 (#112236): 9.27 umbral 4.5 OK
--color-primary-100 (#d7e4f4) / --color-primary-800 (#1c3554): 9.66 umbral 4.5 OK
--color-neutral-900 (#211f1c) / --color-neutral-50 (#f8f7f6): 15.36 umbral 4.5 OK
pares=28 fallas=0
```
<!-- evidencia:fin apply-evidence.5 -->

Lectura de los bloques de la Tarea 26: `apply-evidence.2` es el build (exit 0); `apply-evidence.3`
cuenta las líneas agregadas en `src/` con hex fuera de las dos excepciones, las apariciones de
`--color-brand-hover` y los `outline: none|0` restantes; `apply-evidence.4` comprueba que cada token
nuevo está en `:root` y en `@theme` y que `--color-whatsapp` vale `#25D366`; `apply-evidence.5`
calcula los ratios de los pares de la tabla de contratos de `design.md` contra su umbral.

## Tarea 27 — axe-core `color-contrast` en Chrome real

Commit: ninguno (verificación). Entorno: `astro preview --port 4391` sobre el build de
`apply-evidence.2`; Chrome 148 del checkout principal (solo lectura); `puppeteer-core` y
`axe-core` instalados en el directorio de temporales de la fase. 21 URL (7 rutas × es/en/pt,
incluida la 404 `/xx-nope/`) × desktop 1440×900 y móvil 390×844 × `prefers-reduced-motion`
`no-preference` y `reduce`, con scroll completo antes de auditar.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"archivo","argv":null,"texto":"# Barrido axe color-contrast (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node axe-sweep.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:19:11-03:00","exit":0,"sha256":"9aa52eb2dd8685dcc6f4eff457451b04bdeec24f593365da56a6ca92aef51a7e","lineas":85,"omitidas":45,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.6`** · exit 0 · 85 líneas, 45 omitidas · HEAD `461144149251` · 2026-10-05T00:19:11-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Barrido axe color-contrast (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node axe-sweep.mjs
```

```text
no-preference desktop /                violations=0 incomplete=111
no-preference desktop /servicios/      violations=0 incomplete=86
no-preference desktop /industrias/     violations=0 incomplete=69
no-preference desktop /nosotros/       violations=0 incomplete=37
no-preference desktop /contacto/       violations=0 incomplete=15
no-preference desktop /cotizar/        violations=0 incomplete=12
no-preference desktop /xx-nope/        violations=0 incomplete=0
no-preference desktop /en/             violations=0 incomplete=111
no-preference desktop /en/servicios/   violations=0 incomplete=86
no-preference desktop /en/industrias/  violations=0 incomplete=69
no-preference desktop /en/nosotros/    violations=0 incomplete=37
no-preference desktop /en/contacto/    violations=0 incomplete=15
no-preference desktop /en/cotizar/     violations=0 incomplete=12
no-preference desktop /en/xx-nope/     violations=0 incomplete=0
no-preference desktop /pt/             violations=0 incomplete=111
no-preference desktop /pt/servicios/   violations=0 incomplete=86
no-preference desktop /pt/industrias/  violations=0 incomplete=69
no-preference desktop /pt/nosotros/    violations=0 incomplete=37
no-preference desktop /pt/contacto/    violations=0 incomplete=15
no-preference desktop /pt/cotizar/     violations=0 incomplete=12
no-preference desktop /pt/xx-nope/     violations=0 incomplete=0
no-preference movil   /                violations=0 incomplete=106
no-preference movil   /servicios/      violations=0 incomplete=82
no-preference movil   /industrias/     violations=0 incomplete=70
no-preference movil   /nosotros/       violations=0 incomplete=39
no-preference movil   /contacto/       violations=0 incomplete=15
no-preference movil   /cotizar/        violations=0 incomplete=12
no-preference movil   /xx-nope/        violations=0 incomplete=0
no-preference movil   /en/             violations=0 incomplete=106
no-preference movil   /en/servicios/   violations=0 incomplete=82
no-preference movil   /en/industrias/  violations=0 incomplete=70
no-preference movil   /en/nosotros/    violations=0 incomplete=39
no-preference movil   /en/contacto/    violations=0 incomplete=15
no-preference movil   /en/cotizar/     violations=0 incomplete=12
no-preference movil   /en/xx-nope/     violations=0 incomplete=0
no-preference movil   /pt/             violations=0 incomplete=106
no-preference movil   /pt/servicios/   violations=0 incomplete=82
no-preference movil   /pt/industrias/  violations=0 incomplete=70
no-preference movil   /pt/nosotros/    violations=0 incomplete=39
no-preference movil   /pt/contacto/    violations=0 incomplete=15
```
<!-- evidencia:fin apply-evidence.6 -->

`apply-evidence.6` muestra las primeras 40 de las 84 corridas, todas con `violations=0`; el
script sale con código 1 ante cualquier violación, por lo que el exit 0 cubre también las 44
corridas omitidas (el resto de móvil y toda la pasada con `prefers-reduced-motion: reduce`).
Los `incomplete` son nodos cuyo fondo axe no resuelve (foto, degradado, vidrio); la Tarea 28 los
cubre con muestreo de píxeles en los puntos que nombran las specs.

## Tarea 28 — Estados interactivos, foco, píxeles y correo

Commit: ninguno (verificación). Mismo entorno que la Tarea 27; los scripts viven en el
directorio de temporales y comparten `lib.mjs` (helpers de axe por elemento, captura y ratio).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"archivo","argv":null,"texto":"# Verificación interactiva: states.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node states.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:26:38-03:00","exit":0,"sha256":"0418cb17bae37c334e2a012c1c1504f832317e45d807ec3552819bb566bc7d78","lineas":44,"omitidas":4,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.7`** · exit 0 · 44 líneas, 4 omitidas · HEAD `461144149251` · 2026-10-05T00:26:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: states.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node states.mjs
```

```text
chequeos=785 violaciones=0
cta-final__status success color=rgb(135, 211, 176) violaciones=0 incomplete=1
cta-final__status error color=rgb(252, 165, 165) violaciones=0 incomplete=1
cotizar /pt/ exito violaciones=0
cotizar /pt/ paso-3 violaciones=0
cotizar /pt/ paso-2 violaciones=0
cotizar /pt/ paso-1 violaciones=0
cotizar /pt/ paso-0 violaciones=0
cotizar /en/ exito violaciones=0
cotizar /en/ paso-3 violaciones=0
cotizar /en/ paso-2 violaciones=0
cotizar /en/ paso-1 violaciones=0
cotizar /en/ paso-0 violaciones=0
cotizar / exito violaciones=0
cotizar / paso-3 violaciones=0
cotizar / paso-2 violaciones=0
cotizar / paso-1 violaciones=0
cotizar / paso-0 violaciones=0
reduce        movil   drawer-abierto chequeos=22 violaciones=0
reduce        desktop /xx-nope/    chequeos=18 violaciones=0
reduce        desktop /cotizar/    chequeos=30 violaciones=0
reduce        desktop /contacto/   chequeos=42 violaciones=0
reduce        desktop /nosotros/   chequeos=40 violaciones=0
reduce        desktop /industrias/ chequeos=88 violaciones=0
reduce        desktop /servicios/  chequeos=66 violaciones=0
reduce        desktop /            chequeos=78 violaciones=0
no-preference movil   drawer-abierto chequeos=22 violaciones=0
no-preference desktop /xx-nope/    chequeos=18 violaciones=0
no-preference desktop /cotizar/    chequeos=30 violaciones=0
no-preference desktop /contacto/   chequeos=42 violaciones=0
no-preference desktop /nosotros/   chequeos=40 violaciones=0
no-preference desktop /industrias/ chequeos=88 violaciones=0
no-preference desktop /servicios/  chequeos=66 violaciones=0
no-preference desktop /            chequeos=78 violaciones=0
SKIP no-preference desktop / Node is either not clickable or not an Element
SKIP no-preference desktop /servicios/ Node is either not clickable or not an Element
SKIP no-preference desktop /industrias/ Node is either not clickable or not an Element
SKIP no-preference desktop /nosotros/ Node is either not clickable or not an Element
SKIP no-preference desktop /contacto/ Node is either not clickable or not an Element
SKIP reduce desktop / Node is either not clickable or not an Element
```
<!-- evidencia:fin apply-evidence.7 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"archivo","argv":null,"texto":"# Verificación interactiva: ring.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:26:50-03:00","exit":1,"sha256":"67521ca97450eb4049bb0a4b00f95a1dd67c9434848db2cdfd714e1f115facc8","lineas":17,"omitidas":0,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.8`** · exit 1 · 17 líneas, 0 omitidas · HEAD `461144149251` · 2026-10-05T00:26:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: ring.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node ring.mjs
```

```text
file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/common/CallbackRegistry.js:108
    #error = new ProtocolError();
             ^

ProtocolError: Protocol error (Page.captureScreenshot): Cannot take screenshot with 0 height.
    at <instance_members_initializer> (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/common/CallbackRegistry.js:108:14)
    at new Callback (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/common/CallbackRegistry.js:112:16)
    at CallbackRegistry.create (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/common/CallbackRegistry.js:27:26)
    at Connection._rawSend (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/cdp/Connection.js:125:26)
    at CdpCDPSession.send (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/cdp/CdpSession.js:72:14)
    at CdpPage._screenshot (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/cdp/Page.js:881:62)
    at async CdpPage.screenshot (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/api/Page.js:1169:30)
    at async CdpPage.<anonymous> (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/node_modules/puppeteer-core/lib/puppeteer/util/decorators.js:164:24)
    at async grab (file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/lib.mjs:45:15)
    at async file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg/ring.mjs:41:15

Node.js v24.15.0
```
<!-- evidencia:fin apply-evidence.8 -->

`apply-evidence.8` es una corrida fallida del script de anillo (la captura de un recorte de alto 0 abortó el proceso, no es un resultado de contraste); el script se corrigió para redondear el recorte y omitir los focos fuera del viewport, y `apply-evidence.9` es la corrida válida.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"archivo","argv":null,"texto":"# Verificación interactiva: ring.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:28:14-03:00","exit":1,"sha256":"9a7848960cd112de764752f686a1e0f547781236be670457f86724e4ecfc0481","lineas":143,"omitidas":103,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.9`** · exit 1 · 143 líneas, 103 omitidas · HEAD `461144149251` · 2026-10-05T00:28:14-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: ring.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node ring.mjs
```

```text
enfocables=221 con_anillo=221 fallas_ratio_o_sin_anillo=9 no_pintados=14 omitidos=111
desktop      /            enfocables=43 con_anillo=43 min_ratio=5.69 min_claro=5.69 min_inverso=6.60
desktop      /servicios/  enfocables=37 con_anillo=37 min_ratio=5.67 min_claro=5.67 min_inverso=6.43
desktop      /industrias/ enfocables=48 con_anillo=48 min_ratio=1.49 min_claro=5.69 min_inverso=1.49
desktop      /nosotros/   enfocables=24 con_anillo=24 min_ratio=5.69 min_claro=5.69 min_inverso=6.79
desktop      /contacto/   enfocables=26 con_anillo=26 min_ratio=1.49 min_claro=1.49 min_inverso=6.43
desktop      /cotizar/    enfocables=18 con_anillo=18 min_ratio=1.05 min_claro=5.69 min_inverso=1.05
desktop      /xx-nope/    enfocables=14 con_anillo=14 min_ratio=5.67 min_claro=5.67 min_inverso=10.67
movil-drawer /            enfocables=11 con_anillo=11 min_ratio=5.48 min_claro=5.48 min_inverso=-
FALLA desktop /industrias/ button.ind-directory__item.is-active anillo no pintado (recortado o cubierto)
FALLA desktop /industrias/ button.ind-directory__item.is-active anillo rgb(135, 211, 176) ratio 1.49 fondo rgb(235,237,238)
FALLA desktop /industrias/ button.ind-directory__item.is-active anillo no pintado (recortado o cubierto)
FALLA desktop /industrias/ button.ind-directory__item.is-active anillo no pintado (recortado o cubierto)
FALLA desktop /industrias/ button.ind-directory__item.is-active anillo no pintado (recortado o cubierto)
FALLA desktop /industrias/ button.ind-directory__item.is-active anillo no pintado (recortado o cubierto)
FALLA desktop /industrias/ button.ind-directory__item.is-active anillo no pintado (recortado o cubierto)
FALLA desktop /industrias/ button.ind-directory__item.is-active anillo no pintado (recortado o cubierto)
FALLA desktop /contacto/ input#cn anillo no pintado (recortado o cubierto)
FALLA desktop /contacto/ input#ce anillo no pintado (recortado o cubierto)
FALLA desktop /contacto/ input#cm anillo rgb(59, 100, 151) ratio 1.49 fondo rgb(42,74,113)
FALLA desktop /contacto/ input#cp anillo rgb(59, 100, 151) ratio 1.99 fondo rgb(29,55,86)
FALLA desktop /contacto/ select#cs anillo rgb(59, 100, 151) ratio 1.61 fondo rgb(39,69,106)
FALLA desktop /contacto/ input#co anillo rgb(59, 100, 151) ratio 1.87 fondo rgb(32,59,92)
FALLA desktop /contacto/ textarea#cmsg anillo no pintado (recortado o cubierto)
FALLA desktop /contacto/ button#contact-submit.form-submit anillo no pintado (recortado o cubierto)
FALLA desktop /contacto/ a.channel.channel--wa anillo no pintado (recortado o cubierto)
FALLA desktop /contacto/ a.channel.channel--wa anillo rgb(59, 100, 151) ratio 1.99 fondo rgb(28,56,81)
FALLA desktop /contacto/ a.channel anillo no pintado (recortado o cubierto)
FALLA desktop /contacto/ a.channel anillo rgb(59, 100, 151) ratio 1.92 fondo rgb(29,58,86)
FALLA desktop /contacto/ a.channel anillo no pintado (recortado o cubierto)
FALLA desktop /cotizar/ a anillo rgb(135, 211, 176) ratio 1.05 fondo rgb(195,201,208)
FALLA desktop /cotizar/ a.footer__contact-address anillo rgb(135, 211, 176) ratio 1.07 fondo rgb(197,203,210)
OMITIDO desktop / a.svc-card.svc-card--std captura fallida
OMITIDO desktop / a.svc-card.svc-card--std captura fallida
OMITIDO desktop / a.svc-card.svc-card--std captura fallida
OMITIDO desktop / a.svc-card.svc-card--wide captura fallida
OMITIDO desktop / a.btn.btn--brand captura fallida
OMITIDO desktop / button#why-video-toggle.why__video-toggle captura fallida
OMITIDO desktop / a.ind-card.ind-card--photo captura fallida
OMITIDO desktop / a.ind-card.ind-card--photo captura fallida
```
<!-- evidencia:fin apply-evidence.9 -->

`apply-evidence.9` tampoco es válido: la captura recibía coordenadas de viewport y `page.screenshot` las interpreta como coordenadas de documento, de modo que tras el scroll el píxel muestreado era de otra zona de la página (p. ej. el hero oscuro detrás de los campos de `/contacto/`). Se corrigió `grab` sumando `scrollX/scrollY` y se verificó con una autoprueba (el píxel de `.form-submit`, `.channel--wa` y `.footer` coincide con su `background-color`). `apply-evidence.10` es la corrida válida del anillo de foco.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"archivo","argv":null,"texto":"# Verificación interactiva: ring.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:29:53-03:00","exit":0,"sha256":"d369a4045968b9c221cba67952fb23b0dfa0eb14d52df8b8162046b100be558a","lineas":9,"omitidas":0,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.10`** · exit 0 · 9 líneas, 0 omitidas · HEAD `461144149251` · 2026-10-05T00:29:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: ring.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node ring.mjs
```

```text
enfocables=221 con_anillo=221 fallas_ratio_o_sin_anillo=0 no_pintados=0 omitidos=0
desktop      /            enfocables=43 con_anillo=43 min_ratio=5.67 min_claro=5.67 min_inverso=6.60
desktop      /servicios/  enfocables=37 con_anillo=37 min_ratio=5.67 min_claro=5.67 min_inverso=6.43
desktop      /industrias/ enfocables=48 con_anillo=48 min_ratio=5.69 min_claro=5.69 min_inverso=6.43
desktop      /nosotros/   enfocables=24 con_anillo=24 min_ratio=5.69 min_claro=5.69 min_inverso=6.79
desktop      /contacto/   enfocables=26 con_anillo=26 min_ratio=5.67 min_claro=5.67 min_inverso=6.43
desktop      /cotizar/    enfocables=18 con_anillo=18 min_ratio=4.92 min_claro=5.69 min_inverso=4.92
desktop      /xx-nope/    enfocables=14 con_anillo=14 min_ratio=5.67 min_claro=5.67 min_inverso=10.67
movil-drawer /            enfocables=11 con_anillo=11 min_ratio=5.48 min_claro=5.48 min_inverso=-
```
<!-- evidencia:fin apply-evidence.10 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"archivo","argv":null,"texto":"# Verificación interactiva: pixels.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:32:22-03:00","exit":1,"sha256":"ed58e8f9113a0693a4cffcbebe9526a44613d9b4a437228ac0d48b4bf5e1fea5","lineas":89,"omitidas":49,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.11`** · exit 1 · 89 líneas, 49 omitidas · HEAD `461144149251` · 2026-10-05T00:32:22-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: pixels.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node pixels.mjs
```

```text
chequeos=88 fallas=16
FALLA 1440px industrias slide 1 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 2 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 3 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 4 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 5 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 6 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 7 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 8 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 9 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 10 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 11 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 1440px industrias slide 12 .ind-directory__counter min=1.08 p5=1.08 mediana=1.11 umbral=4.5
FALLA 390px industrias slide 4 #dir-name min=3.79 p5=4.37 mediana=6.33 umbral=4.5
FALLA 390px industrias slide 5 #dir-name min=3.48 p5=4.28 mediana=9.42 umbral=4.5
FALLA 390px industrias slide 8 #dir-name min=2.48 p5=2.77 mediana=12.48 umbral=4.5
FALLA 390px industrias slide 12 #dir-name min=2.80 p5=3.44 mediana=13.06 umbral=4.5
OK    1440px industrias slide 1 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 2 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 3 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 4 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 5 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 6 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 7 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 8 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 9 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 10 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 11 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    1440px industrias slide 12 #dir-name min=6.57 p5=7.35 mediana=14.31 umbral=4.5
OK    390px industrias slide 1 #dir-name min=6.83 p5=10.36 mediana=15.56 umbral=4.5
OK    390px industrias slide 1 .ind-directory__counter min=1.57 p5=7.87 mediana=9.06 umbral=4.5
OK    390px industrias slide 2 #dir-name min=4.23 p5=5.90 mediana=11.12 umbral=4.5
OK    390px industrias slide 2 .ind-directory__counter min=1.39 p5=8.05 mediana=11.73 umbral=4.5
OK    390px industrias slide 3 #dir-name min=6.27 p5=7.13 mediana=9.10 umbral=4.5
OK    390px industrias slide 3 .ind-directory__counter min=1.68 p5=7.66 mediana=9.75 umbral=4.5
OK    390px industrias slide 4 .ind-directory__counter min=1.38 p5=10.62 mediana=13.38 umbral=4.5
OK    390px industrias slide 5 .ind-directory__counter min=2.84 p5=9.38 mediana=13.05 umbral=4.5
OK    390px industrias slide 6 #dir-name min=3.88 p5=7.97 mediana=15.79 umbral=4.5
OK    390px industrias slide 6 .ind-directory__counter min=1.90 p5=8.13 mediana=8.53 umbral=4.5
OK    390px industrias slide 7 #dir-name min=4.26 p5=7.06 mediana=13.43 umbral=4.5
```
<!-- evidencia:fin apply-evidence.11 -->

`apply-evidence.11` tiene dos defectos de la herramienta, no del sitio: (a) en 1440px, al centrar `#dir-name` tras el click, el listado se desplazaba bajo el cursor y su `mouseenter` volvía a activar la diapositiva 10 (un diagnóstico confirmó `is-active` en el índice 9 tras los clicks 1, 4 y 8), y el contador quedaba fuera del viewport (`y=-196`), de modo que se muestreó el navbar; (b) la muestra usaba la caja del elemento completo, incluida el área a la derecha del texto. Se corrigió: el cursor sale del listado tras el click, el script falla si la diapositiva activa no es la pedida, cada elemento se centra antes de capturarlo y se muestrean solo sus cajas de línea (`Range.getClientRects`). `apply-evidence.12` es la corrida válida.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"archivo","argv":null,"texto":"# Verificación interactiva: pixels.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"4611441492513728e3af9f192afcb068354366e6","fecha":"2026-10-05T00:36:20-03:00","exit":1,"sha256":"6047751047846dcf0acd2931190a1f73aba63c8a44c590ab1fa638695ff9b04b","lineas":89,"omitidas":49,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.12`** · exit 1 · 89 líneas, 49 omitidas · HEAD `461144149251` · 2026-10-05T00:36:20-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: pixels.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node pixels.mjs
```

```text
chequeos=88 fallas=3
FALLA 390px industrias slide 4 #dir-name min=3.79 p5=4.21 mediana=5.55 umbral=4.5
FALLA 390px industrias slide 8 #dir-name min=2.42 p5=2.73 mediana=14.25 umbral=4.5
FALLA 390px industrias slide 10 #dir-name min=3.26 p5=4.43 mediana=9.86 umbral=4.5
OK    1440px industrias slide 1 #dir-name min=11.16 p5=12.49 mediana=14.77 umbral=4.5
OK    1440px industrias slide 1 .ind-directory__counter min=3.43 p5=10.16 mediana=10.36 umbral=4.5
OK    1440px industrias slide 2 #dir-name min=7.15 p5=7.34 mediana=8.19 umbral=4.5
OK    1440px industrias slide 2 .ind-directory__counter min=4.17 p5=7.82 mediana=7.92 umbral=4.5
OK    1440px industrias slide 3 #dir-name min=9.95 p5=10.89 mediana=14.07 umbral=4.5
OK    1440px industrias slide 3 .ind-directory__counter min=1.55 p5=7.20 mediana=9.37 umbral=4.5
OK    1440px industrias slide 4 #dir-name min=6.82 p5=8.99 mediana=12.21 umbral=4.5
OK    1440px industrias slide 4 .ind-directory__counter min=4.76 p5=7.78 mediana=9.80 umbral=4.5
OK    1440px industrias slide 5 #dir-name min=7.74 p5=10.15 mediana=14.71 umbral=4.5
OK    1440px industrias slide 5 .ind-directory__counter min=8.63 p5=9.65 mediana=15.46 umbral=4.5
OK    1440px industrias slide 6 #dir-name min=8.27 p5=11.83 mediana=13.86 umbral=4.5
OK    1440px industrias slide 6 .ind-directory__counter min=2.24 p5=8.37 mediana=8.55 umbral=4.5
OK    1440px industrias slide 7 #dir-name min=6.96 p5=9.95 mediana=15.19 umbral=4.5
OK    1440px industrias slide 7 .ind-directory__counter min=1.96 p5=7.48 mediana=8.26 umbral=4.5
OK    1440px industrias slide 8 #dir-name min=6.37 p5=7.52 mediana=10.52 umbral=4.5
OK    1440px industrias slide 8 .ind-directory__counter min=15.28 p5=17.83 mediana=18.29 umbral=4.5
OK    1440px industrias slide 9 #dir-name min=7.70 p5=10.10 mediana=11.53 umbral=4.5
OK    1440px industrias slide 9 .ind-directory__counter min=2.24 p5=8.83 mediana=9.12 umbral=4.5
OK    1440px industrias slide 10 #dir-name min=8.42 p5=12.70 mediana=14.65 umbral=4.5
OK    1440px industrias slide 10 .ind-directory__counter min=2.06 p5=8.52 mediana=8.65 umbral=4.5
OK    1440px industrias slide 11 #dir-name min=6.83 p5=9.90 mediana=11.20 umbral=4.5
OK    1440px industrias slide 11 .ind-directory__counter min=10.85 p5=12.35 mediana=18.69 umbral=4.5
OK    1440px industrias slide 12 #dir-name min=8.26 p5=12.15 mediana=16.63 umbral=4.5
OK    1440px industrias slide 12 .ind-directory__counter min=5.07 p5=12.80 mediana=15.47 umbral=4.5
OK    390px industrias slide 1 #dir-name min=7.50 p5=9.17 mediana=14.63 umbral=4.5
OK    390px industrias slide 1 .ind-directory__counter min=3.14 p5=9.45 mediana=9.65 umbral=4.5
OK    390px industrias slide 2 #dir-name min=5.94 p5=6.49 mediana=7.46 umbral=4.5
OK    390px industrias slide 2 .ind-directory__counter min=1.74 p5=8.47 mediana=12.42 umbral=4.5
OK    390px industrias slide 3 #dir-name min=4.64 p5=6.82 mediana=8.44 umbral=4.5
OK    390px industrias slide 3 .ind-directory__counter min=2.67 p5=9.58 mediana=10.50 umbral=4.5
OK    390px industrias slide 4 .ind-directory__counter min=6.17 p5=12.17 mediana=13.58 umbral=4.5
OK    390px industrias slide 5 #dir-name min=3.27 p5=4.63 mediana=8.83 umbral=4.5
OK    390px industrias slide 5 .ind-directory__counter min=9.16 p5=9.38 mediana=13.13 umbral=4.5
OK    390px industrias slide 6 #dir-name min=3.88 p5=7.70 mediana=14.60 umbral=4.5
OK    390px industrias slide 6 .ind-directory__counter min=2.09 p5=8.47 mediana=8.60 umbral=4.5
OK    390px industrias slide 7 #dir-name min=4.06 p5=7.01 mediana=13.70 umbral=4.5
```
<!-- evidencia:fin apply-evidence.12 -->

Hallazgo de `apply-evidence.12` (defecto real del sitio, no de la herramienta): en 390px el
nombre de industria de las diapositivas 4, 8 y 10 queda bajo 4.5:1 (p5 4.21, 2.73 y 4.43). Un
diagnóstico de posición mostró que en visores ≤ 960px (alto fijo de 420px) el nombre ocupa el
tramo 55–74 % de la altura, donde el degradado del overlay solo oscurece entre 38 % y 49 %; el
supuesto de `design.md` («zona inferior del overlay, 92 % oscuro») vale en desktop, no en móvil.
La spec `dark-surface-heading-legibility` exige ≥ 4.5:1 en cada diapositiva, así que se corrigió
el origen con el mismo criterio de D9 (oscurecimiento determinista detrás del texto): en
`@media (max-width: 960px)` el overlay sube su tramo oscuro (0.20 a 25 %, 0.72 a 50 %, 0.92 a
100 %); con foto blanca pura, blanco sobre 0.72 de oscurecimiento da ~7:1. Desktop no cambia.

- Commit: `3bc419b` fix(a11y): darken the industry viewer overlay on narrow screens

Como esta corrección cambia `src/` después del build de `apply-evidence.2` y del chequeo de
hex de `apply-evidence.3`, ambos quedan reemplazados por las corridas siguientes sobre el árbol
final: `apply-evidence.13` (build, corrida completa de cierre) y `apply-evidence.14` (hex,
`--color-brand-hover` y `outline: none`). Después se relanza `astro preview` y se repiten el
barrido axe (`apply-evidence.15`), los estados interactivos (`apply-evidence.16`), el anillo de
foco (`apply-evidence.17`) y el muestreo de píxeles (`apply-evidence.18`).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.13","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:37:55-03:00","exit":0,"sha256":"bd34128408629e5d91342f4692971738371d467af28431a21484e0b326a43887","lineas":143,"omitidas":103,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.13`** · exit 0 · 143 líneas, 103 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:37:55-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

00:37:49 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
00:37:49 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
00:37:50 [types] Generated 1.25s
00:37:50 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
00:37:50 [build] output: "static"
00:37:50 [build] mode: "server"
00:37:50 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/dist/
00:37:50 [build] adapter: @astrojs/cloudflare
00:37:50 [build] Collecting build info...
00:37:50 [build] ✓ Completed in 1.68s.
00:37:50 [build] Building server entrypoints...
00:37:52 [vite] ✓ built in 2.05s
00:37:54 [vite] ✓ built in 1.38s
00:37:54 [vite] ✓ built in 686ms

 prerendering static routes 
00:37:55   ├─ /contacto/index.html (+20ms) 
00:37:55   ├─ /cotizar/index.html (+11ms) 
00:37:55   ├─ /industrias/index.html (+18ms) 
00:37:55   ├─ /nosotros/index.html (+12ms) 
00:37:55   ├─ /servicios/index.html (+17ms) 
00:37:55   ├─ /en/contacto/index.html (+9ms) 
00:37:55   ├─ /pt/contacto/index.html (+9ms) 
00:37:55   ├─ /en/cotizar/index.html (+9ms) 
00:37:55   ├─ /pt/cotizar/index.html (+9ms) 
00:37:55   ├─ /en/industrias/index.html (+12ms) 
00:37:55   ├─ /pt/industrias/index.html (+11ms) 
00:37:55   ├─ /en/nosotros/index.html (+8ms) 
00:37:55   ├─ /pt/nosotros/index.html (+8ms) 
00:37:55   ├─ /en/servicios/index.html (+10ms) 
00:37:55   ├─ /pt/servicios/index.html (+11ms) 
00:37:55   ├─ /en/index.html (+11ms) 
00:37:55   ├─ /pt/index.html (+12ms) 
00:37:55   ├─ /index.html (+11ms) 
```
<!-- evidencia:fin apply-evidence.13 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.14","forma":"archivo","argv":null,"texto":"# Líneas agregadas con hex de color en src/ fuera de las dos excepciones (tokens.css, email-templates.ts)\nset -u\nbase=$(git merge-base main HEAD)\necho \"base=$base\"\nadded=$(git diff \"$base\" HEAD -U0 -- src ':(exclude)src/styles/tokens.css' ':(exclude)src/lib/email-templates.ts' | grep -E '^\\+[^+]' || true)\nhits=$(printf '%s\\n' \"$added\" | grep -E '#[0-9a-fA-F]{3,8}\\b' || true)\necho \"lineas_agregadas=$(printf '%s\\n' \"$added\" | grep -c . )\"\necho \"hex_fuera_de_excepciones=$(printf '%s\\n' \"$hits\" | grep -c . )\"\nprintf '%s\\n' \"$hits\" | grep . || true\n# --color-brand-hover retirado y sin consumidores\necho \"color-brand-hover_en_src=$(grep -rn -e '--color-brand-hover' src | wc -l)\"\n# outline: none restantes\necho \"outline_none_en_src=$(grep -rnE 'outline:\\s*(none|0)\\b' src | wc -l)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:37:59-03:00","exit":0,"sha256":"a48349eb895d823a5d5325ae8879bd05ac9de18ac720a2b057983c2d5c740d84","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.14`** · exit 0 · 5 líneas, 0 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:37:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Líneas agregadas con hex de color en src/ fuera de las dos excepciones (tokens.css, email-templates.ts)
set -u
base=$(git merge-base main HEAD)
echo "base=$base"
added=$(git diff "$base" HEAD -U0 -- src ':(exclude)src/styles/tokens.css' ':(exclude)src/lib/email-templates.ts' | grep -E '^\+[^+]' || true)
hits=$(printf '%s\n' "$added" | grep -E '#[0-9a-fA-F]{3,8}\b' || true)
echo "lineas_agregadas=$(printf '%s\n' "$added" | grep -c . )"
echo "hex_fuera_de_excepciones=$(printf '%s\n' "$hits" | grep -c . )"
printf '%s\n' "$hits" | grep . || true
# --color-brand-hover retirado y sin consumidores
echo "color-brand-hover_en_src=$(grep -rn -e '--color-brand-hover' src | wc -l)"
# outline: none restantes
echo "outline_none_en_src=$(grep -rnE 'outline:\s*(none|0)\b' src | wc -l)"
```

```text
base=587a8af23626491d5995a897c568005797df7e98
lineas_agregadas=92
hex_fuera_de_excepciones=0
color-brand-hover_en_src=0
outline_none_en_src=0
```
<!-- evidencia:fin apply-evidence.14 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.15","forma":"archivo","argv":null,"texto":"# Barrido axe color-contrast (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node axe-sweep.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:44:41-03:00","exit":0,"sha256":"4ac41669b1fbb3d2df40978deffa1ea629a33e0a6d4bc1484bf3128f779c95af","lineas":85,"omitidas":45,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.15`** · exit 0 · 85 líneas, 45 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:44:41-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Barrido axe color-contrast (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node axe-sweep.mjs
```

```text
corridas=84 violaciones_color_contrast=0 incomplete=3846
no-preference desktop /                violations=0 incomplete=111
no-preference desktop /servicios/      violations=0 incomplete=86
no-preference desktop /industrias/     violations=0 incomplete=69
no-preference desktop /nosotros/       violations=0 incomplete=37
no-preference desktop /contacto/       violations=0 incomplete=15
no-preference desktop /cotizar/        violations=0 incomplete=12
no-preference desktop /xx-nope/        violations=0 incomplete=0
no-preference desktop /en/             violations=0 incomplete=111
no-preference desktop /en/servicios/   violations=0 incomplete=86
no-preference desktop /en/industrias/  violations=0 incomplete=69
no-preference desktop /en/nosotros/    violations=0 incomplete=37
no-preference desktop /en/contacto/    violations=0 incomplete=15
no-preference desktop /en/cotizar/     violations=0 incomplete=12
no-preference desktop /en/xx-nope/     violations=0 incomplete=0
no-preference desktop /pt/             violations=0 incomplete=111
no-preference desktop /pt/servicios/   violations=0 incomplete=86
no-preference desktop /pt/industrias/  violations=0 incomplete=69
no-preference desktop /pt/nosotros/    violations=0 incomplete=37
no-preference desktop /pt/contacto/    violations=0 incomplete=15
no-preference desktop /pt/cotizar/     violations=0 incomplete=12
no-preference desktop /pt/xx-nope/     violations=0 incomplete=0
no-preference movil   /                violations=0 incomplete=106
no-preference movil   /servicios/      violations=0 incomplete=82
no-preference movil   /industrias/     violations=0 incomplete=70
no-preference movil   /nosotros/       violations=0 incomplete=39
no-preference movil   /contacto/       violations=0 incomplete=15
no-preference movil   /cotizar/        violations=0 incomplete=12
no-preference movil   /xx-nope/        violations=0 incomplete=0
no-preference movil   /en/             violations=0 incomplete=106
no-preference movil   /en/servicios/   violations=0 incomplete=82
no-preference movil   /en/industrias/  violations=0 incomplete=70
no-preference movil   /en/nosotros/    violations=0 incomplete=39
no-preference movil   /en/contacto/    violations=0 incomplete=15
no-preference movil   /en/cotizar/     violations=0 incomplete=12
no-preference movil   /en/xx-nope/     violations=0 incomplete=0
no-preference movil   /pt/             violations=0 incomplete=106
no-preference movil   /pt/servicios/   violations=0 incomplete=82
no-preference movil   /pt/industrias/  violations=0 incomplete=70
no-preference movil   /pt/nosotros/    violations=0 incomplete=39
```
<!-- evidencia:fin apply-evidence.15 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.16","forma":"archivo","argv":null,"texto":"# Verificación interactiva: states.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node states.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:48:55-03:00","exit":0,"sha256":"0418cb17bae37c334e2a012c1c1504f832317e45d807ec3552819bb566bc7d78","lineas":44,"omitidas":4,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.16`** · exit 0 · 44 líneas, 4 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:48:55-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: states.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node states.mjs
```

```text
chequeos=785 violaciones=0
cta-final__status success color=rgb(135, 211, 176) violaciones=0 incomplete=1
cta-final__status error color=rgb(252, 165, 165) violaciones=0 incomplete=1
cotizar /pt/ exito violaciones=0
cotizar /pt/ paso-3 violaciones=0
cotizar /pt/ paso-2 violaciones=0
cotizar /pt/ paso-1 violaciones=0
cotizar /pt/ paso-0 violaciones=0
cotizar /en/ exito violaciones=0
cotizar /en/ paso-3 violaciones=0
cotizar /en/ paso-2 violaciones=0
cotizar /en/ paso-1 violaciones=0
cotizar /en/ paso-0 violaciones=0
cotizar / exito violaciones=0
cotizar / paso-3 violaciones=0
cotizar / paso-2 violaciones=0
cotizar / paso-1 violaciones=0
cotizar / paso-0 violaciones=0
reduce        movil   drawer-abierto chequeos=22 violaciones=0
reduce        desktop /xx-nope/    chequeos=18 violaciones=0
reduce        desktop /cotizar/    chequeos=30 violaciones=0
reduce        desktop /contacto/   chequeos=42 violaciones=0
reduce        desktop /nosotros/   chequeos=40 violaciones=0
reduce        desktop /industrias/ chequeos=88 violaciones=0
reduce        desktop /servicios/  chequeos=66 violaciones=0
reduce        desktop /            chequeos=78 violaciones=0
no-preference movil   drawer-abierto chequeos=22 violaciones=0
no-preference desktop /xx-nope/    chequeos=18 violaciones=0
no-preference desktop /cotizar/    chequeos=30 violaciones=0
no-preference desktop /contacto/   chequeos=42 violaciones=0
no-preference desktop /nosotros/   chequeos=40 violaciones=0
no-preference desktop /industrias/ chequeos=88 violaciones=0
no-preference desktop /servicios/  chequeos=66 violaciones=0
no-preference desktop /            chequeos=78 violaciones=0
SKIP no-preference desktop / Node is either not clickable or not an Element
SKIP no-preference desktop /servicios/ Node is either not clickable or not an Element
SKIP no-preference desktop /industrias/ Node is either not clickable or not an Element
SKIP no-preference desktop /nosotros/ Node is either not clickable or not an Element
SKIP no-preference desktop /contacto/ Node is either not clickable or not an Element
SKIP reduce desktop / Node is either not clickable or not an Element
```
<!-- evidencia:fin apply-evidence.16 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.17","forma":"archivo","argv":null,"texto":"# Verificación interactiva: ring.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node ring.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:50:05-03:00","exit":0,"sha256":"d369a4045968b9c221cba67952fb23b0dfa0eb14d52df8b8162046b100be558a","lineas":9,"omitidas":0,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.17`** · exit 0 · 9 líneas, 0 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:50:05-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: ring.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node ring.mjs
```

```text
enfocables=221 con_anillo=221 fallas_ratio_o_sin_anillo=0 no_pintados=0 omitidos=0
desktop      /            enfocables=43 con_anillo=43 min_ratio=5.67 min_claro=5.67 min_inverso=6.60
desktop      /servicios/  enfocables=37 con_anillo=37 min_ratio=5.67 min_claro=5.67 min_inverso=6.43
desktop      /industrias/ enfocables=48 con_anillo=48 min_ratio=5.69 min_claro=5.69 min_inverso=6.43
desktop      /nosotros/   enfocables=24 con_anillo=24 min_ratio=5.69 min_claro=5.69 min_inverso=6.79
desktop      /contacto/   enfocables=26 con_anillo=26 min_ratio=5.67 min_claro=5.67 min_inverso=6.43
desktop      /cotizar/    enfocables=18 con_anillo=18 min_ratio=4.92 min_claro=5.69 min_inverso=4.92
desktop      /xx-nope/    enfocables=14 con_anillo=14 min_ratio=5.67 min_claro=5.67 min_inverso=10.67
movil-drawer /            enfocables=11 con_anillo=11 min_ratio=5.48 min_claro=5.48 min_inverso=-
```
<!-- evidencia:fin apply-evidence.17 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.18","forma":"archivo","argv":null,"texto":"# Verificación interactiva: pixels.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node pixels.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:52:41-03:00","exit":0,"sha256":"caceda08dc6f255bfe1e4d641bb7316f187b124944b111d3b9b188096030aafb","lineas":89,"omitidas":49,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.18`** · exit 0 · 89 líneas, 49 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:52:41-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación interactiva: pixels.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-r3shanup/tools.SMCSKVMg && CHROME=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome node pixels.mjs
```

```text
chequeos=88 fallas=0
OK    1440px industrias slide 1 #dir-name min=11.16 p5=12.49 mediana=14.77 umbral=4.5
OK    1440px industrias slide 1 .ind-directory__counter min=3.43 p5=10.16 mediana=10.36 umbral=4.5
OK    1440px industrias slide 2 #dir-name min=7.15 p5=7.34 mediana=8.19 umbral=4.5
OK    1440px industrias slide 2 .ind-directory__counter min=4.17 p5=7.82 mediana=7.92 umbral=4.5
OK    1440px industrias slide 3 #dir-name min=9.95 p5=10.89 mediana=14.07 umbral=4.5
OK    1440px industrias slide 3 .ind-directory__counter min=1.55 p5=7.20 mediana=9.37 umbral=4.5
OK    1440px industrias slide 4 #dir-name min=6.82 p5=8.99 mediana=12.21 umbral=4.5
OK    1440px industrias slide 4 .ind-directory__counter min=4.76 p5=7.78 mediana=9.80 umbral=4.5
OK    1440px industrias slide 5 #dir-name min=7.74 p5=10.15 mediana=14.71 umbral=4.5
OK    1440px industrias slide 5 .ind-directory__counter min=8.63 p5=9.65 mediana=15.46 umbral=4.5
OK    1440px industrias slide 6 #dir-name min=8.27 p5=11.83 mediana=13.86 umbral=4.5
OK    1440px industrias slide 6 .ind-directory__counter min=2.24 p5=8.37 mediana=8.55 umbral=4.5
OK    1440px industrias slide 7 #dir-name min=6.96 p5=9.95 mediana=15.19 umbral=4.5
OK    1440px industrias slide 7 .ind-directory__counter min=1.96 p5=7.48 mediana=8.26 umbral=4.5
OK    1440px industrias slide 8 #dir-name min=6.37 p5=7.52 mediana=10.52 umbral=4.5
OK    1440px industrias slide 8 .ind-directory__counter min=15.28 p5=17.83 mediana=18.29 umbral=4.5
OK    1440px industrias slide 9 #dir-name min=7.70 p5=10.10 mediana=11.53 umbral=4.5
OK    1440px industrias slide 9 .ind-directory__counter min=2.24 p5=8.83 mediana=9.12 umbral=4.5
OK    1440px industrias slide 10 #dir-name min=8.42 p5=12.70 mediana=14.65 umbral=4.5
OK    1440px industrias slide 10 .ind-directory__counter min=2.06 p5=8.52 mediana=8.65 umbral=4.5
OK    1440px industrias slide 11 #dir-name min=6.83 p5=9.90 mediana=11.20 umbral=4.5
OK    1440px industrias slide 11 .ind-directory__counter min=10.85 p5=12.35 mediana=18.69 umbral=4.5
OK    1440px industrias slide 12 #dir-name min=8.26 p5=12.15 mediana=16.63 umbral=4.5
OK    1440px industrias slide 12 .ind-directory__counter min=5.07 p5=12.80 mediana=15.47 umbral=4.5
OK    390px industrias slide 1 #dir-name min=12.32 p5=13.31 mediana=16.02 umbral=4.5
OK    390px industrias slide 1 .ind-directory__counter min=3.18 p5=9.73 mediana=9.81 umbral=4.5
OK    390px industrias slide 2 #dir-name min=11.09 p5=11.72 mediana=12.28 umbral=4.5
OK    390px industrias slide 2 .ind-directory__counter min=1.77 p5=8.58 mediana=12.62 umbral=4.5
OK    390px industrias slide 3 #dir-name min=10.06 p5=11.92 mediana=12.87 umbral=4.5
OK    390px industrias slide 3 .ind-directory__counter min=2.72 p5=9.76 mediana=10.64 umbral=4.5
OK    390px industrias slide 4 #dir-name min=8.91 p5=9.56 mediana=10.71 umbral=4.5
OK    390px industrias slide 4 .ind-directory__counter min=6.26 p5=12.20 mediana=13.69 umbral=4.5
OK    390px industrias slide 5 #dir-name min=8.43 p5=9.93 mediana=13.10 umbral=4.5
OK    390px industrias slide 5 .ind-directory__counter min=9.35 p5=9.65 mediana=13.27 umbral=4.5
OK    390px industrias slide 6 #dir-name min=9.36 p5=12.61 mediana=16.09 umbral=4.5
OK    390px industrias slide 6 .ind-directory__counter min=2.13 p5=8.58 mediana=8.74 umbral=4.5
OK    390px industrias slide 7 #dir-name min=9.38 p5=11.92 mediana=15.65 umbral=4.5
OK    390px industrias slide 7 .ind-directory__counter min=2.01 p5=9.09 mediana=13.77 umbral=4.5
OK    390px industrias slide 8 #dir-name min=7.41 p5=7.84 mediana=15.95 umbral=4.5
```
<!-- evidencia:fin apply-evidence.18 -->

Lectura de las corridas finales (árbol con `3bc419b`, todas exit 0; cada script sale con 1 ante
cualquier falla, así que el exit 0 cubre también las líneas omitidas del bloque):

- `apply-evidence.15` — axe `color-contrast`: 84 corridas, 0 violaciones (las 21 URL en desktop y móvil, con y sin movimiento reducido).
- `apply-evidence.16` — hover y presionado sobre enlaces, botones, filtros, chips, tiles y campos de las 7 rutas en desktop (ambos modos de movimiento), selector de idioma abierto, drawer móvil abierto, los 4 pasos y el estado de éxito de `/cotizar/` en es/en/pt (con tile y chips activos) y `.cta-final__status` forzado a `error` y `success`: 785 chequeos axe, 0 violaciones. Las líneas `SKIP` son un control por página que puppeteer no puede pulsar (fuera de pantalla), no un fallo de contraste.
- `apply-evidence.17` — anillo de foco por teclado: 221 elementos enfocables, todos con anillo pintado; ratio mínimo 5.48 con el anillo claro y 4.92 con el inverso (umbral 3:1).
- `apply-evidence.18` — muestreo de píxeles (percentil 5 de las cajas de línea): nombre y contador de las 12 diapositivas de `/industrias/` en 1440px y 390px, `.channel--wa` en `/contacto/` es/en/pt, migas de los heroes internos (sin opacidad), aviso y estados de `.cta-final`, botón de la sección final en reposo y hover en las 4 páginas × 3 idiomas (texto claro sobre azul) y tamaño del código 404 (≥ 96px a 390px y 1440px, `aria-hidden="true"`): 88 chequeos, 0 fallas. El mínimo absoluto del contador (p. ej. 1.55) son píxeles del borde de la caja de línea del dígito grande que sobresalen de la pastilla; el percentil 5 queda ≥ 7.20.

El bloque siguiente renderiza `buildContactoEmail` con teléfono, sin teléfono y solo con teléfono.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.19","forma":"archivo","argv":null,"texto":"# Renderiza buildContactoEmail con y sin teléfono y extrae el botón WhatsApp\nnode_modules/.bin/tsx -e '\nimport { buildContactoEmail } from \"./src/lib/email-templates.ts\";\nconst meta = { ip: \"127.0.0.1\", userAgent: \"check\", formType: \"contacto\" };\nconst base = { name: \"Ana Prueba\", email: \"ana@example.com\", service: \"Carga aérea\", message: \"Hola\" };\nfor (const [label, d] of [[\"con_telefono\", { ...base, phone: \"+56 9 1234 5678\" }], [\"sin_telefono\", base], [\"solo_telefono\", { ...base, email: \"\", phone: \"+56912345678\" }]]) {\n  const { html } = buildContactoEmail(d as any, meta);\n  const wa = [...html.matchAll(/<a href=\"(https:\\/\\/wa\\.me\\/[^\"?]+)[^\"]*\" style=\"([^\"]*)\"\u003eWhatsApp<\\/a\u003e/g)];\n  console.log(`${label}: botones_whatsapp=${wa.length}` + wa.map((m) =\u003e ` href=${m[1]} colores=${(m[2].match(/background:[^;]+;color:[^;]+;/) || [\"?\"])[0]}`).join(\"\"));\n}\n'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:53:09-03:00","exit":1,"sha256":"fb1ad49c3eb15e8c126f759c2b3b4220e6699943da41c1065cb11443dfc0f28d","lineas":30,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.19`** · exit 1 · 30 líneas, 0 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:53:09-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Renderiza buildContactoEmail con y sin teléfono y extrae el botón WhatsApp
node_modules/.bin/tsx -e '
import { buildContactoEmail } from "./src/lib/email-templates.ts";
const meta = { ip: "127.0.0.1", userAgent: "check", formType: "contacto" };
const base = { name: "Ana Prueba", email: "ana@example.com", service: "Carga aérea", message: "Hola" };
for (const [label, d] of [["con_telefono", { ...base, phone: "+56 9 1234 5678" }], ["sin_telefono", base], ["solo_telefono", { ...base, email: "", phone: "+56912345678" }]]) {
  const { html } = buildContactoEmail(d as any, meta);
  const wa = [...html.matchAll(/<a href="(https:\/\/wa\.me\/[^"?]+)[^"]*" style="([^"]*)">WhatsApp<\/a>/g)];
  console.log(`${label}: botones_whatsapp=${wa.length}` + wa.map((m) => ` href=${m[1]} colores=${(m[2].match(/background:[^;]+;color:[^;]+;/) || ["?"])[0]}`).join(""));
}
'
```

```text
/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:3
`)},"createLog"),x=I(g.bgLightYellow(g.black(" CJS "))),ae=I(g.bgBlue(" ESM ")),oe=[".cts",".mts",".ts",".tsx",".jsx"],ie=[".js",".cjs",".mjs"],k=[".ts",".tsx",".jsx"],F=o((s,e,r,n)=>{const t=Object.getOwnPropertyDescriptor(s,e);t?.set?s[e]=r:(!t||t.configurable)&&Object.defineProperty(s,e,{value:r,enumerable:t?.enumerable||n?.enumerable,writable:n?.writable??(t?t.writable:!0),configurable:n?.configurable??(t?t.configurable:!0)})},"safeSet"),ce=o((s,e,r)=>{const n=e[".js"],t=o((a,i)=>{if(s.enabled===!1)return n(a,i);const[c,f]=i.split("?");if((new URLSearchParams(f).get("namespace")??void 0)!==r)return n(a,i);x(2,"load",{filePath:i}),a.id.startsWith("data:text/javascript,")&&(a.path=m.dirname(c)),R.parent?.send&&R.parent.send({type:"dependency",path:c});const p=oe.some(h=>c.endsWith(h)),P=ie.some(h=>c.endsWith(h));if(!p&&!P)return n(a,c);let d=O.readFileSync(c,"utf8");if(c.endsWith(".cjs")){const h=w.transformDynamicImport(i,d);h&&(d=A()?$(h):h.code)}else if(p||w.isESM(d)){const h=w.transformSync(d,i,{tsconfigRaw:exports.fileMatcher?.(c)});d=A()?$(h):h.code}x(1,"loaded",{filePath:c}),a._compile(d,c)},"transformer");F(e,".js",t);for(const a of k)F(e,a,t,{enumerable:!r,writable:!0,configurable:!0});return F(e,".mjs",t,{writable:!0,configurable:!0}),()=>{e[".js"]===t&&(e[".js"]=n);for(const a of[...k,".mjs"])e[a]===t&&delete e[a]}},"createExtensions"),le=o(s=>e=>{if((e==="."||e===".."||e.endsWith("/.."))&&(e+="/"),_.test(e)){let r=m.join(e,"index.js");e.startsWith("./")&&(r=`./${r}`);try{return s(r)}catch{}}try{return s(e)}catch(r){const n=r;if(n.code==="MODULE_NOT_FOUND")try{return s(`${e}${m.sep}index.js`)}catch{}throw n}},"createImplicitResolver"),B=[".js",".json"],G=[".ts",".tsx",".jsx"],fe=[...G,...B],he=[...B,...G],y=Object.create(null);y[".js"]=[".ts",".tsx",".js",".jsx"],y[".jsx"]=[".tsx",".ts",".jsx",".js"],y[".cjs"]=[".cts"],y[".mjs"]=[".mts"];const X=o(s=>{const e=s.split("?"),r=e[1]?`?${e[1]}`:"",[n]=e,t=m.extname(n),a=[],i=y[t];if(i){const f=n.slice(0,-t.l…(+1112 caracteres)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

Error: Cannot find module 'cloudflare:sockets'
Require stack:
- /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/worker-mailer/dist/index.js
- /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/src/lib/mailer.ts
- /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/src/lib/email-templates.ts
- /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/[eval]
    at node:internal/modules/cjs/loader:1476:15
    at nextResolveSimple (/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1004)
    at /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:3:2630
    at /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:3:1542
    at resolveTsPaths (/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:4:760)
    at /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1102
    at m._resolveFilename (file:///home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-B7jrtLTO.mjs:1:789)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1049:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1073:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1094:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/worker-mailer/dist/index.js',
    '/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/src/lib/mailer.ts',
    '/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/src/lib/email-templates.ts',
    '/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/[eval]'
  ]
}

Node.js v24.15.0
```
<!-- evidencia:fin apply-evidence.19 -->

`apply-evidence.19` falló al cargar el módulo: `email-templates.ts` importa `mailer.ts`, que arrastra `worker-mailer` y su import `cloudflare:sockets`, inexistente fuera de Workers. El script se corrigió con un stub de ese módulo (no participa del render); `apply-evidence.20` es la corrida válida.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.20","forma":"archivo","argv":null,"texto":"# Renderiza buildContactoEmail con y sin teléfono y extrae el botón WhatsApp.\n# `cloudflare:sockets` (dependencia de worker-mailer, solo existe en Workers) se reemplaza por un stub vacío.\nnode_modules/.bin/tsx -e '\nconst Module = require(\"module\");\nconst load = Module._load;\nModule._load = function (req, ...rest) { return req === \"cloudflare:sockets\" ? { connect() { throw new Error(\"stub\"); } } : load.call(this, req, ...rest); };\nconst { buildContactoEmail } = require(\"./src/lib/email-templates.ts\");\nconst meta = { ip: \"127.0.0.1\", userAgent: \"check\", formType: \"contacto\" };\nconst base = { name: \"Ana Prueba\", email: \"ana@example.com\", service: \"Carga aérea\", message: \"Hola\" };\nfor (const [label, d] of [[\"con_telefono\", { ...base, phone: \"+56 9 1234 5678\" }], [\"sin_telefono\", base], [\"solo_telefono\", { ...base, email: \"\", phone: \"+56912345678\" }]]) {\n  const { html } = buildContactoEmail(d, meta);\n  const wa = [...html.matchAll(/<a href=\"(https:\\/\\/wa\\.me\\/[^\"?]+)[^\"]*\" style=\"([^\"]*)\"\u003eWhatsApp<\\/a\u003e/g)];\n  console.log(`${label}: botones_whatsapp=${wa.length}` + wa.map((m) =\u003e ` href=${m[1]} colores=${(m[2].match(/background:[^;]+;color:[^;]+;/) || [\"?\"])[0]}`).join(\"\"));\n}\n'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:53:25-03:00","exit":1,"sha256":"27ab32ad5b78dc37ab0f0962c555056830ff33d2a73377f11ad1b7ac6e985af7","lineas":28,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.20`** · exit 1 · 28 líneas, 0 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:53:25-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Renderiza buildContactoEmail con y sin teléfono y extrae el botón WhatsApp.
# `cloudflare:sockets` (dependencia de worker-mailer, solo existe en Workers) se reemplaza por un stub vacío.
node_modules/.bin/tsx -e '
const Module = require("module");
const load = Module._load;
Module._load = function (req, ...rest) { return req === "cloudflare:sockets" ? { connect() { throw new Error("stub"); } } : load.call(this, req, ...rest); };
const { buildContactoEmail } = require("./src/lib/email-templates.ts");
const meta = { ip: "127.0.0.1", userAgent: "check", formType: "contacto" };
const base = { name: "Ana Prueba", email: "ana@example.com", service: "Carga aérea", message: "Hola" };
for (const [label, d] of [["con_telefono", { ...base, phone: "+56 9 1234 5678" }], ["sin_telefono", base], ["solo_telefono", { ...base, email: "", phone: "+56912345678" }]]) {
  const { html } = buildContactoEmail(d, meta);
  const wa = [...html.matchAll(/<a href="(https:\/\/wa\.me\/[^"?]+)[^"]*" style="([^"]*)">WhatsApp<\/a>/g)];
  console.log(`${label}: botones_whatsapp=${wa.length}` + wa.map((m) => ` href=${m[1]} colores=${(m[2].match(/background:[^;]+;color:[^;]+;/) || ["?"])[0]}`).join(""));
}
'
```

```text
/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:3
`)},"createLog"),x=I(g.bgLightYellow(g.black(" CJS "))),ae=I(g.bgBlue(" ESM ")),oe=[".cts",".mts",".ts",".tsx",".jsx"],ie=[".js",".cjs",".mjs"],k=[".ts",".tsx",".jsx"],F=o((s,e,r,n)=>{const t=Object.getOwnPropertyDescriptor(s,e);t?.set?s[e]=r:(!t||t.configurable)&&Object.defineProperty(s,e,{value:r,enumerable:t?.enumerable||n?.enumerable,writable:n?.writable??(t?t.writable:!0),configurable:n?.configurable??(t?t.configurable:!0)})},"safeSet"),ce=o((s,e,r)=>{const n=e[".js"],t=o((a,i)=>{if(s.enabled===!1)return n(a,i);const[c,f]=i.split("?");if((new URLSearchParams(f).get("namespace")??void 0)!==r)return n(a,i);x(2,"load",{filePath:i}),a.id.startsWith("data:text/javascript,")&&(a.path=m.dirname(c)),R.parent?.send&&R.parent.send({type:"dependency",path:c});const p=oe.some(h=>c.endsWith(h)),P=ie.some(h=>c.endsWith(h));if(!p&&!P)return n(a,c);let d=O.readFileSync(c,"utf8");if(c.endsWith(".cjs")){const h=w.transformDynamicImport(i,d);h&&(d=A()?$(h):h.code)}else if(p||w.isESM(d)){const h=w.transformSync(d,i,{tsconfigRaw:exports.fileMatcher?.(c)});d=A()?$(h):h.code}x(1,"loaded",{filePath:c}),a._compile(d,c)},"transformer");F(e,".js",t);for(const a of k)F(e,a,t,{enumerable:!r,writable:!0,configurable:!0});return F(e,".mjs",t,{writable:!0,configurable:!0}),()=>{e[".js"]===t&&(e[".js"]=n);for(const a of[...k,".mjs"])e[a]===t&&delete e[a]}},"createExtensions"),le=o(s=>e=>{if((e==="."||e===".."||e.endsWith("/.."))&&(e+="/"),_.test(e)){let r=m.join(e,"index.js");e.startsWith("./")&&(r=`./${r}`);try{return s(r)}catch{}}try{return s(e)}catch(r){const n=r;if(n.code==="MODULE_NOT_FOUND")try{return s(`${e}${m.sep}index.js`)}catch{}throw n}},"createImplicitResolver"),B=[".js",".json"],G=[".ts",".tsx",".jsx"],fe=[...G,...B],he=[...B,...G],y=Object.create(null);y[".js"]=[".ts",".tsx",".js",".jsx"],y[".jsx"]=[".tsx",".ts",".jsx",".js"],y[".cjs"]=[".cts"],y[".mjs"]=[".mts"];const X=o(s=>{const e=s.split("?"),r=e[1]?`?${e[1]}`:"",[n]=e,t=m.extname(n),a=[],i=y[t];if(i){const f=n.slice(0,-t.l…(+1112 caracteres)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

Error: Cannot find module 'cloudflare:workers'
Require stack:
- /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/src/lib/mailer.ts
- /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/src/lib/email-templates.ts
- /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/[eval]
    at node:internal/modules/cjs/loader:1476:15
    at nextResolveSimple (/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1004)
    at /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:3:2630
    at /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:3:1542
    at resolveTsPaths (/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:4:760)
    at /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1102
    at m._resolveFilename (file:///home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/node_modules/tsx/dist/register-B7jrtLTO.mjs:1:789)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1049:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1073:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1094:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/src/lib/mailer.ts',
    '/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/src/lib/email-templates.ts',
    '/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/[eval]'
  ]
}

Node.js v24.15.0
```
<!-- evidencia:fin apply-evidence.20 -->

`apply-evidence.20` falló por el mismo motivo con `cloudflare:workers` (lo importa `mailer.ts`). El stub se amplió a todo módulo `cloudflare:*` y se comprobó por separado que el módulo carga (`typeof buildContactoEmail === "function"`); `apply-evidence.21` es la corrida válida.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.21","forma":"archivo","argv":null,"texto":"# Renderiza buildContactoEmail con y sin teléfono y extrae el botón WhatsApp.\n# Los módulos `cloudflare:*` (solo existen en Workers; los arrastra mailer.ts) se reemplazan por un stub vacío.\nnode_modules/.bin/tsx -e '\nconst Module = require(\"module\");\nconst load = Module._load;\nModule._load = function (req, ...rest) { return String(req).startsWith(\"cloudflare:\") ? { env: {}, connect() { throw new Error(\"stub\"); } } : load.call(this, req, ...rest); };\nconst { buildContactoEmail } = require(\"./src/lib/email-templates.ts\");\nconst meta = { ip: \"127.0.0.1\", userAgent: \"check\", formType: \"contacto\" };\nconst base = { name: \"Ana Prueba\", email: \"ana@example.com\", service: \"Carga aérea\", message: \"Hola\" };\nfor (const [label, d] of [[\"con_telefono\", { ...base, phone: \"+56 9 1234 5678\" }], [\"sin_telefono\", base], [\"solo_telefono\", { ...base, email: \"\", phone: \"+56912345678\" }]]) {\n  const { html } = buildContactoEmail(d, meta);\n  const wa = [...html.matchAll(/<a href=\"(https:\\/\\/wa\\.me\\/[^\"?]+)[^\"]*\" style=\"([^\"]*)\"\u003eWhatsApp<\\/a\u003e/g)];\n  console.log(`${label}: botones_whatsapp=${wa.length}` + wa.map((m) =\u003e ` href=${m[1]} colores=${(m[2].match(/background:[^;]+;color:[^;]+;/) || [\"?\"])[0]}`).join(\"\"));\n}\n'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:53:40-03:00","exit":0,"sha256":"ee30655dc45d6bd5cd35561c2d010c0d51659b3447e732e139fbc277312dbcbc","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.21`** · exit 0 · 3 líneas, 0 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:53:40-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Renderiza buildContactoEmail con y sin teléfono y extrae el botón WhatsApp.
# Los módulos `cloudflare:*` (solo existen en Workers; los arrastra mailer.ts) se reemplazan por un stub vacío.
node_modules/.bin/tsx -e '
const Module = require("module");
const load = Module._load;
Module._load = function (req, ...rest) { return String(req).startsWith("cloudflare:") ? { env: {}, connect() { throw new Error("stub"); } } : load.call(this, req, ...rest); };
const { buildContactoEmail } = require("./src/lib/email-templates.ts");
const meta = { ip: "127.0.0.1", userAgent: "check", formType: "contacto" };
const base = { name: "Ana Prueba", email: "ana@example.com", service: "Carga aérea", message: "Hola" };
for (const [label, d] of [["con_telefono", { ...base, phone: "+56 9 1234 5678" }], ["sin_telefono", base], ["solo_telefono", { ...base, email: "", phone: "+56912345678" }]]) {
  const { html } = buildContactoEmail(d, meta);
  const wa = [...html.matchAll(/<a href="(https:\/\/wa\.me\/[^"?]+)[^"]*" style="([^"]*)">WhatsApp<\/a>/g)];
  console.log(`${label}: botones_whatsapp=${wa.length}` + wa.map((m) => ` href=${m[1]} colores=${(m[2].match(/background:[^;]+;color:[^;]+;/) || ["?"])[0]}`).join(""));
}
'
```

```text
con_telefono: botones_whatsapp=1 href=https://wa.me/56912345678 colores=background:#25D366;color:#111b21;
sin_telefono: botones_whatsapp=0
solo_telefono: botones_whatsapp=1 href=https://wa.me/56912345678 colores=background:#25D366;color:#111b21;
```
<!-- evidencia:fin apply-evidence.21 -->

`apply-evidence.21`: con teléfono (con o sin email) el correo muestra un único botón WhatsApp
con `#111b21` sobre `#25D366` y enlace `wa.me`; sin teléfono no hay botón.

## Tarea 29 — Reconciliar `DESIGN.md` con los ratios medidos

Commit: ninguno de código. La tabla «Pares de contraste validados» se escribió en la Tarea 2 con
los ratios calculados sobre `tokens.css` (los mismos de `apply-evidence.5`), no con los de
`design.md`, que difieren en dos valores: `--color-text-accent` sobre `neutral-100` mide 5.91
(`design.md`: 5.92) y `--color-focus-ring-inverse` sobre `neutral-950` mide 10.68 (`design.md`:
9.37). Los ratios medidos en navegador (anillo ≥ 4.92, texto de los pares sólidos vía axe) no
contradicen la tabla, que solo declara pares de tokens sobre fondos sólidos. El bloque
siguiente compara cada fila de la tabla con el ratio calculado; ninguna fila requirió cambio.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.22","forma":"archivo","argv":null,"texto":"# Compara cada fila de «Pares de contraste validados» de DESIGN.md con el ratio calculado desde tokens.css\npython3 - src/styles/tokens.css DESIGN.md <<'PY'\nimport re, sys\nsrc = open(sys.argv[1]).read()\nroot = re.sub(r'/\\*.*?\\*/', '', src.split('\\n@theme {')[0], flags=re.S)\ndecl = dict(re.findall(r'(--[\\w-]+)\\s*:\\s*([^;]+);', root))\ndef res(n):\n    v = decl[n].strip(); m = re.fullmatch(r'var\\((--[\\w-]+)\\)', v)\n    return res(m.group(1)) if m else v\ndef lum(h):\n    h = h.lstrip('#'); c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]\n    c = [x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4 for x in c]\n    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]\ndef ratio(a, b):\n    a, b = (x if x.startswith('#') else res(x) for x in (a, b))\n    x, y = sorted([lum(a), lum(b)], reverse=True); return (x+0.05)/(y+0.05)\ndesign = open(sys.argv[2]).read()\ntable = design.split('### Pares de contraste validados')[1].split('\\n\\n')[2].splitlines()[2:]\n# fila (prefijo de la primera celda) -\u003e pares texto/fondo en el orden en que la fila lista los ratios\nrows = [\n ('`--color-cta-text`', [('--color-cta-text', '--color-cta')]),\n ('`--color-cta-hover-text`', [('--color-cta-hover-text', '--color-cta-hover')]),\n ('`--color-brand-solid-text` (blanco) | `--color-brand-solid` ', [('--color-brand-solid-text', '--color-brand-solid')]),\n ('`--color-brand-solid-text` (blanco) | `--color-brand-solid-hover`', [('--color-brand-solid-text', '--color-brand-solid-hover')]),\n ('`--color-whatsapp-text` (#111b21) | `--color-whatsapp` ', [('--color-whatsapp-text', '--color-whatsapp')]),\n ('`--color-whatsapp-text` (#111b21) | `--color-whatsapp-hover`', [('--color-whatsapp-text', '--color-whatsapp-hover')]),\n ('`--color-text-accent`', [('--color-text-accent', b) for b in ('#ffffff', '--color-neutral-50', '--color-neutral-100', '--color-accent-300')]),\n ('`--color-brand-dark`', [('--color-brand-dark', b) for b in ('--color-neutral-100', '--color-primary-50')]),\n ('`--color-text-muted`', [('--color-text-muted', '#ffffff')]),\n ('`--color-text-inverse`', [('--color-text-inverse', '--color-primary-900')]),\n ('`primary-200`', [('--color-primary-200', '--color-primary-900')]),\n ('`primary-100`', [('--color-primary-100', '--color-primary-800')]),\n ('`--color-brand` (primary-500)', [('--color-brand', '--color-neutral-50')]),\n ('`--color-focus-ring` (primary-600) | blanco', [('--color-focus-ring', b) for b in ('#ffffff', '--color-neutral-50', '--color-neutral-100', '--color-primary-50')]),\n ('`--color-focus-ring` (primary-600) | neutral-200', [('--color-focus-ring', '--color-neutral-200')]),\n ('`--color-focus-ring-inverse`', [('--color-focus-ring-inverse', b) for b in ('--color-primary-950', '--color-primary-900', '--color-primary-800', '--color-primary-700', '--color-neutral-950')]),\n ('`neutral-900`', [('--color-neutral-900', '--color-neutral-50')]),\n]\ndiff = 0\nfor key, pairs in rows:\n    line = next(l for l in table if l.startswith('| ' + key))\n    cell = line.split('|')[3]\n    doc = [float(x) for x in re.findall(r'\\d+\\.\\d+', cell)]\n    calc = [round(ratio(a, b), 2) for a, b in pairs]\n    ok = doc == calc; diff += not ok\n    print(f\"{'OK   ' if ok else 'DIFF '} {key.split('|')[0].strip()} doc={doc} calc={calc}\")\nprint(f\"filas={len(rows)} filas_tabla={len(table)} diferencias={diff}\")\nsys.exit(1 if diff or len(rows) != len(table) else 0)\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"3bc419bb82df10df5c78f7897ea02a3eabef954e","fecha":"2026-10-05T00:53:48-03:00","exit":0,"sha256":"a6ac05c52486c1abfd67f35af2e381133f298a7195549e522de0307e11319beb","lineas":18,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.22`** · exit 0 · 18 líneas, 0 omitidas · HEAD `3bc419bb82df` · 2026-10-05T00:53:48-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Compara cada fila de «Pares de contraste validados» de DESIGN.md con el ratio calculado desde tokens.css
python3 - src/styles/tokens.css DESIGN.md <<'PY'
import re, sys
src = open(sys.argv[1]).read()
root = re.sub(r'/\*.*?\*/', '', src.split('\n@theme {')[0], flags=re.S)
decl = dict(re.findall(r'(--[\w-]+)\s*:\s*([^;]+);', root))
def res(n):
    v = decl[n].strip(); m = re.fullmatch(r'var\((--[\w-]+)\)', v)
    return res(m.group(1)) if m else v
def lum(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    c = [x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]
def ratio(a, b):
    a, b = (x if x.startswith('#') else res(x) for x in (a, b))
    x, y = sorted([lum(a), lum(b)], reverse=True); return (x+0.05)/(y+0.05)
design = open(sys.argv[2]).read()
table = design.split('### Pares de contraste validados')[1].split('\n\n')[2].splitlines()[2:]
# fila (prefijo de la primera celda) -> pares texto/fondo en el orden en que la fila lista los ratios
rows = [
 ('`--color-cta-text`', [('--color-cta-text', '--color-cta')]),
 ('`--color-cta-hover-text`', [('--color-cta-hover-text', '--color-cta-hover')]),
 ('`--color-brand-solid-text` (blanco) | `--color-brand-solid` ', [('--color-brand-solid-text', '--color-brand-solid')]),
 ('`--color-brand-solid-text` (blanco) | `--color-brand-solid-hover`', [('--color-brand-solid-text', '--color-brand-solid-hover')]),
 ('`--color-whatsapp-text` (#111b21) | `--color-whatsapp` ', [('--color-whatsapp-text', '--color-whatsapp')]),
 ('`--color-whatsapp-text` (#111b21) | `--color-whatsapp-hover`', [('--color-whatsapp-text', '--color-whatsapp-hover')]),
 ('`--color-text-accent`', [('--color-text-accent', b) for b in ('#ffffff', '--color-neutral-50', '--color-neutral-100', '--color-accent-300')]),
 ('`--color-brand-dark`', [('--color-brand-dark', b) for b in ('--color-neutral-100', '--color-primary-50')]),
 ('`--color-text-muted`', [('--color-text-muted', '#ffffff')]),
 ('`--color-text-inverse`', [('--color-text-inverse', '--color-primary-900')]),
 ('`primary-200`', [('--color-primary-200', '--color-primary-900')]),
 ('`primary-100`', [('--color-primary-100', '--color-primary-800')]),
 ('`--color-brand` (primary-500)', [('--color-brand', '--color-neutral-50')]),
 ('`--color-focus-ring` (primary-600) | blanco', [('--color-focus-ring', b) for b in ('#ffffff', '--color-neutral-50', '--color-neutral-100', '--color-primary-50')]),
 ('`--color-focus-ring` (primary-600) | neutral-200', [('--color-focus-ring', '--color-neutral-200')]),
 ('`--color-focus-ring-inverse`', [('--color-focus-ring-inverse', b) for b in ('--color-primary-950', '--color-primary-900', '--color-primary-800', '--color-primary-700', '--color-neutral-950')]),
 ('`neutral-900`', [('--color-neutral-900', '--color-neutral-50')]),
]
diff = 0
for key, pairs in rows:
    line = next(l for l in table if l.startswith('| ' + key))
    cell = line.split('|')[3]
    doc = [float(x) for x in re.findall(r'\d+\.\d+', cell)]
    calc = [round(ratio(a, b), 2) for a, b in pairs]
    ok = doc == calc; diff += not ok
    print(f"{'OK   ' if ok else 'DIFF '} {key.split('|')[0].strip()} doc={doc} calc={calc}")
print(f"filas={len(rows)} filas_tabla={len(table)} diferencias={diff}")
sys.exit(1 if diff or len(rows) != len(table) else 0)
PY
```

```text
OK    `--color-cta-text` doc=[6.44] calc=[6.44]
OK    `--color-cta-hover-text` doc=[5.1] calc=[5.1]
OK    `--color-brand-solid-text` (blanco) doc=[6.08] calc=[6.08]
OK    `--color-brand-solid-text` (blanco) doc=[8.52] calc=[8.52]
OK    `--color-whatsapp-text` (#111b21) doc=[8.8] calc=[8.8]
OK    `--color-whatsapp-text` (#111b21) doc=[5.63] calc=[5.63]
OK    `--color-text-accent` doc=[6.91, 6.46, 5.91, 5.8] calc=[6.91, 6.46, 5.91, 5.8]
OK    `--color-brand-dark` doc=[7.3, 7.7] calc=[7.3, 7.7]
OK    `--color-text-muted` doc=[5.44] calc=[5.44]
OK    `--color-text-inverse` doc=[16.08] calc=[16.08]
OK    `primary-200` doc=[9.27] calc=[9.27]
OK    `primary-100` doc=[9.66] calc=[9.66]
OK    `--color-brand` (primary-500) doc=[4.1] calc=[4.1]
OK    `--color-focus-ring` (primary-600) doc=[6.08, 5.68, 5.2, 5.49] calc=[6.08, 5.68, 5.2, 5.49]
OK    `--color-focus-ring` (primary-600) doc=[4.54] calc=[4.54]
OK    `--color-focus-ring-inverse` doc=[10.38, 9.17, 7.1, 4.86, 10.68] calc=[10.38, 9.17, 7.1, 4.86, 10.68]
OK    `neutral-900` doc=[15.36] calc=[15.36]
filas=17 filas_tabla=17 diferencias=0
```
<!-- evidencia:fin apply-evidence.22 -->

## Redespacho 1 — correcciones de la revisión adversarial

Fuente de tareas: `judgment-report.md` (iteración 1, HEAD revisado `d92da75`) y las specs que
esa revisión escribió o corrigió. Ninguna tarea es `[TDD]` (el proyecto no tiene suite de
tests). Antes de las correcciones se registraron los artefactos pendientes del worktree
(`51dc343 chore(sdd): record fix-color-contrast-sitewide verify and judgment artifacts`).

| Hallazgo | Spec | Commit |
|---|---|---|
| C1 — viñeta de paso completado del asistente | `cta-button-contrast`, `sitewide-contrast-verification` | `9d1687e` fix(a11y): use dark CTA text on completed quote wizard step bullets |
| SA1 — mensaje de éxito del formulario de contacto | `sitewide-contrast-verification` | `ce1aa03` fix(a11y): render the contact form success message with text-accent |
| C2 — literales `rgba` del degradado del visor ≤ 960px | `contrast-token-single-source` | `ae823e6` fix(tokens): express the narrow industry overlay with primary-950 |
| SA2 — pastilla del contador a todo el ancho | `secondary-text-dark-surface-contrast` | `d5792b0` fix(a11y): fit the industry directory counter pill to its content |
| SB1 — botón «Responder por email» del correo | `email-reply-button-contrast` | `84e0c03` fix(email): render the reply-by-email button with the solid brand pair |
| SB2 — coherencia de `DESIGN.md` (y excepción de correo del botón de SB1) | `contrast-token-single-source`, `email-reply-button-contrast` | `94eeb32` docs(design): align brand color usage and focus ring exceptions with the pairs table |

Notas de implementación:

- C1: `.stepper__step--done .stepper__bullet` consume `--color-cta` / `--color-cta-text` (fondo y
  borde), igual que `.mode-tile--active .mode-tile__check`.
- SA1: `setStatus` asigna `var(--color-text-accent)` al estado `success`; el estado `error`
  (`#c0392b`, preexistente) no cambia. `src/scripts/wizard.ts` conserva un `#2d9b6f` en
  `setQuoteStatus`, pero ninguna llamada usa `kind === 'success'` (el éxito del asistente muestra
  la pantalla de éxito): rama inalcanzable, fuera de los hallazgos.
- C2: los cuatro tramos usan `color-mix(in srgb, var(--color-primary-950) N%, transparent)` con
  las mismas opacidades (10/20/72/92 %). `primary-950` (`#0a1624`) es más oscuro que el literal
  retirado (`#0f1c2e`), así que el texto blanco no pierde contraste. El degradado base
  preexistente (escritorio) no se toca.
- SA2: `align-self: flex-start` en `.ind-directory__counter`; en un contenedor flex en columna
  el eje cruzado es el eje en línea, así que `flex-start` sigue la dirección de escritura (RTL
  incluido).
- SB1: constante `emailBtnColors` (`background:#3b6497;color:#ffffff;`) junto a `waBtnColors`,
  con comentario que nombra `--color-brand-solid` / `--color-brand-solid-text`; la consumen las
  dos ramas con email.
- SB2: `--color-brand` deja de describirse como color de enlaces (su par solo vale para texto
  grande); la sección del anillo de foco declara la excepción `.why__video-toggle`; la excepción de
  correo nombra el par del botón «Responder por email».

El bloque siguiente lista los commits del redespacho con sus archivos (rango fijo).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.23","forma":"argv","argv":["git","log","--reverse","--format=%h %s","--name-only","d92da75..94eeb32"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"94eeb323c5b8a2b5b6454b39ed2e0bada50751b3","fecha":"2026-10-06T13:55:19-03:00","exit":0,"sha256":"b4c1f1118a8a4b776792621db19089bae7b41e3afd5dba7a435b325d840729b5","lineas":39,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.23`** · exit 0 · 39 líneas, 0 omitidas · HEAD `94eeb323c5b8` · 2026-10-06T13:55:19-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```text
git log --reverse '--format=%h %s' --name-only d92da75..94eeb32
```

```text
51dc343 chore(sdd): record fix-color-contrast-sitewide verify and judgment artifacts

memory/changes/fix-color-contrast-sitewide/judgment-report.md
memory/changes/fix-color-contrast-sitewide/state.md
memory/changes/fix-color-contrast-sitewide/verify-report.md
memory/observations.md
memory/specs/forms-email/email-reply-button-contrast.md
memory/specs/forms-email/email-whatsapp-button-contrast.md
memory/specs/ui-contrast/accent-text-contrast.md
memory/specs/ui-contrast/brand-button-contrast.md
memory/specs/ui-contrast/contrast-token-single-source.md
memory/specs/ui-contrast/cta-button-contrast.md
memory/specs/ui-contrast/dark-surface-heading-legibility.md
memory/specs/ui-contrast/error-page-code-contrast.md
memory/specs/ui-contrast/focus-indicator-contrast.md
memory/specs/ui-contrast/nav-link-state-contrast.md
memory/specs/ui-contrast/quote-summary-empty-values-contrast.md
memory/specs/ui-contrast/secondary-text-dark-surface-contrast.md
memory/specs/ui-contrast/services-filter-active-state-contrast.md
memory/specs/ui-contrast/sitewide-contrast-verification.md
memory/specs/ui-contrast/whatsapp-button-contrast.md
9d1687e fix(a11y): use dark CTA text on completed quote wizard step bullets

log-atm-web-astro/src/styles/pages/cotizar.css
ce1aa03 fix(a11y): render the contact form success message with text-accent

log-atm-web-astro/src/pages/contacto.astro
ae823e6 fix(tokens): express the narrow industry overlay with primary-950

log-atm-web-astro/src/styles/pages/shared.css
d5792b0 fix(a11y): fit the industry directory counter pill to its content

log-atm-web-astro/src/styles/pages/shared.css
84e0c03 fix(email): render the reply-by-email button with the solid brand pair

log-atm-web-astro/src/lib/email-templates.ts
94eeb32 docs(design): align brand color usage and focus ring exceptions with the pairs table

log-atm-web-astro/DESIGN.md
```
<!-- evidencia:fin apply-evidence.23 -->

`apply-evidence.23` lista los siete commits del redespacho: el registro de artefactos y las seis
correcciones, cada una con los archivos que toca.

### Build (corrida completa de cierre) y literales de color

El perfil no declara suite de tests; la corrida completa es `npm run build` sobre el árbol final
(después del último commit de código).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.24","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"94eeb323c5b8a2b5b6454b39ed2e0bada50751b3","fecha":"2026-10-06T13:56:02-03:00","exit":0,"sha256":"35c6e0a7bc41d933e37a0b0255c870a10719e3ffdcf4a83a4d379e1217ddbafd","lineas":527,"omitidas":487,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.24`** · exit 0 · 527 líneas, 487 omitidas · HEAD `94eeb323c5b8` · 2026-10-06T13:56:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

13:55:55 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
13:55:55 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
13:55:56 [types] Generated 1.31s
13:55:56 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
13:55:57 [build] output: "static"
13:55:57 [build] mode: "server"
13:55:57 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/dist/
13:55:57 [build] adapter: @astrojs/cloudflare
13:55:57 [build] Collecting build info...
13:55:57 [build] ✓ Completed in 1.72s.
13:55:57 [build] Building server entrypoints...
13:55:59 [vite] ✓ built in 2.05s
13:56:00 [vite] ✓ built in 1.41s
13:56:01 [vite] ✓ built in 663ms

 prerendering static routes 
13:56:01   ├─ /contacto/index.html (+21ms) 
13:56:01   ├─ /cotizar/index.html (+11ms) 
13:56:01   ├─ /industrias/index.html (+21ms) 
13:56:01   ├─ /nosotros/index.html (+14ms) 
13:56:01   ├─ /servicios/index.html (+22ms) 
13:56:01   ├─ /en/contacto/index.html (+9ms) 
13:56:01   ├─ /pt/contacto/index.html (+10ms) 
13:56:01   ├─ /en/cotizar/index.html (+10ms) 
13:56:01   ├─ /pt/cotizar/index.html (+9ms) 
13:56:02   ├─ /en/industrias/index.html (+11ms) 
13:56:02   ├─ /pt/industrias/index.html (+11ms) 
13:56:02   ├─ /en/nosotros/index.html (+8ms) 
13:56:02   ├─ /pt/nosotros/index.html (+8ms) 
13:56:02   ├─ /en/servicios/index.html (+13ms) 
13:56:02   ├─ /pt/servicios/index.html (+13ms) 
13:56:02   ├─ /en/index.html (+15ms) 
13:56:02   ├─ /pt/index.html (+14ms) 
13:56:02   ├─ /index.html (+17ms) 
```
<!-- evidencia:fin apply-evidence.24 -->

`apply-evidence.24`: el build termina con exit 0.

Chequeo de literales de color por conteo (HEAD contra la base del cambio, por archivo de `src/`
tocado): una línea modificada que conserva un literal preexistente no cuenta como literal nuevo.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.25","forma":"archivo","argv":null,"texto":"# Colores literales (hex, rgb/rgba, hsl/hsla) nuevos en src/: por archivo tocado por el cambio\n# (main...HEAD), multiconjunto de literales en HEAD menos el de main (merge-base). Excepciones\n# declaradas: src/styles/tokens.css y src/lib/email-templates.ts.\npython3 - <<'PY'\nimport re, subprocess, collections\ndef git(*a): return subprocess.run(['git', *a], capture_output=True, text=True).stdout\nbase = git('merge-base', 'main', 'HEAD').strip()\nlit = re.compile(r'#[0-9a-fA-F]{3,8}\\b|\\brgba?\\([^)]*\\)|\\bhsla?\\([^)]*\\)')\nnorm = lambda s: re.sub(r'\\s+', '', s).lower()\nfiles = [f for f in git('diff', '--name-only', f'{base}...HEAD', '--', 'src').split() if f]\nexc = {'log-atm-web-astro/src/styles/tokens.css', 'log-atm-web-astro/src/lib/email-templates.ts'}\ntotal = 0\nfor f in files:\n    rel = f.removeprefix('log-atm-web-astro/')\n    old = collections.Counter(map(norm, lit.findall(git('show', f'{base}:{f}'))))\n    new = collections.Counter(map(norm, lit.findall(git('show', f'HEAD:{f}'))))\n    added = new - old\n    tag = 'excepcion' if f in exc else 'sitio'\n    if added:\n        print(f'{tag:9} {rel}: ' + ', '.join(f'{k} x{v}' for k, v in sorted(added.items())))\n    if tag == 'sitio': total += sum(added.values())\nprint(f'archivos_src_tocados={len(files)} literales_nuevos_fuera_de_excepciones={total}')\nprint('rgba(15,28,46 en HEAD (shared.css):', len(re.findall(r'rgba\\(15,28,46', git('show', 'HEAD:log-atm-web-astro/src/styles/pages/shared.css'))))\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"94eeb323c5b8a2b5b6454b39ed2e0bada50751b3","fecha":"2026-10-06T13:56:08-03:00","exit":0,"sha256":"029b97ab6c634bd02a264155c532c4853d9ac20f744f1948ad7740ec8ac44290","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.25`** · exit 0 · 4 líneas, 0 omitidas · HEAD `94eeb323c5b8` · 2026-10-06T13:56:08-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Colores literales (hex, rgb/rgba, hsl/hsla) nuevos en src/: por archivo tocado por el cambio
# (main...HEAD), multiconjunto de literales en HEAD menos el de main (merge-base). Excepciones
# declaradas: src/styles/tokens.css y src/lib/email-templates.ts.
python3 - <<'PY'
import re, subprocess, collections
def git(*a): return subprocess.run(['git', *a], capture_output=True, text=True).stdout
base = git('merge-base', 'main', 'HEAD').strip()
lit = re.compile(r'#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\)|\bhsla?\([^)]*\)')
norm = lambda s: re.sub(r'\s+', '', s).lower()
files = [f for f in git('diff', '--name-only', f'{base}...HEAD', '--', 'src').split() if f]
exc = {'log-atm-web-astro/src/styles/tokens.css', 'log-atm-web-astro/src/lib/email-templates.ts'}
total = 0
for f in files:
    rel = f.removeprefix('log-atm-web-astro/')
    old = collections.Counter(map(norm, lit.findall(git('show', f'{base}:{f}'))))
    new = collections.Counter(map(norm, lit.findall(git('show', f'HEAD:{f}'))))
    added = new - old
    tag = 'excepcion' if f in exc else 'sitio'
    if added:
        print(f'{tag:9} {rel}: ' + ', '.join(f'{k} x{v}' for k, v in sorted(added.items())))
    if tag == 'sitio': total += sum(added.values())
print(f'archivos_src_tocados={len(files)} literales_nuevos_fuera_de_excepciones={total}')
print('rgba(15,28,46 en HEAD (shared.css):', len(re.findall(r'rgba\(15,28,46', git('show', 'HEAD:log-atm-web-astro/src/styles/pages/shared.css'))))
PY
```

```text
excepcion src/lib/email-templates.ts: #111b21 x1, #3b6497 x1
excepcion src/styles/tokens.css: #0a1624 x1, #111b21 x2, #112236 x1, #22663f x3, #25d366 x2, #2b4e78 x1, #339965 x1, #3b6497 x2, #87d3b0 x1, #fca5a5 x2, #ffffff x1
archivos_src_tocados=14 literales_nuevos_fuera_de_excepciones=0
rgba(15,28,46 en HEAD (shared.css): 3
```
<!-- evidencia:fin apply-evidence.25 -->

`apply-evidence.25`: ningún archivo del sitio suma literales de color; los únicos nuevos están en
las dos excepciones declaradas. Los tres `rgba(15,28,46,…)` que quedan en `shared.css` son el
degradado base preexistente de escritorio, que el hallazgo C2 deja fuera.

### Botón «Responder por email» del correo

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.26","forma":"archivo","argv":null,"texto":"# Renderiza buildContactoEmail en sus tres combinaciones de contacto, extrae el botón\n# «Responder por email» y compara su par con --color-brand-solid / --color-brand-solid-text\n# resueltos desde el :root de tokens.css. Los módulos `cloudflare:*` se reemplazan por un stub.\nnode_modules/.bin/tsx -e '\nconst Module = require(\"module\");\nconst load = Module._load;\nModule._load = function (req, ...rest) { return String(req).startsWith(\"cloudflare:\") ? { env: {}, connect() { throw new Error(\"stub\"); } } : load.call(this, req, ...rest); };\nconst fs = require(\"fs\");\nconst { buildContactoEmail } = require(\"./src/lib/email-templates.ts\");\nconst root = fs.readFileSync(\"src/styles/tokens.css\", \"utf8\").split(\"\\n@theme {\")[0].replace(/\\/\\*[\\s\\S]*?\\*\\//g, \"\");\nconst decl = Object.fromEntries([...root.matchAll(/(--[\\w-]+)\\s*:\\s*([^;]+);/g)].map((m) =\u003e [m[1], m[2].trim()]));\nconst res = (n) =\u003e { const m = /^var\\((--[\\w-]+)\\)$/.exec(decl[n]); return m ? res(m[1]) : decl[n].toLowerCase(); };\nconst lum = (h) =\u003e { const c = [0, 2, 4].map((i) =\u003e parseInt(h.slice(1).slice(i, i + 2), 16) / 255).map((x) =\u003e x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };\nconst ratio = (a, b) =\u003e { const [x, y] = [lum(a), lum(b)].sort((p, q) =\u003e q - p); return (x + 0.05) / (y + 0.05); };\nconst site = { bg: res(\"--color-brand-solid\"), fg: res(\"--color-brand-solid-text\") };\nconsole.log(`sitio: --color-brand-solid=${site.bg} --color-brand-solid-text=${site.fg} ratio=${ratio(site.fg, site.bg).toFixed(2)}`);\nconst meta = { ip: \"127.0.0.1\", userAgent: \"check\", formType: \"contacto\" };\nconst base = { name: \"Ana Prueba\", email: \"ana@example.com\", service: \"Carga aérea\", message: \"Hola\" };\nfor (const [label, d] of [[\"email_y_telefono\", { ...base, phone: \"+56 9 1234 5678\" }], [\"solo_email\", base], [\"solo_telefono\", { ...base, email: \"\", phone: \"+56912345678\" }]]) {\n  const { html } = buildContactoEmail(d, meta);\n  const btns = [...html.matchAll(/<a href=\"(mailto:[^\"?]+)[^\"]*\" style=\"([^\"]*)\"\u003eResponder por email<\\/a\u003e/g)];\n  const out = btns.map((m) =\u003e {\n    const bg = /background:(#[0-9a-fA-F]{6});/.exec(m[2])[1].toLowerCase(), fg = /;color:(#[0-9a-fA-F]{6});/.exec(m[2])[1].toLowerCase();\n    return ` href=${m[1]} background=${bg} color=${fg} ratio=${ratio(fg, bg).toFixed(2)} igual_al_sitio=${bg === site.bg && fg === site.fg}`;\n  });\n  console.log(`${label}: botones_responder=${btns.length}` + out.join(\"\"));\n}\n'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"94eeb323c5b8a2b5b6454b39ed2e0bada50751b3","fecha":"2026-10-06T13:56:25-03:00","exit":0,"sha256":"45688c25c771be6eac7a50f889e6b2033675cf987745b3c2a65e728e78b09bbb","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.26`** · exit 0 · 4 líneas, 0 omitidas · HEAD `94eeb323c5b8` · 2026-10-06T13:56:25-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Renderiza buildContactoEmail en sus tres combinaciones de contacto, extrae el botón
# «Responder por email» y compara su par con --color-brand-solid / --color-brand-solid-text
# resueltos desde el :root de tokens.css. Los módulos `cloudflare:*` se reemplazan por un stub.
node_modules/.bin/tsx -e '
const Module = require("module");
const load = Module._load;
Module._load = function (req, ...rest) { return String(req).startsWith("cloudflare:") ? { env: {}, connect() { throw new Error("stub"); } } : load.call(this, req, ...rest); };
const fs = require("fs");
const { buildContactoEmail } = require("./src/lib/email-templates.ts");
const root = fs.readFileSync("src/styles/tokens.css", "utf8").split("\n@theme {")[0].replace(/\/\*[\s\S]*?\*\//g, "");
const decl = Object.fromEntries([...root.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const res = (n) => { const m = /^var\((--[\w-]+)\)$/.exec(decl[n]); return m ? res(m[1]) : decl[n].toLowerCase(); };
const lum = (h) => { const c = [0, 2, 4].map((i) => parseInt(h.slice(1).slice(i, i + 2), 16) / 255).map((x) => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const site = { bg: res("--color-brand-solid"), fg: res("--color-brand-solid-text") };
console.log(`sitio: --color-brand-solid=${site.bg} --color-brand-solid-text=${site.fg} ratio=${ratio(site.fg, site.bg).toFixed(2)}`);
const meta = { ip: "127.0.0.1", userAgent: "check", formType: "contacto" };
const base = { name: "Ana Prueba", email: "ana@example.com", service: "Carga aérea", message: "Hola" };
for (const [label, d] of [["email_y_telefono", { ...base, phone: "+56 9 1234 5678" }], ["solo_email", base], ["solo_telefono", { ...base, email: "", phone: "+56912345678" }]]) {
  const { html } = buildContactoEmail(d, meta);
  const btns = [...html.matchAll(/<a href="(mailto:[^"?]+)[^"]*" style="([^"]*)">Responder por email<\/a>/g)];
  const out = btns.map((m) => {
    const bg = /background:(#[0-9a-fA-F]{6});/.exec(m[2])[1].toLowerCase(), fg = /;color:(#[0-9a-fA-F]{6});/.exec(m[2])[1].toLowerCase();
    return ` href=${m[1]} background=${bg} color=${fg} ratio=${ratio(fg, bg).toFixed(2)} igual_al_sitio=${bg === site.bg && fg === site.fg}`;
  });
  console.log(`${label}: botones_responder=${btns.length}` + out.join(""));
}
'
```

```text
sitio: --color-brand-solid=#3b6497 --color-brand-solid-text=#ffffff ratio=6.08
email_y_telefono: botones_responder=1 href=mailto:ana@example.com background=#3b6497 color=#ffffff ratio=6.08 igual_al_sitio=true
solo_email: botones_responder=1 href=mailto:ana@example.com background=#3b6497 color=#ffffff ratio=6.08 igual_al_sitio=true
solo_telefono: botones_responder=0
```
<!-- evidencia:fin apply-evidence.26 -->

`apply-evidence.26`: con email del remitente (con o sin teléfono) el correo muestra un único
botón «Responder por email» con el mismo par que `--color-brand-solid` / `--color-brand-solid-text`
y enlace `mailto:`; sin email no hay botón.

### Verificación en navegador

Entorno: `astro preview --port 4391` sobre el build de `apply-evidence.24`; Chrome 148 del
checkout principal (solo lectura); `puppeteer-core` y `axe-core` instalados en el directorio de
temporales del despacho; `sharp` del worktree para leer las capturas. Los scripts (`lib.mjs`,
`states.mjs`, `industrias.mjs`, `axe.mjs`) viven en ese directorio.

Estados (C1 y SA1), en es/en/pt, escritorio y móvil: la viñeta del paso 1 tras avanzar al paso 2
del asistente, y el mensaje de éxito del formulario de contacto con la respuesta de
`/api/contacto` simulada (`{ "ok": true }`) por intercepción de la petición.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.27","forma":"archivo","argv":null,"texto":"# Verificación en navegador: states.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-21c0gmml/tools.CvEyCM6I && node states.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"94eeb323c5b8a2b5b6454b39ed2e0bada50751b3","fecha":"2026-10-06T13:58:07-03:00","exit":0,"sha256":"62f8f21df279dfb201784d009448f9a2788ee8af8d5dfbc037ff23d19f2b26b8","lineas":13,"omitidas":0,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.27`** · exit 0 · 13 líneas, 0 omitidas · HEAD `94eeb323c5b8` · 2026-10-06T13:58:07-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación en navegador: states.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-21c0gmml/tools.CvEyCM6I && node states.mjs
```

```text
OK    desktop /es  cotizar  viñeta completada texto=✓ visible=true color=rgb(17,34,54) fondo=rgb(62,185,120) ratio=6.44 umbral=4.5
OK    desktop /es  contacto éxito "✓ Recibido — te contactamos …" estilo=var(--color-text-accent) color=rgb(34,102,63) fondo=rgb(255,255,255) 14px ratio=6.91 umbral=4.5
OK    desktop /en  cotizar  viñeta completada texto=✓ visible=true color=rgb(17,34,54) fondo=rgb(62,185,120) ratio=6.44 umbral=4.5
OK    desktop /en  contacto éxito "✓ Received — we'll contact y…" estilo=var(--color-text-accent) color=rgb(34,102,63) fondo=rgb(255,255,255) 14px ratio=6.91 umbral=4.5
OK    desktop /pt  cotizar  viñeta completada texto=✓ visible=true color=rgb(17,34,54) fondo=rgb(62,185,120) ratio=6.44 umbral=4.5
OK    desktop /pt  contacto éxito "✓ Recebido — entramos em con…" estilo=var(--color-text-accent) color=rgb(34,102,63) fondo=rgb(255,255,255) 14px ratio=6.91 umbral=4.5
OK    movil   /es  cotizar  viñeta completada texto=✓ visible=true color=rgb(17,34,54) fondo=rgb(62,185,120) ratio=6.44 umbral=4.5
OK    movil   /es  contacto éxito "✓ Recibido — te contactamos …" estilo=var(--color-text-accent) color=rgb(34,102,63) fondo=rgb(255,255,255) 14px ratio=6.91 umbral=4.5
OK    movil   /en  cotizar  viñeta completada texto=✓ visible=true color=rgb(17,34,54) fondo=rgb(62,185,120) ratio=6.44 umbral=4.5
OK    movil   /en  contacto éxito "✓ Received — we'll contact y…" estilo=var(--color-text-accent) color=rgb(34,102,63) fondo=rgb(255,255,255) 14px ratio=6.91 umbral=4.5
OK    movil   /pt  cotizar  viñeta completada texto=✓ visible=true color=rgb(17,34,54) fondo=rgb(62,185,120) ratio=6.44 umbral=4.5
OK    movil   /pt  contacto éxito "✓ Recebido — entramos em con…" estilo=var(--color-text-accent) color=rgb(34,102,63) fondo=rgb(255,255,255) 14px ratio=6.91 umbral=4.5
fallas=0
```
<!-- evidencia:fin apply-evidence.27 -->

`apply-evidence.27`: en los 12 casos la viñeta completada muestra `✓` con `primary-900` sobre el
verde de marca y el mensaje de éxito toma `var(--color-text-accent)` sobre la tarjeta blanca; ambos
superan 4.5:1 (cifras en el bloque).

Visor de industrias (C2 y SA2), en es/en/pt, a 390px, 960px (límite de la media query) y 1440px,
con movimiento reducido (sin autoavance): para cada una de las 12 diapositivas se muestrea el
nombre de industria y el contador (criterio p5 ≥ 4.5, el mismo de `apply-evidence.12`), y por
viewport se mide el ancho de la pastilla del contador contra el ancho útil del overlay.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.28","forma":"archivo","argv":null,"texto":"# Verificación en navegador: industrias.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-21c0gmml/tools.CvEyCM6I && node industrias.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"94eeb323c5b8a2b5b6454b39ed2e0bada50751b3","fecha":"2026-10-06T14:01:32-03:00","exit":0,"sha256":"09c0416f0379f029703e83bb850ccf72519c0eed724cf2db890aa3a68f51e7be","lineas":235,"omitidas":195,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.28`** · exit 0 · 235 líneas, 195 omitidas · HEAD `94eeb323c5b8` · 2026-10-06T14:01:32-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Verificación en navegador: industrias.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-21c0gmml/tools.CvEyCM6I && node industrias.mjs
```

```text
chequeos=225 fallas=0
OK    movil /es     pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=284px
      movil /es     overlay background-image=linear-gradient(color(srgb 0.0392157 0.0862745 0.141176 / 0.…
OK    movil /en     pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=284px
      movil /en     overlay background-image=linear-gradient(color(srgb 0.0392157 0.0862745 0.141176 / 0.…
OK    movil /pt     pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=284px
      movil /pt     overlay background-image=linear-gradient(color(srgb 0.0392157 0.0862745 0.141176 / 0.…
OK    tablet960 /es pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=814px
      tablet960 /es overlay background-image=linear-gradient(color(srgb 0.0392157 0.0862745 0.141176 / 0.…
OK    tablet960 /en pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=814px
      tablet960 /en overlay background-image=linear-gradient(color(srgb 0.0392157 0.0862745 0.141176 / 0.…
OK    tablet960 /pt pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=814px
      tablet960 /pt overlay background-image=linear-gradient(color(srgb 0.0392157 0.0862745 0.141176 / 0.…
OK    desktop /es   pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=537px
      desktop /es   overlay background-image=linear-gradient(rgba(15, 28, 46, 0.1), rgba(15, 28, 46, 0.2)…
OK    desktop /en   pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=537px
      desktop /en   overlay background-image=linear-gradient(rgba(15, 28, 46, 0.1), rgba(15, 28, 46, 0.2)…
OK    desktop /pt   pastilla contador align-self=flex-start ancho=106px contenido=64px ancho_util_overlay=537px
      desktop /pt   overlay background-image=linear-gradient(rgba(15, 28, 46, 0.1), rgba(15, 28, 46, 0.2)…
OK    movil /es     slide  1 #dir-name               px=4510 min=13.19 p5=14.29 mediana=16.94 umbral=4.5
OK    movil /es     slide  1 .ind-directory__counter px=5040 min=3.22 p5=9.72 mediana=9.94 umbral=4.5
OK    movil /es     slide  2 #dir-name               px=3403 min=11.82 p5=12.51 mediana=13.11 umbral=4.5
OK    movil /es     slide  2 .ind-directory__counter px=5726 min=1.78 p5=8.59 mediana=12.49 umbral=4.5
OK    movil /es     slide  3 #dir-name               px=8159 min=10.57 p5=12.83 mediana=13.82 umbral=4.5
OK    movil /es     slide  3 .ind-directory__counter px=5726 min=2.73 p5=9.78 mediana=10.64 umbral=4.5
OK    movil /es     slide  4 #dir-name               px=8118 min=9.64 p5=10.24 mediana=11.45 umbral=4.5
OK    movil /es     slide  4 .ind-directory__counter px=5910 min=6.33 p5=11.83 mediana=13.52 umbral=4.5
OK    movil /es     slide  5 #dir-name               px=7462 min=9.31 p5=10.75 mediana=13.93 umbral=4.5
OK    movil /es     slide  5 .ind-directory__counter px=5726 min=9.40 p5=9.66 mediana=13.36 umbral=4.5
OK    movil /es     slide  6 #dir-name               px=7667 min=10.03 p5=13.48 mediana=16.99 umbral=4.5
OK    movil /es     slide  6 .ind-directory__counter px=5726 min=2.16 p5=8.61 mediana=8.78 umbral=4.5
OK    movil /es     slide  7 #dir-name               px=10209 min=10.00 p5=12.90 mediana=16.50 umbral=4.5
OK    movil /es     slide  7 .ind-directory__counter px=5450 min=2.04 p5=9.07 mediana=13.94 umbral=4.5
OK    movil /es     slide  8 #dir-name               px=6560 min=7.93 p5=8.45 mediana=16.84 umbral=4.5
OK    movil /es     slide  8 .ind-directory__counter px=5726 min=15.92 p5=16.66 mediana=18.43 umbral=4.5
OK    movil /es     slide  9 #dir-name               px=10045 min=11.14 p5=13.58 mediana=17.36 umbral=4.5
OK    movil /es     slide  9 .ind-directory__counter px=5726 min=2.29 p5=9.42 mediana=10.68 umbral=4.5
OK    movil /es     slide 10 #dir-name               px=11111 min=9.03 p5=10.50 mediana=14.69 umbral=4.5
OK    movil /es     slide 10 .ind-directory__counter px=5040 min=2.10 p5=8.79 mediana=9.21 umbral=4.5
OK    movil /es     slide 11 #dir-name               px=6765 min=10.77 p5=13.03 mediana=18.41 umbral=4.5
```
<!-- evidencia:fin apply-evidence.28 -->

`apply-evidence.28`: 225 chequeos sin fallas. El nombre de industria supera el umbral en las 12
diapositivas de los tres idiomas y los tres anchos, también a 390px y 960px, donde rige el
degradado expresado con `primary-950` (el `background-image` computado ≤ 960px es
`color(srgb 0.039 0.086 0.141 / …)`, es decir `#0a1624`; en 1440px sigue el degradado base). La
pastilla del contador computa `align-self: flex-start` y mide lo mismo que su contenido más gap y
padding (106px), muy por debajo del ancho útil del overlay en todos los anchos. El bloque muestra
40 de 235 líneas, con las fallas primero; el exit 0 cubre las omitidas.

Barrido axe-core `color-contrast` sobre el sitio completo, para confirmar que las correcciones no
introducen violaciones: 21 URL (7 rutas × es/en/pt, incluida la 404 `/xx-nope/`) × desktop
1440×900 y móvil 390×844 × `prefers-reduced-motion` `no-preference` y `reduce`, con scroll
completo antes de auditar.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.29","forma":"archivo","argv":null,"texto":"# Barrido axe color-contrast: axe.mjs (requiere astro preview en 127.0.0.1:4391)\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-21c0gmml/tools.CvEyCM6I && node axe.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"94eeb323c5b8a2b5b6454b39ed2e0bada50751b3","fecha":"2026-10-06T14:04:53-03:00","exit":0,"sha256":"26bae1401fd67b5f401e70f088f321a380f07f7439e224ddb92cc6208fb97c5d","lineas":5,"omitidas":0,"no_recomprobable":"requiere astro preview en ejecución y Chrome/puppeteer fuera del repo"} -->
**Evidencia `apply-evidence.29`** · exit 0 · 5 líneas, 0 omitidas · HEAD `94eeb323c5b8` · 2026-10-06T14:04:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: requiere astro preview en ejecución y Chrome/puppeteer fuera del repo

```bash
# Barrido axe color-contrast: axe.mjs (requiere astro preview en 127.0.0.1:4391)
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-color-contrast-sitewide/sdd-apply-21c0gmml/tools.CvEyCM6I && node axe.mjs
```

```text
no-preference desktop urls=21 violaciones=0
no-preference movil   urls=21 violaciones=0
reduce        desktop urls=21 violaciones=0
reduce        movil   urls=21 violaciones=0
corridas=84 violaciones=0
```
<!-- evidencia:fin apply-evidence.29 -->

`apply-evidence.29`: 84 corridas sin violaciones de contraste.

### Coherencia de `DESIGN.md` (SB2)

El bloque siguiente muestra las líneas de `DESIGN.md` que describen `--color-brand`, la regla del
anillo de foco con su excepción y la excepción de correo con el par del botón de SB1.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.30","forma":"argv","argv":["grep","-nE","^--color-brand:|why__video-toggle|Responder por email|--color-brand-solid-text` / `--color-brand-solid`\\)","DESIGN.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"94eeb323c5b8a2b5b6454b39ed2e0bada50751b3","fecha":"2026-10-06T14:05:01-03:00","exit":0,"sha256":"c79c745af5140318e6afb4880d40e3f821632cd1cc173ca3e7d7aed57d9209a9","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.30`** · exit 0 · 4 líneas, 0 omitidas · HEAD `94eeb323c5b8` · 2026-10-06T14:05:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```text
grep -nE '^--color-brand:|why__video-toggle|Responder por email|--color-brand-solid-text` / `--color-brand-solid`\)' DESIGN.md
```

```text
71:--color-brand: #4A7BB5;      /* Color de marca: acentos y texto grande; no apto para texto normal (4.38:1 sobre blanco) */
186:- Los componentes no fijan otro color de anillo ni usan `outline: none` sin un indicador equivalente visible en modos de color forzado (ADR-0008). Excepcion vigente: `.why__video-toggle:focus-visible` conserva un anillo blanco de 2px, porque el boton flota sobre el video oscuro
260:`--color-whatsapp-text` / `--color-whatsapp`; el boton «Responder por email»: `#ffffff` sobre
261:`#3b6497`, espejo de `--color-brand-solid-text` / `--color-brand-solid`). Un cambio de esos
```
<!-- evidencia:fin apply-evidence.30 -->

`apply-evidence.30`: `--color-brand` se describe como apto solo para acentos y texto grande, la
regla del anillo de foco declara la excepción `.why__video-toggle` y la excepción de correo nombra
el par del botón «Responder por email».

## Redespacho 2 — correcciones de prosa de la revisión adversarial (iteración 2)

Fuente de tareas: `judgment-report.md` (iteración 2, HEAD revisado `6d9dba7`) y la spec que esa
revisión corrigió, `ui-contrast/contrast-token-single-source` (AC 6 desmarcado y nuevo `AND` del
scenario «Equipo consulta el uso de un color en la documentación»). Ninguna tarea es `[TDD]`: los
dos residuales son de prosa y el despacho restringe los archivos a `.md`, tests y el workspace del
cambio. Antes de las correcciones se registraron los artefactos pendientes del worktree
(`7528a68`).

| Hallazgo | Spec | Commit |
|---|---|---|
| SA1 — `DESIGN.md` asigna a texto normal colores bajo 4.5:1 | `contrast-token-single-source` | `9223023` docs(design): stop assigning sub-4.5:1 colors to normal text in DESIGN.md |
| C1 — `design.md` y ADR-0008 sin el botón «Responder por email» | `contrast-token-single-source`, `email-reply-button-contrast` | `81490f7` docs(sdd): align design and ADR-0008 with the reply-by-email button spec |

Notas de implementación:

- SA1: además de las cuatro líneas que nombra el reporte (`primary-400`, `info`, `.btn-outline`,
  Ghost), el `AND` de la spec alcanza toda la documentación de diseño, así que la pasada cubre
  cada descripción que asigna un color a texto: `primary-300` y `neutral-300` («placeholders»),
  `neutral-500` («texto de apoyo», válido solo sobre superficies oscuras, que es donde lo usa el
  footer), los semánticos `success`/`warning`/`error`, el placeholder de Inputs (`neutral-400`) y
  las variantes semánticas de Badges (`text-success`/`text-warning`/`text-error`, sin consumidor
  en `src/`). Cada una declara su rol no textual y su ratio medido. `.btn-outline` se retira (no
  existe en `src/`) y Ghost describe las dos clases reales: `.btn--ghost` (`global.css`) y
  `.btn-ghost` del cotizador (`cotizar.css`). `neutral-400` conserva «texto deshabilitado»
  (exento de 1.4.3).
- C1: `design.md` cita la spec `forms-email/email-reply-button-contrast` y la constante
  `emailBtnColors`, y deja como deuda solo el texto SLA `#898580` y el enlace `mailto` en
  `#4A7BB5`; ADR-0008 agrega la spec a sus referencias. El scenario de la spec ya venía corregido
  por la revisión.

El bloque siguiente lista los commits del redespacho con sus archivos (rango fijo).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.31","forma":"argv","argv":["git","log","--reverse","--format=%h %s","--name-only","6d9dba7..81490f7"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"81490f722e7137f5a470586e1516b6550c399430","fecha":"2026-10-06T15:30:08-03:00","exit":0,"sha256":"bb919b15fdd516a5aa47e3ce13567aee47c903228874e86e449c27bbc102d825","lineas":18,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.31`** · exit 0 · 18 líneas, 0 omitidas · HEAD `81490f722e71` · 2026-10-06T15:30:08-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```text
git log --reverse '--format=%h %s' --name-only 6d9dba7..81490f7
```

```text
7528a68 chore(sdd): record fix-color-contrast-sitewide verify and judgment iteration 2 artifacts

memory/changes/fix-color-contrast-sitewide/judgment-report.md
memory/changes/fix-color-contrast-sitewide/state.md
memory/changes/fix-color-contrast-sitewide/verify-report.md
memory/observations.md
memory/specs/forms-email/email-reply-button-contrast.md
memory/specs/ui-contrast/contrast-token-single-source.md
memory/specs/ui-contrast/cta-button-contrast.md
memory/specs/ui-contrast/secondary-text-dark-surface-contrast.md
memory/specs/ui-contrast/sitewide-contrast-verification.md
9223023 docs(design): stop assigning sub-4.5:1 colors to normal text in DESIGN.md

log-atm-web-astro/DESIGN.md
81490f7 docs(sdd): align design and ADR-0008 with the reply-by-email button spec

memory/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md
memory/changes/fix-color-contrast-sitewide/design.md
```
<!-- evidencia:fin apply-evidence.31 -->

### Coherencia de `DESIGN.md` con sus pares (SA1)

El bloque siguiente recalcula desde `tokens.css` cada ratio que citan las líneas corregidas de
`DESIGN.md` y lo compara con el valor escrito.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.32","forma":"archivo","argv":null,"texto":"# Recalcula desde tokens.css cada ratio que DESIGN.md cita en las líneas corregidas (SA1)\npython3 - src/styles/tokens.css DESIGN.md <<'PY'\nimport re, sys\nsrc = open(sys.argv[1]).read()\nroot = re.sub(r'/\\*.*?\\*/', '', src.split('\\n@theme {')[0], flags=re.S)\ndecl = dict(re.findall(r'(--[\\w-]+)\\s*:\\s*([^;]+);', root))\ndef res(n):\n    v = decl[n].strip(); m = re.fullmatch(r'var\\((--[\\w-]+)\\)', v)\n    return res(m.group(1)) if m else v\ndef lum(h):\n    h = h.lstrip('#'); c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]\n    c = [x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4 for x in c]\n    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]\ndef ratio(a, b):\n    a, b = (x if x.startswith('#') else res(x) for x in (a, b))\n    x, y = sorted([lum(a), lum(b)], reverse=True); return (x+0.05)/(y+0.05)\nlines = open(sys.argv[2]).read().splitlines()\n# prefijo de línea -\u003e pares texto/fondo en el orden en que la línea cita los ratios (dos decimales; el umbral 4.5 no cuenta)\nrows = [\n ('- `primary-300`', [('--color-primary-300', '#ffffff')]),\n ('- `primary-400`', [('--color-primary-400', '#ffffff')]),\n ('- `neutral-300`', [('--color-neutral-300', '#ffffff')]),\n ('- `neutral-500`', [('--color-neutral-500', '--color-primary-950'), ('--color-neutral-500', '#ffffff')]),\n ('- `success`', [('--color-success', '#ffffff')]),\n ('- `warning`', [('--color-warning', '#ffffff')]),\n ('- `error`:', [('--color-error', '#ffffff')]),\n ('- `info`', [('--color-info', '#ffffff')]),\n ('- **Ghost**', [('--color-text-muted', '#ffffff')]),\n ('- Placeholder', [('--color-neutral-300', '#ffffff'), ('--color-neutral-400', '#ffffff')]),\n]\ndiff = 0\nfor key, pairs in rows:\n    line = next(l for l in lines if l.startswith(key))\n    doc = [float(x) for x in re.findall(r'\\d+\\.\\d\\d', line)]\n    calc = [round(ratio(a, b), 2) for a, b in pairs]\n    ok = doc == calc; diff += not ok\n    print(f\"{'OK   ' if ok else 'DIFF '} {key[2:]} doc={doc} calc={calc}\")\nprint(f\"lineas={len(rows)} diferencias={diff}\")\nsys.exit(1 if diff else 0)\nPY\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"81490f722e7137f5a470586e1516b6550c399430","fecha":"2026-10-06T15:30:15-03:00","exit":0,"sha256":"15a527a57c3a87d0fa020ebc5be2dcb70d959cc43ff398458494f9e314681f8a","lineas":11,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.32`** · exit 0 · 11 líneas, 0 omitidas · HEAD `81490f722e71` · 2026-10-06T15:30:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Recalcula desde tokens.css cada ratio que DESIGN.md cita en las líneas corregidas (SA1)
python3 - src/styles/tokens.css DESIGN.md <<'PY'
import re, sys
src = open(sys.argv[1]).read()
root = re.sub(r'/\*.*?\*/', '', src.split('\n@theme {')[0], flags=re.S)
decl = dict(re.findall(r'(--[\w-]+)\s*:\s*([^;]+);', root))
def res(n):
    v = decl[n].strip(); m = re.fullmatch(r'var\((--[\w-]+)\)', v)
    return res(m.group(1)) if m else v
def lum(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    c = [x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4 for x in c]
    return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]
def ratio(a, b):
    a, b = (x if x.startswith('#') else res(x) for x in (a, b))
    x, y = sorted([lum(a), lum(b)], reverse=True); return (x+0.05)/(y+0.05)
lines = open(sys.argv[2]).read().splitlines()
# prefijo de línea -> pares texto/fondo en el orden en que la línea cita los ratios (dos decimales; el umbral 4.5 no cuenta)
rows = [
 ('- `primary-300`', [('--color-primary-300', '#ffffff')]),
 ('- `primary-400`', [('--color-primary-400', '#ffffff')]),
 ('- `neutral-300`', [('--color-neutral-300', '#ffffff')]),
 ('- `neutral-500`', [('--color-neutral-500', '--color-primary-950'), ('--color-neutral-500', '#ffffff')]),
 ('- `success`', [('--color-success', '#ffffff')]),
 ('- `warning`', [('--color-warning', '#ffffff')]),
 ('- `error`:', [('--color-error', '#ffffff')]),
 ('- `info`', [('--color-info', '#ffffff')]),
 ('- **Ghost**', [('--color-text-muted', '#ffffff')]),
 ('- Placeholder', [('--color-neutral-300', '#ffffff'), ('--color-neutral-400', '#ffffff')]),
]
diff = 0
for key, pairs in rows:
    line = next(l for l in lines if l.startswith(key))
    doc = [float(x) for x in re.findall(r'\d+\.\d\d', line)]
    calc = [round(ratio(a, b), 2) for a, b in pairs]
    ok = doc == calc; diff += not ok
    print(f"{'OK   ' if ok else 'DIFF '} {key[2:]} doc={doc} calc={calc}")
print(f"lineas={len(rows)} diferencias={diff}")
sys.exit(1 if diff else 0)
PY
```

```text
OK    `primary-300` doc=[2.49] calc=[2.49]
OK    `primary-400` doc=[3.35] calc=[3.35]
OK    `neutral-300` doc=[1.73] calc=[1.73]
OK    `neutral-500` doc=[4.97, 3.66] calc=[4.97, 3.66]
OK    `success` doc=[2.28] calc=[2.28]
OK    `warning` doc=[2.51] calc=[2.51]
OK    `error`: doc=[4.05] calc=[4.05]
OK    `info` doc=[4.38] calc=[4.38]
OK    **Ghost** doc=[5.44] calc=[5.44]
OK    Placeholder doc=[1.73, 2.42] calc=[1.73, 2.42]
lineas=10 diferencias=0
```
<!-- evidencia:fin apply-evidence.32 -->

El bloque siguiente contrasta los botones que describe `DESIGN.md` con su definición en `src/`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.33","forma":"archivo","argv":null,"texto":"# Botones que describe DESIGN.md frente a su definición en src/: clases descritas y declaraciones de color\ngrep -oE '`\\.btn[-_a-z]*`' DESIGN.md | sort -u\necho '--- definiciones en src/ (color, fondo, borde)'\nfor c in btn--ghost btn-ghost btn-outline; do\n  n=$(grep -rlE \"^\\s*\\.$c(:hover)?\\s*\\{\" src | wc -l)\n  echo \"$c: archivos_con_regla=$n\"\n  grep -rhE -A5 \"^\\s*\\.$c(:hover)?\\s*\\{\" src | grep -E \"\\.$c|color:|background:|border-color:|border:\" | sed 's/^ *//'\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"81490f722e7137f5a470586e1516b6550c399430","fecha":"2026-10-06T15:30:15-03:00","exit":0,"sha256":"3e811a21985603842870c76af0dab8b1c236d5298dbd03297e10f77614bc5457","lineas":22,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.33`** · exit 0 · 22 líneas, 0 omitidas · HEAD `81490f722e71` · 2026-10-06T15:30:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Botones que describe DESIGN.md frente a su definición en src/: clases descritas y declaraciones de color
grep -oE '`\.btn[-_a-z]*`' DESIGN.md | sort -u
echo '--- definiciones en src/ (color, fondo, borde)'
for c in btn--ghost btn-ghost btn-outline; do
  n=$(grep -rlE "^\s*\.$c(:hover)?\s*\{" src | wc -l)
  echo "$c: archivos_con_regla=$n"
  grep -rhE -A5 "^\s*\.$c(:hover)?\s*\{" src | grep -E "\.$c|color:|background:|border-color:|border:" | sed 's/^ *//'
done
```

```text
`.btn--brand`
`.btn--cta`
`.btn--ghost`
`.btn-ghost`
`.btn--wa`
--- definiciones en src/ (color, fondo, borde)
btn--ghost: archivos_con_regla=1
.btn--ghost {
background: transparent;
color: var(--color-text);
border-color: var(--color-border);
.btn--ghost:hover { background: var(--color-surface); border-color: var(--color-neutral-300); }
background: var(--color-whatsapp);
color: var(--color-whatsapp-text);
btn-ghost: archivos_con_regla=1
.btn-ghost {
background: transparent; border: 0;
color: var(--color-text-muted); cursor: pointer;
.btn-ghost:hover { color: var(--color-text); }
.btn-ghost:disabled { opacity: 0.3; cursor: not-allowed; }
background: var(--color-cta); color: var(--color-cta-text);
btn-outline: archivos_con_regla=0
```
<!-- evidencia:fin apply-evidence.33 -->

El bloque siguiente busca en `DESIGN.md` las asignaciones a texto normal que señala SA1 y sus
variantes (enlaces en `primary-400`, `text-primary-500`, `text-brand`, placeholders en tonos
claros, texto en tonos semánticos, `.btn-outline`, `info` como color de mensajes).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.34","forma":"archivo","argv":null,"texto":"# Asignaciones a texto normal que SA1 señala y sus variantes: ninguna debe quedar en DESIGN.md\nn=$(grep -cE 'links hover|text-primary-500|text-brand|placeholder text|text-success|text-warning|text-error|btn-outline|Mensajes informativos$|neutral-400\\)$' DESIGN.md)\necho \"coincidencias=$n\"\ntest \"$n\" -eq 0\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"81490f722e7137f5a470586e1516b6550c399430","fecha":"2026-10-06T15:30:15-03:00","exit":0,"sha256":"1663813a3d1f4d844a1867035a5a5373a0be19074e3dfa71d3ea39d2cb843fb3","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.34`** · exit 0 · 1 líneas, 0 omitidas · HEAD `81490f722e71` · 2026-10-06T15:30:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`

```bash
# Asignaciones a texto normal que SA1 señala y sus variantes: ninguna debe quedar en DESIGN.md
n=$(grep -cE 'links hover|text-primary-500|text-brand|placeholder text|text-success|text-warning|text-error|btn-outline|Mensajes informativos$|neutral-400\)$' DESIGN.md)
echo "coincidencias=$n"
test "$n" -eq 0
```

```text
coincidencias=0
```
<!-- evidencia:fin apply-evidence.34 -->

Lectura de los tres bloques de SA1:

- `apply-evidence.32`: las diez líneas corregidas citan ratios que calzan con los calculados desde
  `tokens.css`, y cada uno bajo 4.5:1 va junto a «no apto para texto» o restringido a otro fondo.
- `apply-evidence.33`: `DESIGN.md` describe cinco clases de botón; `.btn--ghost` y `.btn-ghost`
  existen con los tokens que la documentación indica, y `.btn-outline` no tiene regla en `src/`
  y ya no se describe. Las líneas de `whatsapp` y `cta` de la salida son reglas vecinas que
  arrastra el contexto de `grep -A5`.
- `apply-evidence.34`: ninguna de las asignaciones señaladas queda en `DESIGN.md`.

### `design.md` y ADR-0008 frente a la spec del botón «Responder por email» (C1)

El bloque siguiente muestra la línea de riesgos de `design.md` y las referencias del ADR-0008.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.35","forma":"argv","argv":["grep","-nE","email-reply-button-contrast","memory/changes/fix-color-contrast-sitewide/design.md","memory/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide","head":"81490f722e7137f5a470586e1516b6550c399430","fecha":"2026-10-06T15:30:28-03:00","exit":0,"sha256":"84a0291984d07fb5d9e6238dc251be221c79cb011b434dc30e4f6f140065f1ba","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.35`** · exit 0 · 2 líneas, 0 omitidas · HEAD `81490f722e71` · 2026-10-06T15:30:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide`

```text
grep -nE email-reply-button-contrast memory/changes/fix-color-contrast-sitewide/design.md memory/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md
```

```text
memory/changes/fix-color-contrast-sitewide/design.md:191:- **Canal de correo**: el botón «Responder por email» queda cubierto por la spec `forms-email/email-reply-button-contrast`: sus dos ramas consumen la constante `emailBtnColors` (`#ffffff` sobre `#3b6497`, 6.08:1, espejo de `--color-brand-solid-text` / `--color-brand-solid`) bajo la excepción de hex inline de ADR-0008 (D3). Fuera del alcance de las specs quedan el texto SLA `#898580` sobre blanco (~3.6:1) y el enlace `mailto` en `#4A7BB5` de la tabla de datos (`email-templates.ts:211,307`), registrados como candidato de deuda en `observations.md`.
memory/adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md:89:- Specs: `ui-contrast/contrast-token-single-source`, `ui-contrast/focus-indicator-contrast`, `forms-email/email-whatsapp-button-contrast`, `forms-email/email-reply-button-contrast`.
```
<!-- evidencia:fin apply-evidence.35 -->

`apply-evidence.35`: `design.md` cita la spec y la constante `emailBtnColors` y deja como deuda
solo el texto SLA y el enlace `mailto`; ADR-0008 lista la spec entre sus referencias.

### Build (corrida completa de cierre)

El perfil no declara suite de tests; la corrida completa es `npm run build` sobre el árbol final.
Los cambios del redespacho no tocan `src/`.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.36","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro","head":"81490f722e7137f5a470586e1516b6550c399430","fecha":"2026-10-06T15:30:36-03:00","exit":0,"sha256":"ef658289aeb2e9ef6e3103e027333539d654796bda7bd43c0eaa4d6d760330c8","lineas":527,"omitidas":487,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.36`** · exit 0 · 527 líneas, 487 omitidas · HEAD `81490f722e71` · 2026-10-06T15:30:36-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

15:30:29 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
15:30:29 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
15:30:30 [types] Generated 1.29s
15:30:30 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
15:30:31 [build] output: "static"
15:30:31 [build] mode: "server"
15:30:31 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-color-contrast-sitewide/log-atm-web-astro/dist/
15:30:31 [build] adapter: @astrojs/cloudflare
15:30:31 [build] Collecting build info...
15:30:31 [build] ✓ Completed in 1.71s.
15:30:31 [build] Building server entrypoints...
15:30:33 [vite] ✓ built in 2.06s
15:30:34 [vite] ✓ built in 1.36s
15:30:35 [vite] ✓ built in 671ms

 prerendering static routes 
15:30:35   ├─ /contacto/index.html (+20ms) 
15:30:36   ├─ /cotizar/index.html (+11ms) 
15:30:36   ├─ /industrias/index.html (+21ms) 
15:30:36   ├─ /nosotros/index.html (+14ms) 
15:30:36   ├─ /servicios/index.html (+21ms) 
15:30:36   ├─ /en/contacto/index.html (+9ms) 
15:30:36   ├─ /pt/contacto/index.html (+9ms) 
15:30:36   ├─ /en/cotizar/index.html (+9ms) 
15:30:36   ├─ /pt/cotizar/index.html (+9ms) 
15:30:36   ├─ /en/industrias/index.html (+12ms) 
15:30:36   ├─ /pt/industrias/index.html (+12ms) 
15:30:36   ├─ /en/nosotros/index.html (+9ms) 
15:30:36   ├─ /pt/nosotros/index.html (+10ms) 
15:30:36   ├─ /en/servicios/index.html (+14ms) 
15:30:36   ├─ /pt/servicios/index.html (+13ms) 
15:30:36   ├─ /en/index.html (+16ms) 
15:30:36   ├─ /pt/index.html (+13ms) 
15:30:36   ├─ /index.html (+16ms) 
```
<!-- evidencia:fin apply-evidence.36 -->

`apply-evidence.36`: el build termina con exit 0 sobre el árbol final.

Specs marcadas: `contrast-token-single-source` (commits `9223023`, `81490f7`) y
`email-reply-button-contrast` (commit `81490f7`), ambas en `status: review`. El AC 6 de
`contrast-token-single-source` queda sin marcar: lo marca `sdd-verify`.
