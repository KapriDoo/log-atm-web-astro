---
verdict: PARTIAL
---

# Verify Report: debt-assets-weight

**Fecha**: 2026-10-03

Árbol verificado: worktree del cambio tras la convergencia con `main` (PR #34 incluido), build nuevo sobre ese árbol. Toda cifra y salida de comando de este informe es un bloque de evidencia registrado por `evidence_block.py`; la prosa lo cita por su id e interpreta lo que muestra.

## Resultados por Spec

### duplicate-video-removal

| Criterion | Status | Notas |
|-----------|--------|-------|
| Existe una sola copia del video institucional en los archivos públicos del sitio | ✅ | `verify-report.2` lista un único MP4 en `public/` y en `dist/client`; `verify-report.4` confirma que git rastrea solo esa copia |
| La carpeta pública de videos duplicada ya no existe | ✅ | `verify-report.3` no lista `public/video`; `verify-report.4` no rastrea nada bajo esa ruta |
| Ninguna referencia rota al video, ni en el código fuente ni en el sitio construido | ✅ | `verify-report.5` (sin coincidencias en `src/`) y `verify-report.6` (sin coincidencias en `dist/client`); `verify-report.7` muestra que la única referencia viva es `log-atm-intro.mp4` en `WhyVideoSection.astro` y en el HTML construido |
| La sección de video de la página de inicio reproduce el video institucional | ✅ | `verify-report.17` (bloque `== video inicio`): el MP4 responde HTTP 200, `readyState` 4, el tiempo avanza y `error` es nulo |

**Scenarios verificados**: 3/3

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["find","public","dist/client","-name","*.mp4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:42:48-03:00","exit":0,"sha256":"dd8308852142f1a71c3e2cd418053f709b0c8301417475b9796dff6a79175251","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 2 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:42:48-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
find public dist/client -name '*.mp4'
```

```text
public/videos/log-atm-intro.mp4
dist/client/videos/log-atm-intro.mp4
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["ls","public"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:42:49-03:00","exit":0,"sha256":"8597fdffa7d2e08490a658991a2c8db8b1c5151cbfc8f186d7001e5e6b5e2472","lineas":10,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.3`** · exit 0 · 10 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:42:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
ls public
```

```text
apple-touch-icon.png
favicon.ico
favicon.svg
logo.png
logo.svg
logo-white.svg
manifest.json
og-default.svg
robots.txt
videos
```
<!-- evidencia:fin verify-report.3 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["git","ls-files","public/video","public/videos"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:42:49-03:00","exit":0,"sha256":"6ea88ce44e7a704b12cd47511389190e4a78136e5e2a62bc9fe7abe89c4ccef8","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 1 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:42:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
git ls-files public/video public/videos
```

```text
public/videos/log-atm-intro.mp4
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["/usr/bin/grep","-rnE","hero-port|(^|[^-])intro\\.mp4|/video/","src/"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:42:49-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.5`** · exit 1 · 0 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:42:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -rnE 'hero-port|(^|[^-])intro\.mp4|/video/' src/
```

```text
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["bash","-c","/usr/bin/grep -rlE 'hero-port|/video/intro' dist/client; echo grep-exit=$?"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:42:49-03:00","exit":0,"sha256":"5554f565d36253c154ea3bc8d0d774e47b0d77c4e3b6f5076c40bfbb95ed5e6c","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.6`** · exit 0 · 1 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:42:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -rlE '"'"'hero-port|/video/intro'"'"' dist/client; echo grep-exit=$?'
```

```text
grep-exit=1
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["bash","-c","/usr/bin/grep -rn 'log-atm-intro' src dist/client --include=*.astro --include=index.html"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:42:49-03:00","exit":0,"sha256":"63eac57fc56b81c1d879bb4b56f8e7553ff075873f23bf216e67d9addae6b7c5","lineas":4,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.7`** · exit 0 · 4 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:42:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -rn '"'"'log-atm-intro'"'"' src dist/client --include=*.astro --include=index.html'
```

```text
src/components/sections/WhyVideoSection.astro:44:          <source src="/videos/log-atm-intro.mp4" type="video/mp4" />
dist/client/pt/index.html:4:</style></head> <body> <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>  <nav class="nav" id="navbar" aria-label="Navegação principal" data-astro-cid-o5wx45wj> <div class="container nav__inner" data-astro-cid-o5wx45wj> <a href="/pt/" class="nav__brand" aria-label="LOG ATM — Início" data-astro-cid-o5wx45wj> <img class="nav__brand-logo" src="/logo.png" alt="" width="38" height="38" loading="eager" fetchpriority="high" data-astro-cid-o5wx45wj> <span data-astro-cid-o5wx45wj> <span class="nav__brand-name" data-astro-cid-o5wx45wj>LOG ATM</span> <span class="nav__brand-sub" data-astro-cid-o5wx45wj>Logística sob medida</span> </span> </a> <ul class="nav__links" role="list" data-astro-cid-o5wx45wj> <li data-astro-cid-o5wx45wj> <a class="nav__link" href="/pt/servicios/" data-astro-cid-o5wx45wj>Serviços</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/pt/industrias/" data-astro-cid-o5wx45wj>Indústrias</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/pt/nosotros/" data-astro-cid-o5wx45wj>Sobre nós</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/pt/contacto/" data-astro-cid-o5wx45wj>Contato</a> </li> </ul> <div class="nav__cta-group" data-astro-cid-o5wx45wj> <div class="lang-selector lang-selector--desktop" role="navigation" aria-label="Selecionar idioma" data-astro-cid-vznm5czf><button type="button" class="lang-selector__trigger" aria-expanded="false" aria-controls="lang-menu" aria-label="Idioma atual: Português" id="lang-trigger" data-astro-cid-vznm5czf><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" data-astro-cid-vznm5czf><circle cx="12" cy="12" r="10" data-astro-cid-vznm5czf></circle><path d="M2 12h20" data-astro-cid-vznm5czf></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" data-astro-cid-vznm5czf></path></svg><span c…(+62445 caracteres)
dist/client/index.html:4:</style></head> <body> <a href="#main-content" class="skip-link">Saltar al contenido principal</a>  <nav class="nav" id="navbar" aria-label="Navegación principal" data-astro-cid-o5wx45wj> <div class="container nav__inner" data-astro-cid-o5wx45wj> <a href="/" class="nav__brand" aria-label="LOG ATM — Inicio" data-astro-cid-o5wx45wj> <img class="nav__brand-logo" src="/logo.png" alt="" width="38" height="38" loading="eager" fetchpriority="high" data-astro-cid-o5wx45wj> <span data-astro-cid-o5wx45wj> <span class="nav__brand-name" data-astro-cid-o5wx45wj>LOG ATM</span> <span class="nav__brand-sub" data-astro-cid-o5wx45wj>Logística a tu medida</span> </span> </a> <ul class="nav__links" role="list" data-astro-cid-o5wx45wj> <li data-astro-cid-o5wx45wj> <a class="nav__link" href="/servicios/" data-astro-cid-o5wx45wj>Servicios</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/industrias/" data-astro-cid-o5wx45wj>Industrias</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/nosotros/" data-astro-cid-o5wx45wj>Nosotros</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/contacto/" data-astro-cid-o5wx45wj>Contacto</a> </li> </ul> <div class="nav__cta-group" data-astro-cid-o5wx45wj> <div class="lang-selector lang-selector--desktop" role="navigation" aria-label="Seleccionar idioma" data-astro-cid-vznm5czf><button type="button" class="lang-selector__trigger" aria-expanded="false" aria-controls="lang-menu" aria-label="Idioma actual: Español" id="lang-trigger" data-astro-cid-vznm5czf><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" data-astro-cid-vznm5czf><circle cx="12" cy="12" r="10" data-astro-cid-vznm5czf></circle><path d="M2 12h20" data-astro-cid-vznm5czf></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" data-astro-cid-vznm5czf></path></svg><span class="lang-select…(+62337 caracteres)
dist/client/en/index.html:4:</style></head> <body> <a href="#main-content" class="skip-link">Skip to main content</a>  <nav class="nav" id="navbar" aria-label="Main navigation" data-astro-cid-o5wx45wj> <div class="container nav__inner" data-astro-cid-o5wx45wj> <a href="/en/" class="nav__brand" aria-label="LOG ATM — Home" data-astro-cid-o5wx45wj> <img class="nav__brand-logo" src="/logo.png" alt="" width="38" height="38" loading="eager" fetchpriority="high" data-astro-cid-o5wx45wj> <span data-astro-cid-o5wx45wj> <span class="nav__brand-name" data-astro-cid-o5wx45wj>LOG ATM</span> <span class="nav__brand-sub" data-astro-cid-o5wx45wj>Logistics tailored to you</span> </span> </a> <ul class="nav__links" role="list" data-astro-cid-o5wx45wj> <li data-astro-cid-o5wx45wj> <a class="nav__link" href="/en/servicios/" data-astro-cid-o5wx45wj>Services</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/en/industrias/" data-astro-cid-o5wx45wj>Industries</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/en/nosotros/" data-astro-cid-o5wx45wj>About</a> </li><li data-astro-cid-o5wx45wj> <a class="nav__link" href="/en/contacto/" data-astro-cid-o5wx45wj>Contact</a> </li> </ul> <div class="nav__cta-group" data-astro-cid-o5wx45wj> <div class="lang-selector lang-selector--desktop" role="navigation" aria-label="Select language" data-astro-cid-vznm5czf><button type="button" class="lang-selector__trigger" aria-expanded="false" aria-controls="lang-menu" aria-label="Current language: English" id="lang-trigger" data-astro-cid-vznm5czf><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" data-astro-cid-vznm5czf><circle cx="12" cy="12" r="10" data-astro-cid-vznm5czf></circle><path d="M2 12h20" data-astro-cid-vznm5czf></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" data-astro-cid-vznm5czf></path></svg><span class="lang-selec…(+62309 caracteres)
```
<!-- evidencia:fin verify-report.7 -->


### logo-vectorization-residue-removal

| Criterion | Status | Notas |
|-----------|--------|-------|
| Una búsqueda de la ubicación eliminada del logo en scripts, documentación y README no encuentra resultados | ✅ | `verify-report.8`: `grep` sin coincidencias de `src/assets/logo.svg`, `png-to-svg` ni `potrace` (búsqueda sensible a mayúsculas) |
| La herramienta de vectorización y su dependencia ya no forman parte del proyecto | ✅ | `verify-report.8`: `scripts/` no contiene `png-to-svg.mjs` y `npm ls potrace` responde vacío; `verify-report.16` muestra que `package.json` solo pierde `potrace` y gana el script `measure:images`, y que `npm ci --dry-run` termina con exit 0 |
| La documentación y el README señalan el logo vectorial vigente como fuente | ✅ | `verify-report.8`: `README.md:85` y `docs/project-brief.md:21` y `:63` apuntan a `public/logo.svg`. Ver hallazgo H-2 sobre una mención residual de Potrace en `README.md:36` |
| La generación de favicons y el build funcionan sin errores | ✅ | `verify-report.9` (favicons sobre copia aislada del árbol, exit 0, `favicon.ico` y `apple-touch-icon.png` idénticos a los versionados) y `verify-report.1` (build con exit 0); `verify-report.8` muestra `public/logo.svg` y `generate-favicons.mjs` sin diff contra la base |

**Scenarios verificados**: 3/3

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"archivo","argv":null,"texto":"# Retiro de la herramienta de vectizacion: referencias, archivos y diff contra la base mergeada (587a8af)\necho \"--- scripts/\"; ls scripts\necho \"--- referencias obsoletas (vacio esperado)\"; /usr/bin/grep -rnE \"src/assets/logo\\.svg|png-to-svg|potrace\" scripts docs README.md package.json package-lock.json; echo \"grep-exit=$?\"\necho \"--- npm ls potrace\"; npm ls potrace 2\u003e&1 | tail -3\necho \"--- diff contra la base de logo publico y favicons (vacio esperado)\"; git diff --stat 587a8af HEAD -- public/logo.svg scripts/generate-favicons.mjs; echo \"diff-exit=$?\"\necho \"--- docs que senalan el logo vigente\"; /usr/bin/grep -rn \"public/logo.svg\" README.md docs/project-brief.md\necho \"--- git -C: archivos del repo que mencionan potrace fuera de memory\"; git -C \"$(git rev-parse --show-toplevel)\" grep -nIi \"potrace\" -- . ':!memory' ; echo \"gitgrep-exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:43:05-03:00","exit":0,"sha256":"3ac49b89cfe264c8fb2d3062f0efa3734fb66ac56464ea1a1a39bba927626b7b","lineas":21,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.8`** · exit 0 · 21 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:43:05-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Retiro de la herramienta de vectizacion: referencias, archivos y diff contra la base mergeada (587a8af)
echo "--- scripts/"; ls scripts
echo "--- referencias obsoletas (vacio esperado)"; /usr/bin/grep -rnE "src/assets/logo\.svg|png-to-svg|potrace" scripts docs README.md package.json package-lock.json; echo "grep-exit=$?"
echo "--- npm ls potrace"; npm ls potrace 2>&1 | tail -3
echo "--- diff contra la base de logo publico y favicons (vacio esperado)"; git diff --stat 587a8af HEAD -- public/logo.svg scripts/generate-favicons.mjs; echo "diff-exit=$?"
echo "--- docs que senalan el logo vigente"; /usr/bin/grep -rn "public/logo.svg" README.md docs/project-brief.md
echo "--- git -C: archivos del repo que mencionan potrace fuera de memory"; git -C "$(git rev-parse --show-toplevel)" grep -nIi "potrace" -- . ':!memory' ; echo "gitgrep-exit=$?"
```

```text
--- scripts/
axe-audit.mjs
check-i18n-links.ts
generate-favicons.mjs
measure-home-image-weight.mjs
validate-i18n.ts
--- referencias obsoletas (vacio esperado)
grep-exit=1
--- npm ls potrace
log-atm-web-astro@0.0.1 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
└── (empty)

--- diff contra la base de logo publico y favicons (vacio esperado)
diff-exit=0
--- docs que senalan el logo vigente
README.md:85:├── scripts/                 Utilidades de build (favicons desde public/logo.svg, validación i18n)
docs/project-brief.md:21:| Logo vectorial | `public/logo.svg` (fuente vigente, versionada) |
docs/project-brief.md:63:La fuente vigente del logo vectorial es `public/logo.svg`, ya generado y versionado en el repositorio. `scripts/generate-favicons.mjs` deriva de él `favicon.svg`, `favicon.ico` y `apple-touch-icon.png`.
--- git -C: archivos del repo que mencionan potrace fuera de memory
log-atm-web-astro/README.md:36:| Imágenes | Sharp (optimización), Potrace (PNG → SVG) |
gitgrep-exit=0
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"archivo","argv":null,"texto":"# Generacion de favicons sobre una copia aislada del arbol (no escribe en el repo)\nset -e\nD=$(mktemp -d \"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/fav.XXXXXXXX\")\ngit -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight archive HEAD log-atm-web-astro | tar -x -C \"$D\"\nln -s \"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/node_modules\" \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\"\nnpm run -s favicons 2\u003e&1 | tail -8\necho \"favicons exit=${PIPESTATUS[0]}\"\ncmp public/favicon.ico \"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/favicon.ico\" && echo \"favicon.ico identico al versionado\"\ncmp public/apple-touch-icon.png \"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/apple-touch-icon.png\" && echo \"apple-touch-icon identico al versionado\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:43:05-03:00","exit":0,"sha256":"21efaf265fbc7f04e1a7800b5445ee17e2850d96bea9c1b587ed1f864e94f64e","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.9`** · exit 0 · 6 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:43:05-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Generacion de favicons sobre una copia aislada del arbol (no escribe en el repo)
set -e
D=$(mktemp -d "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/fav.XXXXXXXX")
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight archive HEAD log-atm-web-astro | tar -x -C "$D"
ln -s "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/node_modules" "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro"
npm run -s favicons 2>&1 | tail -8
echo "favicons exit=${PIPESTATUS[0]}"
cmp public/favicon.ico "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/favicon.ico" && echo "favicon.ico identico al versionado"
cmp public/apple-touch-icon.png "/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/apple-touch-icon.png" && echo "apple-touch-icon identico al versionado"
```

```text
[favicons] favicon.svg generado: /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/fav.7mFkw6Ss/log-atm-web-astro/public/favicon.svg
[favicons] favicon.ico (32x32 PNG) generado: /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/fav.7mFkw6Ss/log-atm-web-astro/public/favicon.ico
[favicons] apple-touch-icon.png (180x180 PNG) generado: /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/fav.7mFkw6Ss/log-atm-web-astro/public/apple-touch-icon.png
favicons exit=0
favicon.ico identico al versionado
apple-touch-icon identico al versionado
```
<!-- evidencia:fin verify-report.9 -->


### services-static-card-no-hover-zoom

| Criterion | Status | Notas |
|-----------|--------|-------|
| Al pasar el cursor sobre una tarjeta de servicio no enlazada, su imagen no se amplía | ✅ | `verify-report.10` muestra el selector acotado a `:not(.svc-card--static)`; `verify-report.17` mide en Chrome el `transform` de cada card: todas las `div` estáticas del inicio y de `/servicios` permanecen en `none` al hover, incluidas Carga Aérea y Carga Marítima |
| Al pasar el cursor sobre una tarjeta de servicio enlazada del inicio, su imagen se amplía | ✅ | `verify-report.17`: las cuatro tarjetas `a` del inicio y la tarjeta `a` de `/servicios` pasan a `matrix(1.04, …)` |

**Scenarios verificados**: 2/2. La clase `svc-card--static` y su uso vienen de la convergencia con el PR #34 (`verify-report.10`).

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"archivo","argv":null,"texto":"# Zoom en hover: selectores de la imagen de card en services.css y diff contra la base mergeada\n/usr/bin/grep -n \"svc-card.*__media img\\|svc-card--static\" src/styles/sections/services.css\necho \"--- servicios.astro: la card no enlazada recibe svc-card--static\"; /usr/bin/grep -n \"svc-card--static\" src/pages/servicios.astro src/components/sections/ServicesSection.astro\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:43:41-03:00","exit":0,"sha256":"1ccce356dbd3ee2b6a8f12ff4de681ae6779b2cc84e3451efd810e5ec788a3c5","lineas":8,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.10`** · exit 0 · 8 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:43:41-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Zoom en hover: selectores de la imagen de card en services.css y diff contra la base mergeada
/usr/bin/grep -n "svc-card.*__media img\|svc-card--static" src/styles/sections/services.css
echo "--- servicios.astro: la card no enlazada recibe svc-card--static"; /usr/bin/grep -n "svc-card--static" src/pages/servicios.astro src/components/sections/ServicesSection.astro
```

```text
35:.svc-card--static { cursor: default; }
36:.svc-card--static:hover { transform: none; box-shadow: none; }
63:.svc-card__media img {
70:.svc-card:not(.svc-card--static):hover .svc-card__media img { transform: scale(1.04); }
174:  .svc-card:not(.svc-card--static):hover .svc-card__media img { transform: none; }
--- servicios.astro: la card no enlazada recibe svc-card--static
src/pages/servicios.astro:88:                class:list={['svc-card', `svc-card--${s.size}`, { 'svc-card--static': !isLink }]}
src/components/sections/ServicesSection.astro:53:            class:list={['svc-card', `svc-card--${s.size}`, { 'svc-card--static': !isLink }]}
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"archivo","argv":null,"texto":"# Hover y video en Chrome headless (CDP) contra astro preview del build: transform de la imagen de cada card y reproduccion del video\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\nnpx astro preview --port 4331 --host 127.0.0.1 \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/hover-preview.log 2\u003e&1 &\nPV=$!\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b\n\"$CHROME_PATH\" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9444 --user-data-dir=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/hover-profile about:blank \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/hover-chrome.log 2\u003e&1 &\nCH=$!\nsleep 6\necho \"preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4331/)\"\necho '== hover inicio (1440x900)'; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9444 http://127.0.0.1:4331/ 1440 900 1 hover\necho '== hover /servicios/ (1440x900)'; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9444 http://127.0.0.1:4331/servicios/ 1440 900 1 hover\necho '== video inicio'; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9444 http://127.0.0.1:4331/ 1440 900 1 video\nkill $CH $PV 2\u003e/dev/null; wait 2\u003e/dev/null; echo \"servidores detenidos\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:54:06-03:00","exit":0,"sha256":"bc71f14b8e5b29755b60407c6af1952fb3bc5b0d91814db0bc2fbdb38fdcfee9","lineas":23,"omitidas":0,"no_recomprobable":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"} -->
**Evidencia `verify-report.17`** · exit 0 · 23 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:54:06-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta

```bash
# Hover y video en Chrome headless (CDP) contra astro preview del build: transform de la imagen de cada card y reproduccion del video
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
npx astro preview --port 4331 --host 127.0.0.1 > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/hover-preview.log 2>&1 &
PV=$!
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b
"$CHROME_PATH" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9444 --user-data-dir=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/hover-profile about:blank > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/hover-chrome.log 2>&1 &
CH=$!
sleep 6
echo "preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4331/)"
echo '== hover inicio (1440x900)'; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9444 http://127.0.0.1:4331/ 1440 900 1 hover
echo '== hover /servicios/ (1440x900)'; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9444 http://127.0.0.1:4331/servicios/ 1440 900 1 hover
echo '== video inicio'; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9444 http://127.0.0.1:4331/ 1440 900 1 video
kill $CH $PV 2>/dev/null; wait 2>/dev/null; echo "servidores detenidos"
```

```text
preview http: 200
== hover inicio (1440x900)
div static=true href=null "Carga Marítima" transform: reposo=none hover=none
div static=true href=null "Carga Aérea" transform: reposo=none hover=none
a static=false href=/servicios/ "Aduana y Documentación" transform: reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
a static=false href=/servicios/ "Almacenaje" transform: reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
a static=false href=/cotizar/ "Consultoría Logística" transform: reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
a static=false href=/servicios/ "Courier Internacional" transform: reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
== hover /servicios/ (1440x900)
div static=true href=null "Carga Aérea" transform: reposo=none hover=none
div static=true href=null "Carga Marítima" transform: reposo=none hover=none
div static=true href=null "Aduana y Documentación" transform: reposo=none hover=none
div static=true href=null "Almacenaje" transform: reposo=none hover=none
a static=false href=/cotizar/ "Consultoría Logística" transform: reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
div static=true href=null "Courier Internacional" transform: reposo=none hover=none
div static=true href=null "Seguros de Carga" transform: reposo=none hover=none
div static=true href=null "Desconsolidado" transform: reposo=none hover=none
div static=true href=null "Casillero USA" transform: reposo=none hover=none
div static=true href=null "Compras Internacionales" transform: reposo=none hover=none
div static=true href=null "Ruta Medio Oriente" transform: reposo=none hover=none
== video inicio
{"src":"/videos/log-atm-intro.mp4","http":200,"len":"3756542","readyState":4,"currentTime":2.81,"paused":false,"error":null}
servidores detenidos
```
<!-- evidencia:fin verify-report.17 -->


### card-image-weight-budget

| Criterion | Status | Notas |
|-----------|--------|-------|
| Peso AVIF del inicio < 2 MB en escritorio 1440×900 DPR 1 | ✅ | `verify-report.1` (medición del script sobre el build nuevo): el escenario de escritorio informa `OK < 2 MB` |
| Peso AVIF del inicio < 2 MB en móvil 390×844 DPR 3 | ✅ | `verify-report.1`: el escenario móvil informa `OK < 2 MB`; el total de la medición incluye además las imágenes no AVIF, de modo que la parte AVIF queda por debajo del total informado |
| Medición reproducible sobre el build | ✅ | `verify-report.15`: dos ejecuciones consecutivas con exit 0 y salida idéntica |
| Las tarjetas se ven sin pérdida visible de nitidez a DPR 2, en escritorio y en móvil | ❌ | Escritorio cumple (`verify-report.18` y `verify-report.19`: todas las cards con variante ≥ ancho pintado × 2). Móvil: ver hallazgo H-1; las cuatro cards altas de industrias del inicio reciben una variante muy inferior al ancho que pintan y se ven blandas en una captura DPR 2 |
| Todas las tarjetas con imagen declaran variantes de ancho y tamaño de render | ✅ | `verify-report.11` (fuente) y `verify-report.14` (HTML construido en es, en y pt: ninguna card sin `sizes` ni con un solo candidato) |
| La imagen principal del inicio conserva su prioridad de carga y su peso | ✅ | `verify-report.11`: `HeroSection.astro` sin diff contra la base y `<Picture>` con `priority`; los anchos del hero no cambian |

**Scenarios verificados**: 5/6 (el escenario «Pantalla de densidad 2 mantiene la nitidez» no se cumple en móvil).

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"archivo","argv":null,"texto":"# Cada <Picture\u003e de card declara widths y sizes; el hero no cambia respecto de la base mergeada (587a8af)\n/usr/bin/grep -nE \"<Picture|widths=|sizes=\" src/components/sections/IndustriesSection.astro src/components/sections/ServicesSection.astro src/pages/servicios.astro src/pages/nosotros.astro src/pages/industrias.astro\necho \"--- hero: diff contra la base (vacio esperado)\"; git diff --stat 587a8af HEAD -- src/components/sections/HeroSection.astro; echo \"diff-exit=$?\"\necho \"--- hero: Picture con priority\"; /usr/bin/grep -n -A6 \"<Picture\" src/components/sections/HeroSection.astro\necho \"--- peso del hero (AVIF servidos)\"; ls -l dist/client/_astro | /usr/bin/grep -i \"hero\" | head\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:43:41-03:00","exit":0,"sha256":"3e0aa52dc8a9dd526b6445e9965f17ca79e454a81bfd23d69cad41669d0bc897","lineas":30,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.11`** · exit 0 · 30 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:43:41-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Cada <Picture> de card declara widths y sizes; el hero no cambia respecto de la base mergeada (587a8af)
/usr/bin/grep -nE "<Picture|widths=|sizes=" src/components/sections/IndustriesSection.astro src/components/sections/ServicesSection.astro src/pages/servicios.astro src/pages/nosotros.astro src/pages/industrias.astro
echo "--- hero: diff contra la base (vacio esperado)"; git diff --stat 587a8af HEAD -- src/components/sections/HeroSection.astro; echo "diff-exit=$?"
echo "--- hero: Picture con priority"; /usr/bin/grep -n -A6 "<Picture" src/components/sections/HeroSection.astro
echo "--- peso del hero (AVIF servidos)"; ls -l dist/client/_astro | /usr/bin/grep -i "hero" | head
```

```text
src/components/sections/IndustriesSection.astro:45:            <Picture
src/components/sections/IndustriesSection.astro:50:              widths={[300, 450, 600, 700, 1376]}
src/components/sections/IndustriesSection.astro:51:              sizes="(max-width: 640px) 45vw, 665px"
src/components/sections/ServicesSection.astro:59:              <Picture
src/components/sections/ServicesSection.astro:64:                widths={SERVICE_CARD_IMAGE_WIDTHS}
src/components/sections/ServicesSection.astro:65:                sizes={SERVICE_CARD_IMAGE_SIZES[s.size]}
src/pages/servicios.astro:92:                  <Picture
src/pages/servicios.astro:97:                    widths={SERVICE_CARD_IMAGE_WIDTHS}
src/pages/servicios.astro:98:                    sizes={SERVICE_CARD_IMAGE_SIZES[s.size]}
src/pages/servicios.astro:130:              <Picture
src/pages/servicios.astro:135:                widths={[640, 960, 1376]}
src/pages/servicios.astro:136:                sizes="(max-width: 900px) 129vw, (max-width: 1280px) 69vw, 890px"
src/pages/nosotros.astro:108:                <Picture
src/pages/nosotros.astro:113:                  widths={[400, 800, 1376]}
src/pages/nosotros.astro:114:                  sizes="(max-width: 600px) 121vw, (max-width: 1000px) 60vw, (max-width: 1280px) 30vw, 385px"
src/pages/industrias.astro:82:                <Picture
src/pages/industrias.astro:87:                  widths={[920, 1376]}
src/pages/industrias.astro:88:                  sizes="(max-width: 960px) 920px, 1376px"
--- hero: diff contra la base (vacio esperado)
diff-exit=0
--- hero: Picture con priority
21:    <Picture
22-      src={heroImg}
23-      formats={['avif', 'webp']}
24-      fallbackFormat="jpeg"
25-      priority
26-      alt=""
27-      widths={[768, 1280, 1920, heroImg.width]}
--- peso del hero (AVIF servidos)
-rw-r--r-- 1 kapridoo kapridoo     853 oct  3 00:42 HeroSection.astro_astro_type_script_index_0_lang.BXl3qoaX.js
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"archivo","argv":null,"texto":"# Por pagina construida (es, en, pt): cada picture con su fuente AVIF, candidatos y presencia de sizes\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/pics.mjs\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:43:51-03:00","exit":0,"sha256":"a3e88581258cc7729d0ddab1d045c45d37e3ecb3e5322224a8682e4478db1f71","lineas":12,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.14`** · exit 0 · 12 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:43:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Por pagina construida (es, en, pt): cada picture con su fuente AVIF, candidatos y presencia de sizes
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/pics.mjs
```

```text
index.html: picture=19 hero=1 cards=18 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=5
servicios/index.html: picture=17 hero=0 cards=17 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=3/5
industrias/index.html: picture=12 hero=0 cards=12 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=2
nosotros/index.html: picture=4 hero=0 cards=4 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=3
en/index.html: picture=19 hero=1 cards=18 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=5
en/servicios/index.html: picture=17 hero=0 cards=17 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=3/5
en/industrias/index.html: picture=12 hero=0 cards=12 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=2
en/nosotros/index.html: picture=4 hero=0 cards=4 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=3
pt/index.html: picture=19 hero=1 cards=18 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=5
pt/servicios/index.html: picture=17 hero=0 cards=17 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=3/5
pt/industrias/index.html: picture=12 hero=0 cards=12 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=2
pt/nosotros/index.html: picture=4 hero=0 cards=4 cards-sin-sizes-o-con-1-candidato=0 candidatos(cards)=3
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"archivo","argv":null,"texto":"# Determinismo de la medicion: dos ejecuciones consecutivas con salida identica\nnpm run -s measure:images \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/m1.txt; echo \"exit1=$?\"\nnpm run -s measure:images \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/m2.txt; echo \"exit2=$?\"\ncmp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/m1.txt /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/m2.txt && echo \"salidas identicas\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:43:52-03:00","exit":0,"sha256":"5c08b1f7ecce6bfd659d08785c23c5ebbcfa691125e83556360f6b69823e16a4","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.15`** · exit 0 · 3 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:43:52-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Determinismo de la medicion: dos ejecuciones consecutivas con salida identica
npm run -s measure:images > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/m1.txt; echo "exit1=$?"
npm run -s measure:images > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/m2.txt; echo "exit2=$?"
cmp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/m1.txt /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/m2.txt && echo "salidas identicas"
```

```text
exit1=0
exit2=0
salidas identicas
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.18","forma":"archivo","argv":null,"texto":"# Nitidez a DPR 2 (inicio y servicios) en Chrome headless (CDP) contra astro preview: variante elegida frente al ancho pintado x DPR\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\nnpx astro preview --port 4334 --host 127.0.0.1 \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpa-preview.log 2\u003e&1 &\nPV=$!\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b\n\"$CHROME_PATH\" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9447 --user-data-dir=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpa-profile about:blank \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpa-chrome.log 2\u003e&1 &\nCH=$!\nsleep 6\necho \"preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4334/)\"\nfor pg in '' servicios/; do for vp in '1440 900' '390 844'; do echo \"== nitidez DPR 2 /$pg ($vp)\"; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9447 http://127.0.0.1:4334/$pg $vp 2 sharp; done; done\nkill $CH $PV 2\u003e/dev/null; wait 2\u003e/dev/null; echo \"servidores detenidos\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:55:04-03:00","exit":0,"sha256":"003b0c0b310ed2dcacddb3611f5171c27f423f6a3141134032b502d53154ce68","lineas":34,"omitidas":0,"no_recomprobable":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"} -->
**Evidencia `verify-report.18`** · exit 0 · 34 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:55:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta

```bash
# Nitidez a DPR 2 (inicio y servicios) en Chrome headless (CDP) contra astro preview: variante elegida frente al ancho pintado x DPR
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
npx astro preview --port 4334 --host 127.0.0.1 > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpa-preview.log 2>&1 &
PV=$!
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b
"$CHROME_PATH" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9447 --user-data-dir=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpa-profile about:blank > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpa-chrome.log 2>&1 &
CH=$!
sleep 6
echo "preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4334/)"
for pg in '' servicios/; do for vp in '1440 900' '390 844'; do echo "== nitidez DPR 2 /$pg ($vp)"; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9447 http://127.0.0.1:4334/$pg $vp 2 sharp; done; done
kill $CH $PV 2>/dev/null; wait 2>/dev/null; echo "servidores detenidos"
```

```text
preview http: 200
== nitidez DPR 2 / (1440 900)
imagenes=19 sin-currentSrc=0 ocultas=0
 1x hero-b__media                  render=1425 pintado=1515 variante=1376w necesaria=1376 OK
 2x svc-card.svc-card--wide        render= 590 pintado= 590 variante=1200w necesaria=1180 OK
 1x svc-card.svc-card--feature     render= 590 pintado= 785 variante=1376w necesaria=1376 OK
 3x svc-card.svc-card--std         render= 185 pintado= 399 variante= 800w necesaria= 798 OK
 4x ind-card.ind-card--photo       render= 289 pintado= 663 variante=1376w necesaria=1326 OK
 8x ind-card.ind-card--photo       render= 289 pintado= 319 variante=1376w necesaria= 638 OK
== nitidez DPR 2 / (390 844)
imagenes=19 sin-currentSrc=0 ocultas=0
 1x hero-b__media                  render= 375 pintado=1948 variante=1280w necesaria=1376 BAJO
 2x svc-card.svc-card--wide        render= 333 pintado= 426 variante= 800w necesaria= 852 BAJO
 1x svc-card.svc-card--feature     render= 333 pintado= 426 variante= 800w necesaria= 852 BAJO
 3x svc-card.svc-card--std         render= 333 pintado= 426 variante= 800w necesaria= 852 BAJO
 4x ind-card.ind-card--photo       render= 160 pintado= 668 variante= 450w necesaria=1336 BAJO
 6x ind-card.ind-card--photo       render= 160 pintado= 321 variante= 450w necesaria= 642 BAJO
 2x ind-card.ind-card--photo       render= 160 pintado= 323 variante= 450w necesaria= 646 BAJO
== nitidez DPR 2 /servicios/ (1440 900)
imagenes=17 sin-currentSrc=0 ocultas=0
 1x svc-card.svc-card--feature     render= 590 pintado= 785 variante=1376w necesaria=1376 OK
 3x svc-card.svc-card--wide        render= 590 pintado= 590 variante=1200w necesaria=1180 OK
 3x svc-card.svc-card--std         render= 185 pintado= 399 variante= 800w necesaria= 798 OK
 2x svc-card.svc-card--std         render= 185 pintado= 358 variante= 800w necesaria= 716 OK
 2x svc-card.svc-card--mini        render= 286 pintado= 355 variante= 800w necesaria= 710 OK
 6x svc-detail__media              render= 620 pintado= 889 variante=1376w necesaria=1376 OK
== nitidez DPR 2 /servicios/ (390 844)
imagenes=17 sin-currentSrc=0 ocultas=0
 1x svc-card.svc-card--feature     render= 333 pintado= 426 variante= 800w necesaria= 852 BAJO
 3x svc-card.svc-card--wide        render= 333 pintado= 426 variante= 800w necesaria= 852 BAJO
 5x svc-card.svc-card--std         render= 333 pintado= 426 variante= 800w necesaria= 852 BAJO
 2x svc-card.svc-card--mini        render= 333 pintado= 426 variante= 800w necesaria= 852 BAJO
 6x svc-detail__media              render= 335 pintado= 481 variante=1376w necesaria= 962 OK
servidores detenidos
```
<!-- evidencia:fin verify-report.18 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.19","forma":"archivo","argv":null,"texto":"# Nitidez a DPR 2 (industrias y nosotros) en Chrome headless (CDP) contra astro preview: variante elegida frente al ancho pintado x DPR\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\nnpx astro preview --port 4335 --host 127.0.0.1 \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpb-preview.log 2\u003e&1 &\nPV=$!\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b\n\"$CHROME_PATH\" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9448 --user-data-dir=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpb-profile about:blank \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpb-chrome.log 2\u003e&1 &\nCH=$!\nsleep 6\necho \"preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4335/)\"\nfor pg in industrias/ nosotros/; do for vp in '1440 900' '390 844'; do echo \"== nitidez DPR 2 /$pg ($vp)\"; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9448 http://127.0.0.1:4335/$pg $vp 2 sharp; done; done\nkill $CH $PV 2\u003e/dev/null; wait 2\u003e/dev/null; echo \"servidores detenidos\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:55:51-03:00","exit":0,"sha256":"d71f397de977c63624dc7b46da5eeeafbf6a817d0e2852499164a0a3d5591eb2","lineas":17,"omitidas":0,"no_recomprobable":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"} -->
**Evidencia `verify-report.19`** · exit 0 · 17 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:55:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta

```bash
# Nitidez a DPR 2 (industrias y nosotros) en Chrome headless (CDP) contra astro preview: variante elegida frente al ancho pintado x DPR
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
npx astro preview --port 4335 --host 127.0.0.1 > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpb-preview.log 2>&1 &
PV=$!
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b
"$CHROME_PATH" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9448 --user-data-dir=/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpb-profile about:blank > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/b/sharpb-chrome.log 2>&1 &
CH=$!
sleep 6
echo "preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4335/)"
for pg in industrias/ nosotros/; do for vp in '1440 900' '390 844'; do echo "== nitidez DPR 2 /$pg ($vp)"; node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-ub_lrepy/s/cdp.mjs 9448 http://127.0.0.1:4335/$pg $vp 2 sharp; done; done
kill $CH $PV 2>/dev/null; wait 2>/dev/null; echo "servidores detenidos"
```

```text
preview http: 200
== nitidez DPR 2 /industrias/ (1440 900)
imagenes=12 sin-currentSrc=0 ocultas=0
11x ind-directory__slide           render= 638 pintado=1610 variante=1376w necesaria=1376 OK
 1x ind-directory__slide.is-active render= 601 pintado=1519 variante=1376w necesaria=1376 OK
== nitidez DPR 2 /industrias/ (390 844)
imagenes=12 sin-currentSrc=0 ocultas=0
10x ind-directory__slide           render= 353 pintado= 794 variante=1376w necesaria=1376 OK
 1x ind-directory__slide           render= 334 pintado= 751 variante=1376w necesaria=1376 OK
 1x ind-directory__slide.is-active render= 340 pintado= 764 variante=1376w necesaria=1376 OK
== nitidez DPR 2 /nosotros/ (1440 900)
imagenes=4 sin-currentSrc=0 ocultas=0
 4x howwork-card                   render= 283 pintado= 380 variante= 800w necesaria= 760 OK
== nitidez DPR 2 /nosotros/ (390 844)
imagenes=4 sin-currentSrc=0 ocultas=0
 4x howwork-card                   render= 333 pintado= 447 variante=1376w necesaria= 894 OK
servidores detenidos
```
<!-- evidencia:fin verify-report.19 -->


`verify-report.13` (registro fallido: un script de Node en forma de archivo, que el registrador ejecuta con `bash`) no figura en este informe; lo reemplaza `verify-report.14`, que ejecuta el mismo script correctamente.

### observations-debt-log-sync

| Criterion | Status | Notas |
|-----------|--------|-------|
| Candidatos de industrias y logo duplicado figuran como resueltos con el commit | ✅ | `verify-report.12`: dos líneas `**Estado**` que citan `e6ade3a` |
| La ruta errónea del logo eliminado queda corregida | ✅ | `verify-report.12`: línea de corrección que indica `src/assets/logo.svg` como ruta eliminada |
| El candidato de videos duplicados figura como cerrado por este cambio | ✅ | `verify-report.12`: línea `**Estado**` «cerrado por `debt-assets-weight`» |
| El contenido original se conserva y solo se agrega el estado | ✅ | `verify-report.12`: el commit de la spec no tiene líneas borradas en `memory/observations.md` (columna de eliminaciones en cero) |

**Scenarios verificados**: 4/4

<!-- evidencia:inicio {"v":1,"id":"verify-report.12","forma":"archivo","argv":null,"texto":"# observations.md: el commit de la spec solo agrega lineas; estados y correccion de ruta\nR=$(git rev-parse --show-toplevel)\ngit -C \"$R\" show --numstat --format=%s b38d775 -- memory/observations.md\ngit -C \"$R\" show --format= -U0 b38d775 -- memory/observations.md | /usr/bin/grep -E \"^[+-][^+-]\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:43:42-03:00","exit":0,"sha256":"498a93654579e937d695f7c5559e4a5d12ab65f7a99b8af16b37f11ededeb262","lineas":7,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.12`** · exit 0 · 7 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:43:42-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# observations.md: el commit de la spec solo agrega lineas; estados y correccion de ruta
R=$(git rev-parse --show-toplevel)
git -C "$R" show --numstat --format=%s b38d775 -- memory/observations.md
git -C "$R" show --format= -U0 b38d775 -- memory/observations.md | /usr/bin/grep -E "^[+-][^+-]"
```

```text
docs(sdd): sync observations debt log with asset cleanup state

4	0	memory/observations.md
+**Estado**: resuelto por `e6ade3a` (borró los 14 jpg de `src/assets/industries/` y `src/lib/industryImages.ts`).
+**Estado**: resuelto por `e6ade3a` (borró `src/assets/logo.svg`); `debt-assets-weight` retiró además `scripts/png-to-svg.mjs` y la dependencia `potrace`.
+**Estado**: cerrado por `debt-assets-weight`: se confirmaron 3 MP4 con el mismo md5 (`public/video/intro.mp4`, `public/videos/hero-port.mp4`, `public/videos/log-atm-intro.mp4`) y se dejó solo `public/videos/log-atm-intro.mp4`.
+  - **Corrección (`debt-assets-weight`)**: el historial git muestra que `e6ade3a` eliminó `src/assets/logo.svg`; `src/assets/industries/logo.svg` no existía en el árbol previo a ese commit.
```
<!-- evidencia:fin verify-report.12 -->


### Tests

El proyecto no declara un runner de tests ni una lista versionada de suites; la corrida completa de esta fase es la verificación que el perfil declara: build de producción (con la validación de paridad i18n del hook de build), `validate-i18n`, `check-i18n-links` (barrido de enlaces del PR #34 sobre el build) y la medición de peso del inicio.

`verify-report.1` es esa corrida completa sobre el árbol final: build, validadores i18n y barrido de enlaces con exit 0, y medición con exit 0 en los dos escenarios. `verify-report.16` muestra que el lockfile es coherente con `package.json` tras retirar `potrace`. `verify-report.17` a `verify-report.19` son las verificaciones en navegador (Chrome headless contra `astro preview` del build nuevo; servidores detenidos al terminar).

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"archivo","argv":null,"texto":"# Corrida completa de verify: build, validadores i18n y medicion de peso del inicio\nnpm run build 2\u003e&1 | grep -E \"i18n|rror|Complete!\" | sed -E 's/^[0-9:]+ //'\necho \"build exit=${PIPESTATUS[0]}\"\nnpm run -s validate-i18n 2\u003e&1 | tail -5\necho \"validate-i18n exit=${PIPESTATUS[0]}\"\nnpm run -s check-i18n-links 2\u003e&1 | tail -8\necho \"check-i18n-links exit=${PIPESTATUS[0]}\"\nnpm run -s measure:images\necho \"measure exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:42:39-03:00","exit":0,"sha256":"9901b610474f7adfb5fa8f730c95c717bdb9833d546b76549ed9e238a39f4979","lineas":13,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.1`** · exit 0 · 13 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:42:39-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```bash
# Corrida completa de verify: build, validadores i18n y medicion de peso del inicio
npm run build 2>&1 | grep -E "i18n|rror|Complete!" | sed -E 's/^[0-9:]+ //'
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
escritorio 1440x900 DPR 1: total 1429163 bytes (1.363 MB) | avif 1253282 bytes (1.195 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 1933313 bytes (1.844 MB) | avif 1757432 bytes (1.676 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
measure exit=0
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"archivo","argv":null,"texto":"# Consistencia package.json y lockfile tras retirar potrace (simulacion, no escribe)\nnpm ci --dry-run 2\u003e&1 | tail -3; echo \"ci-dry-run exit=${PIPESTATUS[0]}\"\ngit diff --stat 587a8af HEAD -- package.json\ngit diff 587a8af HEAD -- package.json | /usr/bin/grep -E \"^[+-] \"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:43:53-03:00","exit":0,"sha256":"66cd6519bbf5680b64d619cb58c221516aa73129f0c60cd7f8cf1d264001dd9b","lineas":10,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.16`** · exit 0 · 10 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:43:53-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Consistencia package.json y lockfile tras retirar potrace (simulacion, no escribe)
npm ci --dry-run 2>&1 | tail -3; echo "ci-dry-run exit=${PIPESTATUS[0]}"
git diff --stat 587a8af HEAD -- package.json
git diff 587a8af HEAD -- package.json | /usr/bin/grep -E "^[+-] "
```

```text

152 packages are looking for funding
  run `npm fund` for details
ci-dry-run exit=0
 log-atm-web-astro/package.json | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
-    "favicons": "node scripts/generate-favicons.mjs"
+    "favicons": "node scripts/generate-favicons.mjs",
+    "measure:images": "node scripts/measure-home-image-weight.mjs"
-    "potrace": "^2.1.8",
```
<!-- evidencia:fin verify-report.16 -->


**Cobertura**: no hay instrumento de cobertura en el proyecto.

## Hallazgos de Seguridad (si aplica)

Sin hallazgos de seguridad: el dominio es `debt` y la fase no ejecuta el análisis de seguridad. El cambio solo elimina un script y una dependencia (`potrace`), borra assets duplicados y agrega atributos de imagen y un script de medición de solo lectura.

## Coherencia de Grafo de Specs

`verify-report.23` lista `depends_on`, `affects` y `adrs` de las cinco specs. La única `depends_on` es la de `card-image-weight-budget` hacia `image-multiformat-delivery`; esa spec existe, de modo que no hay spec requerida ausente.

| Slug | Campo | Descripción |
|------|-------|-------------|
| `image-multiformat-delivery` | `affects` | WARN: `card-image-weight-budget` declara `depends_on: [[image-multiformat-delivery]]` y la spec requerida no la incluye en `affects` ni en `related` (la búsqueda del bloque devuelve vacío). Debería declarar `affects: [[card-image-weight-budget]]` |
| `0001-image-optimization-astro-assets` | `spec_refs` | WARN: ADR declarado en `adrs[]` de `card-image-weight-budget` que no declara `spec_refs` con esa spec (el campo no existe en su frontmatter) |
| `0006-picture-multiformat-content-images` | `spec_refs` | WARN: ídem |

<!-- evidencia:inicio {"v":1,"id":"verify-report.23","forma":"archivo","argv":null,"texto":"# Coherencia del grafo: depends_on, affects y adrs de las cinco specs del cambio\nM=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory\ncd $M\necho \"--- depends_on / affects / adrs de las specs del cambio\"\nfor s in card-image-weight-budget duplicate-video-removal logo-vectorization-residue-removal observations-debt-log-sync services-static-card-no-hover-zoom; do f=$(ls specs/*/$s.md); echo \"$s: $(/usr/bin/grep -E '^(depends_on|affects): ' $f | tr '\\n' ' ')\"; done\necho \"--- spec requerida existe\"; ls specs/image-optimization-pipeline/image-multiformat-delivery.md\necho \"--- la spec requerida declara a card-image-weight-budget en affects o related (vacio = no)\"; /usr/bin/grep -n \"card-image-weight-budget\" specs/image-optimization-pipeline/image-multiformat-delivery.md\necho \"--- ADRs declarados existen\"; ls adrs/0001-image-optimization-astro-assets.md adrs/0006-picture-multiformat-content-images.md\necho \"--- los ADRs declaran spec_refs con la spec (vacio = no)\"; /usr/bin/grep -n \"spec_refs\" adrs/0001-image-optimization-astro-assets.md adrs/0006-picture-multiformat-content-images.md\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:57:46-03:00","exit":1,"sha256":"57597541347416f0a96693ebcc28e03c6d212f482cd73b2c2a77f92522533f3a","lineas":13,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.23`** · exit 1 · 13 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:57:46-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory`

```bash
# Coherencia del grafo: depends_on, affects y adrs de las cinco specs del cambio
M=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory
cd $M
echo "--- depends_on / affects / adrs de las specs del cambio"
for s in card-image-weight-budget duplicate-video-removal logo-vectorization-residue-removal observations-debt-log-sync services-static-card-no-hover-zoom; do f=$(ls specs/*/$s.md); echo "$s: $(/usr/bin/grep -E '^(depends_on|affects): ' $f | tr '\n' ' ')"; done
echo "--- spec requerida existe"; ls specs/image-optimization-pipeline/image-multiformat-delivery.md
echo "--- la spec requerida declara a card-image-weight-budget en affects o related (vacio = no)"; /usr/bin/grep -n "card-image-weight-budget" specs/image-optimization-pipeline/image-multiformat-delivery.md
echo "--- ADRs declarados existen"; ls adrs/0001-image-optimization-astro-assets.md adrs/0006-picture-multiformat-content-images.md
echo "--- los ADRs declaran spec_refs con la spec (vacio = no)"; /usr/bin/grep -n "spec_refs" adrs/0001-image-optimization-astro-assets.md adrs/0006-picture-multiformat-content-images.md
```

```text
--- depends_on / affects / adrs de las specs del cambio
card-image-weight-budget: affects: [] 
duplicate-video-removal: depends_on: [] affects: [] 
logo-vectorization-residue-removal: depends_on: [] affects: [] 
observations-debt-log-sync: depends_on: [] affects: [] 
services-static-card-no-hover-zoom: depends_on: [] affects: [] 
--- spec requerida existe
specs/image-optimization-pipeline/image-multiformat-delivery.md
--- la spec requerida declara a card-image-weight-budget en affects o related (vacio = no)
--- ADRs declarados existen
adrs/0001-image-optimization-astro-assets.md
adrs/0006-picture-multiformat-content-images.md
--- los ADRs declaran spec_refs con la spec (vacio = no)
```
<!-- evidencia:fin verify-report.23 -->



## Correcciones de Metadata

Ninguna. La corrección automática exige validación principal en PASS y esta no lo es; los tres WARN anteriores quedan documentados sin tocar `image-multiformat-delivery` ni los ADR. `verified_at` de las cinco specs permanece en `null` por la misma condición. En las specs se marcaron los acceptance criteria cumplidos (`[x]`); el criterio de nitidez de `card-image-weight-budget` queda `[ ]`.

## Hallazgos

**H-1 (bloqueante, `card-image-weight-budget`, criterio de nitidez en móvil).** En móvil a DPR 2, las cuatro cards altas del bento de industrias del inicio (`ind-card--photo`, de dos filas) reciben una variante cuyo ancho queda muy por debajo del ancho que pintan con `object-fit: cover` × 2 (líneas `ind-card` del inicio en el bloque `390 844` de `verify-report.18`: las cuatro cards de mayor ancho pintado y las demás quedan marcadas `BAJO`, y las cuatro altas son las más alejadas del ancho necesario). Una captura Chrome a 390×844 DPR 2 de esa sección muestra Minería y Farma visiblemente blandas frente a Retail, que se ve nítida. El criterio y el escenario de la spec exigen nitidez sin pérdida visible en móvil. La causa es el valor `45vw` de `sizes` hasta 640 px en `IndustriesSection.astro`, que usa el ancho de la card y no el ancho pintado (la card alta recorta una foto 16:9 pintada mucho más ancha que la card). El propio `apply-evidence.md` (sección Tarea 7) ya describe este residuo y lo deja como riesgo. Las cards de servicios en móvil quedan levemente por debajo del ancho pintado × 2 (`verify-report.18`, `verify-report.19`), diferencia pequeña que no es visible; no se levanta como hallazgo. El hero en móvil figura `BAJO` en `verify-report.18` por su geometría, pero `HeroSection.astro` no cambió en este cambio y queda fuera de alcance.

La spec no es la incorrecta: el presupuesto se mide sobre peso AVIF y la medición del script (que suma además imágenes no AVIF) deja margen bajo el límite en el escenario móvil (`verify-report.1`), por lo que subir la variante de esas cuatro cards a un ancho intermedio es plausible sin superar los 2 MB; decidir el valor exacto le corresponde a `sdd-apply`, que debe volver a medir con `npm run measure:images` y a revisar la nitidez a DPR 2. La corrección es de implementación, no un delta de spec.

**H-2 (menor, `logo-vectorization-residue-removal`).** `verify-report.8` muestra que `README.md:36` sigue listando «Potrace (PNG → SVG)» en la tabla de stack. La búsqueda de `tasks.md` y de la spec distingue mayúsculas y por eso no la detecta; el criterio de la spec se cumple, pero la línea describe una dependencia retirada. Sugerencia: quitar `Potrace (PNG → SVG)` de esa fila al corregir H-1.

**H-3 (proceso de verificación).** `verify-report.9` aparece en `no_calzan` de `verify-report.25` con causa `distinto`: su salida incluye el nombre aleatorio del directorio temporal que crea `mktemp`, de modo que el bloque no es reproducible por construcción. Lo que muestra (generación de favicons con exit 0 e iguales a los versionados) no depende de ese nombre. `verify-report.13` es el registro fallido ya descrito; `verify-report.20` (coherencia de grafo) se reemplazó por `verify-report.23`, y `verify-report.21` y `verify-report.22` por `verify-report.24` y `verify-report.25` al rehacer el cierre.

**Observaciones sin acción.** Todos los bloques de `apply-evidence.md` que `comprobar` re-ejecuta calzan (`verify-report.24`); el resto se omite con motivo declarado. `verify-report.7` incluye HTML minificado por tratarse de una búsqueda sobre el build; no aporta más que las rutas.

## Salidas de comprobar

`verify-report.24` y `verify-report.25` registran la salida de `comprobar` sobre `apply-evidence.md` y sobre este informe; `verify-report.21` y `verify-report.22` son sus versiones obsoletas (se conservan por trazabilidad y los reemplazan esos dos). Que los bloques de `apply-evidence.md` calcen no cumple ningún criterio por sí mismo: cada criterio se verificó con evidencia propia de los bloques anteriores.

<!-- evidencia:inicio {"v":1,"id":"verify-report.24","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:57:46-03:00","exit":0,"sha256":"9a6ea818a86f13d33517251cc6bee3785d2ce2bbe18e2d1cdcd3fe654380952f","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volveria a comprobar este informe"} -->
**Evidencia `verify-report.24`** · exit 0 · 1 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:57:46-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: comprobar sobre verify-report.md volveria a comprobar este informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md","bloques":27,"comprobados":16,"calzan":["apply-evidence.2","apply-evidence.3","apply-evidence.4","apply-evidence.5","apply-evidence.6","apply-evidence.9","apply-evidence.10","apply-evidence.11","apply-evidence.12","apply-evidence.16","apply-evidence.17","apply-evidence.22","apply-evidence.23","apply-evidence.24","apply-evidence.25","apply-evidence.26"],"no_calzan":[],"omitidos":[{"id":"apply-evidence.1","motivo":"estado previo al borrado: dos de los tres archivos dejan de existir en la misma tarea"},{"id":"apply-evidence.7","motivo":"requiere el servidor astro preview levantado durante la fase en 127.0.0.1:4329"},{"id":"apply-evidence.8","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.13","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.14","motivo":"baseline previo a widths/sizes: la Tarea 4 cambia el build medido"},{"id":"apply-evidence.15","motivo":"segunda corrida del baseline para comprobar determinismo; la Tarea 4 cambia el build medido"},{"id":"apply-evidence.18","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.19","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.20","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.21","motivo":"usa scripts de simulaci\u00f3n del directorio de temporales del despacho"},{"id":"apply-evidence.27","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"}],"error":null}
```
<!-- evidencia:fin verify-report.24 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.25","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:57:49-03:00","exit":1,"sha256":"19b630c31dc706db542b0a514053fa06ceb5e188f2acaec25b24031cb9dbee88","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria el informe a si mismo"} -->
**Evidencia `verify-report.25`** · exit 1 · 1 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:57:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: re-ejecutarlo comprobaria el informe a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md","bloques":22,"comprobados":15,"calzan":["verify-report.2","verify-report.3","verify-report.4","verify-report.5","verify-report.6","verify-report.7","verify-report.8","verify-report.10","verify-report.11","verify-report.14","verify-report.15","verify-report.12","verify-report.16","verify-report.23"],"no_calzan":[{"id":"verify-report.9","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"verify-report.17","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.18","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.19","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.1","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.21","motivo":"comprobar sobre verify-report.md volveria a comprobar este informe"},{"id":"verify-report.22","motivo":"re-ejecutarlo comprobaria el informe a si mismo"},{"id":"verify-report.24","motivo":"comprobar sobre verify-report.md volveria a comprobar este informe"}],"error":null}
```
<!-- evidencia:fin verify-report.25 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:56:17-03:00","exit":0,"sha256":"9a6ea818a86f13d33517251cc6bee3785d2ce2bbe18e2d1cdcd3fe654380952f","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volveria a comprobar este informe"} -->
**Evidencia `verify-report.21`** · exit 0 · 1 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:56:17-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: comprobar sobre verify-report.md volveria a comprobar este informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md","bloques":27,"comprobados":16,"calzan":["apply-evidence.2","apply-evidence.3","apply-evidence.4","apply-evidence.5","apply-evidence.6","apply-evidence.9","apply-evidence.10","apply-evidence.11","apply-evidence.12","apply-evidence.16","apply-evidence.17","apply-evidence.22","apply-evidence.23","apply-evidence.24","apply-evidence.25","apply-evidence.26"],"no_calzan":[],"omitidos":[{"id":"apply-evidence.1","motivo":"estado previo al borrado: dos de los tres archivos dejan de existir en la misma tarea"},{"id":"apply-evidence.7","motivo":"requiere el servidor astro preview levantado durante la fase en 127.0.0.1:4329"},{"id":"apply-evidence.8","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.13","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.14","motivo":"baseline previo a widths/sizes: la Tarea 4 cambia el build medido"},{"id":"apply-evidence.15","motivo":"segunda corrida del baseline para comprobar determinismo; la Tarea 4 cambia el build medido"},{"id":"apply-evidence.18","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.19","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.20","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.21","motivo":"usa scripts de simulaci\u00f3n del directorio de temporales del despacho"},{"id":"apply-evidence.27","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"}],"error":null}
```
<!-- evidencia:fin verify-report.21 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"edbdf5537f17fb242695121311244df65f2fafca","fecha":"2026-10-03T00:56:19-03:00","exit":1,"sha256":"df54cc093c0d8a1d884eddda10bc77e9eeeeb71d92497b33ba43e3a026c9f176","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria el informe a si mismo"} -->
**Evidencia `verify-report.22`** · exit 1 · 1 líneas, 0 omitidas · HEAD `edbdf5537f17` · 2026-10-03T00:56:19-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: re-ejecutarlo comprobaria el informe a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md","bloques":21,"comprobados":16,"calzan":["verify-report.2","verify-report.3","verify-report.4","verify-report.5","verify-report.6","verify-report.7","verify-report.8","verify-report.10","verify-report.11","verify-report.12","verify-report.13","verify-report.14","verify-report.15","verify-report.16","verify-report.20"],"no_calzan":[{"id":"verify-report.9","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"verify-report.1","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.17","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.18","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.19","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.21","motivo":"comprobar sobre verify-report.md volveria a comprobar este informe"}],"error":null}
```
<!-- evidencia:fin verify-report.22 -->


## Acciones Requeridas

1. `sdd-apply` (corrección de implementación, sin delta de spec): resolver H-1 en `IndustriesSection.astro` (variante y `sizes` de las cards altas de industrias en móvil), volver a construir, ejecutar `npm run measure:images` para confirmar < 2 MB en ambos escenarios y revisar de nuevo la nitidez a DPR 2 en móvil.
2. Opcional, junto con lo anterior: quitar la mención de Potrace de `README.md:36` (H-2).
3. Opcional: declarar `affects: [[card-image-weight-budget]]` en `image-multiformat-delivery` y `spec_refs` en los ADR 0001 y 0006 (WARN de coherencia de grafo); `sdd-verify` lo aplica solo cuando la validación principal sea PASS.
