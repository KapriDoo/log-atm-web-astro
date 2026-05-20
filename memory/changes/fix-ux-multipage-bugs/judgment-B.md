---
type: judgment
judge: B
focus: code-quality-regressions-edge-cases
change_name: "fix-ux-multipage-bugs"
created: "2026-05-19"
verdict: CONFIRMED_ISSUES
---

# Juicio B — Code Quality / Regressions / Edge Cases

## Veredicto: CONFIRMED_ISSUES

El cambio tiene buena disciplina de patrones (AbortController, `astro:page-load`, server-side folio, validación con anti-CRLF, honeypot, touch targets WCAG 2.5.5). Sin embargo, **el bug central que la PR pretende arreglar — el wizard de /cotizar — sigue roto en producción** porque el script inline contiene sintaxis TypeScript que el navegador no puede ejecutar. La PR añade `astro:page-load`, pero el script jamás se evalúa porque lanza `SyntaxError` antes de registrar el listener. Esto está confirmado inspeccionando `dist/client/cotizar/index.html` (el build empaqueta el script raw con `type Unit = ...`, `as HTMLSelectElement`, generics `<T extends HTMLElement>` y mantiene un IIFE `<script>(function(){…})()</script>`). El issue es **pre-existente** (estaba antes del PR), pero el PR no lo corrige y aun así reporta PASS en `verify-report.md` Blocque B.

El resto de los hallazgos son menores (DRY-laxo en CSS, type augmentation incompleta en `globals.d.ts`, falta de rate limiting en `/api/cotizacion`, posibles regresiones de cascada del selector global `.section`).

---

## Hallazgos confirmados (issues a resolver antes de archive)

