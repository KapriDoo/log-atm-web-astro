---
type: proposal
change_name: "fix-color-contrast-sitewide"
domain: "fix"
status: approved
iteration: 2
effort: L
risks:
  - descripcion: "Regresión del override azul del CTA final (.cta-final .btn--cta / .hero-b__ctas > .btn--cta): al pasar --color-cta-text a oscuro, queda texto oscuro sobre azul si el override no fija su propio texto"
    probabilidad: Media
    mitigacion: "Override explícito con texto inverso sobre primary-600 (6.08:1); barrido axe sobre las cuatro páginas que montan el CTA final"
  - descripcion: "Falso verde de axe: 12-82 incomplete por página (texto sobre foto, degradados, pseudo-elementos) quedan fuera del conteo de violaciones"
    probabilidad: Media
    mitigacion: "sdd-verify repite el muestreo de píxeles y la revisión visual de /industrias/ y /contacto/ además del barrido axe"
  - descripcion: "Estados interactivos (hover, foco, activo, drawer, pasos del wizard) no aparecen en el barrido estático y pueden quedar fallando"
    probabilidad: Media
    mitigacion: "Repetir la pasada interactiva de la exploración, con prefers-reduced-motion, en desktop y móvil"
  - descripcion: "Token nuevo declarado solo en :root o solo en @theme no llega a var() o a Tailwind"
    probabilidad: Baja
    mitigacion: "Declarar cada token en ambos bloques de tokens.css y comprobar con npm run build"
  - descripcion: "El hex inline del botón WhatsApp en lib/email-templates.ts (#111b21 sobre #25D366) queda fuera de tokens.css y puede divergir de --color-whatsapp-text / --color-whatsapp si estos cambian"
    probabilidad: Baja
    mitigacion: "Comentario junto al estilo inline que nombra el token de origen, y la excepción declarada en DESIGN.md"
  - descripcion: ".error-page__code con primary-500 (4.10:1) cumple solo como texto grande; si en algún breakpoint mide menos de 24px (18.66px en bold) falla AA"
    probabilidad: Baja
    mitigacion: "sdd-design y sdd-verify confirman el tamaño computado en todos los breakpoints; si no alcanza, se usa primary-600"
  - descripcion: "Cambio visual de marca percibido (texto oscuro en CTA y WhatsApp, verde de eyebrow más oscuro)"
    probabilidad: Baja
    mitigacion: "Decisión ya tomada por el usuario; tabla antes/después en el PR"
created: "2026-10-03"
updated: "2026-10-04"
tags: [proposal]
---

# Propuesta: fix-color-contrast-sitewide

## Intent

Llevar todo el sitio a WCAG AA de contraste (regla del proyecto: AA mínimo en todos los componentes). El barrido de axe-core en Chrome real da 282 nodos `color-contrast` en 42 combinaciones (21 URL × desktop/móvil), que se reducen a 12 causas raíz; a eso se suman defectos reales que axe deja como `incomplete` (un h3 invisible en `/industrias/`, `.channel--wa`) y un anillo de foco global de 2.33:1 sobre fondos claros.

## Scope

**Incluye:**
- Las 12 causas raíz de `exploration.md`: CTA verde, WhatsApp, `.btn--brand`/`.skip-link`/`.cta-final__btn`, nav y drawer, `.eyebrow`/`.quote-step__num`, pill/SLA, `.v.empty`, `.quote-summary__title`, `.error-page__code`, `.svc-filter--active:hover` y el override del CTA final, con todos sus estados (normal, hover, foco, activo).
- Defectos reales entre los `incomplete` que no dependen de una foto: `.ind-directory__name`, `.ind-directory__item-num`/`.total`, `.channel--wa`, `.cta-final__hint`/`__status`, `.howwork-card__step` y `.page-hero__breadcrumb a`.
- Elementos no textuales con el mismo par fallido (`.mode-tile__check`, `.quote-success__seal`, `.office-card__pin`, `.btn-primary-lg`), que consumen el token de texto del CTA.
- Foco: anillo global ≥ 3:1 sobre superficies claras y oscuras, y retiro de los `outline: none` que no tienen un indicador alternativo visible (`.lang-selector__option`, `.form-field *:focus`).
- Botón WhatsApp de los correos (`src/lib/email-templates.ts:283,295`): texto `#111b21` inline sobre `#25D366` (8.80:1), con la misma decisión de marca que el botón del sitio.
- Tokens en `tokens.css` (`:root` y `@theme`), corrección de `DESIGN.md` («Pares de contraste validados» en `DESIGN.md:77-83`, botones, WhatsApp) y la tabla antes/después en el PR.

**Excepción declarada a «sin hex nuevos fuera de `tokens.css`»:** los hex de `src/lib/email-templates.ts` quedan inline porque los clientes de correo exigen estilos inline y no leen `tokens.css`. La excepción alcanza solo a ese archivo (canal de correo), ya fue aceptada en la validación de la auditoría y queda registrada en `DESIGN.md`.

