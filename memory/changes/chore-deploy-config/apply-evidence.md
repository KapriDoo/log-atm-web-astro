# Apply evidence — chore-deploy-config

Camino apply-only; fuente de tareas: `tasks.md` (T1–T5). Sin specs (`spec_refs: []`) y sin
tareas `[TDD]`: la evidencia son las salidas de los comandos de verificación de cada tarea.

## T1 — Nombre del Worker en `wrangler.toml`

Commit: `fad8cef` — `fix(deploy): declare the real Worker name in wrangler.toml`.

`name = "log-atm-web"` se declara en el nivel superior de `log-atm-web-astro/wrangler.toml`;
`main` y `assets` siguen sin declararse y el comentario explica por qué `name` sí se declara.
El bloque siguiente lee el `wrangler.json` que genera el adapter tras el build (el build que lo
produce sobre el árbol final es el comando del dashboard registrado en T5).

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.1","forma":"argv","argv":["node","-e","const j=require(\"./dist/server/wrangler.json\");console.log(JSON.stringify({name:j.name,main:j.main,assets:j.assets}))"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"fad8cef5d59799205316964416f6e9b19e1ab1e3","fecha":"2026-10-06T22:11:06-03:00","exit":0,"sha256":"08e17ad92c4a04348eec9a4a48b043f11c8b1603deffe1b75d45bcf949f20c71","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.1`** · exit 0 · 1 líneas, 0 omitidas · HEAD `fad8cef5d597` · 2026-10-06T22:11:06-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`

```text
node -e 'const j=require("./dist/server/wrangler.json");console.log(JSON.stringify({name:j.name,main:j.main,assets:j.assets}))'
```

```text
{"name":"log-atm-web","main":"entry.mjs","assets":{"binding":"ASSETS","directory":"../client"}}
```
<!-- evidencia:fin apply-evidence.1 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.2","forma":"argv","argv":["grep","-nE","^(name|main|assets)\\b","wrangler.toml"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"fad8cef5d59799205316964416f6e9b19e1ab1e3","fecha":"2026-10-06T22:11:06-03:00","exit":0,"sha256":"cf7b460245a668a65cd49539cada6ba0fff49ac3dd3a84438bf40d7d042554e3","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.2`** · exit 0 · 1 líneas, 0 omitidas · HEAD `fad8cef5d597` · 2026-10-06T22:11:06-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`

```text
grep -nE '^(name|main|assets)\b' wrangler.toml
```

```text
17:name = "log-atm-web"
```
<!-- evidencia:fin apply-evidence.2 -->

`apply-evidence.1` muestra el `name` generado igual al Worker real y `main`/`assets` provistos por
el adapter; `apply-evidence.2` muestra que `wrangler.toml` declara solo `name` de los tres.

## T2 — Node 24 como fuente única y paridad del contenedor

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.3","forma":"argv","argv":["npm","run","container:build"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"fad8cef5d59799205316964416f6e9b19e1ab1e3","fecha":"2026-10-06T22:13:38-03:00","exit":0,"sha256":"6b806d6aaf2ca8334975da364c553ee0af5c14ca725960a691f90ec74ffe3229","lineas":593,"omitidas":553,"no_recomprobable":"construye la imagen en el almacén de Podman; la salida incluye tiempos e ids de capas variables"} -->
**Evidencia `apply-evidence.3`** · exit 0 · 593 líneas, 553 omitidas · HEAD `fad8cef5d597` · 2026-10-06T22:13:38-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
No re-comprobable: construye la imagen en el almacén de Podman; la salida incluye tiempos e ids de capas variables

```text
npm run container:build
```

```text

> log-atm-web-astro@0.0.1 container:build
> podman build -t log-atm-web -f Containerfile .

STEP 1/8: FROM docker.io/library/node:24-slim
STEP 2/8: WORKDIR /app
--> e40c194d96ba
STEP 3/8: COPY package.json package-lock.json ./
--> cba4d9b37edd
STEP 4/8: RUN npm ci

added 448 packages, and audited 449 packages in 15s

167 packages are looking for funding
  run `npm fund` for details

20 vulnerabilities (2 low, 3 moderate, 14 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
--> b5c65ad9658f
STEP 5/8: COPY . .
--> 871d849b6f79
STEP 6/8: RUN npm run build

> log-atm-web-astro@0.0.1 build
> astro build

▶ Astro collects anonymous usage data.
  This information helps us improve Astro.
  Run "astro telemetry disable" to opt-out.
  https://astro.build/telemetry

01:11:51 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
01:11:51 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
```
<!-- evidencia:fin apply-evidence.3 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.4","forma":"archivo","argv":null,"texto":"# Contenedor log-atm-web (node:24-slim) servido en http://localhost:4321\npodman exec sdd-chore-deploy-config node --version\nfor ruta in / /en/ /pt/ /ruta-inexistente-sdd/; do\n  printf '%s %s\\n' \"$(curl -s -o /dev/null -w '%{http_code}' \"http://localhost:4321$ruta\")\" \"$ruta\"\ndone\nprintf 'POST /api/contacto payload inválido -\u003e '\ncurl -s -w ' %{http_code}\\n' -X POST -H 'Content-Type: application/json' -d '{}' http://localhost:4321/api/contacto\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"fad8cef5d59799205316964416f6e9b19e1ab1e3","fecha":"2026-10-06T22:14:04-03:00","exit":0,"sha256":"5e2ef792be09bbc937076c79de23dee2b4fc1de896d77060a027d855e0250b08","lineas":6,"omitidas":0,"no_recomprobable":"requiere el contenedor en ejecución, detenido al terminar la prueba"} -->
**Evidencia `apply-evidence.4`** · exit 0 · 6 líneas, 0 omitidas · HEAD `fad8cef5d597` · 2026-10-06T22:14:04-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
No re-comprobable: requiere el contenedor en ejecución, detenido al terminar la prueba

```bash
# Contenedor log-atm-web (node:24-slim) servido en http://localhost:4321
podman exec sdd-chore-deploy-config node --version
for ruta in / /en/ /pt/ /ruta-inexistente-sdd/; do
  printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:4321$ruta")" "$ruta"
done
printf 'POST /api/contacto payload inválido -> '
curl -s -w ' %{http_code}\n' -X POST -H 'Content-Type: application/json' -d '{}' http://localhost:4321/api/contacto
```

```text
v24.21.0
200 /
200 /en/
200 /pt/
404 /ruta-inexistente-sdd/
POST /api/contacto payload inválido -> {"ok":false,"error":"validation","fields":{"name":"Requerido.","email":"Requerido."}} 400
```
<!-- evidencia:fin apply-evidence.4 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.5","forma":"argv","argv":["podman","ps","-a","--filter","name=sdd-chore-deploy-config","--format","{{.Names}} {{.Status}}"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config","head":"fad8cef5d59799205316964416f6e9b19e1ab1e3","fecha":"2026-10-06T22:14:09-03:00","exit":0,"sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","lineas":0,"omitidas":0,"no_recomprobable":"el contenedor de la prueba ya no existe; otro contenedor del equipo podría aparecer en una re-ejecución"} -->
**Evidencia `apply-evidence.5`** · exit 0 · 0 líneas, 0 omitidas · HEAD `fad8cef5d597` · 2026-10-06T22:14:09-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config`
No re-comprobable: el contenedor de la prueba ya no existe; otro contenedor del equipo podría aparecer en una re-ejecución

```text
podman ps -a --filter name=sdd-chore-deploy-config --format '{{.Names}} {{.Status}}'
```

```text
```
<!-- evidencia:fin apply-evidence.5 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.6","forma":"argv","argv":["grep","-Hn","-e","^24$","-e","^FROM",".node-version","log-atm-web-astro/Containerfile"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config","head":"9260dc2de9f300bc20c8f97d3961b0816809ac50","fecha":"2026-10-06T22:14:27-03:00","exit":0,"sha256":"0a1a2d8e983fd68c400c881e6ef12565565318c2961adfa31ce88f7b1b818be5","lineas":2,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.6`** · exit 0 · 2 líneas, 0 omitidas · HEAD `9260dc2de9f3` · 2026-10-06T22:14:27-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config`

```text
grep -Hn -e '^24$' -e '^FROM' .node-version log-atm-web-astro/Containerfile
```

```text
.node-version:1:24
log-atm-web-astro/Containerfile:7:FROM docker.io/library/node:24-slim
```
<!-- evidencia:fin apply-evidence.6 -->

Commit: `9260dc2` — `fix(deploy): pin Node 24 via .node-version and align the container`.

`apply-evidence.6` muestra `.node-version` con `24` en la raíz y el `FROM` del `Containerfile`
sobre `node:24-slim`. Los bloques `apply-evidence.3` a `apply-evidence.5` se registraron con
los cambios de T2 en el árbol de trabajo, antes de su commit (por eso su HEAD es `fad8cef`):
`apply-evidence.3` es la construcción de la imagen, cuyo primer paso parte de `node:24-slim`;
`apply-evidence.4` es la prueba del contenedor en ejecución —Node 24 dentro de la imagen, 200
en `/`, `/en/` y `/pt/`, 404 en una ruta inexistente y 400 de la API ante un payload vacío—,
con el `.dev.vars` del checkout principal montado en solo lectura en la misma ruta que usa
`npm run container:run` (el worktree no tiene `.dev.vars`); `apply-evidence.5`, sin salida,
muestra que el contenedor de la prueba quedó detenido y eliminado.

## T3 — Script `build:ci` con type-check

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.7","forma":"argv","argv":["npm","run","build:ci"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.5et8Bkar/app","head":null,"fecha":"2026-10-06T22:14:40-03:00","exit":1,"sha256":"9da9a9e21df6f9ee578b7ebbc2733031a3c91021dc3740876ac1973cd78f70f2","lineas":18,"omitidas":0,"no_recomprobable":"corre sobre una copia aislada con un error de tipos introducido a propósito, eliminada tras la prueba"} -->
**Evidencia `apply-evidence.7`** · exit 1 · 18 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T22:14:40-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.5et8Bkar/app`
No re-comprobable: corre sobre una copia aislada con un error de tipos introducido a propósito, eliminada tras la prueba

