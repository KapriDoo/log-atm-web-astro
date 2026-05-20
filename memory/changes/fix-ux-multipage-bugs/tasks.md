---
type: tasks
change_name: "fix-ux-multipage-bugs"
created: "2026-05-19"
total_tasks: 20
---

# Tasks — fix-ux-multipage-bugs

## Preflight

### T0.1 — Instalar dependencias en el worktree
- **Archivo(s)**: N/A
- **Acción**: Desde la raíz del worktree ejecutar:
  ```bash
  cd /home/kapridoo/projects/log-atm-web-astro/.sdd/worktrees/fix-ux-multipage-bugs/log-atm-web-astro
  npm install
  ```
- **Criterio de completado**: directorio `node_modules/` presente; `npx astro --version` imprime versión sin errores.
- **Bloquea**: todas las demás tasks.

### T0.2 — Crear `.dev.vars` para desarrollo local
- **Archivo(s)**: `log-atm-web-astro/.dev.vars`
- **Acción**: Copiar `log-atm-web-astro/.dev.vars.example` a `log-atm-web-astro/.dev.vars`. Dejar variables SMTP vacías o configurar con credenciales Ethereal (ver D-6 del design). No commitear este archivo si está en `.gitignore`.
- **Criterio de completado**: archivo `.dev.vars` presente; `astro dev` o `wrangler pages dev` arranca sin error por variables de entorno faltantes.
- **Depende de**: T0.1
- **Bloquea**: T6.1 (verificación SMTP).

---

## Spec: sections/internal-pages-vertical-rhythm — D-1

### T1.1 — Verificar imports de `index.astro` respecto a `shared.css`
- **Archivo(s)**: `log-atm-web-astro/src/pages/index.astro`
- **Acción**: Leer los imports de `index.astro` y determinar si importa `shared.css` (directa o transitivamente). Documentar el resultado: si NO importa `shared.css`, la regla `.section { padding-block }` debe mantenerse también en `services.css` (Plan B DRY-laxo) o bien añadir el import de `shared.css` en `index.astro`.
- **Criterio de completado**: se sabe con certeza si `/index` importa `shared.css`; la decisión queda registrada como comentario en el commit o en el código.
- **Depende de**: T0.1

### T1.2 — Añadir regla `.section { padding-block }` en `shared.css`
- **Archivo(s)**: `log-atm-web-astro/src/styles/pages/shared.css`
- **Acción**: Añadir la regla `.section { padding-block: var(--section-pad); }` en la sección de "layout base" del archivo, cerca del inicio, antes de definiciones específicas de páginas internas. Usar el token exacto `--section-pad` (verificar que el token existe en el proyecto antes de usar).
- **Criterio de completado**: la regla aparece en `shared.css`; el token `--section-pad` es válido (existe en tokens CSS del proyecto).
- **Depende de**: T1.1

### T1.3 — Remover o mantener regla en `services.css` (según TX-3)
- **Archivo(s)**: `log-atm-web-astro/src/styles/sections/services.css`
- **Acción**: Según resultado de T1.1:
  - Si `/index` SÍ importa `shared.css` (directa o transitivamente): eliminar `.section { padding-block }` de `services.css` para evitar doble declaración.
  - Si `/index` NO importa `shared.css`: mantener la regla en `services.css` como fallback (Plan B DRY-laxo); añadir comentario explicativo `/* También en shared.css — se mantiene para /index que no importa shared.css */`.
- **Criterio de completado**: no hay doble declaración que pueda causar problemas, o la duplicación está justificada con comentario. Verificar visualmente `/index` en `astro dev` para confirmar que su spacing no cambia.
- **Depende de**: T1.2
- **AC spec**: las secciones `.section` en `/industrias`, `/nosotros`, `/contacto` y `/cotizar` muestran padding-block visible; `/index` no cambia.

---

## Spec: internal-page-heroes/hero-title-contrast — D-2

