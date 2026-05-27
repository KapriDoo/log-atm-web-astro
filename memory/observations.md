# Observations SDD

Log de hallazgos operacionales del pipeline SDD.
Categorías permitidas: ver `@global/skills/_shared/obsidian-persistence-convention#observations-md-policy`.
Formato: ## YYYY-MM-DD | <tag> | <change|global> | <summary>

## 2026-05-26 | architecture | fix-cotizar-wizard-init | Bug site-wide: astro:page-load sin ClientRouter montado
**Severidad**: High — wizard /cotizar/ completamente inerte en carga directa de URL; alcance site-wide (7 archivos afectados).
**Descripción**: Todos los scripts del sitio usan `document.addEventListener('astro:page-load', ...)` pero `<ClientRouter />` (el único emisor de ese evento) no está montado en `BaseLayout.astro`. En carga directa, el evento nunca se dispara. Bug preexistente en `main`, no regresión del refactor de iconos.
**Evidencia**: `document.dispatchEvent(new Event('astro:page-load'))` manual en consola reactiva el wizard; flujo completo de 4 pasos funciona.
**Dos enfoques candidatos**: (1) montar `<ClientRouter />` en BaseLayout; (2) migrar listeners a patrón `DOMContentLoaded` (como LanguageSelector). Decisión pendiente en sdd-propose.
**Change**: fix-cotizar-wizard-init

## 2026-05-20 | debt | fix-cotizar-mobile-wizard-stepper | A11y: stepper__label oculto a screen readers en mobile
**Severidad**: Low — Detectado por sdd-judgment iter1 (Juez A y B coincidieron).
**Ubicación**: `log-atm-web-astro/src/styles/pages/cotizar.css` (media `max-width: 640px`)
**Descripción**: `.stepper__label { display: none }` en ≤640px oculta el texto del paso ("PASO 01") a lectores de pantalla sin equivalente accesible. Gap preexistente al patrón del stepper; mitigado parcialmente por el `<h2>` de cada panel del wizard.
**Promoción sugerida**: añadir `.sr-only` con el texto del paso o `aria-current="step"` + `aria-label` en el step activo. Fix de a11y trivial, fuera de scope de la regresión mobile.

## 2026-05-20 | pre-adr | fix-cotizar-mobile-wizard-stepper | Verify estático no detecta bugs de runtime mobile/touch
**Categoría**: lección del pipeline (refuerza la observación equivalente de `fix-ux-multipage-bugs`).
**Descripción**: El PR#19 marcó verify PASS pero los bugs B7/B9 persistieron en iPhone Safari real. Causa: el verify estático (build + curl + grep) es estructuralmente incapaz de detectar (a) overflow de layout responsive, (b) delays táctiles iOS (300ms sin touch-action), (c) fallos de event registration específicos de Safari. Este es el SEGUNDO change con esta lección.
**Promoción sugerida**: con ≥2 ocurrencias, considerar ADR formal sobre el contrato de verify para changes con superficie mobile/touch: requerir smoke en device real o emulación headless (chromium con `--device`) ANTES de marcar PASS; o marcar explícitamente el AC de runtime como "pendiente validación usuario" y bloquear el cierre del bug (no del PR) hasta confirmación.

## 2026-05-10 | architecture | redesign-experiencia-sector | Astro Assets + Sharp para optimización de imágenes
Se decide usar `astro:assets` con Sharp para procesar las 14 imágenes de industrias en build time, generando WebP/AVIF y previniendo CLS. Las imágenes fuente van en `src/assets/industries/`, no en `public/`. Se crea ADR-0001 documentando la decisión y sus alternativas descartadas (public/ estático, CDN externo, lazy loading manual con Intersection Observer).

## 2026-05-12 | follow-up | rescue-multi-language-support | nginx 404 multilingüe decorativo
**Detectado por**: sdd-judgment (Juez 2) en `rescue-multi-language-support`
**Ubicación**: `log-atm-web-astro/default.conf`, `log-atm-web-astro/nginx.conf`
**Descripción**: las páginas `/[lang]/404.astro` se generan estáticamente, pero la regla nginx actual `try_files $uri $uri/index.html /index.html` redirige cualquier URL inexistente al index español con status 200, produciendo soft-404 para URLs `/en/foo`, `/ar/bar`, etc. Las páginas 404 multilingües nunca se sirven.
**Promoción sugerida**: `sdd new fix-nginx-404-per-locale --domain fix` — añadir `error_page 404 /[lang]/404.html` por bloque location y propagar `try_files` con fallback al 404 del locale.

