---
status: accepted
date: 2026-10-08
deciders: usuario (vía bigger-consultor), sdd-apply
consulted: clarifications.md, apply-evidence.md (tareas 7 y re-despacho), ADR-0006, ADR-0011
informed: sdd-verify
change_ref: "[[debt-copy-tokens-ssot]]"
capability: i18n-translations
spec_refs:
  - "[[copy-single-source]]"
updated: "2026-10-08"
tags: [adr, build, prerender, cloudflare, workerd, ci]
---

# ADR 0012: Guarda post-build sobre las páginas prerenderizadas

## Contexto

`@astrojs/cloudflare` 13.5.0 prerenderiza las páginas en workerd. Cuando el render de una
página lanza, el prerenderizador devuelve la respuesta de error sin lanzar, Astro escribe lo
que recibe y `astro build` termina con exit 0. La página queda vacía o lleva la traza del
error en lugar de HTML. Workers Builds despliega cuando `npm run build:ci` sale con 0
([[0011-type-check-separate-from-build]]), así que un error de render llega a producción. El
caso que lo expone es `tListFor` ([[copy-single-source]]): cuando una lista del i18n y sus
datos difieren en cantidad de ítems, lanza en el render.

## Decisión

- `astro.config.mjs` registra la integración `log-atm:prerender-output-guard`. En
  `astro:build:done` hace fallar el build, con un mensaje que nombra la ruta y el archivo, si
  una página prerenderizada esperada no existe en `dist/client`, pesa 0 bytes o no contiene
  `<html`.
- Las páginas esperadas no salen de lo escrito en disco. Son los paths de `pages` de
  `astro:build:done`, que Astro registra antes de renderizar cada path (los entrega
  `getStaticPaths` o el path fijo de la ruta). Además, cada ruta de página prerenderizada del
  proyecto (`astro:routes:resolved`) tiene al menos un path en esa lista.
- La guarda es parte de `astro build` y por lo tanto corre en `npm run build`, en
  `npm run build:ci` y en el build de Workers Builds.

## Consecuencias

### Positivas

- Un error de render detiene el build de CI y el despliegue, sin importar qué página lo produce.
- El prerender sigue en workerd: se conserva la paridad con producción y el servicio de imágenes
  de [[0006-picture-multiformat-content-images]].

### Negativas

- La guarda supone `build.format: 'directory'` (`<path>/index.html`). Otro formato hace fallar
  el build hasta ajustarla.
- El mensaje de la guarda nombra las páginas, no la causa: la causa queda en el log del build
  (p. ej. `Lista desalineada: …` de `tListFor`).
- El adaptador sigue tragándose el error de render. Es un defecto reportable en
  `@astrojs/cloudflare`, y la guarda lo mitiga en este repo.

## Alternativas descartadas

- **`prerenderEnvironment: 'node'`**: el build falla ante el error de render, pero el prerender
  deja de correr en workerd: rompe la paridad con producción y el servicio de imágenes de
  ADR-0006.
- **Relajar el criterio de la spec** (que el build no tenga que fallar): deja abierto un riesgo
  de producción demostrado.

## Estado

**Accepted**: 2026-10-08.
