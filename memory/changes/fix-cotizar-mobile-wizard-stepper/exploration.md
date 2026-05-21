---
type: exploration
change_name: "fix-cotizar-mobile-wizard-stepper"
created: "2026-05-20"
---

# Exploration — fix-cotizar-mobile-wizard-stepper

## Resumen ejecutivo

El build compila correctamente y el JS del wizard se carga vía `astro:page-load`. Sin embargo, el **Bug 1 (stepper descuadrado)** persiste porque el media query `@media (max-width: 480px)` no cubre los viewports reales de iPhone 14/15 (393–430 px CSS) — el breakpoint es demasiado estrecho. El **Bug 2 (modalidad no seleccionable)** tiene una causa más sutil: los tiles son `<button>` planos con listeners `click` directos correctamente adjuntados, pero en iOS Safari los elementos que no son `<a>` o `<button>` nativos suelen requerir `cursor: pointer` para disparar `click`; el CSS de `.mode-tile` **sí** incluye `cursor: pointer` en base, pero la ausencia de feedback táctil inmediato puede indicar que en iOS el evento `click` necesita el flag `touchstart` para activarse en ciertos contextos. Adicionalmente, el orden de carga de los dos `<script>` puede crear una carrera: `wizard.ts` registra `astro:page-load` y en ese momento `window.__stepperTransition` aún no existe si el segundo bundle no ha ejecutado.

---

## Estado del build post-PR#19

- npm install: OK (advierte vulnerabilidades menores, no bloqueantes)
- npm run build: OK — `[build] Complete!` en 7.22 s
- `dist/client/cotizar/index.html`: presente
- `dist/client/_astro/`: 2 bundles específicos de cotizar identificados:
  - `cotizar.astro_astro_type_script_index_0_lang.BlplJ78C.js` — **wizard.ts** (lógica del wizard)
  - `cotizar.astro_astro_type_script_index_1_lang.C5yUAz5t.js` — **gsap-stepper.ts** (expone `window.__stepper*`)
- CSS: `cotizar.BC707qwK.css`

[fuente: código dist/client/_astro/]

---

## Inspección del HTML producido (dist/client/cotizar/index.html)

**Scripts cargados** (al final del body y tras el `</html>`):
```html
<script type="module" src="/_astro/BaseLayout.astro_astro_type_script_index_0_lang.DNF94SL-.js"></script>
<!-- Después del </html>: -->
<script type="module" src="/_astro/cotizar.astro_astro_type_script_index_0_lang.BlplJ78C.js"></script>
<script type="module" src="/_astro/cotizar.astro_astro_type_script_index_1_lang.C5yUAz5t.js"></script>
```

**Hallazgo crítico de orden**: Los dos scripts de cotizar (`wizard` y `gsap-stepper`) se emiten **fuera del `</html>`**, lo que es HTML inválido pero que los navegadores toleran. El problema real: ambos son `type="module"`, y los módulos se ejecutan en orden de parseo con `defer` implícito. Sin embargo, no hay garantía de cuál termina de ejecutar primero ya que son independientes. El `wizard.ts` (índice 0) registra el handler de `astro:page-load` que llama a `window.__stepperTransition`, pero ese global lo expone el script de índice 1 (`gsap-stepper`). Si la página dispara `astro:page-load` antes de que el segundo módulo ejecute, `window.__stepperTransition` será `undefined` en el primer uso (hay un fallback sin GSAP en wizard.ts que funciona, pero esto podría causar comportamiento inconsistente).

**data-* attributes** del `#stepper`: todos presentes y bien poblados.
```
data-str-empty="Por definir"
data-str-submit="Enviar solicitud"
data-str-next="Continuar"
data-str-folio-prefix="Folio"
data-str-desc-personal="Gracias {name}. Tu ejecutivo dedicado..."
data-str-unit-fcl20="20' FCL"
data-str-unit-fcl40="40' FCL"
```
[fuente: código dist/client/cotizar/index.html]

**Estructura `.stepper__track`**: 4 `.stepper__step` con `.stepper__bullet` y `.stepper__meta > .stepper__label + .stepper__name`. Layout correcto.

