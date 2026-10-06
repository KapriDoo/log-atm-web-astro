---
type: external-input
domain: migration
change_name: chore-local-container-podman
fast_path: full
priority: P3
depends_on: []
source: validacion-auditoria-2026-10-02
---
# Brief 10 — Contenedor local con Podman (paridad con Cloudflare) y documentación de despliegue

**Despacho:** `sdd new chore-local-container-podman --domain migration --path full --integration-target main --input-file .sdd/briefs/auditoria-2026-10/10-chore-local-container-podman.md`

> Rutas relativas a `log-atm-web-astro/`. Origen: validación de auditoría (N5, D11). **Decisión del usuario (2026-10-02): producción se despliega en Cloudflare; en local se quiere la opción de correr el sitio en un contenedor con Podman.**

## Problema

1. **El contenedor actual no representa producción.** `Dockerfile` (3 etapas) compila Astro y sirve solo `dist/client` con nginx + Brotli (`nginx.conf`, `default.conf`). El adapter `@astrojs/cloudflare` divide la salida en `dist/client` (estático) y `dist/server` (worker); nginx no ejecuta el worker, así que en el contenedor:
   - Las rutas API (`/api/contacto`, `/api/cotizacion-rapida`, `/api/cotizacion`) no funcionan.
   - `default.conf:36` (`try_files $uri $uri/index.html /index.html`) devuelve el home con 200 ante cualquier ruta inexistente (soft-404).
2. **README desactualizado y roto.** `README.md:39` declara "Deploy: Docker + nginx con Brotli"; `README.md:57-65` indica `docker compose up --build` en el puerto 4321, pero **no existe archivo compose** y la imagen expone el puerto 80. `README.md:86-87` describe `Dockerfile`/`nginx.conf` como piezas de despliegue.
3. **El flujo real de despliegue a Cloudflare no está documentado.** `wrangler.toml` existe (vars SMTP, `workers_dev = false`, `preview_urls = false`, secreto `SMTP_PASS` en el dashboard; `.dev.vars` para local) y el adapter genera `dist/server/wrangler.json` en el build, pero no hay script `deploy` en `package.json`, `wrangler` no es dependencia directa y no hay CI (`.github/workflows` no existe).
4. **Sin type-check.** `astro build` no ejecuta chequeo de tipos; no hay `@astrojs/check` ni `typescript` en `package.json`. Esto dejó pasar un bug de producción (`replyTo` vs `reply` en el mailer, brief 01). Medido en `fix-email-reply-to`: `tsc --noEmit` arrastra **4 errores preexistentes**, entre ellos `TS2307` por `cloudflare:workers` en `src/lib/mailer.ts:2` (faltan los tipos del runtime de Workers, p. ej. `@cloudflare/workers-types` o los tipos que genere `wrangler types`); registrados en `memory/observations.md` por ese cambio.

5. **`scripts/axe-audit.mjs` roto** (detectado en `fix-a11y-and-icons`): termina en exit 1 por un `ReferenceError`; busca en `dist/` cuando la salida estática está en `dist/client/`; `jsdom` y `axe-core` no están en `package.json`; jsdom no calcula contraste. Hoy sus "0 violaciones" no sirven como evidencia.

6. **Conflictos recurrentes en `memory/observations.md`** (log append-only): al converger con `main`, dos cambios que agregan entradas chocan (visto en `fix-a11y-and-icons`, resuelto a mano por unión).

7. **README con restos:** `README.md:36` lista "Potrace (PNG → SVG)" en el stack, pero `png-to-svg.mjs` y la dependencia `potrace` se eliminaron (PR #35).
8. **`astro preview` inestable:** con el adapter Cloudflare responde 500 tras cada build hasta que se relanza (observado en briefs 05–06).

## Estado deseado

1. **Contenedor local (Podman, rootless):** un `Containerfile` que compile el sitio y lo ejecute con **workerd** (el mismo runtime de Cloudflare, p. ej. vía `astro preview` del adapter o `wrangler dev` sobre `dist/server/wrangler.json`), de modo que estático, API, 404 y variables se comporten igual que en producción.
   - Imagen base Debian/glibc (`workerd` no distribuye binario musl; la nota ya está en el `Dockerfile` actual).
   - Secretos (`SMTP_PASS`) **nunca** en la imagen: se inyectan en runtime (`--env-file .dev.vars` o volumen).
   - Comandos documentados (`podman build` / `podman run`) y, si aporta, scripts npm (`container:build`, `container:run`). Sin `podman-compose` salvo que el diseño lo justifique (KISS: un solo servicio).
2. **Retirar nginx (YAGNI):** eliminar `Dockerfile` (reemplazado por `Containerfile`), `nginx.conf` y `default.conf`; Brotli/caché los resuelve Cloudflare.
3. **README:** fila de despliegue → "Cloudflare Workers (producción) · Podman (local, opcional)"; sección de contenedor con los comandos reales; sección de despliegue con el flujo vigente a Cloudflare (**averiguar en explore** si es Workers Builds con integración git o `wrangler deploy` manual, y documentar el que corresponda; si es manual, agregar el script npm `deploy`).
4. **Type-check:** agregar `@astrojs/check` + `typescript` como devDependencies y un script `npm run check` (`astro check`). Decidir en diseño si se encadena al build (`astro check && astro build`) según la cantidad de errores preexistentes; los errores que aparezcan se corrigen o se listan como deuda.

5. **Auditoría a11y:** reparar `scripts/axe-audit.mjs` para que corra axe-core en un navegador real (Chrome de `log-atm-web-astro/chrome/` o el del contenedor) contra `dist/client`, con dependencias declaradas y script npm (`npm run a11y`); o eliminarlo si el diseño decide otra herramienta (YAGNI: una sola).

6. **`.gitattributes`** en la raíz con `memory/observations.md merge=union` (y evaluar lo mismo para otros logs append-only del vault).

7. **README** sin la fila de Potrace; documentar el quirk de `astro preview` (relanzar tras cada build) o resolverlo si el contenedor/`wrangler dev` lo evita; mencionar `npm run measure:images` y `npm run check-i18n-links` como verificaciones disponibles.

## Criterios de aceptación

- [ ] `podman build -t log-atm-web -f Containerfile .` funciona en modo rootless.
- [ ] `podman run --rm -p 4321:<puerto> --env-file .dev.vars log-atm-web` sirve el sitio en `http://localhost:4321`; `GET /`, `/en/`, `/pt/` → 200; `POST /api/contacto` con payload inválido → 400 JSON (la API corre); una ruta inexistente → 404 (no soft-404).
- [ ] `podman history`/`podman inspect` de la imagen no contiene `SMTP_PASS` ni el contenido de `.dev.vars`.
- [ ] No quedan `nginx.conf`, `default.conf` ni `Dockerfile`; ninguna referencia a nginx/Docker en `README.md`.
- [ ] README documenta el despliegue a Cloudflare vigente y el uso opcional de Podman en local.
- [ ] `npm run check` existe y termina con 0 errores (o los preexistentes quedan registrados como deuda con su lista).

- [ ] `npm run a11y` (o la herramienta elegida) audita `dist/client` en navegador real, detecta contraste y termina con exit 0 sobre el sitio actual o lista las violaciones existentes.

- [ ] `.gitattributes` con `memory/observations.md merge=union` versionado.

## Fuera de alcance

- CI/CD nuevo (no existe hoy; YAGNI hasta que se pida).
- Cambios de configuración en el dashboard de Cloudflare.
