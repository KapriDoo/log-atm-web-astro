---
type: apply-evidence
change_name: "fix-color-contrast-sitewide"
created: "2026-10-05"
updated: "2026-10-05"
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
