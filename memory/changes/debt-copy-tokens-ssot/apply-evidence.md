---
type: apply-evidence
change_name: "debt-copy-tokens-ssot"
created: "2026-10-08"
tags: [apply-evidence]
---

# Evidencia de sdd-apply: debt-copy-tokens-ssot

Ninguna tarea es `[TDD]` (el repo no tiene corredor de tests). Los bloques registran las verificaciones de cada tarea. Las rutas de código son relativas a `log-atm-web-astro/`.

## Tarea 1: Línea base de `dist/client` en el commit base

El commit base `e9d68aeda82e` se extrajo con `git archive` en un directorio de temporales del despacho, fuera de todo repo, y se construyó ahí con el `node_modules` del checkout principal enlazado. La extracción quedó en `log-atm-web-astro/.wrangler/baseline/before/` (gitignored), junto con `extract-site-signals.mjs`, `base-sha.txt`, el HTML de las 18 páginas, los CSS, el sitemap, `robots.txt`, `manifest.json` y el log del build. La 404 no se prerenderiza (la sirve el worker), así que no tiene `index.html`. La copia se borró al terminar.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["tail","-n","4","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/.wrangler/baseline/before/build.log"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"e9d68aeda82ebb3cbb7d43264c33c31251ea70ff","fecha":"2026-10-08T00:12:29-03:00","exit":0,"sha256":"2a1771b74e1d4a4bf927ea91ccfe3f0ac89d52037e3ca20fdb2a9cf9613af106","lineas":4,"omitidas":0,"no_recomprobable":"log del build del commit base, construido en una copia aislada ya borrada"} -->
**Evidencia `apply-evidence.1`** · exit 0 · 4 líneas, 0 omitidas · HEAD `e9d68aeda82e` · 2026-10-08T00:12:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: log del build del commit base, construido en una copia aislada ya borrada

```text
tail -n 4 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/.wrangler/baseline/before/build.log
```

```text
00:11:00 [build] ✓ Completed in 98.14s.
00:11:00 [@astrojs/sitemap] `sitemap-index.xml` created at `dist/client`
00:11:00 [build] Server built in 102.96s
00:11:00 [build] Complete!
```
<!-- evidencia:fin apply-evidence.1 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"argv","argv":["bash","-c","ls before before/css; cat base-sha.txt; git -C .. status --short --untracked-files=normal -- .wrangler; git -C .. check-ignore -v .wrangler/baseline"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/.wrangler/baseline","head":"e9d68aeda82ebb3cbb7d43264c33c31251ea70ff","fecha":"2026-10-08T00:12:29-03:00","exit":0,"sha256":"28049937d97d845b8957ebcad1ab5cf410f160d9c68eea0a4b4d50db7f01759d","lineas":35,"omitidas":0,"no_recomprobable":"listado de la línea base gitignored; la tarea 19 agrega after/ en el mismo directorio"} -->
**Evidencia `apply-evidence.2`** · exit 0 · 35 líneas, 0 omitidas · HEAD `e9d68aeda82e` · 2026-10-08T00:12:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/.wrangler/baseline`
No re-comprobable: listado de la línea base gitignored; la tarea 19 agrega after/ en el mismo directorio

```text
bash -c 'ls before before/css; cat base-sha.txt; git -C .. status --short --untracked-files=normal -- .wrangler; git -C .. check-ignore -v .wrangler/baseline'
```

```text
before:
build.log
contacto.txt
cotizar.txt
css
en__contacto.txt
en__cotizar.txt
en__industrias.txt
en__nosotros.txt
en__servicios.txt
en.txt
html
industrias.txt
manifest.json
nosotros.txt
pt__contacto.txt
pt__cotizar.txt
pt__industrias.txt
pt__nosotros.txt
pt__servicios.txt
pt.txt
robots.txt
root.txt
servicios.txt
sitemap-0.xml
sitemap-index.xml

before/css:
404.W5LOypAa.css
cotizar.CGYNusLs.css
Footer.BBdnDniw.css
index.B6U__OCa.css
shared.BqNyb62j.css
e9d68aeda82ebb3cbb7d43264c33c31251ea70ff
log-atm-web-astro/.gitignore:23:.wrangler/	.wrangler/baseline
```
<!-- evidencia:fin apply-evidence.2 -->

## Tarea 2: Dependencias en el worktree

`npm ci` instaló `node_modules/` (gitignored) en `log-atm-web-astro/`. Estado de partida de type-check y validación i18n sobre el commit base:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"argv","argv":["bash","-c","npm run check 2\u003e&1 | tail -n 6"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"e9d68aeda82ebb3cbb7d43264c33c31251ea70ff","fecha":"2026-10-08T00:12:51-03:00","exit":0,"sha256":"61ea55de905e0b117eda48909f2c95beffb5c54984c1a3585f4c43f9d2d6634b","lineas":6,"omitidas":0,"no_recomprobable":"estado de partida sobre el commit base; las tareas siguientes cambian los archivos que mide"} -->
**Evidencia `apply-evidence.3`** · exit 0 · 6 líneas, 0 omitidas · HEAD `e9d68aeda82e` · 2026-10-08T00:12:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: estado de partida sobre el commit base; las tareas siguientes cambian los archivos que mide

```text
bash -c 'npm run check 2>&1 | tail -n 6'
```

```text
00:12:43 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.3 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"e9d68aeda82ebb3cbb7d43264c33c31251ea70ff","fecha":"2026-10-08T00:12:51-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":"estado de partida sobre el commit base; las tareas 15 cambian los JSON que mide"} -->
**Evidencia `apply-evidence.4`** · exit 0 · 6 líneas, 0 omitidas · HEAD `e9d68aeda82e` · 2026-10-08T00:12:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: estado de partida sobre el commit base; las tareas 15 cambian los JSON que mide

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
```
<!-- evidencia:fin apply-evidence.4 -->

## Tareas 3 a 6: helper `tListFor`, migración de los 12 sitios y depuración de `constants.ts`

`src/i18n/utils.ts` exporta `tListFor(lang, key, data)`, junto a `tList`: resuelve el texto con `tList` y lanza un `Error` con la clave, el idioma y las dos longitudes si difieren. Los 12 sitios lo usan sin `??`: servicios en home y en `/servicios`, estadísticas del hero, motivos de «por qué», industrias en home y en `/industrias` (names, tags y servicesPer), valores y cómo trabajamos, modalidades y pasos de cotizar, y las opciones de modalidad y volumen del cotizador rápido. `constants.ts` conserva solo datos no textuales y ya no exporta `SEO`. Las cifras `num` (`20+`, `1:1`), `metric` (`1:1`, `24/7`, `4`) y la numeración `n`/`step` (`01`…) son neutras al idioma y quedan en los datos (decisión anotada en `observations.md`).

El bloque siguiente lista los archivos que usan el helper (los ocho de las tareas 4 y 5 más su definición) y confirma que no queda ningún `??` de fusión con datos en `components/` ni `pages/`:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"argv","argv":["bash","-c","/usr/bin/grep -rlw 'tListFor' src | sort; echo '--- fusiones ?? restantes:'; /usr/bin/grep -rnE '\\?\\? *(\\{|\\[\\]|[a-z]+\\.(title|name|desc|sub|label|tag)\\b)' src/components src/pages | wc -l"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"2836608bcc228f6114b1b45cf8e57c8a0e5cb3c3","fecha":"2026-10-08T00:18:51-03:00","exit":0,"sha256":"7e3b38aed0ec856e766e5c7c436871f43a9891b6188f190d9657d91aa1693d80","lineas":12,"omitidas":0,"no_recomprobable":"estado tras las tareas 3 a 6; las tareas 10 y 15 vuelven a editar algunos de estos archivos"} -->
**Evidencia `apply-evidence.5`** · exit 0 · 12 líneas, 0 omitidas · HEAD `2836608bcc22` · 2026-10-08T00:18:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: estado tras las tareas 3 a 6; las tareas 10 y 15 vuelven a editar algunos de estos archivos

```text
bash -c '/usr/bin/grep -rlw '"'"'tListFor'"'"' src | sort; echo '"'"'--- fusiones ?? restantes:'"'"'; /usr/bin/grep -rnE '"'"'\?\? *(\{|\[\]|[a-z]+\.(title|name|desc|sub|label|tag)\b)'"'"' src/components src/pages | wc -l'
```

```text
src/components/sections/CTASection.astro
src/components/sections/HeroSection.astro
src/components/sections/IndustriesSection.astro
src/components/sections/ServicesSection.astro
src/components/sections/WhyVideoSection.astro
src/i18n/utils.ts
src/pages/cotizar.astro
src/pages/industrias.astro
src/pages/nosotros.astro
src/pages/servicios.astro
--- fusiones ?? restantes:
0
```
<!-- evidencia:fin apply-evidence.5 -->

Búsqueda de los cuatro textos obsoletos y de `SEO` en `src/` (sin resultados en ambos casos):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"argv","argv":["bash","-c","/usr/bin/grep -rnE 'tiempos garantizados|Express · 48h|Bodegaje, fulfillment y última milla|KPIs medibles y revisión trimestral|Express 48h–7d' src | wc -l; /usr/bin/grep -rnw 'SEO' src --include='*.ts' --include='*.astro' | /usr/bin/grep -v '<!--' | /usr/bin/grep -v '^src/i18n/utils.ts:6:' | wc -l"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"2836608bcc228f6114b1b45cf8e57c8a0e5cb3c3","fecha":"2026-10-08T00:18:51-03:00","exit":0,"sha256":"52f96c26a39ed25108a6db43d6e11c6051eba8a498a5baab1891adfa7ac7c262","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.6`** · exit 0 · 2 líneas, 0 omitidas · HEAD `2836608bcc22` · 2026-10-08T00:18:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -rnE '"'"'tiempos garantizados|Express · 48h|Bodegaje, fulfillment y última milla|KPIs medibles y revisión trimestral|Express 48h–7d'"'"' src | wc -l; /usr/bin/grep -rnw '"'"'SEO'"'"' src --include='"'"'*.ts'"'"' --include='"'"'*.astro'"'"' | /usr/bin/grep -v '"'"'<!--'"'"' | /usr/bin/grep -v '"'"'^src/i18n/utils.ts:6:'"'"' | wc -l'
```

```text
0
0
```
<!-- evidencia:fin apply-evidence.6 -->

Type-check y build tras la tarea 6:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"argv","argv":["bash","-c","tail -n 4 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/check-t6.log; tail -n 2 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-t6.log"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"2836608bcc228f6114b1b45cf8e57c8a0e5cb3c3","fecha":"2026-10-08T00:18:51-03:00","exit":0,"sha256":"275b3d691d02cdf9d95991e01859fa6b83f33b288f1fb3ce9d9c192827b87075","lineas":6,"omitidas":0,"no_recomprobable":"log del build y del check de la tarea 6, guardados en el directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.7`** · exit 0 · 6 líneas, 0 omitidas · HEAD `2836608bcc22` · 2026-10-08T00:18:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: log del build y del check de la tarea 6, guardados en el directorio de temporales del despacho

```text
bash -c 'tail -n 4 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/check-t6.log; tail -n 2 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-t6.log'
```

```text
- 0 errors
- 0 warnings
- 0 hints

00:18:15 [build] Server built in 160.13s
00:18:15 [build] Complete!
```
<!-- evidencia:fin apply-evidence.7 -->

