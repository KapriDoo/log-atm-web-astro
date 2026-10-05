# Tasks: fix-color-contrast-sitewide

Rutas relativas a la raíz del worktree; el proyecto vive en `log-atm-web-astro/`. Los valores, selectores y ratios de cada tarea salen de `design.md` (D1–D10) y de `adrs/0008-contrast-pair-tokens-and-contextual-focus-ring.md`. El proyecto no tiene suite de tests: ninguna tarea es `[TDD]`; la verificación vive en las tareas 26–29 (scripts fuera del repo, en el directorio de temporales de la fase).

## Orden de ejecución

1. **Tarea 1** (tokens) bloquea a todas las demás: cada selector consume los tokens funcionales que ella declara.
2. **Tarea 2** (DESIGN.md) depende solo de la Tarea 1; la Tarea 29 la reconcilia con los ratios medidos.
3. **Tareas 3–25** (consumidores) son independientes entre sí salvo donde se indica `Requiere`; las que comparten archivo (`global.css`, `shared.css`, `cotizar.css`, `cta.css`, `404.astro`, `CTASection.astro`) se aplican en orden numérico para evitar choques de edición.
4. **Tarea 7** retira `--color-brand-hover` de `tokens.css` solo después de migrar sus consumidores.
5. **Tareas 26–29** (verificación) corren al final, con todas las tareas 1–25 aplicadas.

---

## Spec: [[contrast-token-single-source]] — Pares de color de contraste definidos en una única fuente

### Tarea 1: Declarar los tokens funcionales de contraste en `tokens.css`

- **Archivos**: `log-atm-web-astro/src/styles/tokens.css`
- **Qué hacer**: agregar a `:root` (capa `base`) y a `@theme` (valor literal) los tokens de D1–D6 y D8: paleta `--color-accent-800` (`#22663f`) y `--color-error-light` (`#fca5a5`); funcionales `--color-cta-text` (→ `primary-900`), `--color-cta-hover-text` (→ `primary-950`), `--color-whatsapp` (→ `#25D366`), `--color-whatsapp-text` (`#111b21`), `--color-brand-solid` (→ `primary-600`), `--color-brand-solid-hover` (→ `primary-700`), `--color-brand-solid-text` (→ `--color-text-inverse`), `--color-text-accent` (→ `accent-800`), `--color-focus-ring` (→ `primary-600`), `--color-focus-ring-inverse` (→ `accent-400`). En `@theme` agregar además `--color-cta-hover` y `--color-cta-text`, hoy ausentes. `--color-whatsapp-hover` (`#1da851`) y `--color-whatsapp-hover-dark` no cambian. `--color-brand-hover` se mantiene en esta tarea (Tarea 7 lo retira).
- **Criterio de completado**: cada token nuevo aparece en `:root` y en `@theme`; `--color-whatsapp` vale `#25D366`; `npm run build` termina sin errores de CSS.
- **Modo**: estándar

- [x] Agregar `--color-accent-800` y `--color-error-light` a la paleta de `:root`
- [x] Repetir ambos con su hex resuelto en `@theme`
- [x] Cambiar `--color-cta-text` a `primary-900` y agregar `--color-cta-hover-text` en `:root`
- [x] Agregar `--color-cta-hover` y `--color-cta-text` a `@theme` con el hex resuelto
- [x] Cambiar `--color-whatsapp` a `#25D366` y agregar `--color-whatsapp-text` en `:root` y `@theme`
- [x] Agregar `--color-brand-solid`, `--color-brand-solid-hover` y `--color-brand-solid-text` en `:root` y `@theme`
- [x] Agregar `--color-text-accent`, `--color-focus-ring` y `--color-focus-ring-inverse` en `:root` y `@theme`
- [x] Ejecutar `npm run build` y confirmar que termina sin errores

### Tarea 2: Documentar tokens, pares validados y excepción de correo en `DESIGN.md`

