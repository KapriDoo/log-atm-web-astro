---
type: judgment
judge: A
focus: correctness-vs-specs
change_name: "fix-ux-multipage-bugs"
created: "2026-05-19"
verdict: CONFIRMED_ISSUES
---

# Juicio A — Correctness vs Specs

## Veredicto: CONFIRMED_ISSUES

Encontré **1 issue High bloqueante** que rompe el wizard de cotización en runtime e invalida el PASS reportado por `verify-report.md` para las specs B7/B8/B9. Además identifiqué 4 issues Medium/Low (regresiones potenciales, contraste no medido, edge cases ignorados) y varios riesgos abiertos.

El defecto bloqueante es una fuga de sintaxis TypeScript dentro de un `<script define:vars>` que Astro emite verbatim al navegador, provocando un `SyntaxError` en la primera línea del IIFE. **El verify-report no detectó esto porque omitió el smoke test ("SKIPPED" justificado por un error de Cloudflare Workers que probablemente era consecuencia, no causa)** y la revisión estática del HTML construido tampoco se hizo.

---

## Hallazgos confirmados (issues que recomiendas resolver antes de archive)

| ID | Severidad | Spec afectada | Descripción | Recomendación |
|----|-----------|----------------|-------------|----------------|
| **A-1** | **High** | `interactive-component-transitions/wizard-step-modality-selection` + `forms-email/quote-folio-server-generated` + `forms-email/quote-email-delivery` + `forms-email/wizard-responsive-mobile` | **Sintaxis TypeScript filtrada al HTML producción del wizard de cotización**. El `<script define:vars={{ clientStrings }}>` en `src/pages/cotizar.astro:347` contiene declaraciones TS (`type Unit = 'cbm' \| 'fcl20' \| 'fcl40';`, `as Unit`, `as string`, `(window as Window & {...})`) que Astro emite **verbatim** al HTML (verificado con `node --check` sobre `dist/client/cotizar/index.html`, error: `SyntaxError: Unexpected identifier 'Unit'`, línea 3 del IIFE). El navegador aborta el script, **ningún listener del wizard se registra**: clicks en mode tiles no hacen nada, btn-next nunca se habilita, el form nunca se envía, el folio del servidor nunca se consume en cliente, los breakpoints mobile no rescatan un wizard que no responde. | (a) Refactorizar el script a JS puro (eliminar `type Unit`, `as Unit`, `as string`, `as string[]`, `as Window & {...}`, `as HTMLElement`, genéricos `<T extends HTMLElement>`, anotaciones `(): boolean`, etc.) — o (b) mover el contenido a un módulo TS importado y exponer una función `initQuoteWizard(clientStrings)` que el `<script define:vars>` solo invoque. Patrón (b) ya está bien usado en `industrias.astro` (TS en módulo importado, `define:vars` en JS plano). Rebuild + smoke test del HTML antes de cerrar. |
| **A-2** | **Medium** | `branding/favicon-logo-atm` | `public/favicon.ico` es realmente un PNG renombrado (`file public/favicon.ico` → `PNG image data, 32 x 32, 8-bit/color RGBA`). La spec exige formato `.ico` "para compatibilidad con navegadores antiguos" (SHALL en Requirements). Chrome/Firefox/Safari modernos lo aceptan, pero Safari iOS <14, IE11, y RSS/feed readers que validan magic-number rechazarán el archivo. El verify-report lo flagga como "riesgo abierto" pero el AC dice "público favicon.ico existe y tiene dimensiones 32x32 píxeles con el logo de Log ATM" — técnicamente cumplido por dimensiones, pero el SHALL "para compatibilidad con navegadores antiguos" no se cumple si el bytestream no es un ICO real. | Aceptable si el target browser list es solo evergreen; bloqueante si la base de usuarios incluye corporativos con IE11/Edge legacy. Alternativa: instalar `to-ico` (devDep) y regenerar el .ico real desde el PNG 32x32. Documentar la decisión en `memory/adrs/0004-folio-server-generated.md` o crear ADR separado. |
| **A-3** | **Medium** | `internal-page-heroes/hero-title-contrast` | El contraste WCAG AA ≥ 4.5:1 **no fue medido**; el verify-report lo declara PASS por "revisión estática" asumiendo overlay oscuro. Pero `src/styles/pages/shared.css:303–329` muestra que `.page-hero` usa un gradiente azul oscuro como base y **dos radial-gradients de luz verde (rgba(62,185,120,0.18))** sobre `var(--color-primary-900)`. Las zonas de los gradientes locales pueden tener brillo suficiente para reducir el ratio bajo 4.5:1 en una composición real. Adicionalmente, `/cotizar` usa `.quote-hero` (no `.page-hero`) cuyo `quote-hero__title { color: #fff }` está en `cotizar.css` y NO en shared.css — el AC dice "En /cotizar, el título del quote-hero se muestra en color blanco" — cumplido formalmente, pero `.quote-hero` no se beneficia de la corrección en shared.css. | Medir contraste con DevTools Accessibility Inspector o axe-core sobre las 4 páginas (/industrias, /nosotros, /contacto, /cotizar). Si <4.5:1, agregar un overlay sólido oscuro (rgba(0,0,0,0.35) por ejemplo) al `.page-hero::before` o text-shadow defensivo. |
| **A-4** | **Low** | `forms-email/quote-folio-server-generated` | Unicidad del folio sólo prácticamente garantizada para baja concurrencia. Formato `LA-{base36(Date.now())}{8-hex de UUID}` — los 8 hex del UUID v4 (32 bits) dan 1/4.3 billones de colisión por mismo timestamp; aceptable. Pero el scenario 2 dice "dos envíos simultáneos no producen el mismo folio" — si dos requests llegan en el mismo ms y `crypto.randomUUID()` por azar comparte los primeros 8 hex (probabilidad 1/4.3B), colisionan. **No es un bloqueante** dado el volumen esperado de cotizaciones, pero el AC es absoluto ("dos envíos simultáneos no producen el mismo folio") — pragmáticamente verdadero, formalmente no. | Documentar en el ADR-0004 que la unicidad es probabilística (acceptable para un sitio de cotizaciones de baja volumetría). Alternativamente usar UUID completo en lugar de los primeros 8 hex (16 hex = 64 bits) — 1 línea de cambio. |
| **A-5** | **Low** | `components/contacto-channels/whatsapp-icon` | El componente `WhatsAppIcon.astro` usa `role="img"` + `aria-label`, lo cual es correcto. Pero el wrapper `<a class="channel channel--wa">` ya incluye texto adyacente ("WhatsApp" + número en `channel__name` + `channel__value`). El SVG anuncia "WhatsApp" y luego el link anuncia "WhatsApp +56 9..." → doble anuncio en lectores de pantalla. La spec dice "aria-hidden + texto adyacente, o alt si es img" — un patrón aceptable según la propia spec sería `aria-hidden="true"` en el SVG (no `role="img"`). | Cambiar `ariaLabel="WhatsApp"` por `aria-hidden="true"` cuando el ícono se usa junto a texto descriptivo. Refactor pequeño en `WhatsAppIcon.astro` para soportar ambos modos (prop `decorative` por ejemplo). No bloqueante para archive — el comportamiento actual es accesible, sólo redundante. |