Con datos e i18n alineados, las señales extraídas de las 18 páginas coinciden con la línea base. El HTML crudo solo difiere en `industrias` (es, en, pt): el orden de claves del JSON inline que `define:vars` serializa (`name`/`sub` pasan detrás de `color`/`img`), con los mismos valores:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"argv","argv":["bash","-c","diff -r .wrangler/baseline/before /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/sig-t6.mVyrkgYo -x css -x html -x '*.xml' -x robots.txt -x manifest.json -x build.log && echo 'señales idénticas'; for f in $(cd .wrangler/baseline/before/html && find . -name index.html | sort); do cmp -s .wrangler/baseline/before/html/$f dist/client/$f || echo \"html distinto: $f\"; done; node -e 'const fs=require(\"fs\");const g=p=\u003e{const s=fs.readFileSync(p,\"utf8\");const m=s.match(/const industries = (\\[.*?\\]);/);return JSON.parse(m[1]).map(o=\u003eJSON.stringify(Object.fromEntries(Object.entries(o).sort())))};const a=g(\".wrangler/baseline/before/html/industrias/index.html\"),b=g(\"dist/client/industrias/index.html\");console.log(\"industrias: mismo contenido con claves ordenadas:\",JSON.stringify(a)===JSON.stringify(b))'"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"2836608bcc228f6114b1b45cf8e57c8a0e5cb3c3","fecha":"2026-10-08T00:18:51-03:00","exit":0,"sha256":"5e4871e7b687d6c12b37084f166961308f05b4cf109b7444026f6e799ed08e37","lineas":5,"omitidas":0,"no_recomprobable":"compara el dist de la tarea 6, que las tareas siguientes reconstruyen"} -->
**Evidencia `apply-evidence.8`** · exit 0 · 5 líneas, 0 omitidas · HEAD `2836608bcc22` · 2026-10-08T00:18:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: compara el dist de la tarea 6, que las tareas siguientes reconstruyen

```text
bash -c 'diff -r .wrangler/baseline/before /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/sig-t6.mVyrkgYo -x css -x html -x '"'"'*.xml'"'"' -x robots.txt -x manifest.json -x build.log && echo '"'"'señales idénticas'"'"'; for f in $(cd .wrangler/baseline/before/html && find . -name index.html | sort); do cmp -s .wrangler/baseline/before/html/$f dist/client/$f || echo "html distinto: $f"; done; node -e '"'"'const fs=require("fs");const g=p=>{const s=fs.readFileSync(p,"utf8");const m=s.match(/const industries = (\[.*?\]);/);return JSON.parse(m[1]).map(o=>JSON.stringify(Object.fromEntries(Object.entries(o).sort())))};const a=g(".wrangler/baseline/before/html/industrias/index.html"),b=g("dist/client/industrias/index.html");console.log("industrias: mismo contenido con claves ordenadas:",JSON.stringify(a)===JSON.stringify(b))'"'"''
```

```text
señales idénticas
html distinto: ./en/industrias/index.html
html distinto: ./industrias/index.html
html distinto: ./pt/industrias/index.html
industrias: mismo contenido con claves ordenadas: true
```
<!-- evidencia:fin apply-evidence.8 -->

## Tarea 7: Un desalineamiento rompe la validación y el build

Sobre una copia aislada de `f97a70e` (commit de la capa de copy), extraída con `git archive` bajo el directorio de temporales del despacho y borrada al terminar. Primera mutación: quitar el último ítem de `servicios.list` solo en `en.json`. `validate-i18n` sale con exit distinto de 0 y nombra el idioma y la clave faltante:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro","head":null,"fecha":"2026-10-08T00:19:39-03:00","exit":1,"sha256":"c9aaaaeafc48985bd0e903f8bff643baa349b9721d6048b1b71dec1b976e2a40","lineas":7,"omitidas":0,"no_recomprobable":"mutación sobre una copia aislada ya borrada"} -->
**Evidencia `apply-evidence.9`** · exit 1 · 7 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T00:19:39-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro`
No re-comprobable: mutación sobre una copia aislada ya borrada

```text
npm run validate-i18n
```

```text

> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: FAIL
  - missing: servicios.list.10.title, servicios.list.10.desc, servicios.list.10.tag
[i18n] pt: OK (536 claves)
```
<!-- evidencia:fin apply-evidence.9 -->

Segunda mutación: quitar ese ítem en `es.json`, `en.json` y `pt.json`. `validate-i18n` vuelve a la paridad y `astro build` se detiene con el mensaje de `tListFor` (clave, idioma y las dos longitudes); el filtro del comando deja solo las líneas del error:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"argv","argv":["bash","-c","npm run validate-i18n 2\u003e&1 | tail -n 2; npm run build \u003e ../build-mut1.log 2\u003e&1; st=$?; /usr/bin/grep -m 3 -E \"Lista desalineada\" ../build-mut1.log; echo \"exit del build: $st\"; exit $st"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro","head":null,"fecha":"2026-10-08T00:20:05-03:00","exit":0,"sha256":"9e01bfc897bd3fc6eb10e8c0d779cd5520ec75417d1a15427c3a5f6cb37f18c4","lineas":6,"omitidas":0,"no_recomprobable":"mutación sobre una copia aislada ya borrada"} -->
**Evidencia `apply-evidence.10`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T00:20:05-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro`
No re-comprobable: mutación sobre una copia aislada ya borrada

```text
bash -c 'npm run validate-i18n 2>&1 | tail -n 2; npm run build > ../build-mut1.log 2>&1; st=$?; /usr/bin/grep -m 3 -E "Lista desalineada" ../build-mut1.log; echo "exit del build: $st"; exit $st'
```

```text
[i18n] en: OK (533 claves)
[i18n] pt: OK (533 claves)
00:20:04   ├─ /servicios/index.html03:20:04 [ERROR] Error: [i18n] Lista desalineada: "servicios.list" (lang=es) tiene 10 ítems de texto y 11 ítems de datos
00:20:04   ├─ /en/servicios/index.htmlUncaught exception: workerd/jsg/_virtual_includes/iterator/workerd/jsg/value.h:1480: failed: remote.jsg.Error: [i18n] Lista desalineada: "servicios.list" (lang=en) tiene 10 ítems de texto y 11 ítems de datos
00:20:04   ├─ /pt/servicios/index.htmlUncaught exception: workerd/jsg/_virtual_includes/iterator/workerd/jsg/value.h:1480: failed: remote.jsg.Error: [i18n] Lista desalineada: "servicios.list" (lang=pt) tiene 10 ítems de texto y 11 ítems de datos
exit del build: 0
```
<!-- evidencia:fin apply-evidence.10 -->

