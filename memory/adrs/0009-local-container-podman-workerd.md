---
status: accepted
date: 2026-10-06
deciders: sdd-design
consulted: exploration.md, proposal.md, clarifications.md, specs local-container/*, ADR-0007
informed: sdd-tasks, sdd-apply, sdd-verify
change_ref: "[[chore-local-container-podman]]"
capability: local-container
tags: [adr, container, podman, workerd, cloudflare, secrets]
---

# ADR 0009: Contenedor local con Podman que ejecuta workerd vía `astro preview`, con secretos montados en ejecución

## Contexto

Producción corre en Cloudflare Workers (Workers Builds con integración git). El adapter
`@astrojs/cloudflare` 13 divide la salida en `dist/client` (estático) y `dist/server` (Worker).
Un contenedor que sirve solo `dist/client` con un servidor web genérico no ejecuta la API de
formularios y responde la portada ante cualquier ruta (soft-404), de modo que no representa
producción. La 404 por idioma de [[0007-not-found-page-on-demand-single]] solo existe si el
Worker la renderiza.

Hechos medidos: `workerd` solo publica binario glibc; `--env-file` no crea bindings en
workerd; el adapter busca `.dev.vars` junto al config redirigido `dist/server/wrangler.json`;
en WSL2 `localhost` resuelve a `::1`; sin archivo de exclusión, `COPY . .` copia `.dev.vars`
a la imagen.

## Decisión

- El contenedor local es **opcional** y único: `log-atm-web-astro/Containerfile`, un stage
  sobre `docker.io/library/node:22-slim`, que compila con `npm run build` y ejecuta
  `astro preview --host :: --port 4321` (workerd en proceso vía `@cloudflare/vite-plugin`).
- Motor: **Podman rootless**. Comandos: `npm run container:build` y `npm run container:run`.
- Los secretos **nunca** entran en la imagen: `.containerignore` excluye `.dev.vars*` (salvo el
  ejemplo), `.env*`, `node_modules`, `dist`, `.astro`, `.wrangler`, `chrome` y `.git`; la
  credencial llega en ejecución por bind mount de solo lectura
  `"$PWD/.dev.vars:/app/dist/server/.dev.vars:ro"`. Sin archivo, Podman falla antes de crear
  el contenedor.
- No hay definición de imagen con servidor estático, archivo de orquestación de servicios ni
  script de portproxy de Windows en el repositorio.

## Consecuencias

### Positivas

- Estático, API, 404 por idioma y bindings se comportan como en producción.
- El 500 de `astro preview` tras recompilar no ocurre en el contenedor: el build precede
  siempre al arranque del servidor.
- Un solo camino de contenedor, dos comandos.

### Negativas

- Imagen de ~866 MB con devDependencies (aceptado para uso local opcional).
- El montaje de `.dev.vars` es menos evidente que `--env-file` y exige documentación.
- La ruta de montaje depende del layout del adapter (`dist/server/`): un upgrade mayor de
  `@astrojs/cloudflare` exige repetir la prueba de bindings en el contenedor, junto con la de
  las 404 de [[0007-not-found-page-on-demand-single]].
- El contenedor no se usa en el despliegue: producción no depende de él.

## Alternativas descartadas

- **`wrangler dev --config dist/server/wrangler.json`**: dependencia transitiva y segundo
  comando sin beneficio observable.
- **Multi-stage con poda**: `astro preview` necesita casi todo el árbol de dependencias.
- **`--env-file` + `CLOUDFLARE_INCLUDE_PROCESS_ENV=true`**: todo el entorno del proceso se
  vuelve binding.
- **Servidor estático (nginx) + compose**: sin API, soft-404; es lo que este ADR retira.

## Estado

**Accepted** — 2026-10-06.