- **Archivos**: `log-atm-web-astro/DESIGN.md`
- **Qué hacer**: actualizar la paleta (`accent-800`, `error-light`), el bloque de tokens funcionales, la tabla «Pares de contraste validados» con los ratios del diseño (tabla de «Contratos de Componentes» y D8), las reglas de botones CTA/WhatsApp/brand, el anillo de foco por contexto (variable `--focus-ring-color`, ADR-0008) y la excepción de hex inline en plantillas de correo (D10).
- **Criterio de completado**: `DESIGN.md` declara la excepción de correos y la tabla de pares coincide con los valores de `design.md`; la Tarea 29 la confirma contra los ratios medidos.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Agregar `accent-800` y `error-light` a la tabla de paleta
- [x] Actualizar el bloque de tokens funcionales con los tokens de la Tarea 1
- [x] Reescribir «Pares de contraste validados» con los ratios del diseño
- [x] Documentar botones CTA, WhatsApp y azul sólido con sus pares y estados
- [x] Documentar el anillo de foco por contexto y la regla de `--focus-ring-color`
- [x] Declarar la excepción de hex inline en `src/lib/email-templates.ts`

---

## Spec: [[cta-button-contrast]] — Botón CTA verde legible en todos sus estados

### Tarea 3: Aplicar el par CTA a `.btn--cta` y a la etiqueta CTA de servicios

- **Archivos**: `log-atm-web-astro/src/styles/global.css`, `log-atm-web-astro/src/styles/sections/services.css`
- **Qué hacer**: `.btn--cta` usa `--color-cta` / `--color-cta-text`; su hover usa `--color-cta-hover` / `--color-cta-hover-text` (D2). `.svc-card__tag--cta` consume `--color-cta` y `--color-cta-text`. El fondo verde no cambia.
- **Criterio de completado**: ningún hex ni tono de paleta en esos selectores; texto `primary-900` en reposo (6.44:1) y `primary-950` en hover (5.10:1).
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar color de texto de `.btn--cta` a `var(--color-cta-text)` en `global.css`
- [x] Cambiar fondo y texto de `.btn--cta:hover` a `--color-cta-hover` y `--color-cta-hover-text`
- [x] Cambiar `.svc-card__tag--cta` en `services.css` a `--color-cta` y `--color-cta-text`

### Tarea 4: Aplicar el par CTA a contacto y cotizador

- **Archivos**: `log-atm-web-astro/src/styles/pages/shared.css`, `log-atm-web-astro/src/styles/pages/cotizar.css`
- **Qué hacer**: `.form-submit` y `.office-card__pin::after` (shared.css) y `.mode-tile--active .mode-tile__check`, `.btn-primary-lg`, `.quote-success__seal` (cotizar.css) consumen `--color-cta` / `--color-cta-text` (D2). `.form-submit` y `.btn-primary-lg` no cambian fondo en hover y quedan en 6.44:1 en todos los estados.
- **Criterio de completado**: los cinco selectores usan los tokens del par CTA; marca, sello y pin sobre verde ≥ 3:1.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar `.form-submit` a `--color-cta-text` sobre `--color-cta` en `shared.css`
- [x] Cambiar el punto `.office-card__pin::after` a `--color-cta-text` en `shared.css`
- [x] Cambiar `.mode-tile--active .mode-tile__check` al par CTA en `cotizar.css`
- [x] Cambiar `.btn-primary-lg` al par CTA en `cotizar.css`
- [x] Cambiar `.quote-success__seal` al par CTA en `cotizar.css`

### Tarea 5: Aplicar el par CTA al botón de la página 404

- **Archivos**: `log-atm-web-astro/src/pages/404.astro`
- **Qué hacer**: `.error-page__cta` y su hover usan `--color-cta` / `--color-cta-text` y `--color-cta-hover` / `--color-cta-hover-text` (D2).
- **Criterio de completado**: `.error-page__cta` cumple ≥ 4.5:1 en reposo y ≥ 5:1 en hover, sin hex literal.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar fondo y texto de `.error-page__cta` al par CTA
- [x] Cambiar fondo y texto de `.error-page__cta:hover` al par de hover

