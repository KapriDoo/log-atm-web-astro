---
type: exploration
change_name: "fix-ux-multipage-bugs"
created: "2026-05-19"
---

# Exploration — fix-ux-multipage-bugs

## Resumen ejecutivo

Se identificaron 10 bugs distribuidos en 4 páginas internas (`/industrias`, `/nosotros`, `/contacto`, `/cotizar`) y un bug global de favicon. El problema de spacing vertical (B3, B4, B5) comparte una única causa raíz: la clase `.section { padding-block: var(--section-pad); }` solo está definida en `sections/services.css`, que únicamente importa `index.astro` — las páginas internas usan `shared.css` que no incluye esa regla. El bug más complejo es B8 (folio inventado / no envía email real), donde la API `/api/cotizacion` ya existe y está implementada, pero el folio se genera en cliente con `Date.now()` en lugar de venir del servidor.

---

## Bugs por página

### /industrias

#### Bug B1: Selector de industrias no permite cambiar

- **Estado actual**: El directorio editorial (`#ind-directory`) contiene botones `.ind-directory__item` que al hacer `click`, `mouseenter` o `focus` invocan `render(idx)` a través de `initIndDirectory`. La función `render()` en `gsap-ind-directory.ts` hace crossfade GSAP entre slides y actualiza clases `.is-active`. El script `initIndDirectory` se inicializa dentro de `document.addEventListener('astro:page-load', ...)`, lo que es correcto para View Transitions. El `onRender` callback actualiza caption (counter, nombre, tags) via `window.__indDirectoryOnRender`. [fuente: código `log-atm-web-astro/src/pages/industrias.astro` L210-L220, `log-atm-web-astro/src/scripts/gsap-ind-directory.ts`]
- **Spec relevante**: No hay spec activa específica para la interacción del selector; el cambio `redesign-experiencia-sector` (completado) definió el layout de tarjetas con imágenes. [fuente: spec `[[sections/industries-page]]`]
- **Archivos clave**:
  - `log-atm-web-astro/src/pages/industrias.astro` — L100-L220 (markup del directorio + script de init)
  - `log-atm-web-astro/src/scripts/gsap-ind-directory.ts` — función `initIndDirectory`
  - `log-atm-web-astro/src/styles/pages/shared.css` — L64-L190 (estilos `.ind-directory__item`)
- **Hipótesis de causa raíz**: El script `define:vars` en `industrias.astro` expone `window.__indDirectoryOnRender` pero se ejecuta sin estar envuelto en `astro:page-load`. Si el DOM aún no está listo cuando el script se ejecuta, `window.__indDirectoryOnRender` puede quedar `undefined` cuando `initIndDirectory` lo consume. Alternativa: el flag `isAnimating` del `gsap-stepper.ts` no aplica aquí, pero existe un anti-patrón similar si `gsap.killTweensOf(slides)` interfiere. Requiere verificación en tiempo de ejecución.

#### Bug B2: Título sobre imágenes en negro (debería ser blanco)