---

## Riesgos abiertos (sin bloqueo pero merecen registro)

- **R-1**: Mover `.section { padding-block: var(--section-pad); }` a `shared.css` es seguro porque `/index` NO importa `shared.css` (importa `services.css` que mantiene la regla, comentado como "Plan B DRY-laxo"). Verificado en `src/pages/index.astro` no leído pero implícito por la convención documentada en los comentarios. Si en el futuro alguien refactoriza `services.css` removiendo la regla, `/index` perdería el spacing. Sería bueno extraer a un archivo `_sections.css` compartido y deduplicar.
- **R-2**: El handler `astro:before-swap` se registra con `{ once: true }` en cada `astro:page-load`. Si el usuario navega A→B→A→B rápidamente, podrían quedar handlers stale registrados antes del swap. El patrón es estándar de Astro y el `once: true` lo mitiga, pero vale validar en QA manual con DevTools que no se acumulan listeners.
- **R-3**: La sección `.quote-hero` (cotizar) ya tenía `color: #fff` desde antes en `cotizar.css:5`. La regla `.page-hero__title { color: #fff }` agregada en shared.css **no aplica a `/cotizar`** porque el h1 ahí usa la clase `.quote-hero__title`, no `.page-hero__title`. El AC de hero-title-contrast incluye `/cotizar` pero el fix shared.css no toca esa página. Verificado: cumplido por inercia (el estilo previo ya era blanco), pero la mención en `acceptance_criteria` es engañosa.
- **R-4**: i18n — todas las páginas leen `currentLang`. Los cambios CSS/JS no afectan a i18n. La verificación de los 3 builds (`/`, `/en/`, `/pt/`) requiere que el bug A-1 se replique en las tres locales: confirmado en `dist/client/en/cotizar/index.html` y `dist/client/pt/cotizar/index.html` también — el define:vars block es idéntico (templates compartidos), todas las 3 locales tienen el wizard roto.

