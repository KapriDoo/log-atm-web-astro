---
type: tasks
change_name: "fix-a11y-and-icons"
created: "2026-10-02"
---

# Tasks — fix-a11y-and-icons

Fuente: sección "Tareas sugeridas" de `input.md` (brief 05, auditoría 2026-10). Rutas de código relativas al worktree: `log-atm-web-astro/...`.

## T1 — Pasar el selector de idioma de escritorio al patrón disclosure

**File**: log-atm-web-astro/src/components/ui/LanguageSelector.astro
**Líneas/ocurrencias**: comentario de cabecera (:4, "dropdown con `:focus-within`"); trigger (:49 `aria-haspopup="listbox"`); lista (:62 `role="listbox"` + `aria-labelledby`); ítems (:64 `role="option"` + `aria-selected`); script de apertura/cierre (:205-280)
**Acción**: Quitar `aria-haspopup="listbox"`, `role="listbox"`, `role="option"` y `aria-selected`. El trigger queda como botón con `aria-expanded` y `aria-controls` apuntando al `id` de la lista; la lista es un `<ul>` simple de links con `aria-current="page"` en el idioma activo (alinear también la variante móvil, hoy `aria-current="true"` en :34). Conservar `Escape` que cierra y devuelve el foco al botón (:274-279), el cierre por click fuera y el respeto de reduced-motion. Actualizar el comentario obsoleto sobre `:focus-within` para que describa el comportamiento real.
**Justificación**: un `listbox` sin navegación por flechas que envuelve enlaces incumple WCAG 4.1.2; la spec `i18n-ui-selector/i18n-ui-selector-navbar.md` no exige el rol listbox, así que el cambio no la contradice.

**Acceptance**:
- [ ] `grep -nE 'role="(listbox|option)"|aria-selected|aria-haspopup="listbox"' log-atm-web-astro/src/components/ui/LanguageSelector.astro` no devuelve resultados
- [ ] El idioma activo lleva `aria-current="page"` en desktop y en el drawer móvil
- [ ] Con teclado: Tab llega al botón, Enter/Espacio abre, Tab recorre los links, Enter navega, Escape cierra y devuelve el foco al botón
- [ ] `npm run build` termina sin errores

## T2 — Guard de reduced-motion en el scroll del wizard

**File**: log-atm-web-astro/src/scripts/wizard.ts
**Líneas/ocurrencias**: línea 424 (`success?.scrollIntoView({ behavior: 'smooth', block: 'start' })`) y cualquier otra llamada a `scrollIntoView` con `behavior: 'smooth'` en el mismo archivo
**Acción**: Usar `behavior: prefersReducedMotion ? 'auto' : 'smooth'`, con `prefersReducedMotion` calculado por `window.matchMedia('(prefers-reduced-motion: reduce)').matches` (el archivo hoy no tiene esa variable; reutilizar un helper existente del proyecto si lo hay).
**Justificación**: el proyecto exige `prefers-reduced-motion` en toda animación y el JS pisa el `scroll-behavior` de CSS.

**Acceptance**:
- [ ] Con `prefers-reduced-motion: reduce`, el scroll del wizard es instantáneo
- [ ] Sin la preferencia, el scroll sigue siendo suave

## T3 — Generar y versionar apple-touch-icon.png 180×180

**File**: log-atm-web-astro/scripts/generate-favicons.mjs y log-atm-web-astro/public/apple-touch-icon.png
**Líneas/ocurrencias**: función `main()` del script (hoy genera solo `favicon.svg` y `favicon.ico`)
**Acción**: Agregar la salida `public/apple-touch-icon.png` (PNG 180×180) desde el mismo origen (`public/logo.svg`) con `sharp`, actualizar el docstring del script, ejecutar `npm run favicons` y versionar el PNG generado. No tocar `favicon.ico` (YAGNI).
**Justificación**: `src/layouts/BaseLayout.astro:178` declara `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />` y hoy da 404.

**Acceptance**:
- [ ] `npm run favicons` genera `public/apple-touch-icon.png` y el archivo es PNG 180×180 (verificable con `file` o `sharp().metadata()`)
- [ ] Con `astro preview`, `GET /apple-touch-icon.png` responde 200

## T4 — Verificación con axe y con teclado

**File**: log-atm-web-astro/scripts/axe-audit.mjs (solo ejecución) sobre el build del worktree
**Líneas/ocurrencias**: no aplica (verificación)
**Acción**: Ejecutar `npm run build` y `node scripts/axe-audit.mjs` (ajustar solo la invocación si las rutas de `dist/` del script no coinciden con la salida real del build; no reescribir el script). Cubrir el selector en desktop y en el drawer móvil en `es`, `en` y `pt`. Probar el selector con teclado en un navegador real (el Chrome bajo `/home/kapridoo/projects/log-atm-web-astro/log-atm-web-astro/chrome/` sirve contra `astro preview`). Registrar comandos y salidas en `memory/changes/fix-a11y-and-icons/apply-evidence.md`.
**Justificación**: criterio de aceptación del brief: axe sin violaciones en el selector y operación completa con teclado.

**Acceptance**:
- [ ] axe sin violaciones atribuibles al selector de idioma en desktop y drawer móvil, en `es`, `en` y `pt`
- [ ] `apply-evidence.md` registra la prueba de teclado (Tab, Enter, Escape con retorno de foco)

## T5 — Corregir el contraste del selector de idioma (ampliación de alcance, decisión 2026-10-02)

**File**: log-atm-web-astro/src/components/ui/LanguageSelector.astro (solo el bloque `<style>`)
**Líneas/ocurrencias**: reglas de color de texto de la opción activa, hover/focus de las opciones, trigger expandido (`[aria-expanded="true"]`) y encabezado del drawer móvil
**Acción**: Sustituir `--color-brand` (primary-500) por el token existente `--color-brand-dark` (primary-700) en la opción activa, en hover/focus y en el trigger expandido, y neutral-500 por el token existente `--color-text-muted` (neutral-600) en el encabezado móvil. Solo tokens existentes, sin valores hex nuevos. No tocar otros componentes; si los mismos pares de texto (primary-500 sobre primary-50 o neutral-50, neutral-500 sobre blanco) aparecen en otras partes del sitio, solo registrarlos en `memory/observations.md` con `archivo:línea`. No modificar `scripts/axe-audit.mjs`. Registrar en `apply-evidence.md` el color antes y después de cada estado (token y valor resuelto) para la descripción del PR.
**Justificación**: axe-core en Chrome marca `color-contrast` (WCAG 1.4.3) en el selector, en desktop y en el drawer móvil, en es/en/pt (3.96:1, 4.10:1 y 3.66:1); el brief exige axe sin violaciones en el selector y el proyecto exige WCAG AA.

**Acceptance**:
- [ ] axe-core en Chrome real, acotado al selector, sin violaciones `color-contrast` en desktop y drawer móvil, en `es`, `en` y `pt`
- [ ] Contraste ≥ 4.5:1 medido en cada estado: opción activa, hover, focus, trigger expandido y encabezado del drawer
- [ ] El diff de `src/` de esta tarea solo toca el `<style>` de `LanguageSelector.astro` y usa únicamente tokens existentes
- [ ] `apply-evidence.md` registra antes/después del color de cada estado
