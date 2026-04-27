# Verify Report: centralizar-estilos

**Fecha**: 2026-04-26
**Veredicto**: ❌ FAIL

## Resumen Ejecutivo

El build compila correctamente y los tokens están centralizados en `tokens.css` sin duplicación en `global.css`. Sin embargo, **persisten múltiples valores hardcodeados** que las specs del change declaran explícitamente como obligatorios a eliminar:

- **rgba(255,255,255,…)** y otros literales aún presentes en 6 archivos CSS/Astro
- **Colores hex** (`#128C7E`, `#1da851`, `#22c55e`, `#86efac`, `#0d6b61`) fuera de `tokens.css`
- **Tokens de opacidad** no creados en `tokens.css` (requeridos por spec `create-functional-tokens`)
- **Border-radius fijos** (`24px`, `16px`) sin tokenizar en `why.css`

---

## Resultados por Spec

### 1. tokens/consolidate-tokens ✅

| Criterion | Status | Notas |
|-----------|--------|-------|
| `tokens.css` contiene definición completa de `@theme` | ✅ | Todas las escalas y tokens semánticos definidos |
| `global.css` importa `tokens.css` sin redefinir tokens | ✅ | Solo `@import "./tokens.css"` + utilidades globales |
| No hay duplicación de variables CSS en `:root` | ✅ | `:root` solo en `tokens.css` |
| Build de desarrollo y producción funcionan | ✅ | `astro build` completo sin errores |
| Lighthouse score ≥ 95 | ⚠️ | No auditable automáticamente; sin regresión estructural |

**Scenarios verificados**: 2/2

---

### 2. tokens/create-functional-tokens ❌

| Criterion | Status | Notas |
|-----------|--------|-------|
| Tokens de opacidad definidos para todos los valores literales | ❌ | **No existen** tokens `--opacity-*` en `tokens.css`. Se requieren para reemplazar todos los `rgba(255,255,255,0.xx)` y `rgba(74,123,181,0.xx)` |
| Tokens de sombra definidos para todos los box-shadow hardcodeados | ⚠️ | Existen `--shadow-sm/md/lg/xl/cta`, pero usan `rgb(... / 0.xx)` hardcodeado en lugar de `color-mix()` con tokens de opacidad |
| Tokens de border-radius definidos para valores repetidos | ✅ | `--radius-sm/md/lg/xl/pill` definidos |
| Tokens documentados con comentarios | ✅ | Comentarios indican uso previsto |
| Tailwind v4 reconoce los tokens en `@theme` | ✅ | `@theme` correctamente configurado |

**Scenarios verificados**: 1/2 (falta tokenización de opacidades)

---

### 3. sections/hero-styles ❌

| Criterion | Status | Notas |
|-----------|--------|-------|
| No hay valores rgba literales en `hero.css` | ❌ | **15+ literales** presentes: `rgba(255,255,255,0.03|0.08|0.15|0.2|0.4|0.10|0.18|0.12|0.08|0.15|0.4|0.2)`, `rgba(62,185,120,0.3|0.1|0.40|0.50)`, `rgba(0,0,0,0.25)`, `rgba(34,197,94,0.25)` |
| No hay colores hex literales en estilos de `HeroSection.astro` | ✅ | `HeroSection.astro` no tiene estilos inline con hex |
| Los valores hardcodeados usan tokens o clases utilitarias | ❌ | Requieren tokens de opacidad y `--color-success-*` |
| El hero se ve idéntico antes y después | ⚠️ | No verificable automáticamente; valores idénticos |

**Scenarios verificados**: 0/2 (ambos bloqueados por literales)

---

### 4. sections/services-styles ❌

| Criterion | Status | Notas |
|-----------|--------|-------|
| No hay rgba literales en `services.css` | ❌ | `rgba(74,123,181,0.14)`, `rgba(74,123,181,0.92)`, `rgba(204,118,20,0.92)`, `rgba(62,185,120,0.08|0.16|0.2)` |
| Las sombras y overlays se ven idénticos | ⚠️ | No verificable automáticamente |
| Se usan tokens o clases utilitarias | ❌ | Requieren `--shadow-card` y tokens de opacidad |