| ID | Severidad | Categoría | Archivo:línea | Descripción | Recomendación |
|----|-----------|-----------|----------------|-------------|----------------|
| B-1 | **HIGH** | Regression / Failed-Fix | `log-atm-web-astro/src/pages/cotizar.astro:347-727` | El bloque `<script define:vars={{ clientStrings }}>` contiene sintaxis TypeScript (`type Unit = …`, `mode: '' as string`, `<T extends HTMLElement>`, `as HTMLButtonElement`, etc.) que Astro inyecta tal cual en el HTML producido. Verificado en `dist/client/cotizar/index.html` (líneas con `type Unit = 'cbm' \| 'fcl20' \| 'fcl40';`). El navegador lanza `SyntaxError` al primer parse del IIFE; **ningún listener del wizard se registra**, incluido el nuevo `astro:page-load`. La fix declarada en commit `b4ab389` no se materializa en runtime. **Pre-existente al PR** (98a21ca ya tenía la sintaxis), pero la PR declara resolver `interactive-component-transitions/wizard-step-modality-selection` y `forms-email/quote-email-delivery` y el verify-report marcó PASS sin ejecutar smoke test (Bloque C SKIPPED). | Mover todo el bloque a un módulo importado (`<script>import { initWizard } from '../scripts/wizard'; …</script>`) o convertirlo a JS puro eliminando todos los tipos. Smoke-test del browser obligatorio antes de archive. |
| B-2 | Medium | Quality / Incomplete-Augmentation | `log-atm-web-astro/src/types/globals.d.ts:8-9` | El archivo declara `Window.__indDirectoryOnRender` y `Window.__stepperState`. Pero `__stepperState` **no se usa en ningún sitio** (dead code); en cambio `cotizar.astro` expone `__stepperTransition`, `__stepperIsAnimating`, `__stepperReset` que **no están declarados** y por eso `cotizar.astro` recurre a aserciones inline `(window as Window & { __stepperReset?: … })` 6 veces (líneas 369, 482, 506, 734-747). El archivo de augmentation queda mintiendo sobre los globals reales. | Reemplazar `__stepperState` por las tres entradas reales: `__stepperTransition`, `__stepperIsAnimating`, `__stepperReset`. Eliminar las aserciones inline en cotizar.astro tras la augmentación. |
| B-3 | Medium | Regression-Risk | `log-atm-web-astro/src/styles/pages/shared.css:10` y `src/styles/sections/services.css:2` | La regla `.section { padding-block: var(--section-pad); }` se declara ahora en dos hojas globales. El selector `.section` es muy genérico; cualquier componente futuro o sección de Tailwind class merging que use `.section` heredará este padding. En el cargado actual `index` importa `services.css` y subpáginas importan `shared.css`, por lo que la "duplicación" no causa cascade ambigua, pero el patrón debilita la encapsulación y dificulta auditar futuros usos del selector. | Documentado en comentarios. Acceptable como Plan B DRY-laxo, pero registrar como deuda técnica para consolidar el rythm vertical en un layer (`@layer base { .section … }`) y eliminar la duplicación. |
| B-4 | Medium | Security / Hardening-Gap | `log-atm-web-astro/src/pages/api/cotizacion.ts:33-100` | El endpoint no tiene **rate limiting**. Un atacante puede automatizar POSTs y agotar la cuota del servicio SMTP (worker-mailer + Cloudflare). El honeypot bloquea bots simples pero no ataques targetidos. Pre-existente al PR pero el cambio amplifica la atención al endpoint (nuevo folio en respuesta = mejor señal de éxito para un atacante). | Out-of-scope estricto del PR (no introducido), pero **registrar como riesgo abierto** y proponer KV-based rate limit per IP en una iteración posterior. |
| B-5 | Low | Quality / XSS-Pattern | `log-atm-web-astro/src/pages/industrias.astro:207` | `tagsEl.innerHTML = tags.map((t) => \`<span class="ind-directory__tag">${t}</span>\`).join('')` — tags provienen de translation data (controlled by project), pero el patrón es brittle. Si alguien añade un tag con HTML (incluso por error en `i18n/`), entra al DOM sin escape. | Reemplazar por `tagsEl.replaceChildren(...tags.map(t => { const s = document.createElement('span'); s.className='ind-directory__tag'; s.textContent=t; return s; }))`. |
| B-6 | Low | Quality / Dependency-Hygiene | `log-atm-web-astro/package.json:28` | `sharp` está en `dependencies` pero solo se usa por `scripts/generate-favicons.mjs` (one-shot, no se ejecuta en build automatizado). Bloating del `dependencies` con un native add-on. **Pre-existente** al PR pero el commit `83dbedb` solidifica este uso. | Mover `sharp` (y `potrace` por simetría) a `devDependencies`. |
| B-7 | Low | Edge / Browser-Compat | `log-atm-web-astro/public/favicon.ico` | El archivo es un PNG 32×32 renombrado a `.ico`. El comentario en `generate-favicons.mjs` lo reconoce. Chrome/Firefox/Edge modernos aceptan PNG-as-ICO. **Safari macOS pre-15** y **algunos crawlers/feed readers** pueden no parsear el header correctamente. | Riesgo bajo. Si se quiere robustez, usar `to-ico` (dev dep) y producir ICO multi-size (16/32/48). |
| B-8 | Low | Quality / Unused-API | `log-atm-web-astro/src/scripts/gsap-stepper.ts:28` | `let isAnimating = false;` es estado mutable a nivel de módulo. Si dos páginas montan el stepper simultáneamente (no es el caso hoy, pero futuro multi-instancia) compartirían el flag. | Encapsular en una closure o factory por instancia. No crítico hoy. |

---

## Riesgos abiertos (sin bloqueo pero merecen registro)

- **Filtros de /servicios no filtran** (R-Pre-PR): los botones `.svc-filter` toggle clases `--active` y `aria-selected`, pero **no esconden ni filtran** las cards. `data-filter` está presente en los botones pero ninguna card tiene `data-category`. Pre-existente al PR (no introducido por este cambio) pero queda visible para el usuario como tabs falsos. Sugerencia: alinear con tasks futuros.
- **`prefersReducedMotion` se captura una vez** (al cargar `scroll-animations.ts`). Si el usuario cambia preferencia OS entre navegaciones View-Transition, las animaciones no se re-evalúan. Acceptable.
- **Verify-report marca PASS sin smoke test** del browser. Si B-1 hubiera sido capturado por un humano abriendo `/cotizar` en Chrome, la PR se habría detenido. Recomendar añadir un paso de "manual browser smoke" antes de marcar verify=PASS para changes que tocan scripts inline.
- **Industries directory tags via innerHTML** (B-5) — registrado.
- **Documentación de Ethereal vs. fallback runtime**: el commit `5e38779` solo documenta vars en `.dev.vars.example`. No hay fallback automático en `mailer.ts` si las vars están vacías. Si en producción las vars se borran por error, el endpoint devuelve 500 silenciosamente y nadie se entera. Sugerencia: log explícito + healthcheck/notification.

---

## Análisis por commit