---

## Spec: [[brand-button-contrast]] — Botones azul de marca y enlace de salto legibles

### Tarea 6: Aplicar el par azul sólido a `.btn--brand` y `.skip-link`

- **Archivos**: `log-atm-web-astro/src/styles/global.css`
- **Qué hacer**: `.btn--brand` y `.skip-link` usan `--color-brand-solid` / `--color-brand-solid-text`; el hover de `.btn--brand` usa `--color-brand-solid-hover` (D4). `--color-brand` de enlaces y acentos no cambia.
- **Criterio de completado**: ambos selectores cumplen ≥ 4.5:1 (6.08 reposo, 8.52 hover) y no consumen `--color-brand` ni `--color-brand-hover`.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar fondo y texto de `.btn--brand` al par brand-solid
- [x] Cambiar fondo de `.btn--brand:hover` a `--color-brand-solid-hover`
- [x] Cambiar fondo y texto de `.skip-link` al par brand-solid

### Tarea 7: Aplicar el par azul sólido a la sección final y retirar `--color-brand-hover`

- **Archivos**: `log-atm-web-astro/src/styles/sections/cta.css`, `log-atm-web-astro/src/styles/tokens.css`
- **Qué hacer**: `.cta-final__btn` (+ hover) y el override `.cta-final .btn--cta` (+ hover) fijan fondo **y** texto con el par brand-solid, de modo que ganan a `.btn--cta` en todos los estados y nunca muestran texto oscuro sobre azul (D4). Tras migrar `cta.css:18,189`, eliminar `--color-brand-hover` de `:root`.
- **Criterio de completado**: el botón CTA de la sección final muestra fondo azul con texto claro en reposo y hover; `--color-brand-hover` no aparece en `src/`.
- **Modo**: estándar
- **Requiere**: Tarea 1, Tarea 3

- [x] Cambiar `.cta-final__btn` y su hover al par brand-solid
- [x] Cambiar `.cta-final .btn--cta` fijando fondo y texto del par brand-solid
- [x] Cambiar `.cta-final .btn--cta:hover` fijando fondo y texto del par de hover
- [x] Buscar con grep `--color-brand-hover` en `src/` y confirmar que no quedan consumidores
- [x] Eliminar `--color-brand-hover` de `:root` en `tokens.css`

---

## Spec: [[whatsapp-button-contrast]] — Botones y canal de WhatsApp legibles

### Tarea 8: Migrar `.btn--wa` a los tokens de WhatsApp

- **Archivos**: `log-atm-web-astro/src/styles/global.css`
- **Qué hacer**: `.btn--wa` usa `--color-whatsapp` / `--color-whatsapp-text` y su hover `--color-whatsapp-hover` / `--color-whatsapp-text`, sin hex literales (D3).
- **Criterio de completado**: `.btn--wa` cumple 8.80:1 en reposo y 5.63:1 en hover; el verde visible sigue siendo `#25D366`.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Reemplazar el hex de fondo de `.btn--wa` por `var(--color-whatsapp)`
- [x] Reemplazar el hex de texto de `.btn--wa` por `var(--color-whatsapp-text)`
- [x] Reemplazar el hex de hover de `.btn--wa:hover` por `var(--color-whatsapp-hover)`

### Tarea 9: Pasar `.channel--wa` a fondo sólido con texto oscuro

- **Archivos**: `log-atm-web-astro/src/styles/pages/shared.css`
- **Qué hacer**: `.channel--wa` reemplaza el degradado por fondo sólido `--color-whatsapp`; `.channel__name`, `.channel__value`, `.channel__arrow` y `.channel__icon` de ese canal toman `--color-whatsapp-text` (D3).
- **Criterio de completado**: bloque con fondo uniforme y texto ≥ 4.5:1 en toda su superficie, sin hex literales.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Reemplazar el degradado de `.channel--wa` por `background: var(--color-whatsapp)`
- [x] Asignar `--color-whatsapp-text` a `.channel--wa .channel__name`
- [x] Asignar `--color-whatsapp-text` a `.channel--wa .channel__value`
- [x] Asignar `--color-whatsapp-text` a `.channel--wa .channel__arrow` y `.channel--wa .channel__icon`