```text
npm run build:ci
```

```text

> log-atm-web-astro@0.0.1 build:ci
> astro check && astro build

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.5et8Bkar/app/node_modules/astro/dist/cli/index.js' imported from /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.5et8Bkar/app/node_modules/astro/bin/astro.mjs
    at finalizeResolution (node:internal/modules/esm/resolve:271:11)
    at moduleResolve (node:internal/modules/esm/resolve:861:10)
    at defaultResolve (node:internal/modules/esm/resolve:988:11)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:697:20)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:714:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:746:52)
    at #resolve (node:internal/modules/esm/loader:679:17)
    at ModuleLoader.getOrCreateModuleJob (node:internal/modules/esm/loader:599:35)
    at node:internal/modules/esm/loader:628:32
    at TracingChannel.tracePromise (node:diagnostics_channel:362:14) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.5et8Bkar/app/node_modules/astro/dist/cli/index.js'
}
```
<!-- evidencia:fin apply-evidence.7 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.8","forma":"argv","argv":["ls","dist"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.5et8Bkar/app","head":null,"fecha":"2026-10-06T22:14:46-03:00","exit":2,"sha256":"ae0f465e7f1c68412695b778e1510b443f4381ddeafa630f7e057232c8c0bf65","lineas":1,"omitidas":0,"no_recomprobable":"corre sobre la copia aislada, eliminada tras la prueba"} -->
**Evidencia `apply-evidence.8`** · exit 2 · 1 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T22:14:46-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.5et8Bkar/app`
No re-comprobable: corre sobre la copia aislada, eliminada tras la prueba

```text
ls dist
```

```text
ls: cannot access 'dist': No such file or directory
```
<!-- evidencia:fin apply-evidence.8 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.9","forma":"argv","argv":["git","diff","--no-index","--no-color","/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro/src/lib/folio.ts","src/lib/folio.ts"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.mBkpqu6B/app","head":null,"fecha":"2026-10-06T22:14:59-03:00","exit":1,"sha256":"33d32e6f4c1738454110607fb323fed88487a1c5b9a60ce7c30a26ba1938b54b","lineas":11,"omitidas":0,"no_recomprobable":"copia aislada con un error de tipos introducido a propósito, eliminada tras la prueba"} -->
**Evidencia `apply-evidence.9`** · exit 1 · 11 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T22:14:59-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.mBkpqu6B/app`
No re-comprobable: copia aislada con un error de tipos introducido a propósito, eliminada tras la prueba

