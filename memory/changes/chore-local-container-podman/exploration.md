# Exploración: chore-local-container-podman

Alcance: las seis preguntas del despacho. Toda prueba de humo corrió en copias aisladas bajo el directorio de temporales del despacho (`git archive` del worktree); no se modificó código del repo. Al terminar no quedan contenedores, imágenes, procesos ni puertos abiertos.

Specs vigentes: ninguna cubre despliegue, contenedor, type-check ni auditoría a11y (`spec_refs: []`; grep de `nginx|docker|podman|Dockerfile` en `memory/specs` y `memory/adrs` sin resultados). Las secciones se apoyan en código, historial git y evidencia de ejecución. Entorno de la prueba: Podman 6.1.2 rootless (netavark + pasta), WSL2 con `localhost` resuelto solo a `::1`, Node 24.15 en host, `node:22-slim` (22.23.3) en contenedor.

## Estado Actual

### 1. Flujo de despliegue vigente a Cloudflare [fuente: código, historial git y GitHub]

**Respuesta: Workers Builds con integración git (Worker `log-atm-web`). No hay `wrangler deploy` manual.**

Evidencia:

- `gh pr view 36 --json statusCheckRollup,comments`: el PR #36 tiene el check `Workers Builds: log-atm-web` con conclusión `SUCCESS`, enlazado a `dash.cloudflare.com/.../workers/services/view/log-atm-web/production/builds/<id>`, y un comentario del bot `cloudflare-workers-and-pages` ("Deploying with Cloudflare Workers ... integrating Git with Workers", fila `log-atm-web`, commit `93e8701d`).
- `gh api repos/KapriDoo/log-atm-web-astro/commits/main/check-runs`: el mismo check `Workers Builds: log-atm-web` (app `cloudflare-workers-and-pages`) figura sobre `main`. Cada push (rama de feature o `main`) dispara un build; `main` es producción.
- Historial: `11008c2` (2026-05-13) migró de Cloudflare Pages a Workers porque el dashboard fallaba con `The name 'ASSETS' is reserved in Pages projects`; `dbac45b` ajustó el validador i18n porque "Cloudflare Pages build" no tenía loader TS. Ambos son errores de build alojado, no locales.
- `wrangler.toml` documenta que `SMTP_PASS` es Secret del dashboard y que "las vars del dashboard pisan estas para Production/Preview".
- Ausencias confirmadas: sin `.github/workflows`, sin script `deploy` en `package.json`, `wrangler` no es dependencia directa (llega como peer del adapter).
- `wrangler` no está instalado globalmente; `npx wrangler` 4.90.1 (transitivo) funciona sin login para `--version`, `types` y `dev`. Sin credenciales no se puede leer la configuración del dashboard.

Hechos adicionales:

- `dist/server/wrangler.json` (generado por el adapter) trae `name: "log-atm-web-astro"` (nombre del `package.json`), distinto del Worker `log-atm-web` del dashboard, y agrega un `kv_namespaces: [{binding: "SESSION"}]` automático (el adapter v13 habilita sesiones con KV por defecto, sin uso en el sitio). [fuente: código `dist/server/wrangler.json` del build, `@astrojs/cloudflare/dist/index.d.ts`]
- Comentarios obsoletos que aún dicen "Cloudflare Pages": `astro.config.mjs:14`, `.dev.vars.example:3`, `memory/_profile.md` ("Deploy Target: Cloudflare Pages").

**Preguntas abiertas para la propuesta (no determinables sin dashboard):** (a) comando de build y de deploy configurados en Workers Builds (si el build es `npm run build`, encadenar `astro check` en ese script bloquearía el deploy a producción ante un error de tipos); (b) directorio raíz configurado (la app vive en `log-atm-web-astro/`); (c) cómo se reconcilia el nombre `log-atm-web-astro` del `wrangler.json` generado con el Worker `log-atm-web`; (d) versión de Node del entorno de build. El brief declara fuera de alcance cambiar el dashboard, así que la documentación debe describir lo observado y marcar (a)-(d) como dato a confirmar por el dueño del dashboard.

