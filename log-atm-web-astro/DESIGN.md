# DESIGN.md — LOG ATM

> Archivo de especificación de diseño compatible con Google Stitch.
> Usalo para generar UI consistente con la identidad visual del proyecto.

---

## Visual Theme & Atmosphere

- **Personality**: Corporativo confiable con calidez humana
- **Mood**: Profesional, cercano, moderno
- **Visual references**: lifecare.org.au (favorita), the3key.com, abtc.com
- **Core metaphor**: Puentes entre maritimo e industrial (ancla + grua)
- **Density**: comfortable
- **Motion**: subtle (GSAP scroll-triggered, Framer Motion en islas React)
- **Brand keywords**: Confiable, cercano, moderno, logistica, chileno

---

## Color Palette & Roles

### Primary
- `primary-50`: #eef4fb — fondos tenues, hover de filas
- `primary-100`: #d7e4f4 — fondos de cards informativas
- `primary-200`: #aec7e5 — bordes, dividers sutiles
- `primary-300`: #83a7d2 — iconos secundarios y decorativos; no apto para texto (2.49:1 sobre blanco)
- `primary-400`: #658fc3 — bordes en hover (tarjetas, opciones del cotizador) y estados intermedios no textuales; no apto para texto normal (3.35:1 sobre blanco)
- `primary-500`: #4A7BB5 — **Color de marca principal (azul LOG ATM)**
- `primary-600`: #3b6497 — hover de elementos primarios; color de los enlaces base (`a`, 6.08:1 sobre blanco)
- `primary-700`: #2b4e78 — hover de botones primarios y de enlaces base, active
- `primary-800`: #1c3554 — texto sobre fondos claros
- `primary-900`: #112236 — superficies oscuras, hero overlay
- `primary-950`: #0a1624 — footer, fondos oscuros maximos

### Accent
- `accent-300`: #d8f1e6 — fondos de badges, etiquetas
- `accent-400`: #87d3b0 — iconos de accion, highlights
- `accent-500`: #3EB978 — **CTA principal (verde)**
- `accent-600`: #339965 — hover de CTA, estados activos
- `accent-700`: #297A51 — active/pressed
- `accent-800`: #22663f — **texto de acento verde sobre fondos claros** (`--color-text-accent`)

### Neutral
- `neutral-50`: #f8f7f6 — **Fondo de pagina**
- `neutral-100`: #efedeb — background de secciones alternas
- `neutral-200`: #e1dedb — **Bordes y divisores**
- `neutral-300`: #c8c4c1 — iconos inactivos, bordes en hover; no apto para texto (1.73:1 sobre blanco)
- `neutral-400`: #aaa6a1 — texto deshabilitado
- `neutral-500`: #898580 — texto de apoyo sobre superficies oscuras (4.97:1 sobre primary-950); no apto para texto normal sobre fondos claros (3.66:1 sobre blanco)
- `neutral-600`: #6e6963 — **Texto secundario**
- `neutral-700`: #544f4a — texto de cuerpo
- `neutral-800`: #37332f — texto de headings
- `neutral-900`: #211f1c — **Texto principal**
- `neutral-950`: #131210 — texto de maximo contraste

### Semantic
- `success`: #22c55e — Confirmaciones, estados OK: fondos tenues, bordes e iconos; no apto para texto sobre fondos claros (2.28:1 sobre blanco)
- `warning`: #ed8c1d — Alertas leves: fondos tenues, bordes e iconos; no apto para texto sobre fondos claros (2.51:1 sobre blanco)
- `error`: #E04848 — Errores, alertas criticas: bordes, iconos y fondos tenues; no apto para texto normal sobre fondos claros (4.05:1 sobre blanco)
- `error-light`: #fca5a5 — Errores sobre superficies oscuras (par de `success-light`)
- `info`: #4A7BB5 — Mismo tono que `primary-500`: iconos, bordes y texto grande de mensajes informativos; no apto para texto normal (4.38:1 sobre blanco)