---

## Spec: [[email-whatsapp-button-contrast]] — Botón WhatsApp del correo de formulario legible

### Tarea 10: Unificar el par del botón WhatsApp del correo en una constante local

- **Archivos**: `log-atm-web-astro/src/lib/email-templates.ts`
- **Qué hacer**: declarar junto a `btnStyle` una constante con `background:#25D366;color:#111b21;`, con comentario que nombra `--color-whatsapp` y `--color-whatsapp-text` como origen, y consumirla en las dos ramas del botón (líneas ~283 y ~295). La condición de aparición y el enlace `wa.me` no cambian (D10).
- **Criterio de completado**: el par aparece una sola vez en el archivo; `buildContactoEmail` con teléfono muestra el botón con `#111b21`/`#25D366` y sin teléfono no lo muestra.
- **Modo**: estándar

- [x] Declarar la constante del par WhatsApp con comentario de tokens de origen
- [x] Usar la constante en la primera rama del botón WhatsApp
- [x] Usar la constante en la segunda rama del botón WhatsApp
- [x] Confirmar que la condición de aparición y el href `wa.me` quedan intactos

---

## Spec: [[nav-link-state-contrast]] — Enlaces de navegación legibles al pasar el cursor y en página activa

### Tarea 11: Corregir estados de los enlaces de navegación

- **Archivos**: `log-atm-web-astro/src/components/ui/Navbar.astro`
- **Qué hacer**: `.nav__link:hover`, `:focus-visible` y `.is-active` usan `--color-brand-dark` (7.30:1 sobre `#efedeb`); `.nav__link.is-active` agrega subrayado de 2px con `text-underline-offset: 0.3em`; `.nav-drawer__link:hover` y `:focus-visible` usan `--color-brand-dark` (7.70:1 sobre `primary-50`) (D8).
- **Criterio de completado**: enlaces del menú principal y móvil ≥ 4.5:1 en todos sus estados; la página activa se distingue por subrayado además del color.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar color de `.nav__link:hover` y `.nav__link:focus-visible` a `--color-brand-dark`
- [x] Cambiar color de `.nav__link.is-active` a `--color-brand-dark`
- [x] Agregar subrayado de 2px con `text-underline-offset: 0.3em` a `.nav__link.is-active`
- [x] Cambiar color de `.nav-drawer__link:hover` y `:focus-visible` a `--color-brand-dark`

---

## Spec: [[accent-text-contrast]] — Textos de acento verde legibles sobre fondos claros

### Tarea 12: Aplicar `--color-text-accent` a `.eyebrow`

- **Archivos**: `log-atm-web-astro/src/styles/global.css`
- **Qué hacer**: `.eyebrow` usa `--color-text-accent` (D5). Las variantes oscuras (`.eyebrow--light`, `.process-strip .eyebrow`, `.ind-directory-section .eyebrow`) no cambian.
- **Criterio de completado**: `.eyebrow` ≥ 5.9:1 sobre blanco, `neutral-50`, `neutral-100` y `accent-300`.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar el color de `.eyebrow` a `var(--color-text-accent)`
- [x] Confirmar que las variantes oscuras conservan su color propio

### Tarea 13: Aplicar `--color-text-accent` a la pill del formulario

- **Archivos**: `log-atm-web-astro/src/styles/pages/shared.css`
- **Qué hacer**: `.contact-form-card__pill` usa `--color-text-accent` (D5).
- **Criterio de completado**: la pill cumple ≥ 4.5:1 sobre su fondo.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar el color de `.contact-form-card__pill` a `var(--color-text-accent)`

### Tarea 14: Aplicar `--color-text-accent` en el cotizador

