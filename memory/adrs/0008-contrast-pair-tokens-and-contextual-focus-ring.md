---
status: accepted
date: 2026-10-05
deciders: sdd-design
consulted: exploration.md, proposal.md, clarifications.md, specs ui-contrast/*, forms-email/email-whatsapp-button-contrast, tech-context.md (Tailwind 4.2.2)
informed: sdd-tasks, sdd-apply, sdd-verify
change_ref: "[[fix-color-contrast-sitewide]]"
capability: ui-contrast
tags: [adr, accessibility, wcag, contrast, tokens, focus]
---

# ADR 0008: Pares de contraste como tokens funcionales y anillo de foco por contexto de superficie

## Contexto

El proyecto exige WCAG AA en todos los componentes. El barrido de axe-core en Chrome real
reduce 282 nodos `color-contrast` a 12 causas raíz; todas comparten dos patrones:

- Pares texto/fondo resueltos en cada selector con tonos de paleta o hex literales, de modo
  que un mismo par (texto blanco sobre el verde CTA, texto blanco sobre el verde WhatsApp)
  aparece en 4–9 lugares y no tiene un punto único de corrección.
- Un anillo de foco global de un solo color (`accent-500`) que mide 2.33:1 sobre fondos
  claros. Ningún color único cumple 3:1 a la vez sobre blanco y sobre las superficies
  `primary-700`/`primary-800` del sitio.

Además, `src/lib/email-templates.ts` construye HTML de correo con estilos inline, que los
clientes de correo exigen y que no pueden leer `tokens.css`.

## Decisión

### D1 — Cada par texto/fondo validado es un grupo de tokens funcionales

Los pares que cumplen AA se declaran en `src/styles/tokens.css` como tokens funcionales con
nombre de rol (`--color-{rol}`, `--color-{rol}-hover`, `--color-{rol}-text`,
`--color-{rol}-hover-text`), en `:root` (capa `base`, autoridad en runtime) y en `@theme`
(registro de utilidades de Tailwind). Los componentes consumen el token funcional del par,
no el tono de paleta. `DESIGN.md` publica la tabla de pares validados con el ratio medido.

### D2 — El anillo de foco toma su color del contexto de superficie

- `--color-focus-ring` (superficies claras) y `--color-focus-ring-inverse` (superficies
  oscuras) son tokens funcionales.
- La regla global es `:focus-visible { outline: 3px solid var(--focus-ring-color, var(--color-focus-ring)); }`.
- Toda superficie oscura con controles enfocables declara
  `--focus-ring-color: var(--color-focus-ring-inverse)` en la misma regla que define su
  fondo. Una isla clara dentro de una superficie oscura restablece la variable.
- Los componentes no fijan otro color de anillo ni eliminan el `outline` sin un indicador
  equivalente visible en modos de color forzado.

### D3 — Excepción del canal de correo

`src/lib/email-templates.ts` es el único archivo autorizado a declarar hex de color fuera de
`tokens.css`. Cada par del correo que replica un par del sitio vive en una constante local
con un comentario que nombra los tokens de origen, y `DESIGN.md` declara la excepción.

## Consecuencias

### Positivas

- Un cambio de color de un par se hace en un solo token y alcanza a todos sus consumidores.
- El dato «esta superficie es oscura» vive junto a su fondo; agregar una sección oscura no
  exige editar una lista central.
- El foco usa `outline` en todo el sitio, visible en modos de color forzado.
- Los ratios publicados en `DESIGN.md` provienen del mismo par que el código consume.

### Negativas

- Más tokens en `tokens.css` y la sincronización manual `:root`/`@theme` (deuda previa) crece.
- Una superficie oscura nueva que olvide declarar `--focus-ring-color` muestra el anillo
  claro sobre fondo oscuro (`primary-600` sobre `primary-950` = 3.00:1, sobre `primary-800`
  = 2.05:1); el barrido de foco de `sdd-verify` lo detecta.
- Los hex del correo se mantienen a mano en paralelo con `tokens.css`.

## Alternativas descartadas

- **Tonos de paleta directo en cada selector**: dispersa cada par en varios archivos; un
  ajuste de marca exige buscar y reemplazar.
- **Lista central de selectores oscuros para el anillo**: separa el dato del fondo que lo
  define y deriva al agregar secciones.
- **Clase `.surface-dark` en el markup**: toca el HTML de cada sección oscura y duplica en
  el markup lo que ya declara el CSS del fondo.
- **Un solo color de anillo**: no cumple 3:1 en ambos extremos de superficie del sitio.
- **Inyectar tokens en el correo con un preprocesador (juice/MJML)**: agrega dependencias
  para un único archivo; ADR-0005 mantiene el correo sin preprocesador.

## Referencias

- [[0005-email-section-helpers-textual-logo]] — arquitectura de plantillas de correo con estilos inline.
- Specs: `ui-contrast/contrast-token-single-source`, `ui-contrast/focus-indicator-contrast`, `forms-email/email-whatsapp-button-contrast`, `forms-email/email-reply-button-contrast`.