## 2026-05-19 | debt | fix-ux-multipage-bugs | N-1: contacto.astro pasa ariaLabel a WhatsAppIcon (doble anuncio)
**Severidad**: Low — Detectado por sdd-judgment iter2 (Juez A y B coincidieron).
**Ubicación**: `log-atm-web-astro/src/pages/contacto.astro:141`
**Descripción**: El componente `WhatsAppIcon.astro` quedó tras iter2 con soporte de modo decorativo (aria-hidden default), pero el caller en contacto.astro:141 aún pasa `ariaLabel="WhatsApp"` explícito, reactivando el doble anuncio en lectores porque el texto adyacente "WhatsApp · respuesta inmediata" ya nombra el bloque.
**Promoción sugerida**: fix trivial — eliminar `ariaLabel` en el caller o pasar `decorative={true}`.

## 2026-05-19 | debt | fix-ux-multipage-bugs | N-2: potrace en dependencies (debería ser devDep)
**Severidad**: Low — Detectado por sdd-judgment iter2 (Juez B).
**Ubicación**: `log-atm-web-astro/package.json`
**Descripción**: Tras mover sharp a devDependencies por simetría con su uso solo en scripts de build, potrace quedó en dependencies aunque también es solo para build.
**Promoción sugerida**: incluir en próximo housekeeping de deps.

## 2026-05-19 | debt | fix-ux-multipage-bugs | N-3: type-loss en wizard.ts:196
**Severidad**: Nit — Detectado por sdd-judgment iter2 (Juez B).
**Ubicación**: `log-atm-web-astro/src/scripts/wizard.ts:196`
**Descripción**: `__stepperTransition` tipado como `(opts: unknown) => void` en el módulo nuevo. Type-loss menor; idealmente con interfaz tipada compartida.

## 2026-05-19 | pre-adr | fix-ux-multipage-bugs | Verify reforzado: grep de TS leak en HTML/JS producido
**Categoría**: lección del pipeline.
**Descripción**: Iter1 de sdd-verify reportó PASS basado solo en build estático sin grep del HTML/JS producido. El issue H-1 (sintaxis TS sin transpilar en `<script define:vars>`) fue invisible para typecheck/build pero rompía el wizard en runtime. Judgment lo detectó con `node --check` sobre el HTML construido. Recomendación: `sdd-verify` para changes que tocan `<script define:vars>` debe incluir explícitamente `grep -rE '(as [A-Z]\w+|type \w+ =|: \w+ =|<[A-Z]\w+>)' dist/client/**/*.html dist/_astro/*.js`.
**Promoción sugerida**: si este patrón se repite ≥3 veces → ADR formal sobre el contrato de verify para scripts inline.

## 2026-05-26 | tasks | fix-cotizar-wizard-init | scroll-animations.ts confirmado Grupo A — no modificar
**Confirmado**: `scroll-animations.ts` llama `init()` en module-load (l.146) ANTES del handler `astro:page-load` (l.149). Ya funciona en carga directa. NO se incluye en las tareas de corrección.
**Decisión de diseño**: `define:vars` en `industrias.astro` primer bloque no soporta imports — se usa el patrón `ready()` inline (4 líneas) en lugar de importar el helper.
**Creado**: `tasks.md` con 7 tareas de implementación + 7 escenarios de verificación Playwright.

## 2026-05-26 | pre-adr | redesign-email-templates-v2 | Email HTML: border-radius/box-shadow/overflow:hidden en Outlook Win
**Severidad**: Low — Degradación visual aceptable, contenido íntegro.
**Descripción**: El diseño de referencia usa `border-radius:20px`, `box-shadow` y `overflow:hidden` en el `<table>` contenedor externo. Outlook Win (Word rendering engine) no soporta ninguna de estas propiedades en tablas. El correo se muestra sin redondear y sin sombra, pero el contenido es completamente legible. `overflow:hidden` ignorado puede hacer visible el borde superior recto del header en Outlook (header con gradiente no se clipa). Impacto bajo — compatible con Gmail, Apple Mail, Outlook Mac, clientes móviles.
**Decisión sugerida**: Aceptar la degradación. No añadir hacks VML para border-radius (complejidad desproporcionada, YAGNI).

