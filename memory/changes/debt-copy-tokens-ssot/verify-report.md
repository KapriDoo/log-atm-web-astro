---
verdict: PASS
---

# Verify Report: debt-copy-tokens-ssot

**Fecha**: 2026-10-08

Árbol verificado: `feature/debt-copy-tokens-ssot` en el HEAD que muestra `verify-report.30`, convergido con `origin/main`; commit base `e9d68aeda82ebb3cbb7d43264c33c31251ea70ff`. La línea base de regresión es propia de esta fase: una copia aislada del commit base, construida por verify (`verify-report.30`), no la de `apply-evidence.md`. Ningún criterio se apoya en `apply-evidence.md`; cada uno cita bloques de este informe. Las mutaciones corren en copias aisladas bajo el directorio de temporales del despacho, que se borran al terminar; el worktree solo recibe `dist/` (ignorado por git) y las marcas de las specs.

## Evidencia de base

### Construcción del árbol final

Construcción completa del worktree y cola filtrada del mismo build (la cola muestra la guarda, el sitemap y el cierre del build):

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"argv","argv":["npm","run","build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:14:43-03:00","exit":0,"sha256":"34244fa027ee499a1a78e805a181a6be7613d15839ad6bb01fe30eb52230f9d5","lineas":529,"omitidas":489,"no_recomprobable":"el build reescribe dist/ y comprobar no lo repite"} -->
**Evidencia `verify-report.1`** · exit 0 · 529 líneas, 489 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:14:43-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: el build reescribe dist/ y comprobar no lo repite

```text
npm run build
```

```text

> log-atm-web-astro@0.0.1 build
> astro build

17:14:36 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
17:14:36 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
17:14:37 [types] Generated 1.28s
17:14:37 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
17:14:38 [build] output: "static"
17:14:38 [build] mode: "server"
17:14:38 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/dist/
17:14:38 [build] adapter: @astrojs/cloudflare
17:14:38 [build] Collecting build info...
17:14:38 [build] ✓ Completed in 1.71s.
17:14:38 [build] Building server entrypoints...
17:14:40 [vite] ✓ built in 2.08s
17:14:41 [vite] ✓ built in 1.41s
17:14:42 [vite] ✓ built in 737ms

 prerendering static routes 
17:14:42   ├─ /contacto/index.html (+21ms) 
17:14:42   ├─ /cotizar/index.html (+12ms) 
17:14:43   ├─ /industrias/index.html (+21ms) 
17:14:43   ├─ /nosotros/index.html (+14ms) 
17:14:43   ├─ /robots.txt (+8ms) 
17:14:43   ├─ /servicios/index.html (+22ms) 
17:14:43   ├─ /en/contacto/index.html (+10ms) 
17:14:43   ├─ /pt/contacto/index.html (+10ms) 
17:14:43   ├─ /en/cotizar/index.html (+9ms) 
17:14:43   ├─ /pt/cotizar/index.html (+9ms) 
17:14:43   ├─ /en/industrias/index.html (+10ms) 
17:14:43   ├─ /pt/industrias/index.html (+11ms) 
17:14:43   ├─ /en/nosotros/index.html (+9ms) 
17:14:43   ├─ /pt/nosotros/index.html (+9ms) 
17:14:43   ├─ /en/servicios/index.html (+15ms) 
17:14:43   ├─ /pt/servicios/index.html (+14ms) 
17:14:43   ├─ /en/index.html (+17ms) 
17:14:43   ├─ /pt/index.html (+15ms) 
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"archivo","argv":null,"texto":"set -o pipefail\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro\nnpm run build 2\u003e&1 | /usr/bin/grep -E \"\\[prerender\\]|Complete!|robots|sitemap|rror|colisi|collision\"\necho \"build-exit=${PIPESTATUS[0]}\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:14:58-03:00","exit":0,"sha256":"3eda14951515b397f6d536463e86b8753f825d21b73fbb466a3d493ad75974cb","lineas":5,"omitidas":0,"no_recomprobable":"el build reescribe dist/ y comprobar no lo repite"} -->
**Evidencia `verify-report.2`** · exit 0 · 5 líneas, 0 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:14:58-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: el build reescribe dist/ y comprobar no lo repite

```bash
set -o pipefail
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro
npm run build 2>&1 | /usr/bin/grep -E "\[prerender\]|Complete!|robots|sitemap|rror|colisi|collision"
echo "build-exit=${PIPESTATUS[0]}"
```

```text
17:14:58   ├─ /robots.txt (+8ms) 
17:14:58 [log-atm:prerender-output-guard] [prerender] 18 páginas prerenderizadas con HTML válido
17:14:58 [@astrojs/sitemap] `sitemap-index.xml` created at `dist/client`
17:14:58 [build] Complete!
build-exit=0
```
<!-- evidencia:fin verify-report.2 -->

### Línea base propia

<!-- evidencia:inicio {"v":1,"id":"verify-report.30","forma":"archivo","argv":null,"texto":"# Línea base propia de verify: copia aislada del commit base construida con npm run build (no se usa la línea base de apply).\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nB=$(cat $T/base-path.txt)\necho \"commit base: $(git -C $W rev-parse e9d68aeda82ebb3cbb7d43264c33c31251ea70ff)\"\necho \"copia fuera del repo y de los worktrees: $(case \"$(realpath $B)\" in $W/*|/home/kapridoo/projects/log-atm-web-astro/*) echo NO;; *) echo SI;; esac)\"\necho \"build de la copia: $(/usr/bin/grep -c '\\[build\\] Complete!' $T/base-build.log) 'Complete!' en su log\"\necho \"index.html en dist/client de la copia: $(find $B/log-atm-web-astro/dist/client -name index.html | wc -l)\"\necho \"guarda presente en la base: $(/usr/bin/grep -c 'prerender-output-guard' $B/log-atm-web-astro/astro.config.mjs) (0 = la base no la tiene)\"\necho \"HEAD verificado: $(git -C $W rev-parse HEAD)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:28:01-03:00","exit":0,"sha256":"2568232e5870ed7a7cfe1abb22c3672935a9a3f382c28fdcd1300d0aa7a6f8f5","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.30`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:28:01-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Línea base propia de verify: copia aislada del commit base construida con npm run build (no se usa la línea base de apply).
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
B=$(cat $T/base-path.txt)
echo "commit base: $(git -C $W rev-parse e9d68aeda82ebb3cbb7d43264c33c31251ea70ff)"
echo "copia fuera del repo y de los worktrees: $(case "$(realpath $B)" in $W/*|/home/kapridoo/projects/log-atm-web-astro/*) echo NO;; *) echo SI;; esac)"
echo "build de la copia: $(/usr/bin/grep -c '\[build\] Complete!' $T/base-build.log) 'Complete!' en su log"
echo "index.html en dist/client de la copia: $(find $B/log-atm-web-astro/dist/client -name index.html | wc -l)"
echo "guarda presente en la base: $(/usr/bin/grep -c 'prerender-output-guard' $B/log-atm-web-astro/astro.config.mjs) (0 = la base no la tiene)"
echo "HEAD verificado: $(git -C $W rev-parse HEAD)"
```

```text
commit base: e9d68aeda82ebb3cbb7d43264c33c31251ea70ff
copia fuera del repo y de los worktrees: SI
build de la copia: 1 'Complete!' en su log
index.html en dist/client de la copia: 18
guarda presente en la base: 0 (0 = la base no la tiene)
HEAD verificado: bab0b8db08401e96bab00d1db1b2458599fb6b73
```
<!-- evidencia:fin verify-report.30 -->

## Resultados por Spec

### Todo el texto visible sale del i18n y un desalineamiento con los datos rompe la construcción (`copy-single-source`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. Datos no textuales sin texto visible; `SEO` no existe | ✅ | `verify-report.22`: ninguna propiedad de texto en `constants.ts`, ni `SEO` ni `SITE` exportados. Las cifras neutras al idioma (`20+`, `1:1`, `24/7`, `4`, numeración `01`…) permanecen como ids, decisión registrada en `observations.md`; los topónimos y los valores del cotizador quedan fuera de la regla por la propia spec. |
| 2. Los 12 sitios sin valor de respaldo ni fusión | ✅ | `verify-report.22`: la búsqueda de fusiones texto-datos en los 9 archivos migrados no encuentra coincidencias. El diff del HTML construido (`verify-report.3`) confirma que ningún texto cambia al fusionar solo desde el i18n. |
| 3. Un único helper, junto a `tList`, usado por los 12 sitios | ✅ | `verify-report.22`: `tListFor` es la única función que compara longitudes y la usan los 9 archivos (industrias con tres listas, nosotros, cotizar y el cotizador rápido con dos cada uno). |
| 4. Quitar un ítem en un solo idioma hace fallar `validate-i18n` | ✅ | `verify-report.23`: exit 1 con el idioma y las claves faltantes en el reporte. |
| 5. Quitar un ítem en los tres idiomas hace fallar `astro build` | ✅ | `verify-report.9` (vía `build:ci`): exit 1; el log trae el mensaje del helper con clave, idioma y las dos longitudes, y la guarda nombra las seis páginas afectadas. |
| 6. Un `throw` en el render hace fallar `astro build` y la guarda nombra la página | ✅ | `verify-report.10`: exit 1 y la guarda nombra `/pt/contacto/`. |
| 7. La guarda cubre inexistente, 0 bytes, sin `<html` y ruta sin paths | ✅ | `verify-report.9` (0 bytes y sin `<html`), `verify-report.29` (archivo inexistente), `verify-report.8` (ruta cuyo `getStaticPaths` no entrega ningún path). Las páginas esperadas salen de `pages` de `astro:build:done` y de `astro:routes:resolved`, no de lo escrito en disco (`verify-report.26`). |
| 8. La guarda corre en `build` y en `build:ci` | ✅ | `verify-report.32` (`build:ci` sin mutación, exit 0, la guarda reporta) y `verify-report.9` (`build:ci` con mutación, exit 1). |
| 9. Con datos e i18n alineados, `build` y `check` terminan sin error | ✅ | `verify-report.1`, `verify-report.32` y `verify-report.11`. |
| 10. Los cuatro textos obsoletos no existen en `src` | ✅ | `verify-report.22`: búsqueda sin coincidencias. |
| 11. Texto visible, meta y JSON-LD idénticos salvo las diferencias declaradas | ✅ | `verify-report.3`: diff del HTML crudo de las 18 páginas contra la línea base propia, tras normalizar solo el host `www`, el eslogan de `/en` y `/pt`, el hash del CSS y el orden de claves del JSON. Los correos al operador se renderizan idénticos byte a byte (`verify-report.28`). |

**Scenarios verificados**: 6/6 (lista pierde un ítem en un idioma: `verify-report.23`; en tres: `verify-report.9`; render lanza: `verify-report.10`; ruta sin paths: `verify-report.8`; datos alineados: `verify-report.3`; texto obsoleto: `verify-report.22`).

### Identidad del sitio con una única fuente (`site-identity-single-source`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. Una única definición, sin imports y sin slogan | ✅ | `verify-report.22`: `site.ts` no importa nada; las únicas menciones a «slogan»/«tagline» son el comentario que remite al i18n. |
| 2. Meta (incluidas las cuentas de twitter), JSON-LD, correo, WhatsApp, marca de navbar, pie y contacto leen la definición; el layout no redefine nombre ni URL; el i18n no define el nombre | ✅ | `verify-report.17`: al cambiar solo `site.ts`, no queda en `dist/client` ningún valor viejo de nombre, URL, teléfono ni dirección, y los nuevos aparecen en canonical, og, JSON-LD, WhatsApp, pie y contacto. `verify-report.22`: la clave `meta.siteName` no existe en `src`. |
| 3. WhatsApp derivado del teléfono; línea de dirección desde la dirección estructurada | ✅ | `verify-report.17`: los enlaces de WhatsApp, el pie, contacto y el worker de correo siguen el cambio. |
| 4. Eslogan del JSON-LD por idioma y título por defecto desde `meta.defaultTitle` | ✅ | `verify-report.3`: el eslogan cambia solo en `/en` y `/pt` (a la clave `meta.tagline` de cada idioma) y el título por defecto en español no cambia. |
| 5. El correo toma el eslogan de `es.json` (JSON completo) y nombre y dirección de la identidad | ✅ | `verify-report.28`: los tres correos salen idénticos al commit base; `verify-report.17` muestra que nombre y dirección del correo siguen a `site.ts`. |
| 6. Cambiar un dato en su definición se refleja sin otra edición | ✅ | `verify-report.17` (mutación solo sobre `site.ts`). |
| 7. Teléfono y email sin cambios; eslogan de `/en` y `/pt` localizado | ✅ | `verify-report.3` (ninguna diferencia en teléfono ni email; solo el eslogan localizado). |

**Scenarios verificados**: 5/5 (teléfono y dirección: `verify-report.17`; eslogan por idioma: `verify-report.3`; correo: `verify-report.28`; búsqueda de duplicados: `verify-report.17` y `verify-report.22`).

### Host canónico www en todas las señales de búsqueda (`canonical-host-www`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. La URL de la identidad es `https://www.logatm.com` y es la única fuente | ✅ | `verify-report.17`: cambiar solo `site.ts` mueve canonical, og, robots y sitemap al host nuevo. |
| 2. Canonical, hreflang, og:url, og:image, sitemap y JSON-LD sin el host apex | ✅ | `verify-report.3` y `verify-report.4`: ningún archivo de `dist/client` conserva el apex, que la línea base sí traía. Las páginas bajo demanda (404) no emiten canonical ni hreflang y su único host es `www` (`verify-report.27`). |
| 3. `dist/client/robots.txt` existe con `Sitemap: https://www.logatm.com/sitemap-index.xml` | ✅ | `verify-report.4` (contenido del archivo construido y diff contra la base: solo el host). |
| 4. `robots.txt` prerenderizado, `text/plain`, sin archivo estático en `public/` | ✅ | `verify-report.25` (servido por `astro preview`: `text/plain; charset=utf-8`); `verify-report.18` (`public/robots.txt` no existe); `verify-report.2` (el build no reporta colisión de rutas). |
| 5. `astro.config.mjs` lee la URL de `site.ts` y el build termina en verde | ✅ | `verify-report.1`, `verify-report.17` (el sitemap sigue al `site.ts` mutado). |
| 6. `manifest.json` y el email sin cambios | ✅ | `verify-report.4` (manifest idéntico), `verify-report.18` (ningún archivo cambiado en `public/manifest.json` ni en la API). |
| 7. Únicas diferencias: el host | ✅ | `verify-report.3` y `verify-report.4`. |