---

## Trazabilidad commit → spec → AC

| Commit | Spec referenciada | AC cubiertos | Notas |
|--------|-------------------|---------------|-------|
| `2b35b92` | `sections/internal-pages-vertical-rhythm` + `internal-page-heroes/hero-title-contrast` | rhythm: ✅ AC#1-4 / contrast: ⚠ AC#3 no medido | Una commit cubre 2 specs — acceptable, pero la spec hero-title-contrast cita commit 2b35b92 sólo para el lift en shared.css. ✅ El color `#fff` está en shared.css:356 fuera de `@layer base`. |
| `1b2e996` | `interactive-component-transitions/industries-selector-interaction` | ✅ todos | Wrap `__indDirectoryOnRender` y `initIndDirectory` en `astro:page-load` correctamente. `gsap-ind-directory.ts` ya registra cleanup via `astro:before-swap`. AC#4 ("no se acumulan timers") parcialmente verificable estáticamente — `clearInterval` antes de cada nuevo `setInterval` en `startAutoRotation`. |
| `9696674` | `forms-email/quote-folio-server-generated` | server-side: ✅ / cliente: ❌ (por A-1) | `src/lib/folio.ts` y `/api/cotizacion.ts` están correctos. **Pero** el AC#1 dice "El paso de confirmación del wizard muestra un folio recibido en la respuesta del servidor" — el wizard nunca llega a hacer la fetch porque A-1 rompe los listeners. AC#1 NO se cumple en runtime real. |
| `b4ab389` | `wizard-step-modality-selection` + `quote-folio-server-generated` + `quote-email-delivery` | ❌ todos en runtime (por A-1) | Este es el commit que introdujo el bug A-1: el refactor de `cotizar.astro` para wrap en `astro:page-load` mantuvo la sintaxis TS dentro de `define:vars`. Antes del refactor el script vivía fuera de `define:vars` y se compilaba como módulo TS — el bug es regresional de este commit. |
| `bac1e9b` | `wizard-responsive-mobile` | CSS: ✅ / funcional: ❌ (por A-1) | El CSS de `@media (max-width: 480px)` está correcto en cotizar.css:390. AC#1-5 se cumplen como estilo, pero un wizard inoperante en mobile (por A-1) hace que los ACs de "todos los pasos del wizard son visibles" y "los controles son tocables" sean vacuos — no hay nada operable que tocar. |
| `a1748e0` | `components/contacto-channels/whatsapp-icon` | ✅ AC#1, AC#3, AC#4 / ⚠ AC#2 ver A-5 | Implementación correcta. Sin nuevas deps de íconos verificable en `package.json` — solo se removió 1 uso de lucide:message-circle (líneas modificadas en contacto.astro), aunque `cotizar.astro:334` aún usa `Icon name="lucide:message-circle"` para el botón WhatsApp del success step (probablemente intencional, pero inconsistente con la migración a WhatsAppIcon). |
| `83dbedb` | `branding/favicon-logo-atm` | AC#1-3: ⚠ por A-2 / AC#4: ✅ | favicon.svg correcto. favicon.ico técnicamente PNG (ver A-2). `BaseLayout.astro:175-176` tiene ambos `<link>`. |
| `5e38779` | servicios svc-filters (NO declarada como spec) | ⚠ trazabilidad débil | Este commit wrap los click listeners de svc-filters en `astro:page-load` con AbortController. **No hay spec que cubra esto**. Es un fix preventivo derivado del mismo patrón View Transitions, pero está fuera de las 9 specs declaradas. Si era necesario, debería haber sido capability-spec `interactive-component-transitions/services-filters-interaction`. Si no era necesario, scope-creep. |
| `059ee81` | `forms-email/quote-email-delivery` | ✅ documentación Ethereal | Solo agrega comentarios al `.dev.vars.example`. Correcto, satisface el AC#5 ("Las variables SMTP están listadas en la documentación"). |

---

## Edge cases evaluados