**Estructura `.mode-tile`**: son `<button type="button" data-mode="..." data-mode-name="...">` con tres hijos internos (icon, texto, check). **No son `<input type="radio">` — son botones puros**. No hay `<input>`, no hay `<label>`, no hay `for`/`id`. La selección es manejada 100% por JS.

[fuente: código dist/client/cotizar/index.html]

---

## Inspección del bundle JS del wizard

Bundle: `cotizar.astro_astro_type_script_index_0_lang.BlplJ78C.js`

Registro de `astro:page-load`:
```js
document.addEventListener("astro:page-load", () => {
  const d = window.__stepperReset;
  d && d();
  ...
  p(".mode-tile").forEach(t => {
    t.addEventListener("click", () => { ... }, o)
  })
  ...
  c(); r();
});
```

**Hallazgos relevantes**:
1. El event listener de `.mode-tile` se registra via `querySelectorAll('.mode-tile')` dentro del handler de `astro:page-load`. Esto es correcto — se re-registra en cada carga de página.
2. Usa `AbortController` con señal ligada a `astro:before-swap` para limpiar los listeners. Correcto.
3. El objeto `o = { signal: N.signal }` es el tercer argumento de `addEventListener`. En iOS Safari 15.4+ esto funciona bien, pero versiones anteriores (iOS < 15.4) no soportan `AbortSignal` en `addEventListener`. Si el usuario está en iOS < 15.4, los listeners no se registran en absoluto (el tercer argumento es inválido → error silencioso o ignora).
4. El fallback cuando `window.__stepperTransition` no existe: hace swap directo sin animación. Funciona correctamente.

Bundle: `cotizar.astro_astro_type_script_index_1_lang.C5yUAz5t.js`

```js
window.__stepperTransition = s;
window.__stepperIsAnimating = p;
window.__stepperReset = l;
```
Este bundle expone los globals en el ámbito del módulo. **No tiene `astro:page-load`** — se ejecuta al cargarse el módulo y registra los globals de inmediato.

[fuente: código dist/client/_astro/cotizar.astro_astro_type_script_index_*.js]

---

## Inspección del CSS del stepper/wizard

**Regla base del stepper__track** (aplica siempre):
```css
.stepper__track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
```

**Regla en @media (max-width: 720px)**:
```css
.stepper__name { display: none; }
```
Oculta solo el nombre del paso. Los items `.stepper__step` siguen con `padding: 1.25rem 1rem` y `gap: 0.85rem`.

**Regla en @media (max-width: 480px)**:
```css
.stepper__track {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-1, 0.25rem);
}
.stepper__bullet { width: 28px; height: 28px; font-size: 0.875rem; }
.stepper__name { display: none; }
.quote-card { padding: var(--space-3, 1rem); }
.mode-tile, #btn-next, #btn-back { min-height: 44px; min-width: 44px; }
.quote-layout { overflow-x: hidden; }
```

**Análisis crítico del Bug 1**:

El `.stepper__step` en `@media (max-width: 480px)` tiene:
- `padding: 1.25rem 1rem` (sin override en el media query) → padding horizontal de `1rem` = 16px por lado
- `gap: 0.85rem` entre bullet y meta (sin override) → ~13.6px
- `.stepper__bullet`: 28px de ancho
- `.stepper__label` (texto "PASO 01"): `font-size: 0.65rem`, `letter-spacing: 0.08em`, `text-transform: uppercase`

El paso más ancho tendrá: `16px padding + 28px bullet + 13.6px gap + ancho_label + 16px padding`.
El texto "PASO 01" en 0.65rem (~10.4px) con letter-spacing podría tener ~55-65px.
Total estimado por step: ~129-139px. Con 4 steps en un viewport de 393px → mínimo ~516px requeridos → **overflow garantizado** incluso con minmax(0,1fr).

**Raíz del problema**: El `@media (max-width: 480px)` no elimina el `padding` ni el `gap` del `.stepper__step`, y no elimina `.stepper__label`. Con 4 items en 393px de viewport, el contenido mínimo de cada step (bullet 28px + label "PASO 01" ~65px + padding 32px + gap ~14px) = ~139px × 4 = ~556px → desbordamiento horizontal garantizado. El PR#19 solo cambió `grid-template-columns` a `minmax(0,1fr)` y redujo el bullet, pero NO atacó el padding interno ni el label de texto.