**Scenarios verificados**: 4/4.

### Opciones del cotizador (`quote-extras-and-origin-options`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. Cuatro extras sin «Última milla» en es, en y pt | ✅ | `verify-report.24`. |
| 2. «Otro»/«Other»/«Outro» con `value="Otro"` | ✅ | `verify-report.24` y `verify-report.3`. |
| 3. La API acepta cualquier servicio de texto y no cambia | ✅ | `verify-report.18` (sin archivos cambiados en `src/pages/api`); `verify-report.24` (`normServices` acepta cualquier texto). |
| 4. `npm run validate-i18n` en exit 0 | ✅ | `verify-report.12`. |
| 5. Únicas diferencias de texto en cotizar | ✅ | `verify-report.3`. |

**Scenarios verificados**: 3/3.

### Política de color (`color-token-policy`)

| Criterion | Status | Notas |
|-----------|--------|-------|
| 1. Misma política en `tokens.css` y en la regla «Don't» de `DESIGN.md` | ✅ | `verify-report.31`: las frases de la política figuran en ambos archivos y la regla antigua ya no existe en ninguno; `DESIGN.md` conserva «Excepcion: plantillas de correo» (`verify-report.18`). |
| 2. Sin los 18 tokens de opacidad ni el hover oscuro de WhatsApp | ✅ | `verify-report.21` (ninguna aparición en `src` ni en `DESIGN.md`) y `verify-report.4` (las declaraciones eliminadas del CSS construido son solo esas). |
| 3. Tokens de WhatsApp en uso permanecen | ✅ | `verify-report.21`. |
| 4. El CSS construido difiere solo en las declaraciones eliminadas | ✅ | `verify-report.4`: no hay declaraciones agregadas ni otras eliminadas. |
| 5. Sombras y radios en `:root` y consumidos vía `var()` | ✅ | `verify-report.21`: las sombras viven solo en `:root` (no en `@theme`) y ambos grupos tienen consumidores `var()`. |
| 6. Cada par validado una sola vez y el sitio construye | ✅ | `verify-report.21`: ningún token se repite dentro de su bloque y los colores de `:root` y `@theme` coinciden; `verify-report.1` (build). |
| 7. `DESIGN.md` con ratios medidos y sin presentar como aptos colores bajo 4.5:1 | ✅ | `verify-report.21`: se recalculan por WCAG 2.x los ratios de la tabla de pares y de las líneas de paleta sobre los hex de `tokens.css`; ninguno difiere. |
| 8. Comentario de una línea sobre los colores de industrias | ✅ | `verify-report.18` (el comentario precede a `INDUSTRIES`; los 12 colores son los mismos que en la base). |
| 9. Las nueve specs previas declaran la política como sucesora | ✅ | `verify-report.18`. |

**Scenarios verificados**: 7/7. Los colores literales no aumentan en ningún archivo del cambio fuera de `tokens.css` y de la plantilla de correo (`verify-report.18`).

## Regresión de `dist/client` contra la línea base

Diff del HTML crudo de las 18 páginas de `dist/client` (6 rutas × es, en, pt) contra la línea base propia, con normalización explícita y acotada:

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/s/rawdiff.py","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/base.WZa4E08E/log-atm-web-astro/dist/client","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/dist/client"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:16:29-03:00","exit":0,"sha256":"880d8e317462713af801de43e3f695d1b273ea5497cd6ec471d15ab43e5eaa55","lineas":9,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.3`** · exit 0 · 9 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:16:29-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/s/rawdiff.py /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/base.WZa4E08E/log-atm-web-astro/dist/client /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/dist/client
```

```text
paginas base=18 final=18 mismas=True
cotizar/index.html -<button type="button" class="chip-multi" data-extra="Última milla">Última milla</button>
en/cotizar/index.html -<option value="Otro">Otro</option>
en/cotizar/index.html +<option value="Otro">Other</option>
en/cotizar/index.html -<button type="button" class="chip-multi" data-extra="Last mile">Last mile</button>
pt/cotizar/index.html -<option value="Otro">Otro</option>
pt/cotizar/index.html +<option value="Otro">Outro</option>
pt/cotizar/index.html -<button type="button" class="chip-multi" data-extra="Última milha">Última milha</button>
lineas distintas tras normalizar host www, eslogan en/pt, hash de CSS y orden de claves JSON: 7
```
<!-- evidencia:fin verify-report.3 -->

Diferencias fuera del HTML (CSS, robots, sitemaps, manifest y restos del host sin `www`):

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"archivo","argv":null,"texto":"# Compara dist/client del commit base (copia aislada) contra dist/client del árbol final: CSS, robots, sitemaps, manifest y restos del host sin www.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nB=$(cat $T/base-path.txt)/log-atm-web-astro/dist/client\nF=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/dist/client\nfor n in Footer 404 cotizar index shared; do\n  bf=$(ls $B/_astro/$n.*.css); ff=$(ls $F/_astro/$n.*.css)\n  echo \"css $n: lineas distintas = $(diff <(sed 's/}/}\\n/g; s/;/;\\n/g' $bf) <(sed 's/}/}\\n/g; s/;/;\\n/g' $ff) | /usr/bin/grep -c '^[<\u003e]'); eliminadas=$(diff <(sed 's/}/}\\n/g; s/;/;\\n/g' $bf) <(sed 's/}/}\\n/g; s/;/;\\n/g' $ff) | /usr/bin/grep -c '^<'); agregadas=$(diff <(sed 's/}/}\\n/g; s/;/;\\n/g' $bf) <(sed 's/}/}\\n/g; s/;/;\\n/g' $ff) | /usr/bin/grep -c '^\u003e')\"\ndone\necho \"css eliminadas Footer+404 (tokens retirados):\"; diff <(sed 's/;/;\\n/g' $B/_astro/Footer.*.css) <(sed 's/;/;\\n/g' $F/_astro/Footer.*.css) | /usr/bin/grep '^<' | /usr/bin/grep -vcE -- '--(opacity-[a-z0-9]+|color-whatsapp-hover-dark):'\necho \"--- robots.txt (base vs final)\"; diff $B/robots.txt $F/robots.txt\necho \"--- robots.txt final\"; cat $F/robots.txt\ndiff $B/manifest.json $F/manifest.json && echo \"manifest.json: sin cambios\"\ndiff <(sed 's#https://logatm.com#https://www.logatm.com#g' $B/sitemap-0.xml) $F/sitemap-0.xml && echo \"sitemap-0.xml: igual salvo host\"\ndiff <(sed 's#https://logatm.com#https://www.logatm.com#g' $B/sitemap-index.xml) $F/sitemap-index.xml && echo \"sitemap-index.xml: igual salvo host\"\necho \"apariciones de https://logatm.com (sin www) en dist/client final: $(/usr/bin/grep -rl 'https://logatm.com' $F | wc -l) archivos\"\necho \"apariciones de https://logatm.com (sin www) en dist/client base: $(/usr/bin/grep -rl 'https://logatm.com' $B | wc -l) archivos\"\necho \"apariciones de http://logatm.com o //logatm.com final: $(/usr/bin/grep -rlE '(^|[^w.@a-z])logatm\\.com' $F | wc -l) archivos\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:16:29-03:00","exit":0,"sha256":"a9e05440e3280dd4004a533f84ce9c81088b118c0aa21026f47d36bccba7c590","lineas":23,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 23 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:16:29-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Compara dist/client del commit base (copia aislada) contra dist/client del árbol final: CSS, robots, sitemaps, manifest y restos del host sin www.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
B=$(cat $T/base-path.txt)/log-atm-web-astro/dist/client
F=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/dist/client
for n in Footer 404 cotizar index shared; do
  bf=$(ls $B/_astro/$n.*.css); ff=$(ls $F/_astro/$n.*.css)
  echo "css $n: lineas distintas = $(diff <(sed 's/}/}\n/g; s/;/;\n/g' $bf) <(sed 's/}/}\n/g; s/;/;\n/g' $ff) | /usr/bin/grep -c '^[<>]'); eliminadas=$(diff <(sed 's/}/}\n/g; s/;/;\n/g' $bf) <(sed 's/}/}\n/g; s/;/;\n/g' $ff) | /usr/bin/grep -c '^<'); agregadas=$(diff <(sed 's/}/}\n/g; s/;/;\n/g' $bf) <(sed 's/}/}\n/g; s/;/;\n/g' $ff) | /usr/bin/grep -c '^>')"
done
echo "css eliminadas Footer+404 (tokens retirados):"; diff <(sed 's/;/;\n/g' $B/_astro/Footer.*.css) <(sed 's/;/;\n/g' $F/_astro/Footer.*.css) | /usr/bin/grep '^<' | /usr/bin/grep -vcE -- '--(opacity-[a-z0-9]+|color-whatsapp-hover-dark):'
echo "--- robots.txt (base vs final)"; diff $B/robots.txt $F/robots.txt
echo "--- robots.txt final"; cat $F/robots.txt
diff $B/manifest.json $F/manifest.json && echo "manifest.json: sin cambios"
diff <(sed 's#https://logatm.com#https://www.logatm.com#g' $B/sitemap-0.xml) $F/sitemap-0.xml && echo "sitemap-0.xml: igual salvo host"
diff <(sed 's#https://logatm.com#https://www.logatm.com#g' $B/sitemap-index.xml) $F/sitemap-index.xml && echo "sitemap-index.xml: igual salvo host"
echo "apariciones de https://logatm.com (sin www) en dist/client final: $(/usr/bin/grep -rl 'https://logatm.com' $F | wc -l) archivos"
echo "apariciones de https://logatm.com (sin www) en dist/client base: $(/usr/bin/grep -rl 'https://logatm.com' $B | wc -l) archivos"
echo "apariciones de http://logatm.com o //logatm.com final: $(/usr/bin/grep -rlE '(^|[^w.@a-z])logatm\.com' $F | wc -l) archivos"
```

```text
css Footer: lineas distintas = 19; eliminadas=19; agregadas=0
css 404: lineas distintas = 19; eliminadas=19; agregadas=0
css cotizar: lineas distintas = 0; eliminadas=0; agregadas=0
css index: lineas distintas = 0; eliminadas=0; agregadas=0
css shared: lineas distintas = 0; eliminadas=0; agregadas=0
css eliminadas Footer+404 (tokens retirados):
0
--- robots.txt (base vs final)
4c4
< Sitemap: https://logatm.com/sitemap-index.xml
---
> Sitemap: https://www.logatm.com/sitemap-index.xml
--- robots.txt final
User-agent: *
Allow: /

Sitemap: https://www.logatm.com/sitemap-index.xml
manifest.json: sin cambios
sitemap-0.xml: igual salvo host
sitemap-index.xml: igual salvo host
apariciones de https://logatm.com (sin www) en dist/client final: 0 archivos
apariciones de https://logatm.com (sin www) en dist/client base: 21 archivos
apariciones de http://logatm.com o //logatm.com final: 0 archivos
```
<!-- evidencia:fin verify-report.4 -->

Las únicas diferencias admitidas son las que declaran las specs: ausencia de «Última milla» en los tres idiomas, etiquetas «Other»/«Outro», host `www`, eslogan localizado del JSON-LD de `/en` y `/pt`, y las declaraciones eliminadas del CSS. El diff no deja diferencias residuales.

Correos al operador (header, pie y texto), renderizados con datos fijos sobre el commit base y sobre el HEAD:

<!-- evidencia:inicio {"v":1,"id":"verify-report.28","forma":"archivo","argv":null,"texto":"# Correos al operador: se renderizan los 3 builders con datos fijos sobre el commit base y sobre el HEAD (mailer sustituido por un stub de fecha fija) y se comparan byte a byte.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nNM=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules\nfor rev in e9d68aeda82ebb3cbb7d43264c33c31251ea70ff HEAD; do\n  D=$(mktemp -d \"$T/mut.XXXXXXXX\")\n  case \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\n  git -C \"$W\" archive $rev | tar -x -C \"$D\"\n  printf 'export function formatDateCL(): string { return \"FECHA-FIJA\"; }\\n' \u003e \"$D/log-atm-web-astro/src/lib/mailer.ts\"\n  ln -s $NM \"$D/log-atm-web-astro/node_modules\"\n  (cd \"$D/log-atm-web-astro\" && ./node_modules/.bin/tsx \"$T/s/email-driver.mts\" \"$D/log-atm-web-astro/src/lib/email-templates.ts\" \u003e \"$T/email-$(echo $rev | cut -c1-7).json\" 2\u003e \"$T/email-err-$(echo $rev | cut -c1-7).log\"; echo \"$rev render exit=$?\")\n  rm -rf \"$D\"\ndone\nA=\"$T/email-e9d68ae.json\"; B=\"$T/email-HEAD.json\"\necho \"tamanos: base=$(wc -c < $A) head=$(wc -c < $B)\"\ncmp $A $B && echo \"correos idénticos byte a byte (contacto, cotización rápida, cotización 4 pasos; html + text + subject)\"\nrm -f \"$T\"/email-*.json \"$T\"/email-err-*.log\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:26:22-03:00","exit":0,"sha256":"5a35255823156d7657c46047dabb50790aeb1dbfafc032c70dc93b7b7e4692b6","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.28`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:26:22-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Correos al operador: se renderizan los 3 builders con datos fijos sobre el commit base y sobre el HEAD (mailer sustituido por un stub de fecha fija) y se comparan byte a byte.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
NM=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules
for rev in e9d68aeda82ebb3cbb7d43264c33c31251ea70ff HEAD; do
  D=$(mktemp -d "$T/mut.XXXXXXXX")
  case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
  git -C "$W" archive $rev | tar -x -C "$D"
  printf 'export function formatDateCL(): string { return "FECHA-FIJA"; }\n' > "$D/log-atm-web-astro/src/lib/mailer.ts"
  ln -s $NM "$D/log-atm-web-astro/node_modules"
  (cd "$D/log-atm-web-astro" && ./node_modules/.bin/tsx "$T/s/email-driver.mts" "$D/log-atm-web-astro/src/lib/email-templates.ts" > "$T/email-$(echo $rev | cut -c1-7).json" 2> "$T/email-err-$(echo $rev | cut -c1-7).log"; echo "$rev render exit=$?")
  rm -rf "$D"
