---
type: judgment
judge: B
focus: code-quality-regressions-iter2
change_name: "fix-ux-multipage-bugs"
created: "2026-05-19"
iteration: 2
verdict: PASS
---

# Juicio B — iter 2 — Code quality post-refactor

## Veredicto: PASS

El refactor `<script define:vars>` → módulo TS standalone (`src/scripts/wizard.ts`) está bien hecho: el bundle producido es JS limpio (verificado en `dist/client/_astro/cotizar.astro_astro_type_script_index_0_lang.BlplJ78C.js`), los listeners se registran via AbortController + `astro:page-load` / `astro:before-swap`, la state es encapsulada en una closure del callback (sin leaks a globals), los strings i18n viajan vía `data-*` attributes correctamente serializados por Astro (verificado para es/en/pt). Cleanup de `globals.d.ts`, hide-on-default de `WhatsAppIcon` y move de `sharp` a `devDependencies` son todos correctos. No detecté regresiones nuevas que bloqueen archive. Hallé 1 issue Low (fix incompleto en call site de WhatsAppIcon) y 2 nits que pueden ir como deuda técnica.

---

## Auditoría wizard.ts refactor

### Estructura del módulo (`src/scripts/wizard.ts`)

- **Tipos correctos**: `type Unit`, `interface ClientStrings` declarados al top-level. La factory `makeState()` retorna un objeto con tipos inferidos (incluye `unit: 'cbm' as Unit`, `cargo: [] as string[]`, `extras: [] as string[]`). Bien.
- **Side-effects al cargar**: el módulo solo registra UN listener `document.addEventListener('astro:page-load', …)` al top-level (línea 61). No ejecuta lógica al import — toda la lógica corre dentro del callback. Correcto.
- **Encapsulación de estado**: `state` se crea con `makeState()` dentro del callback (línea 67). Es LOCAL a la closure del `astro:page-load` handler, no hay variables globales del wizard. Aislamiento correcto.
- **Re-init idempotente**: cada `astro:page-load` crea un nuevo controller, un nuevo state, re-resuelve refs del DOM. Si `astro:page-load` se dispara N veces, se acumula 1 listener por navegación pero cada uno aborta el anterior via `astro:before-swap` (once:true). No hay leak.
- **Cleanup**: `AbortController` + `signal` en cada `addEventListener` (líneas 109-111, propagado a `sig` en cada uso). `astro:before-swap` con `{ once: true }` aborta el controller en la siguiente swap. Patrón estándar Astro VT.
- **Fetch del folio**: `submitQuote()` (línea 318) maneja correctamente errors:
  - Try/catch para `fetch`.
  - `await r.json().catch(() => ({}))` previene crashes si el body no es JSON.
  - Validación `r.ok && res.ok && res.folio` antes de mostrar success.
  - Errores 400 con `res.fields` se muestran al usuario; otros errores se muestran genéricos.
  - `finally` re-habilita el botón. Bien.
- **Acceso a globals del stepper**: `(window as Window & { __stepperReset?: … }).__stepperReset` — casteo inline en cada uso (3 sitios). Esto es el pago de NO declarar los globals en `globals.d.ts` (decisión documentada en el comment del .d.ts). Verbose pero auto-contenido — el módulo declara qué espera, sin depender de un global type ambient.
- **Type-loss menor**: `__stepperTransition?: (opts: unknown) => void` (línea 196) pierde el tipo `TransitionStepOpts`. Sugerencia opcional: `import type { TransitionStepOpts } from './gsap-stepper'`. No bloqueante.

### Side-effect global aceptable

El listener `astro:page-load` queda registrado a nivel `document` UNA vez (el módulo se evalúa una sola vez por ciclo de vida). En navegaciones a otras páginas el callback ejecuta brevemente: `readClientStrings()` retorna defaults, `document.querySelectorAll('.stepper__step')` retorna empty NodeList, los listeners no se registran (porque los selectores devuelven null). No hay errores, no hay leaks. Ineficiencia trivial.

