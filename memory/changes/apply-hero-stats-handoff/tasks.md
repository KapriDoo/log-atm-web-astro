---
type: tasks
change_name: "apply-hero-stats-handoff"
created: "2026-05-28"
---

# Tasks — apply-hero-stats-handoff

Origen: handoff de Claude Design (bundle `log-atm-finally`). El markup del Hero ya
coincide 1:1 con la referencia (`.hero-b__strip`, `.hero-b__strip-num`,
`.hero-b__strip-label`). El único delta es el tamaño/peso de los stats del strip
inferior, que en la referencia (`project/assets/site.css` líneas 197–200) son más
grandes que en el proyecto actual. Esto refleja el ajuste del usuario: "se agrandó
el texto y demás".

## T1 — Agrandar los stats del strip del Hero a los valores de la referencia

**File**: `log-atm-web-astro/src/styles/sections/hero.css` (dentro del worktree)
**Ocurrencias**: reglas `.hero-b__strip`, `.hero-b__strip-num`, `.hero-b__strip-label` (aprox. líneas 169–194)
**Acción**: actualizar las propiedades para igualar la referencia del handoff:

- `.hero-b__strip` → `gap: clamp(2.5rem, 6vw, 4.5rem)` (antes `clamp(1rem, 3vw, 2.5rem)`)
- `.hero-b__strip-num` → `font-size: clamp(2.5rem, 4vw, 3.25rem)` (antes `1.5rem`)
- `.hero-b__strip-num` → `font-weight: 800` (antes `700`)
- `.hero-b__strip-num` → añadir `line-height: 1`
- `.hero-b__strip-num` → `letter-spacing: -0.02em` (antes `-0.01em`)
- `.hero-b__strip-label` → `font-size: 0.75rem` (antes `0.6875rem`)
- `.hero-b__strip-label` → añadir `margin-top: 0.375rem`

No tocar el resto de `hero.css` ni el componente `HeroSection.astro` (markup ya correcto).
No tocar reglas responsive existentes.

**Justificación**: cambio CSS puramente visual, acotado a 3 selectores en 1 archivo,
sin impacto en lógica, accesibilidad de markup ni i18n. Reversible. Los valores son
exactamente los de la referencia del handoff.

**Acceptance**:
- [x] `.hero-b__strip-num` usa `font-size: clamp(2.5rem, 4vw, 3.25rem)`, `font-weight: 800`, `line-height: 1`, `letter-spacing: -0.02em`
- [x] `.hero-b__strip-label` usa `font-size: 0.75rem` y `margin-top: 0.375rem`
- [x] `.hero-b__strip` usa `gap: clamp(2.5rem, 6vw, 4.5rem)`
- [x] `HeroSection.astro` y el resto de `hero.css` permanecen sin cambios
- [x] El proyecto compila (`npm run build` o `astro check`) sin errores nuevos