### 2b35b92 — fix(css): `.section { padding-block }` en shared.css
- ✅ Resuelve correctamente el problema de ritmo vertical para subpáginas.
- ⚠️ Duplicación intencional con `services.css` documentada en comentarios. Plan B DRY-laxo acceptable, registrado como deuda B-3.
- ✅ Token `--section-pad` reutilizado, sin magic numbers.
- ✅ Sin regresión sobre `/index` (que sigue cargando `services.css`).

### 1b2e996 — fix(industrias): astro:page-load + Window augmentation
- ✅ Wrapping correcto en `astro:page-load`.
- ✅ Orden de registro: callback en define:vars (síncrono) → inicialización en módulo (deferred) → ambos listeners se ejecutan en `astro:page-load` en orden FIFO. Bien.
- ✅ Cleanup en `gsap-ind-directory.ts` con `{ once: true }` en `astro:before-swap` (evita listener leak).
- ⚠️ `globals.d.ts` declara `__stepperState` sin uso, omite `__stepperTransition`/`__stepperIsAnimating`/`__stepperReset` que sí se usan. Hallazgo B-2.
- ⚠️ `tagsEl.innerHTML = tags.map(...)` — anti-pattern, hallazgo B-5.

### 9696674 — feat(quote): folio server-side
- ✅ `generateFolio()` usa `crypto.randomUUID()` (8 hex chars) + `Date.now().toString(36)`. Colisión de folio bajo carga concurrente: P(collision per minute @ 100req/min) ≈ 2⁻³². Suficiente para uso comercial.
- ✅ Endpoint retorna `{ ok: true, folio }`; cliente verifica `r.ok && res.ok && res.folio` antes de mostrar éxito (b4ab389 line 658-662). Buena defensiva.
- ✅ Folio en subject + tabla del email. Trazabilidad ✓.
- ✅ Folio opcional en `Meta` type (`folio?: string`) — retrocompatible con `buildContactoEmail` etc.
- ✅ Server-only: comentario explícito en `folio.ts` indica no importar en cliente.

### b4ab389 — fix(cotizar): wrap wizard in astro:page-load
- ❌ **HALLAZGO CRÍTICO B-1**: el script sigue siendo TypeScript dentro de `<script define:vars>`. `astro:page-load` listener nunca se registra porque el parse del IIFE falla. Verificado en built HTML.
- ✅ Lógica del wizard refactorizada con AbortController + `signal` en cada listener — buen patrón si el script ejecutase.
- ✅ Eliminada la generación local de folio (no más `Date.now()` en cliente). Cliente solo lee `res.folio`.
- ✅ Reset de estado en cada `astro:page-load` (Object.assign con valores iniciales). Defensivo.
- ✅ Guard contra race de animación (`__stepperIsAnimating?.()`) revierte `state.step` si hay tween en curso. Diseño correcto.
- ✅ `submitQuote()` desactiva el botón, muestra `setQuoteStatus('Enviando…')`, maneja errores de red, validación y server. Bien.
- ⚠️ Status messages hardcoded en español dentro del script (`'Enviando tu solicitud…'`, `'Revisa los datos: ${first}'`, `'No pudimos enviar...'`, `'Error de conexión…'`) — no se internacionalizaron. Inconsistencia con `contacto.astro` que sí usa `data-msg-*` attributes para i18n del status. Sugerencia: aplicar mismo patrón en cotizar.
- ⚠️ Si B-1 se arregla, queda pendiente verificar el flow real (smoke test).

### bac1e9b — fix(cotizar): mobile breakpoint ≤480px
- ✅ Touch targets ≥44×44px en `.mode-tile`, `#btn-next`, `#btn-back`. WCAG 2.5.5 ✓.
- ✅ Stepper compacto con `repeat(4, minmax(0, 1fr))` — evita overflow.
- ✅ `overflow-x: hidden` en `.quote-layout` previene scroll horizontal.
- ⚠️ `.stepper__name { display: none }` oculta a screen readers. Como el `.stepper__label` ("Paso 01" etc.) sigue visible, hay redundancia mínima. Acceptable.
- ⚠️ Breakpoint `480px` cubre CSS pixels (no device pixels). Landscape orientation en phones (812×375 iPhone) cae por debajo de 480 en width, aplica. OK.