- **Archivos**: `log-atm-web-astro/src/styles/pages/cotizar.css`
- **Qué hacer**: `.quote-step__num`, `.quote-summary__sla` y `.quote-success__step-n` usan `--color-text-accent` (D5).
- **Criterio de completado**: los tres selectores ≥ 4.5:1 sobre sus fondos, incluido el estado de éxito del asistente.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar el color de `.quote-step__num` a `var(--color-text-accent)`
- [x] Cambiar el color de `.quote-summary__sla` a `var(--color-text-accent)`
- [x] Cambiar el color de `.quote-success__step-n` a `var(--color-text-accent)`

---

## Spec: [[dark-surface-heading-legibility]] — Títulos legibles sobre fondos oscuros y fotografías

### Tarea 15: Dar color claro al título del resumen de cotización

- **Archivos**: `log-atm-web-astro/src/styles/pages/cotizar.css`
- **Qué hacer**: `.quote-summary__title` usa `--color-text-inverse` en una regla sin capa de su propia hoja (D8; 16.08:1 sobre `primary-900`).
- **Criterio de completado**: título ≥ 4.5:1 sobre el panel oscuro.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Agregar `color: var(--color-text-inverse)` a `.quote-summary__title`

### Tarea 16: Dar color claro al nombre de industria del directorio

- **Archivos**: `log-atm-web-astro/src/styles/pages/shared.css`
- **Qué hacer**: `.ind-directory__name` usa `--color-text-inverse` (D8); es la única otra cabecera sobre fondo oscuro sin color explícito.
- **Criterio de completado**: nombre legible ≥ 4.5:1 sobre la zona inferior del overlay en todas las diapositivas.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Agregar `color: var(--color-text-inverse)` a `.ind-directory__name`

---

## Spec: [[quote-summary-empty-values-contrast]] — Valores pendientes del resumen de cotización legibles

### Tarea 17: Corregir el color de los valores pendientes

- **Archivos**: `log-atm-web-astro/src/styles/pages/cotizar.css`
- **Qué hacer**: `.quote-summary__row .v.empty` usa `--color-text-muted` (5.44:1 sobre blanco); itálica y peso 400 se mantienen como señal de valor pendiente (D8).
- **Criterio de completado**: «Por definir» ≥ 4.5:1 y distinguible de un valor completado.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar el color de `.quote-summary__row .v.empty` a `var(--color-text-muted)`
- [x] Confirmar que itálica y peso 400 se conservan

---

## Spec: [[secondary-text-dark-surface-contrast]] — Textos de apoyo legibles sobre superficies oscuras

### Tarea 18: Corregir aviso y estados de la sección final

- **Archivos**: `log-atm-web-astro/src/components/sections/CTASection.astro`
- **Qué hacer**: `.cta-final__hint` usa `--color-primary-200` (9.28:1); `.cta-final__status[data-kind=error]` usa `--color-error-light` (8.49:1); `.cta-final__status[data-kind=success]` usa `--color-accent-400` en lugar del hex `#2d9b6f` (9.18:1) (D8).
- **Criterio de completado**: aviso y mensajes de error y éxito ≥ 4.5:1 sobre el vidrio de `.cta-final`, sin hex literal.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar el color de `.cta-final__hint` a `var(--color-primary-200)`
- [x] Cambiar el color de `.cta-final__status[data-kind=error]` a `var(--color-error-light)`
- [x] Cambiar el color de `.cta-final__status[data-kind=success]` a `var(--color-accent-400)`

### Tarea 19: Corregir textos de apoyo del directorio, pasos y migas, y pastilla del contador