### T2.1 — Asegurar regla `.page-hero__title { color: #fff }` unlayered en `shared.css`
- **Archivo(s)**: `log-atm-web-astro/src/styles/pages/shared.css`
- **Acción**: Verificar si la regla `.page-hero__title { color: #fff; }` ya existe en `shared.css`. Si existe pero está dentro de un `@layer`, moverla fuera del `@layer` (las reglas unlayered tienen mayor especificidad que las layered en Tailwind v4). Si no existe, añadirla fuera de cualquier `@layer`. Si el token del proyecto es `var(--color-text-inverse)`, usarlo en lugar de `#fff` si ya existe y tiene el valor correcto.
  - **Plan A** (preferido): regla unlayered en `shared.css` con selector `.page-hero .page-hero__title` para especificidad suficiente.
  - **Plan B** (solo si verify falla): editar `global.css` para sacar la definición de `@layer components`.
- **Criterio de completado**: inspector del navegador sobre `h1.page-hero__title` muestra `color: #ffffff` con la regla de `shared.css` ganando la cascada. Contraste WCAG AA ≥ 4.5:1 verificable visualmente (heroes con imagen de fondo oscura).
- **Depende de**: T0.1
- **AC spec**: título h1 del hero en `/industrias`, `/nosotros`, `/contacto` (y `/cotizar` si aplica) se muestra en blanco; ratio de contraste ≥ 4.5:1; persiste tras View Transitions.

---

## Spec: interactive-component-transitions/industries-selector-interaction — D-3

### T3.1 — Añadir augmentación de tipos para globals `window` (TX-4)
- **Archivo(s)**: `log-atm-web-astro/src/types/globals.d.ts` (crear si no existe)
- **Acción**: Verificar si existe `src/types/globals.d.ts`. Si no existe, crearlo con el contenido:
  ```ts
  declare global {
    interface Window {
      __indDirectoryOnRender?: (idx: number) => void;
      __stepperState?: { isAnimating: boolean; step: number };
    }
  }
  export {};
  ```
  Si ya existe, añadir las dos declaraciones que falten.
- **Criterio de completado**: TypeScript no reporta error de tipo en los accesos a `window.__indDirectoryOnRender` y `window.__stepperState` en los archivos modificados posteriormente.
- **Depende de**: T0.1
- **Bloquea**: T3.2, T4.1

### T3.2 — Envolver init del directorio de industrias en `astro:page-load`
- **Archivo(s)**: `log-atm-web-astro/src/pages/industrias.astro`
- **Acción**: Envolver el bloque de script principal (donde se llama `initIndDirectory(...)` y se asigna `window.__indDirectoryOnRender`) dentro de:
  ```ts
  document.addEventListener('astro:page-load', () => {
    // 1. Asignar callback ANTES de initIndDirectory (orden crítico)
    window.__indDirectoryOnRender = (idx) => { /* actualizar caption */ };
    // 2. Init directorio
    initIndDirectory(/* config */);
  });
  ```
  Usar `AbortController` con `astro:before-swap` para limpiar listeners previos y garantizar idempotencia (ver patrón TX-1 del design). Si hay un `<script define:vars>` separado para la asignación del callback, asegurar que ese bloque precede al script de init en el markup HTML.
- **Criterio de completado**: click en cualquier ítem del directorio de industrias cambia el spotlight y actualiza el caption, tanto en carga inicial como después de navegar fuera y volver (View Transitions). No se acumulan timers de autorotación.
- **Depende de**: T3.1
- **AC spec**: ítems responden a click; caption actualiza; sin acumulación de timers.

### T3.3 — Ajuste defensivo en `gsap-ind-directory.ts` (opcional según auditoría)
- **Archivo(s)**: `log-atm-web-astro/src/scripts/gsap-ind-directory.ts`
- **Acción**: Auditar si el script accede a `window.__indDirectoryOnRender` sin verificar su existencia antes de que el callback sea asignado. Si existe ese acceso prematuro, añadir un guard defensivo:
  ```ts
  if (typeof window.__indDirectoryOnRender === 'function') {
    window.__indDirectoryOnRender(idx);
  }
  ```
