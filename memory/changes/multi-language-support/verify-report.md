---
type: verify-report
change_name: "multi-language-support"
fecha: "2026-05-12"
veredicto: "FAIL"
---

# Verify Report: multi-language-support

**Fecha**: 2026-05-12
**Veredicto**: ❌ FAIL

## Resumen ejecutivo

El build completa sin error de compilación y el validador i18n pasa (188 claves en paridad para los 6 locales). Sin embargo, existe un **fallo crítico de routing**: las páginas interiores (`servicios`, `nosotros`, `contacto`, `cotizar`, `industrias`) bajo cada locale no-default no se generan como HTML. El motivo es un conflicto de routing entre Astro i18n (que registra `/en`, `/zh`, etc. como prefijos de locale desde el i18n config) y las rutas dinámicas `src/pages/[lang]/servicios.astro` (que compiten con `src/pages/servicios.astro` de mayor prioridad). Astro advierte explícitamente con 30 `WARN [build] Could not render` y los archivos quedan vacíos. Solo `dist/en/index.html`, `dist/ar/index.html`, etc. se generan correctamente.

---

## Resultados por Spec

### 1. i18n-routing-locale-prefixes

| Criterion | Status | Notas |
|-----------|--------|-------|
| Contenido en español sin prefijo (ruta raíz `/`) | ✅ | `dist/index.html` con `lang="es-CL"` |
| Contenido en en/zh/hi/ar/pt bajo sus prefijos | ⚠️ PARCIAL | Solo `dist/{locale}/index.html` generado; páginas interiores vacías |
| Fallback a español ante ruta no existente | ✅ | Config `fallback: { en: 'es', ... }` presente en astro.config.mjs |
| Todas las rutas de páginas en cada locale | ❌ | `/en/servicios`, `/ar/contacto`, etc. NO tienen HTML — conflict WARN en build |
| Las rutas en español no cambian (sin prefijo /es/) | ✅ | `prefixDefaultLocale: false` — URLs españolas intactas |
| Build genera HTML por página/locale sin errores | ❌ | 30 WARNs de páginas no creadas (`response body was empty`) |

**Scenarios verificados**: 3/5 ✅ | 2/5 ❌

#### Causa raíz del fallo

`src/pages/[lang]/servicios.astro` colisiona con `src/pages/servicios.astro`. Astro i18n con `prefixDefaultLocale: false` registra `/es/servicios` como ruta interna de mayor prioridad cuando procesa el locale, lo que hace que `[lang]` pierda el match. La solución requiere renombrar `src/pages/[lang]/` a `src/pages/[locale]/` y ajustar `getStaticPaths()`, o bien usar la directiva `trailingSlash` combinada con rutas explícitas tipo `src/pages/en/servicios.astro`, etc.

---

### 2. i18n-translations-json-structure

| Criterion | Status | Notas |
|-----------|--------|-------|
| Existe un JSON por cada 6 idiomas | ✅ | es, en, zh, hi, ar, pt presentes en `src/i18n/translations/` |
| Español es fuente canónica; demás JSONs mismas claves | ✅ | `validate-i18n`: OK (188 claves) para todos los locales |
| Helper `t(key)` resuelve claves con notación de punto | ✅ | Implementado en `src/i18n/utils.ts` con `useTranslations()` |
| Fallback a español ante clave faltante | ✅ | Lógica de fallback implementada en `useTranslations()` |
| JSONs no-español con marca de revisión nativa | ✅ | Campo `_reviewStatus` presente (excluido de la validación de claves) |
| Build falla si hay drift de claves | ✅ | Hook `astro:build:start` con `i18nValidator` integrado |
| Textos visibles provienen de JSONs, no strings literales | ⚠️ PARCIAL | Páginas migradas, pero páginas como `nosotros.astro`, `contacto.astro`, `cotizar.astro` aún tienen contenido hardcodeado |