```text
git diff --no-index --no-color /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro/src/lib/folio.ts src/lib/folio.ts
```

```text
diff --git a/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro/src/lib/folio.ts b/src/lib/folio.ts
index f6f1908..cd2bbad 100644
--- a/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro/src/lib/folio.ts
+++ b/src/lib/folio.ts
@@ -11,3 +11,6 @@ export function generateFolio(): string {
   const rand = crypto.randomUUID().split('-')[0].toUpperCase(); // 8 hex chars
   return `LA-${ts}${rand}`;
 }
+
+// Error de tipos intencional para la prueba de build:ci (solo en la copia aislada)
+export const errorDeTiposIntencional: number = "no es un número";
```
<!-- evidencia:fin apply-evidence.9 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.10","forma":"argv","argv":["npm","run","build:ci"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.mBkpqu6B/app","head":null,"fecha":"2026-10-06T22:15:07-03:00","exit":1,"sha256":"4559251581249d4ed729d462d2cab825f0c8be8b6fb2d840dce8771b41c437af","lineas":24,"omitidas":0,"no_recomprobable":"copia aislada con un error de tipos introducido a propósito, eliminada tras la prueba"} -->
**Evidencia `apply-evidence.10`** · exit 1 · 24 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T22:15:07-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.mBkpqu6B/app`
No re-comprobable: copia aislada con un error de tipos introducido a propósito, eliminada tras la prueba

```text
npm run build:ci
```

```text

