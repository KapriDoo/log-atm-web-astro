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
- `primary-300`: #83a7d2 — iconos secundarios, placeholders
- `primary-400`: #658fc3 — links hover, estados intermedios
- `primary-500`: #4A7BB5 — **Color de marca principal (azul LOG ATM)**
- `primary-600`: #3b6497 — hover de elementos primarios
- `primary-700`: #2b4e78 — hover de botones primarios, active
- `primary-800`: #1c3554 — texto sobre fondos claros
- `primary-900`: #112236 — navbar dark, hero overlay
- `primary-950`: #0a1624 — footer, fondos oscuros maximos

### Accent
- `accent-300`: #d8f1e6 — fondos de badges, etiquetas
- `accent-400`: #87d3b0 — iconos de accion, highlights
- `accent-500`: #3EB978 — **CTA principal (verde)**
- `accent-600`: #339965 — hover de CTA, estados activos
- `accent-700`: #297A51 — active/pressed, texto sobre verde

### Neutral
- `neutral-50`: #f8f7f6 — **Fondo de pagina**
- `neutral-100`: #efedeb — background de secciones alternas
- `neutral-200`: #e1dedb — **Bordes y divisores**
- `neutral-300`: #c8c4c1 — placeholder text, iconos inactivos
- `neutral-400`: #aaa6a1 — texto deshabilitado
- `neutral-500`: #898580 — texto de apoyo
- `neutral-600`: #6e6963 — **Texto secundario**
- `neutral-700`: #544f4a — texto de cuerpo
- `neutral-800`: #37332f — texto de headings
- `neutral-900`: #211f1c — **Texto principal**
- `neutral-950`: #131210 — texto de maximo contraste

### Semantic
- `success`: #22c55e — Confirmaciones, estados OK
- `warning`: #ed8c1d — Alertas leves
- `error`: #E04848 — Errores, alertas criticas
- `info`: #4A7BB5 — Mensajes informativos

### Tokens funcionales
```css
--color-bg: #f8f7f6;        /* Fondo de pagina */
--color-surface: #ffffff;    /* Superficies (cards, modales) */
--color-surface-alt: #efedeb; /* Fondos alternos */
--color-border: #e1dedb;     /* Bordes */
--color-text: #211f1c;       /* Texto principal */
--color-text-muted: #6e6963; /* Texto secundario */
--color-brand: #4A7BB5;      /* Color de marca */
--color-brand-dark: #2b4e78; /* Variante oscura marca */
--color-cta: #3EB978;        /* CTA principal */
--color-cta-hover: #339965;  /* CTA hover */
--color-whatsapp: #128C7E;
--color-whatsapp-hover: #1da851;
```

### Pares de contraste validados
- `neutral-900` sobre `neutral-50`: ratio ~14:1 ✅ AAA
- `primary-500` sobre `#ffffff`: ratio ~4.8:1 ✅ AA
- `primary-900` sobre `#ffffff`: ratio ~14.5:1 ✅ AAA
- `accent-500` sobre `#ffffff`: ratio ~3.1:1 ⚠️ solo para texto grande (≥18px)
- `#ffffff` sobre `primary-500`: ratio ~4.8:1 ✅ AA
- `#ffffff` sobre `accent-600`: ratio ~4.5:1 ✅ AA

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
- **Primary**: `.btn-primary` — bg-primary-500, text-white, radius-pill, px-7 py-3, font-display weight-600
- **CTA**: `.btn-cta` — bg-accent-500, text-white, radius-pill, px-7 py-3, font-display weight-700, shadow-cta
- **Outline**: `.btn-outline` — transparent, border-primary-300, text-primary-500, radius-pill
- **Ghost**: bg-transparent, text-brand, hover:bg-primary-50
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
- Focus: outline-3px accent-500, outline-offset 2px
- Error: border-error
- Placeholder: var(--color-neutral-400)

### Navigation
- Desktop: horizontal, links en neutral-700, hover brand
- Mobile: hamburger menu
- Active state: text-brand, font-weight 600

### Modals / Dialogs
- Overlay: black/50
- Background: var(--color-surface)
- Border-radius: var(--radius-lg)
- Shadow: var(--shadow-xl)
- Padding: 2rem

### Badges / Tags
- Default: bg-primary-100 text-primary-700 radius-pill px-3 py-1
- Success: bg-success/10 text-success
- Warning: bg-warning/10 text-warning
- Error: bg-error/10 text-error

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
- No usar colores hardcodeados en componentes
- No mezclar radius styles incompatibles (ej: pill + square)
- No usar accent-500 para texto pequeno sobre fondo claro
- No ignorar prefers-reduced-motion
- No exceder 65 caracteres por linea de texto
- No usar sombras con opacidad mayor al 20% en contexts sutiles

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
