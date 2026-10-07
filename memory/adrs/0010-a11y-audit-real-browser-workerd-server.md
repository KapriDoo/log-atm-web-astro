---
status: accepted
date: 2026-10-06
deciders: sdd-design
consulted: exploration.md, proposal.md, clarifications.md, specs a11y-audit/*, ADR-0007, ADR-0008, tech-context.md (playwright-core 1.63.0, axe-core 4.14.0)
informed: sdd-tasks, sdd-apply, sdd-verify
change_ref: "[[chore-local-container-podman]]"
capability: a11y-audit
tags: [adr, accessibility, wcag, axe-core, playwright, verification]
---

# ADR 0010: Auditoría de accesibilidad en navegador real contra un `astro preview` propio

## Contexto

El proyecto exige WCAG AA y no tiene integración continua. El contraste de color solo se
calcula en un navegador real; una simulación de documento sin navegador no lo mide. La 404 es
una página renderizada bajo demanda por el Worker ([[0007-not-found-page-on-demand-single]]),
así que `dist/client` no contiene ninguna página de «no encontrado». Las animaciones de entrada
parten de textos casi transparentes y producen falsos positivos de contraste. El navegador de
pruebas del desarrollador (`chrome/`) es local y no se versiona.

## Decisión

- Única herramienta de auditoría: `log-atm-web-astro/scripts/axe-audit.mjs`, invocada con
  `npm run a11y`, con `playwright-core` (sin navegador propio) y `axe-core` inyectado en la
  página.
- **Servidor**: el script lanza su propio `astro preview` (workerd) en `127.0.0.1` y un puerto
  libre, después del build y en su propio grupo de procesos, y lo termina al salir. Nunca
  audita contra un servidor preexistente.
- **Navegador**: `CHROME_PATH`; si no está definida, `chrome/*/chrome-linux64/chrome` del
  proyecto (layout de `npx @puppeteer/browsers install chrome@stable`); si no hay ninguno,
  error explícito.
- **Cobertura derivada del build**: todo `*.html` de `dist/client` más una sonda de 404 por
  cada prefijo de idioma de los `hreflang` de `dist/client/index.html`; cada URL en escritorio
  y móvil.
- **Estado final**: `reducedMotion: 'reduce'` en ambos contextos.
- **Reglas**: etiquetas WCAG 2.x A y AA; `best-practice` fuera.
- **Salida**: exit 0 sin hallazgos, 1 con violaciones o estado HTTP inesperado, 2 ante errores
  de precondición o entorno.
- El comando forma parte de los comandos de verificación del perfil del proyecto.

## Consecuencias

### Positivas

- La 404 auditada es la que ve el visitante, renderizada por el mismo runtime de producción.
- Una página o un idioma nuevo entra en la auditoría sin modificar el script.
- El servidor es un proceso nuevo por ejecución: el 500 de `astro preview` tras recompilar
  no puede afectar la auditoría.
- Los resultados son comparables con el barrido de [[0008-contrast-pair-tokens-and-contextual-focus-ring]].

### Negativas

- Depende de un Chrome provisto por quien la ejecuta.
- Requiere un build previo y el arranque de workerd en el equipo (segundos).
- Con movimiento reducido no se audita el estado intermedio de las animaciones; los estados
  inyectados por JavaScript tras interacción y `::placeholder` siguen fuera del alcance de axe.

## Alternativas descartadas

- **Servidor estático de `dist/client`**: no renderiza la 404 bajo demanda.
- **jsdom + axe-core**: no calcula contraste.
- **Auditar contra el contenedor o un preview ya activo**: depende de un proceso externo
  posiblemente en estado inválido y abre un segundo camino.
- **Lista fija de rutas o sitemap**: no cubre páginas nuevas o `noindex` automáticamente.
- **`npx playwright install` / Chrome del sistema por canal**: descarga o fuente adicional de
  navegador.
- **`@axe-core/playwright`**: dependencia extra sin necesidad.

## Estado

**Accepted** — 2026-10-06.
