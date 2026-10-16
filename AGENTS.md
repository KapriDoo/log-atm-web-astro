# AGENTS.md — log-atm-web-astro

Sitio web de LOG ATM, servicios de logística aérea y marítima. Stack: Astro 6, Tailwind v4, React (islas), GSAP y Framer Motion, desplegado en Cloudflare con `@astrojs/cloudflare`. Idiomas del sitio: español (`es`, sin prefijo en la URL), inglés (`en`) y portugués (`pt`).

## Estructura

- La app vive en el subdirectorio `log-atm-web-astro/`; una ruta `src/...` es relativa a él.
- `log-atm-web-astro/CLAUDE.md` es la guía del proyecto: identidad, principios y documentación clave (`DESIGN.md` para tokens y reglas visuales, `docs/project-brief.md` para marca y tono). Léela antes de cambiar algo.
- `memory/`, en la raíz, guarda la documentación que dejó la herramienta anterior: las specs vigentes en `memory/specs/`, las decisiones en `memory/adrs/` y el perfil técnico en `memory/_profile.md`. Se consulta; los artefactos de simba van en `openspec/`.

## Comandos

Desde la raíz del repo, con `--prefix` y sin `cd`:

- `npm run build --prefix log-atm-web-astro`: el build de Astro. No verifica tipos.
- `npm run validate-i18n --prefix log-atm-web-astro`: la paridad de claves entre es, en y pt.

## Cómo se verifica

- El proyecto no tiene tests automatizados: `package.json` no trae un script de tests ni un runner, y no hay integración continua. Lo automático son los comandos de arriba, que simba corre como compuertas.
- Lo demás (el comportamiento en el navegador, el envío real de correos, lo que se ve en pantalla) lo verifica a mano quien desarrolla, antes del deploy.
- Por eso, un criterio de comportamiento se verifica leyendo el código contra el criterio y con esos comandos, sin exigir un test; agregar un runner de tests es un cambio aparte, que se pide.

## Convenciones

- Commits en inglés, con Conventional Commits.
- Comentarios del código en español.
- Specs, propuestas y documentación del cambio en español.
- Principios del proyecto: KISS, YAGNI, DRY y SRP; `prefers-reduced-motion` en toda animación; WCAG AA como mínimo en todos los componentes; Lighthouse ≥ 95 en todas las páginas.
