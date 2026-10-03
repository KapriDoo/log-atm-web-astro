---
type: apply-evidence
change_name: "fix-i18n-links-and-404"
created: "2026-10-02"
tags: [apply-evidence]
---

# Apply evidence: fix-i18n-links-and-404

Ninguna tarea es `[TDD]` (tasks.md): el proyecto no tiene suite de tests y la verificación es por `astro build`, el barrido `check-i18n-links` y `astro preview`. Las secciones registran el commit de cada tarea y, donde aporta, la salida del barrido o del build.

## Tarea 1 — Script de barrido `check-i18n-links`

Commit: ver la sección «Commits» al final.

Sin `dist/client`, el script responde con exit 2 (bloque siguiente, sobre el worktree antes del primer build).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["npx","tsx","scripts/check-i18n-links.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"b8f4cb379876735f46a5f9d857f6475426de9067","fecha":"2026-10-02T22:23:45-03:00","exit":2,"sha256":"f8a6e61a4055be8a78bcb76f1f0b536538709030cef7b73b91730544dbf3f885","lineas":1,"omitidas":0,"no_recomprobable":"estado previo al primer build: dist/client existe en el árbol final tras la verificación"} -->
**Evidencia `apply-evidence.1`** · exit 2 · 1 líneas, 0 omitidas · HEAD `b8f4cb379876` · 2026-10-02T22:23:45-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`
No re-comprobable: estado previo al primer build: dist/client existe en el árbol final tras la verificación

```text
npx tsx scripts/check-i18n-links.ts
```

```text
[i18n-links] No existe dist/client: ejecutá `npm run build` primero.
```
<!-- evidencia:fin apply-evidence.1 -->

Línea base: el mismo script contra el build de `main` (`b8f4cb3`) en una copia aislada bajo el directorio de temporales del despacho (`git archive main | tar -x`, `npm ci`, `npm run build`). Reporta las violaciones conocidas (`/servicios`, `/cotizar`, `/contacto`, `/`) por idioma y por barra final, y sale con exit 1.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"archivo","argv":null,"texto":"# Barrido sobre el build de main: conteo de violaciones por href y regla, más el resumen\nnpx tsx scripts/check-i18n-links.ts \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/baseline.out\ncode=$?\ngrep -v '^\\[i18n-links\\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/baseline.out | sed 's/^[^:]*: //' | sort | uniq -c | sort -rn\ntail -1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/baseline.out\nexit $code\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/main-base.7jM4k2vQ/log-atm-web-astro","head":null,"fecha":"2026-10-02T22:23:45-03:00","exit":1,"sha256":"c0be6956e458ee20006dec6f631dfc9023140b9f02d2b65691e6af18c1701c87","lineas":12,"omitidas":0,"no_recomprobable":"línea base sobre una copia aislada de main en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.2`** · exit 1 · 12 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T22:23:45-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/main-base.7jM4k2vQ/log-atm-web-astro`
No re-comprobable: línea base sobre una copia aislada de main en el directorio de temporales del despacho

```bash
# Barrido sobre el build de main: conteo de violaciones por href y regla, más el resumen
npx tsx scripts/check-i18n-links.ts > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/baseline.out
code=$?
grep -v '^\[i18n-links\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/baseline.out | sed 's/^[^:]*: //' | sort | uniq -c | sort -rn
tail -1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/baseline.out
exit $code
```

```text
     54 /contacto — path sin barra final (redirección intermedia)
     33 /servicios — path sin barra final (redirección intermedia)
     18 /contacto — idioma del enlace (es) distinto al de la página (pt)
     18 /contacto — idioma del enlace (es) distinto al de la página (en)
     11 /servicios — idioma del enlace (es) distinto al de la página (pt)
     11 /servicios — idioma del enlace (es) distinto al de la página (en)
      6 / — idioma del enlace (es) distinto al de la página (pt)
      6 / — idioma del enlace (es) distinto al de la página (en)
      6 /cotizar — path sin barra final (redirección intermedia)
      2 /cotizar — idioma del enlace (es) distinto al de la página (pt)
      2 /cotizar — idioma del enlace (es) distinto al de la página (en)
[i18n-links] 21 páginas (es=7, en=7, pt=7), 483 enlaces internos evaluados, 167 violaciones
```
<!-- evidencia:fin apply-evidence.2 -->

## Tareas 2 a 6 — hrefs localizados con `buildLocaleUrl`

Commit `4a496a0` (`fix(i18n): keep page language in internal links`). `ServicesSection.astro` calcula el href de cada tarjeta con `buildLocaleUrl(currentLang, s.href)`; `servicios`, `industrias`, `contacto`, `nosotros` y `cotizar` declaran `homeHref` (y `contactHref` donde aplica) y los usan en la migaja, en los CTA de contacto y en «volver al inicio» (markup estático, sin script de cliente). La verificación es el barrido de la Tarea 11.

## Tarea 7 — Tarjetas del catálogo sin self-link

Commit `ca35054` (`fix(services): render catalog cards pointing to the catalog as static`). `catalogHref = buildLocaleUrl(currentLang, '/servicios')`; las tarjetas cuyo href localizado coincide se renderizan como `div.svc-card--static`. Sin CSS nuevo (design.md D6). Verificación en la Tarea 11.

## Tarea 8 — `Navbar` con `currentPath` opcional

Commit `d8bfa0e` (`feat(navbar): accept optional currentPath override`). `cleanPath = stripLocaleFromPath(currentPath ?? Astro.url.pathname)`; alimenta el estado activo y las dos instancias de `LanguageSelector` (no editado).

## Tarea 9 — `BaseLayout` sin señales de URL con `noindex`

Commit `bbd659c` (`fix(seo): omit URL signals on noindex pages`). `emitUrlSignals = !noindex` condiciona canonical, alternates, `og:url` y `BreadcrumbList`. `noindex` solo lo usa `404.astro` (grep sobre `src/`).

## Tarea 10 — 404 única bajo demanda

Commit `84af1c9` (`fix(i18n): render a single on-demand 404 in the URL locale`). `export const prerender = false`, `currentLang = getLangFromUrl(Astro.url)`, `<Navbar currentPath="/" />`; se elimina `src/pages/[lang]/404.astro`. Sin referencias residuales (grep de `[lang]/404` y del delegador en `src/`, `scripts/`, `astro.config.mjs`).

## Tarea 11 — Verificación final

`npm run build` sobre HEAD `84af1c9` termina con exit 0 y `validate-i18n` en OK para `en` y `pt` (536 claves); el build escribe `dist/`, por lo que no se registra como bloque. Estructura resultante de `dist/client`:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"archivo","argv":null,"texto":"# Estructura de dist/client tras el build del cambio: sin páginas 404 prerenderizadas\nfor p in dist/client/404.html dist/client/en/404 dist/client/pt/404; do\n  if [ -e \"$p\" ]; then echo \"PRESENTE $p\"; else echo \"ausente  $p\"; fi\ndone\necho \"páginas html: $(find dist/client -name '*.html' | wc -l)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:26:49-03:00","exit":0,"sha256":"cd81a870e74bd9502243735c4a710120e389a2b4c414f6ae9266862b3b8aa3cd","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.3`** · exit 0 · 4 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:26:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`

```bash
# Estructura de dist/client tras el build del cambio: sin páginas 404 prerenderizadas
for p in dist/client/404.html dist/client/en/404 dist/client/pt/404; do
  if [ -e "$p" ]; then echo "PRESENTE $p"; else echo "ausente  $p"; fi
done
echo "páginas html: $(find dist/client -name '*.html' | wc -l)"
```

```text
ausente  dist/client/404.html
ausente  dist/client/en/404
ausente  dist/client/pt/404
páginas html: 18
```
<!-- evidencia:fin apply-evidence.3 -->

Barrido sobre el build del cambio (contraprueba contra `main`: bloque `apply-evidence.2`):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"argv","argv":["npx","tsx","scripts/check-i18n-links.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:26:49-03:00","exit":0,"sha256":"75099efec04c02738efdda546a3300b44510ef08c7be202ca387b61f43b5c449","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.4`** · exit 0 · 1 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:26:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`

```text
npx tsx scripts/check-i18n-links.ts
```

```text
[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin apply-evidence.4 -->

Tarjetas del catálogo (`a.svc-card` con su href) y de la home:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"archivo","argv":null,"texto":"# Tarjetas del catálogo y de la home en el build del cambio\nfor f in servicios en/servicios pt/servicios; do\n  echo \"== $f\"\n  grep -o '<a[^\u003e]*class=\"svc-card[^\"]*\"[^\u003e]*\u003e' dist/client/$f/index.html | grep -o 'href=\"[^\"]*\"' | sort | uniq -c\n  echo \"div estáticas: $(grep -o '<div class=\"svc-card[^\"]*svc-card--static[^\"]*\"' dist/client/$f/index.html | wc -l)\"\ndone\nfor f in index.html en/index.html pt/index.html; do\n  echo \"== home $f\"\n  grep -o '<a[^\u003e]*class=\"svc-card[^\"]*\"[^\u003e]*\u003e' dist/client/$f | grep -o 'href=\"[^\"]*\"' | sort | uniq -c\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:26:49-03:00","exit":0,"sha256":"aa6a4bcfc2a417b65f40ab7ed42f9a4edccca3b98d86759e1ddcb9c7fc557763","lineas":18,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.5`** · exit 0 · 18 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:26:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`

```bash
# Tarjetas del catálogo y de la home en el build del cambio
for f in servicios en/servicios pt/servicios; do
  echo "== $f"
  grep -o '<a[^>]*class="svc-card[^"]*"[^>]*>' dist/client/$f/index.html | grep -o 'href="[^"]*"' | sort | uniq -c
  echo "div estáticas: $(grep -o '<div class="svc-card[^"]*svc-card--static[^"]*"' dist/client/$f/index.html | wc -l)"
done
for f in index.html en/index.html pt/index.html; do
  echo "== home $f"
  grep -o '<a[^>]*class="svc-card[^"]*"[^>]*>' dist/client/$f | grep -o 'href="[^"]*"' | sort | uniq -c
done
```

```text
== servicios
      1 href="/cotizar/"
div estáticas: 10
== en/servicios
      1 href="/en/cotizar/"
div estáticas: 10
== pt/servicios
      1 href="/pt/cotizar/"
div estáticas: 10
== home index.html
      1 href="/cotizar/"
      3 href="/servicios/"
== home en/index.html
      1 href="/en/cotizar/"
      3 href="/en/servicios/"
== home pt/index.html
      1 href="/pt/cotizar/"
      3 href="/pt/servicios/"
```
<!-- evidencia:fin apply-evidence.5 -->

`<head>` y `<nav id="navbar">` de cada página prerenderizada, byte a byte, entre el build de `main` (copia aislada) y el del cambio. Cubre «páginas indexables sin cambios en canonical, hreflang, `og:url` y `BreadcrumbList`» y «`Navbar` sin la prop idéntico a `main`»:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/compare_heads.py","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/main-base.7jM4k2vQ/log-atm-web-astro/dist/client","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro/dist/client"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:27:12-03:00","exit":0,"sha256":"e995911c401515f7bed4d3cdaa6c90ae42086347ca81f2ec14e2aa4db2839771","lineas":1,"omitidas":0,"no_recomprobable":"compara contra el build de main en una copia aislada del directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.6`** · exit 0 · 1 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:27:12-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`
No re-comprobable: compara contra el build de main en una copia aislada del directorio de temporales del despacho

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/compare_heads.py /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/main-base.7jM4k2vQ/log-atm-web-astro/dist/client /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro/dist/client
```

```text
páginas comparadas: 18; <head> distintos: 0; <nav> distintos: 0; páginas nuevas en el cambio: 0
```
<!-- evidencia:fin apply-evidence.6 -->

`astro preview` (workerd) sobre el build del cambio, puerto 4377. La 404 bajo demanda por prefijo y profundidad: estado, `<html lang>`, `robots`, ausencia de señales de URL, selector, ítem activo y módulo GSAP:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/preview404.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:27:59-03:00","exit":0,"sha256":"7c0bd0b5499081aeb8b370df8f55c3cc36346df5ef8b03c9d367462793702536","lineas":8,"omitidas":0,"no_recomprobable":"requiere el servidor astro preview que la fase levanta y detiene"} -->
**Evidencia `apply-evidence.7`** · exit 0 · 8 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:27:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`
No re-comprobable: requiere el servidor astro preview que la fase levanta y detiene

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/preview404.py
```

```text
/no-existe → 404 lang=es-CL robots_noindex=True {'canonical': 0, 'alternate': 0, 'og:url': 0, 'BreadcrumbList': 0} selector=['/', '/en/', '/pt/'] activo=['es'] nav_aria_current=0 gsap_module=True h1="Página no encontrada"
/en/no-existe → 404 lang=en-US robots_noindex=True {'canonical': 0, 'alternate': 0, 'og:url': 0, 'BreadcrumbList': 0} selector=['/', '/en/', '/pt/'] activo=['en'] nav_aria_current=0 gsap_module=True h1="Page not found"
/en/no-existe/ → 404 lang=en-US robots_noindex=True {'canonical': 0, 'alternate': 0, 'og:url': 0, 'BreadcrumbList': 0} selector=['/', '/en/', '/pt/'] activo=['en'] nav_aria_current=0 gsap_module=True h1="Page not found"
/pt/a/b/c → 404 lang=pt-BR robots_noindex=True {'canonical': 0, 'alternate': 0, 'og:url': 0, 'BreadcrumbList': 0} selector=['/', '/en/', '/pt/'] activo=['pt'] nav_aria_current=0 gsap_module=True h1="Página não encontrada"
/pt/no-existe/ → 404 lang=pt-BR robots_noindex=True {'canonical': 0, 'alternate': 0, 'og:url': 0, 'BreadcrumbList': 0} selector=['/', '/en/', '/pt/'] activo=['pt'] nav_aria_current=0 gsap_module=True h1="Página não encontrada"
/en/404/ → 404 lang=en-US robots_noindex=True {'canonical': 0, 'alternate': 0, 'og:url': 0, 'BreadcrumbList': 0} selector=['/', '/en/', '/pt/'] activo=['en'] nav_aria_current=0 gsap_module=True h1="Page not found"
/pt/404/ → 404 lang=pt-BR robots_noindex=True {'canonical': 0, 'alternate': 0, 'og:url': 0, 'BreadcrumbList': 0} selector=['/', '/en/', '/pt/'] activo=['pt'] nav_aria_current=0 gsap_module=True h1="Página não encontrada"
URLs: 7; fallidas: 0
```
<!-- evidencia:fin apply-evidence.7 -->

Rutas existentes (respuesta servida idéntica al archivo de `dist/client`, cuyo `<head>` es idéntico a `main` según `apply-evidence.6`) y servicio de contacto:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"archivo","argv":null,"texto":"# Rutas existentes y API en `astro preview` (puerto 4377); <head\u003e servido vs dist/client del cambio\nfor p in / /en/servicios/ /pt/contacto/; do\n  f=dist/client${p}index.html\n  code=$(curl -s -o /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/served.html -w '%{http_code}' \"http://127.0.0.1:4377$p\")\n  if cmp -s /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/served.html \"$f\"; then same=idéntico; else same=distinto; fi\n  echo \"$p → $code; servido vs $f: $same; canonical=$(grep -o '<link rel=\"canonical\" href=\"[^\"]*\"' \"$f\" | sed 's/.*href=//')\"\ndone\necho \"POST /api/contacto vacío → $(curl -s -o /dev/null -w '%{http_code}' -X POST http://127.0.0.1:4377/api/contacto)\"\necho \"GET /api/contacto → $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4377/api/contacto)\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:27:59-03:00","exit":0,"sha256":"cf0745e49d439b760952cccafca171c5fd50df0c35f773818bafe873b181c41a","lineas":5,"omitidas":0,"no_recomprobable":"requiere el servidor astro preview que la fase levanta y detiene"} -->
**Evidencia `apply-evidence.8`** · exit 0 · 5 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:27:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`
No re-comprobable: requiere el servidor astro preview que la fase levanta y detiene

```bash
# Rutas existentes y API en `astro preview` (puerto 4377); <head> servido vs dist/client del cambio
for p in / /en/servicios/ /pt/contacto/; do
  f=dist/client${p}index.html
  code=$(curl -s -o /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/served.html -w '%{http_code}' "http://127.0.0.1:4377$p")
  if cmp -s /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b/served.html "$f"; then same=idéntico; else same=distinto; fi
  echo "$p → $code; servido vs $f: $same; canonical=$(grep -o '<link rel="canonical" href="[^"]*"' "$f" | sed 's/.*href=//')"
done
echo "POST /api/contacto vacío → $(curl -s -o /dev/null -w '%{http_code}' -X POST http://127.0.0.1:4377/api/contacto)"
echo "GET /api/contacto → $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4377/api/contacto)"
```

```text
/ → 200; servido vs dist/client/index.html: idéntico; canonical="https://logatm.com/"
/en/servicios/ → 200; servido vs dist/client/en/servicios/index.html: idéntico; canonical="https://logatm.com/en/servicios/"
/pt/contacto/ → 200; servido vs dist/client/pt/contacto/index.html: idéntico; canonical="https://logatm.com/pt/contacto/"
POST /api/contacto vacío → 403
GET /api/contacto → 405
```
<!-- evidencia:fin apply-evidence.8 -->

En `apply-evidence.8`, el `POST` sin `content-type` responde 403: es el chequeo de origen de Astro (`security.checkOrigin`) para peticiones sin tipo de contenido JSON, previo al handler. El caso del plan («POST vacío → 400», `exploration.md`) es el `POST` con `content-type: application/json` y cuerpo vacío, que llega al handler (`invalid-json`). Contraprueba de las tres peticiones contra `main` (`astro preview` de la copia aislada, puerto 4378) y contra el cambio (puerto 4377):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"archivo","argv":null,"texto":"# /api/contacto en main (puerto 4378) y en el cambio (puerto 4377), mismas peticiones\nfor port in 4378 4377; do\n  echo \"puerto $port:\"\n  echo \"  POST sin cuerpo ni content-type → $(curl -s -o /dev/null -w '%{http_code}' -X POST http://127.0.0.1:$port/api/contacto)\"\n  echo \"  POST content-type JSON, cuerpo vacío → $(curl -s -o /dev/null -w '%{http_code}' -X POST -H 'content-type: application/json' http://127.0.0.1:$port/api/contacto)\"\n  echo \"  GET → $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$port/api/contacto)\"\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:28:28-03:00","exit":0,"sha256":"ef770daabf811ea1a05408109f0cfdb943a2c52d53f796a7d2392c9fe42b47b3","lineas":8,"omitidas":0,"no_recomprobable":"requiere los servidores astro preview de main y del cambio que la fase levanta y detiene"} -->
**Evidencia `apply-evidence.9`** · exit 0 · 8 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:28:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404/log-atm-web-astro`
No re-comprobable: requiere los servidores astro preview de main y del cambio que la fase levanta y detiene

```bash
# /api/contacto en main (puerto 4378) y en el cambio (puerto 4377), mismas peticiones
for port in 4378 4377; do
  echo "puerto $port:"
  echo "  POST sin cuerpo ni content-type → $(curl -s -o /dev/null -w '%{http_code}' -X POST http://127.0.0.1:$port/api/contacto)"
  echo "  POST content-type JSON, cuerpo vacío → $(curl -s -o /dev/null -w '%{http_code}' -X POST -H 'content-type: application/json' http://127.0.0.1:$port/api/contacto)"
  echo "  GET → $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$port/api/contacto)"
done
```

```text
puerto 4378:
  POST sin cuerpo ni content-type → 403
  POST content-type JSON, cuerpo vacío → 400
  GET → 405
puerto 4377:
  POST sin cuerpo ni content-type → 403
  POST content-type JSON, cuerpo vacío → 400
  GET → 405
```
<!-- evidencia:fin apply-evidence.9 -->

Navegador: Chrome headless (binario del repo principal, cwd en el directorio de temporales) vía CDP contra `astro preview`. Por idioma, el `.error-page__code` se anima con GSAP (estilo inline en plena animación, opacidad final 1) y, con `prefers-reduced-motion: reduce`, queda sin animar; sin excepciones de JS. El script `chrome404.mjs` vive en el directorio de temporales del despacho:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"archivo","argv":null,"texto":"# Chrome headless (CDP) sobre la 404 bajo demanda de astro preview: rebote GSAP y movimiento reducido\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b && timeout 90 node chrome404.mjs\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b","head":null,"fecha":"2026-10-02T22:33:31-03:00","exit":0,"sha256":"0c15b293a5055db1f417c2109e641bb81f216c274f04f29937793e1affaeec4d","lineas":6,"omitidas":0,"no_recomprobable":"requiere el servidor astro preview y el script de navegador del directorio de temporales del despacho; los valores intermedios dependen del tiempo"} -->
**Evidencia `apply-evidence.10`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-02T22:33:31-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b`
No re-comprobable: requiere el servidor astro preview y el script de navegador del directorio de temporales del despacho; los valores intermedios dependen del tiempo

```bash
# Chrome headless (CDP) sobre la 404 bajo demanda de astro preview: rebote GSAP y movimiento reducido
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/fix-i18n-links-and-404/sdd-apply-0ceoi12b && timeout 90 node chrome404.mjs
```

```text
/no-existe [no-preference] lang=es-CL style_temprano="translate: none; rotate: none; scale: none; opacity: 0.5008; transform: translate3d(0px, 0px, 0px) rotate(-2.496deg) scale(0.7504, 0.7504);" opacidad_temprana=0.5008 style_final="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);" excepciones=0 → OK
/no-existe [reduce] lang=es-CL style_temprano=null opacidad_temprana=1 style_final=null excepciones=0 → OK
/en/no-existe [no-preference] lang=en-US style_temprano="translate: none; rotate: none; scale: none; opacity: 0.8246; transform: translate3d(0px, 0px, 0px) rotate(-0.8768deg) scale(0.9123, 0.9123);" opacidad_temprana=0.8246 style_final="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);" excepciones=0 → OK
/en/no-existe [reduce] lang=en-US style_temprano=null opacidad_temprana=1 style_final=null excepciones=0 → OK
/pt/a/b/c [no-preference] lang=pt-BR style_temprano="translate: none; rotate: none; scale: none; opacity: 0.8368; transform: translate3d(0px, 0px, 0px) rotate(-0.8159deg) scale(0.9184, 0.9184);" opacidad_temprana=0.8368 style_final="translate: none; rotate: none; scale: none; opacity: 1; transform: translate(0px, 0px);" excepciones=0 → OK
/pt/a/b/c [reduce] lang=pt-BR style_temprano=null opacidad_temprana=1 style_final=null excepciones=0 → OK
```
<!-- evidencia:fin apply-evidence.10 -->

Archivos de código tocados por el cambio respecto de `main`; ninguno de los prohibidos por el PR #33 (`LanguageSelector.astro`, `wizard.ts`, `generate-favicons.mjs`, `apple-touch-icon.png`):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"argv","argv":["git","diff","--name-status","main","HEAD","--","log-atm-web-astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:33:46-03:00","exit":0,"sha256":"c2b4014362968443a30dd0304341eaa8edb87f20f8689843c917888aefcfab48","lineas":16,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.11`** · exit 0 · 16 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:33:46-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404`

```text
git diff --name-status main HEAD -- log-atm-web-astro
```

```text
M	log-atm-web-astro/package.json
D	log-atm-web-astro/public/apple-touch-icon.png
A	log-atm-web-astro/scripts/check-i18n-links.ts
M	log-atm-web-astro/scripts/generate-favicons.mjs
M	log-atm-web-astro/src/components/sections/ServicesSection.astro
M	log-atm-web-astro/src/components/ui/LanguageSelector.astro
M	log-atm-web-astro/src/components/ui/Navbar.astro
M	log-atm-web-astro/src/layouts/BaseLayout.astro
M	log-atm-web-astro/src/pages/404.astro
D	log-atm-web-astro/src/pages/[lang]/404.astro
M	log-atm-web-astro/src/pages/contacto.astro
M	log-atm-web-astro/src/pages/cotizar.astro
M	log-atm-web-astro/src/pages/industrias.astro
M	log-atm-web-astro/src/pages/nosotros.astro
M	log-atm-web-astro/src/pages/servicios.astro
M	log-atm-web-astro/src/scripts/wizard.ts
```
<!-- evidencia:fin apply-evidence.11 -->

`apply-evidence.11` compara contra la punta actual de `main`, que avanzó durante la fase con el merge del PR #33 (`78b6b73`): los archivos prohibidos aparecen porque `main` los modificó, no la rama. La comparación correcta es contra la base de la rama (`main...HEAD`, merge-base `b8f4cb3`), que lista solo los archivos del cambio y ninguno prohibido:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"argv","argv":["git","diff","--name-status","b8f4cb379876735f46a5f9d857f6475426de9067","HEAD","--","log-atm-web-astro"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404","head":"84af1c90efc99ad57ac978e7dd6f36c299192ff4","fecha":"2026-10-02T22:34:07-03:00","exit":0,"sha256":"2c77a53c0aa805847b61db03803ff7e055873f123e51cba8bb50b4057391931b","lineas":12,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.12`** · exit 0 · 12 líneas, 0 omitidas · HEAD `84af1c90efc9` · 2026-10-02T22:34:07-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-i18n-links-and-404`

```text
git diff --name-status b8f4cb379876735f46a5f9d857f6475426de9067 HEAD -- log-atm-web-astro
```

```text
M	log-atm-web-astro/package.json
A	log-atm-web-astro/scripts/check-i18n-links.ts
M	log-atm-web-astro/src/components/sections/ServicesSection.astro
M	log-atm-web-astro/src/components/ui/Navbar.astro
M	log-atm-web-astro/src/layouts/BaseLayout.astro
M	log-atm-web-astro/src/pages/404.astro
D	log-atm-web-astro/src/pages/[lang]/404.astro
M	log-atm-web-astro/src/pages/contacto.astro
M	log-atm-web-astro/src/pages/cotizar.astro
M	log-atm-web-astro/src/pages/industrias.astro
M	log-atm-web-astro/src/pages/nosotros.astro
M	log-atm-web-astro/src/pages/servicios.astro
```
<!-- evidencia:fin apply-evidence.12 -->

Servidores `astro preview` (puertos 4377 y 4378) y procesos de Chrome detenidos al terminar.

## Cierre

El perfil del proyecto no declara suite de tests ni filtro de casos: no hay corrida completa de cierre. La verificación de cierre es la de la Tarea 11 (bloques `apply-evidence.3` a `apply-evidence.12`).

Hallazgos (detalle en `observations.md`): el `POST` sin `content-type` a `/api/contacto` responde 403 en `main` y en el cambio (chequeo de origen de Astro), y el caso del plan es el `POST` JSON vacío → 400 (`apply-evidence.9`); `main` avanzó con el PR #33 durante la fase (`apply-evidence.11` y `.12`); las tarjetas `svc-card--static` conservan el zoom de imagen en hover de `services.css:69` (design.md D6: sin CSS nuevo).

## Commits

- `9e9a3bd` chore(sdd): record fix-i18n-links-and-404 planning artifacts
- `c50f5df` feat(i18n): add check-i18n-links sweep over static build — Tarea 1
- `4a496a0` fix(i18n): keep page language in internal links — Tareas 2 a 6
- `ca35054` fix(services): render catalog cards pointing to the catalog as static — Tarea 7
- `d8bfa0e` feat(navbar): accept optional currentPath override — Tarea 8
- `bbd659c` fix(seo): omit URL signals on noindex pages — Tarea 9
- `84af1c9` fix(i18n): render a single on-demand 404 in the URL locale — Tarea 10
