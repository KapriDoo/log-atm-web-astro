# Exploración: fix-color-contrast-sitewide

## Metodología del barrido

[fuente: código log-atm-web-astro/dist (build del worktree) + axe-core 4.x en Chrome 148 real (`chrome/linux-148.0.7778.167`) contra `astro preview`]

- Páginas: `/`, `/servicios/`, `/industrias/`, `/nosotros/`, `/contacto/`, `/cotizar/` y la 404 (`/xx-nope/`) en es, `/en/` y `/pt/` (21 URL), en desktop (1440x900) y móvil (390x844, touch): 42 combinaciones.
- Regla `color-contrast` únicamente, tras recorrer la página con scroll (dispara los reveals GSAP). La 404 se evalúa también por URL inexistente dentro de cada idioma.
- Pasada de estados interactivos (hover, `:focus-visible` por teclado, `:active`) sobre una muestra de 2 elementos por firma (tag + clase + región) en las 6 páginas más la 404; en móvil con el drawer abierto; en `/cotizar/` y `/contacto/` con `[hidden]` removido para exponer pasos del wizard y estados de éxito. Repetida con `prefers-reduced-motion: reduce` para eliminar ruido de transiciones.
- Pasada de píxeles sobre los nodos `incomplete` de axe (texto sobre foto, degradado o pseudo-elemento, que axe no puede resolver): se oculta el texto del nodo, se captura el rectángulo y se calcula el ratio del color de texto contra cada píxel. Es heurística, no veredicto WCAG (ver "Incompletos").
- `scripts/axe-audit.mjs` (roto, fuera de alcance) no se usó. Los scripts del barrido viven en el directorio de temporales del despacho y no entran al repo.

## Estado Actual

### Recuento de nodos

[fuente: código dist + axe]

| Vista | es | en | pt |
|-------|----|----|----|
| Desktop (con 404) | 52 | 52 | 52 |
| Desktop (sin 404) | 48 | 48 | 48 |
| Móvil (con 404) | **43** | 40 | 43 |
| Móvil (sin 404) | 40 | 37 | 40 |

El "43" del brief coincide con es/móvil incluyendo la 404. En total hay 282 nodos `violations` sobre las 42 combinaciones, que se reducen a 40 firmas de selector únicas y a 12 causas raíz (tabla siguiente). Los tres idiomas comparten CSS; las diferencias de conteo entre idiomas (por ejemplo, `/en/industrias/` móvil 2 nodos frente a 5 en es/pt) no se investigaron a fondo y no alteran las causas raíz.

### Causas raíz de las violaciones `color-contrast` (violations de axe)