### 2. Viabilidad de workerd en contenedor rootless [fuente: código + ejecución]

Versiones (de `npm ls`): `@astrojs/cloudflare@13.5.0`, `astro@6.3.1`, `wrangler@4.90.1` (peer `^4.83.0` del adapter), `workerd@1.20260508.1` (`@cloudflare/workerd-linux-64`, solo glibc), `@cloudflare/vite-plugin@1.36.4`, `miniflare@4.20260508.0`, `vite@7.3.2`.

Mecánica de `astro preview` con el adapter: `@astrojs/cloudflare/entrypoints/preview` exige `.wrangler/deploy/config.json` (lo escribe el build; apunta a `dist/server/wrangler.json`) y levanta `vite preview` con `@cloudflare/vite-plugin` (workerd vía miniflare, en proceso). `astro.config.mjs` se vuelve a evaluar al arrancar. `prerenderEnvironment` por defecto es `workerd`, por eso el build también necesita workerd (glibc).

Prueba de humo con un Containerfile provisional (un solo stage: `docker.io/library/node:22-slim`, `npm ci`, `COPY . .`, `npm run build`, `CMD npx astro preview --host ... --port 4321`):

| Hecho | Resultado |
|---|---|
| `podman build` rootless | OK, 2 min 17 s (16 CPU); `astro build` completo con workerd en la imagen; imagen final 866 MB (incluye devDependencies) |
| Arranque de `astro preview` | `ready in 62 ms`; responde a los ~4 s del `podman run` |
| `GET /`, `/en/`, `/pt/` | 200 |
| `/no-existe`, `/en/no-existe`, `/pt/no-existe`, `/_astro/nope.js` | 404 (sin soft-404) |
| `/servicios` | 307 (redirección a la barra final) |
| `POST /api/contacto` con payload inválido | 400 `{"ok":false,"error":"validation",...}`; `GET /api/contacto` 405 |
| `robots.txt`, `sitemap-index.xml` | 200 |
| `wrangler dev --config dist/server/wrangler.json --ip 0.0.0.0 --port 4321` (mismo contenedor) | Mismos resultados; arranca en ~2 s; lista bindings `SESSION`, `ASSETS` y las vars |

Hallazgos que afectan el diseño:

1. **`--env-file .dev.vars` solo no inyecta secretos.** Con `podman run --env-file fake.dev.vars` el worker responde `Missing env var: SMTP_PASS`: las variables de proceso no son bindings. Funcionan dos formas: (i) `-v <ruta>/.dev.vars:/app/dist/server/.dev.vars:ro` (el `.dev.vars` se busca junto al config redirigido `dist/server/`, no en `/app/`; montarlo en `/app/.dev.vars` NO funciona); (ii) `--env-file .dev.vars -e CLOUDFLARE_INCLUDE_PROCESS_ENV=true` (wrangler/miniflare imprime "Using secrets defined in process.env"; todo el entorno del proceso, incluidas `HOME`, `NODE_VERSION`, etc., pasa a ser binding). En ambas, el valor de `.dev.vars` pisó al `[vars]` del `wrangler.toml` (el intento de SMTP fue a `127.0.0.1:1`). Con (ii) y el formato de `.dev.vars.example` (valores sin comillas) no hay problema; `wrangler.toml:9` sugiere `SMTP_PASS="..."` con comillas, y Podman no procesa comillas en `--env-file` (comportamiento conocido, no verificado aquí).
2. **Sin `.containerignore`/`.dockerignore`, `COPY . .` copia `.dev.vars` a la imagen.** Reproducido con un Containerfile de prueba (`COPY . /ctx` + `ls -a`): aparece `.dev.vars`. El repo no tiene ninguno (`.gitignore` no lo sustituye). Con `.containerignore` (`node_modules`, `dist`, `.astro`, `.wrangler`, `chrome`, `.dev.vars`, `.dev.vars.*` salvo el `.example`, `.git`), `podman history --no-trunc` + `podman inspect` dieron 0 coincidencias de `FAKE_SECRET`/`SMTP_PASS` y el barrido del sistema de archivos de la imagen tampoco halló el secreto. Sin ignorar `chrome/` el contexto incluiría ~376 MB de Chrome local (existe en el checkout principal, gitignored).
3. **`localhost` en este WSL2 resuelve solo a `::1`** (`getent hosts localhost` → `::1`). Con `--host 0.0.0.0` el publicado `-p 14321:4321` responde en `127.0.0.1` (200) pero `curl http://localhost:14321/` falla (exit 56, reset). Con `astro preview --host ::` (y con `wrangler dev --ip ::`) responden 200 `127.0.0.1`, `localhost` y `[::1]`. El criterio de aceptación del brief usa `http://localhost:4321`, así que el bind del servidor dentro del contenedor importa.
4. **El quirk del 500 tras cada build no se corrige con ninguna de las dos opciones, pero el contenedor lo evita por construcción.** Reproducido en host (copia aislada): `astro preview` sirviendo, `astro build` de nuevo, sin relanzar → `/` y `/en/` 500, `/no-existe` 404 (el log del preview lo confirma). Con `wrangler dev --config dist/server/wrangler.json` el mismo experimento da 404 en `/` y `/en/` (recarga el worker pero queda con el directorio de assets viejo) y no se recupera sin relanzar. En un contenedor el build ocurre una sola vez al construir la imagen y el servidor arranca después, de modo que la secuencia que produce el quirk no se da. Para el flujo local sin contenedor (`npm run preview`) el quirk persiste y se documenta tal cual.