**Sugerencia opcional** (no bloqueante): añadir early-return `if (!document.getElementById('stepper')) return;` al inicio del callback. Reduce trabajo en navegaciones que no son /cotizar.

### cotizar.astro post-refactor

- **Único `<script>` que importa wizard.ts**: línea 357-361. Correcto.
- **Segundo `<script>`** (línea 363-382) importa `gsap-stepper` y expone helpers en `window.__stepper*`. Este script SÍ tiene sintaxis TS (`(window as Window & {...})`) pero al usar `import`, Astro lo procesa como módulo (verificado en bundle `cotizar.astro_astro_type_script_index_1_lang.C5yUAz5t.js` — transpilado limpiamente). Bien.
- **Contenedor `#stepper`** con `data-*` (líneas 68-78): existe en el DOM ANTES de que el script wizard.ts se ejecute (es markup HTML estático del frontmatter). Astro/Vite emite el HTML en orden top-to-bottom y los `<script type="module">` se ejecutan al final. Orden correcto.
- **Serialización data-***: verificada en HTML emitido (`dist/client/cotizar/index.html`, `dist/client/en/cotizar/index.html`, `dist/client/pt/cotizar/index.html`). Astro escapa correctamente cualquier carácter especial (las comillas dobles dentro del valor se escapan). i18n parity confirmada (es/en/pt).
- **XSS-safe**: wizard.ts NO usa `innerHTML`/`set:html` (grep confirmado). El folio del servidor se asigna via `textContent`; `descPersonal` se aplica via `.replace()` + `textContent`. Safe.

### Compatibilidad View Transitions

- **`astro:page-load`** ✓ — no `DOMContentLoaded`.
- **Re-init idempotente** ✓ — el handler crea un nuevo state/controller cada vez. Listeners viejos se abortan via `astro:before-swap`.
- **Acceso a `window.__stepper*`** seguro: el script GSAP (que asigna las funciones) corre en el mismo `<script type="module">` que se ejecuta tras parsear el HTML; cuando `astro:page-load` se dispara, las funciones ya están en `window`.

### Pequeña nota sobre Astro VT y module cache

Los `<script type="module">` se cachean por URL hash. En la navegación `/cotizar → / → /cotizar`, el módulo wizard.ts NO se re-evalúa (sigue siendo el mismo URL hash). El listener `astro:page-load` registrado al top-level persiste en `document` y se dispara en cada navegación del sitio, incluso a páginas no-cotizar. Ya analizado arriba — no hay leaks.

---

## Auditoría globals.d.ts cleanup

- **`__stepperState` eliminado**: confirmado, no quedan referencias en `src/` (grep recursivo, 0 hits).
- **`__stepper*` reales NO declarados**: la decisión está documentada en el comentario del archivo (líneas 1-4). En lugar de declararlos globalmente, se acceden con casteo inline en wizard.ts (3 sitios) y en cotizar.astro (segundo `<script>`, 3 sitios para set). Pro: el module owner declara qué consume. Contra: duplicación del cast (3 sitios en wizard.ts repiten la misma intersection type).
- **Sugerencia opcional**: extraer el cast a una función helper en wizard.ts:
  ```ts
  function w(): Window & { __stepperReset?:() => void; __stepperIsAnimating?:() => boolean; __stepperTransition?: (o: TransitionStepOpts) => void } {
    return window as any;
  }
  ```
  No bloqueante.
- **`__indDirectoryOnRender`**: sigue declarado correctamente.
- **`tsc --noUnusedLocals`** no se puede ejecutar en este entorno (tsc no instalado), pero `astro check` es delegado a Astro check (no instalado tampoco en el worktree). Build pasó limpio según verify-report.

---

## Auditoría WhatsAppIcon aria-hidden

- **Componente**: `WhatsAppIcon.astro` ahora soporta dos modos:
  - Default (sin `ariaLabel`): `role={undefined}`, `aria-label={undefined}`, `aria-hidden="true"`. Decorativo, oculto del a11y tree. ✓ Correcto.
  - Con `ariaLabel`: `role="img"`, `aria-label="…"`, `aria-hidden={undefined}`. Modo "ícono solo, sin texto adyacente".