done
A="$T/email-e9d68ae.json"; B="$T/email-HEAD.json"
echo "tamanos: base=$(wc -c < $A) head=$(wc -c < $B)"
cmp $A $B && echo "correos idénticos byte a byte (contacto, cotización rápida, cotización 4 pasos; html + text + subject)"
rm -f "$T"/email-*.json "$T"/email-err-*.log
```

```text
e9d68aeda82ebb3cbb7d43264c33c31251ea70ff render exit=0
HEAD render exit=0
tamanos: base=35877 head=35877
correos idénticos byte a byte (contacto, cotización rápida, cotización 4 pasos; html + text + subject)
```
<!-- evidencia:fin verify-report.28 -->

## Guarda de prerender (ADR-0012)

Sin mutación, `build:ci` sale 0 y la guarda reporta sus páginas:

<!-- evidencia:inicio {"v":1,"id":"verify-report.32","forma":"archivo","argv":null,"texto":"# Control: copia sin mutación, npm run build:ci (astro check + astro build) debe salir 0.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nD=$(mktemp -d \"$T/mut.XXXXXXXX\")\ncase \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive HEAD | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\" && npm run build:ci \u003e \"$D/out.log\" 2\u003e&1\nRC=$?\n/usr/bin/grep -E \"astro check|Result|\\[prerender\\]|Complete!|rror\" \"$D/out.log\" | sed -E \"s/[0-9]{2}:[0-9]{2}:[0-9]{2} //g\" | head -20\necho \"mutacion=ninguna comando=build:ci exit=$RC\"\nrm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:31:10-03:00","exit":0,"sha256":"f08719e7f4e907a8b44d04099bced613e333eb8a903b2699fce007a9c7fe3c16","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.32`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:31:10-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Control: copia sin mutación, npm run build:ci (astro check + astro build) debe salir 0.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
D=$(mktemp -d "$T/mut.XXXXXXXX")
case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive HEAD | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro" && npm run build:ci > "$D/out.log" 2>&1
RC=$?
/usr/bin/grep -E "astro check|Result|\[prerender\]|Complete!|rror" "$D/out.log" | sed -E "s/[0-9]{2}:[0-9]{2}:[0-9]{2} //g" | head -20
echo "mutacion=ninguna comando=build:ci exit=$RC"
rm -rf "$D"
```

```text
> astro check && astro build
[log-atm:prerender-output-guard] [prerender] 18 páginas prerenderizadas con HTML válido
[build] Complete!
mutacion=ninguna comando=build:ci exit=0
```
<!-- evidencia:fin verify-report.32 -->

Lista recortada en los tres idiomas (`build:ci`, exit 1; mensaje del helper con clave, idioma y longitudes; la guarda nombra las páginas):

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"archivo","argv":null,"texto":"# Mutación: se quita el último ítem de servicios.list en es, en y pt; npm run build:ci debe salir 1.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nD=$(mktemp -d \"$T/mut.XXXXXXXX\")\ncase \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive HEAD | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\"\nfor l in es en pt; do\n  python3 -I -c \"\nimport json,sys\np='src/i18n/translations/$l.json'\nd=json.load(open(p,encoding='utf8'))\nd['servicios']['list'].pop()\njson.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=2)\n\"\ndone\nnpm run build:ci \u003e \"$D/out.log\" 2\u003e&1\nRC=$?\n/usr/bin/grep -E \"Lista desalineada|\\[prerender\\]|^  - /|Complete!\" \"$D/out.log\" | sed -E \"s#$D#<COPIA\u003e#g; s/[0-9]{2}:[0-9]{2}:[0-9]{2} //g\" | sort | uniq -c | sort -rn | head -30\necho \"mutacion=servicios.list sin ultimo item en es,en,pt comando=build:ci exit=$RC\"\nrm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:18:58-03:00","exit":0,"sha256":"d2e4df00055a596643055b01c531496d5b68048c10fde8c75e0c083c1384ae50","lineas":14,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.9`** · exit 0 · 14 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:18:58-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Mutación: se quita el último ítem de servicios.list en es, en y pt; npm run build:ci debe salir 1.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
D=$(mktemp -d "$T/mut.XXXXXXXX")
case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive HEAD | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro"
for l in es en pt; do
  python3 -I -c "
import json,sys
p='src/i18n/translations/$l.json'
d=json.load(open(p,encoding='utf8'))
d['servicios']['list'].pop()
json.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=2)
"
done
npm run build:ci > "$D/out.log" 2>&1
RC=$?
/usr/bin/grep -E "Lista desalineada|\[prerender\]|^  - /|Complete!" "$D/out.log" | sed -E "s#$D#<COPIA>#g; s/[0-9]{2}:[0-9]{2}:[0-9]{2} //g" | sort | uniq -c | sort -rn | head -30
echo "mutacion=servicios.list sin ultimo item en es,en,pt comando=build:ci exit=$RC"
rm -rf "$D"
```

```text
      1   ├─ /servicios/index.html[ERROR] Error: [i18n] Lista desalineada: "servicios.list" (lang=es) tiene 10 ítems de texto y 11 ítems de datos
      1   - /servicios/: <COPIA>/log-atm-web-astro/dist/client/servicios/index.html no contiene <html
      1   ├─ /pt/servicios/index.htmlUncaught exception: workerd/jsg/_virtual_includes/iterator/workerd/jsg/value.h:1480: failed: remote.jsg.Error: [i18n] Lista desalineada: "servicios.list" (lang=pt) tiene 10 ítems de texto y 11 ítems de datos
      1   - /pt/servicios/: <COPIA>/log-atm-web-astro/dist/client/pt/servicios/index.html pesa 0 bytes
      1   ├─ /pt/index.htmlUncaught exception: workerd/jsg/_virtual_includes/iterator/workerd/jsg/value.h:1480: failed: remote.jsg.Error: [i18n] Lista desalineada: "servicios.list" (lang=pt) tiene 10 ítems de texto y 11 ítems de datos
      1   - /pt/: <COPIA>/log-atm-web-astro/dist/client/pt/index.html pesa 0 bytes
      1 [prerender] 6 página(s) prerenderizada(s) sin HTML válido:
      1   ├─ /index.htmlUncaught exception: workerd/jsg/_virtual_includes/iterator/workerd/jsg/value.h:1480: failed: remote.jsg.Error: [i18n] Lista desalineada: "servicios.list" (lang=es) tiene 10 ítems de texto y 11 ítems de datos
      1   ├─ /en/servicios/index.htmlUncaught exception: workerd/jsg/_virtual_includes/iterator/workerd/jsg/value.h:1480: failed: remote.jsg.Error: [i18n] Lista desalineada: "servicios.list" (lang=en) tiene 10 ítems de texto y 11 ítems de datos
      1   - /en/servicios/: <COPIA>/log-atm-web-astro/dist/client/en/servicios/index.html pesa 0 bytes
      1   ├─ /en/index.htmlUncaught exception: workerd/jsg/_virtual_includes/iterator/workerd/jsg/value.h:1480: failed: remote.jsg.Error: [i18n] Lista desalineada: "servicios.list" (lang=en) tiene 10 ítems de texto y 11 ítems de datos
      1   - /en/: <COPIA>/log-atm-web-astro/dist/client/en/index.html pesa 0 bytes
      1   - /: <COPIA>/log-atm-web-astro/dist/client/index.html pesa 0 bytes
mutacion=servicios.list sin ultimo item en es,en,pt comando=build:ci exit=1
```
<!-- evidencia:fin verify-report.9 -->

`throw` en el render de una página:

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"archivo","argv":null,"texto":"# Mutación: un throw en el render de /pt/contacto (frontmatter de [lang]/contacto.astro, solo lang=pt); npm run build debe salir 1.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nD=$(mktemp -d \"$T/mut.XXXXXXXX\")\ncase \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive HEAD | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\"\nF=src/pages/[lang]/contacto.astro\nsed -n 1,25p \"$F\" | head -25 \u003e \"$D/head.txt\"\npython3 -I - \"$F\" <<'PY'\nimport sys,re\np=sys.argv[1]\ns=open(p,encoding='utf8').read()\ni=s.index('---\\n')+4\nj=s.index('\\n---', i)\ns=s[:j]+\"\\nif (Astro.params.lang === 'pt') { throw new Error('MUTACION-RENDER'); }\"+s[j:]\nopen(p,'w',encoding='utf8').write(s)\nPY\nnpm run build \u003e \"$D/out.log\" 2\u003e&1\nRC=$?\n/usr/bin/grep -E \"MUTACION-RENDER|\\[prerender\\]|^  - /|Complete!\" \"$D/out.log\" | sed -E \"s#$D#<COPIA\u003e#g; s/[0-9]{2}:[0-9]{2}:[0-9]{2} //g\" | sort | uniq -c | sort -rn | head -30\necho \"mutacion=throw en render de /pt/contacto comando=build exit=$RC\"\nrm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:19:08-03:00","exit":0,"sha256":"d5b107c314719474a02a3981c0df52fbc1782ba5edb57c822d85d4675fa8338e","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.10`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:19:08-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Mutación: un throw en el render de /pt/contacto (frontmatter de [lang]/contacto.astro, solo lang=pt); npm run build debe salir 1.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
D=$(mktemp -d "$T/mut.XXXXXXXX")
case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive HEAD | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro"
F=src/pages/[lang]/contacto.astro
sed -n 1,25p "$F" | head -25 > "$D/head.txt"
python3 -I - "$F" <<'PY'
import sys,re
p=sys.argv[1]
s=open(p,encoding='utf8').read()
i=s.index('---\n')+4
j=s.index('\n---', i)
s=s[:j]+"\nif (Astro.params.lang === 'pt') { throw new Error('MUTACION-RENDER'); }"+s[j:]
open(p,'w',encoding='utf8').write(s)
PY
npm run build > "$D/out.log" 2>&1
RC=$?
/usr/bin/grep -E "MUTACION-RENDER|\[prerender\]|^  - /|Complete!" "$D/out.log" | sed -E "s#$D#<COPIA>#g; s/[0-9]{2}:[0-9]{2}:[0-9]{2} //g" | sort | uniq -c | sort -rn | head -30
echo "mutacion=throw en render de /pt/contacto comando=build exit=$RC"
rm -rf "$D"
```

```text
      1   ├─ /pt/contacto/index.html[ERROR] Error: MUTACION-RENDER
      1   - /pt/contacto/: <COPIA>/log-atm-web-astro/dist/client/pt/contacto/index.html no contiene <html
      1 [prerender] 1 página(s) prerenderizada(s) sin HTML válido:
mutacion=throw en render de /pt/contacto comando=build exit=1
```
<!-- evidencia:fin verify-report.10 -->

Ruta cuyo `getStaticPaths` no entrega paths:

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"archivo","argv":null,"texto":"# Mutación: getStaticPaths de [lang]/cotizar.astro no entrega ningún path; npm run build debe salir 1.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nD=$(mktemp -d \"$T/mut.XXXXXXXX\")\ncase \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive HEAD | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\"\n/usr/bin/grep -n \"getStaticPaths\" \"src/pages/[lang]/cotizar.astro\"\npython3 -I - <<'PY'\nimport re\np='src/pages/[lang]/cotizar.astro'\ns=open(p,encoding='utf8').read()\nn=len(re.findall(r'export (async )?function getStaticPaths\\(\\)\\s*\\{', s))\ns=re.sub(r'(export (?:async )?function getStaticPaths\\(\\)\\s*\\{)', r'\\1\\n  return [];', s, count=1)\nopen(p,'w',encoding='utf8').write(s)\nprint('getStaticPaths encontrados:', n)\nPY\nnpm run build \u003e \"$D/out.log\" 2\u003e&1\nRC=$?\n/usr/bin/grep -E \"\\[prerender\\]|^  - |Complete!\" \"$D/out.log\" | sed 's/^[0-9:]* //' | head -10\necho \"mutacion=getStaticPaths vacio en [lang]/cotizar comando=build exit=$RC\"\nrm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:18:03-03:00","exit":0,"sha256":"75ee5df20099e602c5c93fd8588da08103243b650b50b41c23610899676a7212","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.8`** · exit 0 · 5 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:18:03-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Mutación: getStaticPaths de [lang]/cotizar.astro no entrega ningún path; npm run build debe salir 1.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
D=$(mktemp -d "$T/mut.XXXXXXXX")
case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive HEAD | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro"
/usr/bin/grep -n "getStaticPaths" "src/pages/[lang]/cotizar.astro"
python3 -I - <<'PY'
import re
p='src/pages/[lang]/cotizar.astro'
s=open(p,encoding='utf8').read()
n=len(re.findall(r'export (async )?function getStaticPaths\(\)\s*\{', s))
s=re.sub(r'(export (?:async )?function getStaticPaths\(\)\s*\{)', r'\1\n  return [];', s, count=1)
open(p,'w',encoding='utf8').write(s)
print('getStaticPaths encontrados:', n)
PY
npm run build > "$D/out.log" 2>&1
RC=$?
/usr/bin/grep -E "\[prerender\]|^  - |Complete!" "$D/out.log" | sed 's/^[0-9:]* //' | head -10
echo "mutacion=getStaticPaths vacio en [lang]/cotizar comando=build exit=$RC"
rm -rf "$D"
```

```text
5:export function getStaticPaths() {
getStaticPaths encontrados: 1
[prerender] 1 página(s) prerenderizada(s) sin HTML válido:
 - /[lang]/cotizar (src/pages/[lang]/cotizar.astro): sin paths de getStaticPaths
mutacion=getStaticPaths vacio en [lang]/cotizar comando=build exit=1
```
<!-- evidencia:fin verify-report.8 -->

Página esperada que no existe en `dist/client`:

<!-- evidencia:inicio {"v":1,"id":"verify-report.29","forma":"archivo","argv":null,"texto":"# Mutación: una integración añadida ANTES de la guarda borra dist/client/servicios/index.html en astro:build:done; npm run build debe salir 1 y la guarda debe nombrar /servicios/ como inexistente.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nD=$(mktemp -d \"$T/mut.XXXXXXXX\")\ncase \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive HEAD | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\"\npython3 -I - <<'PY'\np='astro.config.mjs'\ns=open(p,encoding='utf8').read()\ns=s.replace(\"export default defineConfig({\",\"\"\"function borraServicios() {\n  return { name: 'mut:borra', hooks: { 'astro:build:done': ({ dir }) =\u003e { unlinkSync(fileURLToPath(new URL('./servicios/index.html', dir))); } } };\n}\n\nexport default defineConfig({\"\"\",1)\ns=s.replace(\"import { existsSync, readFileSync, statSync } from 'node:fs';\",\"import { existsSync, readFileSync, statSync, unlinkSync } from 'node:fs';\",1)\ns=s.replace(\"    prerenderOutputGuard(),\",\"    borraServicios(),\\n    prerenderOutputGuard(),\",1)\nopen(p,'w',encoding='utf8').write(s)\nPY\nnpm run build \u003e \"$D/out.log\" 2\u003e&1\nRC=$?\n/usr/bin/grep -E \"\\[prerender\\]|^  - /|Complete!\" \"$D/out.log\" | sed -E \"s#$D#<COPIA\u003e#g; s/[0-9]{2}:[0-9]{2}:[0-9]{2} //g\" | head -10\necho \"mutacion=index.html de /servicios/ inexistente comando=build exit=$RC\"\nrm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:27:04-03:00","exit":0,"sha256":"bb31cc96ad7a2d213631457d826d3571dbd7be76c1b70a7aa190ef9f3c4f3217","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.29`** · exit 0 · 3 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:27:04-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Mutación: una integración añadida ANTES de la guarda borra dist/client/servicios/index.html en astro:build:done; npm run build debe salir 1 y la guarda debe nombrar /servicios/ como inexistente.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
D=$(mktemp -d "$T/mut.XXXXXXXX")
case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive HEAD | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro"
python3 -I - <<'PY'
p='astro.config.mjs'
s=open(p,encoding='utf8').read()
s=s.replace("export default defineConfig({","""function borraServicios() {
  return { name: 'mut:borra', hooks: { 'astro:build:done': ({ dir }) => { unlinkSync(fileURLToPath(new URL('./servicios/index.html', dir))); } } };
}

export default defineConfig({""",1)
s=s.replace("import { existsSync, readFileSync, statSync } from 'node:fs';","import { existsSync, readFileSync, statSync, unlinkSync } from 'node:fs';",1)
s=s.replace("    prerenderOutputGuard(),","    borraServicios(),\n    prerenderOutputGuard(),",1)
open(p,'w',encoding='utf8').write(s)
PY
npm run build > "$D/out.log" 2>&1
RC=$?
/usr/bin/grep -E "\[prerender\]|^  - /|Complete!" "$D/out.log" | sed -E "s#$D#<COPIA>#g; s/[0-9]{2}:[0-9]{2}:[0-9]{2} //g" | head -10
echo "mutacion=index.html de /servicios/ inexistente comando=build exit=$RC"
rm -rf "$D"
```

```text
[prerender] 1 página(s) prerenderizada(s) sin HTML válido:
  - /servicios/: no existe <COPIA>/log-atm-web-astro/dist/client/servicios/index.html
mutacion=index.html de /servicios/ inexistente comando=build exit=1
```
<!-- evidencia:fin verify-report.29 -->

Quitar un ítem solo en `en.json` hace fallar la validación de traducciones:

<!-- evidencia:inicio {"v":1,"id":"verify-report.23","forma":"archivo","argv":null,"texto":"# Mutación: se quita el último ítem de servicios.list solo en en.json; npm run validate-i18n debe salir distinto de 0 y nombrar idioma y clave.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nD=$(mktemp -d \"$T/mut.XXXXXXXX\")\ncase \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive HEAD | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\"\npython3 -I -c \"\nimport json\np='src/i18n/translations/en.json'\nd=json.load(open(p,encoding='utf8'))\nd['servicios']['list'].pop()\njson.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=2)\n\"\nnpm run validate-i18n \u003e \"$D/out.log\" 2\u003e&1\nRC=$?\nsed \"s#$D#<COPIA\u003e#g\" \"$D/out.log\" | head -15\necho \"mutacion=servicios.list sin ultimo item solo en en.json comando=validate-i18n exit=$RC\"\nrm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:24:26-03:00","exit":0,"sha256":"978892bc076994ae15cd10ad47e071c8c19b9a667dac5cfe55189b2d49403fd9","lineas":8,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.23`** · exit 0 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:24:26-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Mutación: se quita el último ítem de servicios.list solo en en.json; npm run validate-i18n debe salir distinto de 0 y nombrar idioma y clave.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
D=$(mktemp -d "$T/mut.XXXXXXXX")
case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive HEAD | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro"
python3 -I -c "
import json
p='src/i18n/translations/en.json'
d=json.load(open(p,encoding='utf8'))
d['servicios']['list'].pop()
json.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=2)
"
npm run validate-i18n > "$D/out.log" 2>&1
RC=$?
sed "s#$D#<COPIA>#g" "$D/out.log" | head -15
echo "mutacion=servicios.list sin ultimo item solo en en.json comando=validate-i18n exit=$RC"
rm -rf "$D"
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: FAIL
  - missing: servicios.list.10.title, servicios.list.10.desc, servicios.list.10.tag
[i18n] pt: OK (535 claves)
mutacion=servicios.list sin ultimo item solo en en.json comando=validate-i18n exit=1
```
<!-- evidencia:fin verify-report.23 -->

### Alcance de la guarda: rutas prerenderizadas y bajo demanda

La guarda cubre las páginas HTML prerenderizadas (seis rutas por idioma): la séptima página que mencionan las specs es la 404, que se renderiza bajo demanda (`prerender = false`, ADR-0007) junto con los tres endpoints de `api/`. `robots.txt` es un endpoint prerenderizado, no una página, y su existencia y contenido se comprueban aparte. El bloque instrumentado muestra las rutas del proyecto, los paths que la guarda trata como esperados y su igualdad con los `index.html` de `dist/client` y con los de la línea base:

<!-- evidencia:inicio {"v":1,"id":"verify-report.26","forma":"archivo","argv":null,"texto":"# Cobertura de la guarda: copia aislada con la guarda instrumentada para imprimir (a) las rutas que Astro resuelve con su prerender y (b) los paths esperados; se contrasta con los index.html de dist/client y con los de la línea base.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nD=$(mktemp -d \"$T/mut.XXXXXXXX\")\ncase \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive HEAD | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\"\npython3 -I - <<'PY'\np='astro.config.mjs'\ns=open(p,encoding='utf8').read()\ns=s.replace(\"        prerenderedPageRoutes = routes.filter(\",\"        for (const r of routes) console.log('RUTA', r.type, r.isPrerendered ? 'prerender' : 'bajo-demanda', r.origin, r.pattern);\\n        prerenderedPageRoutes = routes.filter(\",1)\ns=s.replace(\"        const failures = [];\",\"        const failures = [];\\n        console.log('ESPERADAS', pages.map(({ pathname }) =\u003e `/${pathname}`).sort().join(' '));\",1)\nopen(p,'w',encoding='utf8').write(s)\nPY\nnpm run build \u003e \"$D/out.log\" 2\u003e&1\necho \"build exit=$?\"\necho \"rutas resueltas del proyecto:\"\n/usr/bin/grep -E '^RUTA .* project ' \"$D/out.log\" | sort -u\nEXP=$(/usr/bin/grep '^ESPERADAS' \"$D/out.log\" | sed 's/^ESPERADAS //' | tr ' ' '\\n' | sed 's#/$##' | sort)\nDIST=$(cd dist/client && find . -name index.html | sed 's#^\\.##; s#/index.html$##' | sort)\nBASEDIST=$(cd \"$(cat $T/base-path.txt)/log-atm-web-astro/dist/client\" && find . -name index.html | sed 's#^\\.##; s#/index.html$##' | sort)\necho \"paginas esperadas por la guarda: $(echo \"$EXP\" | wc -l)\"\necho \"index.html en dist/client (copia): $(echo \"$DIST\" | wc -l); en la linea base: $(echo \"$BASEDIST\" | wc -l)\"\n[ \"$EXP\" = \"$DIST\" ] && echo \"esperadas == index.html de dist/client: SI\" || echo \"esperadas == index.html de dist/client: NO\"\n[ \"$DIST\" = \"$BASEDIST\" ] && echo \"index.html final == linea base: SI\" || echo \"index.html final == linea base: NO\"\necho \"rutas esperadas:\"; echo \"$EXP\" | sed 's#^$#(home es)#' | tr '\\n' ' '; echo\nrm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:25:40-03:00","exit":0,"sha256":"e8da307544c7e9dd6cf9d0c3c17deddbd8d910873f1a097b33f9030d9650384f","lineas":25,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.26`** · exit 0 · 25 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:25:40-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Cobertura de la guarda: copia aislada con la guarda instrumentada para imprimir (a) las rutas que Astro resuelve con su prerender y (b) los paths esperados; se contrasta con los index.html de dist/client y con los de la línea base.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
D=$(mktemp -d "$T/mut.XXXXXXXX")
case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive HEAD | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro"
python3 -I - <<'PY'
p='astro.config.mjs'
s=open(p,encoding='utf8').read()
s=s.replace("        prerenderedPageRoutes = routes.filter(","        for (const r of routes) console.log('RUTA', r.type, r.isPrerendered ? 'prerender' : 'bajo-demanda', r.origin, r.pattern);\n        prerenderedPageRoutes = routes.filter(",1)
s=s.replace("        const failures = [];","        const failures = [];\n        console.log('ESPERADAS', pages.map(({ pathname }) => `/${pathname}`).sort().join(' '));",1)
open(p,'w',encoding='utf8').write(s)
PY
npm run build > "$D/out.log" 2>&1
echo "build exit=$?"
echo "rutas resueltas del proyecto:"
/usr/bin/grep -E '^RUTA .* project ' "$D/out.log" | sort -u
EXP=$(/usr/bin/grep '^ESPERADAS' "$D/out.log" | sed 's/^ESPERADAS //' | tr ' ' '\n' | sed 's#/$##' | sort)
DIST=$(cd dist/client && find . -name index.html | sed 's#^\.##; s#/index.html$##' | sort)
BASEDIST=$(cd "$(cat $T/base-path.txt)/log-atm-web-astro/dist/client" && find . -name index.html | sed 's#^\.##; s#/index.html$##' | sort)
echo "paginas esperadas por la guarda: $(echo "$EXP" | wc -l)"
echo "index.html en dist/client (copia): $(echo "$DIST" | wc -l); en la linea base: $(echo "$BASEDIST" | wc -l)"
[ "$EXP" = "$DIST" ] && echo "esperadas == index.html de dist/client: SI" || echo "esperadas == index.html de dist/client: NO"
[ "$DIST" = "$BASEDIST" ] && echo "index.html final == linea base: SI" || echo "index.html final == linea base: NO"
echo "rutas esperadas:"; echo "$EXP" | sed 's#^$#(home es)#' | tr '\n' ' '; echo
rm -rf "$D"
```

```text
build exit=0
rutas resueltas del proyecto:
RUTA endpoint bajo-demanda project /api/contacto
RUTA endpoint bajo-demanda project /api/cotizacion
RUTA endpoint bajo-demanda project /api/cotizacion-rapida
RUTA endpoint prerender project /robots.txt
RUTA page bajo-demanda project /404
RUTA page prerender project /
RUTA page prerender project /contacto
RUTA page prerender project /cotizar
RUTA page prerender project /industrias
RUTA page prerender project /[lang]
RUTA page prerender project /[lang]/contacto
RUTA page prerender project /[lang]/cotizar
RUTA page prerender project /[lang]/industrias
RUTA page prerender project /[lang]/nosotros
RUTA page prerender project /[lang]/servicios
RUTA page prerender project /nosotros
RUTA page prerender project /servicios
paginas esperadas por la guarda: 18
index.html en dist/client (copia): 18; en la linea base: 18
esperadas == index.html de dist/client: SI
index.html final == linea base: SI
rutas esperadas:
(home es) /contacto /cotizar /en /en/contacto /en/cotizar /en/industrias /en/nosotros /en/servicios /industrias /nosotros /pt /pt/contacto /pt/cotizar /pt/industrias /pt/nosotros /pt/servicios /servicios 
```
<!-- evidencia:fin verify-report.26 -->

La 404 se sirve bajo demanda con `astro preview`; no emite canonical y su único host es `www`:

<!-- evidencia:inicio {"v":1,"id":"verify-report.27","forma":"archivo","argv":null,"texto":"# Páginas bajo demanda (404): se sirven con astro preview y se busca el host sin www en la respuesta.\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro\nPORT=4392\nnpx astro preview --port $PORT \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/preview2.log 2\u003e&1 &\nPID=$!\nfor i in $(seq 1 40); do curl -s -o /dev/null http://localhost:$PORT/ && break; sleep 0.5; done\nfor p in no-existe en/no-existe pt/no-existe; do\n  curl -s http://localhost:$PORT/$p \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/nf.html\n  echo \"/$p: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/$p) | hosts: $(/usr/bin/grep -oE 'https?://[A-Za-z.]*logatm\\.com' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/nf.html | sort -u | tr '\\n' ' ') | robots: $(/usr/bin/grep -oE '<meta name=\"robots\" content=\"[^\"]*\"' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/nf.html) | canonical: $(/usr/bin/grep -c 'rel=\"canonical\"' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/nf.html)\"\ndone\nkill $PID 2\u003e/dev/null; sleep 1; pkill -P $PID 2\u003e/dev/null\necho \"servidor tras cerrar: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:25:43-03:00","exit":0,"sha256":"3ca67c62f2b7bf3227915aa69fbe97a25f8156d9d5c06481e667d1a270adc870","lineas":4,"omitidas":0,"no_recomprobable":"levanta un servidor local en un puerto fijo; comprobar no lo repite"} -->
**Evidencia `verify-report.27`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:25:43-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`
No re-comprobable: levanta un servidor local en un puerto fijo; comprobar no lo repite