Podman rootless 6.1.2 en este WSL2: build, `run -d -p`, `exec`, `logs` y `rm` funcionaron sin errores. Docker no está instalado. Registro `docker.io` accesible; usar nombre completamente calificado (`docker.io/library/node:22-slim`).

### 3. `docker-compose.yml` y `fix-wsl2-port.bat` [fuente: código `docker-compose.yml`, `fix-wsl2-port.bat`]

- Ambos existen en la raíz del repo (fuera de `log-atm-web-astro/`), tracked, introducidos en `a2826b3` (2026-04-26). **El brief se equivoca al decir que "no existe archivo compose"**; `log-atm-web-astro/README.md:62` (`docker compose up --build`, "desde la raíz del repositorio") sí tiene un compose que ejecutar, solo que sirve nginx en `4321:80`.
- `docker-compose.yml`: `build.context: ./log-atm-web-astro`, `dockerfile: Dockerfile`, imagen `log-atm-web:latest`, `ports: "4321:80"`, healthcheck con `wget` a `http://localhost/` (nginx), clave `version: '3.8'` obsoleta, y un servicio `dev` comentado sobre `node:22-alpine` (incompatible con workerd/musl). Queda obsoleto: depende de `Dockerfile` (a eliminar) y del puerto 80 de nginx. Ningún otro archivo lo referencia salvo el README de la app y las notas de `sdd-init`.
- `fix-wsl2-port.bat`: script de Windows (admin) que lee la IP de WSL con `wsl -d Ubuntu` (distro fijada; este WSL es `arch-wsl`), reinicia reglas `netsh portproxy` de `127.0.0.1`/`0.0.0.0` puerto 4321 hacia la IP de WSL y crea la regla de firewall "WSL2 Podman 4321". No referencia nginx ni Docker; apunta a Podman y al puerto 4321, que es el mismo que usará el nuevo contenedor. Ningún documento lo menciona. No se puede probar desde WSL si el portproxy sigue haciendo falta con pasta; queda como decisión de diseño: conservarlo/documentarlo (con el nombre de distro parametrizado) o retirarlo.

### 4. Type-check [fuente: ejecución en copia aislada]