**Excluye explícitamente:**
- Rediseño de la paleta de marca más allá de los pares que fallan; `scripts/axe-audit.mjs` (brief 10).
- Limpieza de los ~34 hex literales que ya existen fuera de `tokens.css` y no participan en un par fallido.
- Texto blanco sobre fotos y video (`.svc-card__*`, `.ind-card__*`, `.hero-b__*`, `.btn--ghost-light`): requiere rediseñar overlays y degradados, una decisión visual aún no tomada con verificación manual y heurística. Se difiere a un cambio aparte (clarificación 1).

## Approach Propuesto

Approach B de la exploración, sin el texto sobre fotos: tokens semánticos por par texto/fondo en `tokens.css`, y cada selector que falla consume su token. CTA: `--color-cta-text` = primary-900 (6.44:1), y en hover fondo accent-600 con texto primary-950 (5.10:1, nuevo `--color-cta-hover-text`). WhatsApp: `--color-whatsapp` pasa a `#25D366`, `--color-whatsapp-hover` se queda en `#1da851` y se crea `--color-whatsapp-text` `#111b21` (8.80 y 5.63:1); se retiran los hex literales de `.btn--wa` y `.channel--wa`, y `.channel--wa` pasa a fondo sólido porque el extremo `#128C7E` de su degradado falla con texto oscuro (4.22:1). `.btn--brand`, `.skip-link`, `.cta-final__btn` y el override del CTA final usan primary-600 con texto inverso, y primary-700 en hover. Nav y drawer usan primary-700 en hover y en activo. Se agrega un tono `--color-accent-800` (orientativo `#22663f`: 5.8:1 sobre accent-300 y 5.9:1 sobre neutral-100) para `.eyebrow`, `.quote-step__num`, la pill y el SLA, porque accent-700 queda en 4.4993:1 sobre `#efedeb`. En el correo, el botón WhatsApp recibe `color:#111b21` inline, con un comentario que nombra el token de origen. Correcciones puntuales: `.v.empty` pasa a neutral-600 (5.44:1); `.error-page__code` a primary-500 (4.10:1), válido solo como texto grande, así que design y verify deben confirmar que mide ≥ 24px (≥ 18.66px en bold) en todos los breakpoints; en `.svc-filter--active:hover` se corrige la especificidad, que hoy deja texto `#211f1c` sobre primary-900 (1.02:1). Los headings sobre fondo oscuro reciben un color explícito, y el anillo de foco usa un token para superficies claras (primary-600, 5.68:1) y otro para oscuras (accent-400, 10.4:1); ningún color sirve para ambas. Para verificar, se repite el barrido de la exploración: axe sobre 42 combinaciones, la pasada interactiva y el muestreo de píxeles.

## Esfuerzo Estimado

Unos 12 archivos (tokens, global, cta, services, shared, cotizar, Navbar, LanguageSelector, CTASection, 404, `lib/email-templates.ts` y DESIGN.md), con unos 30 selectores y sus estados, más un barrido de verificación caro: 42 combinaciones, la pasada interactiva y la revisión visual. Cada cambio es simple; lo que pesa es la superficie y la verificación.

## Riesgos

- Override del CTA final: se incluye como tarea propia y en el barrido de las cuatro páginas que lo montan.
- Falso verde de axe: el criterio de cierre suma el muestreo de píxeles y la revisión visual, no solo «0 violations».
- Estados interactivos: la verificación repite la pasada interactiva de la exploración.
- Desincronización `:root`/`@theme`: cada token se declara en los dos bloques y se valida con el build.
- Hex inline del correo: comentario con el token de origen y excepción registrada en `DESIGN.md`.
- `.error-page__code`: tamaño computado verificado por breakpoint, con primary-600 como respaldo.
- Cambio visual: va en la tabla antes/después del PR.

## Trade-offs

- **A favor**: cumple el «AA en todos los componentes» del proyecto, no solo el conteo de axe, y cierra un h3 ilegible que axe no detecta. Hay un único par texto/fondo por token (SSOT), y los tokens WhatsApp huérfanos, cuyo valor hoy no coincide con el verde visible, pasan a estar en uso. El correo y el sitio muestran el mismo botón WhatsApp.
- **En contra**: el correo agrega un hex inline fuera de `tokens.css` (excepción declarada, que se mantiene a mano). El alcance supera el brief (incluye `incomplete` y foco global) y sube el esfuerzo de M a L. `accent-800` agrega un tono a la paleta y oscurece el eyebrow en todo el sitio; un token por sección para el caso `#efedeb` evitaría ese cambio, pero dispersa el par. `.channel--wa` pierde su degradado. El texto sobre fotos queda pendiente, y las páginas con fotos pueden seguir con `incomplete` reales.