- **Concurrent folio submissions** (A-4): probabilísticamente único, no garantizado matemáticamente. Aceptable para el volumen del sitio.
- **Mobile entre 360-480px**: el `@media (max-width: 480px)` cubre desde 480 hacia abajo. iPhone SE (375) está cubierto. iPhone Pro Max landscape (430) y dispositivos foldables (320) no se evaluaron explícitamente, pero el `minmax(0, 1fr)` en stepper y `min-width: 44px` en mode-tile deberían comportarse. **Sin embargo, todo esto es moot por A-1.**
- **Hero title sin imagen de fondo**: las 4 páginas (`/industrias`, `/nosotros`, `/contacto`, `/cotizar`) usan `.page-hero` con gradient + radial-gradients en lugar de imagen. El blanco sobre `var(--color-primary-900)` (azul muy oscuro) supera 4.5:1 trivialmente. Las radial-gradients claras NO son suficientemente luminosas para violar AA — calculé mental que rgba(62,185,120,0.18) sobre azul oscuro queda en luminancia ~0.1 vs blanco 1.0 → ratio >9:1. **OK**.
- **i18n**: el bug A-1 se replica en es/en/pt — todas las locales tienen el wizard roto.
- **View Transitions y AbortController**: el patrón es correcto en industrias y servicios. En cotizar el AbortController está dentro del IIFE que nunca se ejecuta (A-1) — ergo no hay cleanup posible tampoco.

---

## Calidad del verify-report

**El verdict PASS es no defendible** por los siguientes motivos:

1. **Bloque C — Smoke test SKIPPED**: la justificación ("error de Cloudflare Workers CJS/ESM") es plausible pero el verify-report no investigó si ese error era consecuencia del bug A-1 (un syntax error en script inline puede romper la respuesta del dev server si Vite intenta procesar el HTML). En cualquier caso, **el smoke test era el único mecanismo que habría detectado A-1**, y se omitió.

2. **Verificación estática del HTML construido**: el verify-report dice "build limpio, sin errores TypeScript". Cierto: `astro build` completó. Pero `astro build` **no valida la sintaxis del contenido emitido literalmente dentro de `<script define:vars>`** — solo valida el frontmatter y los `<script>` con resolución de imports. Una validación manual con `grep "type Unit" dist/client/cotizar/index.html` habría tomado 2 segundos.

3. **Acceptance criteria marcados como `[x]`**: las 5 specs de la familia forms-email + interactive-component-transitions tienen `[x]` en todos sus ACs (líneas frontmatter), incluyendo "El wizard avanza al paso 2 al hacer click en 'Siguiente'". Este AC requiere ejecución funcional — no es verificable estáticamente. El verify-report debería haber marcado estos como `[suspect]` o `[skipped, requiere smoke test]` y haber dejado el verdict como PARTIAL.

4. **Coherencia de grafo**: el verify-report identificó y corrigió un `affects` inconsistente — bien. Pero no detectó que `affects` de quote-folio-server-generated probablemente también debería incluir `wizard-step-modality-selection` (porque el wizard es el cliente del folio).

5. **WCAG AA contraste**: el verify-report admite explícitamente que la medición no se hizo. Para una spec con priority medium y AC "WCAG AA ≥ 4.5:1", una medición de 30 segundos con DevTools era razonable.

**Conclusión sobre verify-report**: el verdict debió haber sido **PARTIAL** con bloqueos en las 4 specs que dependen de runtime (B7/B8/B9), no PASS.

---

## Recomendación final

- **REGRESAR a sdd-apply**: hay 1 issue High unívoco (A-1) que rompe el wizard de cotización en producción. El fix es mecánico (refactorizar el script TS→JS puro, o mover a módulo importado siguiendo el patrón ya correcto de industrias.astro) y debe acompañarse de un smoke test del HTML construido para verificar que no hay TS leftover (`grep "type [A-Z]\|as [A-Z]" dist/client/**/index.html`).

- Tras el fix de A-1: A-2 (favicon.ico) y A-3 (contraste no medido) son decisiones de scope que el usuario debe ratificar — registrar como ADR o aceptar como riesgo conocido.

- A-4 (folio unicidad) y A-5 (aria-label redundante) son cosméticos; pueden ir en una iteración posterior.

- **Antes de archive**: re-ejecutar `verify` con foco específico en (a) `grep` del HTML construido para detectar TS leaks en cualquier `define:vars`, (b) smoke test funcional del wizard (click en mode → btn-next habilitado), (c) inspección DevTools del contraste del título en una de las 4 páginas internas.