- **Criterio de completado**: el script no lanza `TypeError: window.__indDirectoryOnRender is not a function` en ninguna ruta de ejecución. Si no había problema, este task es no-op (no modificar innecesariamente).
- **Depende de**: T3.2

---

## Spec: interactive-component-transitions/wizard-step-modality-selection — D-4

### T4.1 — Envolver init del wizard en `astro:page-load` con reset de `isAnimating`
- **Archivo(s)**: `log-atm-web-astro/src/pages/cotizar.astro`, `log-atm-web-astro/src/scripts/gsap-stepper.ts`
- **Acción**:
  1. En `cotizar.astro`, envolver el script principal del wizard en `document.addEventListener('astro:page-load', () => { ... })`.
  2. Dentro del handler, antes de cualquier otra inicialización, resetear el flag de animación:
     ```ts
     if (window.__stepperState) window.__stepperState.isAnimating = false;
     ```
  3. Re-registrar listeners de `.mode-tile` (click), `#btn-next` y `#btn-prev` en cada `astro:page-load`. Usar `AbortController` + `astro:before-swap` para limpiar listeners previos (ver TX-1).
  4. Ejecutar el render inicial del paso 0 (`renderStep(state.step)` o equivalente) dentro del handler.
  5. En `gsap-stepper.ts`: si el flag `isAnimating` vive como variable de módulo privada, exponer una función `resetStepperState()` que lo ponga a `false`, o exponer el objeto `__stepperState` en `window` para que `cotizar.astro` pueda resetearlo.
- **Criterio de completado**: usuario puede seleccionar cualquier tile de modalidad y ver el tile marcado visualmente; botón "Siguiente" se habilita; wizard avanza al paso 2. Tras navegar fuera y volver, el comportamiento es idéntico. No hay bloqueo por `isAnimating` colgado.
- **Depende de**: T3.1 (patrón `astro:page-load` establecido)
- **AC spec**: tiles responden en carga inicial y tras View Transitions; btn-next se habilita al seleccionar; sin modalidad seleccionada btn-next permanece deshabilitado.

---

## Spec: forms-email/quote-folio-server-generated — D-5

### T5.1 — Crear helper `generateFolio()` en `src/lib/folio.ts`
- **Archivo(s)**: `log-atm-web-astro/src/lib/folio.ts` (nuevo)
- **Acción**: Crear el archivo con el helper aislado y testeable:
  ```ts
  /**
   * Genera un folio único de cotización server-side.
   * Formato: LA-{base36(timestamp)}{8-hex-de-UUID}
   * Ejemplo: LA-LX9K2A3F4B1C2D9E
   */
  export function generateFolio(): string {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = crypto.randomUUID().split('-')[0].toUpperCase(); // 8 hex chars
    return `LA-${ts}${rand}`;
  }
  ```
  El módulo es server-only (no importar en scripts de cliente).
- **Criterio de completado**: el archivo existe, TypeScript compila sin errores (`crypto` disponible en runtime Workers/Node 22+), dos llamadas consecutivas producen folios distintos.
- **Depende de**: T0.1

### T5.2 — Generar folio server-side en `POST /api/cotizacion` y retornarlo en response
- **Archivo(s)**: `log-atm-web-astro/src/pages/api/cotizacion.ts`
- **Acción**:
  1. Importar `generateFolio` desde `../../lib/folio`.
  2. Dentro del POST handler, justo después de la validación del payload y antes de `buildCotizacion4Email`, generar el folio:
     ```ts
     const folio = generateFolio();
     ```
  3. Pasar `folio` a `buildCotizacion4Email(data, { ...meta, folio })` para que aparezca en el cuerpo del email.
  4. Incluir `folio` en el JSON de respuesta:
     ```ts
     return json(200, { ok: true, folio });
     ```
  5. Eliminar cualquier generación de folio que pudiera existir en el handler (verificar si había `Date.now()` u otro generador).
- **Criterio de completado**: el endpoint devuelve `{ ok: true, folio: "LA-..." }` en respuestas exitosas; el folio no se genera en el cliente.
- **Depende de**: T5.1