**La verificación estática no detectó esto** porque un grep de CSS nunca ejecuta el box model.

[fuente: código src/styles/pages/cotizar.css líneas 389-410; código dist/client/_astro/cotizar.BC707qwK.css]

**`.container` padding-inline**:
```css
.container {
  padding-inline: clamp(1.25rem, 5vw, 2.5rem);
}
```
En un viewport de 393px: `5vw = 19.65px` → padding de `~19.65px` por lado. El stepper tiene `.container` como wrapper. Espacio disponible para `.stepper__track`: `393 - 2*19.65 = ~353px`. Con 4 items → máximo 88px por item. El contenido mínimo de cada step sigue siendo ~139px → overflow persistente.

[fuente: código src/styles/global.css líneas 313-318]

---

## Bugs y causa raíz (hipótesis)

### Bug 1: Stepper descuadrado en mobile

- **Causa raíz (hipótesis principal)**: El media query `@media (max-width: 480px)` **no cubre los viewports reales de iPhone 14/15 (393–430px CSS)**. El punto de quiebre debería ser al menos `640px` o `600px` para capturar todos los iPhones modernos. Además, aunque se aplicara, las reglas dentro del media query son insuficientes: no eliminan el `padding: 1.25rem 1rem` del `.stepper__step` (32px horizontales por step), ni eliminan `.stepper__label` ("PASO 01", ~65px), resultando en ~139px mínimos por step × 4 = ~556px necesarios vs ~353px disponibles. [fuente: código src/styles/pages/cotizar.css:390-410]
- **Hipótesis alternativas**:
  - H5: `position: sticky` del `.stepper` (`top: 60px`) no causa el desbordamiento pero podría empeorar la experiencia visual en Safari cuando hay bounce scrolling. [fuente: código src/styles/pages/cotizar.css:52-56]
  - El `overflow-x: hidden` en `.quote-layout` (sección debajo del stepper) NO ayuda al stepper porque está en un contenedor padre diferente. El stepper está FUERA de `.quote-layout`.
- **Archivos afectados**:
  - `src/styles/pages/cotizar.css` (breakpoint erróneo, padding/label sin fix en mobile)

### Bug 2: Modalidad NO seleccionable

- **Causa raíz (hipótesis principal)**: En iOS Safari < 15.4, `addEventListener` con `{ signal: AbortSignal }` como tercer argumento puede causar fallo silencioso en el registro del listener. Si la versión del Safari del usuario es anterior a 15.4 (iOS < 15.4), **ningún listener del wizard se registra** — ni el de `.mode-tile`, ni el de `#btn-next`, ni ninguno. [fuente: código dist/client/_astro/cotizar.astro_astro_type_script_index_0_lang.BlplJ78C.js]
- **Hipótesis alternativas**:
  - H3: El evento `click` en elementos `<button>` en iOS Safari debería funcionar sin `cursor: pointer` adicional. Los tiles sí tienen `cursor: pointer`. Sin embargo, en iOS Safari los elementos interactivos dentro de un grid con `overflow` o `position: sticky` ancestral a veces necesitan `-webkit-tap-highlight-color: transparent` para responder al toque. No está definido en el CSS actual.
  - H2: `astro:page-load` no se disparará si View Transitions no están activas en esa navegación. Verificar si la página carga directo (sin View Transitions) — en ese caso, Astro sí dispara `astro:page-load` incluso en navegación directa. No parece ser el problema principal.
  - H6: Los `data-mode` y `data-mode-name` se parsean con `btn.dataset.mode` en el bundle. Esto funciona correctamente — confirmado en el HTML producido con los atributos correctos.
- **Archivos afectados**:
  - `src/scripts/wizard.ts` — uso de `AbortSignal` en listeners
  - `src/styles/pages/cotizar.css` — falta `-webkit-tap-highlight-color`

---

## Análisis de hipótesis del intent

