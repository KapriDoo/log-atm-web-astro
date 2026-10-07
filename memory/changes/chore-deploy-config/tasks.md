---
type: tasks
change_name: "chore-deploy-config"
created: "2026-10-06"
---

# Tasks — chore-deploy-config

> Fuente: brief 15 (`input.md` de este cambio, sección «Tareas sugeridas»). Rutas relativas a la
> raíz del worktree `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/chore-deploy-config/`
> salvo que se indique `log-atm-web-astro/`. Ubicaciones confirmadas por contenido sobre `8fa62c1`.
> Configuración real de Workers Builds (dashboard): directorio raíz `/`; build
> `cd log-atm-web-astro && npm ci && npm run build`; deploy `cd log-atm-web-astro && npx wrangler deploy`;
> versión `cd log-atm-web-astro && npx wrangler versions upload`; sin variables de build; Node sin
> fijar (24 en la imagen de Cloudflare).

## T1 — Nombre del Worker en `wrangler.toml`

**File**: `log-atm-web-astro/wrangler.toml`
**Líneas/ocurrencias**: bloque de notas l.3-7 (explica que no se duplican `name`/`main`/`assets`) y nivel superior del archivo
**Acción**: agregar `name = "log-atm-web"` (solo `name`; `main` y `assets` siguen generados por el adapter) y actualizar el comentario para explicar por qué `name` sí se declara (un `wrangler deploy` manual con el nombre generado `log-atm-web-astro` crearía otro Worker).
**Justificación**: Workers Builds sobrescribe el nombre en CI, pero la configuración versionada debe coincidir con el Worker real.

**Acceptance**:
- [ ] Tras `npm run build`, `log-atm-web-astro/dist/server/wrangler.json` tiene `"name": "log-atm-web"`.
- [ ] `main`/`assets` no se declaran en `wrangler.toml`; el comentario describe la decisión vigente.

## T2 — Node 24 como fuente única y paridad del contenedor

**File**: `.node-version` (nuevo, raíz del repo) y `log-atm-web-astro/Containerfile` (`FROM docker.io/library/node:22-slim`, l.6, y el comentario de l.4)
**Líneas/ocurrencias**: archivo nuevo; `FROM` y comentarios que nombran `node:22-slim`
**Acción**: crear `.node-version` con `24` en la raíz (el directorio raíz de Workers Builds es `/`); pasar el `Containerfile` a `node:24-slim` y ajustar sus comentarios. No usar `NODE_VERSION` del dashboard. `engines.node` de `log-atm-web-astro/package.json` queda como mínimo de compatibilidad (no se toca).
**Justificación**: producción usa Node 24 sin fijar y el contenedor usa 22 (sin paridad, ADR-0009).

**Acceptance**:
- [ ] `.node-version` = `24` en la raíz; `Containerfile` usa `node:24-slim`.
- [ ] `npm run container:build` y `npm run container:run` funcionan: 200 en `/`, `/en/`, `/pt/`; 404 real en una ruta inexistente; la API responde 400 ante payload inválido. Contenedor detenido al terminar.

## T3 — Script `build:ci` con type-check

**File**: `log-atm-web-astro/package.json` (`scripts`)
**Líneas/ocurrencias**: bloque `scripts` (`"build": "astro build"`, `"check": "astro check"`)
**Acción**: agregar `"build:ci": "astro check && astro build"`; `build` queda igual. Probar que un error de tipos introducido a propósito en una copia aislada (fuera del worktree, p. ej. en el scratchpad o bajo `/tmp`) hace fallar `build:ci`; no commitear la copia.
**Justificación**: `npm run check` no corre en ningún paso automático; Workers Builds es el único CI.

**Acceptance**:
- [ ] `npm run build:ci` corre `astro check` y luego el build; termina en exit 0 en el worktree.
- [ ] En la copia aislada con un error de tipos, `npm run build:ci` termina con exit ≠ 0 antes del build (salida documentada).
- [ ] `npm run build` sigue siendo `astro build`.

## T4 — README (despliegue) y ADR-0011

**File**: `log-atm-web-astro/README.md` (sección `## Despliegue`, ~l.119) y `memory/adrs/0011-type-check-separate-from-build.md`
**Líneas/ocurrencias**: sección de despliegue; ADR-0011 (consecuencias ~l.50-51 «se reevalúa cuando se conozca el comando de build…» y alternativa ~l.55)
**Acción**: README: tabla de despliegue con la configuración confirmada (sin «a confirmar»), `.node-version` como fuente de Node, `build:ci` y el paso manual post-merge del dashboard. ADR-0011: registrar que el type-check corre en CI vía `build:ci` (el build local sigue separado), resolviendo el residual pendiente.
**Justificación**: la documentación debe reflejar la configuración real y la decisión vigente.

**Acceptance**:
- [ ] README con la tabla de despliegue confirmada, `.node-version` y el paso manual del dashboard.
- [ ] ADR-0011 declara que el type-check corre en CI vía `build:ci` y que `build` local sigue separado.

## T5 — Verificación integral

**File**: — (comandos sobre el worktree)
**Líneas/ocurrencias**: —
**Acción**: simular el comando actual del dashboard desde la raíz del worktree (`cd log-atm-web-astro && npm ci && npm run build`) y luego `npm run build:ci`, `npm run check`, `npm run validate-i18n`; inspeccionar `dist/server/wrangler.json`; probar el contenedor (T2). Registrar comandos y salidas como evidencia.
**Justificación**: el check «Workers Builds: log-atm-web» del PR corre con el comando actual del dashboard; debe pasar antes del paso manual post-merge.

**Acceptance**:
- [ ] El comando actual del dashboard termina en exit 0 en el worktree.
- [ ] Evidencia (comandos + salidas) registrada en el workspace del cambio.