### T5.3 — Incluir folio en la plantilla de email
- **Archivo(s)**: `log-atm-web-astro/src/lib/email-templates.ts`
- **Acción**: Modificar `buildCotizacion4Email` (o función equivalente) para aceptar y mostrar el folio en el cuerpo HTML y texto del correo. Añadir el folio en el asunto o en un campo prominente del email:
  ```
  Asunto: "Nueva cotización Log ATM — Folio LA-XXXXXX"
  Cuerpo: "Folio: LA-XXXXXX" (visible para el equipo comercial)
  ```
- **Criterio de completado**: el email recibido por el equipo comercial (o capturado en Ethereal) incluye el folio que coincide con el devuelto al cliente en la respuesta JSON.
- **Depende de**: T5.2

### T5.4 — Cliente del wizard consume `folio` del response del servidor
- **Archivo(s)**: `log-atm-web-astro/src/pages/cotizar.astro`
- **Acción**:
  1. En la función `submitQuote()` (o equivalente), leer `folio` del response JSON:
     ```ts
     const res = await r.json();
     if (r.ok && res.ok && res.folio) {
       state.folio = res.folio;
       showSuccess();
     } else {
       showError(res.error || 'unknown', res.fields);
     }
     ```
  2. En `showSuccess()`: renderizar `state.folio` (del server) en el elemento `#success-id` o equivalente que muestra el folio al usuario.
  3. Eliminar TODA referencia a `Date.now()` o cualquier generación local de folio en el script del wizard.
- **Criterio de completado**: paso de confirmación muestra el folio recibido del servidor; el código fuente del wizard no contiene `Date.now()` ni lógica de generación de folio en cliente (verificar con búsqueda en el archivo).
- **Depende de**: T5.2, T4.1
- **AC spec**: folio mostrado en confirmación coincide con `res.folio`; código cliente no genera folio; envíos sucesivos producen folios distintos.

---

## Spec: forms-email/quote-email-delivery — D-6

### T6.1 — Verificar `.dev.vars.example` y documentar Ethereal como fallback SMTP
- **Archivo(s)**: `log-atm-web-astro/.dev.vars.example`
- **Acción**: Abrir el archivo y verificar que contiene las siguientes variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `MAIL_FROM` (esta última si la API la usa; verificar `mailer.ts`). Añadir un comentario sobre Ethereal como opción de fallback para QA:
  ```
  # Para QA sin SMTP real, usar Ethereal Email (https://ethereal.email/create)
  # SMTP_HOST=smtp.ethereal.email
  # SMTP_PORT=587
  # SMTP_SECURE=false
  # SMTP_USER=<generado por Ethereal>
  # SMTP_PASS=<generado por Ethereal>
  ```
- **Criterio de completado**: `.dev.vars.example` documenta todas las variables SMTP requeridas con comentario de fallback Ethereal. AC spec: variables SMTP listadas en documentación del proyecto.
- **Depende de**: T0.2

### T6.2 — Manejo robusto de error en `submitQuote` del wizard
- **Archivo(s)**: `log-atm-web-astro/src/pages/cotizar.astro`
- **Acción**: Verificar (y corregir si es necesario) que la función `submitQuote()` maneja correctamente los casos de error del servidor:
  - Si `r.ok === false` (400, 500): llamar `showError(res.error || 'unknown', res.fields)` en lugar de mostrar success.
  - Si `r.ok === true` pero `res.ok === false`: ídem.
  - Si `res.folio` no está presente en la respuesta exitosa: no mostrar el paso de confirmación con folio vacío; mostrar error.
  Esta task se solapa con T5.4; verificar que el manejo de error es completo al integrar el cambio.
- **Criterio de completado**: el wizard refleja el error al usuario si el envío falla; nunca muestra `{ ok: true }` con folio vacío. AC spec: si envío falla, respuesta del endpoint no es `ok: true`; wizard refleja el error.
- **Depende de**: T5.4

---

## Spec: forms-email/wizard-responsive-mobile — D-7