**Hallazgo: el build termina en exit 0 pese al error.** El bloque anterior muestra el mensaje de `tListFor` para `/servicios`, `/en/servicios`, `/pt/servicios` y las tres portadas, pero `astro build` sale con exit 0. El prerenderizador de `@astrojs/cloudflare` 13.5.0 (por defecto en workerd) devuelve la respuesta de error sin lanzar, y Astro 6.3.1 escribe la página igual: el bloque siguiente muestra que `dist/client/index.html` queda con 0 bytes y que `dist/client/servicios/` queda sin `index.html`. El criterio de la tarea 7 («hace fallar `astro build`») no se cumple con el diseño de las tareas 3 a 6 en este entorno, y el modo de falla es peor que el que la spec quiere evitar: una página vacía en vez de texto de respaldo.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"argv","argv":["bash","-c","tail -n 1 ../build-mut1.log; wc -c dist/client/index.html dist/client/en/index.html; ls -A dist/client/servicios | wc -l"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro","head":null,"fecha":"2026-10-08T00:21:15-03:00","exit":0,"sha256":"62a52030d76f5483053333ec6dc0c90b82d64f13e5b149b93f480a7980e7ec7a","lineas":6,"omitidas":0,"no_recomprobable":"build mutado en una copia aislada ya borrada"} -->
**Evidencia `apply-evidence.11`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T00:21:15-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro`
No re-comprobable: build mutado en una copia aislada ya borrada

```text
bash -c 'tail -n 1 ../build-mut1.log; wc -c dist/client/index.html dist/client/en/index.html; ls -A dist/client/servicios | wc -l'
```

```text
00:20:05 [build] Complete!
0 total
0
wc: dist/client/index.html: No such file or directory
wc: dist/client/en/index.html: No such file or directory
ls: cannot access 'dist/client/servicios': No such file or directory
```
<!-- evidencia:fin apply-evidence.11 -->

Contraste en la misma copia: con `prerenderEnvironment: 'node'` en las opciones del adaptador (cambio solo en la copia, no aplicado al repo), el mismo build se detiene con exit 1 y el mensaje de `tListFor`:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"argv","argv":["bash","-c","/usr/bin/grep -n \"prerenderEnvironment\" astro.config.mjs; /usr/bin/grep -m 2 -E \"Caught error rendering|^\\[i18n\\] Lista desalineada\" ../build-mut-node.log"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro","head":null,"fecha":"2026-10-08T00:21:15-03:00","exit":0,"sha256":"113766565b00fc7ce52342b655e108bac1a2437910560f49afdc16674c74575e","lineas":3,"omitidas":0,"no_recomprobable":"build experimental en una copia aislada ya borrada"} -->
**Evidencia `apply-evidence.12`** · exit 0 · 3 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T00:21:15-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro`
No re-comprobable: build experimental en una copia aislada ya borrada

```text
bash -c '/usr/bin/grep -n "prerenderEnvironment" astro.config.mjs; /usr/bin/grep -m 2 -E "Caught error rendering|^\[i18n\] Lista desalineada" ../build-mut-node.log'
```

```text
57:    prerenderEnvironment: 'node',
00:20:58 [ERROR] [build] Caught error rendering /servicios: Error: [i18n] Lista desalineada: "servicios.list" (lang=es) tiene 10 ítems de texto y 11 ítems de datos
[i18n] Lista desalineada: "servicios.list" (lang=es) tiene 10 ítems de texto y 11 ítems de datos
```
<!-- evidencia:fin apply-evidence.12 -->

Exit code de ese build experimental, re-ejecutado sobre la misma copia:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.13","forma":"argv","argv":["bash","-c","npm run build \u003e ../build-mut-node2.log 2\u003e&1; st=$?; /usr/bin/grep -m 1 \"Caught error rendering\" ../build-mut-node2.log; echo \"exit del build: $st\"; exit $st"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro","head":null,"fecha":"2026-10-08T00:21:31-03:00","exit":1,"sha256":"5c2d31da83758ad8c1750d395a378ef1815106fdcb36e7d6f112d03a05b6a757","lineas":2,"omitidas":0,"no_recomprobable":"build experimental en una copia aislada ya borrada"} -->
**Evidencia `apply-evidence.13`** · exit 1 · 2 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T00:21:31-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro`
No re-comprobable: build experimental en una copia aislada ya borrada

```text
bash -c 'npm run build > ../build-mut-node2.log 2>&1; st=$?; /usr/bin/grep -m 1 "Caught error rendering" ../build-mut-node2.log; echo "exit del build: $st"; exit $st'
```

```text
00:21:31 [ERROR] [build] Caught error rendering /servicios: Error: [i18n] Lista desalineada: "servicios.list" (lang=es) tiene 10 ítems de texto y 11 ítems de datos
exit del build: 1
```
<!-- evidencia:fin apply-evidence.13 -->

Tercera mutación, con la configuración del repo (copia restaurada): quitar el último ítem de `industrias.tags` (lista de listas) en los tres idiomas. El helper detecta el desalineamiento de la lista anidada en las tres páginas de industrias; el build vuelve a terminar en exit 0:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.14","forma":"argv","argv":["bash","-c","npm run build \u003e ../build-mut2.log 2\u003e&1; st=$?; /usr/bin/grep -oE \"Lista desalineada: [^\\n]*\" ../build-mut2.log; echo \"exit del build: $st\"; exit $st"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro","head":null,"fecha":"2026-10-08T00:21:48-03:00","exit":0,"sha256":"513d3bade37e0f7365c208cee12b96927223f96db837594161ba234c29ede2c3","lineas":4,"omitidas":0,"no_recomprobable":"mutación sobre una copia aislada ya borrada"} -->
**Evidencia `apply-evidence.14`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T00:21:48-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut.0fe3z4lf/log-atm-web-astro`
No re-comprobable: mutación sobre una copia aislada ya borrada

```text
bash -c 'npm run build > ../build-mut2.log 2>&1; st=$?; /usr/bin/grep -oE "Lista desalineada: [^\n]*" ../build-mut2.log; echo "exit del build: $st"; exit $st'
```

```text
Lista desalineada: "i
Lista desalineada: "i
Lista desalineada: "i
exit del build: 0
```
<!-- evidencia:fin apply-evidence.14 -->

El filtro `[^\n]` del bloque anterior corta el mensaje en la primera «n». Repetición de la tercera mutación en una copia nueva de `f97a70e`, con el mensaje completo:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.15","forma":"argv","argv":["bash","-c","npm run build \u003e ../build-mut3.log 2\u003e&1; st=$?; /usr/bin/grep -oE \"Lista desalineada: .* de datos\" ../build-mut3.log; echo \"exit del build: $st\"; exit $st"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut2.dBHuFBgx/log-atm-web-astro","head":null,"fecha":"2026-10-08T00:22:10-03:00","exit":0,"sha256":"cc072f05093579b492d19fa76447604154592104c14c350daad845586880a777","lineas":4,"omitidas":0,"no_recomprobable":"mutación sobre una copia aislada ya borrada"} -->
**Evidencia `apply-evidence.15`** · exit 0 · 4 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T00:22:10-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/mut2.dBHuFBgx/log-atm-web-astro`
No re-comprobable: mutación sobre una copia aislada ya borrada

```text
bash -c 'npm run build > ../build-mut3.log 2>&1; st=$?; /usr/bin/grep -oE "Lista desalineada: .* de datos" ../build-mut3.log; echo "exit del build: $st"; exit $st'
```

```text
Lista desalineada: "industrias.tags" (lang=es) tiene 11 ítems de texto y 12 ítems de datos
Lista desalineada: "industrias.tags" (lang=en) tiene 11 ítems de texto y 12 ítems de datos
Lista desalineada: "industrias.tags" (lang=pt) tiene 11 ítems de texto y 12 ítems de datos
exit del build: 0
```
<!-- evidencia:fin apply-evidence.15 -->

Sin mutación, el worktree construye y pasa el type-check (bloques `apply-evidence.7` y, sobre el árbol final, los de las tareas 19 y 20). Las copias aisladas se borraron.

**Estado de la tarea 7:** se cumplen el escenario de un solo idioma (`apply-evidence.9`) y el mensaje del helper con clave, idioma y longitudes, también en listas anidadas (`apply-evidence.10`, `apply-evidence.15`). No se cumple «hace fallar `astro build`»: con el prerenderizado en workerd que usa el repo, el build sale con exit 0 (`apply-evidence.10`, `apply-evidence.11`, `apply-evidence.15`); con `prerenderEnvironment: 'node'` sí falla (`apply-evidence.13`). Elegir entre cambiar el entorno de prerenderizado, agregar una guarda propia al build u otra salida es una decisión de stack que la fase no toma (registrada con `[pre-adr]` en `observations.md`).

## Tarea 8: Convención de fuentes de datos en el perfil

`memory/_profile.md` enuncia en `## Conventions` las tres fuentes únicas (i18n para el texto visible, `constants.ts` para los datos no textuales alineados con `tListFor`, `src/lib/site.ts` para la identidad) y la línea «**Convention:**» de `## Image Pipeline (Current)` lo repite para los assets; `updated: "2026-10-08"`. Sin bloque: es una edición de texto que se ve en el diff del commit.

## Tareas 9 a 12: `src/lib/site.ts` y sus consumidores

`site.ts` no importa nada y exporta `SITE` (nombre, URL `https://www.logatm.com`, teléfono y su forma de lectura, email, dirección estructurada, coordenadas y redes, sin slogan) más los derivados `WHATSAPP_URL`, `ADDRESS_LINE` y `ADDRESS_EMAIL_HTML`. El bloque siguiente lo carga con `node --experimental-strip-types` sin otras dependencias y compara los derivados con los literales que reemplaza:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.16","forma":"argv","argv":["bash","-c","node --experimental-strip-types --no-warnings -e 'import(\"./src/lib/site.ts\").then(m=\u003e{console.log(\"whatsapp igual al literal previo:\", m.WHATSAPP_URL===\"https://wa.me/56982708492?text=Hola%2C%20me%20interesa%20cotizar\");console.log(\"dirección igual al literal previo:\", m.ADDRESS_LINE===\"Av. Pdte Kennedy 5600, Of. 507, Vitacura, Santiago, Chile\");console.log(\"dirección del correo igual al HTML previo:\", m.ADDRESS_EMAIL_HTML===\"Av. Pdte Kennedy 5600, Of. 507<br\u003eVitacura &middot; Santiago &middot; Chile\");console.log(m.SITE.phoneDisplay, m.SITE.email, m.SITE.url)})'; /usr/bin/grep -c '^import' src/lib/site.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"f97a70e8cc07acb1967cba882c8a9f498b95519b","fecha":"2026-10-08T00:25:33-03:00","exit":1,"sha256":"0497ec61218d64e07b604d6a435c99a8c07b5b6f36620f36b1fdf9e700bd3a1b","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.16`** · exit 1 · 5 líneas, 0 omitidas · HEAD `f97a70e8cc07` · 2026-10-08T00:25:33-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`

```text
bash -c 'node --experimental-strip-types --no-warnings -e '"'"'import("./src/lib/site.ts").then(m=>{console.log("whatsapp igual al literal previo:", m.WHATSAPP_URL==="https://wa.me/56982708492?text=Hola%2C%20me%20interesa%20cotizar");console.log("dirección igual al literal previo:", m.ADDRESS_LINE==="Av. Pdte Kennedy 5600, Of. 507, Vitacura, Santiago, Chile");console.log("dirección del correo igual al HTML previo:", m.ADDRESS_EMAIL_HTML==="Av. Pdte Kennedy 5600, Of. 507<br>Vitacura &middot; Santiago &middot; Chile");console.log(m.SITE.phoneDisplay, m.SITE.email, m.SITE.url)})'"'"'; /usr/bin/grep -c '"'"'^import'"'"' src/lib/site.ts'
```

```text
whatsapp igual al literal previo: true
dirección igual al literal previo: true
dirección del correo igual al HTML previo: true
+56 9 8270 8492 contacto@logatm.com https://www.logatm.com
0
```
<!-- evidencia:fin apply-evidence.16 -->

El exit 1 de `apply-evidence.16` lo da su último comando, `grep -c '^import'`, que sale con 1 cuando cuenta 0 coincidencias: `site.ts` no tiene imports.

`SITE` ya no existe en `constants.ts`; los consumidores (Footer, Navbar, Hero, CTA, contacto, cotizar, BaseLayout, email-templates, `astro.config.mjs` y el endpoint de robots) leen de `site.ts`, y `BaseLayout` no define nombre ni URL propios:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.17","forma":"argv","argv":["bash","-c","/usr/bin/grep -c 'SITE' src/lib/constants.ts; /usr/bin/grep -rln \"from '[./]*lib/site'\\|from \\\"[./]*lib/site\\\"\\|from \\\"./site\\\"\\|from './src/lib/site.ts'\" src astro.config.mjs | sort; echo '--- literales de identidad en BaseLayout, email-templates y astro.config:'; /usr/bin/grep -nE 'SITE_NAME|SITE_URL|https://logatm\\.com|LOG ATM|a tu medida|Kennedy' src/layouts/BaseLayout.astro src/lib/email-templates.ts astro.config.mjs | wc -l; echo '--- +56 9 8270 8492 en src:'; /usr/bin/grep -rn '8270 8492' src"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"f97a70e8cc07acb1967cba882c8a9f498b95519b","fecha":"2026-10-08T00:25:34-03:00","exit":0,"sha256":"af82546316264fdb43b97f35f1e0daa6f516e46369f028b15f38a6292de23f2e","lineas":15,"omitidas":0,"no_recomprobable":"estado tras las tareas 9 a 14; la tarea 15 vuelve a editar cotizar.astro y constants.ts"} -->
**Evidencia `apply-evidence.17`** · exit 0 · 15 líneas, 0 omitidas · HEAD `f97a70e8cc07` · 2026-10-08T00:25:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: estado tras las tareas 9 a 14; la tarea 15 vuelve a editar cotizar.astro y constants.ts

```text
bash -c '/usr/bin/grep -c '"'"'SITE'"'"' src/lib/constants.ts; /usr/bin/grep -rln "from '"'"'[./]*lib/site'"'"'\|from \"[./]*lib/site\"\|from \"./site\"\|from '"'"'./src/lib/site.ts'"'"'" src astro.config.mjs | sort; echo '"'"'--- literales de identidad en BaseLayout, email-templates y astro.config:'"'"'; /usr/bin/grep -nE '"'"'SITE_NAME|SITE_URL|https://logatm\.com|LOG ATM|a tu medida|Kennedy'"'"' src/layouts/BaseLayout.astro src/lib/email-templates.ts astro.config.mjs | wc -l; echo '"'"'--- +56 9 8270 8492 en src:'"'"'; /usr/bin/grep -rn '"'"'8270 8492'"'"' src'
```

```text
0
astro.config.mjs
src/components/sections/CTASection.astro
src/components/sections/HeroSection.astro
src/components/ui/Footer.astro
src/components/ui/Navbar.astro
src/layouts/BaseLayout.astro
src/lib/email-templates.ts
src/pages/contacto.astro
src/pages/cotizar.astro
src/pages/robots.txt.ts
--- literales de identidad en BaseLayout, email-templates y astro.config:
0
--- +56 9 8270 8492 en src:
src/lib/site.ts:12:  phoneDisplay: '+56 9 8270 8492',
```
<!-- evidencia:fin apply-evidence.17 -->

