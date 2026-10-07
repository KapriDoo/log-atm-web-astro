---
type: tasks
change_name: "fix-contrast-followups"
created: "2026-10-06"
---

# Tasks — fix-contrast-followups

> Fuente: brief 13 (`input.md` de este cambio, sección «Tareas sugeridas»). Rutas relativas a
> `/home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-contrast-followups/log-atm-web-astro/`.
> Las ubicaciones se confirmaron por contenido sobre `8fa62c1`. Regla del proyecto: WCAG AA en todos
> los componentes; usar los tokens de contraste del PR #36 (`DESIGN.md` documenta los pares validados).

## T1 — Colores inline de correos (SLA y enlaces)

**File**: `src/lib/email-templates.ts`
**Líneas/ocurrencias**: todas las ocurrencias de `#898580` (SLA ~l.307, metadatos ~l.316-328) y de `#4A7BB5` usadas como color de texto o enlace en tamaño normal (`mailto`/`tel` ~l.211-213, `company` ~l.364 y ~l.560); evaluar `#4A7BB5` en texto grande (logo «A» 18px/900 ~l.85, flecha 24px ~l.179) y en bordes (~l.251) contra el umbral que corresponde.
**Acción**: reemplazar el texto secundario `#898580` por neutral-600 `#6e6963` y el color de enlace/texto `#4A7BB5` por primary-600 `#3b6497`, inline (la excepción de estilos inline en correos sigue vigente; sin hex nuevo fuera de esos dos valores validados).
**Justificación**: `#898580` da ~3,6:1 y `#4A7BB5` 4,38:1; los valores de reemplazo son los de los tokens validados por el PR #36.

**Acceptance**:
- [ ] Ninguna ocurrencia de `#898580` en `src/lib/email-templates.ts`; ningún texto o enlace de tamaño normal con `#4A7BB5`.
- [ ] Ratio ≥ 4,5:1 de cada texto/enlace de los correos de los 3 formularios sobre su fondo real (blanco o `#f8f7f6`), con el cálculo documentado en la evidencia.

## T2 — Token de éxito en la rama `success` del wizard

**File**: `src/scripts/wizard.ts`
**Líneas/ocurrencias**: `setQuoteStatus`, l.336 (`kind === 'success' ? '#2d9b6f'`)
**Acción**: reemplazar `#2d9b6f` por el token de éxito que usa el formulario de contacto tras el PR #36 (par 6,91:1), vía `var(--…)` — sin hex nuevo.
**Justificación**: `#2d9b6f` da 3,48:1; hoy la rama no se alcanza (defecto latente), el cambio es local a una expresión.

**Acceptance**:
- [ ] `grep -rn 2d9b6f src/` sin resultados.
- [ ] La rama `success` usa el mismo token de éxito que el form de contacto.

## T3 — Color base de links + revisión de superficies oscuras

**File**: `src/styles/global.css` (regla base `a { color: var(--color-brand) }`, ~l.83-85)
**Líneas/ocurrencias**: regla base de `a` y su `:hover`
**Acción**: links base a primary-600 (`#3b6497`, 6,08:1 sobre blanco) y hover primary-700, vía tokens existentes (mismo criterio que `.btn--brand`). Revisar que los links sobre superficies oscuras (navbar dark, footer, hero, CTA final) tengan su propio color y no hereden la regla base.
**Justificación**: primary-500 da 4,38:1 sobre blanco.

**Acceptance**:
- [ ] Links de texto base ≥ 4,5:1 en todas las superficies claras.
- [ ] Ningún link sobre superficie oscura queda con contraste < 4,5:1 por heredar el nuevo color base.

## T4 — Placeholder de `.cta-final__input` con muestreo de píxeles

**File**: `src/styles/sections/cta.css` (`.cta-final__input::placeholder`, ~l.131)
**Líneas/ocurrencias**: regla `::placeholder` de la CTA final
**Acción**: elegir un color de placeholder (token existente si alcanza) que dé ≥ 4,5:1 en el punto más desfavorable del degradado detrás del input; medirlo con muestreo de píxeles en Chrome real (axe no evalúa `::placeholder`).
**Justificación**: hoy ~4,0–4,8:1 según el punto del degradado.