### Tokens funcionales
```css
--color-bg: #f8f7f6;        /* Fondo de pagina */
--color-surface: #ffffff;    /* Superficies (cards, modales) */
--color-surface-alt: #efedeb; /* Fondos alternos */
--color-border: #e1dedb;     /* Bordes */
--color-text: #211f1c;       /* Texto principal */
--color-text-muted: #6e6963; /* Texto secundario */
--color-brand: #4A7BB5;      /* Color de marca: acentos y texto grande; no apto para texto normal (4.38:1 sobre blanco) */
--color-brand-dark: #2b4e78; /* Variante oscura marca */

/* Pares texto/fondo validados: los componentes consumen el par, no el tono de paleta */
--color-cta: #3EB978;            /* CTA principal (fondo) */
--color-cta-hover: #339965;      /* CTA hover (fondo) */
--color-cta-text: #112236;       /* texto sobre --color-cta (primary-900) */
--color-cta-hover-text: #0a1624; /* texto sobre --color-cta-hover (primary-950) */

--color-brand-solid: #3b6497;       /* boton azul solido (primary-600) */
--color-brand-solid-hover: #2b4e78; /* hover (primary-700) */
--color-brand-solid-text: #ffffff;  /* texto sobre ambos */

--color-whatsapp: #25D366;       /* verde visible de WhatsApp */
--color-whatsapp-hover: #1da851;
--color-whatsapp-text: #111b21;  /* texto sobre ambos */

--color-text-accent: #22663f;    /* texto de acento verde sobre fondos claros (accent-800) */

--color-focus-ring: #3b6497;         /* anillo de foco sobre superficies claras (primary-600) */
--color-focus-ring-inverse: #87d3b0; /* anillo de foco sobre superficies oscuras (accent-400) */
```

Fuente unica: `src/styles/tokens.css` (`:root` es la autoridad en runtime; `@theme` repite el
hex resuelto para registrar las utilidades de Tailwind).

### Pares de contraste validados

Ratios WCAG 2.x calculados sobre los hex de `tokens.css`. Umbral: 4.5:1 texto normal;
3:1 texto grande (≥ 24px, o ≥ 18.66px en negrita) y componentes graficos (anillo de foco, bordes).