| ID | Hipótesis | Estado | Evidencia |
|----|-----------|--------|-----------|
| H1 | wizard.ts carga en prod | **Confirmada** | Bundle `BlplJ78C.js` presente y referenciado en HTML. `astro:page-load` registrado. [fuente: código dist/client/cotizar/index.html] |
| H2 | astro:page-load iOS Safari con View Transitions | **Suspect** | El evento se registra con `document.addEventListener`. En iOS Safari con View Transitions, Astro dispara `astro:page-load` en cada transición. Pero si el usuario navega directamente a `/cotizar` sin VT, también se dispara. No es la causa principal. [fuente: código src/scripts/wizard.ts:61] |
| H3 | Click handler en input vs label | **Descartada** | No hay `<input type="radio">`. Los tiles son `<button>`. Los listeners `click` se adjuntan directamente al button con `querySelectorAll('.mode-tile')`. Sin embargo, el uso de `{ signal: AbortSignal }` como tercer arg puede fallar en iOS < 15.4. [fuente: código dist/client/cotizar/index.html; dist/client/_astro/BlplJ78C.js] |
| H4 | Media query ≤480px viewport iPhone | **Confirmada como causa principal del Bug 1** | iPhone 14 Pro: 393px CSS, iPhone 15 Plus: 430px CSS — ambos superan el breakpoint de 480px y por tanto el media query **SÍ aplica** en iPhones modernos. Pero las reglas dentro son insuficientes: no eliminan padding interno ni label de texto del `.stepper__step`. Con 353px disponibles y ~139px mínimos por step, hay overflow. [fuente: código src/styles/pages/cotizar.css:390-410; global.css:313-318] |
| H5 | flex-wrap/overflow Safari | **Parcialmente relevante** | `.stepper__track` usa `display: grid` (no flex). Sin embargo, el `overflow-x: hidden` en `.quote-layout` no cubre el `.stepper` (que está fuera del layout en el DOM). Hay riesgo de comportamiento diferente en Safari con `position: sticky` y bounce scrolling, pero no es causa del desbordamiento. [fuente: código src/styles/pages/cotizar.css:52-56, 389-410] |
| H6 | data-* parsing falla iOS | **Descartada** | Los `data-*` en el `#stepper` están correctamente poblados en el HTML compilado. El bundle los lee con `el?.dataset.strEmpty` (camelCase correcto). No hay indicios de fallo. [fuente: código dist/client/cotizar/index.html] |

**Hipótesis adicional identificada (no estaba en el intent)**:
- **H7**: `addEventListener` con `{ signal: AbortSignal }` no soportado en iOS < 15.4 (Safari < 15.4 / iOS 15.3 y anteriores). El wizard.ts usa esta API para TODOS los listeners. Si el usuario tiene iOS < 15.4, ningún listener se registra. [fuente: código src/scripts/wizard.ts:110-111, 224-233]

---

## Approaches posibles (sin recomendar aún)

### A1 — Ampliar breakpoint del stepper a ≥600px y rehacer el layout mobile

- **Acción**: En `@media (max-width: 600px)` (o incluso `max-width: 640px`), rediseñar el `.stepper__track` para modo compacto:
  - Eliminar `.stepper__label` ("PASO 01") con `display: none`
  - Reducir `padding` del `.stepper__step` a `0.5rem`
  - Reducir `gap` a `0.25rem`
  - Mantener solo el bullet con el número
- **Pros**: Ataca la causa raíz del Bug 1. Cubre iPhones SE (375px), iPhone 14/15 (393–430px). Simple, solo CSS.
- **Contras**: El label "PASO XX" tiene valor para el usuario — eliminarlo reduce context. Podría confundirse con eliminar accesibilidad.
- **Esfuerzo**: Bajo (solo CSS).

### A2 — Polyfill / fallback del AbortSignal para listeners en iOS < 15.4

- **Acción**: En `wizard.ts`, usar `try/catch` al registrar listeners con `{signal}`, o detectar soporte:
  ```ts
  const supportsSignal = 'AbortController' in window && (() => {
    try {
      const ac = new AbortController();
      document.addEventListener('test', () => {}, { signal: ac.signal });
      ac.abort();
      return true;
    } catch { return false; }
  })();
  ```
  Si no soporta, registrar los listeners sin `signal` y limpiar manualmente en `astro:before-swap`.
- **Pros**: Elimina la posible causa del Bug 2 en iOS < 15.4.
- **Contras**: Más complejo. iOS < 15.4 tiene market share muy bajo (< 5%). Podría no ser la causa real si el usuario está en iOS 16+.
- **Esfuerzo**: Medio.

### A3 — Agregar `-webkit-tap-highlight-color` y `touch-action: manipulation` a mode-tile