**Scenarios verificados**: 0/2

---

### 5. sections/cta-styles ❌

| Criterion | Status | Notas |
|-----------|--------|-------|
| No hay rgba literales en `cta.css` | ❌ | `rgba(62,185,120,0.40)`, `rgba(255,255,255,0.08|0.25|0.15|0.5)` |
| La sección CTA se ve idéntica | ⚠️ | No verificable automáticamente |

**Scenarios verificados**: 0/1

---

### 6. sections/why-styles ❌

| Criterion | Status | Notas |
|-----------|--------|-------|
| No hay rgba literales en `why.css` | ❌ | `rgba(74,123,181,0.18|0.4|0)`, `rgba(0,0,0,0.10)`, `rgba(74,123,181,0.25|0.35)` |
| No hay border-radius fijos en `why.css` | ❌ | `border-radius: 24px` (×2), `border-radius: 16px` — usar `var(--radius-lg)` y `var(--radius-md)` |
| No hay colores hex literales en `WhySection.astro` | ✅ | SVG usa `var(--color-svg-bg)` y `var(--color-svg-text)` |
| La sección Why se ve idéntica | ⚠️ | No verificable automáticamente |

**Scenarios verificados**: 0/2

---

### 7. sections/industries-styles ✅

| Criterion | Status | Notas |
|-----------|--------|-------|
| No hay colores hex literales en `industries.css` | ✅ | Fallback usa `var(--color-industry-fallback)` |
| La sección Industries se ve idéntica | ⚠️ | No verificable automáticamente |

**Scenarios verificados**: 1/1

---

### 8. components/navbar-styles ❌

| Criterion | Status | Notas |
|-----------|--------|-------|
| No hay rgba literales en `Navbar.astro` | ❌ | `rgba(255,255,255,0.92)`, `rgba(74,123,181,0.10)`, `rgba(62,185,120,0.30|0.40|0.35)`, `rgba(17,34,54,0.55)`, `rgba(0,0,0,0.18)` |
| No hay px fijos innecesarios en `Navbar.astro` | ⚠️ | Tokens de espaciado no existen para todos los tamaños; gris mientras no haya `--spacing-*` |
| El navbar se ve y comporta idéntico | ⚠️ | No verificable automáticamente |

**Scenarios verificados**: 0/2

---

### 9. components/footer-styles ❌

| Criterion | Status | Notas |
|-----------|--------|-------|
| No hay colores hex literales de WhatsApp en `Footer.astro` | ❌ | `#128C7E` (l.214) y `#1da851` (l.223) aún hardcodeados |
| El botón WhatsApp se ve idéntico | ✅ | Colores preservados visualmente |
| Los tokens usan nombres semánticos | ❌ | Requieren `--color-whatsapp` y `--color-whatsapp-hover` en `tokens.css` |

**Scenarios verificados**: 0/1

---

### 10. data/industries-colors ✅

| Criterion | Status | Notas |
|-----------|--------|-------|
| Los colores de industrias tienen una decisión documentada | ✅ | Comentario en `constants.ts` l.139-142 explica que son datos de contenido, no tokens visuales |
| Si se migran, no hay regresiones visuales | N/A | Decisión fue mantener |
| Si se mantienen, hay un comentario explicando por qué | ✅ | Comentario detallado presente |

**Scenarios verificados**: 1/1

---

## Verificación Específica Solicitada