```bash
# Páginas bajo demanda (404): se sirven con astro preview y se busca el host sin www en la respuesta.
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro
PORT=4392
npx astro preview --port $PORT > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/preview2.log 2>&1 &
PID=$!
for i in $(seq 1 40); do curl -s -o /dev/null http://localhost:$PORT/ && break; sleep 0.5; done
for p in no-existe en/no-existe pt/no-existe; do
  curl -s http://localhost:$PORT/$p > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/nf.html
  echo "/$p: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/$p) | hosts: $(/usr/bin/grep -oE 'https?://[A-Za-z.]*logatm\.com' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/nf.html | sort -u | tr '\n' ' ') | robots: $(/usr/bin/grep -oE '<meta name="robots" content="[^"]*"' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/nf.html) | canonical: $(/usr/bin/grep -c 'rel="canonical"' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/nf.html)"
done
kill $PID 2>/dev/null; sleep 1; pkill -P $PID 2>/dev/null
echo "servidor tras cerrar: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/)"
```

```text
/no-existe: 404 | hosts: https://www.logatm.com  | robots: <meta name="robots" content="noindex, nofollow" | canonical: 0
/en/no-existe: 404 | hosts: https://www.logatm.com  | robots: <meta name="robots" content="noindex, nofollow" | canonical: 0
/pt/no-existe: 404 | hosts: https://www.logatm.com  | robots: <meta name="robots" content="noindex, nofollow" | canonical: 0
servidor tras cerrar: 000
```
<!-- evidencia:fin verify-report.27 -->

Ninguna página esperada queda fuera de la guarda ni del diff: el conjunto de la guarda, el de `dist/client` y el de la línea base coinciden.

## Robots

<!-- evidencia:inicio {"v":1,"id":"verify-report.25","forma":"archivo","argv":null,"texto":"# Sirve dist/ con astro preview (workerd) en un puerto libre y pide /robots.txt; baja el servidor al terminar.\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro\nPORT=4391\nnpx astro preview --port $PORT \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/preview.log 2\u003e&1 &\nPID=$!\nfor i in $(seq 1 40); do curl -s -o /dev/null http://localhost:$PORT/ && break; sleep 0.5; done\necho \"GET /robots.txt:\"; curl -s -D - http://localhost:$PORT/robots.txt | /usr/bin/grep -iE '^(HTTP|content-type)|^Sitemap|^User-agent|^Allow'\necho \"GET /sitemap-index.xml: $(curl -s -o /dev/null -w '%{http_code} %{content_type}' http://localhost:$PORT/sitemap-index.xml)\"\necho \"GET /en/no-existe: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/en/no-existe)\"\necho \"GET /pt/no-existe: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/pt/no-existe)\"\nkill $PID 2\u003e/dev/null; sleep 1; pkill -P $PID 2\u003e/dev/null\necho \"servidor en el puerto $PORT tras cerrar: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/robots.txt)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:24:29-03:00","exit":0,"sha256":"88cf70374f32a15246f5521537c20124a00c4f036c85ff60304488e3d3f847a6","lineas":10,"omitidas":0,"no_recomprobable":"levanta un servidor local en un puerto fijo; comprobar no lo repite"} -->
**Evidencia `verify-report.25`** · exit 0 · 10 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:24:29-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`
No re-comprobable: levanta un servidor local en un puerto fijo; comprobar no lo repite

```bash
# Sirve dist/ con astro preview (workerd) en un puerto libre y pide /robots.txt; baja el servidor al terminar.
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro
PORT=4391
npx astro preview --port $PORT > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/preview.log 2>&1 &
PID=$!
for i in $(seq 1 40); do curl -s -o /dev/null http://localhost:$PORT/ && break; sleep 0.5; done
echo "GET /robots.txt:"; curl -s -D - http://localhost:$PORT/robots.txt | /usr/bin/grep -iE '^(HTTP|content-type)|^Sitemap|^User-agent|^Allow'
echo "GET /sitemap-index.xml: $(curl -s -o /dev/null -w '%{http_code} %{content_type}' http://localhost:$PORT/sitemap-index.xml)"
echo "GET /en/no-existe: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/en/no-existe)"
echo "GET /pt/no-existe: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/pt/no-existe)"
kill $PID 2>/dev/null; sleep 1; pkill -P $PID 2>/dev/null
echo "servidor en el puerto $PORT tras cerrar: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$PORT/robots.txt)"
```

```text
GET /robots.txt:
HTTP/1.1 200 OK�
content-type: text/plain; charset=utf-8�
User-agent: *
Allow: /
Sitemap: https://www.logatm.com/sitemap-index.xml
GET /sitemap-index.xml: 200 application/xml
GET /en/no-existe: 404
GET /pt/no-existe: 404
servidor en el puerto 4391 tras cerrar: 000
```
<!-- evidencia:fin verify-report.25 -->

## Tests

El repo no tiene corredor de tests (perfil y `tasks.md`); la verificación es la que declara el perfil más las mutaciones de arriba. La corrida completa de la fase es el build del árbol final (`verify-report.1`), y los chequeos del repo sobre el árbol final son:

- `npm run check`:

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"argv","argv":["npm","run","check"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:19:30-03:00","exit":0,"sha256":"92b7ce7ca3c1c0de0a98e3de6766d6a43daa0e4e4fa605aa2e7182d87fd46dd2","lineas":13,"omitidas":0,"no_recomprobable":"chequeo propio de verify; comprobar no lo repite"} -->
**Evidencia `verify-report.11`** · exit 0 · 13 líneas, 0 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:19:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: chequeo propio de verify; comprobar no lo repite

```text
npm run check
```

```text

> log-atm-web-astro@0.0.1 check
> astro check