> log-atm-web-astro@0.0.1 build:ci
> astro check && astro build

22:15:01 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
22:15:01 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
22:15:01 [vite] Re-optimizing dependencies because vite config has changed
22:15:02 [vite] ✨ new dependencies optimized: @astrojs/cloudflare/entrypoints/server
22:15:02 [vite] ✨ optimized dependencies changed. reloading
22:15:02 [vite] [vite] program reload
22:15:03 [vite] Re-optimizing dependencies because vite config has changed
22:15:03 [vite] Re-optimizing dependencies because vite config has changed
22:15:03 [types] Generated 2.23s
22:15:03 [check] Getting diagnostics for Astro files in /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.mBkpqu6B/app...
�[96msrc/lib/folio.ts�[0m:�[93m16�[0m:�[93m14�[0m - �[91merror�[0m�[90m ts(2322): �[0mType 'string' is not assignable to type 'number'.

�[7m16�[0m export const errorDeTiposIntencional: number = "no es un número";
�[7m  �[0m �[91m             ~~~~~~~~~~~~~~~~~~~~~~~�[0m

Result (51 files): 
- 1 error
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.10 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.11","forma":"argv","argv":["ls","dist"],"texto":null,"cwd":"/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.mBkpqu6B/app","head":null,"fecha":"2026-10-06T22:15:07-03:00","exit":2,"sha256":"ae0f465e7f1c68412695b778e1510b443f4381ddeafa630f7e057232c8c0bf65","lineas":1,"omitidas":0,"no_recomprobable":"copia aislada, eliminada tras la prueba"} -->
**Evidencia `apply-evidence.11`** · exit 2 · 1 líneas, 0 omitidas · HEAD `sin-git` · 2026-10-06T22:15:07-03:00 · `/tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/copia-build-ci.mBkpqu6B/app`
No re-comprobable: copia aislada, eliminada tras la prueba

```text
ls dist
```

```text
ls: cannot access 'dist': No such file or directory
```
<!-- evidencia:fin apply-evidence.11 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.12","forma":"argv","argv":["grep","-nE","\"(build|build:ci|check)\":","package.json"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"9260dc2de9f300bc20c8f97d3961b0816809ac50","fecha":"2026-10-06T22:15:14-03:00","exit":0,"sha256":"466fad6767946d8811316e7c72a08c29865332b9c581e904ae0c37250df012df","lineas":3,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.12`** · exit 0 · 3 líneas, 0 omitidas · HEAD `9260dc2de9f3` · 2026-10-06T22:15:14-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`

```text
grep -nE '"(build|build:ci|check)":' package.json
```

```text
10:    "build": "astro build",
11:    "build:ci": "astro check && astro build",
13:    "check": "astro check",
```
<!-- evidencia:fin apply-evidence.12 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.13","forma":"argv","argv":["npm","run","build:ci"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"9260dc2de9f300bc20c8f97d3961b0816809ac50","fecha":"2026-10-06T22:15:30-03:00","exit":0,"sha256":"20408d1a123c38dcfab7f99ab2bbd90b0f82c7b6a4474749536e69eee05dd8c5","lineas":536,"omitidas":496,"no_recomprobable":"la salida incluye marcas de tiempo y duraciones variables; regenera dist/ (ignorado por git)"} -->
**Evidencia `apply-evidence.13`** · exit 0 · 536 líneas, 496 omitidas · HEAD `9260dc2de9f3` · 2026-10-06T22:15:30-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
No re-comprobable: la salida incluye marcas de tiempo y duraciones variables; regenera dist/ (ignorado por git)

```text
npm run build:ci
```

```text

> log-atm-web-astro@0.0.1 build:ci
> astro check && astro build

22:15:16 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
22:15:16 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
22:15:18 [types] Generated 1.29s
22:15:18 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

22:15:23 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
22:15:23 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
22:15:24 [types] Generated 1.25s
22:15:24 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
22:15:25 [build] output: "static"
22:15:25 [build] mode: "server"
22:15:25 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro/dist/
22:15:25 [build] adapter: @astrojs/cloudflare
22:15:25 [build] Collecting build info...
22:15:25 [build] ✓ Completed in 1.67s.
22:15:25 [build] Building server entrypoints...
22:15:27 [vite] ✓ built in 2.06s
22:15:28 [vite] ✓ built in 1.37s
22:15:29 [vite] ✓ built in 679ms

 prerendering static routes 
22:15:29   ├─ /contacto/index.html (+20ms) 
22:15:29   ├─ /cotizar/index.html (+11ms) 
22:15:29   ├─ /industrias/index.html (+26ms) 
22:15:29   ├─ /nosotros/index.html (+14ms) 
22:15:29   ├─ /servicios/index.html (+22ms) 
22:15:29   ├─ /en/contacto/index.html (+10ms) 
22:15:29   ├─ /pt/contacto/index.html (+10ms) 
22:15:29   ├─ /en/cotizar/index.html (+9ms) 
22:15:29   ├─ /pt/cotizar/index.html (+9ms) 
```
<!-- evidencia:fin apply-evidence.13 -->

Commit: `b4db4d7` — `feat(build): add build:ci script that type-checks before building`.

Prueba de fallo en copia aislada (bajo el directorio de temporales del despacho, fuera del
worktree, eliminada al terminar):

- `apply-evidence.7` y `apply-evidence.8` **no son evidencia válida de la prueba**: la primera
  copia excluyó por error todo directorio `dist` (también `node_modules/astro/dist`), y
  `build:ci` falló por un módulo ausente, no por el error de tipos. Se conservan sin renumerar y
  esa copia se descartó.
- `apply-evidence.9` muestra el error de tipos introducido en la segunda copia (con exclusiones
  ancladas a la raíz de la app); `apply-evidence.10` muestra que `build:ci` termina con exit 1 en
  `astro check` (`ts(2322)`, 1 error) sin que el build llegue a ejecutarse, y
  `apply-evidence.11` que la copia no tiene `dist/`.

En el worktree, `apply-evidence.12` muestra `build` sin cambios (`astro build`) junto a
`build:ci` y `check`, y `apply-evidence.13` muestra `build:ci` con exit 0: `astro check` con 0
errores y luego el build. Estos dos bloques se registraron con T3 aún sin commit (HEAD
`9260dc2`).

## T4 — README (despliegue) y ADR-0011

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.14","forma":"argv","argv":["grep","-n","-e","build:ci","-e","node-version","-e","NODE_VERSION","-e","a confirmar","log-atm-web-astro/README.md","memory/adrs/0011-type-check-separate-from-build.md"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:16:31-03:00","exit":0,"sha256":"6edadba4b81ea241a81404131005deae447f544c5d914f308c116ce26a14132a","lineas":13,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.14`** · exit 0 · 13 líneas, 0 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:16:31-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config`

```text
grep -n -e build:ci -e node-version -e NODE_VERSION -e 'a confirmar' log-atm-web-astro/README.md memory/adrs/0011-type-check-separate-from-build.md
```

```text
log-atm-web-astro/README.md:42:**Node.js:** 24, fijado en `.node-version` en la raíz del repositorio (fuente única para
log-atm-web-astro/README.md:56:| `npm run build:ci` | Verifica tipos (`astro check`) y luego compila; es el build de Workers Builds |
log-atm-web-astro/README.md:71:  `npm run build:ci`, el build de Workers Builds, que se detiene ante un error de tipos.
log-atm-web-astro/README.md:135:| Comando de build | `cd log-atm-web-astro && npm ci && npm run build:ci` |
log-atm-web-astro/README.md:139:| Node | 24, desde `.node-version` en la raíz del repositorio |
log-atm-web-astro/README.md:144:- **Versión de Node:** la única fuente es `.node-version`. No se define `NODE_VERSION` en el
log-atm-web-astro/README.md:147:- **Type-check en CI:** `npm run build:ci` ejecuta `astro check` antes de `astro build`; un
log-atm-web-astro/README.md:151:  Settings → Build. El comando de build pasa a `npm run build:ci` después de integrar en `main`
log-atm-web-astro/README.md:153:  siguiente build, el log debe mostrar que Workers Builds detecta Node 24 desde `.node-version`.
memory/adrs/0011-type-check-separate-from-build.md:30:- El type-check corre en CI mediante `npm run build:ci` (`astro check && astro build`), el
memory/adrs/0011-type-check-separate-from-build.md:32:  (`cd log-atm-web-astro && npm ci && npm run build:ci`). Un error de tipos detiene el build
memory/adrs/0011-type-check-separate-from-build.md:63:  encadenamiento queda limitado al build de CI (`build:ci`).
memory/adrs/0011-type-check-separate-from-build.md:73:CI vía `build:ci`.
```
<!-- evidencia:fin apply-evidence.14 -->

Commit: `50dc86f` — `docs(deploy): document the Workers Builds configuration and CI type-check`.

`apply-evidence.14` muestra las menciones de `build:ci` y `.node-version` en el README (tabla
de comandos, línea de Node, tabla de despliegue y paso del dashboard) y en ADR-0011 (decisión y
alternativas), sin ningún «a confirmar»; `NODE_VERSION` aparece solo en la indicación de no
definirlo en el dashboard.

## T5 — Verificación integral

Sin cambios de código. Los comandos corren sobre el árbol final (HEAD `50dc86f` más el
workspace del cambio sin commit, que no afecta a la app).

Comando actual del dashboard de Workers Builds, ejecutado desde la raíz del worktree:

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.15","forma":"archivo","argv":null,"texto":"cd log-atm-web-astro && npm ci && npm run build\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:18:29-03:00","exit":0,"sha256":"ffc5849f175a38acd060f4798429607a00b266932b7bec716c78a4f24aa33389","lineas":545,"omitidas":505,"no_recomprobable":"reinstala node_modules y regenera dist/ (ignorados por git); la salida incluye marcas de tiempo y duraciones variables"} -->
**Evidencia `apply-evidence.15`** · exit 0 · 545 líneas, 505 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:18:29-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config`
No re-comprobable: reinstala node_modules y regenera dist/ (ignorados por git); la salida incluye marcas de tiempo y duraciones variables

```bash
cd log-atm-web-astro && npm ci && npm run build
```

```text

added 448 packages, and audited 449 packages in 7s

167 packages are looking for funding
  run `npm fund` for details

20 vulnerabilities (2 low, 3 moderate, 14 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

> log-atm-web-astro@0.0.1 build
> astro build

22:16:56 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
22:16:56 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
22:16:57 [vite] ✨ new dependencies optimized: @astrojs/cloudflare/entrypoints/server
22:16:57 [vite] ✨ optimized dependencies changed. reloading
22:16:57 [vite] [vite] program reload
22:16:58 [types] Generated 1.90s
22:16:58 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
22:16:58 [build] output: "static"
22:16:58 [build] mode: "server"
22:16:58 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro/dist/
22:16:58 [build] adapter: @astrojs/cloudflare
22:16:58 [build] Collecting build info...
22:16:58 [build] ✓ Completed in 2.35s.
22:16:58 [build] Building server entrypoints...
22:17:00 [vite] ✓ built in 2.06s
22:17:02 [vite] ✓ built in 1.38s
22:17:03 [vite] ✓ built in 665ms

 prerendering static routes 
```
<!-- evidencia:fin apply-evidence.15 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.16","forma":"argv","argv":["node","-e","const j=require(\"./dist/server/wrangler.json\");console.log(JSON.stringify({name:j.name,main:j.main,assets:j.assets}))"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:18:35-03:00","exit":0,"sha256":"08e17ad92c4a04348eec9a4a48b043f11c8b1603deffe1b75d45bcf949f20c71","lineas":1,"omitidas":0,"no_recomprobable":null} -->
**Evidencia `apply-evidence.16`** · exit 0 · 1 líneas, 0 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:18:35-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`

```text
node -e 'const j=require("./dist/server/wrangler.json");console.log(JSON.stringify({name:j.name,main:j.main,assets:j.assets}))'
```

```text
{"name":"log-atm-web","main":"entry.mjs","assets":{"binding":"ASSETS","directory":"../client"}}
```
<!-- evidencia:fin apply-evidence.16 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.17","forma":"argv","argv":["npm","run","build:ci"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:18:51-03:00","exit":0,"sha256":"8539d1474a24379d9c94a66591ebad0f85e47efb066cf1f3c64b5d821f4df062","lineas":536,"omitidas":496,"no_recomprobable":"la salida incluye marcas de tiempo y duraciones variables; regenera dist/ (ignorado por git)"} -->
**Evidencia `apply-evidence.17`** · exit 0 · 536 líneas, 496 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:18:51-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
No re-comprobable: la salida incluye marcas de tiempo y duraciones variables; regenera dist/ (ignorado por git)

```text
npm run build:ci
```

```text

> log-atm-web-astro@0.0.1 build:ci
> astro check && astro build

22:18:37 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
22:18:37 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
22:18:39 [types] Generated 1.31s
22:18:39 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

22:18:44 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
22:18:44 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
22:18:45 [types] Generated 1.27s
22:18:45 [log-atm:i18n-validator] [i18n] Validando paridad de claves...
[i18n] en: OK (536 claves)
[i18n] pt: OK (536 claves)
22:18:46 [build] output: "static"
22:18:46 [build] mode: "server"
22:18:46 [build] directory: /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro/dist/
22:18:46 [build] adapter: @astrojs/cloudflare
22:18:46 [build] Collecting build info...
22:18:46 [build] ✓ Completed in 1.69s.
22:18:46 [build] Building server entrypoints...
22:18:48 [vite] ✓ built in 2.17s
22:18:49 [vite] ✓ built in 1.46s
22:18:50 [vite] ✓ built in 696ms

 prerendering static routes 
22:18:51   ├─ /contacto/index.html (+24ms) 
22:18:51   ├─ /cotizar/index.html (+13ms) 
22:18:51   ├─ /industrias/index.html (+23ms) 
22:18:51   ├─ /nosotros/index.html (+16ms) 
22:18:51   ├─ /servicios/index.html (+24ms) 
22:18:51   ├─ /en/contacto/index.html (+10ms) 
22:18:51   ├─ /pt/contacto/index.html (+10ms) 
22:18:51   ├─ /en/cotizar/index.html (+10ms) 
22:18:51   ├─ /pt/cotizar/index.html (+10ms) 
```
<!-- evidencia:fin apply-evidence.17 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.18","forma":"argv","argv":["npm","run","check"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:19:02-03:00","exit":0,"sha256":"bf3465d3e5608f12f5ae97b8a47ce617bde806747a2010b55b920ec146aff795","lineas":13,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.18`** · exit 0 · 13 líneas, 0 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:19:02-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run check
```

```text

> log-atm-web-astro@0.0.1 check
> astro check

22:18:57 [@astrojs/cloudflare] Enabling compile-time image optimization. Images will be pre-optimized at build time.
22:18:57 [@astrojs/cloudflare] Enabling sessions with Cloudflare KV with the "SESSION" KV binding.
22:18:58 [types] Generated 1.30s
22:18:58 [check] Getting diagnostics for Astro files in /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro...
Result (51 files): 
- 0 errors
- 0 warnings
- 0 hints

```
<!-- evidencia:fin apply-evidence.18 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.19","forma":"argv","argv":["npm","run","validate-i18n"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:19:03-03:00","exit":0,"sha256":"998abcef00777caba688a15f6cd7f54bc50cfd323cdd82776159426fdde58ffd","lineas":6,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.19`** · exit 0 · 6 líneas, 0 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:19:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
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
<!-- evidencia:fin apply-evidence.19 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.20","forma":"argv","argv":["npm","run","check-i18n-links"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:19:03-03:00","exit":0,"sha256":"d805cf2183837cc3193fe469b7827226292871c3960f9b806317d8bc43db8c51","lineas":5,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.20`** · exit 0 · 5 líneas, 0 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:19:03-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
npm run check-i18n-links
```

```text

> log-atm-web-astro@0.0.1 check-i18n-links
> tsx scripts/check-i18n-links.ts

[i18n-links] 18 páginas (es=6, en=6, pt=6), 411 enlaces internos evaluados, 0 violaciones
```
<!-- evidencia:fin apply-evidence.20 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.21","forma":"argv","argv":["env","CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome","npm","run","a11y"],"texto":null,"cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:19:27-03:00","exit":1,"sha256":"a80aaa0001ee5b133e8abf3d1280c6b02aeb2aa1e9678c17b9bcffe77d11dee6","lineas":70,"omitidas":30,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.21`** · exit 1 · 70 líneas, 30 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:19:27-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```text
env CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y
```

```text

> log-atm-web-astro@0.0.1 a11y
> node scripts/axe-audit.mjs

Auditando 21 URLs (18 páginas, 3 sondas 404) en escritorio y móvil…
[escritorio] / label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] / label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /en/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[escritorio] /en/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[escritorio] /nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/contacto/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/cotizar/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/industrias/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/nosotros/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /pt/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]
[escritorio] /pt/servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → #lang-trigger
[escritorio] /servicios/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
```
<!-- evidencia:fin apply-evidence.21 -->

<!-- evidencia:inicio {"v":1,"id":"apply-evidence.22","forma":"archivo","argv":null,"texto":"# Resumen de la auditoría a11y: violaciones por regla y por elemento (para contrastar con la deuda registrada)\nCHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y \u003e /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt 2\u003e&1\necho \"exit a11y: $?\"\ngrep -E '^\\[(escritorio|móvil)\\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt | wc -l | sed 's/^/violaciones (nodos): /'\ngrep -E '^\\[(escritorio|móvil)\\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt | awk '{print $1, $3}' | sort | uniq -c\ngrep -E '^\\[(escritorio|móvil)\\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt | sed 's/.*→ //' | sed 's/aria-label=\"[^\"]*\"/aria-label=…/' | sort | uniq -c\ntail -n 5 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt\n","cwd":"/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro","head":"50dc86f9945ec5c4618b58cbd68bc457d05c033d","fecha":"2026-10-06T22:20:15-03:00","exit":0,"sha256":"807c2cf8495b104f442ffc488d983d727c8313c4133e4b37b1fb30943feef163","lineas":11,"omitidas":0,"no_recomprobable":"verify corre la suite completa sobre el mismo árbol con evidencia propia"} -->
**Evidencia `apply-evidence.22`** · exit 0 · 11 líneas, 0 omitidas · HEAD `50dc86f9945e` · 2026-10-06T22:20:15-03:00 · `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/log-atm-web-astro`
No re-comprobable: verify corre la suite completa sobre el mismo árbol con evidencia propia

```bash
# Resumen de la auditoría a11y: violaciones por regla y por elemento (para contrastar con la deuda registrada)
CHROME_PATH=/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome npm run a11y > /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt 2>&1
echo "exit a11y: $?"
grep -E '^\[(escritorio|móvil)\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt | wc -l | sed 's/^/violaciones (nodos): /'
grep -E '^\[(escritorio|móvil)\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt | awk '{print $1, $3}' | sort | uniq -c
grep -E '^\[(escritorio|móvil)\]' /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt | sed 's/.*→ //' | sed 's/aria-label="[^"]*"/aria-label=…/' | sort | uniq -c
tail -n 5 /tmp/sdd-temporales-kapridoo/log-atm-web-astro-f0812733d673/chore-deploy-config/sdd-apply-mtb7l764/a11y-resumen.UDYg2Hwa/salida-a11y.txt
```

```text
exit a11y: 1
violaciones (nodos): 63
     42 [escritorio] label-content-name-mismatch
     21 [móvil] label-content-name-mismatch
     42 a[aria-label=…]
     21 #lang-trigger
[móvil] /__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Inicio"]
[móvil] /en/__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Home"]
[móvil] /pt/__a11y-404__/ label-content-name-mismatch (serious) Elements must have their visible text as part of their accessible name → a[aria-label="LOG ATM — Início"]

Resumen: 42 auditorías (21 URLs × 2 tamaños: 18 páginas, 3 sondas 404) · 63 violaciones en 1 reglas · 0 estados HTTP inesperados
```
<!-- evidencia:fin apply-evidence.22 -->

Lectura de la verificación integral:

- `apply-evidence.15`: el comando actual del dashboard (`cd log-atm-web-astro && npm ci && npm
  run build`, desde la raíz del worktree, que es el directorio raíz `/` de Workers Builds)
  termina con exit 0. Es el comando con el que corre el check «Workers Builds: log-atm-web» del
  pull request.
- `apply-evidence.16`: sobre el build del árbol final, `dist/server/wrangler.json` tiene
  `"name": "log-atm-web"` (T1).
- `apply-evidence.17`: `npm run build:ci` termina con exit 0 sobre el árbol final (T3).
- Corrida completa de cierre (comandos de verificación del perfil): `apply-evidence.18`
  (`npm run check`, 0 errores), `apply-evidence.19` (`npm run validate-i18n`, paridad es/en/pt)
  y `apply-evidence.20` (`npm run check-i18n-links`, 0 violaciones) terminan con exit 0.
  `apply-evidence.21` (`npm run a11y`) termina con exit 1; `apply-evidence.22` resume esa
  auditoría: 63 nodos, una sola regla (`label-content-name-mismatch`), 42 en el enlace de marca
  (21 URLs × escritorio y móvil) y 21 en `#lang-trigger` (solo escritorio). Coincide con la
  deuda preexistente registrada en `observations.md` por `chore-local-container-podman`
  (63 nodos, misma regla y mismos elementos): no es una falla introducida por este cambio, que
  no toca `src/`.
- Contenedor: la prueba de T2 (`apply-evidence.3` a `apply-evidence.5`) corrió con el
  `Containerfile` y la app del árbol final; los commits posteriores (T3, T4) solo agregan el
  script `build:ci` y documentación.