- **Comment JSDoc** en el prop: "Pasar ariaLabel solo si el icono está solo sin texto adyacente." — guía clara.

### ⚠ Fix INCOMPLETO en el call site

- **`contacto.astro:141`**: sigue invocando `<WhatsAppIcon width={22} height={22} ariaLabel="WhatsApp" />`. El span hermano dice "WhatsApp · respuesta inmediata" (`channel__name`). Resultado runtime: SVG con `role="img" aria-label="WhatsApp"` + texto "WhatsApp" → **doble anuncio en screen readers persiste** (idéntico a iter1).
- El componente AHORA tiene la flexibilidad para soportar ambos modos, pero la única instancia productiva sigue pasando el label. Para que la spec L-2 esté funcionalmente resuelta, contacto.astro debería usar `<WhatsAppIcon width={22} height={22} />` sin `ariaLabel`.
- **Severidad: Low** — coincide con L-2 original (no bloqueante para archive según judgment-report iter1).
- **Sugerencia**: cambiar el call site (1 línea) o aceptar como deuda menor.

---

## Auditoría sharp devDeps

- **`package.json`**: `sharp` confirmado en `devDependencies` (línea 41), no en `dependencies`. ✓
- **`package-lock.json`**: coherente — `root.dependencies.sharp` = `undefined`, `root.devDependencies.sharp` = `^0.34.5`, `node_modules/sharp` presente. ✓ (verificado con `node -e`).
- **Uso de `sharp`**: solo en `scripts/generate-favicons.mjs` y `scripts/png-to-svg.mjs` (build tools one-shot). NO se importa en `src/`.
- **Script `build`** en `package.json`: `"build": "astro build"`. No invoca el script de favicons. ✓
- **CI con `npm ci --omit=dev`**: build seguirá funcionando porque ni Astro ni la app importan sharp.
- **Nit residual**: `potrace` aún está en `dependencies` (también se usa solo en `scripts/png-to-svg.mjs`). El issue B-6 iter1 sugería mover ambos. Solo se movió sharp. Aceptable como inconsistencia menor — el riesgo de boating de prod bundle es trivial dado que Astro tree-shake no incluye módulos no importados desde `src/`.

---

## Nuevas regresiones (si las hay)

| ID | Severidad | Categoría | Descripción | Recomendación |
|----|-----------|-----------|-------------|----------------|
| (ninguna High/Medium) | — | — | — | — |
| N-1 | Low | A11y / Fix-incompleto | `WhatsAppIcon` ahora soporta modo decorativo, pero `contacto.astro:141` sigue pasando `ariaLabel="WhatsApp"`. La doble anunciación persiste idéntica a iter1. | Eliminar `ariaLabel` del call site (1 línea). O aceptar como deuda menor. |
| N-2 | Low | Quality / Nit | `potrace` no se movió a `devDependencies` por simetría con sharp. Ambos solo se usan en `scripts/*.mjs`. | Mover potrace a devDeps en una iteración posterior. Trivial. |
| N-3 | Nit | Quality / Type-loss | `wizard.ts:196` tipea `__stepperTransition` como `(opts: unknown) => void` — pierde tipos. | Importar `TransitionStepOpts` de gsap-stepper. Opcional. |

Ningún issue es bloqueante para archive.

---

## Estado de issues iter1 descartados

| ID | Estado iter2 |
|----|--------------|
| **M-4** (favicon ICO real) | Sin cambios. `file public/favicon.ico` → PNG 32×32. Aceptado como limitación documentada. |
| **M-5** (rate limiting API cotización) | Sin cambios. Pre-existente, out-of-scope. |
| **L-1** (folio unicidad probabilística) | Sin cambios. `crypto.randomUUID().split('-')[0]` = 8 hex, P(collision/ms) ≈ 2⁻³². Aceptado. |
| **L-3** (innerHTML en industries tags) | Sin cambios. `industrias.astro:207` sigue usando `innerHTML = tags.map(…)`. Aceptado (tags controlados por proyecto). |
| **L-5** (`isAnimating` módulo state en gsap-stepper) | Sin cambios. `gsap-stepper.ts:28` sigue siendo módulo state. Aceptado mientras sea singleton. |