**Scenarios verificados**: 5/5 para la infraestructura ✅ | Copy de páginas interiores: deuda explícita (ver sección deuda)

---

### 3. i18n-ui-selector-navbar

| Criterion | Status | Notas |
|-----------|--------|-------|
| Selector visible en Navbar en escritorio (derecha del CTA) | ✅ | `LanguageSelector` importado en `Navbar.astro`, variante desktop en posición correcta |
| Selector accesible en drawer móvil | ✅ | `LanguageSelector` con `variant="mobile"` incluido en drawer |
| Al cambiar idioma, usuario permanece en misma sección | ⚠️ PARCIAL | Funciona para `index`; para páginas interiores los links del selector apuntan a URLs no generadas |
| Idioma activo destacado visualmente | ✅ | Clase `is-active` con `aria-current="true"` en opción activa |
| Selector operable con teclado (Tab, Enter, Escape) | ✅ | Script inline maneja `Escape`; `aria-haspopup="listbox"`, `aria-expanded` |
| Sin cookies ni almacenamiento local | ✅ | Implementación 100% URL-based |

**Scenarios verificados**: 5/6 ✅ | 1/6 ⚠️ (preservación de path en páginas interiores no funcional por routing)

---

### 4. i18n-rtl-support-arabic

| Criterion | Status | Notas |
|-----------|--------|-------|
| `dir="rtl"` en `<html>` para rutas `/ar/` | ✅ | `dist/ar/index.html`: `<html lang="ar" dir="rtl">` confirmado |
| Drawer desde lado izquierdo en árabe | ✅ | Override CSS `[dir="rtl"] .drawer__panel` con `slideInRTL` keyframe |
| Textos fluyen RTL en `/ar/` | ✅ | CSS logical properties aplicadas; `dir="rtl"` en html cascada |
| Sin elementos desalineados en RTL | ✅ | `inset-inline-start`, `inset-inline-end`, `margin-inline` reemplazados |
| Selector de idioma operable en árabe | ✅ | Selector es agnostico de dirección por logical properties |
| Animaciones del drawer sin artefactos en RTL | ✅ | `slideInRTL` keyframe `translateX(-100%)` para apertura desde izquierda |
| Otros locales con `dir` ausente o `ltr` | ✅ | `dist/en/index.html`: `<html lang="en-US" dir="ltr">` confirmado |

**Scenarios verificados**: 7/7 ✅ (verificación HTML sobre dist)

---

### 5. i18n-seo-hreflang

| Criterion | Status | Notas |
|-----------|--------|-------|
| `<link rel="alternate" hreflang>` en cada página (6 locales + x-default) | ✅ | Confirmado en `/`, `/en/`, `/ar/` — 6 hreflang + x-default presente |
| `lang` en `<html>` refleja locale activo | ✅ | `lang="en-US"` en /en/, `lang="ar"` en /ar/, `lang="es-CL"` en / |
| `og:locale` refleja locale activo | ✅ | `content="en_US"`, `content="ar_AR"`, `content="es_CL"` verificados |
| Schema JSON-LD con slogan/description en idioma de página | ✅ | Slogan y description dinámicos vía `t()` |
| Sitemap incluye todas las páginas por locale con hreflang | ⚠️ PARCIAL | Sitemap lista URLs de páginas interiores (`/en/servicios/`, etc.) pero esos HTML no existen en dist |
| URLs en español referenciadas con x-default | ✅ | `hreflang="x-default" href="https://logatm.com/"` presente |
| Validadores de Rich Results sin errores | ⚠️ NO VERIFICABLE | Requiere despliegue en producción |

**Scenarios verificados**: 4/5 verificables ✅ | 1/5 parcial (sitemap declara páginas que no tienen HTML)

---

### 6. i18n-typography-system-fonts