### T7.1 — Añadir media queries `≤ 480px` para stepper y quote-card en `cotizar.css`
- **Archivo(s)**: `log-atm-web-astro/src/styles/pages/cotizar.css`
- **Acción**: Añadir los siguientes bloques al final del archivo (o en la sección de media queries si existe):
  ```css
  /* Breakpoint mobile chico — wizard (TX-2) */
  @media (max-width: 480px) {
    .stepper__track {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--space-1);
    }
    .stepper__bullet {
      width: 28px;
      height: 28px;
      font-size: 0.875rem;
    }
    .stepper__name { display: none; }
    .quote-card { padding: var(--space-3); }
  }
  ```
  Verificar que los nombres de clase (`.stepper__track`, `.stepper__bullet`, `.stepper__name`, `.quote-card`) coinciden con los usados en el markup real de `cotizar.astro`; ajustar si difieren.
- **Criterio de completado**: en DevTools de Chrome a 375px y 480px, el stepper de 4 pasos es visible sin scroll horizontal; quote-card no desborda; bullets tienen tamaño suficiente para toque.
- **Depende de**: T0.1

### T7.2 — Garantizar touch targets mínimos (44px) en controles del wizard
- **Archivo(s)**: `log-atm-web-astro/src/styles/pages/cotizar.css`
- **Acción**: Verificar en DevTools (375px) que `.mode-tile`, `#btn-next`, `#btn-prev` e inputs de texto tienen al menos 44x44px de área tocable. Si alguno no cumple, añadir al bloque `@media (max-width: 480px)` de T7.1 las reglas necesarias:
  ```css
  .mode-tile, #btn-next, #btn-prev { min-height: 44px; min-width: 44px; }
  ```
  También verificar `overflow-x: hidden` en el contenedor principal del wizard para evitar scroll horizontal.
- **Criterio de completado**: todos los controles interactivos son tocables (min 44px en ambas dimensiones) a 375px; no hay scroll horizontal en ningún paso. AC spec: sin scroll horizontal en 375px ni 480px; botones con altura mínima 44px.
- **Depende de**: T7.1

---

## Spec: components/contacto-channels/whatsapp-icon — D-8

### T8.1 — Crear componente `WhatsAppIcon.astro`
- **Archivo(s)**: `log-atm-web-astro/src/components/icons/WhatsAppIcon.astro` (nuevo; crear directorio `icons/` si no existe)
- **Acción**: Crear el componente Astro con SVG inline del logo oficial de WhatsApp (path de 24x24 de Wikimedia Commons / simple-icons):
  ```astro
  ---
  interface Props {
    width?: number;
    height?: number;
    class?: string;
    ariaLabel?: string;
  }
  const { width = 24, height = 24, class: cls = "", ariaLabel = "WhatsApp" } = Astro.props;
  ---
  <svg
    viewBox="0 0 24 24"
    width={width}
    height={height}
    class={cls}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={ariaLabel}
  >
    <path
      fill="currentColor"
      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
    />
  </svg>
  ```
- **Criterio de completado**: componente importable sin errores de TypeScript; SVG renderiza correctamente (verificar en `astro dev`); `aria-label="WhatsApp"` presente.
- **Depende de**: T0.1

### T8.2 — Integrar `WhatsAppIcon` en `contacto.astro`
- **Archivo(s)**: `log-atm-web-astro/src/pages/contacto.astro`
- **Acción**:
  1. Añadir import al frontmatter:
     ```astro
     import WhatsAppIcon from '../components/icons/WhatsAppIcon.astro';
     ```
  2. Localizar el bloque `.channel--wa` (aproximadamente L138-L146 según el design) y reemplazar `<Icon name="lucide:message-circle" />` (o el ícono actual) por:
     ```astro
     <span class="channel__icon">
       <WhatsAppIcon width={22} height={22} ariaLabel="WhatsApp" />
     </span>
     ```
  3. Si el design system requiere verde de marca de WhatsApp: añadir `color: #25D366` al selector `.channel--wa .channel__icon` en el CSS de `contacto.astro` o en `contacto.css`.