- **Archivos**: `log-atm-web-astro/src/styles/pages/shared.css`
- **Qué hacer**: `.ind-directory__item-num` usa `--color-primary-200` (hover/activo sigue en `accent-300`); `.howwork-card__step` usa `--color-brand-dark`; `.page-hero__breadcrumb a` sin `opacity: 0.7` (hover `accent-400` sin cambio) (D8). `.ind-directory__counter` recibe pastilla `color-mix(in srgb, var(--color-primary-950) 65%, transparent)` con `backdrop-filter: blur(6px)`, padding y `border-radius: var(--radius-pill)`; `.sep` y `.total` heredan el blanco del contador y pierden sus `rgba` 0.4/0.55 (D9).
- **Criterio de completado**: número de ítem, total, etiqueta de paso y migas ≥ 4.5:1; el contador cumple 5.65:1 en el peor caso (foto blanca).
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar el color de `.ind-directory__item-num` a `var(--color-primary-200)` sin tocar hover/activo
- [x] Cambiar el color de `.howwork-card__step` a `var(--color-brand-dark)`
- [x] Retirar `opacity: 0.7` de `.page-hero__breadcrumb a`
- [x] Agregar fondo de pastilla, `backdrop-filter`, padding y `border-radius` a `.ind-directory__counter`
- [x] Retirar los `rgba` de `.ind-directory__counter .sep` y `.total` para que hereden el blanco

---

## Spec: [[error-page-code-contrast]] — Código decorativo de la página 404 con contraste de texto grande

### Tarea 20: Corregir color y tamaño mínimo del código 404

- **Archivos**: `log-atm-web-astro/src/pages/404.astro`
- **Qué hacer**: `.error-page__code` usa `--color-brand` (4.10:1 sobre `neutral-50`), `font-size: clamp(6rem, 15vw, 10rem)` (mínimo 96px) y peso 900 (D8). El código sigue decorativo para lectores de pantalla (sin cambiar el atributo `aria-hidden` del markup).
- **Criterio de completado**: ≥ 3:1 en es/en/pt; tamaño calculado ≥ 24px en 390px y 1440px de ancho.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar el color de `.error-page__code` a `var(--color-brand)`
- [x] Fijar `font-size: clamp(6rem, 15vw, 10rem)` y `font-weight: 900`
- [x] Confirmar que el markup del código conserva su condición decorativa

---

## Spec: [[services-filter-active-state-contrast]] — Filtro activo de servicios legible al pasar el cursor

### Tarea 21: Excluir al filtro activo del hover de filtros

- **Archivos**: `log-atm-web-astro/src/styles/pages/shared.css`
- **Qué hacer**: cambiar `.svc-filter:hover` por `.svc-filter:not(.svc-filter--active):hover` (D8) para que el hover no pise al filtro activo (blanco sobre `primary-900`, 16.08:1).
- **Criterio de completado**: filtro activo ≥ 4.5:1 con cursor, foco y presionado; los inactivos conservan su respuesta al cursor.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Cambiar el selector `.svc-filter:hover` a `.svc-filter:not(.svc-filter--active):hover`
- [x] Confirmar que el estilo hover de los filtros inactivos no cambia

---

## Spec: [[focus-indicator-contrast]] — Indicador de foco visible sobre superficies claras y oscuras

### Tarea 22: Parametrizar el anillo de foco global

- **Archivos**: `log-atm-web-astro/src/styles/global.css`
- **Qué hacer**: la regla global `:focus-visible` usa `outline: 3px solid var(--focus-ring-color, var(--color-focus-ring))` (D6, ADR-0008).
- **Criterio de completado**: sobre superficies claras el anillo es `primary-600` (≥ 5.20:1); una superficie que declare `--focus-ring-color` lo sobrescribe.
- **Modo**: estándar
- **Requiere**: Tarea 1

- [x] Reemplazar el color del `outline` global por `var(--focus-ring-color, var(--color-focus-ring))`

### Tarea 23: Declarar `--focus-ring-color` en las superficies oscuras

- **Archivos**: `log-atm-web-astro/src/styles/sections/hero.css`, `log-atm-web-astro/src/styles/pages/shared.css`, `log-atm-web-astro/src/styles/pages/cotizar.css`, `log-atm-web-astro/src/styles/sections/cta.css`, `log-atm-web-astro/src/components/ui/Footer.astro`
- **Qué hacer**: en la misma regla que define el fondo de `.hero-b`, `.page-hero`, `.ind-directory-section`, `.quote-hero`, `.cta-final` y `.footer`, agregar `--focus-ring-color: var(--color-focus-ring-inverse)` (D6). `.why__video-toggle:focus-visible` se mantiene.
- **Criterio de completado**: las seis superficies declaran la variable con ese valor exacto; anillo ≥ 4.86:1 sobre `primary-700` a `primary-950` y `neutral-950`.
- **Modo**: estándar
- **Requiere**: Tarea 22

