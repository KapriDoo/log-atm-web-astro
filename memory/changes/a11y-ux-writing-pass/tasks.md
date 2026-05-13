---
type: tasks
change_name: a11y-ux-writing-pass
created: "2026-05-12"
---

# Tasks — a11y-ux-writing-pass

## P0 — Críticos

### T1 — Pause control + reduced-motion en video Why
**File**: `log-atm-web-astro/src/components/sections/WhyVideoSection.astro`
**Acción**: Quitar atributo `autoplay`. Añadir botón `.why__video-toggle` (44x44) con `aria-pressed` y `aria-label` dinámico. Reproducir programáticamente sólo si `!prefers-reduced-motion`. Estilos en `<style>` interno.
**Acceptance**:
- [x] Botón pause/play visible
- [x] Respeta `prefers-reduced-motion` (no autoplay)
- [x] `aria-label` cambia entre "Reproducir video" / "Pausar video"
- [x] `aria-pressed` refleja estado
- [x] `aria-label` en `<video>` describe contenido

### T2 — Focus management del drawer móvil
**File**: `log-atm-web-astro/src/components/ui/Navbar.astro`
**Acción**: En `openDrawer`: mover foco al primer focusable del panel, marcar `<main>` + `<nav>` como `inert`. En `closeDrawer`: devolver foco al hamburger, quitar `inert`. Implementar `trapFocus(e)` para Tab cíclico.
**Acceptance**:
- [x] Tab cíclico dentro del panel
- [x] Esc cierra y devuelve foco
- [x] `inert` aplicado a contenido detrás
- [x] Foco va al close button al abrir

### T3 — Unificar 70+ países / 80+ partners
**File**: `log-atm-web-astro/src/lib/constants.ts` (WHY_ITEMS[1])
**Acción**: Cambiar metric `"80+"` → `"70+"`, sub `"partners"` → `"países"`, desc reformulada para mantener "alianzas verificadas" pero con la cifra unificada.
**Acceptance**:
- [x] WHY_ITEMS y HERO_STRIP_STATS reportan misma cifra (70+ países)

## P1 — Importantes

### T4 — Radiogroup CTA con teclado
**File**: `log-atm-web-astro/src/components/sections/CTASection.astro`
**Acción**: Implementar `selectChannel(idx, focus)` con roving tabindex. Añadir handler keydown con ArrowLeft/Right/Up/Down + Space/Enter. Usar `aria-labelledby` en `radiogroup`.
**Acceptance**:
- [x] Flechas navegan entre opciones
- [x] Space/Enter selecciona
- [x] tabindex=0 sólo en el seleccionado
- [x] focus-visible visible

### T5 — Validación + live region CTA form
**File**: `log-atm-web-astro/src/components/sections/CTASection.astro`
**Acción**: Añadir `<p id="qq-status" role="status" aria-live="polite">`. Validar `email || phone` y formato email. Mensajes de error/éxito via `setStatus`.
**Acceptance**:
- [x] Error visible si no hay email/teléfono
- [x] Validación formato email
- [x] `aria-live="polite"` anuncia status

### T6 — aria-label dinámico hamburger
**File**: `log-atm-web-astro/src/components/ui/Navbar.astro`
**Acción**: En `openDrawer`/`closeDrawer`, actualizar `burger.setAttribute('aria-label', ...)` entre "Abrir menú" / "Cerrar menú".
**Acceptance**:
- [x] aria-label cambia con aria-expanded

### T7 — alt="" en imágenes de cards
**Files**:
- `log-atm-web-astro/src/components/sections/ServicesSection.astro:39`
- `log-atm-web-astro/src/components/sections/IndustriesSection.astro:29`
**Acción**: `alt={s.title}` → `alt=""` (imágenes decorativas; el h3 dentro del link ya describe).
**Acceptance**:
- [x] SR no lee el title del card dos veces

### T8 — Promesa 30s → 60s
**File**: `log-atm-web-astro/src/components/sections/CTASection.astro`
**Acción**: `"Cotización rápida · 30 seg"` → `"Cotización rápida · 60 seg"`.
**Acceptance**:
- [x] Promesa realista para form de 5 campos

## P2 — Menores

### T9 — Mejorar copy CTA form
**File**: `log-atm-web-astro/src/components/sections/CTASection.astro`
**Acción**:
- `"Recibir cotización en"` → `"¿Cómo prefieres recibirla?"`
- `"Obtener cotización"` → `"Cotizar ahora"` (consistente con hero/nav)
- Añadir `<span class="sr-only">(se abre en nueva pestaña)</span>` en botón WhatsApp.
**Acceptance**:
- [x] Copy más conversacional y consistente
- [x] SR avisa nueva pestaña

### T10 — Limpiar aria-label selector ES
**File**: `log-atm-web-astro/src/components/ui/Navbar.astro:29`
**Acción**: Quitar `aria-label="Idioma (placeholder)"`. Añadir `aria-hidden="true"` al `<span>` (no interactivo).
**Acceptance**:
- [x] SR no lee "placeholder"

### T11 — Campo contacto dividido
**File**: `log-atm-web-astro/src/components/sections/CTASection.astro`
**Acción**: Reemplazar input combinado por dos campos `#qq-email` (type=email, autocomplete=email) y `#qq-phone` (type=tel, autocomplete=tel) con hint compartido. Actualizar JS para leer ambos.
**Acceptance**:
- [x] Teclado correcto por campo en móvil
- [x] Autocomplete preciso
- [x] Hint "Completa al menos uno"

## Verify
- [x] `npm run build` pasa sin errores nuevos
- [ ] Smoke test manual (pendiente — sin entorno gráfico)
