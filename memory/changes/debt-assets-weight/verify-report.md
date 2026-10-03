---
verdict: PASS
---

# Verify Report: debt-assets-weight

**Fecha**: 2026-10-03

Árbol verificado: worktree del cambio convergido con `main` (PR #34 incluido), con un build nuevo sobre ese árbol. Toda cifra y salida de comando de este informe es un bloque de evidencia que registra `evidence_block.py`; la prosa lo cita por su id e interpreta lo que muestra. Esta es la segunda iteración de verify: la primera encontró un bloqueante de nitidez móvil en las cuatro cards altas de industrias del inicio (H-1), que `sdd-apply` corrigió en `3cbeb00`. Este informe reemplaza al anterior y se rehizo con evidencia propia.

## Resultados por Spec

### duplicate-video-removal

| Criterion | Status | Notas |
|-----------|--------|-------|
| Existe una sola copia del video institucional en los archivos públicos del sitio | ✅ | `verify-report.2` lista un único MP4 en `public/` y en `dist/client`; `verify-report.4` confirma que git rastrea solo esa copia |
| La carpeta pública de videos duplicada ya no existe | ✅ | `verify-report.3` no lista `public/video`; `verify-report.4` no rastrea nada bajo esa ruta |
| Ninguna referencia rota al video, ni en el código fuente ni en el sitio construido | ✅ | `verify-report.5` (sin coincidencias en `src/`) y `verify-report.6` (sin coincidencias en `dist/client`); `verify-report.7` muestra que la única referencia a un MP4 es `/videos/log-atm-intro.mp4` |
| La sección de video de la página de inicio reproduce el video institucional | ✅ | `verify-report.17`: el MP4 responde HTTP 200, arranca solo, el tiempo avanza, el botón lo pausa y lo reanuda, y `error` es nulo |

**Scenarios verificados**: 3/3

<!-- evidencia:inicio {"v":1,"id":"verify-report.2","forma":"argv","argv":["find","public","dist/client","-name","*.mp4"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:30-03:00","exit":0,"sha256":"dd8308852142f1a71c3e2cd418053f709b0c8301417475b9796dff6a79175251","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.2`** · exit 0 · 2 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
find public dist/client -name '*.mp4'
```

```text
public/videos/log-atm-intro.mp4
dist/client/videos/log-atm-intro.mp4
```
<!-- evidencia:fin verify-report.2 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.3","forma":"argv","argv":["ls","public"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:30-03:00","exit":0,"sha256":"8597fdffa7d2e08490a658991a2c8db8b1c5151cbfc8f186d7001e5e6b5e2472","lineas":10,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.3`** · exit 0 · 10 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

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

<!-- evidencia:inicio {"v":1,"id":"verify-report.4","forma":"argv","argv":["git","ls-files","public/video","public/videos"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:30-03:00","exit":0,"sha256":"6ea88ce44e7a704b12cd47511389190e4a78136e5e2a62bc9fe7abe89c4ccef8","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.4`** · exit 0 · 1 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
git ls-files public/video public/videos
```

```text
public/videos/log-atm-intro.mp4
```
<!-- evidencia:fin verify-report.4 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.5","forma":"argv","argv":["/usr/bin/grep","-rnE","hero-port|(^|[^-])intro\\.mp4|/video/","src/"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:30-03:00","exit":1,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.5`** · exit 1 · 0 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -rnE 'hero-port|(^|[^-])intro\.mp4|/video/' src/
```

```text
```
<!-- evidencia:fin verify-report.5 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.6","forma":"argv","argv":["bash","-c","/usr/bin/grep -rlE 'hero-port|/video/intro' dist/client; echo grep-exit=$?"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:30-03:00","exit":0,"sha256":"5554f565d36253c154ea3bc8d0d774e47b0d77c4e3b6f5076c40bfbb95ed5e6c","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.6`** · exit 0 · 1 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -rlE '"'"'hero-port|/video/intro'"'"' dist/client; echo grep-exit=$?'
```

```text
grep-exit=1
```
<!-- evidencia:fin verify-report.6 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.7","forma":"argv","argv":["bash","-c","/usr/bin/grep -rhoE '[A-Za-z0-9_./-]*\\.mp4' src/ dist/client --include=*.astro --include=*.html --include=*.js --include=*.css --include=*.ts | sort | uniq -c"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:30-03:00","exit":0,"sha256":"33ccaafb4e949ee481e0fe9072b05ca8a27e761c2c8de2f710295410c1fd67a4","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.7`** · exit 0 · 1 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -rhoE '"'"'[A-Za-z0-9_./-]*\.mp4'"'"' src/ dist/client --include=*.astro --include=*.html --include=*.js --include=*.css --include=*.ts | sort | uniq -c'
```

```text
      4 /videos/log-atm-intro.mp4
```
<!-- evidencia:fin verify-report.7 -->


<!-- evidencia:inicio {"v":1,"id":"verify-report.17","forma":"archivo","argv":null,"texto":"# Video del inicio en Chrome headless: autoplay, avance del tiempo, boton de pausa y reproduccion, y respuesta HTTP del MP4\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nB=$(mktemp -d \"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/b/run.XXXXXXXX\")\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\nnode node_modules/astro/bin/astro.mjs preview --port 4421 --host 127.0.0.1 \u003e \"$B/preview.log\" 2\u003e&1 &\nPV=$!\ncd \"$B\"\n\"$CHROME_PATH\" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9556 --user-data-dir=\"$B/profile\" about:blank \u003e \"$B/chrome.log\" 2\u003e&1 &\nCH=$!\nsleep 6\necho \"preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4421/)\"\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/cdp.mjs 9556 http://127.0.0.1:4421 video \"$B\" \u003e \"$B/salida.txt\" 2\u003e&1\ncat \"$B/salida.txt\"\nkill $CH $PV 2\u003e/dev/null; wait 2\u003e/dev/null; echo \"servidores detenidos\"\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g && rm -rf \"$B\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:31:01-03:00","exit":0,"sha256":"19c1eb04834829a1fe791aa866ec0bd3f4a82e7b94fbc2ab29b753c7a772fa29","lineas":7,"omitidas":0,"no_recomprobable":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"} -->
**Evidencia `verify-report.17`** · exit 0 · 7 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:31:01-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta

```bash
# Video del inicio en Chrome headless: autoplay, avance del tiempo, boton de pausa y reproduccion, y respuesta HTTP del MP4
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
B=$(mktemp -d "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/b/run.XXXXXXXX")
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
node node_modules/astro/bin/astro.mjs preview --port 4421 --host 127.0.0.1 > "$B/preview.log" 2>&1 &
PV=$!
cd "$B"
"$CHROME_PATH" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9556 --user-data-dir="$B/profile" about:blank > "$B/chrome.log" 2>&1 &
CH=$!
sleep 6
echo "preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4421/)"
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/cdp.mjs 9556 http://127.0.0.1:4421 video "$B" > "$B/salida.txt" 2>&1
cat "$B/salida.txt"
kill $CH $PV 2>/dev/null; wait 2>/dev/null; echo "servidores detenidos"
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g && rm -rf "$B"
```

```text
preview http: 200
autoplay t0 {"currentSrc":"/videos/log-atm-intro.mp4","readyState":4,"paused":false,"currentTime":2.9,"duration":8,"error":null,"pressed":"true"}
autoplay t0+2s {"currentSrc":"/videos/log-atm-intro.mp4","readyState":4,"paused":false,"currentTime":4.9,"duration":8,"error":null,"pressed":"true"}
tras clic (pausa) {"currentSrc":"/videos/log-atm-intro.mp4","readyState":4,"paused":true,"currentTime":4.9,"duration":8,"error":null,"pressed":"false"}
tras segundo clic (reproduce) {"currentSrc":"/videos/log-atm-intro.mp4","readyState":4,"paused":false,"currentTime":6.4,"duration":8,"error":null,"pressed":"true"}
http 200
servidores detenidos
```
<!-- evidencia:fin verify-report.17 -->


### logo-vectorization-residue-removal

| Criterion | Status | Notas |
|-----------|--------|-------|
| Una búsqueda de la ubicación eliminada del logo en scripts, documentación y README no encuentra resultados | ✅ | `verify-report.8`: la búsqueda de `src/assets/logo.svg` en `scripts`, `docs`, `README.md` y los `package*.json` termina sin coincidencias |
| La herramienta de vectorización y su dependencia ya no forman parte del proyecto | ✅ | `verify-report.8`: `scripts/` no contiene `png-to-svg.mjs`, `npm ls potrace` responde vacío y el diff de `package.json` contra la base solo quita `potrace` y agrega el script `measure:images`; `verify-report.23` muestra que el lockfile es coherente con `package.json` |
| La documentación y el README señalan el logo vectorial vigente como fuente | ✅ | `verify-report.8`: `README.md` y `docs/project-brief.md` apuntan a `public/logo.svg`. Ver hallazgo H-2 sobre una mención residual de Potrace |
| La generación de favicons y el build funcionan sin errores | ✅ | `verify-report.9` (generación sobre copia aislada del árbol, exit 0, los tres archivos idénticos a los versionados) y `verify-report.1` (build con exit 0); `verify-report.8` muestra `public/logo.svg` y `generate-favicons.mjs` sin diff contra la base |

**Scenarios verificados**: 3/3

<!-- evidencia:inicio {"v":1,"id":"verify-report.8","forma":"archivo","argv":null,"texto":"# Residuos de la herramienta de vectorizacion: busquedas (sensibles e insensibles a mayusculas), scripts, dependencia y diff contra la base\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\necho \"== ubicacion eliminada del logo (scripts, docs, README, package.json)\"\n/usr/bin/grep -rn 'src/assets/logo.svg' scripts docs README.md package.json package-lock.json; echo \"grep-exit=$?\"\necho \"== png-to-svg / potrace, insensible a mayusculas\"\n/usr/bin/grep -rniE 'png-to-svg|potrace' scripts docs README.md package.json package-lock.json; echo \"grep-exit=$?\"\necho \"== scripts/\"\nls scripts\necho \"== npm ls potrace\"\nnpm ls potrace 2\u003e&1\necho \"== fuente del logo en docs y README\"\n/usr/bin/grep -rn 'public/logo.svg' README.md docs\necho \"== diff contra la base (587a8af) de logo.svg y del generador de favicons\"\ngit diff --stat 587a8af HEAD -- public/logo.svg scripts/generate-favicons.mjs; echo \"diff-lineas=$(git diff 587a8af HEAD -- public/logo.svg scripts/generate-favicons.mjs | wc -l)\"\necho \"== package.json contra la base\"\ngit diff 587a8af HEAD -- package.json\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:49-03:00","exit":0,"sha256":"b455be81167d12123cec8120e2bde579ed4a242344221b250114b44bb19dbceb","lineas":44,"omitidas":4,"no_recomprobable":null} -->
**Evidencia `verify-report.8`** · exit 0 · 44 líneas, 4 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Residuos de la herramienta de vectorizacion: busquedas (sensibles e insensibles a mayusculas), scripts, dependencia y diff contra la base
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
echo "== ubicacion eliminada del logo (scripts, docs, README, package.json)"
/usr/bin/grep -rn 'src/assets/logo.svg' scripts docs README.md package.json package-lock.json; echo "grep-exit=$?"
echo "== png-to-svg / potrace, insensible a mayusculas"
/usr/bin/grep -rniE 'png-to-svg|potrace' scripts docs README.md package.json package-lock.json; echo "grep-exit=$?"
echo "== scripts/"
ls scripts
echo "== npm ls potrace"
npm ls potrace 2>&1
echo "== fuente del logo en docs y README"
/usr/bin/grep -rn 'public/logo.svg' README.md docs
echo "== diff contra la base (587a8af) de logo.svg y del generador de favicons"
git diff --stat 587a8af HEAD -- public/logo.svg scripts/generate-favicons.mjs; echo "diff-lineas=$(git diff 587a8af HEAD -- public/logo.svg scripts/generate-favicons.mjs | wc -l)"
echo "== package.json contra la base"
git diff 587a8af HEAD -- package.json
```

```text
== ubicacion eliminada del logo (scripts, docs, README, package.json)
grep-exit=1
== png-to-svg / potrace, insensible a mayusculas
README.md:36:| Imágenes | Sharp (optimización), Potrace (PNG → SVG) |
grep-exit=0
== scripts/
axe-audit.mjs
check-i18n-links.ts
generate-favicons.mjs
measure-home-image-weight.mjs
validate-i18n.ts
== npm ls potrace
log-atm-web-astro@0.0.1 /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
└── (empty)

== fuente del logo en docs y README
README.md:85:├── scripts/                 Utilidades de build (favicons desde public/logo.svg, validación i18n)
docs/project-brief.md:21:| Logo vectorial | `public/logo.svg` (fuente vigente, versionada) |
docs/project-brief.md:63:La fuente vigente del logo vectorial es `public/logo.svg`, ya generado y versionado en el repositorio. `scripts/generate-favicons.mjs` deriva de él `favicon.svg`, `favicon.ico` y `apple-touch-icon.png`.
== diff contra la base (587a8af) de logo.svg y del generador de favicons
diff-lineas=0
== package.json contra la base
diff --git a/log-atm-web-astro/package.json b/log-atm-web-astro/package.json
index 8462c41..62b8e50 100644
--- a/log-atm-web-astro/package.json
+++ b/log-atm-web-astro/package.json
@@ -12,7 +12,8 @@
     "astro": "astro",
     "validate-i18n": "tsx scripts/validate-i18n.ts",
     "check-i18n-links": "tsx scripts/check-i18n-links.ts",
-    "favicons": "node scripts/generate-favicons.mjs"
+    "favicons": "node scripts/generate-favicons.mjs",
+    "measure:images": "node scripts/measure-home-image-weight.mjs"
   },
   "dependencies": {
     "@astrojs/cloudflare": "^13.5.0",
@@ -23,7 +24,6 @@
     "astro": "^6.1.5",
     "gsap": "^3.14.2",
     "motion": "^12.38.0",
```
<!-- evidencia:fin verify-report.8 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.9","forma":"archivo","argv":null,"texto":"# Generacion de favicons sobre una copia aislada del arbol (git archive en el directorio de temporales) y comparacion con los versionados\nD=$(mktemp -d \"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/fav.XXXXXXXX\")\ngit -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight archive HEAD log-atm-web-astro | tar -x -C \"$D\"\nln -s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/node_modules \"$D/log-atm-web-astro/node_modules\"\ncd \"$D/log-atm-web-astro\" && node scripts/generate-favicons.mjs 2\u003e&1 | sed \"s#$D#<copia\u003e#\"; echo \"generate-exit=${PIPESTATUS[0]}\"\ncmp \"$D/log-atm-web-astro/public/favicon.ico\" /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/favicon.ico && echo \"favicon.ico identico\"\ncmp \"$D/log-atm-web-astro/public/apple-touch-icon.png\" /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/apple-touch-icon.png && echo \"apple-touch-icon.png identico\"\ncmp \"$D/log-atm-web-astro/public/favicon.svg\" /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/favicon.svg && echo \"favicon.svg identico\"\nrm -rf \"$D\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:49-03:00","exit":0,"sha256":"ea965615ee9bc69f6697c384a2b418d4e62e3a520769aedfd5e26cdeab30b41f","lineas":7,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.9`** · exit 0 · 7 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:49-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Generacion de favicons sobre una copia aislada del arbol (git archive en el directorio de temporales) y comparacion con los versionados
D=$(mktemp -d "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/fav.XXXXXXXX")
git -C /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight archive HEAD log-atm-web-astro | tar -x -C "$D"
ln -s /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/node_modules "$D/log-atm-web-astro/node_modules"
cd "$D/log-atm-web-astro" && node scripts/generate-favicons.mjs 2>&1 | sed "s#$D#<copia>#"; echo "generate-exit=${PIPESTATUS[0]}"
cmp "$D/log-atm-web-astro/public/favicon.ico" /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/favicon.ico && echo "favicon.ico identico"
cmp "$D/log-atm-web-astro/public/apple-touch-icon.png" /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/apple-touch-icon.png && echo "apple-touch-icon.png identico"
cmp "$D/log-atm-web-astro/public/favicon.svg" /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro/public/favicon.svg && echo "favicon.svg identico"
rm -rf "$D"
```

```text
[favicons] favicon.svg generado: <copia>/log-atm-web-astro/public/favicon.svg
[favicons] favicon.ico (32x32 PNG) generado: <copia>/log-atm-web-astro/public/favicon.ico
[favicons] apple-touch-icon.png (180x180 PNG) generado: <copia>/log-atm-web-astro/public/apple-touch-icon.png
generate-exit=0
favicon.ico identico
apple-touch-icon.png identico
favicon.svg identico
```
<!-- evidencia:fin verify-report.9 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.23","forma":"argv","argv":["npm","ci","--dry-run"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:39:03-03:00","exit":0,"sha256":"be2824f1875a267f1cc9aabd7a946745d3c10dfac522635534be33fb7983fd3a","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.23`** · exit 0 · 5 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:39:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
npm ci --dry-run
```

```text

up to date in 564ms

152 packages are looking for funding
  run `npm fund` for details
```
<!-- evidencia:fin verify-report.23 -->


### services-static-card-no-hover-zoom

| Criterion | Status | Notas |
|-----------|--------|-------|
| Al pasar el cursor sobre una tarjeta de servicio no enlazada, su imagen no se amplía | ✅ | `verify-report.10` muestra el selector de zoom acotado a `:not(.svc-card--static)`; `verify-report.16` mide en Chrome con puntero real: todas las `div` estáticas del inicio y de `/servicios`, incluidas Carga Aérea y Carga Marítima, mantienen `transform: none` al hover |
| Al pasar el cursor sobre una tarjeta de servicio enlazada del inicio, su imagen se amplía | ✅ | `verify-report.16`: las cuatro tarjetas `a` del inicio y la tarjeta `a` de `/servicios` pasan a `matrix(1.04, …)` |

**Scenarios verificados**: 2/2. La línea `reposo` de Courier Internacional en el inicio muestra una transición aún en curso (el puntero acababa de salir de la tarjeta anterior); la medición de `hover` es la que cuenta y es uniforme.

<!-- evidencia:inicio {"v":1,"id":"verify-report.10","forma":"argv","argv":["/usr/bin/grep","-nE","svc-card--static|svc-card__media img","src/styles/sections/services.css"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:15:08-03:00","exit":0,"sha256":"a8e3cc2e6a5bd582e41b80c9523f540fc65bf78a0c401d4eb84fc8159ecbf4b5","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.10`** · exit 0 · 5 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:15:08-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
/usr/bin/grep -nE 'svc-card--static|svc-card__media img' src/styles/sections/services.css
```

```text
35:.svc-card--static { cursor: default; }
36:.svc-card--static:hover { transform: none; box-shadow: none; }
63:.svc-card__media img {
70:.svc-card:not(.svc-card--static):hover .svc-card__media img { transform: scale(1.04); }
174:  .svc-card:not(.svc-card--static):hover .svc-card__media img { transform: none; }
```
<!-- evidencia:fin verify-report.10 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.16","forma":"archivo","argv":null,"texto":"# Hover real del puntero (Chrome headless por CDP) contra astro preview del build: transform de la imagen de cada card de servicios, en el inicio y en /servicios\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nB=$(mktemp -d \"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/b/run.XXXXXXXX\")\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\nnode node_modules/astro/bin/astro.mjs preview --port 4421 --host 127.0.0.1 \u003e \"$B/preview.log\" 2\u003e&1 &\nPV=$!\ncd \"$B\"\n\"$CHROME_PATH\" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9556 --user-data-dir=\"$B/profile\" about:blank \u003e \"$B/chrome.log\" 2\u003e&1 &\nCH=$!\nsleep 6\necho \"preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4421/)\"\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/cdp.mjs 9556 http://127.0.0.1:4421 hover \"$B\" \u003e \"$B/salida.txt\" 2\u003e&1\ncat \"$B/salida.txt\"\nkill $CH $PV 2\u003e/dev/null; wait 2\u003e/dev/null; echo \"servidores detenidos\"\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g && rm -rf \"$B\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:30:47-03:00","exit":0,"sha256":"4c38c9bb011ebe44c45c395a8f4d963b90b6e3e99d07d34bd5a188e750852f55","lineas":20,"omitidas":0,"no_recomprobable":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"} -->
**Evidencia `verify-report.16`** · exit 0 · 20 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:30:47-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta

```bash
# Hover real del puntero (Chrome headless por CDP) contra astro preview del build: transform de la imagen de cada card de servicios, en el inicio y en /servicios
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
B=$(mktemp -d "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/b/run.XXXXXXXX")
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
node node_modules/astro/bin/astro.mjs preview --port 4421 --host 127.0.0.1 > "$B/preview.log" 2>&1 &
PV=$!
cd "$B"
"$CHROME_PATH" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9556 --user-data-dir="$B/profile" about:blank > "$B/chrome.log" 2>&1 &
CH=$!
sleep 6
echo "preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4421/)"
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/cdp.mjs 9556 http://127.0.0.1:4421 hover "$B" > "$B/salida.txt" 2>&1
cat "$B/salida.txt"
kill $CH $PV 2>/dev/null; wait 2>/dev/null; echo "servidores detenidos"
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g && rm -rf "$B"
```

```text
preview http: 200
div estatica=true href=null "Carga Marítima" reposo=none hover=none
div estatica=true href=null "Carga Aérea" reposo=none hover=none
a estatica=false href=/servicios/ "Aduana y Documentación" reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
a estatica=false href=/servicios/ "Almacenaje" reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
a estatica=false href=/cotizar/ "Consultoría Logística" reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
a estatica=false href=/servicios/ "Courier Internacional" reposo=matrix(1.00883, 0, 0, 1.00883, 0, 0) hover=matrix(1.04, 0, 0, 1.04, 0, 0)
-- servicios
div estatica=true href=null "Carga Aérea" reposo=none hover=none
div estatica=true href=null "Carga Marítima" reposo=none hover=none
div estatica=true href=null "Aduana y Documentación" reposo=none hover=none
div estatica=true href=null "Almacenaje" reposo=none hover=none
a estatica=false href=/cotizar/ "Consultoría Logística" reposo=none hover=matrix(1.04, 0, 0, 1.04, 0, 0)
div estatica=true href=null "Courier Internacional" reposo=none hover=none
div estatica=true href=null "Seguros de Carga" reposo=none hover=none
div estatica=true href=null "Desconsolidado" reposo=none hover=none
div estatica=true href=null "Casillero USA" reposo=none hover=none
div estatica=true href=null "Compras Internacionales" reposo=none hover=none
div estatica=true href=null "Ruta Medio Oriente" reposo=none hover=none
servidores detenidos
```
<!-- evidencia:fin verify-report.16 -->


### card-image-weight-budget

| Criterion | Status | Notas |
|-----------|--------|-------|
| Peso AVIF del inicio < 2 MB en escritorio 1440×900 DPR 1 | ✅ | `verify-report.1` (medición del script sobre el build nuevo): el escenario informa `OK < 2 MB` |
| Peso AVIF del inicio < 2 MB en móvil 390×844 DPR 3 | ✅ | `verify-report.1`: el escenario móvil informa `OK < 2 MB`; el total que mide el script incluye además archivos no AVIF, de modo que la parte AVIF queda por debajo del total informado. El margen del móvil es estrecho (ver observación O-1) |
| Medición reproducible sobre el build | ✅ | `verify-report.14`: dos ejecuciones consecutivas con exit 0 y salidas idénticas |
| Las tarjetas se ven sin pérdida visible de nitidez a DPR 2, en escritorio y en móvil | ✅ | `verify-report.19` (Chrome headless a DPR 2, páginas inicio, servicios, industrias y nosotros): en escritorio todas las cards quedan con variante ≥ ancho pintado × 2, salvo las que superan el original de 1376 px; en móvil las cuatro cards altas de industrias del inicio (H-1 de la iteración anterior) reciben ahora la variante de 1376 px y no figuran entre las de cobertura menor a 1. Quedan cards con cobertura menor a 1 solo en móvil (servicios y cards de una fila de industrias del inicio). La comparación de píxeles contra la variante original forzada, más una revisión visual de recortes de los peores casos (servicios móvil, nosotros escritorio, industria de una fila) y de la captura del bento de industrias móvil, no muestra pérdida visible a vista normal; ver observación O-2 |
| Todas las tarjetas con imagen declaran variantes de ancho y tamaño de render | ✅ | `verify-report.11` (fuente) y `verify-report.13` (HTML construido en es, en y pt: ninguna card sin `sizes` ni con un solo candidato) |
| La imagen principal del inicio conserva su prioridad de carga y su peso | ✅ | `verify-report.15`: `HeroSection.astro` sin diff contra la base, `<img>` con `fetchpriority="high"`, `loading="eager"` y los mismos tres anchos AVIF; `verify-report.11` muestra `priority` en su `<Picture>` |

**Scenarios verificados**: 6/6

<!-- evidencia:inicio {"v":1,"id":"verify-report.1","forma":"archivo","argv":null,"texto":"# Corrida completa de la fase: build de produccion, validadores i18n, barrido de enlaces y medicion de peso del inicio\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\nnpm run build 2\u003e&1 | tail -8\necho \"build-exit=${PIPESTATUS[0]}\"\nnpm run validate-i18n 2\u003e&1 | tail -5\necho \"validate-i18n-exit=${PIPESTATUS[0]}\"\nnpm run check-i18n-links 2\u003e&1 | tail -5\necho \"check-i18n-links-exit=${PIPESTATUS[0]}\"\nnode scripts/measure-home-image-weight.mjs\necho \"measure-exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:14:24-03:00","exit":0,"sha256":"5559a37ba19e156c158f4bba0d2df9028cd80aba9234fde0a1261bfb7448c755","lineas":24,"omitidas":0,"no_recomprobable":"la corrida completa de verify corre una sola vez y comprobar no la repite"} -->
**Evidencia `verify-report.1`** · exit 0 · 24 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:14:24-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: la corrida completa de verify corre una sola vez y comprobar no la repite

```bash
# Corrida completa de la fase: build de produccion, validadores i18n, barrido de enlaces y medicion de peso del inicio
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
npm run build 2>&1 | tail -8
echo "build-exit=${PIPESTATUS[0]}"
npm run validate-i18n 2>&1 | tail -5
echo "validate-i18n-exit=${PIPESTATUS[0]}"
npm run check-i18n-links 2>&1 | tail -5
echo "check-i18n-links-exit=${PIPESTATUS[0]}"
node scripts/measure-home-image-weight.mjs
echo "measure-exit=$?"
```

```text
01:14:23   ▶ /_astro/svc-medio-oriente.qMzx-2fw_E0Ea.jpg (reused cache entry) (+0ms) (473/473)
01:14:23 ✓ Completed in 70ms.

01:14:23 [build] Rearranging server assets...
01:14:23 [build] ✓ Completed in 6.42s.
01:14:23 [@astrojs/sitemap] `sitemap-index.xml` created at `dist/client`
01:14:23 [build] Server built in 8.63s
01:14:23 [build] Complete!
build-exit=0
> log-atm-web-astro@0.0.1 validate-i18n
> tsx scripts/validate-i18n.ts

[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
validate-i18n-exit=0

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
check-i18n-links-exit=0
escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
measure-exit=0
```
<!-- evidencia:fin verify-report.1 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.11","forma":"argv","argv":["bash","-c","/usr/bin/grep -rn -A14 '<Picture' src --include='*.astro' | /usr/bin/grep -E '<Picture|widths|sizes|priority|quality'"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:15:12-03:00","exit":0,"sha256":"a73265f74c33f4659d155f3c93f6f6b4b6e57e245ca4a7bc087f398829ec2a91","lineas":29,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.11`** · exit 0 · 29 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:15:12-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
bash -c '/usr/bin/grep -rn -A14 '"'"'<Picture'"'"' src --include='"'"'*.astro'"'"' | /usr/bin/grep -E '"'"'<Picture|widths|sizes|priority|quality'"'"''
```

```text
src/components/sections/IndustriesSection.astro:52:              <Picture
src/components/sections/IndustriesSection.astro-56-                quality={tall ? 55 : 80}
src/components/sections/IndustriesSection.astro-57-                widths={[300, 450, 600, 700, 1376]}
src/components/sections/IndustriesSection.astro-58-                sizes={tall ? '665px' : '(max-width: 640px) 45vw, 665px'}
src/components/sections/ServicesSection.astro:59:              <Picture
src/components/sections/ServicesSection.astro-63-                quality={80}
src/components/sections/ServicesSection.astro-64-                widths={SERVICE_CARD_IMAGE_WIDTHS}
src/components/sections/ServicesSection.astro-65-                sizes={SERVICE_CARD_IMAGE_SIZES[s.size]}
src/components/sections/HeroSection.astro:21:    <Picture
src/components/sections/HeroSection.astro-25-      priority
src/components/sections/HeroSection.astro-27-      widths={[768, 1280, 1920, heroImg.width]}
src/components/sections/HeroSection.astro-28-      sizes="100vw"
src/components/sections/HeroSection.astro-29-      quality={80}
src/pages/servicios.astro:92:                  <Picture
src/pages/servicios.astro-96-                    quality={80}
src/pages/servicios.astro-97-                    widths={SERVICE_CARD_IMAGE_WIDTHS}
src/pages/servicios.astro-98-                    sizes={SERVICE_CARD_IMAGE_SIZES[s.size]}
src/pages/servicios.astro:130:              <Picture
src/pages/servicios.astro-134-                quality={80}
src/pages/servicios.astro-135-                widths={[640, 960, 1376]}
src/pages/servicios.astro-136-                sizes="(max-width: 900px) 129vw, (max-width: 1280px) 69vw, 890px"
src/pages/nosotros.astro:108:                <Picture
src/pages/nosotros.astro-112-                  quality={80}
src/pages/nosotros.astro-113-                  widths={[400, 800, 1376]}
src/pages/nosotros.astro-114-                  sizes="(max-width: 600px) 121vw, (max-width: 1000px) 60vw, (max-width: 1280px) 30vw, 385px"
src/pages/industrias.astro:82:                <Picture
src/pages/industrias.astro-86-                  quality={80}
src/pages/industrias.astro-87-                  widths={[920, 1376]}
src/pages/industrias.astro-88-                  sizes="(max-width: 960px) 920px, 1376px"
```
<!-- evidencia:fin verify-report.11 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.13","forma":"argv","argv":["node","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/html.mjs"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:15:28-03:00","exit":0,"sha256":"72dd19ab3c2b0e38c6b54d1ca16387615619dc2c6eeabbdaa711cd53abf2c382","lineas":19,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.13`** · exit 0 · 19 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:15:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```text
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/html.mjs
```

```text
./             cards=18 sinSizes=0 unSoloCandidato=0 hero=1
servicios/     cards=17 sinSizes=0 unSoloCandidato=0 hero=0
industrias/    cards=12 sinSizes=0 unSoloCandidato=0 hero=0
nosotros/      cards=4 sinSizes=0 unSoloCandidato=0 hero=0
contacto/      cards=0 sinSizes=0 unSoloCandidato=0 hero=0
cotizar/       cards=0 sinSizes=0 unSoloCandidato=0 hero=0
en/            cards=18 sinSizes=0 unSoloCandidato=0 hero=1
en/servicios/  cards=17 sinSizes=0 unSoloCandidato=0 hero=0
en/industrias/ cards=12 sinSizes=0 unSoloCandidato=0 hero=0
en/nosotros/   cards=4 sinSizes=0 unSoloCandidato=0 hero=0
en/contacto/   cards=0 sinSizes=0 unSoloCandidato=0 hero=0
en/cotizar/    cards=0 sinSizes=0 unSoloCandidato=0 hero=0
pt/            cards=18 sinSizes=0 unSoloCandidato=0 hero=1
pt/servicios/  cards=17 sinSizes=0 unSoloCandidato=0 hero=0
pt/industrias/ cards=12 sinSizes=0 unSoloCandidato=0 hero=0
pt/nosotros/   cards=4 sinSizes=0 unSoloCandidato=0 hero=0
pt/contacto/   cards=0 sinSizes=0 unSoloCandidato=0 hero=0
pt/cotizar/    cards=0 sinSizes=0 unSoloCandidato=0 hero=0
TOTAL cards=153 sinSizes=0 unSoloCandidato=0
```
<!-- evidencia:fin verify-report.13 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.14","forma":"archivo","argv":null,"texto":"# Reproducibilidad de la medicion: dos ejecuciones consecutivas sobre el mismo build y comparacion de sus salidas\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\nnode scripts/measure-home-image-weight.mjs \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m1.txt; echo \"exit1=$?\"\nnode scripts/measure-home-image-weight.mjs \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m2.txt; echo \"exit2=$?\"\ncmp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m1.txt /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m2.txt && echo \"salidas identicas\"\ncat /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m1.txt\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:15:28-03:00","exit":0,"sha256":"3598fa43d689831596681da2768e7e3469d4a3422b83fef739be4706b3ce0f8f","lineas":5,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.14`** · exit 0 · 5 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:15:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Reproducibilidad de la medicion: dos ejecuciones consecutivas sobre el mismo build y comparacion de sus salidas
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
node scripts/measure-home-image-weight.mjs > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m1.txt; echo "exit1=$?"
node scripts/measure-home-image-weight.mjs > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m2.txt; echo "exit2=$?"
cmp /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m1.txt /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m2.txt && echo "salidas identicas"
cat /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/m1.txt
```

```text
exit1=0
exit2=0
salidas identicas
escritorio 1440x900 DPR 1: total 1304843 bytes (1.244 MB) | avif 1128962 bytes (1.077 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
movil 390x844 DPR 3: total 2077253 bytes (1.981 MB) | avif 1901372 bytes (1.813 MB) | otras 175881 bytes (0.168 MB) | archivos 21 | OK < 2 MB
```
<!-- evidencia:fin verify-report.14 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.15","forma":"archivo","argv":null,"texto":"# Hero del inicio: diff contra la base y atributos de carga en el HTML construido\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\necho \"== diff de HeroSection.astro contra la base (587a8af)\"\ngit diff --stat 587a8af HEAD -- src/components/sections/HeroSection.astro; echo \"diff-lineas=$(git diff 587a8af HEAD -- src/components/sections/HeroSection.astro | wc -l)\"\necho \"== <img\u003e del hero en dist/client/index.html\"\n/usr/bin/grep -oE '<img[^\u003e]*fetchpriority=\"high\"[^\u003e]*\u003e' dist/client/index.html | /usr/bin/grep -v nav__brand-logo | sed -E 's/(src|srcset)=\"[^\"]{0,60}[^\"]*\"/\\1=.../g'\necho \"== source AVIF del hero\"\n/usr/bin/grep -oE '<source[^\u003e]*image/avif[^\u003e]*sizes=\"100vw\"[^\u003e]*\u003e' dist/client/index.html | /usr/bin/grep -oE 'sizes=\"[^\"]*\"| [0-9]+w' | tr '\\n' ' '; echo\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:15:28-03:00","exit":0,"sha256":"d91b6aabb2fb9edde4b7366d192ba379fa8c7be9ac39f3057c2bc27a6b74ff94","lineas":6,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.15`** · exit 0 · 6 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:15:28-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`

```bash
# Hero del inicio: diff contra la base y atributos de carga en el HTML construido
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
echo "== diff de HeroSection.astro contra la base (587a8af)"
git diff --stat 587a8af HEAD -- src/components/sections/HeroSection.astro; echo "diff-lineas=$(git diff 587a8af HEAD -- src/components/sections/HeroSection.astro | wc -l)"
echo "== <img> del hero en dist/client/index.html"
/usr/bin/grep -oE '<img[^>]*fetchpriority="high"[^>]*>' dist/client/index.html | /usr/bin/grep -v nav__brand-logo | sed -E 's/(src|srcset)="[^"]{0,60}[^"]*"/\1=.../g'
echo "== source AVIF del hero"
/usr/bin/grep -oE '<source[^>]*image/avif[^>]*sizes="100vw"[^>]*>' dist/client/index.html | /usr/bin/grep -oE 'sizes="[^"]*"| [0-9]+w' | tr '\n' ' '; echo
```

```text
== diff de HeroSection.astro contra la base (587a8af)
diff-lineas=0
== <img> del hero en dist/client/index.html
<img src=... srcset=... alt sizes="100vw" loading="eager" decoding="sync" fetchpriority="high" width="1376" height="768">
== source AVIF del hero
 768w  1280w  1376w sizes="100vw" 
```
<!-- evidencia:fin verify-report.15 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.19","forma":"archivo","argv":null,"texto":"# Nitidez a DPR 2 (1440x900 y 390x844) en inicio, servicios, industrias y nosotros: variante elegida vs ancho pintado x 2 y comparacion de pixeles contra la variante original forzada\nexport CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome\nB=$(mktemp -d \"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/b/run.XXXXXXXX\")\ncd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro\nnode node_modules/astro/bin/astro.mjs preview --port 4421 --host 127.0.0.1 \u003e \"$B/preview.log\" 2\u003e&1 &\nPV=$!\ncd \"$B\"\n\"$CHROME_PATH\" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9556 --user-data-dir=\"$B/profile\" about:blank \u003e \"$B/chrome.log\" 2\u003e&1 &\nCH=$!\nsleep 6\necho \"preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4421/)\"\nnode /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/cdp.mjs 9556 http://127.0.0.1:4421 nitidez \"$B\" \u003e \"$B/salida.txt\" 2\u003e&1\n/usr/bin/grep -E \"^(==|resumen)\" \"$B/salida.txt\"; echo \"-- tarjetas con variante < 1376w y cubre < 1 (escenario, variante, cubre, cantidad)\"; awk '/^==/{esc=$2\" \"$3} /BAJO/ && !/variante=1376w/{print esc, $2, $6}' \"$B/salida.txt\" | sort | uniq -c\nkill $CH $PV 2\u003e/dev/null; wait 2\u003e/dev/null; echo \"servidores detenidos\"\ncd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g && rm -rf \"$B\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:37:45-03:00","exit":0,"sha256":"5d9ea5b29b68781e96a342f0577e0e55f0386dec69e2eff736c6a7a34c1b03f5","lineas":22,"omitidas":0,"no_recomprobable":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"} -->
**Evidencia `verify-report.19`** · exit 0 · 22 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:37:45-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro`
No re-comprobable: requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta

```bash
# Nitidez a DPR 2 (1440x900 y 390x844) en inicio, servicios, industrias y nosotros: variante elegida vs ancho pintado x 2 y comparacion de pixeles contra la variante original forzada
export CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome
B=$(mktemp -d "/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/b/run.XXXXXXXX")
cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/log-atm-web-astro
node node_modules/astro/bin/astro.mjs preview --port 4421 --host 127.0.0.1 > "$B/preview.log" 2>&1 &
PV=$!
cd "$B"
"$CHROME_PATH" --headless=new --no-sandbox --disable-gpu --remote-debugging-port=9556 --user-data-dir="$B/profile" about:blank > "$B/chrome.log" 2>&1 &
CH=$!
sleep 6
echo "preview http: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:4421/)"
node /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/cdp.mjs 9556 http://127.0.0.1:4421 nitidez "$B" > "$B/salida.txt" 2>&1
/usr/bin/grep -E "^(==|resumen)" "$B/salida.txt"; echo "-- tarjetas con variante < 1376w y cubre < 1 (escenario, variante, cubre, cantidad)"; awk '/^==/{esc=$2" "$3} /BAJO/ && !/variante=1376w/{print esc, $2, $6}' "$B/salida.txt" | sort | uniq -c
kill $CH $PV 2>/dev/null; wait 2>/dev/null; echo "servidores detenidos"
cd /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g && rm -rf "$B"
```

```text
preview http: 200
== inicio-esc 1440x900 DPR 2: cards=18
resumen: bajo(cubre<1)=1 detalle<0.9=2 peorDetalle=0.68 (#3) maxRmse=11.9
== inicio-mov 390x844 DPR 2: cards=18
resumen: bajo(cubre<1)=14 detalle<0.9=6 peorDetalle=0.59 (#3) maxRmse=10.3
== servicios-esc 1440x900 DPR 2: cards=17
resumen: bajo(cubre<1)=7 detalle<0.9=6 peorDetalle=0.68 (#3) maxRmse=11.4
== servicios-mov 390x844 DPR 2: cards=17
resumen: bajo(cubre<1)=11 detalle<0.9=10 peorDetalle=0.59 (#3) maxRmse=10.3
== industrias-esc 1440x900 DPR 2: cards=12
resumen: bajo(cubre<1)=12 detalle<0.9=0 peorDetalle=1 (#0) maxRmse=0
== industrias-mov 390x844 DPR 2: cards=12
resumen: bajo(cubre<1)=12 detalle<0.9=0 peorDetalle=1 (#0) maxRmse=0
== nosotros-esc 1440x900 DPR 2: cards=4
resumen: bajo(cubre<1)=0 detalle<0.9=4 peorDetalle=0.46 (#2) maxRmse=10.1
== nosotros-mov 390x844 DPR 2: cards=4
resumen: bajo(cubre<1)=0 detalle<0.9=0 peorDetalle=1 (#0) maxRmse=0
-- tarjetas con variante < 1376w y cubre < 1 (escenario, variante, cubre, cantidad)
      8 inicio-mov 390x844 variante=450w cubre=0.7
      6 inicio-mov 390x844 variante=800w cubre=0.94
     11 servicios-mov 390x844 variante=800w cubre=0.94
servidores detenidos
```
<!-- evidencia:fin verify-report.19 -->


### observations-debt-log-sync

| Criterion | Status | Notas |
|-----------|--------|-------|
| Candidatos de industrias y logo duplicado figuran como resueltos con el commit | ✅ | `verify-report.20`: dos líneas `**Estado**` que citan `e6ade3a`, y ese commit borró los archivos de industrias y el logo |
| La ruta errónea del logo eliminado queda corregida | ✅ | `verify-report.20`: línea de corrección con `src/assets/logo.svg`, que es la ruta que `e6ade3a` borró; `src/assets/industries/logo.svg` no existía antes de ese commit |
| El candidato de videos duplicados figura como cerrado por este cambio | ✅ | `verify-report.20`: línea `**Estado**` «cerrado por `debt-assets-weight`» |
| El contenido original se conserva y solo se agrega el estado | ✅ | `verify-report.20`: el commit de la spec solo agrega líneas a `memory/observations.md` (columna de eliminaciones en cero) |

**Scenarios verificados**: 4/4

<!-- evidencia:inicio {"v":1,"id":"verify-report.20","forma":"archivo","argv":null,"texto":"# Registro de deuda: el commit de la spec solo agrega lineas; historial de la ruta del logo eliminado; estado de las tres entradas\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight\ngit -C $W show --numstat --format=%h b38d775 -- memory/observations.md\necho \"== lineas agregadas por el commit (ninguna eliminada)\"\ngit -C $W show b38d775 -- memory/observations.md | /usr/bin/grep -E '^[+-][^+-]' | cut -c1-200\necho \"== archivos de logo y de industrias eliminados por e6ade3a\"\ngit -C $W show --name-status --format=%h e6ade3a | /usr/bin/grep -E 'logo|industryImages'\necho \"== src/assets/industries/logo.svg en el arbol previo a e6ade3a (sin salida = no existia)\"\ngit -C $W ls-tree -r --name-only e6ade3a~1 | /usr/bin/grep -E 'src/assets/industries/logo.svg'; echo \"grep-exit=$?\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:37:59-03:00","exit":0,"sha256":"5744c6c3ac1a3e64bef4fc0f6191036fe41b0cdba49954f24d3fba85e68adcae","lineas":13,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.20`** · exit 0 · 13 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:37:59-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`

```bash
# Registro de deuda: el commit de la spec solo agrega lineas; historial de la ruta del logo eliminado; estado de las tres entradas
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight
git -C $W show --numstat --format=%h b38d775 -- memory/observations.md
echo "== lineas agregadas por el commit (ninguna eliminada)"
git -C $W show b38d775 -- memory/observations.md | /usr/bin/grep -E '^[+-][^+-]' | cut -c1-200
echo "== archivos de logo y de industrias eliminados por e6ade3a"
git -C $W show --name-status --format=%h e6ade3a | /usr/bin/grep -E 'logo|industryImages'
echo "== src/assets/industries/logo.svg en el arbol previo a e6ade3a (sin salida = no existia)"
git -C $W ls-tree -r --name-only e6ade3a~1 | /usr/bin/grep -E 'src/assets/industries/logo.svg'; echo "grep-exit=$?"
```

```text
b38d775

4	0	memory/observations.md
== lineas agregadas por el commit (ninguna eliminada)
+**Estado**: resuelto por `e6ade3a` (borró los 14 jpg de `src/assets/industries/` y `src/lib/industryImages.ts`).
+**Estado**: resuelto por `e6ade3a` (borró `src/assets/logo.svg`); `debt-assets-weight` retiró además `scripts/png-to-svg.mjs` y la dependencia `potrace`.
+**Estado**: cerrado por `debt-assets-weight`: se confirmaron 3 MP4 con el mismo md5 (`public/video/intro.mp4`, `public/videos/hero-port.mp4`, `public/videos/log-atm-intro.mp4`) y se dejó solo `public
+  - **Corrección (`debt-assets-weight`)**: el historial git muestra que `e6ade3a` eliminó `src/assets/logo.svg`; `src/assets/industries/logo.svg` no existía en el árbol previo a ese commit.
== archivos de logo y de industrias eliminados por e6ade3a
D	log-atm-web-astro/src/assets/logo.svg
D	log-atm-web-astro/src/lib/industryImages.ts
== src/assets/industries/logo.svg en el arbol previo a e6ade3a (sin salida = no existia)
grep-exit=1
```
<!-- evidencia:fin verify-report.20 -->


### Tests

El proyecto no declara un runner de tests ni una lista versionada de suites. La corrida completa de esta fase es la verificación que declara el perfil: build de producción (con la validación de paridad i18n del hook de build), `validate-i18n`, `check-i18n-links` (barrido de enlaces del PR #34 sobre el build) y la medición de peso del inicio.

`verify-report.1` es esa corrida completa sobre el árbol final: build, validadores i18n y barrido de enlaces con exit 0, y medición con exit 0 en los dos escenarios. `verify-report.16`, `verify-report.17` y `verify-report.19` son las verificaciones en navegador (Chrome headless contra `astro preview` del build; servidores detenidos al terminar cada bloque).

**Cobertura**: no hay instrumento de cobertura en el proyecto.

## Hallazgos de Seguridad (si aplica)

Sin hallazgos de seguridad: el dominio es `debt` y la fase no ejecuta el análisis de seguridad. El cambio elimina un script y una dependencia (`potrace`), borra assets duplicados, agrega atributos de imagen y un script de medición de solo lectura.

## Coherencia de Grafo de Specs

`verify-report.21` lista `depends_on`, `affects` y `adrs` de las cinco specs. La única `depends_on` es la de `card-image-weight-budget` hacia `image-multiformat-delivery`; esa spec existe, por lo que no hay spec requerida ausente. `verify-report.21` capturó el estado previo a la corrección automática; `verify-report.22` muestra el estado vigente.

| Slug | Campo | Descripción |
|------|-------|-------------|
| `image-multiformat-delivery` | `affects` | WARN: `card-image-weight-budget` declara `depends_on` hacia ella y no figuraba en su `affects` ni en su `related`. Corregido (ver más abajo) |
| `0001-image-optimization-astro-assets` | `spec_refs` | WARN: ADR declarado en `adrs[]` de `card-image-weight-budget` sin `spec_refs` en su frontmatter. Corregido |
| `0006-picture-multiformat-content-images` | `spec_refs` | WARN: ídem. Corregido |

<!-- evidencia:inicio {"v":1,"id":"verify-report.21","forma":"argv","argv":["python3","/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/grafo.py"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:38:16-03:00","exit":0,"sha256":"0dca6a2fb16660e75cdb636c3c4a37f62fce53db41cc2773676a6d078a94c056","lineas":8,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `verify-report.21`** · exit 0 · 8 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:38:16-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`

```text
python3 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/debt-assets-weight/sdd-verify-hbywir9g/s/grafo.py
```

```text
card-image-weight-budget: depends_on=['image-multiformat-delivery'] affects=[] adrs=['0001-image-optimization-astro-assets', '0006-picture-multiformat-content-images']
  depends_on image-multiformat-delivery: existe; declara card-image-weight-budget en affects/related = False
  adr 0001-image-optimization-astro-assets: existe; campo spec_refs en frontmatter = no declarado
  adr 0006-picture-multiformat-content-images: existe; campo spec_refs en frontmatter = no declarado
duplicate-video-removal: depends_on=[] affects=[] adrs=[]
logo-vectorization-residue-removal: depends_on=[] affects=[] adrs=[]
observations-debt-log-sync: depends_on=[] affects=[] adrs=[]
services-static-card-no-hover-zoom: depends_on=[] affects=[] adrs=[]
```
<!-- evidencia:fin verify-report.21 -->


## Correcciones de Metadata

La validación principal es PASS y las tres inconsistencias son unívocas y solo de metadata, por lo que se aplicó la corrección automática (`verify-report.22`):

- `image-multiformat-delivery`: se agregó `[[image-optimization-pipeline/card-image-weight-budget]]` a `affects` (orden alfabético) y se actualizó `updated`.
- ADR `0001-image-optimization-astro-assets` y `0006-picture-multiformat-content-images`: se agregó `spec_refs` con `[[card-image-weight-budget]]` y `updated`.
- `verified_at` de las cinco specs pasó a la fecha de hoy, y el criterio de nitidez de `card-image-weight-budget` quedó marcado `[x]` en el frontmatter y en el cuerpo.

<!-- evidencia:inicio {"v":1,"id":"verify-report.22","forma":"archivo","argv":null,"texto":"# Correcciones de metadata y verified_at aplicadas por la fase: diff de specs y ADR\nW=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight\ngit -C $W diff --stat -- memory/specs memory/adrs\necho \"== verified_at de las cinco specs\"\n/usr/bin/grep -rn '^verified_at:' $W/memory/specs/image-optimization-pipeline/card-image-weight-budget.md $W/memory/specs/dead-code-cleanup/duplicate-video-removal.md $W/memory/specs/dead-code-cleanup/logo-vectorization-residue-removal.md $W/memory/specs/dead-code-cleanup/observations-debt-log-sync.md $W/memory/specs/content-services/services-static-card-no-hover-zoom.md | sed \"s#$W/memory/specs/##\"\necho \"== criterios sin cumplir en card-image-weight-budget\"\n/usr/bin/grep -c '\\[ \\]' $W/memory/specs/image-optimization-pipeline/card-image-weight-budget.md; true\necho \"== affects de image-multiformat-delivery y spec_refs de los ADR\"\n/usr/bin/grep -n 'card-image-weight-budget' $W/memory/specs/image-optimization-pipeline/image-multiformat-delivery.md $W/memory/adrs/0001-image-optimization-astro-assets.md $W/memory/adrs/0006-picture-multiformat-content-images.md | sed \"s#$W/memory/##\"\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:39:02-03:00","exit":0,"sha256":"d8f96a2a28178067aba0690b1b91e1920526a23d1f14d57bbb6a7f004a8ac85c","lineas":21,"omitidas":0,"no_recomprobable":"el diff queda vacio cuando el cierre confirma las correcciones"} -->
**Evidencia `verify-report.22`** · exit 0 · 21 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:39:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`
No re-comprobable: el diff queda vacio cuando el cierre confirma las correcciones

```bash
# Correcciones de metadata y verified_at aplicadas por la fase: diff de specs y ADR
W=/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight
git -C $W diff --stat -- memory/specs memory/adrs
echo "== verified_at de las cinco specs"
/usr/bin/grep -rn '^verified_at:' $W/memory/specs/image-optimization-pipeline/card-image-weight-budget.md $W/memory/specs/dead-code-cleanup/duplicate-video-removal.md $W/memory/specs/dead-code-cleanup/logo-vectorization-residue-removal.md $W/memory/specs/dead-code-cleanup/observations-debt-log-sync.md $W/memory/specs/content-services/services-static-card-no-hover-zoom.md | sed "s#$W/memory/specs/##"
echo "== criterios sin cumplir en card-image-weight-budget"
/usr/bin/grep -c '\[ \]' $W/memory/specs/image-optimization-pipeline/card-image-weight-budget.md; true
echo "== affects de image-multiformat-delivery y spec_refs de los ADR"
/usr/bin/grep -n 'card-image-weight-budget' $W/memory/specs/image-optimization-pipeline/image-multiformat-delivery.md $W/memory/adrs/0001-image-optimization-astro-assets.md $W/memory/adrs/0006-picture-multiformat-content-images.md | sed "s#$W/memory/##"
```

```text
 memory/adrs/0001-image-optimization-astro-assets.md                 | 3 +++
 memory/adrs/0006-picture-multiformat-content-images.md              | 3 +++
 memory/specs/content-services/services-static-card-no-hover-zoom.md | 2 +-
 memory/specs/dead-code-cleanup/duplicate-video-removal.md           | 2 +-
 .../specs/dead-code-cleanup/logo-vectorization-residue-removal.md   | 2 +-
 memory/specs/dead-code-cleanup/observations-debt-log-sync.md        | 2 +-
 .../specs/image-optimization-pipeline/card-image-weight-budget.md   | 6 +++---
 .../specs/image-optimization-pipeline/image-multiformat-delivery.md | 3 ++-
 8 files changed, 15 insertions(+), 8 deletions(-)
== verified_at de las cinco specs
image-optimization-pipeline/card-image-weight-budget.md:44:verified_at: "2026-10-03"
dead-code-cleanup/duplicate-video-removal.md:34:verified_at: "2026-10-03"
dead-code-cleanup/logo-vectorization-residue-removal.md:34:verified_at: "2026-10-03"
dead-code-cleanup/observations-debt-log-sync.md:32:verified_at: "2026-10-03"
content-services/services-static-card-no-hover-zoom.md:30:verified_at: "2026-10-03"
== criterios sin cumplir en card-image-weight-budget
0
== affects de image-multiformat-delivery y spec_refs de los ADR
specs/image-optimization-pipeline/image-multiformat-delivery.md:36:  - "[[image-optimization-pipeline/card-image-weight-budget]]"
adrs/0001-image-optimization-astro-assets.md:8:  - "[[card-image-weight-budget]]"
adrs/0006-picture-multiformat-content-images.md:11:  - "[[card-image-weight-budget]]"
```
<!-- evidencia:fin verify-report.22 -->


## Hallazgos

Ningún hallazgo bloquea el archive.

**H-2 (menor, `logo-vectorization-residue-removal`).** `verify-report.8` muestra que `README.md` sigue listando «Potrace (PNG → SVG)» en la tabla de stack. La búsqueda de la spec distingue mayúsculas y por eso no la detecta; los criterios de la spec se cumplen, pero la línea describe una dependencia retirada. `memory/_profile.md` también lista `potrace` entre las dependencias; `sdd-archive` actualiza el perfil. Sugerencia: quitar la fila de Potrace del README en un cambio posterior o en el cierre.

**H-3 (proceso, bloques que no calzan).** `comprobar` sobre este informe (`verify-report.25`) lista dos bloques en `no_calzan`, ambos esperados y sin relación con el código: `verify-report.21` registra el estado previo a la corrección automática de metadata, que `verify-report.22` deja resuelta; `verify-report.23` (`npm ci --dry-run`) incluye en su salida el tiempo de ejecución, que cambia entre corridas. Lo que cada uno muestra (grafo con las tres asimetrías antes de corregir; lockfile coherente con `package.json`) no depende de esa diferencia.

**H-4 (proceso, `apply-evidence.md`).** `verify-report.24` lista dos bloques de `apply-evidence.md` en `no_calzan`: `apply-evidence.16` y `apply-evidence.17`, registrados en la primera iteración de `widths`/`sizes`; el redespacho posterior cambió el build que miden y los reemplazan `apply-evidence.30`, `apply-evidence.32` y `apply-evidence.33`. Esos bloques no cumplen ningún criterio: cada criterio se verificó con evidencia propia de este informe.

**Observaciones sin acción.**

- **O-1.** El escenario móvil del presupuesto tiene margen estrecho (`verify-report.1`): el peso de las cuatro cards altas de industrias a 1376 px con quality 55 deja el total cerca del límite. Un cambio futuro en las imágenes del inicio puede superarlo; la medición reproducible (`verify-report.14`) lo detecta.
- **O-2.** En móvil a DPR 2 hay cards con cobertura de variante menor al ancho pintado × 2 (`verify-report.19`, última sección): cards de servicios a 800w y cards de industrias de una fila a 450w. La comparación de píxeles contra el original muestra diferencias de detalle fino (`detalle(A/B)` menor a 1) que en los recortes revisados a escala 1:1 no se perciben; a un aumento de 3× la variante nativa se ve apenas más suave que el original reducido. El criterio de la spec es «sin pérdida visible», y se cumple a vista normal. En escritorio de `/industrias` el original de 1376 px es el límite de la fuente (misma situación que antes del cambio).
- **O-3.** En `verify-report.1` el build reutiliza de la caché de Astro las variantes de imagen ya generadas (el log lo indica línea a línea); las páginas, el CSS y los scripts se compilan de nuevo.
- El registro `verify-report.12` (HTML de las páginas construidas) falló la primera vez por un script ausente y el `verify-report.18` (nitidez) tenía un rótulo de columna equivocado; ambos se retiraron de este informe y los reemplazan `verify-report.13` y `verify-report.19`.

## Salidas de comprobar

`verify-report.24` y `verify-report.25` registran la salida de `comprobar` sobre `apply-evidence.md` y sobre este informe. Que los bloques de `apply-evidence.md` calcen no cumple ningún criterio por sí mismo: cada criterio se verificó con evidencia propia de los bloques anteriores.

<!-- evidencia:inicio {"v":1,"id":"verify-report.24","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:39:23-03:00","exit":1,"sha256":"66a6d55ea774e560eb33aac15c90f27172fec645c6a01dc71b3cbf01d6ffdf7b","lineas":1,"omitidas":0,"no_recomprobable":"comprobar sobre verify-report.md volveria a comprobar ese informe"} -->
**Evidencia `verify-report.24`** · exit 1 · 1 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:39:23-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`
No re-comprobable: comprobar sobre verify-report.md volveria a comprobar ese informe

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/apply-evidence.md","bloques":33,"comprobados":16,"calzan":["apply-evidence.2","apply-evidence.3","apply-evidence.4","apply-evidence.5","apply-evidence.6","apply-evidence.9","apply-evidence.10","apply-evidence.11","apply-evidence.12","apply-evidence.22","apply-evidence.23","apply-evidence.24","apply-evidence.25","apply-evidence.26"],"no_calzan":[{"id":"apply-evidence.16","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false},{"id":"apply-evidence.17","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"apply-evidence.1","motivo":"estado previo al borrado: dos de los tres archivos dejan de existir en la misma tarea"},{"id":"apply-evidence.7","motivo":"requiere el servidor astro preview levantado durante la fase en 127.0.0.1:4329"},{"id":"apply-evidence.8","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.13","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.14","motivo":"baseline previo a widths/sizes: la Tarea 4 cambia el build medido"},{"id":"apply-evidence.15","motivo":"segunda corrida del baseline para comprobar determinismo; la Tarea 4 cambia el build medido"},{"id":"apply-evidence.18","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.19","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.20","motivo":"requiere Chrome headless y astro preview levantados durante la fase"},{"id":"apply-evidence.21","motivo":"usa scripts de simulaci\u00f3n del directorio de temporales del despacho"},{"id":"apply-evidence.27","motivo":"verify corre la suite completa sobre el mismo \u00e1rbol con evidencia propia"},{"id":"apply-evidence…(+788 caracteres)
```
<!-- evidencia:fin verify-report.24 -->

<!-- evidencia:inicio {"v":1,"id":"verify-report.25","forma":"argv","argv":["python3","/home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py","comprobar","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight","head":"567cbecef7abfd792924270003f73906e5247daf","fecha":"2026-10-03T01:39:25-03:00","exit":1,"sha256":"d9fa0075ac62b4039ff3966c912637ea2f8933e7e135a3fecb65ff5b6b6412f4","lineas":1,"omitidas":0,"no_recomprobable":"re-ejecutarlo comprobaria el informe a si mismo"} -->
**Evidencia `verify-report.25`** · exit 1 · 1 líneas, 0 omitidas · HEAD `567cbecef7ab` · 2026-10-03T01:39:25-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight`
No re-comprobable: re-ejecutarlo comprobaria el informe a si mismo

```text
python3 /home/kapridoo/.claude/skills/_shared/scripts/evidence_block.py comprobar /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md
```

```text
{"v":1,"informe":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/debt-assets-weight/memory/changes/debt-assets-weight/verify-report.md","bloques":22,"comprobados":16,"calzan":["verify-report.2","verify-report.3","verify-report.4","verify-report.5","verify-report.6","verify-report.7","verify-report.8","verify-report.9","verify-report.10","verify-report.11","verify-report.13","verify-report.14","verify-report.15","verify-report.20"],"no_calzan":[{"id":"verify-report.21","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false},{"id":"verify-report.23","causa":"distinto","exit_registrado":0,"exit_actual":0,"sha256_coincide":false,"visible_coincide":false}],"omitidos":[{"id":"verify-report.1","motivo":"la corrida completa de verify corre una sola vez y comprobar no la repite"},{"id":"verify-report.16","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.17","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.19","motivo":"requiere astro preview y Chrome headless propios de la corrida, que comprobar no levanta"},{"id":"verify-report.22","motivo":"el diff queda vacio cuando el cierre confirma las correcciones"},{"id":"verify-report.24","motivo":"comprobar sobre verify-report.md volveria a comprobar ese informe"}],"error":null}
```
<!-- evidencia:fin verify-report.25 -->


## Acciones Requeridas

Ninguna para el archive. Opcional: quitar la mención de Potrace de `README.md` (H-2).
