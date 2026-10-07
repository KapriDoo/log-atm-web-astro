---
status: accepted
date: 2026-10-06
deciders: sdd-design
consulted: exploration.md, proposal.md, clarifications.md, specs type-check/*, tech-context.md (@astrojs/check 0.9.10, typescript 6.0.3)
informed: sdd-tasks, sdd-apply, sdd-verify
change_ref: "[[chore-local-container-podman]]"
capability: type-check
tags: [adr, typescript, astro-check, build, cloudflare]
---

# ADR 0011: Verificación de tipos separada del build y declaración local de `cloudflare:workers`

## Contexto

`astro build` transpila con esbuild sin verificar tipos; un error de tipado llegó a producción
(`replyTo` vs `reply` en el mailer). El build de producción lo ejecuta Workers Builds con un
comando que no está verificado desde el repo. `astro check` sobre el código vigente da 4
errores, uno de ellos TS2307 por el módulo del runtime `cloudflare:workers`. Los tipos
completos del runtime (`wrangler types`, `@cloudflare/workers-types`) declaran globales que
chocan con `lib.dom` (11 errores medidos). `typescript` 7.x queda fuera del peer de
`@astrojs/check`.

## Decisión

- `npm run check` (`astro check`) es un comando propio; `npm run build` sigue siendo
  `astro build` y no ejecuta la verificación de tipos.
- `typescript` se fija en `^6` (dentro del peer `^5 || ^6` de `@astrojs/check`).
- El código parte de 0 errores y los errores se corrigen en origen, sin supresiones ni
  exclusiones.
- Los tipos de `cloudflare:workers` se declaran localmente en
  `src/types/cloudflare-workers.d.ts` (script ambient), limitados a lo que el código importa.
- `npm run check` figura entre los comandos de verificación del perfil del proyecto, que
  ejecuta `sdd-verify` en cada cambio.

## Consecuencias

### Positivas

- Un error de tipos nunca detiene un despliegue a producción.
- Cada cambio tiene una comprobación de tipos objetiva desde una base limpia.
- El DOM conserva sus tipos: ningún global del runtime de Workers los sobrescribe.

### Negativas

- La verificación depende de que alguien (o `sdd-verify`) la ejecute: sin CI no hay barrera
  automática.
- La declaración local se mantiene a mano: usar otra exportación de `cloudflare:workers`
  exige ampliarla.
- Encadenar `check` al build se reevalúa cuando se conozca el comando de build de Workers
  Builds (residual del MR de [[chore-local-container-podman]]).

## Alternativas descartadas

- **`astro check && astro build`**: puede bloquear el despliegue de producción.
- **`wrangler types` / `@cloudflare/workers-types`**: rompen tipos del DOM.
- **Suprimir o excluir los errores preexistentes**: oculta deuda y anula la detección de
  regresiones.

## Estado

**Accepted** — 2026-10-06.