Ninguno empeoró en iter2.

---

## Issues iter1 resueltos en iter2

| ID original | Veredicto iter2 |
|-------------|------------------|
| **H-1** (TS leak en `define:vars`) | ✅ Resuelto. `define:vars` eliminado; bundle del wizard limpio (sin TS syntax leak), confirmado por grep sobre `dist/client/_astro/cotizar.astro_astro_type_script_index_0_lang.BlplJ78C.js`. |
| **M-1** (`globals.d.ts` con `__stepperState` unused + globals reales sin declarar) | ✅ Resuelto. `__stepperState` eliminado; los reales (`__stepper*`) se acceden con casteo inline, decisión documentada en el comment del .d.ts. |
| **L-2** (WhatsAppIcon doble anuncio) | ⚠ Parcialmente resuelto. El componente AHORA soporta modo decorativo, pero el call site real (contacto.astro:141) sigue pasando `ariaLabel`. Doble anunciación persiste en runtime. Tratado como N-1 nuevo, no bloqueante. |
| **L-4** (sharp en deps) | ✅ Resuelto. Sharp en devDependencies. Potrace queda pendiente como N-2 (simétrico). |

---

## Smoke / build / leak checks

- **Build**: existe `dist/client/` con bundles limpios. Verify-report iter2 confirma `npm run build` PASS.
- **TS leak grep en HTML**: 0 hits para `type Unit|as HTMLSelectElement|as HTMLButtonElement|: HTMLElement|<T extends`.
- **TS leak grep en bundles JS**: ya cubierto por verify-report (todos OK).
- **i18n parity**: confirmada en 3 locales (es/en/pt).
- **package-lock coherente**: ✓.
- **gsap-stepper.ts y gsap-ind-directory.ts no requirieron cambios**: ✓ ya eran módulos TS standalone, no había TS leak en ellos.

---

## Cumplimiento de convenciones

- **Naming kebab-case** en scripts: ✓ `wizard.ts`.
- **`prefers-reduced-motion`**: ✓ se sigue consultando en gsap-stepper.ts.
- **Side-effect minimal del módulo**: ✓ solo registra UN listener al top-level.
- **TypeScript**: el módulo wizard.ts usa tipos correctos (Unit, ClientStrings, generics en `$`/`$$`). El casteo inline para window globals es feo pero auto-contenido.
- **i18n hardcoded en status messages**: persiste (`'Enviando tu solicitud…'`, etc.). Reportado en iter1 como inconsistencia menor — no escalado a bloqueante.

---

## Recomendación final

**PROCEDER a archive**.

El refactor wizard.ts está sólido y resuelve H-1 / M-1. Los fixes a WhatsAppIcon (componente) y sharp (devDeps) están bien hechos. Hay un fix-incompleto menor en el call site de WhatsAppIcon (N-1) que NO bloquea archive pero merece registrarse como deuda técnica para QA manual de a11y. Los demás issues iter1 descartados permanecen estables.

### Deudas técnicas para `observations.md` post-archive

1. `contacto.astro:141` — quitar `ariaLabel="WhatsApp"` para activar el modo decorativo del WhatsAppIcon (N-1).
2. Mover `potrace` a `devDependencies` por simetría con sharp (N-2).
3. Importar `TransitionStepOpts` en wizard.ts para tipar `__stepperTransition` (N-3).
4. i18n de los status messages en wizard.ts (ya en backlog desde iter1).
5. Rate limiting en `/api/cotizacion` (pre-existente, ya en backlog).
6. Considerar early-return `if (!document.getElementById('stepper')) return;` para evitar trabajo en navegaciones non-cotizar.