| # | Verificación | Status | Detalle |
|---|-------------|--------|---------|
| 1 | No `#fff`/`#ffffff` hardcodeado fuera de `tokens.css` | ✅ | 43 reemplazos verificados. Cero ocurrencias en `.css`, `.astro`, `.ts`, `.js` (excluyendo `tokens.css`) |
| 2 | No colores hex literales en componentes/CSS fuera de `tokens.css` | ❌ | **8 hallazgos** en archivos fuente |
| 3 | Build funciona | ✅ | `astro build` exitoso, 7 páginas generadas |
| 4 | Tokens centralizados en `tokens.css` únicamente | ✅ | `global.css` solo importa y consume `var()` |
| 5 | `global.css` no duplica tokens | ✅ | Sin `@theme` ni `:root` duplicado |
| 6 | No hay regresiones | ⚠️ | Build OK; regresión visual no auditable sin screenshot testing |

---

## Hallazgos de Seguridad

Sin hallazgos de seguridad. No se introdujeron vulnerabilidades ni secretos hardcodeados.

---

## Inventario de Literales Pendientes

### Archivos CSS

| Archivo | Líneas | Literales |
|---------|--------|-----------|
| `src/styles/sections/hero.css` | 37-38, 63-64, 74, 79-80, 127, 133, 141, 146, 151, 157, 168, 189-190, 196, 230, 237, 245, 246, 256-257, 265 | `rgba(255,255,255,0.03)`, `rgba(255,255,255,0.08)`, `rgba(62,185,120,0.3)`, `rgba(255,255,255,0.15)`, `rgba(62,185,120,0.1)`, `rgba(62,185,120,0.40)`, `rgba(62,185,120,0.50)`, `rgba(255,255,255,0.2)`, `rgba(255,255,255,0.10)`, `rgba(255,255,255,0.18)`, `rgba(0,0,0,0.25)`, `rgba(255,255,255,0.12)`, `rgba(255,255,255,0.4)`, `#22c55e`, `rgba(34,197,94,0.25)`, `rgba(255,255,255,0.2)`, `#86efac` |
| `src/styles/sections/services.css` | 30, 89, 104-105, 139, 150 | `rgba(74,123,181,0.14)`, `rgba(62,185,120,0.08)`, `rgba(62,185,120,0.16)`, `rgba(62,185,120,0.2)`, `rgba(74,123,181,0.92)`, `rgba(204,118,20,0.92)` |
| `src/styles/sections/cta.css` | 58, 69-70, 76-78 | `rgba(62,185,120,0.40)`, `rgba(255,255,255,0.08)`, `rgba(255,255,255,0.25)`, `rgba(255,255,255,0.15)`, `rgba(255,255,255,0.5)` |
| `src/styles/sections/why.css` | 16, 20-22, 38, 68-69, 93, 98 | `24px` (×2), `rgba(74,123,181,0.18)`, `rgba(0,0,0,0.10)`, `rgba(74,123,181,0.4)`, `rgba(74,123,181,0)`, `rgba(74,123,181,0.25)`, `rgba(74,123,181,0.35)` |

### Archivos Astro

| Archivo | Líneas | Literales |
|---------|--------|-----------|
| `src/components/ui/Footer.astro` | 214, 223 | `#128C7E`, `#1da851` |
| `src/components/ui/Navbar.astro` | 85, 92, 160, 167, 209, 220, 302 | `rgba(255,255,255,0.92)`, `rgba(74,123,181,0.10)`, `rgba(62,185,120,0.30)`, `rgba(62,185,120,0.40)`, `rgba(17,34,54,0.55)`, `rgba(0,0,0,0.18)`, `rgba(62,185,120,0.35)` |
| `src/pages/cotizar.astro` | 191, 197 | `#128C7E`, `#0d6b61` |
| `src/pages/contacto.astro` | 184, 190 | `#128C7E`, `#0d6b61` |

### Archivos TypeScript (justificados)

| Archivo | Líneas | Literales | Justificación |
|---------|--------|-----------|---------------|
| `src/lib/constants.ts` | 144-149 | `#658fc3`, `#3EB978`, etc. | Datos de contenido (industrias), no tokens visuales. Documentado con comentario explícito. Spec `industries-colors` aprueba su mantención. |

### Meta tags (aceptables)