- [x] Declarar `--focus-ring-color` en `.hero-b` de `hero.css`
- [x] Declarar `--focus-ring-color` en `.page-hero` y `.ind-directory-section` de `shared.css`
- [x] Declarar `--focus-ring-color` en `.quote-hero` de `cotizar.css`
- [x] Declarar `--focus-ring-color` en `.cta-final` de `cta.css`
- [x] Declarar `--focus-ring-color` en `.footer` de `Footer.astro`

### Tarea 24: Mostrar el foco en las opciones del selector de idioma

- **Archivos**: `log-atm-web-astro/src/components/ui/LanguageSelector.astro`
- **Qué hacer**: quitar `outline: none` de la regla compartida hover/foco de `.lang-selector__option` y agregar `outline-offset: -3px` en `.lang-selector__option:focus-visible` (anillo interior; `primary-600` sobre `primary-50` = 5.49:1) (D7).
- **Criterio de completado**: la opción enfocada por teclado muestra el anillo global sin superponerse a la vecina.
- **Modo**: estándar
- **Requiere**: Tarea 22

- [x] Quitar `outline: none` de la regla compartida hover/foco de `.lang-selector__option`
- [x] Agregar `outline-offset: -3px` a `.lang-selector__option:focus-visible`

### Tarea 25: Retirar `outline: none` de campos y overrides de anillo

- **Archivos**: `log-atm-web-astro/src/styles/pages/shared.css`, `log-atm-web-astro/src/styles/sections/cta.css`, `log-atm-web-astro/src/components/sections/CTASection.astro`, `log-atm-web-astro/src/pages/404.astro`
- **Qué hacer**: en `.form-field input/select/textarea:focus` quitar `outline: none` y la sombra al 15 %, y fijar borde `--color-focus-ring` (4.54:1 contra `neutral-200`); en `.cta-final__input:focus` quitar `outline: none` y fijar borde `--color-focus-ring-inverse`; eliminar `.cta-final__channel:focus-visible` (CTASection.astro) y `.error-page__cta:focus-visible` (404.astro) para heredar el anillo de contexto (D7, D6).
- **Criterio de completado**: ningún `outline: none` restante en `src/` sin indicador alternativo; los campos enfocados cumplen ≥ 3:1 contra su estado sin foco.
- **Modo**: estándar
- **Requiere**: Tarea 22, Tarea 23

- [x] Quitar `outline: none` y la sombra al 15 % de `.form-field` en foco y fijar `border-color: var(--color-focus-ring)`
- [x] Quitar `outline: none` de `.cta-final__input:focus` y fijar `border-color: var(--color-focus-ring-inverse)`
- [x] Eliminar la regla `.cta-final__channel:focus-visible` de `CTASection.astro`
- [x] Eliminar la regla `.error-page__cta:focus-visible` de `404.astro`
- [x] Buscar con grep `outline: none` en `src/` y confirmar que cada resto tiene indicador alternativo

---

## Spec: [[sitewide-contrast-verification]] — Contraste AA verificado en todas las páginas y estados

### Tarea 26: Verificar build y reglas estáticas sobre el diff

- **Archivos**: `log-atm-web-astro/src/` (solo lectura); scripts en el directorio de temporales de la fase
- **Qué hacer**: ejecutar `npm run build`; sobre el diff contra `main` comprobar que no hay líneas agregadas con `#[0-9a-fA-F]{3,8}` fuera de `src/styles/tokens.css` y `src/lib/email-templates.ts`; que cada token nuevo está en `:root` y `@theme`; y calcular con la fórmula WCAG 2.x los ratios de todos los pares de la tabla de contratos de `design.md` contra sus umbrales.
- **Criterio de completado**: build sin errores, 0 hex literales nuevos fuera de las dos excepciones, todos los pares ≥ su umbral.
- **Modo**: estándar
- **Requiere**: Tareas 1–25