[fuente: código styles/global.css, styles/pages/shared.css, styles/pages/cotizar.css, styles/sections/*.css, components/ui/Navbar.astro, pages/404.astro]

| # | Causa raíz | Ratio actual (umbral) | Selectores / lugares | Origen |
|---|-----------|----------------------|----------------------|--------|
| 1 | Texto `--color-text-inverse` (#fff) sobre `--color-cta` #3EB978 | 2.49 (4.5) | `.btn--cta` (hero, navbar, drawer); `.svc-card__tag--cta` (11px); `.form-submit` / `.form-submit__label` (contacto); `.error-page__cta` (404, hover #339965 = 3.56) | global.css:128-136; services.css:144-147; shared.css:836-838 (`color:#fff`); 404.astro:94-108 |
| 2 | Texto blanco sobre `#25D366` | 1.98 (4.5); hover #1da851 = 3.10 | `.btn--wa` (hero CTA final, navbar/drawer, cotizar éxito) | global.css:158-162 (hex literal, sin token) |
| 3 | Texto blanco sobre `--color-brand` (primary-500) | 4.38 (4.5) | `.btn--brand` y `.btn--brand.btn--sm` (navbar, servicios filas, ServicesSection, cotizar éxito); `.skip-link`; `.cta-final__btn`; `.cta-final .btn--cta` (override azul del CTA final) | global.css:137-141 y 42-55; cta.css:13-20 y 168-193 |
| 4 | `.nav__link:hover` / `.is-active`: color brand sobre `--color-surface-alt` #efedeb | 3.75 | `Navbar` desktop, todas las páginas internas (activo) | Navbar.astro:177-181 |
| 5 | `.nav-drawer__link:hover`: brand sobre primary-50 #eef4fb | 3.95 | drawer móvil | Navbar.astro:321 |
| 6 | `.eyebrow` y `.quote-step__num`: accent-600 #339965 sobre fondos claros | 3.05-3.56 (4.5; texto de 12px bold / 11.2px) | `.eyebrow` en las secciones de home, servicios, industrias, nosotros, contacto; `.quote-step__num` | global.css:181-190 (`.eyebrow`, color accent-600 en la línea 189); cotizar.css:132-136 |
| 7 | accent-700 #297A51 sobre accent-300 #d8f1e6 | 4.41 (4.5) | `.contact-form-card__pill`; `.quote-summary__sla` | shared.css:796-800; cotizar.css:341-346 |
| 8 | neutral-400 #aaa6a1 sobre blanco | 2.41 | `.quote-summary__row .v.empty` (4 spans "Por definir") | cotizar.css:335 |
| 9 | Color de heading global (neutral-900) heredado sobre fondo oscuro | **1.02** | `.quote-summary__title` (primary-900), idéntico mecanismo que `#dir-name` (ver Incompletos) | cotizar.css:309-312; global.css:76-80 (`h1..h6 { color }`) |
| 10 | `.error-page__code` (aria-hidden, 160px/96px) primary-200 sobre neutral-50 | 1.62 (3.0 por ser texto grande) | `/xx-nope/` en los tres idiomas | 404.astro:73-81 |
| 11 | Estado hover/activo de la chip activa de filtros | 1.02 | `.svc-filter--active:hover` (`.svc-filter:hover` especificidad 0,2,0 pisa a `.svc-filter--active` 0,1,0: texto #211f1c sobre fondo primary-900) | shared.css:442-443 |
| 12 | `.hero-b__ctas > .btn--cta` en `.cta-final` | 4.38 | override azul `var(--color-brand)` con texto blanco | cta.css:13-20 |

Notas sobre el brief:

- Los números de línea de `Navbar.astro` del brief (171-175, 315) han derivado: hoy están en 177-181 y 321. Los de `global.css` y `shared.css:864` coinciden.
- `.nav__link` hover/activo también falla en los estados `:focus`/`:active` y en `is-active`; todas las páginas internas lo exhiben en estado normal (el link de la página actual).
- `.btn--brand` hover (primary-700) y `.btn--cta` hover (#339965 con texto blanco = 3.56) también fallan hoy; el hover de `.btn--cta` en el CTA final (primary-600) pasa.

### Estados interactivos que fallan hoy

[fuente: código + axe sobre estados reales, con y sin `prefers-reduced-motion`]

| Estado | Elemento | fg / bg | Ratio |
|--------|----------|---------|-------|
| hover/active | `.btn--cta` | #fff / #339965 | 3.56 |
| hover/active | `.btn--wa` | #fff / #1da851 | 3.10 |
| hover/focus/active | `.nav__link` (y `.is-active`) | #4A7BB5 / #efedeb | 3.75 |
| hover/active | `.nav-drawer__link` | #4A7BB5 / #eef4fb | 3.95 |
| hover/active | `.error-page__cta` | #fff / #339965 | 3.56 |
| hover/active | `.svc-filter--active` | #211f1c / #112236 | 1.02 |
| normal/hover/focus | `.btn--brand`, `.skip-link`, `.cta-final__btn` | #fff / #4A7BB5 | 4.38 |

### Incompletos de axe (no son violaciones, pero ocultan defectos reales)

[fuente: código + axe `incomplete` + muestreo de píxeles; heurística]

Axe devuelve 12-82 `incomplete` por página porque no puede resolver el fondo (foto, degradado, pseudo-elemento). El criterio de aceptación del brief ("0 violaciones") se cumple con `incomplete` abiertos, pero el muestreo de píxeles y la inspección visual del render real muestran defectos genuinos que axe no cuenta:

| Defecto | Evidencia | Ratio estimado |
|---------|-----------|----------------|
| `.ind-directory__name` (h3 "Minería" sobre la foto de `/industrias/`) hereda el color de heading neutral-900: **texto invisible** sobre la foto oscura (confirmado en captura) | shared.css:110-114 sin `color`; global.css:76-80 | ~1.0 |
| `.channel--wa` (contacto): texto blanco sobre degradado `#25D366 -> #128C7E` | shared.css:864-874 | 1.98 al inicio del degradado; 4.14 al final; mediana medida 2.3-2.7 |
| `.cta-final__hint` ("Completa al menos uno…") usa `--color-text-muted` #6e6963 sobre el card oscuro del CTA final | CTASection.astro:377-381 | ~3.0 (4.5 requerido) |
| `.cta-final__status[data-kind=error]` #c0392b sobre primary-950, hex literal (hoy vacío) | CTASection.astro:386 | 3.35 |
| `.ind-directory__item-num` blanco 45% y `.ind-directory__counter .total` blanco 55% sobre fondo oscuro | shared.css:101 y 170-174 | ~4.1-4.3 y ~2.0 |
| `.howwork-card__step` brand #4A7BB5 sobre la foto/pill de la tarjeta | shared.css:689 | ~4.3 |
| Texto blanco sobre fotos (`.svc-card__num`, `.svc-card__desc`, `.svc-card__title`, `.ind-card__index`, `.ind-card__sub`) donde el degradado oscuro aún no cubre la zona | services.css:87-110; industries.css:109-112 | p5 de píxeles entre 1.0 y 4.5; mediana mayormente aceptable |
| `.page-hero__breadcrumb a` #d7e4f4 sobre el hero | internal heroes | ~4.1 |
| `.btn--ghost-light` sobre foto del hero, `.hero-b__*` textos sobre foto/video | hero.css | mediana aceptable, bordes bajos |

La validez de este muestreo es parcial: varios falsos positivos se descartaron (por ejemplo, `p > em` dark sobre claro y textos con `background-clip: text`). Los puntos de la tabla marcados con "texto invisible", `channel--wa` y `cta-final__hint` se confirmaron por captura o cálculo directo.

### Foco visible

[fuente: código styles/global.css:71-75; LanguageSelector.astro:145-150; styles/sections/cta.css:129-134; styles/pages/shared.css:827-833; CTASection.astro:389-392; WhyVideoSection.astro:155-158]

- Regla global `:focus-visible { outline: 3px solid var(--color-accent-500); outline-offset: 2px }`: accent-500 sobre neutral-50 = **2.33:1** y sobre blanco 2.50:1, por debajo de los 3:1 de WCAG 1.4.11 en superficies claras (cumple sobre fondos oscuros: 7.3:1 sobre primary-950).
- Tres declaraciones `outline: none` en controles interactivos:
  - `.lang-selector__option:hover, :focus-visible` (LanguageSelector.astro:145-150): sin indicador alternativo; el único cambio es el fondo primary-50 (casi invisible contra el listbox blanco).
  - `.form-field input/select/textarea:focus` (shared.css:827-833): reemplazo con `border-color` primary-500 y sombra 3px al 15% (el borde cambia de neutral-200 a primary-500: 4.38:1 sobre blanco; la sombra al 15% no aporta contraste).
  - `.cta-final__input:focus` (cta.css:129-134): reemplazo con borde accent-400 sobre fondo oscuro (cumple).
- Overrides propios: `.cta-final__channel:focus-visible` (outline 2px brand sobre fondo oscuro: primary-500 sobre primary-950 ≈ 4:1, cumple), `.why__video-toggle:focus-visible` (blanco), `.error-page__cta:focus-visible` (accent-500 sobre neutral-50: 2.33).

### Tokens y duplicación

[fuente: código styles/tokens.css:53-75,185-187; DESIGN.md:71-83; lib/email-templates.ts:283,295]

- `--color-cta-text` ya existe (tokens.css:75, valor `--color-text-inverse`) pero ningún selector lo consume: `.btn--cta` usa `--color-text-inverse` directamente. `--color-cta-text` y `--color-cta-hover` no figuran en el bloque `@theme` (sí `--color-cta`).
- Tokens `--color-whatsapp` #128C7E, `--color-whatsapp-hover` #1da851 y `--color-whatsapp-hover-dark` #0d6b61 existen en `:root` y en `@theme` pero **nadie los usa**; `.btn--wa` y `.channel--wa` llevan hex literales (#25D366, #1da851, #128C7E). El valor de `--color-whatsapp` (#128C7E) no coincide con el verde que el sitio muestra (#25D366). Redefinirlos o crear nuevos tokens no choca con ningún consumidor.
- Hay ~34 declaraciones con hex literal fuera de `tokens.css` en `styles/` y `components/`/`pages/` (por ejemplo `color:#fff` en `shared.css` y `cotizar.css`, `#c0392b`, `#2d9b6f`). El brief exige "sin hex nuevos", no limpiar los existentes.
- Dos hojas de tokens duplican la paleta (bloque `:root` y `@theme`); cualquier token nuevo se declara en los dos (consolidate-tokens estableció `tokens.css` como SSOT, pero los dos bloques siguen sincronizados a mano).
- `lib/email-templates.ts:283,295` usa `background:#25D366;color:#ffffff` (1.98:1) en el botón WhatsApp de los correos; es canal de correo, no web (fuera del barrido de axe).
- `DESIGN.md:77-83` ("Pares de contraste validados") contiene cifras erróneas: declara `#fff` sobre primary-500 "~4.8:1" (real 4.38), `accent-500` sobre blanco "~3.1:1" (real 2.50) y `#fff` sobre accent-600 "~4.5:1" (real 3.56).

### Contraste calculado de candidatos

[fuente: cálculo WCAG sobre tokens.css]

| Par | Ratio |
|-----|-------|
| primary-900 #112236 sobre accent-500 #3EB978 (CTA normal) | 6.44 |
| primary-900 sobre accent-600 #339965 (CTA hover decidido) | 4.51 (límite) |
| primary-950 #0a1624 sobre accent-600 | 5.10 |
| primary-950 sobre accent-500 | 7.30 |
| `#111b21` sobre #25D366 / sobre #1da851 (WhatsApp normal / hover) | 8.80 / 5.63 |
| `#111b21` sobre #128C7E (final del degradado de `.channel--wa`) | 4.22 (no cumple) |
| blanco sobre primary-600 #3b6497 / primary-700 #2b4e78 | 6.08 / 8.52 |
| primary-700 sobre #efedeb (nav hover) / sobre #eef4fb (drawer) / sobre #f8f7f6 | 7.30 / 7.70 / 7.97 |
| accent-700 sobre #f8f7f6 / #ffffff / **#efedeb** | 4.91 / 5.25 / **4.4993** |
| accent-700 sobre accent-300 (pill) | 4.41 |
| primary-900 sobre accent-300 | 13.51 |
| neutral-600 #6e6963 sobre blanco | 5.44 |
| primary-400 / primary-500 sobre neutral-50 (texto grande 404) | 3.13 / 4.10 |
| ring primary-600 sobre #f8f7f6 / blanco | 5.68 / 6.08 |
| ring accent-700 sobre #f8f7f6 / blanco | 4.91 / 5.25 |
| ring accent-500 (actual) sobre #f8f7f6 / blanco | 2.33 / 2.50 |

Dato crítico: accent-700 sobre `#efedeb` (fondo de "Por qué LOG ATM", neutral-100) da 4.4993, 0.0007 por debajo de AA; axe lo redondea y no lo marca hoy porque el eyebrow hoy usa accent-600. Si el eyebrow pasa a accent-700 en esa sección falla estrictamente.

## Archivos Afectados

| Archivo | Rol | Impacto |
|---------|-----|---------|
| `log-atm-web-astro/src/styles/tokens.css` | SSOT de tokens (`:root` y `@theme`) | Nuevos tokens (texto CTA/WA, fondo/hover WhatsApp, anillo de foco, color de eyebrow) en los dos bloques; reasignar `--color-cta-text`, `--color-whatsapp*` |
| `log-atm-web-astro/src/styles/global.css` | `.btn*`, `.eyebrow`, `.skip-link`, `:focus-visible` | `.btn--cta/.btn--wa/.btn--brand` (+hover), `.eyebrow`, `.skip-link`, anillo de foco global |
| `log-atm-web-astro/src/components/ui/Navbar.astro` | Estilos scoped del navbar y drawer | `.nav__link:hover/.is-active`, `.nav-drawer__link:hover` |
| `log-atm-web-astro/src/components/ui/LanguageSelector.astro` | Selector de idioma (PR #33) | `.lang-selector__option:focus-visible` con `outline: none` |
| `log-atm-web-astro/src/styles/sections/cta.css` | CTA final | override `.cta-final .btn--cta`, `.cta-final__btn`, `.cta-final__input:focus`, `.cta-final__channel` |
| `log-atm-web-astro/src/components/sections/CTASection.astro` | Estilos scoped del CTA final | `.cta-final__hint`, `.cta-final__status` (hex literales) |
| `log-atm-web-astro/src/styles/sections/services.css` | Cards de servicios | `.svc-card__tag--cta`; legibilidad de texto sobre foto |
| `log-atm-web-astro/src/styles/pages/shared.css` | Páginas internas (nosotros, servicios, industrias, contacto) | `.form-submit`, `.contact-form-card__pill`, `.channel--wa`, `.svc-filter--active:hover`, `.ind-directory__name/.total/.item-num`, `.form-field *:focus`, `.office-card__pin`, `.howwork-card__step` |
| `log-atm-web-astro/src/styles/pages/cotizar.css` | Wizard de cotización | `.quote-step__num`, `.quote-summary__title/.v.empty/__sla`, `.btn-primary-lg`, `.mode-tile--active .mode-tile__check`, `.quote-success__seal` |
| `log-atm-web-astro/src/pages/404.astro` | 404 (estilos scoped) | `.error-page__cta` y `.error-page__code` |
| `log-atm-web-astro/DESIGN.md` | Documentación de diseño | corregir "Pares de contraste validados" y botones/WhatsApp tras el cambio |
| `log-atm-web-astro/src/lib/email-templates.ts` | HTML de correos | mismo par #fff/#25D366 (fuera de web) |

Páginas (en `src/pages/` y `src/pages/[lang]/`) no cambian: los estilos viven en CSS compartido; no hay rutas nuevas.

## Test coverage del área

[fuente: código log-atm-web-astro/package.json, scripts/]

No existe suite de tests ni dependencia de axe/puppeteer/playwright en el proyecto. `scripts/axe-audit.mjs` usa JSDOM (no calcula estilos reales; roto y fuera de alcance, brief 10). La verificación se hace con axe-core inyectado en Chrome real, como en PR #33. `npm run validate-i18n` / `check-i18n-links` no cubren estilos. `npm run build` (`astro build`, sin type-check) completa en ~1 minuto en este entorno.

Entorno del barrido (útil para `sdd-verify`): `astro build` + `astro preview --port N`; Chrome en `log-atm-web-astro/chrome/linux-148.0.7778.167/chrome-linux64/chrome`; axe-core y puppeteer-core se instalan fuera del repo. La página en `preview` responde 200 tras un build limpio.

## Approaches Posibles

### Approach A: Tokens semánticos por par (texto/fondo) + corrección de causas raíz

Definir tokens de par en `tokens.css` y reemplazar los literales: `--color-cta-text` (primary-900, ya existe y no se consume), `--color-cta-hover-text` (primary-950 sobre accent-600, 5.10), `--color-whatsapp` (#25D366) / `--color-whatsapp-hover` (#1da851) / `--color-whatsapp-text` (#111b21), `--color-focus-ring` (primary-600 sobre superficies claras; accent-400/accent-500 sobre oscuras) y `--color-eyebrow` (accent-700 + resolver el caso #efedeb). Cambios mínimos en cada selector que falla; se toca también el `.cta-final .btn--cta` (override azul con `color` inverso) y los títulos de heading con color heredado.
- **Pros**: sigue la decisión del brief (todo vía tokens); cierra las 12 causas raíz; un solo lugar para el par texto/fondo; elimina los hex duplicados de WhatsApp que hoy colisionan con tokens huérfanos.
- **Contras**: el CTA verde cambia de texto blanco a oscuro en todo el sitio (visible); hay que sincronizar `:root` y `@theme`; el override del CTA final y `.channel--wa` requieren decisiones propias.
- **Esfuerzo**: M

### Approach B: A + cierre de los `incomplete` reales (texto sobre foto, heredados, foco global)

A, más: dar color explícito a `.ind-directory__name` y `.quote-summary__title`, resolver `.channel--wa` (fondo sólido #25D366 con texto oscuro, sin degradado a #128C7E), `.cta-final__hint/__status` (tokens con ratio ≥ 4.5 sobre primary-950), el anillo `:focus-visible` global (3:1 sobre claro y oscuro) y las 3 declaraciones `outline: none`; revisión de legibilidad del texto sobre fotos (reforzar el degradado donde la mediana baja).
- **Pros**: cumple el espíritu "WCAG AA en todos los componentes" (CLAUDE.md del proyecto) y la regla 2.4.7/1.4.11; evita dejar un h3 invisible que axe no detecta.
- **Contras**: amplía el alcance respecto al brief (varios elementos no cuentan como violaciones de axe); más superficie visual a revisar; el texto sobre foto exige criterio de diseño (overlay) y un pase manual.
- **Esfuerzo**: L

### Approach C: Ajuste mínimo solo de lo que axe reporta como `violations`

Corregir únicamente las causas raíz 1-12 con edición directa de colores en cada selector, sin crear tokens nuevos más allá de `--color-cta-text`.
- **Pros**: rápido; mínimo riesgo de regresión visual.
- **Contras**: no resuelve foco global, `incomplete` reales ni los hex de WhatsApp; deja `.channel--wa`, `#dir-name` y `.cta-final__hint` con defectos reales; viola "todo vía tokens" y duplica literales.
- **Esfuerzo**: S

## Recomendación

**Approach recomendado**: B (con A como núcleo; los puntos de `incomplete` y foco como tareas separadas dentro del mismo cambio).

**Justificación**: el brief fija "WCAG AA mínimo en todos los componentes" y "0 violaciones", y exige foco visible (≥ 3:1). Un barrido que sólo mire `violations` deja visibles defectos que axe no cuenta pero que son más graves que varios de los que sí cuenta (`#dir-name` ilegible, `.channel--wa`, `.cta-final__hint`, anillo de foco 2.33:1 en fondos claros). El propose debe decidir si el alcance incluye los `incomplete` reales (B) o si los difiere a un cambio posterior (A), sin dejar de nombrarlos.

Puntos que exigen decisión explícita de diseño/propose (no resueltos por el brief):

1. **`.cta-final .btn--cta`**: hoy sobreescribe el fondo a brand azul con texto blanco. Al pasar `--color-cta-text` a oscuro, el override debe volver a fijar texto claro (y fondo primary-600, 6.08) o quedará oscuro sobre azul (< 3:1).
2. **Hover del CTA**: el brief propone texto primary-950 sobre accent-600 (5.10) o un hover que no oscurezca el fondo; el hover actual (#fff sobre #339965 = 3.56) debe salir.
3. **`.channel--wa`**: el degradado a #128C7E no admite texto oscuro (4.22) ni blanco; requiere fondo sólido o un degradado cuyo extremo oscuro se aclare.
4. **`.eyebrow` sobre #efedeb**: accent-700 da 4.4993; requiere token específico (o texto primary-900) para esa sección.
5. **Fondo de píldora/SLA** (accent-700 sobre accent-300 = 4.41): requiere un verde de texto más oscuro (nuevo token) o texto primary-900.
6. **Anillo de foco global**: accent-500 falla (2.33) sobre fondos claros; hace falta un token de anillo que cumpla 3:1 en claro y oscuro (el brief pide ≥ 3:1 sin fijar el color).
7. **Elementos no textuales**: `.mode-tile__check` (✓ blanco sobre #3EB978), `.quote-success__seal`, `.office-card__pin` y `.btn-primary-lg` (#fff sobre CTA; hoy `disabled`) repiten el par 2.49 y no los lista axe en reposo; `#btn-next` habilitado sí falla.
8. **`.error-page__code`** (aria-hidden, decorativo): se puede cumplir 3:1 con primary-400 (3.13) o declararlo decorativo; axe lo marca de todos modos.

## Riesgos Identificados

- **Cambio visual de marca en CTAs**: texto oscuro sobre verde en todos los CTA y en WhatsApp; el PR debe incluir la tabla antes/después. Mitigación: la decisión ya la tomó el usuario; verificar hover y foco con ratios ≥ 4.5.
- **Regresión del override del CTA final** (punto 1): mitigación, incluirlo en la lista de tareas y en el barrido de verificación sobre `/`, `/servicios/`, `/industrias/` y `/nosotros/` (cta-final está en todas).
- **Falsos "0 violaciones"**: axe deja ~12-82 `incomplete` por página; un verde de axe no implica AA. Mitigación: `sdd-verify` repite el barrido y el muestreo de píxeles de este documento, y revisa visualmente `/industrias/` y `/contacto/`.
- **Estados no cubiertos por el barrido estático**: hover, foco, activo, drawer y wizard sólo aparecen con interacción; mitigación: repetir la pasada interactiva (con `prefers-reduced-motion`) tras el cambio.
- **Tokens duplicados (`:root` y `@theme`)**: un token nuevo declarado en uno solo no llega a Tailwind o a `var()`; mitigación: declarar en ambos y comprobar con build.
- **Tokens WhatsApp huérfanos con valor distinto (#128C7E vs #25D366 visible)**: redefinirlos cambia lo que dice DESIGN.md; mitigación: actualizar DESIGN.md en el mismo cambio y corregir sus "Pares de contraste validados".
- **Correos**: `email-templates.ts` mantiene #fff sobre #25D366 si no se incluye; mitigación: decidirlo en propose (mismo token no aplica a HTML de correo con estilos inline).
- **`astro preview` + adapter Cloudflare**: devolvió 200 en esta ejecución tras un build limpio; si responde 500 tras un build, se relanza.