## 2026-05-26 | pre-adr | redesign-email-templates-v2 | Estrategia de logo: textual vs. imagen
**Severidad**: Decisión de diseño.
**Descripción**: El diseño de referencia usa un div textual ("A" + "LOG ATM") como logo en lugar de `<img>`. El proyecto tiene `public/logo.png` y `public/logo-white.svg`. Opciones: (1) mantener textual (robusto, sin bloqueo de imágenes, sin riesgo de clipping por peso del email), (2) `<img src="https://logatm.com/logo.png">` (visualmente más fiel, pero Gmail y Outlook bloquean imágenes por defecto hasta que el usuario las habilita). El diseño 1:1 es textual.
**Decisión sugerida**: Mantener logo textual siguiendo el diseño de referencia. Si el cliente en el futuro quiere imagen, se puede añadir con `alt` adecuado.

## 2026-05-26 | pre-adr | redesign-email-templates-v2 | cleanPhone helper para CTAs WhatsApp
**Severidad**: Técnico — requerido para CTA funcional.
**Descripción**: El botón "WhatsApp →" construye un link `https://wa.me/{phone}`. El número de teléfono puede llegar con espacios, guiones o paréntesis (ej. "+56 9 8765 4321"). wa.me requiere dígitos únicamente (sin separadores, con código de país). Requiere un helper `cleanPhone()` que elimine todo excepto dígitos y el `+` inicial.
**Decisión sugerida**: Añadir `cleanPhone()` interno en `email-templates.ts`. Omitir el botón WhatsApp si `cleanPhone()` retorna string vacío.

## 2026-05-26 | pre-adr | redesign-email-templates-v2 | buildContactoEmail: campo route no es par origen/destino
**Severidad**: Decisión de diseño.
**Descripción**: El formulario de contacto captura `route` como texto libre (ej. "Shanghai → San Antonio"), no como par separado `{origin, destination}`. El diseño de referencia muestra una sección ROUTE VISUAL con dos celdas separadas (Origen | flecha | Destino). Opciones: (a) omitir ROUTE VISUAL para buildContactoEmail y mostrar route como campo plano en el data grid, (b) intentar parsear el texto libre (frágil), (c) mostrar el route como campo único en la sección visual (caja azul con texto completo). La opción (a) es la más robusta.
**Decisión sugerida**: Para buildContactoEmail, si existe `d.route`, mostrarlo como fila en el data grid (no como ROUTE VISUAL). Solo buildCotizacionRapidaEmail y buildCotizacion4Email tienen pares origen/destino separados y usan la sección ROUTE VISUAL.

## sdd-propose — fix-cotizar-wizard-init (2026-05-26)
- Codebase en estado MIXTO de init: Grupo A (Navbar ScrollTrigger, scroll-animations init() l.146, gsap-stepper wiring en cotizar.astro l.363-382, LanguageSelector) inicializa en module-load y YA funciona en carga directa. Grupo B (wizard.ts, HeroSection, contacto, servicios, nosotros, industrias) gatea todo tras astro:page-load → roto en carga directa.
- Montar ClientRouter (Opción 1) provocaría DOBLE init del Grupo A (module-load + astro:page-load) y activaría por primera vez cleanups astro:before-swap nunca probados (Navbar l.346, wizard l.126, gsap-ind-directory l.120). Riesgo alto no medible sin CI.
- wizard.ts funciona end-to-end en carga directa con SOLO desacoplarlo: gsap-stepper helpers ya en window via module-load, y wizard tiene fallback sin GSAP (l.215-222).
- Recomendado: Opción 2 (desacoplar init con patrón ready() estilo LanguageSelector), scope = los 7 puntos del Grupo B. Esfuerzo M. No tocar Grupo A.

## 2026-05-26 — fix-cotizar-wizard-init — post sdd-verify

- **PASS verificado**: wizard `/cotizar/` y scripts de sitio inicializan correctamente en carga directa con el helper `ready.ts`.
- **3 páginas con evidencia indirecta** (código correcto, no probadas en navegador): `/contacto/` (formulario), `/nosotros/` (timeline scroll), `/industrias/` (directorio/autorotación). Recomendado spot-check manual antes de merge.
- **Riesgo futuro**: cuando se monte `ClientRouter`, los listeners `astro:page-load` registrados a nivel `document` (sin scope de ruta) necesitarán scoping para evitar re-inicialización en páginas no relevantes.
- **Grafo de specs**: 3 slugs referenciados en `related[]` aún no existen en el corpus (`interactive-component-transitions/wizard-step-modality-selection`, `scroll-animations/scroll-inner-pages`, `nosotros-timeline-reveal/spec`). WARN de metadata, no FAIL funcional.