| Criterion | Status | Notas |
|-----------|--------|-------|
| Chino (zh) con fuente CJK | ✅ | `:root:lang(zh) { --font-sans: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", ... }` en global.css |
| Hindi (hi) con Devanagari | ✅ | `:root:lang(hi) { --font-sans: "Kohinoor Devanagari", "Noto Sans Devanagari", ... }` |
| Árabe (ar) con fuente árabe | ✅ | `:root:lang(ar) { --font-sans: "Geeza Pro", "Noto Sans Arabic", ... }` |
| Inter y Outfit sin cambios para es/en/pt | ✅ | Los stacks solo aplican en `:root:lang(zh/hi/ar)` — sin afectar es/en/pt |
| Sin fuentes web adicionales | ✅ | Solo `font-family` con system fonts; sin `@import` ni Google Fonts |
| Lighthouse Performance no retrocede | ⚠️ NO VERIFICABLE | Requiere auditoría en navegador; no hay baseline disponible |
| Sin tofu en navegadores principales | ⚠️ NO VERIFICABLE | Requiere inspección visual en Chromium/Firefox/Safari |

**Scenarios verificados**: 5/7 verificables estáticamente ✅ | 2/7 requieren verificación manual/visual (no bloquean)

---

## Tests

### Build

```
npm run build → EXIT 0
[log-atm:i18n-validator] [i18n] en: OK (188 claves)
[log-atm:i18n-validator] [i18n] zh: OK (188 claves)
[log-atm:i18n-validator] [i18n] hi: OK (188 claves)
[log-atm:i18n-validator] [i18n] ar: OK (188 claves)
[log-atm:i18n-validator] [i18n] pt: OK (188 claves)
[build] 14 page(s) built in 2.81s
[build] Complete!
```

**WARNs críticos (30 ocurrencias)**:
```
[WARN] [build] Could not render `/en/servicios` from route `/[lang]/servicios` as it conflicts with higher priority route `/servicios`.
[WARN] [build] Could not render `/ar/contacto` from route `/[lang]/contacto` as it conflicts with higher priority route `/contacto`.
... (ídem para todas las páginas interiores × 5 locales)
```

Páginas generadas efectivamente en dist:
- `/index.html` ✅
- `/en/index.html`, `/zh/index.html`, `/hi/index.html`, `/ar/index.html`, `/pt/index.html` ✅
- `/contacto/index.html`, `/servicios/index.html`, `/nosotros/index.html`, `/industrias/index.html`, `/cotizar/index.html` ✅ (español)
- `/en/servicios/index.html` ❌ (vacío), idem para todos los demás locales × páginas interiores

### Validador i18n

```
npm run validate-i18n → EXIT 0
[i18n] en: OK (188 claves)
[i18n] zh: OK (188 claves)
[i18n] hi: OK (188 claves)
[i18n] ar: OK (188 claves)
[i18n] pt: OK (188 claves)
```

### Type check

`npx astro check` — requiere `@astrojs/check` (no instalado). Omitido sin bloquear.

---

## Verificación HTML

| Archivo | lang | dir | hreflang count | x-default | Contenido localizado |
|---------|------|-----|----------------|-----------|---------------------|
| `dist/index.html` | `es-CL` | `ltr` | 6 ✅ | ✅ | Español ✅ |
| `dist/en/index.html` | `en-US` | `ltr` | 6 ✅ | ✅ | Inglés ✅ |
| `dist/ar/index.html` | `ar` | `rtl` ✅ | 6 ✅ | ✅ | Árabe ✅ |
| `dist/en/servicios/` | — | — | — | — | ❌ NO GENERADO |
| `dist/ar/servicios/` | — | — | — | — | ❌ NO GENERADO |

---

## Coherencia de Grafo de Specs

### Análisis

