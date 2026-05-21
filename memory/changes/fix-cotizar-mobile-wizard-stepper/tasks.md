---
type: tasks
change_name: "fix-cotizar-mobile-wizard-stepper"
created: "2026-05-20"
total_tasks: 8
spec_refs:
  - "forms-email/wizard-responsive-mobile-v2"
  - "forms-email/wizard-modality-tap-ios"
---

# Tasks — fix-cotizar-mobile-wizard-stepper

## Preflight

### T0.1 — Setup y baseline build
- **Archivo**: N/A
- **Acción**: Desde el directorio `log-atm-web-astro`, ejecutar:
  ```
  npm install
  npm run build
  ```
- **Criterio**: `node_modules` presente; build termina con `[build] Complete!` sin errores. Si hay errores, registrarlos como bloqueante antes de continuar.
- **Bloquea**: todas las tasks siguientes.

---

## Spec: forms-email/wizard-responsive-mobile-v2 (stepper) — design D-1

### T1.1 — Reemplazar bloque @media (max-width: 480px) por el bloque 640px completo
- **Archivo**: `log-atm-web-astro/src/styles/pages/cotizar.css` (líneas 389-410)
- **Acción**: Reemplazar el bloque `@media (max-width: 480px) { ... }` **completo** (el bloque heredado del PR#19) por el siguiente bloque:
  ```css
  /* ── Breakpoint mobile — wizard (cubre todos los iPhones modernos en portrait) ── */
  @media (max-width: 640px) {
    .stepper__track {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--space-1, 0.25rem);
      overflow-x: clip; /* guard rail: bloquea desbordamiento residual del stepper */
    }
    /* Modo compacto: solo bullets numerados, sin etiquetas de texto */
    .stepper__step {
      padding: 0.5rem 0.25rem;
      gap: 0.25rem;
      justify-content: center;
    }
    .stepper__label { display: none; }
    .stepper__name  { display: none; }
    .stepper__bullet {
      width: 28px;
      height: 28px;
      font-size: 0.875rem;
    }
    .quote-card { padding: var(--space-3, 1rem); }

    /* Touch targets mínimos 44px (WCAG 2.2 AA) */
    .mode-tile { min-height: 44px; min-width: 44px; }
    #btn-next  { min-height: 44px; min-width: 44px; }
    #btn-back  { min-height: 44px; min-width: 44px; }

    /* Evitar scroll horizontal en el layout del wizard */
    .quote-layout { overflow-x: hidden; }
  }
  ```
  El bloque nuevo es un reemplazo total, NO una adición al bloque existente.
- **Criterio**:
  - El selector `@media (max-width: 480px)` **ya no existe** en el archivo.
  - El selector `@media (max-width: 640px)` está presente con todas las reglas del snippet.
  - `.stepper__label { display: none; }` está dentro del media query.
  - `.stepper__step` tiene `padding: 0.5rem 0.25rem`, `gap: 0.25rem`, `justify-content: center`.
  - `.stepper__track` tiene `overflow-x: clip` dentro del media query.
- **Depende de**: T0.1

---

## Spec: forms-email/wizard-modality-tap-ios (modalidad) — design D-2 (B2.1 + B2.2)

### T2.1 — Añadir touch-action a .stepper__step en la regla base
- **Archivo**: `log-atm-web-astro/src/styles/pages/cotizar.css` (líneas 62-70, regla base `.stepper__step`)
- **Acción**: En la regla base `.stepper__step { ... }` (fuera de cualquier media query), añadir las dos propiedades nuevas al final del bloque de declaraciones:
  ```css
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  ```
  La regla resultante debe verse similar a:
  ```css
  .stepper__step {
    padding: 1.25rem 1rem;
    display: flex; align-items: center; gap: 0.85rem;
    border-right: 1px solid var(--color-border);
    background: var(--color-surface);
    cursor: pointer;
    transition: background 0.18s;
    position: relative;
    touch-action: manipulation;               /* nuevo */
    -webkit-tap-highlight-color: transparent; /* nuevo */
  }
  ```
- **Criterio**: Ambas propiedades presentes en `.stepper__step` base (fuera de media query). El `grep 'touch-action' cotizar.css` devuelve al menos esta regla.
- **Depende de**: T0.1

### T2.2 — Añadir touch-action a .mode-tile en la regla base
- **Archivo**: `log-atm-web-astro/src/styles/pages/cotizar.css` (líneas 150-161, regla base `.mode-tile`)
- **Acción**: En la regla base `.mode-tile { ... }` (fuera de cualquier media query), añadir al final del bloque:
  ```css
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  ```
- **Criterio**: Ambas propiedades presentes en `.mode-tile` base. `grep 'touch-action' cotizar.css` las reporta también para `.mode-tile`.
- **Depende de**: T0.1

### T2.3 — Añadir regla nueva #btn-next, #btn-back con touch-action
- **Archivo**: `log-atm-web-astro/src/styles/pages/cotizar.css` (insertar como regla nueva en la sección base, antes del primer media query)
- **Acción**: Insertar el siguiente bloque nuevo en la sección de reglas base del archivo (no dentro de ningún media query). Un buen lugar es inmediatamente después de la regla `.mode-tile` o después de los botones `#btn-next`/`#btn-back` si ya tienen selector base. Si no existe selector por ID, añadirlo como bloque nuevo:
  ```css
  /* Respuesta táctil inmediata en iOS Safari (sin delay 300ms ni highlight nativo) */
  #btn-next,
  #btn-back {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  ```
- **Criterio**: Selector `#btn-next, #btn-back` (o `#btn-next` + `#btn-back` por separado) con ambas propiedades `touch-action: manipulation` y `-webkit-tap-highlight-color: transparent` presentes en la sección base del CSS.
- **Depende de**: T0.1

### T2.4 — Refactor AbortSignal → cleanup manual en wizard.ts
- **Archivo**: `log-atm-web-astro/src/scripts/wizard.ts`
- **Acción**: Aplicar el siguiente refactor en tres partes:

  **Parte A** — Reemplazar las líneas 108-111 (AbortController + sig) por el helper de cleanup:
  ```ts
  // Cleanup manual de listeners — compatible con iOS Safari < 15.4
  // (AbortSignal en addEventListener no soportado en esas versiones).
  type Cleanup = () => void;
  const cleanups: Cleanup[] = [];

  /** Registra un listener y memoriza su removeEventListener para before-swap. */
  function on<E extends Event>(
    target: EventTarget | null | undefined,
    type: string,
    handler: (ev: E) => void,
  ): void {
    if (!target) return;
    const h = handler as EventListener;
    target.addEventListener(type, h);
    cleanups.push(() => target.removeEventListener(type, h));
  }

  document.addEventListener(
    'astro:before-swap',
    () => { cleanups.forEach((fn) => fn()); cleanups.length = 0; },
    { once: true },
  );
  ```
  Eliminar: `const controller = new AbortController();`, `document.addEventListener('astro:before-swap', () => controller.abort(), { once: true });`, y `const sig = { signal: controller.signal };`.

  **Parte B** — Sustituir todos los `addEventListener` con tercer argumento `sig`. Los ~22 call sites identificados son aproximadamente en líneas: 225, 233, 237-239, 243, 251, 255, 262, 268, 288, 291-293, 296-300, 303, 308, 371, 379, 383, 388.

  Para cada ocurrencia del patrón:
  ```ts
  someElement.addEventListener('eventtype', handler, sig)
  someElement?.addEventListener('eventtype', handler, sig)
  ```
  Reemplazar por:
  ```ts
  on(someElement, 'eventtype', handler)
  ```
  (El guard `if (!target) return` de `on()` absorbe los casos con `?.` — no se necesita el operador opcional al llamar `on()`.)

  **Parte C** — Verificar que no queda ninguna referencia a `controller`, `AbortController`, ni `sig` en el archivo.

- **Criterio**:
  - `grep 'AbortController' wizard.ts` → 0 resultados.
  - `grep '{ signal:' wizard.ts` → 0 resultados.
  - `grep 'const sig' wizard.ts` → 0 resultados.
  - Función `on(` definida en el archivo.
  - Array `cleanups` definido.
  - `astro:before-swap` listener con `cleanups.forEach` presente.
  - TypeScript compila sin errores (`npm run typecheck`).
- **Depende de**: T0.1

---

## Verificación

### T3.1 — Build + typecheck post-implementación
- **Archivo**: N/A
- **Acción**:
  ```
  npm run typecheck
  npm run build
  ```
  Si `typecheck` no existe en `package.json`, usar `npx tsc --noEmit` o `npx astro check`.
- **Criterio**: 0 errores de TypeScript; `[build] Complete!` sin errores.
- **Depende de**: T1.1, T2.1, T2.2, T2.3, T2.4

### T3.2 — Inspección del bundle CSS y JS producido
- **Archivo**: `dist/client/_astro/` (buscar archivos `cotizar.*.css` y el bundle JS de `wizard.ts`)
- **Acción**:
  ```bash
  # Confirmar nuevo breakpoint presente
  grep -r "max-width: 640px" dist/

  # Confirmar stepper__label oculto dentro del media query
  grep -r "stepper__label" dist/

  # Confirmar que no queda el breakpoint anterior del stepper
  grep -r "max-width: 480px" dist/

  # Confirmar touch-action en el bundle CSS
  grep -r "touch-action" dist/

  # Confirmar que wizard.ts no tiene AbortController/signal en el bundle JS
  grep -r "AbortController\|{ signal:" dist/client/_astro/
  ```
- **Criterio**:
  - `max-width: 640px` presente en el CSS del bundle.
  - `stepper__label` con `display:none` dentro del bloque 640px.
  - `max-width: 480px` ausente (o si aparece, debe ser de un contexto distinto al stepper — verificar manualmente).
  - `touch-action:manipulation` presente al menos 3 veces (`.stepper__step`, `.mode-tile`, `#btn-next/#btn-back`).
  - `AbortController` o `{ signal:` ausentes en el bundle JS de wizard.
- **Depende de**: T3.1

### T3.3 — Smoke preview
- **Archivo**: N/A
- **Acción**:
  ```
  npm run preview
  # En otra terminal:
  curl -o /dev/null -s -w "%{http_code}" http://localhost:4321/cotizar
  ```
  Si hay un chromium/browser headless disponible en el sistema, lanzar adicionalmente:
  ```
  # Emular iPhone 14 (393x852px) — solo si chromium disponible
  chromium --headless --window-size=393,852 http://localhost:4321/cotizar
  ```
  Si no hay browser headless disponible, documentar explícitamente como "pendiente — validación iPhone real requerida".
- **Criterio**:
  - `curl` devuelve `200`.
  - Si se ejecutó headless: sin errores JS en la consola. Documentar resultado.
  - Validación FINAL en iPhone real (iOS 16+) es **responsabilidad del usuario** antes de archive (D2). El pipeline puede entregar el PR; el archive no se cierra sin confirmación en dispositivo real.
- **Depende de**: T3.1

---

## Resumen

- **Total**: 8 tasks (T0.1 + T1.1 + T2.1 + T2.2 + T2.3 + T2.4 + T3.1 + T3.2 + T3.3).
- **Archivos modificados**: `cotizar.css` (3 cambios: bloque mobile reemplazado + touch-action en `.stepper__step` + touch-action en `.mode-tile` + regla nueva `#btn-next,#btn-back`); `wizard.ts` (refactor AbortSignal → cleanup manual, ~22 call sites).
- **Archivos NO modificados**: `cotizar.astro`, `gsap-stepper.ts`.
- **Validación FINAL en iPhone real** = responsabilidad del usuario (D2). El pipeline no puede confirmar runtime iOS Safari; el archive queda bloqueado hasta confirmación del usuario.

### Orden de ejecución recomendado

```
T0.1 → T1.1 → T2.1 → T2.2 → T2.3 → T2.4 → T3.1 → T3.2 → T3.3
```

Las tasks T1.1, T2.1, T2.2, T2.3 (todas sobre `cotizar.css`) pueden aplicarse en cualquier orden entre sí; T2.4 (sobre `wizard.ts`) es independiente de las CSS y puede hacerse en paralelo. T3.x bloquean a T1.x y T2.x completadas.