### a1748e0 — fix(contacto): WhatsAppIcon inline SVG
- ✅ SVG accesible con `role="img"` + `aria-label="WhatsApp"`. Default acceptable (brand name).
- ✅ `fill="currentColor"` — hereda color del padre, animable.
- ✅ Props tipados (`width`, `height`, `class`, `ariaLabel`). `class` renombrado a `cls` (palabra reservada en TS). Bien.
- ✅ AbortController + `astro:page-load` en el form submit. Patrón correcto.
- ✅ i18n del status: `data-msg-*` attributes leídos desde DOM. Solid.
- ⚠️ `ariaLabel = "WhatsApp"` no se traduce. Acceptable para brand name.

### 83dbedb — feat(branding): favicon-from-logo
- ✅ Script `generate-favicons.mjs` ESM puro, idempotente.
- ✅ `favicon.svg` copiado del logo (svg from logo.svg).
- ⚠️ `favicon.ico` es PNG renombrado (B-7). Documentado en comentario del script.
- ⚠️ `sharp` en `dependencies` (B-6) — debería estar en `devDependencies`.
- ✅ `<link rel="icon">` ya existía en BaseLayout (no requiere cambio).

### 5e38779 — docs(smtp): Ethereal fallback
- ✅ Documentación clara en `.dev.vars.example`.
- ⚠️ No hay fallback runtime — si las vars están vacías en prod, `mailer.ts` lanza `Missing env var`. No es un cambio de código, pero el commit message podría malinterpretarse como "implementa fallback".

### 059ee81 + 31928b9 — docs(memory)
- ✅ Specs y state actualizados. No impacta runtime.

---

## Cumplimiento de convenciones

- **Conventional Commits**: ✅ Todos los commits siguen `tipo(scope): descripción`.
- **Naming kebab-case archivos**: ✅ (`gsap-stepper.ts`, `gsap-ind-directory.ts`, `email-templates.ts`, `WhatsAppIcon.astro` — último es PascalCase porque es componente Astro/React, correcto).
- **Componentes React/Astro PascalCase**: ✅ (`WhatsAppIcon.astro`).
- **`prefers-reduced-motion`**: ✅ — `gsap-stepper.ts:38` y `gsap-ind-directory.ts:55` consultan `prefersReducedMotion` antes de animar. `cotizar.css` mobile breakpoint no añade animaciones nuevas.
- **i18n paridad**: ⚠️ Status messages hardcoded en `cotizar.astro:625,650,676,678,681` (en español). `contacto.astro` sí usa `data-msg-*`. Inconsistencia con la política de i18n.
- **TypeScript strict**: ⚠️ El proyecto declara TS strict pero `globals.d.ts` (B-2) no protege correctamente los globals del stepper; las aserciones inline son síntoma de augmentation incompleta.

---

## Seguridad

- **Validación de payload (cotizacion API)**: ✅ `clean()`, `isEmail()`, `hasHeaderInjection()`, `isPlainObject()`, honeypot website. Solid.
- **Sanitización de email (CRLF injection)**: ✅ `hasHeaderInjection` rechaza `\r\n` en `name`, `email`, `phone`, `company`. Buenos.
- **CSP/XSS**: ⚠️ Hallazgo B-5 — `innerHTML` con interpolación en industrias.
- **Rate limiting**: ❌ Ausente (B-4). Pre-existente. Riesgo de spam.
- **SMTP secret management**: ✅ Variables resueltas desde `cloudflare:workers` env, nunca expuestas al cliente.
- **Honeypot**: ✅ Presente en formularios `/contacto` y `/cotizar`.

---

## Recomendación final

**REGRESAR a sdd-apply** para resolver **B-1** antes de archive. Sin ese fix, dos de las nueve specs declaradas como PASS (`interactive-component-transitions/wizard-step-modality-selection`, `forms-email/quote-email-delivery`) son **funcionalmente falsas** en runtime, aunque el build estático pase. Adicionalmente:

1. **B-1 (HIGH)**: Mover el script inline de `cotizar.astro` a un módulo TS importado (`src/scripts/wizard.ts`) y eliminar el bloque `<script define:vars>`. Pasar `clientStrings` como `data-*` attributes o resolver vía dataset del form.
2. **B-2 (MED)**: Corregir `globals.d.ts` para declarar los tres globals reales del stepper. Eliminar `__stepperState` y las aserciones inline.
3. **B-5 (LOW)**: Reemplazar `innerHTML` por `replaceChildren` con `textContent`.
4. **Smoke test del browser obligatorio** antes de re-marcar verify=PASS — abrir `/cotizar` en Chrome y completar el wizard end-to-end.

B-3, B-4, B-6, B-7, B-8 son acceptable como deuda técnica registrada en `observations` o follow-up; no bloquean archive.
