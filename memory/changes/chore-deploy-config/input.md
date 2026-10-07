---
type: external-input
domain: fix
change_name: chore-deploy-config
fast_path: apply-only
priority: P2
depends_on: [chore-local-container-podman]
source: dashboard-workers-builds-2026-10-07
---
# Brief 15 — Alinear la configuración de despliegue con Workers Builds

**Despacho:** `sdd new chore-deploy-config --domain fix --path apply-only --integration-target main --input-file .sdd/briefs/auditoria-2026-10/15-chore-deploy-config.md`

> Rutas relativas a la raíz del repo salvo que se indique `log-atm-web-astro/`. Origen: residuales 2–4 del brief 10 (PR #37), resueltos con datos del dashboard de Cloudflare aportados por el usuario el 2026-10-07.

## Configuración real de Workers Builds (Worker `log-atm-web`, confirmada en el dashboard y en el log del build `587bb12e`)

| Campo | Valor |
|-------|-------|
| Repo / rama | `KapriDoo/log-atm-web-astro`, `main` (también corre en cada PR) |
| Directorio raíz | `/` |
| Comando de build | `cd log-atm-web-astro && npm ci && npm run build` |
| Comando de deploy | `cd log-atm-web-astro && npx wrangler deploy` |
| Comando de versión | `cd log-atm-web-astro && npx wrangler versions upload` |
| Variables de build | ninguna |
| Node | **sin fijar**: usa la del sistema de la imagen de build (Node 24 desde julio de 2026) |

## Problemas

1. **Nombre del Worker:** `dist/server/wrangler.json` (generado por el adapter) sale con `name: "log-atm-web-astro"`. En CI no rompe porque Workers Builds reemplaza el nombre por el del Worker conectado (el log muestra `Uploaded log-atm-web`), pero un `wrangler deploy` manual crearía un Worker nuevo `log-atm-web-astro`. `log-atm-web-astro/wrangler.toml:5` explica que no se duplican `name`/`main`/`assets`; la omisión de `name` es justamente lo que produce la divergencia.
2. **Node sin fijar y sin paridad:** producción usa Node 24 sin fijar (un cambio de imagen de Cloudflare lo cambiaría sin aviso); el entorno local tiene Node 24.15; el contenedor del PR #37 usa `docker.io/library/node:22-slim` (`log-atm-web-astro/Containerfile:6`) → el contenedor no reproduce producción (ADR-0009 promete paridad).
3. **Type-check fuera de CI:** el build solo ejecuta `astro build`; `npm run check` (0 errores desde el PR #37) no corre en ningún lado automático. Workers Builds se ejecuta en cada PR, así que es el único CI del proyecto. ADR-0011 dejó `check` separado "hasta conocer el comando de build de Workers Builds".

## Decisiones tomadas (SSOT/KISS)

1. Agregar `name = "log-atm-web"` a `log-atm-web-astro/wrangler.toml` (solo `name`; `main`/`assets` siguen generados) y actualizar el comentario de `:5`.
2. **Fuente única de la versión de Node: archivo `.node-version` con `24` en la raíz del repo** (el directorio raíz de Workers Builds es `/`). **No** usar la variable `NODE_VERSION` del dashboard (sería una segunda fuente, no versionada). El `Containerfile` pasa a `node:24-slim`. `engines.node` en `package.json` queda como mínimo de compatibilidad (no es la versión fijada).
3. Script nuevo `"build:ci": "astro check && astro build"` en `log-atm-web-astro/package.json`; `npm run build` local queda igual (rápido). El comando de build del dashboard pasará a `cd log-atm-web-astro && npm ci && npm run build:ci` — **lo cambia el usuario después de mergear este PR** (antes, `build:ci` no existe y el build fallaría).
4. Actualizar ADR-0011 (el type-check corre en CI vía `build:ci`; el build local sigue separado) y el README (sección de despliegue con la tabla confirmada, sin "a confirmar"; `.node-version` como fuente de Node; paso manual del dashboard).

## Criterios de aceptación

- [ ] Tras `npm run build`, `dist/server/wrangler.json` tiene `"name": "log-atm-web"`.
- [ ] Existe `.node-version` = `24` en la raíz; `Containerfile` usa `node:24-slim`; `npm run container:build` y `container:run` siguen funcionando (200 en `/`, `/en/`, `/pt/`; 404 real; API 400 ante payload inválido).
- [ ] `npm run build:ci` corre `astro check` y luego el build; termina en exit 0; un error de tipos introducido a propósito (en copia aislada) lo hace fallar.
- [ ] El check "Workers Builds: log-atm-web" del PR pasa (con el comando actual del dashboard).
- [ ] README y ADR-0011 actualizados; el PR incluye el paso manual post-merge para el dashboard.

## Tareas sugeridas (para `tasks.md`)

1. `name = "log-atm-web"` en `wrangler.toml` + comentario actualizado; verificar el `wrangler.json` generado.
2. `.node-version` (24) en la raíz y `Containerfile` a `node:24-slim`; reconstruir y probar el contenedor.
3. Script `build:ci` en `package.json`; prueba de fallo con error de tipos en copia aislada.
4. README (despliegue) y ADR-0011.

## Paso manual del usuario (post-merge)

En el dashboard (Workers & Pages → log-atm-web → Settings → Build), cambiar el comando de build a:
`cd log-atm-web-astro && npm ci && npm run build:ci`
y **no** agregar `NODE_VERSION`. Verificar en el siguiente build que el log detecte Node 24 desde `.node-version`.