- `typescript`/`@astrojs/check` no están en `package.json` ni en el lockfile; `tsc` no está disponible.
- **Trampa de versión:** `npm i -D typescript` resuelve `7.0.2` (dist-tag `latest` hoy), fuera del peer `typescript ^5.0.0 || ^6.0.0` de `@astrojs/check@0.9.10` (npm lo marca `invalid`). Hay que fijar `typescript@^6` (resolvió 6.0.3) o `^5`; con `^6` todo corrió limpio.
- `npx astro check` (50 archivos) y `npx tsc --noEmit` (tras `astro sync`) coinciden: **4 errores + 1 hint**. Sin `astro sync` previo, `tsc` suma ~30 falsos `TS2307` por imports `.jpeg` (`astro check` ejecuta el sync por sí mismo):

| # | Archivo | Error | Causa |
|---|---|---|---|
| 1 | `src/lib/mailer.ts:2` | TS2307 `cloudflare:workers` | no hay declaración del módulo del runtime |
| 2 | `astro.config.mjs:51` | TS2353 `platformProxy` no existe en `Options` | opción eliminada en el adapter v13 (`Options` solo acepta `imageService`, `sessionKVBindingName`, `imagesBindingName`, `prerenderEnvironment`, `experimental`, `configPath`...); se pasa a `cfVitePlugin` y se ignora |
| 3 | `astro.config.mjs:21` | TS7031 `logger` implícitamente `any` | el hook `astro:build:start` del integration inline no tiene tipo (`// @ts-check`) |
| 4 | `src/scripts/gsap-ind-directory.ts:99` | TS2322 `number` → `Timeout` | `timer` se declara `ReturnType<typeof setInterval>` (`NodeJS.Timeout`) y se asigna `window.setInterval` (`number`) |
| hint | `scripts/axe-audit.mjs:4` | `axe` declarado y no leído | script roto (ver §5) |

Opciones para los tipos de `cloudflare:workers` (medidas con `astro check`):