| Spec S | Campo | Spec T/U | Tipo | Evaluación |
|--------|-------|----------|------|------------|
| `i18n-translations-json-structure` | `affects: [[i18n-typography-system-fonts]]` | `i18n-typography-system-fonts.depends_on` no incluye `[[i18n-translations]]` | INCONSISTENCIA | WARN — metadata incompleta |
| `i18n-typography-system-fonts` | `affects: [[i18n-rtl-support-arabic]]` | `i18n-rtl-support-arabic.depends_on` no incluye `[[i18n-typography-system-fonts]]` | INCONSISTENCIA | WARN — metadata incompleta |
| `i18n-ui-selector-navbar` | `affects: [[i18n-rtl-support-arabic]]` | `i18n-rtl-support-arabic.related` SÍ incluye `[[i18n-ui-selector-navbar]]` | OK via related | WARN leve |

Ninguna de las inconsistencias es FAIL (todas son de metadata, las specs referenciadas existen).

### Correcciones automáticas

Condición para corrección automática: validación principal = PASS. Como el veredicto es FAIL, **no se aplican correcciones automáticas de metadata** (protocolo: corrección solo si PASS).

---

## Deuda explícita (no bloquea verify si no está en AC)

1. **Copy de páginas interiores**: `nosotros.astro`, `contacto.astro`, `cotizar.astro`, `industrias.astro`, `servicios/carga-aerea.astro`, `servicios/carga-maritima.astro` tienen contenido hardcodeado en español sin pasar por `t()`. Esto está reconocido en el prompt como riesgo conocido y no forma parte del AC de las specs verificadas.

2. **Sitemap declara URLs sin HTML**: El sitemap generado incluye correctamente las relaciones hreflang para `/en/servicios/`, etc., pero esas páginas no tienen HTML en dist. Esto es consecuencia del fallo de routing.

---

## Acciones Requeridas (FAIL — sdd-apply debe corregir)

### Fallo bloqueante: Routing conflict en páginas interiores

**Problema**: Las páginas en `src/pages/[lang]/*.astro` compiten con `src/pages/*.astro` y Astro les asigna menor prioridad. El Astro i18n runtime considera que `/en/servicios` es servido por el mecanismo de routing de locales, pero el archivo `src/pages/servicios.astro` (sin prefijo) toma precedencia.

**Solución recomendada**: Renombrar el parámetro dinámico de `[lang]` a algún nombre no conflictivo (e.g., `[locale]`) — sin embargo esto no resuelve el conflicto de rutas en Astro v6. La solución correcta es que las páginas localizadas NO estén en `src/pages/[lang]/` sino que se generen usando la API `injectRoute` de Astro, o bien moviendo las páginas españolas actuales a un subdirectorio `src/pages/es/` y dejando `[lang]` como el único handler de todas las rutas (requiere cambiar `prefixDefaultLocale: true` o un approach de re-routing completo).

**Alternativa más simple**: Eliminar `src/pages/servicios.astro`, `src/pages/nosotros.astro`, etc. y reemplazarlos por páginas `src/pages/[lang]/servicios.astro` donde `getStaticPaths()` incluya `'es'` además de los otros locales. Las URLs españolas se mantienen sin prefijo si Astro i18n procesa las rutas correctamente con `prefixDefaultLocale: false`.

**AC afectados**:
- `i18n-routing-locale-prefixes`: "Todas las rutas disponibles en cada locale" — ❌
- `i18n-routing-locale-prefixes`: "Build genera HTML para cada página/locale" — ❌
- `i18n-ui-selector-navbar`: "Al cambiar idioma, usuario permanece en misma sección" — ⚠️ parcial

---

## Veredicto

**❌ FAIL**

La infraestructura i18n está correctamente implementada (routing config, JSONs con paridad, helper `t()`, RTL, SEO metadata, tipografía). El fallo es de generación de páginas: el conflicto de routing en Astro impide que `servicios`, `nosotros`, `contacto`, `cotizar`, `industrias` se generen bajo los prefijos de locale. Esto viola directamente el AC principal de `i18n-routing-locale-prefixes`.

Se requiere corrección en `sdd-apply` antes de proceder a `sdd-archive`.