17:19:24 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
17:19:24 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
17:19:26 [types] Generated 1.31s
17:19:26 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro...
Result (53 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin verify-report.11 -->

- `npm run validate-i18n`:

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:19:30-03:00","exit":0,"sha256":"00b9e7a520ec37193c9a6ead0655e90e876ce13220b31be0eb255b64d15913f4","lineas":6,"omitidas":0,"no_recomprobable":"chequeo propio de verify; comprobar no lo repite"} -->
**Evidencia `verify-report.12`** · exit 0 · 6 líneas, 0 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:19:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: chequeo propio de verify; comprobar no lo repite

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (535 claves)
[i18n] pt: OK (535 claves)
```
<!-- evidencia:fin verify-report.12 -->

- `npm run check-i18n-links`:

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:19:31-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":"chequeo propio de verify; comprobar no lo repite"} -->
**Evidencia `verify-report.13`** · exit 0 · 5 líneas, 0 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:19:31-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: chequeo propio de verify; comprobar no lo repite

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin verify-report.13 -->

- `npm run measure:images`, árbol final y línea base (idénticos, el cambio no toca imágenes):

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"argv","argv":["npm","run","measure:images"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:19:31-03:00","exit":0,"sha256":"d74fc25ae3d127cf34765cbefeda2444ccb00b452b038c222e7c840fac64738b","lineas":6,"omitidas":0,"no_recomprobable":"chequeo propio de verify; comprobar no lo repite"} -->
**Evidencia `verify-report.14`** · exit 0 · 6 líneas, 0 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:19:31-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: chequeo propio de verify; comprobar no lo repite

```text
npm run measure:images
```

```text

> log-atm-web-astro@0.0.1 measure:images
> node scripts/measure-home-image-weight.mjs

escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"argv","argv":["npm","run","measure:images"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/base.WZa4E08E/log-atm-web-astro","head":null,"fecha":"2026-10-08T17:19:35-03:00","exit":0,"sha256":"d74fc25ae3d127cf34765cbefeda2444ccb00b452b038c222e7c840fac64738b","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.15`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:19:35-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/base.WZa4E08E/log-atm-web-astro`

```text
npm run measure:images
```

```text

> log-atm-web-astro@0.0.1 measure:images
> node scripts/measure-home-image-weight.mjs

escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
```
<!-- evidencia:fin verify-report.15 -->

- `npm run a11y` (Chrome local, `astro preview` propio de la auditoría; ningún servidor queda levantado):

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"argv","argv":["npm","run","a11y"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:20:00-03:00","exit":0,"sha256":"993baf4aa3dc9a3f99ad11d35dc963408a496e012235d3c7ac9a3ca954bacc03","lineas":7,"omitidas":0,"no_recomprobable":"auditoría en navegador real sobre dist/ del último build; comprobar no la repite"} -->
**Evidencia `verify-report.16`** · exit 0 · 7 líneas, 0 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:20:00-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: auditoría en navegador real sobre dist/ del último build; comprobar no la repite

```text
npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 0 violaciones en 0 reglas · 0 estados HTTP inesperados
```
<!-- evidencia:fin verify-report.16 -->

Los cinco chequeos obligatorios terminan en exit 0.

**Cobertura**: no hay instrumento de cobertura en el repo.

## Identidad: cambio de un dato en su fuente

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"archivo","argv":null,"texto":"# Mutación: se cambian nombre, URL, teléfono, email y dirección SOLO en src/lib/site.ts; el build debe reflejarlos en todas las señales y no dejar los valores viejos.\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nD=$(mktemp -d \"$T/mut.XXXXXXXX\")\ncase \"$(realpath \"$D\")\" in \"$W\"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo \"DEST dentro del repo\"; exit 9;; esac\ngit -C \"$W\" archive HEAD | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\"\nsed -i \"s#name: 'LOG ATM'#name: 'ZZNOMBRE'#; s#https://www.logatm.com#https://www.zzhost.test#; s#+56982708492#+56911112222#; s#+56 9 8270 8492#+56 9 1111 2222#; s#contacto@logatm.com#zzmail@zzhost.test#; s#Av. Pdte Kennedy 5600, Of. 507#ZZCalle 999#; s#Vitacura#ZZComuna#; s#'Santiago'#'ZZCiudad'#\" src/lib/site.ts\nnpm run build \u003e \"$D/out.log\" 2\u003e&1\necho \"build exit=$?\"\nC=dist/client; S=dist/server\necho \"viejos en dist/client (esperado 0 archivos):\"\nfor v in \"56982708492\" \"8270 8492\" \"Kennedy\" \"https://www.logatm.com\" \"contacto@logatm.com\"; do echo \"  '$v': $(/usr/bin/grep -rlF -- \"$v\" $C | wc -l) archivos client, $(/usr/bin/grep -rlF -- \"$v\" $S | wc -l) archivos server\"; done\necho \"'LOG ATM' como nombre de marca en client (navbar/footer/og:site_name/JSON-LD): $(/usr/bin/grep -rhoE 'nav__brand-name[^\u003e]*\u003eLOG ATM|og:site_name\" content=\"LOG ATM|\"name\":\"LOG ATM\"' $C --include=index.html | wc -l)\"\necho \"archivos de dist/server con contacto@logatm.com: $(/usr/bin/grep -rlF \"contacto@logatm.com\" $S | sed \"s#^dist/server/##\" | tr \"\\n\" \" \")\"\necho \"nuevos en dist/client:\"\necho \"  canonical con host nuevo: $(/usr/bin/grep -c 'rel=\"canonical\" href=\"https://www.zzhost.test/' $C/index.html)\"\necho \"  og:url/og:image host nuevo: $(/usr/bin/grep -oE 'og:(url|image)\" content=\"https://www.zzhost.test' $C/index.html | wc -l)\"\necho \"  robots: $(/usr/bin/grep Sitemap $C/robots.txt)\"\necho \"  sitemap-index: $(/usr/bin/grep -oE 'https://www.zzhost.test/sitemap-0.xml' $C/sitemap-index.xml | head -1)\"\necho \"  footer/contacto teléfono: $(/usr/bin/grep -oF '+56 9 1111 2222' $C/contacto/index.html | wc -l) en contacto, $(/usr/bin/grep -oF '+56 9 1111 2222' $C/index.html | wc -l) en home\"\necho \"  WhatsApp wa.me/56911112222: $(/usr/bin/grep -oF 'wa.me/56911112222' $C/index.html $C/contacto/index.html $C/cotizar/index.html | wc -l) enlaces\"\necho \"  dirección ZZCalle 999 en footer(home)/contacto: $(/usr/bin/grep -oF 'ZZCalle 999' $C/index.html | wc -l)/$(/usr/bin/grep -oF 'ZZCalle 999' $C/contacto/index.html | wc -l)\"\necho \"  JSON-LD ZZCalle/ZZNOMBRE en home: $(/usr/bin/grep -oE '\"streetAddress\":\"ZZCalle 999\"|\"name\":\"ZZNOMBRE\"|\"telephone\":\"\\+56911112222\"|\"email\":\"zzmail@zzhost.test\"' $C/index.html | sort -u | wc -l) de 4 claves\"\necho \"  correo (worker): ZZNOMBRE=$(/usr/bin/grep -rlF 'ZZNOMBRE' $S | wc -l) archivos, ZZCiudad=$(/usr/bin/grep -rlF 'ZZCiudad' $S | wc -l) archivos\"\nrm -rf \"$D\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:23:26-03:00","exit":0,"sha256":"664096e8cafa767e1f18dacda13391eeacf4f84e8a4ff536d9df18298f5e8213","lineas":19,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.17`** · exit 0 · 19 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:23:26-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Mutación: se cambian nombre, URL, teléfono, email y dirección SOLO en src/lib/site.ts; el build debe reflejarlos en todas las señales y no dejar los valores viejos.
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
D=$(mktemp -d "$T/mut.XXXXXXXX")
case "$(realpath "$D")" in "$W"/*|/home/kapridoo/projects/log-atm-web-astro/*) echo "DEST dentro del repo"; exit 9;; esac
git -C "$W" archive HEAD | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro"
sed -i "s#name: 'LOG ATM'#name: 'ZZNOMBRE'#; s#https://www.logatm.com#https://www.zzhost.test#; s#+56982708492#+56911112222#; s#+56 9 8270 8492#+56 9 1111 2222#; s#contacto@logatm.com#zzmail@zzhost.test#; s#Av. Pdte Kennedy 5600, Of. 507#ZZCalle 999#; s#Vitacura#ZZComuna#; s#'Santiago'#'ZZCiudad'#" src/lib/site.ts
npm run build > "$D/out.log" 2>&1
echo "build exit=$?"
C=dist/client; S=dist/server
echo "viejos en dist/client (esperado 0 archivos):"
for v in "56982708492" "8270 8492" "Kennedy" "https://www.logatm.com" "contacto@logatm.com"; do echo "  '$v': $(/usr/bin/grep -rlF -- "$v" $C | wc -l) archivos client, $(/usr/bin/grep -rlF -- "$v" $S | wc -l) archivos server"; done
echo "'LOG ATM' como nombre de marca en client (navbar/footer/og:site_name/JSON-LD): $(/usr/bin/grep -rhoE 'nav__brand-name[^>]*>LOG ATM|og:site_name" content="LOG ATM|"name":"LOG ATM"' $C --include=index.html | wc -l)"
echo "archivos de dist/server con contacto@logatm.com: $(/usr/bin/grep -rlF "contacto@logatm.com" $S | sed "s#^dist/server/##" | tr "\n" " ")"
echo "nuevos en dist/client:"
echo "  canonical con host nuevo: $(/usr/bin/grep -c 'rel="canonical" href="https://www.zzhost.test/' $C/index.html)"
echo "  og:url/og:image host nuevo: $(/usr/bin/grep -oE 'og:(url|image)" content="https://www.zzhost.test' $C/index.html | wc -l)"
echo "  robots: $(/usr/bin/grep Sitemap $C/robots.txt)"
echo "  sitemap-index: $(/usr/bin/grep -oE 'https://www.zzhost.test/sitemap-0.xml' $C/sitemap-index.xml | head -1)"
echo "  footer/contacto teléfono: $(/usr/bin/grep -oF '+56 9 1111 2222' $C/contacto/index.html | wc -l) en contacto, $(/usr/bin/grep -oF '+56 9 1111 2222' $C/index.html | wc -l) en home"
echo "  WhatsApp wa.me/56911112222: $(/usr/bin/grep -oF 'wa.me/56911112222' $C/index.html $C/contacto/index.html $C/cotizar/index.html | wc -l) enlaces"
echo "  dirección ZZCalle 999 en footer(home)/contacto: $(/usr/bin/grep -oF 'ZZCalle 999' $C/index.html | wc -l)/$(/usr/bin/grep -oF 'ZZCalle 999' $C/contacto/index.html | wc -l)"
echo "  JSON-LD ZZCalle/ZZNOMBRE en home: $(/usr/bin/grep -oE '"streetAddress":"ZZCalle 999"|"name":"ZZNOMBRE"|"telephone":"\+56911112222"|"email":"zzmail@zzhost.test"' $C/index.html | sort -u | wc -l) de 4 claves"
echo "  correo (worker): ZZNOMBRE=$(/usr/bin/grep -rlF 'ZZNOMBRE' $S | wc -l) archivos, ZZCiudad=$(/usr/bin/grep -rlF 'ZZCiudad' $S | wc -l) archivos"
rm -rf "$D"
```

```text
build exit=0
viejos en dist/client (esperado 0 archivos):
  '56982708492': 0 archivos client, 0 archivos server
  '8270 8492': 0 archivos client, 0 archivos server
  'Kennedy': 0 archivos client, 0 archivos server
  'https://www.logatm.com': 0 archivos client, 0 archivos server
  'contacto@logatm.com': 0 archivos client, 1 archivos server
'LOG ATM' como nombre de marca en client (navbar/footer/og:site_name/JSON-LD): 0
archivos de dist/server con contacto@logatm.com: wrangler.json 
nuevos en dist/client:
  canonical con host nuevo: 1
  og:url/og:image host nuevo: 2
  robots: Sitemap: https://www.zzhost.test/sitemap-index.xml
  sitemap-index: https://www.zzhost.test/sitemap-0.xml
  footer/contacto teléfono: 3 en contacto, 1 en home
  WhatsApp wa.me/56911112222: 7 enlaces
  dirección ZZCalle 999 en footer(home)/contacto: 2/3
  JSON-LD ZZCalle/ZZNOMBRE en home: 4 de 4 claves
  correo (worker): ZZNOMBRE=1 archivos, ZZCiudad=1 archivos
```
<!-- evidencia:fin verify-report.17 -->

## Política de color y datos

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"argv","argv":["python3","-I","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/s/tokens-check.py"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:23:54-03:00","exit":0,"sha256":"b0a38d21b7fecc84678c145905252a9594b0aba546978f0af784de36e1f3b78e","lineas":9,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.21`** · exit 0 · 9 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:23:54-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```text
python3 -I /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s/s/tokens-check.py
```

```text
tokens :root=85 @theme=74 | repetidos dentro de :root=[] | dentro de @theme=[]
colores con valor distinto entre :root y @theme: []
--opacity- en src+DESIGN.md: 0
whatsapp-hover-dark en src+DESIGN.md: 0
sombras en :root: ['--shadow-cta', '--shadow-lg', '--shadow-md', '--shadow-sm', '--shadow-xl'] | sombras en @theme: []
radios en :root=10 @theme=10
consumos var(--shadow-*): 11 | var(--radius-*): 53
tokens whatsapp: {'--color-whatsapp': '#25D366', '--color-whatsapp-hover': '#1da851', '--color-whatsapp-text': '#111b21'}
pares evaluados: 42, que difieren de DESIGN.md: 0
```
<!-- evidencia:fin verify-report.21 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"archivo","argv":null,"texto":"# Colores literales por archivo: cantidad en el commit base vs árbol final (fuera de tokens.css y email-templates.ts, que declaran su propia regla).\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot\nBASE=e9d68aeda82ebb3cbb7d43264c33c31251ea70ff\nRE='#[0-9a-fA-F]{3,8}\\b|rgba?\\(|hsla?\\('\nn=0\nfor f in $(git -C $W diff --name-only $BASE HEAD -- log-atm-web-astro/src log-atm-web-astro/astro.config.mjs | /usr/bin/grep -vE 'tokens.css|email-templates.ts|\\.json$'); do\n  a=$(git -C $W show $BASE:$f 2\u003e/dev/null | /usr/bin/grep -oE \"$RE\" | wc -l)\n  b=$(git -C $W show HEAD:$f 2\u003e/dev/null | /usr/bin/grep -oE \"$RE\" | wc -l)\n  [ \"$a\" != \"$b\" ] && { echo \"DIFIERE $f base=$a final=$b\"; n=$((n+1)); }\ndone\necho \"archivos con mas o distinta cantidad de literales de color: $n\"\nfor f in log-atm-web-astro/src/lib/email-templates.ts log-atm-web-astro/src/styles/tokens.css; do\n  echo \"$f base=$(git -C $W show $BASE:$f | /usr/bin/grep -oE \"$RE\" | wc -l) final=$(git -C $W show HEAD:$f | /usr/bin/grep -oE \"$RE\" | wc -l)\"\ndone\necho \"colores de INDUSTRIES: base=$(git -C $W show $BASE:log-atm-web-astro/src/lib/constants.ts | /usr/bin/grep -oE \"color: '#[0-9a-fA-F]{6}'\" | tr '\\n' ' ')\"\necho \"colores de INDUSTRIES: final=$(git -C $W show HEAD:log-atm-web-astro/src/lib/constants.ts | /usr/bin/grep -oE \"color: '#[0-9a-fA-F]{6}'\" | tr '\\n' ' ')\"\necho \"comentario de INDUSTRIES:\"; /usr/bin/grep -n -B2 \"export const INDUSTRIES\" $W/log-atm-web-astro/src/lib/constants.ts\necho \"Excepcion de correos en DESIGN.md:\"; /usr/bin/grep -n \"^### Excepcion: plantillas de correo\" $W/log-atm-web-astro/DESIGN.md\necho \"superseded_by -\u003e color-token-policy en las 9 specs:\"\nfor f in sections/cta-styles sections/hero-styles sections/services-styles sections/why-styles sections/industries-styles components/navbar-styles components/footer-styles tokens/create-functional-tokens ui-contrast/contrast-token-single-source; do printf '%s: ' $f; /usr/bin/grep -m1 '^superseded_by:' $W/memory/specs/$f.md; done\necho \"archivos cambiados en src/pages/api y public/manifest.json: $(git -C $W diff --name-only $BASE HEAD -- log-atm-web-astro/src/pages/api log-atm-web-astro/public/manifest.json | wc -l)\"\necho \"public/robots.txt existe: $(test -e $W/log-atm-web-astro/public/robots.txt && echo si || echo no)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:23:26-03:00","exit":0,"sha256":"4d290103b1b7ed6be07394f2def3ba34a784119bde87ba9167fc25b53c057d29","lineas":23,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.18`** · exit 0 · 23 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:23:26-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Colores literales por archivo: cantidad en el commit base vs árbol final (fuera de tokens.css y email-templates.ts, que declaran su propia regla).
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot
BASE=e9d68aeda82ebb3cbb7d43264c33c31251ea70ff
RE='#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\('
n=0
for f in $(git -C $W diff --name-only $BASE HEAD -- log-atm-web-astro/src log-atm-web-astro/astro.config.mjs | /usr/bin/grep -vE 'tokens.css|email-templates.ts|\.json$'); do
  a=$(git -C $W show $BASE:$f 2>/dev/null | /usr/bin/grep -oE "$RE" | wc -l)
  b=$(git -C $W show HEAD:$f 2>/dev/null | /usr/bin/grep -oE "$RE" | wc -l)
  [ "$a" != "$b" ] && { echo "DIFIERE $f base=$a final=$b"; n=$((n+1)); }
done
echo "archivos con mas o distinta cantidad de literales de color: $n"
for f in log-atm-web-astro/src/lib/email-templates.ts log-atm-web-astro/src/styles/tokens.css; do
  echo "$f base=$(git -C $W show $BASE:$f | /usr/bin/grep -oE "$RE" | wc -l) final=$(git -C $W show HEAD:$f | /usr/bin/grep -oE "$RE" | wc -l)"
done
echo "colores de INDUSTRIES: base=$(git -C $W show $BASE:log-atm-web-astro/src/lib/constants.ts | /usr/bin/grep -oE "color: '#[0-9a-fA-F]{6}'" | tr '\n' ' ')"
echo "colores de INDUSTRIES: final=$(git -C $W show HEAD:log-atm-web-astro/src/lib/constants.ts | /usr/bin/grep -oE "color: '#[0-9a-fA-F]{6}'" | tr '\n' ' ')"
echo "comentario de INDUSTRIES:"; /usr/bin/grep -n -B2 "export const INDUSTRIES" $W/log-atm-web-astro/src/lib/constants.ts
echo "Excepcion de correos en DESIGN.md:"; /usr/bin/grep -n "^### Excepcion: plantillas de correo" $W/log-atm-web-astro/DESIGN.md
echo "superseded_by -> color-token-policy en las 9 specs:"
for f in sections/cta-styles sections/hero-styles sections/services-styles sections/why-styles sections/industries-styles components/navbar-styles components/footer-styles tokens/create-functional-tokens ui-contrast/contrast-token-single-source; do printf '%s: ' $f; /usr/bin/grep -m1 '^superseded_by:' $W/memory/specs/$f.md; done
echo "archivos cambiados en src/pages/api y public/manifest.json: $(git -C $W diff --name-only $BASE HEAD -- log-atm-web-astro/src/pages/api log-atm-web-astro/public/manifest.json | wc -l)"
echo "public/robots.txt existe: $(test -e $W/log-atm-web-astro/public/robots.txt && echo si || echo no)"
```

```text
archivos con mas o distinta cantidad de literales de color: 0
log-atm-web-astro/src/lib/email-templates.ts base=73 final=73
log-atm-web-astro/src/styles/tokens.css base=109 final=107
colores de INDUSTRIES: base=color: '#658fc3' color: '#3EB978' color: '#2D9B6F' color: '#4A7BB5' color: '#339965' color: '#3b6497' color: '#7a7a7a' color: '#cc7614' color: '#e84c3d' color: '#9b59b6' color: '#34495e' color: '#e91e63' 
colores de INDUSTRIES: final=color: '#658fc3' color: '#3EB978' color: '#2D9B6F' color: '#4A7BB5' color: '#339965' color: '#3b6497' color: '#7a7a7a' color: '#cc7614' color: '#e84c3d' color: '#9b59b6' color: '#34495e' color: '#e91e63' 
comentario de INDUSTRIES:
168-// Industrias atendidas (12 con foto en home — paridad handoff data.jsx). Nombre y bajada salen de industrias.names.
169-// Los colores son datos de contenido por industria (acento de cada card), no tokens de diseño.
170:export const INDUSTRIES = [
Excepcion de correos en DESIGN.md:
260:### Excepcion: plantillas de correo
superseded_by -> color-token-policy en las 9 specs:
sections/cta-styles: superseded_by: "[[color-token-policy]]"
sections/hero-styles: superseded_by: "[[color-token-policy]]"
sections/services-styles: superseded_by: "[[color-token-policy]]"
sections/why-styles: superseded_by: "[[color-token-policy]]"
sections/industries-styles: superseded_by: "[[color-token-policy]]"
components/navbar-styles: superseded_by: "[[color-token-policy]]"
components/footer-styles: superseded_by: "[[color-token-policy]]"
tokens/create-functional-tokens: superseded_by: "[[color-token-policy]]"
ui-contrast/contrast-token-single-source: superseded_by: "[[color-token-policy]]"
archivos cambiados en src/pages/api y public/manifest.json: 0
public/robots.txt existe: no
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.31","forma":"archivo","argv":null,"texto":"# Política de color: las tres frases de la política figuran en la cabecera de tokens.css y en la regla «Don't» de DESIGN.md; package.json y package-lock.json no cambian.\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro\nfor frase in \"solo vía tokens de \\`tokens.css\\`\" \"Ningún color literal nuevo fuera de \\`tokens.css\\`\" \"salvo en las plantillas de correo\" \"legado tolerado y no se migran\"; do\n  echo \"'$frase': tokens.css=$(/usr/bin/grep -cF -- \"$frase\" $W/src/styles/tokens.css) DESIGN.md=$(/usr/bin/grep -cF -- \"$frase\" $W/DESIGN.md)\"\ndone\necho \"reglas antiguas ('nunca usar colores hardcodeados' / 'No usar colores hardcodeados'): tokens.css=$(/usr/bin/grep -ciE 'nunca usar colores hardcodeados' $W/src/styles/tokens.css) DESIGN.md=$(/usr/bin/grep -ciE 'No usar colores hardcodeados' $W/DESIGN.md)\"\necho \"package.json y package-lock.json cambiados respecto del commit base: $(git -C $W diff --name-only e9d68aeda82ebb3cbb7d43264c33c31251ea70ff HEAD -- log-atm-web-astro/package.json log-atm-web-astro/package-lock.json | wc -l)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:29:09-03:00","exit":0,"sha256":"642c9dbf44a864121aa0702b6a7d4dc34d42f19022f2542be694684dcdc35c8a","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.31`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:29:09-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
# Política de color: las tres frases de la política figuran en la cabecera de tokens.css y en la regla «Don't» de DESIGN.md; package.json y package-lock.json no cambian.
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro
for frase in "solo vía tokens de \`tokens.css\`" "Ningún color literal nuevo fuera de \`tokens.css\`" "salvo en las plantillas de correo" "legado tolerado y no se migran"; do
  echo "'$frase': tokens.css=$(/usr/bin/grep -cF -- "$frase" $W/src/styles/tokens.css) DESIGN.md=$(/usr/bin/grep -cF -- "$frase" $W/DESIGN.md)"
done
echo "reglas antiguas ('nunca usar colores hardcodeados' / 'No usar colores hardcodeados'): tokens.css=$(/usr/bin/grep -ciE 'nunca usar colores hardcodeados' $W/src/styles/tokens.css) DESIGN.md=$(/usr/bin/grep -ciE 'No usar colores hardcodeados' $W/DESIGN.md)"
echo "package.json y package-lock.json cambiados respecto del commit base: $(git -C $W diff --name-only e9d68aeda82ebb3cbb7d43264c33c31251ea70ff HEAD -- log-atm-web-astro/package.json log-atm-web-astro/package-lock.json | wc -l)"
```

```text
'solo vía tokens de `tokens.css`': tokens.css=1 DESIGN.md=1
'Ningún color literal nuevo fuera de `tokens.css`': tokens.css=1 DESIGN.md=1
'salvo en las plantillas de correo': tokens.css=1 DESIGN.md=1
'legado tolerado y no se migran': tokens.css=1 DESIGN.md=1
reglas antiguas ('nunca usar colores hardcodeados' / 'No usar colores hardcodeados'): tokens.css=0 DESIGN.md=0
package.json y package-lock.json cambiados respecto del commit base: 0
```
<!-- evidencia:fin verify-report.31 -->

## Copy: búsquedas sobre `src`

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro\necho \"usos de tListFor por archivo (sitios):\"\n/usr/bin/grep -rc \"= tListFor<\" src | /usr/bin/grep -v ':0$'\necho \"definiciones de helpers que comparan longitudes (length !==/!=) en src/i18n: $(/usr/bin/grep -rn 'length !==' src/i18n | wc -l)\"\necho \"fusiones texto-datos (copy[i] ?? / || / ?? []) en los 9 archivos migrados:\"\n/usr/bin/grep -nE '(Copy|Copies|Names|Tags|Services|Labels|Options|stripLabels|serviceCopies|indCopy|whyCopy)\\[[a-z]+\\] *(\\?\\?|\\|\\|)|\\)\\) *(\\?\\?|\\|\\|) *\\{|\\?\\? *\\[\\]|\\?\\? *(m|v|ind\\.name|s\\.title|ind\\.sub)\\b|\\.\\.\\.\\(.*\\?\\?' src/components/sections/{Services,Hero,WhyVideo,Industries,CTA}Section.astro src/pages/{servicios,nosotros,cotizar,industrias}.astro; echo \"(exit grep=$?; 1 = sin coincidencias)\"\necho \"claves de texto en constants.ts (title|desc|tag|label|sub|name|text) como propiedad:\"\n/usr/bin/grep -nE '^\\s*(title|desc|tag|label|sub|name|text|description)\\s*:' src/lib/constants.ts; echo \"(exit grep=$?)\"\necho \"export SEO / SITE en constants.ts:\"; /usr/bin/grep -nE 'export const (SEO|SITE)\\b' src/lib/constants.ts; echo \"(exit grep=$?)\"\necho \"textos obsoletos en src:\"\n/usr/bin/grep -rnE \"tiempos garantizados|Bodegaje, fulfillment y última milla|KPIs medibles y revisión trimestral|Express 48h–7d|Express · 48h\" src; echo \"(exit grep=$?)\"\necho \"imports en site.ts: $(/usr/bin/grep -cE '^\\s*import ' src/lib/site.ts)\"\necho \"slogan/tagline en site.ts: $(/usr/bin/grep -ciE 'slogan|tagline' src/lib/site.ts) (solo comentarios si \u003e 0):\"; /usr/bin/grep -niE 'slogan|tagline' src/lib/site.ts\necho \"meta.siteName en src: $(/usr/bin/grep -rn 'siteName' src | wc -l)\"\necho \"build:ci en package.json: $(/usr/bin/grep -n '\"build:ci\"' package.json)\"\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:23:54-03:00","exit":0,"sha256":"6ac12c1ad0f15564869c2606dc8ddb200c91762350097a480f53198cc93a97d4","lineas":25,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.22`** · exit 0 · 25 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:23:54-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro
echo "usos de tListFor por archivo (sitios):"
/usr/bin/grep -rc "= tListFor<" src | /usr/bin/grep -v ':0$'
echo "definiciones de helpers que comparan longitudes (length !==/!=) en src/i18n: $(/usr/bin/grep -rn 'length !==' src/i18n | wc -l)"
echo "fusiones texto-datos (copy[i] ?? / || / ?? []) en los 9 archivos migrados:"
/usr/bin/grep -nE '(Copy|Copies|Names|Tags|Services|Labels|Options|stripLabels|serviceCopies|indCopy|whyCopy)\[[a-z]+\] *(\?\?|\|\|)|\)\) *(\?\?|\|\|) *\{|\?\? *\[\]|\?\? *(m|v|ind\.name|s\.title|ind\.sub)\b|\.\.\.\(.*\?\?' src/components/sections/{Services,Hero,WhyVideo,Industries,CTA}Section.astro src/pages/{servicios,nosotros,cotizar,industrias}.astro; echo "(exit grep=$?; 1 = sin coincidencias)"
echo "claves de texto en constants.ts (title|desc|tag|label|sub|name|text) como propiedad:"
/usr/bin/grep -nE '^\s*(title|desc|tag|label|sub|name|text|description)\s*:' src/lib/constants.ts; echo "(exit grep=$?)"
echo "export SEO / SITE en constants.ts:"; /usr/bin/grep -nE 'export const (SEO|SITE)\b' src/lib/constants.ts; echo "(exit grep=$?)"
echo "textos obsoletos en src:"
/usr/bin/grep -rnE "tiempos garantizados|Bodegaje, fulfillment y última milla|KPIs medibles y revisión trimestral|Express 48h–7d|Express · 48h" src; echo "(exit grep=$?)"
echo "imports en site.ts: $(/usr/bin/grep -cE '^\s*import ' src/lib/site.ts)"
echo "slogan/tagline en site.ts: $(/usr/bin/grep -ciE 'slogan|tagline' src/lib/site.ts) (solo comentarios si > 0):"; /usr/bin/grep -niE 'slogan|tagline' src/lib/site.ts
echo "meta.siteName en src: $(/usr/bin/grep -rn 'siteName' src | wc -l)"
echo "build:ci en package.json: $(/usr/bin/grep -n '"build:ci"' package.json)"
```

```text
usos de tListFor por archivo (sitios):
src/components/sections/WhyVideoSection.astro:1
src/components/sections/IndustriesSection.astro:1
src/components/sections/ServicesSection.astro:1
src/components/sections/CTASection.astro:2
src/components/sections/HeroSection.astro:1
src/pages/cotizar.astro:2
src/pages/servicios.astro:1
src/pages/nosotros.astro:2
src/pages/industrias.astro:3
definiciones de helpers que comparan longitudes (length !==/!=) en src/i18n: 1
fusiones texto-datos (copy[i] ?? / || / ?? []) en los 9 archivos migrados:
(exit grep=1; 1 = sin coincidencias)
claves de texto en constants.ts (title|desc|tag|label|sub|name|text) como propiedad:
(exit grep=1)
export SEO / SITE en constants.ts:
(exit grep=1)
textos obsoletos en src:
(exit grep=1)
imports en site.ts: 0
slogan/tagline en site.ts: 2 (solo comentarios si > 0):
4: * el worker de correo, los endpoints y las páginas. El slogan no vive aquí: su fuente
5: * es `meta.tagline` del i18n.
meta.siteName en src: 0
build:ci en package.json: 11:    "build:ci": "astro check && astro build",
```
<!-- evidencia:fin verify-report.22 -->

## Opciones del cotizador

<!-- evidencia:inicio {"v":1,"id":"verify-report.24","forma":"archivo","argv":null,"texto":"cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro\npython3 -I - <<'PY'\nimport json\nfor l in ('es','en','pt'):\n    d=json.load(open('src/i18n/translations/%s.json'%l,encoding='utf8'))\n    ex=d['cotizar']['extras']\n    print(l,'extras=%d'%len(ex),ex,'| originOther=%r'%d['cotizar']['step2']['originOther'])\nPY\necho \"QUOTE_ORIGINS sin 'Otro': $(/usr/bin/grep -c \"'Otro'\" src/lib/constants.ts) coincidencias en constants.ts; consumidores de QUOTE_ORIGINS:\"\n/usr/bin/grep -rn \"QUOTE_ORIGINS\" src | /usr/bin/grep -v \"export const\" | cut -c1-120\necho \"opcion Otro en dist/client:\"\nfor p in cotizar en/cotizar pt/cotizar; do echo \"  $p: $(/usr/bin/grep -oE '<option value=\"Otro\"\u003e[^<]*</option\u003e' dist/client/$p/index.html)\"; done\necho \"extras en dist/client (data-extra):\"\nfor p in cotizar en/cotizar pt/cotizar; do echo \"  $p: $(/usr/bin/grep -oE 'data-extra=\"[^\"]*\"' dist/client/$p/index.html | wc -l) chips, ultima milla: $(/usr/bin/grep -ciE 'última milh?a|last mile' dist/client/$p/index.html)\"; done\necho \"API cotizacion acepta cualquier servicio de texto:\"\n/usr/bin/grep -nE \"services|servicios\" src/pages/api/cotizacion.ts | head -8 | cut -c1-170\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s","head":null,"fecha":"2026-10-08T17:24:26-03:00","exit":0,"sha256":"a7c110342c9f069a0d1debd48686e0b41de66236995141f330ba99e5d5f4297e","lineas":18,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.24`** · exit 0 · 18 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T17:24:26-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-verify-41zuin_s`

```bash
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro
python3 -I - <<'PY'
import json
for l in ('es','en','pt'):
    d=json.load(open('src/i18n/translations/%s.json'%l,encoding='utf8'))
    ex=d['cotizar']['extras']
    print(l,'extras=%d'%len(ex),ex,'| originOther=%r'%d['cotizar']['step2']['originOther'])
PY
echo "QUOTE_ORIGINS sin 'Otro': $(/usr/bin/grep -c "'Otro'" src/lib/constants.ts) coincidencias en constants.ts; consumidores de QUOTE_ORIGINS:"
/usr/bin/grep -rn "QUOTE_ORIGINS" src | /usr/bin/grep -v "export const" | cut -c1-120
echo "opcion Otro en dist/client:"
for p in cotizar en/cotizar pt/cotizar; do echo "  $p: $(/usr/bin/grep -oE '<option value="Otro">[^<]*</option>' dist/client/$p/index.html)"; done
echo "extras en dist/client (data-extra):"
for p in cotizar en/cotizar pt/cotizar; do echo "  $p: $(/usr/bin/grep -oE 'data-extra="[^"]*"' dist/client/$p/index.html | wc -l) chips, ultima milla: $(/usr/bin/grep -ciE 'última milh?a|last mile' dist/client/$p/index.html)"; done
echo "API cotizacion acepta cualquier servicio de texto:"
/usr/bin/grep -nE "services|servicios" src/pages/api/cotizacion.ts | head -8 | cut -c1-170
```

```text
es extras=4 ['Aduana', 'Seguro de carga', 'Almacenaje destino', 'Inspección origen'] | originOther='Otro'
en extras=4 ['Customs', 'Cargo insurance', 'Destination warehousing', 'Origin inspection'] | originOther='Other'
pt extras=4 ['Aduana', 'Seguro de carga', 'Armazenagem destino', 'Inspeção origem'] | originOther='Outro'
QUOTE_ORIGINS sin 'Otro': 0 coincidencias en constants.ts; consumidores de QUOTE_ORIGINS:
src/components/sections/CTASection.astro:5:    QUICK_QUOTE_ORIGINS,
src/components/sections/CTASection.astro:96:                        {QUICK_QUOTE_ORIGINS.map((o) => (
src/pages/cotizar.astro:8:  QUOTE_ORIGINS,
src/pages/cotizar.astro:143:                  {QUOTE_ORIGINS.map((o) => <option value={o}>{o}</option>)}
opcion Otro en dist/client:
  cotizar: <option value="Otro">Otro</option>
  en/cotizar: <option value="Otro">Other</option>
  pt/cotizar: <option value="Otro">Outro</option>
extras en dist/client (data-extra):
  cotizar: 4 chips, ultima milla: 0
  en/cotizar: 4 chips, ultima milla: 0
  pt/cotizar: 4 chips, ultima milla: 0
API cotizacion acepta cualquier servicio de texto:
66:    services: normServices(raw.services),
```
<!-- evidencia:fin verify-report.24 -->

## Hallazgos de Seguridad (si aplica)

Sin hallazgos de seguridad. El dominio es `debt`, así que el análisis del paso 4 no aplica; el cambio no toca validación de entradas, secretos ni dependencias (la API y el manifest no cambian, `verify-report.18`; `package.json` y su lock no cambian, `verify-report.31`).

## Contraste de bases (solo con deltas MODIFY)

No aplica: `color-token-policy` es un delta `ADD` y `spec_refs` no contiene deltas `MODIFY`.

## Coherencia de Grafo de Specs

| Spec | Campo | Resultado |
|------|-------|-----------|
| `canonical-host-www` | `depends_on: [[site-identity-single-source]]` | Existe y declara `affects: [[canonical-host-www]]`. Coherente. |
| `site-identity-single-source` | `affects: [[canonical-host-www]]` | Existe y declara `depends_on: [[site-identity-single-source]]` en la contraparte. Coherente. |
| `copy-single-source` | `adrs: [[0012-prerender-output-guard]]` | El ADR existe pero no declaraba la spec en `spec_refs`. WARN de metadata, corregido (ver abajo). |
| `color-token-policy` | `supersedes: [[contrast-token-single-source]]` | Existe y declara `superseded_by: [[color-token-policy]]`. Coherente. |
| `quote-extras-and-origin-options` | sin `depends_on` ni `affects` ni `adrs` | Nada que validar. |

## Correcciones de Metadata

- `adrs/0012-prerender-output-guard.md`: se añade `spec_refs: ["[[copy-single-source]]"]` y `updated: "2026-10-08"`. Corrección unívoca, solo de metadata, con la validación principal en PASS.

## Observaciones (no bloquean el veredicto)

1. El primer build de Workers Builds tras el merge debe revisarse: `astro.config.mjs` importa `src/lib/site.ts` y la guarda de ADR-0012 corre dentro de ese build. El build local lo cubre (`verify-report.1`, `verify-report.32`), pero el entorno alojado carga el config con su propio cargador.
2. Checklist post-deploy en `https://www.logatm.com` (navegador real, Cloudflare responde 403 a curl): canonical, hreflang y og:url en `www`; `/robots.txt` y `/sitemap-index.xml` con `www`; si se usa Search Console, verificar la propiedad de `www` y reenviar el sitemap.
3. Fuera del alcance de las specs y sin cambio: `MAIL_TO` en `wrangler.toml` y `.dev.vars.example`, y el teléfono y email del `README.md` repiten datos de identidad (`verify-report.17` muestra `wrangler.json` con el email). Son configuración de despliegue y documentación, no código de página.
4. Los scripts de cliente de `CTASection.astro` y `WhyVideoSection.astro` conservan textos de respaldo en español (`dataset.msg… ?? "…"`) para los mensajes de estado; ya existían, no son uno de los 12 sitios y los atributos `data-` los entrega el i18n.
5. `canonical-host-www` (criterio 2) y su Purpose hablan de «las siete páginas»: son seis rutas prerenderizadas por idioma más la 404 bajo demanda, que no emite señales de URL. Es una imprecisión de redacción de la spec, sin efecto en el comportamiento (`verify-report.26`, `verify-report.27`).
6. `tasks.md` (tarea 12) pedía un import nombrado de `meta`; la spec y la decisión posterior del consultor fijan el import de `es.json` completo, que es lo implementado.
7. La guarda de ADR-0012 supone `build.format: 'directory'`; otro formato la haría fallar hasta ajustarla. El defecto de fondo (el adaptador de Cloudflare devuelve el error de render sin lanzar) es reportable upstream.
8. Las siete specs de estilos, `create-functional-tokens` y `contrast-token-single-source` quedaron `superseded_by` la política de color, pero sus Purpose y criterios aún no se alinean con ella: candidato a limpieza en archive.

## Acciones Requeridas

Ninguna. Todos los criterios de las cinco specs están cumplidos y las marcas y `verified_at` los escribió `spec_marks.py verify`.

## Bloques retirados

Los bloques siguientes se reemplazaron por una corrida posterior que no depende de nombres de directorios temporales aleatorios (o por una salida condensada); el id vigente figura en cada lápida.

<!-- evidencia:retirado {"v":1,"id":"verify-report.5","sha256":"d5b0347ca2cbf9f802ff667e735b48f4a3b9dc9ae500d53f592267686e541bc2","remite":"verify-report.32"} -->
**Evidencia `verify-report.5` retirada** · remite a `verify-report.32` · sha256 `d5b0347ca2cb`
<!-- evidencia:retirado {"v":1,"id":"verify-report.6","sha256":"2832439817ead4b033a11903cdb5149e0bc3e825cd4262975b5cf3f0817d7c73","remite":"verify-report.9"} -->
**Evidencia `verify-report.6` retirada** · remite a `verify-report.9` · sha256 `2832439817ea`
<!-- evidencia:retirado {"v":1,"id":"verify-report.7","sha256":"f5e9acd585fa90c2b0ddfb12c7b22e9c9f9c31523ce569c310f080e04faf19a5","remite":"verify-report.10"} -->
**Evidencia `verify-report.7` retirada** · remite a `verify-report.10` · sha256 `f5e9acd585fa`
<!-- evidencia:retirado {"v":1,"id":"verify-report.19","sha256":"f59c94b9407d661b7e2b127b8c1c4af3ba983855433c424923f49eab1140317a","remite":"verify-report.21"} -->
**Evidencia `verify-report.19` retirada** · remite a `verify-report.21` · sha256 `f59c94b9407d`
<!-- evidencia:retirado {"v":1,"id":"verify-report.20","sha256":"14114553c99a5f24166257107cfbb8f0fed2f2dc35a5d6cf10b975a7a5c12d0e","remite":"verify-report.22"} -->
**Evidencia `verify-report.20` retirada** · remite a `verify-report.22` · sha256 `14114553c99a`

<!-- evidencia:inicio {"v":1,"id":"verify-report.33","forma":"argv","argv":["/home/kapridoo/.pyenv/versions/3.12.10/bin/python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:32:27-03:00","exit":1,"sha256":"6c76a05948315a673b264cb0bb4451f9c42cb84be6ace17e0a070a4f05faf449","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volvería a comprobar este informe"} -->
**Evidencia `verify-report.33`** · exit 1 · 1 líneas, 0 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:32:27-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot`
No re-comprobable: comprobar sobre verify-report.md volvería a comprobar este informe

```text
/home/kapridoo/.pyenv/versions/3.12.10/bin/python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot/apply-evidence.md","bloques":52,"comprobados":11,"calzan":["apply-evidence.6","apply-evidence.16","apply-evidence.27","apply-evidence.29","apply-evidence.30","apply-evidence.35","apply-evidence.36","apply-evidence.50","apply-evidence.52","apply-evidence.53"],"no_calzan":[{"id":"apply-evidence.22","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.1","motivo":"log del build del commit base, construido en una copia aislada ya borrada"},{"id":"apply-evidence.2","motivo":"listado de la l\u00ednea base gitignored; la tarea 19 agrega after/ en el mismo directorio"},{"id":"apply-evidence.3","motivo":"estado de partida sobre el commit base; las tareas siguientes cambian los archivos que mide"},{"id":"apply-evidence.4","motivo":"estado de partida sobre el commit base; las tareas 15 cambian los JSON que mide"},{"id":"apply-evidence.5","motivo":"estado tras las tareas 3 a 6; las tareas 10 y 15 vuelven a editar algunos de estos archivos"},{"id":"apply-evidence.7","motivo":"log del build y del check de la tarea 6, guardados en el directorio de temporales del despacho"},{"id":"apply-evidence.8","motivo":"compara el dist de la tarea 6, que las tareas siguientes reconstruyen"},{"id":"apply-evidence.9","motivo":"mutaci\u00f3n sobre una copia aislada ya borrada"},{"id":"apply-evidence.10","motivo":"mutaci\u00f3n sobre una copia aislada ya borrada"},{"id":"apply-evidence.11","motivo":"build mutado en una copia aislada ya borrada"},{"id":"apply-evidence.12","motivo":"build experimental en una copia aislada ya borrada"},{"id":"apply-evidence.13","motivo":"build experimental en una copia aislada ya borrada"},{"id":"apply-evidence.14","motivo":"mutaci\u00f3n sobre una copia aislada ya borrada"},{"id":"apply-evidence.15","motivo":"mutaci\u00f3n sobre una copia aislada ya…(+3226 caracteres)
```
<!-- evidencia:fin verify-report.33 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.34","forma":"argv","argv":["/home/kapridoo/.pyenv/versions/3.12.10/bin/python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot","head":"bab0b8db08401e96bab00d1db1b2458599fb6b73","fecha":"2026-10-08T17:33:34-03:00","exit":0,"sha256":"a165654547ce1a6901d9af1882429db9e70cc14d379000a9a299cc960b877362","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaría el informe a sí mismo"} -->
**Evidencia `verify-report.34`** · exit 0 · 1 líneas, 0 omitidas · HEAD `bab0b8db0840` · 2026-10-08T17:33:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot`
No re-comprobable: re-ejecutarlo comprobaría el informe a sí mismo

```text
/home/kapridoo/.pyenv/versions/3.12.10/bin/python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/changes/debt-copy-tokens-ssot/verify-report.md","bloques":27,"comprobados":18,"calzan":["verify-report.30","verify-report.3","verify-report.4","verify-report.28","verify-report.32","verify-report.9","verify-report.10","verify-report.8","verify-report.29","verify-report.23","verify-report.26","verify-report.15","verify-report.17","verify-report.21","verify-report.18","verify-report.31","verify-report.22","verify-report.24"],"no_calzan":[],"omitidos":[{"id":"verify-report.1","motivo":"el build reescribe dist/ y comprobar no lo repite"},{"id":"verify-report.2","motivo":"el build reescribe dist/ y comprobar no lo repite"},{"id":"verify-report.27","motivo":"levanta un servidor local en un puerto fijo; comprobar no lo repite"},{"id":"verify-report.25","motivo":"levanta un servidor local en un puerto fijo; comprobar no lo repite"},{"id":"verify-report.11","motivo":"chequeo propio de verify; comprobar no lo repite"},{"id":"verify-report.12","motivo":"chequeo propio de verify; comprobar no lo repite"},{"id":"verify-report.13","motivo":"chequeo propio de verify; comprobar no lo repite"},{"id":"verify-report.14","motivo":"chequeo propio de verify; comprobar no lo repite"},{"id":"verify-report.16","motivo":"auditor\u00eda en navegador real sobre dist/ del \u00faltimo build; comprobar no la repite"}],"retirados":[{"id":"verify-report.5","remite":"verify-report.32"},{"id":"verify-report.6","remite":"verify-report.9"},{"id":"verify-report.7","remite":"verify-report.10"},{"id":"verify-report.19","remite":"verify-report.21"},{"id":"verify-report.20","remite":"verify-report.22"}],"error":null}
```
<!-- evidencia:fin verify-report.34 -->

## Resultado del cierre de evidencia

Los dos bloques de cierre (`verify-report.33` sobre `apply-evidence.md` y `verify-report.34` sobre este informe) muestran:

- `verify-report.34`: todos los bloques re-comprobables de este informe calzan; no hay `no_calzan` ni `error`.
- `verify-report.33`: un hallazgo, `apply-evidence.22` (`npm run validate-i18n` registrado en el commit `356ebd8`). Ya no calza porque un commit posterior del propio cambio (`e350a25`) retiró la clave `meta.siteName`, de modo que la salida actual de la validación tiene una clave menos que la registrada entonces. El bloque no se retira. No es una regresión: la evidencia vigente de la validación es `verify-report.12`, que termina en exit 0 con la paridad de claves intacta, y ningún criterio se apoya en `apply-evidence.md`.
