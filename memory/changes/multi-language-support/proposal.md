---
type: proposal
change_name: "multi-language-support"
domain: "feature"
status: pending-approval
iteration: 1
created: "2026-05-11"
updated: "2026-05-11"
tags: [proposal]
---

# Propuesta: multi-language-support

## Intent

Habilitar el sitio LOG ATM en seis idiomas (es default, en, zh, hi, ar, pt) usando el i18n nativo de Astro 6 + archivos JSON de traducción, con routing por prefijo (excepto español), selector en Navbar, soporte RTL para árabe y SEO multi-idioma (`hreflang`, `lang`, `dir`, OG/JSON-LD parametrizados). Objetivo: expandir alcance internacional manteniendo la web estática, performante (Lighthouse ≥95) y mantenible.

## Scope

**Incluye:**
- Configuración `i18n` en `astro.config.mjs`: `defaultLocale: 'es'`, `locales: ['es','en','zh','hi','ar','pt']`, `routing.prefixDefaultLocale: false`, `fallback: { en:'es', zh:'es', hi:'es', ar:'es', pt:'es' }`.
- Archivos de traducción en `src/i18n/translations/{locale}.json` (un JSON plano por locale, claves namespaced: `nav.*`, `hero.*`, `services.*`, `industries.*`, `why.*`, `cta.*`, `footer.*`, `seo.*`, `forms.*`, `pages.*`).
- Helper `src/i18n/utils.ts` con: `getLangFromUrl(url)`, `useTranslations(lang)` que retorna `t(key)`, `getAlternateLinks(currentPath)`, `isRTL(lang)`.
- Migración de strings de `src/lib/constants.ts` y de todas las páginas/secciones identificadas en `exploration.md` § "Componentes que Requieren Traducción" hacia JSONs. Constantes no traducibles (URLs, números, IDs, nombres de puertos) permanecen en `constants.ts`.
- Restructuración de `src/pages/` a estructura por locale: páginas españolas siguen en raíz; resto bajo `src/pages/[lang]/` usando `getStaticPaths()` con los 5 locales no-default; alternativamente, `src/pages/[...lang]/index.astro` para unificar. **Decisión técnica**: ver design.md (preferencia inicial: carpeta `src/pages/[lang]/` por explicitud).
- `BaseLayout.astro`: `<html lang>` y `<html dir>` dinámicos, `og:locale` parametrizado, skip-link traducido, schema JSON-LD `slogan`/`description`/breadcrumb localizados, `<link rel="alternate" hreflang>` para cada locale + `x-default → es`.
- Selector de idioma en `Navbar.astro` (desktop: dropdown a la derecha del CTA; mobile: dentro del drawer). Preserva la ruta actual al cambiar locale. Persistencia: solo URL (sin cookie/localStorage en v1).
- RTL para árabe: `<html dir="rtl">` cuando `lang==='ar'`, refactor del Navbar drawer (`right:0` → logical property `inset-inline-end:0`, animaciones `slideIn` espejadas), revisión de `hero-b` grid y cualquier `text-left`/`text-right` literal → `text-start`/`text-end`.
- Fuentes: mantener Inter/Outfit para latin (es, en, pt). Para zh, hi, ar usar **system font stack por idioma** (Noto Sans CJK / Devanagari / Arabic vía CSS `font-family` condicional con `:lang()` o clase por locale) — sin añadir Google Fonts adicionales en v1 (ahorra bytes y mantiene Lighthouse).
- `@astrojs/sitemap` con `i18n` config para generar sitemap por idioma con hreflang automático.
- `public/manifest.json`: versión multi-locale o lang dinámico (decisión menor — ver design.md).
- Traducciones del contenido: **placeholders generados por IA** marcados con `// TODO: revisión nativa` en cada JSON no-español; revisión profesional fuera del scope de este cambio (queda como tarea de contenido posterior). Español es la fuente canónica.
- Página 404 traducida.

**Excluye explícitamente:**
- Traducción profesional/nativa final del contenido (placeholder con calidad razonable de IA + flag de revisión).
- Backend de formularios (`contacto`, `cotizar` siguen con `action="#"` — solo se traducen labels/placeholders).
- Selector con cookie/localStorage o auto-detección por `Accept-Language` (v2).
- Idiomas adicionales más allá de los 6 definidos.
- Reescritura de animaciones GSAP/Motion existentes salvo lo mínimo requerido para RTL.
- Pluralización avanzada o ICU MessageFormat (no se necesita en el copy actual; si surge un caso, interpolación simple `{var}`).
- Cambio de URLs en español (se mantienen `/servicios`, `/nosotros`, etc. sin renombrar a slugs por locale).