- **Criterio de completado**: bloque "WhatsApp · respuesta inmediata" en `/contacto` muestra el logo reconocible de WhatsApp; `aria-label` presente; logo visible en Chrome, Firefox y Safari. AC spec: logo reconocible; accesible; sin nuevas dependencias de paquetes de íconos.
- **Depende de**: T8.1

---

## Spec: branding/favicon-logo-atm — D-9

### T9.1 — Crear script `generate-favicons.mjs`
- **Archivo(s)**: `log-atm-web-astro/scripts/generate-favicons.mjs` (nuevo; crear directorio `scripts/` si no existe)
- **Acción**: Crear el script Node ESM one-shot usando `sharp` (v0.34.5 ya instalado) que lee `public/logo.svg` como fuente y produce `public/favicon.svg` y `public/favicon.ico`:
  ```js
  import sharp from 'sharp';
  import { copyFile } from 'fs/promises';
  import { join } from 'path';
  import { fileURLToPath } from 'url';

  const ROOT = join(fileURLToPath(import.meta.url), '..', '..');

  // Verificar si logo.svg existe en public/
  const SRC_SVG  = join(ROOT, 'public/logo.svg');
  const OUT_SVG  = join(ROOT, 'public/favicon.svg');
  const OUT_ICO  = join(ROOT, 'public/favicon.ico');

  async function main() {
    // favicon.svg: copia directa del logo (Plan A: probar legibilidad)
    await copyFile(SRC_SVG, OUT_SVG);
    console.log('[favicons] favicon.svg generado:', OUT_SVG);

    // favicon.ico: PNG 32x32 renombrado a .ico (soportado por Chrome/FF/Safari modernos)
    await sharp(SRC_SVG)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(OUT_ICO);
    console.log('[favicons] favicon.ico (32x32 PNG) generado:', OUT_ICO);
  }

  main().catch(e => { console.error('[favicons] ERROR:', e); process.exit(1); });
  ```
  Nota: si verify revela que el logo completo no es legible a 16px, crear `public/favicon-source.svg` (símbolo simplificado) y cambiar `SRC_SVG` para apuntar a él.
- **Criterio de completado**: el script ejecuta sin errores con `node scripts/generate-favicons.mjs` desde el directorio `log-atm-web-astro/`; produce `public/favicon.svg` y `public/favicon.ico`.
- **Depende de**: T0.1

### T9.2 — Registrar script `favicons` en `package.json`
- **Archivo(s)**: `log-atm-web-astro/package.json`
- **Acción**: Añadir el script en la sección `"scripts"`:
  ```json
  "favicons": "node scripts/generate-favicons.mjs"
  ```
  No añadirlo a `prebuild` (es one-shot manual; el output se commitea al repo).
- **Criterio de completado**: `npm run favicons` desde el directorio `log-atm-web-astro/` ejecuta el script sin errores.
- **Depende de**: T9.1

### T9.3 — Ejecutar script y commitear assets de favicon
- **Archivo(s)**: `log-atm-web-astro/public/favicon.svg`, `log-atm-web-astro/public/favicon.ico`
- **Acción**: Ejecutar `npm run favicons` (o equivalente). Verificar visualmente que el `favicon.svg` generado muestra el logo Log ATM (no el triángulo de Astro). Verificar que `favicon.ico` tiene 32x32px (verificar con `file favicon.ico` o inspector). Commitear ambos assets.
- **Criterio de completado**: ambos assets presentes en `public/`; favicon.svg no es el default de Astro; favicon.ico tiene dimensiones 32x32.
- **Depende de**: T9.2
- **Riesgo R-D9b**: si el logo completo no es legible a 16px, crear `public/favicon-source.svg` simplificado y actualizar T9.1 para usarlo como fuente.

### T9.4 — Verificar `<link>` favicon en `BaseLayout.astro`
- **Archivo(s)**: `log-atm-web-astro/src/layouts/BaseLayout.astro`
- **Acción**: Confirmar que los tags `<link rel="icon">` en L175-L176 (o donde se encuentren) apuntan a `/favicon.svg` y `/favicon.ico`. Si están correctos, no tocar el archivo. Si falta alguno, añadirlo:
  ```html
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  ```
- **Criterio de completado**: navegador muestra el logo Log ATM como favicon en todas las rutas del sitio. AC spec: pestaña muestra logo en Chrome/Firefox/Safari; triángulo de Astro no aparece.
- **Depende de**: T9.3