**Acceptance**:
- [ ] Ratio del placeholder ≥ 4,5:1 en el peor píxel muestreado del fondo del input, con el muestreo documentado (método, puntos y ratios).

## T5 — Offset del foco del skip link

**File**: `src/styles/global.css` (`.skip-link`, `.skip-link:focus`/`:focus-visible`, ~l.42-60)
**Líneas/ocurrencias**: reglas del skip link
**Acción**: ajustar `outline-offset` y/o la posición del skip link para que el anillo de foco no se superponga al logo del header.
**Justificación**: hoy el anillo cruza el logo (residual visual del brief 11).

**Acceptance**:
- [ ] Captura antes/después del skip link enfocado: el anillo no se superpone al logo.

## T6 — Corrección de `DESIGN.md` (navegación)

**File**: `DESIGN.md` (sección `### Navigation`, ~l.175, y tabla de pares de contraste)
**Líneas/ocurrencias**: valores de color y peso de los enlaces de navegación
**Acción**: alinear la descripción con el CSS vigente de la navegación (`src/components/ui/Navbar.astro`), que es la fuente de verdad; hoy describe neutral-700 y peso 600.
**Justificación**: documentación desalineada del código.

**Acceptance**:
- [ ] Color, peso y estados de los enlaces de navegación en `DESIGN.md` coinciden con el CSS.

## T7 — Corte de palabra en títulos de card

**File**: estilos del título de card de servicios (componente que renderiza `title` de las cards de `src/i18n/translations/pt.json` ~l.189, «Desconsolidação»)
**Líneas/ocurrencias**: regla del título de card
**Acción**: permitir corte de palabra (`hyphens: auto` con `lang` correcto en el documento, u `overflow-wrap: anywhere`) sin achicar la tipografía.
**Justificación**: en `/pt/servicios/` la palabra se corta en el borde de la tarjeta.

**Acceptance**:
- [ ] «Desconsolidação» visible completa dentro de su tarjeta en `/pt/servicios/` a 390 px y 1440 px (capturas).
- [ ] Sin regresiones visuales en `/servicios/` y `/en/services/` (o la ruta en equivalente) a los mismos anchos.

## T8 — Nombre accesible del enlace de marca y de `#lang-trigger` (WCAG 2.5.3)

**File**: `src/components/ui/Navbar.astro` (l.38, `<a class="nav__brand" aria-label={t('a11y.brandHome')}>`), `src/components/ui/LanguageSelector.astro` (l.54-55, `aria-label={t('a11y.languageCurrent', …)}` en `#lang-trigger`), `src/i18n/translations/{es,en,pt}.json` (claves `a11y.brandHome`, `a11y.languageCurrent`)
**Líneas/ocurrencias**: los dos `aria-label` citados y sus claves i18n
**Acción**: quitar ambos `aria-label` y agregar el contexto como texto visualmente oculto *después* del texto visible (p. ej. «LOG ATM» + « — inicio»; «ES» + « — cambiar idioma»), localizado vía i18n en es/en/pt; ajustar o reemplazar las claves `a11y.brandHome`/`a11y.languageCurrent` si cambian de uso, manteniendo la paridad (`npm run validate-i18n`).
**Justificación**: `label-content-name-mismatch` (serious, 63 nodos) deja `npm run a11y` en exit 1; el nombre accesible debe empezar por o contener el texto visible.

**Acceptance**:
- [ ] Nombre accesible de ambos controles empieza por o contiene el texto visible, y sigue anunciando su propósito (inicio / selector de idioma).
- [ ] `npm run validate-i18n` sin errores.

## T9 — Verificación integral

**File**: — (comandos sobre el worktree)
**Líneas/ocurrencias**: —
**Acción**: `npm run build`, `npm run check`, `npm run validate-i18n`, `npm run check-i18n-links` y `npm run a11y` (21 URL × desktop/móvil, axe en Chrome real); muestreo de píxeles para T4; capturas para T5 y T7. Bajar todo servidor levantado al terminar.
**Justificación**: criterio clave del brief: `npm run a11y` en exit 0.

**Acceptance**:
- [ ] `npm run a11y` termina en exit 0, sin `label-content-name-mismatch`.
- [ ] `npm run check` con 0 errores y build OK.
- [ ] Evidencia (comandos + salidas, muestreo, rutas de capturas) registrada en el workspace del cambio.