Los tres correos (contacto, cotización rápida y cotización de 4 pasos) renderizados con datos fijos y la fecha sustituida por un stub, con la plantilla del commit base y con la actual, dan el mismo HTML y texto. Fixture bajo el directorio de temporales del despacho (`render.mts` y un `mailer.ts` stub, porque el real importa `cloudflare:workers`):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.18","forma":"argv","argv":["bash","-c","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/node_modules/.bin/tsx render.mts /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/email-fixture.C6owpq9g/before \u003e before.json && /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/node_modules/.bin/tsx render.mts /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/email-fixture.C6owpq9g/after \u003e after.json && cmp before.json after.json && echo 'correos idénticos'; wc -c < after.json; head -n 4 after/lib/email-templates.ts"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/email-fixture.C6owpq9g","head":null,"fecha":"2026-10-08T00:25:34-03:00","exit":0,"sha256":"6de3b4f98462ea6df4f818c19449fa8264569f66888ef50d5651b042ad114fc2","lineas":6,"omitidas":0,"no_recomprobable":"fixture en el directorio de temporales del despacho, borrado al terminar la fase"} -->
**Evidencia `apply-evidence.18`** · exit 0 · 6 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-08T00:25:34-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/email-fixture.C6owpq9g`
No re-comprobable: fixture en el directorio de temporales del despacho, borrado al terminar la fase

```text
bash -c '/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/node_modules/.bin/tsx render.mts /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/email-fixture.C6owpq9g/before > before.json && /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/node_modules/.bin/tsx render.mts /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/email-fixture.C6owpq9g/after > after.json && cmp before.json after.json && echo '"'"'correos idénticos'"'"'; wc -c < after.json; head -n 4 after/lib/email-templates.ts'
```

```text
correos idénticos
30822
import { formatDateCL } from "./mailer";
import { SITE, ADDRESS_EMAIL_HTML } from "./site";
// Solo la clave `meta`: los correos al operador se redactan en español y el bundler descarta el resto del JSON.
import { meta } from "../i18n/translations/es.json";
```
<!-- evidencia:fin apply-evidence.18 -->

El chunk del worker de correo importa de `site` solo los bindings `SITE`, `meta` y `ADDRESS_EMAIL_HTML`. El chunk compartido `site_*.mjs` lleva igual el diccionario español completo porque la 404 bajo demanda (que usa `t()`) comparte ese chunk; el import nombrado no agrega peso al worker:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.19","forma":"argv","argv":["bash","-c","/usr/bin/grep -h '^import' dist/server/chunks/email-templates_*.mjs; /usr/bin/grep -l 'site_' dist/server/chunks/*.mjs | xargs -n1 basename"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"f97a70e8cc07acb1967cba882c8a9f498b95519b","fecha":"2026-10-08T00:25:34-03:00","exit":0,"sha256":"b441af5534f1745eb6d75e17c028953f548ddc91a69065ba53f64afe7fe23034","lineas":5,"omitidas":0,"no_recomprobable":"inspecciona el dist de la tarea 14, que las tareas siguientes reconstruyen"} -->
**Evidencia `apply-evidence.19`** · exit 0 · 5 líneas, 0 omitidas · HEAD `f97a70e8cc07` · 2026-10-08T00:25:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: inspecciona el dist de la tarea 14, que las tareas siguientes reconstruyen

```text
bash -c '/usr/bin/grep -h '"'"'^import'"'"' dist/server/chunks/email-templates_*.mjs; /usr/bin/grep -l '"'"'site_'"'"' dist/server/chunks/*.mjs | xargs -n1 basename'
```

```text
import { connect } from "cloudflare:sockets";
import { env } from "cloudflare:workers";
import { S as SITE, m as meta, a as ADDRESS_EMAIL_HTML } from "./site_CW62D9M4.mjs";
404_C6k5obDO.mjs
email-templates_BdKxAzvP.mjs
```
<!-- evidencia:fin apply-evidence.19 -->

## Tareas 13 y 14: host canónico desde `site.ts` y `robots.txt` prerenderizado

`astro.config.mjs` importa `SITE` de `./src/lib/site.ts` y usa `site: SITE.url`. `src/pages/robots.txt.ts` (`prerender = true`) responde `text/plain; charset=utf-8` con la línea `Sitemap:` armada desde `SITE.url`, y `public/robots.txt` se eliminó. Build, sitemap y robots:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.20","forma":"argv","argv":["bash","-c","tail -n 1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-t14.log; /usr/bin/grep -c 'robots.txt' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-t14.log; ls public/robots.txt 2\u003e&1; diff .wrangler/baseline/before/robots.txt dist/client/robots.txt; cat dist/client/sitemap-index.xml; echo; /usr/bin/grep -o '<loc\u003e[^<]*</loc\u003e' dist/client/sitemap-0.xml | head -n 3"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"f97a70e8cc07acb1967cba882c8a9f498b95519b","fecha":"2026-10-08T00:25:34-03:00","exit":0,"sha256":"c3a5df67dbd1966dd36a3774293987d96d0ae6374f594ab86611d36acf741082","lineas":11,"omitidas":0,"no_recomprobable":"log del build de la tarea 14 en el directorio de temporales y dist reconstruido por tareas posteriores"} -->
**Evidencia `apply-evidence.20`** · exit 0 · 11 líneas, 0 omitidas · HEAD `f97a70e8cc07` · 2026-10-08T00:25:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: log del build de la tarea 14 en el directorio de temporales y dist reconstruido por tareas posteriores

```text
bash -c 'tail -n 1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-t14.log; /usr/bin/grep -c '"'"'robots.txt'"'"' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-t14.log; ls public/robots.txt 2>&1; diff .wrangler/baseline/before/robots.txt dist/client/robots.txt; cat dist/client/sitemap-index.xml; echo; /usr/bin/grep -o '"'"'<loc>[^<]*</loc>'"'"' dist/client/sitemap-0.xml | head -n 3'
```

```text
00:24:26 [build] Complete!
1
ls: cannot access 'public/robots.txt': No such file or directory
4c4
< Sitemap: https://logatm.com/sitemap-index.xml
---
> Sitemap: https://www.logatm.com/sitemap-index.xml
<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://www.logatm.com/sitemap-0.xml</loc></sitemap></sitemapindex>
<loc>https://www.logatm.com/</loc>
<loc>https://www.logatm.com/contacto/</loc>
<loc>https://www.logatm.com/cotizar/</loc>
```
<!-- evidencia:fin apply-evidence.20 -->

`astro preview` relanzado tras el build, consulta de `/robots.txt`:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.21","forma":"argv","argv":["bash","-c","curl -sI http://localhost:4391/robots.txt | /usr/bin/grep -i '^HTTP\\|^content-type'; curl -s http://localhost:4391/robots.txt"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"f97a70e8cc07acb1967cba882c8a9f498b95519b","fecha":"2026-10-08T00:25:34-03:00","exit":0,"sha256":"eb39b579201a5812865ea0127658ccb87ce881fbc008afc2790df751ff1c47f7","lineas":6,"omitidas":0,"no_recomprobable":"requiere el servidor de astro preview, que se baja al terminar"} -->
**Evidencia `apply-evidence.21`** · exit 0 · 6 líneas, 0 omitidas · HEAD `f97a70e8cc07` · 2026-10-08T00:25:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: requiere el servidor de astro preview, que se baja al terminar

```text
bash -c 'curl -sI http://localhost:4391/robots.txt | /usr/bin/grep -i '"'"'^HTTP\|^content-type'"'"'; curl -s http://localhost:4391/robots.txt'
```

```text
HTTP/1.1 200 OK�
content-type: text/plain; charset=utf-8�
User-agent: *
Allow: /

Sitemap: https://www.logatm.com/sitemap-index.xml
```
<!-- evidencia:fin apply-evidence.21 -->

## Tarea 15: Extras sin «Última milla» y opción de origen «Otro» traducida

`cotizar.extras` pierde «Última milla», «Last mile» y «Última milha»; `cotizar.step2.originOther` agrega «Otro», «Other» y «Outro». `QUOTE_ORIGINS` ya no incluye `'Otro'`: `cotizar.astro` agrega al final del `<select id="q-origin">` la opción fija `value="Otro"` con la etiqueta del i18n. `QUOTE_ORIGINS` solo se usa en `cotizar.astro` y `api/cotizacion.ts` normaliza `services` como lista de textos sin depender de su cantidad (sin cambios). El resumen del wizard muestra el valor de la opción (`state.origin`, en `wizard.ts`), así que tras elegirla muestra «Otro» en los tres idiomas, igual que lo que recibe el operador (anotado en `observations.md`).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.22","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"356ebd80b4df8a1b51c6b78427587c8a85988e52","fecha":"2026-10-08T00:26:34-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.22`** · exit 0 · 6 líneas, 0 omitidas · HEAD `356ebd80b4df` · 2026-10-08T00:26:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`

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

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.23","forma":"argv","argv":["bash","-c","tail -n 4 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/check-t15.log; tail -n 1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-t15.log; for l in '' en/ pt/; do echo \"/${l}cotizar: extras=$(/usr/bin/grep -o 'class=\"chip-multi\"' dist/client/${l}cotizar/index.html | wc -l) $(/usr/bin/grep -o '<option value=\"Otro\"\u003e[^<]*</option\u003e' dist/client/${l}cotizar/index.html)\"; done; /usr/bin/grep -rlE 'Última milla|Last mile|Última milha' dist/client src | wc -l; /usr/bin/grep -rn 'QUOTE_ORIGINS' src | cut -d: -f1 | sort -u"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"356ebd80b4df8a1b51c6b78427587c8a85988e52","fecha":"2026-10-08T00:26:34-03:00","exit":0,"sha256":"c8735a9921d009c6d3f36981bdf281016b75f155f6d76ef3b88b5a3117528f27","lineas":12,"omitidas":0,"no_recomprobable":"dist y logs de la tarea 15; la tarea 16 reconstruye"} -->
**Evidencia `apply-evidence.23`** · exit 0 · 12 líneas, 0 omitidas · HEAD `356ebd80b4df` · 2026-10-08T00:26:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: dist y logs de la tarea 15; la tarea 16 reconstruye

```text
bash -c 'tail -n 4 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/check-t15.log; tail -n 1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-t15.log; for l in '"'"''"'"' en/ pt/; do echo "/${l}cotizar: extras=$(/usr/bin/grep -o '"'"'class="chip-multi"'"'"' dist/client/${l}cotizar/index.html | wc -l) $(/usr/bin/grep -o '"'"'<option value="Otro">[^<]*</option>'"'"' dist/client/${l}cotizar/index.html)"; done; /usr/bin/grep -rlE '"'"'Última milla|Last mile|Última milha'"'"' dist/client src | wc -l; /usr/bin/grep -rn '"'"'QUOTE_ORIGINS'"'"' src | cut -d: -f1 | sort -u'
```

```text
- 0 errors
- 0 warnings
- 0 hints

00:26:33 [build] Complete!
/cotizar: extras=12 <option value="Otro">Otro</option>
/en/cotizar: extras=12 <option value="Otro">Other</option>
/pt/cotizar: extras=12 <option value="Otro">Outro</option>
0
src/components/sections/CTASection.astro
src/lib/constants.ts
src/pages/cotizar.astro
```
<!-- evidencia:fin apply-evidence.23 -->

El conteo `class="chip-multi"` del bloque anterior incluye otros grupos de chips de la página y la búsqueda de `QUOTE_ORIGINS` calza también con `QUICK_QUOTE_ORIGINS`. Conteo acotado a `#extras-chips` y búsqueda por palabra completa:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.24","forma":"argv","argv":["bash","-c","for l in '' en/ pt/; do python3 -c 'import re,sys;s=open(sys.argv[1]).read();i=s.index(\"id=\\\"extras-chips\\\"\");j=s.index(\"</div\u003e\",i);print(sys.argv[1], re.findall(r\"data-extra=\\\"([^\\\"]*)\\\"\", s[i:j]))' dist/client/${l}cotizar/index.html; done; /usr/bin/grep -rlw 'QUOTE_ORIGINS' src | sort"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"356ebd80b4df8a1b51c6b78427587c8a85988e52","fecha":"2026-10-08T00:26:46-03:00","exit":0,"sha256":"416147cf1dac4d7ce57d6f04a6da82af6497f8d272619c86ca996c1d89359281","lineas":5,"omitidas":0,"no_recomprobable":"dist de la tarea 15; la tarea 16 reconstruye"} -->
**Evidencia `apply-evidence.24`** · exit 0 · 5 líneas, 0 omitidas · HEAD `356ebd80b4df` · 2026-10-08T00:26:46-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: dist de la tarea 15; la tarea 16 reconstruye

```text
bash -c 'for l in '"'"''"'"' en/ pt/; do python3 -c '"'"'import re,sys;s=open(sys.argv[1]).read();i=s.index("id=\"extras-chips\"");j=s.index("</div>",i);print(sys.argv[1], re.findall(r"data-extra=\"([^\"]*)\"", s[i:j]))'"'"' dist/client/${l}cotizar/index.html; done; /usr/bin/grep -rlw '"'"'QUOTE_ORIGINS'"'"' src | sort'
```

```text
dist/client/cotizar/index.html ['Aduana', 'Seguro de carga', 'Almacenaje destino', 'Inspección origen']
dist/client/en/cotizar/index.html ['Customs', 'Cargo insurance', 'Destination warehousing', 'Origin inspection']
dist/client/pt/cotizar/index.html ['Aduana', 'Seguro de carga', 'Armazenagem destino', 'Inspeção origem']
src/lib/constants.ts
src/pages/cotizar.astro
```
<!-- evidencia:fin apply-evidence.24 -->