| Texto / indicador | Fondo | Ratio | Uso |
|---|---|---|---|
| `--color-cta-text` (primary-900) | `--color-cta` (accent-500) | 6.44:1 | Botones y etiquetas CTA en reposo |
| `--color-cta-hover-text` (primary-950) | `--color-cta-hover` (accent-600) | 5.10:1 | Botones CTA en hover |
| `--color-brand-solid-text` (blanco) | `--color-brand-solid` (primary-600) | 6.08:1 | Botones azul solido, skip link |
| `--color-brand-solid-text` (blanco) | `--color-brand-solid-hover` (primary-700) | 8.52:1 | Botones azul solido en hover |
| `--color-whatsapp-text` (#111b21) | `--color-whatsapp` (#25D366) | 8.80:1 | Boton y canal WhatsApp |
| `--color-whatsapp-text` (#111b21) | `--color-whatsapp-hover` (#1da851) | 5.63:1 | Boton WhatsApp en hover |
| `--color-text-accent` (accent-800) | blanco · neutral-50 · neutral-100 · accent-300 | 6.91 · 6.46 · 5.91 · 5.80:1 | Eyebrows, pills, numeros de paso |
| `--color-brand-dark` (primary-700) | neutral-100 · primary-50 | 7.30 · 7.70:1 | Enlaces de navegacion en hover, foco y activo |
| `neutral-700` | blanco | 8.09:1 | Enlaces del drawer de navegacion |
| `--color-text-muted` (neutral-600) | blanco | 5.44:1 | Valores pendientes, texto secundario |
| `--color-text-inverse` (blanco) | primary-900 | 16.08:1 | Titulos y chips activos sobre oscuro |
| `primary-200` | primary-900 | 9.27:1 | Texto secundario sobre superficies oscuras |
| `primary-100` | primary-800 | 9.66:1 | Migas de pan de heroes internos |
| `--color-brand` (primary-500) | neutral-50 | 4.10:1 | Solo texto grande (codigo 404, ≥ 96px) |
| `--color-focus-ring` (primary-600) | blanco · neutral-50 · neutral-100 · primary-50 | 6.08 · 5.68 · 5.20 · 5.49:1 | Anillo de foco en superficies claras |
| `--color-focus-ring` (primary-600) | neutral-200 | 4.54:1 | Borde de campo enfocado vs. borde sin foco |
| `--color-focus-ring-inverse` (accent-400) | primary-950 · 900 · 800 · 700 · neutral-950 | 10.38 · 9.17 · 7.10 · 4.86 · 10.68:1 | Anillo de foco en superficies oscuras |
| `neutral-900` | neutral-50 | 15.36:1 | Texto principal |

No validos para texto normal: blanco sobre `accent-500`/`accent-600` (CTA), blanco sobre
`primary-500` (4.38:1) y `accent-500`/`accent-600`/`accent-700` como texto sobre fondos claros.

---

## Typography Rules

### Font families
- **Primary**: 'Inter', system-ui, sans-serif — UI, body, headings
- **Secondary**: 'Outfit', system-ui, sans-serif — Display, hero text (weight 600-900)

### Scale
| Token | Size | Weight | Line-height | Letter-spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| H1 | clamp(2.5rem, 5vw, 4rem) | 900 | 1.1 | -0.02em | Page hero titles |
| H2 | clamp(1.875rem, 4vw, 3rem) | 800 | 1.1 | -0.01em | Section headings |
| H3 | 1.5rem | 700 | 1.2 | 0 | Card titles |
| H4 | 1.25rem | 600 | 1.3 | 0 | Subsection headings |
| Body | 1rem | 400 | 1.6 | 0 | Paragraphs |
| Body-sm | 0.9375rem | 400 | 1.5 | 0 | Secondary text |
| Caption | 0.75rem | 700 | 1.4 | 0.12em | Metadata, labels, eyebrow |

### Reglas tipograficas
- **Tamano minimo**: 0.75rem (12px) para legibilidad
- **Longitud maxima de linea**: 65 caracteres
- **Escala tipografica**: Fluida con clamp()

---

## Component Stylings

### Buttons
- **Brand (azul solido)**: `.btn--brand` — `--color-brand-solid` / `--color-brand-solid-text`; hover `--color-brand-solid-hover`. Mismo par en `.skip-link` y en el boton de la seccion final (`.cta-final__btn`, `.cta-final .btn--cta`, que fija fondo y texto en todos los estados). radius-pill, font-display weight-600
- **CTA**: `.btn--cta` — `--color-cta` / `--color-cta-text`; hover `--color-cta-hover` / `--color-cta-hover-text`. Todo elemento sobre el verde CTA (etiquetas, sellos, checks, pin) consume el mismo par. radius-pill, font-display weight-700, shadow-cta
- **WhatsApp**: `.btn--wa` y `.channel--wa` — fondo solido `--color-whatsapp` con `--color-whatsapp-text`; hover `--color-whatsapp-hover`. Sin degradados bajo texto
- **Ghost**: `.btn--ghost` — fondo transparente, texto `--color-text`, borde `--color-border`; hover fondo `--color-surface` y borde `neutral-300`. En el cotizador, `.btn-ghost` — texto `--color-text-muted` (5.44:1 sobre blanco), hover `--color-text`
- **Disabled**: opacity-50, cursor-not-allowed

### Cards
- Background: var(--color-surface) (#ffffff)
- Border: 1px solid var(--color-border)
- Border-radius: var(--radius-lg) (20px)
- Shadow: var(--shadow-sm)
- Padding: variable por contexto
- Hover: shadow-md + translateY(-2px)

### Inputs
- Border: 1px solid var(--color-border)
- Border-radius: var(--radius-input) (10px)
- Focus: borde `--color-focus-ring` (`--color-focus-ring-inverse` sobre superficies oscuras) + anillo global de foco
- Error: border-error
- Placeholder: sin tono de paleta asignado; `neutral-300` y `neutral-400` no se usan para placeholder porque no alcanzan 4.5:1 sobre blanco (1.73 y 2.42:1)

### Navigation
- Desktop: horizontal; `.nav__link` en `--color-text` (neutral-900), font-weight 500, 15px; hover, foco y activo: fondo `--color-surface-alt` (neutral-100) y texto `--color-brand-dark`
- Mobile: hamburger menu; `.nav-drawer__link` en neutral-700, font-weight 500, 17px; hover y foco: fondo primary-50 y texto `--color-brand-dark`
- Active state: `--color-brand-dark` sobre neutral-100, mismo font-weight 500 y subrayado de 2px (`text-underline-offset: 0.3em`): la pagina actual no depende solo del color
- Nombre accesible del enlace de marca y del selector de idioma: el texto visible seguido de un sufijo `.sr-only` localizado (`a11y.brandHome`, `a11y.languageCurrent`), sin `aria-label` (WCAG 2.5.3)

### Focus ring (anillo de foco por contexto)
- Regla global: `:focus-visible { outline: 3px solid var(--focus-ring-color, var(--color-focus-ring)); }`
- Superficies claras: `--color-focus-ring` (primary-600, ≥ 5.20:1)
- Superficies oscuras con controles enfocables: declaran `--focus-ring-color: var(--color-focus-ring-inverse)` en la misma regla que define su fondo (`.hero-b`, `.page-hero`, `.ind-directory-section`, `.quote-hero`, `.cta-final`, `.footer`). Una seccion oscura nueva hace lo mismo
- `--focus-ring-color` es una variable de contexto, no un token: solo toma el valor `var(--color-focus-ring-inverse)`, y una isla clara dentro de una superficie oscura puede restablecerla
- Los componentes no fijan otro color de anillo ni usan `outline: none` sin un indicador equivalente visible en modos de color forzado (ADR-0008). Excepcion vigente: `.why__video-toggle:focus-visible` conserva un anillo blanco de 2px, porque el boton flota sobre el video oscuro

### Modals / Dialogs
- Overlay: black/50
- Background: var(--color-surface)
- Border-radius: var(--radius-lg)
- Shadow: var(--shadow-xl)
- Padding: 2rem

### Badges / Tags
- Default: bg-primary-100 text-primary-700 radius-pill px-3 py-1
- Variantes semanticas (success, warning, error): el tono semantico va en el fondo tenue (`/10`), el borde o el icono; el texto usa `--color-text`, porque los tonos semanticos no alcanzan 4.5:1 como texto sobre fondos claros

---

## Layout Principles

- **Container max-width**: 1280px
- **Grid system**: Tailwind CSS Grid + Flexbox
- **Spacing scale**: 4px base (Tailwind default)
- **Section padding**: clamp(3rem, 8vw, 6rem) vertical
- **Content padding**: clamp(1.25rem, 5vw, 2.5rem) horizontal
- **Gap entre elementos**: 1rem - 2rem

---

## Depth & Elevation

| Token | Shadow | Usage |
|-------|--------|-------|
| shadow-sm | 0 1px 3px 0 rgb(74 123 181 / 0.08) | Cards base, inputs |
| shadow-md | 0 4px 16px 0 rgb(74 123 181 / 0.12) | Card hover, dropdowns |
| shadow-lg | 0 8px 32px 0 rgb(74 123 181 / 0.16) | Modals, popovers |
| shadow-xl | 0 16px 48px 0 rgb(74 123 181 / 0.20) | Overlays, toasts |
| shadow-cta | 0 4px 20px 0 rgb(62 185 120 / 0.35) | CTA buttons |

### Z-index scale
| Token | Value | Usage |
|-------|-------|-------|
| z-base | 0 | Base content |
| z-dropdown | 100 | Dropdowns, selects |
| z-sticky | 200 | Sticky headers |
| z-modal | 500 | Modals, dialogs |
| z-tooltip | 600 | Tooltips |
| z-toast | 700 | Toasts, notifications |

---

## Do's and Don'ts

### Do
- Usar radius-lg (20px) para cards principales
- Usar radius-pill (9999px) para botones y badges
- Mantener consistencia con los tokens de color
- Usar Outfit para headings, Inter para body
- Aplicar prefers-reduced-motion en todas las animaciones
- Usar el contenedor canonico de 1280px max-width
- Priorizar accesibilidad WCAG 2.2 AA minimo

### Don't
- No usar colores hardcodeados en componentes (unica excepcion: plantillas de correo, ver abajo)
- No mezclar radius styles incompatibles (ej: pill + square)
- No usar accent-500 para texto pequeno sobre fondo claro
- No ignorar prefers-reduced-motion
- No exceder 65 caracteres por linea de texto
- No usar sombras con opacidad mayor al 20% en contexts sutiles

### Excepcion: plantillas de correo
`src/lib/email-templates.ts` es el unico archivo autorizado a declarar hex de color fuera de
`tokens.css`: los clientes de correo exigen estilos inline y no leen las hojas del sitio. Cada
par del correo que replica un par del sitio vive en una constante local con un comentario que
nombra los tokens de origen (p. ej. el boton WhatsApp: `#111b21` sobre `#25D366`, espejo de
`--color-whatsapp-text` / `--color-whatsapp`; el boton «Responder por email»: `#ffffff` sobre
`#3b6497`, espejo de `--color-brand-solid-text` / `--color-brand-solid`). Un cambio de esos
tokens se replica a mano en la constante (ADR-0008).

---

## Responsive Behavior

### Breakpoints
| Name | Width | Description |
|------|-------|-------------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop pequeno |
| xl | 1280px | Desktop estandar |
| 2xl | 1536px | Desktop grande |

### Patterns responsive
- **Mobile-first**: Si
- **Grid**: 1 col mobile → 2-3 cols tablet → 3-4 cols desktop
- **Typography**: Escala fluida con clamp()
- **Navigation**: Hamburger en mobile, horizontal en desktop
- **Spacing**: Seccion padding ajusta con clamp()

---

## Agent Prompt Guide

Cuando generes UI para este proyecto:

1. **Lee este DESIGN.md completo** antes de proponer soluciones
2. **Mantene consistencia** con los tokens y componentes definidos
3. **Prioriza accesibilidad**: WCAG 2.2 AA minimo
4. **Usa los componentes documentados** como base para nuevos
5. **Respeta las reglas Do/Don't** — son guardrails intencionales
6. **Para dudas**, prefiere valores conservadores del sistema de diseño
7. **Mantene el stack tecnico**: Astro 6 + React (islas) + Tailwind v4 + GSAP + Framer Motion
8. **Documenta desviaciones**: si rompes una regla, documenta por que

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-XX | Initial release |

---

*Generated with design-md-generator skill*