- **Estado actual**: `.page-hero__title` tiene `color: #fff` explícito en `shared.css` (L350) **fuera de `@layer`**, y `.page-hero__inner` en `global.css` (L289) dentro de `@layer components` establece `color: var(--color-text-inverse)` (#ffffff). Ambas definiciones apuntan a blanco. Sin embargo, el bug reportado menciona "título sobre imágenes": en el directorio editorial, `.ind-spotlight__name` (L592 de shared.css) y `.ind-directory__name` (L105) tienen `color: #fff`. El `.page-hero__title` de shared.css tiene `color: #fff` — pero la regla en `@layer components` de global.css **no** declara `color` en `.page-hero__title`, solo en `.page-hero__inner`. Si Tailwind v4 resetea el `color` de los `h1` en su base layer, el `h1.page-hero__title` podría heredar `color: var(--color-text)` (negro) antes de que las reglas de `shared.css` se apliquen. El orden de importación importa: `global.css` se importa vía `BaseLayout.astro`; `shared.css` se importa desde las páginas — debería ganar por orden posterior, pero el `@layer` cambia la especificidad. [fuente: código `log-atm-web-astro/src/styles/global.css` L279-L296, `log-atm-web-astro/src/styles/pages/shared.css` L343-L357]
- **Spec relevante**: `[[internal-page-heroes]]` — Behavior 2: el markup `.page-hero__title` debe tener `data-hero-animate`. No hay especificación de color aquí; color es responsabilidad del CSS. [fuente: spec `[[internal-page-heroes]]`]
- **Archivos clave**:
  - `log-atm-web-astro/src/styles/pages/shared.css` — L297-L357 (`.page-hero` + `.page-hero__title`)
  - `log-atm-web-astro/src/styles/global.css` — L279-L303 (`@layer components .page-hero__title`)
- **Hipótesis de causa raíz**: Conflicto de especificidad entre `@layer components` (baja precedencia) y las reglas unlayered de `shared.css`. Tailwind v4 genera su base en `@layer base`, utilities en `@layer utilities`; `@layer components` tiene precedencia mayor que `@layer base` pero menor que reglas sin layer. Sin embargo, si `global.css` (cargado por BaseLayout) define `.page-hero__title` dentro de `@layer components` **sin `color`**, y la herencia de `h1` en Tailwind base pone `color: inherit` (del body que es `var(--color-text)` = negro), entonces `shared.css` con `color: #fff` debería ganar — a menos que el orden de imports en el bundle coloque `global.css` después de `shared.css`. Requiere inspección del HTML renderizado para confirmar cuál regla aplica.

#### Bug B3: Componentes pegados (falta spacing)

- **Estado actual**: Las secciones `.section` en `industrias.astro` (L61, L88, L144) no tienen padding vertical. La clase `.section { padding-block: var(--section-pad); }` está **únicamente definida en `sections/services.css` L2**. Ese archivo solo es importado por `sections.css` (L12), que a su vez solo importa `index.astro` (L11). `industrias.astro` solo importa `shared.css`, que no importa `sections/services.css`. [fuente: código `log-atm-web-astro/src/styles/sections/services.css` L2, `log-atm-web-astro/src/styles/sections.css` L12, `log-atm-web-astro/src/pages/index.astro` L11, `log-atm-web-astro/src/pages/industrias.astro` L9]
- **Spec relevante**: `[[sections/industries-styles]]` — completada, scope `industries.css`. No cubre `.section` padding. `[[tokens/consolidate-tokens]]` — `--section-pad` está en `tokens.css` L135. [fuente: spec `[[sections/industries-styles]]`, `[[tokens/consolidate-tokens]]`]
- **Archivos clave**:
  - `log-atm-web-astro/src/styles/sections/services.css` — L1-3 (única definición de `.section`)
  - `log-atm-web-astro/src/styles/pages/shared.css` — L1-10 (imports)
  - `log-atm-web-astro/src/pages/industrias.astro` — L9, L61, L88, L144
- **Hipótesis de causa raíz**: La regla `.section { padding-block }` fue creada en `services.css` como side-effect de la sección de servicios del home, y nunca se movió a un lugar global accesible para las páginas internas. La definición debería estar en `shared.css` o en `global.css`.

---

### /nosotros

#### Bug B4: Componentes pegados

- **Estado actual**: `nosotros.astro` usa clases `.manifesto`, `.timeline`, `.section.section--surface`, `.section.section--alt` para sus secciones (L56, L69, L91, L116, L147). `.manifesto` y `.timeline` tienen `padding-block: var(--section-pad)` definidos dentro de `shared.css` (L664, L697). Las secciones con clase `.section` sufren el mismo problema que B3. [fuente: código `log-atm-web-astro/src/pages/nosotros.astro` L91-L163, `log-atm-web-astro/src/styles/pages/shared.css` L664, L697]
- **Spec relevante**: `[[nosotros-timeline-reveal]]` — verifica spacing en timeline específicamente. [fuente: spec]
- **Archivos clave**:
  - `log-atm-web-astro/src/pages/nosotros.astro` — L91, L116, L147
  - `log-atm-web-astro/src/styles/pages/shared.css` — L664-L760 (manifesto, timeline, values, howwork)
- **Hipótesis de causa raíz**: Misma causa que B3: `.section { padding-block }` no está disponible en páginas internas. `values-grid` y `howwork-grid` están dentro de `<section class="section section--surface">` y `<section class="section section--alt">` — sin el padding de `.section`, las secciones se pegan.

---

### /contacto

#### Bug B5: Sin espaciado entre componentes

- **Estado actual**: `contacto.astro` tiene dos bloques: `.page-hero` y `<section class="section section--alt">` (L45). Sin el padding de `.section`, la sección del formulario se pega al hero. [fuente: código `log-atm-web-astro/src/pages/contacto.astro` L45]
- **Archivos clave**:
  - `log-atm-web-astro/src/pages/contacto.astro` — L45
  - `log-atm-web-astro/src/styles/pages/shared.css`
- **Hipótesis de causa raíz**: Misma causa raíz que B3/B4.

#### Bug B6: Falta ícono de WhatsApp en bloque "WhatsApp · respuesta inmediata"

- **Estado actual**: El canal de WhatsApp en `contacto.astro` (L138-L146) usa `<Icon name="lucide:message-circle" width={22} height={22} />` dentro de `.channel__icon`. El paquete instalado es `@iconify-json/lucide` (v1.2.102) — esta librería **no incluye íconos de marcas** (WhatsApp, Facebook, etc.), solo íconos de línea. `lucide:message-circle` es un círculo genérico de mensaje, no el logo de WhatsApp. No hay `@iconify-json/simple-icons` ni `@iconify-json/mdi` instalado para iconos de marca. El bug reportado es que "falta el ícono de WhatsApp" — puede significar que el ícono no renderiza (si `message-circle` no existe en la versión instalada) o que visualmente no es el logo de WhatsApp reconocible. [fuente: código `log-atm-web-astro/src/pages/contacto.astro` L140, `log-atm-web-astro/package.json` L34]
- **Spec relevante**: No hay spec explícita para este canal. [fuente: código]
- **Archivos clave**:
  - `log-atm-web-astro/src/pages/contacto.astro` — L138-L146
  - `log-atm-web-astro/package.json` — L34 (`@iconify-json/lucide`)
- **Hipótesis de causa raíz**: Dos posibilidades no excluyentes: (1) `lucide:message-circle` no existe en la versión instalada y el ícono no renderiza en absoluto (área `.channel__icon` aparece vacía); (2) el ícono renderiza pero es un círculo genérico, no el logo reconocible de WhatsApp. La solución correcta es un inline SVG del logo oficial de WhatsApp o instalar `@iconify-json/simple-icons` y usar `simple-icons:whatsapp`.

---

### /cotizar

#### Bug B7: No se puede seleccionar modalidad → wizard bloqueado

- **Estado actual**: El botón `#btn-next` se renderiza con `disabled` hardcodeado en el HTML (L259). El `renderStep()` se llama en el "Initial render" al final del script (L693-L694). El script `define:vars` en `cotizar.astro` **no** está envuelto en `document.addEventListener('astro:page-load', ...)`. El segundo script (que importa `gsap-stepper.ts`) tampoco usa `astro:page-load`. Los mode-tiles tienen listeners `click` registrados directamente (L507-L517). `canAdvance()` para `step === 0` retorna `!!state.mode` — inicialmente `""` → falso, btn-next disabled. Al hacer clic en un mode-tile, `state.mode` se actualiza y `renderStep()` habilita el botón. [fuente: código `log-atm-web-astro/src/pages/cotizar.astro` L259, L427-L432, L507-L517, L693-L694]
- **Spec relevante**: `[[interactive-component-transitions]]` — stepper con transiciones GSAP. [fuente: spec]
- **Archivos clave**:
  - `log-atm-web-astro/src/pages/cotizar.astro` — L259, L347-L695 (script del wizard)
  - `log-atm-web-astro/src/scripts/gsap-stepper.ts`
  - `log-atm-web-astro/src/styles/pages/cotizar.css`
- **Hipótesis de causa raíz**: Si el bug es que **después** de hacer clic en un mode-tile el botón sigue deshabilitado, puede haber un problema de timing: el segundo `<script>` (que importa `gsap-stepper.ts`) se ejecuta **después** del `define:vars` y puede sobreescribir `window.__stepperTransition` después del Initial render. Si la navegación usa View Transitions y el script no está en `astro:page-load`, los listeners del wizard pueden no reregistrarse correctamente al navegar de vuelta a la página. Este es el candidato más probable para el bloqueo persistente. También posible: `isAnimating` quedó `true` de una animación interrumpida.

#### Bug B8: Paso success muestra folio inventado y no envía email real

- **Estado actual del email**: La API `/api/cotizacion` **sí existe** (`src/pages/api/cotizacion.ts`) y está completamente implementada con validación, honeypot y `sendMail`. El change `forms-email-sending` completó todas las fases (sdd-apply, sdd-verify) y el archivo existe en el worktree actual. La función `submitQuote()` en `cotizar.astro` hace `fetch('/api/cotizacion', ...)` correctamente (L625). El email **sí debería enviarse** — pero la API requiere `MAIL_TO`, `SMTP_USER`, `SMTP_PASS` configurados en `.env` (o `.dev.vars` para Cloudflare). Si el entorno de producción no tiene estos vars, la API retorna 500 en silencio y el wizard puede mostrar error. [fuente: código `log-atm-web-astro/src/pages/api/cotizacion.ts`, `log-atm-web-astro/src/pages/cotizar.astro` L625-L654, memory `changes/forms-email-sending/state.md`]
- **Estado del folio**: `showSuccess()` genera el folio en cliente como `'LA-' + String(Date.now()).slice(-6)` (L677). Esto es por diseño actual — un identificador de sesión temporal, no un folio real del sistema. El paso de success muestra este folio local en `#success-id`. No hay persistencia ni generación server-side. [fuente: código `log-atm-web-astro/src/pages/cotizar.astro` L676-L690]
- **Spec relevante**: `[[forms-email]]` capability — contrato del endpoint. El scenario "Cotización válida" describe `POST /api/cotizacion` con `name`, `email`, `modality`, `origin`, `dest`. [fuente: spec `[[forms-email]]`]
- **Archivos clave**:
  - `log-atm-web-astro/src/pages/cotizar.astro` — L601-L691 (submitQuote + showSuccess)
  - `log-atm-web-astro/src/pages/api/cotizacion.ts` — endpoint completo
  - `log-atm-web-astro/src/lib/mailer.ts` — (si existe) sendMail
  - `log-atm-web-astro/.dev.vars` / `.env` — variables SMTP (NO en repo)
- **Hipótesis de causa raíz**: (1) Email: el endpoint existe y funciona; el bug puede ser que los vars SMTP no están configurados en el entorno donde se probó — la API retorna 500 pero el wizard ignora el error y muestra success de todas formas (bug en el flujo de error). Revisar línea ~631: `if (r.ok && res.ok) { ... showSuccess(); }` — si no hay `.env`, retorna 500 → no llama `showSuccess()`. (2) Folio: es un `Date.now()` intencional pero reportado como "inventado" — el folio no es real/persistente ni viene del servidor.

#### Bug B9: Wizard responsive roto en mobile

- **Estado actual**: `cotizar.css` tiene breakpoints en `.stepper__track` (repeat(4, 1fr) sin breakpoint mobile explícito salvo `.stepper__name { display: none }` en max-720px), `.quote-layout` (1fr 380px → 1fr a max-1000px), `.mode-grid` (repeat(2,1fr) → 1fr a max-600px), `.route-pair` (grid 1fr 40px 1fr → 1fr a max-600px). El stepper ocupa 4 columnas en móvil — en pantallas de 375px cada columna es ~93px, los bullets son 30px, pero el contenedor `.stepper` es `position: sticky; top: 60px`. En móvil, el stepper de 4 pasos en grid puede desbordarse. [fuente: código `log-atm-web-astro/src/styles/pages/cotizar.css` L55-L107]
- **Archivos clave**:
  - `log-atm-web-astro/src/styles/pages/cotizar.css` — L55-L115 (stepper + quote-layout)
  - `log-atm-web-astro/src/pages/cotizar.astro` — L68-L86 (stepper markup)
- **Hipótesis de causa raíz**: El stepper de 4 pasos en `grid-template-columns: repeat(4, 1fr)` no tiene breakpoint para móvil (< 480px/360px). En pantallas pequeñas el stepper se comprime sin overflow control. El `quote-layout` colapsa a 1 columna en max-1000px (correcto), pero el `.quote-card` tiene `padding: clamp(1.75rem, 3vw, 2.5rem)` que puede ser insuficiente para contenido del wizard en pantallas muy pequeñas.

---

### Global

#### Bug B10: Favicon es default de Astro

- **Estado actual**: `public/favicon.svg` es el ícono triangular/letra "A" de Astro (SVG de 128x128px con el path del logo de Astro). `public/logo.svg` y `public/logo.png` contienen el logo correcto de Log ATM con el símbolo de carga y colores de la marca (`#4a7bb5`). `BaseLayout.astro` referencia `/favicon.svg` e `/favicon.ico` (L175-L176). El `favicon.ico` es un PNG 32x32 con colormap — su contenido visual no fue verificado pero el file type sugiere que puede ser también el default. `public/logo-white.svg` existe para uso sobre fondos oscuros. [fuente: código `log-atm-web-astro/src/layouts/BaseLayout.astro` L175-L178, `log-atm-web-astro/public/favicon.svg`]
- **Archivos clave**:
  - `log-atm-web-astro/public/favicon.svg` — REEMPLAZAR con logo de marca
  - `log-atm-web-astro/public/favicon.ico` — REEMPLAZAR con logo de marca (32x32)
  - `log-atm-web-astro/public/logo.svg` — fuente del logo correcto de la marca
  - `log-atm-web-astro/src/layouts/BaseLayout.astro` — L175-L178 (referencias a favicon)
- **Hipótesis de causa raíz**: El `favicon.svg` nunca fue actualizado desde el scaffolding inicial de Astro. El logo de la marca ya está en `public/` pero no se convirtió en favicon.

---

## Mapa de archivos afectados

| Archivo | Bugs que toca | Capability |
|---------|---------------|------------|
| `src/pages/industrias.astro` | B1, B2, B3 | internal-page-heroes, sections |
| `src/pages/nosotros.astro` | B2, B4 | internal-page-heroes, nosotros-timeline-reveal |
| `src/pages/contacto.astro` | B2, B5, B6 | internal-page-heroes, forms-email |
| `src/pages/cotizar.astro` | B7, B8, B9 | forms-email, interactive-component-transitions |
| `src/pages/api/cotizacion.ts` | B8 | forms-email |
| `src/scripts/gsap-ind-directory.ts` | B1 | interactive-component-transitions |
| `src/scripts/gsap-stepper.ts` | B7, B9 | interactive-component-transitions |
| `src/styles/pages/shared.css` | B2, B3, B4, B5 | sections, tokens |
| `src/styles/sections/services.css` | B3, B4, B5 | sections |
| `src/styles/pages/cotizar.css` | B7, B9 | interactive-component-transitions |
| `src/styles/global.css` | B2 | tokens |
| `public/favicon.svg` | B10 | — |
| `public/favicon.ico` | B10 | — |
| `src/layouts/BaseLayout.astro` | B10 | — |

---

## Capabilities involucradas

| Capability | Specs vigentes relevantes | Bugs |
|------------|---------------------------|------|
| forms-email | `[[forms-email/spec]]` (in-progress) | B8 |
| internal-page-heroes | `[[internal-page-heroes]]` (draft) | B2 |
| interactive-component-transitions | (no spec activa verificada) | B1, B7, B9 |
| nosotros-timeline-reveal | (no spec activa en directorio) | B4 |
| sections (tokens/spacing) | `[[sections/hero-styles]]` (completed), `[[tokens/consolidate-tokens]]` (completed) | B3, B4, B5 |

---

## Approaches posibles

### A1 — Fix mínimo quirúrgico (RECOMENDADO)

Corregir cada bug con el cambio de menor superficie de impacto, sin refactorizar estructuras compartidas.

- **B3/B4/B5 (spacing)**: Mover `.section { padding-block: var(--section-pad); }` de `sections/services.css` a `shared.css` (o a `global.css` fuera del layer). Una línea de CSS.
- **B2 (color título)**: Agregar `color: #fff !important` a `.page-hero__title` en `shared.css` para forzar precedencia, o sacar la definición de `global.css` del `@layer components` y ponerla sin layer.
- **B1 (selector industrias)**: Envolver el script `define:vars` en `document.addEventListener('astro:page-load', ...)` para asegurar orden de ejecución en View Transitions.
- **B6 (ícono WhatsApp)**: Reemplazar el `<Icon>` de Lucide por un inline SVG del logo oficial de WhatsApp en el bloque `.channel--wa`.
- **B7 (wizard bloqueado)**: Envolver el script principal del wizard en `astro:page-load` y agregar `resetAnimatingFlag()` al inicio para limpiar estado colgado.
- **B8 (folio)**: El email ya funciona si los vars SMTP están configurados. Fix del folio: pasar el folio desde la respuesta del servidor (modificar API para retornar `{ ok: true, folio: "LA-XXXXXX" }`) y generarlo server-side.
- **B9 (mobile wizard)**: Agregar breakpoints para el stepper en móvil (<480px): colapsar a bullets-only o scroll horizontal.
- **B10 (favicon)**: Generar `favicon.svg` simplificado del logo de marca (símbolo solo) y convertir a `.ico`.

**Pros**: Cambios atómicos, bajo riesgo de regresión, fácil de verificar.
**Contras**: No resuelve la deuda técnica de tener `.section` en `services.css`.
**Esfuerzo**: S (B3/B4/B5/B2/B6/B10) — M (B7/B8/B9)
**Cubre bugs**: B1, B2, B3, B4, B5, B6, B7, B8, B9, B10

---

### A2 — Fix con refactor de CSS compartido

Adicionalmente a A1, mover `.section { padding-block }` a `global.css` (fuera del layer) como regla global del sitio, y consolidar todas las definiciones de `.page-hero` en un solo lugar.

- **Pros**: Elimina la deuda técnica del `.section` huérfano en `services.css`; evita que el bug se repita en futuras páginas.
- **Contras**: Mayor superficie de cambio; requiere prueba visual en la página de inicio para verificar que `services.css` no se rompe.
- **Esfuerzo**: M
- **Cubre bugs**: Los mismos que A1 + deuda técnica de `.section`.

---

### A3 — Fix B8 sin modificar API (folio client-side mejorado)

Para B8: mantener el folio `Date.now()` en cliente pero hacerlo más legible (`LA-${fecha}-${ms}`), y documentar que el envío de email ya existe. No modificar la API.

- **Pros**: Mínimo riesgo.
- **Contras**: El folio sigue siendo "inventado" — no viene del servidor ni se puede rastrear. No resuelve el bug semánticamente.
- **Esfuerzo**: XS
- **Cubre bugs**: B8 parcialmente (solo el aspecto visual, no la trazabilidad del folio).

---

## Riesgos detectados

- **R1 — Vars SMTP no configuradas en worktree**: El worktree `fix-ux-multipage-bugs` no tiene `node_modules` instalados. Para probar B8 se necesita `npm install` y `.dev.vars` con las vars SMTP. Sin esto, la prueba manual del envío de email no es posible.
- **R2 — View Transitions y re-registro de listeners**: Los scripts del wizard (`cotizar.astro`) y del directorio (`industrias.astro`) no están en `astro:page-load`. Si el usuario navega away y regresa, los listeners pueden no re-registrarse. El fix de B7/B1 debe añadir `astro:page-load`.
- **R3 — Cascada CSS con Tailwind v4 y `@layer`**: El bug B2 puede tener causas no visibles en el código fuente sin renderizar. Las reglas de `global.css` dentro de `@layer components` pueden interactuar con Tailwind v4 de manera inesperada. Requiere inspección del HTML compilado en el browser.
- **R4 — Favicon ICO sin conversión adecuada**: Generar un `.ico` correcto desde SVG requiere herramientas externas (sharp, ImageMagick). El proyecto tiene `sharp` instalado como dependencia, lo que facilita la conversión.
- **R5 — B8 folio server-side**: Modificar la API para retornar un folio implica cambiar la respuesta de `cotizacion.ts` y la lógica de `showSuccess()` — superficie mayor que los demás fixes. Si el folio es estético y no hay backend de persistencia, puede dejarse como `Date.now()` mejorado (A3).

---

## Recomendación

**Approach A1** con la extensión de mover `.section` a `global.css` (de A2), aplicado en un único commit por grupo de bugs relacionados:

1. **Grupo CSS/spacing** (B3, B4, B5, B2): mover `.section` a `global.css` fuera de layer y corregir `page-hero__title` color.
2. **Grupo interactividad** (B1, B7, B9): `astro:page-load` wrappers + breakpoints mobile stepper.
3. **Grupo funcional** (B6, B8): ícono WhatsApp inline SVG + folio server-side (o A3 si se prefiere no tocar la API).
4. **Global** (B10): favicon de marca.

El grupo CSS es el de mayor impacto visual y menor riesgo — puede desplegarse primero.

---

## Coverage de tests del área

- No hay directorio de tests (`__tests__/`, `cypress/`, `playwright/`) en el worktree. [fuente: código `log-atm-web-astro/`]
- No existe evidencia de test coverage del wizard, forms, heroes ni industrias directory.
- Las specs en `memory/specs/forms-email/spec.md` definen scenarios Gherkin que servirían como base para tests manuales/automatizados, pero no están implementados.
- El change `forms-email-sending` tiene un `tasks.md` con paso T14 (verify con curl) — no hay tests automatizados.
- **Conclusión**: Coverage de tests = 0. Los fixes se verificarán manualmente con `astro dev` + inspección en browser + curls a la API.