## Tarea 16: Tokens sin consumidores retirados de `tokens.css`

Se eliminaron los 18 `--opacity-*` (con su encabezado) y `--color-whatsapp-hover-dark`, en `:root` y en `@theme`. Los tokens de WhatsApp en uso siguen con sus valores, y `@theme` gana los cinco `--shadow-*` con los mismos valores de `:root` (los radios ya estaban en ambos bloques). Antes de editar no había consumidores de los tokens retirados en `src/` ni en `DESIGN.md`. La única coincidencia de `DESIGN.md`, «Disabled: opacity-50», nombra la utilidad estándar de Tailwind, no el token. Estado actual:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.25","forma":"argv","argv":["bash","-c","/usr/bin/grep -rnE -- '--opacity-|whatsapp-hover-dark' src DESIGN.md | wc -l; /usr/bin/grep -nE -- '--color-whatsapp(-hover|-text)?:' src/styles/tokens.css; /usr/bin/grep -nE -- '--(shadow|radius)-[a-z0-9]+:' src/styles/tokens.css | awk -F: '{print $2}' | sed 's/^ *//' | sort | uniq -c | awk '{print $1, $2}' | tr '\\n' ' '; echo"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"c7f6b5503b662f1f99afc2d457c699eab23ada96","fecha":"2026-10-08T00:29:13-03:00","exit":0,"sha256":"a5455212c5a7ed0a9a7703eb08bf0c6fd19c83176e2f25ebc014376d239571b2","lineas":8,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.25`** · exit 0 · 8 líneas, 0 omitidas · HEAD `c7f6b5503b66` · 2026-10-08T00:29:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -rnE -- '"'"'--opacity-|whatsapp-hover-dark'"'"' src DESIGN.md | wc -l; /usr/bin/grep -nE -- '"'"'--color-whatsapp(-hover|-text)?:'"'"' src/styles/tokens.css; /usr/bin/grep -nE -- '"'"'--(shadow|radius)-[a-z0-9]+:'"'"' src/styles/tokens.css | awk -F: '"'"'{print $2}'"'"' | sed '"'"'s/^ *//'"'"' | sort | uniq -c | awk '"'"'{print $1, $2}'"'"' | tr '"'"'\n'"'"' '"'"' '"'"'; echo'
```

```text
0
57:    --color-whatsapp:           #25D366;
58:    --color-whatsapp-hover:     #1da851;
59:    --color-whatsapp-text:      #111b21; /* par: 8.80 reposo · 5.63 hover */
186:  --color-whatsapp:            #25D366;
187:  --color-whatsapp-hover:      #1da851;
188:  --color-whatsapp-text:       #111b21;
2 --radius-2xl 2 --radius-card 2 --radius-circle 2 --radius-input 2 --radius-lg 2 --radius-md 2 --radius-pill 2 --radius-sm 2 --radius-xl 2 --radius-xs 2 --shadow-cta 2 --shadow-lg 2 --shadow-md 2 --shadow-sm 2 --shadow-xl 
```
<!-- evidencia:fin apply-evidence.25 -->

Medición pedida por la tarea: con los `--shadow-*` en `@theme`, el CSS construido difiere en más que las declaraciones eliminadas (el diff completo lo registra la tarea 19). Tailwind reemplaza en su capa `theme` los valores por defecto de `--shadow-sm|md|xl` por los del proyecto y agrega `--shadow-cta`. También cambian las reglas utilitarias `.shadow-sm|md|lg|xl|cta`, que genera porque esos nombres aparecen en hojas y documentos, y `.shadow-cta` pasa de color de sombra a sombra. El aspecto no cambia: ningún elemento del HTML construido usa clases `shadow-*`, y los valores que leen los estilos (`var(--shadow-*)`) siguen saliendo de `:root` en `@layer base`, que se impone a la capa `theme`. Esto tensiona el criterio 4 de [[color-token-policy]] («el CSS difiere solo en las declaraciones eliminadas») con el 5 («sombras disponibles como utilidades de Tailwind»). La tensión queda registrada en `observations.md` y en los riesgos del reporte, sin decidirla aquí:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.26","forma":"argv","argv":["bash","-c","/usr/bin/grep -rhoE 'class=\"[^\"]*\"' dist/client --include='*.html' | /usr/bin/grep -oE '(^|[ \"])shadow-[a-z0-9-]+' | wc -l"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"c7f6b5503b662f1f99afc2d457c699eab23ada96","fecha":"2026-10-08T00:29:13-03:00","exit":0,"sha256":"9a271f2a916b0b6ee6cecb2426f0b3206ef074578be55d9bc94f6f3fe3ab86aa","lineas":1,"omitidas":0,"no_recomprobable":"inspecciona el dist reconstruido en la tarea 19"} -->
**Evidencia `apply-evidence.26`** · exit 0 · 1 líneas, 0 omitidas · HEAD `c7f6b5503b66` · 2026-10-08T00:29:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: inspecciona el dist reconstruido en la tarea 19

```text
bash -c '/usr/bin/grep -rhoE '"'"'class="[^"]*"'"'"' dist/client --include='"'"'*.html'"'"' | /usr/bin/grep -oE '"'"'(^|[ "])shadow-[a-z0-9-]+'"'"' | wc -l'
```

```text
0
```
<!-- evidencia:fin apply-evidence.26 -->

## Tarea 17: La misma política de color en `tokens.css` y `DESIGN.md`

La cabecera de `tokens.css` y el «Don't» de `DESIGN.md` enuncian la política con las mismas tres frases (marca, semántica y pares validados solo vía tokens; ningún literal nuevo fuera de `tokens.css`, también con transparencia, salvo en los correos; los literales existentes son legado tolerado que no se migra). La sección «Excepcion: plantillas de correo» se conserva. El bloque compara las tres frases de ambos archivos:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.27","forma":"argv","argv":["bash","-c","a=$(sed -n 's/^ \\* - //p' src/styles/tokens.css | head -n 3); b=$(sed -n '/^- Política de color:/,/^- No mezclar/p' DESIGN.md | sed -n 's/^  - //p' | sed 's/ Ver «Excepcion: plantillas de correo».//'); [ \"$a\" = \"$b\" ] && echo 'mismo enunciado'; printf '%s\\n' \"$a\"; /usr/bin/grep -c '^### Excepcion: plantillas de correo' DESIGN.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"c7f6b5503b662f1f99afc2d457c699eab23ada96","fecha":"2026-10-08T00:29:30-03:00","exit":0,"sha256":"9143b72558c305073061d3771cdaa2ff1cd318ee233f8ce235701f71e5be016a","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.27`** · exit 0 · 5 líneas, 0 omitidas · HEAD `c7f6b5503b66` · 2026-10-08T00:29:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`

```text
bash -c 'a=$(sed -n '"'"'s/^ \* - //p'"'"' src/styles/tokens.css | head -n 3); b=$(sed -n '"'"'/^- Política de color:/,/^- No mezclar/p'"'"' DESIGN.md | sed -n '"'"'s/^  - //p'"'"' | sed '"'"'s/ Ver «Excepcion: plantillas de correo».//'"'"'); [ "$a" = "$b" ] && echo '"'"'mismo enunciado'"'"'; printf '"'"'%s\n'"'"' "$a"; /usr/bin/grep -c '"'"'^### Excepcion: plantillas de correo'"'"' DESIGN.md'
```

```text
mismo enunciado
Colores de marca, semánticos y pares de texto/fondo validados: solo vía tokens de `tokens.css`.
Ningún color literal nuevo fuera de `tokens.css` (tampoco con transparencia, como las capas que oscurecen fotos), salvo en las plantillas de correo.
Los literales existentes fuera de `tokens.css` son legado tolerado y no se migran.
1
```
<!-- evidencia:fin apply-evidence.27 -->

Recálculo WCAG 2.x (luminancia relativa sRGB) sobre los hex de `:root` en `tokens.css`, resolviendo `var()`. Script `contrast.py` en el directorio de temporales del despacho: compara los 30 ratios de la tabla «Pares de contraste validados» y los 13 de la paleta y de «No validos para texto normal», y confirma que cada tono marcado «no apto para texto normal» queda bajo 4.5:1 sobre blanco. No hubo que corregir ningún ratio. La sección «Focus ring» mantiene declarada la excepción vigente (`.why__video-toggle`), y `DESIGN.md` no menciona los tokens retirados:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.28","forma":"argv","argv":["bash","-c","python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/contrast.py src/styles/tokens.css | /usr/bin/grep -c '^ok '; python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/contrast.py src/styles/tokens.css | tail -n 1; /usr/bin/grep -c 'Excepcion vigente: .why__video-toggle' DESIGN.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"c7f6b5503b662f1f99afc2d457c699eab23ada96","fecha":"2026-10-08T00:29:30-03:00","exit":1,"sha256":"c007f1f04f3ce0643d08d376419f3a40558dc33cc0e168ed31158d2173f4c4ce","lineas":3,"omitidas":0,"no_recomprobable":"script en el directorio de temporales del despacho, borrado al terminar la fase"} -->
**Evidencia `apply-evidence.28`** · exit 1 · 3 líneas, 0 omitidas · HEAD `c7f6b5503b66` · 2026-10-08T00:29:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: script en el directorio de temporales del despacho, borrado al terminar la fase

```text
bash -c 'python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/contrast.py src/styles/tokens.css | /usr/bin/grep -c '"'"'^ok '"'"'; python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/contrast.py src/styles/tokens.css | tail -n 1; /usr/bin/grep -c '"'"'Excepcion vigente: .why__video-toggle'"'"' DESIGN.md'
```

```text
52
diferencias: 0
0
```
<!-- evidencia:fin apply-evidence.28 -->

## Tarea 18: Sucesión de las specs previas

Las nueve specs ya declaraban `superseded_by: "[[color-token-policy]]"` (las escribió `sdd-spec` y quedaron versionadas en `2836608`); no hubo que corregir ninguna:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.29","forma":"argv","argv":["bash","-c","for f in sections/cta-styles.md sections/hero-styles.md sections/services-styles.md sections/why-styles.md sections/industries-styles.md components/navbar-styles.md components/footer-styles.md tokens/create-functional-tokens.md ui-contrast/contrast-token-single-source.md; do echo \"$f: $(/usr/bin/grep -m1 '^superseded_by:' $f)\"; done"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/specs","head":"c7f6b5503b662f1f99afc2d457c699eab23ada96","fecha":"2026-10-08T00:29:30-03:00","exit":0,"sha256":"824ab9b4f1b107807b7760d83980d005e9d3d61ad1933dc2cfc296fc036a0efb","lineas":9,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.29`** · exit 0 · 9 líneas, 0 omitidas · HEAD `c7f6b5503b66` · 2026-10-08T00:29:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/memory/specs`

```text
bash -c 'for f in sections/cta-styles.md sections/hero-styles.md sections/services-styles.md sections/why-styles.md sections/industries-styles.md components/navbar-styles.md components/footer-styles.md tokens/create-functional-tokens.md ui-contrast/contrast-token-single-source.md; do echo "$f: $(/usr/bin/grep -m1 '"'"'^superseded_by:'"'"' $f)"; done'
```

```text
sections/cta-styles.md: superseded_by: "[[color-token-policy]]"
sections/hero-styles.md: superseded_by: "[[color-token-policy]]"
sections/services-styles.md: superseded_by: "[[color-token-policy]]"
sections/why-styles.md: superseded_by: "[[color-token-policy]]"
sections/industries-styles.md: superseded_by: "[[color-token-policy]]"
components/navbar-styles.md: superseded_by: "[[color-token-policy]]"
components/footer-styles.md: superseded_by: "[[color-token-policy]]"
tokens/create-functional-tokens.md: superseded_by: "[[color-token-policy]]"
ui-contrast/contrast-token-single-source.md: superseded_by: "[[color-token-policy]]"
```
<!-- evidencia:fin apply-evidence.29 -->

### Tarea 17: corrección de `apply-evidence.28`

En `apply-evidence.28`, las 52 líneas `ok` son los 43 ratios y las 9 comprobaciones «no apto». El exit 1 y el 0 final vienen del patrón de la excepción de foco, que no incluye el backtick de `DESIGN.md`. Búsqueda corregida:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.30","forma":"argv","argv":["bash","-c","/usr/bin/grep -c 'Excepcion vigente: `.why__video-toggle:focus-visible`' DESIGN.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"c7f6b5503b662f1f99afc2d457c699eab23ada96","fecha":"2026-10-08T00:29:51-03:00","exit":0,"sha256":"4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd865","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.30`** · exit 0 · 1 líneas, 0 omitidas · HEAD `c7f6b5503b66` · 2026-10-08T00:29:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -c '"'"'Excepcion vigente: `.why__video-toggle:focus-visible`'"'"' DESIGN.md'
```

```text
1
```
<!-- evidencia:fin apply-evidence.30 -->

## Tarea 19: `dist/client` final contra la línea base

Build del árbol final (`4ca32b7`) y extracción de señales en `.wrangler/baseline/after/` (gitignored):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.31","forma":"argv","argv":["bash","-c","tail -n 1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-final.log; /usr/bin/grep -c 'Uncaught\\|\\[ERROR\\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-final.log; find dist/client -name index.html | wc -l; find dist/client -name index.html -size 0 | wc -l"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:30:53-03:00","exit":0,"sha256":"5d8a4c3145a09b450fc2847e230fe1ee7615a3c1d0a6cc1ed6091611f0959358","lineas":4,"omitidas":0,"no_recomprobable":"log del build final en el directorio de temporales; verify construye con evidencia propia"} -->
**Evidencia `apply-evidence.31`** · exit 0 · 4 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:30:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: log del build final en el directorio de temporales; verify construye con evidencia propia

```text
bash -c 'tail -n 1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-final.log; /usr/bin/grep -c '"'"'Uncaught\|\[ERROR\]'"'"' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/build-final.log; find dist/client -name index.html | wc -l; find dist/client -name index.html -size 0 | wc -l'
```

```text
00:30:10 [build] Complete!
0
18
0
```
<!-- evidencia:fin apply-evidence.31 -->

Clasificación del diff de señales (texto visible, `<title>` y `<meta>`, canonical/hreflang y JSON-LD) de las 18 páginas contra las diferencias declaradas: (c) host `www`, (d) `slogan` localizado en `/en` y `/pt`, (a) «Última milla» ausente y (b) «Other»/«Outro» en cotizar. Script `classify.py` en el directorio de temporales del despacho; toda línea que no calza en una categoría se lista como no declarada:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.32","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/classify.py","before","after"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/.wrangler/baseline","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:30:53-03:00","exit":0,"sha256":"0c495a33a578dcafc7ecbd6a6f663d4ac68a9c78e5d99ee708228934d9c3e213","lineas":19,"omitidas":0,"no_recomprobable":"script en el directorio de temporales del despacho, borrado al terminar la fase"} -->
**Evidencia `apply-evidence.32`** · exit 0 · 19 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:30:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/.wrangler/baseline`
No re-comprobable: script en el directorio de temporales del despacho, borrado al terminar la fase

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/classify.py before after
```

```text
contacto.txt: sin diferencias no declaradas
cotizar.txt: sin diferencias no declaradas
en.txt: sin diferencias no declaradas
en__contacto.txt: sin diferencias no declaradas
en__cotizar.txt: sin diferencias no declaradas
en__industrias.txt: sin diferencias no declaradas
en__nosotros.txt: sin diferencias no declaradas
en__servicios.txt: sin diferencias no declaradas
industrias.txt: sin diferencias no declaradas
nosotros.txt: sin diferencias no declaradas
pt.txt: sin diferencias no declaradas
pt__contacto.txt: sin diferencias no declaradas
pt__cotizar.txt: sin diferencias no declaradas
pt__industrias.txt: sin diferencias no declaradas
pt__nosotros.txt: sin diferencias no declaradas
pt__servicios.txt: sin diferencias no declaradas
root.txt: sin diferencias no declaradas
servicios.txt: sin diferencias no declaradas
totales por categoría: {'a Última milla ausente': 3, 'b Otro traducido': 2, 'c host www': 232, 'd slogan localizado': 12}
```
<!-- evidencia:fin apply-evidence.32 -->

HTML crudo normalizado (host y slogan) contra la línea base. Fuera de las señales solo cambian: el hash de la hoja `Footer.*.css` (la de los tokens), el orden de claves del JSON inline de industrias (`apply-evidence.8`), y en cotizar la opción «Otro» (con su etiqueta traducida y un espacio del comentario JSX) y el botón de «Última milla» que ya no está:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.33","forma":"argv","argv":["bash","-c","for f in $(cd .wrangler/baseline/before/html && find . -name index.html | sort); do diff <(sed 's/\u003e</\u003e\\n</g' .wrangler/baseline/before/html/$f) <(sed 's#https://www\\.logatm\\.com#https://logatm.com#g; s#\"slogan\":\"Logistics tailored to you\"#\"slogan\":\"Logística a tu medida\"#; s#\"slogan\":\"Logística sob medida\"#\"slogan\":\"Logística a tu medida\"#' dist/client/$f | sed 's/\u003e</\u003e\\n</g') | /usr/bin/grep '^[<\u003e]' | sed -E 's#(Footer\\.)[A-Za-z0-9_-]+(\\.css)#\\1HASH\\2#; s#^(. <script\u003e\\(function\\(\\)\\{const industries = ).*#\\1[JSON inline]#' | sort -u; done | sort | uniq -c"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:30:53-03:00","exit":0,"sha256":"402bdaf6115868277e5624d5f4ab28ab0024c2609a34c1fb61cc80c438d64942","lineas":17,"omitidas":0,"no_recomprobable":"compara el dist final; verify reconstruye"} -->
**Evidencia `apply-evidence.33`** · exit 0 · 17 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:30:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: compara el dist final; verify reconstruye

```text
bash -c 'for f in $(cd .wrangler/baseline/before/html && find . -name index.html | sort); do diff <(sed '"'"'s/></>\n</g'"'"' .wrangler/baseline/before/html/$f) <(sed '"'"'s#https://www\.logatm\.com#https://logatm.com#g; s#"slogan":"Logistics tailored to you"#"slogan":"Logística a tu medida"#; s#"slogan":"Logística sob medida"#"slogan":"Logística a tu medida"#'"'"' dist/client/$f | sed '"'"'s/></>\n</g'"'"') | /usr/bin/grep '"'"'^[<>]'"'"' | sed -E '"'"'s#(Footer\.)[A-Za-z0-9_-]+(\.css)#\1HASH\2#; s#^(. <script>\(function\(\)\{const industries = ).*#\1[JSON inline]#'"'"' | sort -u; done | sort | uniq -c'
```

```text
      1 < <button type="button" class="chip-multi" data-extra="Last mile">Last mile</button>
      1 < <button type="button" class="chip-multi" data-extra="Última milha">Última milha</button>
      1 < <button type="button" class="chip-multi" data-extra="Última milla">Última milla</button>
     18 < <link rel="stylesheet" href="/_astro/Footer.HASH.css">
     18 > <link rel="stylesheet" href="/_astro/Footer.HASH.css">
      3 < <option value="Jeddah, SA">Jeddah, SA</option>
      1 > <option value="Jeddah, SA">Jeddah, SA</option>  <option value="Otro">Other</option> </select> </div> <div class="route-pair__arrow" aria-hidden="true">→</div> <div class="form-field"> <label for="q-dest">Destination</label> <select id="q-dest" name="dest"> <option value="Santiago, CL" selected>Santiago, CL</option>
      1 > <option value="Jeddah, SA">Jeddah, SA</option>  <option value="Otro">Otro</option> </select> </div> <div class="route-pair__arrow" aria-hidden="true">→</div> <div class="form-field"> <label for="q-dest">Destino</label> <select id="q-dest" name="dest"> <option value="Santiago, CL" selected>Santiago, CL</option>
      1 > <option value="Jeddah, SA">Jeddah, SA</option>  <option value="Otro">Outro</option> </select> </div> <div class="route-pair__arrow" aria-hidden="true">→</div> <div class="form-field"> <label for="q-dest">Destino</label> <select id="q-dest" name="dest"> <option value="Santiago, CL" selected>Santiago, CL</option>
      1 < <option value="Otro">Otro</option> </select> </div> <div class="route-pair__arrow" aria-hidden="true">→</div> <div class="form-field"> <label for="q-dest">Destination</label> <select id="q-dest" name="dest"> <option value="Santiago, CL" selected>Santiago, CL</option>
      2 < <option value="Otro">Otro</option> </select> </div> <div class="route-pair__arrow" aria-hidden="true">→</div> <div class="form-field"> <label for="q-dest">Destino</label> <select id="q-dest" name="dest"> <option value="Santiago, CL" selected>Santiago, CL</option>
      1 > </script> </body> </html> <script>(function(){const industries = [{"icon":"lucide:pickaxe","color":"#658fc3","img":{"src":"/_astro/ind-mineria.ByjgnuJh.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Mineração","sub":"Cobre, lítio, maquinário","tags":["Cobre","Lítio"],"services":["FCL","Maquinário","Reefer"]},{"icon":"lucide:shopping-bag","color":"#3EB978","img":{"src":"/_astro/ind-retail.T3SOoBD2.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Varejo","sub":"Moda, consumo, sazonalidade","tags":["Moda","Consumo","Alta temporada"],"services":["LCL","Courier","Fulfillment"]},{"icon":"lucide:wheat","color":"#2D9B6F","img":{"src":"/_astro/ind-agro.CGITh8dF.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Agroindústria","sub":"Fruta, vinhos, grãos","tags":["Fruta fresca","Vinhos","Grãos"],"services":["Reefer","Certificação SAG","Aéreo"]},{"icon":"lucide:pill","color":"#4A7BB5","img":{"src":"/_astro/ind-farma.BXogGomO.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Farmacêutica","sub":"Cadeia de frio, reagentes","tags":["Cadeia de frio","GDP","Reagentes"],"services":["Cadeia de frio","Validação GDP","Aéreo expresso"]},{"icon":"lucide:shopping-cart","color":"#339965","img":{"src":"/_astro/ind-ecommerce.CclOggbc.jpeg","width":1376,"height":768,"format":"jpg"},"name":"E-commerce","sub":"Cross-border, fulfillment","tags":["Cross-border","Fulfillment"],"services":["Fulfillment","Caixa postal EUA"]},{"icon":"lucide:hard-hat","color":"#3b6497","img":{"src":"/_astro/ind-construccion.DbAV3UUV.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Construção","sub":"Maquinário, materiais","tags":["Maquinário","Materiais","Open-top"],"services":["FCL","Open-top","Maquinário"]},{"icon":"lucide:hammer","color":"#7a7a7a","img":{"src":"/_astro/ind-chatarra.DFRybrIL.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Sucata Ferrosa","sub":"Reciclagem e exportação","tags":["Reciclagem","Exportação","Bulk"],"services":["FCL","Exportação","Aduan…(+1390 caracteres)
      1 > </script> </body> </html> <script>(function(){const industries = [{"icon":"lucide:pickaxe","color":"#658fc3","img":{"src":"/_astro/ind-mineria.ByjgnuJh.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Minería","sub":"Cobre, litio, maquinaria","tags":["Cobre","Litio"],"services":["FCL","Maquinaria","Reefer"]},{"icon":"lucide:shopping-bag","color":"#3EB978","img":{"src":"/_astro/ind-retail.T3SOoBD2.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Retail","sub":"Moda, consumo, temporada","tags":["Moda","Consumo","Temporada alta"],"services":["LCL","Courier","Fulfillment"]},{"icon":"lucide:wheat","color":"#2D9B6F","img":{"src":"/_astro/ind-agro.CGITh8dF.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Agroindustria","sub":"Fruta, vinos, granos","tags":["Fruta fresca","Vinos","Granos"],"services":["Reefer","Certificación SAG","Aéreo"]},{"icon":"lucide:pill","color":"#4A7BB5","img":{"src":"/_astro/ind-farma.BXogGomO.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Farmacéutica","sub":"Cadena de frío, reactivos","tags":["Cadena de frío","GDP","Reactivos"],"services":["Cadena frío","Validación GDP","Aéreo express"]},{"icon":"lucide:shopping-cart","color":"#339965","img":{"src":"/_astro/ind-ecommerce.CclOggbc.jpeg","width":1376,"height":768,"format":"jpg"},"name":"E-commerce","sub":"Cross-border, fulfillment","tags":["Cross-border","Fulfillment"],"services":["Fulfillment","Casillero USA"]},{"icon":"lucide:hard-hat","color":"#3b6497","img":{"src":"/_astro/ind-construccion.DbAV3UUV.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Construcción","sub":"Maquinaria, materiales","tags":["Maquinaria","Materiales","Open-top"],"services":["FCL","Open-top","Maquinaria"]},{"icon":"lucide:hammer","color":"#7a7a7a","img":{"src":"/_astro/ind-chatarra.DFRybrIL.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Chatarra Ferrosa","sub":"Reciclaje y exportación","tags":["Reciclaje","Exportación","Bulk"],"services":["FCL","Exportación","Aduana"]…(+1394 caracteres)
      1 > </script> </body> </html> <script>(function(){const industries = [{"icon":"lucide:pickaxe","color":"#658fc3","img":{"src":"/_astro/ind-mineria.ByjgnuJh.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Mining","sub":"Copper, lithium, machinery","tags":["Copper","Lithium"],"services":["FCL","Machinery","Reefer"]},{"icon":"lucide:shopping-bag","color":"#3EB978","img":{"src":"/_astro/ind-retail.T3SOoBD2.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Retail","sub":"Fashion, consumer, seasonal","tags":["Fashion","Consumer","Peak season"],"services":["LCL","Courier","Fulfillment"]},{"icon":"lucide:wheat","color":"#2D9B6F","img":{"src":"/_astro/ind-agro.CGITh8dF.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Agribusiness","sub":"Fruit, wines, grains","tags":["Fresh fruit","Wines","Grains"],"services":["Reefer","SAG certification","Air"]},{"icon":"lucide:pill","color":"#4A7BB5","img":{"src":"/_astro/ind-farma.BXogGomO.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Pharmaceutical","sub":"Cold chain, reagents","tags":["Cold chain","GDP","Reagents"],"services":["Cold chain","GDP validation","Air express"]},{"icon":"lucide:shopping-cart","color":"#339965","img":{"src":"/_astro/ind-ecommerce.CclOggbc.jpeg","width":1376,"height":768,"format":"jpg"},"name":"E-commerce","sub":"Cross-border, fulfillment","tags":["Cross-border","Fulfillment"],"services":["Fulfillment","USA mailbox"]},{"icon":"lucide:hard-hat","color":"#3b6497","img":{"src":"/_astro/ind-construccion.DbAV3UUV.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Construction","sub":"Machinery, materials","tags":["Machinery","Materials","Open-top"],"services":["FCL","Open-top","Machinery"]},{"icon":"lucide:hammer","color":"#7a7a7a","img":{"src":"/_astro/ind-chatarra.DFRybrIL.jpeg","width":1376,"height":768,"format":"jpg"},"name":"Ferrous Scrap","sub":"Recycling and export","tags":["Recycling","Export","Bulk"],"services":["FCL","Export","Customs"]},{"icon":"lucide:lightbulb","…(+1363 caracteres)
      1 < </script> </body> </html> <script>(function(){const industries = [{"icon":"lucide:pickaxe","name":"Mineração","sub":"Cobre, lítio, maquinário","color":"#658fc3","img":{"src":"/_astro/ind-mineria.ByjgnuJh.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Cobre","Lítio"],"services":["FCL","Maquinário","Reefer"]},{"icon":"lucide:shopping-bag","name":"Varejo","sub":"Moda, consumo, sazonalidade","color":"#3EB978","img":{"src":"/_astro/ind-retail.T3SOoBD2.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Moda","Consumo","Alta temporada"],"services":["LCL","Courier","Fulfillment"]},{"icon":"lucide:wheat","name":"Agroindústria","sub":"Fruta, vinhos, grãos","color":"#2D9B6F","img":{"src":"/_astro/ind-agro.CGITh8dF.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Fruta fresca","Vinhos","Grãos"],"services":["Reefer","Certificação SAG","Aéreo"]},{"icon":"lucide:pill","name":"Farmacêutica","sub":"Cadeia de frio, reagentes","color":"#4A7BB5","img":{"src":"/_astro/ind-farma.BXogGomO.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Cadeia de frio","GDP","Reagentes"],"services":["Cadeia de frio","Validação GDP","Aéreo expresso"]},{"icon":"lucide:shopping-cart","name":"E-commerce","sub":"Cross-border, fulfillment","color":"#339965","img":{"src":"/_astro/ind-ecommerce.CclOggbc.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Cross-border","Fulfillment"],"services":["Fulfillment","Caixa postal EUA"]},{"icon":"lucide:hard-hat","name":"Construção","sub":"Maquinário, materiais","color":"#3b6497","img":{"src":"/_astro/ind-construccion.DbAV3UUV.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Maquinário","Materiais","Open-top"],"services":["FCL","Open-top","Maquinário"]},{"icon":"lucide:hammer","name":"Sucata Ferrosa","sub":"Reciclagem e exportação","color":"#7a7a7a","img":{"src":"/_astro/ind-chatarra.DFRybrIL.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Reciclagem","Exportação","Bulk"],"services":["FCL","Exportação","Aduan…(+1390 caracteres)
      1 < </script> </body> </html> <script>(function(){const industries = [{"icon":"lucide:pickaxe","name":"Minería","sub":"Cobre, litio, maquinaria","color":"#658fc3","img":{"src":"/_astro/ind-mineria.ByjgnuJh.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Cobre","Litio"],"services":["FCL","Maquinaria","Reefer"]},{"icon":"lucide:shopping-bag","name":"Retail","sub":"Moda, consumo, temporada","color":"#3EB978","img":{"src":"/_astro/ind-retail.T3SOoBD2.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Moda","Consumo","Temporada alta"],"services":["LCL","Courier","Fulfillment"]},{"icon":"lucide:wheat","name":"Agroindustria","sub":"Fruta, vinos, granos","color":"#2D9B6F","img":{"src":"/_astro/ind-agro.CGITh8dF.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Fruta fresca","Vinos","Granos"],"services":["Reefer","Certificación SAG","Aéreo"]},{"icon":"lucide:pill","name":"Farmacéutica","sub":"Cadena de frío, reactivos","color":"#4A7BB5","img":{"src":"/_astro/ind-farma.BXogGomO.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Cadena de frío","GDP","Reactivos"],"services":["Cadena frío","Validación GDP","Aéreo express"]},{"icon":"lucide:shopping-cart","name":"E-commerce","sub":"Cross-border, fulfillment","color":"#339965","img":{"src":"/_astro/ind-ecommerce.CclOggbc.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Cross-border","Fulfillment"],"services":["Fulfillment","Casillero USA"]},{"icon":"lucide:hard-hat","name":"Construcción","sub":"Maquinaria, materiales","color":"#3b6497","img":{"src":"/_astro/ind-construccion.DbAV3UUV.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Maquinaria","Materiales","Open-top"],"services":["FCL","Open-top","Maquinaria"]},{"icon":"lucide:hammer","name":"Chatarra Ferrosa","sub":"Reciclaje y exportación","color":"#7a7a7a","img":{"src":"/_astro/ind-chatarra.DFRybrIL.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Reciclaje","Exportación","Bulk"],"services":["FCL","Exportación","Aduana"]…(+1394 caracteres)
      1 < </script> </body> </html> <script>(function(){const industries = [{"icon":"lucide:pickaxe","name":"Mining","sub":"Copper, lithium, machinery","color":"#658fc3","img":{"src":"/_astro/ind-mineria.ByjgnuJh.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Copper","Lithium"],"services":["FCL","Machinery","Reefer"]},{"icon":"lucide:shopping-bag","name":"Retail","sub":"Fashion, consumer, seasonal","color":"#3EB978","img":{"src":"/_astro/ind-retail.T3SOoBD2.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Fashion","Consumer","Peak season"],"services":["LCL","Courier","Fulfillment"]},{"icon":"lucide:wheat","name":"Agribusiness","sub":"Fruit, wines, grains","color":"#2D9B6F","img":{"src":"/_astro/ind-agro.CGITh8dF.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Fresh fruit","Wines","Grains"],"services":["Reefer","SAG certification","Air"]},{"icon":"lucide:pill","name":"Pharmaceutical","sub":"Cold chain, reagents","color":"#4A7BB5","img":{"src":"/_astro/ind-farma.BXogGomO.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Cold chain","GDP","Reagents"],"services":["Cold chain","GDP validation","Air express"]},{"icon":"lucide:shopping-cart","name":"E-commerce","sub":"Cross-border, fulfillment","color":"#339965","img":{"src":"/_astro/ind-ecommerce.CclOggbc.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Cross-border","Fulfillment"],"services":["Fulfillment","USA mailbox"]},{"icon":"lucide:hard-hat","name":"Construction","sub":"Machinery, materials","color":"#3b6497","img":{"src":"/_astro/ind-construccion.DbAV3UUV.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Machinery","Materials","Open-top"],"services":["FCL","Open-top","Machinery"]},{"icon":"lucide:hammer","name":"Ferrous Scrap","sub":"Recycling and export","color":"#7a7a7a","img":{"src":"/_astro/ind-chatarra.DFRybrIL.jpeg","width":1376,"height":768,"format":"jpg"},"tags":["Recycling","Export","Bulk"],"services":["FCL","Export","Customs"]},{"icon":"lucide:lightbulb","…(+1363 caracteres)
```
<!-- evidencia:fin apply-evidence.33 -->

CSS construido contra la línea base, por hoja (sin hash) y por declaración. Las bajas son los 18 `--opacity-*` y `--color-whatsapp-hover-dark` (declaradas). El resto de las bajas y altas vienen de los `--shadow-*` en `@theme` (tensión descrita en la tarea 16). `cotizar`, `index` y `shared` no cambian:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.34","forma":"argv","argv":["bash","-c","python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/css-decl-diff.py before/css after/css | sed -n '1,40p' | /usr/bin/grep -vE '^  - --opacity-'; echo \"bajas --opacity-* en 404 y Footer: $(python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/css-decl-diff.py before/css after/css | /usr/bin/grep -c '^  - --opacity-')\""],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/.wrangler/baseline","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:30:53-03:00","exit":0,"sha256":"f7984d37c8bf67ff485878502936c7f03c5ff411380c6fff9dec7f3db91dc9af","lineas":23,"omitidas":0,"no_recomprobable":"script en el directorio de temporales del despacho, borrado al terminar la fase"} -->
**Evidencia `apply-evidence.34`** · exit 0 · 23 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:30:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro/.wrangler/baseline`
No re-comprobable: script en el directorio de temporales del despacho, borrado al terminar la fase

```text
bash -c 'python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/css-decl-diff.py before/css after/css | sed -n '"'"'1,40p'"'"' | /usr/bin/grep -vE '"'"'^  - --opacity-'"'"'; echo "bajas --opacity-* en 404 y Footer: $(python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/css-decl-diff.py before/css after/css | /usr/bin/grep -c '"'"'^  - --opacity-'"'"')"'
```

```text
404: -31 +10
  - --color-whatsapp-hover-dark:#0d6b61;
  - --shadow-md:0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;
  - --shadow-sm:0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a;
  - --shadow-xl:0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
  - --tw-shadow-color:#3eb978}
  - --tw-shadow-color:color-mix(in oklab, var(--color-cta) var(--tw-shadow-alpha), transparent)}
  - --tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);
  - --tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);
  - --tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a), 0 8px 10px -6px var(--tw-shadow-color,#0000001a);
  - --tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);
  - .shadow-cta{
  - @supports (color:color-mix(in lab,red,red)){
  - }
  + --shadow-cta:0 4px 20px 0 #3eb97859;
  + --shadow-md:0 4px 16px 0 #4a7bb51f;
  + --shadow-sm:0 1px 3px 0 #4a7bb514;
  + --shadow-xl:0 16px 48px 0 #4a7bb533;
  + --tw-shadow:0 16px 48px 0 var(--tw-shadow-color,#4a7bb533);
  + --tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#4a7bb514);
  + --tw-shadow:0 4px 16px 0 var(--tw-shadow-color,#4a7bb51f);
  + --tw-shadow:0 4px 20px 0 var(--tw-shadow-color,#3eb97859);
bajas --opacity-* en 404 y Footer: 36
```
<!-- evidencia:fin apply-evidence.34 -->

Restos del dominio sin `www` en HTML, sitemap y robots; `manifest.json`; teléfono y email en las 18 páginas:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.35","forma":"argv","argv":["bash","-c","echo \"https://logatm.com en dist/client: $(/usr/bin/grep -rlE 'https://logatm\\.com' dist/client --include='*.html' --include='*.xml' --include='*.txt' | wc -l)\"; cmp .wrangler/baseline/before/manifest.json dist/client/manifest.json && echo 'manifest.json sin cambios'; git -C .. diff --stat e9d68aeda82e -- log-atm-web-astro/public/manifest.json | wc -l; for p in $(find dist/client -name index.html | sort); do echo \"$(/usr/bin/grep -c '+56 9 8270 8492' $p) $(/usr/bin/grep -c 'contacto@logatm.com' $p)\"; done | sort | uniq -c"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:30:53-03:00","exit":0,"sha256":"4b473efa99b3a9d00db88782243fe307ff3e1ba02ee9fe0554dd1ac0ea6a1f50","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.35`** · exit 0 · 5 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:30:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`

```text
bash -c 'echo "https://logatm.com en dist/client: $(/usr/bin/grep -rlE '"'"'https://logatm\.com'"'"' dist/client --include='"'"'*.html'"'"' --include='"'"'*.xml'"'"' --include='"'"'*.txt'"'"' | wc -l)"; cmp .wrangler/baseline/before/manifest.json dist/client/manifest.json && echo '"'"'manifest.json sin cambios'"'"'; git -C .. diff --stat e9d68aeda82e -- log-atm-web-astro/public/manifest.json | wc -l; for p in $(find dist/client -name index.html | sort); do echo "$(/usr/bin/grep -c '"'"'+56 9 8270 8492'"'"' $p) $(/usr/bin/grep -c '"'"'contacto@logatm.com'"'"' $p)"; done | sort | uniq -c'
```

```text
https://logatm.com en dist/client: 0
manifest.json sin cambios
0
      6 1 2
     12 1 3
```
<!-- evidencia:fin apply-evidence.35 -->

Conteos de teléfono y email por página, línea base contra árbol final (mismo conteo en cada una de las 18 páginas):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.36","forma":"argv","argv":["bash","-c","for f in $(cd .wrangler/baseline/before/html && find . -name index.html | sort); do a=\"$(/usr/bin/grep -c '+56 9 8270 8492' .wrangler/baseline/before/html/$f) $(/usr/bin/grep -c 'contacto@logatm.com' .wrangler/baseline/before/html/$f) $(/usr/bin/grep -c 'wa.me/56982708492' .wrangler/baseline/before/html/$f)\"; b=\"$(/usr/bin/grep -c '+56 9 8270 8492' dist/client/$f) $(/usr/bin/grep -c 'contacto@logatm.com' dist/client/$f) $(/usr/bin/grep -c 'wa.me/56982708492' dist/client/$f)\"; [ \"$a\" = \"$b\" ] && echo igual || echo \"distinto $f: $a / $b\"; done | sort | uniq -c"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:31:01-03:00","exit":0,"sha256":"22cde6bb641aae3e2aa3cbde4cbd3e60b9d6f7ca04ed126e72a44298483e4019","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.36`** · exit 0 · 1 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:31:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`

```text
bash -c 'for f in $(cd .wrangler/baseline/before/html && find . -name index.html | sort); do a="$(/usr/bin/grep -c '"'"'+56 9 8270 8492'"'"' .wrangler/baseline/before/html/$f) $(/usr/bin/grep -c '"'"'contacto@logatm.com'"'"' .wrangler/baseline/before/html/$f) $(/usr/bin/grep -c '"'"'wa.me/56982708492'"'"' .wrangler/baseline/before/html/$f)"; b="$(/usr/bin/grep -c '"'"'+56 9 8270 8492'"'"' dist/client/$f) $(/usr/bin/grep -c '"'"'contacto@logatm.com'"'"' dist/client/$f) $(/usr/bin/grep -c '"'"'wa.me/56982708492'"'"' dist/client/$f)"; [ "$a" = "$b" ] && echo igual || echo "distinto $f: $a / $b"; done | sort | uniq -c'
```

```text
     18 igual
```
<!-- evidencia:fin apply-evidence.36 -->

## Tarea 20: Checks del repo y auditoría a11y

Corrida de cierre sobre el árbol final (`4ca32b7`, con `dist/` de la tarea 19). Las comparaciones contra el commit base usan un build de `e9d68aeda82e` en una copia aislada bajo el directorio de temporales del despacho, borrada al terminar.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.37","forma":"argv","argv":["bash","-c","npm run check 2\u003e&1 | tail -n 4; npm run validate-i18n 2\u003e&1 | tail -n 2; npm run check-i18n-links 2\u003e&1 | tail -n 4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:31:41-03:00","exit":0,"sha256":"d2d24bebc14287a9a44acc5d161c220ba2cf4ba7158cbb8e99cf0acb861d7404","lineas":10,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.37`** · exit 0 · 10 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:31:41-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
bash -c 'npm run check 2>&1 | tail -n 4; npm run validate-i18n 2>&1 | tail -n 2; npm run check-i18n-links 2>&1 | tail -n 4'
```

```text
- 0 errors
- 0 warnings
- 0 hints

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin apply-evidence.37 -->

`measure:images` en el árbol final y en el commit base (el cambio no toca imágenes):


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.38","forma":"argv","argv":["bash","-c","node scripts/measure-home-image-weight.mjs \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-after.txt 2\u003e&1; a=$?; (cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/base2.D9QnkXos/log-atm-web-astro && node scripts/measure-home-image-weight.mjs) \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-before.txt 2\u003e&1; b=$?; echo \"exit final=$a base=$b\"; diff /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-before.txt /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-after.txt && echo 'mediciones idénticas'; tail -n 6 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-after.txt"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:31:41-03:00","exit":0,"sha256":"b33945756023f1431ab6d49453a2b6347ff07340a6949a073e65f39f745ba3f8","lineas":4,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.38`** · exit 0 · 4 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:31:41-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
bash -c 'node scripts/measure-home-image-weight.mjs > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-after.txt 2>&1; a=$?; (cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/base2.D9QnkXos/log-atm-web-astro && node scripts/measure-home-image-weight.mjs) > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-before.txt 2>&1; b=$?; echo "exit final=$a base=$b"; diff /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-before.txt /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-after.txt && echo '"'"'mediciones idénticas'"'"'; tail -n 6 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/measure-after.txt'
```

```text
exit final=0 base=0
mediciones idénticas
escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
```
<!-- evidencia:fin apply-evidence.38 -->

`npm run a11y` (axe-core en Chrome real, `CHROME_PATH` al Chrome de `log-atm-web-astro/chrome/` del checkout principal) sobre el árbol final y sobre el commit base. Se comparan los conjuntos de violaciones (regla, URL y selector), sin el sufijo de ayuda:


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.39","forma":"argv","argv":["bash","-c","export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome; npm run a11y \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-after.txt 2\u003e&1; a=$?; (cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/base2.D9QnkXos/log-atm-web-astro && npm run a11y) \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-before.txt 2\u003e&1; b=$?; echo \"exit final=$a base=$b\"; for f in before after; do /usr/bin/grep -E '^\\[' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-$f.txt | sed -E 's/ — .*//; s/ → / -\u003e /' | sort \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-$f.set; done; diff /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-before.set /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-after.set && echo 'mismas violaciones que el commit base'; cut -d' ' -f3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-after.set | sort | uniq -c; tail -n 3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-after.txt"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro","head":"4ca32b7343a72720e7065134199947e47d490d87","fecha":"2026-10-08T00:32:43-03:00","exit":0,"sha256":"bf6449f9d6f4a5a6ca7da63b61dd2b3aedc198d7dd29947bbfc6d63dc6122330","lineas":5,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.39`** · exit 0 · 5 líneas, 0 omitidas · HEAD `4ca32b7343a7` · 2026-10-08T00:32:43-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-copy-tokens-ssot/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
bash -c 'export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome; npm run a11y > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-after.txt 2>&1; a=$?; (cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/base2.D9QnkXos/log-atm-web-astro && npm run a11y) > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-before.txt 2>&1; b=$?; echo "exit final=$a base=$b"; for f in before after; do /usr/bin/grep -E '"'"'^\['"'"' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-$f.txt | sed -E '"'"'s/ — .*//; s/ → / -> /'"'"' | sort > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-$f.set; done; diff /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-before.set /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-after.set && echo '"'"'mismas violaciones que el commit base'"'"'; cut -d'"'"' '"'"' -f3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-after.set | sort | uniq -c; tail -n 3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-copy-tokens-ssot/sdd-apply-s_66runf/a11y-after.txt'
```

```text
exit final=0 base=0
mismas violaciones que el commit base
Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 0 violaciones en 0 reglas · 0 estados HTTP inesperados
```
<!-- evidencia:fin apply-evidence.39 -->

`package.json` no cambió, así que no se repiten `/en/no-existe` ni `/pt/no-existe` a mano. La auditoría ya sondea una URL inexistente por idioma (las 3 sondas 404 de `apply-evidence.39`) y se baja su propio `astro preview`; no queda ningún servidor levantado.

## Residuales (anotados en `observations.md`)

1. **Build que no falla ante un desalineamiento** (tarea 7, `[pre-adr]`): con el prerender en workerd, `astro build` termina en exit 0 y deja la página vacía o ausente. Requiere una decisión de stack.
2. **Sombras en `@theme`** (tarea 16): el CSS construido difiere en más que lo eliminado, sin cambio visual. Es una tensión entre los criterios 4 y 5 de [[color-token-policy]] y queda sin decidir.
3. **`meta.siteName`** del i18n duplica `SITE.name` (Navbar y Footer). Queda fuera de `tasks.md`.
4. **Literales `@logatm`** de `twitter:site` y `twitter:creator` en `BaseLayout.astro`: duplican la cuenta de `SITE.social.twitter`. Quedan fuera de `tasks.md`.
5. **Primer build de Workers Builds tras el merge**: revisar que `astro.config.mjs` carga `src/lib/site.ts` en el build alojado (tarea 13). Es parte del checklist post-deploy de `clarifications.md`.