- **Acción**: En `.mode-tile`, agregar:
  ```css
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  ```
  `touch-action: manipulation` en iOS Safari deshabilita el doble-tap-to-zoom y asegura que `click` se dispare sin el delay de 300ms.
- **Pros**: Elimina el delay de 300ms de click en iOS (causa común de "no responde al tap"). Puede ser la causa principal del Bug 2.
- **Contras**: Solo afecta la respuesta de tap, no el registro del listener.
- **Esfuerzo**: Muy bajo (2 líneas CSS).

### A4 — Rediseño completo del stepper mobile (modo numerado compacto)

- **Acción**: En breakpoints ≤600px, cambiar el layout del stepper a una barra con solo los números (bullets), conectados por una línea, sin texto. Estado activo marcado con color.
- **Pros**: Solución robusta y visualmente limpia para cualquier width. Elimina el overflow de raíz.
- **Contras**: Mayor esfuerzo de diseño y CSS. Cambio visual más significativo.
- **Esfuerzo**: Alto.

### A5 — Combinación A1 + A3 (recomendada para investigar)

- **Acción**: A1 (arreglo CSS del stepper con breakpoint correcto y eliminación de label + padding) + A3 (`touch-action: manipulation` en mode-tile).
- **Pros**: Ataca ambos bugs con cambios mínimos (solo CSS + CSS). Sin cambios en JS. Sin riesgos de regresión de lógica.
- **Contras**: No resuelve el Bug 2 si la causa real es el `AbortSignal` en iOS < 15.4 (raro) o si es algún problema de z-index o `pointer-events` que no se ve en el HTML estático.
- **Esfuerzo**: Bajo.

---

## Recomendación preliminar

**A5 (A1 + A3)** como primera iteración: ampliar breakpoint a `max-width: 600px` eliminando `.stepper__label` y reduciendo padding en el `.stepper__step`, más agregar `touch-action: manipulation` a `.mode-tile`. Si el Bug 2 persiste, aplicar A2 (fallback AbortSignal). La combinación cubre los dos patrones de fallo más probables con el menor riesgo de regresión, y son cambios verificables en un browser real (BrowserStack o Simulator).

**Prioridad de verificación real** (critical path que faltó en PR#19): usar BrowserStack o Xcode Simulator con iOS 16+ Safari para confirmar ambos fixes antes de merge. El verify estático (build + grep) no puede detectar bugs de layout ni de eventos táctiles.

---

## Coverage de tests del área

No hay tests automatizados en el proyecto. La verificación es 100% manual. El PR#19 lo confirmó: el verify pasó con build estático y no hubo smoke test en browser real.

**Riesgo sistémico**: sin tests de integración o e2e (Playwright/Cypress), cualquier regresión en el wizard será invisible hasta que llegue a producción o haya reporte manual.

---

## Riesgos detectados

1. **Viewport gap crítico**: El breakpoint `480px` del PR#19 era correcto para iPhone SE (375px) pero dejó sin cubrir iPhone 14/15 (393–430px), que son los modelos más comunes en 2025-2026.
2. **AbortSignal en iOS < 15.4**: Si algún usuario tiene iOS 14 o 15.0-15.3, ningún listener del wizard funciona. Aunque el market share es bajo, es un fallo total silencioso.
3. **Orden de scripts**: Los dos bundles se emiten fuera del `</html>`. Son módulos `defer`-idos implícitamente, pero el orden de ejecución no está 100% garantizado en condiciones de red variable. El fallback en wizard.ts (sin GSAP) mitiga esto.
4. **`position: sticky` + `overflow` en Safari**: El `.stepper` tiene `position: sticky; top: 60px`. En Safari iOS con bounce scrolling, elementos sticky pueden comportarse de forma inesperada. No es causa directa del bug pero puede amplificarlo visualmente.
5. **Falta de `touch-action: manipulation`**: El delay de 300ms de iOS para distinguir tap de double-tap puede hacer que los tiles parezcan no responder. Es un problema de UX móvil clásico no resuelto en PR#19.
6. **Verify estático insuficiente**: El proceso de verify del proyecto solo hace build + curl + grep. Es structuralmente incapaz de detectar bugs de layout responsive o de eventos táctiles. Riesgo de recurrencia.
