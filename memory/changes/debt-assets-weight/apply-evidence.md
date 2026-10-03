---
type: apply-evidence
change_name: "debt-assets-weight"
created: "2026-10-03"
tags: [apply-evidence]
---

# Evidencia de sdd-apply: debt-assets-weight

Ninguna tarea es `[TDD]` (el proyecto no tiene runner de tests): la evidencia es de build, búsquedas y medición. Las rutas de código son relativas a `log-atm-web-astro/` dentro del worktree.

## duplicate-video-removal — Tarea 1: md5 de los tres MP4 antes de borrar

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["md5sum","public/video/intro.mp4","public/videos/hero-port.mp4","public/videos/log-atm-intro.mp4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"78b6b73e16729ec1c655715f67c21a7372ec178b","fecha":"2026-10-03T00:23:30-03:00","exit":0,"sha256":"1ac5128f350e8d7b63525b8a37a112fc768378a8cdd9e54339c1bcfb356a299b","lineas":3,"omitidas":0,"no_recomprobable":"estado previo al borrado: dos de los tres archivos dejan de existir en la misma tarea"} -->
**Evidencia `apply-evidence.1`** · exit 0 · 3 líneas, 0 omitidas · HEAD `78b6b73e1672` · 2026-10-03T00:23:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: estado previo al borrado: dos de los tres archivos dejan de existir en la misma tarea

```text
md5sum public/video/intro.mp4 public/videos/hero-port.mp4 public/videos/log-atm-intro.mp4
```

```text
4900f0e516f0a31abb36a8a5df38ba5e  public/video/intro.mp4
4900f0e516f0a31abb36a8a5df38ba5e  public/videos/hero-port.mp4
4900f0e516f0a31abb36a8a5df38ba5e  public/videos/log-atm-intro.mp4
```
<!-- evidencia:fin apply-evidence.1 -->

Según `apply-evidence.1`, los tres MP4 comparten md5; se borraron `public/video/intro.mp4` (con su carpeta) y `public/videos/hero-port.mp4`.

## duplicate-video-removal — Tareas 1 y 2: inventario y referencias en `src/`

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"argv","argv":["find","public","-name","*.mp4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"78b6b73e16729ec1c655715f67c21a7372ec178b","fecha":"2026-10-03T00:23:39-03:00","exit":0,"sha256":"6ea88ce44e7a704b12cd47511389190e4a78136e5e2a62bc9fe7abe89c4ccef8","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.2`** · exit 0 · 1 líneas, 0 omitidas · HEAD `78b6b73e1672` · 2026-10-03T00:23:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
find public -name '*.mp4'
```

```text
public/videos/log-atm-intro.mp4
```
<!-- evidencia:fin apply-evidence.2 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"argv","argv":["/usr/bin/grep","-rnE","hero-port|(^|[^-])intro\\.mp4|/video/","src/"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"78b6b73e16729ec1c655715f67c21a7372ec178b","fecha":"2026-10-03T00:23:40-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.3`** · exit 1 · 0 líneas, 0 omitidas · HEAD `78b6b73e1672` · 2026-10-03T00:23:40-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -rnE 'hero-port|(^|[^-])intro\.mp4|/video/' src/
```

```text
```
<!-- evidencia:fin apply-evidence.3 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"argv","argv":["/usr/bin/grep","-rn","mp4","src/"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"78b6b73e16729ec1c655715f67c21a7372ec178b","fecha":"2026-10-03T00:23:40-03:00","exit":0,"sha256":"7fbc8b634c12d2a0ec8128b424081f0178fd0893251a29150306649b7089be37","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.4`** · exit 0 · 2 líneas, 0 omitidas · HEAD `78b6b73e1672` · 2026-10-03T00:23:40-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -rn mp4 src/
```

```text
src/components/sections/WhyVideoSection.astro:44:          <source src="/videos/log-atm-intro.mp4" type="video/mp4" />
/usr/bin/grep: src/assets/images/services/svc-consultoria.jpeg: binary file matches
```
<!-- evidencia:fin apply-evidence.4 -->

Según `apply-evidence.2` queda un único MP4 en `public/`; `apply-evidence.3` (exit 1 de grep, sin coincidencias) confirma que `src/` no nombra las copias borradas, y `apply-evidence.4` muestra que la única referencia a un MP4 es `log-atm-intro.mp4` en `WhyVideoSection.astro:44`.

## duplicate-video-removal — Tarea 3: sitio construido (`npm run build` verde)

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"argv","argv":["find","dist/client","-name","*.mp4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"78b6b73e16729ec1c655715f67c21a7372ec178b","fecha":"2026-10-03T00:24:04-03:00","exit":0,"sha256":"40cc1e1f6c719345daac519d9cf5f710f289b306027c0b70598a768bf64ae448","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.5`** · exit 0 · 1 líneas, 0 omitidas · HEAD `78b6b73e1672` · 2026-10-03T00:24:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
find dist/client -name '*.mp4'
```

```text
dist/client/videos/log-atm-intro.mp4
```
<!-- evidencia:fin apply-evidence.5 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"argv","argv":["/usr/bin/grep","-rln","hero-port\\|/video/intro","dist/client"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"78b6b73e16729ec1c655715f67c21a7372ec178b","fecha":"2026-10-03T00:24:04-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.6`** · exit 1 · 0 líneas, 0 omitidas · HEAD `78b6b73e1672` · 2026-10-03T00:24:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -rln 'hero-port\|/video/intro' dist/client
```

```text
```
<!-- evidencia:fin apply-evidence.6 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"argv","argv":["curl","-s","-o","/dev/null","-w","%{http_code} %{content_type} %{size_download}\\n","http://127.0.0.1:4329/videos/log-atm-intro.mp4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"78b6b73e16729ec1c655715f67c21a7372ec178b","fecha":"2026-10-03T00:24:34-03:00","exit":0,"sha256":"478c9350a3bf08ed116894afdf078dd5b6115223fae6ed24b79a7050e9e97335","lineas":1,"omitidas":0,"no_recomprobable":"requiere el servidor astro preview levantado durante la fase en 127.0.0.1:4329"} -->
**Evidencia `apply-evidence.7`** · exit 0 · 1 líneas, 0 omitidas · HEAD `78b6b73e1672` · 2026-10-03T00:24:34-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere el servidor astro preview levantado durante la fase en 127.0.0.1:4329

```text
curl -s -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' http://127.0.0.1:4329/videos/log-atm-intro.mp4
```

```text
200 video/mp4 3756542
```
<!-- evidencia:fin apply-evidence.7 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"archivo","argv":null,"texto":"node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/cdp.mjs 9333 http://127.0.0.1:4329/ 1440 900 1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/video.js\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2","head":null,"fecha":"2026-10-03T00:24:37-03:00","exit":0,"sha256":"d21f4b454db5b54a6e3ddf69ec544abbe3609632d1d58f93453635d4c83e48cd","lineas":1,"omitidas":0,"no_recomprobable":"requiere Chrome headless y astro preview levantados durante la fase"} -->
**Evidencia `apply-evidence.8`** · exit 0 · 1 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-03T00:24:37-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2`
No re-comprobable: requiere Chrome headless y astro preview levantados durante la fase

```bash
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/cdp.mjs 9333 http://127.0.0.1:4329/ 1440 900 1 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/video.js
```

```text
"src=/videos/log-atm-intro.mp4 readyState=4 paused=false currentTime>0=true error=null"
```
<!-- evidencia:fin apply-evidence.8 -->

Según `apply-evidence.5` y `apply-evidence.6` (grep exit 1, sin coincidencias), `dist/client` contiene una sola copia del MP4 y ninguna referencia a las copias eliminadas; `apply-evidence.7` y `apply-evidence.8` muestran que el video se sirve y se reproduce en la sección de video del inicio.

## logo-vectorization-residue-removal — Tareas 1 a 3

`scripts/png-to-svg.mjs` se borró con `git rm` y `potrace` se quitó con `npm uninstall potrace` (el lockfile solo pierde el árbol de `potrace`/`jimp`, sin entradas agregadas). `README.md` y `docs/project-brief.md` señalan `public/logo.svg` como fuente del logo vectorial. `npm run favicons` y `npm run build` terminaron sin errores; los favicons regenerados son idénticos a los versionados.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"argv","argv":["/usr/bin/grep","-rn","src/assets/logo.svg\\|png-to-svg\\|potrace","scripts","docs","README.md","package.json","package-lock.json"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"5e28cbde91aad5166541f2637edab75f96e76ded","fecha":"2026-10-03T00:25:39-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.9`** · exit 1 · 0 líneas, 0 omitidas · HEAD `5e28cbde91aa` · 2026-10-03T00:25:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -rn 'src/assets/logo.svg\|png-to-svg\|potrace' scripts docs README.md package.json package-lock.json
```

```text
```
<!-- evidencia:fin apply-evidence.9 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"argv","argv":["/usr/bin/grep","-rn","public/logo.svg","README.md","docs/project-brief.md","scripts/generate-favicons.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"5e28cbde91aad5166541f2637edab75f96e76ded","fecha":"2026-10-03T00:25:39-03:00","exit":0,"sha256":"58f581fbd88687eba392a0537a16e18b8f5602c03736262281188211f37b90ba","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.10`** · exit 0 · 5 líneas, 0 omitidas · HEAD `5e28cbde91aa` · 2026-10-03T00:25:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -rn public/logo.svg README.md docs/project-brief.md scripts/generate-favicons.mjs
```

```text
README.md:85:├── scripts/                 Utilidades de build (favicons desde public/logo.svg, validación i18n)
docs/project-brief.md:21:| Logo vectorial | `public/logo.svg` (fuente vigente, versionada) |
docs/project-brief.md:63:La fuente vigente del logo vectorial es `public/logo.svg`, ya generado y versionado en el repositorio. `scripts/generate-favicons.mjs` deriva de él `favicon.svg`, `favicon.ico` y `apple-touch-icon.png`.
scripts/generate-favicons.mjs:3: * apple-touch-icon.png (180x180) desde public/logo.svg
scripts/generate-favicons.mjs:14:const SRC_SVG = join(ROOT, 'public/logo.svg');
```
<!-- evidencia:fin apply-evidence.10 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"argv","argv":["git","status","--porcelain","--","public","scripts/generate-favicons.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"5e28cbde91aad5166541f2637edab75f96e76ded","fecha":"2026-10-03T00:25:39-03:00","exit":0,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.11`** · exit 0 · 0 líneas, 0 omitidas · HEAD `5e28cbde91aa` · 2026-10-03T00:25:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
git status --porcelain -- public scripts/generate-favicons.mjs
```

```text
```
<!-- evidencia:fin apply-evidence.11 -->

Según `apply-evidence.9` (grep exit 1, sin coincidencias) no quedan referencias a la ubicación eliminada, al script ni a `potrace`; `apply-evidence.10` muestra que README, brief y el generador de favicons apuntan a `public/logo.svg`; `apply-evidence.11` (salida vacía) muestra que `public/` y `generate-favicons.mjs` no tienen cambios tras regenerar los favicons.

## services-static-card-no-hover-zoom — Tareas 1 y 2

El selector de zoom pasa a `.svc-card:not(.svc-card--static):hover .svc-card__media img` (`services.css`). Ese selector gana especificidad por el `:not()`, así que la anulación de `prefers-reduced-motion` al final del archivo se ajusta al mismo selector; sin ese ajuste, las cards enlazadas volverían a ampliarse con movimiento reducido. `.svc-card--static:hover` no cambia. `npm run build` terminó sin errores.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"argv","argv":["/usr/bin/grep","-n","svc-card__media img\\|svc-card--static","src/styles/sections/services.css"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"2904775c9cfee294c43f16da6fa6c5717f54d633","fecha":"2026-10-03T00:27:13-03:00","exit":0,"sha256":"a8e3cc2e6a5bd582e41b80c9523f540fc65bf78a0c401d4eb84fc8159ecbf4b5","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.12`** · exit 0 · 5 líneas, 0 omitidas · HEAD `2904775c9cfe` · 2026-10-03T00:27:13-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -n 'svc-card__media img\|svc-card--static' src/styles/sections/services.css
```

```text
35:.svc-card--static { cursor: default; }
36:.svc-card--static:hover { transform: none; box-shadow: none; }
63:.svc-card__media img {
70:.svc-card:not(.svc-card--static):hover .svc-card__media img { transform: scale(1.04); }
174:  .svc-card:not(.svc-card--static):hover .svc-card__media img { transform: none; }
```
<!-- evidencia:fin apply-evidence.12 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.13","forma":"archivo","argv":null,"texto":"node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/hover.mjs 9333 http://127.0.0.1:4329 0\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/hover.mjs 9333 http://127.0.0.1:4329 1\n","cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2","head":null,"fecha":"2026-10-03T00:27:33-03:00","exit":0,"sha256":"7abe3b1124b8b2d347852882df17a94495912c929881f4af1b2472f5fbb57cf4","lineas":8,"omitidas":0,"no_recomprobable":"requiere Chrome headless y astro preview levantados durante la fase"} -->
**Evidencia `apply-evidence.13`** · exit 0 · 8 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-03T00:27:33-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2`
No re-comprobable: requiere Chrome headless y astro preview levantados durante la fase

```bash
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/hover.mjs 9333 http://127.0.0.1:4329 0
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/hover.mjs 9333 http://127.0.0.1:4329 1
```

```text
/ reduced=0 <div> static=true "Carga Marítima" img.transform=none hover=true
/ reduced=0 <a> static=false "Aduana y Documentación" img.transform=matrix(1.04, 0, 0, 1.04, 0, 0) hover=true
/servicios/ reduced=0 <div> static=true "Carga Aérea" img.transform=none hover=true
/servicios/ reduced=0 <a> static=false "Aduana y Documentación" img.transform=matrix(1.04, 0, 0, 1.04, 0, 0) hover=true
/ reduced=1 <div> static=true "Carga Marítima" img.transform=none hover=true
/ reduced=1 <a> static=false "Aduana y Documentación" img.transform=none hover=true
/servicios/ reduced=1 <div> static=true "Carga Aérea" img.transform=none hover=true
/servicios/ reduced=1 <a> static=false "Aduana y Documentación" img.transform=none hover=true
```
<!-- evidencia:fin apply-evidence.13 -->

Según `apply-evidence.13`, con hover real del puntero la imagen de la card no enlazada queda en `none` en el inicio y en `/servicios`, la card enlazada pasa a `matrix(1.04, …)` (equivale a `scale(1.04)`) en ambas páginas, y con `prefers-reduced-motion: reduce` ninguna se amplía.

## card-image-weight-budget — Tareas 1 a 3: dependencias, script de medición y baseline

`npm ci` y el primer `npm run build` terminaron sin errores; `dist/` está ignorado por git. El script `scripts/measure-home-image-weight.mjs` (expuesto como `npm run measure:images`) parsea cada `<picture>` de `dist/client/index.html`, evalúa `sizes` contra el viewport, elige el menor candidato AVIF con `w >= slot × DPR` (o el mayor) y suma el peso en disco de lo elegido, más el poster del video y las `<img>` sueltas (logo); cada URL cuenta una vez. El build medido aquí ya incluye los commits de videos, logo y CSS, que no tocan imágenes: es el baseline de imágenes.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.14","forma":"argv","argv":["node","scripts/measure-home-image-weight.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:27:49-03:00","exit":1,"sha256":"53ce0d23a29f3699f65c16ce2e82cf3609c8bc7e29f551dc4343ad8d88433fcf","lineas":2,"omitidas":0,"no_recomprobable":"baseline previo a widths/sizes: la Tarea 4 cambia el build medido"} -->
**Evidencia `apply-evidence.14`** · exit 1 · 2 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:27:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: baseline previo a widths/sizes: la Tarea 4 cambia el build medido

```text
node scripts/measure-home-image-weight.mjs
```

```text
escritorio 1440x900 DPR 1: total 3083223 bytes (2.940 MB) | avif 2907342 bytes (2.773 MB) | otras 175881 bytes (0.168 MB) | archivos 20 | EXCEDE 2 MB
movil 390x844 DPR 3: total 3291032 bytes (3.139 MB) | avif 3115151 bytes (2.971 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | EXCEDE 2 MB
```
<!-- evidencia:fin apply-evidence.14 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.15","forma":"argv","argv":["node","scripts/measure-home-image-weight.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:27:49-03:00","exit":1,"sha256":"53ce0d23a29f3699f65c16ce2e82cf3609c8bc7e29f551dc4343ad8d88433fcf","lineas":2,"omitidas":0,"no_recomprobable":"segunda corrida del baseline para comprobar determinismo; la Tarea 4 cambia el build medido"} -->
**Evidencia `apply-evidence.15`** · exit 1 · 2 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:27:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: segunda corrida del baseline para comprobar determinismo; la Tarea 4 cambia el build medido

```text
node scripts/measure-home-image-weight.mjs
```

```text
escritorio 1440x900 DPR 1: total 3083223 bytes (2.940 MB) | avif 2907342 bytes (2.773 MB) | otras 175881 bytes (0.168 MB) | archivos 20 | EXCEDE 2 MB
movil 390x844 DPR 3: total 3291032 bytes (3.139 MB) | avif 3115151 bytes (2.971 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | EXCEDE 2 MB
```
<!-- evidencia:fin apply-evidence.15 -->

Según `apply-evidence.14` el baseline excede 2 MB en ambos escenarios (exit 1 del script), y `apply-evidence.15` reproduce exactamente la misma salida (mismo `sha256`): la medición es determinista.

## card-image-weight-budget — Tarea 4: `widths` y `sizes` en las 7 `<Picture>` de card

Primera iteración: `sizes` derivado del ancho de la card en cada grid y `widths` con tope ~2× ese ancho. Cumplía el presupuesto y el chequeo «variante ≥ ancho de render × 2», pero la revisión a DPR 2 mostró pérdida visible de nitidez: todas estas cards pintan la foto 16:9 con `object-fit: cover` en recuadros más altos que 16:9, así que el ancho pintado de la foto supera el de la card (std del bento ~400px en una card de 185px; cards altas de industrias ~665px en una card de 289px). La iteración final usa el ancho pintado como ancho de render donde no toca los escenarios del presupuesto:

- Servicios (inicio y `/servicios`, constante compartida `SERVICE_CARD_IMAGE_WIDTHS`/`SERVICE_CARD_IMAGE_SIZES` en `src/lib/constants.ts`, porque las dos `<Picture>` usan el mismo par): sobre 640px, ancho pintado por tamaño de card (std 400px, mini 360px, feature 645/785px, wide 46vw/592px); hasta 640px, ancho de la card (90vw).
- Industrias del inicio: sobre 640px, 665px (ancho pintado de las cards altas de 2 filas); hasta 640px, 45vw (ancho de la card, 2 columnas).
- `/servicios` detalle (recuadro 5:4), `/nosotros` (4:3) e `/industrias` (visor más alto que ancho): ancho pintado en todos los breakpoints, porque esas páginas no tienen presupuesto de peso.
- `widths` llega hasta el original de 1376px donde el ancho pintado × 2 lo pide. El móvil DPR 3 no cambia: con `sizes` del ancho de la card, el navegador sigue eligiendo el menor candidato que cubre el slot (600w en industrias, 1200w en servicios).
- `quality={80}` y `formats` sin cambios; el hero, el poster y `imageService` no se tocan.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.16","forma":"archivo","argv":null,"texto":"# Por página: cada <source type=\"image/avif\"\u003e con su número de candidatos y su sizes\nfor page in index servicios/index industrias/index nosotros/index; do\n  echo \"== dist/client/$page.html\"\n  node -e '\n    const html = require(\"fs\").readFileSync(process.argv[1], \"utf8\");\n    const rows = {};\n    for (const s of html.match(/<source[^\u003e]*type=\"image\\/avif\"[^\u003e]*\u003e/g) ?? []) {\n      const n = (s.match(/srcset=\"([^\"]*)\"/)[1].split(\",\")).length;\n      const sizes = (s.match(/sizes=\"([^\"]*)\"/) ?? [, \"(sin sizes)\"])[1];\n      const k = `candidatos=${n} sizes=\"${sizes}\"`;\n      rows[k] = (rows[k] ?? 0) + 1;\n    }\n    for (const [k, v] of Object.entries(rows)) console.log(`${v}x ${k}`);\n  ' \"dist/client/$page.html\"\ndone\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:36:42-03:00","exit":0,"sha256":"6d7490ed120f137676d7e9461af4f1f8d4ef45d4a71a5f150e819e5bcf1bd231","lineas":16,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.16`** · exit 0 · 16 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:36:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Por página: cada <source type="image/avif"> con su número de candidatos y su sizes
for page in index servicios/index industrias/index nosotros/index; do
  echo "== dist/client/$page.html"
  node -e '
    const html = require("fs").readFileSync(process.argv[1], "utf8");
    const rows = {};
    for (const s of html.match(/<source[^>]*type="image\/avif"[^>]*>/g) ?? []) {
      const n = (s.match(/srcset="([^"]*)"/)[1].split(",")).length;
      const sizes = (s.match(/sizes="([^"]*)"/) ?? [, "(sin sizes)"])[1];
      const k = `candidatos=${n} sizes="${sizes}"`;
      rows[k] = (rows[k] ?? 0) + 1;
    }
    for (const [k, v] of Object.entries(rows)) console.log(`${v}x ${k}`);
  ' "dist/client/$page.html"
done
```

```text
== dist/client/index.html
1x candidatos=3 sizes="100vw"
2x candidatos=5 sizes="(max-width: 640px) 90vw, (max-width: 1280px) 46vw, 592px"
1x candidatos=5 sizes="(max-width: 640px) 90vw, (max-width: 1024px) 645px, 785px"
3x candidatos=5 sizes="(max-width: 640px) 90vw, 400px"
12x candidatos=5 sizes="(max-width: 640px) 45vw, 665px"
== dist/client/servicios/index.html
1x candidatos=5 sizes="(max-width: 640px) 90vw, (max-width: 1024px) 645px, 785px"
3x candidatos=5 sizes="(max-width: 640px) 90vw, (max-width: 1280px) 46vw, 592px"
5x candidatos=5 sizes="(max-width: 640px) 90vw, 400px"
2x candidatos=5 sizes="(max-width: 640px) 90vw, (max-width: 1024px) 46vw, 360px"
6x candidatos=3 sizes="(max-width: 900px) 129vw, (max-width: 1280px) 69vw, 890px"
== dist/client/industrias/index.html
12x candidatos=2 sizes="(max-width: 960px) 920px, 1376px"
== dist/client/nosotros/index.html
4x candidatos=3 sizes="(max-width: 600px) 121vw, (max-width: 1000px) 60vw, (max-width: 1280px) 30vw, 385px"
```
<!-- evidencia:fin apply-evidence.16 -->

Según `apply-evidence.16`, cada `<source type="image/avif">` de card en inicio, `/servicios`, `/industrias` y `/nosotros` declara `sizes` y varios candidatos; la única fuente con `sizes="100vw"` y 3 candidatos del inicio es el hero, sin cambios.

## card-image-weight-budget — Tareas 5 y 6: medición final


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.17","forma":"argv","argv":["node","scripts/measure-home-image-weight.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:36:42-03:00","exit":0,"sha256":"46cd15a860d152ee4248acdbfb490ead8a05dab4ae060b0b704e538eb17d0af5","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.17`** · exit 0 · 2 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:36:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
node scripts/measure-home-image-weight.mjs
```

```text
escritorio 1440x900 DPR 1: total 1429163 bytes (1.363 MB) | avif 1253282 bytes (1.195 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 1933313 bytes (1.844 MB) | avif 1757432 bytes (1.676 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
```
<!-- evidencia:fin apply-evidence.17 -->

Según `apply-evidence.17`, ambos escenarios quedan bajo 2 MB y el script sale con exit 0; el ahorro frente al baseline se lee comparando sus totales con los de `apply-evidence.14`. La Tarea 6 (bajar `quality`) no aplica: la medición cumple con `quality={80}`.

## card-image-weight-budget — Tarea 7: nitidez a DPR 2 y hero sin cambios


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.18","forma":"archivo","argv":null,"texto":"# DPR 2 en Chrome headless contra astro preview: variante elegida (currentSrc) frente al ancho de la card × 2 y al ancho pintado (cover) × 2\nOUT=$(mktemp -d \"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/dpr2.XXXXXXXX\")\nfor p in home:/; do\n  n=${p%%:*}; u=${p#*:}\n  for v in 1440x900 390x844; do\n    node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/shot.mjs 9333 \"http://127.0.0.1:4329$u\" ${v%x*} ${v#*x} 2 - \u003e \"$OUT/$n-${v%x*}.txt\"\n  done\ndone\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/analyze.cjs /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro \"$OUT\" | sed -E 's/ +/ /g; s/svc-card\\.svc-card--([a-z]+)(\\.svc-card--static)?/svc-\\1/; s/ind-card\\.ind-card--photo/ind-card/'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:37:15-03:00","exit":0,"sha256":"1b7d4eeb74955c660956b464dadc762094e3a0d2136753ca5156109ad559dbd0","lineas":40,"omitidas":0,"no_recomprobable":"requiere Chrome headless y astro preview levantados durante la fase"} -->
**Evidencia `apply-evidence.18`** · exit 0 · 40 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:37:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere Chrome headless y astro preview levantados durante la fase

```bash
# DPR 2 en Chrome headless contra astro preview: variante elegida (currentSrc) frente al ancho de la card × 2 y al ancho pintado (cover) × 2
OUT=$(mktemp -d "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/dpr2.XXXXXXXX")
for p in home:/; do
  n=${p%%:*}; u=${p#*:}
  for v in 1440x900 390x844; do
    node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/shot.mjs 9333 "http://127.0.0.1:4329$u" ${v%x*} ${v#*x} 2 - > "$OUT/$n-${v%x*}.txt"
  done
done
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/analyze.cjs /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro "$OUT" | sed -E 's/ +/ /g; s/svc-card\.svc-card--([a-z]+)(\.svc-card--static)?/svc-\1/; s/ind-card\.ind-card--photo/ind-card/'
```

```text
== home-1440.txt
 0 hero-b__media render=1425 cover=1514 variante=1376w w/(render×2)=0.48 w/(cover×2)=0.45
 1 svc-wide render=590 cover=590 variante=1200w w/(render×2)=1.02 w/(cover×2)=1.02
 2 svc-feature.svc-card--sta render=590 cover=785 variante=1376w w/(render×2)=1.17 w/(cover×2)=0.88
 3 svc-std render=185 cover=398 variante=800w w/(render×2)=2.16 w/(cover×2)=1.01
 4 svc-std render=185 cover=398 variante=800w w/(render×2)=2.16 w/(cover×2)=1.01
 5 svc-std render=185 cover=398 variante=800w w/(render×2)=2.16 w/(cover×2)=1.01
 6 svc-wide render=590 cover=590 variante=1200w w/(render×2)=1.02 w/(cover×2)=1.02
 7 ind-card render=289 cover=663 variante=1376w w/(render×2)=2.38 w/(cover×2)=1.04
 8 ind-card render=289 cover=319 variante=1376w w/(render×2)=2.38 w/(cover×2)=2.16
 9 ind-card render=289 cover=319 variante=1376w w/(render×2)=2.38 w/(cover×2)=2.16
10 ind-card render=289 cover=663 variante=1376w w/(render×2)=2.38 w/(cover×2)=1.04
11 ind-card render=289 cover=319 variante=1376w w/(render×2)=2.38 w/(cover×2)=2.16
12 ind-card render=289 cover=663 variante=1376w w/(render×2)=2.38 w/(cover×2)=1.04
13 ind-card render=289 cover=663 variante=1376w w/(render×2)=2.38 w/(cover×2)=1.04
14 ind-card render=289 cover=319 variante=1376w w/(render×2)=2.38 w/(cover×2)=2.16
15 ind-card render=289 cover=319 variante=1376w w/(render×2)=2.38 w/(cover×2)=2.16
16 ind-card render=289 cover=319 variante=1376w w/(render×2)=2.38 w/(cover×2)=2.16
17 ind-card render=289 cover=319 variante=1376w w/(render×2)=2.38 w/(cover×2)=2.16
18 ind-card render=289 cover=319 variante=1376w w/(render×2)=2.38 w/(cover×2)=2.16
== home-390.txt
 0 hero-b__media render=390 cover=1942 variante=1280w w/(render×2)=1.64 w/(cover×2)=0.33
 1 svc-wide render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 2 svc-feature.svc-card--sta render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 3 svc-std render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 4 svc-std render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 5 svc-std render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 6 svc-wide render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 7 ind-card render=167 cover=663 variante=450w w/(render×2)=1.35 w/(cover×2)=0.34
 8 ind-card render=167 cover=319 variante=450w w/(render×2)=1.35 w/(cover×2)=0.71
 9 ind-card render=167 cover=319 variante=450w w/(render×2)=1.35 w/(cover×2)=0.71
10 ind-card render=167 cover=663 variante=450w w/(render×2)=1.35 w/(cover×2)=0.34
11 ind-card render=167 cover=319 variante=450w w/(render×2)=1.35 w/(cover×2)=0.71
12 ind-card render=167 cover=663 variante=450w w/(render×2)=1.35 w/(cover×2)=0.34
13 ind-card render=167 cover=663 variante=450w w/(render×2)=1.35 w/(cover×2)=0.34
14 ind-card render=167 cover=319 variante=450w w/(render×2)=1.35 w/(cover×2)=0.71
15 ind-card render=167 cover=321 variante=450w w/(render×2)=1.35 w/(cover×2)=0.70
16 ind-card render=167 cover=321 variante=450w w/(render×2)=1.35 w/(cover×2)=0.70
17 ind-card render=167 cover=319 variante=450w w/(render×2)=1.35 w/(cover×2)=0.71
18 ind-card render=167 cover=319 variante=450w w/(render×2)=1.35 w/(cover×2)=0.71
```
<!-- evidencia:fin apply-evidence.18 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.19","forma":"archivo","argv":null,"texto":"# DPR 2 en Chrome headless contra astro preview: variante elegida (currentSrc) frente al ancho de la card × 2 y al ancho pintado (cover) × 2\nOUT=$(mktemp -d \"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/dpr2.XXXXXXXX\")\nfor p in servicios:/servicios/; do\n  n=${p%%:*}; u=${p#*:}\n  for v in 1440x900 390x844; do\n    node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/shot.mjs 9333 \"http://127.0.0.1:4329$u\" ${v%x*} ${v#*x} 2 - \u003e \"$OUT/$n-${v%x*}.txt\"\n  done\ndone\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/analyze.cjs /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro \"$OUT\" | sed -E 's/ +/ /g; s/svc-card\\.svc-card--([a-z]+)(\\.svc-card--static)?/svc-\\1/; s/ind-card\\.ind-card--photo/ind-card/'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:37:18-03:00","exit":0,"sha256":"b2fb04000bff7f1713773c9417f1ca7d14118c7181f45947870af3a571f33e54","lineas":36,"omitidas":0,"no_recomprobable":"requiere Chrome headless y astro preview levantados durante la fase"} -->
**Evidencia `apply-evidence.19`** · exit 0 · 36 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:37:18-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere Chrome headless y astro preview levantados durante la fase

```bash
# DPR 2 en Chrome headless contra astro preview: variante elegida (currentSrc) frente al ancho de la card × 2 y al ancho pintado (cover) × 2
OUT=$(mktemp -d "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/dpr2.XXXXXXXX")
for p in servicios:/servicios/; do
  n=${p%%:*}; u=${p#*:}
  for v in 1440x900 390x844; do
    node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/shot.mjs 9333 "http://127.0.0.1:4329$u" ${v%x*} ${v#*x} 2 - > "$OUT/$n-${v%x*}.txt"
  done
done
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/analyze.cjs /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro "$OUT" | sed -E 's/ +/ /g; s/svc-card\.svc-card--([a-z]+)(\.svc-card--static)?/svc-\1/; s/ind-card\.ind-card--photo/ind-card/'
```

```text
== servicios-1440.txt
 0 svc-feature.svc-card--sta render=590 cover=785 variante=1376w w/(render×2)=1.17 w/(cover×2)=0.88
 1 svc-wide render=590 cover=590 variante=1200w w/(render×2)=1.02 w/(cover×2)=1.02
 2 svc-std render=185 cover=398 variante=800w w/(render×2)=2.16 w/(cover×2)=1.01
 3 svc-std render=185 cover=398 variante=800w w/(render×2)=2.16 w/(cover×2)=1.01
 4 svc-std render=185 cover=398 variante=800w w/(render×2)=2.16 w/(cover×2)=1.01
 5 svc-wide render=590 cover=590 variante=1200w w/(render×2)=1.02 w/(cover×2)=1.02
 6 svc-std render=185 cover=358 variante=800w w/(render×2)=2.16 w/(cover×2)=1.12
 7 svc-std render=185 cover=358 variante=800w w/(render×2)=2.16 w/(cover×2)=1.12
 8 svc-mini render=286 cover=355 variante=800w w/(render×2)=1.40 w/(cover×2)=1.13
 9 svc-mini render=286 cover=355 variante=800w w/(render×2)=1.40 w/(cover×2)=1.13
10 svc-wide render=590 cover=590 variante=1200w w/(render×2)=1.02 w/(cover×2)=1.02
11 svc-detail__media render=620 cover=888 variante=1376w w/(render×2)=1.11 w/(cover×2)=0.77
12 svc-detail__media render=620 cover=888 variante=1376w w/(render×2)=1.11 w/(cover×2)=0.77
13 svc-detail__media render=620 cover=888 variante=1376w w/(render×2)=1.11 w/(cover×2)=0.77
14 svc-detail__media render=620 cover=888 variante=1376w w/(render×2)=1.11 w/(cover×2)=0.77
15 svc-detail__media render=620 cover=888 variante=1376w w/(render×2)=1.11 w/(cover×2)=0.77
16 svc-detail__media render=620 cover=888 variante=1376w w/(render×2)=1.11 w/(cover×2)=0.77
== servicios-390.txt
 0 svc-feature.svc-card--sta render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 1 svc-wide render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 2 svc-std render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 3 svc-std render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 4 svc-std render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 5 svc-wide render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 6 svc-std render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 7 svc-std render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 8 svc-mini render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
 9 svc-mini render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
10 svc-wide render=348 cover=426 variante=800w w/(render×2)=1.15 w/(cover×2)=0.94
11 svc-detail__media render=350 cover=502 variante=1376w w/(render×2)=1.97 w/(cover×2)=1.37
12 svc-detail__media render=350 cover=502 variante=1376w w/(render×2)=1.97 w/(cover×2)=1.37
13 svc-detail__media render=350 cover=502 variante=1376w w/(render×2)=1.97 w/(cover×2)=1.37
14 svc-detail__media render=350 cover=502 variante=1376w w/(render×2)=1.97 w/(cover×2)=1.37
15 svc-detail__media render=350 cover=502 variante=1376w w/(render×2)=1.97 w/(cover×2)=1.37
16 svc-detail__media render=350 cover=502 variante=1376w w/(render×2)=1.97 w/(cover×2)=1.37
```
<!-- evidencia:fin apply-evidence.19 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.20","forma":"archivo","argv":null,"texto":"# DPR 2 en Chrome headless contra astro preview: variante elegida (currentSrc) frente al ancho de la card × 2 y al ancho pintado (cover) × 2\nOUT=$(mktemp -d \"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/dpr2.XXXXXXXX\")\nfor p in industrias:/industrias/ nosotros:/nosotros/; do\n  n=${p%%:*}; u=${p#*:}\n  for v in 1440x900 390x844; do\n    node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/shot.mjs 9333 \"http://127.0.0.1:4329$u\" ${v%x*} ${v#*x} 2 - \u003e \"$OUT/$n-${v%x*}.txt\"\n  done\ndone\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/analyze.cjs /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro \"$OUT\" | sed -E 's/ +/ /g; s/svc-card\\.svc-card--([a-z]+)(\\.svc-card--static)?/svc-\\1/; s/ind-card\\.ind-card--photo/ind-card/'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:37:22-03:00","exit":0,"sha256":"fa0d28162edaf8cbd32a03661a7d95f371a20b23d7eec031a4713a88faa2c31b","lineas":36,"omitidas":0,"no_recomprobable":"requiere Chrome headless y astro preview levantados durante la fase"} -->
**Evidencia `apply-evidence.20`** · exit 0 · 36 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:37:22-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere Chrome headless y astro preview levantados durante la fase

```bash
# DPR 2 en Chrome headless contra astro preview: variante elegida (currentSrc) frente al ancho de la card × 2 y al ancho pintado (cover) × 2
OUT=$(mktemp -d "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/dpr2.XXXXXXXX")
for p in industrias:/industrias/ nosotros:/nosotros/; do
  n=${p%%:*}; u=${p#*:}
  for v in 1440x900 390x844; do
    node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/shot.mjs 9333 "http://127.0.0.1:4329$u" ${v%x*} ${v#*x} 2 - > "$OUT/$n-${v%x*}.txt"
  done
done
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/analyze.cjs /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro "$OUT" | sed -E 's/ +/ /g; s/svc-card\.svc-card--([a-z]+)(\.svc-card--static)?/svc-\1/; s/ind-card\.ind-card--photo/ind-card/'
```

```text
== industrias-1440.txt
 0 ind-directory__viewer render=601 cover=1519 variante=1376w w/(render×2)=1.14 w/(cover×2)=0.45
 1 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
 2 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
 3 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
 4 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
 5 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
 6 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
 7 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
 8 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
 9 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
10 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
11 ind-directory__viewer render=638 cover=1610 variante=1376w w/(render×2)=1.08 w/(cover×2)=0.43
== industrias-390.txt
 0 ind-directory__viewer render=348 cover=749 variante=1376w w/(render×2)=1.98 w/(cover×2)=0.92
 1 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
 2 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
 3 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
 4 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
 5 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
 6 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
 7 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
 8 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
 9 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
10 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
11 ind-directory__viewer render=369 cover=794 variante=1376w w/(render×2)=1.86 w/(cover×2)=0.87
== nosotros-1440.txt
 0 howwork-card__media render=283 cover=380 variante=800w w/(render×2)=1.41 w/(cover×2)=1.05
 1 howwork-card__media render=283 cover=380 variante=800w w/(render×2)=1.41 w/(cover×2)=1.05
 2 howwork-card__media render=283 cover=380 variante=800w w/(render×2)=1.41 w/(cover×2)=1.05
 3 howwork-card__media render=283 cover=380 variante=800w w/(render×2)=1.41 w/(cover×2)=1.05
== nosotros-390.txt
 0 howwork-card__media render=348 cover=468 variante=1376w w/(render×2)=1.98 w/(cover×2)=1.47
 1 howwork-card__media render=348 cover=468 variante=1376w w/(render×2)=1.98 w/(cover×2)=1.47
 2 howwork-card__media render=348 cover=468 variante=1376w w/(render×2)=1.98 w/(cover×2)=1.47
 3 howwork-card__media render=348 cover=468 variante=1376w w/(render×2)=1.98 w/(cover×2)=1.47
```
<!-- evidencia:fin apply-evidence.20 -->

`apply-evidence.18` a `apply-evidence.20` cargan cada página a DPR 2 (1440×900 y 390×844) y comparan la variante elegida por el navegador con el ancho de la card × 2 (criterio de la Tarea 7) y con el ancho pintado por `object-fit: cover` × 2. Lectura:

- El criterio de la Tarea 7 (`w/(render×2) ≥ 1`) se cumple en todas las cards de las cuatro páginas, en escritorio y en móvil.
- En escritorio, la variante también cubre el ancho pintado × 2 (≈1 o más), salvo donde el ancho pintado × 2 supera el original de 1376px (feature del bento y detalle de `/servicios`), que reciben el original, igual que antes del cambio.
- En móvil, los servicios quedan apenas bajo el ancho pintado × 2 y las cards de industrias del inicio claramente bajo él: las 8 de una fila a ~0,7 y las 4 altas de 2 filas a ~0,34.

El bloque siguiente simula a nivel de píxel de dispositivo esas mismas proporciones contra la foto original (varianza del laplaciano; más alta = más detalle) e incluye la primera iteración para contrastar.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.21","forma":"archivo","argv":null,"texto":"# Nitidez simulada a DPR 2: original 1376w frente a la variante servida, pintada al ancho de cover\nS=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/sim.cjs; R=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\necho \"-- escritorio 1440 (variante servida tras el cambio) --\"\nnode $S $R svc-aduana 800 398 2\nnode $S $R ind-mineria 1376 663 2\nnode $S $R ind-retail 1376 319 2\necho \"-- escritorio 1440 (primera iteración, sizes = ancho de la card) --\"\nnode $S $R svc-aduana 400 398 2\nnode $S $R ind-mineria 600 663 2\necho \"-- móvil 390 (variante servida tras el cambio) --\"\nnode $S $R svc-aduana 800 426 2\nnode $S $R ind-retail 450 319 2\nnode $S $R ind-mineria 450 663 2\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:38:08-03:00","exit":0,"sha256":"fd074917a08c65f07ef639836139dc0b57ff7f389114451bbb69b47e49f9ad48","lineas":11,"omitidas":0,"no_recomprobable":"usa scripts de simulación del directorio de temporales del despacho"} -->
**Evidencia `apply-evidence.21`** · exit 0 · 11 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:38:08-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: usa scripts de simulación del directorio de temporales del despacho

```bash
# Nitidez simulada a DPR 2: original 1376w frente a la variante servida, pintada al ancho de cover
S=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-c00mb4x2/sim.cjs; R=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
echo "-- escritorio 1440 (variante servida tras el cambio) --"
node $S $R svc-aduana 800 398 2
node $S $R ind-mineria 1376 663 2
node $S $R ind-retail 1376 319 2
echo "-- escritorio 1440 (primera iteración, sizes = ancho de la card) --"
node $S $R svc-aduana 400 398 2
node $S $R ind-mineria 600 663 2
echo "-- móvil 390 (variante servida tras el cambio) --"
node $S $R svc-aduana 800 426 2
node $S $R ind-retail 450 319 2
node $S $R ind-mineria 450 663 2
```

```text
-- escritorio 1440 (variante servida tras el cambio) --
svc-aduana pintado=398px DPR2 variante=800w laplaciano original=576.4 variante=486.9 ratio=0.84
ind-mineria pintado=663px DPR2 variante=1376w laplaciano original=199.5 variante=194.3 ratio=0.97
ind-retail pintado=319px DPR2 variante=1376w laplaciano original=376.4 variante=375.4 ratio=1.00
-- escritorio 1440 (primera iteración, sizes = ancho de la card) --
svc-aduana pintado=398px DPR2 variante=400w laplaciano original=576.4 variante=84.5 ratio=0.15
ind-mineria pintado=663px DPR2 variante=600w laplaciano original=199.5 variante=25.4 ratio=0.13
-- móvil 390 (variante servida tras el cambio) --
svc-aduana pintado=426px DPR2 variante=800w laplaciano original=548.2 variante=347.5 ratio=0.63
ind-retail pintado=319px DPR2 variante=450w laplaciano original=376.4 variante=129.8 ratio=0.34
ind-mineria pintado=663px DPR2 variante=450w laplaciano original=199.5 variante=10.2 ratio=0.05
```
<!-- evidencia:fin apply-evidence.21 -->

Según `apply-evidence.21`, con la iteración final las cards de escritorio conservan prácticamente el detalle del original a DPR 2, mientras que la primera iteración (sizes = ancho de la card) lo perdía casi entero; la revisión visual de recortes 1:1 coincide: sin pérdida visible en escritorio. En móvil, la card de servicios pierde algo de detalle sin diferencia visible en el recorte; la card de industria de una fila se ve levemente más blanda y las 4 cards altas de industrias del inicio se ven visiblemente borrosas a DPR 2 (y a DPR 3, donde reciben la misma variante de 600w como máximo). Ese residuo no se resuelve dentro del presupuesto: darles ~1376w a esas 4 cards en móvil suma del orden de medio MB y lleva el escenario móvil DPR 3 por encima de 2 MB. Queda registrado como riesgo del cambio y como observación `pre-adr`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.22","forma":"archivo","argv":null,"texto":"# Hero del inicio: <picture\u003e construido y peso de sus variantes AVIF; diff del componente contra la base del cambio\nnode -e '\n  const html = require(\"fs\").readFileSync(\"dist/client/index.html\", \"utf8\");\n  const hero = html.match(/<picture[\\s\\S]*?<\\/picture\u003e/)[0];\n  console.log(hero.match(/<source[^\u003e]*image\\/avif[^\u003e]*\u003e/)[0]);\n  console.log(hero.match(/<img[^\u003e]*\u003e/)[0].match(/(loading|decoding|fetchpriority)=\"[^\"]*\"/g).join(\" \"));\n'\nls -l dist/client/_astro/svc-maritima.BKF8Hpyr_Zvpy9s.avif dist/client/_astro/svc-maritima.BKF8Hpyr_Z26pWuB.avif dist/client/_astro/svc-maritima.BKF8Hpyr_ZDqOlf.avif | awk '{print $5, $9}'\ngit diff --stat 78b6b73 -- src/components/sections/HeroSection.astro\necho \"diff HeroSection exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"7859ca13098d23b38f28b7824266a85819c91ac2","fecha":"2026-10-03T00:38:08-03:00","exit":0,"sha256":"0ff288daea1c59b7cdc45ed14a82b78661a0dd165b9fac10ad5efe43dc827c15","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.22`** · exit 0 · 6 líneas, 0 omitidas · HEAD `7859ca13098d` · 2026-10-03T00:38:08-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Hero del inicio: <picture> construido y peso de sus variantes AVIF; diff del componente contra la base del cambio
node -e '
  const html = require("fs").readFileSync("dist/client/index.html", "utf8");
  const hero = html.match(/<picture[\s\S]*?<\/picture>/)[0];
  console.log(hero.match(/<source[^>]*image\/avif[^>]*>/)[0]);
  console.log(hero.match(/<img[^>]*>/)[0].match(/(loading|decoding|fetchpriority)="[^"]*"/g).join(" "));
'
ls -l dist/client/_astro/svc-maritima.BKF8Hpyr_Zvpy9s.avif dist/client/_astro/svc-maritima.BKF8Hpyr_Z26pWuB.avif dist/client/_astro/svc-maritima.BKF8Hpyr_ZDqOlf.avif | awk '{print $5, $9}'
git diff --stat 78b6b73 -- src/components/sections/HeroSection.astro
echo "diff HeroSection exit=$?"
```

```text
<source srcset="/_astro/svc-maritima.BKF8Hpyr_Zvpy9s.avif 768w, /_astro/svc-maritima.BKF8Hpyr_Z26pWuB.avif 1280w, /_astro/svc-maritima.BKF8Hpyr_ZDqOlf.avif 1376w" type="image/avif" sizes="100vw">
loading="eager" decoding="sync" fetchpriority="high"
207809 dist/client/_astro/svc-maritima.BKF8Hpyr_Z26pWuB.avif
236547 dist/client/_astro/svc-maritima.BKF8Hpyr_ZDqOlf.avif
93159 dist/client/_astro/svc-maritima.BKF8Hpyr_Zvpy9s.avif
diff HeroSection exit=0
```
<!-- evidencia:fin apply-evidence.22 -->

Según `apply-evidence.22`, el hero del inicio conserva `loading="eager"`, `decoding="sync"` y `fetchpriority="high"`, su `srcset` AVIF de tres anchos con `sizes="100vw"` y el peso de esas variantes, y `HeroSection.astro` no tiene diff contra la base del cambio (`78b6b73`).

## observations-debt-log-sync — Tareas 1 y 2

Las entradas se ubicaron por contenido (títulos de los tres `debt-candidate` y la viñeta «`logo.svg` real»). La ruta del logo eliminado se verificó en el historial antes de anotar la corrección.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.23","forma":"argv","argv":["git","show","--name-status","--format=%h","e6ade3a","--","log-atm-web-astro/src/assets/logo.svg","log-atm-web-astro/src/lib/industryImages.ts"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"b38d775e9e76f9a1cb4e610d358f64890e2ac79f","fecha":"2026-10-03T00:39:30-03:00","exit":0,"sha256":"54be9beca35d9aadde0a1921d2cc8a2f11e471673f613aa7306d2fb58cab1b43","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.23`** · exit 0 · 4 líneas, 0 omitidas · HEAD `b38d775e9e76` · 2026-10-03T00:39:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`

```text
git show --name-status --format=%h e6ade3a -- log-atm-web-astro/src/assets/logo.svg log-atm-web-astro/src/lib/industryImages.ts
```

```text
e6ade3a

D	log-atm-web-astro/src/assets/logo.svg
D	log-atm-web-astro/src/lib/industryImages.ts
```
<!-- evidencia:fin apply-evidence.23 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.24","forma":"argv","argv":["git","ls-tree","-r","--name-only","e6ade3a^","--","log-atm-web-astro/src/assets/logo.svg","log-atm-web-astro/src/assets/industries/logo.svg"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"b38d775e9e76f9a1cb4e610d358f64890e2ac79f","fecha":"2026-10-03T00:39:30-03:00","exit":0,"sha256":"5e7ba97f9035e46a600009b6f7159384116fae869dcf1ff480d9c5b2a7e990c2","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.24`** · exit 0 · 1 líneas, 0 omitidas · HEAD `b38d775e9e76` · 2026-10-03T00:39:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`

```text
git ls-tree -r --name-only 'e6ade3a^' -- log-atm-web-astro/src/assets/logo.svg log-atm-web-astro/src/assets/industries/logo.svg
```

```text
log-atm-web-astro/src/assets/logo.svg
```
<!-- evidencia:fin apply-evidence.24 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.25","forma":"argv","argv":["git","show","--format=%h","--stat","b38d775","--","memory/observations.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"b38d775e9e76f9a1cb4e610d358f64890e2ac79f","fecha":"2026-10-03T00:39:30-03:00","exit":0,"sha256":"e5172cad48cbf090ad0c66042ed6bcd06d790129cd367ff9a43779e79f903b1e","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.25`** · exit 0 · 4 líneas, 0 omitidas · HEAD `b38d775e9e76` · 2026-10-03T00:39:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`

```text
git show --format=%h --stat b38d775 -- memory/observations.md
```

```text
b38d775

 memory/observations.md | 4 ++++
 1 file changed, 4 insertions(+)
```
<!-- evidencia:fin apply-evidence.25 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.26","forma":"argv","argv":["git","show","--format=","-U0","b38d775","--","memory/observations.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"b38d775e9e76f9a1cb4e610d358f64890e2ac79f","fecha":"2026-10-03T00:39:30-03:00","exit":0,"sha256":"be7e11c3646e10da67aee810295134f09f719eefea33e930b0ad4cb6ab588f01","lineas":12,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.26`** · exit 0 · 12 líneas, 0 omitidas · HEAD `b38d775e9e76` · 2026-10-03T00:39:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`

```text
git show --format= -U0 b38d775 -- memory/observations.md
```

```text
diff --git a/memory/observations.md b/memory/observations.md
index a0b7a57..f7d79bd 100644
--- a/memory/observations.md
+++ b/memory/observations.md
@@ -67,0 +68 @@ El proyecto define típicamente:
+**Estado**: resuelto por `e6ade3a` (borró los 14 jpg de `src/assets/industries/` y `src/lib/industryImages.ts`).
@@ -73,0 +75 @@ El proyecto define típicamente:
+**Estado**: resuelto por `e6ade3a` (borró `src/assets/logo.svg`); `debt-assets-weight` retiró además `scripts/png-to-svg.mjs` y la dependencia `potrace`.
@@ -79,0 +82 @@ El proyecto define típicamente:
+**Estado**: cerrado por `debt-assets-weight`: se confirmaron 3 MP4 con el mismo md5 (`public/video/intro.mp4`, `public/videos/hero-port.mp4`, `public/videos/log-atm-intro.mp4`) y se dejó solo `public/videos/log-atm-intro.mp4`.
@@ -91,0 +95 @@ Se adopta `astro:assets` con `<Picture formats={['avif','webp']}>` + fallback JP
+  - **Corrección (`debt-assets-weight`)**: el historial git muestra que `e6ade3a` eliminó `src/assets/logo.svg`; `src/assets/industries/logo.svg` no existía en el árbol previo a ese commit.
```
<!-- evidencia:fin apply-evidence.26 -->

Según `apply-evidence.23`, `e6ade3a` borró `src/assets/logo.svg` y `src/lib/industryImages.ts`; según `apply-evidence.24`, en el árbol previo a ese commit existía `src/assets/logo.svg` y no `src/assets/industries/logo.svg`. `apply-evidence.25` y `apply-evidence.26` muestran que el commit de esta spec solo agrega líneas a `observations.md` (ninguna borrada): las tres líneas `**Estado**` y la corrección de ruta.

## Cierre: corrida completa sobre el árbol final


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.27","forma":"archivo","argv":null,"texto":"# Corrida completa de cierre: build (incluye la validación i18n del hook de build) y medición del inicio\nnpm run build 2\u003e&1 | grep -E \"i18n|error|Error|Complete!\" | sed -E 's/^[0-9:]+ //'\necho \"build exit=${PIPESTATUS[0]}\"\nnpm run -s measure:images\necho \"measure exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"b38d775e9e76f9a1cb4e610d358f64890e2ac79f","fecha":"2026-10-03T00:39:50-03:00","exit":0,"sha256":"e1ed23daf2edd4fe71290a9d30d3f0126325ee76abe37486dec3b24b1df7202a","lineas":8,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.27`** · exit 0 · 8 líneas, 0 omitidas · HEAD `b38d775e9e76` · 2026-10-03T00:39:50-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```bash
# Corrida completa de cierre: build (incluye la validación i18n del hook de build) y medición del inicio
npm run build 2>&1 | grep -E "i18n|error|Error|Complete!" | sed -E 's/^[0-9:]+ //'
echo "build exit=${PIPESTATUS[0]}"
npm run -s measure:images
echo "measure exit=$?"
```

```text
[log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
[build] Complete!
build exit=0
escritorio 1440x900 DPR 1: total 1429163 bytes (1.363 MB) | avif 1253282 bytes (1.195 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 1933313 bytes (1.844 MB) | avif 1757432 bytes (1.676 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
measure exit=0
```
<!-- evidencia:fin apply-evidence.27 -->

Según `apply-evidence.27`, sobre el árbol final el build (con la validación i18n del hook) termina sin errores y la medición del inicio sale con exit 0 en ambos escenarios.

## Commits y specs

| Spec | Commits |
|---|---|
| `duplicate-video-removal` | `5e28cbd` |
| `logo-vectorization-residue-removal` | `2904775` |
| `services-static-card-no-hover-zoom` | `7859ca1` |
| `card-image-weight-budget` | `78c66b5` (script de medición), `bb38fc0` (`widths`/`sizes`) |
| `observations-debt-log-sync` | `b38d775` |

Las cinco specs quedan en `status: review` con `commits`, `feature_branch` y `worktree`. Los criterios de aceptación no se marcan en esta fase.

## Redespacho tras verify (PARTIAL, H-1) — card-image-weight-budget, Tareas 4 a 7: cards altas de industrias del inicio en móvil

Corrección de implementación del hallazgo H-1 de `verify-report.md`: en móvil, las cuatro cards altas del bento de industrias del inicio (Minería, Farmacéutica, Construcción y Chatarra Ferrosa, 2 filas) pintan la foto 16:9 a ~665px de ancho con `object-fit: cover` aunque la card mida ~160px, y `sizes="(max-width: 640px) 45vw, 665px"` les asignaba el ancho de la card. El cambio da a esas cards `sizes="665px"` en todo viewport (su ancho pintado, fijado por el alto de 2 filas) y deja las cards de 1 fila con el `sizes` anterior. Para que `IndustriesSection.astro` sea la fuente única de qué posiciones son altas, la card alta recibe la clase `ind-card--tall` y `industries.css` fija el `grid-row: span 2` sobre esa clase en lugar de repetir las posiciones con `nth-child` (mismo layout, mismas cuatro posiciones). Con `sizes` honesto el móvil DPR 3 elige la variante de 1376px en esas cuatro cards; la Tarea 6 (bajar `quality` solo si la medición supera 2 MB) decide la calidad de esas cuatro cards con la medición.

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.28","forma":"archivo","argv":null,"texto":"# Build con sizes=\"665px\" en las cards altas de industrias y quality={80}, y medición del inicio\nnpm run build 2\u003e&1 | grep -E \"i18n\\]|rror|Complete!\" | sed -E 's/^[0-9:]+ //'\necho \"build exit=${PIPESTATUS[0]}\"\nnpm run -s measure:images\necho \"measure exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T01:06:31-03:00","exit":0,"sha256":"da400a5127082a45570ce83e4d78c281e8fb9a01017c5354202cb46f09cc139c","lineas":8,"omitidas":0,"no_recomprobable":"medición con quality 80 en las cards altas: el paso siguiente de la Tarea 6 cambia la quality y el build medido"} -->
**Evidencia `apply-evidence.28`** · exit 0 · 8 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T01:06:31-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: medición con quality 80 en las cards altas: el paso siguiente de la Tarea 6 cambia la quality y el build medido

```bash
# Build con sizes="665px" en las cards altas de industrias y quality={80}, y medición del inicio
npm run build 2>&1 | grep -E "i18n\]|rror|Complete!" | sed -E 's/^[0-9:]+ //'
echo "build exit=${PIPESTATUS[0]}"
npm run -s measure:images
echo "measure exit=$?"
```

```text
[log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
[build] Complete!
build exit=0
escritorio 1440x900 DPR 1: total 1429163 bytes (1.363 MB) | avif 1253282 bytes (1.195 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2419435 bytes (2.307 MB) | avif 2243554 bytes (2.140 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | EXCEDE 2 MB
measure exit=1
```
<!-- evidencia:fin apply-evidence.28 -->

Según `apply-evidence.28`, con `sizes="665px"` y `quality={80}` en las cards altas el build termina sin errores, pero el escenario móvil DPR 3 supera 2 MB (exit 1 de la medición): las cuatro cards altas pasan a la variante de 1376px. El escritorio no cambia. Corresponde la Tarea 6.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.29","forma":"archivo","argv":null,"texto":"# Tarea 6: peso AVIF de la variante de 1376px de las 4 cards altas por quality, con el mismo encoder que usa Astro (sharp .avif({quality}));\n# la fila q80 calibra contra el build (debe coincidir con los archivos 1376w de dist/client/_astro). Presupuesto móvil: total medido 2419435 con q80.\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-8pbw25bs/sim.3IcFMChe/sizes.mjs \"$PWD\" '[[1376,80],[1376,70],[1376,65],[1376,60],[1376,55]]' \\\n | awk '{print} {for(i=2;i<=NF;i++){split($i,a,\"=\");s[a[1]]+=a[2]}} END{q80=s[\"1376q80\"]; for(k in s) printf \"suma %s=%d  total movil estimado=%d %s\\n\", k, s[k], 2419435-q80+s[k], (2419435-q80+s[k] < 2097152 ? \"< 2 MB\" : \"\u003e= 2 MB\")}' | sort\necho \"--- 1376w de las cards altas en el build (q80)\"\nls -l dist/client/_astro/ | /usr/bin/grep -E \"ind-(mineria|farma|construccion|chatarra)\" | /usr/bin/grep avif | awk '{print $5, $9}' | sort -k2 | awk '$1\u003e110000'\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T01:08:03-03:00","exit":0,"sha256":"dd89e4b6fb8534a34928342619bbcde921ca5d06747518603a7071dab6d806f0","lineas":15,"omitidas":0,"no_recomprobable":"usa un script de simulación del directorio de temporales del despacho y el build con quality 80, que el paso siguiente reemplaza"} -->
**Evidencia `apply-evidence.29`** · exit 0 · 15 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T01:08:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: usa un script de simulación del directorio de temporales del despacho y el build con quality 80, que el paso siguiente reemplaza

```bash
# Tarea 6: peso AVIF de la variante de 1376px de las 4 cards altas por quality, con el mismo encoder que usa Astro (sharp .avif({quality}));
# la fila q80 calibra contra el build (debe coincidir con los archivos 1376w de dist/client/_astro). Presupuesto móvil: total medido 2419435 con q80.
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-8pbw25bs/sim.3IcFMChe/sizes.mjs "$PWD" '[[1376,80],[1376,70],[1376,65],[1376,60],[1376,55]]' \
 | awk '{print} {for(i=2;i<=NF;i++){split($i,a,"=");s[a[1]]+=a[2]}} END{q80=s["1376q80"]; for(k in s) printf "suma %s=%d  total movil estimado=%d %s\n", k, s[k], 2419435-q80+s[k], (2419435-q80+s[k] < 2097152 ? "< 2 MB" : ">= 2 MB")}' | sort
echo "--- 1376w de las cards altas en el build (q80)"
ls -l dist/client/_astro/ | /usr/bin/grep -E "ind-(mineria|farma|construccion|chatarra)" | /usr/bin/grep avif | awk '{print $5, $9}' | sort -k2 | awk '$1>110000'
```

```text
chatarra 1376q80=258916 1376q70=204934 1376q65=186254 1376q60=165811 1376q55=143938
construccion 1376q80=163561 1376q70=125100 1376q65=112244 1376q60=98163 1376q55=83839
farma 1376q80=115849 1376q70=83511 1376q65=73246 1376q60=62616 1376q55=51871
mineria 1376q80=167797 1376q70=128365 1376q65=114790 1376q60=99801 1376q55=84293
suma 1376q55=363941  total movil estimado=2077253 < 2 MB
suma 1376q60=426391  total movil estimado=2139703 >= 2 MB
suma 1376q65=486534  total movil estimado=2199846 >= 2 MB
suma 1376q70=541910  total movil estimado=2255222 >= 2 MB
suma 1376q80=706123  total movil estimado=2419435 >= 2 MB
--- 1376w de las cards altas en el build (q80)
151728 ind-chatarra.DFRybrIL_2bDGPf.avif
258916 ind-chatarra.DFRybrIL_aFyro.avif
163561 ind-construccion.DbAV3UUV_Z1uelTT.avif
115849 ind-farma.BXogGomO_Z25RNbr.avif
167797 ind-mineria.ByjgnuJh_ZXF1tc.avif
```
<!-- evidencia:fin apply-evidence.29 -->

`apply-evidence.29` simula, con el mismo encoder que usa Astro, el peso de la variante de 1376px de las cuatro cards altas para cada paso de quality; la fila q80 coincide con los archivos del build, lo que calibra la simulación. Según esa tabla, q55 es el único paso de la serie que deja el total móvil estimado bajo 2 MB. La quality se baja solo en las cuatro cards altas: son las que generan el exceso, y bajarla en las demás cards degradaría imágenes que ya cumplen. Una comparación visual en el directorio de temporales (recorte central de 320×752 px, el área que muestra la card a DPR 2) de Minería y Farmacéutica en 450w q80, 1376w q55 y 1376w q80 muestra que 1376w q55 recupera el detalle que pierde 450w y queda muy próxima a 1376w q80.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.30","forma":"archivo","argv":null,"texto":"# Build con sizes=\"665px\" y quality={55} en las cards altas de industrias (las demás sin cambios), y medición del inicio\nnpm run build 2\u003e&1 | grep -E \"i18n\\]|rror|Complete!\" | sed -E 's/^[0-9:]+ //'\necho \"build exit=${PIPESTATUS[0]}\"\nnpm run -s measure:images\necho \"measure exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T01:09:06-03:00","exit":0,"sha256":"0555171e098018f3589367b8ed95606fa983dd498934cf9e14590165d4b1159a","lineas":8,"omitidas":0,"no_recomprobable":"build y medición de la tarea; la corrida completa de cierre los repite sobre el árbol final"} -->
**Evidencia `apply-evidence.30`** · exit 0 · 8 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T01:09:06-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: build y medición de la tarea; la corrida completa de cierre los repite sobre el árbol final

```bash
# Build con sizes="665px" y quality={55} en las cards altas de industrias (las demás sin cambios), y medición del inicio
npm run build 2>&1 | grep -E "i18n\]|rror|Complete!" | sed -E 's/^[0-9:]+ //'
echo "build exit=${PIPESTATUS[0]}"
npm run -s measure:images
echo "measure exit=$?"
```

```text
[log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
[build] Complete!
build exit=0
escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
measure exit=0
```
<!-- evidencia:fin apply-evidence.30 -->

Según `apply-evidence.30`, con `quality={55}` en las cards altas el build termina sin errores y ambos escenarios quedan bajo 2 MB (exit 0 de la medición), con el total móvil igual al estimado en `apply-evidence.29`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.31","forma":"archivo","argv":null,"texto":"# Nitidez a DPR 2 en Chrome headless (CDP) contra astro preview del build: variante elegida (currentSrc) frente al ancho pintado (object-fit: cover) x 2\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-8pbw25bs\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnpx astro preview --port 4342 --host 127.0.0.1 \u003e $T/b/sharp-preview.log 2\u003e&1 &\nPV=$!\ncd $T/b\n\"$CHROME_PATH\" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9462 --user-data-dir=$T/b/sharp-profile about:blank \u003e $T/b/sharp-chrome.log 2\u003e&1 &\nCH=$!\nsleep 6\necho \"preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4342/)\"\nfor pg in '' servicios/ industrias/ nosotros/; do for vp in '1440 900' '390 844'; do echo \"== DPR 2 /$pg ($vp)\"; node $T/cdp.mjs 9462 http://127.0.0.1:4342/$pg $vp 2 sharp; done; done\necho \"== captura móvil 390x844 DPR 2 del bento de industrias\"; node $T/cdp.mjs 9462 http://127.0.0.1:4342/ 390 844 2 shot:$T/b/industrias-movil-dpr2.png\nkill $CH 2\u003e/dev/null; pkill -P $PV 2\u003e/dev/null; kill $PV 2\u003e/dev/null; wait 2\u003e/dev/null; echo \"servidores detenidos\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T01:10:57-03:00","exit":0,"sha256":"28516fb0ddf82cb43fc52e6b17fefb2706362291827a71b46807c2de11da491b","lineas":51,"omitidas":11,"no_recomprobable":"requiere Chrome headless y astro preview levantados durante la fase"} -->
**Evidencia `apply-evidence.31`** · exit 0 · 51 líneas, 11 omitidas · HEAD `edbdf5537f17` · 2026-10-03T01:10:57-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere Chrome headless y astro preview levantados durante la fase

```bash
# Nitidez a DPR 2 en Chrome headless (CDP) contra astro preview del build: variante elegida (currentSrc) frente al ancho pintado (object-fit: cover) x 2
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-8pbw25bs
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
npx astro preview --port 4342 --host 127.0.0.1 > $T/b/sharp-preview.log 2>&1 &
PV=$!
cd $T/b
"$CHROME_PATH" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9462 --user-data-dir=$T/b/sharp-profile about:blank > $T/b/sharp-chrome.log 2>&1 &
CH=$!
sleep 6
echo "preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4342/)"
for pg in '' servicios/ industrias/ nosotros/; do for vp in '1440 900' '390 844'; do echo "== DPR 2 /$pg ($vp)"; node $T/cdp.mjs 9462 http://127.0.0.1:4342/$pg $vp 2 sharp; done; done
echo "== captura móvil 390x844 DPR 2 del bento de industrias"; node $T/cdp.mjs 9462 http://127.0.0.1:4342/ 390 844 2 shot:$T/b/industrias-movil-dpr2.png
kill $CH 2>/dev/null; pkill -P $PV 2>/dev/null; kill $PV 2>/dev/null; wait 2>/dev/null; echo "servidores detenidos"
```

```text
preview http: 200
== DPR 2 / (1440 900)
 1x hero-b__media render=1425 pintado=1515 variante=1376w necesaria=1376 OK avif=true
 2x svc-card__media render=590 pintado=590 variante=1200w necesaria=1180 OK avif=true
 1x svc-card__media render=590 pintado=785 variante=1376w necesaria=1376 OK avif=true
 3x svc-card__media render=185 pintado=399 variante=800w necesaria=798 OK avif=true
 2x ind-card__media render=289 pintado=663 variante=1376w necesaria=1326 OK avif=true
 4x ind-card__media render=289 pintado=319 variante=1376w necesaria=638 OK avif=true
 1x ind-card__media render=287 pintado=317 variante=1376w necesaria=634 OK avif=true
 1x ind-card__media render=284 pintado=652 variante=1376w necesaria=1304 OK avif=true
 1x ind-card__media render=287 pintado=658 variante=1376w necesaria=1316 OK avif=true
 1x ind-card__media render=284 pintado=313 variante=1376w necesaria=626 OK avif=true
 1x ind-card__media render=279 pintado=308 variante=1376w necesaria=616 OK avif=true
 1x ind-card__media render=286 pintado=316 variante=1376w necesaria=632 OK avif=true
== DPR 2 / (390 844)
 1x hero-b__media render=390 pintado=1948 variante=1280w necesaria=1376 BAJO avif=true
 6x svc-card__media render=348 pintado=426 variante=800w necesaria=852 BAJO avif=true
 2x ind-card__media render=167 pintado=663 variante=1376w necesaria=1326 OK avif=true
 1x ind-card__media render=166 pintado=319 variante=450w necesaria=638 BAJO avif=true
 1x ind-card__media render=167 pintado=321 variante=450w necesaria=642 BAJO avif=true
 1x ind-card__media render=165 pintado=318 variante=450w necesaria=636 BAJO avif=true
 1x ind-card__media render=164 pintado=650 variante=1376w necesaria=1300 OK avif=true
 1x ind-card__media render=167 pintado=662 variante=1376w necesaria=1324 OK avif=true
 1x ind-card__media render=167 pintado=320 variante=450w necesaria=640 BAJO avif=true
 1x ind-card__media render=166 pintado=322 variante=450w necesaria=644 BAJO avif=true
 1x ind-card__media render=165 pintado=319 variante=450w necesaria=638 BAJO avif=true
 1x ind-card__media render=166 pintado=320 variante=450w necesaria=640 BAJO avif=true
 1x ind-card__media render=165 pintado=316 variante=450w necesaria=632 BAJO avif=true
== DPR 2 /servicios/ (1440 900)
 1x svc-card__media render=590 pintado=785 variante=1376w necesaria=1376 OK avif=true
 3x svc-card__media render=590 pintado=590 variante=1200w necesaria=1180 OK avif=true
 3x svc-card__media render=185 pintado=399 variante=800w necesaria=798 OK avif=true
 2x svc-card__media render=185 pintado=358 variante=800w necesaria=716 OK avif=true
 2x svc-card__media render=286 pintado=355 variante=800w necesaria=710 OK avif=true
 6x svc-detail__media render=620 pintado=889 variante=1376w necesaria=1376 OK avif=true
== DPR 2 /servicios/ (390 844)
11x svc-card__media render=348 pintado=426 variante=800w necesaria=852 BAJO avif=true
 6x svc-detail__media render=350 pintado=503 variante=1376w necesaria=1006 OK avif=true
== DPR 2 /industrias/ (1440 900)
11x ind-directory__slide render=638 pintado=1610 variante=1376w necesaria=1376 OK avif=true
```
<!-- evidencia:fin apply-evidence.31 -->

`apply-evidence.31` cubre inicio y `/servicios` (la salida se corta en 40 líneas; `apply-evidence.32` registra aparte industrias, nosotros y la captura). En el inicio a 390×844 DPR 2, las cuatro `ind-card` de mayor ancho pintado (las altas) reciben ahora la variante de 1376w y quedan `OK`; las ocho cards de 1 fila mantienen 450w, igual que antes del redespacho (verify no las levanta como hallazgo). Las cards de servicios en móvil y el hero quedan como los dejó la iteración anterior; el hero no está en el alcance. En escritorio todas las cards quedan `OK`.


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.32","forma":"archivo","argv":null,"texto":"# Nitidez a DPR 2 (industrias y nosotros) y captura móvil del bento de industrias del inicio, en Chrome headless (CDP) contra astro preview del build\nT=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-8pbw25bs\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nnpx astro preview --port 4343 --host 127.0.0.1 \u003e $T/b/sharp2-preview.log 2\u003e&1 &\nPV=$!\ncd $T/b\n\"$CHROME_PATH\" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9463 --user-data-dir=$T/b/sharp2-profile about:blank \u003e $T/b/sharp2-chrome.log 2\u003e&1 &\nCH=$!\nsleep 6\necho \"preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4343/)\"\nfor pg in industrias/ nosotros/; do for vp in '1440 900' '390 844'; do echo \"== DPR 2 /$pg ($vp)\"; node $T/cdp.mjs 9463 http://127.0.0.1:4343/$pg $vp 2 sharp; done; done\necho \"== captura móvil 390x844 DPR 2 del bento de industrias\"; node $T/cdp.mjs 9463 http://127.0.0.1:4343/ 390 844 2 shot:$T/b/industrias-movil-dpr2.png\nkill $CH 2\u003e/dev/null; pkill -P $PV 2\u003e/dev/null; kill $PV 2\u003e/dev/null; wait 2\u003e/dev/null; echo \"servidores detenidos\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T01:11:43-03:00","exit":0,"sha256":"3d19db5b0d89d11773af5cd5494c6443b733b88916856c21fd08f4306d0e000a","lineas":14,"omitidas":0,"no_recomprobable":"requiere Chrome headless y astro preview levantados durante la fase"} -->
**Evidencia `apply-evidence.32`** · exit 0 · 14 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T01:11:43-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere Chrome headless y astro preview levantados durante la fase

```bash
# Nitidez a DPR 2 (industrias y nosotros) y captura móvil del bento de industrias del inicio, en Chrome headless (CDP) contra astro preview del build
T=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-8pbw25bs
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
npx astro preview --port 4343 --host 127.0.0.1 > $T/b/sharp2-preview.log 2>&1 &
PV=$!
cd $T/b
"$CHROME_PATH" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9463 --user-data-dir=$T/b/sharp2-profile about:blank > $T/b/sharp2-chrome.log 2>&1 &
CH=$!
sleep 6
echo "preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4343/)"
for pg in industrias/ nosotros/; do for vp in '1440 900' '390 844'; do echo "== DPR 2 /$pg ($vp)"; node $T/cdp.mjs 9463 http://127.0.0.1:4343/$pg $vp 2 sharp; done; done
echo "== captura móvil 390x844 DPR 2 del bento de industrias"; node $T/cdp.mjs 9463 http://127.0.0.1:4343/ 390 844 2 shot:$T/b/industrias-movil-dpr2.png
kill $CH 2>/dev/null; pkill -P $PV 2>/dev/null; kill $PV 2>/dev/null; wait 2>/dev/null; echo "servidores detenidos"
```

```text
preview http: 200
== DPR 2 /industrias/ (1440 900)
11x ind-directory__slide render=638 pintado=1610 variante=1376w necesaria=1376 OK avif=true
 1x ind-directory__slide.is-active render=601 pintado=1519 variante=1376w necesaria=1376 OK avif=true
== DPR 2 /industrias/ (390 844)
11x ind-directory__slide render=369 pintado=794 variante=1376w necesaria=1376 OK avif=true
 1x ind-directory__slide.is-active render=348 pintado=749 variante=1376w necesaria=1376 OK avif=true
== DPR 2 /nosotros/ (1440 900)
 4x howwork-card__media render=283 pintado=380 variante=800w necesaria=760 OK avif=true
== DPR 2 /nosotros/ (390 844)
 4x howwork-card__media render=348 pintado=467 variante=1376w necesaria=934 OK avif=true
== captura móvil 390x844 DPR 2 del bento de industrias
captura /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-apply-8pbw25bs/b/industrias-movil-dpr2.png
servidores detenidos
```
<!-- evidencia:fin apply-evidence.32 -->

Según `apply-evidence.32`, `/industrias` y `/nosotros` quedan `OK` a DPR 2 en escritorio y en móvil. La captura `industrias-movil-dpr2.png` del directorio de temporales muestra Minería y Farmacéutica nítidas, al nivel de Retail y Agroindustria, y el bento con las mismas cuatro cards altas que antes (el `pintado` de ~650–663px de cuatro cards en `apply-evidence.31` lo confirma en los dos viewports).


<!-- evidencia:inicio {"v":1,"id":"apply-evidence.33","forma":"archivo","argv":null,"texto":"# Corrida completa de cierre: build (con la validación i18n del hook de build), validadores i18n, barrido de enlaces y medición del inicio\nnpm run build 2\u003e&1 | grep -E \"i18n\\]|rror|Complete!\" | sed -E 's/^[0-9:]+ //'\necho \"build exit=${PIPESTATUS[0]}\"\nnpm run -s validate-i18n 2\u003e&1 | tail -5\necho \"validate-i18n exit=${PIPESTATUS[0]}\"\nnpm run -s check-i18n-links 2\u003e&1 | tail -8\necho \"check-i18n-links exit=${PIPESTATUS[0]}\"\nnpm run -s measure:images\necho \"measure exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"3cbeb00f6f28968638f8b66ffa08a856541ba552","fecha":"2026-10-03T01:12:24-03:00","exit":0,"sha256":"1a485b6105310324a9b4f1a709be4b9f2439df4621288bd3543d1369659a63c1","lineas":13,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.33`** · exit 0 · 13 líneas, 0 omitidas · HEAD `3cbeb00f6f28` · 2026-10-03T01:12:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```bash
# Corrida completa de cierre: build (con la validación i18n del hook de build), validadores i18n, barrido de enlaces y medición del inicio
npm run build 2>&1 | grep -E "i18n\]|rror|Complete!" | sed -E 's/^[0-9:]+ //'
echo "build exit=${PIPESTATUS[0]}"
npm run -s validate-i18n 2>&1 | tail -5
echo "validate-i18n exit=${PIPESTATUS[0]}"
npm run -s check-i18n-links 2>&1 | tail -8
echo "check-i18n-links exit=${PIPESTATUS[0]}"
npm run -s measure:images
echo "measure exit=$?"
```

```text
[log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
[build] Complete!
build exit=0
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
validate-i18n exit=0
[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
check-i18n-links exit=0
escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
measure exit=0
```
<!-- evidencia:fin apply-evidence.33 -->

Según `apply-evidence.33`, sobre el árbol final (commit `3cbeb00`) el build con la validación i18n, `validate-i18n` y `check-i18n-links` terminan con exit 0, y la medición del inicio queda bajo 2 MB en ambos escenarios. El margen del escenario móvil es estrecho: un cambio futuro de imágenes del inicio puede superar el presupuesto y la medición lo detecta.

### Commits y specs del redespacho

| Spec | Commits |
|---|---|
| `card-image-weight-budget` | `3cbeb00` (cards altas de industrias: `sizes` y quality) |

El hallazgo H-2 de `verify-report.md` (mención de Potrace en `README.md:36`) no es bloqueante y queda fuera de este redespacho, que corrige solo bloqueantes.