---

## Tasks transversales

### TT-1 — Auditar scripts inline en otras páginas internas (TX-1)
- **Archivo(s)**: `log-atm-web-astro/src/pages/nosotros.astro`, `log-atm-web-astro/src/pages/contacto.astro`, `log-atm-web-astro/src/pages/servicios.astro` (si existe)
- **Acción**: Revisar cada archivo buscando scripts inline que registren listeners DOM sin estar envueltos en `astro:page-load`. Para cada script encontrado, evaluar si:
  - Registra listeners que deben sobrevivir a View Transitions → envolver en `astro:page-load`.
  - Solo ejecuta lógica de setup one-shot (ej. inicializar GSAP sin listeners) → no es necesario envolver.
  Aplicar el patrón canónico TX-1 con AbortController donde corresponda.
- **Criterio de completado**: ningún script de inicialización de listeners DOM en páginas internas ejecuta fuera del handler `astro:page-load`. Las animaciones GSAP de scroll y entrance siguen funcionando correctamente.
- **Depende de**: T3.2, T4.1 (patrón establecido)

### TT-2 — Verify pre-commit: lint + typecheck + build
- **Archivo(s)**: N/A
- **Acción**: Desde `log-atm-web-astro/`:
  ```bash
  npm run lint     # si existe, verificar en package.json
  npm run typecheck  # o npx tsc --noEmit
  npm run build
  ```
  Corregir cualquier error de TypeScript o build antes de considerar el cambio listo para review.
- **Criterio de completado**: 0 errores de TypeScript; `npm run build` completa sin errores. Warnings no críticos son aceptables pero deben documentarse.
- **Depende de**: todas las tasks anteriores

---

## Resumen

| Task | Spec / Decisión | Tipo | Bloquea |
|------|-----------------|------|---------|
| T0.1 | Preflight | setup | Todo |
| T0.2 | Preflight | setup | T6.1 |
| T1.1 | D-1 | análisis | T1.2 |
| T1.2 | D-1 | CSS modificar | T1.3 |
| T1.3 | D-1 | CSS modificar/decidir | — |
| T2.1 | D-2 | CSS modificar | — |
| T3.1 | TX-4 | TS crear | T3.2, T4.1 |
| T3.2 | D-3 | TS modificar | T3.3 |
| T3.3 | D-3 | TS modificar (opcional) | — |
| T4.1 | D-4 | TS modificar | T5.4 |
| T5.1 | D-5 | TS crear | T5.2 |
| T5.2 | D-5 | TS modificar | T5.3, T5.4 |
| T5.3 | D-5 | TS modificar | T6.1 |
| T5.4 | D-5 | TS modificar | T6.2 |
| T6.1 | D-6 | docs modificar | — |
| T6.2 | D-6 | TS modificar | — |
| T7.1 | D-7 | CSS modificar | T7.2 |
| T7.2 | D-7 | CSS modificar | — |
| T8.1 | D-8 | Astro crear | T8.2 |
| T8.2 | D-8 | Astro modificar | — |
| T9.1 | D-9 | script crear | T9.2 |
| T9.2 | D-9 | JSON modificar | T9.3 |
| T9.3 | D-9 | assets generar | T9.4 |
| T9.4 | D-9 | Astro verificar | — |
| TT-1 | TX-1 | auditoría | — |
| TT-2 | verify | build | — |

- **Total tasks**: 20 tareas principales + 6 sub-tasks/verificaciones implícitas
- **Bloqueantes críticos**: T0.1 (npm install), T3.1 (tipos globals), T5.1 (folio helper), TT-2 (build verde)
- **Tests automatizados**: ninguno (no hay infra de tests en el proyecto; verify es manual)
- **Dependencias circulares**: ninguna
- **Estimado de implementación**: 1-2 días de trabajo efectivo
