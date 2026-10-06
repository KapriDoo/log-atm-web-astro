---
type: proposal
change_name: "chore-local-container-podman"
domain: "migration"
status: approved
iteration: 1
effort: M
risks:
  - descripcion: "Encadenar astro check al script build rompe el despliegue a producción si Workers Builds ejecuta npm run build"
    probabilidad: Media
    mitigacion: "npm run check queda como script separado; el encadenamiento se reevalúa cuando el dueño del dashboard confirme el comando de build"
  - descripcion: "Un .dev.vars copiado en el contexto de build filtra SMTP_PASS dentro de la imagen (reproducido en explore)"
    probabilidad: Baja
    mitigacion: ".containerignore obligatorio y verificación con podman history --no-trunc, podman inspect y barrido del sistema de archivos de la imagen como criterio de aceptación"
  - descripcion: "npm resuelve typescript 7.x, fuera del peer ^5 || ^6 de @astrojs/check"
    probabilidad: Baja
    mitigacion: "Fijar typescript@^6 en devDependencies"
  - descripcion: "El servidor del contenedor escucha solo en IPv4 y http://localhost:4321 no responde en WSL2 (localhost resuelve a ::1)"
    probabilidad: Baja
    mitigacion: "astro preview --host :: dentro del contenedor (verificado: responde en 127.0.0.1, localhost y [::1])"
  - descripcion: "npm run a11y reporta falsos positivos de contraste durante las animaciones de entrada"
    probabilidad: Media
    mitigacion: "Emular reducedMotion: 'reduce' en el navegador (verificado: 0 violaciones en 8 páginas)"
  - descripcion: "La auditoría a11y no corre en otro equipo porque chrome/ es local y gitignored"
    probabilidad: Media
    mitigacion: "Ruta del navegador configurable por variable de entorno (CHROME_PATH) con error explícito si falta"
created: "2026-10-06"
updated: "2026-10-06"
tags: [proposal]
---

# Propuesta: chore-local-container-podman

## Intent

Producción se despliega en Cloudflare Workers (Workers Builds con integración git, Worker `log-atm-web`), pero el contenedor del repo sirve solo `dist/client` con nginx: sin API y con soft-404. El cambio reemplaza ese contenedor por uno Podman rootless que ejecuta workerd, documenta el despliegue real, agrega type-check y una auditoría a11y en navegador real que sirva como evidencia, y elimina los conflictos de merge de `memory/observations.md`.

## Scope

**Incluye:**
- `Containerfile` de un stage (`docker.io/library/node:22-slim`) que compila y ejecuta `astro preview --host :: --port 4321`, más `.containerignore` (`node_modules`, `dist`, `.astro`, `.wrangler`, `chrome`, `.git`, `.dev.vars*` salvo el `.example`); scripts npm `container:build` y `container:run`.
- Eliminar `Dockerfile`, `nginx.conf`, `default.conf`, `docker-compose.yml` (raíz) y `fix-wsl2-port.bat` (raíz; defaults de `clarifications.md`).
- README: despliegue "Cloudflare Workers (producción) · Podman (local, opcional)", flujo Workers Builds con los datos del dashboard marcados "a confirmar", comandos Podman, quirk de `astro preview` (500 tras rebuild; el contenedor lo evita por construcción), `check`, `a11y`, `measure:images`, `check-i18n-links`; sin Potrace, Docker ni nginx.
- Type-check: `@astrojs/check` + `typescript@^6`, `npm run check` separado del build; declaración ambient mínima de `cloudflare:workers` en `src/types/` y corrección de los otros 3 errores (`platformProxy`, `logger`, `setInterval`) → 0 errores.
- `scripts/axe-audit.mjs` reescrito con `playwright-core` + `axe-core` (devDependencies), contra `dist/client` servido localmente, `reducedMotion: 'reduce'`, páginas es/en/pt, `CHROME_PATH`; `npm run a11y` con exit ≠ 0 ante violaciones.
- `.gitattributes` en la raíz del repo con `memory/observations.md merge=union` (solo ese archivo: es el único log append-only).
- Menciones obsoletas a "Cloudflare Pages" (`astro.config.mjs:14`, `.dev.vars.example:3`) y restos del README (`astro-icon`, versión de Astro). `memory/_profile.md` lo actualiza `sdd-init` en el próximo cambio.

**Excluye explícitamente:**
- CI/CD nuevo y cambios en el dashboard de Cloudflare (brief).
- Script `deploy` (el despliegue no es manual).
- KV `SESSION` automático del adapter y nombre `log-atm-web-astro` del `wrangler.json` generado: solo se documentan.
- `wrangler dev` como segundo camino y multi-stage con poda (YAGNI).

## Approach Propuesto

Approach A de exploration: `astro preview` del adapter en un solo stage Debian, el único verificado de extremo a extremo (200 en `/`, `/en/`, `/pt/`; 400 JSON en `POST /api/contacto`; 404 real). Los secretos se inyectan en runtime montando `.dev.vars` en `/app/dist/server/.dev.vars:ro`: `--env-file .dev.vars` solo no crea bindings (reproducido), y la alternativa `CLOUDFLARE_INCLUDE_PROCESS_ENV=true` convierte todo el entorno del proceso en bindings. Esto ajusta el criterio del brief (`--env-file` → `-v`). El resto son ajustes de configuración y documentación sobre herramientas ya medidas en explore.

## Esfuerzo Estimado

Muchas piezas pequeñas y verificadas (contenedor, 5 eliminaciones, 4 correcciones de tipos, reescritura de un script, README); ninguna exige investigación nueva, pero la verificación de cierre requiere build de imagen (~2 min), inspección de secretos y auditoría en navegador.

## Riesgos

La mitigación de cada riesgo vive en el frontmatter. El más relevante es el encadenamiento de `check` al build: se evita por defecto hasta conocer el comando de Workers Builds.

## Trade-offs

- **A favor**: paridad real con producción (workerd, API, 404); un solo comando de contenedor; type-check en 0 sin ocultar errores; auditoría a11y reproducible que detecta contraste; un único log con `merge=union`.
- **En contra**: imagen de ~866 MB con devDependencies (aceptado: uso local opcional); el montaje de `.dev.vars` es menos obvio que `--env-file` y obliga a documentarlo; la declaración ambient de `cloudflare:workers` es manual y debe mantenerse si el código usa más del módulo; `npm run a11y` depende de un Chrome provisto por el usuario.