| Archivo | Línea | Valor | Nota |
|---------|-------|-------|------|
| `src/layouts/BaseLayout.astro` | 123 | `#4A7BB5` | `<meta name="theme-color">` — metadata del documento, no estilo CSS tokenizable |

---

## Coherencia de Grafo de Specs

| Spec | depends_on | affects | Inconsistencias |
|------|-----------|---------|-----------------|
| `tokens/create-functional-tokens` | `tokens/consolidate-tokens` | — | ✅ OK |
| `sections/*` (5 specs) | `tokens/create-functional-tokens` | — | ✅ OK |
| `components/*` (2 specs) | `tokens/create-functional-tokens` | — | ✅ OK |
| `data/industries-colors` | `tokens/create-functional-tokens` | — | ✅ OK |

**Sin inconsistencias de grafo detectadas.**

---

## Acciones Requeridas

Para alcanzar **PASS**, se deben completar las siguientes correcciones:

### Alta prioridad (bloquean archive)

1. **Crear tokens de opacidad** en `tokens.css`
   ```css
   --opacity-white-3: 0.03;
   --opacity-white-8: 0.08;
   --opacity-white-10: 0.10;
   --opacity-white-12: 0.12;
   --opacity-white-15: 0.15;
   --opacity-white-18: 0.18;
   --opacity-white-20: 0.20;
   --opacity-white-25: 0.25;
   --opacity-white-40: 0.40;
   --opacity-white-50: 0.50;
   --opacity-brand-8: 0.08;
   --opacity-brand-10: 0.10;
   --opacity-brand-12: 0.12;
   --opacity-brand-14: 0.14;
   --opacity-brand-16: 0.16;
   --opacity-brand-18: 0.18;
   --opacity-brand-20: 0.20;
   --opacity-brand-25: 0.25;
   --opacity-brand-35: 0.35;
   --opacity-brand-40: 0.40;
   --opacity-brand-92: 0.92;
   --opacity-cta-25: 0.25;
   --opacity-cta-30: 0.30;
   --opacity-cta-35: 0.35;
   --opacity-cta-40: 0.40;
   --opacity-cta-45: 0.45;
   --opacity-cta-50: 0.50;
   --opacity-black-10: 0.10;
   --opacity-black-18: 0.18;
   --opacity-black-25: 0.25;
   --opacity-dark-55: 0.55;
   ```
   Y reemplazar **todos** los `rgba(...)` por `color-mix(in srgb, var(--color-*) calc(var(--opacity-*) * 100%), transparent)`.

2. **Crear tokens WhatsApp** en `tokens.css`
   ```css
   --color-whatsapp: #128C7E;
   --color-whatsapp-hover: #1da851;
   ```
   Y aplicar en `Footer.astro`, `cotizar.astro`, `contacto.astro`.

3. **Crear token success** en `tokens.css`
   ```css
   --color-success-500: #22c55e;
   --color-success-300: #86efac;
   ```
   Y aplicar en `hero.css` (`hero__card-status`, `hero__card-bar`).

4. **Tokenizar border-radius fijos** en `why.css`
   - `24px` → `var(--radius-lg)` (o crear `--radius-2xl: 24px`)
   - `16px` → `var(--radius-md)` (o crear `--radius-2xl: 16px`)

### Media prioridad (observaciones)

5. **Shadow tokens** (`--shadow-sm/md/lg/xl/cta`) deberían usar `color-mix()` con `--opacity-*` en lugar de `rgb(... / 0.xx)` hardcodeado.

6. **Pages no especificadas** (`cotizar.astro`, `contacto.astro`) no tienen specs dedicadas. Recomendación: crear specs delta para ellas o incluirlas en el scope de `footer-styles` / un nueva spec `pages/whatsapp-buttons`.

---

## Recomendación

**No proceder a `sdd-archive`**. El change requiere una ronda adicional de `sdd-apply` para eliminar los literales restantes. Una vez aplicadas las correcciones, re-ejecutar `sdd-verify`.