## Approach Propuesto

Adoptar **Approach A de exploration.md**: i18n nativo de Astro 6 + JSONs planos, sin dependencias externas. Astro genera estáticamente todas las rutas por locale; `getStaticPaths()` itera locales para páginas no-default. Helper minimalista `t(key)` con resolución por dot-notation y fallback automático al JSON español si la clave falta en el locale activo. Locale se infiere de la URL vía `Astro.currentLocale` (API nativa). Selector de idioma calcula la ruta equivalente en el locale destino preservando el path actual. RTL se activa via atributo `dir` en `<html>` + un conjunto mínimo de overrides CSS para los componentes con posicionamiento absoluto (Navbar drawer). Fuentes CJK/Devanagari/Arabic se delegan al sistema operativo del usuario vía `font-family` condicional con `:lang()` — evita ~300KB de fonts adicionales y mantiene legibilidad nativa. SEO: `hreflang` generado en build por loop sobre locales en `BaseLayout`; sitemap multi-locale automático vía integración. Traducciones iniciales se generan con IA y se marcan para revisión humana posterior, manteniendo español como fuente de verdad.

## Esfuerzo Estimado

**L** — Refactoring transversal: configuración Astro + 6 JSONs (~500 claves c/u) + helper i18n + migración de strings en 10+ componentes y 9 páginas + lógica RTL en Navbar + selector de idioma + parametrización SEO/schema/sitemap. El i18n nativo de Astro reduce complejidad de routing, pero el volumen de strings a migrar (~500+) y el QA en 6 idiomas (incluyendo RTL) justifican L. No llega a XL porque no requiere backend, ni librerías nuevas, ni cambios en arquitectura de build.

## Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| RTL rompe layout del Navbar drawer y secciones con posicionamiento absoluto | Alta | Auditoría dedicada de CSS con `right`/`left` literales → logical properties; checklist visual en `/ar/` para cada página; story de QA específica RTL en design.md |
| Calidad de traducciones IA insuficiente (especialmente zh/hi/ar) daña percepción de marca | Alta | Marcar todos los JSONs no-es con `// TODO: revisión nativa`; documentar en `proposal.md` que la revisión nativa es prerrequisito antes de publicar a producción; mantener feature flag o branch sin merge a main hasta revisión |
| Fuentes del sistema renderizan inconsistente CJK/Devanagari/Arabic entre OS | Media | Stack de fallbacks ordenado (Noto → Apple system → Microsoft → genérico); QA visual en Chromium/WebKit/Firefox; opción de añadir Google Fonts en v2 si feedback negativo |
| Migración de strings introduce regresiones (textos faltantes, claves mal mapeadas) | Media | TypeScript types generados desde `es.json` (master); test de build que valida que cada locale tiene las mismas claves que `es.json`; fallback automático evita pantallas en blanco |
| URLs existentes indexadas en Google rompen tras restructura | Baja | No se renombran rutas españolas (siguen sin prefijo); solo se añaden nuevas bajo `/{lang}/`; mantener `/servicios`, `/nosotros`, etc. intactas |
| `@astrojs/sitemap` no genera hreflang correcto con prefixDefaultLocale: false | Baja | Validar en build temprano; si falla, generar `hreflang` manualmente en `BaseLayout` (ya planificado) y desactivar la parte i18n del sitemap |
| Tamaño de bundle aumenta por incluir 6 JSONs | Baja | Astro hace tree-shaking por ruta — cada página solo embebe el locale que renderiza; verificar con `astro build` |

## Trade-offs

- **A favor**:
  - Cero dependencias nuevas; usa solo capacidades nativas de Astro 6.
  - Estática y rápida — sin runtime de i18n, sin overhead.
  - Mantenible: una sola fuente de verdad por idioma (un JSON).
  - TypeScript-friendly: claves tipadas desde `es.json`.
  - Routing transparente y SEO-friendly out-of-the-box.
  - Escalable: añadir un 7º idioma = nuevo JSON + entry en config.

- **En contra**:
  - Requiere tocar muchos archivos (alto blast radius del refactor).
  - Sin pluralización ni ICU avanzado (limitación aceptable con el copy actual).
  - Las traducciones IA iniciales son riesgo de marca hasta revisión nativa — gate explícito antes de prod.
  - System fonts para CJK/Devanagari/Arabic introducen variabilidad visual entre dispositivos.
  - El selector de idioma sin cookie obliga al usuario a re-seleccionar en cada visita si llega por enlace directo (aceptable v1; mejorable en v2).
