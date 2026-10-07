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

# ADR 0011: Verificación de tipos separada del build local, encadenada en el build de CI, y declaración local de `cloudflare:workers`

## Contexto

`astro build` transpila con esbuild sin verificar tipos; un error de tipado llegó a producción
(`replyTo` vs `reply` en el mailer). El build de producción lo ejecuta Workers Builds, que
corre en cada push y en cada pull request y es el único CI del proyecto; su comando de build
vive en el dashboard de Cloudflare (`cd log-atm-web-astro && npm ci && npm run <script>`, con
directorio raíz `/`). `astro check` sobre el código vigente da 4
errores, uno de ellos TS2307 por el módulo del runtime `cloudflare:workers`. Los tipos
completos del runtime (`wrangler types`, `@cloudflare/workers-types`) declaran globales que
chocan con `lib.dom` (11 errores medidos). `typescript` 7.x queda fuera del peer de
`@astrojs/check`.

## Decisión

- `npm run check` (`astro check`) es un comando propio; `npm run build` es `astro build` y
  no ejecuta la verificación de tipos: es el build local rápido.
- El type-check corre en CI mediante `npm run build:ci` (`astro check && astro build`), el
  script que ejecuta el comando de build de Workers Builds
  (`cd log-atm-web-astro && npm ci && npm run build:ci`). Un error de tipos detiene el build
  de CI y el check del pull request.
- `typescript` se fija en `^6` (dentro del peer `^5 || ^6` de `@astrojs/check`).
- El código parte de 0 errores y los errores se corrigen en origen, sin supresiones ni
  exclusiones.
- Los tipos de `cloudflare:workers` se declaran localmente en
  `src/types/cloudflare-workers.d.ts` (script ambient), limitados a lo que el código importa.
- `npm run check` figura entre los comandos de verificación del perfil del proyecto, que
  ejecuta `sdd-verify` en cada cambio.

## Consecuencias

### Positivas

- Un error de tipos falla el check «Workers Builds: log-atm-web» del pull request antes de
  llegar a `main`: la barrera es automática.
- El build local conserva su velocidad: `npm run build` no verifica tipos.
- Cada cambio tiene una comprobación de tipos objetiva desde una base limpia.
- El DOM conserva sus tipos: ningún global del runtime de Workers los sobrescribe.

### Negativas

- Un error de tipos bloquea el despliegue a producción hasta corregirse en origen.
- El comando de build de CI vive en el dashboard de Cloudflare, fuera del repositorio: se
  mantiene a mano y el README documenta su valor.
- La declaración local se mantiene a mano: usar otra exportación de `cloudflare:workers`
  exige ampliarla.

## Alternativas descartadas

- **`astro check && astro build` como `npm run build`**: hace lento cada build local; el
  encadenamiento queda limitado al build de CI (`build:ci`).
- **Verificación de tipos solo manual (`npm run check` y `sdd-verify`)**: sin barrera
  automática en el único CI del proyecto.
- **`wrangler types` / `@cloudflare/workers-types`**: rompen tipos del DOM.
- **Suprimir o excluir los errores preexistentes**: oculta deuda y anula la detección de
  regresiones.

## Estado

**Accepted** — 2026-10-06. Actualizado por [[chore-deploy-config]] (2026-10-06): type-check en
CI vía `build:ci`.