| Opción | Resultado |
|---|---|
| `wrangler types` (runtime completo, `worker-configuration.d.ts`) | Resuelve `cloudflare:workers` y tipa `Env`, pero los globales del runtime chocan con `lib.dom`: 11 errores (`res.json()` pasa a `unknown` en `CTASection.astro` y `contacto.astro`; `HTMLSelectElement` en `wizard.ts`). Además exige `compatibility_date`, que `wrangler.toml` no declara (el adapter la inyecta al generar `wrangler.json`). Peor que la base. |
| `wrangler types --include-runtime=false` | Solo genera `Env`; no declara el módulo, el TS2307 persiste (4 errores). |
| Declaración ambient local mínima (`declare module 'cloudflare:workers' { export const env: ... }` en `src/types/`) | 3 errores restantes (los #2, #3, #4); sin efecto sobre el DOM. |
| `@cloudflare/workers-types` | No probado; mismo patrón de globales que `wrangler types`. |

Con la declaración local más las tres correcciones triviales (quitar `platformProxy`, tipar `logger`, usar `ReturnType<typeof setInterval>`/`number` coherente) `astro check` llegaría a 0. Cuántos esfuerzos aplican queda para diseño; el brief permite listar el resto como deuda.

### 5. `scripts/axe-audit.mjs` y herramientas de a11y [fuente: código + ejecución]

- Script actual: usa `jsdom` + `axe-core` (ninguno en `package.json`; 0 coincidencias en `package-lock.json`, por lo que hoy falla con `ERR_MODULE_NOT_FOUND` antes de llegar al `ReferenceError` que registran las observaciones). Rutas `dist/index.html`, `dist/<pág>/index.html` (la salida real está en `dist/client/`); `dom?.window.close?.()` al final referencia `dom`, declarado con `const` dentro del `for`, lo que lanza `ReferenceError` (línea final del script); jsdom no calcula contraste; solo audita 6 páginas `es`.
- Herramientas disponibles: Chrome 148.0.7778.167 en `log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome` (gitignored, solo en el checkout principal); `playwright-core` en la caché de npx (1.60.0, 1.62.0-alpha, 1.64.0-alpha) y `axe-core` 4.11.4 en otra caché de npx. El MCP de Playwright no tiene navegador.
- Prototipo medido (script de prueba fuera del repo; `playwright-core` con `executablePath` del Chrome de arriba, `axe-core` inyectado con `addScriptTag`, `dist/client` servido por `python3 -m http.server`, ya que el HTML usa rutas absolutas `/_astro/...` y no abre con `file://`): 8 páginas (`/`, `/servicios/`, `/industrias/`, `/nosotros/`, `/contacto/`, `/cotizar/`, `/en/`, `/pt/`) en 5,4 s totales.
  - Con `reducedMotion` por defecto: 3 violaciones `color-contrast` en `/`, `/en/`, `/pt/` (`.hero-b__lead`, ratio 1.17, texto en plena animación de entrada), falsos positivos.
  - Con `reducedMotion: 'reduce'`: **0 violaciones en las 8 páginas**. Un `npm run a11y` fiable debe emular movimiento reducido o esperar a que terminen las animaciones.
  - Límites conocidos de axe (observaciones 495 y 521): no evalúa `::placeholder` ni estados inyectados por JS.
- Para el contenedor: la imagen no incluye navegador; la auditoría corre en el host contra `dist/client` (o contra el servidor local). El script necesita `CHROME_PATH`/ruta configurable porque `chrome/` es local y gitignored.

### 6. Logs append-only candidatos a `merge=union` [fuente: código `memory/`, `obsidian-persistence-convention.md`]

- El único log append-only del vault es `memory/observations.md`. El resto no es append: `memory/specs/**` (inmutables, evolucionan por delta), `memory/adrs/NNNN-*.md` (un archivo por ADR), `changes/{name}/*` (efímeros, un directorio por cambio), `_profile.md` (editable). `merge=union` sobre ellos mezclaría contenido en vez de conflictuar; no se recomienda.
- No existe `.gitattributes` en el repo (el protocolo SDD asume que "el repo lo incluye"). Debe vivir en la raíz del repo git (`/home/kapridoo/projects/log-atm-web-astro/`, donde está `memory/`), no en `log-atm-web-astro/`. Contenido: `memory/observations.md merge=union`.
- Verificado con un repo de prueba: con el atributo, dos ramas que añaden al final se fusionan sin conflicto (el resultado concatena "nuestro" y luego "su" bloque, no en orden cronológico); sin él, `CONFLICT (content)`. El driver `union` es nativo de git, no requiere configuración.

## Archivos Afectados

| Archivo | Rol | Impacto |
|---|---|---|
| `log-atm-web-astro/Dockerfile`, `nginx.conf`, `default.conf` | contenedor nginx actual | eliminar |
| `docker-compose.yml` (raíz) | compose del contenedor nginx | eliminar (depende de `Dockerfile`/puerto 80) |
| `fix-wsl2-port.bat` (raíz) | portproxy Windows para el puerto 4321 | decidir: conservar/parametrizar o retirar |
| `log-atm-web-astro/Containerfile` (nuevo) | build + ejecución con workerd | crear |
| `log-atm-web-astro/.containerignore` (nuevo) | evitar que `.dev.vars`, `node_modules`, `chrome/` entren al contexto | crear (requisito de seguridad) |
| `log-atm-web-astro/package.json`, `package-lock.json` | scripts y devDependencies | `check`, `a11y`, `container:*`; `@astrojs/check`, `typescript@^6`, `playwright-core`, `axe-core` |
| `log-atm-web-astro/README.md` | documentación | despliegue Workers Builds, Podman, comandos, quitar Potrace/Docker/nginx; también `astro-icon`, versión de Astro, scripts de verificación |
| `log-atm-web-astro/src/types/` (nuevo `.d.ts`), `src/scripts/gsap-ind-directory.ts`, `astro.config.mjs` | tipos y errores de `astro check` | declaración de `cloudflare:workers`; 3 correcciones |
| `log-atm-web-astro/scripts/axe-audit.mjs` | auditoría a11y | reescribir con navegador real o eliminar |
| `.gitattributes` (raíz, nuevo) | merge driver | crear |
| `log-atm-web-astro/.dev.vars.example`, `astro.config.mjs:14`, `memory/_profile.md` | menciones a "Cloudflare Pages" | actualizar a Workers |

## Approaches Posibles

### Approach A: `astro preview` en un solo stage Debian (`node:22-slim`)
- **Pros**: mismo comando que `npm run preview`; el adapter lo soporta; verificado de punta a punta (estático, API 400, 404 real, secretos); reproduce producción (workerd).
- **Contras**: imagen de ~866 MB (devDependencies incluidas); requiere `--host ::` para que `localhost` funcione en este WSL2; secretos exigen el montaje en `dist/server/.dev.vars` o `CLOUDFLARE_INCLUDE_PROCESS_ENV=true`; reevalúa `astro.config.mjs` al arrancar.
- **Esfuerzo**: S

### Approach B: `wrangler dev --config dist/server/wrangler.json`
- **Pros**: runtime idéntico al de producción sin la capa Vite; arranque ~2 s; lista los bindings al iniciar (útil para depurar secretos).
- **Contras**: `wrangler` es dependencia transitiva (peer del adapter), no directa: depende de que npm la instale como peer; más flags y un comando distinto del flujo local; rebuild en caliente deja 404 hasta relanzar (igual de frágil que el preview, pero irrelevante en contenedor).
- **Esfuerzo**: S

### Approach C: multi-stage con poda (`npm prune --omit=dev` o stage runtime con solo `dist` + `node_modules` de producción)
- **Pros**: imagen más pequeña.
- **Contras**: `sharp` ya es devDependency (el build lo necesita, el runtime no) pero `astro preview` carga `astro.config.mjs` (importa `@tailwindcss/vite`, `@astrojs/react`, `@astrojs/sitemap`), por lo que el runtime necesita casi todo el árbol; la ganancia es incierta y añade complejidad (YAGNI). No probado.
- **Esfuerzo**: M

## Recomendación

**Approach recomendado**: A como camino único, con B documentado como alternativa de diagnóstico solo si el diseño la quiere (KISS: un solo servicio, un solo comando).
**Justificación**: A es el comando oficial del adapter y quedó verificado de extremo a extremo; B no aporta un beneficio observable que justifique un segundo camino. Decisiones de diseño que quedan abiertas con evidencia: método de inyección de secretos (montaje en `dist/server/.dev.vars` vs. `--env-file` + `CLOUDFLARE_INCLUDE_PROCESS_ENV=true`), `--host ::` para el criterio `http://localhost:4321`, `.containerignore` obligatorio, `typescript` fijado a `^6`, estrategia de tipos para `cloudflare:workers` (declaración local mínima, la única que no empeora la base), si `check` se encadena al `build` (depende de la pregunta abierta del comando de build en Workers Builds) y destino de `fix-wsl2-port.bat`.

## Riesgos Identificados

- Encadenar `astro check` en `npm run build` puede romper el despliegue de producción si Workers Builds ejecuta ese script; confirmar con el dueño del dashboard antes, o dejar `check` separado.
- Un `.dev.vars` copiado a la imagen filtraría `SMTP_PASS` (reproducido); mitigación: `.containerignore` y verificación con `podman history`/`inspect` y barrido del sistema de archivos de la imagen en el criterio de aceptación.
- `typescript@latest` (7.x) rompe el peer de `@astrojs/check`; fijar la versión en `devDependencies`.
- `localhost` → `::1` en este WSL2 deja sin servicio al criterio de aceptación si el servidor escucha solo en IPv4.
- Un `npm run a11y` sin emulación de movimiento reducido produce falsos positivos de contraste durante las animaciones de entrada.
- El navegador de la auditoría (`chrome/`) es local y gitignored; sin variable de entorno o ruta configurable el script no corre en otro equipo.
- Cada upgrade de Astro o del adapter exige repetir las 404 localizadas (`/en/no-existe`, `/pt/no-existe`) en el contenedor (riesgo vigente de ADR-0007).
- El sitio no usa sesiones, pero el adapter v13 provisiona automáticamente un KV `SESSION` en cada deploy; fuera de alcance, pero conviene saberlo antes de documentar el despliegue.