- [x] Ejecutar `npm run build` y registrar el resultado
- [x] Revisar el diff contra `main` buscando hex literales fuera de `tokens.css` y `email-templates.ts`
- [x] Verificar que cada token nuevo figura en `:root` y en `@theme`
- [x] Calcular los ratios de los pares de `design.md` y compararlos con sus umbrales

### Tarea 27: Auditar contraste con axe-core en Chrome real

- **Archivos**: ninguno del repo; scripts en el directorio de temporales de la fase
- **Qué hacer**: con `astro preview` y Chrome, ejecutar la regla `color-contrast` de axe-core sobre las 21 URL en desktop (1440×900) y móvil (390×844) tras scroll completo, y repetir con `prefers-reduced-motion: reduce`.
- **Criterio de completado**: 0 violaciones en las 42 combinaciones, con y sin movimiento reducido.
- **Modo**: estándar
- **Requiere**: Tarea 26

- [x] Levantar `astro preview` sobre el build de la Tarea 26
- [x] Ejecutar axe `color-contrast` sobre las 21 URL en desktop y móvil
- [x] Repetir la auditoría con `prefers-reduced-motion: reduce`
- [x] Registrar las violaciones restantes y corregir su origen si las hay

### Tarea 28: Verificar estados interactivos, foco, píxeles y correo

- **Archivos**: ninguno del repo; scripts en el directorio de temporales de la fase
- **Qué hacer**: pasada interactiva de hover, `:focus-visible` por teclado y `:active` sobre botones, enlaces, filtros, chips y campos, con drawer móvil abierto, `/cotizar/` con pasos y estado de éxito, y `.cta-final__status` forzado a `error` y `success`; medir el ratio del anillo contra el fondo adyacente en superficies claras y oscuras; muestrear píxeles y revisar `/industrias/` (nombre y contador en todas las diapositivas), `/contacto/` (`.channel--wa`), migas de heroes y tamaño computado de `.error-page__code` en `/xx-nope/` a 390px y 1440px; barrer la sección final en `/`, `/servicios/`, `/industrias/`, `/nosotros/` en es/en/pt (fondo azul con texto claro en reposo y hover); renderizar `buildContactoEmail` con y sin teléfono.
- **Criterio de completado**: texto ≥ 4.5:1 y gráficos/texto grande ≥ 3:1 en todos los estados; anillo ≥ 3:1 en ambos tipos de superficie; sin textos ilegibles en industrias ni contacto; correo con par `#111b21`/`#25D366` y sin botón cuando no hay teléfono.
- **Modo**: estándar
- **Requiere**: Tarea 26

- [x] Recorrer hover, foco por teclado y presionado en los controles interactivos
- [x] Medir el ratio del anillo de foco en superficies claras y oscuras
- [x] Revisar `/industrias/` y `/contacto/` con muestreo de píxeles y capturas
- [x] Medir el tamaño computado de `.error-page__code` a 390px y 1440px
- [x] Barrer la sección final en las cuatro páginas y tres idiomas
- [x] Renderizar `buildContactoEmail` con y sin teléfono y comprobar el botón

### Tarea 29: Reconciliar `DESIGN.md` con los ratios medidos

- **Archivos**: `log-atm-web-astro/DESIGN.md`
- **Qué hacer**: comparar la tabla «Pares de contraste validados» con los ratios medidos en las Tareas 26–28 y corregir cualquier diferencia.
- **Criterio de completado**: cada ratio de la tabla coincide con el medido.
- **Modo**: estándar
- **Requiere**: Tarea 2, Tarea 26, Tarea 28

- [x] Comparar cada fila de la tabla de pares con el ratio medido
- [x] Corregir en `DESIGN.md` las filas que difieran
